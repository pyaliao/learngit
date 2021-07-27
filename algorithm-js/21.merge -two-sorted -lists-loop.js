// 21. 合并两个有序链表
// 将两个升序链表合并为一个新的 升序 链表并返回。
// 新链表是通过拼接给定的两个链表的所有节点组成的。

// 示例 1：
// 输入：l1 = [1, 2, 4], l2 = [1, 3, 4]
// 输出：[1, 1, 2, 3, 4, 4]

// 示例 2：
// 输入：l1 = [], l2 = []
// 输出：[]

// 示例 3：
// 输入：l1 = [], l2 = [0]
// 输出：[0]

// 提示：
// 两个链表的节点数目范围是[0, 50]
// - 100 <= Node.val <= 100
// l1 和 l2 均按非递减顺序排列

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
const mergeTwoLists = function (l1, l2) {
  // 定义一个头结点
  let returnLink = new ListNode()
  // 定义一个指向头结点的指针，用来在拼接时移动，它永远指向新链表的最后一个结点
  let movedNode = returnLink
  while (l1 && l2) {
    // 如果了l1指向的结点的值小于等于l2指向的节点的值，
    // 则将l1指向的节点拼接到moveNode后面，然后将l1向后移动一个结点
    if (l1.val <= l2.val) {
      movedNode.next = l1
      l1 = l1.next
    } else {
      // 如果了l1指向的结点的值大于l2指向的节点的值，
      // 则将l2指向的节点拼接到moveNode后面，然后将l2向后移动一个结点
      movedNode.next = l2
      l2 = l2.next
    }
    // 这一步很重要，将moveNode移动到新链表的最后一个结点
    movedNode = movedNode.next
  }
  // 无论l1还是l2先到达链表结尾，最后进行判断，将多余的直接拼接到新链表的结尾，即moveNode的next
  // 如果同时到达结尾，则直接拼上即可
  movedNode.next = l1 === null ? l2 : l1
  // 最后返回头结点指向的结点的地址，即我们需要的新链表的首结点的地址
  return returnLink.next
}
