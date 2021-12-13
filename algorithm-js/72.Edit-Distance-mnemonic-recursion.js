// 72. 编辑距离
// 给你两个单词word1和word2，请你计算出将word1转换成word2所使用的最少操作数。
// 你可以对一个单词进行如下三种操作：
// 插入一个字符
// 删除一个字符
// 替换一个字符

// 示例 1：
// 输入：word1 = "horse", word2 = "ros"

// 输出：3
// 解释：
// horse -> rorse(将 'h' 替换为 'r')
// rorse -> rose(删除 'r')
// rose -> ros(删除 'e')

// 示例 2：
// 输入：word1 = "intention", word2 = "execution"
// 输出：5
// 解释：
// intention -> inention(删除 't')
// inention -> enention(将 'i' 替换为 'e')
// enention -> exention(将 'n' 替换为 'x')
// exention -> exection(将 'n' 替换为 'c')
// exection -> execution(插入 'u')

// 提示：
// 0 <= word1.length, word2.length <= 500
// word1 和 word2 由小写英文字母组成

// 递归：自顶向下
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const dfs = function (word1, m, word2, n, memo) {
  // 剪枝操作（记忆化的作用）
  if (memo[m][n] !== -1) {
    return memo[m][n]
  }
  // 处理word1为空或者word2为空或者两者都为空的情况
  // 这也是递归出口
  if (m === 0 || n === 0) {
    memo[m][n] = Math.max(m, n)
    return memo[m][n]
  }
  if (word1[m - 1] === word2[n - 1]) {
    memo[m - 1][n - 1] = dfs(word1.substring(0, m - 1), m - 1, word2.substring(0, n - 1), n - 1, memo)
    return memo[m - 1][n - 1]
  }
  memo[m][n - 1] = dfs(word1.substring(0), m, word2.substring(0, n - 1), n - 1, memo)
  memo[m - 1][n] = dfs(word1.substring(0, m - 1), m - 1, word2.substring(0), n, memo)
  memo[m - 1][n - 1] = dfs(word1.substring(0, m - 1), m - 1, word2.substring(0, n - 1), n - 1, memo)
  return Math.min(memo[m][n - 1], memo[m - 1][n], memo[m - 1][n - 1]) + 1
}
const minDistance = function (word1, word2) {
  const m = word1.length
  const n = word2.length
  const memo = new Array(m + 1).fill().map(item => new Array(n + 1).fill(-1))
  return dfs(word1, m, word2, n, memo)
}
// 测试数据1
// const word1 = 'horse'
// const word2 = 'ros'

// 测试数据2
// const word1 = 'intention'
// const word2 = 'execution'

// 测试数据3
const word1 = 'dinitrophenylhydrazine'
const word2 = 'benzalphenylhydrazone'
console.log(minDistance(word1, word2))
