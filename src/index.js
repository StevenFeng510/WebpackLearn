import { sum, square } from './js/utils.js';
// 使用css-loader处理css文件
// import 'css-loader!../css/login.css';
import './css/login.css';
import './css/login.less';
import './css/test.css';
import './js/Image';

const getInfo = require('./js/api.js');

console.log(sum(10, 5));
console.log(square(10));

console.log(JSON.stringify(getInfo()));
