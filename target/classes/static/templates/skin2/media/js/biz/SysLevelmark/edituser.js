/**
 *hezhenmei
 *
 */
function initZtree() {
    var setting = {
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType : { "Y" : "", "N" : "" }
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

    for (var i=0, l=nodes.length; i < l; i++) {
        var node = treeObj.getNodeByParam("levelmarkid", nodes[i], null);
        treeObj.checkNode(node, true, true);
    }
}

var form = null;

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

        if($("#password").val() != null){
            data.field.password = $("#password").val();
        }

        parent.app.closeTab('1');
        $.ajax({
            url: siteurl+'/sys/user/update',
            type: 'POST',
            data: JSON.stringify(data.field),
            async: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                var MenuOpt = {
                    url: siteurl+'/sys/levelmark/searchlist/',
                    icon: '&#xe6c6;',
                    title: '组织机构',
                    id: '3'
                };
                parent.app.addTab(MenuOpt);
                parent.parent.layer.msg("操作成功");
               /* parent.app.closeTab('31');*/

            },
            error: function (data) {
                alert('查找板块报错');
            }
        });
        return false;
    });

    form.on('radio(filter1)', function(data){
        //layui-form-radioed禁用
        vm.user.status = data.value;
    });

    form.on('radio(filter2)', function(data){
        //layui-form-radioed女
        vm.user.sex = data.value;
    });
});

var vm = new Vue({
    el: '#main',
    data: {
        showList: true,
        levelname: '',
        roleList: [],
        roleNum: '',
        sel:'',
        user: {
            status: 1,
            sex: 1,
            roleIdList: [],
            userlevelmark: []
        },
        zNodes:[]
    },
    watch:{
        zNodes: function () {
            this.$nextTick(function () {
                form.render()
            })
        }
    },
    methods: {
        //获取用户信息
        getUserInfo: function (userId) {
            $.ajax({
                type: "GET",
                url: siteurl + '/sys/user/info/' + userId,
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    vm.user = r.user;
                    vm.sel = r.abname;
                    $("#levelname").val(r.abname);
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
            vm.levelname =bb.substring(0,bb.length-1);

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
            vm.user.levelmarkid = list.substring(0,list .length-1);
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
