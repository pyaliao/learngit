// 60. 排列序列
// 给出集合[1, 2, 3,...,n]，其所有元素共有 n! 种排列。
// 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// 给定 n 和 k，返回第 k 个排列。

// 示例 1：
// 输入：n = 3, k = 3
// 输出："213"

// 示例 2：
// 输入：n = 4, k = 9
// 输出："2314"

// 示例 3：
// 输入：n = 3, k = 1
// 输出："123"

// 提示：
// 1 <= n <= 9
// 1 <= k <= n!

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const getPermutation = function (n, k) {
  // 定义一个数组，存储阶乘值，下标i对应i的阶乘
  const factorial = [1]
  const valid = []
  let ans = ''
  for (let i = 1; i < n; i++) {
    factorial[i] = factorial[i - 1] * i
  }
  // console.log(factorial)
  for (let i = 0; i <= n; i++) {
    valid.push(1)
  }
  --k
  for (let i = 1; i <= n; i++) {
    // 获取以第i个元素ai的第k个排列，此时获取的order表示ai剩余元素中第order小的元素
    let order = Math.floor(k / factorial[n - i]) + 1
    for (let j = 1; j <= n; j++) {
      // valid数组第j个元素表示整个排列中第j小的元素是否被前面的排列使用
      order -= valid[j]
      if (order === 0) {
        ans += j
        valid[j] = 0
        break
      }
    }
    k %= factorial[n - i]
  }
  return ans
}
const n = 10
const k = 4
console.log(n, k, getPermutation(n, k))
