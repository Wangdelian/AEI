/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JQuery版本：
 *Vue.js版本：
 *公司名称：
 *命名空间：io.jeasyframework.controller
 *文件名：  sysloglist.js
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/12/12 15:39
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/12/12 15:39
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
var v_listdata = [{
    "icc": "数量"
    , "f1": "15123"
    , "f2": "12422"
    , "f3": "10221"
    , "f4": "8595"
    , "f5": "6854"
}, {
    "icc": "占比"
    , "f1": "9.8%"
    , "f2": "5.82%"
    , "f3": "4.33%"
    , "f4": "3.23%"
    , "f5": "2.85%"
}]
var myChart = echarts.init(document.getElementById('main_echart'), 'infographic');
var myChart1 = echarts.init(document.getElementById('main_echart1'), 'infographic');
var myChart2 = echarts.init(document.getElementById('main_echart2'), 'infographic');
var myChart3 = echarts.init(document.getElementById('main_echart3'), 'infographic');
var myChart4 = echarts.init(document.getElementById('main_echart4'), 'infographic');
var o = {
    title: {
        top: '1%',
        left: 'center',
        text: '问题属性趋势'
    },
    color: [
        '#4682B4',
        '#D2691E',
        '#808080',
        '#CC9909',
        '#3D9140',
        '#FFC0CB',
        '#FF7F50'
    ],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: '7%',
        data: []
    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        right: '1%',
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        interval: 100,
        type: 'value'
    },
    series: []
};
var o1 = {
    title: {
        top: '1%',
        left: 'center',
        text: '问题属性排列图'
    },
    color: [
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#ca8622'
    ],
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    legend: {
        top: '7%',
        data: ['', '']
    },
    toolbox: {
        right: '1%',
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value',

    },
    series: [
        {
            name: '',
            type: 'bar',
            data: [],
            barWidth: '30',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        },
        {
            name: '',
            type: 'bar',
            data: [],
            barWidth: '30',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        }
    ]
};
var o2 = {
    title: {
        top: '1%',
        left: 'center',
        text: 'ICC排列图'
    },
    color: [
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#ca8622'
    ],
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        right: '1%',
        feature: {
            saveAsImage: {}
        }
    },
    legend: {
        top: '7%',
        data: ['', '']
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            interval: 0,
            rotate: 30
        },
        splitLine: {
            show: false
        },
        data: []
    },
    yAxis: {

        type: 'value'
    },
    series: [
        {
            name: '',
            type: 'bar',
            data: [],
            barWidth: '30',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        },
        {
            name: '',
            type: 'bar',
            data: [],
            barWidth: '30',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        }
    ]
};
var o3 = {
    title: {
        text: 'AUDIT问题关闭率',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
        right: '1%',
        feature: {
            saveAsImage: {}
        }
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: []
    },
    series: []
};
var o4 = {
    title: {
        text: '责任单位占比',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
        right: '1%',
        feature: {
            saveAsImage: {}
        }
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: []
    },
    series: []
};

function getAuditTrendxAxisDate() {
    var params = {
        startTime: $('#startTimeAudit').val(),
        endTime: $('#endTimeAudit').val()
    };
    var num = 3;
    var arr = [];
    var beginMonth = null,
        endMonth = null;

    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/getTimeMonth/",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (date) {
            beginMonth = new Date(Date.parse(date[0].replace(/-/g, "/"))).getMonth() + 1;
            endMonth = new Date(Date.parse(date[1].replace(/-/g, "/"))).getMonth() + 1;
            arr.push(beginMonth + "-" + endMonth + "月单台均值");
            for (var i = beginMonth; i < beginMonth + date[2]; i++) {
                arr.push((i % 12 == 0 ? 12 : i % 12) + "月");
            }
        },
        error: {}
    });
    return arr;
}

function getAuditTrendLengent() {
    var arr = [];
    var params = {
        startTime: $('#startTimeAudit').val(),
        endTime: $('#endTimeAudit').val()
    };
    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/getaudittrendlengentlist",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (date) {
            if (date) {
                for (var j = 0; j < date.length; j++) {
                    arr.push(date[j].productiondeptname);
                }
            }
        },
        error: function (errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }

    });
    return arr;

}

