$(function () {
	// 页面初始化完成，判断登录状态、
	$.get("xywuser/getLoginStatus", function (data) {
		if (data.msg == "success") {
			// 设置未读消息数量
			callbackLoginSucceeded(data);
		} else {
			callbackLoginFailed();
		}
	}, "json")
	
});


var box = $(".nc-wrapper"); //外层容器
var text = $(".nc-lang-cnt");          //文字
var btnIcon = $(".btn-slide:before");  //互动按钮


var loginbg = $("#loginSlideBg");                  //背景色模块
var loginbtn = $("#loginSlideBtn");             //互动按钮
sliderBar(box, loginbg, loginbtn, loginCallback);

var registerbg = $("#registerSlideBg");                  //背景色模块
var registerbtn = $("#registerSlideBtn");             //互动按钮
var bgWidth = registerbg.css("width");              //获取bg模块的初始宽度
var btnLeft = registerbtn.css("left");
function sliderBar(box, bg, btn, callback = function () { }) {
	var moveRange = box.outerWidth() - btn.outerWidth();
	var msg;                           //成功与否
	//获取btn初始left值
	function mouseDownCallback(e) {
		bg.css({
			"transition": ""
		});
		btn.css({
			"transition": "",
		});
		/* 获取鼠标按下时，鼠标距离可视区域边缘的水平距离 */
		var leftHDis = e.clientX;
		/* 给document注册鼠标移动事件 */
		$(document).mousemove(function (e) {
			/* 获取鼠标移动后距离可视区域边缘的水平位置 */
			var movedHDis = e.clientX;
			/* 计算鼠标移动的距离 */
			var movedX = movedHDis - leftHDis;
			//console.log(movedX);
			/* 判断鼠标是向左移还是向右移，以及是否移动到合理范围之外 */
			if (movedX < 0) {
				movedX = 0;
			} else if (movedX > moveRange) {
				movedX = moveRange;
			}
			/* 根据滑动的距离设定背景的宽度 滑块的偏移距离 */
			bg.css({
				"width": movedX + "px"
			});
			btn.css({
				"left": movedX + "px"
			});
			/* 如果滑动距离与滑块宽度一样，则解锁成功 */
			if (movedX >= moveRange) {
				/* 设置验证成功的样式 */
				msg = 'success';
				text.text("验证通过");
				btn.removeClass("icon-icon_paging_right").addClass("icon-yanzhengtongguo").css({
					"color": "#7ac23c",
					"font-weight": "700"
				});
				/* 标识成功与否 */
				/* success = true; */
				/* 成功后清除鼠标按下事件以及鼠标移动事件 */
				btn.unbind("mousedown");
				$(document).unbind("mousemove");
				/* 成功解锁后的处理程序 */
				/* setTimeout(function () {
					 alert("解锁成功，继续做你想做的"); 
				}, 100);
				*/
				callback();
			} else {

			}
		});
	}
	function mouseUpCallback(e) {
		/* 鼠标松开时，如果滑动到终点了，则验证通过 */
		if (msg !== 'error') {
			$("#loginShade").attr("isCheck", "yes");
			return;
		} else {
			$("#loginShade").attr("isCheck", "no");
			/* 否则，就将滑块复位 */
			bg.css({
				"transition": "width 800ms ease",
				"width": bgWidth
			});
			btn.css({
				"transition": "left 800ms ease",
				"left": btnLeft
			});
			//清除鼠标松开事件和滑动事件
			btn.unbind("mouseup");
			$(document).unbind("mousemove");
		}
	}
	btn.bind('mousedown', mouseDownCallback);
	btn.bind('mouseup', mouseUpCallback);
};

//滑块回调
function registerSliderCheck() {
	var code = $("#registerCode").val();
	$.get("register/confirmRegisterCode/" + code, function (data) {
		if (data.msg == "error") {
			$("#registerPhoneMsg").text("验证码输入错误,请重新输入");
			$("#mobileRegisterCaptchaLabel").addClass("hide");
			$("#registerCode").focus();
			$("#registerCode").val("");
			$("#nc-2-wrapper").hide();

			$("#loginShade").attr("isCheck", "no");
			/* 否则，就将滑块复位 */
			registerbg.css({
				"transition": "width 800ms ease",
				"width": bgWidth
			});
			registerbtn.css({
				"transition": "left 800ms ease",
				"left": btnLeft
			});
			text.text("请按住滑块，拖动到最右边");
			sliderBar(box, registerbg, registerbtn, registerSliderCheck);
		} else {
			$("#registerCode").unbind("keyup");
			$("#loginShade").attr("isCheck", "yes");
		}
	}, "json")
}

