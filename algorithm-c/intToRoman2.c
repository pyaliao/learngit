#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char *intToRoman(int num)
{
  char *thousandsRoman[] = {"", "M", "MM", "MMM"};
  char *hundredsRoman[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
  char *tensRoman[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
  char *onesRoman[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
  char *str = (char *)malloc(16 * sizeof(char));
  memset(str, '\0', 16);
  int tods = num / 1000;
  int huds = (num % 1000) / 100;
  int tens = (num % 100) / 10;
  int ones = num % 10;
  strcat(str, thousandsRoman[tods]);
  strcat(str, hundredsRoman[huds]);
  strcat(str, tensRoman[tens]);
  strcat(str, onesRoman[ones]);
  return str;
}

int main(void)
{
  int num = 3999;
  printf("%s\n", intToRoman(num));
}