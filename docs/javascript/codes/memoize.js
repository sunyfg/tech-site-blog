// 函数缓存
function memoize(fn, content) {
  const cache = new Map();
  content = content || this;
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("缓存值");
      return cache.get(key);
    }
    console.log("no cache");
    const result = fn.apply(content, args);
    cache.set(key, result);
    return result;
  };
}

function add(a, b) {
  console.log("计算值");
  return a + b;
}

const addMemoize = memoize(add);
console.log(addMemoize(1, 2)); // add 3
console.log(addMemoize(1, 2)); // cache 3
