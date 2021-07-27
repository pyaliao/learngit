// 46. 全排列
// 给定一个不含重复数字的数组nums，返回其所有可能的全排列。你可以按任意顺序返回答案。

// 示例 1：
// 输入：nums = [1, 2, 3]
// 输出：[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

// 示例 2：
// 输入：nums = [0, 1]
// 输出：[[0, 1], [1, 0]]

// 示例 3：
// 输入：nums = [1]
// 输出：[[1]]

// 提示：
// 1 <= nums.length <= 6
// -10 <= nums[i] <= 10
// nums中的所有整数互不相同

// 回溯
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
  const len = nums.length
  const retArr = []
  const path = []
  const used = []
  if (len === 0) {
    return retArr
  }
  // 初始化used
  for (let i = 0; i < len; i++) {
    used[i] = false
  }
  dfs(nums, len, 0, path, used, retArr)
  return retArr
}

const dfs = function (nums, len, depth, path, used, retArr) {
  if (len === depth) {
    // 将path的拷贝存储到返回数组，path是全局数组，一直处于变化之中
    // 又因为js中数组是引用类型，因此不能直接保存数组，要将其拷贝保存
    retArr.push(path.slice())
    return
  }
  // 遍历数组，如果数字没有被使用过，则将其添加到path，并将其标记为以使用
  // 然后继续填写下一个数字，即递归调用dfs本身，直到深度与数组长度一致，
  // 此时path已经是一个全排列了，将其保存到结果数组，然后退出此次递归，返回上一级
  // 返回到上一级之后，要撤销前面的标记为已用及保存到path的操作，使其状态恢复到初始状态
  // 然后进行下一次循环及递归
  // 注意递归调用导致循环嵌套，返回上一级要走完上一级的循环，然后再返回到更上一级，如此往复
  // 知道第一次调用时的循环结束为止
  for (let i = 0; i < len; i++) {
    // 如果元素没被使用则进入
    if (!used[i]) {
      // 将其入栈到path，并将其标为已使用
      path.push(nums[i])
      used[i] = true
      // 继续填下一个数，递归调用时深度要增加
      dfs(nums, len, depth + 1, path, used, retArr)
      // 撤销操作，弹出该元素并将其标为未使用
      path.pop(nums[i])
      used[i] = false
    }
  }
}
