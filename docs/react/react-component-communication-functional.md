# React 中的组件通信方式（函数式）

在 React 中，随着函数式组件和 Hooks 的普及，组件通信的方式也发生了一些变化，但基本概念仍然保持不变。以下是使用函数式组件时常见的组件通信方式：

## 1. 父子组件通信

### 父组件向子组件通信

- **通过 Props 传递**：父组件可以通过 props 将数据或函数传递给子组件。在函数式组件中，这些 props 直接作为参数传递给组件函数。

  **示例**：

  ```jsx
  // 父组件
  function Parent() {
    const message = "Hello from Parent";
    return <Child message={message} />;
  }

  // 子组件
  function Child({ message }) {
    return <div>{message}</div>;
  }
  ```

### 子组件向父组件通信

- **通过回调函数**：子组件通过调用父组件通过 props 传递的回调函数，将数据或事件通知给父组件。

  **示例**：

  ```jsx
  // 父组件
  function Parent() {
    const handleMessage = (message) => {
      console.log(message);
    };

    return <Child onMessage={handleMessage} />;
  }

  // 子组件
  function Child({ onMessage }) {
    return (
      <button onClick={() => onMessage("Hello from Child")}>
        Send Message
      </button>
    );
  }
  ```

## 2. 兄弟组件或跨层级组件通信

由于函数式组件本身不直接支持跨层级的通信（如类组件中的 `context`），我们可以使用以下几种方法来实现兄弟组件或跨层级组件的通信：

- **使用 Context API**：Context 提供了一种在组件树中共享数据的方式，无论组件的层级有多深。在函数式组件中，我们可以使用 `useContext` 钩子来访问 Context 的值。

  **示例**（创建 Context 和使用 Context）：

  ```jsx
  // 创建 Context
  const MyContext = React.createContext(null);

  // 使用 Context 的组件
  function ChildUsingContext() {
    const value = useContext(MyContext);
    return <div>{value}</div>;
  }

  // 提供 Context 值的组件
  function ParentProvidingContext() {
    const value = "Shared Value";
    return (
      <MyContext.Provider value={value}>
        <ChildUsingContext />
        {/* 其他子组件或兄弟组件也可以在这里使用 Context */}
      </MyContext.Provider>
    );
  }
  ```

- **使用全局状态管理库（如 Redux、MobX、Zustand 等）**：这些库允许你在整个应用中共享状态，并提供了灵活的更新和访问状态的方式。在函数式组件中，你可以使用相应的 Hooks（如 Redux 的 `useSelector` 和 `useDispatch`，或 Zustand 的 `useStore`）来访问和更新状态。

- **使用自定义 Hooks**：如果你发现自己在多个组件中重复相同的逻辑（如订阅和取消订阅事件），你可以将这些逻辑封装成一个自定义的 Hook，然后在需要的组件中使用它。虽然这本身不是一种通信方式，但它可以帮助你组织代码，使得组件间的通信更加清晰和可维护。

## 总结

在 React 的函数式组件中，组件通信主要依赖于 props、回调函数、Context API 以及全局状态管理库。通过合理使用这些工具，你可以实现组件之间的高效和灵活的通信。
