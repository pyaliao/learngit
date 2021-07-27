/*
** 问题描述：反转32位有符号整数，如果反转后的数字溢出，则返回0
** author：aliao
*/
#include <stdio.h>
#include <limits.h>

int reverse(int x)
{
  int mod = 0;
  int reverse = 0;
  while (x != 0)
  {
    mod = x % 10;
    x = x / 10;
    // 当x为正值时，reverse必是正值，则当
    // 当reverse > INT_MAX/10时，reverse*10 + mod 必然大于INT_MAX，必然溢出
    // 当reverse == INT_MAX/10时，reverse*10 + mod要大于INT_MAX（即溢出），则mod必须大于7
    if (reverse > INT_MAX / 10 || reverse == INT_MAX / 10 && mod > 7)
    {
      return 0;
    }
    // 同理，当x为负值时，reverse为负值，则当
    // reverse < INT_MIN / 10时，reverse必然溢出
    // reverse == INT_MIN / 10 && mod < -8，reverse溢出
    if (reverse < INT_MIN / 10 || reverse == INT_MIN / 10 && mod < -8)
    {
      return 0;
    }
    reverse = reverse * 10 + mod;
  }
  return reverse;
}

int main (void) {
  int x = 178237;
  int y = -23682;
  printf("%d %d %d %d\n", reverse(x), reverse(y), reverse(1234567894), reverse(-1234567894));
  printf("%d %d", INT_MIN, INT_MAX);
  return 0;
}