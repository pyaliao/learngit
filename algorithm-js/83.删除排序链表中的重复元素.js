// 83. 删除排序链表中的重复元素
// 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。

// 示例 1：
// 输入：head = [1, 1, 2]
// 输出：[1, 2]

// 示例 2：
// 输入：head = [1, 1, 2, 3, 3]
// 输出：[1, 2, 3]

// 提示：
// 链表中节点数目在范围[0, 300] 内
// -100 <= Node.val <= 100
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
const deleteDuplicates = function (head) {
  // 如果是空链表，直接返回空链表
  if (!head) {
    return head
  }
  let currentPtr = head
  // 因为每次比较的都是当前结点的值与下一个结点的值，因此currentPtr不必遍历到结尾，只需遍历到倒数第二个即可完成所有的比较与处理
  while (currentPtr.next) {
    // 如果当前值与下一个结点的值相等，将当前结点指向的结点更新为下一个结点的下一个结点
    if (currentPtr.val === currentPtr.next.val) {
      currentPtr.next = currentPtr.next.next
    } else { // 如果当前结点的值与下一个结点的值不相等，则将当前结点更新为下一个结点
      currentPtr = currentPtr.next
    }
  }
  return head
}
