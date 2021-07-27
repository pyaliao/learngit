#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// 中心扩散法
int expandCenter(char *str, int left, int right, int len)
{
  // 如果长度是奇数，则中心只有一个，left和right传相同的值
  // 如果长度是偶数，则中心是两个数，left和right相差1
  while (left >= 0 && right < len)
  {
    if (str[left] == str[right])
    {
      left--;
      right++;
    }
    else
    {
      break;
    }
  }
  return right - left - 1;
}

char *longestPalindrome(char *str)
{
  int len = strlen(str);
  if (len < 2)
  {
    return str;
  }
  int maxLen = 1;
  int startIndex = 0;
  for (int i = 0; i < len; i++)
  {
    // 当回文串长度为奇数时调用
    int odd = expandCenter(str, i, i, len);
    // 当回文串长度为偶数时调用
    int even = expandCenter(str, i, i + 1, len);
    // 将最长的赋值给maxLen
    int newMaxLen = odd > even ? odd : even;
    if (newMaxLen > maxLen)
    {
      maxLen = newMaxLen;
      startIndex = i - (maxLen - 1) / 2;
    }
  }
  str[startIndex + maxLen] = '\0';
  return str + startIndex;
  // char *newStr = (char *)malloc((maxLen + 1) * sizeof(char));
  // for (int i = 0; i < maxLen; i++) {
  //   newStr[i] = str[i + startIndex];
  // }
  // newStr[maxLen] = '\0';
  // return newStr;
}

int main(void)
{
  // 此处用字符指针会出错，因为字符指针指向的是一个字符串常量，不能被修改
  char str[] = "abcdefghgfedklmn";
  char *palind = NULL;
  palind = longestPalindrome(str);
  int i = 0;
  while (palind[i] != '\0')
  {
    printf("%c", palind[i]);
    i++;
  }
}