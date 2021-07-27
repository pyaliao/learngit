/*
** 将字符串转换为数字——LeetCode第8题
** author: aliao
*/
#include <stdio.h>
#include <limits.h>

int myAtoi(char *str)
{
  int i = 0;
  int start = 0;
  int len = 0;
  // 遍历字符串中起始的空格字符
  while (str[i] == 32)
  {
    i++;
  }
  // 如果非空首字符不是-+或者0-9这三类字符，则直接返回0
  // 如果是空字符串或者字符串只包含空白子字符
  if (str[i] != '-' && str[i] != '+' && (str[i] < 48 || str[i] > 57))
  {
    return 0;
  }
  else
  {
    start = i;
    len += 1;
    i++;
  }
  while (str[i] >= 48 && str[i] <= 57)
  {
      len += 1;
      i++;
  }
  int reverse = 0;
  int k = 10;
  int isNeg = 1;
  for (int j = 0; j < len; j++)
  {
    if (j == 0)
    {
      if (str[start + j] == '-')
      {
        isNeg = -1;
        continue;
      }
      else if (str[start + j] == '+')
      {
        continue;
      }
    }
    if (reverse < INT_MIN / 10 || reverse == INT_MIN / 10 && str[start + j] - 48 > 8)
    {
      return INT_MIN;
    }
    if (reverse > INT_MAX / 10 || reverse == INT_MAX / 10 && str[start + j] - 48 > 7)
    {
      return INT_MAX;
    }
    reverse = reverse * k + isNeg * (str[start + j] - 48);
  }
  return reverse;
}
int main (void) {
  char *str = "-2147483648";
  printf("final value: %d", myAtoi(str));
}