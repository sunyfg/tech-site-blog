# 组合式 API：reactive()

`reactive()` 是 Vue 3 组合式 API 中的一个核心函数，用于创建一个响应式的对象。与 `ref()` 不同，`reactive()` 直接作用于一个对象，使其所有的属性（包括嵌套对象）都成为响应式的。这意味着，当你修改这个对象的任何属性时，Vue 的响应式系统都能够检测到这个变化，并自动更新依赖于这些属性的 DOM。

## 基本用法

当你调用 `reactive()` 函数时，你需要传递一个普通对象给它。`reactive()` 会返回一个代理对象（Proxy），这个代理对象与原始对象在功能上保持一致，但是它是响应式的。这意味着，你不能直接通过原始对象来访问或修改响应式状态，而应该通过代理对象来进行操作。

```javascript
import { reactive } from "vue";

// 创建一个响应式对象
const state = reactive({
  count: 0,
  name: "Vue",
  nested: {
    deep: true,
  },
});

// 访问和修改响应式状态
console.log(state.count); // 输出: 0
state.count = 1;
console.log(state.count); // 输出: 1

// 修改嵌套对象的属性
state.nested.deep = false;
console.log(state.nested.deep); // 输出: false
```

## 在模板中使用

在 Vue 组件的模板中，你可以直接访问 `reactive()` 创建的响应式对象的属性，而不需要像 `ref()` 那样通过 `.value` 来访问。Vue 的模板编译器会自动处理这个过程，所以你只需要使用对象的属性名即可。

```vue
<template>
  <div>
    <p>{{ state.count }}</p>
    <p>{{ state.name }}</p>
    <p>{{ state.nested.deep }}</p>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
      name: "Vue",
      nested: {
        deep: true,
      },
    });

    // 可以在这里定义修改 state 的方法

    return {
      state,
    };
  },
};
</script>
```

## 响应式原理

`reactive()` 背后使用了 Vue 3 的响应式系统，该系统基于 ES2015+ 的 Proxy 对象来实现。当你修改 `reactive()` 返回的代理对象的属性时，Proxy 会捕获到这个变化，并通知 Vue 的响应式系统。然后，Vue 的响应式系统会根据这个变化来更新视图。

## 注意事项

- `reactive()` 适用于对象类型的数据，包括数组。对于基本数据类型（如字符串、数字、布尔值），应该使用 `ref()`。
- 当你修改 `reactive()` 创建的响应式对象的属性时，Vue 的响应式系统能够检测到这个变化。但是，如果你替换了对象的根级别属性（而不是修改它），那么这个新的属性值需要是响应式的，否则 Vue 将无法追踪其后续的变化。
- 嵌套对象也是响应式的。这意味着，当你修改嵌套对象的属性时，Vue 同样能够检测到这个变化。
- `reactive()` 返回的是代理对象，你应该通过这个代理对象来访问和修改响应式状态，而不是通过原始对象。
- 在模板中访问 `reactive()` 创建的响应式对象的属性时，不需要使用额外的语法。
- `reactive()` 提供的响应式能力与 Vue 2 中的 `Vue.observable()` 类似，但 Vue 3 的响应式系统更加高效和强大。
