const isScramble = function (s1, s2) {
  const n = s1.length
  const mem = new Array(n).fill().map(item => new Array(n).fill().map(item => new Array(n + 1).fill(0)))
  return dfs(0, 0, n, mem, s1, s2)
}
const dfs = function (i, j, len, mem, s1, s2) {
  // 如果结果数组中存在
  // 且成功就直接返回true
  // 失败则直接返回false
  if (mem[i][j][len]) {
    return mem[i][j][len] === 1
  }
  // 先判断字符串是否相等，如果相等，则直接返回true，因为相等也是一种扰乱结果
  // 如果子字符串相等，则直接返回true
  if (s1.substring(i, i + len) === s2.substring(j, j + len)) {
    mem[i][j][len] = 1
    return true
  }
  // 如果子串不相等，则说明字符顺序不一样
  // 可以先判断字符频数，如果频数不一致，则肯定不是对方的扰乱字符串
  if (!checkIfSimilar(len, s1.substring(i, i + len), s2.substring(j, j + len))) {
    // 失败必须存储为非0的值（成功存储的是1），否则无法区分到底是失败了还是没有判断到该位置
    mem[i][j][len] = -1
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
  // 如果所有可能的分割产生的字符串都不符合，则将其置为失败
  mem[i][j][len] = -1
  return false
}

const checkIfSimilar = function (len, str1, str2) {
  const freq = new Map()
  for (let i = 0; i < len; i++) {
    const c1 = str1[i]
    freq.set(c1, (freq.get(c1) || 0) + 1)
    const c2 = str2[i]
    freq.set(c2, (freq.get(c2) || 0) - 1)
  }
  for (const c of freq.values()) {
    if (c) {
      return false
    }
  }
  return true
}
// const str1 = 'great'
// const str2 = 'rgeat'
// console.log(isScramble(str1, str2))

const str1 = 'eebaacbcbcadaaedceaaacadccd'
const str2 = 'eadcaacabaddaceacbceaabeccd'
console.log(isScramble(str1, str2))
