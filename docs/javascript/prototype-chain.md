# 原型链

JavaScript 中的原型链（Prototype Chain）是一个核心概念，它解释了对象之间如何共享和继承属性和方法。要深入理解原型链，我们需要先了解几个关键概念：原型（Prototype）、构造函数（Constructor）、以及 `__proto__` 和 `prototype` 属性。

## 1. 原型（Prototype）

在 JavaScript 中，每个对象都有一个内部链接指向另一个对象，这个被链接的对象我们称之为“原型”。原型对象本身也可以有自己的原型，从而形成了一条链。这种链式结构就是原型链。

## 2. 构造函数（Constructor）

构造函数是一种特殊的函数，用于创建和初始化对象。在 JavaScript 中，当使用 `new` 关键字来调用一个函数时，这个函数就变成了构造函数。构造函数通常用于设置新对象的初始状态。

## 3. `__proto__` 属性

`__proto__` 是一个非标准但广泛支持的属性，它指向了当前对象的原型对象。需要注意的是，`__proto__` 并不是 ECMAScript 标准的一部分，因此在一些环境中可能不可用或不被推荐使用。然而，了解它对于理解原型链仍然很有帮助。

## 4. `prototype` 属性

每个函数都有一个 `prototype` 属性，这个属性是一个指针，指向一个对象，这个对象包含了所有由特定类型的实例共享的属性和方法。也就是说，当你使用构造函数创建一个新对象时，这个新对象的内部 `[[Prototype]]`（在大多数实现中通过 `__proto__` 访问）会指向构造函数的 `prototype` 对象。

## 原型链的工作原理

当访问一个对象的属性或方法时，JavaScript 会首先在对象本身中查找。如果找不到，就会去对象的原型中查找。如果原型对象中也没有找到，就会继续向上在原型链中查找，直到达到原型链的顶端（通常是 `null`），如果仍然没有找到，则返回 `undefined`。

这个过程称为原型链查找（Prototype Chain Lookup）。

## 示例

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

var person1 = new Person("Alice");

// 访问 person1 的 sayHello 方法
person1.sayHello(); // 输出: Hello, my name is Alice

// 原型链查找过程
// 1. 检查 person1 对象自身是否有 sayHello 属性，没有。
// 2. 查找 person1 的原型（Person.prototype），找到了 sayHello 方法，并调用它。
```

在这个例子中，`person1` 对象没有自己的 `sayHello` 方法，但是通过原型链，它找到了 `Person.prototype` 上的 `sayHello` 方法，并成功调用。

## 结论

原型链是 JavaScript 中实现继承的一种方式，它允许对象共享和继承其他对象的属性和方法。理解原型链对于深入理解和使用 JavaScript 至关重要。
