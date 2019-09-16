//当面页面数据量
var pageNumSize;
//当天数据接口
var listUrl = '/train/trainout/list/';
var nextIndex = -1;
//每页显示数据条数，当天数据不分页，所以设置大一点
var pageLimit = 10000;
var date = new Date();
var defaultStartTime = date.format("yyyy-MM-dd") + ' 00:00:00';
var defaultEndTime = date.format("yyyy-MM-dd") + ' 23:59:59';
var vm = new Vue({
    el: 'main',
    data: {
        search: {
            fBureauname: '',
            fSectionname: '',
            fpasssite: '',
            startTime: defaultStartTime,
            endTime: defaultEndTime
        }
    },
    methods: {
        query: function (pageNum, isRefreshDB) {
            vm.currentPage = pageNum;
            $.ajax({
                type: 'post',
                url: siteurl + listUrl + pageNum,
                data: JSON.stringify(vm.search),
                dataType: 'json',
                async: false,
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        nextIndex = r.nextIndex;
                        initList(r.page.list);
                        if (isRefreshDB == 1) {
                            setPage(r.page.totalCount, pageNum);
                        }
                        pageNumSize = r.page.list.length;
                    } else {
                        alert(r.msg);
                    }

                }
            })
        },
        export: function () {
            downFile2(siteurl + '/train/trainout/exporttable/', {
                fBureauname: $('#fBureauname').val(),
                fSectionname: $('#fSectionname').val(),
                fpasssite: $('#fpasssite').val(),
                startTime: $('#startTime').val(),
                endTime: $('#endTime').val()
            })

        }
    }
});
var timeFlush;
layui.use(['form', 'layedit', 'laydate', 'table', 'laypage'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , table = layui.table
        , laypage = layui.laypage
        , laydate = layui.laydate;
    var $ = layui.$;

    //时间选择器
    var start = laydate.render({
        elem: '#startTime'
        , type: 'datetime'
        , value: defaultStartTime
        , done: function (value, date) {
            date.month--;
            end.config.min = date;
        }
    });
    //时间选择器
    var end = laydate.render({
        elem: '#endTime'
        , type: 'datetime'
        , value: defaultEndTime
        , done: function (value, date) {
            date.month--;
            start.config.max = date;
        }
    });

    //监听提交
    form.on('select(fBureauname)', function (data) {
    });

    /*
    abnameTotal为用户组织机构，从所属部门到最高部门，用‘/’分隔
     */
    var abnameArr = abnameTotal.split('/');
    var levelmarkidArr = levelmarkidTotal.split('/')
    if (levelmarkid.length < 3) {
        queryJu();
        form.render();
        form.on('select(fBureauname)', function (data) {
            if(data.value!=""){
                queryDuan($("#fBureauname").val());
                form.render();
            }else{
                $('#fSectionname option').not(":first").remove();
                $('#fpasssite option').not(":first").remove();
                form.render();
            }
            return false;
        });
        form.on('select(fSectionname)', function (data) {
            if(data.value!=""){
                queryChang($("#fSectionname").val());
                form.render();
            }else{
                $('#fpasssite option').not(":first").remove();
                form.render();
            }
            return false;
        });
    } else if (levelmarkid.length < 8 && levelmarkid.length >= 3) {
        if (abnameArr.length > 1) {
            var html = "<option value='" + levelmarkidArr[1] + "' selected>" + abnameArr[1] + "</option>"
            $("select[name='fBureauname']").append(html);
            $("select[name='fBureauname']").attr("disabled", "disabled");
            vm.search.fBureauname = levelmarkidArr[1];
            $("#selec1").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        queryDuan($("#fBureauname").val());
        var ob = $("select[name='fSectionname']")
        form.render();
        form.on('select(fSectionname)', function (data) {
            if(data.value!=""){
                queryChang($("#fSectionname").val());
                form.render();
            }else{
                $('#fpasssite option').not(":first").remove();
                form.render();
            }
            return false;
        });
    } else if (levelmarkid.length < 13 && levelmarkid.length >= 8) {
        if (abnameArr.length > 1) {
            var html = "<option value='" + levelmarkidArr[1] + "' selected>" + abnameArr[1] + "</option>"
            $("select[name='fBureauname']").append(html);
            $("select[name='fBureauname']").attr("disabled", "disabled");
            vm.search.fBureauname = levelmarkidArr[1];
            $("#selec1").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        if (abnameArr.length > 2) {
            var html = "<option value='" + levelmarkidArr[2] + "' selected>" + abnameArr[2] + "</option>"
            $("select[name='fSectionname']").append(html);
            $("select[name='fSectionname']").attr("disabled", "disabled");
            vm.search.fSectionname = levelmarkidArr[2];
            $("#selec2").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        queryChang($("#fSectionname").val());
        form.render();
    } else {
        if (abnameArr.length > 1) {
            var html = "<option value='" + levelmarkidArr[1] + "' selected>" + abnameArr[1] + "</option>"
            $("select[name='fBureauname']").append(html);
            $("select[name='fBureauname']").attr("disabled", "disabled");
            vm.search.fBureauname = levelmarkidArr[1];
            $("#selec1").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        if (abnameArr.length > 2) {
            var html = "<option value='" + levelmarkidArr[2] + "' selected>" + abnameArr[2] + "</option>"
            $("select[name='fSectionname']").append(html);
            $("select[name='fSectionname']").attr("disabled", "disabled");
            vm.search.fSectionname = levelmarkidArr[2];
            $("#selec2").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        if (abnameArr.length > 3) {
            var html = "<option value='" + levelmarkidArr[3] + "' selected>" + abnameArr[3] + "</option>"
            $("select[name='fpasssite']").append(html);
            $("select[name='fpasssite']").attr("disabled", "disabled");
            vm.search.fpasssite = levelmarkidArr[3];
            $("#selec3").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        form.render();
    }

    //监听提交-查询
    form.on('submit(demo1)', function (data) {
        vm.search = data.field;
        vm.query(1, 1);
        //如果查询条件为空就刷新，不为空就停止刷新
        /*if (data.field.fBureauname == "" && data.field.fSectionname == "" && data.field.fpasssite == "" &&  data.field.startTime == "" && data.field.endTime == "") {
            timeFlush = setInterval("vm.query(1,1)", 60000);
        } else {
            clearInterval(timeFlush);
        }*/
        return false;
    });

    //监听提交-导出
    form.on('submit(export)', function (data) {
        vm.export();
        return false;
    });

    //查询历史按钮
    form.on('checkbox(hideDemo)', function(data){
        if(data.elem.checked){
            clearInterval(timeFlush);
            $('#pagination').attr("hidden",false);
            pageLimit = 10;
            listUrl = '/train/trainout/history/';
            $("input[name='startTime']").attr("disabled", false);
            $("input[name='endTime']").attr("disabled", false);
            $("button[lay-filter='export']").attr("disabled", false);
            $("button[lay-filter='export']").removeClass("layui-btn-disabled");
        }else{
            timeFlush = setInterval("vm.query(1,1)", 60000);
            $('#pagination').attr("hidden","hidden");
            pageLimit = 10000;
            $('#startTime').val(defaultStartTime);
            $('#endTime').val(defaultEndTime);
            vm.search.startTime = defaultStartTime;
            vm.search.endTime = defaultEndTime;
            listUrl = '/train/trainout/list/';
            $("input[name='startTime']").attr("disabled", "disabled");
            $("input[name='endTime']").attr("disabled", "disabled");
            $("button[lay-filter='export']").attr("disabled", "disabled");
            $("button[lay-filter='export']").addClass("layui-btn-disabled");
        }
        vm.query(1, 1);
    });

    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cellMinWidth: 80
            , limit:pageLimit
            , cols: [[
                {title: '序号',templet: function (d) { return d.LAY_INDEX+(vm.currentPage-1)*20;}, width: 40}
                , {field: '', title: '交路', width: '6%', minWidth: 100, align: 'center'}
                , {field: 'ftrainorder', title: '车次', width: '7%', minWidth: 100, align: 'center'}
                , {field: 'trainName', title: '机车', width: '11%', minWidth: 100, align: 'center'}
                , {field: 'fdepartsite', title: '发站', width: '6%', minWidth: 100, align: 'center'}
                , {field: 'farrivesite', title: '到站', width: '6%', minWidth: 100, align: 'center'}
                , {field: 'fpredicttimeout', title: '出库时间', width: '13%', minWidth: 55, align: 'center'}
                , {field: 'fpasssite', title: '出库地点', width: '11%', minWidth: 75, align: 'center'}
                , {field: 'fstatus1', title: '状态', width: '8%', minWidth: 55, align: 'center'}
                , {field: 'fpracticaltrainorder', title: '实际车次', width: '8%', minWidth: 100, align: 'center'}
                , {field: 'trainNameReal', title: '实际机车', width: '11%', minWidth: 100, align: 'center'}
                , {field: 'fpracticaltimeout', title: '实际出库时间', width: '13%', minWidth: 55, align: 'center'}
                , {field: 'fpracticalpasssite', title: '实际出库地点', width: '11%', minWidth: 100, align: 'center'}
                , {field: 'fremark', title: '备注信息', width: '11%', minWidth: 100, align: 'center'}/*
                ,{fixed: 'right', title:'操作',width:120, align:'center', toolbar: '#barDemo'}*/
            ]]
            , page: false
            , height:'full-195'
            , limit: 20
        });
        //即将出库记录红线标识
        if(pageLimit == 10000 && nextIndex != -1){
            $("tr[data-index="+nextIndex+"]").css("border-top", "2px solid red");
        }
    };

    window.setPage = function (rowCount, curr) {
        laypage.render({
            elem: 'pagination'
            , count: rowCount
            , curr: curr
            , layout: ['count', 'prev', 'page', 'next', 'skip']
            , jump: function (obj, first) {
                vm.currentPage = obj.curr;
                if (!first) {
                    vm.query(obj.curr, 0);
                }
            }
        });
    };

    //入口
    vm.query(1, 1);
    timeFlush = setInterval("vm.query(1,1)", 60000);

});

function queryJu() {
    var html = '';
    $.ajax({
        type: 'post',
        url: siteurl + '/train/chtraincheckinfo/queryJu',
        dataType: 'json',
        data: JSON.stringify({}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.juInfoList;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        if(levelmarkid == list[i].fdeviceid){
                            html += "<option selected value='" + list[i].fdeviceid + "'>" + list[i].fBureauname + "</option>"
                        }else{
                            html += "<option value='" + list[i].fdeviceid + "'>" + list[i].fBureauname + "</option>"
                        }
                    }
                }
                $("select[name='fBureauname']").append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}

function queryDuan(data) {
    var html = '<option value="">请选择</option>';
    $.ajax({
        type: 'post',
        url: siteurl + '/train/chtraincheckinfo/queryDuan',
        dataType: 'json',
        data: JSON.stringify({fBureauname:data}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.juInfoList;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        if(levelmarkid == list[i].fdeviceid){
                            html += "<option selected value='" + list[i].fdeviceid + "'>" + list[i].fSectionname + "</option>"
                        }else{
                            html += "<option value='" + list[i].fdeviceid + "'>" + list[i].fSectionname + "</option>"
                        }
                    }
                }
                $("select[name='fSectionname']").empty().append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}

function queryChang(data) {
    var html = '<option value="">请选择</option>';
    $.ajax({
        type: 'post',
        url: siteurl + '/train/chtraincheckinfo/queryChang',
        dataType: 'json',
        data: JSON.stringify({fSectionname:data}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.juInfoList;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        if(levelmarkid == list[i].fdeviceid){
                            html += "<option selected value='" + list[i].fdeviceid + "'>" + list[i].fpasssite + "</option>"
                        }else{
                            html += "<option value='" + list[i].fdeviceid + "'>" + list[i].fpasssite + "</option>"
                        }
                    }
                }
                $("select[name='fpasssite']").empty().append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}