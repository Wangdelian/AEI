/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JQuery版本：
 *Vue.js版本：
 *公司名称：
 *命名空间：io.jeasyframework.controller
 *文件名：  sysloglist.js
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/12/12 15:39
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/12/12 15:39
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018/3/19 9:15
 *修改人：  hezhenmei
 *版本号：  V2.0.0.0
 *描述：
 *
 /******************************************************/
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

    //监听提交
    form.on('submit(jumpreport)', function (data) {
        parent.app.addTab({
            url: siteurl + '/sys/log/analyze',
            icon: '&#xe62d;',
            title: '日志分析',
            id: '135'
        });
        return false;
    });


    //监听表格复选框选择
    table.on('checkbox(demo)', function (obj) {
        console.log(obj)
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
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            console.log(JSON.stringify(data));
            if (data.length > 0) {
                var arrId = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    arrId[i] = data[i].id;
                }
                layer.confirm('确认删除么', function (index) {
                    vm.del(arrId);
                    layer.close(index);
                });
            } else {
                layer.msg("您还未选中任何数据");
            }
        }
        , getCheckLength: function () { //获取选中数目
            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            layer.msg('选中了：' + data.length + ' 个');
        }
        , isAll: function () { //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            layer.msg(checkStatus.isAll ? '全选' : '未全选')
        }
        , SearchList: function () {
            //查询按钮触发
            vm.update(16);
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
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cellMinWidth: 80
            , height: 'full-230'
            , cols: [[
                {templet: function (d) { return d.LAY_INDEX+(vm.currentPage-1)*20;},width:70 }
                /*, {field: 'id', title: 'ID', width: 80, unresize: true, sort: true}*/
                , {field: 'username', width: 120, title: '登录名', sort: false}
                , {field: 'chineseName', width: 120, title: '用户名称', sort: false}
                , {field: 'operationtype', width: 120, title: '操作类型', sort: false}
                , {field: 'operation', width: 180, title: '操作描述', sort: false}
                , {field: 'result', width: 120, title: '操作结果', sort: false}
                , {field: 'ip', width: 120, title: '操作IP', templet: '#usernameTpl'}
                , {field: 'createDate', width: 170, title: '时间', sort: false}
                , {field: 'params', width: 200,title: '参数', sort: false}
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
                    console.log(vm.currentPage)
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
                url: siteurl + '/sys/log/list/' + pageNum,
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
        del: function (arrId) {
            //删除功能说明
            //支持数组、单个id传入，删除后会跳转到第一页

            //数据转换
            //判断传入的数据为单个或多个，转换为json格式，key以0开始
            var jsonData = {};
            if (arrId.length != undefined)
                for (var i = 0; i < arrId.length; i++) {
                    jsonData[i] = arrId[i];
                }
            else
                jsonData[0] = arrId;

            $.ajax({
                type: "POST",
                url: siteurl + '/sys/log/deleteBatch',
                data: JSON.stringify(jsonData),
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
                        parent.parent.layer.alert(r.msg)
                    }
                }
            });
        },
        //修改日志
        update: function (id) {

        },
        export: function () {
            downFile2(siteurl + '/sys/log/export', {
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