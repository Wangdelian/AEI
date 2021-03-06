$(function () {
    /**
     *
     */
    //加载菜单树
    $.get(siteurl+"/sys/menu/perms/"+0, function(r){
        $.fn.zTree.init($("#menuTree"), setting, r.menuList);
    });

    vm.getRoleList();
});

/**
 *
 *
 */
var setting = {
    check: {
        enable: true,
        chkStyle: "checkbox",
        chkboxType: { "Y": "ps", "N": "ps" }
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "menuId",
            pIdKey: "parentId",
            rootPId: 0
        },
        key: {
            url:""
        }
    }
};

function perms(){
    var treeObj = $.fn.zTree.getZTreeObj("menuTree");
    var nodes = treeObj.getCheckedNodes(true);

    var list = new Array(nodes.length);
    for(var i = 0; i < nodes.length; i++) {
        list[i] = nodes[i].menuId;
    }
    return list;
}

var form = null;

layui.use(['laypage', 'layer', 'form', 'laydate'], function () {
    var laypage = layui.laypage
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , table = layui.table;
    form = layui.form;

    form.verify({
        roleName: function (value, item) {
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
            vm.queryRoleName(value);
            if (vm.flag) {
                return '角色名称已经存在，请重新输入！';
            }
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
        inputRemarkVerify: function (value, item) {
            value = value.trim();
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|]/im;
            if (patrn.test(value)) {
                return '不能包含特殊字符，请重新输入！';
            }
        }
    });

    //监听提交
    form.on('submit(demo1)', function(data){

        data.field['menuIdList'] = perms();

        $.ajax({
            url: siteurl+'/sys/role/save',
            type: 'POST',
            data: JSON.stringify(data.field),
            async: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                 // 找到需要联动刷新的table所在的window
                var iframeTemp = parent.layui.$('iframe[src="/sys/role/searchlist"]');
                // 如果找到了才需要重载，找不到证明没有打开即不需要处理
                if (iframeTemp.length) {
                    // 找到这个iframe的window
                    iframeTemp = iframeTemp[0].contentWindow;
                    // 用他的页面的window的layui去处理他页面的任务（重载表格）
                    iframeTemp.vm.query(iframeTemp.vm.currentPage,1);
                }
                parent.app.tabChange('26');
                //parent.app.renderbymuneid('26', siteurl + '/sys/role/searchlist/');
                parent.layer.msg("操作成功");
                parent.app.closeTab('1003');

            },
            error: function (data) {
                parent.parent.layer.msg('查找板块报错');
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
        roleList:[],
        role:{
            status:1,
            roleIdList:[],
            menuIdList:[]
        }
    },
    methods: {
        getRoleList: function () {
            // $.get(siteurl+"/sys/role/select/-1",{"time": new Date().getTime()}, function(r){
            //     vm.roleList = r.list;
            // });

            $.ajax({
                type: "GET",
                url: siteurl + '/sys/role/select/-1',
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    vm.roleList = r.list;
                    var html = '';
                    for (var i = 0; i < vm.roleList.length; i++) {
                        html += '<option value=' + vm.roleList[i].roleId + '>' + vm.roleList[i].roleName + '</option>';
                    }
                    $("select[name='roleParentId']").append(html);
                }
            });
        },
        queryRoleName: function (roleName) {
            $.ajax({
                type: 'POST',
                url: siteurl + '/sys/role/queryRoleName',
                cache: false,
                async: false,
                data: JSON.stringify({roleName:roleName}),
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        if (r.list.length>0) {
                            vm.flag = 1;
                        } else {
                            vm.flag = 0;
                        }
                    } else {
                        parent.parent.layer.msg("请联系管理员");
                    }
                }
            });
        },
        //初始化结构树
        getTree:function () {
            $.get(siteurl+"/sys/role/getlevel/-1", {"time": new Date().getTime()},function(r){
                $.fn.zTree.init($("#menuTree1"), setting1, r.levelMarkList);
            });

        }
    }
});

