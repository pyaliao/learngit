// 66. 加一
// 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
// 最高位数字存放在数组的首位，数组中每个元素只存储单个数字。
// 你可以假设除了整数0之外，这个整数不会以零开头。

// 示例 1：
// 输入：digits = [1, 2, 3]
// 输出：[1, 2, 4]
// 解释：输入数组表示数字 123。

// 示例 2：
// 输入：digits = [4, 3, 2, 1]
// 输出：[4, 3, 2, 2]
// 解释：输入数组表示数字 4321。

// 示例 3：
// 输入：digits = [0]
// 输出：[1]

// 提示：
// 1 <= digits.length <= 100
// 0 <= digits[i] <= 9

/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = function (digits) {
  const len = digits.length
  let sum = 0
  let carry = 1
  for (let i = len - 1; i >= 0; i--) {
    sum = digits[i] + carry
    if (sum >= 10) {
      digits[i] = sum % 10
    } else {
      digits[i] = sum
      carry = 0
      break
    }
  }
  carry && digits.unshift(1)
  return digits
}

const digits = [9]
console.log(plusOne(digits))