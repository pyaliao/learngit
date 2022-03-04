// 87. 扰乱字符串
// 使用下面描述的算法可以扰乱字符串 s 得到字符串 t ：
// 如果字符串的长度为 1 ，算法停止
// 如果字符串的长度 > 1 ，执行下述步骤：
// 在一个随机下标处将字符串分割成两个非空的子字符串。
// 即，如果已知字符串 s ，则可以将其分成两个子字符串 x 和 y ，且满足 s = x + y 。
// 随机 决定是要「交换两个子字符串」还是要「保持这两个子字符串的顺序不变」。
// 即，在执行这一步骤之后，s 可能是 s = x + y 或者 s = y + x 。
// 在 x 和 y 这两个子字符串上继续从步骤 1 开始递归执行此算法。
// 给你两个 长度相等 的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。
// 如果是，返回 true ；否则，返回 false 。

// 示例 1：
// 输入：s1 = "great", s2 = "rgeat"
// 输出：true
// 解释：s1 上可能发生的一种情形是：
// "great" -- > "gr/eat" // 在一个随机下标处分割得到两个子字符串
// "gr/eat" -- > "gr/eat" // 随机决定：「保持这两个子字符串的顺序不变」
// "gr/eat" -- > "g/r / e/at" // 在子字符串上递归执行此算法。两个子字符串分别在随机下标处进行一轮分割
// "g/r / e/at" -- > "r/g / e/at" // 随机决定：第一组「交换两个子字符串」，第二组「保持这两个子字符串的顺序不变」
// "r/g / e/at" -- > "r/g / e/ a/t" // 继续递归执行此算法，将 "at" 分割得到 "a/t"
// "r/g / e/ a/t" -- > "r/g / e/ a/t" // 随机决定：「保持这两个子字符串的顺序不变」
// 算法终止，结果字符串和 s2 相同，都是 "rgeat"
// 这是一种能够扰乱 s1 得到 s2 的情形，可以认为 s2 是 s1 的扰乱字符串，返回 true

// 示例 2：
// 输入：s1 = "abcde", s2 = "caebd"
// 输出：false

// 示例 3：
// 输入：s1 = "a", s2 = "a"
// 输出：true

// 提示：
// s1.length == s2.length
// 1 <= s1.length <= 30
// s1 和 s2 由小写英文字母组成

// 解法1：暴力递归搜索

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const isScramble = function (s1, s2) {
  // 先判断字符串是否相等，如果相等，则直接返回true，因为相等也是一种扰乱结果
  if (s1 === s2) {
    return true
  }
  // 如果子串不相等，则说明字符顺序不一样
  // 可以先判断字符频数，如果频数不一致，则肯定不是对方的扰乱字符串
  if (!checkCharCount(s1, s2)) {
    return false
  }
  const len = s1.length
  // 字符顺序不一致频数一致
  // 此时可能是也可能不是扰乱字符串，因此循环判断每个可能的分割点
  for (let i = 1; i < len; i++) {
    // [0, i) [i, len)
    // 获得s1的分割字符串s1[0, i)和s1[i, len)
    const s1left = s1.substring(0, i)
    const s1right = s1.substring(i)
    // 获得s2的分割字符串s1[0, i)和s1[i, len)
    const s2left = s2.substring(0, i)
    const s2right = s2.substring(i)
    if (isScramble(s1left, s2left) && isScramble(s1right, s2right)) {
      return true
    }
    // 获得s2的分割字符串s2[0, len - i) s2[len - i, len)
    const s2leftReverse = s2.substring(0, len - i)
    const s2rightReverse = s2.substring(len - i)
    if (isScramble(s1left, s2rightReverse) && isScramble(s1right, s2leftReverse)) {
      return true
    }
  }
  return false
}

const checkCharCount = function (str1, str2) {
  if (str1.length !== str2.length) {
    return false
  }
  const len = str1.length
  // 定义两个数组存储各字母出现的次数
  const arr1 = new Array(26).fill(0)
  const arr2 = new Array(26).fill(0)
  for (let i = 0; i < len; i++) {
    arr1[str1[i].charCodeAt() - 'a'.charCodeAt()]++
    arr2[str2[i].charCodeAt() - 'a'.charCodeAt()]++
  }
  for (let j = 0; j < 26; j++) {
    if (arr1[j] !== arr2[j]) {
      return false
    }
  }
  return true
}
const str1 = 'anss'
const str2 = 'ssna'
console.log(isScramble(str1, str2))
