// 53. 最大子序和
// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组
//（子数组最少包含一个元素），返回其最大和。

// 示例 1：
// 输入：nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// 输出：6
// 解释：连续子数组[4, -1, 2, 1] 的和最大，为 6 。

// 示例 2：
// 输入：nums = [1]
// 输出：1

// 示例 3：
// 输入：nums = [0]
// 输出：0

// 示例 4：
// 输入：nums = [-1]
// 输出：-1

// 示例 5：
// 输入：nums = [-100000]
// 输出：-100000

// 提示：
// 1 <= nums.length <= 3 * 104
// - 105 <= nums[i] <= 105

// 进阶：如果你已经实现复杂度为O(n)的解法，尝试使用更为精妙的分治法求解。

// 方法一、暴力解法
// 时间复杂度：O(n^2)，其中n为nums数组的长度。
// 我们只需要遍历一遍数组即可求得答案。
// 空间复杂度：O(1)。我们只需要常数空间存放若干变量。
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function (nums) {
  const len = nums.length
  if (len <= 0) {
    return 0
  }
  let finalMax = 0
  for (let i = 0; i < len; i++) {
    let currentMax = nums[i]
    let temp = nums[i]
    for (let j = i + 1; j < len; j++) {
      temp = temp + nums[j]
      if (currentMax < temp) {
        currentMax = temp
      }
    }
    finalMax = currentMax > finalMax ? currentMax : finalMax
  }
  return finalMax
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
