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
// 将栈底元素始终维护为当前已经遍历过的元素中“最后一个没有被匹配的右括号的下标”
// 栈里其他元素维护左括号的下标
// 遍历字符串，如果是左括号，则将其入栈
// 如果是右括号，则将栈顶元素出栈，出栈之后，
// 如果当前栈为空，说明当前右括号为没有被匹配的右括号，则将其下标更新为栈底元素
// 即最后一个没有被匹配的右括号的下标
// 如果当前栈不为空，则当前右括号的下标减去栈顶元素即为“以该右括号为结尾的有效字符串的长度”
// 然后更新到目前为止“最长有效字符串的长度”
const longestValidParentheses = function (s) {
  const stack = []
  const len = s.length
  const left = '('
  const right = ')'
  let max = 0
  stack.push(-1)
  for (let i = 0; i < len; i++) {
    if (s[i] === left) {
      stack.push(i)
    } else if (s[i] === right) {
      stack.pop()
      if (stack.length > 0) {
        max = Math.max(max, i - stack[stack.length - 1])
      } else if (stack.length === 0) {
        stack.push(i)
      }
    }
  }
  return max
}

// 测试数据
const strs = '()(())'
const strs1 = '(()'
const strs2 = ')()())'

console.log(longestValidParentheses(strs))
console.log(longestValidParentheses(strs1))
console.log(longestValidParentheses(strs2))
