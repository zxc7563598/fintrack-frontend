<script setup>
import { ref, watch } from 'vue'
import PaymentMethodSettings from '@/components/settings/application/PaymentMethodSettings.vue'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    option: { type: String, required: true },
})

// 框架数据
const tabs = ref(null)
const loading = ref(false)

// 窗口启动状态
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
                <div class="text-h5 mt-4 font-weight-bold">应用设置</div>
            </template>
            <template #text>
                <div class="d-flex flex-column flex-md-row">
                    <v-tabs v-model="tabs" color="primary" direction="vertical" spaced="end">
                        <v-tab prepend-icon="mdi-laptop-account" text="账户分类整理" value="payment_method"></v-tab>
                    </v-tabs>
                    <v-tabs-window v-model="tabs" class="flex-fill">
                        <v-tabs-window-item value="payment_method">
                            <PaymentMethodSettings />
                        </v-tabs-window-item>
                    </v-tabs-window>
                </div>
            </template>
        </v-card>
    </v-dialog>
</template>
