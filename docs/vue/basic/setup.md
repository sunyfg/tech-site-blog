# 组合式 API：setup()

`setup()` 函数是 Vue 3 组合式 API（Composition API）的核心入口点。它是所有组合式 API 函数的调用场所，也是组件内部使用响应式状态、计算属性、方法、生命周期钩子等特性的地方。在 `<script setup>` 语法糖被引入之前，`setup()` 函数是组件中可选的一个选项，用于替代 Vue 2 中的 `data`、`computed`、`methods` 等选项。但自从 `<script setup>` 成为官方推荐的编写组件的方式后，`setup()` 函数的使用变得更加普遍和直观。

## 基本用法

`setup()` 函数在组件创建之前被调用，它接收两个参数：

1. **props**：一个包含组件外部传入的所有 props 的对象。注意，`setup()` 函数中不能直接使用 `this` 来访问组件实例，因为此时组件实例尚未被创建。
2. **context**：一个普通的 JavaScript 对象，包含了组件的 `attrs`、`slots`、`emit` 等属性，用于访问组件的插槽、发出自定义事件等。但在大多数情况下，你可以通过解构 `context` 来单独获取 `attrs`、`slots` 和 `emit`。

`setup()` 函数可以返回一个对象，该对象中的属性或方法将被暴露给模板使用。此外，你也可以在 `setup()` 函数内部直接调用 `defineExpose` 函数来显式声明需要暴露给模板的属性或方法。

## 返回值

`setup()` 函数的返回值是一个对象，该对象可以包含响应式状态、计算属性、方法、生命周期钩子等。这些属性或方法将在组件的模板中可用。

## 响应式状态

在 `setup()` 函数中，你可以使用 `ref()` 或 `reactive()` 来创建响应式状态。这些响应式状态将自动被 Vue 的响应式系统追踪，并在其值发生变化时更新 DOM。

## 计算属性和侦听器

你可以使用 `computed()` 来创建计算属性，使用 `watch()` 或 `watchEffect()` 来创建侦听器。这些函数都可以在 `setup()` 函数内部被调用，并用于响应式状态的变化。

## 生命周期钩子

Vue 3 提供了与 Vue 2 类似的生命周期钩子，但它们在 `setup()` 函数中以函数的形式被调用，如 `onMounted()`、`onUnmounted()` 等。这些钩子允许你在组件的不同生命周期阶段执行代码。

## 示例

以下是一个使用 `setup()` 函数的 Vue 3 组件示例：

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    // 响应式状态
    const count = ref(0);

    // 方法
    function increment() {
      count.value++;
    }

    // 生命周期钩子
    onMounted(() => {
      console.log("Component is mounted!");
    });

    // 暴露给模板的响应式状态和方法
    return {
      count,
      increment,
    };
  },
};
</script>
```

然而，在 `<script setup>` 语法中，你可以更简洁地编写相同的组件：

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 响应式状态
const count = ref(0);

// 方法
function increment() {
  count.value++;
}

// 生命周期钩子
onMounted(() => {
  console.log("Component is mounted!");
});
</script>
```

在这个 `<script setup>` 示例中，你不需要显式地返回任何内容，因为所有顶层声明的响应式状态、计算属性、方法和生命周期钩子都将自动暴露给模板。这使得代码更加简洁和直观。
