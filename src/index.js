// 使用css-loader处理css文件
// import 'css-loader!../css/login.css';
import './js/Font';
// import './css/login.css';
// import Vue from 'vue';
// import App from './App.vue';
import './js/title';
import axios from 'axios';

// 需要热更新的组件
if (module.hot) {
    module.hot.accept(['./js/title.js'], () => {
        console.log('title模块被更新');
    });
}

/* new Vue({
    render: (h) => h(App),
}).$mount('#root'); */

console.log(3333333444444);

axios
    .get('/api/users')
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.error(err);
    });
