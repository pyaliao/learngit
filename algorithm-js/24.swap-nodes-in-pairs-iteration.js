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
  // 创建哑结点
  const dumpNode = new ListNode()
  dumpNode.next = head
  // tempNode指向要交换的两个结点的前一个结点
  let tempNode = dumpNode
  while (tempNode.next && tempNode.next.next) {
    const firstNode = tempNode.next
    const secondNode = tempNode.next.next
    // 将tempNode指向第二个结点
    tempNode.next = secondNode
    // 将第一个结点指向第二个结点后面的结点
    firstNode.next = secondNode.next
    // 将第二个人结点指向第一个结点
    secondNode.next = firstNode
    // 更新tempNode
    tempNode = firstNode
  }
  return dumpNode.next
}