function getAuditTrendSeries() {

    var seriesarr = [];
    var arr = [];
    var shus1 = [];
    var arrvalue = [];
    var lengentName = [];
    var params = {
        lengentName: lengentName,
        startTime: $('#startTimeAudit').val(),
        endTime: $('#endTimeAudit').val()
    };

    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/audittrendlist",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (date) {
            if (date) {
                for (var i = 0; i < date.length; i++) {
                    if (date[i].auditscore == 0) {
                        arr.push(null);
                    } else {
                        arr.push(date[i].auditscore);
                    }
                }
            }

            if (date) {
                for (var i = 0; i < date.length; i++) {
                    if (date[i].productiondeptname == 0) {
                        lengentName.push(null);
                    } else {
                        lengentName.push(date[i].productiondeptname);
                    }
                }
            }

            for (var i = 0; i < lengentName.length; i++) {
                arrvalue[i] = [arr[i], , ,];
            }

            for (var i = 0; i < lengentName.length; i++) {
                var seriesValue =
                    {
                        name: lengentName[i],
                        type: 'bar',
                        data: arrvalue[i],
                        barWidth: '10%',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        }
                    };
                seriesarr.push(seriesValue);
            }
        },
        error: function (errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }
    });

    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/audittrendoncemonthlist",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            for (var i = 0; i < lengentName.length; i++) {
                var shus = [];
                shus.push(null);
                for (var j = data.length - 1; j >= 0; j--) {
                    shus.push(data[j][i]);
                }
                shus1.push(shus);
                var seriesValue =
                    {
                        name: lengentName[i],
                        type: 'line',
                        data: shus1[i],
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        }
                    };
                seriesarr.push(seriesValue);
            }
        },
        error: function (errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }
    });
    return seriesarr;
}

function getExitRateSeries() {
    var arr = [];
    var params = {
        productiondeptname: $('#productiondeptname').val(),
        startTime: $('#startTimeExitRate').val(),
        endTime: $('#endTimeExitRate').val()
    };
    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/exitratelist",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var temp = {};
                temp['value'] = data[i].auditscore;
                temp['name'] = data[i].auditstatus;
                arr.push(temp);
            }
        },
        error: function (errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }
    });

    var seriesarr = [
        {
            name: 'AUDIT问题关闭率',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: arr,
            label: {
                normal: {
                    formatter: ' {b}：{c}  {d}%  ',
                    borderWidth: 1,
                    borderRadius: 4
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    return seriesarr;
}

function getExitRateLegend() {
    var legendname = [];
    var params = {
        productiondeptname: $('#productiondeptname').val(),
        startTime: $('#startTimeExitRate').val(),
        endTime: $('#endTimeExitRate').val()
    };

    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/exitratelist",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                legendname.push(data[i].auditstatus);
            }
        },
        error: function (errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }
    });
    return legendname;
}

function getDutyDeptLegend() {
    var legendname = [];
    var params = {
        startTime: $('#startTimeExitRate').val(),
        endTime: $('#endTimeExitRate').val()
    };

    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/auditdutydeptlist",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                legendname.push(data[i].dutydept);
            }
        },
        error: function (errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }
    });
    return legendname;
}

function getDutyDeptSeries() {
    var arr = [];
    var params = {
        startTime: $('#startTimeDutyDept').val(),
        endTime: $('#endTimeDutyDept').val()
    };
    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/auditdutydeptlist",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var temp = {};
                temp['value'] = data[i].auditscore;
                temp['name'] = data[i].dutydept;
                arr.push(temp);
            }
        },
        error: function (errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }
    });

    var seriesarr = [
        {
            type: 'pie',
            radius: '55%',
            center: ['55%', '60%'],
            data: arr,
            label: {
                normal: {
                    formatter: ' {b}：{c}  {d}%  ',
                    //formatter: ' {b|{b}：}{c}  {per|{d}%}  ',
                    borderWidth: 1,
                    borderRadius: 4
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    return seriesarr;
}


function getAuditIsattrIccseries(params) {
    var arrauditdata = [];
    var arrxAxis = [];
    var arrseries1 = [];
    var arrseries2 = [];
    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/getAuditIsattrIccseries",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            for (var i = 0; i < data.auditserieslistsecond.length; i++) {
                arrxAxis.push(data.auditserieslistsecond[i].icc)
                if (data.auditserieslistsecond[i].auditscore == 0) {
                    arrseries2.push("");
                } else {
                    arrseries2.push(data.auditserieslistsecond[i].auditscore);
                }

            }

            for (var i = 0; i < data.auditserieslistfirst.length; i++) {
                if (data.auditserieslistfirst[i] == null || data.auditserieslistfirst[i].auditscore == 0) {
                    arrseries1.push("");
                } else {
                    arrseries1.push(data.auditserieslistfirst[i].auditscore)

                }

            }
            arrauditdata.push(arrxAxis);
            arrauditdata.push(arrseries1);
            arrauditdata.push(arrseries2);


        },
        error: function (errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }
    });
    return arrauditdata;
}


