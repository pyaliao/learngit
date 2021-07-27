// 32. 最长有效括号
// 给你一个只包含 '(' 和 ')' 的字符串，
// 找出最长有效（格式正确且连续）括号子串的长度。

// 示例 1：
// 输入：s = "(()"
// 输出：2
// 解释：最长有效括号子串是 "()"

// 示例 2：
// 输入：s = ")()())"
// 输出：4
// 解释：最长有效括号子串是 "()()"

// 示例 3：
// 输入：s = ""
// 输出：0

// 提示：
// 0 <= s.length <= 3 * 104
// s[i] 为 '(' 或 ')'

// 算法思路：
// 遍历字符串，用两个计数器left和right分别计算左右括号的数目
// 如果当前字符是左括号则left自增，如果当前字符是右括号则right自增
// 随后在此次循环判断left与right的大小，如果left=right则计算当前
// 有效字符串的长度，并更新最大有效字符串的长度
// 如果right > left，则说明right及right之前的子字符串不符合
// 此时将left与right置为0，然后继续进行下一次循环

// 上面的算法考虑了以当前字符下标结尾的有效括号长度，每次当右括号数量
// 多于左括号数量的时候，之前的字符我们都扔掉不考虑，重新从下一个字符
// 开始计算，但这样会漏掉一种情况，就是遍历的时候左括号的数量始终大于
// 右括号的数量，即((())，这种情况的最长有效括号是求不出来的
// 因为left>right始终成立，而我们没有对这种情况做处理
// 解决的方法就是，我们只需从右往左遍历并计数，然后判断left与right的大小
// 当left=right时，计算当前有效字符串的长度，并更新最长有效字符串的长度
// 当left > right时，将left和right置为0
const longestValidParentheses = function (s) {
  let left = 0
  let right = 0
  let maxLen = 0
  const len = s.length
  for (let i = 0; i < len; i++) {
    if (s[i] === '(') {
      left++
    } else if (s[i] === ')') {
      right++
    }
    if (left === right) {
      maxLen = Math.max(maxLen, right * 2)
    } else if (right > left) {
      left = right = 0
    }
  }
  left = right = 0
  for (let i = len - 1; i >= 0; i--) {
    if (s[i] === '(') {
      left++
    } else if (s[i] === ')') {
      right++
    }
    if (left === right) {
      maxLen = Math.max(maxLen, right * 2)
    } else if (left > right) {
      left = right = 0
    }
  }
  return maxLen
}

// 测试数据
const strs = '()(())'
const strs1 = '(()'
const strs2 = ')()())'

console.log(longestValidParentheses(strs))
console.log(longestValidParentheses(strs1))
console.log(longestValidParentheses(strs2))
