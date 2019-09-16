/*声明layui的变量*/
var timearr1="";
var timearr2="";
var timearr3="";
var timearr4="";
var timearr5="";
var timearr6="";
var timearr7="";
var timearr8="";
var timearr9="";
var timearr10="";
layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage, layer = layui.layer;
    var table = layui.table;
    form = layui.form;

    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'build') {
            vm.codegen(data.tableName);
        } else if (obj.event === 'del') {
            layer.confirm('确定删除么', function (index) {
                vm.delete(data);
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            vm.getAuditissue(data.auditissueid);
            vm.MenuOpt.url = siteurl+'/mqs/mqsauditissue/edit/' + data.auditissueid;
            vm.MenuOpt.icon = '&#xe6c6;';
            vm.MenuOpt.title = '编辑Audit问题';
            vm.MenuOpt.id = '44';
            parent.app.addTab(vm.MenuOpt);
        }
    });

    var $ = layui.$, active = {
        query: function(){
            getTime();
            vm.queryTitleTime();
            vm.query(1,1);
        }
    };

    $('.layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });



    var laydate = layui.laydate;
    //时间选择器
    var startTime = laydate.render({
        elem: '#test4'
        , type: 'date'
        , done: function (value, date) {
            date.month--;
            endTime.config.min = date;
            vm.logSearch.startTime = value;
        }
    });
    //时间选择器
    var endTime = laydate.render({
        elem: '#test5'
        , type: 'date'
        , done: function (value, date) {
            date.month--;
            startTime.config.max = date;
            vm.logSearch.endTime = value;
        }
    });

    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , limit:9999999
            , width:1874
            , cellMinWidth: 80
            , cols:  [[ //标题栏
                {field: 'unit', title: '单位', width: 150, rowspan: 2,templet: '#unit'}
                ,{field: 'targetvalue', title: '目标值', width: 150, rowspan: 2}
                ,{align: 'center', title: '年', colspan: 2}
                ,{align: 'center', title: '单月', colspan: 4}
                ,{align: 'center', title: '累计', colspan: 4}
            ], [
                {field: 'year1', title: timearr1+'年', width: 120}
                ,{field: 'year2', title: timearr2+'年', width: 120}
                ,{field: 'month1', title: timearr3+'月', width: 120}
                ,{field: 'month2', title: timearr4+'月', width: 120}
                ,{field: 'month3', title: timearr5+'月', width: 120}
                ,{field: 'month4', title: timearr6+'月', width: 120}
                ,{field: 'month1sum', title: timearr7+'月', width: 120}
                ,{field: 'month2sum', title: timearr8+'月', width: 120}
                ,{field: 'month3sum', title: timearr9+'月', width: 120}
                ,{field: 'month4sum', title: timearr10+'月', width: 120}

            ]]
        })

    };

    window.onSearch = function (conditionObj) {

    };
    //table列表入口
    vm.query();
    addOption();
    //得到级联下拉的条件下拉菜单
    addProductdeptOption();
    addProductlineOption(form);
    form.render();

    form.on('select(condition1)', function (data) {
        vm.logSearch.productiondeptname= data.value;
    });

    form.on('select(condition2)',function (data){
        vm.logSearch.productionlinename= data.value;
    });

    form.on('select(condition3)',function (data){
        vm.logSearch.enginemodel= data.value;
    });



});


$(function(){
    getTime();

});

function getTime(){
    var arr=vm.queryTitleTime();
    timearr1=arr[0];
    timearr2=arr[1];
    timearr3=arr[2];
    timearr4=arr[3];
    timearr5=arr[4];
    timearr6=arr[5];
    timearr7=arr[6];
    timearr8=arr[7];
    timearr9=arr[8];
    timearr10=arr[9];
}



var vm = new Vue({
    el: '#main',
    data: {
        logSearch: {
            productiondeptname: '',
            productionlinename: '',
            enginemodel: '',
            endTime: ''
        },
        MenuOpt: {
            url: '',
            icon: '',
            title: '',
            id: ''
        }
    },
    methods: {
        //根据生产单位分组查询的列表
        query: function () {
            console.log(vm.logSearch);
            $.ajax({
                type: "POST",
                url: siteurl+'/mqs/mqszerokmhealth/tablelist/',
                data: JSON.stringify(vm.logSearch),//用户数据
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    console.log(data);
                    initList(data);
                },
                error: function(data){
                    alert('查找板块报错');
                }

            });
        },
        queryTitleTime: function () {
            var timearr=[];
            $.ajax({
                type: "POST",
                url: siteurl+'/mqs/mqszerokmhealth/querytitletime/',
                data: JSON.stringify(vm.logSearch),//用户数据
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    console.log("aaaaaaajjjjjj");
                    console.log(data);
                    for(var i=0;i<data.length;i++){
                        timearr.push(data[i]);
                    }

                },
                error: function(data){
                    alert('查找板块报错');
                }

            });
            return timearr;
        },

        /*
        *导出表格
        */
        export: function () {
            downFile2( siteurl+'/mqs/mqszerokmhealth/export',{productiondeptname:$('#productiondeptname').val(),
                productionlinename:$('#productionlinename').val(),
                enginemodel: $('#enginemodel').val(),
                endTime:$('#test5').val()});

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
function addOption() {
    $.ajax({
        url: siteurl+'/mqs/mqsauditissue/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            //系列
            html = '';
            for (var i = 0; i < data.enginemodel.length; i++) {
                html += '<option value=' + data.enginemodel[i].dictvalue + '>' + data.enginemodel[i].dictvalue + '</option>';
            }
            $("select[name='enginemodel']").append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
};
