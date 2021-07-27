// 19. 删除链表的倒数第N个结点
// 给你一个链表，删除链表的倒数第n个结点，并且返回链表的头结点。
// 进阶：你能尝试使用一趟扫描实现吗？

// 示例 1：
// 输入：head = [1, 2, 3, 4, 5], n = 2
// 输出：[1, 2, 3, 5]

// 示例 2：
// 输入：head = [1], n = 1
// 输出：[]

// 示例 3：
// 输入：head = [1, 2], n = 1
// 输出：[1]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 比较朴素的算法
// 先求出链表长度，然后根据长度求出要删除的元素正向的位置
// 最后遍历到该元素前一元素进行删除操作
const removeNthFromEnd = function (head, n) {
  const origin = head
  if (!head) {
    return null
  }
  let count = 1
  while (head.next) {
    count++
    head = head.next
  }
  head = origin
  if (count <= n) {
    return origin.next
  } else {
    // 倒数第n个数，就是正数第count - n + 1个数，那么，只需要遍历到此数的前一个数，即可
    // 前一个数则是第count - n个数，从第一个数开始遍历，只需遍历count - n - 1次就可到达此数
    const index = count - n - 1
    for (let i = 0; i < index; i++) {
      head = head.next
    }
    head.next = head.next.next
  }
  return origin
}
