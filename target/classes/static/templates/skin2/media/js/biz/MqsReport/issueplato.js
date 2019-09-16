/*******************************************************
 *修改标记
 *修改时间：2018/3/28
 *修改人：  hezhenmei
 *版本号：  V1.0.0.0
 *描述：
 *
 *******************************************************
 *修改标记
 *修改时间：2018/6/13
 *修改人：  dyc
 *版本号：  V1.0.0.0
 *描述：输入TOPN不能超过20
 *
 ******************************************************/
var iccList = [];
var numList = [];
var percentList = [];
var list = [];
var total = null;
var myChart = echarts.init(document.getElementById('main_echart'), 'infographic');
var t_listdata = [[]];
var v_listdata = [];

var col1 = {
    "icc": "数量"
};
var col2 = {
    "icc": "占比"
};
var col3 = [
    {field: 'icc', width: 80, title: 'ICC', templet: '#usernameTpl', event: 'setSign'}
];

var v_data = {
    "keywords": null,
    "startTime": new Date().format("yyyy-MM") + "-01 08:00:00",
    "endTime": new Date().format("yyyy-MM-dd") + " 08:00:00"
};

var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data: ['数量', '占比']
    },
    xAxis: [
        {
            type: 'category',
            data: iccList,
            axisPointer: {
                type: 'shadow',
            },
            axisLabel: {
                interval: 0,
                rotate: 10
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '数量',
            interval: 1000000000000,
            axisLabel: {
                formatter: '{value} '
            }
        },
        {
            type: 'value',
            name: '占比',
            interval: 10000,
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [
        {
            name: '数量',
            type: 'bar',
            data: numList,
            barWidth: 35,
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        },
        {
            name: '占比',
            type: 'line',
            yAxisIndex: 1,
            data: percentList,
            label: {
                normal: {
                    show: true,
                    position: 'bottom'
                }
            }
        }
    ]
};

$(function () {
    //获取数据
    query(v_data);
    //初始化图形数据
    myChart.setOption(option);

});

//查询icc数据
function query(data) {
    $.ajax({
        type: "post",
        url: siteurl + '/mqs/report/queryIccSort',
        async: false,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            list = r.iccList;
            total = r.total;
        }
    });
    if (list.length != 0) {
        for (var i = 0; i < list.length; i++) {
            iccList[i] = list[i].icc;
            numList[i] = list[i].num;
            percentList[i] = (list[i].num / total * 100).toFixed(2);
        }
    } else {
        iccList = [];
        numList = [];
        percentList = [];
    }
}

layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage, layer = layui.layer;
    var table = layui.table;
    var form = layui.form;
    var laydate = layui.laydate;
    var start = new Date().format("yyyy-MM") + "-01 08:00:00";
    var end = new Date().format("yyyy-MM-dd") + " 08:00:00";

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
    };

    window.Hello = function (listdata) {
        //查询按钮触发
        table.reload('idTest', {
            data: listdata
        });
    };

    //时间选择器
    var startTime = laydate.render({
        elem: '#startTime'
        , type: 'datetime'
        , value: new Date().format("yyyy-MM") + "-01 08:00:00"
        , done: function (value, date) {
            date.month--;
            endTime.config.min = date;
            start = value;
        }
    });
    //时间选择器
    var endTime = laydate.render({
        elem: '#endTime'
        , type: 'datetime'
        , value: new Date().format("yyyy-MM-dd") + " 08:00:00"
        , done: function (value, date) {
            date.month--;
            startTime.config.max = date;
            end = value;
        }
    });


    //监听提交
    form.on('submit(query)', function (data) {
        data.field['startTime'] = start;
        data.field['endTime'] = end;

        //刷新数据
        iccList = [];
        numList = [];
        percentList = [];
        list = [];
        total = null;
        t_listdata = [[]];
        v_listdata = [];
        col1 = {
            "icc": "数量"
        };
        col2 = {
            "icc": "占比"
        };
        col3 = [
            {field: 'icc', width: 80, title: 'ICC', templet: '#usernameTpl', event: 'setSign'}
        ];
        v_data = null;

        if (data.field.keywords > 20) {
            layer.alert('不能超过20，请重新输入');
            return false;
        }

        if (data.field.keywords == '') {
            data.field.keywords = null;
        }
        //获取数据
        query(data.field);

        //显示图形数据
        option.series[0].data = numList;
        option.series[1].data = percentList;
        option.xAxis[0].data = iccList;
        myChart.setOption(option);

        if (list.length != 0) {
            //列表入口
            initList(v_listdata);
        } else {
            $("table").hide()
        }
        jumpIssue();
        return false;
    });


    //构造列表
    window.initList = function (listdata) {
        for (var i = 0; i < list.length; i++) {
            col1['f' + i] = numList[i];
            col2['f' + i] = percentList[i];
            col3.push({field: 'f' + i, title: iccList[i], width: 150, event: 'f' + i});
        }
        v_listdata.push(col1);
        v_listdata.push(col2);
        t_listdata.push(col3);

        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cellMinWidth: 80
            , width: 1500
            , cols: t_listdata
            , page: false
        });

        //根据大小调整宽度
        var divarr = document.getElementsByClassName("layui-table-cell");
        for (var i = divarr.length / 3 + 1; i < divarr.length / 3 * 2; i++) {
            var col = divarr[i].innerHTML;
            divarr[i].style.width = col.length * 10 + 'px';

        }
    };

    //列表入口
    initList(v_listdata);
    jumpIssue();

    //跳转到issue单一界面
    function jumpIssue() {
        var obj = null;
        table.on('tool(issueplato)', function (obj_) {
            obj = obj_;
        });

        $('.layui-table-cell').dblclick(function (e) {
            if (obj.event != 'setSign') {
                var lefttitle = obj.data.icc;
                if (lefttitle === '占比' || lefttitle === 'ICC')
                    return;

                var title = $('th[data-field=' + obj.event + '] span').text();

                parent.app.addTab({
                    url: encodeURI(siteurl + '/mqs/mqsissue/list/?title=' + title + '&fragment=' + obj.event + '&datestart=' + start + '&dateend=' + end),
                    icon: '&#xe62d;',
                    title: '单一问题查询',
                    id: '49'
                });
            }
        });
    }

});


