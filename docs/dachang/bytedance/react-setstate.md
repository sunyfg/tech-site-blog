# React setState 是同步还是异步？

所谓的同步还是异步其实指的是调用 `setState` 后能否马上得到更新后的值，即是否立即调用 `render` 函数渲染视图；
能得到最新值则为同步，不能得到最新值则为异步；

开始阅读前，有两点需要注意：

- 因为 `hooks` 存在闭包的问题，容易混淆视听，这里先暂时使用 `class` 组件的形式作为示例，当完全明白 `class` 组件的 `setState` 原理后，再去深入看 `hooks` 你会有一种原来如此的感觉
- 因为 `React v18` 引入了自动批处理功能， `setState` 的表现与 `v18` 版本以下的版本完全不一样，所以本文会先讲解 `v17` 版本的 `setState` 原理，之后再对比 `v18` 和 `v17` 版本的差异性

## 一道面试题

下面先来看一道经典的面试题：以下代码中，点击按钮后控制台输出什么？

```jsx
import React from "react";
import "./App.css";

class AppClass extends React.Component {
  state = {
    count: 0,
  };

  handleClick = () => {
    this.setState({ count: 1 });
    console.log("count: ", this.state.count);

    this.setState({ count: 2 });
    console.log("count: ", this.state.count);

    setTimeout(() => {
      this.setState({ count: 3 });
      console.log("count: ", this.state.count);

      this.setState({ count: 4 });
      console.log("count: ", this.state.count);
    }, 0);
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>count = {this.state.count}</button>
      </div>
    );
  }
}

export default AppClass;
```

看下真实的控制台输出是什么：

```sh
count: 0
count: 0
count: 3
count: 4
```

分析下：

- 第一个输出 `count: 0` ，说明 `setState` 是异步执行的，所以在调用之后打印 `count` 还是初始值 `0`
- 第二个输出还是 `count: 0` ，说明 `setState` 还是异步执行的
- 第三个输出 `count: 3` ，而且在打印语句前正是调用 `setState` 将 `count` 置为了 `3`，很奇怪，这里的 `setState` 是同步执行的
- 第四个输出 `count: 4`，而且前面也正是调用 `setState` 将 `count` 置为了 `4` ， 这里 `setState` 也是同步执行的

**结论:**

先说下结论，带着疑问和结论去分析问题更好理解：

在 `react` 可调度范围内的 `setState` 就是异步的，反之，则为同步

问：什么是 `react` 可调度范围内呢？

答：`react` 合成事件内同步执行的 `setState` 就是可调度范围。

问：什么是 `react` 可调度范围外呢？

答：宏任务：`setTimeout` ，微任务：`.then` ，或直接在 `DOM` 元素上绑定的事件等都是 `react` 可调度范围外。

有了结论的加持，再来分析下以上的输出：

- `handleClick` 函数是 `react` 的合成事件，所以其内部的 `setState` 是异步的
- 进入 `handleClick` 函数内部，发现前两个 `setState` 是没有被 `setTimeout` 包裹的，在调度范围内，故表现为异步，所以前两次的输出都是 `0`
- 还有两个 `setState` 是在 `setTimeout` 内的，不在 `react` 调度范围内，故表现为同步，所以每次 `setState` 执行后都可以立即获取到更新后的值。

## 深入原理

从合成事件入手，`react` 中所有的合成事件都会经过如下函数处理:

```js
/* 所有的事件都将经过此函数统一处理 */
function dispatchEventForLegacyPluginEventSystem() {
  // handleTopLevel 事件处理函数
  batchedEventUpdates(handleTopLevel, bookKeeping);
}
```

重点看下这个 `batchedEventUpdates` 函数:

```js
function batchedEventUpdates(fn, a) {
  /* 开启批量更新  */
  isBatchingEventUpdates = true;
  try {
    /* 这里执行了的事件处理函数，比如在一次点击事件中触发setState,那么它将在这个函数内执行 */
    return batchedEventUpdatesImpl(fn, a, b);
  } finally {
    /* 完成一次事件，批量更新  */
    isBatchingEventUpdates = false;
  }
}
```

如上可以分析出

流程在 `React` 事件执行之前通过 `isBatchingEventUpdates = true` 打开开关，开启事件批量更新，这里也就是上面所说的 `react` 可调度范围内。

