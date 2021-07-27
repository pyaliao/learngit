// 20. 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

// 示例 1：
// 输入：s = "()"
// 输出：true

// 示例 2：
// 输入：s = "()[]{}"
// 输出：true

// 示例 3：
// 输入：s = "(]"
// 输出：false

// 示例 4：
// 输入：s = "([)]"
// 输出：false

// 示例 5：
// 输入：s = "{[]}"
// 输出：true

// 提示：
// 1 <= s.length <= 104
// s 仅由括号 '()[]{}' 组成

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  // 如果为奇数，则肯定不满足条件
  if (s.length % 2 !== 0) {
    return false
  }
  // 初始化一个map
  const map = new Map([
    [')', '('],
    ['}', '{'],
    [']', '[']
  ])
  const stack = []
  const len = s.length
  for (let i = 0; i < len; i++) {
    // 如果字符在map中存在，即作为map的键存在，则说明遍历到的是右括号
    // 此时，需要判断其前一个元素（即栈顶的元素）是否是对应的左括号
    // 是则将栈顶元素出栈，否则则返回false，即不匹配
    if (map.has(s[i])) {
      // 栈为空或者栈顶元素与右括号对应的左括号不同则表示不匹配
      if (!stack.length || stack[stack.length - 1] !== map.get(s[i])) {
        return false
      } else {
      // 当前元素匹配，则进行下一次循环
        stack.pop()
      }
    } else {
      // 如果字符不在map中存在，这说明是左括号，将其入栈即可
      stack.push(s[i])
    }
  }
  return !stack.length
}
console.log(isValid("){"))
