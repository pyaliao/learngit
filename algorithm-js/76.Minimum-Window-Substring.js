// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
// 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

// 注意：
// 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
// 如果 s 中存在这样的子串，我们保证它是唯一的答案。

// 示例 1：
// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"

// 示例 2：
// 输入：s = "a", t = "a"
// 输出："a"

// 示例 3：
// 输入：s = "a", t = "aa"
// 输出： ""
// 解释： t 中两个字符 'a' 均应包含在 s 的子串中，因此没有符合条件的子字符串，返回空字符串。

// 提示：
// 1 <= s.length, t.length <= 105
// s 和 t 由英文字母组成

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
  // 创建dest哈希表存储子串t中是所有的字符及其数量
  const dest = new Map()
  // 创建wdw哈希表存储动态窗口中的所有字符及其数量
  const wdw = new Map()
  // 将目标字符串存储到dest中
  const destLen = t.length
  const wdwLen = s.length
  for (let i = 0; i < destLen; i++) {
    if (dest.has(t[i])) {
      dest.set(t[i], dest.get(t[i]) + 1)
    } else {
      dest.set(t[i], 1)
    }
  }
  // left为滑动窗口的左指针，right为右指针
  let left = 0
  let right = 0
  let len = Infinity
  let indexLeft = -1
  let indexRight = -1
  while (right < wdwLen) {
    if (dest.has(s[right])) {
      wdw.set(s[right], wdw.has(s[right]) ? wdw.get(s[right]) + 1 : 1)
    }
    while (check(dest, wdw) && left <= right) {
      // 每次进来判断一下当前符合条件的窗口长度是不是最小的，不是最小的就将其置为最小的，并更新符合要求的的窗口下标
      if (right - left + 1 < len) {
        len = right - left + 1
        indexLeft = left
        indexRight = right
      }
      // 因为这是左指针右移，表明此时dest中有的key，wdw中也一定有，因此不用判断其是否存在
      if (dest.has(s[left])) {
        wdw.set(s[left], wdw.get(s[left]) - 1)
      }
      left++
    }
    right++
  }
  // 如果使用substr(indexLeft, len)则会出错，因为len有可能为Infinity
  return s.substring(indexLeft, indexRight + 1)
}

const check = function (dest, wdw) {
  for (const key of dest.keys()) {
    // 如果wdw中没有dest中的某个key或者有某个key但是key的值小于dest中的值，则wdw与dest不一致
    if (!wdw.has(key) || wdw.get(key) < dest.get(key)) {
      return false
    }
  }
  return true
}
// const s = 'ADOBECODEBANC'
// const t = 'ABC'
// const s = 'a'
// const t = 'a'
const s = 'a'
const t = 'aa'
console.log(minWindow(s, t))
