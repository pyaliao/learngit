// 61. 旋转链表
// 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

// 示例 1：
// 输入：head = [1, 2, 3, 4, 5], k = 2
// 输出：[4, 5, 1, 2, 3]

// 示例 2：
// 输入：head = [0, 1, 2], k = 4
// 输出：[2, 0, 1]

// 提示：
// 链表中节点的数目在范围[0, 500] 内
// - 100 <= Node.val <= 100
// 0 <= k <= 2 * 109

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const rotateRight = function (head, k) {
  if (!head || !head.next || k === 0) {
    return head
  }
  let len = 1
  let count = 0
  let myHead = head
  let list = null
  while (myHead.next) {
    len++
    myHead = myHead.next
  }
  count = len - k % len
  if (count === len) {
    return head
  } else {
    myHead.next = head
    while (count--) {
      myHead = myHead.next
    }
    list = myHead.next
    myHead.next = null
    return list
  }
}
