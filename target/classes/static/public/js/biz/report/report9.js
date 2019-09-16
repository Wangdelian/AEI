/**
 * Created by hh on 2017/7/25.
 */
$(function () {

    //$.fn.bsgrid.defaults.colsProperties.alignAttr='left';
    gridObj = $.fn.bsgrid.init('searchTable', {
        localData: tbody,//数据
        pageSizeSelect: true,
        showPageToolbar:false,
        pageAll: true
    });


    // 表格的checkbox选择
    if($('#searchTable thead tr th:eq(0) input[type=checkbox]').length == 1) {
        $('#searchTable thead tr th:eq(0) input[type=checkbox]').change(function () {
            var checked = $.bsgrid.adaptAttrOrProp($(this), 'checked') ? true : false;
            $.bsgrid.adaptAttrOrProp($('#searchTable tbody tr td:nth-child(1)>input[type=checkbox]'), 'checked', checked);
        });
    }
});


//日期格式化函数
Date.prototype.Format = function (fmt) { //author: meizz
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

var today = new Date().Format("yyyy-MM-dd HH:mm:ss");


//获取几天前的日期，并且转化为相应格式（yyyy-MM-dd HH:mm:ss）
function getBeforeDate(n){
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    var hours = d.getHours();
    var minute = d.getMinutes()
    var second = d.getSeconds();
    if(day <= n){
        if(mon>1) {
            mon=mon-1;
        }
        else {
            year = year-1;
            mon = 12;
        }
    }
    d.setDate(d.getDate()-n);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day)+" "+hours+":"+minute+":"+second;
    return s;
}


function getDate(){
    var startTime='';
    var  endTime = '';
    var time = $("input[name='time']:checked").val();
    if(time == undefined)
        time = 0;
    else  if (time == "自定义") {
        startTime = $("#startTime").attr("value");
        endTime = $("#endTime").attr("value");
        if(startTime >= endTime ){
            alert("开始时间不能大于结束时间，请检查！");
            return ;
        }
    }
    else{
        var timeArray =  new Array('',getBeforeDate(3),getBeforeDate(7),getBeforeDate(30));
        startTime = timeArray[time];
    }

    alert(startTime);
    alert(endTime);
}


//自定义时间查询隐藏/开启
$('.search-box input[type=radio]').click(function(e) {
    if($(this).prop('checked')){
        if($(this).attr('data-define') === 'define'){
            $('.define-input').show();
        }else{
            $('.define-input').hide();
        }
    }
});

