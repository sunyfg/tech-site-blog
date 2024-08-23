# 基本数据类型

TypeScript 支持与 JavaScript 几乎相同的基本数据类型，但为这些类型提供了更严格的静态类型检查。以下是 TypeScript 支持的基本数据类型及其示例：

1. **布尔类型（Boolean）**

   - 表示逻辑上的真（true）或假（false）。
   - 示例：`let isDone: boolean = false;`

2. **数字类型（Number）**

   - 表示双精度 64 位浮点格式 IEEE 754 值的集合。
   - 示例：`let count: number = 42;`
   - TypeScript 还支持二进制、八进制和十六进制字面量，例如 `let binaryLiteral: number = 0b1010;`、`let octalLiteral: number = 0o744;`、`let hexLiteral: number = 0xf00d;`。

3. **字符串类型（String）**

   - 表示文本数据。
   - 示例：`let name: string = "Alice";`
   - TypeScript 支持模板字符串，允许嵌入表达式，例如 `let greeting: string = `Hello, ${name}!`;`。

4. **数组类型（Array）**

   - 表示元素类型相同的序列。
   - 示例：`let numbers: number[] = [1, 2, 3, 4, 5];` 或使用泛型 `let numbers: Array<number> = [1, 2, 3, 4, 5];`。

5. **元组类型（Tuple）**

   - 表示已知元素数量和类型的数组，但各元素的类型不必相同。
   - 示例：`let x: [string, number] = ['hello', 10];`

6. **枚举类型（Enum）**

   - 是一种特殊的类，用于表示一组命名的常量值。
   - 示例：`enum Color {Red, Green, Blue}; let c: Color = Color.Green;`

7. **任意类型（Any）**

   - 表示可以是任何类型的值。
   - 示例：`let notSure: any = 4; notSure = "maybe a string instead";`
   - 使用 `any` 类型会丢失 TypeScript 提供的类型检查的好处，因此应谨慎使用。

8. **void 类型**

   - 表示没有任何类型。通常用于表示函数没有返回值。
   - 示例：`function warnUser(): void { console.log('This is my warning message'); }`

9. **null 和 undefined**

   - 在 TypeScript 中，`null` 和 `undefined` 都有它们自己的类型，分别是 `null` 和 `undefined`。
   - 默认情况下，TypeScript 中的变量是不允许赋值为 `null` 或 `undefined` 的，除非显式地指定了类型或使用了 `--strictNullChecks` 编译器选项。
   - 示例：`let u: undefined = undefined; let n: null = null;`

10. **never 类型**

    - 表示的是那些永不存在的值的类型。
    - 示例：`function error(message: string): never { throw new Error(message); }`
    - `never` 类型是任何类型的子类型，也可以被任何类型赋值，但它没有子类型（除了 `never` 本身之外）。

11. **对象类型（Object）**
    - TypeScript 中的 `Object` 类型是一个非原始类型，它表示非原始值，即除 `number`、`string`、`boolean`、`symbol`、`null` 或 `undefined` 之外的值。
    - 示例：`let obj: object = {name: 'Alice', age: 30};`

请注意，虽然数组和元组在 TypeScript 中有特殊的类型表示，但它们仍然被视为基本数据类型的扩展或特殊形式。此外，枚举类型虽然是一种特殊的类，但在 TypeScript 的上下文中，它通常被视为一种基本数据类型，因为它用于表示一组命名的常量值。
