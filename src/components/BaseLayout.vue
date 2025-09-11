<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app class="navigation-body">
            <v-app-bar-title v-if="drawer">
                <div class="navigation-body-logo">
                    <v-img height="28" width="28" inline src="@/assets/logo.png" />
                    <div class="navigation-body-logo-title">{{ config.name }}</div>
                </div>
            </v-app-bar-title>
            <v-list>
                <div v-for="(item, i) in menuItems" :key="i">
                    <v-list-item v-if="item.path" :value="item" color="primary" slim :to="item.path"
                        :active="route.path === item.path" active-class="elevation-3"
                        class="rounded-te-pill rounded-be-pill item-list-link">
                        <template v-slot:prepend v-if="item.icon">
                            <v-icon :icon="item.icon" style="margin-left: 9px;"></v-icon>
                        </template>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item>
                    <v-list-subheader v-else v-text="item.title" class="item-list-subheader"></v-list-subheader>
                </div>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app flat class="app-header">
            <v-app-bar-nav-icon @click="drawer = !drawer" v-if="!drawer"></v-app-bar-nav-icon>
            <v-app-bar-title v-if="!drawer">
                <div class="app-header-body">
                    <v-img height="28" width="28" inline src="@/assets/logo.png" />
                    <div class="app-header-body-title">{{ config.name }}</div>
                </div>
            </v-app-bar-title>
        </v-app-bar>
        <!-- 主体内容 -->
        <v-main class="app-main">
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import config from '../static/config';

const route = useRoute()

const drawer = ref(true)
const router = useRouter()

const menuItems = [
    { title: '总览', icon: 'mdi-home-analytics', path: '/' },
    { title: '交易数据' },
    { title: '交易详情', icon: 'mdi-list-status', path: '/details' },
    { title: '统计分析', icon: 'mdi-circle-slice-5', path: '/statistics' },
]

const navigate = (path) => {
    router.push(path)
    drawer.value = true
}
</script>

<style scoped>
:deep(.navigation-body) {
    border: 0;
    background-color: #F5F3FA;
}

:deep(.navigation-body-logo) {
    display: flex;
    flex-direction: row;
    height: 64px;
    margin-left: 20px;
    align-items: center;
}

:deep(.navigation-body-logo-title) {
    margin-left: 10px;
}

:deep(.item-list-link) {
    margin-top: 5px;
    margin-right: 5px;
}

:deep(.item-list-subheader) {
    margin-top: 5px;
}

:deep(.app-header) {
    background: #F5F3FA !important;
}

:deep(.app-header-body) {
    display: flex;
    flex-direction: row;
}

:deep(.app-header-body-title) {
    margin-left: 10px;
}

:deep(.app-main) {
    background: #F5F3FA;
}
</style>
