/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
// 声明链表结点的结构
struct ListNode
{
  int val;
  struct ListNode *next;
};
// 如果 l1 或者 l2 一开始就是空链表 ，那么没有任何操作需要合并，所以我们只需要返回非空链表。
// 否则，我们要判断 l1 和 l2 哪一个链表的头节点的值更小，然后递归地决定下一个添加到结果里的节点。
// 如果两个链表有一个为空，递归结束。
struct ListNode *mergeTwoLists(struct ListNode *l1, struct ListNode *l2) 
{
  if (!l1) 
  {
    return l2;
  } else if (!l2) 
  {
    return l1;
  } else if (l1 -> val <= l2 -> val) 
  {
    l1 -> next = mergeTwoLists(l1 -> next, l2);
    return l1;
  } else {
    l2 -> next = mergeTwoLists(l2 -> next, l1);
    return l2;
  }
}