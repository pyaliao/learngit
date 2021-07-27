// 25. K 个一组翻转链表
// 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
// k 是一个正整数，它的值小于或等于链表的长度。
// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

// 进阶：
// 你可以设计一个只使用常数额外空间的算法来解决此问题吗？
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

// 示例 1：
// 输入：head = [1, 2, 3, 4, 5], k = 2
// 输出：[2, 1, 4, 3, 5]

// 示例 2：
// 输入：head = [1, 2, 3, 4, 5], k = 3
// 输出：[3, 2, 1, 4, 5]

// 示例 3：
// 输入：head = [1, 2, 3, 4, 5], k = 1
// 输出：[1, 2, 3, 4, 5]

// 示例 4：
// 输入：head = [1], k = 1
// 输出：[1]

// 提示：
// 列表中节点的数量在范围 sz 内
// 1 <= sz <= 5000
// 0 <= Node.val <= 1000
// 1 <= k <= sz

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

const reverseLink = function (head, tail) {
  let prev = null
  let current = head
  while (prev !== tail) {
    const next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return [tail, head]
}

const reverseKGroup = function (head, k) {
  // 创建一个头结点
  const dumpNode = new ListNode()
  dumpNode.next = head
  let prev = dumpNode

  while (head) {
    // 遍历到尾结点，初始尾结点为头结点位置
    let tail = prev
    for (let i = 0; i < k; i++) {
      tail = tail.next
      if (!tail) {
        // 如果出现空节点，则说明长度不足k，则直接返回哑结点的next
        return dumpNode.next
      }
    }
    // 如果程序进行到这一步，则说明长度为达到K
    // 保存这K个节点的下一个节点
    const next = tail.next;
    // 反转链表
    [head, tail] = reverseLink(head, tail)
    prev.next = head
    tail.next = next
    prev = tail
    head = tail.next
  }
  return dumpNode.next
}
