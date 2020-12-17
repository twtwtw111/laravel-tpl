module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://laravel-tpl:8888',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
}
