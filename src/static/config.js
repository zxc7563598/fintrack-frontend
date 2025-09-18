export default {
    name: "财务管理系统",
    baseUrl: "http://127.0.0.1:9090",
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
        GetAlipayCSVOverviewHandler: '/api/file/alipay/overview',
        StoreAlipayCSVInfoHandler: '/api/file/alipay/store',
        GetBillListHandler: '/api/bills',
        GetBillInfoHandler: '/api/bills/info',
        StoreBillRecordHandler: '/api/bills/save',
        DeleteBillRecordHandler: '/api/bills/delete',
    }
}
