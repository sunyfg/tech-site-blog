# void 和 never 类型有什么区别

TypeScript 中的`void`和`never`类型虽然都是特殊类型，但它们之间有明显的区别和用途。

## void 类型

- **定义**：`void`类型表示没有类型，或者说是一个空类型。它通常用于表示函数不返回任何值。
- **用途**：
  - 当你定义一个函数，该函数执行某些操作但不返回任何结果时，你可以将返回类型指定为`void`。
  - 调用一个返回`void`类型的函数时，你不能期望获得任何返回值，也不能将返回值赋值给任何变量（尽管在严格模式下，TypeScript 会阻止你这样做，但在非严格模式下，你可能会得到一个`undefined`值，这是 JavaScript 的行为，TypeScript 尝试在严格模式下避免这种情况）。
- **示例**：

  ```typescript
  function logMessage(message: string): void {
    console.log(message);
  }

  // 正确使用
  logMessage("Hello, world!");
  // 错误使用（在严格模式下）
  // let result = logMessage("Hello, world!"); // 如果尝试赋值，TypeScript会报错
  ```

## never 类型

- **定义**：`never`类型是任何类型的子类型，但它没有子类型（除了`never`本身和`any`，但使用`any`会丢失类型安全）。它表示的是那些永不存在的值的类型。
- **用途**：
  - 用于那些已知永远不会返回的函数。这通常是因为函数内部会抛出异常或包含无限循环等。
  - 在类型守卫中，如果通过条件检查排除了所有可能的类型，则剩余的分支可以被认为是`never`类型（尽管 TypeScript 的类型推断通常能够自动处理这种情况，而不需要显式指定）。
  - `never`类型也可以用于确保某些代码路径是死路，从而帮助 TypeScript 提供更强的类型检查和更好的代码理解。
- **示例**：

  ```typescript
  function fail(message: string): never {
    throw new Error(message);
  }

  // 调用这个函数会导致运行时错误，且不会返回
  fail("Something failed");
  // 这行代码永远不会执行
  console.log("This line will never run");

  // 另一个例子，使用never类型在类型守卫中
  function isNumber(x: any): x is number {
    return typeof x === "number";
  }

  function isString(x: any): x is string {
    return typeof x === "string";
  }

  function assertNever(x: never): never {
    // TypeScript 会检查这个分支是否可达，因为 x 被推断为 never 类型
    // 这通常意味着我们遗漏了某种情况，需要添加新的类型守卫
    throw new Error("Unexpected object: " + x);
  }

  function processValue(value: string | number) {
    if (isNumber(value)) {
      // 处理数字
    } else if (isString(value)) {
      // 处理字符串
    } else {
      // 如果 value 不是 number 也不是 string，则应该触发 assertNever
      // 这在理论上是不可能的，因为我们已经覆盖了所有可能的类型
      assertNever(value);
    }
  }
  ```

## 区别总结

- **用途不同**：`void`用于表示函数不返回任何值；`never`用于表示那些永远不应该有返回值的函数或永远不应该被执行到的代码路径。
- **在类型系统中的位置**：`void`是一个类型，但它更像是一个“空”的占位符；`never`是任何类型的子类型，但除了它自己之外没有子类型，这意味着它是类型系统中的一个“底部”类型。
- **应用场景**：`void`主要用于函数返回类型；`never`则更多地用于函数返回类型、类型守卫中的死路检查以及确保某些代码路径是可达的。
