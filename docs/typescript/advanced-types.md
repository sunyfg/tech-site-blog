# Typescript 高级类型

TypeScript 提供了一系列高级类型，这些类型允许开发者以更精确和灵活的方式描述变量的形状和行为。以下是一些常见的高级类型及其代码示例：

## 1. 交叉类型（Intersection Types）

交叉类型允许我们将多个类型合并为一个类型。这个新类型将具有所有合并类型的属性。

```typescript
interface Alarm {
  alert(): void;
}

interface Light {
  lightOn(): void;
  lightOff(): void;
}

type AlarmLight = Alarm & Light;

const alarmLight: AlarmLight = {
  alert() {
    console.log("Alert!");
  },
  lightOn() {
    console.log("Light is on");
  },
  lightOff() {
    console.log("Light is off");
  },
};
```

## 2. 联合类型（Union Types）

联合类型表示一个值可以是几种类型之一。

```typescript
let greet: string | (() => void);

greet = "Hello, world!";
greet = function () {
  console.log("Greetings!");
};

// 使用类型守卫或类型断言来安全地访问联合类型的属性
if (typeof greet === "string") {
  console.log(greet.toUpperCase());
} else {
  greet();
}
```

## 3. 条件类型（Conditional Types）

条件类型允许你基于条件表达式选择两个类型之一。

```typescript
type IsTrue<T> = T extends true ? "yes" : "no";

type Result1 = IsTrue<true>; // 类型为 "yes"
type Result2 = IsTrue<false>; // 类型为 "no"
```

## 4. 索引类型（Indexed Types）

索引类型允许你通过索引来访问对象的属性。这通常与泛型一起使用来创建灵活的类型定义。

```typescript
interface StringDictionary {
  [index: string]: string;
}

const myDict: StringDictionary = {
  key1: "value1",
  key2: "value2",
};

// 泛型索引类型
type Indexed<T> = { [key: string]: T };

const myNumberDict: Indexed<number> = {
  a: 1,
  b: 2,
};
```

## 5. 映射类型（Mapped Types）

映射类型通过遍历现有类型并转换其每个属性来创建新类型。

```typescript
type Keys = "a" | "b" | "c";
type Obj = {
  [P in Keys]: boolean;
};

// 等同于
// type Obj = {
//     a: boolean;
//     b: boolean;
//     c: boolean;
// };
```

## 6. 元组（Tuples）

元组类型允许你表示一个已知元素数量和类型的数组，但各元素的类型不必相同。

```typescript
let x: [string, number];
x = ["hello", 10]; // 正确
x = [10, "hello"]; // 错误
```

## 7. 枚举（Enumerations）

枚举是一种为变量提供一组命名常量的方式。

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction.Up); // 输出 0
console.log(Direction[0]); // 输出 "Up"
```

## 8. 类型别名（Type Aliases）

类型别名给一个类型起一个新名字。

```typescript
type Name = string;

let x: Name = "Alice";
```

## 9. 字面量类型（Literal Types）

字面量类型允许你指定变量必须是特定的字面量值。

```typescript
let status: "on" | "off" = "on";
status = "off"; // 正确
status = "waiting"; // 错误
```

这些高级类型极大地增强了 TypeScript 的类型系统，使得开发者能够编写出更加安全、灵活和易于理解的代码。
