/**
 * Created by Administrator on 2017/7/15 0015.
 */

$(function () {
    $('#cronCreat').hide();
    vm.getSchedule(jobId);
});
var vm = new Vue({
    el:'#main',
    data:{
        q:{
            username: null
        },
        showList: true,
        title:systemname,
        roleList:{},
        schedule:{
            status:1,
            roleIdList:[]
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
            vm.schedule.cronExpression=$('#cronExpression').val();
            //存储权限
            var url = vm.schedule.jobId == null ? siteurl+"/sys/schedule/save" : siteurl+"/sys/schedule/update";

            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.schedule),
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
            this.getSchedule(jobId);
        },
        getSchedule: function(jobId){
            $.get(siteurl+"/sys/schedule/info/"+jobId, {"time": new Date().getTime()}, function(r){

                vm.schedule = r.schedule;
                console.log(vm.schedule);
            });
            //获取角色信息
            this.getRoleList();
        },
        getRoleList: function(){
            $.get(siteurl+"/sys/role/select", function(r){
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
/**
 * 时间
 */
