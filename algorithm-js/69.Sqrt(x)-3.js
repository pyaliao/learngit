// 69. Sqrt(x)
// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

// 示例 1：
// 输入：x = 4
// 输出：2

// 示例 2：
// 输入：x = 8
// 输出：2
// 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。

// 提示：
// 0 <= x <= 231 - 1

// 牛顿迭代法
// 最终的迭代方程是xi = 1/2(x0 + 2/x0)
// 每次计算新的xi的值，然后比较和上一次的迭代值之间的差值
// 当其差值小于某个很小的值时(我们定为1e-7)，认为此次的迭代至无限逼近要求解的值，即导数直线与x轴的交点x的值

/**
 * @param {number} x
 * @return {number}
 */
const mySqrt = function (x) {
  // x0取从x开始
  let x0 = x
  const c = x
  while (true) {
    const xi = (x0 + c / x0) / 2
    if (x0 - xi < 1e-7) {
      break
    }
    x0 = xi
  }
  return parseInt(x0)
}
console.log(mySqrt(256))
