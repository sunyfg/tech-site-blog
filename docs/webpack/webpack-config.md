# 配置

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器（module bundler）。它在开发过程中将你的应用程序的所有依赖项（包括 JavaScript、CSS、图片等）打包成一个或多个 bundle。以下是对 Webpack 配置的详细介绍：

## 一、Webpack 基本配置

Webpack 的配置主要通过 `webpack.config.js` 文件进行，该文件导出一个对象，包含了 Webpack 打包过程中需要的各种配置。

### 1. 入口（Entry）

- **单入口**：通常是一个对象，其中包含一个键（通常命名为 `main`）和对应的入口文件路径。
- **多入口**：当项目有多个入口文件时，可以通过键值对的形式配置多个入口。

### 2. 出口（Output）

- 指定打包后文件的输出路径和文件名。
- 常用属性包括 `path`（输出目录的绝对路径）和 `filename`（输出文件的名称）。

### 3. 模式（Mode）

- 通过设置 `mode` 属性为 `development`、`production` 或 `none`，可以启用 Webpack 内置的优化和默认设置。

## 二、常用插件和加载器（Loader）

### 1. 插件（Plugins）

- Webpack 插件用于执行范围更广的任务，如打包优化、资源管理、环境变量注入等。
- 常见的插件包括 `HtmlWebpackPlugin`（自动生成 HTML 文件并注入打包后的资源）、`CleanWebpackPlugin`（在每次构建前清理/dist 文件夹）等。

### 2. 加载器（Loader）

- Loader 允许 Webpack 处理非 JavaScript 文件（Webpack 自身只理解 JavaScript）。
- 常见的 Loader 包括 `css-loader`（解析 CSS 文件）、`style-loader`（将 CSS 注入到 DOM 中）、`file-loader`（处理文件并将其移动到输出目录）等。

## 三、高级配置

### 1. 代码分割（Code Splitting）

- Webpack 支持代码分割，可以将代码分割成多个 bundle，以便按需加载。
- 这可以通过动态 `import()` 语法或配置 `optimization.splitChunks` 实现。

### 2. 缓存优化

- 使用 `cache-loader` 可以缓存 loader 的执行结果，提高构建速度。
- 使用 `HashedModuleIdsPlugin` 或 `NamedModulesPlugin`（Webpack 4 中已废弃，建议使用 `optimization.moduleIds: 'hashed'`）可以生成更稳定的模块标识符，有利于缓存优化。

### 3. 开发服务器（Webpack Dev Server）

- Webpack Dev Server 提供了一个简单的 web 服务器，并且能够实时重新加载（live reloading）和热模块替换（hot module replacement, HMR）。

## 四、优化技巧

1. **使用 `thread-loader`**：通过多线程来提高 loader 的执行效率。
2. **启用 Tree Shaking**：在生产模式下，Webpack 会自动启用 Tree Shaking，以去除未引用的代码。
3. **压缩输出**：使用 `TerserPlugin`（JavaScript）和 `css-minimizer-webpack-plugin`（CSS）来压缩打包后的文件。
4. **代码分割和懒加载**：将代码分割成多个 bundle，并延迟加载非首屏资源，以减少初始加载时间。
5. **使用 `webpack-bundle-analyzer`**：分析打包后的 bundle 文件，找出可能的优化点。

## 五、配置示例

```javascript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    static: "./dist",
    compress: true,
    port: 9000,
  },
};
```

以上是对 Webpack 配置的详细介绍，包括基本配置、常用插件和加载器、高级配置、优化技巧以及配置示例。Webpack 的配置非常灵活，可以根据项目的具体需求进行调整和优化。
