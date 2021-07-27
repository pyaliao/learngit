// 35. 搜索插入位置
// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
// 如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 你可以假设数组中无重复元素。

// 示例 1:
// 输入: [1, 3, 5, 6], 5
// 输出: 2

// 示例 2:
// 输入: [1, 3, 5, 6], 2
// 输出: 1

// 示例 3:
// 输入: [1, 3, 5, 6], 7
// 输出: 4

// 示例 4:
// 输入: [1, 3, 5, 6], 0
// 输出: 0

// 暴力解法

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

const searchInsert = function (nums, target) {
  const len = nums.length
  // 当数组长度为1时，且元素值等于target时，会进行下面的循环，
  // 但是下面的循环不会进入，最终会直接返回position，因此，需要给一个默认值0
  let position = 0
  // 边界条件判断
  if (nums[0] > target) {
    return 0
  }
  if (nums[len - 1] < target) {
    return len
  }
  // 当target值在数组范围内则进行循环，特殊情况是数组只有一个元素，
  // 此时不会进入循环，因此要给position一个默认值
  for (let i = 0; i < len - 1; i++) {
    // nums[i + 1]元素等于target，则i+1是target的位置下标
    // nums[i + 1]元素大于target，则i+1是target要插入的位置下标
    if (nums[i] < target && nums[i + 1] >= target) {
      position = i + 1
    }
  }
  return position
}
console.log(searchInsert([1, 3, 5, 6], 5))
console.log(searchInsert([1, 3, 5, 6], 2))
console.log(searchInsert([1, 3, 5, 6], 7))
console.log(searchInsert([1, 3, 5, 6], 0))
