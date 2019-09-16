/**
 * Created by hh on 2017/7/18.
 */
//Vue对象

$(function () {
    if(vm.syslog.id == undefined)
        vm.getLog(id);
});

var vm = new Vue({
    el:'#main',
    data:{
        syslog :{
            createDate:new Date().getTime()
        },
    },
    methods: {
        //新增或者修改
        saveOrUpdate: function (event) {

            //存储权限
            var url = vm.syslog.id == null ? siteurl+"/sys/log/save" : siteurl+"/sys/log/update";

            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.syslog),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功');
                        parent.refreshTab(23);
                        if(vm.syslog.id == null) {
                            parent.CloseTabByContent(60);
                        } else {
                            parent.CloseTabByContent(59);
                        }
                    }else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        //获取日志信息
        getLog: function(id){
            $.get(siteurl+"/sys/log/info/"+id, {"time": new Date().getTime()}, function(r){
                vm.syslog = r.syslog;

            });

        }
    }
});