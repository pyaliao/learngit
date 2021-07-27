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

// 方法一：快速幂 + 递归
// 「快速幂算法」的本质是分治算法。
// 举个例子，如果我们要计算x^64，我们可以按照：
// x → x^2 → x^4 → x^8 → x^16 → x^32 → x^64
// 的顺序，从x开始，每次直接把上一次的结果进行平方，
// 计算6次就可以得到 x^64的值，而不需要对x乘63次x。
// 再举一个例子，如果我们要计算 x^77，我们可以按照：
// x → x^2 → x^4 → x^9 → x^19 → x^38 → x^77
// 的顺序，在x → x^2，x^2 → x^4，x^19 → x^38这些步骤中，
// 我们直接把上一次的结果进行平方，而在 x^4 → x^9，x^9 → x^19，x^38 → x^77
// 这些步骤中，我们把上一次的结果进行平方后，还要额外乘一个x。
// 直接从左到右进行推导看上去很困难，因为在每一步中，
// 我们不知道在将上一次的结果平方之后，还需不需要额外乘x。
// 但如果我们从右往左看，分治的思想就十分明显了：

// 当我们要计算 x^n时，我们可以先递归地计算出 y = x^⌊n/2⌋，其中⌊a⌋表示对a进行下取整；
// 根据递归计算的结果，如果n为偶数，那么x^n = y^2；
// 如果n为奇数，那么x^n = y^2 × x；
// 递归的边界为n = 0，任意数的0次方均为1。
// 由于每次递归都会使得指数减少一半，因此递归的层数为O(logn)，
// 算法可以在很快的时间内得到结果。

// 复杂度分析
// 时间复杂度：O(logn)，即为递归的层数。
// 空间复杂度：O(logn)，即为递归的层数。这是由于递归的函数调用会使用栈空间。

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

// 第一种写法
const myPow = function (x, n) {
  const powNumber = Math.abs(n)
  if (powNumber === 0) {
    return 1
  }
  const prev = myPow(x, parseInt(powNumber / 2))
  let pow
  if (powNumber % 2 === 0) {
    pow = prev * prev
  } else {
    pow = prev * prev * x
  }
  return n > 0 ? pow : 1 / pow
}
// 第二种写法
const myPow = function (x, n) {
  if (n >= 0) {
    return multiQuick(x, n)
  } else {
    return 1 / multiQuick(x, -n)
  }
}
function multiQuick (x, n) {
  if (n === 0) {
    return 1
  }
  if (n % 2 === 0) {
    return multiQuick(x, n / 2) * multiQuick(x, n / 2)
  } else {
    return multiQuick(x, parseInt(n / 2)) * multiQuick(x, parseInt(n / 2)) * x
  }
}
