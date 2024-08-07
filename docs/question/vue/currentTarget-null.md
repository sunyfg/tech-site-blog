# 事件触发 currentTarget 为 null

在写 Vue 项目时，有时会出现事件触发后处理函数获取 currentTarget 却为 null。例如以下代码：

```vue
<template>
  <div @click="handleClick">
    <ChildComponent ref="child" />
  </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {
  methods: {
    handleClick: debounce(function (event) {
      // ...
      console.log(event.currentTarget); // null
      // ...
    }, 200),
  },
};
</script>
```

后来发现，问题出在处理函数是异步访问 currentTarget 上，具体解释前，需要先知道 event 对象中 currentTarget 的“生命周期”。看下面的简单例子：

```js
const event = new Event("click");
const div = document.createElement("div");
div.addEventListener("click", function (event) {
  console.log(event.currentTarget); // div
  setTimeout(() => {
    console.log(event.currentTarget); // null
  });
});
div.dispatchEvent(event);
```

可以看到，在事件触发后，currentTarget 依然存在，但在 setTimeout 中访问 currentTarget 时，它已经为 null。这是因为 setTimeout 中的代码是在事件循环的下一个阶段执行的，而此时事件已经结束，currentTarget 自然为 null。

**事实上，currentTarget 只存在于事件触发到事件处理结束之间，随后就重置为 null 了。**

```js
const handler = (e) => {
  console.log("handling, currentTarget = ", e.currentTarget);
  // 异步访问 currenTarget, 此时事件处理已结束, currentTarget 被重置为 null
  setTimeout(
    () => console.log("timeup,", "currentTarget = ", e.currentTarget),
    0
  );
};
```

控制台输出结果如下：

```shell
handling, currentTarget =  <div>
timeup, currentTarget =  null
```

回到 Vue 项目中，由于使用了 lodash 的 debounce 函数，导致处理函数是异步执行的，所以 currentTarget 为 null。解决方法很简单，将 currentTarget 保存到变量中即可：

```vue
<template>
  <div @click="handleClick">
    <ChildComponent ref="child" />
  </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {
  methods: {
    handleClick(event) {
      const currentTarget = event.currentTarget;
      debounce(function() {
        // ...
        console.log(currentTarget); // div
        // ...
      }, 200)
    },
  },
}
```

**总结：当事件处理函数中存在异步操作时，需要将 currentTarget 保存以便异步操作顺利访问**
