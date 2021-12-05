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

// 矩阵幂解法
// 即进行矩阵乘法求的矩阵的n次幂
/**
 * @param {number} n
 * @return {number}
 */

const climbStairs = function (n) {
  const ans = new Array(2).fill().map(item => new Array(2).fill(0))
  const matrix = [[1, 1], [1, 0]]
  const f0 = 1
  const f1 = 1
  
}
console.log(climbStairs(6))
console.log(climbStairs(7))
console.log(climbStairs(8))

