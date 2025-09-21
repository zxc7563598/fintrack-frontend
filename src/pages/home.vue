<template>
  <v-container class="h-100 pl-4 pr-4" style="max-width: 100%;">
    <v-row>
      <v-col cols="12" md="12" lg="4">
        <v-card class="fill-height pa-2" elevation="4">
          <template #title>
            <span class="text-h5 font-weight-bold">九月·</span>
            <span class="font-weight-bold text-body-1">支出</span>
          </template>
          <template #text>
            <v-row dense>
              <v-col cols="12">
                <span class="text-h5 text-primary font-weight-bold">¥ {{ summary.month_expense }}</span>
              </v-col>
              <v-col cols="12">
                <span class="text-body-1 text-high-emphasis">当月收入：</span>
                <span class="text-body-1 text-high-emphasis">¥ {{ summary.month_income }}</span>
              </v-col>
              <v-col cols="12">
                <v-btn class="bg-primary mt-1" rounded="xs" @click="dateFilteringDetails('month')">
                  查看详情
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" lg="8">
        <v-card class="fill-height pa-2" elevation="4">
          <template #title class="font-weight-bold">资产概要</template>
          <template #text>
            <v-row dense>
              <v-col cols="12" class="mb-2">
                <div class="text-body-1 text-high-emphasis">您已经记录了 {{ summary.total_count }} 条数据</div>
                <div class="text-body-1 text-high-emphasis">最后的数据来自 {{ formatTime(summary.last_record) }}</div>
              </v-col>
              <v-row dense>
                <v-col cols="12" md="4" class="d-flex mt-2">
                  <v-btn icon="mdi-wallet" size="x-large" density="compact" class="bg-income" :rounded="false"></v-btn>
                  <div class="d-flex flex-column ml-2">
                    <div class="text-subtitle-2">总收入</div>
                    <div class="text-h6">¥ {{ summary.total_income }}</div>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="d-flex mt-2">
                  <v-btn icon="mdi-invoice-text-check-outline" size="x-large" density="compact" class="bg-loss"
                    :rounded="false"></v-btn>
                  <div class="d-flex flex-column ml-2">
                    <div class="text-subtitle-2">总支出</div>
                    <div class="text-h6">¥ {{ summary.total_expense }}</div>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="d-flex mt-2">
                  <v-btn icon="mdi-bank-minus" size="x-large" density="compact" class="bg-primary"
                    :rounded="false"></v-btn>
                  <div class="d-flex flex-column ml-2">
                    <div class="text-subtitle-2">净资产</div>
                    <div class="text-h6">¥ {{ summary.total_income - summary.total_expense }}</div>
                  </div>
                </v-col>
              </v-row>
            </v-row>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="fill-height pa-2" elevation="4">
              <template #title>
                <div>
                  <v-btn icon="mdi-calendar-today-outline" size="default" density="comfortable" class="bg-secondary"
                    elevation="0"></v-btn>
                  <span class="ml-3 text-subtitle-1 font-weight-bold">今日</span>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" variant="text" density="compact" size="large" v-bind="props"
                        class="float-right"></v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="dateFilteringDetails('day')">
                        <v-list-item-title>查看详情</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
              <template #text>
                <v-row dense>
                  <v-col cols="12" class="mt-3">
                    <span class="text-h5 font-weight-bold text-income">¥ {{ summary.today_income }}</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-h6 font-weight-medium text-loss">¥ {{ summary.today_expense }}</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-body-2">{{ formatRange('day') }}</span>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="fill-height pa-2" elevation="4">
              <template #title>
                <div>
                  <v-btn icon="mdi-calendar-week-outline" size="default" density="comfortable" class="bg-secondary"
                    elevation="0"></v-btn>
                  <span class="ml-3 text-subtitle-1 font-weight-bold">本周</span>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" variant="text" density="compact" size="large" v-bind="props"
                        class="float-right"></v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="dateFilteringDetails('week')">
                        <v-list-item-title>查看详情</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
              <template #text>
                <v-row dense>
                  <v-col cols="12" class="mt-3">
                    <span class="text-h5 font-weight-bold text-income">¥ {{ summary.week_income }}</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-h6 font-weight-medium text-loss">¥ {{ summary.week_expense }}</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-body-2">{{ formatRange('week') }}</span>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="fill-height pa-2" elevation="4">
              <template #title>
                <div>
                  <v-btn icon="mdi-calendar-month-outline" size="default" density="comfortable" class="bg-secondary"
                    elevation="0"></v-btn>
                  <span class="ml-3 text-subtitle-1 font-weight-bold">本月</span>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" variant="text" density="compact" size="large" v-bind="props"
                        class="float-right"></v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="dateFilteringDetails('month')">
                        <v-list-item-title>查看详情</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
              <template #text>
                <v-row dense>
                  <v-col cols="12" class="mt-3">
                    <span class="text-h5 font-weight-bold text-income">¥ {{ summary.month_income }}</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-h6 font-weight-medium text-loss">¥ {{ summary.month_expense }}</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-body-2">{{ formatRange('month') }}</span>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="fill-height pa-2" elevation="4">
              <template #title>
                <div>
                  <v-btn icon="mdi-calendar-multiselect-outline" size="default" density="comfortable"
                    class="bg-secondary" elevation="0"></v-btn>
                  <span class="ml-3 text-subtitle-1 font-weight-bold">今年</span>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" variant="text" density="compact" size="large" v-bind="props"
                        class="float-right"></v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="dateFilteringDetails('year')">
                        <v-list-item-title>查看详情</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </template>
              <template #text>
                <v-row dense>
                  <v-col cols="12" class="mt-3">
                    <span class="text-h5 font-weight-bold text-income">¥ {{ summary.year_income }}</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-h6 font-weight-medium text-loss">¥ {{ summary.year_expense }}</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-body-2">{{ formatRange('year') }}</span>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="fill-height pa-2" elevation="4">
          <template #title class="font-weight-bold">收入与支出趋势</template>
          <template #text>
            <IncomeAndExpenditure :income="echarts_income" :expense="echarts_expense" :title="echarts_title"
              :extra="echarts_extra">
            </IncomeAndExpenditure>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import config from '../static/config';
