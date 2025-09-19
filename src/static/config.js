import { detectEnvironment, logEnvironmentInfo } from '../utils/environment.js'

// 在开发环境下打印环境信息
logEnvironmentInfo()

// 根据环境获取API基础URL
function getBaseUrl() {
    const mode = detectEnvironment()
    switch (mode) {
        case 'wails':
            return 'http://127.0.0.1:9090'
        case 'web':
        default:
            return import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:9090'
    }
}

// 获取应用标题
function getAppTitle() {
    const mode = detectEnvironment()

    switch (mode) {
        case 'wails':
            return import.meta.env.VITE_APP_TITLE || '财务管理系统'
        case 'web':
        default:
            return import.meta.env.VITE_APP_TITLE || '财务管理系统'
    }
}

export default {
    name: getAppTitle(),
    baseUrl: getBaseUrl(),
    mode: detectEnvironment(),
    interface: {
        LoginRegisterHandler: '/api/register',
        LoginHandler: '/api/login',
        RefreshTokenHandler: '/api/refresh-token',
        AssetOverviewHandler: '/api/asset-overview',
        GetUserEmailsHandler: '/api/user/email',
        StoreUserEmailHandler: '/api/user/email/save',
        DeleteUserEmailHandler: '/api/user/email/delete',
        UploadAlipayCSVHandler: '/api/file/alipay/upload/csv',
        UploadAlipayZIPHandler: '/api/file/alipay/upload/zip',
        UploadWeChatXLSXHandler: '/api/file/wechat/upload/xlsx',
        UploadWeChatZIPHandler: '/api/file/wechat/upload/zip',
        GetWeChatXLSXOverviewHandler: '/api/file/wechat/overview',
        GetAlipayCSVOverviewHandler: '/api/file/alipay/overview',
        StoreAlipayCSVInfoHandler: '/api/file/alipay/store',
        StoreWechatXLSXInfoHandler: '/api/file/wechat/store',
        GetAlipayBillMailHandler: '/api/file/alipay/email',
        GetBillListHandler: '/api/bills',
        GetBillInfoHandler: '/api/bills/info',
        StoreBillRecordHandler: '/api/bills/save',
        DeleteBillRecordHandler: '/api/bills/delete',
    }
}
