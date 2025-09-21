<template>
    <v-stepper elevation="0" :model-value="step" show-actions>
        <v-stepper-header class="elevation-0">
            <v-stepper-item color="primary" class="elevation-0" :complete="step >= 1">
                <div class="d-flex align-center">
                    <div class="text-h4 font-weight-light mr-2">01</div>
                    <div>
                        <div class="text-subtitle-2 font-weight-bold">导出账单</div>
                        <div class="text-subtitle-2 text-grey-500">在微信中导出账单到邮箱</div>
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
                                    第一步：打开微信
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(1)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在微信App选择 “我”，然后点击 “服务”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-2" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第二步：进入钱包
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(2)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在新的页面中点击“钱包”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-3" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第三步：进入客服中心
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(3)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在新的页面中点击右上角的“账单”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-4" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第四步：下载账单
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(4)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在新的页面中点击“下载账单”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-5" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第五步：用于个人对账
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(5)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在新的页面中点击 “用于个人对账”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-6" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第六步：确认邮箱地址
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(6)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>在新的页面中输入要接收导出数据的电子邮箱地址，然后点击 “发送”.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-7" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第七步：下载账单文件
                                    <v-icon class="text-h6 ml-2 cursor-pointer float-right"
                                        @click="previewImage(7)">mdi-file-cloud-outline</v-icon>
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>打开邮箱，下载由支付宝发送的账单压缩包，密码可以在支付宝App “消息” 中查看.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item dot-color="primary" icon="mdi-numeric-8" fill-dot class="w-100">
                            <v-card class="w-100" density="compact">
                                <v-card-title class="text-h6 bg-primary">
                                    第八步：上传账单文件
                                </v-card-title>
                                <v-card-text class="text-primary mt-2">
                                    <p>直接下载文件无需解压，在后续步骤中将账单文件上传.</p>
                                </v-card-text>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </v-col>
                <v-col cols="12" v-if="step == 1">
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-file-input accept=".zip,application/zip" variant="underlined" label="上传 ZIP 文件"
                                v-model="billZip" :loading="loading" density="compact" hide-details />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field label="压缩包密码，可不填" variant="underlined" v-model="zipPassword"
                                :loading="loading" density="compact" hide-details></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-alert :border="'start'" color="" title="温馨提示" variant="tonal">
                                <p>请上传压缩包及密码（如有）</p>
                                <p>上传压缩包后，即可进行下一步操作</p>
                                <p class="mt-3">在微信 App 导出账单后，系统消息中会收到压缩包解压密码</p>
                                <p>如有密码，可选择填写以加快账单读取速度</p>
                                <p>若密码不便填写，也可留空，系统将自动尝试解锁压缩包，过程可能需要约 20–60 秒，请耐心等待</p>
                            </v-alert>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" v-if="step == 2" class="d-flex align-center justify-center">
                    <v-card-text class="text-subtitle-2 bg-background" style="max-width: 400px;">
                        <div class="d-flex justify-space-between mt-1 mb-1">
                            <span class="text-medium-emphasis">微信昵称</span>
                            <span class="text-primary font-weight-bold">{{ wechat_data_info.nickname }}</span>
                        </div>
                        <div class="d-flex justify-space-between mt-1 mb-1">
                            <span class="text-medium-emphasis">起始时间</span>
                            <span class="text-primary font-weight-bold">{{ wechat_data_info.start_time }}</span>
                        </div>
                        <div class="d-flex justify-space-between mt-1 mb-1">
                            <span class="text-medium-emphasis">终止时间</span>
                            <span class="text-primary font-weight-bold">{{ wechat_data_info.end_time }}</span>
                        </div>
                        <div class="d-flex justify-space-between mt-1 mb-1">
                            <span class="text-medium-emphasis">导出时间</span>
                            <span class="text-primary font-weight-bold">{{ wechat_data_info.export_time }}</span>
                        </div>
                        <div class="d-flex justify-space-between mt-1 mb-1">
                            <span class="text-medium-emphasis">导出类型</span>
                            <span class="text-primary font-weight-bold">{{ wechat_data_info.export_type }}</span>
                        </div>
                        <v-divider class="my-2"></v-divider>
                        <div class="d-flex justify-space-between mt-1 mb-1">
                            <span class="text-medium-emphasis">总记录数</span>
                            <span class="text-primary font-weight-bold">{{ wechat_data_info.total_records }}</span>
                        </div>
                        <div class="d-flex justify-space-between mt-1 mb-1">
                            <span class="text-medium-emphasis">收入</span>
                            <span class="text-primary font-weight-bold">{{ wechat_data_info.income_count }} 笔 / ¥{{
                                wechat_data_info.income_amount }}</span>
                        </div>
                        <div class="d-flex justify-space-between mt-1 mb-1">
                            <span class="text-medium-emphasis">支出</span>
                            <span class="text-primary font-weight-bold">{{ wechat_data_info.expense_count }} 笔 / ¥{{
                                wechat_data_info.expense_amount }}</span>
                        </div>
                        <div class="d-flex justify-space-between mt-1 mb-1">
                            <span class="text-medium-emphasis">不计收支</span>
                            <span class="text-primary font-weight-bold">{{ wechat_data_info.neutral_count }} 笔 / ¥{{
                                wechat_data_info.neutral_amount }}</span>
                        </div>
                    </v-card-text>
                </v-col>
                <v-col cols="12" v-if="step == 3">
                    <v-empty-state color="primary" icon="mdi-check" text="数据已同步到平台，关闭窗口进行查看"
                        title="已完成上传"></v-empty-state>
                </v-col>
                <v-col cols="12 d-flex">
                    <v-btn elevation="0" v-if="step < 3" :loading="loading" color="grey" text
                        @click="stepReduce">上一步</v-btn>
                    <v-btn elevation="0" v-if="step < 3" :loading="loading" color="primary" class="ml-auto" text
                        @click="stepAdd">下一步</v-btn>
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
import config from '@/static/config';
import httpRequest from '@/static/request.js';
import { showSnackbar } from '@/static/useSnackbar.js'
import demoImage1 from '@/assets/bill/wechat/0001.png'
import demoImage2 from '@/assets/bill/wechat/0002.png'
import demoImage3 from '@/assets/bill/wechat/0003.png'
import demoImage4 from '@/assets/bill/wechat/0004.png'
import demoImage5 from '@/assets/bill/wechat/0005.jpg'
import demoImage6 from '@/assets/bill/wechat/0006.jpg'
import demoImage7 from '@/assets/bill/wechat/0007.png'

