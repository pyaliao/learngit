// 34. 在排序数组中查找元素的第一个和最后一个位置
// 给定一个按照升序排列的整数数组nums，和一个目标值target。
// 找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值target，返回[-1, -1]。

// 进阶：
// 你可以设计并实现时间复杂度为O(logn)的算法解决此问题吗？

// 示例 1：
// 输入：nums = [5, 7, 7, 8, 8, 10], target = 8
// 输出：[3, 4]

// 示例 2：
// 输入：nums = [5, 7, 7, 8, 8, 10], target = 6
// 输出：[-1, -1]

// 示例 3：
// 输入：nums = [], target = 0
// 输出：[-1, -1]

// 提示：
// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// -109 <= target <= 109

// 使用二分查找
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// 一、原始写法，分别求出第一个与target相等的元素的下标及最后一个与target相等的元素的下标
// 查找第一个与target相等的元素的下标
const getFirst = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  let ans = nums.length
  while (left <= right) {
    const mid = parseInt((left + right) / 2)
    if (nums[mid] >= target) {
      right = mid - 1
      ans = mid
    } else {
      left = mid + 1
    }
  }
  // 合法及有效性检验
  if (ans >= 0 && ans < nums.length && nums[ans] === target) {
    return ans
  } else {
    return -1
  }
}
// 查找第一个大于target的元素的下标
const getLast = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  let ans = nums.length
  while (left <= right) {
    const mid = parseInt((left + right) / 2)
    if (nums[mid] > target) {
      right = mid - 1
      ans = mid
    } else {
      left = mid + 1
    }
  }
  // 合法及有效性检验
  if (ans >= 1 && ans <= nums.length && nums[ans - 1] === target) {
    return ans - 1
  } else {
    return -1
  }
}
const searchRange = function (nums, target) {
  // 查找第一个等于target的元素的下标
  const first = getFirst(nums, target)
  const last = getLast(nums, target)
  return [first, last]
}

// console.log(getFirst([5, 7, 7, 8, 8, 10], 10))
// console.log(getLast([5, 7, 7, 8, 8, 10], -20))
console.log(searchRange([5, 7, 7, 8, 8, 10], 8))
console.log(searchRange([5, 7, 7, 8, 8, 10], 8))
