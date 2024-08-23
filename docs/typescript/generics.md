# 泛型

TypeScript 中的泛型（Generics）是一种强大的特性，它允许你编写灵活且可重用的组件，这些组件可以工作在多种数据类型上，而无需为每种数据类型都编写一个特定的版本。泛型通过引入类型参数（Type Parameters）来实现，这些类型参数在组件被使用时会被具体的类型所替代。

## 泛型的基本概念

- **类型参数**：在定义泛型时，我们使用尖括号 `<>` 包围的类型参数（如 `T`、`U`、`V` 等）来表示一个或多个未知的类型。这些类型参数在泛型内部被用作占位符，用于表示实际的类型。

- **泛型类型**：基于类型参数创建的类型就是泛型类型。泛型类型可以是函数、接口、类或任何其他可以包含类型的 TypeScript 结构。

## 泛型的好处

1. **类型安全**：泛型提供了编译时的类型检查，从而减少了运行时错误。
2. **代码复用**：使用泛型可以编写一组代码来处理多种数据类型，从而避免了代码的重复。
3. **清晰性**：泛型可以使代码更加清晰，因为它们清楚地表明了组件可以处理哪些类型的数据。

## 泛型的使用场景

- **泛型函数**：可以编写一个函数，该函数能够处理多种类型的参数，并返回与这些参数类型相对应的结果。
- **泛型接口**：可以定义一个接口，该接口可以应用于多种类型的对象，而不仅仅是单一类型的对象。
- **泛型类**：可以创建一个类，该类的某些部分（如属性、方法等）的类型是在创建类的实例时指定的。

## 泛型函数的例子

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString"); // 类型参数为string
let output2 = identity(42); // 类型参数被自动推断为number
```

在这个例子中，`identity` 函数是一个泛型函数，它接受一个类型参数 `T`。这个函数简单地返回其参数，但它能够处理任何类型的参数，因为 `T` 是一个占位符，它将在函数调用时被替换为具体的类型。

## 泛型接口的例子

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = (x) => x;
```

在这个例子中，`GenericIdentityFn` 是一个泛型接口，它表示一个函数类型，该函数接受一个类型为 `T` 的参数并返回相同类型的值。然后，我们创建了一个名为 `myIdentity` 的变量，它是 `GenericIdentityFn<number>` 类型的实例，即一个接受数字并返回数字的函数。

## 泛型类的例子

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zeroValue: T, add: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = add;
  }
}

let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);

console.log(myGenericNumber.add(1, 2)); // 输出：3
```

在这个例子中，`GenericNumber` 是一个泛型类，它有两个类型参数（在这个例子中，我们实际上只使用了一个，即 `T`），以及两个属性：`zeroValue` 和 `add`。`zeroValue` 是类型 `T` 的一个实例，而 `add` 是一个函数，该函数接受两个类型为 `T` 的参数并返回类型为 `T` 的结果。然后，我们创建了 `GenericNumber<number>` 的一个实例，即一个处理数字类型的 `GenericNumber` 类。