const loading = ref(false)

// 上传文件
const billZip = ref(null)
const zipPassword = ref(null)
const uploadPath = ref('')
async function uploadZip() {
    if (!billZip.value) return
    const formData = new FormData()
    formData.append('file', billZip.value)
    formData.append('zip_salt', zipPassword.value ? zipPassword.value : '')
    loading.value = true
    uploadPath.value = ''
    httpRequest({
        url: config.interface.UploadWeChatZIPHandler,
        method: 'post',
        data: formData,
        file: true,
        timeout: 600000
    }).then((res) => {
        if (res.code == 0) {
            uploadPath.value = res.data.path
            step.value++;
            getList(uploadPath.value)
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
        if (step.value == 1) {
            uploadZip()
            return false;
        }
        if (step.value == 2) {
            store(uploadPath.value)
            return false;
        }
        step.value++;
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
const wechat_data_info = ref([])
function getList(path) {
    loading.value = true
    httpRequest({
        url: config.interface.GetWeChatXLSXOverviewHandler,
        method: 'post',
        data: {
            'path': path
        }
    }).then((res) => {
        if (res.code == 0) {
            wechat_data_info.value.end_time = res.data.end_time
            wechat_data_info.value.expense_amount = res.data.expense_amount
            wechat_data_info.value.expense_count = res.data.expense_count
            wechat_data_info.value.export_time = res.data.export_time
            wechat_data_info.value.export_type = res.data.export_type
            wechat_data_info.value.income_amount = res.data.income_amount
            wechat_data_info.value.income_count = res.data.income_count
            wechat_data_info.value.neutral_amount = res.data.neutral_amount
            wechat_data_info.value.neutral_count = res.data.neutral_count
            wechat_data_info.value.nickname = res.data.nickname
            wechat_data_info.value.start_time = res.data.start_time
            wechat_data_info.value.total_records = res.data.total_records
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
        url: config.interface.StoreWechatXLSXInfoHandler,
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
        case 7:
            imageUrl.value = demoImage7
            break;
        default:
            return false
            break;
    }
    imageDialog.value = true
}
</script>