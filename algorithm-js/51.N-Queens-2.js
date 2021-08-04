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

// 前言
// 「N皇后问题」研究的是如何将N个皇后放置在N×N的棋盘上，并且使皇后彼此之间不能相互攻击。
// 皇后的走法是：可以横直斜走，格数不限。因此要求皇后彼此之间不能相互攻击，
// 等价于要求任何两个皇后都不能在同一行、同一列以及同一条斜线上。
// 直观的做法是暴力枚举将N个皇后放置在N×N的棋盘上的所有可能的情况，
// 并对每一种情况判断是否满足皇后彼此之间不相互攻击。
// 暴力枚举的时间复杂度是非常高的，因此必须利用限制条件加以优化。
// 显然，每个皇后必须位于不同行和不同列，因此将N个皇后放置在N×N的棋盘上，
// 一定是每一行有且仅有一个皇后，每一列有且仅有一个皇后，且任何两个皇后都不能在同一条斜线上。
// 基于上述发现，可以通过回溯的方式寻找可能的解。

// 回溯的具体做法是：
// 使用一个数组记录每行放置的皇后的列下标，依次在每一行放置一个皇后。
// 每次新放置的皇后都不能和已经放置的皇后之间有攻击：
// 即新放置的皇后不能和任何一个已经放置的皇后在同一列以及同一条斜线上，并更新数组中的当前行的皇后列下标。
// 当N个皇后都放置完毕，则找到一个可能的解。当找到一个可能的解之后，将数组转换成表示棋盘状态的列表，
// 并将该棋盘状态的列表加入返回列表。由于每个皇后必须位于不同列，因此已经放置的皇后所在的列不能放置别的皇后。
// 第一个皇后有N列可以选择，第二个皇后最多有N−1列可以选择，第三个皇后最多有N−2列可以选择
// （如果考虑到不能在同一条斜线上，可能的选择数量更少），因此所有可能的情况不会超过N!种，
// 遍历这些情况的时间复杂度是O(N!)。为了降低总时间复杂度，每次放置皇后时需要快速判断每个位置是否可以放置皇后，
// 显然，最理想的情况是在O(1)的时间内判断该位置所在的列和两条斜线上是否已经有皇后。
// 以下两种方法分别使用集合和位运算对皇后的放置位置进行判断，都可以在O(1)的时间内判断一个位置是否可以放置皇后，
// 算法的总时间复杂度都是O(N!)。

// 方法二：基于位运算的回溯
/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
  const queens = new Array(n).fill(-1)
  const solutions = []
  backTrack(solutions, queens, n, 0, 0, 0, 0)
  return solutions
}
const backTrack = function (solutions, queens, n, row, columns, diagonalLTRB, diagonalRTLB) {
  if (n === row) {
    solutions.push(generateSolutions(queens, n))
  } else {
    let nextRowAvailablePosition = ((1 << n) - 1) & (~(columns | diagonalLTRB | diagonalRTLB))
    while (nextRowAvailablePosition !== 0) {
      const position = nextRowAvailablePosition & (-nextRowAvailablePosition)
      nextRowAvailablePosition = nextRowAvailablePosition & (nextRowAvailablePosition - 1)
      const column = bitCount(position - 1)
      queens[row] = column
      backTrack(solutions, queens, n, row + 1, columns | position, (diagonalLTRB | position) << 1, (diagonalRTLB | position) >> 1)
      queens[row] = -1
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
const bitCount = function (num) {
  let count = 0
  while (num !== 0) {
    count++
    num = (num - 1) & num
  }
  return count
}

console.log(solveNQueens(4))
// console.log(bitCount(7))
