/**
 * Created by Administrator on 2017/7/20 0020.
 */
/**
 * Created by Administrator on 2017/7/19 0019.
 */
/**
 * Created by Administrator on 2017/7/15 0015.
 */

$(function () {
    /**
     *
     */
    //加载菜单树
    $.get(siteurl+"/sys/menu/perms/"+0, function(r){
        $.fn.zTree.init($("#menuTree"), setting, r.menuList);
        //console.log(r.menuList);
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

var vm = new Vue({
    el:'#main',
    data:{
        q:{
            username: null
        },
        showList: true,
        title:systemname,
        roleList:{},
        role:{
            status:1,
            roleIdList:[],
            menuIdList:[]
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.roleList = {};
            vm.user = {status:1,roleIdList:[]};

            //获取角色信息
            this.getRoleList();
        },
        update: function () {
            var userId = getSelectedRow();
            if(userId == null){
                return ;
            }

            vm.showList = false;
            vm.title = "修改";

            vm.getUser(userId);
            //获取角色信息
            this.getRoleList();
        },
        del: function () {
            var userIds = getSelectedRows();
            if(userIds == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: "../sys/user/delete",
                    contentType: "application/json",
                    data: JSON.stringify(userIds),
                    success: function(r){
                        if(r.code == 0){
                            alert('操作成功', function(index){
                                vm.reload();
                            });
                        }else if(r.msg!=null && r.msg != ""){
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        saveOrUpdate: function (event) {

            //存储权限
            var url = vm.role.roleId == null ? siteurl+"/sys/role/save" : siteurl+"/sys/role/update";
            console.log(vm.role);
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.role),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(index){
                            vm.reload();
                        });
                    }else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        save: function (event) {

            vm.role.menuIdList=perms();
            //存储权限
            var url = siteurl+"/sys/role/save";
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.role),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(index){
                        });
                        parent.refreshTab(ROLE_LIST_INDEX);
                        parent.CloseTabByContent(ROLE_NEWROLE_INDEX);
                    }else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
           /* this.getRole(roleId);*/
        },
        getRole: function(roleId){
            $.get(siteurl+"/sys/role/info/"+roleId, {"time": new Date().getTime()}, function(r){
                vm.role = r.role;
            });
            //获取角色信息
            this.getRoleList();



        },
        getRoleList: function(){
            $.get(siteurl+"/sys/role/select/-1",{"time": new Date().getTime()}, function(r){
                vm.roleList = r.list;
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'username': vm.q.username},
                page:page
            }).trigger("reloadGrid");
        }
    }
});
