// n皇后问题研究的是如何将n个皇后放置在n×n的棋盘上，并且使皇后彼此之间不能相互攻击。
// 给你一个整数n ，返回n皇后问题不同的解决方案的数量。

// 示例 1：
// 输入：n = 4
// 输出：2
// 解释：如上图所示，4 皇后问题存在两个不同的解法。

// 示例 2：
// 输入：n = 1
// 输出：1

// 提示：
// 1 <= n <= 9
// 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。

/**
 * @param {number} n
 * @return {number}
 */

const totalNQueens = function (n) {
  const queens = new Array(n).fill(-1)
  const columns = new Map()
  const diagonalLTRB = new Map()
  const diagonalRTLB = new Map()
  return backTrack(queens, n, 0, columns, diagonalLTRB, diagonalRTLB)
}
const backTrack = function (queens, n, row, columns, diagonalLTRB, diagonalRTLB) {
  if (n === row) {
    return 1
  } else {
    let count = 0
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
      count += backTrack(queens, n, row + 1, columns, diagonalLTRB, diagonalRTLB)
      // 回溯
      queens[row] = -1
      columns.delete(i)
      diagonalLTRB.delete(diagonalLTRBKey)
      diagonalRTLB.delete(diagonalRTLBKey)
    }
    return count
  }
}

console.log(totalNQueens(4))
