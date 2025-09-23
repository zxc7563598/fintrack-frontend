<template>
    <v-container class="h-100 pl-4 pr-4" style="max-width: 100%;">
        <v-row class="h-100">
            <v-col cols="12">
                <v-card elevation="4" class="fill-height">
                    <v-layout class="rounded rounded-md border h-100">
                        <v-navigation-drawer elevation="0" class="border-e-thin border-secondary" mobile-breakpoint="md"
                            v-model="select_drawer">
                            <v-list class="ml-2 mr-2">
                                <div v-for="(item, index) in category_items" :key="index">
                                    <v-list-item density="compact" :value="item" color="primary"
                                        :active="category === item.id" @click="category = item.id">
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                    </v-list-item>
                                </div>
                            </v-list>
                            <v-divider>搜索项</v-divider>
                            <div class="ml-2 mr-2 mt-5">
                                <v-select clearable label="收支类型" color="primary" density="compact"
                                    :items="income_type_items" v-model="income_type" variant="outlined"></v-select>
                                <v-menu v-model="start_menu" :close-on-content-click="false"
                                    transition="scale-transition" offset-y>
                                    <template #activator="{ props }">
                                        <v-text-field :model-value="start_formatted_date" label="开始日期" readonly
                                            v-bind="props" color="primary" density="compact" clearable
                                            @click:clear="dateClearable('start')" variant="outlined"></v-text-field>
                                    </template>
                                    <v-locale-provider locale="zhHans">
                                        <v-date-picker v-model="start_date" @update:model-value="start_menu = false"
                                            color="primary"></v-date-picker>
                                    </v-locale-provider>
                                </v-menu>
                                <v-menu v-model="end_menu" :close-on-content-click="false" transition="scale-transition"
                                    offset-y>
                                    <template #activator="{ props }">
                                        <v-text-field :model-value="end_formatted_date" label="结束日期" clearable readonly
                                            v-bind="props" color="primary" density="compact"
                                            @click:clear="dateClearable('end')" variant="outlined"></v-text-field>
                                    </template>
                                    <v-locale-provider locale="zhHans">
                                        <v-date-picker v-model="end_date" @update:model-value="end_menu = false"
                                            color="primary"></v-date-picker>
                                    </v-locale-provider>
                                </v-menu>
                                <v-select clearable label="账户" color="primary" density="compact"
                                    :items="payment_method_items" v-model="payment_method" multiple chips
                                    variant="outlined" v-if="advancedSearch" @update:menu="advancedSearchUpdate"
                                    @click:clear="advancedSearchUpdate(false)"></v-select>
                                <v-select clearable label="交易平台" color="primary" density="compact"
                                    :items="counterpartys_items" v-model="counterpartys" multiple chips
                                    variant="outlined" v-if="advancedSearch" @update:menu="advancedSearchUpdate"
                                    @click:clear="advancedSearchUpdate(false)"></v-select>
                                <v-select clearable label="交易分类" color="primary" density="compact"
                                    :items="trade_types_items" v-model="trade_types" multiple chips variant="outlined"
                                    v-if="advancedSearch" @update:menu="advancedSearchUpdate"
                                    @click:clear="advancedSearchUpdate(false)"></v-select>
                                <v-btn density="default" color="primary" variant="outlined" size="default" block
                                    :prepend-icon="advancedSearch ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                    @click="advancedSearchSwitch" :loading="loading">高级搜索</v-btn>
                            </div>
                            <v-list class="ml-2 mr-2">
                                <div v-for="(item, index) in calendar_list" :key="index">
                                    <v-list-item density="compact" :value="item" color="primary"
                                        @click="selectRange(item)">
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                    </v-list-item>
                                </div>
                            </v-list>
                        </v-navigation-drawer>
                        <v-app-bar ref="appBar" elevation="0" class="border-b-thin border-secondary" height="84">
                            <template v-slot:prepend>
                                <v-app-bar-nav-icon @click="select_drawer = !select_drawer"
                                    v-if="!select_drawer"></v-app-bar-nav-icon>
                            </template>
                            <template #title>
                                <v-row dense>
                                    <v-col cols="12">
                                        <v-select class="mt-4 mr-6" label="图表名称" color="primary" :items="echarts_items"
                                            v-model="echarts" variant="underlined"></v-select>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-app-bar>
                        <v-main class="d-flex flex-column">
                            <ChartAccountBalanceCategory v-if="category == 1 && echarts == 1" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                            <ChartIncomeCategory v-if="category == 1 && echarts == 2" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                            <ChartExpenseCategory v-if="category == 1 && echarts == 3" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                            <ChartIncomeAccountCategory v-if="category == 1 && echarts == 4" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                            <ChartExpenseAccountCategory v-if="category == 1 && echarts == 5" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                            <ChartAccountBalanceTrend v-if="category == 2 && echarts == 1" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                            <ChartIncomeCategoryTrend v-if="category == 2 && echarts == 2" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                            <ChartExpenseCategoryTrend v-if="category == 2 && echarts == 3" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                            <ChartIncomeAccountTrend v-if="category == 2 && echarts == 4" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                            <ChartExpenseAccountTrend v-if="category == 2 && echarts == 5" :start_date="start_formatted_date" :end_date="end_formatted_date" :income_type="income_type" :counterparty="counterpartys" :payment_method="payment_method" :trade_type="trade_types" />
                        </v-main>
                    </v-layout>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import dayjs from 'dayjs'