//登录滑块回调
function loginCallback() {
	$("#loginShade").attr("loginCheck", "yes");
	$("#accountLoginMsg").text("");
}


var timeId = null;
var newLoginWin = null;

function wxLogin() {
	timeId = setInterval(getLoginStatus, 2000);
	newLoginWin = window.open('xywuser/login_authorize_web_wx', 'login', 'height=500, width=600, top=60, left=60, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');
}

function qqLogin() {
	timeId = setInterval(getLoginStatus, 2000);
	newLoginWin = window.open('xywuser/login_authorize_web_qq', 'login', 'height=500, width=600, top=60, left=60, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');
}

function getLoginStatus() {
	$.get("xywuser/getLoginStatus", function (data) {
		if (data.msg == "success") {
			window.clearInterval(timeId);
			newLoginWin.close();
			callbackLoginSucceeded(data);
		} else if (data.msg != "wait") {
			window.clearInterval(timeId);
			newLoginWin.close();
			alert(data.msg);
		}
	}, "json")
}


//账号密码登录 accountLoginMsg
$("#accountLoginBtn").click(function () {
	//验证手机号
	if ($("#account").val() == '') {
		$("#accountLoginMsg").text("请输入手机号");
		$("#accountFormLabel").addClass("hide");
		$("#account").focus();
		return false;
	} else if (!/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test($("#account").val())) {
		$("#accountLoginMsg").text("手机号格式错误,请重新输入");
		$("#accountFormLabel").addClass("hide");
		$("#account").focus();
		return false;
	}

	//检查密码
	if ($("#accountPassword").val() == '') {
		$("#accountLoginMsg").text("请输入密码");
		$("#accountPasswordLabel").addClass("hide");
		$("#accountPassword").focus();
		return false;
	}

	if ($("#loginShade").attr("loginCheck") != "yes") {
		$("#accountLoginMsg").text("请拖动滑块，完成验证");
		return false;
	}

	$("#accountLoginBtn").text('登录中...');
	$.post("xywuser/accountLogin", { "ACCOUNT": $("#account").val(), "PASSWORD": $("#accountPassword").val() }, function (data) {
		if (data.msg == "success") {
			callbackLoginSucceeded(data);
		} else {
			$("#accountLoginMsg").text(data.msg);
		}
	}, "json");
});


$("#accountFormLabel").click(function () {
	$("#accountLoginMsg").text("");
});

$("#accountPasswordLabel").click(function () {
	$("#accountLoginMsg").text("");
});



//手机验证码登录
$("#mobileCaptchaLogin").click(function () {
	//验证手机号
	if ($("#mobile").val() == '') {
		$("#mobileLoginMsg").text("请输入手机号");
		$("#mobileFormLabel").addClass("hide");
		$("#mobile").focus();
		return false;
	} else if (!/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test($("#mobile").val())) {
		$("#mobileLoginMsg").text("手机号格式错误,请重新输入");
		$("#mobileFormLabel").addClass("hide");
		$("#mobile").focus();
		return false;
	} else {
		$("#mobileLoginCaptcha").removeClass("disabled");
	}

	if ($("#mobileCaptcha").val() == '') {
		$("#mobileLoginMsg").text("请输入验证码");
		$("#mobileCaptchaFormLabel").addClass("hide");
		$("#mobileCaptcha").focus();
		return false;
	}

	if (!/^\d{6}$/.test($("#mobileCaptcha").val())) {
		$("#mobileLoginMsg").text("验证码格式错误,请重新输入");
		$("#mobileCaptchaFormLabel").addClass("hide");
		$("#mobileCaptcha").focus();
		return false;
	}

	if ($("#mobileLoginCaptcha").attr("isSend") != "yes") {
		$("#mobileLoginMsg").text("请先获取手机验证码");
		$("#mobileCaptchaFormLabel").addClass("hide");
		$("#mobileCaptcha").val("");
		$("#mobileCaptcha").focus();
		return false;
	}

	$("#mobileCaptchaLogin").text("登录中...");

	//alert($("#mobile").val() + "***" + $("#mobileCaptcha").val());
	$.post("xywuser/mobileLogin", { "ACCOUNT": $("#mobile").val(), "CODE": $("#mobileCaptcha").val() }, function (data) {
		if (data.msg == "success") {
			callbackLoginSucceeded(data);
		} else {
			$("#mobileLoginMsg").text(data.msg);
			$("#mobileCaptchaLogin").text("登录");
		}
	}, "json");
});

