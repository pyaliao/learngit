// 54. 螺旋矩阵
// 给你一个m行n列的矩阵matrix，请按照顺时针螺旋顺序，返回矩阵中的所有元素。

// 示例 1：
// 输入：matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// 输出：[1, 2, 3, 6, 9, 8, 7, 4, 5]

// 示例 2：
// 输入：matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
// 输出：[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]

// 提示：
// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 10
// -100 <= matrix[i][j] <= 100

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

const spiralOrder = function (matrix) {
  let top = 0
  let bottom = matrix.length - 1
  let left = 0
  let right = matrix[0].length - 1
  const arr = []
  while (true) {
    for (let i = left; i <= right; i++) {
      arr.push(matrix[top][i])
    }
    top++
    if (top > bottom) {
      break
    }
    for (let i = top; i <= bottom; i++) {
      arr.push(matrix[i][right])
    }
    right--
    if (right < left) {
      break
    }
    for (let i = right; i >= left; i--) {
      arr.push(matrix[bottom][i])
    }
    bottom--
    if (bottom < top) {
      break
    }
    for (let i = bottom; i >= top; i--) {
      arr.push(matrix[i][left])
    }
    left++
    if (left > right) {
      break
    }
  }
  return arr
}
console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
