//当面页面数据量
var pageNumSize;
var vm = new Vue({
    el: 'main',
    data: {
        search: {
            fBureauname: '',
            fSectionname: '',
            fpasssite: '',
        }
    },
    methods: {
        query: function (pageNum, isRefreshDB) {
            vm.currentPage = pageNum;
            $.ajax({
                type: 'post',
                url: siteurl + '/train/systeminfo/list/' + pageNum,
                data: JSON.stringify(vm.search),
                dataType: 'json',
                async: false,
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        for(var i=0;i<r.page.list.length;i++){
                            r.page.list[i].loginurl = r.page.list[i].url + "/login";
                        }
                        initList(r.page.list);
                        $('td[data-content="正常"]').css('background-color', '#90EE90');
                        $('td[data-content="正常"]').css('font-weight', 'bold');
                        $('td[data-content="异常"]').css('background-color', 'red');
                        $('td[data-content="异常"]').css('font-weight', 'bold');
                        $('td[data-content="异常"]').css('color', 'black');
                        if (isRefreshDB == 1) {
                            setPage(r.page.totalCount);
                        }
                        pageNumSize = r.page.list.length;
                    } else {
                        alert(r.msg);
                    }

                }
            })
        },
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
    form.on('submit(demo1)', function (data) {
        vm.search = data.field;
        vm.query(1, 1);
        //如果查询条件为空就刷新，不为空就停止刷新
        /*if (data.field.fBureauname == "" && data.field.fSectionname == "" && data.field.fpasssite == "" ) {
            timeFlush = setInterval("vm.query(1,1)", 60000);
        } else {
            clearInterval(timeFlush);
        }*/
        return false;
    });

    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        var arrId = new Array(1);
        if (obj.event === 'view') {
            /*var param = {
                url: obj.data.url + '/monitoring',
                icon: '&#xe6c6;',
                title: '查看系统',
                id: '111'
            };
            parent.app.addTab(param);*/

            window.open(obj.data.url + '/monitoring');
        }else if(obj.event === 'open'){
            window.open(obj.data.loginurl);
        }
    });
    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cellMinWidth: 80
            , cols: [[
                {templet: function (d) { return d.LAY_INDEX+(vm.currentPage-1)*20;}, width: 20}
                , {field: 'abname', title: '名称', width: '12%', minWidth: 100, align: 'center'}
                ,{fixed: 'right', title:'Web链接',width:120, align:'center', toolbar: '#open'}
                , {field: 'loginurl', title: 'web链接', width: '30%', minWidth: 100, align: 'center',hide:'true' }
                , {field: 'count', title: 'Web访问次数', width: '10%', align: 'center', templet: '#tp11'}
                , {field: 'lastLogin', title: 'Web最后一次访问时间', width: '20%', align: 'center', templet: '#tp11'}
                , {field: 'status', title: '系统状态', width: '8%', align: 'center', templet: '#tp11'}
                , {field: 'dataStatus', title: '数据状态', width: '8%', align: 'center', templet: '#tp11'}/*
                ,{fixed: 'right', title:'操作',width:120, align:'center', toolbar: '#barDemo'}*/
            ]]
            , page: false
            , height:'full-140'
            , limit: 20
        });
    };

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