// 获取未读消息总数
function getUnreadMsg () {
	$.get("message/getUnReadCount", function (data) {
		if (data.msg === 'SUCCESS') {
			if (data.unReadCount > 0) {
				$(".infos .msgCounts").text(data.unReadCount).show()
			} else {
				$(".infos .msgCounts").hide();
			}
		} else {
			setTimeout(getUnreadMsg(), 1500);
		}
	})
}


//获取年月日
function getDateTIME(timeStamp) {
	var currentTime = new Date().getTime();
	var days = parseInt((currentTime - timeStamp) / (24 * 60 * 60 * 1000));
	if (days === 0) {
		return '今天';
	}  else if (days >= 1 && days <= 7) {
		return days + '天前'; 
	} else {
		var date = new Date(timeStamp);
		var year = date.getFullYear();
		var getMonth = date.getMonth() + 1;
		var getDate = date.getDate();
		var month = getMonth <= 9 ? '0' + getMonth : getMonth;
		var day = getDate <= 9 ? '0' + getDate : getDate;
		return year + '-' + month + '-' + day;
	}
}

// 获取消息及通知
function getMsgs(isNotice, startIndex, getMsgsCallback) {
	var url;
	if (isNotice) {
		url = 'message/getNotice?startIndex=' + startIndex;
		window.currentNoticeIndex = startIndex;
	} else {
		url = 'message/getMessage?startIndex=' + startIndex;
		window.currentMsgIndex = startIndex;
	}
	$.get(url, function (data) {
		if (data.msg === 'SUCCESS') {
			var activity = 'qz/toActivity4ID/';
			var subject = 'subject/goSubject/';
			var liveplay = 'liveplay/goLiveplay/';
			var player = 'player/toPlay/';
			var myData;
			if (data.noticeList) {
				myData = data.noticeList;
				myData.type = 'notice';
			} else {
				myData = data.messageList;
				myData.type = 'msg';
			}
			var len = myData.length;
			if (len === 0 && startIndex === 0) {
				console.log('没有数据')
				getMsgsCallback(myData.type, startIndex, 'noMsg');
				return;
			}
			var str = '';
			myData.forEach(function (item) {
				if (item.JUMP_TYPE === 'video') {
					var path = player + item.JUMP_ID;
				} else if (item.JUMP_TYPE === 'subject') {
					var path = subject + item.JUMP_ID;
				} else if (item.JUMP_TYPE === 'news') {
					var path = activity + item.JUMP_ID;
				} else if (item.JUMP_TYPE === 'zb') {
					var path = liveplay + item.JUMP_ID;
				} else if (item.JUMP_TYPE === 'wl') {
					var path = item.JUMP_ID;
				} else {
					var path = 'javascript:;';
				}
				if (item.CREATETIME) {
					var dateTime = getDateTIME(item.CREATETIME);
				} else {
					var dateTime = '';
				}
				str += '<a class="msgItem' + (item.MESSAGE_STATUS === '0' ? ' unread' : '') + '" href="' + path + '" data-msgId="' + (item.MESSAGE_ID ? item.MESSAGE_ID : '') + '" target="_blank">'
					+ '<img src="' + (item.PIC ? item.PIC : item.HEADIMG) + '" />'
					+ '<div class="msgDetailBox">'
					+ '<div class="titleBox">'
					+ '<div class="title" title="' + (item.TITLE ? item.TITLE : '') + '">' + (item.TITLE ? item.TITLE : '') + '</div>'
					+ '<div class="dateTime">' + dateTime + '</div>'
					+ '</div>'
					+ '<div class="msgDetail" title="' + (item.CONTENT ? item.CONTENT : '') + '">' + (item.CONTENT ? item.CONTENT : '') + '</div>'
					+ '</div>'
					+ '</a>';
			});

			if (myData.type === 'notice') {
				if (startIndex === 0) {
					/* $(".noticeBox .itemInnerBox").empty().append(str); */
					$(".noticeBox .itemInnerBox").empty().prepend(str);
				} else {
					$(".noticeBox .itemInnerBox").append(str);
				}
				if ($('.loadingText')) {
					$(".noticeBox .loading").addClass("bd").html('<div class="loadingText">点击加载更多</div>');
				}
			} else {
				if (startIndex === 0) {
					/* $(".msgBox .itemInnerBox").empty().append(str); */
					$(".msgBox .itemInnerBox").empty().prepend(str);
				} else {
					$(".msgBox .itemInnerBox").append(str);
				}
				if ($('.loadingText')) {
					$(".msgBox .loading").addClass("bd").html('<div class="loadingText">点击加载更多</div>');
				}
			}
			// 如果是请求到的最后一组数据
			if (len >= 0 && len < 20) {
				getMsgsCallback(myData.type, startIndex, 'noMore');
			} else {
				getMsgsCallback(myData.type, startIndex, 'hasMore');
			}

		} else {
			setTimeout(function () {
				getMsgs(isNotice, startIndex, getMsgsCallback);
			}, 1000);
		}
	})
}
function getMsgsCallback(type, startIndex, tips) {
	if (tips === 'noMsg') {
		if (type === 'msg') {
			if ($('.msgBox').hasClass('userCenter')) {
				$('.msgBox.userCenter .msgListBox').empty().html('<i class="iconfont icon-tongzhi"></i><div class="noMsg">你还没有收到任何消息</div>');
			} else {
				$('.msgBox .msgListBox').empty().html('<i class="iconfont icon-tongzhi"></i><div class="noMsg">你还没有收到任何消息</div>');
			}
		} else {
			$('.noticeBox .msgListBox').empty().html('<i class="iconfont icon-tongzhi"></i><div class="noMsg">你还没有收到任何通知</div>');
		}
	} else if (tips === 'noMore') {
		if (type === 'notice') {
			if ($(".noticeBox .loading").hasClass('userCenter')) {
				$(".noticeBox .loading").removeClass("bd").html('').show();
			} else {
				$(".noticeBox .loading").text('').show();
			}
		} else {
			if ($(".msgBox .loading").hasClass('userCenter')) {
				$(".msgBox .loading").removeClass("bd").html('').show();
			} else {
				$(".msgBox .loading").text('').show();
			}
		}
	} else {
		if (type === 'notice') {
			if ($(".noticeBox .loading").hasClass('userCenter')) {
				$(".noticeBox .loading").addClass("bd").html('<div class="loadingText">点击加载更多</div>').show();
			} else {
				$(".noticeBox .loading").text('加载中...').show()
			}
		} else {
			if ($(".msgBox .loading").hasClass('userCenter')) {
				$(".msgBox .loading").addClass("bd").html('<div class="loadingText">点击加载更多</div>').show();
			} else {
				$(".msgBox .loading").text('加载中...').show()
			}
		}
	}
}



