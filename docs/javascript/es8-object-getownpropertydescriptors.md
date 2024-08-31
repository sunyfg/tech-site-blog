# Object.getOwnPropertyDescriptors()

`Object.getOwnPropertyDescriptors()` 方法是 JavaScript ES2017 (ECMAScript 2017) 引入的一个静态方法，它返回指定对象所有自身属性的属性描述符的键值对集合。这个方法对于在对象之间复制属性，同时保持属性的完整描述符（如可枚举性、可配置性、可写性等）非常有用。

## 语法

```javascript
const descriptors = Object.getOwnPropertyDescriptors(obj);
```

- `obj`：需要获取其所有自身属性描述符的对象。

## 返回值

返回一个对象，该对象的属性与指定对象 `obj` 的自身属性相对应，每个属性的值都是该属性的属性描述符。属性描述符是一个对象，它描述了对应属性的特性，如 `value`（属性的值）、`writable`（属性是否可写）、`enumerable`（属性是否可枚举）、`configurable`（属性是否可配置），以及对于访问器属性（getter/setter）的 `get` 和 `set` 函数。

## 特性

- **完整描述符**：返回的属性描述符包含了属性的所有特性，如可枚举性、可配置性、可写性等，以及 getter 和 setter（如果存在）。
- **自身属性**：只返回对象自身的属性描述符，不包括原型链上的属性。
- **符号属性**：如果对象有 Symbol 类型的属性，这些属性的描述符也会被包含在返回的集合中。

## 使用场景

1. **对象克隆**：在需要复制一个对象，同时保持其所有属性的完整描述符时，`Object.getOwnPropertyDescriptors()` 可以与 `Object.defineProperties()` 结合使用来实现深层次的克隆。
2. **属性比较**：检查两个对象是否具有相同的属性和属性描述符。
3. **代理和反射**：在处理代理（Proxy）和反射（Reflect）API 时，确保代理能够正确地模拟原始对象的属性行为。

## 代码示例

```javascript
const obj = {
  prop: "value",
  get accessor() {
    return "accessor value";
  },
  configurable: true,
};

Object.defineProperty(obj, "configurable", {
  value: false,
  writable: false,
  enumerable: true,
  configurable: false,
});

const descriptors = Object.getOwnPropertyDescriptors(obj);

console.log(descriptors);
// 输出可能如下（具体输出可能因环境而异）：
// {
//   prop: {
//     value: 'value',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   accessor: {
//     get: [Function: accessor getter],
//     set: undefined,
//     enumerable: true,
//     configurable: true
//   },
//   configurable: {
//     value: false,
//     writable: false,
//     enumerable: true,
//     configurable: false
//   }
// }

// 使用 Object.defineProperties() 进行对象克隆（浅克隆）
const clone = {};
Object.defineProperties(clone, descriptors);

console.log(clone); // { prop: 'value', accessor: 'accessor value', configurable: false }
```

在这个例子中，`Object.getOwnPropertyDescriptors(obj)` 返回了 `obj` 对象所有自身属性的属性描述符集合。然后，我们可以使用 `Object.defineProperties()` 方法将这个描述符集合应用到另一个对象 `clone` 上，从而实现了一个浅层次的克隆，其中 `clone` 对象具有与 `obj` 对象相同的属性和属性描述符。然而，需要注意的是，这种克隆方式是浅克隆，如果属性值是引用类型（如对象或数组），则 `clone` 和 `obj` 将共享这些引用类型的值。
