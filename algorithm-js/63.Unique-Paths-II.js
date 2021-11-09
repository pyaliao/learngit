// 63. 不同路径 II
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
// 网格中的障碍物和空位置分别用 1 和 0 来表示。

// 示例 1：
// 输入：obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
// 输出：2
// 解释：
// 3x3 网格的正中间有一个障碍物。
// 从左上角到右下角一共有 2 条不同的路径：
// 1. 向右 -> 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右 -> 向右

// 示例 2：
// 输入：obstacleGrid = [[0, 1], [0, 0]]
// 输出：1

// 提示：

// m == obstacleGrid.length
// n == obstacleGrid[i].length
// 1 <= m, n <= 100
// obstacleGrid[i][j] 为 0 或 1

// 动态规划
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  // 1. 此处先使用fill再使用map是因为new Array(m)得到的是一个空位数组，
  // 而map在迭代时，会忽略数组空位，因此先使用fill将数组空位填充为undefined
  // 然后再迭代
  // 2. 此外，也不能使用new Array(m).fill(new Array(n))直接将数组fill进去，
  // 因为fill会将new Array(n)复制（复制的是数组的引用）然后填充，因此最终的
  // new Array(m)中每个元素指向的是同一个数组，修改其中一个，其他所有的数组都会发生改变
  const path = new Array(m).fill().map(item => new Array(n).fill(0))
  // 填充矩阵边界（处理dp的边界条件）
  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) {
      break
    } else {
      path[i][0] = 1
    }
  }
  // 填充矩阵边界（处理dp的边界条件）
  for (let j = 0; j < n; j++) {
    if (obstacleGrid[0][j] === 1) {
      break
    } else {
      path[0][j] = 1
    }
  }
  // 遍历矩阵，如果矩阵元素(i, j)等于1，则说明(i, j)不可达，将path[i, j]置为0
  // 如果矩阵元素(i, j)等于0，这说明(i, j)可达，此时path[i][j] = path[i - 1][j] + path[i][j - 1]
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        path[i][j] = 0
      } else {
        path[i][j] = path[i - 1][j] + path[i][j - 1]
      }
    }
  }
  return path[m - 1][n - 1]
}

// const obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
const obstacleGrid = [[0, 0], [1, 0]]
console.log(uniquePathsWithObstacles(obstacleGrid))
