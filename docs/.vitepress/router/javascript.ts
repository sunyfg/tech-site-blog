export const javascriptNav = [{ text: "Javascript", link: "/javascript/" }];

export const javascriptSidebar = {
  "/javascript/": [
    {
      text: "Javascript",
      link: "/javascript/",
    },
    {
      text: "数组方法",
      link: "/javascript/array-methods",
    },
    {
      text: "defer 和 async 区别",
      link: "/javascript/defer-and-async",
    },
    {
      text: "var、let 和 const 的区别",
      link: "/javascript/var-let-const",
    },
    {
      text: "数据类型",
      link: "/javascript/data-type",
    },
    {
      text: "ES2016（ES7）",
      collapsed: false, // 是否折叠
      items: [
        {
          text: "Array.prototype.includes",
          link: "/javascript/es7-array-includes",
        },
        {
          text: "指数运算符",
          link: "/javascript/es7-exponential-operator",
        },
      ],
    },
    {
      text: "ES2017（ES8）",
      collapsed: false, // 是否折叠
      items: [
        {
          text: "Async 函数",
          link: "/javascript/es8-async-function",
        },
        {
          text: "Object.values",
          link: "/javascript/es8-object-values",
        },
        {
          text: "Object.entries",
          link: "/javascript/es8-object-entries",
        },
        {
          text: "Object.getOwnPropertyDescriptors",
          link: "/javascript/es8-object-getownpropertydescriptors",
        },
        {
          text: "String.prototype.padStart",
          link: "/javascript/es8-padstart",
        },
        {
          text: "String.prototype.padEnd",
          link: "/javascript/es8-padend",
        },
        {
          text: "函数参数尾逗号",
          link: "/javascript/es8-trailing-commas",
        },
        {
          text: "SharedArrayBuffer 和 Atomics",
          link: "/javascript/es8-sharedarraybuffer-and-atomics",
        },
      ],
    },
  ],
};
