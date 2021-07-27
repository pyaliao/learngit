/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */

#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b)
{
  return *((int *)a) - *((int *)b);
}

int **fourSum(int *nums, int numsSize, int target, int *returnSize, int **returnColumnSizes)
{
  if (numsSize < 4)
  {
    *returnSize = 0;
    *returnColumnSizes = NULL;
    return NULL;
  }
  // 先对数组进行排序
  qsort(nums, numsSize, sizeof(int), cmp);
  // 初始化*returnSize
  *returnSize = 0;
  // 分配存储四元组的数组
  int **returnArr = (int **)malloc(sizeof(int *) * (numsSize - 2) * (numsSize - 2));
  *returnColumnSizes = (int *)malloc(sizeof(int) * (numsSize - 2) * (numsSize - 2));
  // 开始进入循环
  // 由于进行了剪枝操作，因此，要用i < numsSize - 3作为终止循环的条件
  // 否则会导致数组访问越界
  for (int i = 0; i < numsSize - 3; i++)
  {
    // 剪枝操作
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target)
    {
      break;
    }
    if (nums[i] + nums[numsSize - 3] + nums[numsSize - 2] + nums[numsSize - 1] < target)
    {
      continue;
    }
    // 首元素去重
    if (i > 0 && nums[i] == nums[i - 1])
    {
      continue;
    }
    // 由于进行了剪枝操作，因此，要用j < numsSize - 2作为终止循环的条件
    // 否则会导致数组访问越界
    for (int j = i + 1; j < numsSize - 2; j++)
    {
      // 剪枝操作
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target)
      {
        break;
      }
      if (nums[i] + nums[j] + nums[numsSize - 2] + nums[numsSize - 1] < target)
      {
        continue;
      }
      // 第二个元素去重
      if (j > i + 1 && nums[j] == nums[j - 1])
      {
        continue;
      }
      int head = j + 1;
      int tail = numsSize - 1;
      while (head < tail)
      {
        // 左指针去重
        if (head > j + 1 && nums[head] == nums[head - 1])
        {
          head++;
          continue;
        }
        // 右指针去重
        if (tail < numsSize - 1 && nums[tail] == nums[tail + 1])
        {
          tail--;
          continue;
        }
        if (nums[i] + nums[j] + nums[head] + nums[tail] == target)
        {
          returnArr[*returnSize] = (int *)malloc(sizeof(int) * 4);
          returnArr[*returnSize][0] = nums[i];
          returnArr[*returnSize][1] = nums[j];
          returnArr[*returnSize][2] = nums[head];
          returnArr[*returnSize][3] = nums[tail];
          (*returnColumnSizes)[*returnSize] = 4;
          (*returnSize) += 1;
          head++;
          tail--;
        }
        else if (nums[i] + nums[j] + nums[head] + nums[tail] > target)
        {
          tail--;
        }
        else
        {
          head++;
        }
      }
    }
  }
  return returnArr;
}

int main(void)
{
  int arr[] = { 1, 0, -1, 0, -2, 2 };
  // int arr[] = {0, 0, 0, 0};
  int size = 6;
  int target = 0;
  int returnSize;
  int *returnColumnSizes;
  int **returnArr = fourSum(arr, size, target, &returnSize, &returnColumnSizes);
  for (int i = 0; i < returnSize; i++)
  {
    printf("%d %d %d %d\n", returnArr[i][0], returnArr[i][1], returnArr[i][2], returnArr[i][3]);
  }
}