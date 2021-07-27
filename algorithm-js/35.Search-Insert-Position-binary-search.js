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

// 二分查找

const searchInsert = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  // 边界条件判断，target不在数组元素值范围内的情况
  if (target < nums[0]) {
    return 0
  }
  if (target > nums[right]) {
    return right + 1
  }
  // target在数组元素值范围内的情况
  // target在数组元素值范围内，但不一定在数组内，需要在循环中做进一步判断
  let ans
  while (left <= right) {
    const mid = parseInt((left + right) / 2)
    // 相等时必须返回并退出，否则会陷入死循环
    if (nums[mid] === target) {
      return mid
    }
    // 记录每次大于时的mid值，由于与target相等的值不存在（上面的判断已经排除），
    // 则ans保存的是大于target值的最小值的下标，即第一个大于target的值的下标
    // 也就是target要插入的位置下标
    if (nums[mid] > target) {
      right = mid - 1
      ans = mid
    } else {
      left = mid + 1
    }
  }
  return ans
}

// 优化版本
const searchInsert = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  // 特殊情况，当target大于数组最大元素时，插入位置是nums.length，
  // 数组下标并不包含，需要在此初始化
  // 而target小于数组最小元素时，插入位置是0，在循环中可以遍历出来
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
  return ans
}

console.log(searchInsert([1, 3, 5, 6], 5))
console.log(searchInsert([1, 3, 5, 6], 2))
console.log(searchInsert([1, 3, 5, 6], 7))
console.log(searchInsert([1, 3, 5, 6], 0))