module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://sample.bmaster.kro.kr:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    }
}