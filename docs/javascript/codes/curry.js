// 柯里化
const curry = (fn, ...args) => {
  // 如果参数个数小于等于fn的参数个数，则递归调用curry
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (..._args) => curry(fn, ...args, ..._args);
  }
};

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
