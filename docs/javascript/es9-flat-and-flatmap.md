# flat() 和 flatMap()

ES2018（也称为 ECMAScript 2018 或 ES9）引入了`Array.prototype.flat()`和`Array.prototype.flatMap()`两个新的数组方法，这两个方法主要用于处理数组的“扁平化”（flattening），即将多维数组转换为一维数组。

## `flat()` 方法

`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

**语法**:

```javascript
arr.flat([depth]);
```

- `depth`（可选）：指定要提取嵌套数组的结构深度，默认值为 1。如果深度大于数组嵌套深度，则返回一维数组；如果深度小于等于 0，则返回原数组。

**示例**:

```javascript
const arr = [1, 2, [3, 4], [5, [6, 7]]];

// 不传递深度，默认深度为1
console.log(arr.flat());
// 输出: [1, 2, 3, 4, [5, [6, 7]]]

// 传递深度为2
console.log(arr.flat(2));
// 输出: [1, 2, 3, 4, 5, [6, 7]]

// 传递深度为Infinity，完全扁平化
console.log(arr.flat(Infinity));
// 输出: [1, 2, 3, 4, 5, 6, 7]
```

## `flatMap()` 方法

`flatMap()` 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与`map()`接着`flat(1)`的结合非常相似，但`flatMap()`在底层实现中通常更高效。

**语法**:

```javascript
arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回元素数组
}[, thisArg])
```

- `callback`：生成新数组元素的函数，可以返回数组，`flatMap()`会将返回的数组“展平”到最终数组中。
- `thisArg`（可选）：执行`callback`函数时`this`的值。

**示例**:

```javascript
// 假设我们有一个数字数组，我们想为每个数字生成一个包含该数字及其平方的数组
const numbers = [1, 2, 3];

// 使用flatMap
const result = numbers.flatMap((x) => [x, x * x]);
console.log(result);
// 输出: [1, 1, 2, 4, 3, 9]

// 同样的效果，但使用map和flat
const resultWithMapFlat = numbers.map((x) => [x, x * x]).flat();
console.log(resultWithMapFlat);
// 输出: [1, 1, 2, 4, 3, 9]

// 注意到flatMap的写法更简洁，且在某些情况下可能更高效
```

`flatMap()`在处理需要映射然后扁平化的场景时非常有用，特别是在处理嵌套数组或对象时，可以简化代码并提高效率。
