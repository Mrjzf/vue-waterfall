'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// path是node.js的路径模块，用来处理路径统一的问题
const path = require('path')

module.exports = {
  dev: {

    // 引入当前目录下的dev.env.js，用来指明开发环境，详见(2)
    env: require('./dev.env'),
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    // 下面是dev-server的端口号，可以自行更改
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // 下面表示是否打开浏览器
    autoOpenBrowser: true,
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //配置ip
      '/market/': {
        target: 'http://192.168.100.203:8094',
      }
    },

    errorOverlay: false, //查询错误
    notifyOnErrors: true, //通知错误
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    // 给人觉得没必要用这个，css出了问题，直接控制台不就完事了
    cssSourceMap: false
  },


  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/xstp/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin

    // 下面是是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
    productionGzip: false,
    // 下面定义要压缩哪些类型的文件
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 下面是用来开启编译完成后的报告，可以通过设置值为true和false来开启或关闭
    // 下面的process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
