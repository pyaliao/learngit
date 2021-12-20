// 74. 搜索二维矩阵
// 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
// 每行中的整数从左到右按升序排列。
// 每行的第一个整数大于前一行的最后一个整数。

// 示例 1：
// 输入：matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 3
// 输出：true

// 示例 2：
// 输入：matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 13
// 输出：false

// 提示：
// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 100
// - 104 <= matrix[i][j], target <= 104

// 方法二、两次二分法：对于一位数组元素个数不一致的情况也适用
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) {
  const rows = matrix.length
  const cols = matrix[0].length
  let left = 0
  let right = rows - 1
  // 先对行进行二分
  while (left <= right) {
    // 做减法，防止整数溢出
    const mid = Math.floor((right - left) / 2) + left
    if (matrix[mid][0] > target) {
      right = mid - 1
    } else if (matrix[mid][cols - 1] < target) {
      left = mid + 1
    } else {
      // 再对列进行二分
      let start = 0
      let end = cols - 1
      while (start <= end) {
        // 做减法，防止整数溢出
        const subMid = Math.floor((end - start) / 2) + start
        if (matrix[mid][subMid] > target) {
          end = subMid - 1
        } else if (matrix[mid][subMid] < target) {
          start = subMid + 1
        } else {
          return true
        }
      }
      return false
    }
  }
  return false
}
// const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
// const target = 13
// const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
// const target = 3
// const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
// const target = 13
const matrix = [[1, 3, 5]]
const target = 1
console.log(searchMatrix(matrix, target))
