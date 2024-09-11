# 深拷贝

## 题目

请实现一个`deepClone`函数，该函数能够深拷贝一个对象或数组，包括其嵌套的对象和数组。

## 要求

1. 支持普通对象、数组、`Date`、`RegExp`等内置类型的深拷贝。
2. 考虑到循环引用的情况，避免无限递归。
3. 尽可能高效地实现。

## 解答示例

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 处理非对象或数组类型
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 处理日期和正则对象
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 处理循环引用
  if (hash.has(obj)) return hash.get(obj);

  // 初始化拷贝的目标对象或数组
  let cloneObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, cloneObj);

  // 遍历对象的所有属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归拷贝每个属性
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  // 返回拷贝后的对象
  return cloneObj;
}

// 测试用例
const original = {
  date: new Date(),
  reg: /abc/g,
  num: 0,
  str: "",
  bool: true,
  undef: undefined,
  nullVal: null,
  arr: [1, 2, 3],
  obj: { a: 1, b: 2 },
  // 循环引用
  self: null,
};
original.self = original;

const cloned = deepClone(original);
console.log(cloned === original); // false
console.log(cloned.date === original.date); // false
console.log(cloned.reg === original.reg); // false
console.log(cloned.self === cloned); // true
```

## 注意事项

1. **性能**：深拷贝可能会非常消耗性能，特别是当对象非常大或嵌套很深时。在可能的情况下，考虑使用其他数据结构或方法来避免深拷贝。

2. **特殊对象**：上述实现没有处理所有可能的特殊对象（如`Map`、`Set`、`Function`等）。在实际应用中，你可能需要根据需要扩展这个函数以支持这些类型。

3. **循环引用**：使用`WeakMap`来存储已经拷贝过的对象，以避免循环引用导致的无限递归。`WeakMap`的键是对象引用，且这些引用是“弱保持”的，这意味着如果没有其他引用指向对象，则对象仍然可以被垃圾回收。

4. **原型链**：上述实现没有拷贝对象的原型链。如果需要拷贝原型链，可以使用`Object.create(Object.getPrototypeOf(obj))`来创建具有相同原型链的新对象。然而，这通常不是深拷贝的常规需求。
