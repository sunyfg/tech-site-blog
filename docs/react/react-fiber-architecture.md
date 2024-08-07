# Fiber 架构是如何实现的?

Fiber 架构是 React 16 中引入的一种新的协调机制，用于实现增量式、可中断和可恢复的异步更新方式，以提高 React 应用的性能和用户体验。Fiber 架构的实现主要依赖于以下几个关键点：

## 一、核心思想

Fiber 架构的核心思想是将渲染过程拆分为多个可中断的小任务（fiber），并使用优先级调度算法决定任务的执行顺序。这使得浏览器在空闲时间内可以执行其他任务或响应用户交互，避免了长时间的阻塞。

## 二、数据结构

Fiber 架构的中心数据结构是 Fiber 树（树形数据结构，对应 DOM 树）。Fiber 节点是 Fiber 树的基本单位，每个 Fiber 节点包含了组件实例、组件的状态、要渲染的元素、子节点等信息。在源码中，Fiber 节点以链表的形式组织，实现了从树的遍历到链表的访问的转化。

## 三、双缓存技术

React Fiber 使用了一个双缓存技术。在任务执行过程中，React 会构建 Fiber 树，并使用两个链表结构分别表示当前任务的工作单元（current 树）和下一次任务的工作单元（workInProgress 树）。当时间片用尽或遇到优先级更高的任务时，React 可以中断当前任务，并将它保存到下一次任务的链表中。然后，React 可以恢复执行下一个任务，以此类推。

## 四、调度器

调度器（Scheduler）是 Fiber 架构中的关键组件，它负责管理和调度任务的执行。调度器会根据任务的优先级和浏览器的空闲时间来安排任务的执行顺序。任务的优先级分为多种类型，如同步、任务、动画、高、低和离屏等，高优先级的任务可以打断低优先级的任务执行。

## 五、实现流程

Fiber 架构的实现流程大致如下：

1. **创建更新**：当组件的状态或属性发生变化时，React 会创建一个更新任务并将其加入到任务队列中。
2. **任务调度**：调度器会根据任务的优先级和浏览器的空闲时间来安排任务的执行。
3. **构建 WIP 树**：在浏览器空闲时间，React 会从根节点开始遍历 Fiber 树，并为每个节点创建一个对应的 WIP 节点，构建出新的 WIP 树。
4. **执行更新**：React 遍历 WIP 树，对比新旧节点之间的差异，并执行相应的更新逻辑。在协调阶段，React 会根据组件的更新优先级和调度算法，决定哪些 Fiber 节点需要进行更新，哪些可以跳过。这个过程是可中断的。
5. **构建副作用链表**：在协调阶段完成后，React 会根据更新的结果构建一个副作用链表。副作用是对 DOM 的变更操作，如插入、更新或删除元素。副作用链表记录了所有需要在实际 DOM 更新阶段执行的操作。
6. **提交更新**：在提交阶段，React 会遍历副作用链表，根据副作用的类型和位置，执行实际的 DOM 更新操作。这个过程是同步的，不能中断。
7. **完成渲染**：在完成提交阶段后，React 会将更新后的结果渲染到屏幕上，并触发相应的生命周期方法和钩子函数。

## 六、关键技术

- **时间切片**：将任务拆分成多个小片段，每个片段的执行时间都很短，从而允许浏览器在任务执行间隙处理其他事件。
- **优先级管理**：通过优先级来决定任务的执行顺序，确保关键路径上的更新能够优先执行。
- **双缓存技术**：使用两个链表结构分别表示当前任务的工作单元和下一次任务的工作单元，以实现任务的中断和恢复。

## 七、代码演示

React 的 Fiber 架构是一个复杂的系统，涉及到大量的源码和内部机制。在这里，我将尝试用简化的伪代码和解释来阐述 Fiber 架构的核心概念和流程。请注意，这不是 React 源码的直接摘录，而是对 Fiber 架构工作原理的一种抽象和概括。

### 伪代码概述 Fiber 架构

首先，我们定义一个基本的 Fiber 节点结构，它包含了一些关键的属性和方法：

