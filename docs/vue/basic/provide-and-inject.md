# 组合式 API：provide() 和 inject()

在 Vue 3 的组合式 API 中，`provide()` 和 `inject()` 是一对用于实现跨组件层级通信的 API。它们允许一个祖先组件向其所有子孙组件提供数据或方法，而子孙组件则可以通过`inject()`来接收这些数据或方法，而无需在组件树中显式地通过 props 一层层传递。这种机制特别适用于深度嵌套的组件或大型应用中，可以帮助减少组件间的耦合度。

## provide()

`provide()` 函数用于在组件树中提供一个值，这个值可以被所有子孙组件通过`inject()`函数访问到。它通常在组件的`setup()`函数中被调用，因为它依赖于 Vue 的响应式系统来追踪依赖并触发更新。

**语法**:

```javascript
provide(key, value);
```

- **key** (必需): 一个字符串或 Symbol，作为提供的值的标识符。
- **value** (必需): 要提供的值，可以是任何类型，包括响应式引用。

**示例**:

```javascript
import { provide, ref } from "vue";

export default {
  setup() {
    const theme = ref("dark");

    provide("theme", theme);

    return {
      // ... 其他逻辑
    };
  },
  // ... 其他选项
};
```

在这个例子中，`theme`是一个响应式引用，它被提供给了所有子孙组件。

## inject()

`inject()` 函数用于接收一个祖先组件通过`provide()`提供的值。它也可以在组件的`setup()`函数中被调用。

**语法**:

```javascript
const value = inject(key, defaultValue?)
```

- **key** (必需): 一个字符串或 Symbol，与`provide()`中提供的值对应的标识符。
- **defaultValue** (可选): 如果没有提供该 key 的值，则`inject()`将返回这个默认值。如果不提供默认值，且没有找到相应的值，则`inject()`将返回`undefined`。

**示例**:

```javascript
import { inject } from "vue";

export default {
  setup() {
    const theme = inject("theme", "light"); // 如果没有找到'theme'，则默认为'light'

    // 使用theme...

    return {
      // ... 其他逻辑
    };
  },
  // ... 其他选项
};
```

## 注意事项

1. **响应性**：通过`provide()`提供的响应式引用在`inject()`中接收到时仍然是响应式的。这意味着如果提供的值发生变化，所有依赖这个值的子孙组件都会自动更新。

2. **作用域**：`provide()`和`inject()`之间的通信是跨组件层级的，但它们是静态的，即`inject()`必须在组件树中`provide()`的下游才能接收到值。

3. **性能**：虽然`provide()`和`inject()`提供了一种方便的跨组件通信方式，但过度使用可能会导致组件间的耦合度增加，从而影响应用的可维护性和可测试性。因此，建议仅在确实需要跨多个层级通信时才使用这对 API。

4. **TypeScript 支持**：在 TypeScript 中使用`provide()`和`inject()`时，可以通过提供类型参数来增强类型检查。例如，可以为`provide()`的 key 指定一个类型，然后在`inject()`中使用相同的类型来接收值。

通过`provide()`和`inject()`，Vue 3 提供了一种强大而灵活的跨组件通信方式，使得开发者可以更加灵活地组织和管理组件间的数据和逻辑。
