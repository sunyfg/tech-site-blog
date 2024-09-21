function reactive(obj) {
  if (typeof obj !== "object" && obj != null) {
    return obj;
  }
  // Proxy
  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      console.log(`获取${key}:${res}`);
      if (typeof res === "object" && res != null) {
        return reactive(res); // 递归
      }
      return res;
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      console.log(`设置${key}:${value}`);
      return res;
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key);
      console.log(`删除${key}:${res}`);
      return res;
    },
  });
  return observed;
}

const state = reactive({
  foo: "foo",
  bar: { a: 1 },
});
// state.foo = "bar";
// console.log(state.foo);
// delete state.foo;
// state.baz = "baz";
// console.log(state.baz);

state.bar.a = 10;
console.log(state.bar.a);
