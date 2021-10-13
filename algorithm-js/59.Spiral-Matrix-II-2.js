// 59. 螺旋矩阵 II
// 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

// 示例 1：
// 输入：n = 3
// 输出：[[1, 2, 3], [8, 9, 4], [7, 6, 5]]

// 示例 2：
// 输入：n = 1
// 输出：[[1]]

// 提示：
// 1 <= n <= 20

// 算法：模拟顺时针路径，当走到矩阵边界或者遇到已访问过位置时，需要变换方向
// 总共有四个方向，按顺时针依次是向右，向下，向左，向上
// 给每个方向定义一个数组，表示row及col每走一次的增量
// 1. 存储数字count（初始值为1）到row及col确定的位置，然后自增数字以方便下次存储，
// 2. 根据方向获取row及col的赠量来计算下一个位置
// 判断该位置是否超出边界或者已经访问过，如果出界或者已经访问过，则变换方向（计算新的方向)
// 3. 然后根据新的方向计算新的row及col
// 4. 然后重复以上步骤
// 5. 直到count值大于n*n，返回最终的结果数组
/**
 * @param {number} n
 * @return {number[][]}
 */
const generateMatrix = function (n) {
  let count = 1
  let row = 0
  let col = 0
  let direction = 0
  // 定义要走的方向
  // 数组首元素表示row要走的数量，次元素表示col要走的数量
  const directions = [
    [0, 1],  // 往右走，0表示行增加0，1表示列增加1，这就是为什么用它表示向右走
    [1, 0],  // 往下走
    [0, -1], // 往左走
    [-1, 0]  // 往上走
  ]
  // 定义要存储数字的二维数组，数组未进行初始化，元素值都为undefined
  const ans = []
  for (let i = 0; i < n; i++) {
    ans[i] = new Array(n)
  }
  while (count <= n * n) {
    // 将数字存储到数组相应位置，然后将count自增
    ans[row][col] = count++
    // 计算下一个位置，并判断是否到达边界或者到达已经访问过的位置
    const nextRow = row + directions[direction][0]
    const nextCol = col + directions[direction][1]
    // 因为数组未进行初始化，元素值都为undefined，
    // 访问过的位置都被存储相应的数字，因此未访问过的位置值依然是undefined
    // 因此在判断下一个位置的元素值是否已访问，直接判断它是否存在，如果存在则已访问过
    if (nextRow >= n || nextRow < 0 || nextCol >= n || nextCol < 0 || ans[nextRow][nextCol]) {
      // 到达边界或者已访问过的位置，则变换方向
      direction = (direction + 1) % 4
    }
    // 换了方向得重新计算row及col
    row = row + directions[direction][0]
    col = col + directions[direction][1]
  }
  return ans
}
console.log(generateMatrix(4))
