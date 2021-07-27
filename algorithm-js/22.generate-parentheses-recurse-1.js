// 22. 括号生成
// 数字n代表生成括号的对数，请你设计一个函数，
// 用于能够生成所有可能的并且有效的括号组合。

// 示例 1：
// 输入：n = 3
// 输出：["((()))", "(()())", "(())()", "()(())", "()()()"]

// 示例 2：
// 输入：n = 1
// 输出：["()"]

// 提示：
// 1 <= n <= 8

/**
 * @param {number} n
 * @return {string[]}
 */
// 暴力解法 -- 递归的生成所有可能的括号组合，然后取出其中无效的组合即可

// isValid函数 -- 判断字符串是否合法
const isValid = function (str) {
  // 因为在有效字符串的任何位置，左括号的数量总是大于等于右括号的数量
  // 因此，设count为左括号与右括号之差，则count >= 0说明是有效字符串
  // 否则是无效的
  let count = 0
  const len = str.length
  for (let i = 0; i < len; i++) {
    // 如果count < 0，说明字符串无效，直接返回
    if (count < 0) {
      return false
    }
    // 如果字符是左括号，则count加1
    if (str[i] === '(') {
      count++
    } else {
      // 如果字符是右括号，则count减1
      count--
    }
  }
  // 如果遍历结束之后，count不为0，这说明字符串无效
  // 否则有效
  return count === 0
}
// generateParenthesisRecurse函数 -- 递归的生成括号字符串组合
const generateParenthesisRecurse = function (str, n, strArr) {
  // 递归出口
  if (str.length === n) {
    // 当字符串长度达到2n时，就到达了递归出口，不能再继续递归了，必须退出函数
    // 在退出之前，可以判断其是否有效，
    // 有效则将其加入数组中，无效则不加入数组
    if (isValid(str)) {
      strArr.push(str)
    }
    return
  }
  // 如果长度没有达到，则继续递归调用
  generateParenthesisRecurse(str + '(', n, strArr)
  generateParenthesisRecurse(str + ')', n, strArr)
}
// generateParenthesis函数 -- 生成并返回有效的括号组合
const generateParenthesis = function (n) {
  const strArr = []
  const str = ''
  // n对括号组成的字符串长度为2n
  generateParenthesisRecurse(str, 2 * n, strArr)
  return strArr
}
console.log(generateParenthesis(4))
