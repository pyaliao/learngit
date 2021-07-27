// 40. 组合总和II
// 给定一个数组candidates和一个目标数target，
// 找出candidates中所有可以使数字和为target 的组合。
// candidates中的每个数字在每个组合中只能使用一次。

// 说明：
// 所有数字（包括目标数）都是正整数。
// 解集不能包含重复的组合。

// 示例 1:
// 输入: candidates = [10, 1, 2, 7, 6, 1, 5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]

// 示例 2:
// 输入: candidates = [2, 5, 2, 1, 2], target = 5,
// 所求解集为:
// [
//   [1, 2, 2],
//   [5]
// ]
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function (candidates, target) {
  const ans = []
  const len = candidates.length
  candidates.sort((a, b) => { return a - b })
  const dfs = function (combine, target, index) {
    // 此处不需要判断数组是否遍历到结尾，因为最后一个元素的递归调用会使index越界，
    // 而代码需要继续向下执行，不能退出，特殊情况比如最后一个元素与target相等时，
    // 如果此处判断越界的话，会直接退出，而没有保存此数组到结果数组中，
    // 即没有执行下一步的程序
    if (target < 0) {
      return
    }
    // target小于等于0时，保存结果并退出
    if (target === 0) {
      ans.push(combine)
      return
    }
    for (let i = index; i < len; i++) {
      // 避免重复的子路径起点
      if (i > index && candidates[i] === candidates[i - 1]) {
        continue
      }
      // 不能对combine进行push操作之后再将combine传递给dfs，这样的话始终是在改同一个combine
      // 而每次递归的combine都是不同的，因此需要拼接出新的combine--[...combine, candidates[i]]
      dfs([...combine, candidates[i]], target - candidates[i], i + 1)
    }
  }
  dfs([], target, 0)
  return ans
}
console.log(combinationSum([10, 1, 2, 7, 6, 1, 5], 8))
