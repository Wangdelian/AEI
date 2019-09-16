/**
 * Created by Administrator on 2017/8/7.
 */
//页面加载完毕后执行函数
$(function () {
    //初始化表格数据
    if(vm.levelMark.levelmarkid == undefined){
        vm.getLevelmark(levelmarkid);
    }
});

//Vue对象
var vm = new Vue({
    el: '#main',
    data: {
        levelMark: {
        }
    },
    methods: {
        saveOrUpdate: function (event) {
            var url = vm.levelMark.levelmarkid == null ? siteurl+"/sys/levelmark/save" : siteurl+"/sys/levelmark/update";
            vm.levelMark.pid = pid;
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.levelMark),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功');
                        parent.refreshTab(22);
                        if(vm.levelMark.levelmarkid == null) {
                            parent.CloseTabByContent(69);
                        }
                    } else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        getLevelmark: function (levelmarkid) {
            $.get(siteurl+"/sys/levelmark/info/"+levelmarkid,{"time": new Date().getTime()}, function (r) {
                vm.levelMark = r.levelMark;
            });
        }

    }
});