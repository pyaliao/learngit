#include <stdio.h>
#include <stdlib.h>

double findMedianSortedArr(int *arr1, int arr1Size, int *arr2, int arr2Size)
{

  //merge array
  int size = arr1Size + arr2Size;
  int *arr = (int *)malloc(size * sizeof(int));
  int arr1Index = 0;
  int arr2Index = 0;
  double median;
  for (int index = 0; index < size; index++) {
    if (arr1Index < arr1Size && arr2Index < arr2Size)
    {
      if (arr1[arr1Index] <= arr2[arr2Index])
      {
        arr[index] = arr1[arr1Index];
        arr1Index++;
      }
      else
      {
        arr[index] = arr2[arr2Index];
        arr2Index++;
      }
    }
    else if (arr1Index < arr1Size && arr2Index >= arr2Size)
    {
      arr[index] = arr1[arr1Index];
      arr1Index++;
    }
    else if (arr1Index >= arr1Size && arr2Index < arr2Size)
    {
      arr[index] = arr2[arr2Index];
      arr2Index++;
    }
  }

  for (int j = 0; j < size; j++) {
    printf("%d ", arr[j]);
  }
  printf("\n");
  if (size % 2 == 0)
  {
    median = (double)(arr[size / 2 - 1] + arr[size / 2]) / 2;
  }
  else
  {
    median = arr[size / 2];
  }
  return median;
}
int main(void)
{
  int arr1[] = {2, 4, 5, 7, 9, 29, 67};
  int arr2[] = {3, 6, 8, 9, 10, 13, 18};
  int size1 = sizeof(arr1) / sizeof(*arr1);
  int size2 = sizeof(arr2) / sizeof(*arr2);
  printf("arr length: %d %d\n", size1, size2);
  double median = findMedianSortedArr(arr1, size1, arr2, size2);
  for (int i = 0; i < size1; i++)
  {
    printf("%d ", arr1[i]);
  }
  printf("\n");
  for (int j = 0; j < size2; j++)
  {
    printf("%d ", arr2[j]);
  }
  printf("\n");
  printf("median is %f", median);
  printf("\n");
}
