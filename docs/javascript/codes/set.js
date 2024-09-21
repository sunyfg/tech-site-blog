// const s = new Set();

// s.add(1).add(2).add(2);

// console.log(s);
// console.log(s.size); // 2

// s.delete(2);
// console.log(s.has(2)); // false

// s.clear();
// console.log(s); // Set(0) {}

let set = new Set(["red", "green", "blue"]);

for (let item of set.keys()) {
  console.log(item);
}

for (let item of set.values()) {
  console.log(item);
}

for (let item of set.entries()) {
  console.log(item);
}
set.forEach((value, key) => console.log(key + " : " + value));

// 数组去重
let arr = [1, 2, 2, 3, 4, 4, 5];
let unique = [...new Set(arr)];
console.log(unique);

// 字符串去重
let str = "ababbc";
let uniqueStr = [...new Set(str)].join("");
console.log(uniqueStr);

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
console.log(union);

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)));
console.log(intersect);

// 差集(a 相对于 b 的差集)
let difference = new Set([...a].filter((x) => !b.has(x)));
console.log(difference);
