# 类继承

在 TypeScript 中，类继承是一种非常强大的特性，它允许你基于一个已存在的类来创建新的类，从而复用代码并添加新的功能。这涉及到构造函数、方法覆盖和属性继承几个核心概念。下面是对这些概念的详细解释：

## 1. 构造函数（Constructors）

在 TypeScript 中，构造函数是一个特殊的函数，它会在类的新实例创建时自动调用。当使用继承时，子类会继承父类的所有属性和方法，但构造函数不会自动被继承。如果你希望在子类中使用父类的构造函数，你需要在子类的构造函数中显式地调用它。这通常通过`super()`关键字来实现，它必须在子类构造函数体的任何语句之前被调用。

```typescript
class Parent {
  constructor(public name: string) {
    console.log("Parent constructor called");
  }
}

class Child extends Parent {
  constructor(name: string, age: number) {
    super(name); // 调用父类的构造函数
    this.age = age; // 子类特有的属性
    console.log("Child constructor called");
  }

  age: number; // 子类特有的属性
}

const child = new Child("Alice", 10);
// 输出:
// Parent constructor called
// Child constructor called
```

## 2. 方法覆盖（Method Overriding）

在 TypeScript 中，子类可以覆盖（或称为重写）从父类继承来的方法。这意味着子类可以提供一个具有相同名称和参数列表的方法，但实现细节不同。覆盖的方法将替换掉从父类继承来的方法，在通过子类的实例调用该方法时，会执行子类中的实现。

```typescript
class Parent {
  greet() {
    console.log("Hello from Parent");
  }
}

class Child extends Parent {
  greet() {
    // 覆盖父类的greet方法
    console.log("Hello from Child");
  }
}

const child = new Child();
child.greet(); // 输出: Hello from Child
```

## 3. 属性继承（Property Inheritance）

在 TypeScript 中，当子类继承自父类时，它会继承父类定义的所有实例属性和方法（除非它们被`static`关键字标记为静态的）。然而，构造函数和静态属性/方法不是通过实例继承的，而是通过类本身继承的。

对于实例属性，如果子类需要访问父类中定义的属性，它可以直接通过`this`关键字来访问这些属性，因为子类实例同时也是父类的一个实例（在 JavaScript/TypeScript 的原型链中）。

```typescript
class Parent {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

class Child extends Parent {
  greet() {
    // 覆盖greet方法，但仍可以访问继承自Parent的name属性
    console.log(`Hi there, my name is ${this.name} and I'm a Child`);
  }
}

const child = new Child("Alice");
child.greet(); // 输出: Hi there, my name is Alice and I'm a Child
```

总之，TypeScript 中的类继承允许你通过子类来复用和扩展父类的代码。这包括构造函数的显式调用、方法的覆盖以及属性的自然继承。这些特性使得 TypeScript 成为构建复杂、可维护软件系统的强大工具。
