import { sum, square } from './js/utils.js';
const getInfo = require('./js/api.js');

console.log(sum(10, 5));
console.log(square(10));

console.log(JSON.stringify(getInfo()));
