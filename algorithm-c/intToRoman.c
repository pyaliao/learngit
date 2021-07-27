#include <stdio.h>
#include <string.h>
#include <stdlib.h>
char * intToRoman(int num) {
  struct intToRoman
  {
    int num;
    char *str;
  } list[13] = {
      {1000, "M"},
      {900, "CM"},
      {500, "D"},
      {400, "CD"},
      {100, "C"},
      {90, "XC"},
      {50, "L"},
      {40, "XL"},
      {10, "X"},
      {9, "IX"},
      {5, "V"},
      {4, "IV"},
      {1, "I"},
  };
  int count[13] = {0};
  char *str = (char*)malloc(17 * sizeof(char));
  memset(str, '\0', 17);
  for (int i = 0; i < 13; i++) {
      int count = num / list[i].num;
      while (count-- > 0)
      {
        strcat(str, list[i].str);
      }
      num %= list[i].num;
  }
  return str;
}

int main(void) {
  int num = 3999;
  printf("\n%s\n", intToRoman(num));
}