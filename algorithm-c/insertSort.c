#include <stdio.h>
#include <stdlib.h>

void mergeSort(int *arr, int len)
{
  for (int j = 1; j < len; j++)
  {
    int key = arr[j];
    int i = j - 1;
    while (i >= 0 && arr[i] > key)
    {
      arr[i + 1] = arr[i];
      i--;
    }
    arr[i + 1] = key;
  }
}

int main(void)
{
  int len = 20;
  int *arr = (int *)malloc(len * sizeof(int));
  for (int k = 0; k < 20; k++)
  {
    arr[k] = rand();
  }
  mergeSort(arr, len);
  for (int i = 0; i < len; i++)
  {
    printf("%d ", arr[i]);
  }
  printf("\n");

  return 0;
}
