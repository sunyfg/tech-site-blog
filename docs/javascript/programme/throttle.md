# 节流

实现一个函数 `throttle`，用于限流（节流）

**解题思路**：

- 使用 `setTimeout` 来实现延迟执行。
- 记录上一次执行的时间，并比较当前时间与上一次执行时间的间隔。
- 如果间隔大于设定的时间阈值，则执行函数，并更新上一次执行的时间。

```javascript
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// 使用示例
window.addEventListener(
  "resize",
  throttle(function () {
    console.log("Window resized!");
  }, 250)
);
```
