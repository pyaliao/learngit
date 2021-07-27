// 基于数组实现的一个二叉堆结构的优先队列

class PriorityQueue {
  constructor (arr) {
    if (arr && arr.length) {
      this.build(arr)
      return
    }
    this.queue = []
  }

  build (arr) {
    this.queue = []
    this.queue.push(arr[0])
    const len = arr.length
    for (let i = 1; i < len; i++) {
      this.queue.unshift(arr[i])
      // 执行下沉操作
      this.down(0)
    }
  }

  down (index) {
    // 最后一个飞叶子结点的下标： parseInt((len - 2) / 2)
    // 1. 当len为偶数时，最后一个结点是左叶子结点，其父元素是最后一个非叶子结点，
    // 非叶子结点的下标是 (len - 2) / 2
    // 2. 当len为奇数时，最后一个结点是又叶子结点，其父元素是最后一个非叶子结点，
    // 非叶子结点的下标是 (len - 3) / 2
    // 综合起来就是 parseInt((len - 2) / 2)

    // 叶子结点不需要进行下沉操作
    const lastNonLeafNodeIndex = parseInt((this.queue.length - 2) / 2)
    if (index > lastNonLeafNodeIndex) {
      return
    }
    // 当结点是非叶子结点时，对其执行下沉操作
    while (index <= lastNonLeafNodeIndex) {
      const leftChild = this.queue[2 * index + 1]
      const rightChild = this.queue[2 * index + 2] || this.queue[2 * index + 1]
      const maxChild = leftChild >= rightChild ? leftChild : rightChild
      const maxChildIndex = leftChild >= rightChild ? (2 * index + 1) : (2 * index + 2)
      // 不满足最大堆的性质，则交换这两个结点(此处是最大堆，最小堆则改为大于即可)
      if (this.queue[index] < maxChild) {
        [this.queue[index], this.queue[maxChildIndex]] = [this.queue[maxChildIndex], this.queue[index]]
        // 更新下标
        index = maxChildIndex
      } else {
        // 满足最大堆性质，则直接退出函数
        return
      }
    }
  }

  up (index) {
    while (index >= 0) {
      // 父结点下标随着子结点下标的变化而变化
      const parentNodeIndex = parseInt((index - 1) / 2)
      if (this.queue[index] > this.queue[parentNodeIndex]) {
        [this.queue[index], this.queue[parentNodeIndex]] = [this.queue[parentNodeIndex], this.queue[index]]
        index = parentNodeIndex
      } else {
        return
      }
    }
  }

  enqueue (val) {
    // 此处得上浮，下沉不可以
    this.queue.push(val)
    this.up(this.queue.length - 1)
  }

  dequeue () {
    const ret = this.queue.shift()
    const node = this.queue.pop()
    this.queue.unshift(node)
    this.down(0)
    return ret
  }
}
const p = new PriorityQueue([4, 2, 6, 8, 1, 5, 7, 3, 9])
console.log(p.queue)
p.enqueue(13)
console.log(p.queue)
p.dequeue()
console.log(p.queue)
p.enqueue(12)
console.log(p.queue)
