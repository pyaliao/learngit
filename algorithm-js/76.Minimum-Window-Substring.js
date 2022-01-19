// 76. 最小覆盖子串
// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

// 注意：
// 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
// 如果 s 中存在这样的子串，我们保证它是唯一的答案。

// 示例 1：
// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"
// 示例 2：

// 输入：s = "a", t = "a"
// 输出："a"

// 示例 3:
// 输入: s = "a", t = "aa"
// 输出: ""
// 解释: t 中两个字符 'a' 均应包含在 s 的子串中，
// 因此没有符合条件的子字符串，返回空字符串。

// 提示：
// 1 <= s.length, t.length <= 105
// s 和 t 由英文字母组成

// 进阶：你能设计一个在 o(n) 时间内解决此问题的算法吗？

// 暴力解法：
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

const minWindow = function (s, t) {
  const sLen = s.length
  const tLen = t.length
  if (tLen > sLen) {
    return ''
  } 
  let start = -1
  let end = -1
  let minLen = sLen + 1
  for (let i = 0; i < sLen; i++) {
    let tpr = 0
    let spr = i + tLen
    while (tpr < tLen && spr <= sLen) {
      if (s.substring(i, spr).indexOf(t[tpr]) !== -1) {
        tpr++
      } else {
        spr++
      }
    }
    if (tpr === tLen && spr - i < minLen) {
      console.log(i, spr, tpr)
      minLen = spr - i
      start = i
      end = spr
    }
  }
  console.log(start, end)
  return s.substring(start, end)
}

const s = "ADOBECODEBANC"
const t = "ABC"

// const s = "a"
// const t = "a"

// const s = "a"
// const t = "aa"

// const s = 'abc'
// const t = 'ac'

// const s = "abc"
// const t = "cba"
console.log(minWindow(s, t))

