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
  const rows = matrix.length
  const cols = matrix[0].length
  return getArr(0, rows - 1, 0, cols - 1, matrix)
}
const getArr = function (start, end, startCol, endCol, matrix) {
  if (start === end && startCol !== endCol) {
    const arr = []
    for (let i = startCol; i <= endCol; i++) {
      arr.push(matrix[start][i])
    }
    // console.log(start, end, arr)
    return arr
  } else if (startCol === endCol && start !== end) {
    const arr = []
    for (let i = start; i <= end; i++) {
      arr.push(matrix[i][startCol])
    }
    return arr
  } else if (start === end && startCol === endCol) {
    return [matrix[start][startCol]]
  }
  if (start < end) {
    const leftArr = []
    const rightArr = []
    for (let i = start + 1; i < end - start; i++) {
      rightArr.push(matrix[i][endCol])
      leftArr.unshift(matrix[i][startCol])
    }
    console.log(matrix[start], matrix[end])
    const currentArr = matrix[start].concat(rightArr, matrix[end].reverse(), leftArr)
    const otherArr = getArr(start + 1, end - 1, startCol + 1, endCol - 1, matrix)
    return otherArr ? currentArr.concat(otherArr) : currentArr
  }
}
console.log(spiralOrder([[1]]))