import httpRequest from '../static/request.js';
import { showSnackbar } from '../static/useSnackbar.js'
import IncomeAndExpenditure from '@/components/echarts/IncomeAndExpenditure.vue'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { useRouter } from 'vue-router';

const router = useRouter()

const loading = ref(false)
const summary = ref({
  total_count: 0,
  last_record: 0,
  total_income: 0,
  total_expense: 0,
  today_income: 0,
  today_expense: 0,
  week_income: 0,
  week_expense: 0,
  month_income: 0,
  month_expense: 0,
  year_income: 0,
  year_expense: 0
})
const echarts_income = ref([])
const echarts_expense = ref([])
const echarts_title = ref([])
const echarts_extra = ref([])

function getData() {
  httpRequest({
    url: config.interface.AssetOverviewHandler,
    method: 'post',
    data: {},
  }).then((res) => {
    if (res.code == 0) {
      loading.value = false;
      summary.value.total_count = res.data.summary.total_count // 数据总数
      summary.value.last_record = res.data.summary.last_record // 最后数据时间戳
      summary.value.total_income = res.data.summary.total_income // 总收入
      summary.value.total_expense = res.data.summary.total_expense // 总支出
      summary.value.today_income = res.data.summary.today_income // 当日收入
      summary.value.today_expense = res.data.summary.today_expense // 当日支出
      summary.value.week_income = res.data.summary.week_income // 本周收入
      summary.value.week_expense = res.data.summary.week_expense // 本周支出
      summary.value.month_income = res.data.summary.month_income // 本月收入
      summary.value.month_expense = res.data.summary.month_expense // 本月支出
      summary.value.year_income = res.data.summary.year_income // 本年收入
      summary.value.year_expense = res.data.summary.year_expense // 本年支出
      echarts_title.value = []
      echarts_income.value = []
      echarts_expense.value = []
      res.data.summary.last12_months.forEach((item) => {
        echarts_title.value.push(item.month + '月')
        echarts_extra.value.push({ 'year': item.year, 'month': item.month })
        echarts_income.value.push(item.income)
        echarts_expense.value.push((item.expense * -1))
      })
    } else {
      showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
    }
  }).finally(() => {
    loading.value = false;
  })
}

// 时间戳转换
const formatTime = (timestamp) => {
  return timestamp ? dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss') : '--'
}
function formatRange(type) {
  const now = dayjs()
  let start, end
  switch (type) {
    case 'day':
      return now.format('MM月DD日')
    case 'week':
      start = now.startOf('week')
      end = now.endOf('week')
      break
    case 'month':
      start = now.startOf('month')
      end = now.endOf('month')
      break
    case 'year':
      start = now.startOf('year')
      end = now.endOf('year')
      break
    default:
      return ''
  }
  return `${start.format('MM月DD日')} - ${end.format('MM月DD日')}`
}

function dateFilteringDetails(type) {
  dayjs.extend(isoWeek)
  const now = dayjs()
  let start, end
  switch (type) {
    case 'day':
      start = now.format('YYYY-MM-DD')
      end = now.format('YYYY-MM-DD')
      break;
    case 'week':
      start = now.startOf('isoWeek').format('YYYY-MM-DD')
      end = now.endOf('isoWeek').format('YYYY-MM-DD')
      break
    case 'month':
      start = now.startOf('month').format('YYYY-MM-DD')
      end = now.endOf('month').format('YYYY-MM-DD')
      break
    case 'year':
      start = now.startOf('year').format('YYYY-MM-DD')
      end = now.endOf('year').format('YYYY-MM-DD')
      break
  }
  router.push({
    name: 'details',
    state: {
      start_date: start,
      end_date: end
    }
  })
}

onMounted(() => {
  getData()
})

</script>