function getAuditIsattrArrangeseries(params) {
    var arrauditdata = [];
    var arrxAxis = [];
    var arrseries1 = [];
    var arrseries2 = [];
    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/getAuditIsattrArrangeseries",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            for (var i = 0; i < data.auditserieslistsecond.length; i++) {
                arrxAxis.push(data.auditserieslistsecond[i].issueattr)
                if (data.auditserieslistsecond[i].auditscore == 0) {
                    arrseries2.push("");
                } else {
                    arrseries2.push(data.auditserieslistsecond[i].auditscore);
                }

            }

            for (var i = 0; i < data.auditserieslistfirst.length; i++) {
                if (data.auditserieslistfirst[i] == null) {
                    arrseries1.push("");
                } else {
                    arrseries1.push(data.auditserieslistfirst[i].auditscore)

                }

            }
            arrauditdata.push(arrxAxis);
            arrauditdata.push(arrseries1);
            arrauditdata.push(arrseries2);


        },
        error: function (errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }
    });
    return arrauditdata;
}

$(function () {

    addProductdeptOption();
    //初始化表格数据
    o.legend.data = getAuditTrendLengent();
    o.series = getAuditTrendSeries();
    o.xAxis.data = getAuditTrendxAxisDate();
    myChart.setOption(o);

    var params = {
        flag: '',
        datefirststart: '',
        datefirstend: '',
        datesecondstart: '',
        datesecondend: ''
    };
    var o1data = getAuditIsattrArrangeseries(params);
    o1.xAxis.data = o1data[0];
    o1.series[0].data = o1data[1];
    o1.series[1].data = o1data[2];
    myChart1.setOption(o1);


    var o2data = getAuditIsattrIccseries(params);
    o2.xAxis.data = o2data[0];
    o2.series[0].data = o2data[1];
    o2.series[1].data = o2data[2];
    myChart2.setOption(o2);

    o3.legend.data = getExitRateLegend();
    o3.series = getExitRateSeries();
    myChart3.setOption(o3);

    o4.legend.data = getDutyDeptLegend();
    o4.series = getDutyDeptSeries();
    myChart4.setOption(o4);
});
layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage, layer = layui.layer;
    var table = layui.table;
    var form = layui.form;

    //监听性别操作
    form.on('switch(sexDemo)', function (obj) {
        layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    });

    //监听锁定操作
    form.on('checkbox(lockDemo)', function (obj) {
        layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    });
    //监听表格复选框选择
    table.on('checkbox(demo)', function (obj) {
        //console.log(obj)
    });
    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            layer.msg('ID：' + data.id + ' 的查看操作');
        } else if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            layer.alert('编辑行：<br>' + JSON.stringify(data))
        }
    });

    var $ = layui.$, active = {
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            layer.alert(JSON.stringify(data));
        }
        , getCheckLength: function () { //获取选中数目
            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            layer.msg('选中了：' + data.length + ' 个');
        }
        , isAll: function () { //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            layer.msg(checkStatus.isAll ? '全选' : '未全选')
        }
        , SearchList: function () {
            alert('test11111');
            //查询按钮触发
            vm.update(16);
        }
        , SearchListAuditTrend: function () {
            var startTime = $("#startTimeAudit").val();
            var endTime = $("#endTimeAudit").val();
            var d1 = new Date(startTime.replace(/\-/g, "\/"));
            var d2 = new Date(endTime.replace(/\-/g, "\/"));

            if (startTime != "" && endTime != "" && d1 >= d2) {
                layer.alert('开始时间不能大于结束时间');
                return false;
            }

            myChart.clear();
            o.legend.data = getAuditTrendLengent();
            o.series = getAuditTrendSeries();
            o.xAxis.data = getAuditTrendxAxisDate();
            //初始化表格数据
            myChart.setOption(o);

        }
        , SearchListExitRate: function () {
            var startTime = $("#startTimeExitRate").val();
            var endTime = $("#endTimeExitRate").val();
            var d1 = new Date(startTime.replace(/\-/g, "\/"));
            var d2 = new Date(endTime.replace(/\-/g, "\/"));

            if (startTime != "" && endTime != "" && d1 >= d2) {
                layer.alert('开始时间不能大于结束时间');
                return false;
            }

            myChart3.clear();
            o3.title.text = "(" + $('#productiondeptname').val() + ")AUDIT问题关闭率";
            o3.legend.data = getExitRateLegend();
            o3.series = getExitRateSeries();
            //初始化表格数据
            myChart3.setOption(o3);

        }
        , SearchListDutyDept: function () {
            var startTime = $("#startTimeDutyDept").val();
            var endTime = $("#endTimeDutyDept").val();
            var d1 = new Date(startTime.replace(/\-/g, "\/"));
            var d2 = new Date(endTime.replace(/\-/g, "\/"));

            if (startTime != "" && endTime != "" && d1 >= d2) {
                layer.alert('开始时间不能大于结束时间');
                return false;
            }

            myChart4.clear();
            o4.legend.data = getDutyDeptLegend();
            o4.series = getDutyDeptSeries();
            //初始化表格数据
            myChart4.setOption(o4);

        }
        , SearchIssueattr: function () {
            var datefirststart = $("#datefirststart").val();
            var datefirstend = $("#datefirstend").val();
            var datesecondstart = $("#datesecondstart").val();
            var datesecondend = $("#datesecondend").val();
            var one1 = new Date(datefirststart.replace(/\-/g, "\/"));
            var one2 = new Date(datefirstend.replace(/\-/g, "\/"));
            var two1 = new Date(datesecondstart.replace(/\-/g, "\/"));
            var two2 = new Date(datesecondend.replace(/\-/g, "\/"));
            if ((datefirststart != "" && datefirstend == "") || (datefirststart == "" && datefirstend != "") || (datesecondstart == "" && datesecondend != "") || (datesecondstart != "" && datesecondend == "")) {
                layer.alert('时间必须成对出现');
                return false;
            }
            if (datefirststart != "" && datefirstend != "" && one1 > one2) {
                layer.alert('开始时间一不能大于结束时间一');
                return false;
            }
            if (datesecondstart != "" && datesecondend != "" && two1 > two2) {
                layer.alert('开始时间二不能大于结束时间二');
                return false;
            }

            var params = {
                flag: 1,
                datefirststart: $("#datefirststart").val(),
                datefirstend: $("#datefirstend").val(),
                datesecondstart: $("#datesecondstart").val(),
                datesecondend: $("#datesecondend").val(),
                productiondeptname: $("#productiondeptnameArrange").val(),
                startTime: "",
                endTime: ""
            };

            if (datefirstend != "" && datesecondend != "" && one2 > two2) {
                params.endTime = datefirstend;
            } else {
                params.endTime = datesecondend;
            }
            if (datefirststart != "" && datesecondstart != "" && one1 < two1) {
                params.startTime = datefirststart;
            } else {
                params.startTime = datesecondstart;
            }
            if (datefirstend == '') {
                params.startTime = datesecondstart;
                params.endTime = datesecondend;
            }
            if (datesecondstart == '') {
                params.startTime = datefirststart;
                params.endTime = datefirstend;
            }

            myChart1.clear();
            var o1data = getAuditIsattrArrangeseries(params);
            o1.xAxis.data = o1data[0];
            o1.legend.data = ["第一段时间", "第二段时间"];
            o1.series[0].name = "第一段时间";
            o1.series[1].name = "第二段时间";
            o1.series[0].data = o1data[1];
            o1.series[1].data = o1data[2];

            myChart1.setOption(o1);
        }
        , SearchIcc: function () {
            var datefirststart = $("#datefirststartIcc").val();
            var datefirstend = $("#datefirstendIcc").val();
            var datesecondstart = $("#datesecondstartIcc").val();
            var datesecondend = $("#datesecondendIcc").val();
            var one1 = new Date(datefirststart.replace(/\-/g, "\/"));
            var one2 = new Date(datefirstend.replace(/\-/g, "\/"));
            var two1 = new Date(datesecondstart.replace(/\-/g, "\/"));
            var two2 = new Date(datesecondend.replace(/\-/g, "\/"));

            if ((datefirststart != "" && datefirstend == "") || (datefirststart == "" && datefirstend != "") || (datesecondstart == "" && datesecondend != "") || (datesecondstart != "" && datesecondend == "")) {
                layer.alert('时间必须成对出现');
                return false;
            }
            if (datefirststart != "" && datefirstend != "" && one1 > one2) {
                layer.alert('开始时间一不能大于结束时间一');
                return false;
            }
            if (datesecondstart != "" && datesecondend != "" && two1 > two2) {
                layer.alert('开始时间二不能大于结束时间二');
                return false;
            }

            var params = {
                flag: 1,
                datefirststart: $("#datefirststartIcc").val(),
                datefirstend: $("#datefirstendIcc").val(),
                datesecondstart: $("#datesecondstartIcc").val(),
                datesecondend: $("#datesecondendIcc").val(),
                productiondeptname: $("#productiondeptnameIcc").val(),
                startTime: '',
                endTime: ''
            };

            if (datefirstend != "" && datesecondend != "" && one2 > two2) {
                params.endTime = datefirstend;
            } else {
                params.endTime = datesecondend;
            }
            if (datefirststart != "" && datesecondstart != "" && one1 < two1) {
                params.startTime = datefirststart;
            } else {
                params.startTime = datesecondstart;
            }
            if (datefirstend == '') {
                params.startTime = datesecondstart;
                params.endTime = datesecondend;
            }
            if (datesecondstart == '') {
                params.startTime = datefirststart;
                params.endTime = datefirstend;
            }

            myChart2.clear();
            var o2data = getAuditIsattrIccseries(params);
            o2.xAxis.data = o2data[0];
            o2.legend.data = ["第一段时间", "第二段时间"];
            o2.series[0].name = "第一段时间";
            o2.series[1].name = "第二段时间";
            o2.series[0].data = o2data[1];
            o2.series[1].data = o2data[2];
            myChart2.setOption(o2);

        }
    };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $('.layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //完整功能
    laypage.render({
        elem: 'demo7'
        , count: 100
        , layout: ['count', 'prev', 'page', 'next', 'skip']
        , jump: function (obj) {
            //console.log(obj)
        }
    });
    var laydate = layui.laydate;
    //时间选择器
    laydate.render({
        elem: '#startTimeAudit'
        , type: 'month'
        , calendar: true
    });
    laydate.render({
        elem: '#endTimeAudit'
        , type: 'month'
        , calendar: true
    });
    laydate.render({
        elem: '#startTimeExitRate'
        , type: 'date'
        , calendar: true
    });
    laydate.render({
        elem: '#endTimeExitRate'
        , type: 'date'
        , calendar: true
    });
    laydate.render({
        elem: '#startTimeDutyDept'
        , type: 'date'
        , calendar: true
    });
    laydate.render({
        elem: '#endTimeDutyDept'
        , type: 'date'
        , calendar: true
    });

    laydate.render({
        elem: '#datefirststart'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#datefirstend'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#datesecondstart'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#datesecondend'
        , type: 'datetime'
    });

    laydate.render({
        elem: '#datefirststartIcc'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#datefirstendIcc'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#datesecondstartIcc'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#datesecondendIcc'
        , type: 'datetime'
    });


    window.Hello = function (listdata) {
        //查询按钮触发
        table.reload('idTest', {
            data: listdata
        });
    }
    //构造列表
    window.initList = function (listdata) {

    }
    window.onSearch = function (conditionObj, pageNum) {

    }
    //列表入口
    //initList(v_listdata);
});

//生产单位下拉列表
function addProductdeptOption() {
    $.ajax({
        url: siteurl + '/mqs/mqsproductdept/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<option value=' + data[i].productiondeptname + '>' + data[i].productiondeptname + '</option>';
            }
            $("select[name='productiondeptname']").append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
};
