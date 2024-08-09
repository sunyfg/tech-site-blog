# 库与导入

`import` 和 `library` 指令可以帮助你创建一个模块化的、可共享的代码库。库不仅提供 API，还作为隐私的一个单元：以下划线 (`_`) 开头的标识符仅在该库内部可见。每个 Dart 文件（及其部分）都是一个库，即使它没有使用 `library` 指令也是如此。

库可以通过包来分发。

## 使用库

使用 `import` 来指定一个库中的命名空间如何在另一个库的范围内使用。

例如，Dart Web 应用通常会使用 `dart:html` 库，可以这样导入：

```dart
import 'dart:html';
```

`import` 指令的唯一必需参数是一个指定库的 URI。对于内置库，URI 使用特殊的 `dart:` 方案。对于其他库，你可以使用文件系统路径或 `package:` 方案。`package:` 方案指定了由包管理器（如 pub 工具）提供的库。例如：

```dart
import 'package:test/test.dart';
```

## 指定库前缀

如果你导入了两个具有冲突标识符的库，那么你可以为其中一个或两个库指定一个前缀。例如，如果 `library1` 和 `library2` 都有一个 `Element` 类，那么你的代码可能如下所示：

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// 使用来自 lib1 的 Element
Element element1 = Element();

// 使用来自 lib2 的 Element
lib2.Element element2 = lib2.Element();
```

## 仅导入库的一部分

如果你只想使用库的一部分，可以选择性地导入该库。例如：

```dart
// 仅导入 foo
import 'package:lib1/lib1.dart' show foo;

// 导入所有名称，除了 foo
import 'package:lib2/lib2.dart' hide foo;
```

## 延迟加载库

延迟加载（也称为按需加载）允许 Web 应用在需要时加载库。如果你想要满足以下一个或多个需求，请使用延迟加载：

- 减少 Web 应用的初始启动时间。
- 执行 A/B 测试，例如尝试算法的不同实现。
- 加载不常用的功能，如可选的屏幕和对话框。

这并不意味着 Dart 在启动时加载所有延迟组件。Web 应用可以通过网络在需要时下载延迟组件。

`dart` 工具不支持除 Web 以外的目标的延迟加载。如果你正在构建 Flutter 应用，请查看 Flutter 指南中关于延迟组件的实现。

要延迟加载库，首先使用 `deferred as` 导入它：

```dart
import 'package:greetings/hello.dart' deferred as hello;
```

当你需要该库时，使用库的标识符调用 `loadLibrary()`。

```dart
Future<void> greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

在上面的代码中，`await` 关键字会暂停执行，直到库被加载。

你可以在同一个库上多次调用 `loadLibrary()` 而不会出现问题。库只会被加载一次。

使用延迟加载时，请注意以下事项：

- 延迟库的常量在导入文件中不是常量。请记住，这些常量在延迟库加载之前不存在。
- 你不能在导入文件中使用延迟库中的类型。相反，考虑将接口类型移动到一个由延迟库和导入文件都导入的库中。
- Dart 隐式地将 `loadLibrary()` 插入到你使用 `deferred as` 命名空间定义的命名空间中。`loadLibrary()` 函数返回一个 `Future`。

## `library` 指令

要在文件开头指定库级别的文档注释或元数据注解，请将它们附加到 `library` 声明上。

```dart
/// 一个非常棒的测试库。
@TestOn('browser')
library;
```

## 实现库

请参阅“创建包”部分以获取关于如何实现包的建议，包括：

- 如何组织库源代码。
- 如何使用 `export` 指令。
- 何时使用 `part` 指令。
- 如何使用条件导入和导出来实现支持多个平台的库。
