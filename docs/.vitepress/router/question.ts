export const questionNav = [
  { text: "Vue 常见问题", link: "/question/vue/" },
  { text: "React 常见问题", link: "/question/react/" },
  { text: "Flutter 面试题", link: "/flutter/question/get-position-size" },
];

export const questionSidebar = {
  "/question/": [
    {
      text: "Vue 常见问题",
      items: [
        {
          text: "事件触发 currentTarget 为 null",
          link: "/question/vue/currentTarget-null",
        },
      ],
    },
    // { text: "React 常见问题", items: [] },
  ],
  "/flutter/question/": [
    {
      text: "Flutter 面试题",
      items: [
        {
          text: "如何获取控件的大小和位置？",
          link: "/flutter/question/get-position-size",
        },
        {
          text: "Flutter 是如何与原生Android、iOS进行通信的？",
          link: "/flutter/question/native-communication",
        },
      ],
    },
  ],
};
