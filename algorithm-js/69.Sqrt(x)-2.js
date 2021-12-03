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

// 二分查找

/**
 * @param {number} x
 * @return {number}
 */
const mySqrt = function (x) {
  let left = 0
  let right = x
  let ans
  // 因为k^2 = x有两种情况，一种是k为整数，一种是k为小数
  // 当k为整数时，k^2 = x，此时k就是我们要求的平方根
  // 当k为小数时，k^2 = x，此时floor(k)就是我们要求的平方根，即舍去了小数部分
  // 综合上面两种情况可知，最后的结果ans肯定满足ans^2 <= x
  // 因此使用二分查找时，每次将mid^2与x比较，
  // 当mid^2 <= x时，将ans = mid，这样就保证ans保存的是最终的结果，然后将查找左边界设置为left = mid + 1
  // 当mid^2 > x时，将right = mid - 1
  // 下面在实际处理中在mid^2 = x时，直接返回mid，避免mid^2 <= x判断将两种情况放在一起讨论时多做一些查找动作
  while (left <= right) {
    const mid = parseInt((left + right) / 2)
    if (mid * mid > x) {
      right = mid - 1
    } else if (mid * mid === x) {
      return mid
    } else {
      ans = mid
      left = mid + 1
    }
  }
  return ans
}
console.log(mySqrt(16))
