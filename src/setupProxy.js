const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://139.224.234.170:5604',
            //target: 'http://localhost:5604',
            pathRewrite: {
                '^/api': '/',
            },
        })
    );
};
