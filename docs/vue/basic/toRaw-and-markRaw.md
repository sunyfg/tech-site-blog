# 组合式 API：toRaw() 和 markRaw()

在 Vue 3 的组合式 API 中，`toRaw()` 和 `markRaw()` 是两个与响应式系统紧密相关的函数，它们允许你以不同的方式处理响应式对象。

## toRaw()

### 参数

- `value`：一个响应式对象（通过`reactive()`或`ref().value`创建的）。

### 返回值

- 响应式对象对应的原始对象。这个原始对象不是响应式的，并且与响应式系统解耦。

### 原理

`toRaw()`函数接收一个响应式对象作为参数，并返回该对象的原始版本。这个原始版本是创建响应式对象之前的普通对象或数组，不包含任何响应式系统的追踪或依赖。

### 示例

```javascript
import { reactive, toRaw } from "vue";

const state = reactive({
  count: 0,
});

const rawState = toRaw(state);

console.log(rawState === state); // false
console.log(rawState.count); // 0

// 修改rawState不会影响state
rawState.count = 1;
console.log(state.count); // 0
```

### 使用场景

1. **性能优化**：

   - 当处理大型数据结构时，频繁的响应式更新可能会导致性能问题。通过`toRaw()`，你可以获取响应式对象的原始版本，从而绕过 Vue 的响应式系统，只在必要时手动触发更新，以提高性能。

2. **与外部库的集成**：

   - 当你需要将 Vue 的响应式对象传递给不支持响应式系统的外部库时，可以使用`toRaw()`获取原始对象，以确保与外部库的兼容性。外部库可能会修改这些对象，但你不想这些修改触发 Vue 的响应式更新。

3. **临时读取数据**：
   - 在某些情况下，你可能需要临时读取响应式对象的数据，而不希望触发任何副作用（如重新渲染或执行观察者函数）。使用`toRaw()`可以安全地读取数据，而不必担心这些副作用。

## markRaw()

### 参数

- `value`：一个对象或数组。

### 返回值

- 返回传入的原始对象或数组，但标记为“非响应式”。这意味着即使你后来尝试使用`reactive()`或`ref()`将其转换为响应式，Vue 也不会这样做。

### 原理

`markRaw()`函数接受一个对象或数组，并在 Vue 的响应式系统中标记它，使其在未来不会被转换为响应式对象。这对于优化性能或处理那些你不希望 Vue 追踪其变化的数据非常有用。

### 示例

```javascript
import { reactive, markRaw } from "vue";

const rawObject = { count: 0 };
const markedRaw = markRaw(rawObject);

const state = reactive({
  // 尝试将markedRaw包含为响应式对象的一部分，但Vue会忽略这个操作
  nonReactive: markedRaw,
});

// 修改markedRaw会影响原始对象，但不会触发任何响应式更新
markedRaw.count = 1;
console.log(rawObject.count); // 1
console.log(state.nonReactive.count); // 1，但UI不会更新（如果依赖于这个值）
```

**注意**：虽然`markedRaw`的修改会反映在`state.nonReactive`上，但因为`markedRaw`被标记为非响应式，所以任何依赖于`state.nonReactive`的视图或计算属性都不会因为`markedRaw`的修改而更新。

### 使用场景

1. **非响应式数据**：

   - 当你有一个对象或数组，但你明确知道它不应该被 Vue 的响应式系统追踪时，可以使用`markRaw()`来标记它。这通常用于第三方库的对象、从服务器接收的静态数据或具有不可变特性的数据结构。

2. **性能优化**：

   - 与`toRaw()`类似，`markRaw()`也可以用于性能优化。当你知道某个对象不需要响应式时，将其标记为非响应式可以避免 Vue 在内部进行不必要的依赖追踪和更新检查，从而提高应用性能。

3. **动态渲染组件**：
   - 在动态渲染组件时，如果你不希望 Vue 自动将组件的 props 或数据转换为响应式，可以使用`markRaw()`来标记这些数据。这可以避免在组件内部发生不必要的响应式更新，使组件的行为更加可预测和可控。

## 示例对比

- **toRaw() 示例**：

  ```javascript
  import { reactive, toRaw } from "vue";

  const state = reactive({
    items: [
      /* ...大量数据... */
    ],
  });

  // 需要进行大量数据处理时，使用toRaw避免触发响应式更新
  const rawItems = toRaw(state.items);
  // ...对rawItems进行大量操作...

  // 处理完成后，如果需要更新UI，可以手动更新state.items
  ```

- **markRaw() 示例**：

  ```javascript
  import { reactive, markRaw } from "vue";

  // 假设这是从服务器接收的静态数据
  const rawData = {
    /* ...静态数据... */
  };

  // 标记为非响应式
  const nonReactiveData = markRaw(rawData);

  // 将非响应式数据用于响应式对象
  const state = reactive({
    data: nonReactiveData,
  });

  // 修改nonReactiveData不会触发响应式更新
  nonReactiveData.someProperty = "newValue";
  // 但修改state.data内部的内容（如果它是响应式的）仍然会触发更新
  ```
