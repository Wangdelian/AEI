/**
 * Created by Administrator on 2017/8/2 0002.
 */

//Vue对象
var vm = new Vue({
    el: '#main',
    data: {
        q: {
            username: null
        },
        showList: true,
        title: systemname,
        roleList: {},
        user: {
            status: 1,
            roleIdList: []
        },
        modify:{
            oldPass:$('#pass').val(),
            newPass1:'',
            newPass2:''
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        getUserInfo: function () {
            $.get(siteurl + "/sys/user/passinfo" , {"time": new Date().getTime()}, function (r) {
                vm.user = r.user;
            });
        },
        save: function(){
            vm.modify.oldPass=vm.user.password;
            if(vm.modify.newPass1==0){
                parent.parent.layer.msg('新密码必须填写！');
                return;
            }else if(vm.modify.newPass2==0){
                parent.parent.layer.msg('确认新密码必须填写！');
                return;
            }else if(vm.modify.newPass1!=vm.modify.newPass2){
                parent.parent.layer.msg('确认密码必须与新密码相同！');
                return;
            }else {
                $.ajax({
                    type: "POST",
                    url: siteurl+'/sys/user/password',
                    data:JSON.stringify(vm.modify),
                    async: false,
                    dataType: "json",
                    contentType:'application/json;charset=UTF-8',
                    success: function(r){
                        if(r.code === 0){
                            parent.parent.layer.msg('密码修改成功,下次登录生效！');
                            location.reload();
                            parent.app.closeTab(5);
                        }else if(r.msg!=null && r.msg != ""){
                            parent.parent.layer.msg(r.msg);
                        }
                    }
                });
            }
        }

    }
});

$(function () {
    vm.getUserInfo();
});