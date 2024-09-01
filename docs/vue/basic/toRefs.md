# 组合式 API：toRefs()

`toRefs()` 是 Vue 3 组合式 API 中的一个函数，它用于将一个响应式对象（通常是由 `reactive()` 创建的）转换为普通对象，其中该对象的每个属性都是指向原始对象相应属性的 `ref` 对象。这意味着，当你通过 `toRefs()` 转换得到的对象的属性时，你实际上是在访问或修改原始响应式对象上的属性，但这些属性现在是作为 `ref` 对象被引用的，它们各自保持了对原始属性的响应式连接。

## 基本用法

`toRefs()` 函数接收一个响应式对象作为参数，并返回一个新的对象。这个新对象的每个属性都是一个 `ref` 对象，这些 `ref` 对象的 `.value` 属性与原始响应式对象的相应属性保持同步。

```javascript
import { reactive, toRefs } from "vue";

const state = reactive({
  foo: 1,
  bar: {
    baz: 2,
  },
});

// 使用 toRefs 转换 state
const stateAsRefs = toRefs(state);

// 现在 stateAsRefs 是一个普通对象，但它的每个属性都是 ref 对象
console.log(stateAsRefs.foo.value); // 输出: 1
console.log(stateAsRefs.bar.value.baz); // 输出: 2

// 修改 stateAsRefs 中的属性
stateAsRefs.foo.value++;
console.log(state.foo); // 输出: 2，因为 state.foo 也被修改了

// 注意：直接修改 stateAsRefs.bar 不会更新 state.bar，因为 bar 本身是一个对象
// 你需要修改 bar 内部的属性来触发响应式更新
stateAsRefs.bar.value.baz++;
console.log(state.bar.baz); // 输出: 3

// 但是，如果你尝试替换整个 bar 对象，它不会与原始 state.bar 保持同步
stateAsRefs.bar.value = { baz: 4 }; // 这会断开与原始 state.bar 的连接
console.log(state.bar.baz); // 输出: 3，因为 state.bar 没有被更新
```

**注意**：在上面的例子中，`stateAsRefs.bar` 仍然是一个 `ref` 对象，它指向原始的 `state.bar` 对象。但是，当你尝试给 `stateAsRefs.bar.value` 赋一个新的对象时，你实际上是在替换 `stateAsRefs.bar.value` 指向的对象，而不是修改原始的 `state.bar` 对象。因此，这种替换不会触发对 `state.bar` 的响应式更新。

## 使用场景

`toRefs()` 的主要使用场景之一是在需要将响应式对象传递给组件的 `props` 或 `setup()` 函数的返回值时，同时希望保持对这些属性的响应式引用。由于 Vue 3 的 `props` 是响应式的，但它们是只读的，并且 `setup()` 函数的返回值会被 Vue 用来设置组件的响应式状态，因此使用 `toRefs()` 可以确保你传递或返回的对象属性保持其响应性，同时避免直接修改原始响应式对象可能带来的问题。

## 注意事项

- `toRefs()` 创建的 `ref` 对象与原始响应式对象的属性保持响应式连接，但它们是独立的引用。这意味着，你可以通过 `ref` 对象的 `.value` 属性来访问或修改原始属性，但这些修改是通过 `ref` 对象进行的，而不是直接作用于原始对象。
- 对于嵌套对象，`toRefs()` 只会转换最外层的属性为 `ref` 对象。嵌套对象本身（如上例中的 `state.bar`）仍然是一个普通的响应式对象，而不是 `ref` 对象。如果你需要保持对嵌套对象内部属性的独立响应式引用，你可能需要考虑使用 `computed` 或其他组合式 API 函数。
- 在使用 `toRefs()` 时，请确保你理解它如何与 Vue 的响应式系统交互，以避免不必要的数据流混乱和性能问题。特别是要注意，当你替换 `ref` 对象指向的对象时（如 `stateAsRefs.bar.value = { baz: 4 }`），你实际上是在断开与原始对象的连接，而不是在修改原始对象。
