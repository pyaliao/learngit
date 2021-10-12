// 59. 螺旋矩阵 II
// 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

// 示例 1：
// 输入：n = 3
// 输出：[[1, 2, 3], [8, 9, 4], [7, 6, 5]]

// 示例 2：
// 输入：n = 1
// 输出：[[1]]

// 提示：
// 1 <= n <= 20

/**
 * @param {number} n
 * @return {number[][]}
 */
const generateMatrix = function (n) {
  let left = 0
  let right = n - 1
  let top = 0
  let bottom = n - 1
  let count = 1
  const ans = []
  for (let i = 0; i < n; i++) {
    ans[i] = new Array(n)
  }
  // 优化while循环内的代码
  while (count <= n * n) {
    for (let i = left; i <= right; i++) {
      ans[top][i] = count++
    }
    top++
    for (let i = top; i <= bottom; i++) {
      ans[i][right] = count++
    }
    right--
    for (let i = right; i >= left; i--) {
      ans[bottom][i] = count++
    }
    bottom--
    for (let i = bottom; i >= top; i--) {
      ans[i][left] = count++
    }
    left++
  }
  // while (true) {
  //   for (let i = left; i <= right; i++) {
  //     ans[top][i] = count++
  //   }
  //   top++
  //   if (top > bottom) {
  //     break
  //   }
  //   for (let i = top; i <= bottom; i++) {
  //     ans[i][right] = count++
  //   }
  //   right--
  //   if (right < left) {
  //     break
  //   }
  //   for (let i = right; i >= left; i--) {
  //     ans[bottom][i] = count++
  //   }
  //   bottom--
  //   if (bottom < top) {
  //     break
  //   }
  //   for (let i = bottom; i >= top; i--) {
  //     ans[i][left] = count++
  //   }
  //   left++
  //   if (left > right) {
  //     break
  //   }
  // }
  return ans
}
console.log(generateMatrix(7))
