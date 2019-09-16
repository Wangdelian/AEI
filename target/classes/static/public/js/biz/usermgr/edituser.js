/**
 *
 *
 */
var setting = {
    check: {
        enable: true,
        chkStyle: "checkbox",
        chkboxType: { "Y": "", "N": "" }
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "levelmarkid",
            pIdKey: "pid",
            rootPId: 0
        },
        key: {
            name: "abname"
        }
    }
};

var vm = new Vue({
    el: '#main',
    data: {
        q: {
            username: null
        },
        showList: true,
        title: systemname,
        levelname:'',
        roleList: [],
        roleNum:'',
        user: {
            status: 1,
            sex:1,
            roleIdList: [],
            userlevelmark:[]
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.roleList = {};
            vm.user = {status: 1, roleIdList: []};

            //获取角色信息
            this.getRoleList();
        },
        update: function () {
            var userId = getSelectedRow();
            if (userId == null) {
                return;
            }

            vm.showList = false;
            vm.title = "修改";

            vm.getUserInfo(userId);
            //获取角色信息
            this.getRoleList();
        },
        del: function () {
            var userIds = getSelectedRows();
            if (userIds == null) {
                return;
            }

            parent.parent.layer.confirm('确定要删除选中的记录？', {icon: 7, shade: 0.3, btn: ['确认', '取消']}, function () {
                $.ajax({
                    type: "POST",
                    url: "../sys/user/delete",
                    contentType: "application/json",
                    data: JSON.stringify(userIds),
                    success: function (r) {
                        if (r.code == 0) {
                            parent.parent.layer.msg('操作成功')
                            setTimeout(function () {
                                vm.reload()
                            }, 1000);
                        } else if(r.msg!=null && r.msg != ""){
                            parent.parent.layer.alert(r.msg, {shade: 0.3});
                        }
                    }
                });
            });
        },
        saveOrUpdate: function (event) {
            if(userId == null && vm.user.userlevelmark == ''){
                alert("所属机构不能为空！");
                return ;
            }


            //存储权限
            if (vm.user)
                var url = vm.user.userId == null ? siteurl + "/sys/user/save" : siteurl + "/sys/user/update";

            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.user),
                success: function (r) {
                    if (r.code === 0) {
                        parent.parent.layer.msg('操作成功');
                        setTimeout(function () {
                            /*onReturn();*/
                            parent.refreshTab(USER_LIST_INDEX);
                            if (vm.user.userId == null) {
                                parent.CloseTabByContent(USER_NEWUSER_INDEX);
                            } else {
                                parent.CloseTabByContent(USER_EDITUSER_INDEX);
                            }
                        }, 1000);

                    } else if(r.msg!=null && r.msg != ""){
                        parent.parent.layer.alert(r.msg, {shade: 0.3});
                    }
                }
            });
            /*this.getUserInfo(userId);*/
        },
        getUserInfo: function (userId) {
            $.get(siteurl + "/sys/user/info/" + userId, {"time": new Date().getTime()}, function (r) {
                r.user.password = "";
                vm.user = r.user;

                vm.levelname = r.abname;
            });
            //获取角色信息
            this.getRoleList();

        },
        getRoleList: function () {
            $.get(siteurl + "/sys/role/select/" + userId,{"time": new Date().getTime()}, function (r) {
                vm.roleList = r.list;
                var len = r.list.length;
                vm.roleNum = Math.ceil(len/4);  //向上取整
            });
        },
        getlevelmark: function () {
            document.getElementById("black_overlay").style.display='block';
            document.getElementById("content").style.display='block' ;

        },
        cancel: function(){
            var treeObj = $.fn.zTree.getZTreeObj("menuTree");
            var nodes = treeObj.getCheckedNodes(true);

            if(nodes == '') {
                alert("所属组织不能为空！");
                return ;
            }
            document.getElementById("content").style.display='none' ;
            document.getElementById("black_overlay").style.display='none';
        },
        //获取选择结果
        selected:function(){
            var treeObj = $.fn.zTree.getZTreeObj("menuTree");
            var nodes = treeObj.getCheckedNodes(true);

            if(nodes == '') {
                parent.parent.layer.alert("所属组织不能为空！");
                return ;
            }
            var bb="";
            for(var count=0; count< nodes.length;count++){
              //  vm.user.levelmarkid+=nodes[count].levelmarkid;
              bb += nodes[count].abname+";";
            }
            vm.levelname =bb.substring(0,bb.length-1);
            vm.user.levelmarkid =  nodes[0].levelmarkid;
            //vm.levelname = nodes[0].abname;

            //构造将要存储的用户机构表
            var list = new Array(nodes.length);
            for(var i = 0; i < nodes.length; i++) {
                list[i] = nodes[i].levelmarkid;
            }
            vm.user.userlevelmark = list;
            vm.cancel();
        },
        //初始化结构树
        getTree:function (userId) {
            $.get(siteurl+"/sys/user/getlevel/"+userId, {"time": new Date().getTime()},function(r){
                $.fn.zTree.init($("#menuTree"), setting, r.levelMarkList);
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'username': vm.q.username},
                page: page
            }).trigger("reloadGrid");
        }
    }
});

$(function () {
    if(userId != null){
        vm.getTree(userId);
        vm.getUserInfo(userId);
    }
    else
        vm.getTree(0);
});