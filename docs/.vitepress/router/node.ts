export const nodeNav = [{ text: "Node", link: "/node/" }];

export const nodeSidebar = {
  "/node/": [
    { text: "Node.js 简介", link: "/node/" },
    { text: "Node.js 架构", link: "/node/framework" },
    { text: "Buffer 模块", link: "/node/buffer" },
    { text: "Buffer 乱码问题", link: "/node/buffer-garble" },
    { text: "Node 如何实现高并发", link: "/node/high-concurrency" },
    { text: "cluster 模块是干什么用的?", link: "/node/cluster" },
    { text: "创建子进程的方法有哪些?", link: "/node/create-child-process" },
    {
      text: "Node.js 的事件循环和事件驱动有什么区别吗?",
      link: "/node/event-loop-and-event-driven",
    },
    { text: "请介绍一下 Node 事件循环的流程", link: "/node/event-loop-flow" },
    { text: "Node.js 的事件循环有哪些阶段?", link: "/node/event-loop-phase" },
    {
      text: "在每个 tick 的过程中，如何判断是否有事件需要处理呢？",
      link: "/node/event-loop-tick",
    },
    { text: "Node.js 事件循环", link: "/node/event-loop" },
    { text: "请谈一下内存泄漏是什么?", link: "/node/memory-leak" },
    { text: "请简述一下 node 的多进程架构", link: "/node/multiprocess" },
    {
      text: "V8 的内存分代和回收算法",
      link: "/node/v8-memory-generation-and-reclamation-algorithms",
    },
    {
      text: "Node.js 中的内存管理和垃圾回收机制是怎样的？",
      link: "/node/memory-management-and-garbage-collection",
    },
    {
      text: "编码",
      items: [
        { text: "常见编码方式", link: "/node/encoding" },
        { text: "UTF-8 编码", link: "/node/encoding-utf8" },
      ],
    },
  ],
};
