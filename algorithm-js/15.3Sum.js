// 给你一个包含n个整数的数组nums，
// 判断nums中是否存在三个元素a，b，c ，
// 使得a + b + c = 0 ？请你找出所有和为0且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

// 示例 1：
// 输入：nums = [-1, 0, 1, 2, -1, -4]
// 输出：[[-1, -1, 2], [-1, 0, 1]]

// 示例 2：
// 输入：nums = []
// 输出：[]

// 示例 3：
// 输入：nums = [0]
// 输出：[]

// 提示：
// 0 <= nums.length <= 3000
// -105 <= nums[i] <= 105

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

const threeSum = function (nums) {
  const len = nums.length
  // 数组长度小于3则直接返回空数组
  if (len < 3) {
    return []
  }
  // 对数组进行排序
  nums.sort(function (a, b) { return a - b })
  // 定义一个空数组作为返回数组
  const returnArr = []
  for (let i = 0; i < len; i++) {
    // 如果元素大于0，则其后的元素也大于0，那么三数之和肯定大于0
    // 所以到此时就可以直接退出遍历了
    if (nums[i] > 0) {
      break
    }
    // 去除外层循环的重复值
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    // 记录右指针初始下标
    let third = len - 1
    // 记录外层循环下标对应的值，即三元组的第一个元素
    const oneNum = nums[i]
    for (let j = i + 1; j < len; j++) {
      // 去除左指针指向的重复值
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue
      }
      // 去除右指针指向的重复的值
      while (j < third && nums[j] + nums[third] > -oneNum) {
        third--
      }
      // 左右指针重合时，退出内层循环
      if (j === third) {
        break
      }
      // 将满足条件的三元组push到结果数组
      if (nums[j] + nums[third] === -oneNum) {
        returnArr.push([oneNum, nums[j], nums[third]])
      }
    }
  }
  return returnArr
}

console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]))
