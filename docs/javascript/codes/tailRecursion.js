// 尾递归

// 普通递归
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

// 尾递归优化
function factorialTailRecursion(n, acc = 1) {
  if (n === 1) return acc;
  return factorialTailRecursion(n - 1, n * acc);
}

console.time("普通递归");
console.log(factorial(1000)); // 120
console.timeEnd("普通递归");

console.time("尾递归");
console.log(factorialTailRecursion(1000)); // 120
console.timeEnd("尾递归");

// 应用场景：数组求和
function sumArray(arr, total) {
  if (arr.length === 0) {
    return total;
  }
  return sumArray(arr, total + arr.pop());
}

console.log(sumArray([1, 2, 3, 4, 5], 0)); // 15

// 斐波那契数列
function fibonacci(n, start = 1, end = 1) {
  if (n <= 2) {
    return end;
  }
  return fibonacci(n - 1, end, start + end);
}
console.log(fibonacci(10)); // 55
console.log(fibonacci(2)); // 2

// 数组扁平化
function flatten(arr) {
  if (arr.length === 0) {
    return [];
  }
  const [first, ...rest] = arr;
  if (Array.isArray(first)) {
    return flatten([...first, ...rest]);
  }
  return [first, ...flatten(rest)];
}
console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]

// 数组去重
function unique(arr) {
  if (arr.length === 0) {
    return [];
  }
  const [first, ...rest] = arr;
  if (rest.includes(first)) {
    return unique(rest);
  }
  return [first, ...unique(rest)];
}
console.log(unique([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]

// 数组求最大值
function max(arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  const [first, ...rest] = arr;
  return Math.max(first, max(rest));
}
console.log(max([1, 2, 3, 8, 4, 5])); // 5

// 数组求最小值
function min(arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  const [first, ...rest] = arr;
  return Math.min(first, min(rest));
}
console.log(min([1, 2, 3, 8, 4, 5])); // 1

// 数组对象格式化
function formatArray(arr) {
  if (arr.length === 0) {
    return [];
  }
  const [first, ...rest] = arr;
  return [{ id: first }, ...formatArray(rest)];
}
console.log(formatArray([1, 2, 3, 4, 5])); // [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]

// 对象key格式化
function keyLowerCase(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let reg = /[A-Z]/g;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let temp = obj[key];
      if (reg.test(key.toString())) {
        temp = obj[
          key.replace(reg, function (result) {
            return result.toLowerCase();
          })
        ] = obj[key];
        // 删除之前大写的key
        delete obj[key];
      }
      if (typeof temp === "object") {
        keyLowerCase(temp);
      }
    }
  }
  return obj;
}
let obj = {
  a: "1",
  b: {
    c: "2",
    D: {
      EadV: "3",
    },
  },
};
console.log(keyLowerCase(obj)); // { a: '1', b: { c: '2', d: { e: '3' } } }
