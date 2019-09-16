/**
 * 时间：2018-1-18 16:17:01
 *
 */

function setCookie(name, value, hour) {
    if (!name || !value)
        return;
    var date = new Date();
    date.setTime(date.getTime() + hour * 60 * 60 * 1000);

    document.cookie = name + '=' + value + ';expires=' + date.toGMTString();
}

function getCookie(name) {
    if (!name)
        return null;

    var arr = new Array();
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return arr[2];
    else
        return null;
}

function delCookie(name) {
    if (!name)
        return null;

    var date = new Date();
    date.setTime(date.getTime() - 1);
    var cookieVal = getCookie(name);
    if (cookieVal)
        document.cookie = name + "=" + cookieVal + ";expires=" + date.toGMTString();
}

//下载文件
function downFile(url) {
    var form = $("<form></form>").attr("action", url).attr("method", "get");
    form.append($("<input/>").attr("type", "hidden"));
    form.appendTo('body').submit().remove();
}

//下载文件（改进IE浏览器问题）
function downFile2(url,data) {
    console.log(data);
    console.log(url);

    var form = $("<form></form>").attr("action", url).attr("method", "get");
    for(var key in data){
        form.append($("<input/>").attr("type", "hidden").attr("name", key).attr("value",eval("data."+key)));
    }
    console.log("aaaaa");

    form.appendTo('body').submit().remove();

}

function downFile3(url,data) {
    console.log(data);
    var form = $("<form></form>").attr("action", url).attr("method", "get");
    for(var key in data){
        if(key=="productiondeptname"){
            for(var i=0;i<data.productiondeptname.length;i++){
                form.append($("<input/>").attr("type", "checkbox").attr("name", 'productiondeptname').attr("class", 'productiondeptname').attr("value",data.productiondeptname[i]));
            }
        }
        form.append($("<input/>").attr("type", "hidden").attr("name", key).attr("value",eval("data."+key)));
    }

    form.appendTo('body').submit().remove();
}

//时间的转换
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}