function callbackLoginSucceeded(data) {
	// 设置未读消息数量
	getUnreadMsg();
	// 显示消息，隐藏没有消息
	$(".noMsgBox").hide();
	$(".msgListBox").show();
	// 登陆成功，显示消息模块
	getMsgs(true, 0, getMsgsCallback);
	getMsgs(false, 0, getMsgsCallback);
	
	window.loginStatus = "logined";
	// 登陆成功，隐藏登录框，并做其他清除处理
	$("#loginPop").hide(); 
	$("#loginShade").hide();

	$("#userLogin").empty();
	$("#userLogin").attr("href", "userInfo/goUserInfoIndex");
	$(".quickUser > a").css("opacity", "1");
	$("#userLogin").append(
		"<div class='userImg'>"
		+ "<img src='" + data.HEAD_PORTRAIT + "'>"
		+ "</div>"
	);
	$(".quickUser").addClass("hasLogined");
	$("#accountImg").attr("src", data.HEAD_PORTRAIT);
	$("#nickName").text(data.USERNAME);
	$("#userLogin, .quickUserBtnLink").unbind("click");
	
	// 登陆成功，观看历史记录添加
	if ((data.currentVideoList && data.currentVideoList.length > 0) || (data.beforeVideoList && data.beforeVideoList.length > 0)) {
		$("#quickHistory").empty();
		$("#quickHistory").append(
			"<a href='javascript:;'>                               	"
			+ "    <i class='iconfont icon-lishijilu quickIcon'></i> "
			+ "    <span class='quickText'>看过</span>               	"
			+ "</a>													"
			+ "<div class='quickHistoryPop'  style='right: -36px;'>                                           "
			+ "    <div class='quickHistoryCont'>                                                             "
			+ "        <div class='quickTimeLineBox scrollbar'>                                               "
			+ "            <div class='quickVideoBox'>                                                        "
			+ "                <div id='quickVideoList' class='quickVideoList'>                                                   "
			+ "                </div>                                                                         "
			+ "            </div>                                                                             "
			+ "            <div class='quickButton'>                                                          "
			+ "                <a href='userInfo/goUserInfoIndex' class='getMore' target='_blank'>查看更多</a>	 "
			+ "            </div>                                                                             "
			+ "        </div>                                                                                 "
			+ "    </div>                                                                                     "
			+ "    <i class='triangleUp'>                                                                     "
			+ "        <i class='triangleInner'></i>                                                          "
			+ "    </i>                                                                                       "
			+ "</div>                                                                                         "
		);
		if (data.currentVideoList && data.currentVideoList.length > 0) {
			$("#quickVideoList").append(
				"<div class='quickVideoTitle'>                            "
				+ "    <span class='dotBox'></span>                        "
				+ "    <span class='dateTime'>今天</span>                   "
				+ "</div>                                                  "
			);
			$.each(data.currentVideoList, function (index, v) {
				$("#quickVideoList").append(
					"<div class='quickVideoItem'>                                         "
					+ "    <a href='player/toPlay/" + v.VIDEO_ID + "' class='videoItemImg'>    "
					+ "        <img src='" + v.COVERURL + "'>                  				  "
					+ "    </a>                                                            "
					+ "    <a href='player/toPlay/" + v.VIDEO_ID + "' class='videoItemTitle'>   "
					+ "        <span class='mainTitle'>" + v.TITLE + "</span>                   "
					+ "    </a>                                                            "
					+ "    <span class='videoNum'></span>                                  "
					+ "    <span class='videoProgress'>观看至" + v.VIEWING_TIME + "%</span>       "
					+ "</div>	                                                          "
				);
			});
		}
		if (data.beforeVideoList && data.beforeVideoList.length > 0) {
			$("#quickVideoList").append(
				"<div class='quickVideoTitle'>                            "
				+ "    <span class='dotBox'></span>                        "
				+ "    <span class='dateTime'>更早</span>                   "
				+ "</div>                                                  "
			);
			$.each(data.beforeVideoList, function (index, v) {
				$("#quickVideoList").append(
					"<div class='quickVideoItem'>                                         "
					+ "    <a href='player/toPlay/" + v.VIDEO_ID + "' class='videoItemImg'>    "
					+ "        <img src='" + v.COVERURL + "'>                  				  "
					+ "    </a>                                                            "
					+ "    <a href='player/toPlay/" + v.VIDEO_ID + "' class='videoItemTitle'>   "
					+ "        <span class='mainTitle'>" + v.TITLE + "</span>                   "
					+ "    </a>                                                            "
					+ "    <span class='videoNum'></span>                                  "
					+ "    <span class='videoProgress'>观看至" + v.VIEWING_TIME + "%</span>       "
					+ "</div>	                                                          "
				);
			});
		}

	}

}

