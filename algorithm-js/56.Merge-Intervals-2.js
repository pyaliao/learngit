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

// 算法思路：
// 如果我们按照区间的左端点排序，那么在排完序的列表中，可以合并的区间一定是连续的。
// 我们用数组 merged 存储最终的答案。
// 首先，我们将列表中的区间按照左端点升序排序。
// 然后我们将第一个区间加入 merged 数组中，并按顺序依次考虑之后的每个区间：
// 如果当前区间的左端点在数组 merged 中最后一个区间的右端点之后，那么它们不会重合，
// 我们可以直接将这个区间加入数组 merged 的末尾；
// 否则，它们重合，我们需要用当前区间的右端点更新数组 merged 中最后一个区间的右端点，将其置为二者的较大值。

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
  const merged = []
  const n = intervals.length
  intervals.sort((a, b) => {
    return a[0] - b[0]
  })
  merged.push(intervals[0])
  for (let i = 1; i < n; i++) {
    const lastMergedInterval = merged[merged.length - 1]
    const currentInterval = intervals[i]
    if (currentInterval[0] > lastMergedInterval[lastMergedInterval.length - 1]) {
      merged.push(currentInterval)
    } else {
      const max = lastMergedInterval[lastMergedInterval.length - 1] > currentInterval[currentInterval.length - 1] ? lastMergedInterval[lastMergedInterval.length - 1] : currentInterval[currentInterval.length - 1]
      const min = lastMergedInterval[0]
      merged.pop()
      merged.push([min, max])
    }
  }
  return merged
}
const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
// const intervals = [
//   [1, 4],
//   [5, 6]
// ]
console.log(merge(intervals))
