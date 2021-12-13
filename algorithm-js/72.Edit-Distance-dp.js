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

// 思路：要将word1经过三种操作转换为word2，此三种操作时增、删、改（替换）
// 分两种情况讨论：
// 1. 当word1[i]==word2[j]的时候，将word1[0...i]转换为word2[0...j]需要的操作数
// 就与将word1[0...i-1]转换为word2[0...j-1]的操作数相同
// 2. 当word1[i]!=word2[j]的时候，将Word1[0...i]转换为word2[0...j]需要的操作数
// 可以根据我们可以对word1进行的三种操作分为三种情况讨论：
// 2.1 当进行插入操作时，即当将word2[j]插入word1[0...i]末尾时，word1变为word1[0...i,word2[j]]
//     此时word1与Word2尾部元素相同，只需要求出word1[0...i]到word2[0...j-1]操作数即可
// 2.2 当进行删除操作时，将word1末尾元素删除，然后求word1[0...i-1]到word2[0...j]的操作数即可
// 2.3 当进行替换操作时，将word1末尾元素替换为与Word2末尾元素相同，然后求word1[0...i-1]到word2[0...j-1]的操作数即可
// 最终实现可以使用自底向上的动态规划，或者自顶向下的递归，
// 动态规划可以优化空间复杂度，递归可以通过记忆化递归优化时间复杂度

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
        dp[i][j] = dp[i - 1][j - 1]
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
