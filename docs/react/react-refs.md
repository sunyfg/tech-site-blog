# 你对 React 的 refs 有什么了解？

React 中的 Refs（引用）是一个重要的特性，它允许开发者直接访问 DOM 元素或者 React 组件的实例。Refs 提供了一种在 React 中访问和操作底层 DOM 的方式，通常在需要直接与 DOM 交互时使用。以下是对 React Refs 的详细了解：

## 一、Refs 的基本概念

Refs 在计算机中原本称为弹性文件系统（Resilient File System，简称 ReFS），但在 React 中，Refs 被赋予了新的含义，即提供了一种方式允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。Refs 的本质是 ReactDOM.render()返回的组件实例，如果是渲染组件则返回的是组件实例，如果渲染 DOM 则返回的是具体的 DOM 节点。

## 二、Refs 的创建与使用

在 React 中，创建和使用 Refs 主要有以下几种方式：

1. **React.createRef()**：

   - 通常用于类组件中。在类组件的构造函数中，通过 React.createRef()创建一个 ref 对象，并将其赋值给组件实例的一个属性。然后，在 render 方法中，通过 ref 属性将创建的 ref 传递给需要引用的 DOM 元素或组件实例。
   - 访问 ref 时，通过 this.myRef.current 访问绑定的 DOM 元素或组件实例，可以操作该元素的属性和方法。

2. **useRef() Hook**：

   - 用于函数组件中。通过 useRef() Hook 创建一个 ref 对象，并将其赋值给一个变量。然后，在 JSX 中，通过 ref 属性将创建的 ref 传递给需要引用的 DOM 元素或组件实例。
   - 访问 ref 时，通过 myRef.current 访问绑定的 DOM 元素或组件实例。

3. **回调函数 Refs**：

   - 在 React 16.3 之前的版本中较为常见，但现在更推荐使用 React.createRef 或 useRef。回调函数 Refs 允许你传递一个回调函数，该回调函数会在组件挂载后立即执行，并将 DOM 元素或组件实例作为参数传入。

4. **字符串 Refs**（已废弃）：
   - 在 React 的早期版本中，可以使用字符串作为 ref 的值，但这种方式在 React 16.3 及以后的版本中已被废弃，因为它可能导致组件间的耦合度增加，且不利于代码的维护和扩展。

## 三、Refs 的作用

Refs 在 React 中的作用主要体现在以下几个方面：

1. **直接访问 DOM 元素**：

   - 在某些情况下，开发者需要直接访问 DOM 元素进行操作，如设置焦点、控制媒体播放、获取或设置元素的尺寸等。通过 Refs，可以方便地实现这些操作。

2. **集成第三方 DOM 库**：

   - 当使用一些需要直接操作 DOM 的第三方库时，Refs 可以提供必要的接口。例如，图表库、图像库或其他 UI 库通常需要访问 DOM 元素来渲染内容或执行特定操作。

3. **控制组件的行为**：
   - 通过 Refs，可以在父组件中调用子组件的实例方法或属性。这允许父组件直接控制子组件的行为，如触发子组件的某个方法或修改子组件的状态。

## 四、使用 Refs 的注意事项

尽管 Refs 是一个强大的工具，但在使用时需要谨慎：

1. **避免滥用 Refs**：

   - 过多使用 Refs 会使组件的实例或 DOM 结构暴露，违反组件封装的原则。在 React 的哲学中，通常建议通过状态和属性来管理 UI，而不是直接操作 DOM。

2. **注意 Refs 的更新时机**：

   - Refs 的更新是同步的，但 React 可能会将多个 setState()调用合并成一个更新批次，并在事件处理函数执行完毕后再进行。因此，在事件处理函数中设置 Refs 后，可能需要等待下一个事件循环才能访问到最新的 DOM 元素。

3. **使用 forwardRef 传递 Refs**：
   - 当需要将 Refs 传递给子组件时，可以使用 React.forwardRef。这使得子组件可以接收父组件传递的 ref，并将其附加到子组件内部的 DOM 元素或组件实例上。

## 五、refs 示例

### 类组件中使用 Refs

#### 示例 1：使用 React.createRef()

假设我们有一个类组件，需要在用户点击按钮时自动聚焦到输入框。

