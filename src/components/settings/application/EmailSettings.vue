<script setup>
import { onMounted, ref } from 'vue'
import config from '@/static/config';
import httpRequest from '@/static/request.js';
import { showSnackbar } from '@/static/useSnackbar.js'

const loading = ref(false)

// 邮箱配置
const userEmailEditIndex = ref(null)
const userEmailData = ref([])
function getUserEmail() {
    loading.value = true
    httpRequest({
        url: config.interface.GetUserEmailsHandler,
        method: 'post',
        data: {},
    }).then((res) => {
        if (res.code == 0) {
            userEmailEditIndex.value = null
            userEmailData.value = [];
            res.data.list.forEach((item) => {
                userEmailData.value.push({
                    'id': item.id,
                    'email': item.email,
                    'auth_code': item.auth_code,
                    'imapService': item.imap,
                    'imap': item.imap,
                    'remark': item.remark,
                })
            })
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// 预设IMAP
const imap = ref([
    { title: 'Gmail', value: 'imap.gmail.com:993' },
    { title: 'Yahoo', value: 'imap.mail.yahoo.com:993' },
    { title: 'iCloud', value: 'imap.mail.me.com:993' },
    { title: 'Outlook', value: 'imap-mail.outlook.com:993' },
    { title: 'QQ', value: 'imap.qq.com:993' },
    { title: '163', value: 'imap.163.com:993' },
    { title: '新浪', value: 'imap.sina.com.cn:993' },
    { title: '阿里云', value: 'imap.aliyun.com:993' },
    { title: 'Zoho', value: 'imap.zoho.com:993' },
    { title: 'Yandex', value: 'imap.yandex.com:993' },
    { title: 'Fastmail', value: 'imap.fastmail.com:993' },
    { title: '其他', value: '' },
])

// 表单编辑中IMAP选择变更调用
function onServiceChange(item) {
    const match = imap.value.find(i => i.value === item.imapService)
    if (match) {
        if (match.value) {
            item.imap = match.value
        }
    } else {
        item.imapService = ''
    }
}

// 表单编辑中IMAP填写变更调用
function onImapChange(item) {
    const match = imap.value.find(i => i.value === item.imap)
    if (match) {
        item.imapService = match.value
    } else if (item.imap && !match) {
        item.imapService = ''
    }
}

// 添加方法
function addUserEmail() {
    if (userEmailEditIndex.value == null) {
        userEmailData.value.push({
            'id': 0,
            'email': '',
            'auth_code': '',
            'imapService': '',
            'imap': '',
            'remark': '',
        })
        userEmailEditIndex.value = userEmailData.value.length - 1
    } else {
        showSnackbar({ text: '请先完成当前正在编辑的配置', color: 'warning', timeout: 2000 })
    }
}

// 编辑方法
function editUserEmail(index) {
    if (userEmailEditIndex.value == null) {
        userEmailEditIndex.value = index
    } else {
        showSnackbar({ text: '请先完成当前正在编辑的配置', color: 'warning', timeout: 2000 })
    }
}

// 存储方法
function saveUserEmail(item) {
    loading.value = true
    httpRequest({
        url: config.interface.StoreUserEmailHandler,
        method: 'post',
        data: {
            "id": item.id,
            "email": item.email,
            "auth_code": item.auth_code,
            "imap": item.imap,
            "remark": item.remark,
        }
    }).then((res) => {
        if (res.code == 0) {
            showSnackbar({ text: '保存成功', color: 'success', timeout: 2000 })
            getUserEmail()
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

// 删除方法
function deleteUserEmail(id) {
    loading.value = true
    httpRequest({
        url: config.interface.DeleteUserEmailHandler,
        method: 'post',
        data: {
            "id": id
        }
    }).then((res) => {
        if (res.code == 0) {
            showSnackbar({ text: '删除成功', color: 'success', timeout: 2000 })
            getUserEmail()
        } else {
            showSnackbar({ text: res.msg, color: 'error', timeout: 2000 })
        }
    }).finally(() => {
        loading.value = false;
    })
}

onMounted(() => {
    getUserEmail()
})
</script>

<template>
    <v-card flat>
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <v-alert :border="'start'" color="" title="温馨提示" variant="tonal">
                        <p>绑定邮箱后可以直接通过邮箱快速导入账单。</p>
                        <p>绑定时确保已开启 IMAP/SMTP 服务，并使用“授权码”作为密码登录。</p>
                        <p>如使用 QQ、163、Gmail 等邮箱，请前往邮箱【设置 → 账户 → 开启服务 → 获取授权码】中开启 IMAP 并生成授权码</p>
                        <p>授权码不同于登录密码。建议使用常用邮箱并保持可用状态。</p>
                        <p>以QQ邮箱为例，授权码获取方式可以参考：
                            <a target="_blank" class="text-primary font-weight-bold text-decoration-none"
                                href="https://wx.mail.qq.com/list/readtemplate?name=app_intro.html#/agreement/authorizationCode">
                                官方文档
                            </a>
                        </p>
                    </v-alert>
                </v-col>
                <v-col cols="12" md="6" v-for="(item, index) in userEmailData" :key="index">
                    <v-card hover class="w-100 fill-height">
                        <v-card-title>
                            <v-text-field label="邮箱地址" variant="underlined" v-model="item.email" :loading="loading"
                                autocomplete="off" :disabled="userEmailEditIndex != index" hide-details></v-text-field>
                        </v-card-title>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" md="4">
                                    <v-select label="IMAP服务" :items="imap" :loading="loading" v-model="item.imapService"
                                        :update:modelValue="onServiceChange(item)" variant="underlined"
                                        :disabled="userEmailEditIndex != index" hide-details></v-select>
                                </v-col>
                                <v-col cols="12" md="8">
                                    <v-text-field label="IMAP地址" variant="underlined" :loading="loading"
                                        autocomplete="off" v-model="item.imap" @input="onImapChange(item)"
                                        :disabled="userEmailEditIndex != index" hide-details></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="授权码" variant="underlined" :loading="loading" autocomplete="off"
                                        v-model="item.auth_code" type="password" :disabled="userEmailEditIndex != index"
                                        hide-details></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="备注" variant="underlined" :loading="loading" autocomplete="off"
                                        v-model="item.remark" :disabled="userEmailEditIndex != index"
                                        hide-details></v-text-field>
                                </v-col>
                            </v-row>
                            <div class="mt-2">
                                <v-btn v-if="userEmailEditIndex == index" color="primary" :loading="loading" text="保存"
                                    variant="outlined" size="small" @click="saveUserEmail(item)"></v-btn>
                                <v-btn v-if="userEmailEditIndex == index" color="warning" :loading="loading"
                                    class="ml-2" text="取消" variant="outlined" size="small"
                                    @click="getUserEmail"></v-btn>
                                <v-btn v-if="userEmailEditIndex != index" color="primary" :loading="loading" text="编辑"
                                    variant="outlined" size="small" @click="editUserEmail(index)"></v-btn>
                                <v-btn v-if="userEmailEditIndex != index" color="error" :loading="loading" text="删除"
                                    class="ml-2" variant="outlined" size="small"
                                    @click="deleteUserEmail(item.id)"></v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card hover class="w-100 fill-height d-flex align-center justify-center" @click="addUserEmail">
                        <v-empty-state color="primary" icon="mdi-plus" title="新增绑定邮箱"></v-empty-state>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>