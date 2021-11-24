// 67. 二进制求和
// 给你两个二进制字符串，返回它们的和（用二进制表示）。
// 输入为非空字符串且只包含数字1和0。

// 示例 1:
// 输入: a = "11", b = "1"
// 输出: "100"

// 示例 2:
// 输入: a = "1010", b = "1011"
// 输出: "10101"

// 提示：
// 每个字符串仅由字符 '0' 或 '1' 组成。
// 1 <= a.length, b.length <= 10 ^ 4
// 字符串如果不是 "0" ，就都不含前导零。

// 纯字符串拼接，比较消耗性能
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = function (a, b) {
  let resultStr = ''
  // 处理较短数组，将其前面填充0至与较长数组长度一致
  if (a.length > b.length) {
    b = b.padStart(a.length, '0')
  } else {
    a = a.padStart(b.length, '0')
  }
  console.log(a, b)
  const len = a.length
  let carry = 0
  let sum = 0
  for (let i = len - 1; i >= 0; i--) {
    sum = parseInt(a[i]) + parseInt(b[i]) + carry
    if (sum >= 2) {
      resultStr = sum % 2 + resultStr
      carry = 1
    } else {
      resultStr = sum + resultStr
      carry = 0
    }
    console.log(resultStr)
  }
  carry && (resultStr = '1' + resultStr)
  return resultStr
}
const a = '11'
const b = '1'
console.log(addBinary(a, b))
