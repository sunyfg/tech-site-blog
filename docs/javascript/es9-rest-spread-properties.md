# Rest/Spread 属性

在 ES2018（ES9）中，并没有直接引入新的 Rest/Spread 属性的特性，因为 Rest 属性（用于函数参数）和 Spread 属性（用于数组和对象）在 ES6（ES2015）中就已经被引入了。不过，ES2018 确实扩展了 Spread 属性的应用范围，特别是对象字面量中的 Spread 属性（之前已在 ES2017 或 ES8 中被提出，但这里为了完整性提及）。

## Rest 属性（用于函数参数）

Rest 属性允许你将一个不定数量的参数表示为一个数组。这是 ES6 引入的，并在后续版本（包括 ES2018）中保持不变。

**代码示例**：

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 输出: 10
```

## Spread 属性（用于数组和对象）

### 数组中的 Spread 属性

Spread 属性允许你将数组元素展开为单独的元素。这是 ES6 引入的，并在后续版本中保持不变。

**代码示例**：

```javascript
let parts = ["shoulders", "knees"];
let body = ["head", ...parts, "toes"];

console.log(body); // 输出: ["head", "shoulders", "knees", "toes"]

// 在函数调用中使用 Spread 属性
function myFunction(x, y, z) {
  return x + y + z;
}

const args = [1, 2, 3];
console.log(myFunction(...args)); // 输出: 6
```

### 对象中的 Spread 属性（ES2018 之前的扩展，但值得在此提及）

虽然对象中的 Spread 属性不是 ES2018 直接引入的，但它在 ES2018 之前的某个版本（实际上是 ES2017/ES8 的提案，但通常与 ES2018 一起讨论）中得到了标准化。它允许你将一个对象的可枚举属性复制到另一个新创建的对象中。

**代码示例**：

```javascript
let obj1 = { foo: "bar", x: 42 };
let obj2 = { foo: "baz", y: 13 };

// 使用 Spread 属性合并对象
let mergedObj = { ...obj1, ...obj2 };

console.log(mergedObj); // 输出: { foo: 'baz', x: 42, y: 13 }
// 注意：如果两个对象有相同的属性，则后面的对象中的属性会覆盖前面的对象中的属性

// 浅拷贝对象
let clonedObj = { ...obj1 };
console.log(clonedObj); // 输出: { foo: 'bar', x: 42 }
```

在这个例子中，`...obj1` 和 `...obj2` 将它们的属性分别展开并合并到一个新对象中。如果两个对象有相同的属性名，则后面对象的属性会覆盖前面对象的属性。此外，`...obj1` 也展示了如何使用 Spread 属性进行对象的浅拷贝。

综上所述，虽然 Rest/Spread 属性不是 ES2018 直接引入的新特性，但它们在 ES2018 中仍然是非常重要的特性，特别是对象中的 Spread 属性，它极大地增强了我们在处理对象时的灵活性和便利性。
