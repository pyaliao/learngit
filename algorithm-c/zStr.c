#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char *zStr(char *str, int numRows)
{
  int k = 0;
  int len = strlen(str);
  if (numRows < 2)
  {
    return str;
  }
  char *resStr = (char *)malloc((len + 1) * sizeof(char));
  for (int row = 0; row < numRows; row++)
  {
    for (int i = 0; i < len; i++)
    {
      if (i % (2 * numRows - 2) == row || i % (2 * numRows - 2) == 2 * numRows - 2 - row)
      {
        resStr[k++] = str[i];
      }
    }
  }
  resStr[len] = '\0';
  return resStr;
}

int main(void)
{
  char *str = "nfgszvcsdx";
  int numRows = 5;
  char *retStr = zStr(str, numRows);
  int i = 0;
  while (retStr[i] != '\0')
  {
    printf("%c", retStr[i]);
    i++;
  }
  printf("\n");
}