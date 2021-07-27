// 29. 两数相除
// 给定两个整数，被除数dividend和除数divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
// 返回被除数dividend除以除数divisor得到的商。
// 整数除法的结果应当截去（truncate）其小数部分，
// 例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
/*******示例*******/
// 示例-1:
// 输入: dividend = 10, divisor = 3
// 输出: 3
// 解释: 10 / 3 = truncate(3.33333..) = truncate(3) = 3
// 示例-2:
// 输入: dividend = 7, divisor = -3
// 输出: -2
// 解释: 7 / -3 = truncate(-2.33333..) = -2
/*******提示*******/
// 提示：
// 被除数和除数均为32位有符号整数。
// 除数不为0。
// 假设我们的环境只能存储 32 位有符号整数，其数值范围是[−2^31, 2^31 − 1]。
// 本题中，如果除法结果溢出，则返回 2^31 − 1。

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
const div = function (dividend, divisor) {
  if (dividend < divisor) {
    return 0
  }
  const divisorBak = divisor
  let quotient = 1
  while (dividend >= divisor + divisor) {
    divisor = divisor + divisor
    quotient = quotient + quotient
  }
  return quotient + div(dividend - divisor, divisorBak)
}

const divide = function (dividend, divisor) {
  // const INT_MIN = -Math.pow(2, 31)
  const INT_MAX = Math.pow(2, 31) - 1
  if (dividend === 0) {
    if (divisor === 0) {
      return NaN
    } else {
      return 0
    }
  } else {
    if (divisor === 0 && dividend > 0) {
      return Infinity
    } else if (divisor === 0 && dividend < 0) {
      return -Infinity
    }
  }

  let sign = 1
  if ((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) {
    sign = -1
  }
  // 此处不截取，在最终返回时判断（因为INT_MIN取负值后会移除）
  dividend = dividend > 0 ? dividend : -dividend
  divisor = divisor > 0 ? divisor : -divisor
  const ret = div(dividend, divisor)
  if (sign > 0) {
    return ret > INT_MAX ? INT_MAX : ret
  }
  return -ret
}