var vm = new Vue({
    el:'#rrapp',
    data:{
        q:{
            username: null
        },
        showList: true,
        title:systemname,
        roleList:{},
        user:{
            status:1,
            roleIdList:[]
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.roleList = {};
            vm.user = {status:1,roleIdList:[]};

            //获取角色信息
            this.getRoleList();
        },
        update: function () {
            var userId = getSelectedRow();
            if(userId == null){
                return ;
            }

            vm.showList = false;
            vm.title = "修改";

            vm.getUser(userId);
            //获取角色信息
            this.getRoleList();
        },
        del: function () {
            var userIds = getSelectedRows();
            if(userIds == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: "../sys/user/delete",
                    contentType: "application/json",
                    data: JSON.stringify(userIds),
                    success: function(r){
                        if(r.code == 0){
                            alert('操作成功', function(index){
                                vm.reload();
                            });
                        }else if(r.msg!=null && r.msg != ""){
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        saveOrUpdate: function (event) {
            var url = vm.user.userId == null ? "../sys/user/save" : "../sys/user/update";
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.user),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(index){
                            vm.reload();
                        });
                    }else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        getUser: function(userId){
            $.get("../sys/user/info/"+userId,{"time": new Date().getTime()}, function(r){
                vm.user = r.user;
            });
        },
        getRoleList: function(){
            $.get("../sys/role/select",{"time": new Date().getTime()}, function(r){
                vm.roleList = r.list;
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'username': vm.q.username},
                page:page
            }).trigger("reloadGrid");
        }
    }
});



//此为日期的插件
(function(){
    var d=document,
        w=window,
        isIE=w.navigator.appVersion.indexOf("MSIE")>-1,
        now=new Date(),
        nowM=now.getMonth();
    nowY=now.getFullYear();
    date=null,
        ids=null,
        oInput=null;
    document.write('<iframe frameborder=0 style="display:none;position:absolute;" width="200" height="215" scrolling="no" name="sangcalender" id="sangcalender"></iframe>');
    var f=window.frames['sangcalender'];
    var ff=d.getElementById('sangcalender');
    var fd=f.document;
    fd.open();
    fd.write('<!DOCTYPE html><html><head><style type="text/css">#yearL, #monthL, #monthR, #yearR, #hoursL, #hoursR, #minL, #minR, #y, #m, #h, #i, #s{cursor:pointer;}.calenderClose a{display:block;width:13px;line-height:13px;border:1px solid #cccccc;background-color:#eeeeee;color:#666; text-decoration:none}.calenderClose a:hover{color:red}td{text-align:center}#calenderDay{cursor:pointer}body{font-size:12px;padding:0;margin:0}.col666{color:#999}.bg9ebdd6{background-color:#9ebdd6}</style></head><body onselectstart="return false" style="-moz-user-select:none" oncontextmenu="return false">')
    fd.write('<table width="100%" border="0" bgcolor="#CCCCCC" cellspacing="1" cellpadding="0">'+
        '<tr><td><table border="0" cellspacing="0" bgcolor="#6699FF" cellpadding="0" width="100%">'+
        '<tr><td width="20" height="25" align="center" id="yearL" title="上一年">&lt;&lt;</td>'+
        '<td width="12" align="center" id="monthL" title="上一月">&lt;</td><td align="center">'+
        '<span id="y" title="点击选择年份"></span>年<span id="m" title="点击选择月份"></span>月</td>'+
        '<td width="12" align="center" id="monthR" title="下一月">&gt;</td>'+
        '<td width="20" align="center" id="yearR" title="下一年">&gt;&gt;</td></tr></table></td></tr>'+
        '<tr bgcolor="#FFFFFF"><td><table width="100%" border="0" bgcolor="#9999FF" cellspacing="1" cellpadding="0">'+
        '<tr bgcolor="#CCCCFF" height="18"><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></table></td></tr>'+
        '<tr bgcolor="#FFFFFF"><td><div id="calenderDay"></div></td></tr>'+
        '<tr><td><table border="0" bgcolor="#eeeeee" cellpadding="0" cellspacing="0" width="100%">'+
        '<tr><td align="center" height="20" id="hoursL" title="时减少">&lt;&lt;</td>'+
        '<td align="center" id="minL" title="分减少">&lt;</td>'+
        '<td align="center"><span id="h" title="点击选择小时"></span>:<span id="i" title="点击选择分"></span>:<span id="s" title="点击选择秒"></span></td>'+
        '<td align="center" id="minR" title="分增加">&gt;</td><td align="center" id="hoursR" title="时增加">&gt;&gt;</td></tr>'+
        '</table></td></tr></table>');
    fd.write('</body></html>');
    fd.close();

    //获取框架里的元素  gids.call(obj,id)
    function gids(idArr){
        var oId=[];
        for(var i=0,len=idArr.length;i<len;i++){
            oId[idArr[i]]=this.getElementById(idArr[i]);
        }
        return oId;
    }
    //需要添加事件的元素的集合
    var idsArr=['yearL','yearR','y','m','monthL','monthR','hoursL','hoursR','minL','minR','calenderClose','calenderDay','h','i','s'];
    if(!ids){ids=gids.call(fd,idsArr)};
    //格式化日历控件
    function formatDay(timestr){
        var t=/(\d+)-(\d+)-(\d+)\s*(\d*):?(\d*):?(\d*)/.exec(timestr);
        var da=null;
        var dn=getdate(now);
        if(t){
            da=new Date(t[1],t[2]-1,1,t[4],t[5],t[6]);
        }else{
            da=new Date(dn['y'],dn['m'],1,dn['h'],dn['i'],dn['s']);
        }
        date=getdate(da);
        var mon=[31,date['y']%4==0?29:28,31,30,31,30,31,31,30,31,30,31];
        var str="",day=1;
        str+='<table width="100%" border="0" bgcolor="#cecece" cellspacing="1" cellpadding="0">';
        for(var md=mon[date['m']-1],wd=md-date['w']+1,n=0;n<6;n++){
            str+='<tr bgcolor="#ffffff" height="23">';
            for(var nn=0;nn<7;nn++){
                if(wd<=md){
                    str+='<td class="col666">'+wd+'</td>';
                    wd++;
                }else {
                    if(day<=mon[date['m']]){
                        if(day==dn['d'] && nowM==now.getMonth()&&nowY==now.getFullYear()){
                            str+='<td class="bg9ebdd6">'+(day++)+'</td>';
                        }else{
                            str+='<td>'+(day++)+'</td>';
                        }
                        var day2=1;
                    }else{
                        str+='<td class="col666">'+(day2++)+'</td>';
                    }
                }
            }
            str+='</tr>';
        }
        str+='</table>';
        ids['calenderDay'].innerHTML=str;
        var dates=[date['y'],fillzero(date['m']+1),fillzero(date['h']),fillzero(date['i']),fillzero(date['s'])];
        each.call([ids['y'],ids['m'],ids['h'],ids['i'],ids['s']],function(o,i){o.innerHTML=dates[i]});
        each.call(ids['calenderDay'].getElementsByTagName("td"),function(o,i){
            addEvent(o,"mouseover",function(e){
                o.style.backgroundColor="#9ebdd6";
            })
            addEvent(o,"mouseout",function(e){
                o.style.backgroundColor="";
            })
            addEvent(o,"click",function(e){
                if(o.className=="col666"){return}
                oInput.value=ids['y'].innerHTML+"-"+ids['m'].innerHTML+"-"+ fillzero(o.innerHTML)
                    +" "+ids['h'].innerHTML+":"+ids['i'].innerHTML+":"+ids['s'].innerHTML;
                hide();
            })
        })
    }

    //为按钮添加事件
    var handlers=[yL,yR,mL,mR,hL,hR,iL,iR];
    each.call([ids['yearL'],ids['yearR'],ids['monthL'],ids['monthR'],ids['hoursL'],ids['hoursR'],ids['minL'],ids['minR']],function(o,i){
        addEvent(o,"click",handlers[i]);
    })

    var clicks=[yClick,mClick,hClick,iClick,sClick];
    each.call([ids['y'],ids['m'],ids['h'],ids['i'],ids['s']],function(o,i){
        addEvent(o,"click",clicks[i]);
    })

    //获取元素位置
    function getPos(e){
        var x,y,e=typeof e=="string"?d.getElementById(e):e,p=[];
        x=e.offsetLeft;
        y=e.offsetTop;
        while(e=e.offsetParent){
            x+=e.offsetLeft;
            y+=e.offsetTop;
        }
        p['x']=x;p['y']=y;
        return p;
    }

    //上一年
    function yL(){
        now.setFullYear(date['y']-1);
        formatDay();
    }

    //下一年
    function yR(){
        now.setFullYear(date['y']+1);
        formatDay();
    }

    //上一月
    function mL(){
        now.setMonth(date['m']-1);
        formatDay();
    }

    //下一月
    function mR(){
        now.setMonth(date['m']+1);
        formatDay();
    }

    //时增加
    function hR(){
        now.setHours(date['h']+1);
        formatDay();
    }

    //时减少
    function hL(){
        now.setHours(date['h']-1);
        formatDay();
    }

    //分增加
    function iR(){
        now.setMinutes(date['i']+1);
        formatDay();
    }

    //分减少
    function iL(){
        now.setMinutes(date['i']-1);
        formatDay();
    }

    //为SELECT添加事件
    function addEventForSelect(type){
        function changeInner(){
            ids[type].innerHTML=fillzero(oSelect.value);
            now.setFullYear(ids['y'].innerHTML);
            now.setMonth(Number(ids['m'].innerHTML)-1);
            now.setHours(ids['h'].innerHTML);
            now.setMinutes(ids['i'].innerHTML);
            now.setSeconds(ids['s'].innerHTML);
            formatDay();
        }
        var oSelect=gids.call(fd,['calenderSelect'])['calenderSelect'];
        oSelect.focus();
        addEvent(oSelect,'change',changeInner);
        addEvent(oSelect,"blur",changeInner);
    }

    //生成option选项
    function createOption(type,v){
        var str='',str2='',i=0,i2=0;
        function create(i,i2){
            while(i>=i2){
                if(v==i){
                    str2+='<option value="'+i+'" selected>'+i+'</option>';
                }else{
                    str2+='<option value="'+i+'">'+i+'</option>';
                }
                i--;
            }
            str+=str2+'</select>';
            ids[type].innerHTML=str;
            addEventForSelect(type);
        }
        str+='<select id="calenderSelect">';
        if(type=="y"){
            i=2011;i2=1990;
            create(i,i2);
            return;
        }
        if(type=="m"){
            i=1;i2=12;
        }
        if(type=="h"){
            i=00;i2=23;
        }
        if(type=="i"){
            i=00;i2=59;
        }
        if(type=="s"){
            i=00;i2=59;
        }
        create(i2,i);
    }

    //年鼠标点击
    function yClick(e){
        if(getTarget(e).tagName.toLowerCase()=="span"){
            createOption("y",ids['y'].innerHTML);
        }
    }

    //月鼠标点击
    function mClick(e){
        if(getTarget(e).tagName.toLowerCase()=="span"){
            createOption("m",ids['m'].innerHTML);
        }
    }

    //时鼠标点击
    function hClick(e){
        if(getTarget(e).tagName.toLowerCase()=="span"){
            createOption("h",ids['h'].innerHTML);
        }
    }

    //分鼠标点击
    function iClick(e){
        if(getTarget(e).tagName.toLowerCase()=="span"){
            createOption("i",ids['i'].innerHTML);
        }
    }

    //秒鼠标点击
    function sClick(e){
        if(getTarget(e).tagName.toLowerCase()=="span"){
            createOption("s",ids['s'].innerHTML);
        }
    }

    //each方法
    function each(handler){
        var o=null;
        for(var i=0,len=this.length;i<len;i++){
            o=typeof this[i]=="string"?fd.getElementById(this[i]):this[i];
            handler(o,i);
        }
    }

    //如果日期为一位数，则在前面补零
    function fillzero(str){
        var str=typeof str=="string"?str:str.toString();
        if(str.length==1){
            str="0"+str;
        }
        return str;
    }

    //获取时间
    function getdate(da){
        var date=[];
        date['y']=da.getFullYear();
        date['m']=da.getMonth();
        date['d']=da.getDate();
        date['w']=da.getDay();
        date['h']=da.getHours();
        date['i']=da.getMinutes();
        date['s']=da.getSeconds();
        return date;
    }

    //阻止默认事件
    function preventDefault(e){
        var e=e||window.event;
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue=false;
        }
    }

    function getTarget(e){
        var e=e||window.event;
        return e.srcElement||e.target;
    }

    //显示日历控件
    function show(o){
        var s=o.value;
        var p=getPos(o);
        if(s){
            formatDay(s);
        }else{
            now=new Date();
            formatDay();
        }
        ff.style.left=p['x']+"px";
        ff.style.top=p['y'] + o.offsetHeight + "px";
        ff.style.display="block";
    }

    //隐藏日历控件
    function hide(){
        ff.style.display="none";
    }

    //添加事件
    function addEvent(element,event,handler){
        var element=typeof element=="string"?d.getElementById(element):element;
        if(element.addEventListener){
            element.addEventListener(event,handler,false)
        }else if(element.attachEvent){
            element.attachEvent("on"+event,handler);
        }else{
            element["on"+event]=handler;
        }
    }

    //获取要实现控件的表单
    function getObj(className){
        var o=d.getElementsByTagName('*'),oArr=[];
        for(var i=0,len=o.length;i<len;i++){
            if(o[i].className==className){
                oArr.push(o[i])
            }
        }
        return oArr;
    }

    each.call(getObj("sang_Calender"),function(o,i){
        addEvent(o,"click",function(e){preventDefault(e);oInput=o,show(o);ff.focus()})
    })

    //var iframeObj=isIE?ff:f;
    addEvent(isIE?ff:f,"blur",function(e){hide()})
})()