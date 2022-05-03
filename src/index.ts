const title: string = '前端开发';

const foo = (msg: string) => {
    console.log(msg);
};

const p1 = new Promise((resolve, reject) => {
    resolve(console.log(111));
});

foo(title);
