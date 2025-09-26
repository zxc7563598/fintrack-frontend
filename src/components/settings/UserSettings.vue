<script setup>
import { ref, watch } from 'vue'
import DeepseekSettings from '@/components/settings/user/DeepseekSettings.vue'
import UserInfoSettings from '@/components/settings/user/UserInfoSettings.vue'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    option: { type: String, required: true },
})

// 窗口启动状态
const tabs = ref(null)
const emit = defineEmits(['update:modelValue'])
const isActive = ref(props.modelValue)
watch(() => props.modelValue, (v) => {
    isActive.value = v
    if (isActive.value) {
        // 加载数据
        tabs.value = props.option
    } else {
        // 清空状态
    }
})
watch(isActive, (v) => { emit('update:modelValue', v) })
</script>

<template>
    <v-dialog v-model="isActive" max-width="1000">
        <v-card>
            <template #title>
                <div class="text-h5 mt-4 font-weight-bold">用户设置</div>
            </template>
            <template #text>
                <div class="d-flex flex-column flex-md-row">
                    <v-tabs v-model="tabs" color="primary" direction="vertical" spaced="end">
                        <v-tab prepend-icon="mdi-laptop-account" text="账号配置" value="user"></v-tab>
                        <v-tab prepend-icon="mdi-laptop-account" text="AI配置" value="deepseek"></v-tab>
                    </v-tabs>
                    <v-tabs-window v-model="tabs" class="flex-fill">
                        <v-tabs-window-item value="user">
                            <UserInfoSettings />
                        </v-tabs-window-item>
                        <v-tabs-window-item value="deepseek">
                            <DeepseekSettings />
                        </v-tabs-window-item>
                    </v-tabs-window>
                </div>
            </template>
        </v-card>
    </v-dialog>
</template>
