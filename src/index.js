// 使用css-loader处理css文件
// import 'css-loader!../css/login.css';
// import './js/Font';
import Vue from 'vue';
import App from './App.vue';
import './js/title';

// 需要热更新的组件
if (module.hot) {
    module.hot.accept(['./js/title.js'], () => {
        console.log('title模块被更新');
    });
}

new Vue({
    render: (h) => h(App),
}).$mount('#root');

console.log(3333333444444);
