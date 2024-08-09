# 变量

## 变量和类型

**变量声明与初始化**

在 Dart 中，变量是通过声明其名称和类型（尽管很多时候可以自动推断）来创建的。以下是一个基本的变量声明和初始化示例：

```dart
var name = 'Bob'; // 使用var关键字，自动推断类型为String
String name = 'Bob'; // 显式声明类型为String
```

在这里，`name`变量被赋予了字符串值`"Bob"`。如果你使用`var`关键字，Dart 会自动推断变量的类型（在这个例子中是`String`）。你也可以显式地声明变量的类型，这样做可以提供更多的代码安全性和可读性。

在 Dart 中，Null Safety 是一个非常重要的特性，它帮助开发者避免了很多由于变量未正确初始化或误操作 null 值而导致的运行时错误。以下是“Null safety”这一节的翻译内容：

## 空安全

Dart 语言强制执行健全的空安全（Null Safety）。空安全防止了因无意中访问设置为 null 的变量而导致的错误，这种错误称为空解引用错误（null dereference error）。空解引用错误发生在尝试访问一个表达式上的属性或调用一个方法，而该表达式求值为 null 时。然而，有一个例外，即当 null 本身支持该属性或方法时，如`toString()`或`hashCode()`。有了空安全特性，Dart 编译器会在编译时检测这些潜在的错误。

例如，如果你想找到一个`int`类型变量`i`的绝对值，如果`i`是 null，调用`i.abs()`将会导致一个空解引用错误。在其他语言中，这种尝试可能会导致运行时错误，但 Dart 的编译器会禁止这些行为。因此，Dart 应用程序不会导致运行时错误。

空安全引入了三个关键变更：

1. **可空性控制**：当你为变量、参数或其他相关组件指定类型时，你可以控制该类型是否允许 null。为了启用可空性，你在类型声明的末尾添加一个`?`。

   ```dart
   String? name; // 可空类型。可以是 `null` 或字符串。
   String name;   // 不可空类型。不能是 `null`，但可以是字符串。
   ```

2. **变量必须初始化**：在使用变量之前，你必须初始化它们。可为空的变量默认值为 null，因此它们默认已初始化。Dart 不会为非空类型设置初始值，它迫使你为它们设置一个初始值。Dart 不允许你观察未初始化的变量，这防止了你在接收者类型可能为 null 但 null 不支持所使用的方法或属性的情况下访问属性或调用方法。

3. **访问限制**：你不能在具有可空类型的表达式上访问属性或调用方法，除非该属性或方法是 null 支持的，如`hashCode`或`toString()`。

空安全将潜在的运行时错误转变为编辑时分析错误。空安全会在以下情况下标记一个非空变量：

- 没有用非空值初始化。
- 被赋予了 null 值。

这个检查允许你在部署应用程序之前修复这些错误。

## 默认值

未初始化的、具有可为空类型的变量具有初始值`null`。即使在 Dart 中，数字类型的变量最初也是`null`，因为数字——就像 Dart 中的其他所有内容一样——都是对象。

```dart
int? lineCount;
assert(lineCount == null);
```