function callbackLoginFailed () {
	// 用户未登录
	window.loginStatus = "unlogin";
	$(".noMsgBox").show();
	$(".msgListBox").hide();
	$(".noMsg").text('请登录之后查看通知和消息');
}

$("#mobileFormLabel").click(function () {
	$("#mobileLoginMsg").text("");
});

$("#mobileCaptchaFormLabel").click(function () {
	$("#mobileLoginMsg").text("");
});


$("#mobile").on('input', function () {
	if (!/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test($("#mobile").val())) {
		//$("#registerPhoneMsg").text("手机号格式错误,请重新输入");
		$("#mobileFormLabel").addClass("hide");
		$("#mobileLoginCaptcha").addClass("disabled");
	} else {
		$("#mobileLoginMsg").text("");
		$("#mobileLoginCaptcha").removeClass("disabled");
	}
});

//倒计时
var loginInterValObj = null;
var loginCount = 60;

$("#mobileLoginCaptcha").click(function () {
	if ($(this).hasClass("disabled")) {
		return false;
	} else {
		var phone = $("#mobile").val();
		$.get("xywuser/getLoginCode/" + phone, function (data) {
			if (data.msg == 'error') {
				$("#mobileLoginMsg").text("验证码发送过于频繁，请您稍后再尝试");
				$("#mobileRegisterCaptchaLabel").addClass("hide");
			} else {
				$("#mobileLoginCaptcha").addClass("disabled");
				$("#mobileLoginCaptcha").attr("isSend", "yes");
				loginInterValObj = window.setInterval(LoginSetRemainTimes, 1000);
			}
		}, "json")
	}
});

