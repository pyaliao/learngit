// 48. 旋转图像
// 给定一个n×n的二维矩阵matrix表示一个图像。请你将图像顺时针旋转90度。
// 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。
// 请不要使用另一个矩阵来旋转图像。

// 示例 1：
// 输入：matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// 输出：[[7, 4, 1], [8, 5, 2], [9, 6, 3]]

// 示例 2：
// 输入：matrix = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]
// 输出：[[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]

// 示例 3：
// 输入：matrix = [[1]]
// 输出：[[1]]

// 示例 4：
// 输入：matrix = [[1, 2], [3, 4]]
// 输出：[[3, 1], [4, 2]]

// 提示：
// matrix.length == n
// matrix[i].length == n
// 1 <= n <= 20
// -1000 <= matrix[i][j] <= 1000

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

// 方法一、将转置的元素存储在新的矩阵中，然后将其复制后原矩阵
// 复杂度分析
// 时间复杂度：O(N^2)，其中N是matrix的边长。
// 空间复杂度：O(N^2)。我们需要使用一个和matrix大小相同的辅助数组。

const rotate = function (matrix) {
  const n = matrix.length
  const newMatrix = new Array(n).fill().map(() => {
    return new Array(n).fill(0)
  })
  // 第i行第j列的元素，翻转后变为倒数第i列第j行的元素
  // matrix[row][col] ---> matrix[col][rows - row - 1]
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      newMatrix[col][n - row - 1] = matrix[row][col]
    }
  }
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      matrix[row][col] = newMatrix[row][col]
    }
  }
}
