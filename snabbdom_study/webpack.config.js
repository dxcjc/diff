/*
 * @Author: your name
 * @Date: 2021-04-09 16:57:38
 * @LastEditTime: 2021-04-09 17:12:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \note\vue\diff算法\webpack.config.js
 */
const path = require('path')

module.exports = {
    // 入口
    entry : './src/index.js',
    // 出口
    output: {
        // 虚拟打包路径
        publicPath: 'xuni',
        filename: 'bundle.js'
    },
    devServer: {
        port: 8080,
        contentBase: 'www'
    }

}
