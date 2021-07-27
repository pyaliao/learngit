// 49. 字母异位词分组
// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

// 示例:
// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出:
// [
//   ["ate", "eat", "tea"],
//   ["nat", "tan"],
//   ["bat"]
// ]
// 说明：
// 所有输入均为小写字母。
// 不考虑答案输出的顺序。

// 方法一、计数加哈希
// 由于互为字母异位词的两个字符串包含的字母相同，因此两个字符串中的相同字母出现的次数一定是相同的，
// 故可以将每个字母出现的次数使用字符串表示，作为哈希表的键。
// 由于字符串只包含小写字母，因此对于每个字符串，
// 可以使用长度为26的数组记录每个字母出现的次数。
// 需要注意的是，在使用数组作为哈希表的键时，不同语言的支持程度不同，因此不同语言的实现方式也不同。

// 复杂度分析
// 时间复杂度：O(n(k + |Σ|)) ，其中n是strs中的字符串的数量，k是strs中的字符串的的最大长度，
// 是字符集，在本题中字符集为所有小写字母，|Σ|=26。
// 需要遍历n个字符串，对于每个字符串，需要O(k)的时间计算每个字母出现的次数，
// O(|Σ|)的时间生成哈希表的键，以及O(1)的时间更新哈希表，因此总时间复杂度是O(n(k + |Σ|))。
// 空间复杂度：O(n(k + |Σ|))，其中n是strs中的字符串的数量，k是strs中的字符串的最大长度，
// 是字符集，在本题中字符集为所有小写字母，|Σ|=26。
// 需要用哈希表存储全部字符串，而记录每个字符串中每个字母出现次数的数组需要的空间为O(|Σ|)，
// 在渐进意义下小于O(n(k + |Σ|))，可以忽略不计。

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
  // const strsMap = new Map()
  const strsMap = new Object()
  for (const str of strs) {
    // 一定要初始化为26的长度，否则下面的自增会出现问题
    const count = new Array(26).fill(0)
    for (const char of str) {
      // 获取每个字符的code，将其减去'a'的code，就是count的下标
      count[char.charCodeAt() - 'a'.charCodeAt()]++
    }
    // 不能使用map了，因为map的键跟内存地址绑定，如果地址不一样就视为两个键
    // 我们每次创建新的count地址肯定不一样，因此此处无法使用map
    // strsMap.get(count) ? strsMap.get(count).push(str) : strsMap.set(count, [str])
    strsMap[count] ? strsMap[count].push(str) : strsMap[count] = [str]
  }
  // Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组
  return Object.values(strsMap)
}
