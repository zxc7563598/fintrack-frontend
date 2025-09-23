<script setup>
// 账户收支（趋势图）
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import httpRequest from '@/static/request.js';
import config from '@/static/config';
import { showSnackbar } from '@/static/useSnackbar.js'
import {
    GridComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useTheme } from 'vuetify'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs';

const router = useRouter()
const theme = useTheme()

const primaryColor = theme.global.current.value.colors.primary

const props = defineProps({
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    income_type: { type: [Number, null], required: true },
    counterparty: { type: Array, required: true },
    payment_method: { type: Array, required: true },
    trade_type: { type: Array, required: true },
})

const loading = ref(false)

use([CanvasRenderer, TooltipComponent, TitleComponent, GridComponent, LegendComponent, LineChart, ToolboxComponent])

const option = ref({})
watch([() => props.start_date, () => props.end_date, () => props.income_type, () => props.counterparty, () => props.payment_method, () => props.trade_type], ([newStartDate, newEndDate, newIncomeType, newCounterparty, newPaymentMethod, newTradeTypes]) => {
    getData(newStartDate, newEndDate, newIncomeType, newCounterparty, newPaymentMethod, newTradeTypes)
})

const seriesData = ref([])
const seriesDataMonths = ref([])
const incomeTypeItem = ref({
    "1": "收入",
    "2": "支出",
    "3": "不记收支",
    "4": "未知",
})
function getData(start_date, end_date, income_type, counterparty, payment_method, trade_type) {
    loading.value = true
    httpRequest({
        url: config.interface.AccountBalanceTrendHandler,
        method: 'post',
        data: {
            "start_formatted_date": start_date,
            "end_formatted_date": end_date,
            "income_type": income_type,
            "counterpartys": counterparty,
            "payment_method": payment_method,
            "trade_types": trade_type
        }
    }).then((res) => {
        if (res.code == 0) {
            seriesData.value = [];
            seriesDataMonths.value = [];
            res.data.months.forEach((item) => {
                seriesDataMonths.value.push(item)
            })
            res.data.list.forEach((item) => {
                seriesData.value.push({
                    name: incomeTypeItem.value[item.income_type],
                    type: 'line',
                    smooth: true,
                    data: item.data,
                    symbol: 'circle',
                    symbolSize: 6,
                    showSymbol: true,
                    lineStyle: { width: 3 }
                })
            })
            option.value = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: primaryColor
                        }
                    }
                },
                legend: {
                    top: 10,
                    left: 'center'
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: seriesDataMonths,
                    axisLine: {
                        lineStyle: { color: '#ccc' }
                    },
                    axisTick: { alignWithLabel: true }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: { color: '#ccc' }
                    },
                    splitLine: { lineStyle: { type: 'dashed', color: '#eee' } }
                },
                series: seriesData
            };

        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

function handleChartClick(params) {
    let d = dayjs(params.name, "YYYY-MM")
    let echarts_start_date = d.startOf('month').format("YYYY-MM-DD")
    let echarts_end_date = d.endOf('month').format("YYYY-MM-DD")
    let echarts_income_type = null
    switch (params.seriesName) {
        case '收入':
            echarts_income_type = 1
            break;
        case '支出':
            echarts_income_type = 2
            break;
        case '不记收支':
            echarts_income_type = 3
            break;
        case '未知':
            echarts_income_type = 4
            break;
    }
    router.push({
        name: 'details',
        query: {
            start_date: echarts_start_date,
            end_date: echarts_end_date,
            income_type: echarts_income_type,
            counterpartys: props.counterparty,
            payment_method: props.payment_method,
            trade_types: props.trade_type
        }
    })
}

onMounted(() => {
    getData(props.start_date, props.end_date, props.income_type, props.counterparty, props.payment_method, props.trade_type)
})

</script>

<template>
    <div class="d-flex flex-fill align-center justify-center">
        <v-chart :option="option" autoresize @click="handleChartClick" />
    </div>
</template>
