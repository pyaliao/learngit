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
// (a)b -- 有效的组合必定以一个左括号开始，也必定有一个右括号与之对应，
// 那么在左右括号之间，可能有也可能没有有效组合，其后必然也是同样的情况，
// 这两种情况又是当前问题的子问题，可以递归处理
const generateParenthesisRecurse = function (n, cache) {
  // 如果已经保存过，则直接返回
  if (cache[n]) {
    return cache[n]
  }
  // 递归出口 当n为0时，只有一种组合：一个空字符串，将其放入数组内返回
  if (n === 0) {
    return ['']
  }
  const strArr = []
  for (let i = 0; i < n; i++) {
    // 计算出各种i值时，可能的有效组合
    const leftArr = generateParenthesisRecurse(i, cache)
    // 计算右括号后面可能的各种组合
    const rightArr = generateParenthesisRecurse(n - i - 1, cache)
    const leftArrLen = leftArr.length
    const rightArrLen = rightArr.length
    // 遍历这些组合，将其与左右括号拼接成最终的组合
    for (let j = 0; j < leftArrLen; j++) {
      for (let k = 0; k < rightArrLen; k++) {
        strArr.push('(' + leftArr[j] + ')' + rightArr[k])
      }
    }
  }
  // 将当前n计算出来的所有有效组合存储在缓存数组中
  cache[n] = strArr
  return strArr
}
const generateParenthesis = function () {
  const cache = []
  return generateParenthesisRecurse(3, cache)
}
console.log(generateParenthesis(3))
