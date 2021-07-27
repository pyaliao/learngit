// 41. 缺失的第一个正数
// 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
// 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

// 示例 1：
// 输入：nums = [1, 2, 0]
// 输出：3

// 示例 2：
// 输入：nums = [3, 4, -1, 1]
// 输出：2

// 示例 3：
// 输入：nums = [7, 8, 9, 11, 12]
// 输出：1

// 提示：
// 1 <= nums.length <= 5 * 105
// - 231 <= nums[i] <= 231 - 1

/**
 * @param {number[]} nums
 * @return {number}
 */

// 方法二、从1到n开始枚举并判断是否在数组中，找出第一个不在数组中的数即为缺失的第一个整数
// 时间复杂度O(n^2)，空间复杂度O(1)
const firstMissingPositive = function (nums) {
  const n = nums.length
  const hasEle = function (nums, ele) {
    for (let j = 0; j < n; j++) {
      if (ele === nums[j]) {
        return true
      }
    }
    return false
  }
  for (let i = 1; i <= n; i++) {
    if (!hasEle(nums, i)) {
      return i
    }
  }
  return n + 1
}
