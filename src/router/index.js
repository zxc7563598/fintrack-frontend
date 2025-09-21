// 1 引入所需方法
// 路由创建：createRouter
// 路由模式(两者任选其一)：createWebHistory - history模式、createWebHashHistory - hash模式
// RouteRecordRaw：意为路由原始信息 （使用vue3+js的不用引入）
import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router';
import config from '@/static/config';
import BaseLayout from '@/components/BaseLayout.vue';
import Details from '@/pages/details.vue';
import Statistics from '@/pages/statistics.vue';
import Home from '@/pages/home.vue';
let defaultMeta = [
    { name: "viewport", content: "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover" },
    { name: "application-name", content: config.name },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "theme-color", content: "#ffffff" }
];

let defaultTitle = config.name
// 设置路由规则
const routes = [{
    path: '/',
    component: BaseLayout,
    children: [
        {
            name: 'home',
            path: '',
            component: Home,
        },
        {
            name: 'details',
            path: 'details',
            component: Details,
        },
        {
            name: 'statistics',
            path: 'statistics',
            component: Statistics,
        },
    ]
}, {
    path: '/login',
    component: () => import('../pages/login.vue'),
    meta: {
        title: defaultTitle,
        metaTags: defaultMeta
    }
}, {
    path: '/register',
    component: () => import('../pages/register.vue'),
    meta: {
        title: defaultTitle,
        metaTags: defaultMeta
    }
}, {
    // 定义404路由
    path: '/404',
    component: () => import('../pages/notfound.vue'),
    meta: {
        title: defaultTitle,
        metaTags: defaultMeta
    }
}, {
    // 匹配为定义路由然后重定向到404页面
    path: '/:pathMath(.*)',
    redirect: '/404'
}];

// 设置路由
const router = createRouter({
    routes,
    history: createWebHistory()
    // history: createWebHashHistory()
});

// 导出路由
export default router;