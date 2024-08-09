import { defineConfig } from "vitepress";
import { nav, sidebar } from "./router/router";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TECH SITE",
  description: "前端未来新征程",
  lastUpdated: true, // 最近一条内容的更新时间会显示在页面右下角
  // lang: "zh",
  head: [["link", { rel: "icon", href: "/assets/logo.png" }]],
  themeConfig: {
    // 是否显示左上角标题
    // siteTitle: false,
    // 最后更新时间
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    logo: "/assets/logo.svg",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present YanFeng Sun",
    },
    docFooter: {
      next: "下一篇",
      prev: "上一篇",
    },
    search: {
      provider: "local",
      options: {
        // 国际化
        // locales: {
        //   zh: {
        //     translations: {
        //       button: {
        //         buttonText: "搜索文档",
        //         buttonAriaLabel: "搜索文档",
        //       },
        //       modal: {
        //         noResultsText: "无法找到相关结果",
        //         resetButtonTitle: "清除查询条件",
        //         footer: {
        //           selectText: "选择",
        //           navigateText: "切换",
        //         },
        //       },
        //     },
        //   },
        // },
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
              closeText: "关闭",
            },
          },
        },
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/sunyfg/tech-site-blog" },
    ],
    // 编辑链接
    editLink: {
      pattern: "https://github.com/sunyfg/tech-site-blog/edit/main/docs/:path",
      text: "在 Github 上编辑此页面",
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
