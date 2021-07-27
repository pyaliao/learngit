// 30. 串联所有单词的子串
// 给定一个字符串s和一些长度相同的单词words。
// 找出s中恰好可以由words中所有单词串联形成的子串的起始位置。
// 注意子串要与words中的单词完全匹配，
// 中间不能有其他字符，但不需要考虑words中单词串联的顺序。

// 示例 1：
// 输入：
// s = "barfoothefoobarman",
//   words = ["foo", "bar"]
// 输出：[0, 9]
// 解释：
// 从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
// 输出的顺序不重要, [9, 0] 也是有效答案。

// 示例 2：
// 输入：
// s = "wordgoodgoodgoodbestword",
//   words = ["word", "good", "best", "word"]
// 输出：[]

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */

// 方法一、 map存储法

// 思路：将Word存储到map中，然后判断子串中的每一个word的数量是否和map中一致，
// 如果一致，则符合，返回子串起始下标
// 如果有一个word数量不一致，则肯定不匹配的，或者有一个不存在于map中的word，则肯定不匹配

const findSubstring = function (s, words) {
  const map1 = new Map()
  const map2 = new Map()
  const indexArr = []
  const len = words.length
  const wordLen = words[0].length
  const subStrLen = wordLen * len
  const endIndex = s.length - subStrLen
  // 将words中的单词存储到map1中，并统计其个数
  for (let index = 0; index < len; index++) {
    if (map1.has(words[index])) {
      let val = map1.get(words[index])
      map1.set(words[index], ++val)
    } else {
      map1.set(words[index], 1)
    }
  }
  // 遍历s，并统计s中子串与
  for (let i = 0; i <= endIndex; i++) {
    // 每次子字符串变化时，要清空map2，map2存储的是当前子字符串中相应的word的个数
    map2.clear()
    const subStr = s.substring(i, i + subStrLen)
    let j = 0
    // 在每个子串中，只要所有单词自身的个数与map1中相等，则匹配
    while (j < subStrLen) {
      const word = subStr.substring(j, j + wordLen)
      // 如果当前子串中word存在，则判断其数量
      if (map1.has(word)) {
        const val = map2.get(word) ? map2.get(word) + 1 : 1
        map2.set(word, val)
        // 如果当前子串中word数量大于map1中的word数量，则当前子串肯定不匹配
        // 直接进入下一个子串
        if (map2.get(word) > map1.get(word)) {
          break
        }
        // 如果当前子串中的word数量小于等于map1，则继续判断下一个word
        // 下一个word要么是当前word的重复，如果重复后大于map1中的数量，
        // 则当前子串不匹配，不大于则继续匹配下一个word
        // 如果下一个word不是当前word的重复，则有两种可能，
        // 一种是：下一个word在map1中，则进行数量判断然后进行下一个word的判断
        // 另一种：下一个word不在map1中，则当前子串不匹配，进入下一个子串
        j += wordLen
      } else {
        // 如果当前子串中word不在map1中，则当前子串肯定不匹配，直接进入下一个子串
        break
      }
    }
    // 当前子串遍历完则表明子串中所有的word都在map1中，
    // 并且数量一致，因此，将当前子串的下标存储到要返回的数组
    if (j === subStrLen) {
      indexArr.push(i)
    }
  }
  // 遍历完所有子串则返回最终的数组
  return indexArr
}
console.log(findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word']))

// 方法二
