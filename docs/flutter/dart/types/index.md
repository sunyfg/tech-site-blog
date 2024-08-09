# 类型

Dart 的类型系统丰富且灵活，支持多种基本类型和复合类型。以下是根据最新信息（截至当前时间 2024 年 8 月）列举的 Dart 类型：

## 基本类型

1. **数值类型（Numbers）**

   - `int`：表示整数。Dart 中的整数是 64 位的，但在 32 位系统上，它们可能以 32 位形式存储。

     ```dart
     int age = 25;
     ```

   - `double`：表示 64 位浮点数（双精度浮点数）。Dart 中没有单独的`float`类型，所有的浮点数都是`double`。
     ```dart
     double height = 1.75;
     ```

2. **字符串类型（Strings）**

   - `String`：表示文本序列。Dart 中的字符串是不可变的，但可以通过创建新的字符串来“修改”字符串。字符串可以使用单引号或双引号括起来，并允许在字符串中使用插值表达式。
     ```dart
     String name = 'Alice';
     String greeting = 'Hello, $name!';
     String multiLineString = """
     This is a multi-line string.
     It can span across multiple lines.
     """;
     ```

3. **布尔类型（Booleans）**

   - `bool`：表示逻辑上的真（`true`）或假（`false`）。布尔类型通常用于控制程序流程中的条件语句，如`if`语句和循环。

     ```dart
     bool isRaining = true;
     bool isSunny = false;

     if (isRaining) {
       print('It\'s raining.');
     } else {
       print('It\'s sunny.');
     }
     ```

4. **Runes and grapheme clusters**（Dart 2.7 及更高版本）

- `Runes`：表示 Unicode 码点序列。Dart 中的字符串是以 UTF-16 编码的，因此一个 Unicode 码点可能由一个或多个 16 位的代码单元组成。`Runes` 类型用于处理这些情况。
- `Grapheme Clusters`：表示用户感知的字符。一个 grapheme cluster 可能由多个 Unicode 码点组成，例如，一个表情符号可能由多个 Unicode 码点组成。`Grapheme clusters` 类型用于处理这些情况。

5. **符号类型（Symbols）**（Dart 2.2 及更高版本）

- `Symbol`：表示 `Dart` 程序中声明的操作符或者标识符。它们提供了一种方式，使得即使在代码被混淆或压缩后，也能通过 `Symbol` 来稳定地引用特定的标识符。

## 复合类型

1. **列表（List）**

   - `List`：表示有序的元素集合，可以包含重复的元素。列表是可变的，即可以添加、删除或修改其中的元素。

   ```dart
   List<int> numbers = [1, 2, 3, 4, 5];
   List<String> names = ['Alice', 'Bob', 'Charlie'];
   List<dynamic> mixedList = [1, 'two', true]; // 使用 dynamic 可以包含任意类型的元素

   // 添加元素
   mixedList.add(3.14);

   // 访问元素
   print(mixedList[0]); // 输出: 1
   ```

2. **集合（Set）**

   - `Set`：表示无序的元素集合，不允许包含重复元素。集合是可变的，即可以添加或删除元素，但不能直接修改元素（因为集合中的元素是唯一的，修改元素可能会导致元素不再唯一）。

   ```dart
   Set<String> fruits = {'apple', 'banana', 'cherry'};

   // 添加元素
   fruits.add('date');

   // 检查元素是否存在
   print(fruits.contains('banana')); // 输出: true
   ```

3. **映射（Map）**

   - `Map`：表示键值对的集合，每个键对应一个值。键和值可以是任何类型，但每个键在映射中必须是唯一的。映射是可变的，即可以添加、删除或修改键值对。

   ```dart
   Map<String, int> ages = {'Alice': 25, 'Bob': 30, 'Charlie': 35};

   // 添加键值对
   ages['David'] = 40;

   // 访问值
   print(ages['Alice']); // 输出: 25
   ```

4. **记录（Record）**（Dart 3.0 及更高版本）

   - Records 是一种特殊的、匿名的、不可变的聚合类型，用于将多个不同类型的值组合成一个单一的值。Records 在 Dart 3.0 及更高版本中引入，提供了一种轻量级的方式来表示数据聚合。

## 特殊类型

- `null`：表示空值。在 Dart 中，所有类型都可以被赋值为`null`，但自 Dart 2.12 起，引入了空安全特性，允许通过`?`后缀将变量声明为可为空（nullable），从而避免空指针异常。

```dart
int? nullableInt; // 可为空的整数
String? nullableString; // 可为空的字符串

nullableInt = null; // 合法
nullableString = null; // 合法

// 使用空安全特性
if (nullableInt != null) {
  print(nullableInt);
}
```

## 其他类型

- **函数类型**：Dart 中的函数也是一等公民，可以赋值给变量、作为参数传递给其他函数或作为其他函数的返回值。
- **枚举类型（Enum）**：Dart 支持枚举类型，用于表示一组命名的常量。
- **泛型（Generics）**：Dart 支持泛型，允许在定义类、接口、函数等时指定类型参数，从而提供类型安全和代码复用。
- **类型别名（Type Aliases）**：Dart 允许为现有类型创建别名，以提高代码的可读性和可维护性。
