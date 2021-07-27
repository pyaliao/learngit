function M(n, e, i) { 
  o.WeixinJSBridge ? WeixinJSBridge.invoke(n, x(e), function (e) { 
    A(n, e, i) }) : B(n, i)
}

function A(e, n, i) { 
  "openEnterpriseChat" != e && "openBusinessView" !== e || (n.errCode = n.err_code), 
  delete n.err_code, delete n.err_desc, delete n.err_detail; 
  var t = n.errMsg; 
  t || (t = n.err_msg, delete n.err_msg, t = function (e, n) { var i = e, t = a[i]; t && (i = t); var o = "ok"; if (n) { var r = n.indexOf(":"); "confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail") } return n = i + ":" + o }(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", v.debug && !i.isInnerInvoke && alert(JSON.stringify(n)); var o = t.indexOf(":"); switch (t.substring(o + 1)) { case "ok": i.success && i.success(n); break; case "cancel": i.cancel && i.cancel(n); break; default: i.fail && i.fail(n) }i.complete && i.complete(n) } function C(e) { if (e) { for (var n = 0, i = e.length; n < i; ++n) { var t = e[n], o = c[t]; o && (e[n] = o) } return e } }



  https://img.1958xy.com/%E7%94%A8%E6%88%B7%E4%B8%AD%E5%BF%83/avatar_bg_default.png