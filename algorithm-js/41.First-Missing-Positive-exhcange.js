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

// 方法四、置换法，即交换数组中的数
const firstMissingPositive = function (nums) {
  const n = nums.length
  for (let i = 0; i < n; i++) {
    while (nums[i] >= 1 && nums[i] <= n && nums[i] !== nums[nums[i] - 1]) {
      // 每次循环之后，nums[i]改变，则可能再次进行交换
      // 而nums[i]变化，则下标nums[i] - 1变化了，在交换值时，先改变了nums[i]
      // 则后面给nums[i] - 1存储值时，就会出错，因为下标已经不是正确的下标了
      const tmp = nums[i]
      // 经过这一步赋值，nums[i]变化，则下标nums[i] - 1变化了
      nums[i] = nums[tmp - 1]
      // 那么这一步使用nums[i] - 1坐下标就会出现错误，因此要在nums[i]改变前保存下标
      nums[tmp - 1] = tmp
    }
  }
  // 遍历数组，只要数组值与下标j + 1不相等，j + 1就是我们要找的值
  // 否则，返回n + 1
  for (let j = 0; j < n; j++) {
    if (nums[j] !== j + 1) {
      return j + 1
    }
  }
  return n + 1
}
console.log(firstMissingPositive([3, 4, -1, 1]))
