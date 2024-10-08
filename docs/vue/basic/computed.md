# 组合式 API：computed()

`computed()` 是 Vue 3 组合式 API 中的一个核心函数，它用于声明一个计算属性。计算属性是基于它们的响应式依赖进行缓存的派生值。只有当计算属性中的响应式依赖发生变化时，它才会重新求值。这意味着只要依赖项不变，多次访问计算属性将立即返回之前的计算结果，而无需再次执行计算逻辑，这有助于提高性能。

## 基本用法

`computed()` 函数接受一个 getter 函数（以及可选的 setter 函数）作为参数，并返回一个只读的响应式引用对象（如果没有提供 setter）。这个引用对象的 `.value` 属性包含了计算属性的当前值。

```javascript
import { reactive, computed } from "vue";

const count = reactive({
  value: 0,
});

// 创建一个计算属性，该属性是 count.value 的加倍
const double = computed(() => {
  return count.value * 2;
});

console.log(double.value); // 输出: 0

count.value++;
console.log(double.value); // 输出: 2
```

## 原理

`computed()` 的工作原理基于 Vue 3 的响应式系统，该系统使用 Proxy 对象来拦截对象属性的读取和设置操作。当计算属性被创建时，Vue 会做以下几件事：

1. **收集依赖**：在 getter 函数执行期间，Vue 会追踪所有被访问的响应式属性（如 `count.value` 在上面的例子中）。这些属性被视为计算属性的依赖项。

2. **缓存结果**：计算属性的结果会被缓存起来，以便在后续访问时能够快速返回而无需重新计算。

3. **依赖变更通知**：当计算属性的依赖项（如 `count.value`）发生变化时，Vue 的响应式系统会通知计算属性重新求值。这是通过触发 getter 函数中的副作用（side effects）来实现的，这些副作用在内部被管理以确保计算属性的响应性。

4. **重新计算**：如果计算属性的依赖项发生了变化，并且计算属性被再次访问，Vue 会重新执行 getter 函数以获取新的值，并更新缓存。

## 高级用法

- **设置器（Setter）**：除了 getter 函数之外，`computed()` 还允许你提供一个可选的 setter 函数。当计算属性的 `.value` 被修改时，setter 函数将被调用，允许你执行一些自定义逻辑，如更新依赖项或执行其他副作用。

- **可写计算属性**：通过提供 getter 和 setter 函数，你可以创建一个可写的计算属性。这允许你不仅从计算属性中读取值，还可以修改它（尽管这通常不是计算属性的典型用途，因为它们通常用于派生值）。

## 注意事项

- 计算属性应该只用于声明依赖于其他响应式状态的计算值。如果计算属性不依赖于任何响应式状态，或者其依赖项在组件的生命周期内不会发生变化，那么使用普通的函数可能更合适。

- 避免在计算属性中进行复杂的异步操作或具有副作用的操作，因为这可能会破坏组件的响应性和可预测性。对于这类操作，请考虑使用 Vue 的生命周期钩子、`watch` 函数或其他组合式 API 函数。

- 计算属性是自动依赖收集的，因此你不需要手动声明它们依赖哪些响应式属性。Vue 的响应式系统会自动为你处理这些依赖关系。
