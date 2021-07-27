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

// 我们可以想到一种最朴素的方法：用一个变量ans来维护以及合并的链表，
// 第i次循环把第i个链表和ans合并，答案保存到ans中。
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
// 循环合并n个链表
const mergeKLists = function (lists) {
  const len = lists.length
  let ans = null
  for (let i = 0; i < len; i++) {
    ans = mergeTwoLists(ans, lists[i])
  }
  return ans
}
