var myChart1 = echarts.init(document.getElementById('main_echart1'), 'infographic');

var o1 = {
    title: {
        top: '1%',
        left: 'center',
        text: '发动机零公里PPM趋势图'
    },
    color: [
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#6D59AB',
        '#e5323e',
        '#3D9199',
        '#ca8699',
        '#BB9912',
        '#708090',
        '#6D59AB',
        '#F4A460',
        '#00FFFF',
        '#FFC0CB'
    ],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: '7%',
        data: ['单月', '累计月']

    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '5%',
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
        axisLabel: {
            interval: 0
        },
        data: []
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name: '单月',
            type: 'bar',
            data: [],
            barWidth: '30',
            barGap: '-100%',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        },
        {
            name: '累计月',
            type: 'bar',
            data: [],
            barWidth: '30',
            barGap: '-100%',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        }

    ]
};

var timearr1 = "";
var timearr2 = "";
var timearr3 = "";
var timearr4 = "";
var timearr5 = "";
var timearr6 = "";
var timearr7 = "";
var timearr8 = "";
var timearr9 = "";
var timearr10 = "";
var timearr11 = "";
var issueseverityarr = [];
var productiondeptnamearr = [];
layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage, layer = layui.layer;
    var table = layui.table;
    form = layui.form;
    laydate = layui.laydate;
    var $ = layui.jquery;
    //时间选择器
    laydate.render({
        elem: '#startTime'
        , calendar: true
    });
    laydate.render({
        elem: '#endTime'
        , calendar: true
    });
    laydate.render({
        elem: '#endTime2'
        , calendar: true
    });

    issueseverityarr = addOption();
    //得到级联下拉的条件下拉菜单
    addProductlineOption();

    //进行渲染
    form.render();

    form.on('select(condition2)', function (data) {
        params.productionlinename = data.value;
    });

    form.on('select(condition3)', function (data) {
        params.enginemodel = data.value;
    });
    //监听性别操作
    form.on('switch(sexDemo)', function (obj) {
        layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    });

    //监听锁定操作
    form.on('checkbox(checkbox0)', function (data) {
        var ch = document.getElementsByClassName("layui-unselect layui-form-checkbox");
        for (var i = 1; i < ch.length; i++) {
            ch[i].className = ch[0].className;
        }

    });

    //监听表格复选框选择
    form.on('checkbox(checkbox1)', function (obj) {
        var f = true;
        var ch = document.getElementsByClassName('layui-unselect layui-form-checkbox');
        for (var i = 1; i < ch.length; i++) {
            if (ch[i].className == "layui-unselect layui-form-checkbox") {
                f = false;
                break;
            }
        }
        if (!f) {
            ch[0].className = 'layui-unselect layui-form-checkbox';
        } else {
            ch[0].className = 'layui-unselect layui-form-checkbox layui-form-checked';
        }
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

    var params = {
        startTime: "",
        endTime: $('#endTime2').val(),
        enginemodel: $("#enginemodel").val(),
        productiondeptname: productiondeptnamearr,
        productionlinename: $("#productionlinename").val()

    };

    //构造列表
    window.initList = function () {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: vm.tablelist
            , limit: 9999999
            , width: 1663
            , cellMinwidth: 80
            , cols: [[
                {field: 'unit', width: 120, rowspan: 2}
                , {align: 'center', title: '年', colspan: 1, width: 120}
                , {align: 'center', title: '单月', colspan: 4}
                , {align: 'center', title: '累计', colspan: 5}
            ], [

                {field: 'year2', title: timearr2, width: 120}
                , {field: 'month1', title: timearr3 + '月', width: 120}
                , {field: 'month2', title: timearr4 + '月', width: 120}
                , {field: 'month3', title: timearr5 + '月', width: 120}
                , {field: 'month4', title: timearr6 + '月', width: 120}
                , {field: 'month1sum', title: timearr7 + '月', width: 120}
                , {field: 'month2sum', title: timearr8 + '月', width: 120}
                , {field: 'month3sum', title: timearr9 + '月', width: 120}
                , {field: 'month4sum', title: timearr10 + '月', width: 120}
                , {field: 'month5sum', title: timearr11 + '月', width: 120}

            ]]
        });

        table.render({
            elem: '#test1'
            , id: 'idTest1'
            , data: vm.tablelist1
            , limit: 99999999
            , width: 1663
            , cellMinwidth: 80
            , cols: [[
                {field: 'unit', width: 120, rowspan: 2, title: issueseverityarr[0] + '类'}
                , {align: 'center', title: '年', colspan: 1, width: 120}
                , {align: 'center', title: '单月', colspan: 4}
                , {align: 'center', title: '累计', colspan: 5}
            ], [

                {field: 'year2', title: timearr2, width: 120}
                , {field: 'month1', title: timearr3 + '月', width: 120}
                , {field: 'month2', title: timearr4 + '月', width: 120}
                , {field: 'month3', title: timearr5 + '月', width: 120}
                , {field: 'month4', title: timearr6 + '月', width: 120}
                , {field: 'month1sum', title: timearr7 + '月', width: 120}
                , {field: 'month2sum', title: timearr8 + '月', width: 120}
                , {field: 'month3sum', title: timearr9 + '月', width: 120}
                , {field: 'month4sum', title: timearr10 + '月', width: 120}
                , {field: 'month5sum', title: timearr11 + '月', width: 120}

            ]]
        });

        table.render({
            elem: '#test2'
            , id: 'idTest12'
            , data: vm.tablelist2
            , limit: 99999999
            , width: 1663
            , cellMinwidth: 80
            , cols: [[
                {field: 'unit', width: 120, rowspan: 2, title: issueseverityarr[1] + '类'}
                , {align: 'center', title: '年', colspan: 1, width: 120}
                , {align: 'center', title: '单月', colspan: 4}
                , {align: 'center', title: '累计', colspan: 5}
            ], [

                {field: 'year2', title: timearr2, width: 120}
                , {field: 'month1', title: timearr3 + '月', width: 120}
                , {field: 'month2', title: timearr4 + '月', width: 120}
                , {field: 'month3', title: timearr5 + '月', width: 120}
                , {field: 'month4', title: timearr6 + '月', width: 120}
                , {field: 'month1sum', title: timearr7 + '月', width: 120}
                , {field: 'month2sum', title: timearr8 + '月', width: 120}
                , {field: 'month3sum', title: timearr9 + '月', width: 120}
                , {field: 'month4sum', title: timearr10 + '月', width: 120}
                , {field: 'month5sum', title: timearr11 + '月', width: 120}

            ]]
        });

        table.render({
            elem: '#test3'
            , id: 'idTest3'
            , data: vm.tablelist3
            , limit: 99999999
            , width: 1663
            , cellMinwidth: 80
            , cols: [[
                {field: 'unit', width: 120, rowspan: 2, title: issueseverityarr[2] + '类'}
                , {align: 'center', title: '年', colspan: 1, width: 120}
                , {align: 'center', title: '单月', colspan: 4}
                , {align: 'center', title: '累计', colspan: 5}
            ], [

                {field: 'year2', title: timearr2, width: 120}
                , {field: 'month1', title: timearr3 + '月', width: 120}
                , {field: 'month2', title: timearr4 + '月', width: 120}
                , {field: 'month3', title: timearr5 + '月', width: 120}
                , {field: 'month4', title: timearr6 + '月', width: 120}
                , {field: 'month1sum', title: timearr7 + '月', width: 120}
                , {field: 'month2sum', title: timearr8 + '月', width: 120}
                , {field: 'month3sum', title: timearr9 + '月', width: 120}
                , {field: 'month4sum', title: timearr10 + '月', width: 120}
                , {field: 'month5sum', title: timearr11 + '月', width: 120}

            ]]
        });

        table.render({
            elem: '#test4'
            , id: 'idTest4'
            , data: vm.tablelist4
            , limit: 99999999
            , width: 1663
            , cellMinwidth: 80
            , cols: [[
                {field: 'unit', width: 120, rowspan: 2, title: issueseverityarr[3] + '类'}
                , {align: 'center', title: '年', colspan: 1, width: 120}
                , {align: 'center', title: '单月', colspan: 4}
                , {align: 'center', title: '累计', colspan: 5}
            ], [

                {field: 'year2', title: timearr2, width: 120}
                , {field: 'month1', title: timearr3 + '月', width: 120}
                , {field: 'month2', title: timearr4 + '月', width: 120}
                , {field: 'month3', title: timearr5 + '月', width: 120}
                , {field: 'month4', title: timearr6 + '月', width: 120}
                , {field: 'month1sum', title: timearr7 + '月', width: 120}
                , {field: 'month2sum', title: timearr8 + '月', width: 120}
                , {field: 'month3sum', title: timearr9 + '月', width: 120}
                , {field: 'month4sum', title: timearr10 + '月', width: 120}
                , {field: 'month5sum', title: timearr11 + '月', width: 120}

            ]]
        });
    };

    var $ = layui.$, active = {
        search: function () {
            var params = {
                startTime: "",
                endTime: $('#endTime2').val(),
                enginemodel: $("#enginemodel").val(),
                productiondeptname: productiondeptnamearr,
                productionlinename: $("#productionlinename").val()
            };

            productiondeptnamearr.length = 0;

            var obj = $('div[class="layui-unselect layui-form-checkbox layui-form-checked"] span');
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].innerText != "全选") {
                    productiondeptnamearr.push(obj[i].innerText);
                }

            }
            if (productiondeptnamearr.length == 0) {
                productiondeptnamearr = addProductdeptOption();
            }
            params.productiondeptname = productiondeptnamearr;

            getTime(params);
            var picarr=vm.querytable(params);
            vm.querytable1(params);
            vm.querytable2(params);
            vm.querytable3(params);
            vm.querytable4(params);
            delRow();

            for(i in picarr){
                if(picarr[i]==0){
                    picarr[i]="";
                }
            }
            myChart1.clear();
            o1.xAxis.data = getZerokmxAxisDate();
            o1.series[0].data = [picarr.month2,picarr.month3,picarr.month4,picarr.month3sum,picarr.month4sum,picarr.month5sum];
            myChart1.setOption(o1);

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

    laypage.render({
        elem: 'demo7'
        , count: 100
        , layout: ['count', 'prev', 'page', 'next', 'skip']
        , jump: function (obj) {
            //console.log(obj)
        }
    });
    window.Hello = function (listdata) {
        //查询按钮触发
        table.reload('idTest', {
            data: listdata
        });
    };

    getTime(params);
    var picarr=vm.querytable(params);
    vm.querytable1(params);
    vm.querytable2(params);
    vm.querytable3(params);
    vm.querytable4(params);
    delRow();

    for(i in picarr){
        if(picarr[i]==0){
            picarr[i]="";
        }
    }
    o1.xAxis.data = getZerokmxAxisDate();
    o1.series[0].data = [picarr.month2,picarr.month3,picarr.month4,picarr.month3sum,picarr.month4sum,picarr.month5sum];
    myChart1.setOption(o1);

});

