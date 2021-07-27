// 二分查找
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int getMinLen(char **strs, int strsSize) 
{
  int minLen = strlen(strs[0]);
  for (int i = 1; i < strsSize; i++) {
    if (strlen(strs[i]) < minLen)
    {
      minLen = strlen(strs[i]);
    }
  }
  return minLen;
}

int isCommonPrefix(char **strs, int strsSize, int mid) {
  for (int i = 0; i < strsSize - 1; i++) {
    if (strncmp(strs[i], strs[i + 1], mid) != 0) {
      return 0;
    }
  }
  return 1;
}

char *longestCommonPrefix(char **strs, int strsSize)
{
  if (strsSize <= 0) {
    return "";
  }
  int minLen = getMinLen(strs, strsSize);
  char *commonPrefix = (char *)malloc((minLen + 1) * sizeof(char)); 
  memset(commonPrefix, '\0', minLen + 1);
  int left = 1;
  int right = minLen;
  while (left <= right) {
    int mid = (left + right) / 2;

    if (isCommonPrefix(strs, strsSize, mid))
    {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  strncpy(commonPrefix, strs[0], right);
  return commonPrefix;
}

int main(void)
{
  char *strs[] = {"flower", "flow", "flight"};
  printf("%s\n", longestCommonPrefix(strs, 3));
}