**注意**：在生产代码中，`assert()`调用会被忽略。但在开发过程中，如果`condition`为`false`，`assert(condition)`会抛出一个异常。有关详细信息，请查看[Assert](https://dart.dev/guides/language/assertions)文档。

在启用空安全的情况下，你必须在使用非空类型变量之前初始化它们的值：

```dart
int lineCount = 0;
```

你不需要在声明局部变量时立即初始化它，但你需要在使用它之前给它赋值。例如，以下代码是有效的，因为 Dart 可以检测到在将`lineCount`传递给`print()`函数之前，`lineCount`是非空的：

```dart
int lineCount;
if (weLikeToCount) {
  lineCount = countLines();
} else {
  lineCount = 0;
}
print(lineCount);
```

顶层变量和类变量是延迟初始化的；初始化代码在变量首次使用时运行。

## Late 变量

`late`修饰符有两个用例：

1. 声明一个非空变量，该变量在声明之后进行初始化。
2. 延迟初始化一个变量。

Dart 的控制流分析通常能够检测到非空变量在使用前是否已被设置为非空值，但有时分析会失败。两个常见的情况是顶层变量和实例变量：Dart 通常无法确定它们是否被设置，因此不会尝试。

如果你确定一个变量在使用前已被设置，但 Dart 不同意，你可以通过将变量标记为`late`来修复错误：

```dart
late String description;
void main() {
  description = 'Feijoada!';
  print(description);
}
```

::: warning
如果你未能初始化一个`late`变量，当使用该变量时，将发生运行时错误。
:::

当你将变量标记为`late`但在声明时初始化它时，初始化器将在变量首次使用时运行。这种延迟初始化在以下情况下很有用：

- 变量可能不需要，并且初始化它很昂贵。
- 你正在初始化一个实例变量，并且其初始化器需要访问`this`。

在以下示例中，如果`temperature`变量从未被使用，则昂贵的`readThermometer()`函数将永远不会被调用：

```dart
// 这是程序中唯一一次调用readThermometer()。
late String temperature = readThermometer(); // 延迟初始化。
```

## Final 和 const

如果你不打算改变一个变量的值，可以使用`final`或`const`来声明这个变量，它们可以作为`var`的替代，或者与类型一起使用。一个`final`变量只能被设置一次；而一个`const`变量是一个编译时常量（const 变量隐式地也是 final 的）。

**Final 变量**

使用`final`关键字声明的变量只能被赋值一次。这意味着一旦你给一个`final`变量赋予了初始值，你就不能再改变它。

```dart
final name = 'Bob'; // 没有类型注解
final String nickname = 'Bobby';
```

尝试改变`final`变量的值会导致编译错误：

```dart
// 错误：final变量只能被设置一次。
name = 'Alice';
```

**Const 变量**

使用`const`关键字声明的变量必须是编译时常量。这意味着它们的值在编译时就必须确定，并且在程序的整个生命周期内都不会改变。`const`变量通常用于声明那些在编译时就已经知道且不会改变的值。

如果`const`变量是在类级别声明的，应该使用`static const`来标记。在声明变量时，其值必须设置为编译时常量，如数字或字符串字面量、`const`变量，或者是常量数字上算术运算的结果。

```dart
const bar = 1000000; // 压力单位（达因/平方厘米）
const double atm = 1.01325 * bar; // 标准大气压
```

`const`关键字不仅用于声明常量变量，还可以用于创建常量值，以及声明生成常量值的构造函数。任何变量都可以有一个常量值。

```dart
var foo = const [];
final bar = const [];
const baz = []; // 等同于 `const []`
```

在`const`声明的初始化表达式中，可以省略`const`关键字，如上例中的`baz`。

可以更改非`final`、非`const`变量的值，即使它之前有一个`const`值：

```dart
foo = [1, 2, 3]; // 曾经是const []
```

但是，不能更改`const`变量的值：

```dart
// 错误：常量变量不能被赋值。
baz = [42];
```

可以定义使用类型检查、类型转换（`is`和`as`）、集合 if（`if`用在集合中），以及展开操作符（`...`和`...?`）的常量：

```dart
const Object i = 3; // 其中i是一个值为整数的const Object
...
const list = [i as int]; // 使用类型转换
const map = {if (i is int) i: 'int'}; // 使用is和集合if
const set = {if (list is List<int>) ...list}; // ...和展开
```

::: tip
虽然一个`final`对象不能被修改（即你不能将其指向另一个对象），但其字段是可以被改变的。相比之下，一个`const`对象及其字段都不能被修改：它们是不可变的。
:::

对于使用`const`创建常量值、列表、映射和类的更多信息，请参阅相关文档。
