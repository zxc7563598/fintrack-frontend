<template>
    <v-container fluid class="auth-wrapper pa-0">
        <v-row no-gutters>
            <!-- 左侧图片区域 (大屏显示) -->
            <v-col cols="12" md="8" class="d-none d-md-flex align-center justify-center position-relative">
                <v-img width="80%" inline src="@/assets/login.svg" />
            </v-col>

            <!-- 右侧登录卡片 -->
            <v-col cols="12" md="4" class="d-flex flex-column justify-center h-screen bg-surface">
                <div class="d-flex align-center w-100 pb-4 justify-center">
                    <v-img height="56" width="56" inline src="@/assets/logo.png" />
                </div>
                <div class="text-h5 font-weight-medium pl-9">欢迎使用{{ config.name }}</div>
                <v-form ref="formRef" v-model="formValid" class="pl-9 pr-9 mt-6 w-100">
                    <v-text-field :loading="loading" color="primary" density="compact" label="名称" variant="outlined"
                        :rules="nameRules" v-model="name"></v-text-field>
                    <v-text-field :loading="loading" color="primary" density="compact" label="电子邮箱" variant="outlined"
                        class="mt-4" :rules="emailRules" v-model="email" type="email"></v-text-field>
                    <v-text-field :loading="loading" color="primary" density="compact" label="密码" variant="outlined"
                        class="mt-4" type="password" :rules="passwordRules" v-model="password"></v-text-field>
                    <v-text-field :loading="loading" color="primary" density="compact" label="确认密码" variant="outlined"
                        class="mt-4" type="password" :rules="checkPasswordRules"
                        v-model="check_password"></v-text-field>
                    <v-btn :disabled="!formValid" variant="flat" color="primary" class="mt-4" block
                        @click="registerHandler" :loading="loading">注册账号</v-btn>
                    <div class="mt-4 w-100 d-flex align-center justify-center">
                        已有账号
                        <a href="javascript:;" @click="router.push('/login')"
                            class="text-primary text-decoration-none">直接登录</a>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import config from '@/static/config';
import httpRequest from '@/static/request.js';
import { showSnackbar } from '@/static/useSnackbar.js'
import { useRouter } from 'vue-router';

const router = useRouter();

// 表单信息
const formRef = ref(null)
const formValid = ref(false)
const loading = ref(false)
// 输入验证
const name = ref('')
const nameRules = ref([
    value => {
        if (!value || value.length === 0) return '名称不能为空'
        return true
    }
])
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
const check_password = ref('')
const checkPasswordRules = ref([
    value => {
        if (!value || value.length === 0) return '确认密码不能为空'
        if (value !== password.value) return '两次输入的密码不一致'
        return true
    }
])

function registerHandler() {
    loading.value = true
    formRef.value.validate().then(isValid => {
        if (isValid.valid) {
            httpRequest({
                url: config.interface.LoginRegisterHandler,
                method: 'post',
                data: {
                    'name': name.value,
                    'email': email.value,
                    'password': password.value
                },
            }).then((res) => {
                if (res.code == 0) {
                    loading.value = false;
                    loginHandler()
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