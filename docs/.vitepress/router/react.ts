export const reactNav = [{ text: "React", link: "/react/" }];

export const reactSidebar = {
  "/react/": [
    {
      text: "React",
      items: [
        { text: "简介", link: "/react/" },
        {
          text: "基础",
          collapsed: false, // 是否折叠
          items: [
            { text: "什么是 React?", link: "/react/what-is-react" },
            { text: "请解释一下什么是 JSX?", link: "/react/react-jsx" },
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
              text: "你对 React 的 refs 有什么了解？",
              link: "/react/react-refs",
            },
            {
              text: "受控组件和非受控组件",
              link: "/react/react-controlled-and-uncontrolled",
            },
            {
              text: "什么是高阶组件？",
              link: "/react/react-hoc",
            },
            {
              text: "React 中 key 的重要性是什么？",
              link: "/react/react-key",
            },
            {
              text: "什么是纯组件？",
              link: "/react/react-pure-components",
            },
            {
              text: "事件处理",
              link: "/react/react-event",
            },
            {
              text: "React 中的合成事件是什么？",
              link: "/react/react-synthetic-event",
            },
            {
              text: "性能优化",
              link: "/react/react-performance-optimization",
            },
          ],
        },
        {
          text: "进阶",
          collapsed: false,
          items: [
            {
              text: "Diff 算法",
              link: "/react/diff",
            },
            {
              text: "解释一下 Flux?",
              link: "/react/react-flux",
            },
            {
              text: "什么是 Redux?",
              link: "/react/react-redux",
            },
            {
              text: "Redux 遵循的三个原则是什么？",
              link: "/react/react-redux-three-principles",
            },
            {
              text: "你对“单一事实来源”有什么理解？",
              link: "/react/react-redux-ssot",
            },
            {
              text: "什么是 MobX?",
              link: "/react/react-mobx",
            },
            {
              text: "MobX 和 Redux 有什么区别",
              link: "/react/mobx-and-redux",
            },
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
  ],
};
