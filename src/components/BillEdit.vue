<template>
    <v-dialog v-model="isActive" max-width="1000">
        <v-card>
            <template #title>
                <div class="text-h5 mt-4 font-weight-bold text-center">
                    {{ props.id > 0 ? '编辑记录' : '添加记录' }}
                </div>
            </template>
            <template #text>
                <v-form ref="formRef" v-model="formValid">
                    <v-row>
                        <v-col cols="12">
                            <v-alert :border="'start'" color="primary" title="温馨提示" variant="tonal">
                                为了保证数据的完整性和准确性，建议您优先通过 <b>导入账单</b> 的方式录入记录。<br>
                                手动添加记录仅适用于少量特殊情况（如遗漏的单笔交易）。<br>
                                如果条件允许，请尽量选择导入方式，这样统计和分析结果会更准确。
                            </v-alert>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select clearable label="平台" :items="platform_items" color="primary" density="compact"
                                variant="outlined" :item-props="true" v-model="platform" placeholder="请选择"
                                class="ml-2 mr-2" hide-details :loading="loading" :rules="platformRules"></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select clearable label="类型" :items="income_type_items" color="primary" density="compact"
                                variant="outlined" :item-props="true" v-model="income_type" placeholder="请选择"
                                class="ml-2 mr-2" hide-details :loading="loading" :rules="incomeTypeRules"></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-combobox clearable chips label="交易类型" color="primary" density="compact"
                                v-model="trade_type" :items="trade_type_items" variant="outlined" placeholder="选择或输入"
                                class="ml-2 mr-2" hide-details :loading="loading" :rules="tradeTypeRules"></v-combobox>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field clearable label="交易名称" variant="outlined" color="primary" density="compact"
                                v-model="product_name" class="ml-2 mr-2" hide-details :loading="loading"
                                :rules="productNameRules"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-combobox clearable chips label="商户名称" color="primary" density="compact"
                                v-model="counterparty" :items="counterparty_items" variant="outlined"
                                placeholder="选择或输入" class="ml-2 mr-2" hide-details :loading="loading"
                                :rules="counterpartyRules"></v-combobox>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-combobox clearable chips label="交易方式" color="primary" density="compact"
                                v-model="payment_method" :items="payment_method_items" variant="outlined"
                                placeholder="选择或输入" class="ml-2 mr-2" hide-details :loading="loading"
                                :rules="paymentMethodRules"></v-combobox>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field clearable label="金额" variant="outlined" color="primary" density="compact"
                                v-model="amount" class="ml-2 mr-2" hide-details :loading="loading"
                                :rules="amountRules"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field clearable v-model="trade_time" label="交易时间" variant="outlined" color="primary"
                                density="compact" readonly @click="showDateTimeDialog = true" placeholder="不选择则默认使用当前时间"
                                class="ml-2 mr-2" hide-details :loading="loading" :rules="tradeTimeRules" />
                        </v-col>
                        <v-col cols="12">
                            <v-textarea clearable label="备注" variant="outlined" color="primary" rows="3" no-resize
                                v-model="remark" class="ml-2 mr-2" hide-details :loading="loading"></v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
                <v-row v-if="props.id == 0">
                    <v-col cols="12">
                        <v-btn :disabled="false" variant="flat" color="primary" class="mt-4" block :loading="loading"
                            @click="storeBill">添加记录</v-btn>
                    </v-col>
                </v-row>
                <v-row dense v-else>
                    <v-col cols="6">
                        <v-btn :disabled="false" variant="flat" color="error" class="mt-4" block :loading="loading"
                            @click="delBill">删除记录</v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn :disabled="false" variant="flat" color="primary" class="mt-4" block :loading="loading"
                            @click="storeBill">变更记录</v-btn>
                    </v-col>
                </v-row>
            </template>
        </v-card>
        <template #activator="slotProps"></template>
    </v-dialog>
    <v-dialog v-model="showDateTimeDialog" max-width="800">
        <v-card>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12" md="6" class="d-flex align-center justify-center">
                        <v-date-picker v-model="date" />
                    </v-col>
                    <v-col cols="12" md="6" class="d-flex align-center justify-center">
                        <v-time-picker v-model="time" format="24hr" />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text @click="showDateTimeDialog = false">取消</v-btn>
                <v-btn text @click="confirmDateTime">确认</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import config from '../static/config';
import httpRequest from '../static/request.js';
import { showSnackbar } from '../static/useSnackbar.js'
import dayjs from 'dayjs'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    id: { type: [String, Number], required: true },
})

// 选择类型
const platform = ref(null);
const platform_items = [
    {
        title: '微信',
        value: 1,
    },
    {
        title: '支付宝',
        value: 2,
    },
]

const income_type = ref(null);
const income_type_items = [
    {
        title: '收入',
        value: 1,
    },
    {
        title: '支出',
        value: 2,
    },
    {
        title: '不记收支',
        value: 3,
    },
    {
        title: '未知',
        value: 4,
    },
]

const trade_type = ref(null)
const trade_type_items = ref([])

