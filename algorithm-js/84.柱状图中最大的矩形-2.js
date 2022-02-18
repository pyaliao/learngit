// 84. 柱状图中最大的矩形
// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。

// 示例 1:
// 输入：heights = [2, 1, 5, 6, 2, 3]
// 输出：10
// 解释：最大的矩形为图中红色区域，面积为 10

// 示例 2：
// 输入： heights = [2, 4]
// 输出： 4

// 提示：
// 1 <= heights.length <= 105
// 0 <= heights[i] <= 104

// 一次遍历：单调栈

/**
 * @param {number[]} heights
 * @return {number}
 */
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
const heights = [2, 1, 5, 6, 2, 3]
console.log(largestRectangleArea(heights))
// 测试 2
// const heights = [2, 4]
// console.log(largestRectangleArea(heights))
