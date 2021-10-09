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

// 思路：暴力解法
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const insert = function (intervals, newInterval) {
  const n = intervals.length
  if (n <= 0) {
    intervals.push(newInterval)
    return intervals
  }
  for (let i = 0; i < n; i++) {
    if (newInterval[1] < intervals[i][0]) {
      intervals.splice(i, 0, newInterval)
      break
    } else if (newInterval[1] === intervals[i][0]) {
      intervals[i][0] = newInterval[0]
      break
    } else {
      if (newInterval[0] > intervals[i][1]) {
        intervals.splice(i + 1, 0, newInterval)
        break
      } else if (newInterval[0] === intervals[i][1]) {
        intervals[i][1] = newInterval[1]
        break
      } else {
        if (newInterval[0] < intervals[i][0]) {
          intervals[i][0] = newInterval[0]
        }
        if (newInterval[1] > intervals[i][1]) {
          intervals[i][1] = newInterval[1]
        }
        break
      }
    }
  }
  for (let i = 0; i < intervals.length - 1;) {
    console.log(i)
    if (intervals[i][1] >= intervals[i + 1][0]) {
      if (intervals[i + 1][1] === intervals[i][0]) {
        intervals[i][0] = intervals[i + 1][0]
        intervals.splice(i + 1, 1)
      } else if (intervals[i + 1][1] > intervals[i][0]) {
        if (intervals[i + 1][0] < intervals[i][0]) {
          intervals[i][0] = intervals[i + 1][0]
        }
        if (intervals[i + 1][1] > intervals[i][1]) {
          intervals[i][1] = intervals[i + 1][1]
        }
        intervals.splice(i + 1, 1)
      } else {
        const tempCurrent = intervals[i]
        const tempNext = intervals[i + 1]
        intervals.splice(i, 2, tempNext, tempCurrent)
        i++
      }
    } else {
      i++
    }
  }
  return intervals.sort((intervalA, intervalB) => { return intervalA[0] - intervalB[0] })
}
// 测试组1
// const intervals = [[1, 3], [6, 9]]
// const newInterval = [2, 5]
// 测试组2
// const intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]]
// const newInterval = [4, 8]
// 测试组3
// const intervals = []
// const newInterval = [5, 7]
// 测试组4
// const intervals = [[1, 5]]
// const newInterval = [2, 3]
// 测试组5
// const intervals = [[1, 5]]
// const newInterval = [2, 7]
// 测试组6
const intervals = [[2, 6], [7, 9]]
const newInterval = [15, 18]
console.log(insert(intervals, newInterval))
