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

// 方法二、原地旋转
// 复杂度分析
// 时间复杂度：O(n^2) ，其中n是matrix的边长。
// 我们需要枚举的子矩阵大小为 O(⌊n / 2⌋ * ⌊(n + 1) / 2⌋)。
// 空间复杂度：O(1)。为原地旋转。

const rotate = function (matrix) {
  const n = matrix.length
  // n为偶数时，row的上限为n / 2，n为奇数时，row的上限是 (n - 1) / 2
  // n为偶数时，col的上限为n / 2，n为奇数时，row的上限是 (n + 1) / 2
  // 故总结下来：row的上限⌊n/2⌋，col的上限⌊(n + 1)/2⌋
  // 根据matrix[row][col] ---> matrix[col][n - row - 1]的规则可推导出
  // row ---> col: col = n - row - 1
  // col ---> row: row = col
  // 根据此规律，可推导出旋转之后，各元素走向的位置：
  // matrix[row][col] ---> matrix[col][n - row - 1]
  // matrix[col][n - row - 1] ---> matrix[n - row - 1][n - col - 1]
  // matrix[n - row - 1][n - col - 1] ---> matrix[n - col - 1][row]
  // matrix[n - col - 1][row] ---> matrix[row][col]
  // 走了一个循环
  for (let row = 0; row < parseInt(n / 2); row++) {
    for (let col = 0; col < parseInt((n + 1) / 2); col++) {
      const temp = matrix[row][col]
      matrix[row][col] = matrix[n - col - 1][row]
      matrix[n - col - 1][row] = matrix[n - row - 1][n - col - 1]
      matrix[n - row - 1][n - col - 1] = matrix[col][n - row - 1]
      matrix[col][n - row - 1] = temp
    }
  }
}
