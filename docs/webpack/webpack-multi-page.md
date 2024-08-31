# Webpack 多页面打包

Webpack 多页面打包是指在使用 Webpack 进行项目构建时，支持同时打包多个 HTML 页面及其对应的 JavaScript、CSS 等资源文件。这种打包方式适用于多页面应用（MPA），其中每个页面都有自己独立的 HTML 结构和资源文件。以下是对 Webpack 多页面打包的详细介绍：

## 一、基本概念

- **单页面应用（SPA）**：只有一个 HTML 页面，通过切换 DOM 来实现不同业务逻辑的展示。
- **多页面应用（MPA）**：有多个 HTML 页面，每个页面通过 URL 跳转来实现不同业务逻辑的展示。

Webpack 多页面打包即是为 MPA 项目提供的一种构建方案。

## 二、配置步骤

### 1. 准备源码

将项目的 HTML、CSS、JavaScript 等源码文件按照多页面的结构组织好，通常每个页面会有自己的 HTML 文件和对应的 JS、CSS 文件。

### 2. 配置 webpack.config.js

在 `webpack.config.js` 文件中，需要针对多页面应用进行特殊的配置，主要包括以下几个方面：

- **入口（entry）**：配置多个入口文件，每个入口文件对应一个页面的主 JavaScript 文件。入口可以是一个字符串、数组或对象。对于多页面应用，通常将入口配置为一个对象，对象的键为页面名称，值为对应的入口文件路径。
- **输出（output）**：配置输出文件的路径和名称。对于多页面应用，可能需要设置不同的文件名或路径来区分不同页面的输出文件。
- **插件（plugins）**：使用如 `HtmlWebpackPlugin` 的插件来为每个页面生成对应的 HTML 文件，并自动将打包后的 JavaScript、CSS 文件插入到 HTML 文件中。需要为每个页面配置一个 `HtmlWebpackPlugin` 实例，并指定对应的模板文件和文件名。

### 示例配置

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    page1: "./src/page1/index.js",
    page2: "./src/page2/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/page1/index.html",
      filename: "page1.html",
      chunks: ["page1"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/page2/index.html",
      filename: "page2.html",
      chunks: ["page2"],
    }),
  ],
  // 其他配置...
};
```

## 三、动态生成入口和插件配置

对于页面数量较多的多页面应用，手动配置每个页面的入口和插件可能会非常繁琐。此时，可以利用 Node.js 的文件操作能力，动态生成入口和插件的配置。

例如，可以使用 `glob` 模块来扫描指定目录下的所有入口文件，并自动生成入口和插件配置。

### 示例代码

```javascript
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function getEntryAndPlugins() {
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  const entry = {};
  const plugins = [];

  entryFiles.forEach((entryFile) => {
    const pageName = path.basename(path.dirname(entryFile));
    entry[pageName] = entryFile;
    plugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
      })
    );
  });

  return { entry, plugins };
}

const { entry, plugins } = getEntryAndPlugins();

module.exports = {
  entry,
  output: {
    // 输出配置...
  },
  plugins,
  // 其他配置...
};
```

## 四、优势与劣势

### 优势

- **页面解耦**：每个页面都有独立的 HTML 结构和资源文件，页面之间更加解耦。
- **SEO 友好**：多页面应用对搜索引擎更加友好，因为每个页面都有独立的 URL 和 HTML 文件。

### 劣势

- **构建复杂**：相比单页面应用，多页面应用的构建配置更加复杂，需要为每个页面单独配置入口和插件。
- **资源重复**：如果多个页面之间存在共享的资源（如公共库），在多
