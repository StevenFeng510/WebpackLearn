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

也可以新建一个文件 `.browserslistsrc` 直接写入配置项

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
