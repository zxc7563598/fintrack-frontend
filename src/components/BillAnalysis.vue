<template>
    <v-dialog v-model="isActive" max-width="600">
        <v-card>
            <v-card-title class="text-h5 mt-4 font-weight-bold text-center">
                账单报告
            </v-card-title>
            <v-card-text class="pa-6">
                <div v-if="props.content === ''" class="d-flex justify-center align-center flex-column"
                    style="height: 200px;">
                    <div ref="lottieBox" style="width: 150px; height: 150px;"></div>
                    报告生成中...大约需要30秒左右...
                </div>
                <div v-else class="text-body-1" style="line-height: 1.7;white-space: pre-line;">
                    <p v-for="(line, index) in props.content.split('\n')" :key="index" class="mb-2">
                        {{ line }}
                    </p>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, watch, nextTick } from 'vue'
import animationData from '@/assets/loading.json';
import lottie from "lottie-web";

const lottieBox = ref(null);

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    content: { type: String, required: false },
})

// 窗口启动状态
const emit = defineEmits(['update:modelValue'])
const isActive = ref(props.modelValue)
watch(() => props.modelValue, async (v) => {
    isActive.value = v
    if (isActive.value) {
        await nextTick()
        loadingLoad()
    }
})
watch(isActive, (v) => { emit('update:modelValue', v) })

function loadingLoad() {
    lottie.loadAnimation({
        container: lottieBox.value,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData
    });
}
</script>