function LoginSetRemainTimes() {
	if (loginCount == 0) {
		window.clearInterval(loginInterValObj); //停止计时器 
		$("#mobileLoginCaptcha").removeClass("disabled"); //启用按钮 
		$("#mobileLoginCaptcha").val("重新发送验证码");
		loginCount = 60;
	} else {
		loginCount--;
		$("#mobileLoginCaptcha").val(loginCount + "秒后重发");
	}
}



//注册
$("#mobileRegisterBtn").click(function () {
	if (!$("#agreeOn").is(':checked')) {
		$("#registerPhoneMsg").text("请先阅读并同意注册相关协议");
		return false;
	}

	//验证手机号
	if ($("#registerPhone").val() == '') {
		$("#registerPhoneMsg").text("请输入手机号");
		$("#mobileRegisterLabel").addClass("hide");
		$("#registerPhone").focus();
		return false;
	} else if (!/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test($("#registerPhone").val())) {
		$("#registerPhoneMsg").text("手机号格式错误,请重新输入");
		$("#mobileRegisterLabel").addClass("hide");
		$("#registerPhone").focus();
		return false;
	}


	if ($("#registerCode").val() == '') {
		$("#registerPhoneMsg").text("请输入验证码");
		$("#mobileRegisterCaptchaLabel").addClass("hide");
		$("#registerCode").focus();
		return false;
	}

	if (!/^\d{6}$/.test($("#registerCode").val())) {
		$("#registerPhoneMsg").text("验证码格式错误,请重新输入");
		$("#mobileRegisterCaptchaLabel").addClass("hide");
		$("#registerCode").focus();
		return false;
	}

	if ($("#GetMobileCode").attr("isSend") != "yes") {
		$("#registerPhoneMsg").text("请先获取手机验证码");
		$("#mobileRegisterCaptchaLabel").addClass("hide");
		$("#registerCode").val("");
		$("#registerCode").focus();
		return false;
	}

	if ($("#loginShade").attr("isCheck") != "yes") {
		$("#registerPhoneMsg").text("请拖动滑块，完成验证");
		$("#mobileRegisterCaptchaLabel").addClass("hide");
		return false;
	}

	//alert("phone:" + $("#registerPhone").val() + "---code:" + $("#registerCode").val());
	$.post("register/registerUser", { "PHONE": $("#registerPhone").val(), "code": $("#registerCode").val() }, function (data) {
		if (data.msg == 'success') {
			callbackLoginSucceeded(data);
		} else {
			$("#registerPhoneMsg").text(data.msg);
		}
	}, "json");
});



$("#mobileRegisterLabel").click(function () {
	$("#registerPhoneMsg").text("");
});

$("#registerCode").click(function () {
	$("#registerPhoneMsg").text("");
});


