var date = new Date();
var defaultStartTime = date.format("yyyy-MM-dd") + ' 00:00:00';
var defaultEndTime = date.format("yyyy-MM-dd") + ' 23:59:59';
var vm = new Vue({
    el: 'main',
    data: {
        search: {
            tagstatus: '0',
            fBureauname: '',
            fSectionname: '',
            fpasssite: '',
            fdirection: '',
            startTime: defaultStartTime,
            endTime: defaultEndTime

        }
    },
    methods: {
        query: function (pageNum, isRefreshDB) {
            vm.currentPage = pageNum;
            $.ajax({
                type: 'post',
                url: siteurl + '/train/chtraincheckinfo/list/' + pageNum,
                data: JSON.stringify(vm.search),
                dataType: 'json',
                async: false,
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        initList(r.page.list);
                        if (isRefreshDB == 1) {
                            setPage(r.page.totalCount);
                        }
                    } else {
                        alert(r.msg);
                    }

                }
            })
        },
        export: function () {
            downFile2(siteurl + '/train/chtraincheckinfo/exporttable/', {
                tagstatus: $('#tagstatus').val(),
                fBureauname: $('#fBureauname').val(),
                fSectionname: $('#fSectionname').val(),
                fpasssite: $('#fpasssite').val(),
                fdirection: $('#fdirection').val(),
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
        /*$("#fBureauname").css("disabled", "true");
        $("#selec1").click(function () {
            $(this).find("select").attr("disabled", "disabled");
            form.render('select')
            parent.parent.layer.msg("对不起，您没有权限！");
        })*/
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


    //监听提交
    form.on('submit(export)', function (data) {
        vm.export();
        return false;
    });

    //监听提交
    form.on('submit(demo1)', function (data) {
        vm.search = data.field;
        vm.query(1, 1);
        //如果查询条件为空就刷新，不为空就停止刷新
        /*if (data.field.tagstatus == 0 && data.field.fBureauname == "" && data.field.fSectionname == "" && data.field.fpasssite == "" && data.field.fdirection == "" && data.field.startTime == "" && data.field.endTime == "") {
            timeFlush = setInterval("vm.query(1,1)", 60000);
        } else {
            clearInterval(timeFlush);
        }*/
        return false;
    });


    //监听提交
    form.on('submit(jumpreport)', function (data) {
        parent.app.addTab({
            url: siteurl + '/train/chtraincheckinfo/datareport',
            icon: '&#xe62d;',
            title: '统计分析',
            id: '12'
        });
        return false;
    });

    /*form.on('select(tagstatus)', function (data) {
        vm.search.tagstatus = data.value;
        vm.query(1, 1);
        return false;
    });*/

    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'edit') {
            parent.layer.confirm('确认进行销号么？', function (index) {
                updateStatus(data.fid);
                parent.layer.close(index);
            });
        }
    });

    //人工销号
    function updateStatus(fid) {
        $.ajax({
            type: "POST",
            url: siteurl + "/train/chtraincheckinfo/updateStatus",
            contentType: "application/json",
            data: JSON.stringify({fid: fid}),
            success: function (r) {
                if (r.code === 0) {
                    parent.parent.layer.msg("操作成功");
                    vm.query(1,1);
                } else  if(r.msg!=null && r.msg != ""){
                    parent.parent.layer.alert(r.msg);
                }
            }
        });
    }

    var $ = layui.$, active = {
        jumpreport: function () {
            parent.app.addTab({
                url: siteurl + '/train/chtraincheckinfo/datareport',
                icon: '&#xe62d;',
                title: '统计分析',
                id: '12'
            });
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

    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cellMinWidth: 80
            , cols: [[
                {templet: function (d) { return d.LAY_INDEX+(vm.currentPage-1)*20;} , width: '4%'}
                /*, {
                    field: 'ftrainorder',
                    title: '车次',
                    width: '7%',
                    minWidth: 54,
                    templet: '#usernameTpl',
                    align: 'center'
                }*/
                , {field: 'ftrainorder', title: '车次', width:'8%',templet: '#usernameTpl',  align: 'center'}
                , {field: 'fTraintypeverdict', title: '识别车型', width: '11%', minWidth: 100, align: 'center'}
                , {field: 'fTrainnumberverdict', title: '识别车号', width: '11%', minWidth: 100, align: 'center'}
                , {field: 'fdetalReserve2', title: '确认车型', width: '11%', minWidth: 100, align: 'center'}
                , {field: 'fdetalReserve5', title: '确认车号', width: '11%', minWidth: 100, align: 'center'}
                , {field: 'fpasssite', title: '地点', width: '11%', minWidth: 55, align: 'center'}
                , {field: 'fpasspoint', title: '闸楼', width: '9%', minWidth: 75, align: 'center'}
                , {field: 'fdirection', title: '方向', width: '5%', minWidth: 55, align: 'center'}/*
                , {field: 'ftrainattribute', title: '通过里程(km)', width: '12%', minWidth: 65,align: 'center'}*/
                , {field: 'ftimethrough', title: '通过时间', width: '13%', minWidth: 100, sort: true, align: 'center'}
                , {field: 'fInforfid', title: '标签', width: '16%', minWidth: 120, align: 'center', templet: '#titleTpl1'}
                , {field: 'fBureauname', title: '配属局', width: '11%', minWidth: 55, align: 'center'}
                , {field: 'fSectionname', title: '配属段', width: '11%', minWidth: 55, align: 'center'}
                , {field: 'fInfoimage1', title: '图像识别', width: '7%', minWidth: 100, align: 'center'}
                ,{fixed: 'right', title:'操作',width:120, align:'center', toolbar: '#barDemo'}

            ]]
            , page: false
            , height:'full-260'
            , limit: 20
        });
    };

    // , cols: [[
    //     {type: 'numbers',width:60}
    //     , {field: 'ftrainorder', title: '车次', width:100,templet: '#usernameTpl',  align: 'center'}
    //     , {field: 'fTraintypeverdict', title: '识别车型', width:170,align: 'center'}
    //     , {field: 'fTrainnumberverdict', title: '识别车号', width:170,  align: 'center'}
    //     , {field: 'fdetalReserve2', title: '确认车型', width:170,align: 'center'}
    //     , {field: 'fdetalReserve5', title: '确认车号', width:170,  align: 'center'}
    //     , {field: 'fBureauname', title: '局',  width:80, align: 'center'}
    //     , {field: 'fSectionname', title: '段',  width:80,  align: 'center'}
    //     , {field: 'fpasssite', title: '地点', width:150, align: 'center'}
    //     , {field: 'fpasspoint', title: '闸楼', width:100,  align: 'center'}
    //     , {field: 'fdirection', title: '方向', width:80,  align: 'center'}
    //     , {field: 'ftimethrough', title: '通过时间', width:200,sort: true, align: 'center'}
    //     , {field: 'fInforfid', title: '标签', width:156,  align: 'center',templet: '#titleTpl1'}
    //     /*
    //      ,{fixed: 'right', title:'操作',width:120, align:'center', toolbar: '#barDemo'}
    //      */
    // ]]
    window.setPage = function (rowCount) {
        laypage.render({
            elem: 'pagination'
            , count: rowCount
            , layout: ['count', 'prev', 'page', 'next', 'skip']
            , jump: function (obj, first) {
                vm.currentPage = obj.curr;
                if (!first) {
                    vm.query(obj.curr, 0);
                }
            }
        });
    };

    vm.query(1, 1);
    //timeFlush = setInterval("vm.query(1,1)", 60000);

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
                        html += "<option value='" + list[i].fdeviceid + "'>" + list[i].fBureauname + "</option>"
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
        data: JSON.stringify({fBureauname: data}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.juInfoList;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        html += "<option value='" + list[i].fdeviceid + "'>" + list[i].fSectionname + "</option>"
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
        data: JSON.stringify({fSectionname: data}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.juInfoList;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        html += "<option value='" + list[i].fdeviceid + "'>" + list[i].fpasssite + "</option>"
                    }
                }
                $("select[name='fpasssite']").empty().append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}