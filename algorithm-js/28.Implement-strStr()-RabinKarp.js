// 28. 实现 strStr()
// 实现 strStr() 函数。
// 给你两个字符串 haystack 和 needle ，
// 请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。
// 如果不存在，则返回 -1 。

// 说明：
// 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
// 对于本题而言，当 needle 是空字符串时我们应当返回 0。
// 这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。

// 示例 1：
// 输入：haystack = "hello", needle = "ll"
// 输出：2

// 示例 2：
// 输入：haystack = "aaaaa", needle = "bba"
// 输出：-1

// 示例 3：
// 输入：haystack = "", needle = ""
// 输出：0

// 提示：
// 0 <= haystack.length, needle.length <= 5 * 104
// haystack 和 needle 仅由小写英文字符组成

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// 定义一个函数 将字母转换为数字
const charToInt = function (index, str) {
  return str.charCodeAt(index) - 'a'.charCodeAt()
}

const strStr = function (haystack, needle) {
  const a = 26
  let hash = 0
  let subStrHash = 0
  const modulus = Math.pow(2, 31)
  const originStrLen = haystack.length
  const subStrLen = needle.length
  // 如果原始字符串长度小于子字符串，则返回-1
  if (originStrLen < subStrLen) {
    return -1
  }
  // 先生成首个滑动框内子字符串的哈希值以及被比较子串的哈希值
  for (let i = 0; i < subStrLen; i++) {
    hash = (hash * a + charToInt(i, haystack)) % modulus
    subStrHash = (subStrHash * a + charToInt(i, needle)) % modulus
  }
  // 由于不同的字符串可能出现相同的哈希值，因此在哈希值相等时要做字符串是否相同的判断
  // console.log(hash, subStrHash)
  if (subStrHash === hash && haystack.substring(0, subStrLen) === needle) {
    return 0
  }
  // 滚动窗口生成新窗口内子字符串的哈希
  // 先生成需要的a^L值--- (h1 = (h0 * a−c0 * a^L) +cL + 1)
  let aL = 1
  for (let k = 0; k < subStrLen; k++) {
    aL = (aL * a) % modulus
  }
  const windowLen = originStrLen - subStrLen + 1
  for (let start = 1; start < windowLen; start++) {
    hash = (hash * a - charToInt(start - 1, haystack) * aL + charToInt(start + subStrLen - 1, haystack)) % modulus
    // 由于不同的字符串可能出现相同的哈希值，因此在哈希值相等时要做字符串是否相同的判断
    if (hash === subStrHash && haystack.substring(start, start + subStrLen) === needle) {
      return start
    }
  }
  return -1
}
