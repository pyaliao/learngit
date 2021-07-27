$(function () {
	$.get("xywuser/getLoginStatus", function (data) {
		if (data.msg == "success") {
			callbackLoginSucceeded(data);
		}
	}, "json")
});


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
	$("#accountLoginBtn").text("登录中...");

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


function callbackLoginSucceeded(data) {
	$("#historyInfo").attr('user_id', data.USER_ID);
	$("#historyInfo").data('username', data.USERNAME);
	$(".viewsTopLogin").removeClass("hide");
	$(".viewsTopNoLogin").addClass("hide");
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
	if ($(".login-post .common-avatar img") && $(".userImg > img")) {
		$(".login-post .common-avatar img").attr("src", $(".userImg > img").attr("src"));}
	if ($(".viewsTopLogin")) {
		$(".viewsTopLogin").removeClass("hide");
	}
	if ($(".viewsTopNoLogin")) {
		$(".viewsTopNoLogin").addClass("hide");
	}
}

$("#mobileFormLabel").click(function () {
	$("#mobileLoginMsg").text("");
});

$("#mobileCaptchaFormLabel").click(function () {
	$("#mobileLoginMsg").text("");
});


$("#mobile").keyup(function () {
	if (!/^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test($("#mobile").val())) {
		//$("#registerPhoneMsg").text("手机号格式错误,请重新输入");
		$("#mobileFormLabel").addClass("hide");
		$("#mobile").focus();
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


$("#linkQuit").click(function () {
	$.get("xywuser/logout", function (data) {
		if (data.msg == "success") {
			$("#historyInfo").attr("USER_ID", "");
			$(".viewsTopNoLogin").removeClass("hide");
			$(".viewsTopLogin").addClass("hide");
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
			if ($(".unlogin-post .common-avatar > img")) {
				$(".unlogin-post .common-avatar > img").attr('src', 'https://img.1958xy.com/img/user/headimg.jpg');
			}
		}
	}, "json");
});

$("#linkChange").click(function () {
	$("#mobileCaptchaLogin").text("登录");
});

function showLogin() {
	$("#loginShade, #loginPop").show();
}