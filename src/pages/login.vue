<template>
    <v-container fluid class="auth-wrapper pa-0">
        <v-row no-gutters>
            <!-- 左侧图片区域 (大屏显示) -->
            <v-col cols="12" md="8" class="d-none d-md-flex align-center justify-center position-relative">
                123123
            </v-col>

            <!-- 右侧登录卡片 -->
            <v-col cols="12" md="4" class="d-flex flex-column justify-center h-screen bg-surface">
                <div class="d-flex align-center w-100 pb-4 justify-center">
                    <v-img height="56" width="56" inline src="@/assets/logo.png" />
                </div>
                <div class="text-h5 font-weight-medium pl-9">欢迎使用{{ config.name }}</div>
                <v-form ref="formRef" v-model="formValid" class="pl-9 pr-9 mt-6 w-100">
                    <v-text-field :loading="loading" color="primary" density="compact" label="电子邮箱" variant="outlined"
                        class="mt-4" :rules="emailRules" v-model="email" type="email"></v-text-field>
                    <v-text-field :loading="loading" color="primary" density="compact" label="密码" variant="outlined"
                        class="mt-4" type="password" :rules="passwordRules" v-model="password"></v-text-field>
                    <div class="mt-4 w-100 d-flex">
                        <a href="javascript:;" class="text-primary ml-auto text-decoration-none">忘记密码？</a>
                    </div>
                    <v-btn variant="flat" color="primary" class="mt-4" block @click="loginHandler"
                        :loading="loading">登陆</v-btn>
                    <div class="mt-4 w-100 d-flex align-center justify-center">
                        还没有账号？
                        <a href="/register" class="text-primary text-decoration-none">创建新账号</a>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="on-background">
        <div class="text-error font-weight-bold">{{ text }}</div>
        <template v-slot:actions>
            <v-btn variant="text" @click="snackbar = false">
                关闭
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import config from '../static/config';
import httpRequest from '../static/request.js';
import { showSnackbar } from '../static/useSnackbar.js'

const router = useRouter();

// 表单信息
const formRef = ref(null)
const formValid = ref(false)
const loading = ref(false)
// 输入验证
const email = ref('')
const emailRules = ref([
    value => {
        if (!value || value.length === 0) return '邮箱信息不能为空'
        return true
    }
])
const password = ref('')
const passwordRules = ref([
    value => {
        if (!value || value.length < 8) return '密码不能小于8位'
        return true
    }
])

function loginHandler() {
    loading.value = true
    formRef.value.validate().then(isValid => {
        if (isValid.valid) {
            httpRequest({
                url: config.interface.LoginHandler,
                method: 'post',
                data: {
                    'email': email.value,
                    'password': password.value
                },
            }).then((res) => {
                if (res.code == 0) {
                    loading.value = false;
                    localStorage.setItem('access_token', res.data.access_token)
                    localStorage.setItem('refresh_token', res.data.refresh_token)
                    router.push('/')
                } else {
                    showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
                }
            }).finally(() => {
                loading.value = false;
            })
        } else {
            loading.value = false;
        }
    })
}

</script>