$("#registerPhone").keyup(function () {
	if (!/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test($("#registerPhone").val())) {
		//$("#registerPhoneMsg").text("手机号格式错误,请重新输入");
		$("#mobileRegisterLabel").addClass("hide");
		$("#registerPhone").focus();
		$("#GetMobileCode").addClass("disabled");
	} else {
		$("#registerPhoneMsg").text("");
		$("#GetMobileCode").removeClass("disabled");
	}
});

//验证码滑块验证
function codeKeyUp() {
	if ($("#registerCode").val().length == 6) {
		if ($("#GetMobileCode").attr("isSend") != "yes") {
			$("#registerPhoneMsg").text("请先获取手机验证码");
			$("#mobileRegisterCaptchaLabel").addClass("hide");
			$("#registerCode").val("");
			$("#registerCode").focus();
			return false;
		}

		$("#nc-2-wrapper").show();
		$("#registerPhoneMsg").text("");
	}
}


$("#registerCode").bind("keyup", codeKeyUp);


$("#registerPhone").blur(function () {
	if (!/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test($("#registerPhone").val())) {
		$("#registerPhoneMsg").text("手机号格式错误,请重新输入");
		//$("#mobileRegisterLabel").addClass("hide");
		//$("#registerPhone").focus();
		$("#GetMobileCode").addClass("disabled");
	}
});



//倒计时
var InterValObj = null;
var count = 60;

$("#GetMobileCode").click(function () {
	var phone = $("#registerPhone").val();
	$.get("register/getRegisterCode/" + phone, function (data) {
		if (data.msg == 'error') {
			$("#registerPhoneMsg").text("验证码发送过于频繁，请您稍后再尝试");
			$("#mobileRegisterCaptchaLabel").addClass("hide");
			$("#mobileCaptchaLogin").text("登录");
		} else {
			$("#registerPhone").unbind("blur");

			$("#GetMobileCode").addClass("disabled");
			$("#GetMobileCode").attr("isSend", "yes");
			InterValObj = window.setInterval(SetRemainTimes, 1000);
		}
	}, "json")


});

function SetRemainTimes() {
	if (count == 0) {
		window.clearInterval(InterValObj); //停止计时器 
		$("#GetMobileCode").removeClass("disabled"); //启用按钮 
		$("#GetMobileCode").val("重新发送验证码");
		count = 60;
	} else {
		count--;
		$("#GetMobileCode").val(count + "秒后重发");
	}
}

// 退出登录
$("#linkQuit").click(function () {
	var loginbg = $("#loginSlideBg");      //背景色模块
	var loginbtn = $("#loginSlideBtn");    //互动按钮
	var bgWidth = $(".nc-scale").css("width"); //获取滑块的最终宽度
	var text = $(".nc-lang-cnt");

	$.get("xywuser/logout", function (data) {
		if (data.msg == "success") {
			callbackLoginFailed();
			sliderBar(box, loginbg, loginbtn, loginCallback);
			$("#account, #accountPassword").val('');
			loginbg.css({
				"transition": "width 800ms ease",
				"width": bgWidth
			});
			loginbtn.css({
				"transition": "left 800ms ease",
				"left": "0px"
			});
			loginbtn.removeClass("icon-yanzhengtongguo").addClass("icon-icon_paging_right").css({
				"left": btnLeft,
				"color": ""
			});
			$("#loginShade").attr("loginCheck", "no");
			$("#accountLoginBtn").text('登录');
			text.text("请按住滑块，拖动到最右边");
			$("#userLogin, .quickUserBtnLink, #linkChange").click(function () {
				$("#loginShade, #loginPop").show();
			});
			$("#userLogin").attr("href", "javascript:;");

			$(".quickUser").removeClass("hasLogined");
			$("#mobileCaptchaLogin").text("登录");

			$("#userLogin").empty();
			$(".quickUser #userLogin").css("opacity", "0.6");
			$("#userLogin").append(
				"<i class='iconfont icon-yonghu quickIcon'></i> "
			);
		}
	}, "json");
});

$("#linkChange").click(function () {
	$("#mobileCaptchaLogin").text("登录");
});

function showLogin() {
	$("#loginShade, #loginPop").show();
}





