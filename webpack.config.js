// CommonJS语法
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // 入口文件
    entry: path.join(__dirname, 'src', 'index.js'),
    // 输出
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js', // 文件名称
        // assetModuleFilename: 'img/[name].[hash:4].[ext]',
    },
    // HtmlWebpackPlugin 插件配置生成html的模板
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
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
            // 处理css文件配置
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
            // 处理less文件配置
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
            // 处理图片配置
            {
                //     test: /\.(png|svg|gif|jpe?g)$/,
                //     // use: [
                //     //     {
                //     //         loader: 'file-loader',
                //     //         options: {
                //     //             esModule: false, // 不转为 esModule
                //     //         },
                //     //     },
                //     // ],
                //     /*     use: [
                //         {
                //             loader: 'file-loader',
                //             options: {
                //                 name: '[name].[hash:6].[ext]',
                //                 outputPath: 'img',
                //             },
                //         },
                //     ], */
                //     use: [
                //         {
                //             loader: 'url-loader',
                //             options: {
                //                 name: 'img/[name].[hash:6].[ext]',
                //                 limit: 25 * 1024,
                //             },
                //         },
                //     ],
            },
            // {
            //     test: /\.(png|svg|gif|jpe?g)$/,
            //     type: 'asset/inline',
            //     /* generator: {
            //         // 指定打包资源的输出
            //         filename: 'img/[name].[hash:4][ext]',
            //     }, */
            // },

            // {
            //     test: /\.(png|svg|gif|jpe?g)$/,
            //     type: 'asset/inline',
            //     /* generator: {
            //         // 指定打包资源的输出
            //         filename: 'img/[name].[hash:4][ext]',
            //     }, */
            // },

            {
                test: /\.(png|svg|gif|jpe?g)$/,
                type: 'asset',
                generator: {
                    // 指定打包资源的输出
                    filename: 'img/[name].[hash:4][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 1024,
                    },
                },
            },
            // asset 处理字体配置
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name].[hash:3][ext]',
                },
            },

            // 处理js 文件配置
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        // 预设配置
                        options: {
                            preset: ['@babel/preset-env'],
                        },
                    },
                ],
            },
        ],
    },
};
