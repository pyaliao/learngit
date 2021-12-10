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

// 动态规划：自底向上
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = function (word1, word2) {
  // 边界条件dp[i][0] = i, dp[0][j] = j
  // dp[i][j]代表word1前i个字符组成的字符串与word2前j个字符组成的字符串之间的最短编辑距离
  const m = word1.length
  const n = word2.length
  const dp = new Array(m + 1).fill().map(item => new Array(n + 1).fill(0))
  // 处理边界条件
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 此处的i,j代表的是第i个或者第j个数，因此在取值时i及j下标得减一
      // word1[i - 1]  word2[j - 1]
      if (word1[i - 1] !== word2[j - 1]) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1] - 1) + 1
      }
    }
  }
  return dp[m][n]
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
