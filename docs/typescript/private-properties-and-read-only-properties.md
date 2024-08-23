# 带有私有属性和只读属性的类

在 TypeScript 中，虽然 TypeScript 本身不直接支持像 Java 或 C#那样的完全私有（private）和只读（readonly）属性访问控制（因为 TypeScript 最终会被编译成 JavaScript，而 JavaScript 的类属性访问控制较为宽松），但你可以通过 TypeScript 的类型系统和约定来模拟这些行为。

## 私有属性

在 TypeScript 中，你可以使用`private`关键字来声明一个类的私有属性。这意味着这个属性只能在类的内部被访问和修改。

```typescript
class MyClass {
  private privateProperty: string;

  constructor(privateProperty: string) {
    this.privateProperty = privateProperty; // 构造函数中可以直接使用privateProperty作为参数名来自动赋值
  }

  public someMethod() {
    console.log(this.privateProperty); // 可以在类的方法中访问
  }
}

const instance = new MyClass("secret");
// console.log(instance.privateProperty); // 这会编译错误，因为privateProperty是私有的
```

## 只读属性

TypeScript 中并没有直接的`readonly`关键字用于类属性（尽管有`readonly`用于数组和元组），但你可以通过结合`private`和`getter`来模拟只读属性。这样，属性就不能在类的外部被修改，但可以被访问。

```typescript
class MyClass {
  private _readOnlyProperty: string;

  constructor(readOnlyProperty: string) {
    this._readOnlyProperty = readOnlyProperty;
  }

  public get readOnlyProperty(): string {
    return this._readOnlyProperty;
  }

  // 注意：没有设置readOnlyProperty的setter
}

const instance = new MyClass("readonly");
console.log(instance.readOnlyProperty); // 正确访问
// instance.readOnlyProperty = "new value"; // 这会编译错误，因为没有setter
```

在这个例子中，`_readOnlyProperty`是一个私有属性，用于存储实际的值。我们提供了一个公共的`getter`方法`readOnlyProperty`来访问这个值，但没有提供`setter`方法，因此这个属性在类的外部是只读的。

总结来说，虽然 TypeScript 的类属性访问控制不如某些静态类型语言严格，但通过使用`private`和`getter`（而不使用`setter`），你可以有效地模拟私有和只读属性的行为。
