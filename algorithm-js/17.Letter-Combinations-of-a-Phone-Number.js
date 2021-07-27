// 17. 电话号码的字母组合
// 给定一个仅包含数字2 - 9的字符串，返回所有它能表示的字母组合。
// 答案可以按 任意顺序返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意1不对应任何字母。

// 示例 1：
// 输入：digits = "23"
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]

// 示例 2：
// 输入：digits = ""
// 输出：[]

// 示例 3：
// 输入：digits = "2"
// 输出：["a", "b", "c"]

// 提示：
// 0 <= digits.length <= 4
// digits[i]是范围['2', '9']的一个数字。

/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
  const len = typeof digits === 'string' && digits.length
  if (len === 0) {
    return []
  }
  // 声明一个对象，存储数字与字符串的对应关系
  const letterNumber = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' }
  const res = []
  const arr = []
  // 将与输入数字对应的字符串存储到一个数组中备用
  for (const digit of digits) {
    arr.push(letterNumber[digit])
  }
  const backTrack = function (str, index) {
    // 递归出口，当深度与输入的数字个数一致时，将获取的str存储，并不再递归调用
    // 此时程序进入下一次循环
    if (index === len) {
      res.push(str)
    } else {
      for (const letter of arr[index]) {
        // 此处必须用一个新的变量传递到递归调用的函数中
        // 不能直接修改str的值，当下面的递归结束，回溯到此循环时，
        // str需要的是本层循环开始时的初始值，因此不能直接str += letter
        const tmp = str + letter
        backTrack(tmp, index + 1)
      }
    }
  }
  backTrack('', 0)
  return res
}

console.log(letterCombinations('234'))
