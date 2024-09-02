export const vueNav = [{ text: "Vue", link: "/vue/" }];

export const vueSidebar = {
  "/vue/": [
    { text: "介绍", link: "/vue/" },
    {
      text: "基础",
      collapsed: false, // 是否可折叠
      items: [
        {
          text: "生命周期",
          link: "/vue/basic/life-cycle",
        },
        {
          text: "Vue2 响应式原理",
          link: "/vue/basic/vue2-reactive",
        },
        {
          text: "Vue3 响应式原理",
          link: "/vue/basic/vue3-reactive",
        },
        {
          text: "渲染原理",
          link: "/vue/basic/render",
        },
      ],
    },
    {
      text: "组合式API",
      collapsed: false, // 是否可折叠
      items: [
        {
          text: "组合式API：setup()",
          link: "/vue/basic/setup",
        },
        {
          text: "组合式API：ref()",
          link: "/vue/basic/ref",
        },
        {
          text: "组合式API：reactive()",
          link: "/vue/basic/reactive",
        },
        {
          text: "组合式API：toRef()",
          link: "/vue/basic/toRef",
        },
        {
          text: "组合式API：toRefs()",
          link: "/vue/basic/toRefs",
        },
        {
          text: "组合式API：computed()",
          link: "/vue/basic/computed",
        },
        {
          text: "组合式API：watch()",
          link: "/vue/basic/watch",
        },
        {
          text: "组合式API：watchEffect()",
          link: "/vue/basic/watchEffect",
        },
        {
          text: "组合式API：provide() 和 inject()",
          link: "/vue/basic/provide-and-inject",
        },
        {
          text: "组合式API：shallowReactive() 和 shallowRef()",
          link: "/vue/basic/shallowReactive-and-shallowRef",
        },
        {
          text: "组合式API：readonly() 和 shallowReadonly()",
          link: "/vue/basic/readonly-and-shallowReadonly",
        },
        {
          text: "组合式API：toRaw() 和 markRaw()",
          link: "/vue/basic/toRaw-and-markRaw",
        },
        {
          text: "组合式API：customRef()",
          link: "/vue/basic/customRef",
        },
        {
          text: "组合式API：unref() 和 isRef()",
          link: "/vue/basic/unref-and-isRef",
        },
      ],
    },
    {
      text: "面试题",
      collapsed: false, // 是否可折叠
      items: [
        {
          text: "介绍一下 MVVM 模式，和 MVC 模式有什么区别？",
          link: "/vue/01.design-mode",
        },
        {
          text: "Diff 算法",
          link: "/vue/diff",
        },
        {
          text: "Vue 和 React Diff 算法区别",
          link: "/vue/vue-and-react-diff",
        },
        {
          text: "Vue 双向数据绑定是如何实现的",
          link: "/vue/two-way-data-binding",
        },
        { text: "Vue2 和 Vue3 的区别", link: "/vue/vue3-difference-vue2" },
        { text: "Vue 3 新特性", link: "/vue/vue3-new-feature" },
        {
          text: "深入比较 Vue 和 React 的异同点?",
          link: "/vue/differences-between-vue-and-react",
        },
        { text: "keep-alive 具体缓存的是什么?", link: "/vue/vue-keep-alive" },
        { text: "什么是 LRU 缓存策略?", link: "/vue/vue-lru" },
        { text: "前端错误日志自动上报?", link: "/vue/vue-error-report" },
        { text: "Sentry 前端上报原理?", link: "/vue/sentry" },
      ],
    },
  ],
};
