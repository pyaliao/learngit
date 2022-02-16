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

// 暴力解法

/**
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
  // 遍历每一个位置，然后往左右两边找边界
  const len = heights.length
  let max = 0
  for (let i = 0; i < len; i++) {
    let left = i
    let right = i
    while (left >= 0 && heights[left] >= heights[i]) {
      left--
    }
    while (right < len && heights[right] >= heights[i]) {
      right++
    }
    const tmp = (right - left - 1) * heights[i]
    max = tmp > max ? tmp : max
  }
  return max
}

// 测试 1
// const heights = [2, 1, 5, 6, 2, 3]
// console.log(largestRectangleArea(heights))

const heights = [2, 4]
console.log(largestRectangleArea(heights))
