# new

在 JavaScript 中，`new` 关键字用于创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型的实例。当使用 `new` 关键字调用一个函数时，这个函数就成为了一个构造函数（constructor）。构造函数是一种特殊的函数，主要用于初始化新创建的对象。使用 `new` 关键字调用构造函数时，会执行以下步骤：

1. **创建一个新的空对象**：首先，JavaScript 会创建一个空的简单 JavaScript 对象（即`{}`）。

2. **设置原型**：然后，将这个空对象的内部`[[Prototype]]`（即`__proto__`）链接到构造函数的`prototype`属性所指向的对象。这意味着新创建的对象将能够访问构造函数原型链上的所有属性和方法。

3. **执行构造函数**：接下来，使用新创建的对象作为`this`的上下文来调用构造函数。这允许构造函数为新创建的对象添加属性和方法。

4. **返回新对象**：如果构造函数显式地返回一个对象，则`new`表达式的结果就是那个被返回的对象。如果构造函数没有显式地返回任何对象（即返回`undefined`或`null`），则`new`表达式的结果就是第一步中创建的那个对象。

## 示例

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  };
}

// 使用 new 关键字创建 Person 的实例
const person1 = new Person("Alice", 30);

// 访问实例的属性和方法
console.log(person1.name); // 输出: Alice
person1.greet(); // 输出: Hello, my name is Alice and I am 30 years old.

// 验证实例的原型
console.log(person1 instanceof Person); // 输出: true
console.log(person1.__proto__ === Person.prototype); // 输出: true（注意：__proto__ 是非标准的，但大多数现代浏览器都支持）
```

## 注意事项

- 构造函数通常首字母大写，以区别于普通函数。但这只是一个约定，JavaScript 不会强制要求。
- 构造函数可以返回对象，但如果返回的是原始值（如数字、字符串、布尔值或`null`），则`new`表达式的结果仍然是新创建的对象。如果返回的是另一个对象，则`new`表达式的结果就是那个被返回的对象。
- 使用`new`关键字是创建具有特定属性和方法的对象的一种非常灵活的方式，但过度使用可能会导致代码难以理解和维护。在可能的情况下，考虑使用对象字面量或类（ES6 及更高版本）来创建对象。
- 在严格模式下（使用`'use strict';`），如果构造函数不返回任何对象（即返回`undefined`或`null`），则`new`表达式的结果仍然是新创建的对象，这与非严格模式的行为相同。但是，在非严格模式下，如果构造函数不显式地返回任何值（即没有`return`语句），则也会返回新创建的对象。在严格模式下，构造函数必须显式地返回对象，否则将抛出错误。然而，由于构造函数通常会返回新创建的对象，因此这个差异在实际应用中很少会遇到。
