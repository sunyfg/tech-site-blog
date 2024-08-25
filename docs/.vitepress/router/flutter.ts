export const flutterNav = [{ text: "Flutter", link: "/flutter/" }];

export const flutterSidebar = {
  "/flutter/": [
    {
      text: "Flutter",
      link: "/flutter/",
    },
    {
      text: "Dart 入门",
      collapsed: false, // 是否折叠
      items: [
        { text: "简介", link: "/flutter/dart/" },
        {
          text: "基础",
          items: [
            { text: "变量", link: "/flutter/dart/syntax-basics/variables" },
            { text: "操作符", link: "/flutter/dart/syntax-basics/operators" },
            { text: "注释", link: "/flutter/dart/syntax-basics/comments" },
            { text: "元数据", link: "/flutter/dart/syntax-basics/metadata" },
            { text: "库与导入", link: "/flutter/dart/syntax-basics/libraries" },
          ],
        },
        { text: "类型", link: "/flutter/dart/types" },
        {
          text: "消息机制",
          link: "/flutter/dart/message-passing",
        },
        {
          text: "并发编程",
          link: "/flutter/dart/concurrency",
        },
      ],
    },
    {
      text: "组件",
      items: [],
    },
    {
      text: "框架",
      items: [
        {
          text: "setState",
          link: "/flutter/framework/setstate",
        },
        {
          text: "key",
          link: "/flutter/framework/key",
        },
        {
          text: "生命周期",
          link: "/flutter/framework/lifecycle",
        },
        {
          text: "渲染原理",
          link: "/flutter/framework/rendering",
        },
        {
          text: "状态管理",
          link: "/flutter/framework/state-management",
        },
        {
          text: "事件循环",
          link: "/flutter/framework/event-loop",
        },
        {
          text: "性能优化",
          link: "/flutter/framework/performance",
        },
      ],
    },
    {
      text: "混合开发",
      items: [],
    },
    {
      text: "工具",
      items: [],
    },
    {
      text: "发布",
      collapsed: false, // 是否折叠
      items: [
        { text: "Android", link: "/flutter/publish/android" },
        { text: "iOS", link: "/flutter/publish/ios" },
      ],
    },
    // {
    //   text: "Flutter 常用指令",
    //   link: "/flutter/instruction",
    // },
  ],
};