当该事件结束，再通过 `isBatchingEventUpdates = false` 关闭开关，表示当前调度结束。

当事件函数中存在异步代码即 `setTimeout` 等时，同步的 `batchedEventUpdatesImpl` 函数已经执行完成，此时的 `isBatchingEventUpdates` 标志已经被置为 `false`。

而在用户自定义的事件函数中，根本无法进入 `react` 的合成事件中，就不会开启批量更新。

在 `batchedEventUpdatesImpl` 函数中会去调度 `Fiber` 节点，调度主要函数代码如下：

```js
// React 17 Fiber 调度源码
export function scheduleUpdateOnFiber(
  fiber: Fiber,
  lane: Lane,
  eventTime: number
) {
  checkForNestedUpdates();
  warnAboutRenderPhaseUpdatesInDEV(fiber);

  const root = markUpdateLaneFromFiberToRoot(fiber, lane);
  if (root === null) {
    warnAboutUpdateOnUnmountedFiberInDEV(fiber);
    return null;
  }

  // Mark that the root has a pending update.
  // 标记根节点有一个待处理的更新。
  markRootUpdated(root, lane, eventTime);

  if (root === workInProgressRoot) {
    // Received an update to a tree that's in the middle of rendering. Mark
    // that there was an interleaved update work on this root. Unless the
    // `deferRenderPhaseUpdateToNextBatch` flag is off and this is a render
    // phase update. In that case, we don't treat render phase updates as if
    // they were interleaved, for backwards compat reasons.
    /**
     * 在渲染过程中收到了树的更新。在这个根上有一个交错的更新工作。除非
     * `deferRenderPhaseUpdateToNextBatch`标志关闭，这是一个渲染阶段更新。
     * 在这种情况下，出于向后兼容的原因，我们不将渲染阶段更新视为交错。
     */
    if (
      deferRenderPhaseUpdateToNextBatch ||
      (executionContext & RenderContext) === NoContext
    ) {
      workInProgressRootUpdatedLanes = mergeLanes(
        workInProgressRootUpdatedLanes,
        lane
      );
    }
    if (workInProgressRootExitStatus === RootSuspendedWithDelay) {
      // The root already suspended with a delay, which means this render
      // definitely won't finish. Since we have a new update, let's mark it as
      // suspended now, right before marking the incoming update. This has the
      // effect of interrupting the current render and switching to the update.
      // TODO: Make sure this doesn't override pings that happen while we've
      // already started rendering.
      /**
       * 根节点已经延迟挂起，这意味着这个渲染肯定不会完成。既然我们有一个新的更新，
       * 那么现在就在标记这个传入的更新之前，将其标记为挂起。这具有中断当前渲染并切换到更新的效果。
       * TODO：确保这不会覆盖我们已经开始渲染时发生的ping。
       */
      markRootSuspended(root, workInProgressRootRenderLanes);
    }
  }

  // TODO: requestUpdateLanePriority also reads the priority. Pass the
  // priority as an argument to that function and this one.
  // 翻译：TODO：requestUpdateLanePriority 也会读取优先级。将优先级作为参数传递给该函数和这个函数。
  const priorityLevel = getCurrentPriorityLevel();

  if (lane === SyncLane) {
    if (
      // Check if we're inside unbatchedUpdates
      // 翻译：检查我们是否在 unbatchedUpdates 内部
      (executionContext & LegacyUnbatchedContext) !== NoContext &&
      // Check if we're not already rendering
      // 翻译:检查我们是否没有在渲染
      (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
      // Register pending interactions on the root to avoid losing traced interaction data.
      // 翻译：在根上注册待处理的交互，以避免丢失跟踪的交互数据。
      schedulePendingInteractions(root, lane);

      // This is a legacy edge case. The initial mount of a ReactDOM.render-ed
      // root inside of batchedUpdates should be synchronous, but layout updates
      // should be deferred until the end of the batch.
      // 翻译：这是一个遗留边缘情况。ReactDOM.render-rendered 根的初始安装应该在批处理中是同步的，
      // 但是布局更新应该推迟到批处理的末尾。
      performSyncWorkOnRoot(root);
    } else {
      ensureRootIsScheduled(root, eventTime);
      schedulePendingInteractions(root, lane);
      if (executionContext === NoContext) {
        // Flush the synchronous work now, unless we're already working or inside
        // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
        // scheduleCallbackForFiber to preserve the ability to schedule a callback
        // without immediately flushing it. We only do this for user-initiated
        // updates, to preserve historical behavior of legacy mode.
        // 翻译：立即刷新同步工作，除非我们已经在工作或在一个批处理中。这是有意的，在 scheduleUpdateOnFiber 内部，而不是 scheduleCallbackForFiber，以保留立即刷新回调的能力。我们只对用户启动的更新这样做，以保留遗留模式的历史行为。
        resetRenderTimer();
        flushSyncCallbackQueue();
      }
    }
  } else {
    // Schedule a discrete update but only if it's not Sync.
    // 翻译：安排一个离散更新，但只有当它不是 Sync 时。
    if (
      (executionContext & DiscreteEventContext) !== NoContext &&
      // Only updates at user-blocking priority or greater are considered
      // discrete, even inside a discrete event.
      // 翻译：只有用户阻塞优先级或更高的更新才被认为是离散的，即使在离散事件中也是如此。
      (priorityLevel === UserBlockingSchedulerPriority ||
        priorityLevel === ImmediateSchedulerPriority)
    ) {
      // This is the result of a discrete event. Track the lowest priority
      // discrete update per root so we can flush them early, if needed.
      // 翻译：这是离散事件的后果。跟踪每个根的最低优先级离散更新，以便如果需要，可以尽早刷新它们。
      if (rootsWithPendingDiscreteUpdates === null) {
        rootsWithPendingDiscreteUpdates = new Set([root]);
      } else {
        rootsWithPendingDiscreteUpdates.add(root);
      }
    }
    // Schedule other updates after in case the callback is sync.
    // 翻译：在回调是同步的情况下，安排其他更新。
    ensureRootIsScheduled(root, eventTime);
    schedulePendingInteractions(root, lane);
  }

  // We use this when assigning a lane for a transition inside
  // `requestUpdateLane`. We assume it's the same as the root being updated,
  // since in the common case of a single root app it probably is. If it's not
  // the same root, then it's not a huge deal, we just might batch more stuff
  // together more than necessary.
  // 翻译：我们使用它在 `requestUpdateLane` 内部分配一个过渡的通道。我们假设它与正在更新的根是相同的，因为在单根应用程序的常见情况下，它很可能就是。如果它不是同一个根，那么这不是什么大问题，我们只是可能将更多的东西批处理在一起，比必要的要多。
  mostRecentlyUpdatedRoot = root;
}
```

