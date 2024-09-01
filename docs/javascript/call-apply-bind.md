# call、apply、bind

在 JavaScript 中，`call`、`apply`和`bind`是三个非常强大的函数，它们允许你显式地设置函数体内`this`的值，以及调用函数时传递参数的方式。这些函数在处理回调函数、继承、以及函数式编程时特别有用。下面将详细介绍这三个函数的工作原理和用法。

## 1. call()

`call()` 方法调用一个函数，其具有一个指定的`this`值和分别提供的参数（参数的列表）。

**语法**:

```javascript
func.call(thisArg, arg1, arg2, ...)
```

- `thisArg`：在`func`函数运行时使用的`this`值。注意，指定的`this`值并不一定是该函数执行时所在的上下文，仅仅是一个传入值，在函数体内部可以通过`this`来访问。
- `arg1, arg2, ...`：传递给函数的参数。

**示例**:

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Alice" };

greet.call(person, "Hello", "!"); // 输出: Hello, Alice!
```

## 2. apply()

`apply()` 方法调用一个函数，其具有一个指定的`this`值，以及以一个数组（或类数组对象）的形式提供的参数。

**语法**:

```javascript
func.apply(thisArg, [argsArray]);
```

- `thisArg`：在`func`函数运行时使用的`this`值。
- `argsArray`：一个数组或类数组对象，其中的数组元素将作为单独的参数传给`func`函数。如果该参数的值为`null`或`undefined`，则表示不需要传入任何参数。

**示例**:

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Bob" };
const args = ["Hi", "."];

greet.apply(person, args); // 输出: Hi, Bob.
```

## 3. bind()

`bind()` 方法创建一个新的函数，在`bind()`被调用时，这个新函数的`this`被指定为`bind()`的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

**语法**:

```javascript
const newFunc = func.bind(thisArg, arg1, arg2, ...)
```

- `thisArg`：当新函数被调用时，`this`的值。注意，这个值在`bind()`调用时就被指定了，之后无法被修改。
- `arg1, arg2, ...`：预先传入的参数，当新函数被调用时，这些参数会位于传给新函数的参数之前。

**示例**:

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Charlie" };
const boundGreet = greet.bind(person, "Hello");

boundGreet("!"); // 输出: Hello, Charlie!
// 注意：即使在新函数调用时传递了参数，'Hello' 也会作为第一个参数，'!' 作为第二个参数
```

## 总结

- `call()` 和 `apply()` 都用于直接调用函数，并允许你显式地设置函数体内的`this`值。它们之间的主要区别在于如何传递参数：`call()` 使用参数列表，而 `apply()` 使用数组。
- `bind()` 返回一个新的函数，这个新函数在调用时会将`this`设置为`bind()`的第一个参数，并且（可选地）预设了后续的参数。

这些函数在 JavaScript 编程中非常有用，尤其是在处理回调函数、事件处理器、以及需要动态改变`this`指向的场景中。
