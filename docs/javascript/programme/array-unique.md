# 数组去重

在 JavaScript 中，实现数组去重是一个常见的面试题，它考察了面试者对数组操作、对象使用以及可能的高级 JavaScript 特性的理解。以下是一些常见的实现方法：

## 1. 使用 Set

`Set`是 ES6 中引入的一个新的数据结构，它类似于数组，但是成员的值都是唯一的，没有重复的值。

```javascript
function uniqueArrayUsingSet(arr) {
  return [...new Set(arr)];
}

// 示例
const array = [1, 2, 2, 3, 4, 4, 5];
console.log(uniqueArrayUsingSet(array)); // 输出: [1, 2, 3, 4, 5]
```

## 2. 使用 filter 和 indexOf

这种方法通过`filter`函数和数组的`indexOf`方法来检查元素是否首次出现。

```javascript
function uniqueArrayUsingFilter(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

// 示例
const array = [1, 2, 2, 3, 4, 4, 5];
console.log(uniqueArrayUsingFilter(array)); // 输出: [1, 2, 3, 4, 5]
```

## 3. 使用 Map

利用`Map`对象，其键是唯一的特性，来实现去重。

```javascript
function uniqueArrayUsingMap(arr) {
  const map = new Map();
  arr.forEach((item) => map.set(item, true));
  return Array.from(map.keys());
}

// 示例
const array = [1, 2, 2, 3, 4, 4, 5];
console.log(uniqueArrayUsingMap(array)); // 输出: [1, 2, 3, 4, 5]
```

## 4. 使用 reduce

`reduce`方法也可以用来实现数组去重，它遍历数组，累积回调函数的返回值，最后返回单个值。

```javascript
function uniqueArrayUsingReduce(arr) {
  return arr.reduce((acc, current) => {
    if (acc.indexOf(current) === -1) {
      acc.push(current);
    }
    return acc;
  }, []);
}

// 示例
const array = [1, 2, 2, 3, 4, 4, 5];
console.log(uniqueArrayUsingReduce(array)); // 输出: [1, 2, 3, 4, 5]
```

## 5. 使用 for 循环和对象

这是更传统的去重方法，通过创建一个空对象来跟踪已看到的元素。

```javascript
function uniqueArrayUsingLoop(arr) {
  const obj = {};
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!obj.hasOwnProperty(arr[i])) {
      obj[arr[i]] = true;
      result.push(arr[i]);
    }
  }
  return result;
}

// 示例
const array = [1, 2, 2, 3, 4, 4, 5];
console.log(uniqueArrayUsingLoop(array)); // 输出: [1, 2, 3, 4, 5]
```

每种方法都有其适用场景和优缺点，例如`Set`方法最简单，但在某些旧版浏览器中可能不可用；`filter`和`indexOf`方法易于理解，但在大数据集上可能效率较低；而`Map`和`reduce`方法提供了更灵活的解决方案。在实际应用中，可以根据具体需求和环境选择最适合的方法。
