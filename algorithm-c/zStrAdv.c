#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char *convert(char *str, int numRows)
{
  int k = 0;
  int len = strlen(str);
  char *resStr = (char *)malloc((len + 1) * sizeof(char));
  // 特殊情况：行数小于2，或者字符串长度不大于行数，则直接返回字符串
  // 因为此时要么只有一行，要么只有一列
  if (numRows < 2 || len <= numRows)
  {
    return str;
  }
  for (int row = 0; row < numRows; row++)
  {
    // 将每一个numRows指定的行的行首字符存储到返回字符
    resStr[k++] = str[row];
    for (int i = row; i < len;)
    {
      // 在每一个numRows行，寻找原字符串中相应的元素下标

      // 每行第二个元素下标与第一个元素下标具有以下关系：j = i + 2numRows - 2 - 2row
      // 特殊情况：最后一行第一个和第二个元素是重合的，因此下面的表达式为： i += 0 -> i，即i没变
      i += 2 * (numRows - row - 1);
      // 特殊情况：最后一行第一个和第二个元素是重合的，因此，不需要计算，
      // 在这里排除最后一行：numRows - row > 1
      if (numRows - row > 1 && i < len) {
        resStr[k++] = str[i];
      }
      // 每行第二个元素和第三个元素下标具有以下关系：j = i + 2row
      // 特殊情况：最后一行第一个和第二个元素是重合的，因此第三个元素与第一个元素下标符合此关系
      i += 2 * row;
      if (row > 0 && i < len)
      {
        resStr[k++] = str[i];
      }
    }
  }
  resStr[k] = '\0';
  return resStr;
}

int main(void)
{
  char *str = "nfgszvcsdx";
  int numRows = 5;
  char *retStr = convert(str, numRows);
  int i = 0;
  while (retStr[i] != '\0')
  {
    printf("%c", retStr[i]);
    i++;
  }
  printf("\n");
}