// 横向遍历法
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int getCommonPrefix(char *prev, char *next) {
  int len = strlen(prev) < strlen(next) ? strlen(prev) : strlen(next);
  int k = 0;
  while (k < len) {
    if (prev[k] != next[k]) {
      return k;
    }
    k++;
  }
  return k;
}

char *longestCommonPrefix(char **strs, int strsSize) {
  if (strsSize <= 0) {
    return "";
  }
  int commonPrefixLen = strlen(strs[0]);
  char *commonPrefix = (char *)malloc((commonPrefixLen + 1) * sizeof(char));
  strncpy(commonPrefix, *strs, commonPrefixLen);
  // 给字符串结尾加上空字符，否则会数组访问出错，导致堆溢出
  // 这个问题找了好久，最后发现strncpy只是复制字符，并不会自动在字符串结尾添加空字符
  *(commonPrefix + commonPrefixLen) = '\0';
  for (int i = 1; i < strsSize; i++)
  {
    // 获取公共子字符串长度
    int len = getCommonPrefix(commonPrefix, *(strs + i));
    // 将字符串初始化为全空，此后复制字符不用担心结尾添加空字符的问题
    memset(commonPrefix, '\0', commonPrefixLen + 1);
    if (len <= 0) {
      return commonPrefix;
    }
    strncpy(commonPrefix, *(strs + i), len);
  }
  return commonPrefix;
}

int main(void) {
  char *strs[] = {"flower", "flow", "flight"};
  printf("%s\n", longestCommonPrefix(strs, 3));
}