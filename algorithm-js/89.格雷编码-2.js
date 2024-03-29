// 89. 格雷编码
// n 位格雷码序列 是一个由 2n 个整数组成的序列，其中：
// 每个整数都在范围[0, 2n - 1] 内（含 0 和 2n - 1）
// 第一个整数是 0
// 一个整数在序列中出现 不超过一次
// 每对 相邻 整数的二进制表示 恰好一位不同 ，且
// 第一个 和 最后一个 整数的二进制表示 恰好一位不同
// 给你一个整数 n ，返回任一有效的 n 位格雷码序列 。

// 示例 1：
// 输入：n = 2
// 输出：[0, 1, 3, 2]
// 解释：
// [0, 1, 3, 2] 的二进制表示是[00, 01, 11, 10] 。
// - 00 和 01 有一位不同
// - 01 和 11 有一位不同
// - 11 和 10 有一位不同
// - 10 和 00 有一位不同
// [0, 2, 3, 1] 也是一个有效的格雷码序列，其二进制表示是[00, 10, 11, 01] 。
// - 00 和 10 有一位不同
// - 10 和 11 有一位不同
// - 11 和 01 有一位不同
// - 01 和 00 有一位不同

// 示例 2：
// 输入：n = 1
// 输出：[0, 1]

// 提示：
// 1 <= n <= 16

// 对称生成：循环实现
// 思路与算法
// 假设我们已经获取到 n - 1 位的格雷码序列 Gn−1，我们只需要将 Gn−1对称翻转，记作 Gn−1T。
// Gn−1的首元素和Gn−1T的尾元素都是相同的，反之亦然。如果我们给Gn−1T的每个元素都加上2^(n−1)，
// 记作(Gn−1T)′，则Gn−1的首元素和(Gn−1T)′的尾元素只有一位不相同，反之亦然。
// 因此Gn−1和(G n−1T)′拼接的序列Gn= [Gn−1, (Gn−1T)′] 满足 n 位的格雷码的定义。
// 初始值G0=[0]

/**
 * @param {number} n
 * @return {number[]}
 */
const grayCode = function (n) {
  // 0位格雷码，2^0即1个数，[0, 2^0 - 1] --> [0]
  const ret = [0]
  for (let i = 1; i <= n; i++) {
    // 循环中n每增加一次，格雷码个数增加一倍
    // 计算i-1位格雷码的长度
    const len = ret.length
    // 倒序遍历i-1格雷码，并给其每一位加2^i-1，然后将其push到i-1位格雷码的序列中，即可得到i位格雷码
    for (let j = len - 1; j >= 0; j--) {
      // 通过移位运算计算2^(i-1)，将ret每一位数与2^(i-1)做按位或运算来计算它们的和
      ret.push(ret[j] | 1 << (i - 1))
    }
  }
  return ret
}
console.log(grayCode(3))
