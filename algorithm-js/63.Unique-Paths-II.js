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

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  // const path = new Array(m).fill(new Array(n).fill(0))
  // fill将要填充的值拷贝了好几分，因此，同一个数组引用被拷贝好几分，导致修改其中一个数组就会把其他使用同一引用的数组改变
  // 此处必须有fill，new Array(m)生成空位数组，而new Array(m).fill()给数组填充了m个undefined值
  // 而map会跳过空位，因此必须用fill填充一下
  const path = new Array(m).fill().map(item => new Array(n).fill(0))
  console.log(path)

  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) {
      break
    } else {
      path[i][0] = 1
    }
  }

  for (let i = 0; i < n; i++) {
    if (obstacleGrid[0][i] === 1) {
      break
    } else {
      path[0][i] = 1
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        path[i][j] = 0
      } else {
        path[i][j] = path[i][j - 1] + path[i - 1][j]
      }
    }
  }
  return path[m - 1][n - 1]
}
// var uniquePathsWithObstacles = function (obstacleGrid) {
//   const m = obstacleGrid.length
//   const n = obstacleGrid[0].length
//   const dp = Array(m).fill().map(item => Array(n).fill(0))
//   console.log(dp)
//   for (let i = 0; i < m && obstacleGrid[i][0] === 0; ++i) {
//     dp[i][0] = 1
//   }

//   for (let i = 0; i < n && obstacleGrid[0][i] === 0; ++i) {
//     dp[0][i] = 1
//   }
//   console.log(dp)
//   for (let i = 1; i < m; ++i) {
//     for (let j = 1; j < n; ++j) {
//       dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1]
//     }
//   }

//   return dp[m - 1][n - 1]
// }
// const obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
// const obstacleGrid = [[0, 1], [0, 0]]
const obstacleGrid = [[0, 0], [1, 0]]
console.log(uniquePathsWithObstacles(obstacleGrid))