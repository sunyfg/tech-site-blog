# 正则表达式反向断言

实际上，ES2018（ES9）并没有直接引入正则表达式中的“反向断言”（Negative Lookbehind 或 Negative Lookahead）作为新的特性。然而，正则表达式的反向断言（特别是反向先行断言和反向后行断言）在更早的 ECMAScript 版本中就已经被支持了，但可能不是所有环境都完全实现了这些特性，或者它们的支持程度有所不同。

不过，为了清晰起见，我将解释这两种反向断言（反向先行断言和反向后行断言），并给出相应的 ES2018（或更现代环境）中的代码示例。

## 反向先行断言（Negative Lookahead）

反向先行断言允许你指定一个位置，该位置之后不能匹配某个模式。其语法是 `(?!pattern)`。

**代码示例**：

```javascript
// 匹配不以"abc"开头的字符串
const regex = /^(?!abc).+/;
const str1 = "abcdef";
const str2 = "xyzabc";

console.log(regex.test(str1)); // false，因为整个字符串以"abc"开头
console.log(regex.test(str2)); // true，因为虽然字符串包含"abc"，但整个字符串不以"abc"开头
```

在这个例子中，`^(?!abc).+` 表示匹配任何不以 "abc" 开头的字符串。`^` 表示字符串的开始，`(?!abc)` 是一个反向先行断言，表示接下来的字符不能匹配 "abc"，`.+` 表示匹配一个或多个任意字符。

## 反向后行断言（Negative Lookbehind）

反向后行断言允许你指定一个位置，该位置之前不能匹配某个模式。然而，需要注意的是，在 ES2018（ES9）发布时，并不是所有的 JavaScript 环境都支持反向后行断言。这个特性在后续的 ECMAScript 版本（如 ES2018 之后的某个提案，并最终在 ECMAScript 2018 的修订版或后续版本中标准化，但具体取决于环境支持）中得到了更广泛的支持。

**代码示例**（假设环境支持反向后行断言）：

```javascript
// 匹配不在"abc"之后的"xyz"
const regex = /(?<!abc)xyz/;
const str1 = "xyzabc";
const str2 = "abcxyz";
const str3 = "123xyz";

console.log(regex.test(str1)); // false，"xyz"前面是字符串的开始，不是"abc"
console.log(regex.test(str2)); // false，"xyz"前面是"abc"
console.log(regex.test(str3)); // true，"xyz"前面是"123"，不是"abc"
```

在这个例子中，`(?<!abc)xyz` 表示匹配不在 "abc" 之后的 "xyz"。`(?<!abc)` 是一个反向后行断言，表示前面的字符不能匹配 "abc"，`xyz` 表示要匹配的字符串。

**注意**：反向后行断言的支持可能因 JavaScript 引擎而异。例如，在撰写本文时（2023 年），大多数现代浏览器和 Node.js 环境都支持反向后行断言，但在一些较旧的环境中可能不可用。因此，在使用此特性时，请确保你的目标环境支持它。
