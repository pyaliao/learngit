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

// 方法二、
// 在方法一的暴力解法中，对每个元素，每次都会往左或者往右遍历，找到最大值
// 我们可以在遍历过程中将这些值保存起来，最终只需要按照下标取出两边的最大值
// 计算最终结果即可
// 此方法是空间换时间的做法，空间复杂度O(n)，时间复杂度O(n)
// 此算法与前一算法都有一个核心就是：每个下标i指向的元素可以接取的雨水的容量
// 等于此元素左右两边数组结构中最大值中较小的那一个值减去此元素的值
const trap = function (height) {
  const len = height.length
  const leftMax = []
  const rightMax = []
  let volumn = 0
  leftMax[0] = height[0]
  // leftMax[i]存储的是height[i]及其左边所有元素中值最大的元素
  // rightMax[i]同理
  // 每次要计算leftMax[i]的值，就需要通过比较leftMax[i - 1]与height[i]的大小来确定
  // leftMax[i - 1]代表的是下标小于等于i - 1的所有元素中最大的那一个，
  // 而计算下标小于等于i的所有元素，中最大值则只需将leftMax[i - 1]与height[i]比较即可
  for (let i = 1; i < len; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i])
  }
  rightMax[len - 1] = height[len - 1]
  for (let j = len - 2; j >= 0; j--) {
    rightMax[j] = Math.max(rightMax[j + 1], height[j])
  }
  // 遍历数组，计算每个元素可以接取的雨水的容量并累加
  for (let k = 0; k < len; k++) {
    volumn += Math.min(leftMax[k], rightMax[k]) - height[k]
  }
  return volumn
}
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
