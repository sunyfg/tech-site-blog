# Promise

JavaScript 的 Promise 是一个代表了异步操作最终完成（或失败）及其结果值的对象。它允许你以同步的方式书写异步代码，通过 `.then()`、`.catch()` 和 `.finally()` 方法来处理异步操作的成功、失败和完成（无论成功还是失败）后的清理工作。Promise 的引入极大地简化了异步编程的复杂性，提高了代码的可读性和可维护性。

## 基本结构

一个 Promise 有三种状态：

1. **Pending（等待）**：初始状态，既不是成功，也不是失败状态。
2. **Fulfilled（已成功）**：意味着操作成功完成。
3. **Rejected（已失败）**：意味着操作失败。

Promise 的状态一旦改变，就不会再变。也就是说，一个 Promise 对象从 pending 状态变为 fulfilled 状态或 rejected 状态后，就不可逆转了。

## 创建 Promise

Promise 构造函数接受一个执行器（executor）函数作为参数，执行器函数本身又接受两个函数作为参数：`resolve` 和 `reject`。这两个函数由 JavaScript 引擎提供，用于改变 Promise 的状态。

```javascript
let promise = new Promise(function(resolve, reject) {
  // 异步操作
  if (/* 异步操作成功 */) {
    resolve(value); // 将 promise 的状态从 pending 变为 fulfilled，并将 value 传递给 then 方法的回调函数
  } else {
    reject(error); // 将 promise 的状态从 pending 变为 rejected，并将 error 传递给 catch 方法的回调函数
  }
});
```

## 使用 Promise

Promise 对象提供了 `.then()`、`.catch()` 和 `.finally()` 方法用于处理异步操作的结果。

- **.then(onFulfilled, onRejected)**：`onFulfilled` 是当 Promise 成功时（fulfilled）调用的函数，`onRejected` 是当 Promise 失败时（rejected）调用的函数。它们都是可选的。

- **.catch(onRejected)**：`.catch()` 方法是 `.then(null, onRejected)` 的语法糖，用于捕获 Promise 链中发生的错误。

- **.finally(onFinally)**：无论 Promise 成功或失败，`onFinally` 函数都会被调用。它主要用于清理工作，如关闭文件描述符、释放资源等。

## Promise 链

由于 `.then()` 方法返回一个新的 Promise，因此可以链式调用 `.then()` 方法，形成 Promise 链。这使得处理多个异步操作变得简单而直观。

```javascript
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .catch(failureCallback);
```

## 静态方法

Promise 还提供了几个静态方法，用于处理多个 Promise 实例。

- **Promise.all(promises)**：等待所有给定的 Promise 完成，并返回一个新的 Promise，该 Promise 的结果是一个数组，包含了所有给定 Promise 的结果。

- **Promise.race(promises)**：等待第一个给定的 Promise 完成，并返回那个 Promise 的结果。

- **Promise.reject(reason)**：返回一个以指定原因被拒绝（rejected）的 Promise。

- **Promise.resolve(value)**：返回一个以指定值被解决（fulfilled）的 Promise。如果给定的值是 Promise，则返回那个 Promise。

## 注意事项

- 在处理 Promise 时，应避免在 `.then()` 或 `.catch()` 中进行异步操作而不返回新的 Promise，这可能会导致错误被吞没。
- 使用 Promise 时，应确保链式调用的每个 `.then()` 方法都返回一个 Promise，以保持链的完整性。
- Promise 链中的错误应该被适当地捕获和处理，以避免未处理的 Promise 拒绝（Unhandled Rejection）。
