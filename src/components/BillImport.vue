<script setup>
import { ref, watch } from 'vue'
import AlipayFile from '@/components/help/AlipayFile.vue'
import AlipayZip from '@/components/help/AlipayZip.vue'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
})

// 选择类型
const billType = ref(null);
const items = [
    {
        title: '支付宝账单文件',
        value: 1,
        subtitle: '由支付宝App导出的交易流水证明.csv文件',
    },
    {
        title: '支付宝账单压缩包',
        value: 2,
        subtitle: '由支付宝App导出的交易流水证明发送到邮箱的.zip压缩包',
    },
    // {
    //     title: '自动读取支付宝账单',
    //     value: 3,
    //     subtitle: '在支付宝App导出交易流水证明到邮箱即可自动获取',
    // },
]

// 窗口启动状态
const emit = defineEmits(['update:modelValue'])
const isActive = ref(props.modelValue)
watch(() => props.modelValue, (v) => {
    isActive.value = v
    if (!isActive.value) {
        billType.value = null
    }
})
watch(isActive, (v) => { emit('update:modelValue', v) })
</script>

<template>
    <v-dialog v-model="isActive" max-width="1000">
        <v-card>
            <template #title>
                <div class="text-h5 mt-4 font-weight-bold text-center">导入账单</div>
            </template>
            <template #text>
                <v-select label="导入账单类型" :items="items" color="primary" variant="underlined" :item-props="true"
                    v-model="billType"></v-select>
                <AlipayFile v-if="billType == 1"></AlipayFile>
                <AlipayZip v-if="billType == 2"></AlipayZip>
            </template>
        </v-card>
    </v-dialog>
</template>
