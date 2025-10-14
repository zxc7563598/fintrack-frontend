<template>
    <v-stepper elevation="0" :model-value="step" show-actions>
        <v-stepper-header class="elevation-0">
            <v-stepper-item color="primary" class="elevation-0" :complete="step >= 1">
                <div class="d-flex align-center">
                    <div class="text-h4 font-weight-light mr-2">01</div>
                    <div>
                        <div class="text-subtitle-2 font-weight-bold">下载示例文件</div>
                        <div class="text-subtitle-2 text-grey-500">下载示例文件进行数据导入</div>
                    </div>
                </div>
            </v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item color="primary" class="elevation-0" :complete="step >= 2">
                <div class="d-flex align-center">
                    <div class="text-h4 font-weight-light mr-2">02</div>
                    <div>
                        <div class="text-subtitle-2 font-weight-bold">上传文件</div>
                        <div class="text-subtitle-2 text-grey-500">填写示例文件并进行上传</div>
                    </div>
                </div>
            </v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item color="primary" class="elevation-0" :complete="step >= 3">
                <div class="d-flex align-center">
                    <div class="text-h4 font-weight-light mr-2">03</div>
                    <div>
                        <div class="text-subtitle-2 font-weight-bold">核对数据</div>
                        <div class="text-subtitle-2 text-grey-500">确认您上传的数据</div>
                    </div>
                </div>
            </v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item color="primary" class="elevation-0" :complete="step >= 4">
                <div class="d-flex align-center">
                    <div class="text-h4 font-weight-light mr-2">04</div>
                    <div>
                        <div class="text-subtitle-2 font-weight-bold">完成</div>
                        <div class="text-subtitle-2 text-grey-500">数据导入完成</div>
                    </div>
                </div>
            </v-stepper-item>
        </v-stepper-header>
        <v-container class="pt-0">
            <v-row class="pt-0">
                <v-col class="pt-0 pb-0" cols="12" v-if="step == 0">
                    <v-timeline side="end" density="compact" class="h-auto w-100">
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-1" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-btn class="bg-primary mt-1 text-h6" rounded="xs" @click="downloadDemo"
                                    append-icon="mdi-cursor-default-click-outline">
                                    第一步：点击下载示例文件
                                </v-btn>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-2" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第二步：填写数据到示例文件中
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>打开下载的示例文件，按照格式填写您的交易数据。</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-7" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第三步：上传数据文件
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>将填写好的交易文件进行上传</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </v-col>
                <v-col cols="12" v-if="step == 1">
                    <v-file-input accept=".csv,text/csv" density="compact" variant="underlined" label="上传 CSV 文件"
                        v-model="billCsv" :loading="loading" @change="uploadCsv($event.target.files[0])" />
                </v-col>
                <v-col cols="12" v-if="step == 2" class="d-flex align-center justify-center">
                    <v-card-text class="text-subtitle-2 bg-background" style="max-width: 400px;">
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">起始时间</span><span class="text-primary font-weight-bold">{{
                                    custom_data_info.start_time }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">终止时间</span><span class="text-primary font-weight-bold">{{
                                    custom_data_info.end_time }}</span></div>
                        <v-divider class="my-2"></v-divider>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">总记录数</span><span class="text-primary font-weight-bold">{{
                                    custom_data_info.total_count }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">收入</span><span class="text-primary font-weight-bold">{{
                                    custom_data_info.income_count }} 笔 / ¥{{
                                    custom_data_info.income_amount }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">支出</span><span class="text-primary font-weight-bold">{{
                                    custom_data_info.expense_count }} 笔 / ¥{{
                                    custom_data_info.expense_amount }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">不计收支</span><span class="text-primary font-weight-bold">{{
                                    custom_data_info.none_count }} 笔 / ¥{{
                                    custom_data_info.none_amount }}</span></div>
                    </v-card-text>
                </v-col>
                <v-col cols="12" v-if="step == 3">
                    <v-empty-state color="primary" icon="mdi-check" text="数据已同步到平台，关闭窗口进行查看"
                        title="已完成上传"></v-empty-state>
                </v-col>
                <v-col cols="12 d-flex">
                    <v-btn elevation="0" v-if="step < 3" :disabled="step == 1 && uploadPath == ''" :loading="loading"
                        color="grey" text @click="stepReduce">上一步</v-btn>
                    <v-btn elevation="0" v-if="step < 3" :disabled="step == 1 && uploadPath == ''" :loading="loading"
                        color="primary" class="ml-auto" text @click="stepAdd">下一步</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-stepper>
</template>
<script setup>
import { ref } from 'vue'
import config from '@/static/config';
import httpRequest from '@/static/request.js';
import { showSnackbar } from '@/static/useSnackbar.js'
import { downloadFile } from '@/utils/download';

const loading = ref(false)

// 下载示例
async function downloadDemo() {
    const csvContent =
        `平台(微信、支付宝、银行卡、其他),收支类型(收入、支出、不计收支、未知),交易类型,商品名称,对方,支付方式,金额,交易时间,备注,交易号(可以为空),商户订单号(可以为空)
支付宝,收入,餐饮美食,示例消费记录,餐饮店,余额宝,30.00,2025-01-01 12:23:32,额外的备注信息，添加记录请删除此行数据,交易订单号，可以为空，用来区分记录,商家订单号，可以为空
`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=UTF-8' });
    await downloadFile('账单导入示例.csv', blob)
}

// 上传文件
const billCsv = ref(null)
const uploadPath = ref('')
async function uploadCsv(file) {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    loading.value = true
    uploadPath.value = ''
    httpRequest({
        url: config.interface.UploadCustomCSVHandler,
        method: 'post',
        data: formData,
        file: true
    }).then((res) => {
        if (res.code == 0) {
            uploadPath.value = res.data.path
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// 组件切换
const step = ref(0);
function stepAdd() {
    if (step.value < 3) {
        if (step.value == 2) {
            store(uploadPath.value)
            return false;
        }
        step.value++;
        if (step.value == 2) {
            getList(uploadPath.value)
        }
    }
}
function stepReduce() {
    if (step.value > 0) {
        step.value--;
        if (step.value == 2) {
            getList(uploadPath.value)
        }
    }
}

// 获取文件数据
const custom_data_info = ref([])
function getList(path) {
    loading.value = true
    httpRequest({
        url: config.interface.GetCustomCSVOverviewHandler,
        method: 'post',
        data: {
            'path': path
        }
    }).then((res) => {
        if (res.code == 0) {
            custom_data_info.value.start_time = res.data.start_time
            custom_data_info.value.end_time = res.data.end_time
            custom_data_info.value.total_count = res.data.total_count
            custom_data_info.value.income_count = res.data.income_count
            custom_data_info.value.income_amount = res.data.income_amount
            custom_data_info.value.expense_count = res.data.expense_count
            custom_data_info.value.expense_amount = res.data.expense_amount
            custom_data_info.value.none_count = res.data.none_count
            custom_data_info.value.none_amount = res.data.none_amount
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// 存储数据
function store(path) {
    loading.value = true
    httpRequest({
        url: config.interface.StoreCustomCSVInfoHandler,
        method: 'post',
        data: {
            'path': path
        }
    }).then((res) => {
        if (res.code == 0) {
            step.value++;
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}
</script>