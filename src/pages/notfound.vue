<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center text-center">
    <v-icon size="96" color="error">mdi-alert-circle-outline</v-icon>
    <h1 class="display-1 mt-4">404</h1>
    <p class="subtitle-1">抱歉，你访问的页面不存在</p>
    <v-btn color="primary" class="mt-6" @click="goBack">
      返回上一页
    </v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    // 如果没有历史记录，则跳到首页
    router.push('/')
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
