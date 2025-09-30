<script setup>
import { onMounted, ref } from 'vue'
import config from '@/static/config';
import httpRequest from '@/static/request.js';
import { showSnackbar } from '@/static/useSnackbar.js'

// 获取配置信息
const userSettingsDialog = ref(false)
const loading = ref(false)
const payment_method = ref([])

function getPaymentMethod() {
    loading.value = true
    httpRequest({
        url: config.interface.GetPaymentMethodHandler,
        method: 'post',
        data: {},
    }).then((res) => {
        if (res.code == 0) {
            payment_method.value = []
            res.data.payment_method.forEach((item) => {
                payment_method.value.push({
                    "key": item,
                    "value": ""
                })
            })
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// 分类整理获取
function organizePaymentMethod() {
    loading.value = true
    httpRequest({
        url: config.interface.OrganizePaymentMethodHandler,
        method: 'post',
        data: {},
        timeout: 600000
    }).then((res) => {
        if (res.code == 0) {
            let payment_method_key = []
            payment_method.value.forEach((item, index) => {
                payment_method_key[item.key] = index
            })
            Object.entries(res.data.list).forEach(([key, newValue]) => {
                payment_method.value[payment_method_key[key]].value = newValue
            });
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// 存储方法
function storePaymentMethod() {
    loading.value = true
    httpRequest({
        url: config.interface.StorePaymentMethodHandler,
        method: 'post',
        data: {
            "payment_method": payment_method.value,
        }
    }).then((res) => {
        if (res.code == 0) {
            showSnackbar({ text: '保存成功', color: 'success', timeout: 2000 })
            getPaymentMethod()
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

onMounted(() => {
    getPaymentMethod()
})
</script>

<template>
    <v-card flat>
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <v-alert :border="'start'" color="" title="温馨提示" variant="tonal">
                        <p>此功能需要先设置 AI 密钥才能使用，您可以<b class="text-primary" @click="userSettingsDialog = true">点击这里</b>去设置
                        </p>
                        <p>开启后，系统会为您自动整理交易方式，把相似或重复的名称进行合并</p>
                        <p>让您在查看统计图时更直观、更清晰</p>
                    </v-alert>
                </v-col>
                <v-col cols="12" class="d-flex">
                    <div class="text-h5 font-weight-bold mt-2 mb-2">账户分类</div>
                    <v-btn size="small" color="primary" class="ml-auto mt-auto mb-auto" prepend-icon="mdi-owl"
                        :loading="loading" @click="organizePaymentMethod">AI自动整理</v-btn>
                </v-col>
            </v-row>
            <v-row dense v-for="(item, index) in payment_method" :key="index">
                <v-col cols="5">
                    <v-text-field density="compact" v-model="item.key" variant="outlined" disabled hide-details
                        color="primary" :loading=loading></v-text-field>
                </v-col>
                <v-col cols="2" class="d-flex align-center justify-center">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-col>
                <v-col cols="5">
                    <v-text-field density="compact" v-model="item.value" variant="outlined" hide-details color="primary"
                        :loading=loading></v-text-field>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="12">
                    <v-btn block color="primary" class="mt-2" :loading="loading"
                        @click="storePaymentMethod">保存变更</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <UserSettings v-model="userSettingsDialog" :option="'deepseek'"></UserSettings>
</template>