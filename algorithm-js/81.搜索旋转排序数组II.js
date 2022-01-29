// 81. 搜索旋转排序数组 II
// 已知存在一个按非降序排列的整数数组 nums ，数组中的值不必互不相同。
// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，
// 使数组变为[nums[k], nums[k + 1], ..., nums[n - 1], nums[0], nums[1], ..., nums[k - 1]]
// （下标 从 0 开始 计数）。
// 例如，[0, 1, 2, 4, 4, 4, 5, 6, 6, 7] 在下标 5 处经旋转后可能变为[4, 5, 6, 6, 7, 0, 1, 2, 4, 4] 。
// 给你 旋转后 的数组 nums 和一个整数 target ，请你编写一个函数来判断给定的目标值是否存在于数组中。
// 如果 nums 中存在这个目标值 target ，则返回 true ，否则返回 false 。
// 你必须尽可能减少整个操作步骤。

// 示例 1：
// 输入：nums = [2, 5, 6, 0, 0, 1, 2], target = 0
// 输出：true

// 示例 2：
// 输入：nums = [2, 5, 6, 0, 0, 1, 2], target = 3
// 输出：false

// 提示：
// 1 <= nums.length <= 5000
// - 104 <= nums[i] <= 104
// 题目数据保证 nums 在预先未知的某个下标上进行了旋转
// - 104 <= target <= 104

// 进阶：
// 这是 搜索旋转排序数组 的延伸题目，本题中的 nums  可能包含重复元素。
// 这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？

// 二分法：
// 整体思路是：在mid分割的两个数组中，一定有一个是有序的，
// 因此我们判断分割的两个数组是否有序，
// 1. 如果子数组1有序，则判断target是否在此有序子数组中，
//    如果存在，则更新left和right，继续进行二分查找，
//    如果不存在，则肯定在子数组2中，继续对子数组2进行二分查找
// 2. 如果子数组2有序，则同上步

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
const search = function (nums, target) {
  const n = nums.length
  let left = 0
  let right = n - 1
  while (left <= right) {
    const mid = left + parseInt((right - left) / 2)
    if (nums[mid] === target) {
      return true
    }
    // nums[left] === nums[mid] && nums[mid] === nums[right]一定要最先判断
    // 否则这种情况下会进入nums[left] <= nums[mid]判断，从而导致获取不到在left与mid之间的数
    // 比如[1, 0, 1, 1, 1] target=0时，此时nums[left] > target，导致left = mid + 1
    // 从而导致查找进入[mid+1, n-1]之间，而在这个区间内没有target=0存在
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++
      right--
    } else if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else { // if (nums[left] > nums[mid]) 此条件可以丢弃
      if (nums[mid] < target && target <= nums[n - 1]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return false
}

// const nums = [2, 5, 6, 0, 0, 1, 2]
// const target = 0
// const nums = [2, 5, 6, 0, 0, 1, 2]
// const target = 3
// const nums = [1, 0, 1, 1, 1]
// const target = 0
const nums = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]
const target = 2
console.log(search(nums, target))