重点看下以下代码并翻译下注释：

```js
if (executionContext === NoContext) {
  // Flush the synchronous work now, unless we're already working or inside
  // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
  // scheduleCallbackForFiber to preserve the ability to schedule a callback
  // without immediately flushing it. We only do this for user-initiated
  // updates, to preserve historical behavior of legacy mode.
  /**
   * 如果当前上下文为 NoContext，则立即刷新同步工作，除非我们已经在工作或处于批处理中。
   * 这是有意放在 scheduleUpdateOnFiber 而不是 scheduleCallbackForFiber 中的，
   * 以保留调度回调而不立即刷新的能力。我们只对用户发起的更新这样做，
   * 以保留旧模式的历史行为。
   */
  resetRenderTimer();
  flushSyncCallbackQueue();
}
```

上面的代码表示如果当前 `react` 处在空闲状态即没有进行调度任务时，则启用同步刷新。

## 总结

当 `React` 的数据变化在合成事件中触发时：

- `React` 通过设置全局变量 `isBatchingEventUpdates` 来标志当前的变化是否发生在 `React` 的可调度范围内。
- 如果在可调度范围内，那么将开启批量更新，即表现为异步刷新。
- 如果不在可调度范围内，那么将进入 `flushSyncCallbackQueue` 函数进行同步刷新。
- 由于只有在 `React` 合成事件中才会设置 `isBatchingEventUpdates` 标志，因此像 `setTimeout`、`自定义监听事件`、`.then` 等触发的数据更新都无法触发批处理，即表现为同步刷新。
