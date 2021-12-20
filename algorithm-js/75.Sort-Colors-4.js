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
// 与前一个双指针法类似，我们也可以考虑使用指针p0来交换0，p2来交换 2。
// 此时，p0的初始值仍然为 0，而p2的初始值为 n - 1。在遍历的过程中，
// 我们需要找出所有的0交换至数组的头部，并且找出所有的2交换至数组的尾部。
// 由于此时其中一个指针p2是从右向左移动的，因此当我们在从左向右遍历整个数组时，
// 如果遍历到的位置超过了p2，那么就可以直接停止遍历了。
// 具体地，我们从左向右遍历整个数组，设当前遍历到的位置为 i，对应的元素为nums[i]
// 如果找到了0，那么与前面两种方法类似，将其与nums[p0]进行交换，并将p0向后移动一个位置；
// 如果找到了2，那么将其与nums[p2]进行交换，并将 p2向前移动一个位置。
// 这样做是正确的吗？可以发现，对于第二种情况，当我们将nums[i]与 nums[p2]进行交换之后
// 新的nums[i]可能仍然是 2，也可能是0。然而此时我们已经结束了交换，开始遍历下一个元素nums[i + 1]，
// 不会再考虑nums[i] 了，这样我们就会得到错误的答案。
// 因此，当我们找到 2时，我们需要不断地将其与nums[p 2]进行交换，直到新的nums[i]不为2。此时，
// 如果nums[i]为0，那么对应着第一种情况；如果nums[i]为1，那么就不需要进行任何后续的操作。

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
  const len = nums.length
  let pointerZero = 0
  let pointerTwo = len - 1
  for (let i = 0; i < len; i++) {
    // 先处理nums[i]为2的情况
    // 当遍历到i>pointerTwo时，因为此时pointerTwo之后全是排序好的2，此时就可以结束遍历了
    while (i <= pointerTwo && nums[i] === 2) {
      swap(i, pointerTwo, nums)
      pointerTwo -= 1
    }
    // 再处理nums[i]为0的情况
    if (nums[i] === 0) {
      swap(i, pointerZero, nums)
      pointerZero += 1
    }
  }
}

// const nums = [2, 0, 2, 1, 1, 0]
// const nums = [2, 0, 1]
// const nums = [0]
// const nums = [1]
const nums = [2]
console.log(sortColors(nums), nums)
