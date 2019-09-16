
var date = new Date();
var defaultStartTime = date.format("yyyy-MM-dd") + ' 00:00:00';
var defaultEndTime = date.format("yyyy-MM-dd") + ' 23:59:59';
$(function () {
    //初始化表格数据

});

//当面页面数据量
var pageNumSize;

layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage, layer = layui.layer;
    var table = layui.table;
    var form = layui.form;
    var laydate = layui.laydate;

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

    //监听提交
    form.on('submit(searchDemo)', function (data) {
        vm.query(1,1);
        return false;
    });

    //日期时间范围
    var startTime = laydate.render({
        elem: '#startTime'
        , type: 'datetime'
        , value: defaultStartTime
        , done: function (value, date) {
            date.month--;
            endTime.config.min = date;
            vm.logSearch.startTime = value;
        }
    });

    var endTime = laydate.render({
        elem: '#endTime'
        , type: 'datetime'
        , value: defaultEndTime
        , done: function (value, date) {
            date.month--;
            startTime.config.max = date;
            vm.logSearch.endTime = value;
        }
    });


    var endTime = laydate.render({
        elem: '#createDate'
        , type: 'datetime'
        , done: function (value, date) {
            date.month--;
            vm.logSearch.createDate = value;
        }
    });

    form.on('select(operationtype)', function (obj) {
        vm.logSearch.operationtype = obj.value;
    });
    form.on('select(result)', function (obj) {
        vm.logSearch.result = obj.value;
    });


    //监听表格复选框选择
    table.on('checkbox(demo)', function (obj) {
    });

    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        var id = data.id;
        var arrId = new Array(1);
        if (obj.event === 'detail') {
            var doms = $('#look input');
            doms[0].setAttribute('value', data.id ? data.id : '');
            doms[1].setAttribute('value', data.ip ? data.ip : '');
            doms[2].setAttribute('value', data.operation ? data.operation : '');
            doms[3].setAttribute('value', data.username ? data.username : '');
            doms[4].setAttribute('value', data.createDate ? data.createDate : '');
            $('#look textarea')[0].innerText = data.method ? data.method : '';
            $('#look textarea')[1].innerText = data.params ? data.params : '';

            var html = document.getElementById('look').innerHTML;
            layer.open({
                type: 1,
                title: '日志详情',
                area: ['640px', '580px'],
                content: html
            });
        }
    });

    var $ = layui.$, active = {
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
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cellMinWidth: 80
            , height: 'full-230'
            , cols: [[
                {templet: function (d) { return d.LAY_INDEX+(vm.currentPage-1)*20;},width:70 }
                /*, {field: 'id', title: 'ID', width: 80, unresize: true, sort: true}*/
                , {field: 'username', width: 130, title: '登录名', sort: false}
                , {field: 'chineseName', width: 130, title: '用户名称', sort: false}
                , {field: 'success', width: 100, title: '成功次数', sort: false}
                , {field: 'fail', width: 100, title: '失败次数', sort: false}
                /*, {field: 'method', title: '方法名'}
                *//*
                , {fixed: 'right', width: 90, align: 'center', toolbar: '#barDemo'}*/
            ]]
            , page: false
            , limit :20
        });
    }
    window.setPage = function (rowCount, curr) {
        laypage.render({
            elem: 'demo7',
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
        logSearch: {
            username: '',
            chineseName: '',
            startTime: defaultStartTime,
            endTime: defaultEndTime,
            operation: '',
            operationtype: '',
            createDate: '',
            ip: '',
            type: '',
            result:''
        },
        MenuOpt: {
            url: '',
            icon: '',
            title: '',
            id: ''
        },
        currentPage: 1
    },
    methods: {
        //新增日志
        query: function (pageNum, isRefreshDB) {
            //onSearch(JSON.stringify(vm.logSearch),pageNum);
            vm.logSearch.username = vm.logSearch.username.trim();
            vm.logSearch.chineseName = vm.logSearch.chineseName.trim();
            vm.logSearch.operation = vm.logSearch.operation.trim();
            vm.logSearch.ip = vm.logSearch.ip.trim();
            $.ajax({
                type: "POST",
                url: siteurl + '/sys/log/analyzeList/' + pageNum,
                data: JSON.stringify(vm.logSearch),//用户数据
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {//判断请求
                        initList(r.page.list);
                        if (isRefreshDB == 1) {
                            setPage(r.page.totalCount);
                        }
                        pageNumSize = r.page.list.length;
                        vm.currentPage = r.page.currPage
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        export: function () {
            downFile2(siteurl + '/sys/log/exportAnalyze', {
                username: vm.logSearch.username.trim(),
                chineseName: vm.logSearch.chineseName.trim(),
                startTime: vm.logSearch.startTime,
                endTime: vm.logSearch.endTime,
                operation: vm.logSearch.operation.trim(),
                createDate: vm.logSearch.createDate,
                ip: vm.logSearch.ip.trim(),
                operationtype: vm.logSearch.operationtype,
                result:vm.logSearch.result
            });

        }
    }
});

function ontestalpha() {
    Hello();
}