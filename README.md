# Webpack 快速入门

## 基本使用

在`webpack.config.js`中配置必要的配置项

## loader 的使用

### 用于处理打包各种类型(css,js 等)文件

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

## browserslist

**
1 工程化
2 兼容性 css js
3 如何实现兼容 Babel 等
4 到底要兼容那些平台 edge  
**

caniuse.com 查看兼容性 >1%市场占有率 的主流浏览器

```cmd
npx browserslist // 会罗列出市场主流的浏览器和最新的版本
```

常见配置:
default >0.5% 市场占有率 和 最新的两个版本
dead 24 个月没有公司支持 没有更新
last 2 version

```js
   // 在webpack.config.js 中配置
   "browserslist": [
       ">1%",
       "last 2 version",
       "not dead"
   ]
```

也可以新建一个文件 `.browserslistrc` 直接写入配置项

```js
'>1%';
'last 2 version';
'not dead';
```

## postcss

-   `postcss` 是什么: JavaScript 转换样式的工具
-   less(less-loader) --> css --> css-loader

```cmd
yarn add postcss -d         // 安装postcss
yarn add postcss-cli -d     // 安装post-cli 可以在命令行中使用postcss命令

npx postcss -o ret.css ./src/css/test.css  // -o 表示处理后的css 为XXX.css
```

还需要安装 `autoprefixer` 添加为适配不同浏览器而添加前缀

```cmd
npx postcss --use autoprefixer
```

## postcss-loader

配置 modules 时需要注意处理顺序

postcss 在 css-loader 之前处理 -> css-loader -> style-loader

-   postcss-preset-env (预设 -- 插件集合) 集成了很多 css 打包的插件

使用`postcss-loader`时候的`webpack`里面的配置

```js
   {
        test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                         postcssOptions: {
                            plugins: [
                                //require('autoprefixer'),
                                'postcss-preset-env' // 有了预设就不需要单独配置autoprefixer
                            ],
                         },
                    },
                },
            ],
   },
```

> 重复配置`postcss-loader` 会显得`webpack`配置文件过于冗长, 则可以单独新建`postcss.config.js` 文件

```js
module.exports = {
    plugins: [require('postcss-preset-env')],
};
```

配置完之后直接在 `webpack.config.js` 使用 postcss-loader 就可以了

## importLoaders

css-loader 中的配置项
用于处理 css 文件中, @import 之后的 css 文件

```js
    // importLoaders 用于 重复调用postcss-loader 处理import的css文件
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
            },
        },
        'postcss-loader',
    ],

```

## file-loader

用于处理图片

打包图片:

-   img src
    -   使用 require 导入图片, 此时如果不配置 esModule: false, 则需.default 导出
    -   也可以在配置中设置 esModule: false
    -   采用 import xxx from 图片资源, 此时可以直接使用 xxx
-   background url

file-loader 可以处理导入的静态资源(图片 动图等)src 值

## 设置图片名称

占位符含义

-   [ext] : 扩展名
-   [name] : 文件名
-   [hash]: 文件内容 命名 生成 hash 值
-   [contentHash]:
-   [hash:<length>] : 有条件的 hash 值 '按长度'
-   [path] : 路径

```js
 use: [
     {
         loader: 'file-loader',
         options: {
             name: 'img/[name].[hash:6].[ext]',
             // outputPath: 'img', // 不简写
         },
     },
 ],
```

## url-loader 处理图片

```js
 use: [
     {
         loader: 'url-loader',
         options: {
             name: 'img/[name].[hash:6].[ext]',
             // outputPath: 'img', // 不简写
         },
     },
 ],
```

-   1 url-loader base64 uri 文件当中, 减少请求次数
-   2 file-loader 将资源拷贝至指定的目录, 分开请求
-   3 url-loader 内部其实也可以调用 file-loader
-   4 limit

## asset 处理图片

asset module type

-   1 asset/resource --> file-loader ( 输出路径 )
-   2 asset/inline --> url-loader (所有 data uri)
-   3 asset/source --> raw-loader
-   4 asset (parser dataUrlCondition)

可以在 output 中直接配置 asset 的输出路径
// assetModuleFilename: 'img/[name].[hash:4].[ext]',

```js
 {
     test: /\.(png|svg|gif|jpe?g)$/,
     type: 'asset/resource',
     generator: {
         // 指定打包资源的输出
         filename: 'img/[name].[hash:4][ext]',
     },
 },
```

## asset 处理字体

asset/resource 将打包好的字体文件 放在 font 里

```js
{
    test: /\.(ttf|woff2?)$/,
    type: 'asset/resource',
    generator: {
        filename: 'font/[name].[hash:3][ext]',
    },
},
```

## webpack 插件使用

-   1 loader: 对特定类型的 转换
-   2 plugin: 做更多的事情 ( html 模板 | 自动删除 dist 等 )

```cmd
// 安装可以自动删除dist文件的插件
yarn add clear-webpack-plugin -d
```

