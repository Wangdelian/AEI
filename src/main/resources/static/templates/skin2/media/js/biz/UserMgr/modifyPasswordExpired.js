/**
 * Created by Administrator on 2017/8/2 0002.
 */
layui.use(['form'], function () {
    var form = layui.form;
    form.verify({
        password: function (value, item) {
            var patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/;
            var res = value.match(patt);
            if (res == null) {
                return '密码必须由8-16位大写字母、小写字母、数字和特殊符号组成！';
            }
            //判断新密码是否重复
            vm.queryPassword(value);
            if (vm.pwFlag) {
                return '新密码不能与最近密码重复，请重新设置！';
            }
        },
        rightPass: function (value, item) {
            if($.md5(value)!=vm.user.password){
                return "原密码错误！";
            }
        }
    });
    //监听提交
    form.on('submit(demo1)', function (data) {
        vm.save();
        return false;
    });
});



//Vue对象
var vm = new Vue({
    el: '#main',
    data: {
        //判断密码是否重复，1为重复
        pwFlag:'',
        q: {
            username: null
        },
        showList: true,
        title: systemname,
        roleList: {},
        user: {
            username: '',
            password: '',
            newPass1: '',
            newPass2: ''
        },
        modify:{
            username: '',
            password: '',
            newPass1:'',
            newPass2:''
        }
    },
    methods: {
        //判断新密码是否与最近5次重复
        queryPassword: function (password) {
            $.ajax({
                type: 'post',
                url: siteurl + '/sys/user/queryPassword/',
                cache: false,
                async: false,
                data: JSON.stringify({password:$.md5(password)}),
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        if (r.pwFlag != null) {
                            vm.pwFlag = 1;
                        } else {
                            vm.pwFlag = 0;
                        }
                    } else {
                        alert("请联系管理员");
                    }
                }
            });
        },
        query: function () {
            vm.reload();
        },
        getUserInfo: function () {

            $.get(siteurl + "/sys/user/passinfo" , {"time": new Date().getTime()}, function (r) {
                vm.user = r.user;
            });
        },
        save: function(){
            // vm.modify.password=vm.user.password;
            vm.modify.username=vm.user.username;
            if($.md5(vm.modify.password)!=vm.user.password){
                parent.parent.layer.msg('原密码错误！');
                return;

            }else if(vm.modify.newPass1==0){
                parent.parent.layer.msg('新密码必须填写！');
                return;
            }else if(vm.modify.newPass2==0){
                parent.parent.layer.msg('确认新密码必须填写！');
                return;
            }else if(vm.modify.newPass1!=vm.modify.newPass2){
                parent.parent.layer.msg('确认密码必须与新密码相同！');
                return;
            }else {
                //密码加密
                vm.modify.password=$.md5(vm.modify.password);
                vm.modify.newPass1=$.md5(vm.modify.newPass1);
                $.ajax({
                    type: "POST",
                    url: siteurl+'/sys/user/password',
                    data:JSON.stringify(vm.modify),
                    async: false,
                    dataType: "json",
                    contentType:'application/json;charset=UTF-8',
                    success: function(r){
                        if(r.code === 0){
                                top.location.href = "/login";
                            //toMian();
                            /*parent.location.href = '/sys/homepage/main';
                            if(window.event){
                                window.event.returnValue = false;
                            }
                            else{
                                e.preventDefault();//for firefox
                            }*/
                            /*parent.parent.layer.msg('密码修改成功,下次登录生效！');
                            location.reload();
                            parent.app.closeTab(5);*/
                        }else{
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
    /*
    window.location.assign(siteurl+'sys/homepage/main');
    window.event.returnValue=false;*/
});
function toMian(){
    var form = $("<form></form>").attr("action", '../homepage/main').attr("method", "post");
    form.appendTo('body').submit().remove();
}
