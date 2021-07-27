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
/*
**  暴力法实现字符串的indexOf()方法：滑动窗口法，即将needle字符串在haystack上滑动，
**  每次滑动都将needle与窗口内的heystack子串进行比较，如果相同，则返回子串首字符的下标
**  否则，继续滑动窗口
*/
const strStr = function (haystack, needle) {
  let len1 = haystack.length
  let len2 = needle.length
  if (len2 === 0) {
    return 0
  }
  let index = -1
  for (let i = 0; i < len1; i++) {
    if (haystack[i] === needle[0]) {
      let j = 0
      while (j < len2) {
        if (haystack[i + j] === needle[j]) {
          j++
        } else {
          break
        }
      }
      if (j === len2) {
        index = i
        break
      }
    }
  }
  return index
}
