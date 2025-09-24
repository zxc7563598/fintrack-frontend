<script setup>
import { onMounted, ref } from 'vue'
import config from '@/static/config';
import httpRequest from '@/static/request.js';
import { showSnackbar } from '@/static/useSnackbar.js'

// APIKEY配置
const loading = ref(false)

const formRef = ref(null)
const formValid = ref(false)
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
        if (value.length > 0 && value.length < 8) return '密码不能小于8位'
        return true
    }
])
const check_password = ref('')
const checkPasswordRules = ref([
    value => {
        if (password.value.length > 0 && (!value || value.length === 0)) return '确认密码不能为空'
        if (password.value.length > 0 && value !== password.value) return '两次输入的密码不一致'
        return true
    }
])
function getUserInfo() {
    loading.value = true
    httpRequest({
        url: config.interface.GetUserInfoHandler,
        method: 'post',
        data: {},
    }).then((res) => {
        if (res.code == 0) {
            name.value = res.data.name
            email.value = res.data.email
            password.value = ''
            check_password.value = ''
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// 存储方法
function storeUserInfo() {
    loading.value = true
    formRef.value.validate().then(isValid => {
        if (isValid.valid) {
            httpRequest({
                url: config.interface.StoreUserInfoHandler,
                method: 'post',
                data: {
                    "name": name.value,
                    "email": email.value,
                    "password": password.value
                }
            }).then((res) => {
                if (res.code == 0) {
                    showSnackbar({ text: '保存成功', color: 'success', timeout: 2000 })
                    getUserInfo()
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

onMounted(() => {
    getUserInfo()
})
</script>

<template>
    <v-card flat>
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <v-form ref="formRef" v-model="formValid">
                        <v-text-field label="昵称" color="primary" variant="underlined" v-model="name" :rules="nameRules">
                            <template #prepend-inner="slotProps">
                                <v-icon color="primary">mdi-account</v-icon>
                            </template>
                        </v-text-field>
                        <v-text-field label="邮箱" color="primary" variant="underlined" v-model="email"
                            :rules="emailRules">
                            <template #prepend-inner="slotProps">
                                <v-icon color="primary">mdi-email</v-icon>
                            </template>
                        </v-text-field>
                        <v-text-field label="密码" color="primary" variant="underlined" type="password" v-model="password"
                            :rules="passwordRules">
                            <template #prepend-inner="slotProps">
                                <v-icon color="primary">mdi-lock</v-icon>
                            </template>
                        </v-text-field>
                        <v-text-field label="确认密码" color="primary" variant="underlined" type="password"
                            v-model="check_password" :rules="checkPasswordRules">
                            <template #prepend-inner="slotProps">
                                <v-icon color="primary">mdi-lock</v-icon>
                            </template>
                        </v-text-field>
                    </v-form>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="12">
                    <v-btn block color="primary" class="mt-2" :loading="loading" @click="storeUserInfo">保存变更</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>