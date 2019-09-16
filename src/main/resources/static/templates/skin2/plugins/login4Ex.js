/* 按钮鼠标移入移出显示方法 */
function btnShow(id, className) {
    document.getElementById(id).className = className;
}
var pathname = window.location.pathname;
if(pathname!="/login"){
    window.location.pathname = "/login";
}

/* 验证浏览器类型 */
function validateBrower() {
    if (window.navigator.userAgent.indexOf("Chrome") == -1) {
        Ext.MessageBox.buttonText.yes = "确定";
        Ext.MessageBox.buttonText.no = "取消";
        Ext.Msg.confirm("提示", "建议您使用Google Chrome浏览器登陆本系统",
            function(btn) {
                if (btn != "yes") return;
                showSupport();
            });
    }
};

//验证码刷新
function changeImage() {
    var img = document.getElementById("captchaImage");
    now = new Date();
    img.src = "/captcha.jpg?code="+now.getTime();
}

/* 登陆按钮触发方法 */
function loginSubmit() {
    var userid = document.getElementById('userIdInput').value;
    var pwd = document.getElementById('passWordInput').value;
    //验证码
    //var captcha = document.getElementById('captchaInput').value;
    var captcha ='';
    if (userid == null || userid == '') {
        document.getElementById("msgIco").className = "msgIco";
        document.getElementById("megText").innerText = "请输入用户名！";
        layer.msg('请输入用户名！');
        document.getElementById('userIdInput').focus();
        return;
    }
    if (pwd == null || pwd == '') {
        document.getElementById("msgIco").className = "msgIco";
        document.getElementById("megText").innerHTML = "请输入登录密码！";
        layer.msg('请输入登录密码！');
        document.getElementById('passWordInput').focus();
        return;
    }
    /*if (captcha == null || captcha == '') {
        document.getElementById("msgIco").className = "msgIco";
        document.getElementById("megText").innerHTML = "请输入验证码！";
        layer.msg('请输入验证码！');
        document.getElementById('captchaInput').focus();
        return;
    }*/
    //loginForm.submit();
    var projectid = "1";
    var param={
        username:userid,
        password:pwd,
        captcha:'',
        ATWProject:projectid
    };

    $.ajax({
        url: "sys/login",
        type: "post",
        data: "username=" + userid + "&password=" + $.md5(pwd) + "&captcha=" + captcha + "&ATWProject=" + projectid,
        async: false,
        dataType: "json",
        success: function (result) {
            if(result.code == 0){//登录成功
                //parent.location.href ='index.html';
                localStorage.setItem("token", result.token);
                if(result.expired == 0){
                    //parent.location.href='sys/homepage/main';
                    toMian();
                }else{
                    parent.location.href='sys/user/modifyPasswordExpired';
                }
                //parent.location.href='${siteurl}/sys/homepage/main';
            }else{
                var msg = result.msg;
                document.getElementById("megText").innerText = msg;
                layer.msg(msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.responseText=="loginTwo"){
                layer.msg("同一浏览器禁止登录两个账户！");
            }
            //alert(errorThrown);
        }
    });
}

function toMian(){
    var form = $("<form></form>").attr("action", 'sys/homepage/main').attr("method", "post");
    form.appendTo('body').submit().remove();
}

/* 重置登录表单方法 */
function loginReset() {
    document.getElementById("msgIco").className = "";
    document.getElementById("megText").innerText = "";
    document.getElementById('userIdInput').value = "";
    document.getElementById('passWordInput').value = "";
    document.getElementById('captchaInput').value = "";
    document.getElementById('userIdInput').focus();
}

/* 添加键盘回车按钮监听事件 */
document.onkeydown = function(event) {
    if (window.event) {
        event = window.event;
    }
    if (event.keyCode == 13) {
        loginSubmit();
    }
};

/* 登陆页支持 */
function showSupport() {
    new Ext.Window({
        layout: 'fit',
        title: "支持",
        width: 600,
        height: 300,
        closeAction: "hide",
        resizable: false,
        items: Support.plugin.grid
    }).show();
}

/* 登陆页关于 */
function about() {
    var about = ["<div style='background: url(" + ctx + "/frame/yhgl/images/back.png) 0px 0px no-repeat; width:100%; height:100%;text-align: center;font-size: 13px;font-family: Arial,'Times New Roman' !important;'>", "<div style='padding-top:120px;margin-left: 17px;'>", "<div>", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中国机车远程监测与诊断系统(CMD)实现机车动静态信息采集、", "</div>", "<div style='padding-top:5px;'>传输、地面诊断分析，实现机车实时定位，动态跟踪“人车图”。</div>", "</div>", "<div style='color: #9bacc5; padding-top:45px;'>", "<div>中国铁路总公司机辆部 中国铁道科学研究院</div>", "<div  style='padding-top:5px;'>版本：V1.0 </div>", "</div>", "</div>"];

    new Ext.Window({
        layout: 'fit',
        title: "关于",
        width: 430,
        height: 275,
        border: true,
        closeAction: "hide",
        resizable: false,
        html: about.join('')
    }).show();
}

//判断是否需要自动登录
$(document).ready(function (){
    console.log(autoName);
    if (autoName !== null && autoName !== '' && autoPwd !== null && autoPwd !== '') {
        $.ajax({
            url: "sys/login",
            type: "post",
            data: "username=" + autoName + "&password=" + autoPwd,
            async: false,
            dataType: "json",
            success: function (result) {
                if (result.code == 0) {//登录成功
                    //parent.location.href ='index.html';
                    localStorage.setItem("token", result.token);
                    if (result.expired == 0) {
                        //parent.location.href='sys/homepage/main';
                        toMian();
                    } else {
                        parent.location.href = 'sys/user/modifyPasswordExpired';
                    }
                    //parent.location.href='${siteurl}/sys/homepage/main';
                } else {
                    var msg = result.msg;
                    document.getElementById("megText").innerText = msg;
                    document.getElementById('userIdInput').value = autoName;
                    document.getElementById('userIdInput').focus();
                    layer.msg(msg);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(errorThrown);
            }
        });
    }
})