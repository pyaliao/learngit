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

// 单指针法：用指针pointer表示头部区域，在0-pointer-1范围内的值是同样的值，每次遍历数组时，比较nums[i]
// 的值是否等于0，如果等于0，则将其与nums[pointer]的值进行交换，再将pointer加1，然后继续进行下一轮循环
// 数组遍历结束后，所有的0都在数组最左边且连续排列
// 我们再进行一次数组遍历，将所有的1放到0的后面，思路同第一次遍历，只不过交换的是nums[pointer]和nums[j]=1的值
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
  let pointer = 0
  const len = nums.length
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      swap(i, pointer, nums)
      pointer += 1
    }
  }
  for (let j = pointer; j < len; j++) {
    if (nums[j] === 1) {
      swap(j, pointer, nums)
      pointer += 1
    }
  }
}

const nums = [2, 0, 2, 1, 1, 0]
// const nums = [2, 0, 1]
// const nums = [0]
// const nums = [1]
console.log(sortColors(nums), nums)
