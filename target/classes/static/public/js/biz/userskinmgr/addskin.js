/**
 * Created by hh on 2017/7/26.
 */
/**
 * Created by hh on 2017/7/19.
 */
//页面加载完毕后执行函数
$(function () {
    //初始化表格数据
    if(vm.userskin.userskinid == undefined){
        vm.getUserSkin(userskinid);
    }
});

//Vue对象
var vm = new Vue({
    el: '#main',
    data: {
        userskin: {
            isdefault:1,
        }
    },
    methods: {
        saveOrUpdate: function (event) {
            var url = vm.userskin.userskinid == null ? siteurl+"/sys/userskin/save" : siteurl+"/sys/userskin/update";
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.userskin),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功');
                        parent.refreshTab(35);
                        if(vm.userskin.userskinid == null) {
                            parent.CloseTabByContent(62);
                        } else {
                            parent.CloseTabByContent(61);
                        }
                    } else  if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        getUserSkin: function (userskinid) {
            $.get(siteurl+"/sys/userskin/info/"+userskinid,{"time": new Date().getTime()}, function (r) {
                vm.userskin = r.userskin;
            });
        }

    }
});
