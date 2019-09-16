$(function () {
    //初始化表格数据
});

//当面页面数据量
var pageNumSize;

layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage
    var layer = layui.layer;
    var table = layui.table;
    var form = layui.form;


    //监听表格复选框选择
    table.on('checkbox(demo)', function (obj) {

    });
    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        var stationid = data.stationid;
        var arrId = new Array(1);
        if (obj.event === 'del') {
            layer.confirm('确认删除么', function (index) {
                arrId[0] = stationid;
                obj.del();
                vm.del(arrId);
                layer.close(index);
            });
        }else if(obj.event === 'edit'){
            vm.MenuOpt.url=siteurl +'/mqs/mqsstation/editstation/'+data.stationid;
            vm.MenuOpt.icon='&#xe6c6;';
            vm.MenuOpt.title='编辑采集点';
            vm.MenuOpt.id='211';

            parent.app.closeTab('211');
            parent.app.addTab(vm.MenuOpt);
        }
    });

    var $ = layui.$, active = {
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('idTest'), data = checkStatus.data;
            if (data.length > 0) {
                var arrId = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    arrId[i] = data[i].stationid;
                }
                layer.confirm('确认删除么', function (index) {
                    vm.del(arrId);
                    layer.close(index);
                });
            }else {
                layer.msg("您还未选中任何数据");
            }
        },
        getCheckLength: function () { //获取选中数目
            var checkStatus = table.checkStatus('idTest'),
                data = checkStatus.data;
            layer.msg('选中了：' + data.length + ' 个');
        },
        addstation: function(){
            vm.MenuOpt.url=siteurl +'/mqs/mqsstation/addstation/';
            vm.MenuOpt.icon='&#xe6c6;';
            vm.MenuOpt.title='新增采集点';
            vm.MenuOpt.id='222';

            parent.app.closeTab('222');
            parent.app.addTab(vm.MenuOpt);
        },
        isAll: function () { //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            layer.msg(checkStatus.isAll ? '全选' : '未全选')
        },
        SearchList: function () {
            //查询按钮触发
            vm.update(22);
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
                {type: 'numbers'},
                {type: 'checkbox'},
                {field: 'stationcode',title: '采集点编码', templet: '#usernameTpl'},
                {field: 'stationname',title: '采集点名称', templet: '#usernameTpl'},
                {field: 'regionid',title: '所属区域'},
                {field: 'productionlineid', title: '所属生产线'},
                {field: 'productiondeptname',title: '所属生产单位'},
                {field: 'remark',title: '备注'},
                {fixed: 'right', title: '操作', width: 220, align: 'center', toolbar: '#barDemo'}
            ]],
            page: false
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
    window.onSearch = function (conditionObj, pageNum) {

    }
    //列表入口
    vm.query(1, 1);

});
var vm = new Vue({
    el: '#main',
    data: {
        station: {
            stationcode: ''
        },
        MenuOpt: {
            url:'',
            icon:'',
            title:'',
            id:''
        },
        currentPage: 1
    },
    methods: {
        //新增日志
        query: function (pageNum, isRefreshDB) {
            //onSearch(JSON.stringify(vm.logSearch),pageNum);
            $.ajax({
                type: "POST",
                url: siteurl + '/mqs/mqsstation/stationlist/' + pageNum,
                data: JSON.stringify(vm.station),//用户数据
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
                        alert(r.msg);
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
                url: siteurl + '/mqs/mqsstation/delete/',
                data: JSON.stringify(arrId),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        parent.parent.layer.msg("删除操作成功！");
                        if ((pageNumSize - arrId.length) > 0) {
                            vm.query(vm.currentPage, true);
                        } else {
                            vm.query(vm.currentPage - 1, true);
                        }
                    } else {
                        parent.parent.layer.alert(r.msg)
                    }
                }
            });
        },
        add: function (){

        }

    }
});

function ontestalpha() {
    Hello();
}