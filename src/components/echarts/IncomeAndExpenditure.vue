<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useTheme } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps({
    income: { type: Array, required: true },
    expense: { type: Array, required: true },
    title: { type: Array, required: true },
})

const theme = useTheme()

const incomeColor = theme.global.current.value.colors.income
const lossColor = theme.global.current.value.colors.loss

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const option = ref({})
watch([() => props.income, () => props.expense, () => props.title], ([newIncome, newExpense, newTitle]) => {
    option.value = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            valueFormatter: (value) => '¥ ' + Math.abs(value)
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: { show: false },
            axisLine: {
                lineStyle: { color: '#ccc' }
            },
            axisLabel: {
                color: '#666'
            },
            data: newTitle
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisLabel: { show: false }, // 去掉数字
            splitLine: { show: false } // 去掉背景线
        },
        series: [
            {
                name: '收入',
                type: 'bar',
                stack: 'Total',
                barWidth: '50%',
                emphasis: { focus: 'series' },
                label: { show: false },
                itemStyle: {
                    borderRadius: [100, 100, 100, 100],
                    color: incomeColor
                },
                data: newIncome
            },
            {
                name: '支出',
                type: 'bar',
                stack: 'Total',
                barWidth: '50%',
                emphasis: { focus: 'series' },
                label: { show: false },
                itemStyle: {
                    borderRadius: [100, 100, 100, 100],
                    color: lossColor
                },
                data: newExpense
            }
        ]
    }
})


</script>

<template>
    <v-chart style="width:100%;height: 315px;" :option="option" autoresize />
</template>
