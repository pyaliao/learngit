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

// 一、暴力解法——时间复杂度O(n^2)，空间复杂度O(1)
// 从当前位置开始，分别向左和向右遍历，获得左边及右边的最大值（包括当前位置的元素），然后取其中较小的值
// 此较小值减去当前元素的值，就是当前元素所处位置可以接收的雨水的大小，将其依次累加即可
const trap = function (height) {
  const len = height.length
  let volumn = 0
  // 从1遍历到len-2，因为第一个元素前面及最后一个元素后面没有元素，无法承接雨水
  for (let i = 1; i < len - 1; i++) {
    // 每次枚举完一个元素之后，都要将maxLeft及maxRight重新初始化为0
    let maxLeft = 0
    let maxRight = 0
    // 获取当前元素及其左边所有元素中最大的值
    for (let j = i; j >= 0; j--) {
      maxLeft = Math.max(maxLeft, height[j])
    }
    // 获取当前元素及其右边边所有元素中最大的值
    for (let k = i; k < len; k++) {
      maxRight = Math.max(maxRight, height[k])
    }
    volumn += Math.min(maxLeft, maxRight) - height[i]
  }
  return volumn
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
