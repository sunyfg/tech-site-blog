export const vueNav = [{ text: "Vue", link: "/vue3/01.design-mode" }];

export const vueSidebar = {
  "/vue3/": [
    {
      text: "Vue",
      // collapsed: true, // 是否可折叠
      items: [
        {
          text: "介绍一下 MVVM 模式，和 MVC 模式有什么区别？",
          link: "/vue3/01.design-mode",
        },
        {
          text: "Diff 算法",
          link: "/vue3/diff",
        },
        {
          text: "Vue 和 React Diff 算法区别",
          link: "/vue3/vue-and-react-diff",
        },
        {
          text: "Vue 双向数据绑定是如何实现的",
          link: "/vue3/two-way-data-binding",
        },
        { text: "Vue2 和 Vue3 的区别", link: "/vue3/vue3-difference-vue2" },
        { text: "Vue 3 新特性", link: "/vue3/vue3-new-feature" },
        {
          text: "深入比较 Vue 和 React 的异同点?",
          link: "/vue3/differences-between-vue-and-react",
        },
        { text: "keep-alive 具体缓存的是什么?", link: "/vue3/vue-keep-alive" },
        { text: "什么是 LRU 缓存策略?", link: "/vue3/vue-lru" },
        { text: "前端错误日志自动上报?", link: "/vue3/vue-error-report" },
        { text: "Sentry 前端上报原理?", link: "/vue3/sentry" },
      ],
    },
  ],
};
