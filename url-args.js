function urlArgs () {
  // window的location属性指向Location对象，其search属性指向URL中?后面的字符串
  var args = {}
  var query = location.search.substring(1)
  var paris = query.split("&")
  var i
  for (i = 0; i < paris.length; i++) {
    var position = paris[i].indexOf('=')
    if (position === -1) {
      continue
    }
    var key = paris[i].substring(0, position)
    // 中文字符可能会在前端encode两次，因此解码两次
    var val = decodeURIComponent(decodeURIComponent(paris[i].substring(position + 1)))
    args[key] = val
  }
  return args
}
