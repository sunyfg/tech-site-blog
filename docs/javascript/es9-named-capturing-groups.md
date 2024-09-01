# 正则表达式命名捕获组（Named Capture Groups）

ES2018（ES9）中引入了一个重要的正则表达式特性：命名捕获组（Named Capture Groups）。这一特性允许你在正则表达式中给捕获组命名，从而可以在执行匹配操作后通过名称来引用这些组，而不是仅仅通过它们的索引（即位置）。这极大地提高了代码的可读性和可维护性。

## 命名捕获组的语法

命名捕获组的语法是在捕获组的左括号 `(` 后面添加一个 `?<name>` 前缀，其中 `name` 是你给这个捕获组指定的名称。名称应该是一个有效的标识符，并且在这个正则表达式中是唯一的。

```javascript
/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
```

在这个例子中，我们有一个匹配日期（YYYY-MM-DD 格式）的正则表达式。我们使用命名捕获组来分别捕获年、月、日，并将它们分别命名为 `year`、`month` 和 `day`。

## 使用命名捕获组

在 ES2018 及之后的 JavaScript 环境中，当你使用 `String.prototype.matchAll()` 方法（在 ES2020 中引入，但经常与命名捕获组一起讨论）或 `RegExp.prototype.exec()` 方法执行匹配操作时，返回的结果将包含对命名捕获组的引用。

然而，需要注意的是，`String.prototype.match()` 方法（在 ES5 中引入）本身并不直接支持命名捕获组。它只会返回一个包含完整匹配和索引位置的数组，以及输入字符串的副本（在 ES2018 中添加了 `groups` 属性的支持，但并非所有环境都支持这一特性）。

## 代码示例

以下是一个使用命名捕获组和 `RegExp.prototype.exec()` 方法的示例：

```javascript
const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const str = "Today's date is 2023-04-01.";

let match = regex.exec(str);
if (match) {
  console.log(
    `Year: ${match.groups.year}, Month: ${match.groups.month}, Day: ${match.groups.day}`
  );
  // 输出: Year: 2023, Month: 04, Day: 01
}
```

在这个例子中，我们使用 `exec()` 方法执行匹配操作，并通过 `match.groups` 对象访问命名捕获组。

对于 `String.prototype.matchAll()` 方法（假设你的环境支持它），你可以这样使用：

```javascript
const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;
const str = "Dates: 2023-04-01, 2023-04-02, 2023-04-03.";

for (const match of str.matchAll(regex)) {
  console.log(
    `Year: ${match.groups.year}, Month: ${match.groups.month}, Day: ${match.groups.day}`
  );
  // 输出三个日期
}
```

在这个例子中，`matchAll()` 方法返回一个迭代器，你可以遍历它来获取所有匹配的命名捕获组。注意，这里使用了全局标志 `g` 来查找字符串中的所有匹配项。
