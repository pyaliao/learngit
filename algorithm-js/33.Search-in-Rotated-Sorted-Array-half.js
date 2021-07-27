// 33. 搜索旋转排序数组

// 整数数组nums按升序排列，数组中的值互不相同。
// 在传递给函数之前，nums在预先未知的某个下标（0 <= k < nums.length）
// 上进行了旋转，使数组变为[nums[k], nums[k + 1], ...,
// nums[n - 1], nums[0], nums[1], ..., nums[k - 1]]（下标 从 0 开始 计数）。
// 例如，[0, 1, 2, 4, 5, 6, 7] 在下标3处经旋转后可能变为[4, 5, 6, 7, 0, 1, 2]。
// 给你旋转后的数组nums和一个整数target，如果nums中存在这个目标值 target，
// 则返回它的下标，否则返回-1。

// 示例 1：
// 输入：nums = [4, 5, 6, 7, 0, 1, 2], target = 0
// 输出：4

// 示例 2：
// 输入：nums = [4, 5, 6, 7, 0, 1, 2], target = 3
// 输出：-1

// 示例 3：
// 输入：nums = [1], target = 0
// 输出：-1

// 提示：
// 1 <= nums.length <= 5000
// -10^4 <= nums[i] <= 10^4
// nums中的每个值都独一无二
// 题目数据保证nums在预先未知的某个下标上进行了旋转
// - 10^4 <= target <= 10^4

// 进阶：你可以设计一个时间复杂度为O(logn)的解决方案吗？
// 方法二、二分查找法
// 在常规二分查找的时候查看当前 mid 为分割位置分割出来的两个部分 [l, mid] 和 [mid + 1, r]
// 哪个部分是有序的，并根据有序的那个部分确定我们该如何改变二分查找的上下界，
// 因为我们能够根据有序的那部分判断出 target 在不在这个部分：
// 如果 [l, mid] 是有序数组，且 target 的大小满足 [nums[l],nums[mid])，
// 则我们应该将搜索范围缩小至 [l, mid - 1]，否则在 [mid + 1, r] 中寻找。
// 如果 [mid + 1, r] 是有序数组，且 target 的大小满足 [nums[mid+1],nums[r]]，
// 则我们应该将搜索范围缩小至 [mid + 1, r]，否则在 [l, mid - 1] 中寻找。

const search = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  let mid
  while (left <= right) {
    mid = parseInt((left + right) / 2)
    if (target === nums[mid]) {
      return mid
    }
    // 不能使用nums[left] < nums[mid - 1]，因为mid有可能不大于nums[left]，
    // 如此则左侧序列不为有序，而此处却会判断为有序
    if (nums[left] < nums[mid]) {
      if (target >= nums[left] && target <= nums[mid - 1]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      if (target >= nums[mid + 1] && target <= nums[right]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
}
console.log(search([2, 3, 4, 5, 6, 7, 8, 9, 1], 9))
