// 罗马数字包含以下七种字符：I，V，X，L，C，D和M。
// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// 例如，罗马数字2写做II，即为两个并列的1。12写做XII，即为X + II。
// 27写做XXVII, 即为XX + V + II。

// 通常情况下，罗马数字中小的数字在大的数字的右边。
// 但也存在特例，例如 4 不写做IIII，而是IV。
// 数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。
// 同样地，数字 9 表示为IX。这个特殊的规则只适用于以下六种情况：

// I可以放在V(5)和X(10)的左边，来表示4和9。
// X可以放在L(50)和C(100)的左边，来表示40和90。
// C可以放在D(500)和M(1000)的左边，来表示400和900。
// 给定一个整数，将其转为罗马数字。输入确保在1到3999的范围内。
/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = function (s) {
  const intRoman = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
  }
  const len = s.length
  let i = 0
  let num = 0
  while (i < len) {
    const numCurt = intRoman[s[i]]
    const numNext = i + 1 < len ? intRoman[s[i + 1]] : intRoman[s[i]]
    if (numCurt < numNext) {
      num += numNext - numCurt
      i += 2
    } else {
      num += numCurt
      i++
    }
  }
  return num
}
console.log(romanToInt('III'))
