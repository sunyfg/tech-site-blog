var makeCounter = function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();

console.log(Counter1.value()); // 0
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); // 2
Counter1.decrement();
console.log(Counter1.value()); // 1
console.log(Counter2.value()); // 0
