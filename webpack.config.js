// CommonJS语法
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // 入口文件
    entry: path.join(__dirname, 'src', 'index.js'),
    // 输出
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js', // 文件名称
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
    // 匹配规则
    module: {
        rules: [
            // 全写
            // {
            //     test: /\.css$/, // 正则表达式, 匹配需要处理的文件
            //     use: [
            //         {
            //             loader: 'css-loader',
            //         },
            //     ],
            // },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            esModule: false, // 不转为 esModule
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             esModule: false, // 不转为 esModule
                //         },
                //     },
                // ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:6].[ext]',
                            outputPath: 'img',
                        },
                    },
                ],
            },
        ],
    },
};
