#include <stdio.h>
#include <limits.h>
double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size){
    if (nums1Size > nums2Size) {
        int* temp = nums1;
        nums1 = nums2;
        nums2 = temp;
        int tempNum = nums1Size;
        nums1Size = nums2Size;
        nums2Size = tempNum;
    }
    int left = 0;
    int right = nums1Size;
    int bothLeftLen = (nums1Size + nums2Size + 1) / 2;
    int i, j;
    while (left < right) {
        i = left + (right - left + 1) / 2;
        j = bothLeftLen - i;
        if (nums1[i - 1] > nums2[j]) {
            right = i - 1;
        } else {
            left = i;
        }
    }
    i = left;
    j = bothLeftLen - i;
    int leftNums1Max = i == 0 ? INT_MIN : nums1[i - 1];
    int rightNums1Min = i == nums1Size ? INT_MAX : nums1[i];
    int leftNums2Max = j == 0 ? INT_MIN : nums2[j - 1];
    int rightNums2Min = j == nums2Size ? INT_MAX : nums2[j];
    int leftMax = leftNums1Max > leftNums2Max ? leftNums1Max : leftNums2Max;
    int rightMin = rightNums1Min < rightNums2Min ? rightNums1Min : rightNums2Min;
    if ((nums1Size + nums2Size) % 2 == 0)
    {
      return (double)(leftMax + rightMin) / 2;
    }
    else
    {
      return leftMax;
    }
}

int main () {
  int arr1[] = {2, 4, 5};
  int arr2[] = {1, 3};
  int len1 = sizeof(arr1) / sizeof(*arr1);
  int len2 = sizeof(arr2) / sizeof(*arr2);
  double median = findMedianSortedArrays(arr1, len1, arr2, len2);
  printf("%f", median);
}