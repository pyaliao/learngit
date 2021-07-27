// 42. 接雨水
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，
// 计算按此排列的柱子，下雨之后能接多少雨水。

// 示例 1：
// 输入：height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// 输出：6
// 解释：上面是由数组[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] 表示的高度图，
// 在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

// 示例 2：
// 输入：height = [4, 2, 0, 3, 2, 5]
// 输出：9

// 提示：
// n == height.length
// 0 <= n <= 3 * 104
// 0 <= height[i] <= 105

/**
 * @param {number[]} height
 * @return {number}
 */

// 方法四、双指针法
// 时间复杂度O(n)，空间复杂度O(1)
const trap = function (height) {
  const len = height.length
  let left = 0
  let right = len - 1
  let leftMax = 0
  let rightMax = 0
  let volumn = 0
  while (left <= right) {
    leftMax = Math.max(leftMax, height[left])
    rightMax = Math.max(rightMax, height[right])
    if (leftMax < rightMax) {
      volumn += leftMax - height[left]
      left++
    } else {
      volumn += rightMax - height[right]
      right--
    }
  }
  return volumn
}
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
