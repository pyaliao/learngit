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

// 二、将获取第一个及最后一个与target相等的元素下标的代码精简
// 避免重复代码，将getFirst和getLast合并为binarySearch
const binarySearch = function (nums, target, isFirst) {
  let left = 0
  let right = nums.length - 1
  // 此处必须初始化为nums长度，因为当nums只有一个元素且等于target时，
  // ans在循环中没有被赋值
  let ans = nums.length
  // 二分查找
  while (left <= right) {
    const mid = parseInt((left + right) / 2)
    // 当isFirst为false时，查找的是第一个大于target的元素的下标
    // 此时，下面的程序只判断nums[mid] > target
    // 当isFirst为true时，查找的是第一个等于target的元素的下标
    if (nums[mid] > target || (isFirst && nums[mid] >= target)) {
      right = mid - 1
      ans = mid
    } else {
      left = mid + 1
    }
  }
  return ans
}

const searchRange = function (nums, target) {
  // 查找第一个等于target的元素的下标
  const first = binarySearch(nums, target, true)
  // 查找第一个大于target的元素的下标，将其减一（因为数组是升序的）即可得到最后一个等于target的元素的下标
  const last = binarySearch(nums, target, false) - 1
  // 数组下标及元素有效性检验，如果有效，则返回[first, last]，无效则返回[-1, -1]
  if (first <= last &&
    first >= 0 &&
    last <= nums.length &&
    nums[first] === target &&
    nums[last] === target) {
    return [first, last]
  }
  return [-1, -1]
}

console.log(binarySearch([1], 1, true))
console.log(binarySearch([1], 1, false))
console.log(searchRange([5, 7, 7, 8, 8, 10], 8))
console.log(searchRange([5, 7, 7, 8, 8, 10], 8))