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

    addOption();
    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cellMinWidth: 80
            , height: 'full'
            , cols: [[{type: 'numbers'}
                 , {field: 'datecreated', width: 180, title: '发生时间', align: "center"}
                , {field: 'productiondeptname', width: 130, title: '生产单位', align: "center"}
                , {field: 'productionlinename', width: 130, title: '生产线', align: "center"}
                , {field: 'pregion', width: 130, title: '区域', align: "center"}
                , {field: 'enginemodel', width: 100, title: '系列', align: "center"}
                , {field: 'engineno', width: 240, title: '发动机号码', align: "left"}
                 , {field: 'pstation', width: 230, title: '采集点', align: "center"}
                 , {field: 'issuebz', width: 180, title: '班组', align: "center"}
                , {field: 'itempart', width: 130, title: '部位', align: "center"}
                , {field: 'failuremodel', width: 130, title: '失效模式', align: "center"}
                , {field: 'issuedesc', width: 130, title: '问题描述', align: "center"}
                , {field: 'createdbyname', width: 130, title: '记录人', align: "center"}
                , {field: 'repaircontent', width: 130, title: '维修方法', align: "center"}
                , {field: 'issuestatus', width: 130, title: '状态', align: "center"}
                , {field: 'dateclose', width: 130, title: '关闭时间', align: "center"}
                , {field: 'closebyname', width: 130, title: '关闭人', align: "center"}
                , {field: 'issueremark', width: 150, title: '备注', align: "center"}
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
            dateclose: '',
            mqsproductionteam:'',
            createdbyname:'',
            pstation:'',
            issuestatus:''
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
        	vm.logSearch.mqsproductionteam=$('#mqsproductionteam').val();
        	vm.logSearch.createdbyname=$('#createdbyname').val();
        	vm.logSearch.pstation=$('#pstation').val();
        	vm.logSearch.issuestatus=$('#issuestatus').val();
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

//下拉列表
function addOption() {
    $.ajax({
        url: siteurl + '/mqs/mqsissue/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
        	
            /*采集点*/
            html = '';
            for (var i = 0; i < data.pstationlist.length; i++) {
                html += '<option value' + data.pstationlist[i].stationname + '>' + data.pstationlist[i].stationname + '</option>'
            }
            $("select[name='pstation']").append(html);
            /*班组*/
            html = '';
            for (var i = 0; i < data.mqsProductionteamList.length; i++) {
                html += '<option value' + data.mqsProductionteamList[i].productionteamname + '>' + data.mqsProductionteamList[i].productionteamname + '</option>'
            }
            $("select[name='mqsproductionteam']").append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
};