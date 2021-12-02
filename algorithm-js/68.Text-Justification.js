// 68. 文本左右对齐
// 给定一个单词数组和一个长度 maxWidth，重新排版单词，使其成为每行恰好有 maxWidth 个字符，且左右两端对齐的文本。
// 你应该使用“贪心算法”来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 ' ' 填充，
// 使得每行恰好有 maxWidth 个字符。要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，
// 则左侧放置的空格数要多于右侧的空格数。文本的最后一行应为左对齐，且单词之间不插入额外的空格。

// 说明:
// 单词是指由非空格字符组成的字符序列。
// 每个单词的长度大于 0，小于等于 maxWidth。
// 输入单词数组 words 至少包含一个单词。

// 示例 1:

// 输入:
// words = ["This", "is", "an", "example", "of", "text", "justification."]
// maxWidth = 16

// 输出:
// [
//   "This    is    an",
//   "example  of text",
//   "justification.  "
// ]

// 示例 2:

// 输入:
// words = ["What", "must", "be", "acknowledgment", "shall", "be"]
// maxWidth = 16

// 输出:
// [
//   "What   must   be",
//   "acknowledgment  ",
//   "shall be        "
// ]

// 解释: 注意最后一行的格式应为 "shall be    " 而不是 "shall     be",
// 因为最后一行应为左对齐，而不是左右两端对齐。
// 第二行同样为左对齐，这是因为这行只包含一个单词。

// 示例 3:

// 输入:
// words = ["Science", "is", "what", "we", "understand", "well", "enough", "to", "explain",
//   "to", "a", "computer.", "Art", "is", "everything", "else", "we", "do"]
// maxWidth = 20
// 输出:
// [
//   "Science  is  what we",
//   "understand      well",
//   "enough to explain to",
//   "a  computer.  Art is",
//   "everything  else  we",
//   "do                  "
// ]

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */

const blank = function (n) {
  return new Array(n).fill(' ').join('')
}

const fullJustify = function (words, maxWidth) {
  const ans = []
  const len = words.length
  // 初始时，当前行最后一个单词在数组中的下标
  let right = 0
  while (true) {
    // 更新left
    const left = right
    let sumWordsChar = 0
    // 1. 先计算当前行最多可以放多少个单词
    while (right < len && words[right].length + sumWordsChar + right - left <= maxWidth) {
      sumWordsChar += words[right].length
      right++
    }
    // 2. 判断当前行是不是最后一行，如果是最后一行，将单词左对齐，单词间只有一个空格分隔，最后在行末填充空格
    if (right === len) {
      // left为当前行行首单词在数组中的下标，right为行末单词在数组中的下标
      // 将最后一行的单词用一个空格分隔，然后在其尾部补充空格使其总长度达到maxWidth
      const s = words.slice(left, right).join(' ')
      ans.push(s + blank(maxWidth - s.length))
      // 已经到达最后一行，因此结束后直接退出循环
      break
    }

    // 3. 如果不是最后一行，分两种情况
    // 3.1 当前行只有一个单词，此时将单词左对齐，后面补空格
    const wordNumber = right - left
    const spaceNumber = maxWidth - sumWordsChar
    if (right - left === 1) {
      // 因为当前行只有一个单词，因此将在此单词后面补空格使其总长度达到maxWidth
      const s = words[left] + blank(spaceNumber)
      // 将生成的行push进结果数组
      ans.push(s)
      // 跳出本次循环，进入下次循环，因为这一个只有一个单词，已经处理完了，只需重新进入下一轮循环即可
      continue
    }

    // 3.2 当前单词数大于1，此时计算出平均每个单词间有几个空格，多出的一个空格加在最左端的单词后面
    const avgSpaceNumber = parseInt(spaceNumber / (wordNumber - 1))
    const extraSpaceNumber = spaceNumber % (wordNumber - 1)
    // 因为多出了extraSpaceNumber个空格，因此将其分配给从left开始到达left + extraSpaceNumber + 1(到达却不包含)的
    // 单词之间，每两个单词之间多了一个空格，因此blank时，avgSpaceNumber得加1
    const leftStr = words.slice(left, left + extraSpaceNumber + 1).join(blank(avgSpaceNumber + 1))
    // 多出的空格处理完毕，后面的字符串不需要添加额外的空格分隔，因此还是使用的avgSpaceNumber个空格
    const rightStr = words.slice(left + extraSpaceNumber + 1, right).join(blank(avgSpaceNumber))
    // 切记，最后拼接时，不要忘记拼接的左右字符串拼接单词之间也需要avgSpaceNumber个空格分隔
    ans.push(leftStr + blank(avgSpaceNumber) + rightStr)
  }
  return ans
}
const words = ["This", "is", "an", "example", "of", "text", "justification."]
const maxWidth = 16
console.log(fullJustify(words, maxWidth))
