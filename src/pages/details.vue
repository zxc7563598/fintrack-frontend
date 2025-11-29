<template>
    <v-container class="h-100 pl-4 pr-4" style="max-width: 100%;">
        <v-row class="h-100">
            <v-col cols="12">
                <v-card elevation="4" class="fill-height">
                    <v-layout class="rounded rounded-md border h-100">
                        <v-navigation-drawer elevation="0" class="border-e-thin" mobile-breakpoint="md"
                            v-model="select_drawer">
                            <v-list class="ml-2 mr-2">
                                <div v-for="(item, index) in category" :key="index">
                                    <v-list-item density="compact" :value="item" color="primary"
                                        :active="category_checked === item.id" @click="category_checked = item.id">
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
                        <v-app-bar ref="appBar" elevation="0" class="border-b-thin app-bar-dynamic"
                            :height="appBarHeight">
                            <template v-slot:prepend>
                                <v-app-bar-nav-icon @click="select_drawer = !select_drawer"
                                    v-if="!select_drawer"></v-app-bar-nav-icon>
                            </template>
                            <template #title>
                                <v-row dense>
                                    <v-col cols="12" md="6">
                                        <div class="me-3 mt-3">
                                            <span v-if="category_checked == 1">交易列表</span>
                                            <span v-if="category_checked == 2">交易日历</span>
                                            <v-btn size="small" color="primary" class="ml-2" @click="openEditDialog(0)"
                                                variant="outlined" :loading="loading">添加</v-btn>
                                            <v-btn size="small" color="primary" class="ml-2"
                                                @click="importDialog = true" variant="outlined"
                                                :loading="loading">导入</v-btn>
                                            <v-btn size="small" color="primary" class="ml-2" variant="tonal"
                                                prepend-icon="mdi-owl" :loading="loading"
                                                @click="AnalysisBill">AI账单分析</v-btn>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field :loading="loading" v-model="search" color="primary"
                                            density="compact" label="搜索交易信息" variant="outlined" hide-details single-line
                                            class="mt-2 me-3 mb-2">
                                            <template #prepend-inner="slotProps">
                                                <v-icon>mdi-magnify</v-icon>
                                            </template>
                                            <template #append-inner="slotProps">
                                                <v-icon
                                                    @click="getDataList({ page: 1, itemsPerPage: itemsPerPage, sortBy: currentSorting })">mdi-check</v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-app-bar>
                        <v-main class="d-flex" v-if="category_checked == 1">
                            <v-data-table-server hover striped="even" v-model:items-per-page="itemsPerPage"
                                :page="currentPage" :headers="headers" height="200" :items="serverItems"
                                :items-length="totalItems" :loading="loading" item-value="name"
                                @update:options="getDataList" @click:row="onRowClick">
                                <template #item.amount="{ item }">
                                    <span v-if="item.income_type == 1" class="text-income">
                                        {{ item.amount }}
                                    </span>
                                    <span v-if="item.income_type == 2" class="text-loss">
                                        {{ item.amount }}
                                    </span>
                                    <span v-if="item.income_type == 3" class="text-decoration-line-through">
                                        {{ item.amount }}
                                    </span>
                                    <span v-if="item.income_type == 4">
                                        {{ item.amount }}
                                    </span>
                                </template>
                                <template #item.trade_time="{ item }">
                                    {{ formatTime(item.trade_time) }}
                                </template>
                                <template #item.product_name="{ item }">
                                    {{ item.product_name }}
                                    <v-tooltip v-if="item.remark" activator="parent" location="top">{{ item.remark
                                        }}</v-tooltip>
                                </template>
                            </v-data-table-server>
                        </v-main>
                        <v-main class="d-flex flex-column" v-if="category_checked == 2">
                            <v-sheet class="w-100 d-flex">
                                <v-btn class="ma-2" variant="text" icon @click="$refs.calendarRef.prev()">
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                                <div class="d-flex flex-fill flex-column align-center justify-center text-center">
                                    <span class="text-h5">{{ calendarTitle }}</span>
                                    <span>
                                        总收入: <span class="text-income mr-2">¥ {{ calendarIncome.toFixed(2) }}</span>
                                        总支出: <span class="text-loss">¥ {{ calendarExpense.toFixed(2) }}</span>
                                    </span>
                                </div>
                                <v-btn class="ma-2" variant="text" icon @click="$refs.calendarRef.next()">
                                    <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                            </v-sheet>
                            <v-sheet class="flex-fill">
                                <v-calendar ref="calendarRef" v-model="calendar" event-overlap-mode="stack"
                                    :event-overlap-threshold="30" :events="calendarEvents" type="month"
                                    @change="getCalendar" @click:event="clickCalendar"></v-calendar>
                            </v-sheet>
                        </v-main>
                    </v-layout>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <BillImport v-model="importDialog"></BillImport>
    <BillEdit v-model="editDialog" :id="editId"></BillEdit>
    <BillAnalysis v-model="analysisDialog" :content="analysisContent"></BillAnalysis>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import dayjs from 'dayjs'
