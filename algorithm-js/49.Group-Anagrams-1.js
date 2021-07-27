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

// 方法一、排序加哈希
// 字母异位词排序后是相等的，因此，可以将其排序后作为map的key
// 将对应的字符串列表作为值
// 每次遍历时，将字符串转为key，然后去map中查找key对应的list
// 如果list不存在，则创建一个新的list，将字符串添加到list，
// 如果list存在，则将其取出并将字符串添加到list，
// 然后将list作为key的值添加到map
// 如果重复直到数组遍历结束，然后将map中的值转为数组返回即可

// 复杂度分析：
// 时间复杂度：O(nklogk)，其中n是strs中的字符串的数量，k是strs中的字符串的的最大长度。
// 需要遍历n个字符串，对于每个字符串，需要O(klogk)的时间进行排序以及O(1)的时间更新哈希表，
// 因此总时间复杂度是O(nklogk)。
// 空间复杂度：O(nk)，其中n是strs中的字符串的数量，k是strs中的字符串的的最大长度。
// 需要用哈希表存储全部字符串。

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
  const strsMap = new Map()
  // 遍历数组，将数组中每一个字符串排序，然后将排序后的字符串作为map的key
  for (const str of strs) {
    // 将排序后的str作为key
    const key = Array.from(str).sort().toString()
    // 如果map中的key有对应的list，则取出，否则创建一个新的list
    const anagramsList = strsMap.get(key) ? strsMap.get(key) : new Array()
    // 将字符串添加到list
    anagramsList.push(str)
    // 然后将list放入map
    strsMap.set(key, anagramsList)
  }
  return Array.from(strsMap.values())
}
