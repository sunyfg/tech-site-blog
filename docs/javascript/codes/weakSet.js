// let ws = new WeakSet();

// let weakSet = new WeakSet([2, 3]); // 报错：WeakSet 只能接受对象作为参数
// console.log(weakSet);

let obj1 = { name: 1 };
let obj2 = { name: 1 };

let ws = new WeakSet([obj1, obj2]);
console.log(ws);

// WeakSet 里面的引用都是弱引用，如果没有其他变量引用这个对象，那么这个对象会被垃圾回收机制回收，WeakSet 里面的引用也会自动消失。
// WeakSet 不能遍历，也不能清空，也不能添加或删除某个元素。
// WeakSet 适合用来存储临时对象，比如 DOM 节点，因为 DOM 节点可能会被移除，如果 WeakSet 里面还保留了对这个节点的引用，那么这个节点就无法被垃圾回收机制回收，会导致内存泄漏。
