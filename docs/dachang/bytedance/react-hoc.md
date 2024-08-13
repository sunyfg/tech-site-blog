# 什么是高阶组件，请举例说明?

高阶组件（Higher Order Component，简称 HOC）是 React 中一种用于重用组件逻辑的高级技术。它不是 React API 的一部分，而是一种基于 React 的组合性质的模式。高阶组件可以看作是一个“组件制造机”，它接受一个组件作为参数，并返回一个新的组件。通过这种方式，高阶组件可以在不改变原始组件的情况下，为组件添加新的功能或逻辑，从而提高组件的复用性和可维护性。

### 基本概念

- **定义**：高阶组件是一个函数，该函数接收一个组件并返回一个新的组件。
- **作用**：高阶组件允许我们在不改变原始组件代码的情况下，增强组件的功能，如数据获取、授权、日志记录、性能优化等。
- **优点**：逻辑复用、状态抽象、增强功能等。

### 举例说明

以下是几个高阶组件的示例，这些示例展示了高阶组件在不同场景下的应用：

#### 示例一：简单的高阶组件

这个高阶组件`withLogging`用于在组件挂载和卸载时打印日志。

```jsx
import React from "react";

const withLogging = (WrappedComponent) => {
  return class WithLogging extends React.Component {
    componentDidMount() {
      console.log("%c WrappedComponent mounted", "color: green");
    }

    componentWillUnmount() {
      console.log("%c WrappedComponent will unmount", "color: red");
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

const SimpleComponent = (props) => {
  return <div>{props.children}</div>;
};

const EnhancedSimpleComponent = withLogging(SimpleComponent);

// 使用 EnhancedSimpleComponent 时，它会在挂载和卸载时打印日志
```

#### 示例二：带有状态的高阶组件

这个高阶组件`withCounter`为被包裹的组件添加了一个计数器功能。

```jsx
import React, { useState } from "react";

const withCounter = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    const [count, setCount] = useState(0);
    const increment = () => {
      setCount(count + 1);
    };
    return <WrappedComponent count={count} increment={increment} {...props} />;
  };
};

const CounterDisplay = ({ count, increment }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

const EnhancedCounterDisplay = withCounter(CounterDisplay);

// 使用 EnhancedCounterDisplay 时，它将显示一个计数器和一个按钮来递增计数器
```

#### 示例三：条件渲染的高阶组件

这个高阶组件`withCondition`根据条件渲染被包裹的组件。

```jsx
import React from "react";

const withCondition = (WrappedComponent, condition) => {
  return class EnhancedComponent extends React.Component {
    shouldComponentUpdate(nextProps) {
      return condition(this.props, nextProps);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

const shouldShowComponent = (prevProps, nextProps) => {
  return nextProps.show !== prevProps.show;
};

const ConditionalComponent = ({ show, children }) => {
  if (show) {
    return <div>{children}</div>;
  }
  return null;
};

const EnhancedConditionalComponent = withCondition(
  ConditionalComponent,
  shouldShowComponent
);

// 使用 EnhancedConditionalComponent 时，它会根据 show 属性的变化来渲染或隐藏子组件
```

这些示例展示了高阶组件在 React 中的多样性和实用性，它们可以在不修改原始组件代码的情况下，为组件添加新的功能或逻辑，从而提高开发效率和代码的可维护性。
