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

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 暴力解法
const searchRange = function (nums, target) {
  let indexArr = []
  const len = nums.length
  let isFirst = true
  for (let i = 0; i < len; i++) {
    if (nums[i] === target) {
      if (isFirst) {
        indexArr.push(i)
        isFirst = false
      } else {
        indexArr[1] = i
      }
    }
  }
  if (indexArr.length <= 0) {
    indexArr = [-1, -1]
  } else if (indexArr.length === 1) {
    indexArr[1] = indexArr[0]
  }
  return indexArr
}
console.log(searchRange([5, 7, 7, 8, 8, 10], 8))
console.log(searchRange([1], 1))
console.log(searchRange([5, 7, 7, 8, 8, 10], 6))
