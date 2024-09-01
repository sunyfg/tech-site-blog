# 组合式 API：customRef()

在 Vue 3 的 Composition API 中，`customRef()` 是一个用于创建自定义响应式引用的函数。它允许你更精细地控制一个 ref 的响应性行为，这在某些特定的使用场景下非常有用，比如当你需要基于特定的逻辑来触发响应性更新时。

## 参数

`customRef()` 接收一个工厂函数作为参数，该工厂函数又接收两个参数：`track` 和 `trigger`。

- **track**: 用于在组件的依赖项收集过程中被调用，以便 Vue 能够追踪到这个自定义 ref 的依赖项。
- **trigger**: 一个函数，当自定义 ref 的值需要更新并触发依赖项重新渲染时调用。

工厂函数需要返回一个对象，该对象至少包含两个属性：`get` 和 `set`。

- **get**: 一个函数，当 ref 的值被读取时调用，应返回当前值。
- **set**: 一个函数，当 ref 的值被修改时调用，应执行必要的操作来更新值，并通过 `trigger()` 函数触发依赖项更新。

## 返回值

`customRef()` 返回一个 `ref` 对象，该对象的行为由你提供的工厂函数定义。

## 原理

`customRef` 的核心原理在于它允许你自定义响应式数据的读取（`get`）和设置（`set`）行为，并通过 `track` 和 `trigger` 控制依赖收集和触发更新的时机。这使得你可以在不直接修改 Vue 内部响应式系统的情况下，实现复杂的响应性逻辑。

## 使用场景

- **复杂的响应式逻辑**：当你需要基于特定条件或逻辑来触发响应性更新时。
- **性能优化**：通过控制依赖收集和更新的时机，可以避免不必要的计算或 DOM 更新。
- **集成第三方库**：当需要将 Vue 的响应性系统与第三方库集成时，`customRef` 可以提供一个桥梁。

## 示例代码

下面是一个使用 `customRef` 来创建一个具有防抖功能的 ref 的示例：

```javascript
import { customRef, ref } from "vue";

function useDebouncedRef(value, delay = 200) {
  let timeout = null;

  const state = ref(value);

  const debouncedState = customRef((track, trigger) => ({
    get() {
      track(); // 追踪依赖
      return state.value;
    },
    set(newValue) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        state.value = newValue;
        trigger(); // 触发更新
      }, delay);
    },
  }));

  return debouncedState;
}

export default {
  setup() {
    const searchQuery = useDebouncedRef("");

    // 使用 searchQuery 进行搜索操作，它将在输入停止后延迟触发
    return { searchQuery };
  },
};
```

在这个示例中，`useDebouncedRef` 函数接收一个初始值和一个延迟时间（默认为 200 毫秒），并返回一个 `ref`，该 `ref` 的值在更新时会等待指定的延迟时间后才真正触发更新，从而实现防抖效果。这在处理搜索框输入等场景时非常有用，可以减少不必要的搜索请求。
