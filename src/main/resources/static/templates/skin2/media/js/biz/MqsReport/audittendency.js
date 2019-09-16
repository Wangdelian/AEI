var myChart1 = echarts.init(document.getElementById('main_echart1'), 'infographic');

var o1 = {
    title: {
        top: '1%',
        left: 'center',
        text: '发动机AUDIT趋势图'
    },
    color: [
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#FF4500',
        '#8A2BE2',
        '#FF4500',
        '#ca8622'
    ],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: '7%',
        data:['年','月','周','20DAY','DAY','KPI']
    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        right:'1%',
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        data: ['2017','4月','5月','6月','5/5','5/12','5/19','5/26','6/2','6/9','20DAY','6/1','6/2','6/3','6/4','6/5','6/6','6/7','6/8','6/9','6/10','6/11','6/12','6/13','6/14','6/15','6/16','6/17','6/18','6/19','6/20']
    },
    yAxis: {
        interval: 100,
        type: 'value'
    },
    series: [
        {
            name:'年',
            type:'bar',
            data:[12],
            barWidth:'30',
            barGap:'-100%',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        },
        {
            name:'月',
            type:'bar',
            barWidth:'30',
            data:[null, 82, 91, 34,],
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        },
        {
            name:'周',
            type:'bar',
            barWidth:'30',
            data:[null, null, null, null, 90, 33, 41,50, 32, 20],
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        },
        {
            name:'20DAY',
            type:'bar',
            barWidth:'30',
            data:[, , , , , , ,, , , 34],
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        },
        {
            name:'DAY',
            type:'line',
            data:[, , , , , , ,, , , , 32, 72, 7, 45, 87, 87, 89,93, 78, 67, 79, 23, 90, 94, 45, 10, 77, 91, 54, 21],
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        },
        {
            name:'KPI',
            type:'line',
            data:[85, 85, 85,85 , 85, 85, 85,85, 85,85 ,85 , 85, 85, 85, 85, 85, 85, 85,85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85],
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            smooth:false,   //关键点，为true是不支持虚线的，实线就用true
            itemStyle:{
                normal:{
                    lineStyle:{
                        type:'dotted'  //'dotted'虚线 'solid'实线
                    }
                }
            },
        }
    ]
};

