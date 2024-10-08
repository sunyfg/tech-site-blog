# 组合式 API：watch()

组合式 API 中的`watch()`函数是 Vue 3 中一个非常重要的特性，它允许开发者监听一个或多个响应式数据源的变化，并在数据变化时执行指定的回调函数。以下是关于`watch()`函数的详细介绍，包括其原理、用法以及相关参数。

## 原理

`watch()`函数利用了 Vue 的响应式系统来跟踪其指定的响应式数据源的变化。当你调用`watch()`时，Vue 会执行以下步骤：

1. **解析源数据**：`watch()`的第一个参数可以是一个响应式引用（ref）、响应式对象（reactive）的某个属性、计算属性，或者是一个返回响应式值的 getter 函数，甚至是一个包含多个响应式源的数组。Vue 会解析这个参数，确定要观察的数据源。

2. **设置依赖**：Vue 会内部创建一个观察者（watcher）实例，并将这个观察者与指定的数据源关联起来。这个关联过程实际上是在响应式系统的依赖图中为这些数据源添加了一个新的依赖项（即当前的观察者）。

3. **触发回调**：当数据源的值发生变化时，响应式系统会通过 Proxy 捕获到这个变化，并通知所有依赖于此数据源的观察者。对于`watch()`来说，这意味着它会执行你提供的回调函数，并将变化后的新值和旧值作为参数传递给这个回调函数。

4. **清理工作**（可选）：在某些情况下，你可能需要在观察者被销毁时执行一些清理工作（比如取消定时器、移除事件监听器等）。Vue 的响应式系统提供了机制来注册和调用这些清理函数。然而，在`watch()`的常规用法中，这个步骤通常是隐式的，因为 Vue 会自动管理观察者的生命周期。但是，在`watchEffect()`的`onInvalidate`回调中，你可以注册清理函数。

## 用法

`watch()`函数的基本用法如下：

```javascript
import { ref, watch } from "vue";

const counter = ref(0);

watch(counter, (newValue, oldValue) => {
  console.log(`counter changed from ${oldValue} to ${newValue}`);
});
```

在这个例子中，`watch()`函数监听了一个名为`counter`的响应式引用（ref）。当`counter`的值发生变化时，会执行提供的回调函数，并在回调函数中接收到变化后的新值（`newValue`）和变化前的旧值（`oldValue`）。

## 参数

`watch()`函数可以接受两个主要参数，以及一个可选的配置对象：

1. **源（Source）**：可以是响应式引用（ref）、响应式对象（reactive）、计算属性、一个返回响应式值的 getter 函数，或者由以上类型组成的数组。当监听多个源时，回调函数将接收这些源变化后的新值和旧值，它们以数组的形式传递。

2. **回调函数（Callback）**：当监听的数据源发生变化时执行的函数。该函数可以接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数（在某些版本的 Vue 3 中可能不包括此参数）。然而，在大多数情况下，只需要前两个参数。

3. **选项（Options）**（可选）：一个包含可选配置的对象，例如：
   - `immediate`：布尔值，指定是否在监听器创建时立即执行回调函数。
   - `deep`：布尔值，当监听的是对象或数组时，开启深度监听，以便在对象的嵌套属性或数组的内部元素发生变化时也能触发回调。
   - `flush`：字符串，用于调整回调函数的刷新时机，可以是`'pre'`（组件更新前，默认行为）、`'post'`（组件更新后）或`'sync'`（同步触发，但应谨慎使用以避免性能问题）。

## 示例

以下是一些使用`watch()`函数的示例：

- **监听单个响应式引用**：

  ```javascript
  watch(counter, (newValue, oldValue) => {
    // 逻辑处理
  });
  ```

- **监听多个响应式引用**：

  ```javascript
  const counter = ref(0);
  const name = ref("Alice");

  watch([counter, name], ([newCounter, newName], [oldCounter, oldName]) => {
    // 逻辑处理
  });
  ```

- **使用`immediate`和`deep`选项**：

  ```javascript
  const obj = reactive({ a: 1, b: { c: 2 } });

  watch(
    obj,
    (newValue, oldValue) => {
      // 深度监听整个对象
    },
    { deep: true, immediate: true }
  );

  // 或者监听对象的某个嵌套属性
  watch(
    () => obj.b.c,
    (newValue, oldValue) => {
      // 深度监听特定属性
    },
    { deep: true }
  );
  ```

通过`watch()`函数，Vue 3 提供了灵活且强大的方式来响应数据变化，使得开发者能够编写出更加动态和响应式的应用。

## 注意事项

- **深度观察**：默认情况下，`watch()`不会深度观察对象或数组的内部变化。如果你需要深度观察，可以通过将`watch()`的第三个参数（选项对象）中的`deep`属性设置为`true`来实现。

- **立即执行**：你可以通过设置选项对象的`immediate`属性为`true`来让`watch()`在创建时立即执行一次回调函数，而不是等到数据第一次变化时才执行。

- **停止观察**：如果你需要停止观察某个数据源，可以调用`watch()`返回的停止函数。这个函数会移除观察者与数据源之间的依赖关系，并停止执行回调函数。
