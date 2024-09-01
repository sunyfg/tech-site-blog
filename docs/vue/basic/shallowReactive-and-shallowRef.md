# 组合式 API：shallowReactive() 和 shallowRef()

在 Vue 3 的组合式 API 中，`shallowReactive()` 和 `shallowRef()` 是用于创建响应式数据的 API，但它们与 `reactive()` 和 `ref()` 的主要区别在于它们只处理对象最外层的响应性，而不会递归地使对象内部的所有属性都变为响应式。这种“浅层”响应性在某些场景下可以提高性能，特别是当处理大型对象或深层嵌套的对象时，因为你可能只需要响应式地追踪对象顶层的属性变化。

## shallowReactive()

`shallowReactive()` 创建一个响应式的对象，但它只会使对象的顶层属性成为响应式的。如果对象的属性值是一个对象或数组，那么这个嵌套的对象或数组将不会被转换为响应式，也就是说，对嵌套对象或数组内部的修改不会触发视图更新。

**语法**:

```javascript
const state = shallowReactive({
  foo: 1,
  bar: { nested: 2 },
});
```

在这个例子中，`foo` 是响应式的，但 `bar` 下的 `nested` 属性不是响应式的。如果你修改 `bar.nested` 的值，视图不会更新。

## shallowRef()

与 `shallowReactive()` 类似，`shallowRef()` 创建一个响应式的引用对象，但它只保持 `.value` 属性的顶层是响应式的。如果 `.value` 是一个对象或数组，那么其内部属性或元素不会变成响应式。

**语法**:

```javascript
const state = shallowRef({
  foo: 1,
  bar: { nested: 2 },
});
```

在这个例子中，`state.value` 的 `foo` 是响应式的，但 `bar` 下的 `nested` 属性不是。修改 `state.value.bar.nested` 不会触发视图更新。

## 使用场景

- **性能优化**：当你有一个大型对象或深层嵌套的对象，但你只需要响应式地追踪顶层属性的变化时，使用 `shallowReactive()` 或 `shallowRef()` 可以提高性能，因为它们避免了不必要的深层响应式转换。
- **避免不必要的响应式**：在某些情况下，你可能不希望对象内部的某些属性或元素成为响应式，因为它们的变化不会影响 UI 的渲染。使用浅层响应式可以避免这种情况下的性能开销。

## 注意事项

- 浅层响应式仅适用于对象的顶层属性。如果你需要对象内部属性的变化也能触发视图更新，你应该使用 `reactive()` 或 `ref()`。
- 当使用浅层响应式时，需要特别注意你正在处理的数据结构和变化类型，以避免意外的行为。
- 在 TypeScript 中使用时，`shallowReactive()` 和 `shallowRef()` 的类型推断可能会与 `reactive()` 和 `ref()` 略有不同，因为它们的响应性范围不同。确保为它们提供正确的类型注解。
