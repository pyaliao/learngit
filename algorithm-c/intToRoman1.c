#include <stdio.h>
#include <string.h>
#include <stdlib.h>
char *intToRoman(int num)
{
  int numArr[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
  char *roman[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
  int count[13] = {0};
  char *str = (char *)malloc(17 * sizeof(char));
  memset(str, '\0', 17);
  for (int i = 0; i < 13; i++)
  {
    int count = num / numArr[i];
    while (count-- > 0)
    {
      strcat(str, roman[i]);
    }
    num %= numArr[i];
  }
  return str;
}

int main(void)
{
  int num = 3999;
  printf("\n%s\n", intToRoman(num));
}