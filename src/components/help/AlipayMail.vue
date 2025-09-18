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
                        <div class="text-subtitle-2 font-weight-bold">选择邮箱</div>
                        <div class="text-subtitle-2 text-grey-500">请选邮箱以便读取账单</div>
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
        <v-container>
            <v-row>
                <v-col cols="12" v-if="step == 0">
                    <v-list>
                        <v-list-item>1 - 在支付宝App选择 “我的”，然后点击 “账单”</v-list-item>
                        <v-list-item>2 - 在新的页面中点击右上角打开菜单，然后选择 “开具交易流水证明”</v-list-item>
                        <v-list-item>3 - 在新的页面中选择 “用于个人对账”，然后点击 “申请”</v-list-item>
                        <v-list-item>4 - 在新的页面中设置导出的交易时间范围，然后点击 “下一步”</v-list-item>
                        <v-list-item>5 - 在新的页面中输入要接收导出数据的电子邮箱地址，然后点击 “发送”</v-list-item>
                        <v-list-item>6 - 若上一步提交成功，会在新的页面提示申请已提交，然后点击 “完成”</v-list-item>
                        <v-list-item>7 - 邮件发送完成后，点击 “下一步”，导入账单</v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="12" v-if="step == 1">
                    <v-row dense>
                        <v-col cols="12">
                            <v-alert :border="'start'" color="" title="温馨提示" variant="tonal">
                                <p>绑定邮箱后即可直接从邮箱获取账单，无需手动上传</p>
                                <p>邮箱可以
                                    <a href="javascript:;" class="text-primary font-weight-bold text-decoration-none"
                                        @click="applicationSettingsDialog = true">
                                        点击此处
                                    </a>
                                    或在右上角应用设置中进行绑定
                                </p>
                                <p class="mt-2">如果你已经绑定了邮箱但是当前页面没有展示，可以
                                    <a href="javascript:;" class="text-primary font-weight-bold text-decoration-none"
                                        @click="getEmailList">
                                        点击此处
                                    </a>
                                    进行刷新
                                </p>
                            </v-alert>

                        </v-col>
                        <v-col cols="12" md="4" v-for="(item, index) in userEmailData" :key="index">
                            <v-card variant="flat" :color="item.id == emailID ? 'primary' : ''" :title="item.email"
                                :subtitle="item.imap" @click="emailID = item.id"></v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12 d-flex">
                    <v-btn elevation="0" v-if="step < 4" :loading="loading" color="grey" text
                        @click="stepReduce">上一步</v-btn>
                    <v-btn elevation="0" v-if="step < 4" :loading="loading" color="primary" class="ml-auto" text
                        @click="stepAdd">下一步</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <ApplicationSettings v-model="applicationSettingsDialog" :option="'email'"></ApplicationSettings>
    </v-stepper>
</template>
<script setup>
import { ref } from 'vue'
import config from '@/static/config';
import httpRequest from '@/static/request.js';
import { showSnackbar } from '@/static/useSnackbar.js'
import ApplicationSettings from '@/components/settings/ApplicationSettings.vue'

const loading = ref(false)
const applicationSettingsDialog = ref(false)

// 组件切换
const step = ref(0);
function stepAdd() {
    if (step.value < 4) {
        if (step.value == 1) {
            if (emailID.value > 0) {
                // 获取邮箱信息
                getEmailBill()
            } else {
                showSnackbar({ text: '请选择邮箱', color: 'error', timeout: 2000 })
            }
            return
        }
        step.value++;
        if (step.value == 1) {
            getEmailList()
        }
    }
}

function stepReduce() {
    if (step.value > 0) {
        step.value--;
        if (step.value == 1) {
            getEmailList()
        }
    }
}

// 获取已经绑定的邮件信息
const userEmailData = ref([]);
const emailID = ref(null)
function getEmailList() {
    loading.value = true
    httpRequest({
        url: config.interface.GetUserEmailsHandler,
        method: 'post',
        data: {},
    }).then((res) => {
        if (res.code == 0) {
            emailID.value = null
            userEmailData.value = [];
            res.data.list.forEach((item) => {
                userEmailData.value.push({
                    'id': item.id,
                    'email': item.email,
                    'imap': item.imap
                })
            })
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// 获取邮件信息
function getEmailBill() {
    loading.value = true
    httpRequest({
        url: config.interface.GetAlipayBillMailHandler,
        method: 'post',
        data: {
            "id": emailID.value
        },
    }).then((res) => {
        if (res.code == 0) {
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}
</script>