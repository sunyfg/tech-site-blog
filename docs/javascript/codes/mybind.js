Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);
  const bound = function () {
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof bound ? this : context,
      args.concat(bindArgs)
    );
  };
  return bound;
};

// 测试
function foo(...args) {
  console.log(this.name, args);
}

const obj = {
  name: "lisi",
};

foo.myBind(obj, 0)(1, 2, 3); // 输出 "obj"
