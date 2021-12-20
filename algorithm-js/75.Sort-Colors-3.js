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

// 双指针法：
// 具体地，我们用指针 p0来交换0，p1来交换1，初始值都为 0。当我们从左向右遍历整个数组时：
// 1. 如果找到了1，那么将其与nums[p1]进行交换，并将p1向后移动一个位置，这与方法一是相同的。
// 2. 如果找到了0，那么将其与nums[p0]进行交换，并将 p0向后移动一个位置。
// 这样做是正确的吗？我们可以注意到，因为连续的0之后是连续的1，因此如果我们将0与nums[p0]进行交换，
// 那么我们可能会把一个1交换出去。当 p0 < p1时，我们已经将一些1连续地放在头部，此时一定会把一个1交换出去，
// 导致答案错误。因此，如果p0 < p1，那么我们需要再将nums[i]与nums[p1]进行交换，其中i是当前遍历到的位置，
// 在进行了第一次交换后，nums[i]的值为1，我们需要将这个1放到「头部」的末端。在最后，无论是否有 p0 < p1，
// 我们需要将p0和p1均向后移动一个位置，而不是仅将p0向后移动一个位置。

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const swap = function (index1, index2, nums) {
  const tmp = nums[index1]
  nums[index1] = nums[index2]
  nums[index2] = tmp
}
const sortColors = function (nums) {
  let pointerZero = 0
  let pointerone = 0
  const len = nums.length
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      swap(i, pointerZero, nums)
      if (pointerZero < pointerone) {
        swap(i, pointerone, nums)
      }
      // 0和1的指针必须都增加，因为1的指针必须大于等于0的指针，这样双指针才能正常进行排序
      // 因此，只要0交换了，pointerZero增加了，pointerone必须增加
      // 因此，遍历nums[i]为0时，又分两种情况:
      // 1. pointerZero等于pointerone，此时将nums[i]与nums[pointerZero]，将pointerZero及pointerone都后移一位
      // 2. pointerZero小于pointerone，此时将nums[i]与nums[pointerone]交换之后，肯定将一个1交换到了nums[i]所在的位置，
      // 因此需要再将nums[i]=1与nums[pointerone]进行交换，然后将pointerZero与pointerone后移一位
      pointerZero += 1
      pointerone += 1
    } else if (nums[i] === 1) {
      // 遍历遇到1，直接交换即可
      swap(i, pointerone, nums)
      pointerone += 1
    }
  }
}

const nums = [2, 0, 2, 1, 1, 0]
// const nums = [2, 0, 1]
// const nums = [0]
// const nums = [1]
console.log(sortColors(nums), nums)
