/**
 * 最接近的三数和 
 * LeetCode第16题
 * author: aliao   language: C
*/

#include <stdio.h>
#include <stdlib.h>

int compare (const void *a, const void *b) 
{
  return (*(int *)a) - (*(int *)b);
}
int threeSumClosest(int *nums, int numsSize, int target)
{
  // 先给数组升序排序
  qsort(nums, numsSize, sizeof(int), compare); 
  // 定义返回值
  int best;
  for (int i = 0; i < numsSize; i++)
  {
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }
    int head = i + 1;
    int tail = numsSize - 1;
    while (head < tail)
    {
      // 求和
      int sum = nums[i] + nums[head] + nums[tail];
      // 将第一个三数之和存为最接近解best
      if (i == 0 && head == 1 && tail == numsSize - 1)
      {
        best = sum;
      }
      // 更新三元素之和
      if (abs(sum - target) < abs(best - target)) {
        best = sum; 
      }
      if (sum < target) {
        // 左指针左移
        head++;
        // 左指针去重
        while (nums[head] == nums[head - 1])
        {
          head++;
        }
      } else if (sum > target) {
        // 右指针左移
        tail--;
        // 右指针去重
        while (nums[tail] == nums[tail + 1])
        {
          tail--;
        }
      } else {
        return target;
      }
    }
  }
  return best;
}

int main (void)  {
  int nums[] = {-1, 2, 1, -4};
  int numsSize = 4;
  int target = 1;
  printf("%d\n", threeSumClosest(nums, numsSize, target));
}