$(function () {

    productiondeptnamearr = addProductdeptOption();
});

var vm = new Vue({
    el: '#mian',
    data: {
        logSearch: {
            startTime: "",
            endTime: $('#endTime2').val(),
            enginemodel: $("#enginemodel").val(),
            productiondeptname: productiondeptnamearr,
            productionlinename: $("#productionlinename").val()
        }

    },
    methods: {
        querytable: function (params) {
            var arr=[];
            $.ajax({
                type: 'POST',
                url: siteurl + '/mqs/report/tablelist',
                data: JSON.stringify(params),
                async: false,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    for (k in data) {
                        for (m in data[k]) {
                            if (data[k][m] == null) {
                                data[k][m] = 0;
                            }
                        }
                    }
                    vm.tablelist = data;
                    initList();
                    arrSeries=data[0];
                }
            })
            return arrSeries;
        },
        querytable1: function (params) {
            $.ajax({
                type: 'POST',
                url: siteurl + '/mqs/report/tablelist1',
                data: JSON.stringify(params),
                async: false,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    vm.tablelist1 = data;
                    initList();

                }
            })

        },
        querytable2: function (params) {
            $.ajax({
                type: 'POST',
                url: siteurl + '/mqs/report/tablelist2',
                data: JSON.stringify(params),
                async: false,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    vm.tablelist2 = data;
                    initList();

                }
            })

        },
        querytable3: function (params) {
            $.ajax({
                type: 'POST',
                url: siteurl + '/mqs/report/tablelist3',
                data: JSON.stringify(params),
                async: false,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    vm.tablelist3 = data;
                    initList();

                }
            })

        },
        querytable4: function (params) {
            $.ajax({
                type: 'POST',
                url: siteurl + '/mqs/report/tablelist4',
                data: JSON.stringify(params),
                async: false,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    vm.tablelist4 = data;
                    initList();

                }
            })

        },
        queryTitleTime: function (params) {
            var timearr = [];
            $.ajax({
                type: "POST",
                url: siteurl + '/mqs/report/querytitletime/',
                data: JSON.stringify(params),//用户数据
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        timearr.push(data[i]);
                    }

                },
                error: function (data) {
                    alert('查找板块报错');
                }

            });
            return timearr;
        },
        export: function () {
            var form = $("<form></form>").attr("action", siteurl + '/mqs/report/export').attr("method", "POST");
            var data = {
                productionlinename: $('#productionlinename').val(),
                enginemodel: $('#enginemodel').val(),
                endTime: $('#endTime2').val(),
                productiondeptname: productiondeptnamearr,
                imageData: myChart1.getDataURL({
                    backgroundColor: '#fff'
                })
            };

            for (var key in data) {
                form.append($("<input/>").attr("type", "hidden").attr("name", key).attr("value", eval("data." + key)));
            }
            form.appendTo('body').submit().remove();
        }
    }
});

