#include <stdio.h>
#include <stdlib.h>

void merge(int *arr, int start, int medium, int end)
{
  // 计算两个子数组的长度，并为两个子数组分配存储空间
  int lenLeft = medium - start + 1;
  int lenRight = end - medium;
  // printf("%d %d", lenLeft, lenRight);
  int *leftArr = (int *)malloc(lenLeft * sizeof(int));
  int *rightArr = (int *)malloc(lenRight * sizeof(int));
  // 将原始数组元素复制到子数组
  for (int i = 0; i < lenLeft; i++)
  {
    leftArr[i] = arr[start + i];
  }
  for (int j = 0; j < lenRight; j++)
  {
    rightArr[j] = arr[medium + 1 + j];
  }

  int leftStart = 0;
  int rightStart = 0;
  for (int k = start; k <= end; k++)
  {
    // 如果是其他语言，可以在两个数组末尾各放一个Infiniti值，
    // 这样判断比较到末尾时，刚好循环end-start+1次
    if (leftStart < lenLeft && rightStart < lenRight)
    {
      if (leftArr[leftStart] <= rightArr[rightStart])
      {
        arr[k] = leftArr[leftStart];
        leftStart++;
      }
      else
      {
        arr[k] = rightArr[rightStart];
        rightStart++;
      }
    }
    else if (leftStart < lenLeft && rightStart >= lenRight)
    {
      arr[k] = leftArr[leftStart];
      leftStart++;
    }
    else if (leftStart >= lenLeft && rightStart < lenRight)
    {
      arr[k] = rightArr[rightStart];
      rightStart++;
    }
  }
  free(leftArr);
  free(rightArr);
}
void mergeSort(int *arr, int start, int end)
{
  //  start和end是下标，start从0开始，故下面要减去1
  //  如果数组长度是奇数，则左边少分配一个元素，如果是偶数，则等分
  if (start < end)
  {
    int medium = (start + end) / 2 ;
    // 第归调用mergeSort
    mergeSort(arr, start, medium);
    mergeSort(arr, medium + 1, end);
    merge(arr, start, medium, end);
  }
}

int main(void)
{
  int num;
  printf("please enter the counts of number: ");
  scanf("%d", &num);
  int *arr = (int *)malloc(num * sizeof(int));
  for (int i = 0; i < num; i++) {
          arr[i] = rand();        
          printf("%d ", arr[i]);
  }

  mergeSort(arr, 0, num - 1);
  printf("\n");
  for (int j  = 0; j < num; j++) {
          printf("%d ", arr[j]);
  }
  free(arr);
  // int arr[] = {2, 89, 12, 28, 12, 26, 2, 15725, 63286};
  // for (int j = 0; j < 9; j++)
  // {
  //   printf("%d ", arr[j]);
  // }
  // mergeSort(arr, 0, 8);
  // for (int i = 0; i < 9; i++) {
  //   printf("%d ", arr[i]);
  // }
}
