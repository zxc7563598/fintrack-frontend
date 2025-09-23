<script setup>
import { onMounted, ref } from 'vue'
import config from '@/static/config';
import httpRequest from '@/static/request.js';
import { showSnackbar } from '@/static/useSnackbar.js'

// APIKEY配置
const loading = ref(false)
const deepseekApiKey = ref('')

function getDeepseekApiKey() {
    loading.value = true
    httpRequest({
        url: config.interface.GetDeepseekApiKeyHandler,
        method: 'post',
        data: {},
    }).then((res) => {
        if (res.code == 0) {
            deepseekApiKey.value = res.data.key
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// 存储方法
function saveDeepseekApiKey() {
    loading.value = true
    httpRequest({
        url: config.interface.StoreDeepseekApiKeyHandler,
        method: 'post',
        data: {
            "key": deepseekApiKey.value,
        }
    }).then((res) => {
        if (res.code == 0) {
            showSnackbar({ text: '保存成功', color: 'success', timeout: 2000 })
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

onMounted(() => {
    getDeepseekApiKey()
})
</script>

<template>
    <v-card flat>
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <v-alert :border="'start'" color="" title="温馨提示" variant="tonal">
                        <p>您可以在 DeepSeek 官网 注册账号，并在 「API Keys」 页面创建属于自己的密钥</p>
                        <p>这个 API Key 只会存储在您的本地配置中，仅供您本人调用 AI 服务使用，不会被他人使用，也不会上传到任何第三方服务器</p>
                        <p>填写完成后，系统就能调用 AI 来自动分类和整理您的账单，减少手动操作</p>
                    </v-alert>
                </v-col>
                <v-col cols="12">
                    <v-text-field label="Deepseek密钥" color="primary" variant="underlined" type="password" v-model="deepseekApiKey">
                        <template #prepend-inner="slotProps">
                            <v-icon color="primary">mdi-cloud-lock</v-icon>
                        </template>
                        <template #append-inner="slotProps">
                            <v-btn color="primary" size="small" :loading="loading" @click="saveDeepseekApiKey">保存</v-btn>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>