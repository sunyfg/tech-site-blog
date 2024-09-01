# 组合式 API：readonly() 和 shallowReadonly()

在 Vue 3 的组合式 API 中，`readonly()` 和 `shallowReadonly()` 是用于创建响应式数据的只读视图的 API。这两个函数允许你保护数据不被外部修改，同时保持其响应性，以便在 UI 中正确显示数据。

## readonly()

**参数**：

- `source`：一个响应式对象（如通过`reactive()`创建的）或普通对象。

**返回值**：

- 一个新的响应式对象，该对象的所有属性都是只读的。尝试修改这些属性将导致运行时警告（在开发模式下）。

**原理**：
`readonly()`函数会遍历`source`对象的所有属性，并创建一个新的响应式对象，其内部使用 Vue 的响应式系统来追踪依赖。但是，这个新对象的所有属性都被设置为只读，防止外部修改。

**示例**：

```javascript
import { reactive, readonly } from "vue";

const state = reactive({
  count: 0,
});

const readOnlyState = readonly(state);

// 尝试修改readOnlyState.count将不会生效，并可能在开发模式下触发警告
readOnlyState.count++; // 警告："Set operation on key 'count' failed: target is readonly."

// 但state.count仍然可以修改
state.count++;
console.log(readOnlyState.count); // 输出：1
```

## shallowReadonly()

**参数**：

- `source`：与`readonly()`相同，可以是一个响应式对象或普通对象。

**返回值**：

- 一个新的响应式对象，但只保持对象顶层的响应性和只读性。嵌套的对象或数组内部仍然可以修改。

**原理**：
`shallowReadonly()`与`readonly()`类似，但它不会递归地将嵌套的对象或数组转换为只读。它只会在顶层对象上设置只读属性，允许你修改嵌套对象的内部属性。

**示例**：

```javascript
import { reactive, shallowReadonly } from "vue";

const state = reactive({
  nested: { foo: 1 },
});

const shallowReadOnlyState = shallowReadonly(state);

// 尝试修改shallowReadOnlyState.nested将不会生效，并可能触发警告
shallowReadOnlyState.nested = { bar: 2 }; // 警告："Set operation on key 'nested' failed: target is readonly."

// 但可以修改nested对象的内部属性
shallowReadOnlyState.nested.foo = 2; // 成功

console.log(shallowReadOnlyState.nested.foo); // 输出：2
```

## 使用场景

- **保护数据**：当你需要将数据传递给组件或函数，但不想让它们修改这些数据时，可以使用`readonly()`或`shallowReadonly()`。
- **性能优化**：在某些情况下，你可能不需要对象内部所有属性的响应性，而只是想保护顶层属性不被修改。这时，`shallowReadonly()`可能是一个更好的选择，因为它避免了不必要的深层只读转换。

## 注意事项

- 无论是`readonly()`还是`shallowReadonly()`，它们都不会创建数据的深拷贝。它们只是创建了一个只读视图。
- 在 TypeScript 中使用时，`readonly()`和`shallowReadonly()`会正确地推断返回对象的类型，并标记所有属性为只读（在 TypeScript 4.1 及以上版本中）。
- 尝试修改只读属性会在开发模式下触发警告，但在生产模式下可能不会。因此，最好是在开发过程中就确保不会修改这些属性。

## 总结

- **`readonly()`**：创建一个完全只读的响应式对象，所有层级的属性都不能被修改。
- **`shallowReadonly()`**：创建一个只读的响应式对象，但只针对顶层属性。嵌套的对象或数组内部仍然可以修改。

这两个函数都非常有用，特别是在需要保护数据不被意外修改的场景中，如组件库的开发或复杂的应用程序中。它们允许你安全地将数据传递给子组件或函数，同时保持数据的响应性，以便在 UI 中正确显示。
