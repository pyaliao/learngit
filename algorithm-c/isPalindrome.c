/*
** 判断一个整数是不是回文数
**
*/
#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <stdlib.h>

// 将整数转换为数字字符串
void myItoA(int num, char *str)
{
  int i = 0;
  while (num > 0)
  {
    str[i++] = num % 10 + 48;
    num /= 10;
  }
  str[i] = '\0';
}

// 判断字符串是否是回文字符串
// 双指针法，从首位开始遍历
bool isPalindrome(int x)
{
  if (x < 0) {
    return false;
  }
  if (x == 0) {
    return true;
  }
  // 获取数字长度
  int len = 0;
  int temp = x;
  while (temp > 0)
  {
    len++;
    temp /= 10;
  }
  printf("len is %d\n", len);
  // 动态分配存储空间
  char *str = (char *)malloc((len + 1) * sizeof(char));
  myItoA(x, str);
  int k = 0;
  for (int i = 0, j = len - 1; i < j; i++, j--) {
    if (str[i] != str[j]) {
      return false;
    } 
  }
  return true;
}

int main (void) {
  int num = -12321;
  printf("\n%d\n", isPalindrome(num));
}