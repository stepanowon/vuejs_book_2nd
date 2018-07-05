module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://sample.bmaster.kro.kr',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    }
}