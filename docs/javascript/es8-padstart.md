# String.prototype.padStart()

`String.prototype.padStart()` 是 JavaScript 中的一个字符串实例方法，它用于在当前字符串的开头填充指定的字符（或字符串），直到达到指定的长度。如果当前字符串的长度已经等于或超过了指定的长度，则该方法返回原始字符串，不做任何修改。

## 方法签名

```javascript
str.padStart(targetLength [, padString])
```

- `targetLength`：当前字符串需要填充达到的目标长度。如果这个数字小于原始字符串的长度，则返回原始字符串。
- `padString`（可选）：填充字符串。如果省略此参数，则使用空格（' '）进行填充。如果 `padString` 的长度超过需要填充的长度，则 `padString` 会被截断以适应需要填充的长度。

## 返回值

返回一个新的字符串，它是通过在原始字符串的开头填充指定的字符（或字符串）后得到的，直到达到指定的目标长度。

## 代码示例

### 基本用法

```javascript
let str = "5";
let paddedStr = str.padStart(10, "0"); // '0000000005'

console.log(paddedStr);
```

在这个例子中，原始字符串 `str` 是 `'5'`，我们想要将其长度增加到 10 个字符。通过使用 `'0'` 作为填充字符，`padStart()` 方法在 `'5'` 的前面填充了足够的 `'0'` 来达到 10 个字符的长度。

### 使用默认填充字符（空格）

```javascript
let str = "Hello";
let paddedStr = str.padStart(10); // '     Hello'

console.log(paddedStr);
```

在这个例子中，我们没有指定填充字符，因此 `padStart()` 方法默认使用空格（' '）进行填充。`'Hello'` 前面被填充了四个空格，以使其总长度达到 10 个字符。

### 示例 1：格式化时间

假设你想要将一个时间字符串（如小时和分钟）格式化为两位数字的形式，即使小时或分钟是个位数。

```javascript
let hour = 5;
let minute = 9;

// 使用padStart来确保小时和分钟都是两位数
let formattedHour = hour.toString().padStart(2, "0"); // '05'
let formattedMinute = minute.toString().padStart(2, "0"); // '09'

console.log(`${formattedHour}:${formattedMinute}`); // '05:09'
```

### 示例 2：填充特定字符

有时候，你可能想要用特定的字符（而不是空格）来填充字符串。

```javascript
let str = "1";
let paddedStr = str.padStart(5, "*"); // '****1'

console.log(paddedStr);
```

在这个例子中，我们在`'1'`的前面填充了四个`'*'`字符。

### 示例 3：生成特定长度的字符串

假设你需要生成一个特定长度的字符串，该字符串由用户提供的初始字符串和填充字符组成。

```javascript
let initialStr = "abc";
let targetLength = 10;
let fillChar = "-";

let resultStr = initialStr.padStart(targetLength, fillChar); // '------abc'

console.log(resultStr);
```

### 示例 4：处理已足够长的字符串

如果字符串的长度已经等于或超过了目标长度，`padStart()`将不会进行任何填充。

```javascript
let longStr = "1234567890";
let paddedStr = longStr.padStart(5, "x"); // '1234567890'

console.log(paddedStr); // 输出原始字符串，因为没有需要填充的空间
```

### 示例 5：与模板字符串结合使用

`padStart()`可以与模板字符串结合使用，以创建格式化的输出。

```javascript
let userId = 1;
let userIdStr = userId.toString().padStart(5, "0"); // '00001'

let welcomeMessage = `Welcome, User ID: ${userIdStr}`;

console.log(welcomeMessage); // 'Welcome, User ID: 00001'
```

### 示例 6：在文件路径中使用

当处理文件路径时，你可能想要确保目录名称达到特定的长度，以便于排序或显示。

```javascript
let dirName = "Jan";
let paddedDirName = dirName.padStart(10, "0"); // '0000000Jan'

// 注意：在实际应用中，你可能不会这样填充目录名，这里只是为了展示padStart的用法
console.log(paddedDirName);
```

## 总结

`String.prototype.padStart()` 是一个非常有用的字符串方法，它允许你在字符串的开头填充指定的字符或字符串，直到达到指定的长度。这在处理需要固定长度的字符串时特别有用，如格式化数字、日期、文件名等。
