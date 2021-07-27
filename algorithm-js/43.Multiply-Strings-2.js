// 43.字符串相乘
// 给定两个以字符串形式表示的非负整数num1和num2，
// 返回num1和num2的乘积，它们的乘积也表示为字符串形式。

// 示例1:
// 输入: num1 = "2", num2 = "3"
// 输出: "6"

// 示例2:
// 输入: num1 = "123", num2 = "456"
// 输出: "56088"

// 说明：
// num1和num2的长度小于110。
// num1和num2只包含数字0 - 9。
// num1和num2均不以零开头，除非是数字0本身。
// 不能使用任何标准库的大数类型（比如BigInteger）或直接将输入转换为整数来处理。

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

const multiply = function (num1, num2) {
  // 如果有一个数字为0，则直接返回0
  if (num1 === '0' || num2 === '0') {
    return '0'
  }
  const m = num1.length
  const n = num2.length
  // 乘积值初始化为'0'
  const product = new Array(m + n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    // 每次相乘的进位值
    const x = num2[i] - '0'
    for (let j = m - 1; j >= 0; j--) {
      const y = num1[j] - '0'
      // 将乘积值累加到对应下标位置，因为不同的i与j也可组合成相同的下标值
      // 因此，此处是累加
      product[i + j + 1] += x * y
    }
  }
  // 数组中i + j + 1存储的是对应位置j和i存储的数字相乘的结果
  // 此循环处理乘积的进位问题，如果两数之积大于10，则将其进位值求出并累加到数组前一位
  // 并为当前值求余，将其重置为余数
  for (let k = m + n - 1; k > 0; k--) {
    product[k - 1] += parseInt(product[k] / 10)
    product[k] = product[k] % 10
  }
  // 如果数组首元素为为0，则说明没有进位，删除数组首元素（数组元素默认初始化为0）
  if (!product[0]) {
    product.shift()
  }
  return product.join('')
}
console.log(multiply('123456789', '987654321'))
