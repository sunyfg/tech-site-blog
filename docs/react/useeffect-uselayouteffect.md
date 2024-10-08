# useEffect、useLayoutEffect 区别

`useEffect`和`useLayoutEffect`都是 React 中用于处理副作用（side effects）的 Hook，它们的主要区别在于执行时机、对页面渲染的影响以及适用场景。

## 执行时机

- **`useEffect`**：异步执行，在组件渲染到屏幕之后执行，即 DOM 更新后和浏览器绘制之前。这意味着`useEffect`中的代码不会阻塞页面的渲染，而是等待浏览器完成所有的渲染工作后再执行。
- **`useLayoutEffect`**：同步执行，在 DOM 更新之后、浏览器绘制之前执行。它的执行时机比`useEffect`更早，但可能会阻塞页面的渲染，因为它在浏览器绘制之前完成所有的副作用操作。

## 对页面渲染的影响

- **`useEffect`**：由于它是异步执行的，如果在`useEffect`中修改 DOM，可能会在用户看到渲染结果之后再次触发浏览器的回流（reflow）和重绘（repaint），导致页面闪烁或用户看到不一致的界面。
- **`useLayoutEffect`**：由于是同步执行的，它可以在页面绘制之前更新 DOM，从而确保用户看到的是一致的界面。但是，如果`useLayoutEffect`中的操作耗时较长，可能会阻塞页面的渲染，影响性能。

## 适用场景

- **`useEffect`**：适用于大多数副作用逻辑的处理，特别是那些不需要立即执行的操作，如数据获取、订阅事件、设置定时器、网络请求等。在大多数情况下，推荐使用`useEffect`，因为它的异步执行不会阻塞页面的渲染，同时可以避免一些潜在的问题。
- **`useLayoutEffect`**：适用于需要立即更新 DOM 以确保用户看到一致界面的场景，如测量 DOM 尺寸、操作 DOM 元素的样式、对焦等。此外，当副作用依赖于浏览器布局和绘制时，或者需要在渲染前同步执行副作用逻辑时，也可以选择`useLayoutEffect`。但是，由于它可能会阻塞页面渲染，因此在使用时需要谨慎考虑性能问题。

## 总结

`useEffect`和`useLayoutEffect`的主要区别在于执行时机和对页面渲染的影响。`useEffect`适合异步执行的副作用逻辑，而`useLayoutEffect`适合需要立即更新 DOM 以确保界面一致性的场景。在选择使用时，应根据具体需求和性能考虑来决定使用哪个 Hook。
