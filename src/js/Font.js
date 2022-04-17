import '../font/iconfont.css';

function packFont() {
    const oEle = document.createElement('div');

    const oSpan = document.createElement('span');
    oSpan.className = 'iconfont os-icon-camera';
    oEle.appendChild(oSpan);

    return oEle;
}

document.body.appendChild(packFont());
