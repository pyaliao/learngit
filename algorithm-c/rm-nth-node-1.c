/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
// 比较朴素的算法
// 先求出链表长度，然后根据长度求出要删除的元素正向的位置
// 最后遍历到该元素前一元素进行删除操作

struct ListNode *removeNthFromEnd(struct ListNode *head, int n)
{
  int len = 0;
  struct ListNode *origin = head; 
  // 计算链表的长度
  while (head)
  {
    len++;
    head = head -> next;
  }
  // 将head重新指向头结点
  head = origin;
  // 计算是正向第几个节点
  int count = len - n;
  // 如果是正向第一个结点，则头结点被删除，只需要直接返回头结点的next即可
  if (count == 0) {
    return head -> next;
  } 
  // 如果不是正向第一个结点（即结点），则直接遍历到该结点的前一个结点
  for (int i = 0; i < count - 1; i++) {
    head = head -> next;
  }
  // 将该节点删除，然后返回头结点的指针
  head -> next = head -> next -> next;
  return origin;
}