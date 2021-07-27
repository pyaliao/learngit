// 33. 搜索旋转排序数组

// 整数数组nums按升序排列，数组中的值互不相同。
// 在传递给函数之前，nums在预先未知的某个下标（0 <= k < nums.length）
// 上进行了旋转，使数组变为[nums[k], nums[k + 1], ..., 
// nums[n - 1], nums[0], nums[1], ..., nums[k - 1]]（下标 从 0 开始 计数）。
// 例如，[0, 1, 2, 4, 5, 6, 7] 在下标3处经旋转后可能变为[4, 5, 6, 7, 0, 1, 2]。
// 给你旋转后的数组nums和一个整数target，如果nums中存在这个目标值 target，
// 则返回它的下标，否则返回-1。

// 示例 1：
// 输入：nums = [4, 5, 6, 7, 0, 1, 2], target = 0
// 输出：4

// 示例 2：
// 输入：nums = [4, 5, 6, 7, 0, 1, 2], target = 3
// 输出：-1

// 示例 3：
// 输入：nums = [1], target = 0
// 输出：-1

// 提示：
// 1 <= nums.length <= 5000
// -10^4 <= nums[i] <= 10^4
// nums中的每个值都独一无二
// 题目数据保证nums在预先未知的某个下标上进行了旋转
// - 10^4 <= target <= 10^4

// 进阶：你可以设计一个时间复杂度为O(logn)的解决方案吗？

// 方法一、暴力解法
const search = function (nums, target) {
  const len = nums.length
  for (let i = 0; i < len; i++) {
    if (nums[i] === target) {
      return i
    }
  }
  return -1
}
