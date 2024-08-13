# instanceof

`instanceof` 是 JavaScript 中的一个操作符，用于检测一个对象是否在其原型链原型构造函数的 `prototype` 属性所指向的原型对象或其子类的原型对象上。换句话说，它用来判断一个对象是否属于某个构造函数的实例。

## 基本用法

```javascript
obj instanceof Constructor;
```

- `obj` 是要检测的对象。
- `Constructor` 是构造函数。

如果 `obj` 是 `Constructor` 的实例或其原型链上某个构造函数的实例，则 `instanceof` 返回 `true`；否则返回 `false`。

## 原理

`instanceof` 的工作原理是通过遍历对象的原型链，判断链上是否存在指定的构造函数原型。如果找到，则返回 `true`，否则返回 `false`。

## 手写一个 instanceof

要手写一个 `instanceof`，我们需要模拟这个过程。基本思路是：从目标对象的 `__proto__`（或使用 `Object.getPrototypeOf(obj)` 获取）开始，沿着原型链一直向上查找，直到原型链的顶端（即 `null`），看是否能找到指定的构造函数的 `prototype` 属性。

```javascript
function myInstanceOf(obj, Constructor) {
  // 第一步：处理非对象的情况
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  // 第二步：获取构造函数的原型
  let prototype = Constructor.prototype;

  // 第三步：沿着原型链查找
  while (true) {
    // 使用 obj.__proto__ 或 Object.getPrototypeOf(obj) 都可以，但 __proto__ 不是标准属性
    if (obj.__proto__ === prototype) {
      return true;
    }
    // 如果原型链的顶端是 null，说明没有找到，返回 false
    if (obj.__proto__ === null) {
      return false;
    }
    // 继续向上查找
    obj = obj.__proto__;
  }
}

// 测试
function Person(name) {
  this.name = name;
}

const person = new Person("John");
console.log(myInstanceOf(person, Person)); // true
console.log(myInstanceOf(person, Object)); // true，因为 Person 继承自 Object
console.log(myInstanceOf(person, Array)); // false
console.log(myInstanceOf(null, Object)); // false
console.log(myInstanceOf({}, Object)); // true
```

**注意**：虽然在这个例子中使用了 `__proto__` 来遍历原型链，但需要注意的是 `__proto__` 并不是 ECMAScript 标准的一部分，虽然在大多数现代 JavaScript 环境中它都是可用的。更标准的方式是使用 `Object.getPrototypeOf(obj)` 来获取对象的原型。

## 使用 Object.getPrototypeOf

将上述 `myInstanceOf` 函数中的 `obj.__proto__` 替换为 `Object.getPrototypeOf(obj)` 使其更标准：

```javascript
function myInstanceOf(obj, Constructor) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  let prototype = Constructor.prototype;
  while (true) {
    if (Object.getPrototypeOf(obj) === prototype) {
      return true;
    }
    if (Object.getPrototypeOf(obj) === null) {
      return false;
    }
    obj = Object.getPrototypeOf(obj);
  }
}
```
