// 37. 解数独
// 编写一个程序，通过填充空格来解决数独问题。

// 数独的解法需 遵循如下规则：
// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
// 数独部分空格内已填入了数字，空白格用 '.' 表示。

// 示例：
// 输入：board = [['5', '3', '.', '.', '7', '.', '.', '.', '.'],
//               ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
//               ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
//               ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
//               ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
//               ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
//               ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
//               ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
//               ['.', '.', '.', '.', '8', '.', '.', '7', '9']]
// 输出：        [['5', '3', '4', '6', '7', '8', '9', '1', '2'],
//               ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
//               ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
//               ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
//               ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
//               ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
//               ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
//               ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
//               ['3', '4', '5', '2', '8', '6', '1', '7', '9']]
// 提示：
// board.length == 9
// board[i].length == 9
// board[i][j] 是一位数字或者 '.'
// 题目数据 保证 输入数独仅有一个解




// ----------------------思路--------------------------------------
// 每一个空白格都要选一个数字去填，有多少个空白格，做多少次选择。
// 可以想到递归，每次递归填当前的格子，选填 i，board 的状态就更新了。
// 子递归呢？基于填了 i 的新 board，给下一个格子填数。每个递归的子问题，面对一个新 board。
// 按顺序填下去，如果不是空白格，就继续递归填下一个。
// 直到递归到最后一个格子，board 填满了，结束递归。
// ----------------------为何要回溯？-------------------------------
// 每填一个空白格都是尝试，选填一个数，如果没有冲突就填上去，是一种试探。
// 但如果填 1 到 9 都会冲突，意味着，基于当前 board，这个格子填不了，做不下去。
// 所以，要撤销当前选择，回到上一格，再改填别的数，再试探。
// ---------------------定义递归函数--------------------------------
// 子递归是填下一个格子，填不了的话要告知当前递归，撤销当前的选择。
// 即，根据子递归的结果，判断当前递归的选择是否正确。
// 递归函数要返回一个Boolean值，定义是：基于当前的 board，给当前的格子board[i][j]填一个数，
// 能否最后生成正确的数独。能否最后生成正确的数独，是靠递归子调用一个个去填，
// 当填不下去，就撤回上一个选择，尝试别的选择。

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

const solveSudoku = function (board) {
  // 声明三个数组，分别存储行、列、子数独中已经存在的数值的map
  const rows = []
  const columns = []
  const boxes = [[[], [], []], [[], [], []], [[], [], []]]
  const spaces = []
  let valid = false

  const dfs = function (board, position) {
    if (position === spaces.length) {
      valid = true
      return
    }
    const [row, col] = spaces[position]
    for (let number = 0; number < 9 && !valid; number++) {
      if (!rows[row][number] && !columns[col][number] && !boxes[parseInt(row / 3)][parseInt(col / 3)][number]) {
        rows[row][number] = true
        columns[col][number] = true
        boxes[parseInt(row / 3)][parseInt(col / 3)][number] = true
        board[row][col] = number + 1 + ''
        // 对下一位置进行递归
        dfs(board, position + 1)
        // 如果上面的递归中没有任何一个数字满足要求，则回溯到当前递归层，将三个值恢复为false
        // 然后进入下一轮循环，继续监测新的值是否满足
        rows[row][number] = false
        columns[col][number] = false
        boxes[parseInt(row / 3)][parseInt(col / 3)][number] = false
      }
    }
  }
  for (let k = 0; k < 9; k++) {
    rows[k] = []
    columns[k] = []
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== '.') {
        const number = parseInt(board[i][j]) - 1
        rows[i][number] = true
        columns[j][number] = true
        boxes[parseInt(i / 3)][parseInt(j / 3)][number] = true
      } else {
        spaces.push([i, j])
      }
    }
  }
  dfs(board, 0)
}




// 小优化，将数组改为哈希表
const solveSudoku = function (board) {
  const rows = []
  const columns = []
  const boxes = []
  const spaces = []
  let valid = false

  const dfs = function (board, position) {
    if (position === spaces.length) {
      valid = true
      return
    }
    const [row, col] = spaces[position]
    for (let number = 0; number < 9 && !valid; number++) {
      if (!rows[row].get(number) && !columns[col].get(number) && !boxes[parseInt(row / 3) * 3 + parseInt(col / 3)].get(number)) {
        rows[row].set(number, 1)
        columns[col].set(number, 1)
        boxes[parseInt(row / 3) * 3 + parseInt(col / 3)].set(number, 1)
        board[row][col] = number + 1 + ''
        dfs(board, position + 1)
        rows[row].set(number, 0)
        columns[col].set(number, 0)
        boxes[parseInt(row / 3) * 3 + parseInt(col / 3)].set(number, 0)
      }
    }
  }
  for (let k = 0; k < 9; k++) {
    rows[k] = new Map()
    columns[k] = new Map()
    boxes[k] = new Map()
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== '.') {
        const number = parseInt(board[i][j]) - 1
        rows[i].set(number, 1)
        columns[j].set(number, 1)
        boxes[parseInt(i / 3) * 3 + parseInt(j / 3)].set(number, 1)
      } else {
        spaces.push([i, j])
      }
    }
  }
  dfs(board, 0)
}

// 测试数据
// const board = [
//   ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
//   ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
//   ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
//   ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
//   ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
//   ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
//   ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
//   ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
//   ['.', '.', '.', '.', '8', '.', '.', '7', '9']
// ]
const board = [[".", ".", "9", "7", "4", "8", ".", ".", "."],
["7", ".", ".", ".", ".", ".", ".", ".", "."],
[".", "2", ".", "1", ".", "9", ".", ".", "."],
[".", ".", "7", ".", ".", ".", "2", "4", "."],
[".", "6", "4", ".", "1", ".", "5", "9", "."],
[".", "9", "8", ".", ".", ".", "3", ".", "."],
[".", ".", ".", "8", ".", "3", ".", "2", "."],
[".", ".", ".", ".", ".", ".", ".", ".", "6"],
[".", ".", ".", "2", "7", "5", "9", ".", "."]]
solveSudoku(board)
console.log(board)