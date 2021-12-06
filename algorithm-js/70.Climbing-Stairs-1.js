// 70. 爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 注意：给定 n 是一个正整数。

// 示例 1：
// 输入： 2
// 输出： 2
// 解释： 有两种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶
// 2.  2 阶

// 示例 2：
// 输入： 3
// 输出： 3
// 解释： 有三种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶 + 1 阶
// 2.  1 阶 + 2 阶
// 3.  2 阶 + 1 阶

// 动态规划：状态转移方程法f(x) = f(x -1) + f(x - 2)
// 边界条件: f(0)=1, f(1)=1
// 使用用滚动数组进行空间优化
/**
 * @param {number} n
 * @return {number}
 */
// const climbStairs = function (n) {
//   let f0 = 1
//   let f1 = 1
//   if (n === 1) {
//     return f1
//   }
//   let count = 0
//   for (let i = 2; i <= n; i++) {
//     count = f0 + f1
//     f0 = f1
//     f1 = count
//   }
//   return count
// }
const climbStairs = function (n) {
  let pp = 0
  let p = 1
  let count = 0
  for (let i = 1; i <= n; i++) {
    count = pp + p
    pp = p
    p = count
  }
  return count
}
console.log(climbStairs(6))
console.log(climbStairs(7))
console.log(climbStairs(8))
