module.exports = {
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
        ['@babel/preset-typescript'],
    ],
};
