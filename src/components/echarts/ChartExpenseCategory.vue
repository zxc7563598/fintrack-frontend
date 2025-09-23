<script setup>
// 支出分类（分类图）
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import httpRequest from '@/static/request.js';
import config from '@/static/config';
import { showSnackbar } from '@/static/useSnackbar.js'
import {
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    income_type: { type: [Number, null], required: true },
    counterparty: { type: Array, required: true },
    payment_method: { type: Array, required: true },
    trade_type: { type: Array, required: true },
})

const loading = ref(false)

use([CanvasRenderer, TooltipComponent, TitleComponent, LegendComponent, PieChart, ToolboxComponent])

const option = ref({})
watch([() => props.start_date, () => props.end_date, () => props.income_type, () => props.counterparty, () => props.payment_method, () => props.trade_type], ([newStartDate, newEndDate, newIncomeType, newCounterparty, newPaymentMethod, newTradeTypes]) => {
    getData(newStartDate, newEndDate, newIncomeType, newCounterparty, newPaymentMethod, newTradeTypes)
})

const seriesData = ref([])
function getData(start_date, end_date, income_type, counterparty, payment_method, trade_type) {
    loading.value = true
    httpRequest({
        url: config.interface.ExpenseCategoryHandler,
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
            res.data.list.forEach((item) => {
                seriesData.value.push({
                    value: item.expense_total,
                    name: item.trade_type
                })
            })
            option.value = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>{c} 元 ({d}%)'
                },
                legend: {
                    bottom: '5%',
                    left: 'center',
                    itemWidth: 14,
                    itemHeight: 14
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: true,
                            title: '数据视图',
                            lang: ['数据视图', '关闭', '刷新']
                        }
                    }
                },
                series: {
                    name: '支出分类',
                    type: 'pie',
                    radius: [20, 140],
                    center: ['50%', '50%'],
                    roseType: 'area',     // 使用半径模式
                    itemStyle: {
                        borderRadius: 5
                    },
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: seriesData
                }
            };
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

function handleChartClick(params) {
    router.push({
        name: 'details',
        query: {
            start_date: props.start_date,
            end_date: props.end_date,
            income_type: props.income_type ? props.income_type : 2,
            counterpartys: props.counterparty,
            payment_method: props.payment_method,
            trade_types: params.name
        }
    })
}

onMounted(() => {
    getData(props.start_date, props.end_date, props.income_type, props.counterparty, props.payment_method, props.trade_type)
})

</script>

<template>
    <div class="d-flex flex-fill align-center justify-center">
        <div style="width:80%;height:80%">
            <v-chart :option="option" autoresize @click="handleChartClick" />
        </div>
    </div>
</template>
