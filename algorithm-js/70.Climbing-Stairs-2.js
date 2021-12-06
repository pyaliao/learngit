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
// 首先根据dp我们知道f(n) = f(n - 1) + f(n - 2)，因此我们可以构建这样一个递推关系：
// // [[1 1], [1 0]] * [[f(n)], [f(n - 1)]] = [[f(n) + f(n - 1)], [f(n)]] = [[f(n + 1)], [f(n)]]
// 因此：
// [[f(n + 1)], [f(n)]] = ([[1 1], [1 0]])^n * [[f(1)], [f(0)]]
// 令：
// M = [[1 1], [1 0]]
// 因此我们只要能快速计算矩阵M的n次幂，就可以得到f(n)的值。
// 如果直接求取M^n，时间复杂度是O(n)的，
// 我们可以定义矩阵乘法，然后用快速幂算法来加速这里M^n的求取。

/**
 * @param {number} n
 * @return {number}
 */

const climbStairs = function (n) {
  const matrix = [[1, 1], [1, 0]]
  const ans = matrixPow(matrix, n)
  console.log(ans)
  return ans[1][0] + ans[1][1]
}

// 矩阵快速幂
const matrixPow = function (matrix, n) {
  // 将ans置为矩阵[[1, 0], [0, 1]]
  // 将保证ans与任何一个两行两列的矩阵的乘积都与该矩阵一样
  // 就像整数乘法了ans=1的效果一样
  let ans = [[1, 0], [0, 1]]
  while (n) {
    if (n & 1) {
      ans = matrixMultiplication(ans, matrix)
    }
    matrix = matrixMultiplication(matrix, matrix)
    n >>= 1
  }
  return ans
}

// 定义一个计算 矩阵的乘法的函数
// 1. 矩阵A的列数与矩阵B的行数相等时，矩阵A可以与矩阵B相乘
// 2. 矩阵相乘生成的结果矩阵C，其行数等于A矩阵的行数，其列数等于B矩阵的列数
// 3. 矩阵c的第m行第n列的元素等于矩阵A的第m行元素与矩阵B第n列元素中对应元素乘积之和
const matrixMultiplication = function (leftMatrix, rightMatrix) {
  const rows = leftMatrix.length
  const cols = rightMatrix[0].length
  // new数组时，如果不fill填充，则数组元素是空位
  // 而map遍历数组时，会跳过空位，因此此处生成数组必须在第一次时填充数组
  const ans = new Array(rows).fill().map(item => new Array(cols).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < cols; k++) {
        ans[i][j] += leftMatrix[i][k] * rightMatrix[k][j]
      }
    }
  }
  return ans
}

console.log(climbStairs(6))
