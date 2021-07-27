#include <stdio.h>
#include <stdlib.h>

void merge(int *nums1, int nums1Size, int m, int *nums2, int nums2Size, int n)
{
  int len = m + n;
  m = m - 1;
  n = n - 1;
  for (int i = len - 1; i >= 0; i--)
  {
    if (n >= 0 && m >= 0)
    {
      if (nums2[n] > nums1[m])
      {
        nums1[i] = nums2[n];
        n--;
      }
      else
      {
        nums1[i] = nums1[m];
        m--;
      }
    }
    else if (n >= 0 && m < 0)
    {
      nums1[i] = nums2[n];
      n--;
    }
    else if (n < 0 && m >= 0)
    {
      nums1[i] = nums1[m];
      m--;
    }
  }
}

int main (void) {
  int arr1[10] = {1, 2, 3, 8, 20};
  int arr2[] = {6, 9, 10};
  int len1 = sizeof(arr1) / sizeof(*arr1);
  int len2 = sizeof(arr2) / sizeof(*arr2);
  int m = 5;
  int n = len2;
  int len = m + n;
  merge(arr1, len1, m, arr2, len2, n);
  for (int i = 0; i < len; i++)
  {
    printf("%d ", arr1[i]);
  }
  printf("\n");
}