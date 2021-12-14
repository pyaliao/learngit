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
// 我们可以对方法二进一步优化，只使用一个标记变量记录第一列是否原本存在 0。
// 这样，第一列的第一个元素即可以标记第一行是否出现 0。
// 但为了防止每一列的第一个元素被提前更新，我们需要从最后一行开始，倒序地处理矩阵元素。
// 因为第一行每一列记录的是每列是否出现0，如果正序处理，会使每列是否出现0的记录被覆盖掉

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  let colsTag = false
  // 用colsTag标记第一列是否出现0
  for (let i = 0; i < m; i++) {
    if (!matrix[i][0]) {
      colsTag = true
    }
    for (let j = 1; j < n; j++) {
      // 处理每一行及第一列以后的列
      // 出现0则在matrix中用0标记
      if (!matrix[i][j]) {
        // 记录每一行是否出现0
        matrix[i][0] = 0
        // 此处仍然用第一行（第一列以后的列）记录每一列是否出现0（第一列以后的列）
        matrix[0][j] = 0
      }
    }
  }
  for (let i = m - 1; i >= 0; i--) {
    // 处理每一行除了第一列之外的每一列
    for (let j = 1; j < n; j++) {
      // 因为是用0标记，因此取反
      if (!matrix[i][0] || !matrix[0][j]) {
        matrix[i][j] = 0
      }
    }
    // 处理每一行第一列的情况
    if (colsTag) {
      matrix[i][0] = 0
    }
  }
  return matrix
}
// const matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
const matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
console.log(setZeroes(matrix))
