# Object.entries()

`Object.entries()` 方法是 JavaScript ES2017 (ECMAScript 2017) 引入的一个静态方法，它返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致（即属性的枚举顺序）。每个键值对都是一个包含两个元素的数组，其中第一个元素是键名（key），第二个元素是与该键名相关联的值（value）。

## 语法

```javascript
const entries = Object.entries(obj);
```

- `obj`：需要返回其可枚举属性键值对的对象。

## 返回值

一个包含对象自身所有可枚举属性键值对的数组。每个键值对都是一个 `[key, value]` 形式的数组。

## 特性

- 返回的数组中的元素是按照对象属性的枚举顺序排列的。
- 只会返回对象自身的可枚举属性键值对，不会返回原型链上的属性。
- 如果对象的某个属性值是一个符号（Symbol），则该属性也会被包含在返回的数组中。

## 使用场景

1. **当你需要遍历对象的所有键值对时**：`Object.entries()` 提供了一个非常方便的方式来获取并遍历对象的所有键值对。
2. **与 `Object.fromEntries()` 结合使用**：可以将 `Object.entries()` 返回的键值对数组转换回对象，这在处理对象数据转换时非常有用。
3. **与数组方法结合使用**：可以利用数组提供的方法（如 `map`、`filter`、`reduce` 等）对对象的键值对进行复杂的处理。

## 代码示例

```javascript
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
};

// 使用 Object.entries() 获取所有键值对
const entries = Object.entries(person);
console.log(entries); // 输出: [['name', 'Alice'], ['age', 30], ['city', 'New York']]

// 遍历并打印每个键值对
entries.forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// 使用 map 方法处理键值对
const modifiedEntries = entries.map(([key, value]) => [
  key,
  value.toUpperCase(),
]);
console.log(modifiedEntries); // 输出: [['name', 'ALICE'], ['age', '30'], ['city', 'NEW YORK']]

// 与 Object.fromEntries() 结合使用，将键值对数组转换回对象
const modifiedPerson = Object.fromEntries(modifiedEntries);
console.log(modifiedPerson); // 输出: { name: 'ALICE', age: '30', city: 'NEW YORK' }

// 注意：这里 age 的值被转换成了字符串 '30'
```

在这个例子中，`Object.entries(person)` 返回了一个包含 `person` 对象所有可枚举属性键值对的数组。然后，我们展示了如何使用 `forEach` 方法遍历这个数组，并打印出每个键值对。此外，还展示了如何使用 `map` 方法对键值对进行处理（例如，将值转换为大写），并使用 `Object.fromEntries()` 将处理后的键值对数组转换回对象。需要注意的是，在转换回对象时，原始值（如数字）可能会因为处理而改变类型（如转换为字符串）。
