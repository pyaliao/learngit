// 16. 最接近的三数之和
// 给定一个包括n个整数的数组nums和一个目标值target。
// 找出nums中的三个整数，使得它们的和与target最接近。
// 返回这三个数的和。假定每组输入只存在唯一答案。

// 示例：
// 输入：nums = [-1, 2, 1, -4], target = 1
// 输出：2
// 解释：与target最接近的和是2，(-1 + 2 + 1 = 2)

// 提示：

// 3 <= nums.length <= 10^3
// -10^3 <= nums[i] <= 10^3
// -10^4 <= target  <= 10^4

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

const threeSumClosest = function (nums, target) {
  const len = nums.length
  nums.sort((a, b) => { return a - b })
  let best = Infinity
  for (let i = 0; i < len; i++) {
    // 去除首层循环重复的元素
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    let tail = len - 1
    let head = i + 1
    while (head < tail) {
      // 求和
      const sum = nums[i] + nums[head] + nums[tail]
      // 更新三元素之和
      if (Math.abs(sum - target) < Math.abs(best - target)) {
        best = sum
      }
      if (sum > target) {
        // 右指针左移1
        tail--
        // 左指针去重
        while (nums[tail] === nums[tail + 1]) {
          tail--
        }
      } else if (sum < target) {
        // 左指针右移
        head++
        // 右指针去重
        while (nums[head] === nums[head - 1]) {
          head++
        }
      } else {
        // sum与target相等时，直接返回target
        return target
      }
    }
  }
  return best
}
console.log(threeSumClosest([-1, 2, 1, -4], 1))
