// 65. 有效数字
// 有效数字（按顺序）可以分成以下几个部分：

// 一个 小数 或者 整数
// （可选）一个 'e' 或 'E' ，后面跟着一个 整数
// 小数（按顺序）可以分成以下几个部分：

// （可选）一个符号字符（'+' 或 '-'）
// 下述格式之一：
// 1. 至少一位数字，后面跟着一个点 '.'
// 2. 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
// 3. 一个点 '.' ，后面跟着至少一位数字
// 整数（按顺序）可以分成以下几个部分：
//   1. （可选）一个符号字符（'+' 或 '-'）
//   2. 至少一位数字
// 部分有效数字列举如下：
// ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]

// 部分无效数字列举如下：
// ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]
// 给你一个字符串 s ，如果 s 是一个 有效数字 ，请返回 true 。

// 示例 1：
// 输入：s = "0"
// 输出：true

// 示例 2：
// 输入：s = "e"
// 输出：false

// 示例 3：
// 输入：s = "."
// 输出：false

// 示例 4：
// 输入：s = ".1"
// 输出：true

// 提示：
// 1 <= s.length <= 20
// s 仅含英文字母（大写和小写），数字（0 - 9），加号 '+' ，减号 '-' ，或者点 '.'

// 有限状态自动机
/**
 * @param {string} s
 * @return {boolean}
 */
const isNumber = function (s) {
  const State = {
    STATE_INITIAL: 'STATE_INITIAL',
    STATE_INT_SIGN: 'STATE_INT_SIGN',
    STATE_INTEGER: 'STATE_INTEGER',
    STATE_POINT_WITH_LEFT: 'STATE_POINT_WITH_LEFT',
    STATE_POINT_WHITOUT_LEFT_INT: 'STATE_POINT_WHITOUT_LEFT_INT',
    STATE_FRACTION: 'STATE_FRACTION',
    STATE_EXP: 'STATE_EXP',
    STATE_EXP_SIGN: 'STATE_EXP_SIGN',
    STATE_EXP_INT: 'STATE_EXP_INT',
    STATE_END: 'STATE_END'
  }
  const charType = {
    CHAR_INT: 'CHAR_INT',
    CHAR_EXP: 'CHAR_EXP',
    CHAR_POINT: 'CHAR_POINT',
    CHAR_SIGN: 'CHAR_SIGN',
    CHAR_ILLEGAL: 'CHAR_ILLEGAL'
  }
  const toCharType = function (ch) {
    if (!isNaN(Number(ch))) {
      return charType.CHAR_INT
    } else if (ch.toLowerCase() === 'e') {
      return charType.CHAR_EXP
    } else if (ch === '.') {
      return charType.CHAR_POINT
    } else if (ch === '+' || ch === '-') {
      return charType.CHAR_SIGN
    } else {
      return charType.CHAR_ILLEGAL
    }
  }

  // 设置状态转移规则，即当前状态可能接受的字符类型，以及接受该字符后可以到达的状态
  // 几种状态对应几种规则
  const initialMap = new Map()
  initialMap.set(charType.CHAR_INT, State.STATE_INTEGER)
  initialMap.set(charType.CHAR_POINT, State.STATE_POINT_WHITOUT_LEFT_INT)
  initialMap.set(charType.CHAR_SIGN, State.STATE_INT_SIGN)

  const intSignMap = new Map()
  intSignMap.set(charType.CHAR_INT, State.STATE_INTEGER)
  intSignMap.set(charType.CHAR_POINT, State.STATE_POINT_WHITOUT_LEFT_INT)

  const intMap = new Map()
  intMap.set(charType.CHAR_INT, State.STATE_INTEGER)
  intMap.set(charType.CHAR_POINT, State.STATE_POINT_WITH_LEFT)
  intMap.set(charType.CHAR_EXP, State.STATE_EXP)

  const pointWithLeftInt = new Map()
  pointWithLeftInt.set(charType.CHAR_INT, State.STATE_FRACTION)
  pointWithLeftInt.set(charType.CHAR_EXP, State.STATE_EXP)

  const pointWithoutLeftInt = new Map()
  pointWithoutLeftInt.set(charType.CHAR_INT, State.STATE_FRACTION)

  const fractionMap = new Map()
  fractionMap.set(charType.CHAR_INT, State.STATE_FRACTION)
  fractionMap.set(charType.CHAR_EXP, State.STATE_EXP)

  const expMap = new Map()
  expMap.set(charType.CHAR_SIGN, State.STATE_EXP_SIGN)
  expMap.set(charType.CHAR_INT, State.STATE_EXP_INT)

  const expSignMap = new Map()
  expSignMap.set(charType.CHAR_INT, State.STATE_EXP_INT)

  const expIntMap = new Map()
  expIntMap.set(charType.CHAR_INT, State.STATE_EXP_INT)

  const transfer = new Map()
  transfer.set(State.STATE_INITIAL, initialMap)
  transfer.set(State.STATE_INT_SIGN, intSignMap)
  transfer.set(State.STATE_INTEGER, intMap)
  transfer.set(State.STATE_POINT_WITH_LEFT, pointWithLeftInt)
  transfer.set(State.STATE_POINT_WHITOUT_LEFT_INT, pointWithoutLeftInt)
  transfer.set(State.STATE_FRACTION, fractionMap)
  transfer.set(State.STATE_EXP, expMap)
  transfer.set(State.STATE_EXP_SIGN, expSignMap)
  transfer.set(State.STATE_EXP_INT, expIntMap)

  const len = s.length
  let currentState = State.STATE_INITIAL
  console.log(transfer.get(currentState))
  for (let i = 0; i < len; i++) {
    // 如果没有相应的状态转移规则，则直接返回false
    const type = toCharType(s[i])
    if (!transfer.get(currentState).has(type)) {
      return false
    } else {
      // 有相应的转移规则，则进行状态转移，更新状态
      currentState = transfer.get(currentState).get(type)
    }
  }
  // 判断最终的状态是否是满足条件的几个状态
  return currentState === State.STATE_INTEGER || currentState === State.STATE_POINT_WITH_LEFT || currentState === State.STATE_FRACTION || currentState === State.STATE_EXP_INT
}

const s = '.'
console.log(isNumber(s))
