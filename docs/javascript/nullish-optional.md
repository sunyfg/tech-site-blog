# 请解释 ?? 和 ?. 的含义和使用

在 JavaScript 中，`??` 和 `?.` 是 ES2020（也称为 ECMAScript 2020）引入的两个新操作符，它们分别被称为空值合并操作符（Nullish Coalescing Operator）和可选链操作符（Optional Chaining Operator）。

## 空值合并操作符 `??`

空值合并操作符 `??` 是一个逻辑操作符，用于在左侧的操作数为 `null` 或 `undefined` 时，返回其右侧的操作数；否则，返回左侧的操作数。这个操作符与逻辑或操作符 `||` 不同，因为 `||` 会在左侧操作数为假值（falsy value，如 `0`、`''`、`NaN`、`false`、`null`、`undefined`）时返回右侧的操作数，而 `??` 只在左侧操作数为 `null` 或 `undefined` 时返回右侧操作数。

**使用示例**：

```javascript
const foo = null ?? "default string";
console.log(foo); // 输出: "default string"

const bar = 0 ?? 42;
console.log(bar); // 输出: 0，因为 0 不是 null 或 undefined

const baz = "" ?? 42;
console.log(baz); // 输出: ''，因为 '' 也不是 null 或 undefined
```

## 可选链操作符 `?.`

可选链操作符 `?.` 允许你读取位于连接对象链深处的属性的值，而不必显式地验证链中的每一个中间引用是否有效。如果链中的某个引用是 `null` 或 `undefined`，表达式短路返回 `undefined`，而不是抛出错误。

**使用示例**：

```javascript
const obj = {
  foo: {
    bar: {
      baz: 42,
    },
  },
};

console.log(obj.foo.bar.baz); // 输出: 42
console.log(obj.foo.qux?.baz); // 输出: undefined，因为 obj.foo.qux 是 undefined

// 如果没有可选链操作符，你需要这样写
if (obj.foo.qux) {
  console.log(obj.foo.qux.baz);
} else {
  console.log(undefined);
}

// 使用可选链操作符访问多层嵌套属性
console.log(obj.foo?.bar?.baz); // 输出: 42
console.log(obj.foo?.qux?.baz); // 输出: undefined
```

这两个操作符极大地提高了处理可能为 `null` 或 `undefined` 的 JavaScript 对象时的安全性和便利性。
