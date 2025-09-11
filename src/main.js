/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import router from './router/index'

// Styles
import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)
// 在路由切换时修改页面的title和meta标签
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    const metaTags = to.meta.metaTags || []
    metaTags.forEach(tag => {
        const tagElement = document.createElement('meta')
        Object.keys(tag).forEach(key => {
            tagElement.setAttribute(key, tag[key])
        })
        document.head.appendChild(tagElement)
    })
    next()
})
app.use(router)
app.mount('#app')
