#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int getIndex(char *str, char c) 
{
  int k = 0;
  while (str[k] != '\0')
  {
    if (str[k] == c) 
    {
      return k;
    }
    k++;
  }
  return -1;
}

int romanToInt(char *str)
{
  int numArr[] = {1000, 500, 100, 50, 10, 5, 1};
  char roman[] = {'M', 'D', 'C', 'L', 'X', 'V', 'I'};
  int k = 0;
  int num = 0;
  while (str[k] != '\0') {
    int indexCurt = getIndex(roman, str[k]);
    // 判断下一个字符是否是空字符，防止字符串越界
    // 如果是空字符，就将其下标与前一个字符的下标置为一样
    int indexNext = str[k + 1] != '\0' ? getIndex(roman, str[k + 1]) : indexCurt;
    if (numArr[indexCurt] < numArr[indexNext])
    {
      num += numArr[indexNext] - numArr[indexCurt];
      k += 2;
    } else {
      num += numArr[indexCurt];
      k++;
    }
  }
  return num;
}

int main(void) {
  char *str = "MCMXCIV";
  printf("%d\n", romanToInt(str));
}