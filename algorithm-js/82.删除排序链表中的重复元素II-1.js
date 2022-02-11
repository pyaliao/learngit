// 82. 删除排序链表中的重复元素 II
// 给定一个已排序的链表的头 head ，删除原始链表中所有重复数字的节点，只留下不同的数字。
// 返回已排序的链表。

// 示例 1：
// 输入：head = [1, 2, 3, 3, 4, 4, 5]
// 输出：[1, 2, 5]

// 示例 2：
// 输入：head = [1, 1, 1, 2, 3]
// 输出：[2, 3]


// 提示：
// 链表中节点数目在范围[0, 300] 内
// - 100 <= Node.val <= 100
// 题目数据保证链表已经按升序 排列

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

// 双指针法

const deleteDuplicates = function (head) {
  if (!head) {
    return head
  }
  let leftPtr = head
  let rightPtr = head.next
  // 创建一个哑结点，prev从哑结点开始，记录左指针的前一个位置
  // 整个遍历过程一直用prev去拼接新的链表，dumpy始终指向链表开始的哑结点
  // 最终只需要返回dumpy.next即新的头结点即可
  const dumpy = new ListNode(0, head)
  let prev = dumpy
  while (rightPtr) {
    if (leftPtr.val === rightPtr.val) {
      if (!rightPtr.next) {
        prev.next = rightPtr.next
      }
      rightPtr = rightPtr.next
    } else {
      if (leftPtr.next === rightPtr) {
        prev = leftPtr
        leftPtr = leftPtr.next
        rightPtr = rightPtr.next
      } else {
        prev.next = rightPtr
        leftPtr = rightPtr
        rightPtr = rightPtr.next
      }
    }
  }
  return dumpy.next
}
