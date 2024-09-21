// 浅拷贝
function shallowClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let cloneObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
}

// 测试
const obj = {
  name: "zhangsan",
  age: 18,
  hobbies: ["reading", "swimming"],
  info: {
    gender: "male",
    height: 180,
  },
};
const cloneObj = shallowClone(obj);
console.log(cloneObj);
console.log(cloneObj === obj); // false
console.log(cloneObj.info === obj.info); // true
console.log(cloneObj.hobbies === obj.hobbies); // true
console.log(cloneObj.info.height === obj.info.height); // true

// 数组测试
const arr = [1, 2, 3, 4, 5];
const cloneArr = shallowClone(arr);
console.log(cloneArr);
console.log(cloneArr === arr); // false
console.log(cloneArr[0] === arr[0]); // true
