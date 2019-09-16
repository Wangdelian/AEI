var reloadFlag = true;//换装版本监测初始化标识

var popupFlag = false;

var refreshTimer;//自动刷新
var localData = "{\"success\":true,\"totalRows\":0,\"curPage\":1,\"data\": []}";

/* ****************************
* 私有方法
* ****************************/
var _ID;
var _TrainTypeVerdictOld;
var _TrainNumberVerdictOld;
var _TrainTypeVerdictNew;
var _TrainNumberVerdictNew;

//播放音乐
function plusVoice() {
    document.getElementById('audioPlayer').play();
}
//停止音乐
function unplusVoice() {
    document.getElementById('audioPlayer').pause();
}
//获取当前日期和时间
Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};
//双击
function add_shoucang(ID, TrainTypeVerdict, TrainNumberVerdict, TimeThrough) {
    document.getElementById('light').style.display = 'block';
    //document.getElementById('fade').style.display = 'block';
    //$("#TrainTypeVerdict").val('');
    //$("#TrainNumberVerdict").val('');
    _TrainTypeVerdictOld = TrainTypeVerdict;//保存历史车型数据
    _TrainNumberVerdictOld = TrainNumberVerdict;//保存历史车号数据
    document.getElementById('TrainTypeVerdict').value = TrainTypeVerdict;
    document.getElementById('TrainNumberVerdict').value = TrainNumberVerdict;
    document.getElementById('lableTime').innerHTML = "#通过时间：&nbsp&nbsp" + TimeThrough;
    _ID = ID;
    plusVoice();
}
//确定
function EditOK() {
    _TrainTypeVerdictNew = document.getElementById('TrainTypeVerdict').value;
    _TrainNumberVerdictNew = document.getElementById('TrainNumberVerdict').value;
    var typeMod = "";
    var numberMod = "";
    if (_TrainTypeVerdictOld != _TrainTypeVerdictNew) {
        typeMod = "车型[" + _TrainTypeVerdictOld + "]->[" + _TrainTypeVerdictNew + "]";
    }
    if (_TrainNumberVerdictOld != _TrainNumberVerdictNew) {
        numberMod = "车号[" + _TrainNumberVerdictOld + "]->[" + _TrainNumberVerdictNew + "]";
    }
    _Reserve2 = typeMod + numberMod;
    _Reserve3 = userName;//确定人
    _Reserve4 = new Date().format("yyyy-MM-dd hh:mm:ss"); //确定时间
    //alert(_ID + "-" + _TrainTypeVerdictNew + "-" + _TrainNumberVerdictNew);
    $.ajax({
        url: "/handler/StateQueryMgr/TrainEdit.ashx",
        type: "post",
        data: "ID=" + _ID + "&TrainTypeVerdict=" + _TrainTypeVerdictNew + "&TrainNumberVerdict=" + _TrainNumberVerdictNew + "&Reserve2=" + _Reserve2 + "&Reserve3=" + _Reserve3 + "&Reserve4=" + _Reserve4,
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.editflag == '-1') {
                alert('数据修改失败！');
            } else if (data.editflag == '0') {
                alert('数据修改成功！');
                //搜索刷新表格
                refreshEReloadData();
            }
            popupFlag = false;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function EditCancel() {
    popupFlag = false;
    unplusVoice();
}

/*********换装数据初始化★*************/
function eReloadInit()
{
    /* ***********************************
    * 页面事件
    * ***********************************/

    /********显示与隐藏换装面板********/
    var btnHideList = $('#ereloadhide');
    btnHideList.click(function ()
    {
        if ($('#graphContainer').css('display') === "none")
        {
            alert("不能同时关闭地图和列表");
            return;
        }
        //$('#ereload').hide();
        //$('#ereload').toggle();
        $('#tab').toggle();
        $('#reload-bd').toggle();
        if (btnHideList.attr("name") == "隐藏列表")
        {
            $('#reload-hd').css('background', '#000000');
            btnHideList.attr("name", "展开列表");
            btnHideList.css("color", "#A9334C");
            btnHideList.attr("title", "点击展开列表");
            btnHideList.text("展开列表");
        }
        else
        {
            $('#reload-hd').css('background', '#293C55');
            btnHideList.attr("name", "隐藏列表");
            btnHideList.css("color", "#FFF");
            btnHideList.attr("title", "点击隐藏列表");
            btnHideList.text("隐藏列表");
        }
    });

    var btnHideMap = $('#maphide');
    btnHideMap.click(function ()
    {
        if ($('#tab').css('display') === "none")
        {
            alert("不能同时关闭地图和列表");
            return;
        }
        $('#graphContainer').toggle();
        if (btnHideMap.attr("name") == "隐藏地图")
        {
            btnHideMap.attr("name", "展开地图");
            btnHideMap.text("展开地图");
            btnHideMap.attr("title", "点击展开地图");
        }
        else
        {
            btnHideMap.attr("name", "隐藏地图");
            btnHideMap.text("隐藏地图");
            btnHideMap.attr("title", "点击隐藏地图");
        }
    });

    /********实现tab选项卡效果********/
    $(".menu_item").each(function (index, element)
    {
        $(this).click(function ()
        {
            $(".menu_item.active").removeClass("active"); //移除已选中的样式
            $(this).addClass("active"); //增加当前选中项的样式
            $("#reloadTable .menu_tab:eq(" + index + ")").fadeIn(200).siblings().hide();//menu_tab与menu_item在html层没有嵌套关联，但因为其ul序列相同，用index值可以巧妙的将两者关联。
            //refreshEReloadData(0);//页面切换刷新相应页面数据
        });
    });

    /* ***********************************
     * 表格数据加载
     * ***********************************/
    refreshEReloadData();

    /* ***********************************
     * 定时刷新换装数据
     * ***********************************/
    startTimer(5000);
}

/* ****************************
* 刷新数据
* status:刷新类型，0-只刷新表格，1-全部数据刷新，图表
* trainnum:带条件，车号搜索
* ****************************/
function refreshEReloadData(status, trainnum) {
    $(".menu_tab").each(function (index, element) {
        if ($(this).css('display') === "block") {
            console.log("tab页面索引：" + index);
            switch (index) {
                case 0:
                    if (reloadFlag) {
                        initReloadTableData();
                        reloadFlag = false;
                    }
                    else {
                        console.log("最新过车列表开始刷新！");
                        refreshRloadTableData(trainnum);
                        //获取第一行数据 并弹框提示
                        var rowDatas = $("#reloadIntoTab").jqGrid("getRowData");
                        if (rowDatas.length > 0) {
                            //if (document.getElementById('light').style.display != 'block') {
                            if (popupFlag == false) {
                                popupFlag = true;
                                try {
                                    var F_ID = rowDatas[0]["F_ID"];
                                    if (rowDatas[0]["F_TrainTypeVerdict"].split('<').length == 3) {
                                        var F_TrainTypeVerdict = rowDatas[0]["F_TrainTypeVerdict"].split('<')[1].split('>')[1];
                                    }
                                    else if (rowDatas[0]["F_TrainTypeVerdict"].split('<').length == 4) {
                                        var F_TrainTypeVerdict = rowDatas[0]["F_TrainTypeVerdict"].split('<')[2].split('>')[1];
                                    }
                                    if (rowDatas[0]["F_TrainNumberVerdict"].split('<').length == 3) {
                                        var F_TrainNumberVerdict = rowDatas[0]["F_TrainNumberVerdict"].split('<')[1].split('>')[1];
                                    }
                                    else if (rowDatas[0]["F_TrainNumberVerdict"].split('<').length == 4) {
                                        var F_TrainNumberVerdict = rowDatas[0]["F_TrainNumberVerdict"].split('<')[2].split('>')[1];
                                    }
                                    var F_TimeThrough = rowDatas[0]["F_TimeThrough"];
                                } catch (e) {
                                    alert(e);
                                }
                                //alert(F_ID + "-" + F_TrainTypeVerdict + "-" + F_TrainNumberVerdict);
                                //document.documentElement.style.overflow = "hidden";
                                add_shoucang(F_ID, F_TrainTypeVerdict, F_TrainNumberVerdict, F_TimeThrough);
                            }
                        }
                    }
                    break;
                case 1:
                    
                    break;
                default:
                    break;
            }
        }
    });
    //if (status !== 0) {
    //    console.log("开始刷新图表！");
    //    refreshChartsData();
    //}
    
}


/****获取换装版本监视数据★********/
function initReloadTableData()
{
    //alert("123");
    $('#reloadIntoTab').jqGrid({
        url: '/handler/StateQueryMgr/GetTrainPassDetail.ashx',
        datatype: 'json',//data: mydata,datatype: "local",本地
        height: '100%',//高度
        width:'100%',
        autowidth: true,//自适宽度
        //shrinkToFit:false,
        rowNum: 200,//一页显示多少条
        rowList: [10, 20, 30, 200, 500],//可供用户选择一页显示多少条
        colNames: ['记录ID', '序号', '车次', '综合车型', '综合车号', '配属局', '配属段', '设备站场', '设备地点', '进出方向', '通过时间', '标签识别', '确定人', '确定时间', '备注'],
        colModel: [
		        { name: 'F_ID', index: 'F_ID', width: 0.01, align: 'center', sorttype: 'int' },
                { name: 'F_IDEx', index: 'F_IDEx', width: 4, align: 'center', sorttype: 'int' },
		        { name: 'F_TrainOrder', index: 'F_TrainOrder', width: 10, align: 'center', sortable: false, formatter: checkInfo },
		        { name: 'F_TrainTypeVerdict', index: 'F_TrainTypeVerdict', width: 10, align: 'center', sortable: false, formatter: checkInfo },
		        { name: 'F_TrainNumberVerdict', index: 'F_TrainNumberVerdict', width: 10, align: 'center', sorttype: 'string', sortable: false, formatter: checkInfo },
		        { name: 'F_BureauName', index: 'F_BureauName', width: 10, align: 'center', sorttype: 'string', formatter: updateStyleFont },
		        { name: 'F_SectionName', index: 'F_SectionName', width: 10, align: 'center', sorttype: 'string', formatter: updateStyleFont },
                { name: 'F_PassSite', index: 'F_PassSite', width: 10, align: 'center', sorttype: 'string' },
                { name: 'F_PassPoint', index: 'F_PassPoint', width: 10, align: 'center', sorttype: 'string' },
		        { name: 'F_Direction', index: 'F_Direction', width: 10, align: 'center', sorttype: 'string' },
		        { name: 'F_TimeThrough', index: 'F_TimeThrough', width: 20, align: 'center', sorttype: 'string' },
		        { name: 'F_InfoRFID', index: 'F_InfoRFID', width: 20, align: 'center', sortable: false, formatter: checkInfo },
                { name: 'F_Reserve3', index: 'F_Reserve3', width: 20, align: 'center', sortable: false },//修改人
                { name: 'F_Reserve4', index: 'F_Reserve4', width: 20, align: 'center', sortable: false },//修改时间
		        //{ name: 'F_InfoImage', index: 'F_InfoImage', width: 50, align: 'center', sortable: false, formatter: checkInfo },
		        { name: 'F_Reserve1', index: 'F_Reserve1', width: 150, align: 'center', sorttype: 'string' }
        ],	//hidden:false是否初始化显示
        loadonce: false,//（默认情况下为false，显示指定只加载一次数据）
        pager: '#reloadIntoTabPager',//表格页脚的占位符(一般是div)的id
        //sortname : 'F_ID',//初始化的时候排序的字段
        //sortorder : 'desc',//排序方式,可选desc,asc
        viewrecords: true,//是否在浏览导航栏显示记录总数
        mtype: 'post',//向后台请求数据的ajax的类型。可选post,
        postData: {
            Type:"CH",//车号监控
            LevelMarkID: userLevelMarkID,//当前LevelMarkID
            bureauName: $('#bureauName').val(),//路局选择
            passSection: $('#passSection').val(),//机务段
            passSite:$('#passSite').val(),//站（车间选择）
            passPoint:$('#passPoint').val(),//通过地点
            direction:$('#direction').val(),//进出方向
            screening: "综合识别错误",//筛选条件
            datestart :  $('#datestart').val(),//开始时间
            dateend :  $('#dateend').val(),//结束时间
            trainType: $('#trainType').val(),//查询车型
            trainNumber: $('#trainNumber').val() //查询车号
        },
        jsonReader:
        {
            page: "page",//当前页
            total: "total",//总页数
            records: "records",//查询出的记录数
            root: "rows",//数据
            repeatitems: false
            //userdata: "userdata",//自定义数据，用于其他显示，userdata: {totalinvoice:240.00, tax:40.00},
        },
        //caption: '提示：双击行编辑综合车型 综合车号数据',
        loadComplete: function () {
            var recordCount = $("#reloadIntoTab").jqGrid('getGridParam', 'records')
        },
        ondblClickRow: function (id) {
            var rowDatas = $("#reloadIntoTab").jqGrid('getRowData', id);
            if (popupFlag == false) {
                popupFlag == true;
                var F_ID = rowDatas["F_ID"];
                if (rowDatas["F_TrainTypeVerdict"].split('<').length == 3) {
                    var F_TrainTypeVerdict = rowDatas["F_TrainTypeVerdict"].split('<')[1].split('>')[1];
                }
                else if (rowDatas["F_TrainTypeVerdict"].split('<').length == 4) {
                    var F_TrainTypeVerdict = rowDatas["F_TrainTypeVerdict"].split('<')[2].split('>')[1];
                }
                if (rowDatas["F_TrainNumberVerdict"].split('<').length == 3) {
                    var F_TrainNumberVerdict = rowDatas["F_TrainNumberVerdict"].split('<')[1].split('>')[1];
                }
                else if (rowDatas["F_TrainNumberVerdict"].split('<').length == 4) {
                    var F_TrainNumberVerdict = rowDatas["F_TrainNumberVerdict"].split('<')[2].split('>')[1];
                }
                var F_TimeThrough = rowDatas["F_TimeThrough"];
                //alert(F_ID + "-" + F_TrainTypeVerdict + "-" + F_TrainNumberVerdict);
                //document.documentElement.style.overflow = "hidden";
                add_shoucang(F_ID, F_TrainTypeVerdict, F_TrainNumberVerdict, F_TimeThrough);
            }
        }
    });

    $("#reloadIntoTab").closest(".ui-jqgrid-bdiv").css({ 'overflow': 'scroll'});
    $("#reloadIntoTab").closest(".ui-jqgrid-bdiv").height(276);
}

/****刷新换装版本监视数据********/
function refreshRloadTableData(trainnum) {
    console.log("开始刷新最新过车列表数据");
    var locomotiveNum = "";
    var flag = false;//是否查询到该机车数据标志
    if (trainnum !== undefined) {
        locomotiveNum = trainnum;
    }

    //换装数据进库列表
    refreshGridTable("reloadIntoTab", locomotiveNum);

    //换装数据出库列表
    refreshGridTable("reloadOutTab", locomotiveNum);
}


//判断信息是否正确
function checkInfo(cellvalue, options, rowdata) {
    if (cellvalue != "") {
        var status = cellvalue.substr(0, 1);
        if (status == "0") {//正常
            return "<span style='line-height:33px;'>" + cellvalue.substring(1) + "</span>";
        }
        else {//错误
            return "<img src='/media/skin1/img/skin_/infoError.png' style='width:12px;height:12px;vertical-align:middle;'/><span style='color:red;line-height:33px;'>" + cellvalue.substring(1) + "</span>";
        }
    }
    else {
        return "<img src='/media/skin1/img/skin_/infoError.png' style='width:12px;height:12px;vertical-align:middle;'/>";
    }
}
//设置字体大小
function updateStyleFont(cellvalue, options, rowdata) {
    return '<span style="font-size:12px;">' + cellvalue + '</span>';
}


//判断换装状态是否满足要求
function checkPersonnelState(cellvalue, options, rowdata)
{
    var personnelState = rowdata["PersonnelState"];
    console.dir(personnelState);
    if (personnelState === '未换装') {

        return ('<div style="background:red;">' + cellvalue + '</div>');
    }
    else {
        return ('<div style="background:green;">' + cellvalue + '</div>');
    }
}

//判断数据版本是否满足要求
function checkDataVersion(cellvalue, options, rowdata)
{
    var planDataVersion = rowdata["planDataVersion"];
    return formatReloadCell(cellvalue, planDataVersion);
}

//判断模式版本是否满足要求
function checkProgramVersion(cellvalue, options, rowdata)
{
    var planDataVersion = rowdata["planProgramVersion"];
    return formatReloadCell(cellvalue, planDataVersion);
}

/*********公有单元格格式化********/
function formatReloadCell(cell, planCell)
{
    if ( cell === planCell)
    {
        return  cell;
    }
    else
    {
        return cell;
        //return ('<div style="background:red;">&nbsp;</div>');
    }
}


/*******刷新表格公共方法********/
function refreshGridTable(tableid, locomotiveNum)
{
    var rules = "";
    if (locomotiveNum !== undefined)
    {
        rules += '"locomotiveNum":"' + locomotiveNum + '"';//车号
    }
    else
    {
        rules += '"locomotiveNum":""';//车号
    }
    ParamJson = '{' + rules + '}';
    var postData = $("#" + tableid + "").jqGrid("getGridParam", "postData");
    console.dir(postData);
    $.extend(postData, { Param: ParamJson });
    $("#" + tableid + "").jqGrid("setGridParam", { search: true, sortname: '', sortorder: '' }).trigger("reloadGrid", [{ page: 1 }]);  //重载JQGrid
}


/********关闭自动刷新********/
function stopTimer()
{
    console.log("关闭自动刷新");
    clearInterval(refreshTimer);
}

/********启动自动刷新********/
function startTimer(time)
{
    console.log("启动自动刷新");
    clearInterval(refreshTimer);//先清除自动刷新
    if (time !== undefined)
    {
        console.log("有参："+time);
        refreshTimer = setInterval("refreshEReloadData()", time);
    }
    else
    {
        console.log("无参：" + time);
        refreshTimer = setInterval("refreshEReloadData()", 5000);//默认2s刷新
    }
}

/*********窗口改变重新刷新************/
$(window).resize(function ()
{
    $("#reloadIntoTab").setGridWidth($("#ereload-into").width());
    //alert("1");
    if ($("#ereloadlist").css('displat') === 'block')
    {
        //alert("1");
        $("#reloadIntoTab").setGridWidth($("#ereload-into").width());
        //$("#reloadOutTab").setGridWidth($("#ereload-into").width());
        //$("#certificateIntoTab").setGridWidth($("#ereload-into").width());
        //$("#certificateOutTab").setGridWidth($("#ereload-into").width());
    }
    else if ($("#ecertificatelist").css('displat') === 'block')
    {
        $("#reloadIntoTab").setGridWidth($("#certificateInto").width());
        //$("#reloadOutTab").setGridWidth($("#certificateInto").width());
        //$("#certificateIntoTab").setGridWidth($("#certificateInto").width());
        //$("#certificateOutTab").setGridWidth($("#certificateInto").width());
    }
});