const counterparty = ref(null)
const counterparty_items = ref([])

const payment_method = ref(null)
const payment_method_items = ref([])


const showDateTimeDialog = ref(false)
const date = ref("") // e.g. "2024-02-12"
const time = ref("") // e.g. "19:01"
const trade_time = ref("")
function pad(num) {
    return num.toString().padStart(2, "0")
}

function confirmDateTime() {
    if (date.value && time.value) {
        const d = new Date(date.value)
        const yyyy = d.getFullYear()
        const mm = pad(d.getMonth() + 1) // 月份是 0-11
        const dd = pad(d.getDate())
        // time.value 已经是 "HH:mm"，只需要补秒
        trade_time.value = `${yyyy}-${mm}-${dd} ${time.value}:00`
    }
    showDateTimeDialog.value = false
}

const formRef = ref(null)
const formValid = ref(false)
const product_name = ref('')
const remark = ref('')
const amount = ref('')
const loading = ref(false)
const platformRules = ref([
    value => {
        if (!value || value.length === 0) return '平台不能为空'
        return true
    }
])
const incomeTypeRules = ref([
    value => {
        if (!value || value.length === 0) return '类型不能为空'
        return true
    }
])
const tradeTypeRules = ref([
    value => {
        if (!value || value.length === 0) return '交易类型不能为空'
        return true
    }
])
const productNameRules = ref([
    value => {
        if (!value || value.length === 0) return '交易名称不能为空'
        return true
    }
])
const counterpartyRules = ref([
    value => {
        if (!value || value.length === 0) return '商户名称不能为空'
        return true
    }
])
const paymentMethodRules = ref([
    value => {
        if (!value || value.length === 0) return '交易方式不能为空'
        return true
    }
])
const amountRules = ref([
    value => {
        if (!value || value.length === 0) return '金额不能为空'
        return true
    }
])
const tradeTimeRules = ref([
    value => {
        if (!value || value.length === 0) return '交易时间不能为空'
        return true
    }
])

// 添加/存储记录
function storeBill() {
    loading.value = true;
    formRef.value.validate().then(isValid => {
        if (isValid.valid) {
            httpRequest({
                url: config.interface.StoreBillRecordHandler,
                method: 'post',
                data: {
                    "id": props.id,
                    "platform": platform.value,
                    "income_type": income_type.value,
                    "trade_type": trade_type.value,
                    "product_name": product_name.value,
                    "counterparty": counterparty.value,
                    "payment_method": payment_method.value,
                    "amount": parseFloat(amount.value),
                    "trade_time": trade_time.value,
                    "remark": remark.value,
                },
            }).then((res) => {
                if (res.code == 0) {
                    if (props.id > 0) {
                        showSnackbar({ text: '变更成功', color: 'success', timeout: 2000 })
                    } else {
                        showSnackbar({ text: '添加成功', color: 'success', timeout: 2000 })
                    }
                } else {
                    showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
                }
                isActive.value = false
            }).finally(() => {
                loading.value = false;
            })
        } else {
            loading.value = false;
        }
    })
}

// 删除记录
function delBill() {
    loading.value = true;
    httpRequest({
        url: config.interface.DeleteBillRecordHandler,
        method: 'post',
        data: {
            "id": props.id
        },
    }).then((res) => {
        if (res.code == 0) {
            showSnackbar({ text: '删除成功', color: 'success', timeout: 2000 })
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
        isActive.value = false
    }).finally(() => {
        loading.value = false;
    })
}

// 窗口启动状态
const emit = defineEmits(['update:modelValue'])
const isActive = ref(props.modelValue)
watch(() => props.modelValue, (v) => {
    isActive.value = v
    loading.value = true;
    if (isActive.value) {
        httpRequest({
            url: config.interface.GetBillInfoHandler,
            method: 'post',
            data: {
                'id': props.id
            },
        }).then((res) => {
            if (res.code == 0) {
                trade_type_items.value = res.data.trade_types
                counterparty_items.value = res.data.counterpartys
                payment_method_items.value = res.data.payment_method
                if (res.data.data.id > 0) {
                    platform.value = res.data.data.platform
                    income_type.value = res.data.data.income_type
                    trade_type.value = res.data.data.trade_type
                    product_name.value = res.data.data.product_name
                    counterparty.value = res.data.data.counterparty
                    payment_method.value = res.data.data.payment_method
                    amount.value = res.data.data.amount
                    trade_time.value = dayjs.unix(res.data.data.trade_time).format('YYYY-MM-DD HH:mm:ss')
                    remark.value = res.data.data.remark
                }
            } else {
                showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
                isActive.value = false
            }
        }).finally(() => {
            loading.value = false;
        })
    } else {
        trade_type_items.value = []
        counterparty_items.value = []
        payment_method_items.value = []
        platform.value = null
        income_type.value = null
        trade_type.value = null
        product_name.value = null
        counterparty.value = null
        payment_method.value = null
        amount.value = null
        trade_time.value = null
        remark.value = null
    }
})
watch(isActive, (v) => { emit('update:modelValue', v) })
</script>