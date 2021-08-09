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

// 方法三、分治法----基础版
// 除了获取左右区间最大子序列和之外，还需要获得跨越分割点的序列的最大和，
// 因此需要直接在left的右端mid-1，right的左端mid开始向另一侧遍历找到最大连续子列和序列，
// 这样除了分治的工作以外，每一层都需要O(n) ，因此算法复杂度为：
// T(n) = 2⋅T(n/2) + O(n) = O(nlogn)

/**
 * @param {number[]} nums
 * @return {number}
 */

const maxSubArray = function (nums) {
  const n = nums.length
  console.log(nums)
  if (n === 1) {
    return nums[0]
  } else {
    // 向下取整求出中点
    const mid = parseInt(n / 2)
    // 计算左子数组最大连续子数组和（下标从0到mid-1）
    const leftArrMax = maxSubArray(nums.slice(0, mid))
    // 计算右子数组最大连续子数组和（下标从mid到n-1）
    const rightArrMax = maxSubArray(nums.slice(mid))
    // 计算横跨左右子数组的最大连续子数组和
    let leftSum = 0
    let leftMax = nums[mid - 1]
    for (let i = mid - 1; i >= 0; i--) {
      leftSum += nums[i]
      leftMax = Math.max(leftMax, leftSum)
    }
    let rightSum = 0
    let rightMax = nums[mid]
    for (let i = mid; i < n; i++) {
      rightSum += nums[i]
      rightMax = Math.max(rightMax, rightSum)
    }
    return Math.max(leftArrMax, rightArrMax, leftMax + rightMax)
  }
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
