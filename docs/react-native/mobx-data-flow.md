# MobX 数据流向

在 React Native 中使用 MobX 进行数据管理时，数据的流向遵循 MobX 的响应式原则以及 React 的组件更新机制。下面是一个简化的数据流向描述，帮助你理解在 React Native 中 MobX 是如何工作的：

## 1. 定义 MobX Store

首先，你需要定义一个或多个 MobX store，这些 store 包含了应用的状态（state）以及用于修改这些状态的 action。Store 是响应式的，意味着当 store 中的状态发生变化时，MobX 能够自动追踪这些变化。

```javascript
// counterStore.js
import { makeAutoObservable } from "mobx";

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

export const counterStore = new CounterStore();
```

## 2. 创建 React Context

为了能够在 React Native 的组件树中共享 MobX store，你需要创建一个 React Context，并将 store 作为 Context 的 value。

```javascript
// CounterContext.js
import React, { createContext, useContext } from "react";
import { counterStore } from "./counterStore";

const CounterContext = createContext(counterStore);

export const useCounterStore = () => useContext(CounterContext);

export default CounterContext;
```

## 3. 在顶层组件中提供 Context

在你的 React Native 应用的顶层组件（如`App.js`）中，使用`<CounterContext.Provider>`包裹整个应用，并将 store 作为 value 传递给 Provider。这样，所有子组件都可以通过 Context 访问到 store。

```javascript
// App.js
import React from "react";
import { View } from "react-native";
import CounterContext from "./context/CounterContext";
import Counter from "./components/Counter";

const App = () => (
  <CounterContext.Provider value={counterStore}>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Counter />
    </View>
  </CounterContext.Provider>
);

export default App;
```

## 4. 在组件中使用 store

在组件中，你可以使用`useContext` Hook（或者通过自定义 Hook 如`useCounterStore`）来访问 store，并通过 store 的 action 来修改状态。同时，你可以使用`observer` HOC（来自`mobx-react-lite`）来包装你的组件，使其能够自动响应 store 中的状态变化。

```javascript
// Counter.js
import React from "react";
import { View, Text, Button } from "react-native";
import { observer } from "mobx-react-lite";
import { useCounterStore } from "../context/CounterContext";

const Counter = observer(() => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
    </View>
  );
});

export default Counter;
```

## 数据流向总结

1. **状态定义**：在 MobX store 中定义应用的状态和修改这些状态的 action。
2. **Context 共享**：通过 React Context 将 store 传递给应用的顶层组件，并在整个应用中共享。
3. **组件访问**：组件通过 Context 访问 store，并通过 store 的 action 修改状态。
4. **自动响应**：使用`observer`包装组件，使其能够自动响应 store 中状态的变化并重新渲染。

这种数据流向模式使得 React Native 应用中的状态管理变得清晰和高效。
