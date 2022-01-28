// 80. 删除有序数组中的重复项II——扩展，求解通用方法，将原来的保留2位修改为保留k位
// 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 最多出现k次 ，返回删除后数组的新长度。
// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

// 说明：
// 为什么返回数值是整数，但输出的答案是数组呢？
// 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

// 你可以想象内部操作如下:
// // nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
// int len = removeDuplicates(nums);

// // 在函数里修改输入数组对于调用者是可见的。
// // 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
// for (int i = 0; i < len; i++) {
//   print(nums[i]);
// }

// 提示：
// 1 <= nums.length <= 3 * 104
// -104 <= nums[i] <= 104
// nums 已按升序排列

// 双指针法：思路如下
// 对于此类问题，我们应该进行如下考虑：
// 由于是保留 k 个相同数字，对于前 k 个数字，我们可以直接保留
// 对于后面的任意数字，能够保留的前提是：与当前写入的位置前面的第 k 个元素进行比较，不相同则保留

/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums, k) {
  let left = 0
  for (const num of nums) {
    // 当数组长度不大于k时，或者数组长度大于k但是前k个保留的元素不等于当前要检测的元素时
    // 将当前元素保存到数组left，并将left右移一位
    if (left < k || nums[left - k] !== num) {
      // 将num保存到left后，将left右移一位
      nums[left++] = num
    }
  }
  return left
}

// const nums = [1, 1, 1, 2, 2, 3]
const nums = [0, 0, 1, 1, 1, 1, 2, 3, 3]
console.log(removeDuplicates(nums, 2), nums.slice(0, removeDuplicates(nums, 2)))
