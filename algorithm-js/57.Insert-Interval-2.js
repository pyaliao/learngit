// 57. 插入区间
// 给你一个无重叠的 ，按照区间起始端点排序的区间列表。
// 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

// 示例 1：
// 输入：intervals = [[1, 3], [6, 9]], newInterval = [2, 5]
// 输出：[[1, 5], [6, 9]]

// 示例 2：
// 输入：intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]
// 输出：[[1, 2], [3, 10], [12, 16]]
// 解释：这是因为新的区间[4, 8] 与[3, 5], [6, 7], [8, 10] 重叠。

// 示例 3：
// 输入：intervals = [], newInterval = [5, 7]
// 输出：[[5, 7]]

// 示例 4：
// 输入：intervals = [[1, 5]], newInterval = [2, 3]
// 输出：[[1, 5]]

// 示例 5：
// 输入：intervals = [[1, 5]], newInterval = [2, 7]
// 输出：[[1, 7]]

// 提示：
// 0 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= intervals[i][0] <= intervals[i][1] <= 105
// intervals根据intervals[i][0]按升序排列
// newInterval.length == 2
// 0 <= newInterval[0] <= newInterval[1] <= 105

// 思路：
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

const insert = function (intervals, newInterval) {
  const n = intervals.length
  let left = newInterval[0]
  let right = newInterval[1]
  let placed = false
  const ans = []
  for (let i = 0; i < n; i++) {
    if (intervals[i][0] > right) {
      // 如果要插入的区间在迭代的区间左侧（第一次出现），则说明后续迭代区间
      // 都在待插入区间右侧，因此，将待插入区间插入，并将placed置为true
      if (!placed) {
        // 此处也是直接使用left和right
        ans.push([left, right])
        placed = true
      }
      ans.push(intervals[i])
    } else if (intervals[i][1] < left) {
      ans.push(intervals[i])
    } else {
      // 此处一定要用left和right求值，因为要插入的区间的左右边界
      // 随着区间合并发生了变化
      left = Math.min(intervals[i][0], left)
      right = Math.max(intervals[i][1], right)
    }
  }
  // 如果遍历结束都没有出现在待插入区间右侧的迭代区间
  // 则将待插入区间添加到数组末尾即可
  if (!placed) {
    ans.push([left, right])
  }
  return ans
}
