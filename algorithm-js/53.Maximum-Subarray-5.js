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

// 方法三、分治法----优化版
// 维护四个变量：
// leftMaxSum  --- 表示[left, right]内以left为左端点的最大子段和
// rightMaxSum --- 表示[left, right]内以right为右端点的最大子段和
// maxSum      --- 表示[left, right]内的最大子段和
// sum         --- 表示[left, right]的区间和

// 时间复杂度：
// 假设我们把递归的过程看作是一颗二叉树的先序遍历，那么这颗二叉树的深度的渐进上界为
// O(logn) ，这里的总时间相当于遍历这颗二叉树的所有节点，故总时间的渐进上界是
// O(∑i=0logn2^i) = O(n) ，故渐进时间复杂度为 O(n)。
// 空间复杂度：
// 递归会使用O(logn)的栈空间，故渐进空间复杂度为O(logn)。

/**
 * @param {number[]} nums
 * @return {number}
 */

const Status = function (leftMaxSum, rightMaxSum, maxSum, sum) {
  this.leftMaxSum = leftMaxSum
  this.rightMaxSum = rightMaxSum
  this.maxSum = maxSum
  this.sum = sum
}

const getSum = function (nums, left, right) {
  if (left === right) {
    return new Status(nums[left], nums[left], nums[left], nums[left])
  } else {
    const mid = (left + right) >> 1
    console.log('-------', mid, '-------')
    const leftSub = getSum(nums, left, mid)
    const rightSub = getSum(nums, mid + 1, right)
    // console.log('-------', leftSub, rightSub, '-------')
    const sum = leftSub.sum + rightSub.sum
    const leftMaxSum = Math.max(leftSub.leftMaxSum, leftSub.sum + rightSub.leftMaxSum)
    const rightMaxSum = Math.max(rightSub.rightMaxSum, rightSub.sum + leftSub.rightMaxSum)
    const maxSum = Math.max(leftSub.maxSum, rightSub.maxSum, leftSub.rightMaxSum + rightSub.leftMaxSum)
    return new Status(leftMaxSum, rightMaxSum, maxSum, sum)
  }
}
const maxSubArray = function (nums) {
  return getSum(nums, 0, nums.length - 1)
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
// console.log(maxSubArray([-2, 1]))
