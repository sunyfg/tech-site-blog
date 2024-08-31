# Object.values()

`Object.values()` 方法是 JavaScript ES2017 (ECMAScript 2017) 引入的一个静态方法，用于返回一个给定对象自身所有的可枚举属性值的数组，数组中属性值的顺序与使用 `for...in` 循环遍历该对象时返回的顺序一致（即属性的枚举顺序）。但需要注意的是，其顺序在 ES2015 中被正式定义为遵循对象属性被创建的顺序，这在大多数现代 JavaScript 引擎中早已是事实行为。

## 语法

```javascript
const values = Object.values(obj);
```

- `obj`：需要返回其可枚举属性值的对象。

## 返回值

一个包含对象自身的所有可枚举属性值的数组。

## 特性

- 返回的数组中的元素顺序与对象属性的顺序相同。
- 只会返回对象自身的可枚举属性值，不会返回原型链上的属性。
- 如果对象的某个属性值是一个符号（Symbol），则该值也会被包含在返回的数组中。

## 使用场景

1. **当你需要获取对象所有值的数组时**：这在处理对象数据，尤其是需要将对象值作为数组元素进行迭代或操作时非常有用。
2. **与 `Object.keys()` 或 `Object.entries()` 结合使用**：可以灵活处理对象，获取键、值或键值对的数组。
3. **简化对象属性的处理**：在需要将对象属性作为数组元素进行进一步处理时，可以避免手动遍历对象。

## 代码示例

```javascript
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
};

// 使用 Object.values() 获取所有属性值
const values = Object.values(person);
console.log(values); // 输出: ['Alice', 30, 'New York']

// 遍历并打印每个值
values.forEach((value) => {
  console.log(value);
});

// 与 Object.keys() 结合使用，获取键值对
const keys = Object.keys(person);
keys.forEach((key) => {
  console.log(`${key}: ${person[key]}`);
});

// 使用 Object.entries() 直接获取键值对数组
const entries = Object.entries(person);
console.log(entries); // 输出: [['name', 'Alice'], ['age', 30], ['city', 'New York']]

entries.forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

在这个例子中，`Object.values(person)` 返回了一个包含 `person` 对象所有可枚举属性值的数组。然后，我们展示了如何使用 `forEach` 方法遍历这个数组，并打印出每个值。此外，还展示了如何与 `Object.keys()` 和 `Object.entries()` 结合使用，以不同的方式处理对象属性。
