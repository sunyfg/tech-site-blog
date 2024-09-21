// const wm1 = new WeakMap();

// const key = { foo: 1 };

// wm1.set(key, "bar");

// console.log(wm1.get(key)); // bar

// const k1 = [1, 2, 3];
// const k2 = [4, 5, 6];
// const wm2 = new WeakMap([
//   [k1, "foo"],
//   [k2, "bar"],
// ]);

// console.log(wm2.get(k2)); // bar

// WeakMap 中的键必须是对象，不能是原始值。
const map = new WeakMap();
// map.set(1, 2); // TypeError: Invalid value used as weak map key
map.set({}, 2); // OK
map.set(Symbol(), 3); // OK
// map.set(null, 4); // TypeError: Invalid value used as weak map key
// map.set(undefined, 5); // TypeError: Invalid value used as weak map key
// map.set(true, 6); // TypeError: Invalid value used as weak map key

// WeakMap 中的键是弱引用，不会阻止垃圾回收。
// WeakMap 键名所指向的对象，如果没有其他引用指向该对象，则会被垃圾回收机制回收。里面的键名和键值会自动消失，不用手动删除。

const wm = new WeakMap();
let key = {};
let obj = { foo: 1 };

wm.set(key, obj); // { foo: 1 }
obj = null; // { foo: 1 }
console.log(wm.get(key)); // { foo: 1 }
