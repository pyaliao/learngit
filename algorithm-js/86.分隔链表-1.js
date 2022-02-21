// 86. 分隔链表
// 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，
// 使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
// 你应当 保留 两个分区中每个节点的初始相对位置。

// 示例 1：
// 输入：head = [1, 4, 3, 2, 5, 2], x = 3
// 输出：[1, 2, 2, 4, 3, 5]

// 示例 2：
// 输入：head = [2, 1], x = 2
// 输出：[1, 2]

// 提示：
// 链表中节点的数目在范围[0, 200]内
// - 100 <= Node.val <= 100
// - 200 <= x <= 200

// 暴力解法：直接维护两个数组，将大于等于x的值存储到一个数组，将小于x的值存储到另一个数组
// 然后遍历最终的数组，生成新的链表

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
const partition = function (head, x) {
  const small = []
  const big = []
  while (head) {
    if (head.val < x) {
      small.push(head.val)
    } else {
      big.push(head.val)
    }
    head = head.next
  }
  const newList = [...small, ...big]
  const len = newList.length
  let next = null
  for (let j = len - 1; j >= 0; j--) {
    next = new ListNode(newList[j], next)
  }
  return next
}
