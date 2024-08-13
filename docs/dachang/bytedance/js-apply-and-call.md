# apply 和 call 的作用及区别

关于 JavaScript 中的`apply`和`call`方法，我将提供更详细的细节，包括它们的作用、区别、使用场景以及注意事项。

## 作用

`apply`和`call`方法都是`Function`对象的原型方法，它们的主要作用是改变函数运行时`this`的指向。通过这两个方法，可以借用其他对象的方法，并在调用时将`this`指向另一个对象。

## 区别

1. **参数传递方式**：

   - **apply**：`apply`方法接收两个参数，第一个参数是`this`要指向的对象（如果是`null`或`undefined`，在非严格模式下会指向全局对象，在严格模式下`this`会是`undefined`），第二个参数是一个数组或类数组对象，该数组或类数组对象的元素将作为单独的参数传递给被调用的函数。
   - **call**：`call`方法也接收至少一个参数，第一个参数同样是`this`要指向的对象，但从第二个参数开始，后面的参数将被依次传递给被调用的函数。

2. **使用场景**：
   - 当函数的参数已经是一个数组或类数组对象时，使用`apply`可能更方便，因为它可以直接将整个数组作为参数列表传递给函数。
   - 当需要明确指定每个参数时，使用`call`可能更直观，因为它允许你直接将参数按顺序列出。

## 使用场景

1. **改变`this`的指向**：
   当需要在某个对象的方法内部调用另一个对象的方法，并希望改变`this`的指向时，可以使用`apply`或`call`。

2. **借用方法**：
   如果某个对象的方法需要被另一个对象使用，但又不希望或不能修改原对象的方法定义时，可以通过`apply`或`call`来借用该方法。

3. **实现继承**：
   在 JavaScript 中，可以通过`apply`或`call`方法来实现构造函数之间的继承。例如，可以在子类的构造函数中调用父类的构造函数，并通过`apply`或`call`将`this`指向子类的实例。

4. **处理伪数组**：
   在 JavaScript 中，有些对象类似于数组，但实际上并不是真正的数组（例如`arguments`对象）。此时，可以使用`Array.prototype.slice.call()`等方法将伪数组转换为真正的数组。

## 手写 apply 和 call

```javascript
// 手写 apply
Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }

  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  const result = context[fnSymbol](...args);

  delete context[fnSymbol];
  return result;
};

// 手写 call
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  const result = context[fnSymbol](...args);

  delete context[fnSymbol];
  return result;
};
```

**用法**

```javascript
function add(a, b) {
  return a + b;
}

const result1 = add.myApply(null, [1, 2]);
const result2 = add.myCall(null, 1, 2);

console.log(result1); // 3
console.log(result2); // 3
```

## 注意事项

1. **参数传递**：

   - `apply`的第二个参数必须是一个数组或类数组对象，如果传递的不是数组或类数组对象，将会报错。
   - `call`的参数是依次传递的，因此不需要将它们放入数组中。

2. **严格模式**：

   - 在严格模式下（使用`'use strict'`），如果`apply`或`call`的第一个参数是`null`或`undefined`，则函数体内的`this`值将保持为`null`或`undefined`，而不是指向全局对象。

3. **性能考虑**：

   - 在大多数情况下，`apply`和`call`的性能差异是可以忽略不计的。然而，在处理大量数据或高频调用时，可能会产生微小的性能差异。因此，在性能敏感的应用中，建议根据实际情况选择最合适的方法。

4. **错误处理**：
   - 当使用`apply`或`call`时，如果传入的第一个参数不是一个对象（例如`null`、`undefined`、数字、字符串等），并且在非严格模式下，这些值会被自动转换为全局对象（在浏览器中通常是`window`）。这可能会导致意外的行为，因此在编写代码时应该避免这种情况。

通过以上细节，希望能够帮助你更全面地理解 JavaScript 中的`apply`和`call`方法。

```

```