import httpRequest from '@/static/request.js';
import config from '@/static/config';
import { showSnackbar } from '@/static/useSnackbar.js'
import { useTheme } from 'vuetify'
import ChartAccountBalanceCategory from '@/components/echarts/ChartAccountBalanceCategory'
import ChartAccountBalanceTrend from '@/components/echarts/ChartAccountBalanceTrend'
import ChartExpenseAccountCategory from '@/components/echarts/ChartExpenseAccountCategory'
import ChartExpenseAccountTrend from '@/components/echarts/ChartExpenseAccountTrend'
import ChartExpenseCategory from '@/components/echarts/ChartExpenseCategory'
import ChartExpenseCategoryTrend from '@/components/echarts/ChartExpenseCategoryTrend'
import ChartIncomeAccountCategory from '@/components/echarts/ChartIncomeAccountCategory'
import ChartIncomeAccountTrend from '@/components/echarts/ChartIncomeAccountTrend'
import ChartIncomeCategory from '@/components/echarts/ChartIncomeCategory'
import ChartIncomeCategoryTrend from '@/components/echarts/ChartIncomeCategoryTrend'

const loading = ref(false)
const theme = useTheme()

// 导入弹窗
const importDialog = ref(false)
const editDialog = ref(false)
const editId = ref(0);
function openEditDialog(id = 0) {
    editId.value = id
    editDialog.value = true
}

// 每行点击
function onRowClick(event, row) {
    openEditDialog(row.item.id)
}

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

// 快速选择
// 生成最近 N 个月的列表（包含本月）
function getRecentMonths(n = 6) {
    const list = []
    const now = dayjs()
    for (let i = 0; i < n; i++) {
        const d = now.subtract(i, 'month')
        list.push({
            name: `${d.year()}年${d.month() + 1}月`,
            id: d.format('YYYY-MM'),
            type: 'month',
            date: d
        })
    }
    return list
}
const fixedRanges = [
    { name: '近三个月', id: '3month', type: 'range' },
    { name: '近六个月', id: '6month', type: 'range' },
    { name: '今年以来', id: 'ytd', type: 'range' },
    { name: '去年', id: 'lastyear', type: 'range' },
]
// 合并成完整的列表
const calendar_list = ref([
    ...getRecentMonths(6),
    ...fixedRanges,
])

// 选中某个范围时，计算开始/结束日期
function selectRange(item) {
    if (item.type === 'month') {
        const start = dayjs(item.date).startOf('month')
        const end = dayjs(item.date).endOf('month')
        start_date.value = start.format('YYYY-MM-DD')
        end_date.value = end.format('YYYY-MM-DD')
    } else if (item.id === '3month') {
        start_date.value = dayjs().subtract(2, 'month').startOf('month').format('YYYY-MM-DD')
        end_date.value = dayjs().endOf('month').format('YYYY-MM-DD')
    } else if (item.id === '6month') {
        start_date.value = dayjs().subtract(5, 'month').startOf('month').format('YYYY-MM-DD')
        end_date.value = dayjs().endOf('month').format('YYYY-MM-DD')
    } else if (item.id === 'ytd') {
        start_date.value = dayjs().startOf('year').format('YYYY-MM-DD')
        end_date.value = dayjs().endOf('year').format('YYYY-MM-DD')
    } else if (item.id === 'lastyear') {
        start_date.value = dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD')
        end_date.value = dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
    }
}

// 搜索
const advancedSearch = ref(false)
const counterpartys = ref([])
const counterpartys_items = ref([])
const payment_method = ref([])
const payment_method_items = ref([])
const trade_types = ref([])
const trade_types_items = ref([])
function advancedSearchSwitch() {
    if (advancedSearch.value) {
        advancedSearch.value = false;
    } else {
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
                advancedSearch.value = true
            } else {
                showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
            }
        }).finally(() => {
            loading.value = false;
        })

    }
}
const category_items = ref([
    { name: '分类图', id: 1 },
    { name: '趋势图', id: 2 },
])
const category = ref(1)
const echarts = ref(1)
const echarts_items = ref([
    { title: "账户收支", value: 1 },
    { title: "收入分类", value: 2 },
    { title: "支出分类", value: 3 },
    { title: "收入账户", value: 4 },
    { title: "支出账户", value: 5 },
])

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

// 页面布局
const select_drawer = ref(false)

onMounted(() => {
    if (window.innerWidth >= 960) {
        select_drawer.value = true
    }
})

onBeforeUnmount(() => {
})
</script>
