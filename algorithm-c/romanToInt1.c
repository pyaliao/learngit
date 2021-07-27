#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int getValue(char c)
{
  switch (c)
  {
  case 'M':
    return 1000;
    break;
  case 'D':
    return 500;
    break;
  case 'C':
    return 100;
    break;
  case 'L':
    return 50;
    break;
  case 'X':
    return 10;
    break;
  case 'V':
    return 5;
    break;
  case 'I':
    return 1;
    break;
  default:
    return -1;
    break;
  }
}

int romanToInt(char *str)
{
  int k = 0;
  int num = 0;
  while (str[k] != '\0')
  {
    int numCurt = getValue(str[k]);
    // 判断下一个字符是否是空字符，防止字符串越界
    // 如果是空字符，就将其下标与前一个字符的下标置为一样
    int numNext = str[k + 1] != '\0' ? getValue(str[k + 1]) : numCurt;
    if (numCurt < numNext)
    {
      num += numNext - numCurt;
      k += 2;
    }
    else
    {
      num += numCurt;
      k++;
    }
  }
  return num;
}

int main(void)
{
  char *str = "MCMXCIV";
  printf("%d\n", romanToInt(str));
}