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
