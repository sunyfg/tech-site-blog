// 深拷贝
function deepClone(obj, hash = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  // 日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  // 正则表达式
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // 如果hash中有这个对象，则直接返回
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 获取对象构造函数
  let cloneObj = new obj.constructor();
  // 将对象存入hash中
  hash.set(obj, cloneObj);
  // 遍历对象
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

// 测试
const obj = {
  a: 1,
  b: {
    c: 2,
  },
  d: [1, 2, 3],
  e: new Date(),
  f: /abc/,
  g: function () {},
};
const cloneObj = deepClone(obj);
console.log(cloneObj);
console.log(cloneObj === obj); // false
console.log(cloneObj.b === obj.b); // false
console.log(cloneObj.d === obj.d); // false
console.log(cloneObj.e === obj.e); // false
console.log(cloneObj.f === obj.f); // false
console.log(cloneObj.g === obj.g); // true
console.log(cloneObj.g); // [Function: g]
console.log(cloneObj.f.test("abc")); // true
console.log(cloneObj.e); // 2021-08-23T06:57:49.937Z
console.log(cloneObj.d); // [ 1, 2, 3 ]
console.log(cloneObj.b); // { c: 2 }
console.log(cloneObj.a); // 1
