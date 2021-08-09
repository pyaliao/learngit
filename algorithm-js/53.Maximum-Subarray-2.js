// 53. 最大子序和
// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组
// (子数组最少包含一个元素)，返回其最大和。

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

// 方法二、动态规划
// dp[i]表示以第i个元素结尾的所有连续子数组中的最大子数组之和
// dp[i]的值取决于dp[i + 1] + nums[i] 与 nums[i]的大小
// dp[i] = dp[i + 1] + nums[i]   (dp[i + 1] >  0, dp[i + 1] + nums[i] >  nums[i])
// dp[i] = nums[i]               (dp[i + 1] <= 0, dp[i + 1] + nums[i] <= nums[i])
// dp[i] = max(dp[i + 1] + nums[i], nums[i])

// 时间复杂度：O(n)，其中n为nums数组的长度。
// 我们只需要遍历一遍数组即可求得答案。
// 空间复杂度：O(1)。我们只需要常数空间存放若干变量。
/**
 * @param {number[]} nums
 * @return {number}
 */

const maxSubArray = function (nums) {
  const n = nums.length
  // 此时的prev代表pd[0]
  let prev = nums[0]
  // 当i=0时，max为nums[0]
  let max = nums[0]
  for (let i = 1; i < n; i++) {
    // 此时被赋值的prev代表pd[i]
    prev = Math.max(prev + nums[i], nums[i])
    // 保存当前最大值，继续循环，并更新最大值
    max = Math.max(max, prev)
  }
  return max
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
