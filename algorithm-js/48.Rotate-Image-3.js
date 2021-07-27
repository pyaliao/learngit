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

// 方法二、用两次翻转代替旋转
// 先进行一次水平翻转，再进行一次对角线翻转
// 复杂度分析
// 时间复杂度：O(N^2)，其中N是matrix的边长。
// 对于每一次翻转操作，我们都需要枚举矩阵中一半的元素。
// 空间复杂度：O(1)。为原地翻转得到的原地旋转。

const rotate = function (matrix) {
  const n = matrix.length
  // 先进行水平翻转，并且只需要交换一半的行即可完成翻转
  // 水平翻转列不变，正行变为倒数
  // n为偶数时，row <= n / 2，n为奇数时，row <= (n - 1) / 2，因为中间那一行不用翻转
  // 故row <= ⌊n / 2⌋ ---> 下标从0开始，故row < ⌊n / 2⌋
  // matrix[row][col] ---> matrix[n - row - 1][col]
  for (let row = 0; row < parseInt(n / 2); row++) {
    for (let col = 0; col < n; col++) {
      const temp = matrix[row][col]
      matrix[row][col] = matrix[n - row - 1][col]
      matrix[n - row - 1][col] = temp
    }
  }
  // 再进行正对角线（左上到右下的对角线）翻转，对角线翻转时，也只需要翻转一半
  // 对角线翻转时，行列互换了，并且对角线元素不用翻转
  // 不论n奇数偶数，对角线翻转时，我们选择翻转对角线下面的部分
  // 此时，每一行的列下标是小于行的下标的，故col < row，row <= n
  // 下标从0开始，故row < n，col < row
  // matrix[row][col] ---> matrix[col][row]
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < row; col++) {
      const temp = matrix[row][col]
      matrix[row][col] = matrix[col][row]
      matrix[col][row] = temp
    }
  }
}
