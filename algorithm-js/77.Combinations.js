// 给定两个整数 n 和 k，返回范围[1, n] 中所有可能的 k 个数的组合。
// 你可以按 任何顺序 返回答案。

// 示例 1：
// 输入：n = 4, k = 2
// 输出：
// [
//   [2, 4],
//   [3, 4],
//   [2, 3],
//   [1, 2],
//   [1, 3],
//   [1, 4],
// ]

// 示例 2：
// 输入：n = 1, k = 1
// 输出：[[1]]

// 提示：
// 1 <= n <= 20
// 1 <= k <= n

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */

const combine = function (n, k) {
  const ans = []
  const tmp = []
  const dfs = function (cur, n, k, tmp) {
    // 剪枝操作：长度加上区间[cur, n]的长度小于k，不可能构造出长度为k的tmp
    if (tmp.length + (n - cur + 1) < k) {
      return
    }
    // 当tmp长度达到k时，记录符合条件的组合
    if (tmp.length === k) {
      ans.push(tmp)
      return
    }
    // 选择当前位置
    // 将当前位置元素加入tmp，等调用结束，在将其弹出，将tmp恢复
    // 此处使用的是数组扩展语法，将一个新数组传给dfs，因此，tmp没有变，
    // 后面的dfs调用中直接使用tmp即可
    dfs(cur + 1, n, k, [...tmp, cur])
    // 不选择当前位置
    dfs(cur + 1, n, k, tmp)
  }
  dfs(1, n, k, tmp)
  return ans
}

// 测试数据
const n = 4
const k = 2
console.log(combine(n, k))
