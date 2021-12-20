// 75. 颜色分类
// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，
// 原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

// 示例 1：
// 输入：nums = [2, 0, 2, 1, 1, 0]
// 输出：[0, 0, 1, 1, 2, 2]

// 示例 2：
// 输入：nums = [2, 0, 1]
// 输出：[0, 1, 2]

// 示例 3：
// 输入：nums = [0]
// 输出：[0]

// 示例 4：
// 输入：nums = [1]
// 输出：[1]

// 提示：
// n == nums.length
// 1 <= n <= 300
// nums[i] 为 0、1 或 2

// 进阶：
// 你可以不使用代码库中的排序函数来解决这道题吗？
// 你能想出一个仅使用常数空间的一趟扫描算法吗？

// 暴力方法：先统计所有类型数字的个数，然后生成一个新的符合条件的数组（在原数组上进行覆盖操作）
// 时间复杂度：O(n)
// 空间复杂度：O(1)
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) {
  let zeroCount = 0
  let oneCount = 0
  const len = nums.length
  // 只需要统计出0和1的个数即可
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      zeroCount++
    } else if (nums[i] === 1) {
      oneCount++
    }
  }
  // 填充时，除了0和1所在的范围之外，都填充为2
  for (let j = 0; j < len; j++) {
    if (j < zeroCount) {
      nums[j] = 0
    } else if (j < oneCount + zeroCount) {
      nums[j] = 1
    } else {
      nums[j] = 2
    }
  }
}
const nums = [0]
console.log(sortColors(nums), nums)
