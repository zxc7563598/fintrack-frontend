<script setup>
import { computed, ref, watch } from 'vue'
import httpRequest from '@/static/request.js';
import { showSnackbar } from '@/static/useSnackbar.js'
import config from '@/static/config';
import { downloadFile } from '@/utils/download';

const props = defineProps({
    modelValue: { type: Boolean, required: true },
})
const loading = ref(false)

// 日期控制
const start_menu = ref(false)
const start_date = ref(null)
const start_formatted_date = computed(() => {
    if (!start_date.value) return ''
    const d = new Date(start_date.value)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
})

const end_menu = ref(false)
const end_date = ref(null)
const end_formatted_date = computed(() => {
    if (!end_date.value) return ''
    const d = new Date(end_date.value)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
})
// 日期清除
function dateClearable(type) {
    switch (type) {
        case 'start':
            start_date.value = '';
            break;
        case 'end':
            end_date.value = '';
            break;
    }
}

// 其他搜索项初始化
const income_type = ref(null)
const income_type_items = ref([
    {
        title: '收入',
        value: 1
    },
    {
        title: '支出',
        value: 2
    },
    {
        title: '不记收支',
        value: 3
    },
    {
        title: '未知',
        value: 4
    },
])
const counterpartys = ref([])
const counterpartys_items = ref([])
const payment_method = ref([])
const payment_method_items = ref([])
const trade_types = ref([])
const trade_types_items = ref([])

// 导出账单
function exportBill() {
    loading.value = true
    httpRequest({
        url: config.interface.ExportBillHandler,
        method: 'post',
        data: {
            'start_formatted_date': start_formatted_date.value,
            'end_formatted_date': end_formatted_date.value,
            'income_type': income_type.value,
            'counterpartys': counterpartys.value,
            'payment_method': payment_method.value,
            'trade_types': trade_types.value,
        },
        responseType: 'blob'
    }).then(async (res) => {
        const contentType = res.headers['content-type']
        if (contentType && contentType.includes('application/json')) {
            const json = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
            showSnackbar({ text: json.msg || '导出失败', color: 'error', timeout: 2000 })
        } else {
            await downloadFile('账单导出.csv', res.data)
        }
    }).catch((err) => {
        console.log(err)
        showSnackbar({ text: '请求失败，请稍后再试', color: 'error', timeout: 2000 });
    }).finally(() => {
        loading.value = false
    })
}

// 窗口启动状态
const emit = defineEmits(['update:modelValue'])
const isActive = ref(props.modelValue)
watch(() => props.modelValue, (v) => {
    isActive.value = v
    if (isActive.value) {
        // 加载数据
        loading.value = true
        httpRequest({
            url: config.interface.GetBillInfoHandler,
            method: 'post',
            data: {
                id: 0
            }
        }).then((res) => {
            if (res.code == 0) {
                counterpartys_items.value = res.data.counterpartys
                payment_method_items.value = res.data.payment_method
                trade_types_items.value = res.data.trade_types
            } else {
                showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
            }
        }).finally(() => {
            loading.value = false;
        })
    } else {
        // 清空状态
    }
})
watch(isActive, (v) => { emit('update:modelValue', v) })
</script>

<template>
    <v-dialog v-model="isActive" max-width="1000">
        <v-card>
            <template #title>
                <div class="text-h5 mt-4 font-weight-bold">数据导出</div>
            </template>
            <template #text>
                <v-row class="mt-2 mb-4">
                    <v-col cols="12" sm="6">
                        <v-menu v-model="start_menu" :close-on-content-click="false" transition="scale-transition"
                            offset-y hide-details>
                            <template #activator="{ props }">
                                <v-text-field :model-value="start_formatted_date" label="开始日期" readonly v-bind="props"
                                    color="primary" density="compact" clearable @click:clear="dateClearable('start')"
                                    variant="outlined" hide-details></v-text-field>
                            </template>
                            <v-locale-provider locale="zhHans">
                                <v-date-picker v-model="start_date" @update:model-value="start_menu = false"
                                    color="primary"></v-date-picker>
                            </v-locale-provider>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-menu v-model="end_menu" :close-on-content-click="false" transition="scale-transition"
                            offset-y hide-details>
                            <template #activator="{ props }">
                                <v-text-field :model-value="end_formatted_date" label="结束日期" clearable readonly
                                    v-bind="props" color="primary" density="compact" @click:clear="dateClearable('end')"
                                    variant="outlined" hide-details></v-text-field>
                            </template>
                            <v-locale-provider locale="zhHans">
                                <v-date-picker v-model="end_date" @update:model-value="end_menu = false"
                                    color="primary"></v-date-picker>
                            </v-locale-provider>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select clearable label="收支类型" color="primary" density="compact" :items="income_type_items"
                            v-model="income_type" variant="outlined" hide-details></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select clearable label="账户" color="primary" density="compact" :items="payment_method_items"
                            v-model="payment_method" multiple chips variant="outlined" hide-details></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select clearable label="交易平台" color="primary" density="compact" :items="counterpartys_items"
                            v-model="counterpartys" multiple chips variant="outlined" hide-details></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select clearable label="交易分类" color="primary" density="compact" :items="trade_types_items"
                            v-model="trade_types" multiple chips variant="outlined" hide-details></v-select>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-btn block :loading="loading" color="primary" variant="elevated"
                            :disabled="!(start_date && end_date)" @click="exportBill">选择日期后导出</v-btn>
                    </v-col>
                </v-row>
            </template>
        </v-card>
    </v-dialog>
</template>