function delRow() {
    var table = $("[data-field=\"1\"]");
    for (var i = 0; i < table.size(); i++) {
        if (table[i].innerText == "") {
            if (isIE() || isIE11()) {
                table[i].removeNode(true);
            } else {
                table[i].remove();
            }
        }
    }
}

//根据浏览器的不同添加不同的移除方法
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}

function isIE11() {
    if ((/Trident\/7\./).test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

function getTime(params) {
    var arr = vm.queryTitleTime(params);
    timearr1 = arr[0];
    timearr2 = arr[1];
    timearr3 = arr[2];
    timearr4 = arr[3];
    timearr5 = arr[4];
    timearr6 = arr[5];
    timearr7 = arr[6];
    timearr8 = arr[7];
    timearr9 = arr[8];
    timearr10 = arr[9];
    timearr11 = arr[10];
}

function getZerokmxAxisDate() {
    var params = {
        startTime: "",
        endTime: $('#endTime2').val()
    };
    var arr = [];
    var beginMonth = null,
        endMonth = null;

    $.ajax({
        type: "post",
        async: false,
        url: siteurl + "/mqs/report/getTime/",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (date) {
            beginMonth = new Date(date[0]).getMonth() + 1;
            endMonth = new Date(date[1]).getMonth() + 1;

            for (var i = beginMonth; i < beginMonth + date[2]; i++) {
                arr.push((i % 12 == 0 ? 12 : i % 12) + "月");
            }
            for (var i = beginMonth; i < beginMonth + date[2]; i++) {
                arr.push((i % 12 == 0 ? 12 : i % 12) + "月累计");
            }
        },
        error: {}
    });
    return arr;
}

var params = {
    enginemodel: "",
    productionlinename: "",
    startTime: "",
    endTime: $('#endTime2').val()
};

function addProductdeptOption() {
    var arr = [];
    $.ajax({
        url: siteurl + '/mqs/mqsproductdept/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            html = '';
            for (var i = 0; i < data.length; i++) {
                arr.push(data[i].productiondeptname);
                html += '<input type="checkbox" lay-skin="primary"  name="productiondeptname" class="productiondeptname" lay-filter="checkbox1"   title=' + data[i].productiondeptname + ' value=' + data[i].productiondeptname + '>';
            }
            //div class="layui-input-block"
            $(".layui-input-block").append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
    return arr;
};

function addProductlineOption() {
    $.ajax({
        url: siteurl + '/mqs/mqsproductline/addOption/',
        //  contentType: 'application/json;charset=UTF-8',
        type: 'POST',
        success: function (data) {
            html = '';
            html += '<option value="">搜索或选择</option>'
            for (var i = 0; i < data.length; i++) {
                html += '<option value=' + data[i].productionlinename + '>' + data[i].productionlinename + '</option>';
            }
            $("select[name='productionlinename']").empty().append(html);

            form.render();
        },
        error: function (data) {

            alert('查找板块报错');
        }
    });
};

//下拉列表
function addOption() {
    var arr = [];
    $.ajax({
        url: siteurl + '/mqs/mqsauditissue/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.issueseverity.length; i++) {
                arr.push(data.issueseverity[i].dictname);
            }

            //系列
            html = '';
            for (var i = 0; i < data.enginemodel.length; i++) {

                html += '<option value=' + data.enginemodel[i].dictvalue + '>' + data.enginemodel[i].dictvalue + '</option>';
            }
            $("select[name='enginemodel']").append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
    return arr;
};