var issueseverityarr = [];
var productiondeptnamearr = [];
var enginetypearr = [];
var params = {
};
layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage, layer = layui.layer;
    var table = layui.table;
    form = layui.form;
    laydate = layui.laydate;
    var $ = layui.jquery;
    //时间选择器
    laydate.render({
        elem: '#endTime2'
        , calendar: true
    });

    issueseverityarr = addOption();
    //得到级联下拉的条件下拉菜单
    addProductlineOption();


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
        var k;
        for (var i = 0; i < ch.length; i++) {
            if(ch[i].parentElement.id=="productiondeptnamediv"){
                if(ch[i].children[0].innerHTML=="全选"){
                    k=i;
                }
                ch[i].className = ch[k].className;
            }
        }
        params.productiondeptname = addProductdeptOption();
    });

    form.on('checkbox(checkbox2)', function (data) {
        var ch = document.getElementsByClassName("layui-unselect layui-form-checkbox");
        var k;
        for (var i = 0; i < ch.length; i++) {
            if(ch[i].parentElement.id=="enginetypediv"){
                if(ch[i].children[0].innerHTML=="全选"){
                    k=i;
                }
                ch[i].className = ch[k].className;
            }
        }
        params.enginetype = addEnginetypeOption();
    });

    //监听表格复选框选择
    form.on('checkbox(checkbox1)', function (obj) {
        var f = true;
        var k;
        var ch = document.getElementsByClassName('layui-unselect layui-form-checkbox');
        //console.log(ch);
        for (var i = 0; i < ch.length; i++) {
            if(ch[i].parentElement.id=="productiondeptnamediv"){
                if(ch[i].children[0].innerHTML=="全选"){
                    k=i;
                }else{
                    if (ch[i].className == "layui-unselect layui-form-checkbox") {
                        f = false;
                        break;
                    }
                }
            }
        }
        if (!f) {
            ch[k].className = 'layui-unselect layui-form-checkbox';
        } else {
            ch[k].className = 'layui-unselect layui-form-checkbox layui-form-checked';
        }
    });

    form.on('checkbox(checkbox3)', function (obj) {
        var f = true;
        var k;
        var ch = document.getElementsByClassName('layui-unselect layui-form-checkbox');
        //console.log(ch);
        for (var i = 0; i < ch.length; i++) {
            if(ch[i].parentElement.id=="enginetypediv"){
                if(ch[i].children[0].innerHTML=="全选"){
                    k=i;
                }else{
                    if (ch[i].className == "layui-unselect layui-form-checkbox") {
                        f = false;
                        break;
                    }
                }
            }
        }
        if (!f) {
            ch[k].className = 'layui-unselect layui-form-checkbox';
        } else {
            ch[k].className = 'layui-unselect layui-form-checkbox layui-form-checked';
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

    var index;
    form.on('submit(search)', function (data) {
        params.endTime = $('#endTime2').val();
        params.enginemodel = $("#enginemodel").val();
        params.productiondeptname = addProductdeptOption();
        params.enginetype = addEnginetypeOption();
        params.productionlinename = $("#productionlinename").val();
        query(params);
        return false;
    });

    form.on('submit(generate)', function () {
        index = parent.layer.load(0, {shade: 0.2});

        $.ajax({
            url: siteurl + '/mqs/ftt/generateFtt',
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (r) {
                if (r.code === 0) {
                    parent.layer.close(index);
                    parent.layer.alert(r.re);
                }
            }
        });
        return false;
    });

    form.on('submit(export)', function (data) {

        exportaudit();

    });


    //进行渲染
    form.render();

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

    function query(params) {
        productiondeptnamearr.length = 0;
        enginetypearr.length = 0;
        var obj = $('input[id="productiondeptname"]');
        for (var i = 0; i < obj.length; i++) {
            if(obj[i].checked==true&&obj[i].title != "全选"){
                productiondeptnamearr.push(obj[i].value);
            }
        }
        if (productiondeptnamearr.length == 0||productiondeptnamearr==null) {
            productiondeptnamearr = addProductdeptOption();
        }

        var obj1 = $('input[id="enginetype"]');
        for (var i = 0; i < obj1.length; i++) {
            if(obj1[i].checked==true&&obj1[i].title != "全选"){
                enginetypearr.push(obj1[i].value);
            }
        }
        if (enginetypearr.length == 0||enginetypearr==null) {
            enginetypearr = addEnginetypeOption();
        }
        params.productiondeptname = productiondeptnamearr;
        params.enginetype = enginetypearr;
        var dayList;
        setTimeout(function () {
            parent.layer.msg('查询audit中', {offset: 'b'});

            $.ajax({
                url: siteurl + '/mqs/audit/auditValue',
                type: "POST",
                async: false,
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    dayList = r.dayList;
                    myChart1.setOption({
                        title: {
                            top: '1%',
                            left: 'center',
                            text: '发动机AUDIT趋势图'
                        },
                        color: [
                            '#3D59AB',
                            '#FF9912',
                            '#3D9140',
                            '#e22eca',
                            '#8A2BE2',
                            '#FF4500',
                            '#ca8622'
                        ],
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            top: '7%',
                            data: ['年', '月', '周', '20DAY', 'DAY']
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
                            data: r.dayList
                        },
                        yAxis: {
                            interval: 100,
                            type: 'value'
                        },
                        series: [
                            {
                                name: '年',
                                type: 'bar',
                                data: r.auditYear,
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
                                name: '月',
                                type: 'bar',
                                barWidth: '30',
                                data: r.auditMonth,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                }
                            },
                            {
                                name: '周',
                                type: 'bar',
                                barWidth: '30',
                                data: r.auditWeek,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                }
                            },
                            {
                                name: '20DAY',
                                type: 'bar',
                                barWidth: '30',
                                data: r.auditDays,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                }
                            },
                            {
                                name: 'DAY',
                                type: 'line',
                                data: r.auditDay,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                }
                            }
                        ]
                    });
                    initAuditTable('#audit-table', 'audit-table-id', '', r.dayList, r.auditTable1);
                }
            });
        }, 100);

        setTimeout(function () {
            parent.layer.msg('查询S类信息中', {offset: 'b'});
            $.ajax({
                url: siteurl + '/mqs/audit/SValue',
                type: "POST",
                async: true,
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    console.log(r.auditTableS);
                    initAuditTable('#S', 'S-table-id', 'S类', r.dayList, r.auditTableS);
                }
            });
        }, 100);

        setTimeout(function () {
            parent.layer.msg('查询A类信息中', {offset: 'b'});

            $.ajax({
                url: siteurl + '/mqs/audit/AValue',
                type: "POST",
                async: true,
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    console.log(r.auditTableA);
                    initAuditTable('#A', 'A-table-id', 'A类', r.dayList, r.auditTableA);
                }
            });
        }, 100);

        setTimeout(function () {
            parent.layer.msg('查询B类信息中', {offset: 'b'});
            $.ajax({
                url: siteurl + '/mqs/audit/BValue',
                type: "POST",
                async: true,
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    console.log(r.auditTableB);
                    initAuditTable('#B', 'B-table-id', 'B类', r.dayList, r.auditTableB);
                }
            });
        }, 100)

        setTimeout(function () {
            parent.layer.msg('查询C类信息中', {offset: 'b'});
            $.ajax({
                url: siteurl + '/mqs/audit/CValue',
                type: "POST",
                async: true,
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    console.log(r.auditTableC);
                    initAuditTable('#C', 'C-table-id', 'C类', r.dayList, r.auditTableC);
                }
            });
        }, 100);

        setTimeout(function () {
            parent.layer.msg('查询近一周信息中', {offset: 'b'});
            $.ajax({
                url: siteurl + '/mqs/audit/recentWeekValue',
                type: "POST",
                async: true,
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    console.log(r.auditTableOneWeek);
                    initAuditTable('#near-week', 'C-table-id', 'TOP10 ICCs-最近一周', r.dayList, r.auditTableOneWeek);
                }
            });
        }, 100);

        setTimeout(function () {
            parent.layer.msg('查询近一月信息中', {offset: 'b'});
            $.ajax({
                url: siteurl + '/mqs/audit/recentMonthValue',
                type: "POST",
                async: true,
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    console.log(r.auditTableOneMonth);
                    initAuditTable('#near-month', 'C-table-id', 'TOP10 ICCs-最近一月', r.dayList, r.auditTableOneMonth);
                }
            });
        }, 100);

        setTimeout(function () {
            parent.layer.msg('查询近一年信息中', {offset: 'b'});
            $.ajax({
                url: siteurl + '/mqs/audit/recentYearValue',
                type: "POST",
                async: true,
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    console.log(r.auditTableOneYear);
                    initAuditTable('#near-year', 'C-table-id', 'TOP10 ICCs-最近一年', r.dayList, r.auditTableOneYear);
                }
            });
        }, 100);
    }


    //因为每个表的数据都是一个样的，所以后台以AuditTableEntity的形式返回
