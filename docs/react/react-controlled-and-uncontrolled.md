# 受控组件和非受控组件

受控组件（Controlled Components）和非受控组件（Uncontrolled Components）是 React 中两种常见的表单元素状态管理方式，它们在处理用户输入时有着不同的机制和应用场景。

## 一、受控组件（Controlled Components）

**定义**：

受控组件是指其值由 React 组件的 state 来控制的表单元素。这意味着，当表单元素的值发生变化时，这个变化会被 React 的 state 捕获，并通过 onChange 事件处理函数来更新 state，从而保持组件的渲染输出与组件的状态同步。

**特点**：

1. **状态控制**：表单元素的值完全由 React 组件的 state 控制，任何变化都会通过 onChange 事件更新到 state 中。
2. **可预测性**：由于组件的值是由 React 的状态控制的，因此当状态变化时，组件的行为是可预测的。
3. **可控性**：开发者可以精确地控制组件的值，这在处理复杂的用户交互和数据流时非常有用。
4. **组件复用**：受控组件可以轻松地在不同的上下文中复用，因为它们的值和行为完全由父组件控制。

**使用场景**：

- 需要对用户输入进行实时验证的场景。
- 需要根据用户输入实时更新其他 UI 元素的场景。
- 表单字段数量或类型动态变化的场景。

**示例代码**：

```jsx
class ControlledComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}
```

## 二、非受控组件（Uncontrolled Components）

**定义**：

非受控组件是指其值不由 React 组件的 state 控制的表单元素。相反，这些表单元素的值由 DOM 元素自身维护和管理。在 React 中，我们通常通过 ref 来获取非受控组件的当前值。

**特点**：

1. **简洁性**：使用非受控组件可以减少样板代码，使代码更加简洁。
2. **性能**：在某些情况下，非受控组件可以提高性能，因为它们不需要在每次值变化时触发状态更新和组件重渲染。
3. **不可预测性**：由于 React 不控制非受控组件的值，因此在某些复杂的场景下，组件的行为可能变得不可预测。
4. **难以管理**：在复杂的应用中，非受控组件可能导致难以追踪和管理的状态。

**使用场景**：

- 简单的表单，不需要实时更新状态。
- 表单元素数量较少，且不需要复杂验证的场景。
- 需要与第三方库或旧代码集成的场景。

**示例代码**：

```jsx
class UncontrolledComponent extends React.Component {
  handleSubmit(event) {
    console.log("Submitted value:", event.target.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" defaultValue="Hello!" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

**注意**：在 React 16.3 之后，推荐使用`useRef` Hook 来替代类组件中的`ref`字符串或回调函数，以便在函数组件中使用 refs。

总结来说，受控组件和非受控组件各有其优缺点和适用场景。在 React 应用中，应根据具体需求和场景选择合适的组件类型。
