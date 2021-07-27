// 24. 两两交换链表中的节点
// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

// 示例 1：
// 输入：head = [1, 2, 3, 4]
// 输出：[2, 1, 4, 3]

// 示例 2：
// 输入：head = []
// 输出：[]

// 示例 3：
// 输入：head = [1]
// 输出：[1]

// 提示：
// 链表中节点的数目在范围[0, 100]内
// 0 <= Node.val <= 100

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const swapPairs = function (head) {
  // 如果链表不存在或者链表元素不足两个，就不交换，直接返回
  if (!head || !head.next) {
    return head
  }
  // 获取新链表的头结点，即当前链表的第二个结点
  const newHead = head.next
  // 对newHead之后的链表递归调用，并将返回的链表拼接到head之后
  head.next = swapPairs(newHead.next)
  // 最后将head拼接到newHead之后
  newHead.next = head
  return newHead
}
