// 58. 最后一个单词的长度
// 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。
// 返回字符串中最后一个单词的长度。
// 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。

// 示例 1：
// 输入：s = "Hello World"
// 输出：5

// 示例 2：
// 输入：s = "   fly me   to   the moon  "
// 输出：4

// 示例 3：
// 输入：s = "luffy is still joyboy"
// 输出：6

// 提示：
// 1 <= s.length <= 104
// s仅有英文字母和空格' '组成
// s中至少存在一个单词

/**
 * @param {string} s
 * @return {number}
 */

const lengthOfLastWord = function (s) {
  const n = s.length
  if (n === 1) {
    return 1
  }
  let left = -1
  let right = -1
  let isFirst = false
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] !== ' ') {
      if (!isFirst) {
        left = i
        isFirst = true
      }
    } else {
      if (isFirst) {
        right = i
        break
      }
    }
  }
  return right < 0 ? left + 1 : left - right
}
const s = "   fly me   to   the moon  "
console.log(lengthOfLastWord(s))
