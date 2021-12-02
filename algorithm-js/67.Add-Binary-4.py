#！/usr/bin/evn python
# -*- coding: utf-8 -*-
# 67. 二进制求和
# 给你两个二进制字符串，返回它们的和（用二进制表示）。
# 输入为非空字符串且只包含数字1和0。
# 示例 1:
# 输入: a = "11", b = "1"
# 输出: "100"
# 示例 2:
# 输入: a = "1010", b = "1011"
# 输出: "10101"
# 提示：
# 每个字符串仅由字符 '0' 或 '1' 组成。
# 1 <= a.length, b.length <= 10 ^ 4
# 字符串如果不是 "0" ，就都不含前导零。

# 位运算解法

'''
@param {string} a
@param {string} b
@return {string}
'''
class Solution:
    def addBinary(self, a: str, b: str) -> str:
      # 先将2进制字符串转换为十进制整数
      a, b = int(a, 2), int(b, 2)
      # 当b不为0时，进行循环
      while b:
        # 获取相加之后不进位的值
        temp = a ^ b
        # 获取进位的值
        carry = (a & b) << 1
        # 将不进位的值赋给a，进位的值赋给b，然后继续进行异或求和
        # 当carry为0时，表示没有进位，此时的异或就代表着真正的和
        a, b = temp, carry
      return bin(a)[2:]

a = '11'
b = '1'
solution = Solution()
print(solution.addBinary(a, b))