module.exports = {
    devServer: {
        proxy: {
            '/api': {
                //target: 'http://sample.bmaster.kro.kr:8080',
                target: 'http://contactsvc2.herokuapp.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    }
}