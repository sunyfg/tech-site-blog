# Array.prototype.includes

`Array.prototype.includes()` 方法是 JavaScript 中的一个数组方法，用于判断一个数组是否包含一个指定的值，根据情况如果包含则返回 `true`，否则返回 `false`。这个方法在 ES2016（ES7）中被正式引入，为数组处理提供了更直观和方便的方式。

## 详细解释

- **参数**：`includes()` 方法接受两个参数：

  - `searchElement`：你想要在数组中查找的元素。
  - `fromIndex`（可选）：开始查找的位置。如果省略该参数或其值小于 0，则整个数组都会被搜索。如果 `fromIndex` 的值大于等于数组长度，则 `false` 会被返回，因为这意味着数组中没有元素会被搜索到。如果 `fromIndex` 是负数，则它表示从数组末尾开始的第几位（例如，-1 表示最后一个元素，-2 表示倒数第二个元素，依此类推）。

- **返回值**：一个布尔值，表示数组是否包含指定的值。

- **特性**：
  - `includes()` 方法区分大小写，这意味着 `'A'` 和 `'a'` 会被视为不同的值。
  - 对于包含 `NaN` 的数组，`includes()` 方法能够正确地判断 `NaN` 的存在性，因为 `NaN` 是唯一的非自反值（即 `NaN !== NaN` 为 `true`），但 `Array.prototype.includes()` 使用 `SameValueZero` 算法来判断元素是否相等，该算法将 `NaN` 视为等于自身。

## 代码示例

### 示例 1：基本使用

```javascript
const fruits = ["apple", "banana", "mango", "orange"];

// 检查数组中是否包含 'banana'
console.log(fruits.includes("banana")); // 输出: true

// 检查数组中是否包含 'grape'
console.log(fruits.includes("grape")); // 输出: false
```

### 示例 2：使用 fromIndex 参数

```javascript
const numbers = [1, 2, 3, 4, 5, 5, 6];

// 从索引 2 开始查找元素 5
console.log(numbers.includes(5, 2)); // 输出: true

// 从索引 3 开始查找元素 5（注意：这会跳过第一个 5）
console.log(numbers.includes(5, 3)); // 输出: true

// 从索引 6 开始查找元素 5（不在范围内）
console.log(numbers.includes(5, 6)); // 输出: false

// 使用负数索引从数组末尾开始查找
console.log(numbers.includes(5, -2)); // 输出: true，因为从末尾开始第二个元素是 5
```

### 示例 3：处理 NaN

```javascript
const numbers = [NaN, 2, 3];

// 检查数组中是否包含 NaN
console.log(numbers.includes(NaN)); // 输出: true
```

在这个例子中，尽管 `NaN` 是特殊的，但 `includes()` 方法能够正确地识别出数组中包含 `NaN`。

总的来说，`Array.prototype.includes()` 方法是一个非常有用的数组方法，它提供了一种简洁而强大的方式来检查数组中是否包含某个值。
