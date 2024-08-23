# unknown 与 any 的区别

在 TypeScript 中，`unknown` 类型是一个顶级类型（top type），用于表示一个未知的值。与 `any` 类型相似，`unknown` 也可以表示任何 JavaScript 值，但 `unknown` 类型在类型安全方面提供了更强的保证。当你有一个 `unknown` 类型的值时，你不能直接对它进行除类型检查和类型断言之外的任何操作，这有助于防止类型错误。

- **类型安全性**：`any` 类型允许你对值进行任何操作，而不会进行类型检查，这可能会导致运行时错误。而 `unknown` 类型则强制你在使用值之前进行类型检查或类型断言，从而提高了类型安全性。
- **使用场景**：`any` 类型通常用于那些你确实需要绕过 TypeScript 类型检查的情况（尽管这通常不推荐）。而 `unknown` 类型则更适用于那些你确实不知道值的类型，但需要在后续代码中明确其类型的情况。

### 示例

```typescript
let value: unknown;

// 直接使用 unknown 类型的值会报错
// let length = value.length; // 错误：类型“unknown”上不存在属性“length”。

// 需要进行类型断言或类型检查
if (typeof value === "string") {
  let length = value.length; // 现在我们知道 value 是 string 类型
}

// 或者使用类型断言
let length: number = (value as string).length; // 需要确保这是安全的，否则可能运行时错误

// 更安全的做法是使用类型守卫
function isString(value: unknown): value is string {
  return typeof value === "string";
}

if (isString(value)) {
  let length = value.length; // 现在我们确信 value 是 string 类型
}
```

在上面的示例中，我们尝试直接使用 `unknown` 类型的值时会遇到编译错误，这强制我们进行类型检查或类型断言。通过使用类型守卫（如 `isString` 函数），我们可以在运行时安全地检查类型，并在确认类型后安全地使用值。

总之，`unknown` 类型是 TypeScript 中用于表示未知值的一种类型，它提供了一种比 `any` 类型更安全的方式来处理那些你不确定其类型的值。
