# 元数据

使用元数据为你的代码提供额外信息。元数据注解以字符`@`开头，后面跟一个对编译时常量的引用（如`deprecated`）或对一个常量构造函数的调用。

所有 Dart 代码都可以使用四种注解：`@Deprecated`、`@deprecated`、`@override`和`@pragma`。关于`@override`的使用示例，请参见[扩展类](https://dart.dev/guides/language/classes#extending-a-class)。下面是一个使用`@Deprecated`注解的示例：

```dart
class Television {
  /// 使用[turnOn]来开启电源。
  @Deprecated('Use turnOn instead')
  void activate() {
    turnOn();
  }

  /// 开启电视的电源。
  void turnOn() {
    // ...
  }
  // ...
}
```

如果你不想指定消息，可以使用`@deprecated`。但是，我们推荐总是使用`@Deprecated`并指定一个消息。

你可以定义自己的元数据注解。下面是一个定义了一个`@Todo`注解的例子，它接受两个参数：

```dart
class Todo {
  final String who;
  final String what;
  const Todo(this.who, this.what);
}
```

下面是如何使用这个`@Todo`注解的示例：

```dart
@Todo('Dash', 'Implement this function')
void doSomething() {
  print('Do something');
}
```

元数据可以出现在库、类、类型定义、类型参数、构造函数、工厂函数、普通函数、字段、参数或变量声明之前，以及 import 或 export 指令之前。
