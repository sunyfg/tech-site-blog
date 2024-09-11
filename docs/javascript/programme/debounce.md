# 防抖

实现一个函数 `debounce`，用于防抖

**解题思路**：

- 使用 `setTimeout` 来延迟函数的执行。
- 在函数被触发时，如果已经设置了 `setTimeout`，则清除它并重新设置。
- 这样可以确保函数在最后一次触发事件后的一段时间内才执行。

```javascript
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 使用示例
const debouncedResize = debounce(function () {
  console.log("Window resized!");
}, 250);

window.addEventListener("resize", debouncedResize);
```
