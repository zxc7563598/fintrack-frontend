<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <v-snackbar v-model="snackbar.visible" :timeout="snackbar.timeout" :color="snackbar.color" variant="tonal">
        <div class="font-weight-bold">{{ snackbar.text }}</div>
        <template #actions>
          <v-btn variant="text" @click="snackbar.visible = false">关闭</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>


<script setup>
import { snackbar } from './static/useSnackbar.js'
</script>
<style>
html {
  font-size: 14px;
}
</style>