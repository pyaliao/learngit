// 23. 合并K个升序链表
// 给你一个链表数组，每个链表都已经按升序排列。
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

// 示例 1：
// 输入：lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
// 输出：[1, 1, 2, 3, 4, 4, 5, 6]
// 解释：链表数组如下：
// [
//   1 -> 4 -> 5,
//   1 -> 3 -> 4,
//   2 -> 6
// ]
// 将它们合并到一个有序链表中得到。
// 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6

// 示例 2：
// 输入：lists = []
// 输出：[]

// 示例 3：
// 输入：lists = [[]]
// 输出：[]

// 提示：
// k == lists.length
// 0 <= k <= 10 ^ 4
// 0 <= lists[i].length <= 500
// - 10 ^ 4 <= lists[i][j] <= 10 ^ 4
// lists[i] 按升序排列
// lists[i].length的总和不超过10 ^ 4

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

// 分治法：将问题分解为两个子问题，分别求出两个子问题的解，然后将两个子问题的解合并
// 就这样递归执行，递归出口是子问题个数为1或者子问题个数为0
function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
// 合并两个有序链表
const mergeTwoLists = function (l1, l2) {
  const head = new ListNode()
  let move = head
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      move.next = l1
      l1 = l1.next
    } else {
      move.next = l2
      l2 = l2.next
    }
    move = move.next
  }
  move.next = l1 === null ? l2 : l1
  return head.next
}

const mergeKList = function (list, left, right) {
  // left > right则说明子问题已经不存在了
  if (left > right) {
    return null
  } else if (left === right) {
    // left === right则说明子问题已经不能再分解，此时子问题的解直接返回即可
    return list[left]
  } else {
    // 分解为两个子问题，JS除法为小数除法，此处得取整，或者右移一位求平均数
    // const mid = parseInt((left + right) / 2)
    const mid = (left + right) >> 2
    // 求出子问题的解，并将子问题的解合并
    return mergeTwoLists(mergeKList(list, left, mid), mergeKList(list, mid + 1, right))
  }
}
