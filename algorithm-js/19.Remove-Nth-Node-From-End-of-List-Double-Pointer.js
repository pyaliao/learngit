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

//  双指针法，移动first指针使其到的链表末端，同时移动second指针
//  使其指向最终要删除的节点的前一个节点，此时即可删除节点并返回头结点
//  只需一轮循环即可完成
const removeNthFromEnd = function (head, n) {
  // 创建一个哑结点，并将它指向头结点
  const dumpy = new ListNode(0, head)
  // 将第二个指针指向哑结点，第一个指针指向头结点
  let second = dumpy
  let first = head
  // 将第一个指针往前移动n个位置
  for (let i = 0; i < n; i++) {
    first = first.next
  }
  // 移动第一个指针直到链表结尾，同时移动第二个指针
  while (first) {
    first = first.next
    second = second.next
  }
  // 此时第二个指针指向的是倒数第n个节点的前一个节点
  // 将倒数第n个节点删除即可
  second.next = second.next.next
  // 返回头结点，使用head会出错，为什么呢？因为如果要删除的节点是头结点，那么头结点被删除后，
  // 哑结点直接指向第二个结点，而head还是指向头结点，因此会报错。
  // 所以此时要么返回head.next，要么返回dumpy.next。
  // 而head.next的返回需要判断second.next是不是指向头结点
  // 而dumpy.next则直接使用
  return dumpy.next
}
