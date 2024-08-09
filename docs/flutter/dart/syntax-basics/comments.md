# 注释

Dart 支持单行注释、多行注释和文档注释。

## 单行注释

单行注释以 `//` 开始。`//` 和行末之间的所有内容都会被 Dart 编译器忽略。

```dart
void main() {
  // TODO: refactor into an AbstractLlamaGreetingFactory?
  print('Welcome to my Llama farm!');
}
```

## 多行注释

多行注释以 `/*` 开始，以 `*/` 结束。`/*` 和 `*/` 之间的所有内容都会被 Dart 编译器忽略（除非注释是文档注释；见下一节）。多行注释可以嵌套。

```dart
void main() {
  /*
   * This is a lot of work. Consider raising chickens.
   * Llama larry = Llama();
   * larry.feed();
   * larry.exercise();
   * larry.clean();
   */
}
```

## 文档注释

文档注释是多行或单行注释，它们以 `///` 或 `/**` 开始。连续使用 `///` 的效果与多行文档注释相同。

在文档注释中，分析器会忽略所有不在括号内的文本。使用括号，您可以引用类、方法、字段、顶级变量、函数和参数。括号中的名称会根据被文档化的程序元素的词法作用域进行解析。

以下是一个文档注释的例子，其中引用了其他类和参数：

```dart
/// A domesticated South American camelid (Lama glama).
/// Andean cultures have used llamas as meat and pack
/// animals since pre-Hispanic times.
/// Just like any other animal, llamas need to eat,
/// so don't forget to [feed] them some [Food].
class Llama {
  String? name;

  /// Feeds your llama [food].
  /// The typical llama eats one bale of hay per week.
  void feed(Food food) {
    // ...
  }

  /// Exercises your llama with an [activity] for
  /// [timeLimit] minutes.
  void exercise(Activity activity, int timeLimit) {
    // ...
  }
}
```

在生成的文档中，`[feed]` 会成为指向 `feed` 方法文档的链接，`[Food]` 会成为指向 `Food` 类文档的链接。

要解析 Dart 代码并生成 HTML 文档，您可以使用 Dart 的文档生成工具 `dart doc`。有关生成文档的示例，请参见 Dart API 文档。有关如何组织注释的建议，请参阅《Effective Dart：Documentation》。
