/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
//  双指针法，移动first指针使其到的链表末端，同时移动second指针
//  使其指向最终要删除的节点的前一个节点，此时即可删除节点并返回头结点
//  只需一轮循环即可完成
struct ListNode *removeNthFromEnd(struct ListNode *head, int n)
{
  // 创建一个哑结点，并将其指向头结点
  struct ListNode dumpy = {0, head};
  // 将first指针指向head头指针
  struct ListNode *first = head;
  // 将second指针指向哑结点，此处dumpy是结构体，因此需要取地址
  struct ListNode *second = &dumpy;
  for (int i = 0; i < n; i++)
  {
    first = first->next;
  }
  while (first)
  {
    first = first->next;
    second = second->next;
  }
  second->next = second->next->next;
  // first second和head都是结构体指针，因此可以使用 -> 访问成员
  // dumpy是结构体，可以直接用点号访问
  return dumpy.next;
}