import BillImport from '@/components/BillImport.vue'
import BillEdit from '@/components/BillEdit.vue'
import httpRequest from '@/static/request.js';
import { streamRequest } from '@/static/streamRequest.js'
import config from '@/static/config';
import { showSnackbar } from '@/static/useSnackbar.js'
import { useTheme } from 'vuetify'
import { useRoute } from 'vue-router';
import BillAnalysis from "@/components/BillAnalysis.vue";

const loading = ref(false)
const theme = useTheme()
const route = useRoute()

// 导入弹窗
const importDialog = ref(false)
const editDialog = ref(false)
const editId = ref(0);
function openEditDialog(id = 0) {
    editId.value = id
    editDialog.value = true
}
const analysisDialog = ref(false)
const analysisContent = ref('')

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
function advancedSearchUpdate(val) {
    if (!val) {
        getDataList({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: currentSorting.value })
    }
}
const category = ref([
    { name: '交易列表', id: 1 },
    { name: '交易日历', id: 2 },
])
const category_checked = ref(1)
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

// 获取数据
const search = ref('')
const income_type = ref(null)
const itemsPerPage = ref(20)
const headers = ref([
    { title: '时间', key: 'trade_time', align: 'start', headerProps: { class: 'bg-background', style: 'min-width:11rem' } },
    { title: '分类', key: 'trade_type', align: 'start', headerProps: { class: 'bg-background', style: 'min-width:8rem' } },
    { title: '金额', key: 'amount', align: 'start', headerProps: { class: 'bg-background', style: 'min-width:7rem' } },
    { title: '账户', key: 'payment_method', align: 'start', headerProps: { class: 'bg-background', style: 'min-width:12rem' } },
    { title: '描述', key: 'product_name', align: 'start', headerProps: { class: 'bg-background' } },
])
const serverItems = ref([])
const totalItems = ref(0)
const currentSorting = ref(null)
const currentPage = ref(1)
function getDataList({ page, itemsPerPage, sortBy }) {
    currentSorting.value = sortBy
    currentPage.value = page
    loading.value = true
    httpRequest({
        url: config.interface.GetBillListHandler,
        method: 'post',
        data: {
            'start_formatted_date': start_formatted_date.value,
            'end_formatted_date': end_formatted_date.value,
            'search': search.value,
            'income_type': income_type.value,
            'counterpartys': counterpartys.value,
            'payment_method': payment_method.value,
            'trade_types': trade_types.value,
            'page': page,
            'items_per_page': itemsPerPage,
            'sort_key': sortBy?.[0]?.key,
            'sort_order': sortBy?.[0]?.order
        }
    }).then((res) => {
        if (res.code == 0) {
            totalItems.value = res.data.total
            serverItems.value = res.data.data
            category_checked.value = 1
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// AI分析
function AnalysisBill() {
    analysisDialog.value = true;
    analysisContent.value = '';
    loading.value = true
    streamRequest({
        url: config.interface.AnalysisBillHandler,
        rawData: {
            start_formatted_date: start_formatted_date.value,
            end_formatted_date: end_formatted_date.value,
            income_type: income_type.value,
            counterpartys: counterpartys.value,
            payment_method: payment_method.value,
            trade_types: trade_types.value
        },

        onMessage(msg) {
            loading.value = false;
            analysisContent.value += msg
        },

        onError(err) {
            console.error("SSE 错误：", err)
        }
    })
}

// 监听内容变更后重新搜索
watch(
    [start_formatted_date, end_formatted_date, income_type],
    () => {
        getDataList({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: currentSorting.value })
    }
)
watch(importDialog, (v) => {
    if (!v) {
        getDataList({ page: currentPage.value, itemsPerPage: itemsPerPage.value, sortBy: currentSorting.value })
    }
})
watch(editDialog, (v) => {
    if (!v) {
        getDataList({ page: currentPage.value, itemsPerPage: itemsPerPage.value, sortBy: currentSorting.value })
    }
})

// 时间戳转换
const formatTime = (timestamp) => {
    return timestamp ? dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss') : '--'
}

// 日历相关
const calendarRef = ref(null)
const calendar = ref('')
const calendarEvents = ref([])
const calendarTitle = ref('')
const calendarIncome = ref(0)
const calendarExpense = ref(0)
function getCalendar({ start, end }) {
    calendarEvents.value = []
    calendarTitle.value = dayjs(start.date).format("YYYY年MM月")
    calendarIncome.value = 0
    calendarExpense.value = 0
    httpRequest({
        url: config.interface.GetBillCalendarHandler,
        method: 'post',
        data: {
            "start_at": start.date,
            "end_at": end.date
        },
    }).then((res) => {
        if (res.code == 0) {
            res.data.data.forEach((item) => {
                calendarIncome.value += item.income
                calendarExpense.value += item.expense
                calendarEvents.value.push({
                    name: item.income.toFixed(2),
                    start: new Date(item.date),
                    end: new Date(item.date),
                    color: theme.global.current.value.colors.income,
                    timed: false,
                })
                calendarEvents.value.push({
                    name: item.expense.toFixed(2),
                    start: new Date(item.date),
                    end: new Date(item.date),
                    color: theme.global.current.value.colors.loss,
                    timed: false,
                })
            })
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    })
}
function clickCalendar(nativeEvent, { day }) {
    start_date.value = day.date
    end_date.value = day.date
}

// 页面布局
const select_drawer = ref(false)
const appBarHeight = ref(64)
// 根据高度调整顶部搜索栏高度
function updateWidth() {
    if (window.innerWidth < 960) {
        appBarHeight.value = 104;
    } else {
        appBarHeight.value = 64;
    }
}

onMounted(() => {
    window.addEventListener('resize', updateWidth)
    updateWidth()
    if (window.innerWidth >= 960) {
        select_drawer.value = true
    }
    if (route.query?.start_date) {
        start_date.value = route.query.start_date
    }
    if (route.query?.end_date) {
        end_date.value = route.query.end_date
    }
    if (route.query?.income_type) {
        income_type.value = Number(route.query.income_type)
    }
    if (route.query?.counterpartys) {
        counterpartys.value = Array.isArray(route.query.counterpartys) ? route.query.counterpartys : [route.query.counterpartys]
    }
    if (route.query?.payment_method) {
        payment_method.value = Array.isArray(route.query.payment_method) ? route.query.payment_method : [route.query.payment_method]
    }
    if (route.query?.trade_types) {
        trade_types.value = Array.isArray(route.query.trade_types) ? route.query.trade_types : [route.query.trade_types]
    }
    if (route.query?.counterpartys || route.query?.payment_method || route.query?.trade_types) {
        getDataList({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: currentSorting.value })
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth)
})
</script>
