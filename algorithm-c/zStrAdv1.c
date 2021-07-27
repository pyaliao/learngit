#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *convert (char *str, int numRows) {
  int len = strlen(str);
  // 必须排除非Z字形的情况
  if (numRows < 2)
  {
    return str;
  }
  int k = 0;
  int loopConst = 2 * numRows - 2;
  char *retStr = (char *)malloc((len + 1) * sizeof(char));
  for (int row = 0; row < numRows; row++) {
    for (int i = 0; i + row < len; i += loopConst) {
      retStr[k++] = str[i + row];
      if (row != 0 && row != numRows - 1 && i + loopConst - row < len ) {
        retStr[k++] = str[i + loopConst - row]; 
      }
    }
  }
  retStr[k] = '\0';
  return retStr;
}

int main (void) {
  char *str = "msd";
  int numRows = 4;
  char *retStr = NULL;
  int i = 0;
  retStr = convert(str, numRows);
  while (retStr[i] != '\0')
  {
    printf("%c", retStr[i++]);
  }
  printf("\n");
}