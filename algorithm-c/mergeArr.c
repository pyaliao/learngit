#include <stdio.h>
#include <stdlib.h>


void mergeArrSorted(int* arr, int len, int *arr1, int len1, int *arr2, int len2)
{

  int index1 = 0;
  int index2 = 0;
  for (int k = 0; k < len; k++)
  {
    // 如果是其他语言，可以在两个数组末尾各放一个Infiniti值，
    // 这样判断比较到末尾时，刚好循环len次
    if (index1 < len1 && index1 < len2)
    {
      if (arr1[index1] <= arr2[index2])
      {
        arr[k] = arr1[index1];
        index1++;
      }
      else
      {
        arr[k] = arr2[index2];
        index2++;
      }
    }
    else if (index1 < len1 && index1 >= len2)
    {
      arr[k] = arr1[index1];
      index1++;
    }
    else if (index1 >= len1 && index1 >= len2)
    {
      arr[k] = arr2[index2];
      index2++;
    }
  }
}

int main (void) {
  int arr1[] = {1, 3, 4, 5, 8};
  int arr2[] = {2, 7, 10, 18, 21};
  int len1 = sizeof(arr1) / sizeof(int);
  int len2 = sizeof(arr2) / sizeof(int);
  int len = len1 + len2;
  int* arr = (int*)malloc(len  * sizeof(int));
  mergeArrSorted(arr, len, arr1, len1, arr2, len2);
  for (int i = 0; i < len; i++) {
    printf("%d ", arr[i]);
  }
  printf("\n");
}