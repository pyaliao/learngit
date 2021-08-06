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
  return backTrack(n, 0, 0, 0, 0)
}
const backTrack = function (n, row, columns, diagonalLTRB, diagonalRTLB) {
  if (n === row) {
    return 1
  } else {
    let count = 0
    let nextRowAvailablePosition = ((1 << n) - 1) & (~(columns | diagonalLTRB | diagonalRTLB))
    while (nextRowAvailablePosition !== 0) {
      const position = nextRowAvailablePosition & (-nextRowAvailablePosition)
      nextRowAvailablePosition = nextRowAvailablePosition & (nextRowAvailablePosition - 1)
      count += backTrack(n, row + 1, columns | position, (diagonalLTRB | position) << 1, (diagonalRTLB | position) >> 1)
    }
    return count
  }
}

console.log(totalNQueens(8))
