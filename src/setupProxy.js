const {createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
    // app.use(createProxyMiddleware("/devApi", {
    app.use(createProxyMiddleware([process.env.REACT_APP_API], {
        // target: "http://www.web-jshtml.cn/api/react", //配置请求服务器地址
        target: process.env.REACT_APP_BASE_URL, 
        changeOrigin: true,
        pathRewrite: {
            // "^/devApi": " ",
            [`^${process.env.REACT_APP_API}`]: " "
        },
    }))

    /*
        1.匹配到devApi, 开始做代理 "http://www.web-jshtml.cn/api/react"
        2./devApi/login/ => /login/
        3.替换之后的地址：http://www.web-jshtml.cn/api/react/login/
    */
    // app.use(proxy("/manage.api",{
    //     target: "http://admintest.happymmall.com:7000",
    //     changeOrigin: true,
    // }))
};