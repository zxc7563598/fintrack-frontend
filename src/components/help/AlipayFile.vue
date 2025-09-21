<template>
    <v-stepper elevation="0" :model-value="step" show-actions>
        <v-stepper-header class="elevation-0">
            <v-stepper-item color="primary" class="elevation-0" :complete="step >= 1">
                <div class="d-flex align-center">
                    <div class="text-h4 font-weight-light mr-2">01</div>
                    <div>
                        <div class="text-subtitle-2 font-weight-bold">导出账单</div>
                        <div class="text-subtitle-2 text-grey-500">在支付宝中导出账单到邮箱</div>
                    </div>
                </div>
            </v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item color="primary" class="elevation-0" :complete="step >= 2">
                <div class="d-flex align-center">
                    <div class="text-h4 font-weight-light mr-2">02</div>
                    <div>
                        <div class="text-subtitle-2 font-weight-bold">上传文件</div>
                        <div class="text-subtitle-2 text-grey-500">上传交易数据文件</div>
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
                                <v-card-title class="text-h6 bg-primary">
                                    第一步：打开支付宝
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(1)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在支付宝App选择 “我的”，然后点击 “账单”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-2" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第二步：开局交易流水证明
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(2)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在新的页面中点击右上角打开菜单，然后选择 “开具交易流水证明”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-3" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第三步：用于个人对账
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(3)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在新的页面中选择 “用于个人对账”，然后点击 “申请”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-4" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第四步：选择交易时间
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(4)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在新的页面中设置导出的交易时间范围，然后点击 “下一步”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-5" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第五步：确认邮箱地址
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(5)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在新的页面中输入要接收导出数据的电子邮箱地址，然后点击 “发送”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-6" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第六步：下载账单文件
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(6)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>打开邮箱，下载由支付宝发送的账单压缩包，密码可以在支付宝App “消息” 中查看.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-7" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第七步：上传账单文件
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>解压文件，得到 csv 账单文件，在后续步骤中将账单文件上传.</p>
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
                                class="text-medium-emphasis">姓名</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.name }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">支付宝账户</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.alipay_account }}</span>
                        </div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">起始时间</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.start_time }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">终止时间</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.end_time }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">交易类型</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.trade_type }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">导出时间</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.export_time }}</span></div>
                        <v-divider class="my-2"></v-divider>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">总记录数</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.total_count }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">收入</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.income_count }} 笔 / ¥{{
                                    alipay_data_info.income_amount }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">支出</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.expense_count }} 笔 / ¥{{
                                    alipay_data_info.expense_amount }}</span></div>
                        <div class="d-flex justify-space-between mt-1 mb-1"><span
                                class="text-medium-emphasis">不计收支</span><span class="text-primary font-weight-bold">{{
                                    alipay_data_info.none_count }} 笔 / ¥{{
                                    alipay_data_info.none_amount }}</span></div>
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
    <v-dialog v-model="imageDialog" max-width="80wh">
        <v-img :src="imageUrl" max-height="70vh" max-width="80wh" contain @click="imageDialog = false"></v-img>
    </v-dialog>
</template>
<script setup>
import { ref } from 'vue'
import config from '../../static/config';
import httpRequest from '../../static/request.js';
import { showSnackbar } from '../../static/useSnackbar.js'
import demoImage1 from '@/assets/bill/alipay/0001.png'
import demoImage2 from '@/assets/bill/alipay/0002.png'
import demoImage3 from '@/assets/bill/alipay/0003.jpg'
import demoImage4 from '@/assets/bill/alipay/0004.jpg'
import demoImage5 from '@/assets/bill/alipay/0005.jpg'
import demoImage6 from '@/assets/bill/alipay/0006.png'

const loading = ref(false)

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
        url: config.interface.UploadAlipayCSVHandler,
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
const alipay_data_info = ref([])
function getList(path) {
    loading.value = true
    httpRequest({
        url: config.interface.GetAlipayCSVOverviewHandler,
        method: 'post',
        data: {
            'path': path
        }
    }).then((res) => {
        if (res.code == 0) {
            alipay_data_info.value.name = res.data.name
            alipay_data_info.value.alipay_account = res.data.alipay_account
            alipay_data_info.value.start_time = res.data.start_time
            alipay_data_info.value.end_time = res.data.end_time
            alipay_data_info.value.trade_type = res.data.trade_type
            alipay_data_info.value.export_time = res.data.export_time
            alipay_data_info.value.total_count = res.data.total_count
            alipay_data_info.value.income_count = res.data.income_count
            alipay_data_info.value.income_amount = res.data.income_amount
            alipay_data_info.value.expense_count = res.data.expense_count
            alipay_data_info.value.expense_amount = res.data.expense_amount
            alipay_data_info.value.none_count = res.data.none_count
            alipay_data_info.value.none_amount = res.data.none_amount
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
        url: config.interface.StoreAlipayCSVInfoHandler,
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

// 步骤预览
const imageUrl = ref('')
const imageDialog = ref(false)
function previewImage(num) {
    switch (num) {
        case 1:
            imageUrl.value = demoImage1
            break;
        case 2:
            imageUrl.value = demoImage2
            break;
        case 3:
            imageUrl.value = demoImage3
            break;
        case 4:
            imageUrl.value = demoImage4
            break;
        case 5:
            imageUrl.value = demoImage5
            break;
        case 6:
            imageUrl.value = demoImage6
            break;
        default:
            return false
            break;
    }
    imageDialog.value = true
}
</script>