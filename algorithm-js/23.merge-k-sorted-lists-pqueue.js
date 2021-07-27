// 23. 合并K个升序链表
// 给你一个链表数组，每个链表都已经按升序排列。
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

// 示例 1：
// 输入：lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
// 输出：[1, 1, 2, 3, 4, 4, 5, 6]
// 解释：链表数组如下：
// [
//   1 -> 4 -> 5,
//   1 -> 3 -> 4,
//   2 -> 6
// ]
// 将它们合并到一个有序链表中得到。
// 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6

// 示例 2：
// 输入：lists = []
// 输出：[]

// 示例 3：
// 输入：lists = [[]]
// 输出：[]

// 提示：
// k == lists.length
// 0 <= k <= 10 ^ 4
// 0 <= lists[i].length <= 500
// - 10 ^ 4 <= lists[i][j] <= 10 ^ 4
// lists[i] 按升序排列
// lists[i].length的总和不超过10 ^ 4

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

// 定义一个优先队列类
// 有构造方法，入队及出队方法，还有返回队列长度的方法
// 此队列构建比较简单，入队直接push(O(1))，
// 出队则根据优先条件判断(此处是结点值的大小，O(k))，
class PriorityQueue {
  constructor (arr) {
    if (arr.length) {
      this.queue = arr
      return
    }
    this.queue = []
  }

  enqueue (node) {
    this.queue.push(node)
  }

  dequeue () {
    let min = 0
    const len = this.queue.length
    for (let i = 1; i < len; i++) {
      if (this.queue[i].val < this.queue[min].val) {
        min = i
      }
    }
    // 此处注意 -- splice返回的是一个包含被删除元素的数组
    // 如果没有删除元素，则返回的是一个空数组，因此此处需要数组取出元素
    return this.queue.splice(min, 1)[0]
  }

  getLen () {
    return this.queue.length
  }
}
function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
const mergeKLists = function (lists) {
  // 将k个链表的首结点添加到优先队列
  const listsLen = lists.length
  const queue = new PriorityQueue()
  // 创建一个头结点，以便以后返回最终的链表
  const headNode = new ListNode()
  // 创建一个移动的结点，该节点始终指向拼接成的链表的最后一个结点
  let moveNode = headNode
  // 先将所有链表中的头结点存入优先队列
  for (let i = 0; i < listsLen; i++) {
    if (lists[i]) {
      queue.enqueue(lists[i])
    }
  }
  // 遍历整个队列
  while (queue.getLen()) {
    const currentNode = queue.dequeue()
    // 为拼接链表添加新的结点
    moveNode.next = currentNode
    // 添加新结点之后，将移动结点指向新的结点
    moveNode = moveNode.next
    // 如果出队的结点指向下一个存在的结点，则将其指向的结点存储到队列
    if (currentNode.next) {
      queue.enqueue(currentNode.next)
    }
  }
  return headNode.next
}
