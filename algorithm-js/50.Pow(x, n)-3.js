// 50. Pow(x, n)
// 实现pow(x, n)，即计算x的n次幂函数（即，x^n）。

// 示例 1：
// 输入：x = 2.00000, n = 10
// 输出：1024.00000

// 示例 2：
// 输入：x = 2.10000, n = 3
// 输出：9.26100

// 示例 3：
// 输入：x = 2.00000, n = -2
// 输出：0.25000
// 解释：2 - 2 = 1 / 22 = 1 / 4 = 0.25

// 提示：
// -100.0 < x < 100.0
// -2^31 <= n <= 2^31 - 1
// -10^4 <= x^n <= 10^4

// 二、快速幂递归
// 本题的方法被称为「快速幂算法」，有递归和迭代两个版本。
// 这篇题解会从递归版本的开始讲起，再逐步引出迭代的版本。

// 当指数n为负数时，我们可以计算 x^(-n)
// 再取倒数得到结果，因此我们只需要考虑n为自然数的情况。

// 方法二：快速幂 + 迭代
// 由于递归需要使用额外的栈空间，我们试着将递归转写为迭代。
// 在方法一中，我们也提到过，从左到右进行推导是不容易的，因为我们不知道是否需要额外乘x。
// 但我们不妨找一找规律，看看哪些地方额外乘了x，并且它们对答案产生了什么影响。
// 我们还是以x^77作为例子：
// x → x^2 → x^4 →+ x^9 →+ x^19 → x^38 →+ x^77
// 并且把需要额外乘x的步骤打上了+标记。可以发现：
// 1. x^38 →+ x^77中额外乘的x在 x^77中贡献了x；
// 2. x^9 →+ x^19中额外乘的x在之后被平方了2次，因此在 x^77中贡献了x^(2^2) = x^4
// 3. x^4 →+ x^9中额外乘的x在之后被平方了3次，因此在 x^77中贡献了x^(2^3) = x^8
// 4. 最初的x在之后被平方了6次，因此在 x ^ 77中贡献了x^(2^6) = x^64
// 我们把这些贡献相乘，x × x^4 × x^8 × x^64恰好等于x^77。而这些贡献的指数部分又是什么呢？
// 它们都是2的幂次，这是因为每个额外乘的x在之后都会被平方若干次。而这些指数1，4，8和64，
// 恰好就对应了77的二进制表示(1001101)2中的每个1！
// 因此我们借助整数的二进制拆分，就可以得到迭代计算的方法，一般地，如果整数n的二进制拆分为
// n = 2^i0 + 2^i1 + ⋯ + 2^ik，那么x^n = x^(2^i0) × x^(2^i1) × ⋯ × x^(2^ik)
// 这样一来，我们从x开始不断地进行平方，得到 x^2, x^4, x^8, x^16, ⋯
// ，如果n的第k个（从右往左，从0开始计数）二进制位为1，那么我们就将对应的贡献x^(2^k)计入答案。

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

const myPow = function (x, n) {
  const multiQuick = function (x, n) {
    let ret = 1
    let contribute = x
    while (n > 0) {
      if (n % 2 === 1) {
        ret *= contribute
      }
      contribute *= contribute
      n = parseInt(n / 2)
    }
    return ret
  }
  return n > 0 ? multiQuick(x, n) : 1 / multiQuick(x, n)
}
