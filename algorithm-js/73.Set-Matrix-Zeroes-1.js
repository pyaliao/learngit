// 73. 矩阵置零
// 给定一个mxn的矩阵，如果一个元素为0，则将其所在行和列的所有元素都设为0。
// 请使用原地算法。

// 示例 1：
// 输入：matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
// 输出：[[1, 0, 1], [0, 0, 0], [1, 0, 1]]

// 示例 2：
// 输入：matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
// 输出：[[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]

// 提示：
// m == matrix.length
// n == matrix[0].length
// 1 <= m, n <= 200
// - 231 <= matrix[i][j] <= 231 - 1

// 进阶：
// 一个直观的解决方案是使用 O(mn) 的额外空间，但这并不是一个好的解决方案。
// 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
// 你能想出一个仅使用常量空间的解决方案吗？

// 使用两个数组分别记录某行及某列是否出现0，空间复杂度O(m + n)
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  // 用rows记录哪一行有0，用cols记录哪一列有0
  const rows = new Array(m).fill(0)
  const cols = new Array(n).fill(0)
  // 哪一行有0或者哪一列有0，就将rows及cols对应下标的值置为1
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        rows[i] = 1
        cols[j] = 1
      }
    }
  }
  // // 将有0的行置为0
  // for (let i = 0; i < m; i++) {
  //   if (rows[i] === 1) {
  //     for (let j = 0; j < n; j++) {
  //       matrix[i][j] = 0
  //     }
  //   }
  // }
  // // 将有0的列置为0
  // for (let i = 0; i < n; i++) {
  //   if (cols[i] === 1) {
  //     for (let j = 0; j < m; j++) {
  //       matrix[j][i] = 0
  //     }
  //   }
  // }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rows[i] || cols[j]) {
        matrix[i][j] = 0
      }
    }
  }
  return matrix
}
// const matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
const matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
console.log(setZeroes(matrix))
