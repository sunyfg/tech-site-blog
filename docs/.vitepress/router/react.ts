export const reactNav = [{ text: "React", link: "/react/" }];

export const reactSidebar = {
  "/react/": {
    text: "React",
    items: [
      { text: "简介", link: "/react/" },
      {
        text: "基础",
        items: [
          { text: "什么是 React?", link: "/react/what-is-react" },
          { text: "生命周期", link: "/react/react-lifecycle" },
          {
            text: "生命周期(函数组件)",
            link: "/react/react-lifecycle-functional",
          },
          {
            text: "组件通信方式(类组件)",
            link: "/react/react-component-communication",
          },
          {
            text: "组件通信方式(函数组件)",
            link: "/react/react-component-communication-functional",
          },
          {
            text: "事件处理",
            link: "/react/react-event",
          },
          {
            text: "性能优化",
            link: "/react/react-performance-optimization",
          },
        ],
      },
      {
        text: "进阶",
        items: [
          {
            text: "Virtual DOM 的工作原理",
            link: "/react/react-virtual-dom",
          },
          { text: "React 18 有哪些新特性", link: "/react/react-18-features" },
          { text: "React 调度器", link: "/react/react-scheduler" },
          { text: "React Fiber 详解", link: "/react/react-fiber" },
          {
            text: "Fiber 架构是如何实现的?",
            link: "/react/react-fiber-architecture",
          },
          {
            text: "Fiber 的优缺点",
            link: "/react/react-fiber-merit-and-demerit",
          },
          {
            text: "自动批量处理是如何工作的",
            link: "/react/automatic-batch-processing",
          },
        ],
      },
    ],
  },
};
