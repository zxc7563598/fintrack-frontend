export default {
    name: "财务管理系统",
    baseUrl: "http://127.0.0.1:9090",
    interface: {
        LoginRegisterHandler: '/api/register',
        LoginHandler: '/api/login',
        RefreshTokenHandler: '/api/refresh-token',
        AssetOverviewHandler: '/api/asset-overview',
        UploadAlipayCSVHandler: '/api/file/alipay/upload',
        GetAlipayCSVOverviewHandler: '/api/file/alipay/overview',
        StoreAlipayCSVInfoHandler: '/api/file/alipay/store',
        GetBillListHandler: '/api/bills',
        GetBillInfoHandler: '/api/bills/info',
        StoreBillRecordHandler: '/api/bills/save',
        DeleteBillRecordHandler: '/api/bills/delete',
    }
}
