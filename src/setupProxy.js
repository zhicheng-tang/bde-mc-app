const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            //target: 'http://101.132.121.147:5604',
            target: 'http://localhost:5604',
            pathRewrite: {
                '^/api': '/',
            },
        })
    );
};
