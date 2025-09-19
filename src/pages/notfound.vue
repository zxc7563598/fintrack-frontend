<template>
  <div class="console-container">
    <h2>浏览器控制台</h2>
    <div class="console-output">
      <div
        v-for="(log, index) in logs"
        :key="index"
        :class="`console-${log.type}`"
      >
        [{{ log.type }}] {{ log.message }}
      </div>
    </div>
    <button @click="clearLogs">清空日志</button>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

const logs = reactive([])

// 保存原始 console 方法
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
}

// 覆写 console 方法
function overrideConsole() {
  ['log', 'warn', 'error', 'info'].forEach(type => {
    console[type] = (...args) => {
      logs.push({ type, message: args.join(' ') })
      originalConsole[type](...args)
    }
  })
}

function clearLogs() {
  logs.splice(0, logs.length)
}

onMounted(() => {
  overrideConsole()
})
</script>

<style scoped>
.console-container {
  padding: 1rem;
  border: 1px solid #ccc;
  max-height: 400px;
  overflow: auto;
  font-family: monospace;
  background: #1e1e1e;
  color: #eee;
}

.console-output {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.console-log {
  color: #eee;
}

.console-warn {
  color: #ffcc00;
}

.console-error {
  color: #ff5555;
}

.console-info {
  color: #55ffcc;
}

button {
  padding: 0.3rem 0.6rem;
  background: #444;
  color: #fff;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #666;
}
</style>
