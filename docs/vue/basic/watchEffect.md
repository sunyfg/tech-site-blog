# 组合式 API：watchEffect()

组合式 API 中的`watchEffect()`是 Vue 3 引入的一个功能强大的 API，用于自动追踪其执行过程中依赖的响应式数据，并在这些数据变化时重新运行。以下是对`watchEffect()`的详细介绍：

## 基本原理

`watchEffect()`的工作原理基于 Vue 3 的响应式系统。当`watchEffect()`被调用时，它立即执行传入的回调函数（称为“副作用函数”），并在此过程中自动追踪所有被访问的响应式数据。一旦这些数据中的任何一个发生变化，`watchEffect()`都会重新执行这个回调函数。

`watchEffect()`的工作原理可以概括为以下几个步骤：

1. **立即执行副作用函数**：
   当你调用`watchEffect()`时，它首先会立即执行你提供的回调函数（即副作用函数）。在这个执行过程中，Vue 的响应式系统会跟踪所有被访问的响应式数据。

2. **建立依赖关系**：
   在副作用函数执行期间，Vue 会记录下所有被访问的响应式数据，并将当前的副作用函数与这些数据建立依赖关系。这意味着，如果这些数据中的任何一个将来发生变化，Vue 都能够知道需要重新执行这个副作用函数。

3. **响应数据变化**：
   当响应式数据发生变化时（例如，通过用户输入、异步请求或其他 Vue 组件的更新），Vue 的响应式系统会检查这些变化是否影响到了任何已建立的依赖关系。如果影响到了`watchEffect()`中的副作用函数所依赖的数据，Vue 就会重新执行这个副作用函数。

4. **清理副作用**（可选）：
   在副作用函数中，你可以使用`onInvalidate`回调来注册清理函数。这些清理函数会在副作用函数重新执行之前被调用，用于执行必要的清理工作（如取消定时器、移除事件监听器等）。然而，这不是`watchEffect()`工作原理的核心部分，而是提供的一种额外功能。

5. **停止观察**：
   `watchEffect()`会返回一个停止函数，调用这个函数会移除副作用函数与响应式数据之间的依赖关系，从而停止观察这些数据的变化。

## 基本用法

```javascript
import { ref, watchEffect } from "vue";

const count = ref(0);

watchEffect(() => {
  console.log(`count is: ${count.value}`);
});

// 当count.value变化时，上面的回调函数将重新执行
```

## 特点

1. **非惰性**：与`watch()`不同，`watchEffect()`在组件加载时立即执行一次副作用函数，而不需要等到数据变化。

2. **自动依赖追踪**：`watchEffect()`会自动追踪副作用函数中使用的所有响应式数据，无需手动指定依赖项。

3. **只能访问当前值**：`watchEffect()`的回调函数只能接收到当前的数据值，而无法直接访问之前的数据值（尽管可以通过其他方式如外部变量来跟踪）。

4. **返回停止函数**：`watchEffect()`会返回一个函数，用于停止观察副作用函数中的响应式数据。

## 高级用法

- **清理副作用**：`watchEffect()`的回调函数可以接收一个`onInvalidate`函数作为参数，这个`onInvalidate`函数允许你注册一个清理函数，该清理函数会在副作用函数重新执行之前被调用，用于清理之前执行时可能产生的副作用（如定时器、事件监听器等）。

  ```javascript
  watchEffect((onInvalidate) => {
    const timer = setTimeout(() => {
      // 一些定时任务
    }, 1000);

    onInvalidate(() => {
      clearTimeout(timer);
    });
  });
  ```

- **控制刷新时机**：通过`flush`选项，可以控制`watchEffect()`的回调函数是在组件的 DOM 更新之前还是之后执行。默认是`'pre'`（在 DOM 更新之前）。

## 与 watch()的区别

- `watch()`需要明确指定要观察的数据源，而`watchEffect()`则会自动追踪副作用函数中使用到的所有响应式数据。
- `watch()`默认是惰性的，即只有在数据源变化时才执行回调函数；而`watchEffect()`则是非惰性的，它在创建时立即执行一次。
- `watch()`可以获取到变化前后的数据值，而`watchEffect()`只能获取到当前的数据值（但可以通过外部变量等方式间接获取旧值）。

## 总结

`watchEffect()`是 Vue 3 中一个非常实用的 API，它简化了对响应式数据变化的观察和处理，使得开发者能够编写出更加简洁和响应式的代码。通过自动依赖追踪和立即执行的特性，`watchEffect()`为 Vue 组件中的副作用处理提供了极大的便利。
