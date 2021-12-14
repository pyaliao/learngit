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

// 思路和算法
// 我们可以用矩阵的第一行和第一列代替方法一中的两个标记数组，以达到O(1)的额外空间。
// 但这样会导致原数组的第一行和第一列被修改，无法记录它们是否原本包含 0。
// 因此我们需要额外使用两个标记变量分别记录第一行和第一列是否原本包含 0。
// 在实际代码中，我们首先预处理出两个标记变量，接着使用其他行与列去处理第一行与第一列，
// 然后反过来使用第一行与第一列去更新其他行与列，最后使用两个标记变量更新第一行与第一列即可。

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  let rowsTag = false
  let colsTag = false
  // 用matirx第一行记录哪一列有0，用matrix第一列记录哪一列有0
  // 然后用两个标记记录matrix第一行及第一列是佛有0
  // 这样就把空间复杂度降到了O(1)

  // 先处理第一行及第一列的标记，如果放到后面处理，可能被其他行列有0的记录影响
  for (let i = 0; i < n; i++) {
    if (!matrix[0][i]) {
      rowsTag = true
      break
    }
  }
  for (let j = 0; j < m; j++) {
    if (!matrix[j][0]) {
      colsTag = true
      break
    }
  }
  // 处理第一行及第一列以后的行列值，如果某行或者某列有0，就将结果记录在矩阵第一列或者第一行
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (!matrix[i][j]) {
        matrix[i][0] = 0
        matrix[0][j] = 0
      }
    }
  }
  // 将记录的结果进行处理，还是处理第一行及第一列之后的行列
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (!matrix[i][0] || !matrix[0][j]) {
        matrix[i][j] = 0
      }
    }
  }
  // 最后处理首行和首列
  if (rowsTag) {
    for (let i = 0; i < n; i++) {
      matrix[0][i] = 0
    }
  }
  if (colsTag) {
    for (let j = 0; j < m; j++) {
      matrix[j][0] = 0
    }
  }
  return matrix
}
// const matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
const matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
console.log(setZeroes(matrix))
