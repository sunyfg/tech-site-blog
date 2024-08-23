// let person = {
//   name: "obj",
// };
// const arr = [person];
// person = null;
// console.log(arr);

// function fn(params) {
//   return `Hello, ${params}`;
// }
// console.log(fn());

// setTimeout(() => {
//   console.log(1);
// }, 0);

// new Promise((resolve) => {
//   console.log(2);
//   for (let i = 0; i < 10000; i++) {
//     i < 9999 && resolve();
//   }
//   console.log(3);
// }).then(() => {
//   console.log(4);
// });
// console.log(5);

// 2 3 5 4 1

// const arr1 = [
//   { id: 1, name: "allen", time: "3" },
//   { id: 2, name: "alice", time: "1" },
//   { id: 3, name: "Bun", time: "1" },
// ];

// const arr2 = [
//   { id: 1, name: "bob", time: "4" },
//   { id: 2, name: "Nick", time: "2" },
//   { id: 4, name: "Mark", time: "2" },
//   { id: 5, name: "Frank", time: "6" },
// ];

// // 使用Map来存储每个id的对象，以便更新
// const mergedMap = new Map();

// // 合并arr1
// arr1.forEach((item) => {
//   if (!mergedMap.has(item.id)) {
//     mergedMap.set(item.id, { ...item });
//   }
// });

// // 合并arr2，并更新time为较大值
// arr2.forEach((item) => {
//   if (mergedMap.has(item.id)) {
//     // 比较并更新time
//     const existingItem = mergedMap.get(item.id);
//     if (parseInt(item.time, 10) > parseInt(existingItem.time, 10)) {
//       existingItem.time = item.time;
//       // existingItem.name = item.name; // 如果name也需要更新
//     }
//   } else {
//     mergedMap.set(item.id, { ...item });
//   }
// });

// // 将Map转换回数组
// const res = Array.from(mergedMap.values());

// console.log(res);

// let fruits = ["Banana", "apple", "Orange", "mango"];
// fruits.sort(function (a, b) {
//   let lowerA = a.toLowerCase();
//   let lowerB = b.toLowerCase();
//   return lowerA.localeCompare(lowerB); // 或者简单地使用 lowerA < lowerB ? -1 : (lowerA > lowerB ? 1 : 0)
// });
// console.log(fruits); // ["apple", "Banana", "Orange", "mango"]

// const items = [
//   { id: 1, parentId: null, name: "CEO" },
//   { id: 2, parentId: 1, name: "CTO" },
//   { id: 3, parentId: 1, name: "CFO" },
//   { id: 4, parentId: 2, name: "Frontend Team Lead" },
//   { id: 5, parentId: 2, name: "Backend Team Lead" },
//   { id: 6, parentId: 4, name: "Frontend Developer" },
//   { id: 7, parentId: 4, name: "Frontend Developer 2" },
//   { id: 8, parentId: 5, name: "Backend Developer" },
// ];

// function buildTree(items) {
//   // 创建id到元素的映射
//   const idMap = {};
//   items.forEach((item) => {
//     idMap[item.id] = { ...item, children: [] };
//   });

//   // 构建树形结构
//   const tree = [];
//   items.forEach((item) => {
//     // 查找父节点
//     const parentId = item.parentId;
//     if (parentId === null) {
//       // 没有parentId的项是根节点
//       tree.push(idMap[item.id]);
//     } else {
//       // 否则，将其添加到父节点的children数组中
//       if (!idMap[parentId].children) {
//         idMap[parentId].children = [];
//       }
//       idMap[parentId].children.push(idMap[item.id]);
//     }
//   });

//   return tree;
// }

// // 使用示例
// const tree = buildTree(items);
// console.log(tree);

// var add = function (x, r) {
//   if (arguments.length == 1) {
//     return function (y) {
//       return x + y;
//     };
//   } else {
//     return x + r;
//   }
// };
// const add = (x, y) => {
//   if (y === undefined) {
//     return (y) => x + y;
//   }
//   return x + y;
// };

// const add = function () {
//   const args = Array.prototype.slice.call(arguments);
//   return function () {
//     if (arguments.length === 0) {
//       return args.reduce((a, b) => a + b, 0);
//     }
//     args.push(...arguments);
//     return add.apply(null, args);
//   };
// };
// console.log(add(2)(5)()); // 7
// console.log(add(2, 5)());

// var out = 25,
//   inner = {
//     out: 20,
//     func: function () {
//       var out = 30;
//       return this.out;
//     },
//   };
// console.log(inner.func());
// console.log((inner.func = inner.func)());

function b(x, y, a) {
  // a = 5;
  arguments[2] = 10;
  console.log(a);
}
b(1, 2, 3);
