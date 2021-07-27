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
const multiply = function (num1, num2) {
  // 如果有一个数字为0，则直接返回0
  if (num1 === '0' || num2 === '0') {
    return '0'
  }
  const len1 = num1.length
  const len2 = num2.length
  // 乘积值初始化为'0'
  let product = '0'
  for (let i = len2 - 1; i >= 0; i--) {
    let tempStr = ''
    // 每次相乘的进位值
    let add = 0
    const y = num2[i] - '0'
    // 每次循环相乘之前，先给出相应的结尾0
    // 下面的计算只是单纯计算第二个数的每一位与第一个数相乘的结果，
    // 并没有考虑第二个数每一位是不是十位百位等带尾数0的数
    // 因此在此要根据位数判断来给它先添加上0
    for (let k = len2 - 1; k > i; k--) {
      tempStr = tempStr + '0'
    }
    // 遍历第一个数的每一位，将第二个数当前位的数与第一个数每一位相乘并累加每一位结果
    for (let j = len1 - 1; j >= 0; j--) {
      const x = num1[j] - '0'
      const tempProduct = x * y + add
      tempStr = tempProduct % 10 + tempStr
      add = parseInt(tempProduct / 10)
    }
    // 最后一次相乘，如果add即进位值大于0，则需要再给最终的结果添加一位数add
    if (add !== 0) {
      tempStr = add + tempStr
    }
    // 计算获得的乘机字符串累加
    product = addStrings(product, tempStr)
  }
  return product
}
console.log(multiply('9', '99'))
