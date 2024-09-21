// 浮点数精度丢失问题

// 问题分析：在JavaScript中，浮点数是以64位IEEE 754标准表示的，这种表示方式无法精确表示某些十进制小数，因此会出现精度丢失问题。

// 原因：计算机中存储浮点数时，会将其转换为二进制表示，而二进制无法精确表示某些十进制小数，因此会出现精度丢失问题。

// 解决方案：使用第三方库，如decimal.js、bignumber.js等，或者手动实现精确计算函数。

// 精确加法
function add(num1, num2) {
  const num1Digits = (num1.toString().split(".")[1] || "").length;
  const num2Digits = (num2.toString().split(".")[1] || "").length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}

console.log(0.1 + 0.2); // 0.30000000000000004
console.log(add(0.1, 0.2)); // 0.3
console.log(add(0.1, 0.2) === 0.3); // true