## html-webpack-plugin 使用

```js
// 要先导入插件
const htmlWebpackPlugin = require('html-webpack-plugin');
```

```js
// 实例化对象就能使用
new htmlWebpackPlugin({
     template: path.join(__dirname, 'src', 'index.html'),
     filename: 'index.html',
}),
```

## copy-webpack-plugin

将资源在打包的时候, 复制到指定的文件夹

```js
 new CopyWebpackPlugin({
     patterns: [
         {
             from: 'public',
             globOptions: {
                 // 表示不复制index.html文件
                 ignore: ['**/index.html'],
             },
         },
     ],
 }),
```

> e.g 将 public 整个文件夹直接复制到 dist 文件夹中

## Babel

用于处理 JS 兼容

-   1 为什么需要 Babel?
    JSX TS ES6+ 需要兼容 --> 浏览器平台直接使用

```cmd
// 安装babel核心
yarn add @babel/core -d

// 安装babel工具  如果要在命令行中使用babel
yarn add @babel/cli -d

// 安装babel转换js为es5语法的插件
yarn add @babel/plugin-transform-arrow-functions -d
.. @babel/plugin-transform-block-scoping  //const 转换var
.. @babel/preset -env -d // babel 预设 包含许多语法转换插件
```

## Babel-loader

```sh
// 安装babel-loader处理js
yarn add babel-loader -d
```

自定义 babel 配置 (需要哪些转换插件)

```js
    // 处理js 文件配置
 {
     test: /\.js$/,
     use: [
         {
             loader: 'babel-loader',
             // 需要配置一下babel的一些插件
             options: {
                 plugins: [
                     '@babel/plugin-transform-arrow-functions',
                     '@babel/plugin-transform-block-scoping',
                 ],
             },
         },
     ],
 },
```

```js
 {
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            // 预设配置 (插件集合)
            options: {
                presets: ['@babel/preset-env'],
                // 指定兼容浏览器
             /*    presets: [
                    [
                        '@babel/preset-env',
                        //{ targets: 'chrome 91' }
                    ]
                ], */
            },
        },
    ],
},
```

> babel 打包也会根据`.browserslistrc`里面的配置, 来兼容不同的浏览器

babel-loader 相关的配置文件

-   babel.config.js(json cjs mjs) 可以单独配置 babel 的配置项
-   babelrc.json(js)

## polyfill 配置

用于更全面的转换 js 语法, 兼容更多的浏览器(填充)

-   1 可以按需配置
-   2 @babel/polyfill(Babel 7.4.0 版本开始被弃用) --> (建议安装)core-js/stable (符合 ECMA)regenerator-runtime(需要转换包含 generator 的方法)

-   @babel/polyfill **x 不建议直接安装 polyfill**
-   core-js
-   regenerator-runtime

需要在入口文件中导入

```js
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

然后在`babel.config.js`中配置

```js
 presets: [
        [
            '@babel/preset-env',
            {
                // 默认值false 表示不对当前的JS处理做polyfill 的填充
                // usage: 依据用户源代码当中所使用到的新语法进行填充
                // entry: 依据当前筛选出来的浏览器决定填充
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
    ],
```

## webpack-dev-server

watch 打包模式

在`package.json`中, webpack(build)中添加`--watch`
在`webpack.config.js`中添加 `watch: true`

不足

-   1 所有源代码都会重新编译
-   2 每次编译成功之后都需要进行文件读写()
-   3 live-server
-   4 不能实现局部刷新

webpack-dev-server

```js
// webpack-dev-server
devServer: {
    port: 8000,
    static: path.join(__dirname, 'dist'),
},
```

## webpack-dev-middleware

利用 `webpack-dev-middleware` 和 `express` 进行本地服务器配置

配置`Server.js`文件

在`webpack.config.js`中配置 `"serve": "webpack serve"`

```js
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const app = express();

// 获取配置文件
const config = require('./webpack.config.js');
const complier = webpack(config);

app.use(webpackDevMiddleware(complier));

// 开启宽口服务
app.listen(80, () => {
    console.log('服务器运行在80端口');
});
```

## HMR 功能

```js
// webpack-dev-server
devServer: {
    // 热更新设定为true 表示开启
    hot: true,
    port: 8000,
    static: path.join(__dirname, 'dist'),
},
```

```js
// 入口文件中 配置需要开启热更新的组件
// 需要热更新的组件
if (module.hot) {
    module.hot.accept(['./js/title.js'], () => {
        console.log('title模块被更新');
    });
}
```

`webpack.config.js`中配置, `target: 'web'` 表示开发中掠过兼容浏览器配置文件

## vue 组件支持热更新

```js
 // 处理vue文件的配置
{
    test: /\.vue$/,
    use: ['vue-loader'],
},
```

```sh
yarn add vue@2.6.14
yarn add vue-loader@14
yarn add vue-template-compiler@2.6.14
```
