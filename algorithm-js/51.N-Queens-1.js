// 51. N皇后
// n皇后问题研究的是如何将n个皇后放置在n×n的棋盘上，并且使皇后彼此之间不能相互攻击。
// 给你一个整数n ，返回所有不同的n皇后问题的解决方案。
// 每一种解法包含一个不同的n皇后问题的棋子放置方案，该方案中'Q'和'.'分别代表了皇后和空位。

// 示例 1：
// 输入：n = 4
// 输出：[[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]]
// 解释：如上图所示，4 皇后问题存在两个不同的解法。

// 示例 2：
// 输入：n = 1
// 输出：[["Q"]]

// 提示：
// 1 <= n <= 9
// 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
  const queens = new Array(n).fill(-1)
  const columns = new Map()
  const diagonalLTRB = new Map()
  const diagonalRTLB = new Map()
  const solutions = []
  backTrack(solutions, queens, n, 0, columns, diagonalLTRB, diagonalRTLB)
  return solutions
}
const backTrack = function (solutions, queens, n, row, columns, diagonalLTRB, diagonalRTLB) {
  if (n === row) {
    solutions.push(generateSolutions(queens, n))
  } else {
    for (let i = 0; i < n; i++) {
      if (columns.get(i)) {
        continue
      }
      const diagonalLTRBKey = row - i
      if (diagonalLTRB.get(diagonalLTRBKey)) {
        continue
      }
      const diagonalRTLBKey = row + i
      if (diagonalRTLB.get(diagonalRTLBKey)) {
        continue
      }
      queens[row] = i
      columns.set(i, 1)
      diagonalLTRB.set(diagonalLTRBKey, 1)
      diagonalRTLB.set(diagonalRTLBKey, 1)
      backTrack(solutions, queens, n, row + 1, columns, diagonalLTRB, diagonalRTLB)
      // 回溯
      queens[row] = -1
      columns.delete(i)
      diagonalLTRB.delete(diagonalLTRBKey)
      diagonalRTLB.delete(diagonalRTLBKey)
    }
  }
}
const generateSolutions = function (queens, n) {
  const solution = []
  for (let i = 0; i < n; i++) {
    const arr = new Array(n).fill('.')
    arr[queens[i]] = 'Q'
    solution.push(arr.join(''))
  }
  return solution
}
console.log(solveNQueens(4))
