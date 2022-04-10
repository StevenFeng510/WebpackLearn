# Webpack 快速入门

## 基本使用

在`webpack.config.js`中配置必要的配置项

## 打包各种类型(css,js 等)文件

```js

 // 匹配规则
    module: {
        rules: [
            {
                // 处理css文件
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // style-loader, css-loader 都是用于处理打包css的
                //  loader 处理顺序 从下往上 或 从左往右(先css-loader 再 style-loader)
            },
             {
                // 处理less文件  PS: less-loader 的时候还需要安装less
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },
```
