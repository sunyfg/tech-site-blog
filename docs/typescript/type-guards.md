# 类型守护

类型保护是 TypeScript 中的一个重要概念，它允许你在运行时检查一个值是否属于特定的类型，并据此在编译时安全地访问该类型的属性或方法。类型保护主要通过几种方式实现：`typeof` 类型保护、`instanceof` 类型保护、自定义类型保护（通过函数实现）以及`in` 关键字和类型断言。

## 1. `typeof` 类型保护

`typeof` 类型保护用于检查一个值是否是基本数据类型（如 `string`、`number`、`boolean` 等）。

```typescript
function isString(x: any): x is string {
  return typeof x === "string";
}

function process(value: any) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // 现在TypeScript知道value是string
  } else {
    console.log(value.toString()); // 假设value不是string，则调用toString()
  }
}
```

## 2. `instanceof` 类型保护

`instanceof` 类型保护用于检查一个值是否是某个构造函数的实例。

```typescript
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function isDog(a: Dog | Cat): a is Dog {
  return a instanceof Dog;
}

function animalSound(animal: Dog | Cat) {
  if (isDog(animal)) {
    animal.bark(); // TypeScript知道animal是Dog
  } else {
    (animal as Cat).meow(); // 或者使用另一个类型保护
  }
}
```

## 3. 自定义类型保护（通过函数）

自定义类型保护允许你通过函数来定义更复杂的类型检查逻辑。

```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Square | Rectangle;

function isSquare(shape: Shape): shape is Square {
  return shape.kind === "square";
}

function getArea(shape: Shape) {
  if (isSquare(shape)) {
    return shape.size * shape.size;
  } else {
    return shape.width * shape.height;
  }
}
```

## 4. `in` 关键字和类型断言

虽然`in`关键字本身不直接构成类型保护，但它可以与类型断言结合使用来模拟类型保护的效果。

```typescript
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    (animal as Fish).swim();
  } else if ("fly" in animal) {
    (animal as Bird).fly();
  }
}
```

在这个例子中，`in`关键字用于检查对象是否具有某个属性，然后通过类型断言来告诉 TypeScript 编译器该对象是什么类型，从而安全地调用相应的方法。

类型保护是 TypeScript 中处理联合类型时非常有用的工具，它们允许你在运行时检查类型，并在编译时获得类型安全的保证。
