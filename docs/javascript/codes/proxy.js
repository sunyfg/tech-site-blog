// var person = {
//   name: "张三",
// };

// var proxy = new Proxy(person, {
//   get: function (target, propKey) {
//     return Reflect.get(target, propKey);
//   },
// });

// console.log(proxy.name); // "张三"

// function createArray(...elements) {
//   let handler = {
//     get(target, propKey, receiver) {
//       let index = Number(propKey);
//       if (index < 0) {
//         propKey = String(target.length + index); // 负数索引转换为正数索引
//       }
//       return Reflect.get(target, propKey, receiver);
//     },
//   };
//   let target = [];
//   target.push(...elements);
//   return new Proxy(target, handler);
// }

// let arr = createArray("a", "b", "c");
// console.log(arr[-1]); // "c"

// const target = Object.defineProperties(
//   {},
//   {
//     foo: {
//       value: 123,
//       writable: false,
//       configurable: false,
//     },
//   }
// );
// const handler = {
//   get(target, propKey) {
//     return "abc";
//   },
// };
// const proxy = new Proxy(target, handler);
// proxy.foo = 456; // 报错: Cannot assign to read only property 'foo' of object '#<Object>'

// 示例
// let validator = {
//   set: function (obj, prop, value) {
//     console.log("🚀 ~ validator.obj, prop, value:", obj, prop, value);
//     if (prop === "age") {
//       if (!Number.isInteger(value)) {
//         throw new TypeError("The age is not an integer");
//       }
//       if (value > 200) {
//         throw new RangeError("The age seems invalid");
//       }
//     }
//     // age
//     obj[prop] = value;
//     return true; // 表示成功
//   },
// };

// let person = new Proxy({}, validator);

// person.age = 100;

// // person.age = "young"; // 抛出异常: TypeError: The age is not an integer
// // person.age = 300; // 抛出异常: RangeError: The age seems invalid

// console.log(person.age); // 100

// 示例，set 方法不起作用
// const obj = {};
// Object.defineProperty(obj, "foo", {
//   value: "bar",
//   writable: false,
// });

// const handler = {
//   set: function (obj, prop, value, receiver) {
//     obj[prop] = "baz";
//   },
// };

// const proxy = new Proxy(obj, handler);
// proxy.foo = "baz"; // 不会触发 set 方法，因为 foo 属性是不可写的
// console.log(proxy.foo); // "bar"

// deleteProperty 方法
// var handler = {
//   deleteProperty(target, key) {
//     invariant(key, "delete");
//     Reflect.deleteProperty(target, key);
//     console.log(`删除了 ${key}`);
//     return true;
//   },
// };
// function invariant(key, action) {
//   if (key[0] === "_") {
//     throw new Error(`无法删除私有属性`);
//   }
// }
// var target = { _prop: "foo", name: "zs" };
// var proxy = new Proxy(target, handler);
// // delete proxy._prop; // 抛出异常: Error: 无法删除私有属性

// // 取消代理
// Proxy.revocable(target, handler);

// delete proxy.name;

// 场景：保障数据类型准确性
// let numericDataStore = { count: 0, amount: 1234, total: 14 };
// numericDataStore = new Proxy(numericDataStore, {
//   set(target, key, value, proxy) {
//     if (typeof value !== "number") {
//       throw Error(`属性只能是number类型`);
//     }
//     return Reflect.set(target, key, value, proxy);
//   },
// });
// numericDataStore.count = "123"; // 抛出异常: Error: number
// numericDataStore.amount = 1234; // 成功

// 场景：保护私有属性
let api = {
  _apiKey: "123abc456def",
  getUsers: function () {},
  getUser: function (userId) {},
  setUser: function (userId, config) {},
};
const RESTRICTED = ["_apiKey"];
api = new Proxy(api, {
  get(target, key, proxy) {
    if (RESTRICTED.indexOf(key) > -1) {
      throw Error(`${key} 不可访问.`);
    }
    return Reflect.get(target, key, proxy);
  },
  set(target, key, value, proxy) {
    if (RESTRICTED.indexOf(key) > -1) {
      throw Error(`${key} 不可修改`);
    }
    return Reflect.get(target, key, value, proxy);
  },
});

// console.log(api._apiKey); // 抛出异常: _apiKey 不可访问.
// api._apiKey = "987654321"; //   抛出异常: _apiKey 不可修改

// 场景：观察者模式
const queuedObservers = new Set();
const observe = (fn) => queuedObservers.add(fn);
const observable = (obj) => new Proxy(obj, { set });

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach((observer) => observer());
  return result;
}

const person = observable({ name: "张三" });

observe(() => console.log("name changed! 1" + person.name));
observe(() => console.log("name changed! 2" + person.name));

person.name = "李四"; // 输出: name changed!
