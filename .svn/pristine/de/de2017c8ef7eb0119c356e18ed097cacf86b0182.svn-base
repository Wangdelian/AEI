$(function () {
    //初始化表格数据
});

//当面页面数据量
var pageNumSize;


layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    laypage = layui.laypage;
    layer = layui.layer;
    table = layui.table;
    form = layui.form;
    laydate = layui.laydate;
    form.verify({
        inputVerify: function (value, item) {
            value = value.trim();
            if (value.length>16) {
                return '长度超过范围，请重新输入！';
            }
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|]/im;
            if (patrn.test(value)) {
                return '不能包含特殊字符，请重新输入！';
            }
        }
    });

    //监听表格复选框选择
    table.on('checkbox(demo)', function (obj) {

    });
    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        var roleId = data.roleId;
        var arrId = new Array(1);
        if (obj.event === 'del'&& data.roleName!='管理员') {
            parent.layer.confirm('确认删除么', function (index) {
                arrId[0] = roleId;
                obj.del();
                vm.del(arrId);
                parent.layer.close(index);
            });
        }else if(obj.event === 'del'&& data.roleName==='管理员'){
            parent.layer.msg("不能对管理员进行删除操作！");
        }
        else if (obj.event === 'edit'&& data.roleName!='管理员') {

            vm.MenuOpt.url = siteurl +'/sys/role/edit/' + data.roleId;
            vm.MenuOpt.icon = '&#xe6c6;';
            vm.MenuOpt.title = '编辑角色';
            vm.MenuOpt.id = '1002';
            parent.app.addTab(vm.MenuOpt);
        } else if(obj.event === 'edit'&& data.roleName==='管理员'){
            parent.layer.msg("不能对管理员进行编辑操作！");
        }
    });

    var $ = layui.$, active = {
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('idTest'), data = checkStatus.data;
            if (data.length > 0) {
                var arrId = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    arrId[i] = data[i].roleId;
                }
                parent.layer.confirm('确认删除么', function (index) {
                    vm.del(arrId);
                    parent.layer.close(index);
                });
            } else {
                parent.layer.msg("您还未选中任何数据");
            }
        },
        getCheckLength: function () { //获取选中数目
            var checkStatus = table.checkStatus('idTest'),
                data = checkStatus.data;
            parent.layer.msg('选中了：' + data.length + ' 个');
        },
        addrole: function () {
            vm.MenuOpt.url = siteurl +'/sys/role/add';
            vm.MenuOpt.icon = '&#xe6c6;';
            vm.MenuOpt.title = '新增角色';
            vm.MenuOpt.id = '1003';
            parent.app.addTab(vm.MenuOpt);
            if(window.event){
                window.event.returnValue = false;
            }
            else{
                e.preventDefault();//for firefox
            }
        },
        isAll: function () { //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            parent.layer.msg(checkStatus.isAll ? '全选' : '未全选')
        },
        SearchList: function () {
            //查询按钮触发
            vm.update(24);
        }
    };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $('.layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    window.Hello = function (listdata) {
        //查询按钮触发
        table.reload('idTest', {
            data: listdata
        });

    }
    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test',
            id: 'idTest',
            data: listdata,
            cellMinWidth: 80,
            height: 'full-130',
            cols: [[
                {templet: function (d) { return d.LAY_INDEX+(vm.currentPage-1)*20;},width:30 },
                {type: 'checkbox'},
                {field: 'roleName',title: '角色名称', width: 250},
                {field: 'createTime', title: '创建时间',width: 170},
                {field: 'remark', title: '备注'},
                {fixed: 'right', title: '操作', width: 220, align: 'center', toolbar: '#barDemo'}
            ]],
            page: false,
            limit: 20
        });
    }
    window.setPage = function (rowCount, curr) {
        laypage.render({
            elem: 'pagination',
            count: rowCount,
            curr: curr,
            layout: ['count', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                vm.currentPage = obj.curr;
                if (!first) {
                    vm.query(vm.currentPage, 0);
                }
            }
        });
    }
    //监听提交
    form.on('submit(demo1)', function (data) {
        vm.role = data.field;
        vm.query(1, 1);
        return false;
    });
    //列表入口
    vm.query(1, 1);
    form.render();

    // form.on('select(condition1)', function (data) {
    //     console.log(data);
    //     vm.role.roleParentId =
        // debugger
        // if (data.value != '') {
        //     addProductlineOption(data.value);
        // }
        // if (data.value == '') {
        //     html = '';
        //     html += '<option value="">搜索或选择</option>';
        //     $("select[name='applypline']").empty().append(html);
        // }
        // form.render()
    // });
});
var vm = new Vue({
    el: '#main',
    data: {
        role: {
            roleId: '',
            roleParentId: '',
            roleParentName: '',
            roleType: '',
            roleIcon: '',
            roleSeq: '',
            roleName: '',
            remark:'',

        },
        MenuOpt: {
            url: '',
            icon: '',
            title: '',
            id: ''
        },
        // MenuOpt: {
        //     url: siteurl+'/sys/role/searchlist/',
        //     icon: '&#xe6c6',
        //     title: '角色管理',
        //     id: '2'
        // },
        currentPage: 1
    },
    methods: {
        //新增日志
        query: function (pageNum, isRefreshDB) {
            vm.currentPage = pageNum;
            vm.role.roleName = vm.role.roleName.trim();
            $.ajax({
                type: "POST",
                url: siteurl + '/sys/role/list/' + pageNum,
                data: JSON.stringify(vm.role),//用户数据
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {//判断请求
                        initList(r.page.list);
                        if (isRefreshDB == 1) {
                            setPage(r.page.totalCount, pageNum);
                        }
                        pageNumSize = r.page.list.length;
                    } else {
                        parent.layer.msg(r.msg);
                    }
                }
            });
        },
        //修改日志
        update: function (id) {

        },
        del: function (arrId) {
            $.ajax({
                type: "POST",
                url: siteurl + '/sys/role/delete/',
                data: JSON.stringify(arrId),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        parent.layer.msg("删除操作成功！");
                        if ((pageNumSize - arrId.length) > 0) {
                            vm.query(vm.currentPage, true);
                        } else {
                            vm.query(vm.currentPage - 1, true);
                        }
                    } else {
                        parent.layer.alert(r.msg)
                    }
                }
            });
        },
        add: function () {

        }

    }
});