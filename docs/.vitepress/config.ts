import { defineConfig } from "vitepress";
import { nav, sidebar } from "./router/router";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TechSite",
  description: "A VitePress Site",
  lastUpdated: true, // 最近一条内容的更新时间会显示在页面右下角
  lang: "zh-CN",
  themeConfig: {
    // siteTitle: false,
    logo: "/assets/logo.svg",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present YanFeng Sun",
    },
    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    // 编辑链接
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
});
