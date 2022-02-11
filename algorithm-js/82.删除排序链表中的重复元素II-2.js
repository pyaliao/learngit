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
  // 创建一个哑结点
  const dummy = new ListNode(0, head)
  let currentPtr = dummy
  while (currentPtr.next && currentPtr.next.next) {
    // 如果currentPtr.next结点的值与currentPtr.next.next结点的值相等
    if (currentPtr.next.val === currentPtr.next.next.val) {
      // 记录这个相同的值
      const val = currentPtr.next.val
      // 遍历删除后续具有相同val的结点直到值不与val相等
      while (currentPtr.next && currentPtr.next.val === val) {
        currentPtr.next = currentPtr.next.next
      }
    } else {
      // 如果currentPtr.next结点的值与currentPtr.next.next结点的值不相等
      // 则将currentPtr指针右移一个结点
      currentPtr = currentPtr.next
    }
  }
  // dummy永远指向哑结点，后续的链表删除不影响dummy的指向，
  // dummy.next就是最终的链表的头指针
  return dummy.next
}
