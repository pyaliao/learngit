// 55. 跳跃游戏
// 给定一个非负整数数组nums，你最初位于数组的第一个下标。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标。

// 示例 1：
// 输入：nums = [2, 3, 1, 1, 4]
// 输出：true
// 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。

// 示例 2：
// 输入：nums = [3, 2, 1, 0, 4]
// 输出：false
// 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。

// 提示：
// 1 <= nums.length <= 3 * 10^4
// 0 <= nums[i] <= 10^5

// 我们可以用贪心的方法解决这个问题。
// 如果某一个作为 起跳点 的格子可以跳跃的距离是 3，那么表示后面 3 个格子都可以作为 起跳点
// 可以对每一个能作为 起跳点 的格子都尝试跳一次，把 能跳到最远的距离 不断更新
// 如果可以一直跳到最后，就成功了

// 复杂度分析
// 时间复杂度：O(n)，其中 n 为数组的大小。只需要访问 nums 数组一遍，共 n 个位置。
// 空间复杂度：O(1)，不需要额外的空间开销。

/**
 * @param {number[]} nums
 * @return {boolean}
 */

 const canJump = function (nums) {
    const len = nums.length
    let maxPosition = 0
    for (let i = 0; i < len; i++) {
        if (i > maxPosition) {
            return false
        }
        maxPosition = Math.max(maxPosition, i + nums[i])
    }
    return true
  }
  console.log(canJump([3, 2, 1, 0, 0]))