const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 9090,
    },
    //解决build打包的时候 dist文件里面css、js、img路径错误错误的问题
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
})
