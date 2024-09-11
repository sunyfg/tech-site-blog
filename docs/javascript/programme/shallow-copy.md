# 浅拷贝

## 题目

请实现一个`shallowClone`函数，该函数能够浅拷贝一个对象或数组。

## 要求

1. 支持普通对象和数组的浅拷贝。
2. 不需要处理特殊对象（如`Date`、`RegExp`、`Function`等）和循环引用。
3. 尽可能简洁地实现。

## 解答示例

使用扩展运算符（Spread Operator）或`Object.assign()`方法是实现浅拷贝的简洁方式。以下是两种实现方式的示例：

### 使用扩展运算符

```javascript
function shallowClone(obj) {
  if (Array.isArray(obj)) {
    return [...obj];
  } else if (typeof obj === "object" && obj !== null) {
    return { ...obj };
  } else {
    // 如果不是对象或数组，直接返回原值
    return obj;
  }
}

// 测试用例
const originalObj = { a: 1, b: { c: 2 } };
const clonedObj = shallowClone(originalObj);

console.log(clonedObj === originalObj); // false
console.log(clonedObj.b === originalObj.b); // true，浅拷贝，b属性仍然指向同一个对象

const originalArr = [1, 2, 3];
const clonedArr = shallowClone(originalArr);

console.log(clonedArr === originalArr); // false
console.log(clonedArr[1] === originalArr[1]); // true，因为是基本类型，值相等，但这里不是浅拷贝的重点
```

### 使用`Object.assign()`

```javascript
function shallowClone(obj) {
  if (Array.isArray(obj)) {
    return obj.slice(); // 对于数组，slice()方法也可以实现浅拷贝
  } else if (typeof obj === "object" && obj !== null) {
    return Object.assign({}, obj);
  } else {
    return obj;
  }
}

// 测试用例同上
```

## 注意事项

1. **引用类型的属性**：如示例中所示，浅拷贝对于引用类型的属性（如对象或数组的属性仍是指向原始对象的引用），只是拷贝了引用地址，而非对象本身。

2. **基本类型的属性**：对于基本类型的属性（如数字、字符串、布尔值等），浅拷贝和深拷贝的效果是一样的，都是拷贝其值。

3. **函数和特殊对象**：题目要求不处理特殊对象和函数，但在实际应用中，如果需要拷贝这些类型，则需要额外的逻辑来处理。

4. **性能**：浅拷贝通常比深拷贝快，因为它不需要递归复制对象中的每个属性。但是，在决定使用哪种拷贝方式时，还需要考虑数据的具体使用场景。
