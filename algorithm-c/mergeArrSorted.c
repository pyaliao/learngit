#include <stdio.h>
#include <stdlib.h>

void exchange(int* x, int* y)
{
  int temp = *x;
  *x = *y;
  *y = temp;
}

void mergeArr(int *arr, int len, int *arr1, int len1, int *arr2, int len2)
{
  for (int i = 0; i < len; i++)
  {
    if (i < len1)
    {
      arr[i] = arr1[i];
    }
    else
    {
      arr[i] = arr2[i - len1];
    }
  }
}

// 快速排序是一种原址排序，不需要分配新的数组空间
// start和end为子数组的起始位置与终止位置
int partition(int *arr, int start, int end)
{
  int temp;
  // 获取主元
  int key = arr[end];
  // left不存在，故将i去值为start-1
  int i = start - 1;
  for (int j = start; j < end; j++)
  {
    if (arr[j] <= key)
    {
      i = i + 1;
      exchange(arr + i, arr + j);
    }
  }
  exchange(arr + i + 1, arr + end);
  return i + 1;
}
void quickSort(int *arr, int start, int end)
{
  if (start < end)
  {
    int mid = partition(arr, start, end);
    quickSort(arr, start, mid - 1);
    quickSort(arr, mid + 1, end);
  }
}

void mergeArrSorted(int *arr, int len, int *arr1, int len1, int *arr2, int len2)
{
  mergeArr(arr, len, arr1, len1, arr2, len2);
  printf("merge Array: %d\n", len);
  quickSort(arr, 0, len - 1);
}
int main (void) {
  int arr1[] = {1, 9, 3, 4, 79, 27};
  int arr2[] = {2, 56, 35, 7, 19};
  int len1 = sizeof(arr1) / sizeof(*arr1);
  int len2 = sizeof(arr2) / sizeof(*arr2);
  int len = len1 + len2;
  printf("length %d length\n", len);
  int* arr = (int*)malloc(len * sizeof(int));
  mergeArrSorted(arr, len, arr1, len1, arr2, len2);

  for (int k = 0; k < len; k++)
  {
    printf("%d ", arr[k]);
  }
  printf("\n");
}
