# String.prototype.padEnd()

`String.prototype.padEnd()` 是 JavaScript 中的一个字符串实例方法，它用于在当前字符串的末尾填充指定的字符（或字符串），直到达到指定的长度。如果当前字符串的长度已经等于或超过了指定的长度，则该方法返回原始字符串，不做任何修改。这个方法在处理字符串格式化时非常有用，特别是当你需要确保字符串达到一定的长度时。

## 方法签名

```javascript
str.padEnd(targetLength [, padString])
```

- `targetLength`：当前字符串需要填充达到的目标长度。如果这个数字小于或等于原始字符串的长度，则返回原始字符串。
- `padString`（可选）：填充字符串。如果省略此参数，则使用空格（' '）进行填充。如果 `padString` 的长度超过需要填充的长度，则 `padString` 会被截断以适应需要填充的长度。

## 返回值

返回一个新的字符串，它是通过在原始字符串的末尾填充指定的字符（或字符串）后得到的，直到达到指定的目标长度。

## 示例

### 基本用法

```javascript
let str = "Hello";
let paddedStr = str.padEnd(10, "!"); // 'Hello!!!!!'

console.log(paddedStr);
```

在这个例子中，原始字符串 `str` 是 `'Hello'`，我们想要将其长度增加到 10 个字符。通过使用 `'!'` 作为填充字符，`padEnd()` 方法在 `'Hello'` 的后面填充了足够的 `'!'` 来达到 10 个字符的长度。

### 使用默认填充字符（空格）

```javascript
let str = "World";
let paddedStr = str.padEnd(10); // 'World     '

console.log(paddedStr);
```

在这个例子中，我们没有指定填充字符，因此 `padEnd()` 方法默认使用空格（' '）进行填充。`'World'` 后面被填充了四个空格，以使其总长度达到 10 个字符。

### 填充字符长度超过目标长度

```javascript
let str = "abc";
let paddedStr = str.padEnd(5, "XYZ"); // 'abcXY'

console.log(paddedStr);
```

虽然 `'XYZ'` 的长度是 3，但我们只需要填充 2 个字符来达到 5 的长度。因此，`'XYZ'` 被截断为 `'XY'`（因为它超过了剩余需要填充的长度），然后在后面跟上原始字符串 `'abc'`。

### 不进行填充的情况

```javascript
let str = "1234567890";
let paddedStr = str.padEnd(5, "x"); // '1234567890'

console.log(paddedStr);
```

在这个例子中，`targetLength`（5）小于原始字符串 `str` 的长度（10），因此 `padEnd()` 方法返回原始字符串，不进行任何填充。

## 总结

`String.prototype.padEnd()` 是一个强大的字符串方法，它允许你在字符串的末尾填充指定的字符或字符串，直到达到指定的长度。这在处理需要固定长度的字符串时特别有用，如格式化日志消息、生成文件路径等。与 `padStart()` 方法类似，`padEnd()` 方法也不会修改原始字符串，而是返回一个新的字符串。
