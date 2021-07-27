// 415.字符串相加
// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

// 提示：
// num1 和num2 的长度都小于 5100
// num1 和num2 都只包含数字 0 - 9
// num1 和num2 都不包含任何前导零
// 你不能使用任何内建BigInteger库，也不能直接将输入的字符串转换为整数形式

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const addStrings = function (num1, num2) {
  let add = 0
  let i = num1.length - 1
  let j = num2.length - 1
  let str = ''
  // const arr = []
  // 从尾部开始遍历字符串
  // add表示是否有进位，即两数之和是否大于9
  while (i >= 0 || j >= 0 || add !== 0) {
    // 当i或者j小于0时，就有一个字符串已经遍历完了，此时需要给当前位置补0
    // 以便与另一个字符串对应下标的值进行计算
    const x = i < 0 ? 0 : num1[i] - '0'
    const y = j < 0 ? 0 : num2[j] - '0'
    str = (x + y + add) % 10 + str
    // arr.push((x + y + add) % 10 + '')
    add = parseInt((x + y + add) / 10)
    i--
    j--
  }
  // return arr.reverse().join()
  return str
}
console.log(addStrings('11', '123'))
