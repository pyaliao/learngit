// 给定一个无重复元素的数组candidates和一个目标数target，
// 找出candidates中所有可以使数字和为target的组合。
// candidates中的数字可以无限制重复被选取。

// 说明：
// 所有数字（包括target）都是正整数。
// 解集不能包含重复的组合。

// 示例 1：
// 输入：candidates = [2, 3, 6, 7], target = 7,
//   所求解集为：
// [
//   [7],
//   [2, 2, 3]
// ]

// 示例 2：
// 输入：candidates = [2, 3, 5], target = 8,
//   所求解集为：
// [
//   [2, 2, 2, 2],
//   [2, 3, 3],
//   [3, 5]
// ]

// 提示：
// 1 <= candidates.length <= 30
// 1 <= candidates[i] <= 200
// candidate 中的每个元素都是独一无二的。
// 1 <= target <= 500

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function (candidates, target) {
  const ans = []
  const dfs = function (combine, target, index) {
    // 当递归完整个数组，或者target为0时就直接退出
    if (index === candidates.length || target < 0) {
      return
    }
    // target小于等于0时，保存结果并退出
    if (target === 0) {
      ans.push(combine)
      return
    }
    // 回溯回来之后，判断target-candidates[index]是否大于等于0，是则继续对子节点递归
    // 此时target为target-candidates[index]，并将candidates[index]保存到combine
    // index不变
    if (target - candidates[index] >= 0) {
      // 不能对combine进行push操作之后再将combine传递给dfs，这样的话始终是在改同一个combine
      // 而每次递归的combine都是不同的，因此需要拼接出新的combine--[...combine, candidates[i]]
      dfs([...combine, candidates[index]], target - candidates[index], index)
    }
    // 继续递归搜索下一个位置
    dfs(combine, target, index + 1)
  }
  dfs([], target, 0)
  return ans
}
console.log(combinationSum([2, 3, 5], 8))
