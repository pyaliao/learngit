// 18. 四数之和
// 给定一个包含n个整数的数组nums和一个目标值target，
// 判断nums中是否存在四个元素 a，b，c 和 d，
// 使得a + b + c + d的值与target相等。
// 找出所有满足条件且不重复的四元组。
// 注意：答案中不可以包含重复的四元组。

// 示例 1：
// 输入：nums = [1, 0, -1, 0, -2, 2], target = 0
// 输出：[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]

// 示例 2：
// 输入：nums = [], target = 0
// 输出：[]

// 提示：
// 0 <= nums.length <= 200
// -109 <= nums[i]  <= 109
// -109 <= target   <= 109

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const fourSum = function (nums, target) {
  const len = nums.length
  if (len < 4) {
    return []
  }
  nums.sort((x, y) => { return x - y })
  const results = []
  for (let i = 0; i < len; i++) {
    // 必须判断i > 0，从第二个数开始判断是否和前一个数重复
    if (i > 0 && nums[i - 1] === nums[i]) {
      continue
    }
    // 剪枝操作
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break
    }
    // 剪枝操作
    if (nums[i] + nums[len - 3] + nums[len - 2] + nums[len - 1] < target) {
      continue
    }
    for (let j = i + 1; j < len; j++) {
      // 必须判断j > i + 1，从第二个数开始判断是否和前一个数重复
      if (j > i + 1 && nums[j - 1] === nums[j]) {
        continue
      }
      // 剪枝操作
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
        break
      }
      // 剪枝操作
      if (nums[i] + nums[j] + nums[len - 2] + nums[len - 1] < target) {
        continue
      }
      let head = j + 1
      let tail = len - 1
      while (head < tail) {
        // 必须判断head > j + 1，从第二个数开始判断是否和前一个数重复
        if (head > j + 1 && nums[head - 1] === nums[head]) {
          head++
          continue
        }
        if (nums[tail + 1] === nums[tail]) {
          tail--
          continue
        }
        if (nums[i] + nums[j] + nums[head] + nums[tail] === target) {
          // 存储符合条件的四元组到结果数组
          results.push([nums[i], nums[j], nums[head], nums[tail]])
          // 将头指针右移，尾指针左移
          head++
          tail--
        } else if (nums[i] + nums[j] + nums[head] + nums[tail] > target) {
          tail--
        } else {
          head++
        }
      }
    }
  }
  return results
}

// const nums = [-2, -1, -1, 1, 1, 2, 2]
// const nums = [1, 0, -1, 0, -2, 2]
const nums = [1, -2, -5, -4, -3, 3, 3, 5, 7]
nums.sort((x, y) => { return x - y })
const target = -11
console.log(nums, '\n', fourSum(nums, target))
