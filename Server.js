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