```jsx
import React, { Component } from "react";

class FocusInput extends Component {
  constructor(props) {
    super(props);
    // 创建一个ref来保存input元素的引用
    this.inputRef = React.createRef();
  }

  focusInput = () => {
    // 使用ref的current属性来访问DOM元素并调用focus方法
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div>
        <input ref={this.inputRef} type="text" />
        <button onClick={this.focusInput}>Focus the input</button>
      </div>
    );
  }
}

export default FocusInput;
```

#### 示例 2：使用回调函数 Refs（不推荐，仅为演示）

虽然回调函数 Refs 在 React 16.3 之后逐渐被 React.createRef 和 useRef 所取代，但了解其用法仍有助于理解 Refs 的多样性。

```jsx
import React, { Component } from "react";

class CallbackRefComponent extends Component {
  constructor(props) {
    super(props);
    this.inputRef = null; // 初始化一个变量来存储DOM元素
  }

  setInputRef = (element) => {
    // 将DOM元素存储在this.inputRef中
    this.inputRef = element;
  };

  focusInput = () => {
    // 使用存储的DOM元素调用focus方法
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  render() {
    return (
      <div>
        <input ref={this.setInputRef} type="text" />
        <button onClick={this.focusInput}>Focus the input</button>
      </div>
    );
  }
}

export default CallbackRefComponent;
```

### 函数组件中使用 Refs

在函数组件中，由于不存在实例（this），因此需要使用`useRef` Hook 来创建 Refs。

#### 示例：使用 useRef()

```jsx
import React, { useRef, useEffect } from "react";

function FocusInputFunction() {
  // 创建一个ref来保存input元素的引用
  const inputRef = useRef(null);

  // 在组件挂载后自动聚焦到输入框
  useEffect(() => {
    inputRef.current?.focus();
  }, []); // 空依赖数组表示该effect只在组件挂载时运行一次

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button>Focus the input (auto-focused on mount)</button>
    </div>
  );
}

export default FocusInputFunction;
```

## 六、使用场景

以下是一些应该使用 Refs 的场景：

### 1. 直接操作 DOM

- **焦点管理**：当需要控制 DOM 元素的焦点时，如输入框、按钮等，可以使用 Refs 来直接调用元素的`.focus()`或`.blur()`方法。
- **媒体控制**：对于视频、音频等媒体元素，Refs 允许你直接控制播放、暂停等。
- **样式和类名修改**：虽然通常推荐使用内联样式或 CSS 类来控制元素的样式，但在某些复杂场景下，可能需要直接通过 Refs 来修改 DOM 元素的样式或类名。

### 2. 与第三方库集成

- **图表库**：当使用需要直接操作 DOM 的图表库（如 Chart.js）时，Refs 可以将 React 组件中的 DOM 元素传递给这些库，以便它们进行渲染。
- **DOM 库**：对于需要直接操作 DOM 的 JavaScript 库（如 jQuery 插件），Refs 提供了一种将 React 组件与这些库集成的方式。

### 3. 动画和过渡

- **精确控制**：在进行复杂的动画或过渡效果时，Refs 允许你访问 DOM 元素的精确位置和尺寸，从而进行更精细的控制。
- **第三方动画库**：当使用需要直接操作 DOM 的动画库时，Refs 可以将 React 组件中的 DOM 元素传递给这些库，以实现动画效果。

### 4. 读取 DOM 属性

- **输入值**：在处理表单时，Refs 可以用来读取输入框的值，尤其是在需要绕过 React 的受控组件和非受控组件模式时。
- **滚动位置**：Refs 允许你读取或设置 DOM 元素的滚动位置，这在实现滚动到页面特定位置的功能时非常有用。

### 5. 调用子组件的方法

- **组件间通信**：虽然 React 推荐使用 props 和 state 进行组件间通信，但在某些情况下，父组件可能需要直接调用子组件的方法。通过 Refs，父组件可以获取子组件的实例，并调用其上的方法。

## 七、总结

综上所述，React 中的 Refs 是一个强大的特性，它允许开发者直接访问和操作 DOM 元素或组件实例。然而，在使用 Refs 时需要谨慎考虑其适用场景和潜在风险，以确保代码的可维护性和可扩展性。
