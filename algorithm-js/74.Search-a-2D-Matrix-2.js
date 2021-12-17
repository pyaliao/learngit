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

// 方法一、暴力解法
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) {
  const rows = matrix.length
  const cols = matrix[0].length
  let left = 0
  let right = rows * cols - 1
  // 把整个矩阵看出一个一维数组，即每一行首尾相接连城一个以为数组
  while (left <= right) {
    let mid = Math.floor((right - left) / 2) + left
    // 因为mid代表的是下标，因此计算出的row刚好是对应行的下标，col刚好是对应列的下标，不需要加1
    const midVal = matrix[Math.floor(mid / cols)][mid % cols]
    if (midVal > target) {
      right = mid - 1
    } else if (midVal < target) {
      left = mid + 1
    } else {
      return true
    }
  }
  return false
}

const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
const target = 3
// const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
// const target = 13
console.log(searchMatrix(matrix, target))
