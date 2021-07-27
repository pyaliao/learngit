// 纵向遍历法

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *longestCommonPrefix(char **strs, int strsSize)
{
  if (strsSize <= 0) {
    return "";
  }
  int len = strlen(strs[0]);
  char *commonPrefix = (char *)malloc((len + 1) * sizeof(char));
  memset(commonPrefix, '\0', len + 1);
  for (int i = 0; i < len; i++)
  {
    for (int j = 0; j < strsSize - 1; j++) {
      // i == strlen(strs[j])用来防止数组访问越界
      if (i == strlen(strs[j]) || strs[j][i] != strs[j + 1][i])
      {
        strncpy(commonPrefix, strs[0], i);
        return commonPrefix;
      }
    }
  }
  return strs[0];
}

int main(void) {
  char *strs[] = {"flower","flow","flight"};
  printf("%s\n", longestCommonPrefix(strs, 3));
}