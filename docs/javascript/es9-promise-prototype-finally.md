# Promise.prototype.finally()

`Promise.prototype.finally()` 是 ES2018（ES9）中引入的一个非常有用的 `Promise` 方法。它允许你指定一个无论 `Promise` 对象最后状态如何（fulfilled 或 rejected），都会执行的操作。这个方法对于清理资源、取消订阅、设置加载状态等场景非常有用。

## 详细解释

- **返回值**：`finally()` 方法返回一个 `Promise`。这个返回的 `Promise` 的结果由调用它的 `Promise` 决定，即如果原始的 `Promise` 被 fulfilled，则返回的 `Promise` 也会被 fulfilled；如果原始的 `Promise` 被 rejected，则返回的 `Promise` 也会被 rejected，且其拒绝原因与原始 `Promise` 相同。

- **用途**：主要用于在 `Promise` 链的末尾执行清理操作，或者无论 `Promise` 成功还是失败都需要执行的代码。

- **参数**：`finally()` 方法接受一个可选的回调函数作为参数，该回调函数不接受任何参数，也不期望返回任何值（尽管可以返回，但不会影响返回的 `Promise` 的结果）。

## 代码示例

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      // 假设请求成功
      resolve("Data fetched successfully");
      // 如果请求失败，则应该调用 reject('Error fetching data');
    }, 1000);
  });
}

fetchData()
  .then((data) => {
    console.log(data); // 输出: Data fetched successfully
    // 进行一些数据处理
  })
  .catch((error) => {
    console.error(error); // 如果请求失败，则会在这里捕获错误
    // 处理错误情况
  })
  .finally(() => {
    // 无论成功还是失败，都会执行这里的代码
    console.log("Cleanup operations...");
    // 进行清理操作，如取消订阅、关闭文件句柄等
  });

// 输出:
// Data fetched successfully
// Cleanup operations...
```

在上面的例子中，`fetchData()` 函数返回一个 `Promise`，该 `Promise` 在 1 秒后模拟请求成功并解析数据。然后，我们使用 `.then()` 方法来处理成功的情况，使用 `.catch()` 方法来处理错误情况。最后，我们使用 `.finally()` 方法来执行一些无论成功还是失败都需要进行的清理操作。

需要注意的是，`.finally()` 方法中的回调函数不接受任何参数，因此你无法知道原始的 `Promise` 是被 fulfilled 还是 rejected。但是，这并不影响你执行必要的清理操作。

此外，由于 `.finally()` 方法总是返回一个新的 `Promise`，你可以继续在这个返回的 `Promise` 上添加 `.then()`、`.catch()` 或 `.finally()` 方法，从而形成更长的 `Promise` 链。然而，在实际应用中，通常建议在链的末尾使用 `.finally()`，以确保它总是被执行。
