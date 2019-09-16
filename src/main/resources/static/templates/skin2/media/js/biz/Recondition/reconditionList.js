//当面页面数据量
var pageNumSize;
var date = new Date();
var defaultStartTime = date.format("yyyy-MM-dd") + ' 00:00:00';
var defaultEndTime = date.format("yyyy-MM-dd") + ' 23:59:59';

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

    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        var arrId = new Array(1);
        if (obj.event === 'del') {
            parent.layer.confirm('确认删除行么', function (index) {
                arrId[0] = data.fid;
                obj.del();
                vm.del(arrId);
                parent.layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var param = {
                url: siteurl + '/train/recondition/editRecondition/' + data.fid,
                icon: '&#xe6c6;',
                title: '编辑设备检修履历',
                id: '111'
            };
            parent.app.addTab(param);
        }

    });

    var $ = layui.$, active = {
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            if (data.length > 0) {
                var arrId = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    arrId[i] = data[i].fid;
                }
                parent.layer.confirm('确认删除么', function (index) {
                    vm.del(arrId);
                    parent.layer.close(index);
                });
            } else {
                parent.layer.msg("您还未选中任何数据");
            }
        }
        , getCheckLength: function () { //获取选中数目
            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            parent.layer.msg('选中了：' + data.length + ' 个');
        }
        , add: function () {
            var param = {
                url: siteurl + '/train/recondition/addRecondition',
                icon: '&#xe6c6;',
                title:'添加设备检修履历',
                id: '222'
            };
            parent.app.addTab(param);
            if(window.event){
                window.event.returnValue = false;
            }
            else{
                e.preventDefault();//for firefox
            }
        }
        , isAll: function () { //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            parent.layer.msg(checkStatus.isAll ? '全选' : '未全选')
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
                {templet: function (d) { return d.LAY_INDEX+(vm.currentPage-1)*20;}, width: 20}
                , {type: 'checkbox', width: 30}
                , {field: 'fid', title: '唯一ID', width: '8%', minWidth: 100, align: 'center', hide:'true'}
                , {field: 'freconditionsite', title: '检修地点', width: '9%', minWidth: 100, align: 'center'}
                , {field: 'fdevicename', title: '设备名称', width: '8%', minWidth: 100, align: 'center'}
                , {field: 'freconditiontype', title: '检修类型', width: '8%', minWidth: 100, align: 'center'}
                , {field: 'freconditiontime', title: '检修时间', width: '13%', minWidth: 100, align: 'center'}
                , {field: 'freconditionpart', title: '检修部位', width: '8%', minWidth: 55, align: 'center'}
                , {field: 'freconditionstatus', title: '检修状态', width: '8%', minWidth: 75, align: 'center'}
                , {field: 'fdisposecontent', title: '处理内容', width: '8%', minWidth: 55, align: 'center'}
                , {field: 'fdisposeresult', title: '处理结果', width: '8%', minWidth: 100, align: 'center'}
                , {field: 'frecordpersonnel', title: '记录人员', width: '8%', minWidth: 100, align: 'center'}
                , {field: 'frecordtime', title: '记录时间', width: '13%', minWidth: 55, align: 'center'}
                , {field: 'fremark', title: '备注', width: '11%', minWidth: 100, align: 'center'}
                ,{fixed: 'right', title:'操作',width:120, align:'center', toolbar: '#barDemo'}
            ]]
            , page: false
            , height:'full-195'
            , limit: 20
        });
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
    form.on('checkbox(checkbox)', function (data) {
        var roleIdarr = [];
        //得到所有的input
        var inputObj = document.getElementsByName("roleId");
        //得到选中的name值
        var obj = $('div[class="layui-unselect layui-form-checkbox layui-form-checked"] span');
        for (var i = 0; i < obj.length; i++) {
            for (var j = 0; j < inputObj.length; j++) {
                if (obj[i].innerHTML == inputObj[j].title) {
                    roleIdarr.push(inputObj[j].value);
                }
            }
        }
        vm.user.roleIdList = roleIdarr;
    });

    vm.query(1, 1);

});
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
                url: siteurl + '/train/recondition/list/' + pageNum,
                data: JSON.stringify(vm.search),
                dataType: 'json',
                async: false,
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
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
        del: function (arrId) {
            //删除功能说明
            //支持数组、单个id传入，删除后会跳转到第一页
            //数据转换
            //判断传入的数据为单个或多个，转换为json格式，key以0开始
            var jsonData = {};
            if (arrId.length != undefined)
                for (var i = 0; i < arrId.length; i++) {
                    jsonData[i] = arrId[i];
                }
            else
                jsonData[0] = arrId;

            $.ajax({
                type: "POST",
                url: siteurl + '/train/recondition/delete',
                data: JSON.stringify(jsonData),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.tag == 1) {
                        vm.query(vm.currentPage, true);
                        parent.layer.confirm("当前记录不能删除!")
                    } else if (r.code === 0) {
                        parent.layer.msg("删除操作成功！");
                        if ((pageNumSize - arrId.length) > 0) {
                            vm.query(vm.currentPage, true);
                        } else {
                            vm.query(vm.currentPage - 1, true);
                        }
                    }
                }
            });
        },
    }
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