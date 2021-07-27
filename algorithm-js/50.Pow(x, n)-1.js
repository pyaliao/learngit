// 50. Pow(x, n)
// 实现pow(x, n)，即计算x的n次幂函数（即，x^n）。

// 示例 1：
// 输入：x = 2.00000, n = 10
// 输出：1024.00000

// 示例 2：
// 输入：x = 2.10000, n = 3
// 输出：9.26100

// 示例 3：
// 输入：x = 2.00000, n = -2
// 输出：0.25000
// 解释：2 - 2 = 1 / 22 = 1 / 4 = 0.25

// 提示：
// -100.0 < x < 100.0
// -2^31 <= n <= 2^31 - 1
// -10^4 <= x^n <= 10^4

// 直接暴力求解
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = function (x, n) {
  let pow = 1
  for (let i = 0; i < Math.abs(n); i++) {
    pow *= x
  }
  return n > 0 ? pow : 1 / pow
}
console.log(myPow(2, 64))
