/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

// 思路与算法
// 设函数check(i, j, k) 表示判断以网格的(i, j) 位置出发，
// 能否搜索到单词word[k..]，其中word[k..] 表示字符串word 从第 k 个字符开始的后缀子串。
// 如果能搜索到，则返回true，反之返回false。函数check(i, j, k) 的执行步骤如下：
// 如果board[i][j] = s[k]，当前字符不匹配，直接返回 false。
// 如果当前已经访问到字符串的末尾，且对应字符依然匹配，此时直接返回true。
// 否则，遍历当前位置的所有相邻位置。
// 如果从某个相邻位置出发，能够搜索到子串word[k + 1..]，则返回true，否则返回false。
// 这样，我们对每一个位置(i, j)都调用函数check(i, j, 0) 进行检查：
// 只要有一处返回true，就说明网格中能够找到相应的单词，否则说明不能找到。
// 为了防止重复遍历相同的位置，需要额外维护一个与board 等大的visited 数组，
// 用于标识每个位置是否被访问过。每次遍历相邻位置时，需要跳过已经被访问的位置。

// 复杂度分析
// 时间复杂度：一个非常宽松的上界为O(MN⋅3^L)，其中 M, N 为网格的长度与宽度，
// L 为字符串word 的长度。在每次调用函数check 时，除了第一次可以进入 4 个分支以外，
// 其余时间我们最多会进入 3 个分支（因为每个位置只能使用一次，所以走过来的分支没法走回去）。
// 由于单词长为 L，故check(i, j, 0) 的时间复杂度为 O(3^L)，而我们要执行 O(MN) 次检查。
// 然而，由于剪枝的存在，我们在遇到不匹配或已访问的字符时会提前退出，终止递归流程。
// 因此，实际的时间复杂度会远远小于Θ(MN⋅3^L)。
// 空间复杂度：O(MN)。我们额外开辟了 O(MN) 的 visited 数组，同时栈的深度最大为O(min(L, MN))。

const exist = function (board, word) {
  const rows = board.length
  const cols = board[0].length
  const visited = new Array(rows).fill().map(item => new Array(cols).fill(0))
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  const check = function (row, col, k) {
    // 如果不匹配，则直接返回false
    // 如果匹配，并且到达最后一个字符，则返回true
    if (board[row][col] !== word[k]) {
      return false
    } else if (k === word.length - 1) {
      return true
    }
    // 如果当前字符匹配且没有达到最后一个字符，则从四个方向进行递归与回溯
    // 如果当前字符匹配，则将其对应的位置置为1，表示其已经选择
    visited[row][col] = 1
    for (const [offX, offY] of directions) {
      // 计算下一个元素的下标（遍历四个方向）
      const nextRow = row + offX
      const nextCol = col + offY
      // 判断下标是否越界
      if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
        // 判断新的位置是否使用过，即是否被遍历过
        if (!visited[nextRow][nextCol]) {
          const checked = check(nextRow, nextCol, k + 1)
          if (checked) {
            return true
          }
        }
      }
    }
    // 回溯：如果回溯，则将被选择的元素状态恢复，将该位置对应的值置为0
    visited[row][col] = 0
    // 返回false：如果有匹配的单词，则在上述递归时会直接返回，
    // 因为如果进行到这一步，说明以row, col为起点，没有与word[k...]匹配的单词
    // 直接返回false，然后从新的起点开始进行check
    return false
  }

  // 枚举每个起点: 即遍历每一个位置，将其作为起点调用check
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (check(row, col, 0)) {
        return true
      }
    }
  }
  return false
}

// const board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']]
// const word = 'ABCCED'
// const board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']]
// const word = 'SEE'
const board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']]
const word = 'ABCB'

console.log(exist(board, word))
