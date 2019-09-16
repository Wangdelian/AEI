/**
 *
 *
 */
$(function () {
    vm.getRoleList();
    addUsrextvalue4Option();
});

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
                url: "xUrl"
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


var form = null;
layui.use(['laypage', 'layer', 'form', 'laydate'], function () {
    var laypage = layui.laypage
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , table = layui.table;
    var form = layui.form;

    //初始化树结构
    initZtree();

    //初始化部门及参与人，谢主任，管理者的选择功能
    initFunctions();

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
            /*var patt = /^[a-zA-Z0-9]{1,}$/;
            var res = value.match(patt);
            if (res == null) {
                return '用户名由字母和数字组成，请重新输入！';
            } else {
                vm.queryUsername(value);
                if (vm.flag) {
                    return '用户名已经存在，请重新输入！';
                }
            }*/
            value = value.trim();
            vm.queryUsername(value);
            if (vm.flag) {
                return '用户名已经存在，请重新输入！';
            }
        },
        password: function (value, item) {
            var patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/;
            var res = value.match(patt);
            if (res == null) {
                return '密码必须由8-16位大写字母、小写字母、数字和特殊符号组成！';
            }
        },
        email: function (value, item) {
            var patt = /(^$)|(^[\w_-]+@[\w_-]+[\.a-zA-Z]+[^\.]$)/;
            var res = value.match(patt);
            if (res == null) {
                return '邮箱格式不对，请重新输入！';
            }
        },
        select: function (value) {
            if (value === '')
                return '这里还没选择';
        },
        inputVerify: function (value, item) {
            value = value.trim();
            if (value.length>16) {
                return '长度超过范围，请重新输入！';
            }
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|]/im;
            if (patrn.test(value)) {
                return '不能包含特殊字符，请重新输入！';
            }
        },
        mobile: function (value, item) {
            var patrn =  /(^$)|^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
            if (!patrn.test(value)) {
                return '电话号码格式不对，请重新输入！';
            }
        }
    });

    //监听提交
    form.on('submit(demo1)', function (data) {
        data.field.levelmarkid = vm.user.levelmarkid;
        var arr = document.getElementsByName("roleId");
        //arr是一个数组，就是所有checkbox的值；
        var re = [];
        for (i = 0; i < arr.length; i++) {
            if (arr[i].checked) {
                re[re.length++] = arr[i].value;
            }
        }
        if(!re.length){
            parent.layer.msg("请选择角色！");
            return false;
        }
        data.field['roleIdList'] = re;
        data.field['userlevelmark'] = vm.user.userlevelmark;
        data.field.userextvalue5 = vm.user.userextvalue5;

        //密码加密,新增用户默认密码123456
        data.field.password = $.md5("123456");

        $.ajax({
            url: siteurl + '/sys/user/save',
            type: 'POST',
            data: JSON.stringify(data.field),
            async: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                if (flag == 'web') {
                    parent.app.renderbymuneid('213', siteurl + '/sys/user/searchweblist/');
                    parent.parent.layer.msg("操作成功");
                    parent.app.closeTab('982');
                } else {
                    // 找到需要联动刷新的table所在的window
                    var iframeTemp = parent.layui.$('iframe[src="/sys/user/searchlist"]');
                    // 如果找到了才需要重载，找不到证明没有打开即不需要处理
                    if (iframeTemp.length) {
                        // 找到这个iframe的window
                        iframeTemp = iframeTemp[0].contentWindow;
                        // 用他的页面的window的layui去处理他页面的任务（重载表格）
                        iframeTemp.vm.query(iframeTemp.vm.currentPage,1);
                    }
                    parent.app.tabChange('25');
                    //parent.app.renderbymuneid('25', siteurl + '/sys/user/searchlist/');
                    parent.parent.layer.msg("操作成功");
                    parent.app.closeTab('122');
                }

            },
            error: function (data) {
                alert('查找板块报错');
            }
        });
        return false;
    });

    form.render();
});


var vm = new Vue({
    el: '#main',
    data: {
        flag: ' ',
        showList: true,
        levelname: '',
        stationids: '',
        roleList: [],
        roleNum: '',
        stationnames: '',
        user: {
            status: 1,
            sex: 1,
            roleIdList: [],
            userlevelmark: [],
            userextvalue5: '',
            username: ''
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
        getRoleList: function () {
            $.ajax({
                type: "GET",
                url: siteurl + '/sys/role/select/-1',
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
                layer.msg("所属组织不能为空，请重新选择！");
                return;
            }
            if (nodes.length > 1) {
                layer.msg("所属组织只能选一个，请重新选择！");
                return;
            }
            var bb = "";
            for (var count = 0; count < nodes.length; count++) {
                //  vm.user.levelmarkid+=nodes[count].levelmarkid;
                bb += nodes[count].abname + ";";
            }
            vm.levelname = bb.substring(0, bb.length - 1);
            //vm.user.levelmarkid = nodes[0].levelmarkid;
            //vm.levelname = nodes[0].abname;

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
            //清空stationid值
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
        url: siteurl + '/sys/menu/munesecondlist/',
        type: 'POST',
        async: false,
        data: '',
        success: function (r) {
            var data = r.menuList;
            html = '<option value="">请选择登陆后显示界面</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value=' + data[i].url + '>' + data[i].name + '</option>';
            }
            $("select[name='userextvalue4']").append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
}



