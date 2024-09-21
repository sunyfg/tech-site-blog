// 继承

// 原型链继承
// function Parent() {
//   this.name = "parent1";
//   this.play = [1, 2, 3];
// }
// Parent.prototype.getName = function () {
//   return this.name;
// };
// function Child() {
//   this.type = "child";
// }
// Child.prototype = new Parent();
// let child1 = new Child();
// let child2 = new Child();
// child1.play.push(4);
// console.log(child1.play); // [1, 2, 3, 4]
// console.log(child2.play); // [1, 2, 3, 4]
// 原因：原型链继承，子类实例共享父类引用属性，修改一个会影响另一个

// 构造函数继承
// function Parent() {
//   this.name = "parent1";
//   this.play = [1, 2, 3, [1, 2, 3]];
// }
// Parent.prototype.getName = function () {
//   return this.name;
// };
// function Child() {
//   Parent.call(this);
//   this.type = "child";
// }
// let child1 = new Child();
// child1.play.push(4);
// child1.play[3].push(4);
// console.log(child1); // [1, 2, 3, 4]
// console.log(child1.play); // [1, 2, 3, 4]
// // console.log(child1.getName()); // TypeError: child1.getName is not a function
// let child2 = new Child();
// console.log(child2.play); // [1, 2, 3]
// 原因：构造函数继承，父类原型上的方法并没有被继承

// 组合继承
// function Parent3() {
//   this.name = "parent3";
//   this.play = [1, 2, 3];
// }
// Parent3.prototype.getName = function () {
//   return this.name;
// };
// function Child3() {
//   Parent3.call(this); // 调用父类构造函数
//   this.type = "child3";
// }

// Child3.prototype = new Parent3(); // new Parent3()会执行Parent3函数
// Child3.prototype.constructor = Child3; // 修复constructor指向

// let child3 = new Child3();
// child3.play.push(4);
// console.log(child3.getName()); // parent3
// console.log(child3.play); // [1, 2, 3, 4]
// let child4 = new Child3();
// console.log(child4.getName()); // parent3
// console.log(child4.play); // [1, 2, 3]
// 原因：组合继承，结合了原型链继承和构造函数继承的优点，但是调用了两次父类构造函数，生成了两份实例

// 原型式继承
// let parent = {
//   name: "parent",
//   friends: ["p1", "p2", "p3"],
//   getName: function () {
//     return this.name;
//   },
// };
// let child4 = Object.create(parent);
// let child5 = Object.create(parent);
// child4.name = "child4";
// child4.friends.push("c1");
// console.log(child4.name); // child4
// console.log(child5.name); // parent4
// console.log(child4.friends); // [ 'p1', 'p2', 'p3', 'c1' ]
// console.log(child5.friends); // [ 'p1', 'p2', 'p3', 'c1' ]
// 原因：原型式继承，和原型链继承一样，子类实例共享父类引用属性，修改一个会影响另一个

// 寄生式继承
// let parent5 = {
//   name: "parent5",
//   friends: ["p1", "p2", "p3"],
//   getName: function () {
//     return this.name;
//   },
// };
// function cloneObj(obj) {
//   let clone = Object.create(obj);
//   clone.sayHi = function () {
//     console.log("hi");
//   };
//   return clone;
// }
// let child5 = cloneObj(parent5);
// child5.sayHi(); // hi
// child5.friends.push("c1");
// console.log(child5.name); // parent5
// console.log(child5.friends); // [ 'p1', 'p2', 'p3', 'c1' ]
// let child6 = cloneObj(parent5);
// console.log(child6.name); // parent5
// console.log(child6.friends); // [ 'p1', 'p2', 'p3', 'c1' ]
// 原因：寄生式继承，和原型式继承一样，子类实例共享父类引用属性，修改一个会影响另一个

// 寄生组合继承
function Parent6() {
  this.name = "parent6";
  this.play = [1, 2, 3];
}
Parent6.prototype.getName = function () {
  return this.name;
};
function Child6() {
  Parent6.call(this);
  this.type = "child6";
}
Child6.prototype = Object.create(Parent6.prototype);
Child6.prototype.constructor = Child6;

Child6.prototype.getPlay = function () {
  return this.play;
};

let child6 = new Child6();
console.log(child6); // parent6
console.log(child6.getName()); // parent6
console.log(child6.getPlay()); // [1, 2, 3]
// 原因：寄生组合继承，结合了原型链继承和构造函数继承的优点，只调用了一次父类构造函数，避免了组合继承的缺点
