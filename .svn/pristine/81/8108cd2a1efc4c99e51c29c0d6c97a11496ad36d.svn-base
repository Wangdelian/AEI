/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JQuery版本：
 *Vue.js版本：
 *公司名称：
 *命名空间：io.jeasyframework.controller
 *文件名：  productdeptlist.js
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/12/15 15:39
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/

$(function () {
    //初始化表格数据

});
layui.use(['table','laypage', 'layer','form', 'layedit', 'laydate'], function(){
    var laypage = layui.laypage,layer = layui.layer;
    var table = layui.table;
    var laydate = layui.laydate;
    form = layui.form;
    var startTime = laydate.render({
        elem: '#startTime'
        ,type: 'datetime'
        ,done: function (value, date) {
            date.month--;
            endTime.config.min = date;
            var strs= value.split(" ");
            vm.logSearch.startTime = strs[0];
        }
    });

    var endTime = laydate.render({
        elem: '#endTime'
        ,type: 'datetime'
        ,done: function (value, date) {
            date.month--;
            startTime.config.max = date;
            var strs= value.split(" ");
            vm.logSearch.endTime = strs[0];
        }
    });
    //监听工具条
    table.on('tool(demo)', function(obj){
        var data = obj.data;
        if(obj.event === 'build'){

        } else if(obj.event === 'del'){
            layer.confirm('确定删除零公里问题么', function(index){
                vm.del(data.zerokmissueid);
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            vm.MenuOpt.url=siteurl+'/mqs/mqszerokmissue/editzerokmissue/'+data.zerokmissueid;
            vm.MenuOpt.icon='&#xe6c6;';
            vm.MenuOpt.title='编辑零公里问题';
            vm.MenuOpt.id='311';
            parent.app.addTab(vm.MenuOpt);
        }
    });

    var $ = layui.$, active = {
        getCheckData: function(){
            layer.confirm('确定删除零公里问题', function(index) {
                var checkStatus = table.checkStatus('idTest')
                    , data = checkStatus.data;
                var zerokmissueids = [];
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        zerokmissueids[i] = data[i].zerokmissueid;
                    }
                    vm.del(zerokmissueids);
                    layer.close(index);
                } else {
                    layer.alert("您还未选中任何数据");
                }
            });
        }
        ,getCheckLength: function(){
            var checkStatus = table.checkStatus('idTest')
                ,data = checkStatus.data;
            layer.msg('选中了：'+ data.length + ' 个');
        }
        ,isAll: function(){
            var checkStatus = table.checkStatus('idTest');
            layer.msg(checkStatus.isAll ? '全选': '未全选')
        }
        ,SearchList: function(){
            alert('test11111');
            //查询按钮触发
            vm.update(16);
        }
        ,addZeroKmIssue: function(){
            parent.app.closeTab('35');
            vm.MenuOpt.url=siteurl+'/mqs/mqszerokmissue/addzerokmissue/';
            vm.MenuOpt.icon='&#xe6c6;';
            vm.MenuOpt.title='新增零公里问题';
            vm.MenuOpt.id='35';
            parent.app.addTab(vm.MenuOpt);
        }
        ,build: function(){
            vm.createtable();
        }
    };

    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $('.layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    window.Hello = function(listdata){
        //查询按钮触发
        table.reload('idTest', {
            data: listdata
        });
    };
    //构造列表
    window.initList = function(listdata){
        table.render({
            elem: '#test'
            ,id:'idTest'
            ,data:listdata
            ,cellMinWidth: 80
            ,height:'full-335'
            ,cols: [[
                {type:'numbers'}
                ,{type: 'checkbox'}
                ,{field:'productionbase',width:60, title:'发生基地', templet: '#usernameTpl', align: "center"}
                ,{field:'dateoccur',width:80, title:'发生日期', templet: '#usernameTpl', align: "center"}
                ,{field:'zkweek',width:60, title:'周', templet: '#usernameTpl', align: "center"}
                ,{field:'productiondeptname',width:60, title:'生产单位', templet: '#usernameTpl', align: "center"}
                ,{field:'productionlinename',width:60, title:'生产线', templet: '#usernameTpl', align: "center"}
                ,{field:'enginemodel',width:80, title:'系列', templet: '#usernameTpl', align: "center"}
                ,{field:'enginetype',width:100, title:'机型', templet: '#usernameTpl', align: "center"}
                ,{field:'engineno',width:120, title:'机号', templet: '#usernameTpl', align: "center"}
                ,{field:'vrt',width:80, title:'VRT', templet: '#usernameTpl', align: "center"}
                ,{field:'vfg',width:100, title:'VFG', templet: '#usernameTpl', align: "center"}
                ,{field:'ccc',width:180, title:'CCC', templet: '#usernameTpl', align: "center"}
                ,{field:'icc',width:180, title:'ICC', templet: '#usernameTpl', align: "center"}
                ,{field:'itempart',width:90, title:'部位', templet: '#usernameTpl', align: "center"}
                ,{field:'failuremodel',width:80, title:'模式', templet: '#usernameTpl', align: "center"}
                ,{field:'issuedesc',width:80, title:'问题描述', templet: '#usernameTpl', align: "center"}
                ,{field:'issueseverity',width:80, title:'问题严重度', templet: '#usernameTpl', align: "center"}
                ,{field:'repaircontent',width:70, title:'维修方法', templet: '#usernameTpl', align: "center"}
                ,{field:'dutydept',width:60, title:'责任单位', templet: '#usernameTpl', align: "center"}
                ,{field:'issueattr',width:90, title:'问题属性', templet: '#usernameTpl', align: "center"}
                ,{field:'pstation',width:160, title:'采集点', templet: '#usernameTpl', align: "center"}
                ,{field:'createdbyname',width:70, title:'记录人', templet: '#usernameTpl', align: "center"}
                ,{field:'iswritetarget',width:100, title:'是否计入指标', templet: '#usernameTpl', align: "center"}
                ,{field:'erameasures',width:100, title:'ERA措施', templet: '#usernameTpl', align: "center"}
                ,{field:'dateeraexecuted',width:90, title:'ERA执行时间', templet: '#usernameTpl', align: "center"}
                ,{field:'icameatures',width:100, title:'ICA措施', templet: '#usernameTpl', align: "center"}
                ,{field:'dateicaexecuted',width:90, title:'ICA执行时间', templet: '#usernameTpl', align: "center"}
                ,{field:'finishedstatus',width:80, title:'完成状态', templet: '#usernameTpl', align: "center"}
                ,{field:'reasonanalysis',width:80, title:'原因分析', templet: '#usernameTpl', align: "center"}
                ,{field:'pcameasures',width:100, title:'PCA措施', templet: '#usernameTpl', align: "center"}
                ,{field:'datepcaexecuted',width:90, title:'PCA执行时间', templet: '#usernameTpl', align: "center"}
                ,{field:'zkissuestatus',width:80, title:'问题状态', templet: '#usernameTpl', align: "center"}
                ,{field:'remark',width:150, title:'备注', templet: '#usernameTpl', align: "center"}
                ,{fixed: 'right', title:'操作',width:120, align:'center', toolbar: '#barDemo'}
            ]]
            ,page: false
        });
    };
    window.setPage= function(rowCount)
    {
        laypage.render({
            elem: 'pagination'
            ,count: rowCount
            ,layout: ['count', 'prev', 'page', 'next',  'skip']
            ,jump: function(obj, first){
                if(!first){
                    vm.query(obj.curr,0);
                }
            }
        });
    };
    window.onSearch= function(conditionObj,pageNum)
    {

    };
    //列表入口
    vm.query(1,1);
    vm.addOptions();
    addProductdeptOption();
    addProductlineOption(form);
    form.render();
    form.on('select(filter1)', function (data) {
    });
    form.on('select(filter2)', function (data) {
    });
    form.render();

});
var vm = new Vue({
    el: '#main',
    data: {
        logSearch: {
            productiondeptname: '',
            productionlinename: '',
            productionbase: '',
            enginemodel: '',
            startTime: '',
            endTime: '',
            engineno: '',
            icc: '',
            ccc: '',
            dutydept: '',
            issueattr: '',
            zkissuestatus: ''

        },
        MenuOpt: {
            url:'',
            icon:'',
            title:'',
            id:''
        }
    },
    methods: {
        createtable: function () {
            var param = {'productionbase':$('#productionbase').val(),
                'enginemodel': $('#enginemodel').val(),
                'startTime': vm.logSearch.startTime,
                'endTime': vm.logSearch.endTime ,
                'engineno': $('#engineno').val(),
                'icc': $('#icc').val(),
                'ccc': $('#ccc').val(),
                'dutydept': $('#dutydept').val(),
                'issueattr': $('#issueattr').val(),
                'productiondeptname': $('#productiondeptname').val(),
                'productionlinename': $('#productionlinename').val(),
                'zkissuestatus': $('#zkissuestatus').val()};
            downFile2(siteurl + '/mqs/mqszerokmissue/createtable/', param);
        },
        query: function (pageNum, isRefreshDB) {
            vm.logSearch.productiondeptname = $('#productiondeptname').val();
            vm.logSearch.productionlinename = $('#productionlinename').val();
            vm.logSearch.productionbase = $('#productionbase').val();
            vm.logSearch.enginemodel = $('#enginemodel').val();
            vm.logSearch.startTime = vm.logSearch.startTime ;
            vm.logSearch.endTime = vm.logSearch.endTime ;
            vm.logSearch.engineno = $('#engineno').val();
            vm.logSearch.icc = $('#icc').val();
            vm.logSearch.ccc = $('#ccc').val();
            vm.logSearch.dutydept = $('#dutydept').val();
            vm.logSearch.issueattr = $('#issueattr').val();
            vm.logSearch.zkissuestatus = $('#zkissuestatus').val();
            $.ajax({
                type: "POST",
                url: siteurl + '/mqs/mqszerokmissue/list/' + pageNum,
                data: JSON.stringify(vm.logSearch),//用户数据
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    //console.log(r);
                    if (r.code === 0) { //判断请求
                        console.log(r.page.list);
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
        del: function (data) {
            var arrId = [];
            if (data instanceof Array) {
                arrId = data;
            } else {
                arrId[0] = data;
            }
            $.ajax({
                type: "POST",
                url: siteurl + '/mqs/mqszerokmissue/delete/',
                data: JSON.stringify(arrId),//用户数据
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function () {
                    vm.query(1, 1);
                }
            });
        },
        addOptions: function () {
            $.ajax({
                url: siteurl+'/mqs/mqszerokmissue/addOptions',
                type: 'post',
                async: false,
                success: function (data) {
                    //console.log(data);
                    /*责任班组*/
                    var html = '';
                    for (var i = 0; i < data.dutyteamlist.length; i++) {
                        html += '<option value=' + data.dutyteamlist[i].dictvalue + '>' + data.dutyteamlist[i].dictvalue + '</option>';
                    }
                    $("select[name='dutyteam']").append(html);


                    /*系列*/
                    html = '';
                    for (var i = 0; i < data.enginemodellist.length; i++) {
                        html += '<option value=' + data.enginemodellist[i].dictvalue + '>' + data.enginemodellist[i].dictvalue + '</option>';
                    }
                    $("select[name='enginemodel']").append(html);

                    /*问题属性*/
                    html = '';
                    for (var i = 0; i < data.issueattrlist.length; i++) {
                        html += '<option value=' + data.issueattrlist[i].dictvalue + '>' + data.issueattrlist[i].dictvalue + '</option>'
                    }
                    $("select[name='issueattr']").append(html);

                    /*责任单位*/
                    html = '';
                    for (var i = 0; i < data.dutydeptlist.length; i++) {
                        html += '<option value=' + data.dutydeptlist[i].dictvalue + '>' + data.dutydeptlist[i].dictvalue + '</option>'
                    }
                    $("select[name='dutydept']").append(html);

                    /*状态*/
                    html = '';
                    for (var i = 0; i < data.zkissuestatuslist.length; i++) {
                        html += '<option value=' + data.zkissuestatuslist[i].dictvalue + '>' + data.zkissuestatuslist[i].dictvalue + '</option>'
                    }
                    $("select[name='zkissuestatus']").append(html);

                    /*维修方法*/
                    html = '';
                    for (var i = 0; i < data.repaircontentlist.length; i++) {
                        html += '<option value' + data.repaircontentlist[i].dictvalue + '>' + data.repaircontentlist[i].dictvalue + '</option>'
                    }
                    $("select[name='repaircontent']").append(html);

                    /*采集点*/
                    html = '';
                    for (var i = 0; i < data.pstationlist.length; i++) {
                        html += '<option value' + data.pstationlist[i].stationname + '>' + data.pstationlist[i].stationname + '</option>'
                    }
                    $("select[name='pstation']").append(html);

                    /*问题严重程度*/
                    html = '';
                    for (var i = 0; i < data.issueseveritylist.length; i++) {
                        html += '<option value="' + data.issueseveritylist[i].dictvalue + '">' + data.issueseveritylist[i].dictvalue + '</option>'
                    }
                    $("select[name='issueseverity']").append(html);

                    /*机型*/
                    html = '';
                    for (var i = 0; i < data.enginetypelist.length; i++) {
                        html += '<option value="' + data.enginetypelist[i].dictvalue + '">' + data.enginetypelist[i].dictvalue + '</option>'
                    }
                    $("select[name='enginetype']").append(html);

                    /*发生基地*/
                    html = '';
                    for (var i = 0; i < data.productionbaselist.length; i++) {
                        html += '<option value="' + data.productionbaselist[i].dictvalue + '">' + data.productionbaselist[i].dictvalue + '</option>'
                    }
                    $("select[name='productionbase']").append(html);
                },
                error: function () {
                    alert('查找板块报错');
                }
            })

        }
    }
});
function addProductdeptOption() {
    $.ajax({
        url: siteurl+'/mqs/mqsproductdept/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            var html='';
            for (var i = 0; i < data.length; i++) {//循环数据
                html += '<option value= "'+data[i].productiondeptname +'">'+ data[i].productiondeptname+'</option>'
            }
            $("select[name='productiondeptname']").append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
};

function addProductlineOption(form) {
    $.ajax({
        url: siteurl+'/mqs/mqsproductline/addProductlineOptionBydeptname/',
        //  contentType: 'application/json;charset=UTF-8',
        type: 'POST',
        success: function (data) {
            var html='';
            // 添加选项
            //var et =r.list;;//从数据库获取的值
            for (var i = 0; i < data.length; i++) {//循环数据
                html += '<option value= "'+data[i].productionlinename +'">'+ data[i].productionlinename+'</option>'
            }
            $("select[name='productionlinename']").append(html);
            form.render();
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
};
