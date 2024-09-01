# trimStart()/trimLeft() 和 trimEnd()/trimRight()

在 ES2018（ES9）中，JavaScript 字符串对象新增了两个非常实用的方法：`trimStart()`/`trimLeft()` 和 `trimEnd()`/`trimRight()`。这两个方法分别用于去除字符串开头（左侧）和结尾（右侧）的空白字符。虽然 `trim()` 方法已经存在多年，用于去除字符串两端的空白字符，但 `trimStart()`/`trimLeft()` 和 `trimEnd()`/`trimRight()` 提供了更细粒度的控制，允许你仅去除字符串一侧的空白字符。

## trimStart() / trimLeft()

这两个方法实际上是等价的，都用于去除字符串开头的空白字符。空白字符包括空格、制表符、换行符等。

**语法**：

```javascript
str.trimStart();
str.trimLeft();
```

**返回值**： 返回一个新的字符串，表示已去除开头空白字符的原字符串。

## trimEnd() / trimRight()

同样地，这两个方法也是等价的，用于去除字符串结尾的空白字符。

**语法**：

```javascript
str.trimEnd();
str.trimRight();
```

**返回值**： 返回一个新的字符串，表示已去除结尾空白字符的原字符串。

## 代码示例

```javascript
let str = "   Hello, World!   ";

// 使用 trimStart() 或 trimLeft() 去除开头的空白字符
let trimmedStart = str.trimStart(); // 或 str.trimLeft();
console.log(trimmedStart); // 输出: "Hello, World!   "

// 使用 trimEnd() 或 trimRight() 去除结尾的空白字符
let trimmedEnd = str.trimEnd(); // 或 str.trimRight();
console.log(trimmedEnd); // 输出: "   Hello, World!"

// 如果你想同时去除开头和结尾的空白字符，仍然可以使用 trim()
let trimmed = str.trim();
console.log(trimmed); // 输出: "Hello, World!"

// 注意：这些方法不会修改原始字符串，而是返回一个新的字符串
console.log(str === trimmedStart); // false
console.log(str === trimmedEnd); // false
console.log(str === trimmed); // false
```

在这个例子中，我们创建了一个包含前后空白字符的字符串 `str`。然后，我们分别使用 `trimStart()`/`trimLeft()` 和 `trimEnd()`/`trimRight()` 方法去除了字符串开头和结尾的空白字符，并展示了它们各自的效果。最后，我们还展示了如何使用 `trim()` 方法同时去除字符串两端的空白字符。重要的是要注意，这些方法都不会修改原始字符串，而是返回一个新的字符串。