//参数对应规则：elemId对应table标签里的id，tableId对应将生成的layui-table的ID，tableDec代表该表的说明,title表示了时间表头，data就不说了
    function initAuditTable(elemId, tableId, tableDec, title, data) {
        table.render({
            elem: elemId
            , id: 'audit-table-id'
            , data: data
            , width: 1505
            , cols: [[
                {field: 'title', title: tableDec, width: 140, rowspan: 2, colspan: 1}
                , {title: 'Year', colspan: 1}
                , {title: 'Month', colspan: 3}
                , {title: 'Week', colspan: 6}
                , {title: 'Day', colspan: 21}
            ], [
                {field: 'year1', width: 100, title: title[0]}
                , {field: 'month1', width: 100, title: title[1]}
                , {field: 'month2', width: 100, title: title[2]}
                , {field: 'month3', width: 100, title: title[3]}
                , {field: 'week1', width: 100, title: title[4]}
                , {field: 'week2', width: 100, title: title[5]}
                , {field: 'week3', width: 100, title: title[6]}
                , {field: 'week4', width: 100, title: title[7]}
                , {field: 'week5', width: 100, title: title[8]}
                , {field: 'week6', width: 100, title: title[9]}
                , {field: 'days', width: 100, title: title[10]}
                , {field: 'day1', width: 100, title: title[11]}
                , {field: 'day2', width: 100, title: title[12]}
                , {field: 'day3', width: 100, title: title[13]}
                , {field: 'day4', width: 100, title: title[14]}
                , {field: 'day5', width: 100, title: title[15]}
                , {field: 'day6', width: 100, title: title[16]}
                , {field: 'day7', width: 100, title: title[17]}
                , {field: 'day8', width: 100, title: title[18]}
                , {field: 'day9', width: 100, title: title[19]}
                , {field: 'day10', width: 100, title: title[20]}
                , {field: 'day11', width: 100, title: title[21]}
                , {field: 'day12', width: 100, title: title[22]}
                , {field: 'day13', width: 100, title: title[23]}
                , {field: 'day14', width: 100, title: title[24]}
                , {field: 'day15', width: 100, title: title[25]}
                , {field: 'day16', width: 100, title: title[26]}
                , {field: 'day17', width: 100, title: title[27]}
                , {field: 'day18', width: 100, title: title[28]}
                , {field: 'day19', width: 100, title: title[29]}
                , {field: 'day20', width: 100, title: title[30]}
            ]]
        });
    };

    function exportaudit(){
        var form = $("<form></form>").attr("action", siteurl + '/mqs/audit/export').attr("method", "POST");
        var data = {
            productionlinename: params.productionlinename,
            enginemodel: params.enginemodel,
            endTime: params.endTime,
            enginetype : params.enginetype ,
            productiondeptname: params.productiondeptname,
            imageData: myChart1.getDataURL({
                backgroundColor: '#fff'
            })
        };

        for (var key in data) {
            form.append($("<input/>").attr("type", "hidden").attr("name", key).attr("value", eval("data." + key)));
        }
        form.appendTo('body').submit().remove();
    }


    query(params);

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
                html += '<input type="checkbox" lay-skin="primary" name="productiondeptname" id="productiondeptname" lay-filter="checkbox1"   title=' + data[i].productiondeptname + ' value=' + data[i].productiondeptname + '>';
            }
            //div class="layui-input-block"
            $("#productiondeptnamediv").append(html);
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

//下拉列表系列
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

//复选框机型
function addEnginetypeOption() {
    var arr = [];
    $.ajax({
        url: siteurl + '/mqs/mqsauditissue/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            //机型
            html = '';
            for (var i = 0; i < data.enginetype.length; i++) {
                arr.push(data.enginetype[i].dictvalue);
                html += '<input type="checkbox" lay-skin="primary"  name="enginetype" id="enginetype" lay-filter="checkbox3"   title=' + data.enginetype[i].dictvalue + ' value=' + data.enginetype[i].dictvalue + '>';
            }
            $("#enginetypediv").append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
    return arr;
};

