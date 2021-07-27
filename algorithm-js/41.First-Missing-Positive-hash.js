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

// 一、普通哈希表实现，时间复杂度O(n)，空间复杂度O(n)
// 先将数组中所有元素存储到哈希表中，然后从1开始枚举正整数到n，如果都在哈希表中，则返回n+1
// 反之，将第一个不在哈希表中的正整数返回

/**
 * @param {number[]} nums
 * @return {number}
 */
const firstMissingPositive = function (nums) {
  const n = nums.length
  // 创建一个哈希表来存储数组数值
  const numsMap = new Map()
  for (let i = 0; i < n; i++) {
    numsMap.set(nums[i], true)
  }
  // 从1开始遍历到n，判断每个值是否在哈希表中
  // 如果遍历结束，每个值都在hash表中，则返回n+1
  // 否则返回第一个不在hash中的值
  for (let j = 1; j <= n; j++) {
    if (!numsMap.get(j)) {
      return j
    } else {
      continue
    }
  }
  return n + 1
}
console.log(firstMissingPositive([7, 8, 9, 11, 12]))
