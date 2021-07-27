#include <stdio.h>
#include <stdbool.h>

bool isPalindrome(int x) 
{
  // 小于0，必定不是回文
  if (x < 0) {
    return false;
  }
  // 等于0，必定是回文
  if (x == 0) {
    return true;
  }
  // 如果一个数大于0且个位数为0，则这个数必然不是回文的
  if (x % 10 == 0)
  {
    return false;
  }
  // 下面是x > 0的情况，只逆转一半，防止整数溢出
  int reversedNum = 0;
  // 当为奇数时，逆转的一半数字以后，x > reversedNum (12321 -> x == 12  reversedNum == 123)
  // 当x的数字个数为偶数时，逆转一半数字以后，x == reversedNum (1221 -> x = 12 reversedNum == 12)
  while (x > reversedNum) {
    // 必须排除个位数为0的数，否则这里会出问题，
    // 因为逆转的数最高位为0，0 * 10永远是0，会导致错误
    reversedNum = reversedNum * 10 + x % 10;
    x /= 10;
  }
  // 如果不是回文，则不论x是奇数还是偶数，x != reversedNum 或 x != reversedNum / 10
  // 如果是回文的，则为x偶数时，最终的x == reversedNum，为奇数时，x == reversedNum / 10
  return x == reversedNum || x == reversedNum / 10;
}
int main (void) {
  int num = -1234321;
  printf("%d\n", isPalindrome(num));
}