// 内嵌页面去原生APP首页
$(".goHome").click(function (e) {
  if (window.webkit && window.webkit.messageHandlers.playVideo) {
    e.preventDefault();
    // 去IOS首页
    window.webkit.messageHandlers.playVideo.postMessage({ 'type': 'goHome' });
  } else if (window.android && window.android.playVideo) {
    e.preventDefault();
    // 去Android首页
    window.android.goHome();
  }
  //判断是否在小程序中
  wx.miniProgram.getEnv(function (res) {
    if (res.miniprogram) {
      e.preventDefault();
      // 如果在小程序中，则去到小程序首页
      wx.miniProgram.navigateTo({ url: '/pages/index/index' })
    }
  })
});