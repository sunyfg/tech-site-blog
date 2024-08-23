# 面试题 2

## 题目

实现从面值为 1,2,5,10 的硬币中找零 36 块钱，最少要几枚硬币。

## 解答

要实现这个功能，我们需要一个策略来优化硬币的使用数量。在这个问题中，最优解通常通过“贪心算法”来求解，即每次尽可能使用面值最大的硬币，直到找零的金额被用完或者无法使用更大面值的硬币为止。

给定的硬币面值为 `[1, 2, 5, 10]`，我们需要计算最少需要几枚硬币来找零 36 块钱。

下面是一个用 JavaScript 实现的示例代码：

```javascript
function minCoins(amount, coins) {
  // 将硬币面值从大到小排序，以满足贪心算法的需要
  coins.sort((a, b) => b - a);

  let count = 0; // 记录硬币的总数

  for (let coin of coins) {
    // 如果剩余金额大于等于当前硬币面值，则使用该硬币
    while (amount >= coin) {
      amount -= coin; // 使用一枚硬币后，剩余金额减少
      count++; // 硬币数量加一
    }

    // 如果剩余金额已经是0，则提前结束循环
    if (amount === 0) {
      break;
    }
  }

  // 如果循环结束后金额仍未被找零完，则说明给定的硬币无法完成找零
  if (amount !== 0) {
    throw new Error(
      "Cannot make change for " + amount + " using coins " + coins.join(", ")
    );
  }

  return count;
}

// 测试代码
const coins = [1, 2, 5, 10];
const amount = 36;
const result = minCoins(amount, coins);
console.log("最少需要", result, "枚硬币来找零", amount, "块钱。");
```

运行这段代码，会输出：

```
最少需要 4 枚硬币来找零 36 块钱。
```

这是因为在贪心算法下，我们会优先使用面值 10 的硬币，直到不能再用为止（使用了 3 枚），然后使用面值 5 的硬币 1 枚，此时找零的金额已经为 0，因此最少需要 4 枚硬币。
