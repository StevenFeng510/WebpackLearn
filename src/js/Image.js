import OimgSrc from '../img/logo.png';

function packImg() {
    // 创建容器元素
    const oEle = document.createElement('div');

    // 创建img标签, 设置src 属性
    const oImg = document.createElement('img');
    oImg.width = 100;
    // oImg.src = require('../img/logo.png').default; // .default 方法
    // oImg.src = require('../img/logo.png');  // 在webpack中配置
    oImg.src = OimgSrc;
    oEle.appendChild(oImg);

    return oEle;
}

document.body.appendChild(packImg());