```javascript
class FiberNode {
  constructor(
    type,
    key,
    stateNode,
    returnFiber,
    child,
    sibling,
    pendingProps,
    memoizedProps,
    updateQueue,
    priorityLevel
  ) {
    this.type = type; // 组件类型
    this.key = key; // 组件的 key
    this.stateNode = stateNode; // 对应的 DOM 节点或 React 组件实例
    this.returnFiber = returnFiber; // 指向父节点的指针
    this.child = child; // 指向第一个子节点的指针
    this.sibling = sibling; // 指向下一个兄弟节点的指针
    this.pendingProps = pendingProps; // 新的 props
    this.memoizedProps = memoizedProps; // 上次的 props
    this.updateQueue = updateQueue; // 存储待处理的更新
    this.priorityLevel = priorityLevel; // 任务的优先级

    // 其他属性和方法...
  }

  // 假设有一个方法来执行节点的更新逻辑
  performWork() {
    // 这里会进行实际的组件更新逻辑，包括 diffing 算法等
    // ...
  }

  // 假设有一个方法来处理副作用
  commitWork() {
    // 这里会处理 DOM 更新等副作用
    // ...
  }
}
```

接下来，我们定义一个简化的调度器和渲染流程：

```javascript
class Scheduler {
  static scheduleWork(fiber, priorityLevel) {
    // 将任务加入到调度队列中，这里只是简化表示
    // 实际的调度队列会根据优先级和时间片来管理任务
  }

  static performWorkUntilDeadline() {
    // 在浏览器空闲时间执行工作，直到时间片用完
    // 这是一个递归或循环的过程，但在这里我们简化表示
    // ...
  }
}

function render(rootFiber) {
  // 假设 rootFiber 是根 Fiber 节点
  // 开始调度工作
  Scheduler.scheduleWork(rootFiber, "high");

  // 在浏览器空闲时执行工作
  // 注意：这里的 performWorkUntilDeadline 是由 React 在内部通过 requestIdleCallback 或其他方式调用的
  // Scheduler.performWorkUntilDeadline();

  // 实际上，React 会处理更多的事情，比如构建 WIP 树、对比新旧 Fiber 树、处理副作用等
  // 但在这里我们省略了这些细节
}

// 假设我们有一个根组件
// 在实际应用中，这个组件会通过 ReactDOM.render 或类似的方式被渲染
const rootFiber = new FiberNode(/* ... */);

// 开始渲染过程
render(rootFiber);
```

### 注意事项

1. **简化和抽象**：上面的伪代码高度简化和抽象了 React Fiber 架构的实际实现。React 的源码包含了更多的细节和复杂的逻辑，比如协调过程、优先级管理、时间切片、副作用处理等。

2. **调度过程**：在 React 中，调度器（Scheduler）是一个独立的模块，它并不直接管理 Fiber 节点。调度器负责将任务加入到调度队列中，并在浏览器空闲时通过 `requestIdleCallback` 或其他机制来调用 React 的渲染函数。渲染函数会遍历 Fiber 树，并根据优先级和时间片来执行更新任务。

3. **Fiber 树和 WIP 树**：在上面的伪代码中，我们没有显式地表示出 WIP 树（即 workInProgress 树）。在实际的 React 源码中，React 会构建出两个 Fiber 树：current 树（表示当前的 UI 状态）和 WIP 树（表示即将更新的 UI 状态）。在协调过程中，React 会对比这两个树，并更新 WIP 树以反映新的 UI 状态。

4. **副作用链表**：React 在协调过程中会构建一个副作用链表，用于记录所有需要在实际 DOM 更新阶段执行的操作。在提交阶段，React 会遍历这个链表，并应用所有的副作用。这个过程在上面的伪代码中也没有显式表示出来。

Fiber 架构的引入使得 React 应用的更新过程变得更加灵活和高效，能够更好地适应不同的设备和交互场景。同时，它也为 React 引入了更多的优化策略和扩展能力，如异步渲染、错误边界、懒加载等功能。
