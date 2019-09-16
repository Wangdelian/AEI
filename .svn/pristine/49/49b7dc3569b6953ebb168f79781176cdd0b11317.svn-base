/**
 * Created by hh on 2017/7/19.
 */
//Vue对象
var vm = new Vue({
    el:'#main',
    data:{
        syslog :{
            createDate:new Date().getTime(),
        },
    },
    methods: {
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
                        alert('添加成功', function(index){
                            vm.reload();
                        });
                    }else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
    }
});
