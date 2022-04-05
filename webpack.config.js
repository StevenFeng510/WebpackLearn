// CommonJS语法
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    // HtmlWebpackPlugin 插件配置生成html的模板
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
    ],
    // webpack-dev-server
    devServer: {
        port: 8000,
        static: path.join(__dirname, 'dist'),
    },
};
