// 使用css-loader处理css文件
// import 'css-loader!../css/login.css';
import './js/Font';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const title = '前端';
const foo = () => {
    console.log(title);
};

const p1 = new Promise((resolve, reject) => {
    console.log(111);
});
console.log(p1);

foo();
