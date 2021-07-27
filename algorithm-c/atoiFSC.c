/*
** 将字符串转换为数字——LeetCode第8题
** author: aliao
** 状态机解法
*/
#include <stdio.h>
#include <limits.h>

int getColStat(char c)
{
  if (c == ' ')
    return 0;
  if (c == '-' || c == '+')
    return 1;
  if (c >= 48 && c <= 57)
    return 2;
  return 3;
}
int myAtoi(char *str)
{
  int stat = 0;
  int i = 0;
  int sign = 1;
  int rev = 0;
  struct table
  {
    char *key;
    char *arr[4];
  } arr[4] = {
      {"start", {"start", "signed", "inNumber", "end"}},
      {"signed", {"end", "end", "inNumber", "end"}},
      {"inNumber", {"end", "end", "inNumber", "end"}},
      {"end", {"end", "end", "end", "end"}}};
  while (str[i] != '\0')
  {
    // 获取stat，初始值为0，对应的是arr中的start状态
    // stat对应的行与getColStat(str[i])获取的列最终决定了当前的状态值
    // 如果当前状态值为start，则stat置为0，然后根据下一个getColStat(str[i])确定遍历下一个元素时的状态
    if (arr[stat].arr[getColStat(str[i])] == "start")
    {
      stat = 0;
      i++;
    } // 值为1时，对应的是arr中的signed状态
    // 更新sign的值，其他的与stat为0时一样，继续循环确定下一个元素的状态
    else if (arr[stat].arr[getColStat(str[i])] == "signed")
    {
      stat = 1;
      sign = str[i] == '-' ? -1 : 1;
      i++;
    } // 值为2时，对应的是arr中的inNumber状态
    else if (arr[stat].arr[getColStat(str[i])] == "inNumber")
    {
      // 此处是判断整数是否越界
      if (rev < INT_MIN / 10 || rev == INT_MIN / 10 && str[i] - 48 > 8)
      {
        return INT_MIN;
      }
      if (rev > INT_MAX / 10 || rev == INT_MAX / 10 && str[i] - 48 > 7)
      {
        return INT_MAX;
      }
      rev = rev * 10 + sign * (str[i] - 48);
      stat = 2;
      i++;

    } // 值为3时，对应的是arr中的end状态
      // 直接返回rev值
      // 如果一开始状态就位end，也是直接返回rev（此时rev为0，符合题目要求）
    else if (arr[stat].arr[getColStat(str[i])] == "end")
    {
      return rev;
    }
  }
  // 返回最终的rev
  // 如果是空字符串，则直接返回0
  // 如果是非空，则经历上面循环的遍历
  return rev;
}

int main(void)
{
  char *str = "   000-423432";
  printf("%d", myAtoi(str));
}