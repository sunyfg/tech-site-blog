# 面试题 1

## 题目

```typescript
interface Obj {
  a: Number,
  b: String,
  c: Number,
  d: String
}
type data
```

问题：如果希望 data 的数据类型是 interface 的 b,c,d 的数据类型，应该如何实现

## 解答（Pick）

在 TypeScript 中，如果你想要`data`的类型仅包含`Obj`接口中`b`、`c`、`d`属性的类型，但不包含`a`，你可以通过几种方式来实现这一点。最直接的方法是使用类型映射（Type Mapping）或者通过 Pick 工具类型来提取这些属性。

### 使用 Pick 工具类型

TypeScript 提供了一个内置的工具类型 `Pick<T, K>`，它可以从类型 `T` 中选择一组属性 `K` 来创建一个新的类型。这是实现你需求的最简单方式。

```typescript
interface Obj {
  a: Number;
  b: String;
  c: Number;
  d: String;
}

// 使用Pick工具类型来提取b, c, d属性的类型
type data = Pick<Obj, "b" | "c" | "d">;

// 现在data的类型是：
// {
//     b: String;
//     c: Number;
//     d: String;
// }
```

### 使用类型映射（更复杂的场景）

虽然在这个特定场景下使用`Pick`是最简单和最直接的方法，但了解如何通过类型映射来手动实现这一点也是有益的，特别是当你需要更复杂的类型操作时。

然而，对于简单的属性选择，类型映射的实现将比`Pick`更加冗长和复杂，因此这里不直接展示其实现。但基本上，你会创建一个新的类型，该类型通过条件类型（Conditional Types）和映射类型（Mapped Types）来仅包含你想要的属性。

### 总结

对于你的需求，使用`Pick`工具类型是最简单和最直接的方法。它允许你轻松地从现有类型中提取出你需要的属性集，而无需编写额外的类型映射逻辑。

## 解答（类型映射）

```ts
interface Obj {
  a: Number;
  b: String;
  c: Number;
  d: String;
}

type SelectKeys<T, K extends keyof T> = {
  [P in K]: T[P];
};

type data = SelectKeys<Obj, "b" | "c" | "d">;

// 现在data的类型是：
// {
//     b: String;
//     c: Number;
//     d: String;
// }
```
