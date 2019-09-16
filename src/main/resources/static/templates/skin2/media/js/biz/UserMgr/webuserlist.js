var pageNumSize;
$(function () {
    getRoleList();
});

layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage;
    var layer = layui.layer;
    var table = layui.table;
    var form = layui.form;
    var laydate = layui.laydate;

    //时间选择器
    var start = laydate.render({
        elem: '#start'
        , type: 'datetime'
        , done: function (value, date) {
            date.month--;
            end.config.min = date;
            vm.user.start = value;
        }
    });
//时间选择器
    var end = laydate.render({
        elem: '#end'
        , type: 'datetime'
        , done: function (value, date) {
            date.month--;
            start.config.max = date;
            vm.user.end = value;
        }
    });

    //日期时间范围
    laydate.render({
        elem: '#createTime'
        , type: 'datetime'
        , range: '~'
        , done: function (value, date) {
            if (value != null) {
                vm.user.start = value.split(" ~ ")[0];
                vm.user.end = value.split(" ~ ")[1];
            } else {
                vm.user.start = null;
                vm.user.end = null;
            }
        }
    });

    //监听性别操作
    var sex;
    form.on('switch(sexDemo)', function (obj) {
        sex = obj.elem.checked ? 0 : 1;
    });

    //监听锁定操作
    var status;
    form.on('checkbox(lockDemo)', function (obj) {
        status = obj.elem.checked ? 0 : 1;
    });

    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        var userId = data.userId;
        var arrId = new Array(1);
        if (obj.event === 'del') {
            parent.layer.confirm('确认删除行么', function (index) {
                arrId[0] = userId;
                obj.del();
                vm.del(arrId);
                parent.layer.close(index);
            });
        } else if (obj.event === 'edit') {
            vm.MenuOpt.url = siteurl + '/sys/user/webedituser/' + data.userId + '?ttt=' + new Date().format("yyyyMMddhh:mm:ss");
            vm.MenuOpt.icon = '&#xe6c6;';
            vm.MenuOpt.title = '编辑web用户';
            vm.MenuOpt.id = '981';

            parent.app.closeTab('981');
            parent.app.addTab(vm.MenuOpt);
            //tab.tabAdd(vm.MenuOpt);
        } else if (obj.event === 'colclick') {
            $.ajax({
                url: siteurl + '/sys/user/updateSex',
                type: 'POST',
                data: JSON.stringify({sex: sex, userId: data.userId}),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    vm.query(vm.currentPage, true);
                    parent.parent.layer.msg("操作成功");
                },
                error: function (data) {
                    alert('查找板块报错');
                }
            });
            return false;
        }
        else if (obj.event === 'staclick') {
            $.ajax({
                url: siteurl + '/sys/user/updateStatus',
                type: 'POST',
                data: JSON.stringify({status: status, userId: data.userId}),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.tag == 0) {
                        vm.query(vm.currentPage, true);
                        parent.layer.msg("操作成功");
                    } else if (r.tag == 1) {
                        vm.query(vm.currentPage, true);
                        parent.layer.confirm("当前用户状态不能锁定!")
                    } else if (r.tag == 2) {
                        vm.query(vm.currentPage, true);
                        parent.layer.confirm("系统管理员状态不能锁定！")
                    }
                },
                error: function (data) {
                    alert('查找板块报错');
                }
            });
            return false;
        }
    });

    var $ = layui.$, active = {
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            if (data.length > 0) {
                var arrId = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    arrId[i] = data[i].userId;
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
        , addUser: function () {
            vm.MenuOpt.url = siteurl + '/sys/user/webaddUser/';
            vm.MenuOpt.icon = '&#xe6c6;';
            vm.MenuOpt.title = '添加web用户信息';
            vm.MenuOpt.id = '982';

            parent.app.closeTab('982');
            parent.app.addTab(vm.MenuOpt);
        }
        , isAll: function () { //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            parent.layer.msg(checkStatus.isAll ? '全选' : '未全选')
        }
        , SearchList: function () {
            //查询按钮触发
            vm.update(16);
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

    window.Hello = function (listdata) {
        //查询按钮触发
        table.reload('idTest', {
            data: listdata
        });
    };
    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cellMinWidth: 80
            , height: 'full-240'
            , cols: [[
                {type: 'numbers'}
                , {type: 'checkbox'}
                , {field: 'userId', title: '唯一ID', unresize: true, sort: true, width: 70, align: 'center'}
                , {field: 'username', title: '登录名', templet: '#usernameTpl', width: 90, align: 'center'}
                , {field: 'chineseName', title: '姓名', width: 90, align: 'center'}
                , {field: 'levelmarkid', title: '所属单位', width: 250, sort: true, align: 'center'}
                , {field: 'roleName', title: '角色名称', width: 250, sort: true, align: 'center'}
                , {field: 'userextvalue5', title: '所属采集点', width: 250, sort: true, align: 'center'}
                , {field: 'userextvalue4', title: '所属班组', width: 100, sort: true, align: 'center'}
                , {field: 'createTime', title: '创建时间', width: 150, sort: true, align: 'center'}
                , {field: 'dateLastLogin', title: '最后登录时间', width: 150, sort: true, align: 'center'}
                , {
                    field: 'status',
                    title: '是否锁定',
                    templet: '#checkboxTpl',
                    unresize: true,
                    event: 'staclick',
                    align: 'center'
                }
                , {field: 'userextvalue2', title: '登录次数', width: 80, sort: true, align: 'center'}
                , {fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#barDemo'}
            ]]
            , page: false
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
    window.onSearch = function (conditionObj, pageNum) {

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

    //列表入口
    vm.query(1, 1);
    initZtree();
    initFunctions();

});

//单位树
function initZtree() {
    var setting = {
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: {"Y": "", "N": ""}
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "levelmarkid",
                pIdKey: "pid",
                rootPId: null
            },
            key: {
                name: 'abname',
                url : ''
            }
        }
    };
    var zNodes = [];

    //部门选择不包含用户信息
    $.ajax({
        type: "POST",
        url: siteurl + '/sys/user/getlevel/-1',
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            zNodes = r.levelMarkList;
            $.fn.zTree.init($("#menuTree"), setting, r.levelMarkList);
        }
    });
}

