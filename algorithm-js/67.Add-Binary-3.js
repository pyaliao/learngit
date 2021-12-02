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

// 位运算解法
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = function (a, b) {
  a = parseInt(a, 2)
  b = parseInt(b, 2)
  let temp, carry
  while (b) {
    temp = a ^ b
    carry = (a & b) << 1
    a = temp
    b = carry
  }
  return a.toString(2)
}
// 如果最终十进制数值大于js限制的最大数值时，转二进制转会得到错误的结果
const a = '11'
const b = '1'
console.log(addBinary(a, b))
