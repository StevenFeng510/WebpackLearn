import oImgSrc from '../img/logo.png';
import '../css/img.css';

function packImg() {
    // 1创建容器元素
    const oEle = document.createElement('div');

    // 2创建img标签, 设置src 属性
    const oImg = document.createElement('img');
    oImg.width = 100;
    // oImg.src = require('../img/logo.png').default; // .default 方法
    // oImg.src = require('../img/logo.png');  // 在webpack中配置
    oImg.src = oImgSrc;
    oEle.appendChild(oImg);

    // 3 设置背景图片
    const oBgImg = document.createElement('div');
    oBgImg.className = 'bgBox';
    oEle.appendChild(oBgImg);

    return oEle;
}

document.body.appendChild(packImg());
