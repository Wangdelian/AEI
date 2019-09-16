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

    //部门选择不包含用户信息
    $.ajax({
        type: "POST",
        url: siteurl + '/sys/user/getlevel/-1',
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            vm.zNodes = r.levelMarkList;
            $.fn.zTree.init($("#menuTree"), setting, r.levelMarkList);
        }
    });
    var treeObj = $.fn.zTree.getZTreeObj("menuTree");


    var nodes = vm.user.levelmarkid.split(",");
    for (var i = 0, l = nodes.length; i < l; i++) {
        var node = treeObj.getNodeByParam("levelmarkid", nodes[i], null);
        treeObj.checkNode(node, true, true);
    }
}

function initUerextvalue5Ztree() {
    var setting = {
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: {"Y": "", "N": ""}
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "stationid",
                rootPId: null
            },
            key: {
                name: 'stationname'
            }
        }
    };
    var zNodes = [];

    //部门选择不包含用户信息
    $.ajax({
        type: "POST",
        url: siteurl + '/mqs/mqsstation/addUserextvalue5Option/',
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            zNodes = r.userextvalue5OptionList;
            $.fn.zTree.init($("#userextvalue5menuTree"), setting, r.userextvalue5OptionList);
        }
    });


    var treeObj = $.fn.zTree.getZTreeObj("userextvalue5menuTree");
    if (vm.user.userextvalue5 != null) {
        var nodes = vm.user.userextvalue5.split(",");
        for (var i = 0; i < nodes.length; i++) {
            var node = treeObj.getNodeByParam("stationid", nodes[i], null);
            treeObj.checkNode(node, true, true);
        }

    }


}


var form = null;
var layer = parent.layer;

