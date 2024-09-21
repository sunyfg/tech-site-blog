const map = new Map();

map.set("foo", true);
map.set("bar", false);

console.log(map);
console.log(map.get("foo")); // true
console.log(map.get("bar")); // false
console.log(map.size); // 2

map.set("edition", 6);
map.set(262, "standard");
map.set(undefined, "nah");
map.set(1, "a").set(2, "b").set(3, "c"); // 链式调用

console.log(map);
console.log(map.get("edition")); // 6
console.log(map.get(262)); // standard
console.log(map.get(undefined)); // nah

map.has("edition"); // true
map.has("years"); // false
map.has(262); // true
map.has(271); // false

map.delete("edition");
map.delete(262);
console.log(map.get("edition")); // undefined
console.log(map.get(262)); // undefined

// console.log(map.size); // 6
// map.clear();
// console.log(map.size); // 0

console.log("------for of------");
for (let key of map.keys()) {
  console.log(key);
}
console.log("------values()------");
for (let value of map.values()) {
  console.log(value);
}

console.log("------entries()------");
for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
console.log("------forEach()------");
for (let [key, value] of map) {
  console.log(key, value);
}

map.forEach(function (value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
