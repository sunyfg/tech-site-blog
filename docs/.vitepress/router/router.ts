import { linuxNav, linuxSidebar } from "./linux";
import { vueNav, vueSidebar } from "./vue";
import { reactNav, reactSidebar } from "./react";
import { questionNav, questionSidebar } from "./question";
import { flutterNav, flutterSidebar } from "./flutter";
import { nodeNav, nodeSidebar } from "./node";
import { cssNav, cssSidebar } from "./css";
import { dachangNav, dachangSidebar } from "./dachang";
import { typescriptNav, typescriptSidebar } from "./typescript";
import { javascriptNav, javascriptSidebar } from "./javascript";
import { reactnativeNav, reactnativeSidebar } from "./react-native";

export const nav = [
  // { text: "首页", link: "/" },
  // 前端
  {
    text: "前端",
    items: [
      // { text: "NodeJS", link: "/node/" },
      ...javascriptNav,
      // { text: "NestJS", link: "/markdown-examples" },
      // { text: "Python", link: "/markdown-examples" },
    ],
  },
  // 后端
  {
    text: "后端",
    items: [
      // { text: "NodeJS", link: "/node/" },
      ...nodeNav,
      // { text: "NestJS", link: "/markdown-examples" },
      // { text: "Python", link: "/markdown-examples" },
    ],
  },
  // 移动端
  {
    text: "移动端",
    items: [
      // { text: "React Native", link: "/markdown-examples" },
      ...flutterNav,
      ...reactnativeNav,
      // { text: "Android", link: "/markdown-examples" },
      // { text: "IOS", link: "/markdown-examples" },
    ],
  },
  {
    text: "运维",
    items: [...linuxNav],
  },
  {
    text: "面试",
    items: [...vueNav, ...reactNav, ...cssNav, ...typescriptNav],
  },
  {
    text: "大厂",
    items: [...dachangNav],
  },

  // {
  //   text: "常见问题",
  //   items: [...questionNav],
  // },
  // { text: "开源", link: "/markdown-examples" },
  // { text: "团队", link: "/team" },
];

export const sidebar = {
  "/": [
    // {
    //   text: "Examples",
    //   items: [
    //     { text: "Markdown Examples", link: "/markdown-examples" },
    //     { text: "Runtime API Examples", link: "/api-examples" },
    //   ],
    // },
  ],
  "/guide/": [
    {
      text: "Vue3",
      collapsed: true, // 是否可折叠
      items: [
        { text: "Guide", link: "/guide/" },
        { text: "Getting Started", link: "/guide/getting-started" },
      ],
    },
  ],
  ...javascriptSidebar,
  ...vueSidebar,
  ...reactSidebar,
  ...questionSidebar,
  ...linuxSidebar,
  ...flutterSidebar,
  ...nodeSidebar,
  ...cssSidebar,
  ...dachangSidebar,
  ...typescriptSidebar,
  ...reactnativeSidebar,
};