layui.use(['laypage', 'layer', 'form', 'laydate'], function () {
    var laypage = layui.laypage
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , table = layui.table;
    form = layui.form;

    //初始化部门及参与人，谢主任，管理者的选择功能
    initFunctions();
    //获取角色信息
    vm.getRoleList();
    //显示用户信息
    vm.getUserInfo(userId);
    //初始化树结构
    initZtree();

    initUerextvalue5Ztree();

    addUsrextvalue4Option();

    //提交验证
    form.verify({
        title: function (value) {
            if (value.length < 3) {
                return '标题不得少于3个字符';
            }
        }
        , select: function (value) {
            if (value === '')
                return '这里还没选择';
        }
        , notNull: function (value) {
            if (value === '')
                return '请输入';
        }
    });
    form.verify({
        username: function (value, item) {
            /*var patt = /^[a-zA-Z][a-zA-Z0-9]{0,}$/;
            var res = value.match(patt);
            if (res == null) {
                return '用户名必须以字母开头，由字母和数字组成，请重新输入！';
            }
            if (nowUsername != value) {
                if (res != null) {
                    vm.queryUsername(value);
                    if (vm.flag) {
                        return '用户名已经存在，请重新输入！';
                    }
                }
            }*/
            if (nowUsername != value) {
                vm.queryUsername(value);
                if (vm.flag) {
                    return '用户名已经存在，请重新输入！';
                }

            }
        }
    });

    //监听提交
    form.on('submit(demo1)', function (data) {
        data.field.userId = userId;

        data.field.levelmarkid = vm.user.levelmarkid;
        data.field.status = vm.user.status;
        data.field.sex = vm.user.sex;

        var arr = document.getElementsByName("roleId");
        //arr是一个数组，就是所有checkbox的值；
        var re = [];
        for (i = 0; i < arr.length; i++) {
            if (arr[i].checked) {
                re[re.length++] = arr[i].value;
            }
        }
        data.field['roleIdList'] = re;
        data.field['userlevelmark'] = vm.user.userlevelmark;
        data.field.userextvalue5 = vm.user.userextvalue5;

        if ($("#password").val() != null) {
            data.field.password = $("#password").val();
        }

        $.ajax({
            url: siteurl + '/sys/user/update',
            type: 'POST',
            data: JSON.stringify(data.field),
            async: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                if (data.tag == 1) {
                    layer.confirm("用户权限不能为空！")
                    return;
                } else {
                    parent.app.renderbymuneid('213', siteurl + '/sys/user/searchweblist/');
                    parent.parent.layer.msg("操作成功");
                    parent.app.closeTab('981');
                }

            },
            error: function (data) {
                alert('查找板块报错');
            }
        });
        return false;
    });

    form.on('radio(filter1)', function (data) {
        //layui-form-radioed禁用
        vm.user.status = data.value;
    });

    form.on('radio(filter2)', function (data) {
        //layui-form-radioed女
        vm.user.sex = data.value;
    });
});
var userextvalue4;
var nowUsername;
var vm = new Vue({
    el: '#main',
    data: {
        flag: '',
        showList: true,
        levelname: '',
        roleList: [],
        roleNum: '',
        sel: '',
        stationnames: '',
        user: {
            status: 1,
            sex: 1,
            roleIdList: [],
            userlevelmark: [],
            userextvalue5: [],
            username: ''
        },
        zNodes: []
    },
    watch: {
        zNodes: function () {
            this.$nextTick(function () {
                form.render()
            })
        }
    },
    methods: {
        queryUsername: function (username) {
            vm.user.username = username;
            $.ajax({
                type: 'post',
                url: siteurl + '/sys/user/queryUsername/',
                cache: false,
                async: false,
                data: JSON.stringify(vm.user),
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        if (r.sysUserEntity != null) {
                            vm.flag = 1;
                        } else {
                            vm.flag = 0;
                        }
                    } else {
                        alert("请联系管理员");
                    }
                }
            });
        },
        //获取用户信息
        getUserInfo: function (userId) {
            $.ajax({
                type: "GET",
                url: siteurl + '/sys/user/info/' + userId,
                async: false,
                cache: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    vm.user = r.user;
                    vm.sel = r.abname;
                    nowUsername = vm.user.username;
                    $("#levelname").val(r.abname);
                    userextvalue4 = vm.user.userextvalue4;
                    $("#userextvalue5").val(r.stationname);
                }
            });
        },
        //获取角色信息
        getRoleList: function () {
            $.ajax({
                type: "GET",
                url: siteurl + '/sys/role/select/' + userId,
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    vm.roleList = r.list;
                    var len = r.list.length;
                    vm.roleNum = Math.ceil(len / 4);  //向上取整
                }
            });
        },
        //获取选择结果
        selected: function () {
            var treeObj = $.fn.zTree.getZTreeObj("menuTree");
            var nodes = treeObj.getCheckedNodes(true);

            if (nodes == '') {
                layer.msg("所属组织不能为空！");
                return;
            }
            var bb = "";
            for (var count = 0; count < nodes.length; count++) {
                //  vm.user.levelmarkid+=nodes[count].levelmarkid;
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
        uerextvalue5Selected: function () {
            var treeObj = $.fn.zTree.getZTreeObj("userextvalue5menuTree");
            var nodes = treeObj.getCheckedNodes(true);
            if (nodes == '') {
                layer.msg("所属采集点不能为空！");
                return;
            }
            var bb = "";
            for (var count = 0; count < nodes.length; count++) {
                bb += nodes[count].stationname + ",";
            }
            vm.stationnames = bb.substring(0, bb.length - 1);

            //构造将要存储的采集点表
            var list = "";
            for (var i = 0; i < nodes.length; i++) {
                list += nodes[i].stationid + ",";
            }
            list = list.substring(0, list.length - 1);
            $("#userextvalue5").val(vm.stationnames);
            vm.user.userextvalue5 = list;
        }
    }
});

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
            //关闭选择框
            closeZtree('projectDept-options');
        }
        else {
            closeZtree('projectDept-options');
        }
    });


    //弹窗逻辑判断
    $('#userextvalue5').click(stopPro);

    $('#userextvalue5-Deptoptions').click(stopPro);

    $('#userextvalue5').focus(function () {
        showZtree('userextvalue5-Deptoptions');
    });

    $(document).click(function () {
        closeZtree('userextvalue5-Deptoptions');
    });
    //三个按钮事件
    $('#userextvalue5-Deptoptions .layui-btn').on('click', function (event) {
        if (event.target.innerText === '完成') {

            //initPart('projectDept-options', 'menuTree', 'levelname', false);
            vm.uerextvalue5Selected();
            closeZtree('userextvalue5-Deptoptions');
        }
        else if (event.target.innerText === '清空') {
            var treeObj = $.fn.zTree.getZTreeObj('userextvalue5menuTree');
            //取消ztree选择
            treeObj.checkAllNodes(false);
            //清空输入框值
            $('#userextvalue5').val('');
            vm.user.userextvalue5 = '';
            //关闭选择框
            closeZtree('userextvalue5-Deptoptions');
        }
        else {
            closeZtree('userextvalue5-Deptoptions');
        }
    });


}

//显示用户树
function showZtree(id) {
    $('#' + id).stop(true);
    $('#' + id).css('z-index', 100);
    $('#' + id).animate({'margin-top': '40px', opacity: 1});
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

function addUsrextvalue4Option() {
    $.ajax({
        url: siteurl + '/generator/mqsproductionteam/addUserextvalue4Option/',
        type: 'POST',
        async: false,
        data: {},
        success: function (data) {
            html = '';
            for (var i = 0; i < data.length; i++) {
                if (userextvalue4 == null) {
                    html += '<option selected></option>';
                } else {
                    html += '<option></option>';
                }
                if (userextvalue4 == data[i].productionteamname) {
                    html += '<option  selected value=' + data[i].productionteamname + '>' + data[i].productionteamname + '</option>';
                } else {
                    html += '<option value=' + data[i].productionteamname + '>' + data[i].productionteamname + '</option>';
                }
            }
            $("select[name='userextvalue4']").append(html);

        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
}