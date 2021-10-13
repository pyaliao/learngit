// 56. 合并区间
// 以数组intervals表示若干个区间的集合，其中单个区间为intervals[i] = [starti, endi]。
// 请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

// 示例 1：
// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

// 示例 2：
// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

// 提示：
// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104

/**
 * 此思路暂时有问题，需要完善
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
  const n = intervals.length
  if (n <= 1) {
    return intervals
  }
  const arr = []
  for (let i = 1; i < n; i++) {
    const current = intervals[i]
    const prev = intervals[i - 1]
    const currentLen = current.length
    const prevLen = prev.length
    const arrLen = arr.length
    if (prev[prevLen - 1] >= current[0]) {
      if (arrLen > 0 && arr[arrLen - 1][arr[arrLen - 1].length - 1] >= prev[prevLen - 1]) {
        arr[arrLen - 1][arr[arrLen - 1].length - 1] = current[currentLen - 1]
      } else {
        const min = prev[0] < current[0] ? prev[0] : current[0]
        arr.push([min, current[currentLen - 1]])
      }
    } else {
      arr.push(prev, current)
    }
  }
  return arr
}
// const intervals = [[1,3],[2,6],[8,10],[15,18]]
const intervals = [
  [1, 4],
  [5, 6]
]
console.log(merge(intervals))
