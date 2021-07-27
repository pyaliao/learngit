/**
 * Note: The returned array must be malloced, assume caller calls free().
 **/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
// 定义数组，让数字与相应的字母对应起来
char *letterNumber[] = {"",
                        "",
                        "abc",
                        "def",
                        "ghi",
                        "jkl",
                        "mno",
                        "pqrs",
                        "tuv",
                        "wxyz"};
// 定义变量来存储digits的长度及备份
int len;
char *digitsBak;

// 定义变量存储要返回的字符串数组以及字符串个数
char **res;
int resSize;
// 定义变量存储每个组合成的字符串及其长度
char *resItem;
int resItemSize;

void backTrack(int index)
{
  // 递归出口：当遍历的深度与digits的长度一致时，就存储组合成的字符串到字符串数组
  if (index == len)
  {
    // 给tmp分配空间
    char *tmp = malloc(sizeof(char) * (resItemSize + 1));
    // 将组合好的字符串拷贝到tmp
    memcpy(tmp, resItem, sizeof(char) * (resItemSize + 1));
    // 将tmp存储到最终要返回的数组
    res[resSize++] = tmp;
  }
  else
  {
    // 取输入的字符串中的数字字符，将其转换为数字，作为下标获取数字对应的字符串
    int digitIndex = digitsBak[index] - '0';
    char *letters = letterNumber[digitIndex];
    int lettersLen = strlen(letters);
    for (int i = 0; i < lettersLen; i++)
    {
      // 将当前遍历的字符存储到组合字符串中，并给其末尾添加空字符以结束字符串
      // 空字符发ASCII码为0，在C中，字符被存储为整形
      resItem[resItemSize++] = letters[i];
      resItem[resItemSize] = 0;
      // 递归调用
      backTrack(index + 1);
      // 前一次递归调用执行完则回退，进行本层循环的下一次循环
      resItem[--resItemSize] = 0;
    }
  }
}

char **letterCombinations(char *digits, int *returnSize)
{
  len = strlen(digits);
  resSize = 0;
  resItemSize = 0;
  // digits为空，则直接返回NULL，并将*returnSize置为0
  if (len == 0)
  {
    *returnSize = 0;
    return NULL;
  }
  int count = 1;
  digitsBak = digits;
  // 根据digits的长度，确定最终可能的字符串的个数
  // 因为数字对应的最长的字符数是4，因此最终可能的字符串个数为4^len个
  for (int i = 0; i < len; i++)
  {
    count *= 4;
  }
  // 给字符串数组分配存储空间
  res = (char **)malloc(count * sizeof(char *));
  // 给用来存储组合字符串的变量分配存储空间，大小为digits的长度加1
  resItem = (char *)malloc(sizeof(char) * (len + 1));
  backTrack(0);
  // 将最终的字符串数组的长度赋值给*returnSize，并将字符串数组返回
  *returnSize = resSize;
  return res;
}

int main(void)
{
  int *count;
  letterCombinations("2", count);
  for (int i = 0; i < *count; i++)
  {
    printf("%s\n", res[i]);
  }
  printf("\n");
  return 0;
}