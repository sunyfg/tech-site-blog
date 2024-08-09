# Dart 操作符

## 1. 算术操作符

Dart 支持基本的算术操作符，包括加法 (`+`)、减法 (`-`)、乘法 (`*`)、除法 (`/`，结果为 double 类型)、整数除法 (`~/`，结果为 int 类型) 和取模 (`%`，取余数)。Dart 还支持前缀和后缀的递增 (`++`) 和递减 (`--`) 操作符。

```dart
assert(2 + 3 == 5);
assert(5 ~/ 2 == 2);
a = 0;
b = ++a; // a 变为 1，然后赋值给 b，b 也是 1
```

## 2. 相等性和关系操作符

- **相等性操作符**：`==` 用于判断两个对象是否相等（基于它们的 `==` 方法），`!=` 用于判断两个对象是否不相等。
- **关系操作符**：`>`、`<`、`>=`、`<=` 用于比较两个数字或对象的大小关系。

```dart
assert(2 == 2);
assert(3 > 2);
```

## 3. 类型检查操作符

- `is` 用于检查一个对象是否是特定类型或接口的实现。
- `as` 用于将对象显式转换为某个类型（如果不匹配会抛出异常）。
- `is!` 是 `is` 的否定形式，用于检查对象不是某个类型。

```dart
if (employee is Person) {
  // employee 是 Person 类型
}
(employee as Person).firstName = 'Bob'; // 如果 employee 不是 Person 类型，这里会抛出异常
```

## 4. 赋值操作符

- 基本的赋值操作符是 `=`。
- 空值合并赋值操作符 `??=` 用于仅在变量为 null 时赋值。
- 复合赋值操作符如 `+=`、`-=`、`*=` 等结合了赋值和算术运算。

```dart
a = 5;
a += 2; // 相当于 a = a + 2
b ??= 10; // 如果 b 是 null，则 b = 10；否则 b 保持不变
```

## 5. 逻辑操作符

逻辑操作符包括 `&&`（逻辑与）、`||`（逻辑或）和 `!`（逻辑非）。它们用于组合或反转布尔表达式。

```dart
if (!done && (col == 0 || col == 3)) {
  // ...
}
```

## 6. 位操作和移位操作符

这些操作符允许对整数的单个位进行操作，包括按位与 (`&`)、按位或 (`|`)、按位异或 (`^`)、按位非 (`~`，作为前缀操作符）、左移 (`<<`）、右移 (`>>`）和无符号右移 (`>>>`，要求 Dart 语言版本至少为 2.14）。

```dart
final value = 0x22;
final bitmask = 0x0f;
assert((value & bitmask) == 0x02);
```

## 7. 条件表达式

Dart 支持两种条件表达式：

- 三元操作符 `condition ? expr1 : expr2`：如果 `condition` 为真，则表达式结果为 `expr1` 的值，否则为 `expr2` 的值。
- 空值合并操作符 `??`（也称为 null-coalescing 操作符）：如果第一个表达式不为 null，则返回其值；否则返回第二个表达式的值。

```dart
var visibility = isPublic ? 'public' : 'private';
String playerName(String? name) => name ?? 'Guest';
```

## 8. 级联操作符

级联操作符 (`..` 和 `?..`）允许在单个对象上执行多个操作，从而避免创建临时变量。`?..` 是对可能为 null 的对象使用的安全级联操作符。

```dart
var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;

querySelector('#confirm')?..text = 'Confirm'
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'))
  ..scrollIntoView();
```

## 9. 展开操作符

展开操作符（`...` 和 `...?`）用于将集合中的元素展开并插入到另一个集合中。

- `...`：用于展开非空集合。
- `...?`：在 Dart 2.3 及更高版本中引入，用于空值安全的展开，当集合可能为 `null` 时使用。

以下是展开操作符的一些示例：

### 列表展开

假设你有两个列表，并希望将它们合并成一个新的列表：

```dart
List<int> list1 = [1, 2, 3];
List<int> list2 = [4, 5, 6];
List<int> combinedList = [...list1, ...list2];
// combinedList 的值为 [1, 2, 3, 4, 5, 6]
```

### 映射（Map）展开

映射（Map）展开可以将一个映射的内容添加到另一个映射中：

```dart
Map<String, int> map1 = {'a': 1, 'b': 2};
Map<String, int> map2 = {'c': 3, 'd': 4};
Map<String, int> combinedMap = {...map1, ...map2};
// combinedMap 的值为 {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

### 展开集合作为函数参数

你可以将集合展开为函数调用的参数列表：

```dart
void printNumbers(int a, int b, int c) {
  print("$a, $b, $c");
}

List<int> numbers = [1, 2, 3];
// 使用展开操作符将列表元素作为参数传递给函数
printNumbers(...numbers);
// 输出: 1, 2, 3
```

### 展开可为空的集合

如果你的集合可能为`null`，你可以使用`...?`来避免空集合引起的错误：

```dart
List<int>? nullableList = [7, 8, 9];
List<int> safeList = [...?nullableList];
// 如果 nullableList 非空，safeList 的值为 [7, 8, 9]；如果 nullableList 为 null，则 safeList 为空列表 []
```

请注意，对于可为空的集合，如果尝试展开`null`，则会得到一个空列表（而不是引发异常），这在处理可能为`null`的集合时非常有用。
