// 85. 最大矩形
// 给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

// 示例 1：
// 输入：matrix = [["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]
// 输出：6
// 解释：最大矩形如上图所示。

// 示例 2：
// 输入：matrix = []
// 输出：0

// 示例 3：
// 输入：matrix = [["0"]]
// 输出：0

// 示例 4：
// 输入：matrix = [["1"]]
// 输出：1

// 示例 5：
// 输入：matrix = [["0", "0"]]
// 输出：0

// 先将矩阵转换为一组柱状图，然后再求这组柱状图中最大的矩形面积即可
// 求柱状图最大矩形面积可以复用84题代码

/**
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalRectangle = function (matrix) {
  const rows = matrix.length
  const cols = matrix[0].length
  // 定义一个二维数组存储柱状图
  const histogram = new Array(rows).fill().map(item => new Array(cols).fill(0))
  let ans = 0
  // 遍历矩阵，将柱状图存储到histogram
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === '0') {
        histogram[row][col] = 0
      } else {
        histogram[row][col] = row === 0 ? histogram[row][col] + 1 : histogram[row - 1][col] + 1
      }
    }
  }
  console.log(histogram)
  for (let row = 0; row < rows; row++) {
    ans = Math.max(ans, largestRectangleArea(histogram[row]))
  }
  return ans
}
const largestRectangleArea = function (heights) {
  // 给数组首尾添加两个哨兵
  heights.push(0)
  heights.unshift(0)
  // 遍历整个数组
  const len = heights.length
  const stack = []
  let ans = 0
  for (let i = 0; i < len; i++) {
    // 当栈不为空，且栈顶元素大于新遍历到的元素时，
    // 说明当前栈顶元素构成的矩形区域右边界确定，就是当前元素
    // 其左边界就是栈中栈顶元素前一元素，其矩形区域确定
    while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      // 将栈顶元素出栈
      const top = stack.pop()
      // 计算矩形面积
      const left = stack[stack.length - 1]
      const right = i
      ans = (right - left - 1) * heights[top] > ans ? (right - left - 1) * heights[top] : ans
    }
    // 如果栈为空，或者栈顶元素小于等于新遍历到的元素时，将当前下标入栈
    stack.push(i)
  }
  return ans
}
// 测试 1
const matrix = [
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0']
]
console.log(maximalRectangle(matrix))
