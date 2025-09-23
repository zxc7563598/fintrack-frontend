<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app class="navigation-body bg-background">
            <v-app-bar-title v-if="drawer">
                <div class="d-flex flex-row align-center ml-5" style="height:64px;">
                    <v-img height="28" width="28" inline src="@/assets/logo.png" />
                    <div class="ml-3">{{ config.name }}</div>
                </div>
            </v-app-bar-title>
            <v-list>
                <div v-for="(item, i) in menuItems" :key="i">
                    <v-list-item :ripple="false" v-if="item.path" :value="item" color="primary" slim :to="item.path"
                        :active="route.path === item.path" active-class="elevation-3"
                        class="rounded-te-pill rounded-be-pill mt-1 mr-2">
                        <template v-slot:prepend v-if="item.icon">
                            <v-icon :icon="item.icon" style="margin-left: 9px;"></v-icon>
                        </template>
                        <v-list-item-title v-text="item.title"
                            :class="route.path === item.path ? 'font-weight-bold' : ''"></v-list-item-title>
                    </v-list-item>
                    <div v-else class=" mt-4 mb-4 pr-16">
                        <v-divider>{{ item.title }}</v-divider>
                    </div>
                </div>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app flat class="app-header bg-background">
            <v-app-bar-nav-icon @click="drawer = !drawer" v-if="!drawer"></v-app-bar-nav-icon>
            <v-app-bar-title v-if="!drawer">
                <div class="d-flex flex-row">
                    <v-img height="28" width="28" inline src="@/assets/logo.png" />
                    <div class="ml-3">{{ config.name }}</div>
                </div>
            </v-app-bar-title>
            <template v-slot:append>
                <v-menu width="200">
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-account-outline" color="primary" v-bind="props" class="mr-3"></v-btn>
                    </template>
                    <v-list>
                        <v-list-item :value="'user'" slim prepend-icon="mdi-account-cog-outline" color="primary"
                            @click="userSettingsDialog = true">
                            <v-list-item-title>用户设置</v-list-item-title>
                        </v-list-item>
                        <v-list-item :value="'application'" slim prepend-icon="mdi-cog-outline" color="primary"
                            @click="applicationSettingsDialog = true">
                            <v-list-item-title>应用设置</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item :value="'loginout'" slim prepend-icon="mdi-account-arrow-down-outline"
                            color="primary">
                            <v-list-item-title @click="logOut">退出登录</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>
        <v-main class="app-main">
            <router-view />
        </v-main>
    </v-app>
    <UserSettings v-model="userSettingsDialog" :option="'user'"></UserSettings>
    <ApplicationSettings v-model="applicationSettingsDialog" :option="'payment_method'"></ApplicationSettings>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import config from '@/static/config';
import UserSettings from '@/components/settings/UserSettings.vue'
import ApplicationSettings from '@/components/settings/ApplicationSettings.vue'

const router = useRouter();
const route = useRoute()

// 控制菜单展示
const drawer = ref(false)
onMounted(() => {
    if (window.innerWidth >= 1280) {
        drawer.value = true
    }
})

// 控制菜单内容
const menuItems = [
    { title: '总览', icon: 'mdi-home-analytics', path: '/' },
    { title: '交易数据' },
    { title: '交易详情', icon: 'mdi-list-status', path: '/details' },
    { title: '统计分析', icon: 'mdi-circle-slice-5', path: '/statistics' },
]

// 控制弹窗
const userSettingsDialog = ref(false)
const applicationSettingsDialog = ref(false)

function logOut() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/login')
}
</script>
