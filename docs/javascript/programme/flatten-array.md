# 数组扁平化

多维数组扁平化是一个常见的问题，它考察的是对数组操作的熟练程度以及对递归、迭代等编程概念的理解。多维数组扁平化指的是将一个嵌套多层的数组（即多维数组）转换为一个单层数组。

这里提供几种实现多维数组扁平化的方法：

## 1. 使用递归

递归是处理嵌套结构问题的自然选择。

```javascript
function flattenArray(arr) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  });
  return result;
}

// 示例
console.log(flattenArray([1, [2, [3, [4]], 5]])); // 输出: [1, 2, 3, 4, 5]
```

## 2. 使用栈

栈是一种后进先出（LIFO）的数据结构，可以用于迭代地处理嵌套数组。

```javascript
function flattenArrayIterative(arr) {
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    // 取出栈顶元素
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 如果是数组，将其元素压入栈中
      stack.push(...next);
    } else {
      // 否则，添加到结果数组中
      res.push(next);
    }
  }
  // 注意：因为栈是后进先出的，所以最后得到的数组需要反转
  return res.reverse();
}

// 示例
console.log(flattenArrayIterative([1, [2, [3, [4]], 5]])); // 输出: [1, 2, 3, 4, 5]
```

## 3. 使用 ES6 的扩展运算符和`reduce`

这种方法利用了`reduce`函数和扩展运算符`...`，适用于想要使用更现代 JavaScript 特性的场景。

```javascript
function flattenArrayWithReduce(arr) {
  return arr.reduce(
    (acc, val) =>
      acc.concat(Array.isArray(val) ? flattenArrayWithReduce(val) : val),
    []
  );
}

// 示例
console.log(flattenArrayWithReduce([1, [2, [3, [4]], 5]])); // 输出: [1, 2, 3, 4, 5]
```

## 4. 使用`flat()`（ES2019）

从 ES2019 开始，JavaScript 引入了`Array.prototype.flat()`方法，它可以直接将多维数组扁平化。这是最简单、最直接的方法。

```javascript
const arr = [1, [2, [3, [4]], 5]];
const flatArr = arr.flat(Infinity); // Infinity 作为深度，展开任意深度的嵌套数组

console.log(flatArr); // 输出: [1, 2, 3, 4, 5]
```

在面试中，你可以根据面试官的要求和问题的上下文选择最适合的方法。如果你知道`flat()`方法，那么使用它可能是最直接和简洁的。但是，了解其他方法也是有益的，因为它们可以帮助你更深入地理解 JavaScript 的数组操作和递归/迭代概念。