function initFunctions() {
    //弹窗逻辑判断
    $('#levelname').click(stopPro);

    $('#projectDept-options').click(stopPro);

    $('#levelname').focus(function () {
        showZtree('projectDept-options');
    });

    $(document).click(function () {
        closeZtree('projectDept-options');
    });
    //三个按钮事件
    $('#projectDept-options .layui-btn').on('click', function (event) {
        if (event.target.innerText === '完成') {
            //initPart('projectDept-options', 'menuTree', 'levelname', false);
            vm.selected();
            closeZtree('projectDept-options');
        }
        else if (event.target.innerText === '清空') {
            var treeObj = $.fn.zTree.getZTreeObj('menuTree');
            //取消ztree选择
            treeObj.checkAllNodes(false);
            //清空输入框值
            $('#levelname').val('');
            vm.user.levelmarkid = '';
            //关闭选择框
            closeZtree('projectDept-options');
        }
        else {
            closeZtree('projectDept-options');
        }
    });

}

//显示用户树
function showZtree(id) {
    $('#' + id).stop(true);
    $('#' + id).css('z-index', 100);
    $('#' + id).animate({'margin-top': '3px', opacity: 1});
}

//关闭用户树
function closeZtree(id) {
    //停止当前所有动作，stop(true,true)的话会在停止前完成当前动作
    $('#' + id).stop(true);
    $('#' + id).animate({'margin-top': '150px', opacity: 0}, function () {
        $('#' + id).css('z-index', -10000);
    });
}

//阻止默认事件
function stopPro(e) {
    e.stopPropagation();
}

var vm = new Vue({
    el: '#main',
    data: {
        roleList: [],
        roleNum: '',
        user: {
            username: '',
            start: '',
            end: '',
            chineseName: '',
            roleIdList: [],
            userlevelmark: [],
            userextvalue5: [],
            levelmarkid: ''
        },
        MenuOpt: {
            url: '',
            icon: '',
            title: '',
            id: ''
        }
    },
    methods: {
        query: function (pageNum, isRefreshDB) {
            vm.user.userextvalue3 = 'web用户';
            $.ajax({
                type: "POST",
                url: siteurl + '/sys/user/list/' + pageNum,
                data: JSON.stringify(vm.user),//用户数据
                async: false,
                cache: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {//判断请求
                        initList(r.page.list);
                        if (isRefreshDB == 1) {
                            setPage(r.page.totalCount);
                        }
                        pageNumSize = r.page.list.length;
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        export: function () {
            downFile2(siteurl + '/sys/user/export', {
                username: vm.user.username,
                'start': vm.user.start,
                'end': vm.user.end,
                'chineseName': vm.user.chineseName,
                'roleIdList': vm.user.roleIdList,
                'userlevelmark': vm.user.userlevelmark,
                'userextvalue5': vm.user.userextvalue5,
                'levelmarkid': vm.user.levelmarkid
            });

        },
        selected: function () {
            var treeObj = $.fn.zTree.getZTreeObj("menuTree");
            var nodes = treeObj.getCheckedNodes(true);
            var bb = "";
            for (var count = 0; count < nodes.length; count++) {
                bb += nodes[count].abname + ";";
            }
            vm.levelname = bb.substring(0, bb.length - 1);

            //构造将要存储的用户机构表
            var list = "";
            var userlevelmark = new Array(nodes.length);
            for (var i = 0; i < nodes.length; i++) {
                list += nodes[i].levelmarkid + ",";
            }
            for (var j = 0; j < nodes.length; j++) {
                userlevelmark[j] = nodes[j].levelmarkid;
            }
            $("#levelname").val(vm.levelname);
            vm.user.userlevelmark = userlevelmark;
            vm.user.levelmarkid = list.substring(0, list.length - 1);
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
                url: siteurl + '/sys/user/delete',
                data: JSON.stringify(jsonData),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        parent.layer.msg("删除操作成功！");
                        if ((pageNumSize - arrId.length) > 0) {
                            vm.query(vm.currentPage, true);
                        } else {
                            vm.query(vm.currentPage - 1, true);
                        }
                    } else if (r.tag == 1) {
                        vm.query(vm.currentPage, true);
                        parent.layer.confirm("当前用户不能删除!")
                    } else if (r.tag == 2) {
                        vm.query(vm.currentPage, true);
                        parent.layer.confirm("系统管理员不能删除！")
                    }
                    else {
                        parent.parent.layer.alert(r.msg)
                    }
                }
            });
        }
    }
});

function getRoleList() {
    $.ajax({
        type: "GET",
        url: siteurl + '/sys/role/select/-1',
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            vm.roleList = r.list;
            var data = r.list;
            html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<input type="checkbox" lay-skin="primary"  name="roleId" class="roleIds" lay-filter="checkbox"  title=' + data[i].roleName + ' value=' + data[i].roleId + '>';
            }
            $(".layui-input-block").append(html);
        }
    });
}
function start() {
    return false;
}