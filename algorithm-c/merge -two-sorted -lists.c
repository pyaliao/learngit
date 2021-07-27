/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
#include <stdio.h>
// 声明链表结点的结构
struct ListNode
{
  int val;
  struct ListNode *next;
};
struct ListNode *mergeTwoLists(struct ListNode *l1, struct ListNode *l2)
{
  // 定义一个头结点
  struct ListNode headNode = { 0, NULL };
  // 定义一个指向头结点的指针，用来在拼接时移动，它永远指向新链表的最后一个结点
  struct ListNode *moveNode = &headNode;
  while (l1 && l2)
  {
    // 如果了l1指向的结点的值小于等于l2指向的节点的值，
    // 则将l1指向的节点拼接到moveNode后面，然后将l1向后移动一个结点
    if (l1->val <= l2->val)
    {
      moveNode->next = l1;
      l1 = l1->next;
    }
    else   
    {
      // 如果了l1指向的结点的值大于l2指向的节点的值，
      // 则将l2指向的节点拼接到moveNode后面，然后将l2向后移动一个结点
      moveNode->next = l2;
      l2 = l2->next;
    }
    // 这一步很重要，将moveNode移动到新链表的最后一个结点
    moveNode = moveNode->next;
  }
  // 无论l1还是l2先到达链表结尾，最后进行判断，将多余的直接拼接到新链表的结尾，即moveNode的next
  // 如果同时到达结尾，则直接拼上即可
  moveNode->next = l1 == NULL ? l2 : l1;
  // 最后返回头结点指向的结点的地址，即我们需要的新链表的首结点的地址
  return headNode.next;
}