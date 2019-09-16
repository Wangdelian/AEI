var layerparam;
$(function(){
    // getdataJson();
})

var vm = new Vue({
    el: 'main',
    data: {
        param: {
            flag: ''
        }
    },
    methods: {
        query:function(){
            $.ajax({
                type: "POST",
                url: siteurl + '/sys/levelmark/getdata',
                async: true,
                cache: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        console.log("------");
                        console.log(r.deviceList);
                        initList(r.deviceList);
                    } else {
                        alert(r.msg);
                    }
                },
                error: function (r) {
                }
            });
        }
    }
});
layui.use(['form', 'layedit', 'laydate', 'table', 'laypage'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , table = layui.table
        , laypage = layui.laypage
        , laydate = layui.laydate;
    var index;
    var refreshTimer;
    //getdataJson()

    //监听提交
    form.on('submit(export)', function (data) {
        return false;
    });

    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'jumpreport') {

        }
    });

    var $ = layui.$, active = {
        jumpreport: function () {

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

    form.on('submit(cancel)', function (data) {

    });

    function getdataJson() {
        $.ajax({
            type: "POST",
            url: siteurl + '/sys/levelmark/getdata',
            async: true,
            cache: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (r) {
                if (r.code === 0) {
                    console.log("------");
                    console.log(r.deviceList);
                    initList(r.deviceList);
                } else {
                    alert(r.msg);
                }
            },
            error: function (r) {
            }
        });
    }

    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test1'
            , id: 'idTest'
            , data: listdata
            , height: 'full-220'
            , cols: [[
                {type: 'numbers', width: '1%'}
                , {field: 'f_Value', title: '机务段名称', width: '10%', minWidth: 72, align: 'center'}
                , {field: 'f_Name', title: '站场名称', width: '7%', minWidth: 72, align: 'center'}
                , {field: 'f_GeographyAddress', title: 'AEI名称', width: '7%', minWidth: 72, align: 'center'}
                , {field: 'f_Number', title: 'AEI编号', width: '7%', minWidth: 72, align: 'center'}
                , {field: 'f_AEIConnetState', title: 'AEI设备连接状态', width: '10%', minWidth: 72, align: 'center'}
                , {field: 'f_Reserve1', title: '磁钢状态', width: '7%', minWidth: 72, align: 'center'}
                , {field: 'f_Reserve2', title: '射频状态', width: '7%', minWidth: 72, align: 'center'}
                , {field: 'f_Reserve3', title: '灯光状态', width: '7%', minWidth: 72, align: 'center'}
                , {field: 'f_Reserve4', title: '相机状态', width: '7%', minWidth: 72, align: 'center'}

            ]]
            , page: false
        });
    };



    getdataJson();

});


