// 42. 接雨水
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，
// 计算按此排列的柱子，下雨之后能接多少雨水。

// 示例 1：
// 输入：height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// 输出：6
// 解释：上面是由数组[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] 表示的高度图，
// 在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

// 示例 2：
// 输入：height = [4, 2, 0, 3, 2, 5]
// 输出：9

// 提示：
// n == height.length
// 0 <= n <= 3 * 104
// 0 <= height[i] <= 105

/**
 * @param {number[]} height
 * @return {number}
 */
// 方法三、使用栈追踪
// 除了计算并存储每个位置两边的最大高度以外，也可以用单调栈计算能接的雨水总量。
// 维护一个单调栈，单调栈存储的是下标，满足从栈底到栈顶的下标对应的数组height中的元素递减。
// 从左到右遍历数组，遍历到下标i时，如果栈内至少有两个元素，
// 记栈顶元素为top，top 的下面一个元素是left，则一定有height[left] >= height[top]。
// 如果height[i] > height[top]，则得到一个可以接雨水的区域，该区域的宽度是 i - left − 1，
// 高度是min(height[left], height[i]) − height[top]，根据宽度和高度即可计算得到该区域能接的雨水量。
// 为了得到left，需要将top出栈。在对top计算能接的雨水量之后，left变成新的top，重复上述操作，
// 直到栈变为空，或者栈顶下标对应的height中的元素大于或等于height[i]。
// 在栈为空或者height[i] <= height[top]时，将i入栈，继续遍历后面的下标，
// 计算能接的雨水量。遍历结束之后即可得到能接的雨水总量。
const trap = function (height) {
  const len = height.length
  const stack = []
  let volumn = 0
  for (let i = 0; i < len; i++) {
    // 栈不为空或者栈顶元素小于等于当前元素时，将栈顶元素出栈
    // 如果出栈之后栈不为空，则获取新的栈顶元素，然后计算雨水量，
    // 接着继续进行上一步操作直到栈为空或者栈顶元素对应的数组值大于等于当前元素时，退出循环，遍历下一个元素
    // 如果出栈之后栈为空，则退出循环，遍历下一个元素
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop()
      if (stack.length === 0) {
        break
      }
      const distance = i - stack[stack.length - 1] - 1
      const volHeight = Math.min(height[stack[stack.length - 1]], height[i]) - height[top]
      volumn += distance * volHeight
    }
    // 在栈为空或者height[i] <= height[top]时，将i入栈
    stack.push(i)
  }
  return volumn
}
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
