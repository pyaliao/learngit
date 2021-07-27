// leetcode-15题、三数之和
/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */

#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>
int compare(const void *a, const void *b)
{
  return *((int *)a) - *((int *)b);
}

int **threeSum(int *nums, int numsSize, int *returnSize, int **returnColumnSizes)
{
  // 数组长度小于3则直接返回空数组
  if (numsSize < 3)
  {
    *returnSize = 0;
    *returnColumnSizes = NULL;
    return NULL;
  }
  // 先对数组进行排序，升序排列，qsort不返回任何值
  qsort(nums, numsSize, sizeof(int), compare);
  *returnSize = 0;
  // 分配存储空间
  int **returnArr = (int **)malloc(sizeof(int *) * (numsSize - 2) * (numsSize - 2));
  *returnColumnSizes = (int *)malloc(sizeof(int) * (numsSize - 2) * (numsSize - 2));
  // 开始二重循环，遍历数组nums
  for (int i = 0; i < numsSize; i++)
  {
    // 如果元素大于0，则其后的元素也大于0，那么三数之和肯定大于0
    // 所以到此时就可以直接退出遍历了
    if (nums[i] > 0)
    {
      break;
    }
    // 去除外层循环的重复值
    if (i > 0 && nums[i] == nums[i - 1])
    {
      continue;
    }
    // 记录右指针初始下标
    int tail = numsSize - 1;
    int head = i + 1;
    // 记录外层循环下标对应的值，即三元组的第一个元素
    int oneNum = nums[i];
    while (head < tail)
    {
      // 左移右指针 同时去除左指针指向的重复值
      // 因为右移左指针的同时也会去重，因此不用再做判断
      if (nums[head] + nums[tail] < -oneNum)
      {
        head++;
      } // 左移右指针 同时去除右指针指向的重复值
      // 因为左移右指针的同时也会去重，因此不用再做判断
      else if (nums[head] + nums[tail] > -oneNum)
      {
        tail--;
      }
      else
      {
        // 将满足条件的三元组保存到结果数组
        returnArr[*returnSize] = (int *)malloc(sizeof(int) * 3);
        returnArr[*returnSize][0] = oneNum;
        returnArr[*returnSize][1] = nums[head];
        returnArr[*returnSize][2] = nums[tail];
        (*returnColumnSizes)[*returnSize] = 3;
        *returnSize += 1;

        // 当相等之后，右指针tail左边的值肯定不满足条件，要么三数之和小于0，要么等于0（这导致右指针重复）
        // 因此，右指针左边的数不在考虑，此时我们右移左指针，左指针指向的数变大，而右指针不变的话，三数之和
        // 肯定大于0，因此同时也将右指针左移
        head++;
        tail--;
        // 此时左右指针需要做去重
        // 因为在三数之和相等时没有做去重，此时需要做去重
        // 假如左右指针移动后，三数之和仍然是0，且左右指针指向的数重复，而我们没有去重
        // 则程序会继续走到此条件分支，那么就会保存重复的三元组
        while (head < tail && nums[head] == nums[head - 1])
        {
          head++;
        }
        while (head < tail && nums[tail] == nums[tail + 1])
        {
          tail--;
        }
      }
    }
  }
  return returnArr;
}
int main(void)
{
  int nums[] = {-1, 0, 1, 2, -1, -4};
  int numsSize = 6;
  int returnSize;
  int *returnColumnSizes = NULL;
  int **returnArr = threeSum(nums, numsSize, &returnSize, &returnColumnSizes);
  for (int i = 0; i < returnSize; i++)
  {
    printf("%d %d %d\n", returnArr[i][0], returnArr[i][1], returnArr[i][2]);
  }
  return 0;
}