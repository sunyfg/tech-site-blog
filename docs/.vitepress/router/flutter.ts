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
      ],
    },
    {
      text: "组件",
      items: [],
    },
    {
      text: "框架",
      items: [],
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
