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

// 解法2：记忆化递归搜索

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
  const n = s1.length
  const mem = new Array(n).fill().map(item => new Array(n).fill().map(item => new Array(n + 1).fill(0)))
  return dfs(0, 0, n, mem, s1, s2)
}
const dfs = function (i, j, len, mem, s1, s2) {
  // 如果结果数组中存在且匹配就直接返回true
  if (mem[i][j][len]) {
    return true
  }
  // 如果子字符串相等，则直接返回true
  const str1 = s1.substring(i, i + len)
  const str2 = s2.substring(j, j + len)
  if (str1 === str2) {
    mem[i][j][len] = 1
    return true
  }
  if (!checkCharCount(str1, str2)) {
    // 因为初始化为0了，因此此处失败存储可以省略
    // mem[i][j][len] = 0
    return false
  }
  for (let k = 1; k < len; k++) {
    // 比较s1的[0, k) [k, n) 与s2的[0, k) [k, n)
    if (dfs(i, j, k, mem, s1, s2) && dfs(i + k, j + k, len - k, mem, s1, s2)) {
      mem[i][j][k] = 1
      return true
    }
    // 比较s1的[i, k + i) [k + i, n) 与s2的[j, k + j) [k + j, n)
    if (dfs(i, j + len - k, k, mem, s1, s2) && dfs(k + i, j, len - k, mem, s1, s2)) {
      mem[i][j][k] = 1
      return true
    }
  }
  // 因为初始化为0了，因此此处失败存储可以省略
  // mem[i][j][len] = 0
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
// const str1 = 'anss'
// const str2 = 'ssna'
const str1 = 'eebaacbcbcadaaedceaaacadccd'
const str2 = 'eadcaacabaddaceacbceaabeccd'
console.log(isScramble(str1, str2))
