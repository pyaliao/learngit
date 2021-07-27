#include <stdbool.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int isPalindromic(char *str, int start, int end)
{
  while (start < end)
  {
    if (str[start] != str[end])
    {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

char *findPalindromic(char *str)
{
  int len = strlen(str);
  int k = 0;
  if (len == 0)
  {
    return str;
  }
  // 回文字符串最小长度为1，因为任何一个字符从左往右和从右往左读都是回文的
  int maxLen = 1, startIndex = 0;
  for (int i = 0; i < len - 1; i++)
  {
    for (int j = i + 1; j < len; j++)
    {
      // 当新的子串长度大于maxLen时，再判断是否回文
      // 如果回文，则更新maxLen，同时更新startIndex
      if (j - i + 1 > maxLen && isPalindromic(str, i, j))
      {
        maxLen = j - i + 1;
        startIndex = i;
      }
    }
  }
  str[startIndex + maxLen] = '\0';
  return str + startIndex;
  // 分配存储空间，存储新字符串并返回
  // 分配的时候要多分配一个空间用来存储空字符'\0'
  // char *palindromic = (char *)malloc((maxLen + 1) * sizeof(char));
  // for (int i = 0; i < maxLen; i++)
  // {
  //   palindromic[i] = str[startIndex + i];
  // }
  // palindromic[maxLen] = '\0';
  // return palindromic;
}
int main(void)
{
  int i = 0;
  char str[] = "abcdefghgfedklmn";
  char *palind = NULL;
  palind = findPalindromic(str);
  while (palind[i] != '\0')
  {
    printf("%c", palind[i]);
    i++;
  }
}