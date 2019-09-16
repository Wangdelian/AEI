/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JQuery版本：
 *Vue.js版本：
 *公司名称：
 *命名空间：io.jeasyframework.controller
 *文件名：  sysloglist.js
 *版本号：  V1.0.0.0
 *创建人：  liming
 *电子邮箱：daixirui@live.com
 *创建时间：2017/12/27 15:39
 *描述：
 *
 /******************************************************/
/*声明layui的变量*/

layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage, layer = layui.layer;
    var table = layui.table;
    form = layui.form;
    var laydate = layui.laydate;
    //开启时间
    laydate.render({
        elem: '#datecreated'
        , type: 'datetime'
        , done: function (value, date) {
            vm.logSearch.datecreated = value;
        }
    });

    //关闭时间
    laydate.render({
        elem: '#dateclose'
        , type: 'datetime'
        , done: function (value, date) {
            vm.logSearch.dateclose = value;
        }

    });

    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cellMinWidth: 80
            , height: 'full-160'
            , cols: [[{type: 'numbers'}
                , {field: 'productiondeptname', width: 130, title: '生产单位', align: "center"}
                , {field: 'productionlinename', width: 130, title: '生产线', align: "center"}
                , {field: 'pregion', width: 130, title: '区域', align: "center"}
                , {field: 'pstation', width: 130, title: '采集点', align: "center"}
                , {field: 'enginemodel', width: 130, title: '系列', align: "center"}
                , {field: 'engineno', width: 130, title: '发动机号码', align: "center"}
                , {field: 'icc', width: 130, title: 'ICC', align: "center"}
                , {field: 'itempart', width: 130, title: '部位', align: "center"}
                , {field: 'failuremodel', width: 130, title: '失效模式', align: "center"}
                , {field: 'issuedesc', width: 130, title: '问题描述', align: "center"}
                , {field: 'repaircontent', width: 130, title: '维修方法', align: "center"}
                , {field: 'issuestatus', width: 130, title: '状态', align: "center"}
                , {field: 'dateclose', width: 130, title: '关闭时间', align: "center"}
                , {field: 'closebyname', width: 130, title: '关闭人', align: "center"}
                , {field: 'closeby', width: 130, title: '关闭人ID', align: "center"}
                , {field: 'createdbyname', width: 130, title: '记录人', align: "center"}
                , {field: 'createdbyid', width: 130, title: '记录人ID', align: "center"}
                , {field: 'datecreated', width: 130, title: '创建时间', align: "center"}
                , {field: 'modifiedbyname', width: 130, title: '最后一次修改人', align: "center"}
                , {field: 'modifiedbyid', width: 130, title: '最后一次修改人ID', align: "center"}
                , {field: 'datemodified', width: 130, title: '最后一次修改时间', align: "center"}
                , {field: 'isenable', width: 130, title: '是否删除', align: "center"}
                , {field: 'iscp', width: 130, title: 'campaign标签', align: "center"}
                , {field: 'icccode', width: 150, title: 'icc编码', align: "center"}
                , {field: 'issueremark', width: 150, title: '备注', align: "center"}
                , {field: 'isonline', width: 165, title: '是否在线', align: "center"}
                , {field: 'issueattr', width: 130, title: '问题属性', align: "center"}
                , {field: 'partsbarcode', width: 130, title: '换件条码', align: "center"}
                , {field: 'dateclosestring', width: 130, title: '关闭时间', align: "center"}
                , {field: 'enginetype', width: 130, title: '机型', align: "center"}
                , {field: 'isreproduced', width: 130, title: '是否重现', align: "center"}
            ]]
            , page: false
        });
    }
    window.setPage = function (rowCount) {
        laypage.render({
            elem: 'pagination'
            , count: rowCount
            , layout: ['count', 'prev', 'page', 'next', 'skip']
            , jump: function (obj, first) {
                if (!first) {
                    vm.query(obj.curr, 0);
                    //console.log(obj.curr);
                }
            }
        });
    }
    window.onSearch = function (conditionObj, pageNum) {

    }
    //table列表入口
    vm.query(1, 1);
    //进行渲染
    form.render();
});
var vm = new Vue({
    el: '#main',
    data: {
        logSearch: {
            engineno: '',
            icc: '',
            datecreated: '',
            dateclose: ''
        },
        MenuOpt: {
            url: '',
            icon: '',
            title: '',
            id: ''
        }
    },
    methods: {
        //得到参数
        query: function (pageNum, isRefreshDB) {
            $.ajax({
                type: "POST",
                url: siteurl + '/mqs/mqsissue/tablelist/' + pageNum,
                data: JSON.stringify(vm.logSearch),//用户数据
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    // console.log(r);
                    if (r.code === 0) {//判断请求
                        console.log(r.page.list);

                        /*开始构造数据列表*/
                        initList(r.page.list);

                        if (isRefreshDB == 1) {
                            setPage(r.page.totalCount);
                        }
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        /*
        *导出表格
        */
        export: function () {
            downFile2(siteurl + '/mqs/mqsissue/export', {
                icc: $('#icc').val(),
                datecreated: $('#datecreated').val(),
                dateclose: $('#dateclose').val(),
                engineno: $('#engineno').val()
            });
        }
    }
});
