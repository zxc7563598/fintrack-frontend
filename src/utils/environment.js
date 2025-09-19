/**
 * 环境检测工具
 * 用于检测应用运行在哪种模式下
 */

/**
 * 检测当前运行环境
 * @returns {string} 'wails' | 'web'
 */
export function detectEnvironment() {
    // 检查是否在Wails环境中运行
    if (window.runtime && window.runtime.Window) {
        return 'wails'
    }
    
    // 检查构建时定义的模式
    if (typeof __WAILS_MODE__ !== 'undefined' && __WAILS_MODE__) {
        return 'wails'
    }
    
    // 检查URL参数或环境变量
    const urlParams = new URLSearchParams(window.location.search)
    const mode = urlParams.get('mode') || import.meta.env.VITE_APP_MODE || 'web'
    
    return mode
}

/**
 * 检查是否在Wails环境中运行
 * @returns {boolean}
 */
export function isWailsMode() {
    return detectEnvironment() === 'wails'
}

/**
 * 检查是否在Web环境中运行
 * @returns {boolean}
 */
export function isWebMode() {
    return detectEnvironment() === 'web'
}

/**
 * 获取环境信息
 * @returns {object}
 */
export function getEnvironmentInfo() {
    const mode = detectEnvironment()
    
    return {
        mode,
        isWails: mode === 'wails',
        isWeb: mode === 'web',
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        location: window.location.href
    }
}

/**
 * 打印环境信息到控制台（仅开发环境）
 */
export function logEnvironmentInfo() {
    if (import.meta.env.DEV) {
        const info = getEnvironmentInfo()
        console.log('🌍 环境信息:', info)
    }
}
