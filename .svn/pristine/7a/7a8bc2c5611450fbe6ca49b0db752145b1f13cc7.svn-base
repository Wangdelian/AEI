var layerparam;
var only = 0;

var vm = new Vue({
    el: 'main',
    data: {
        param: {
            flag: '1'
        }
    },
    methods: {
        query: function (pageNum, isRefreshDB) {
            $.ajax({
                type: 'post',
                url: siteurl + '/train/chtraincheckinfo/queryreporterrorlist/' + pageNum,
                data: JSON.stringify(vm.param),
                contentType: 'application/json;charset=UTF-8',
                dataType: 'json',
                async: false,
                cache: false,
                success: function (r) {
                    if (r.code === 0) {
                        initList(r.page.list);
                        $("td[data-field='fid'],th[data-field='fid']").hide();
                        if (isRefreshDB == 1) {
                            setPage(r.page.totalCount);
                        }
                    } else {
                        alert(r.msg);
                    }

                }
            })
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


    //监听提交
    form.on('submit(export)', function (data) {
        vm.export();
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
            parent.app.addTab({
                url: siteurl + '/train/chtraincheckinfo/datareport',
                icon: '&#xe62d;',
                title: '数据报表',
                id: '12'
            });
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

    form.on('checkbox(lockDemo)', function(data){
        if(data.elem.checked){
            only = "1";
        }else{
            only = "0";
        }
        getdataJson();
    });

    form.on('submit(demo1)', function (data) {
        data.field.fid = fid;
        //存储权限
        $.ajax({
            type: "POST",
            url: siteurl + "/train/chtraincheckinfo/updaterrorinfo",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (r) {
                if (r.code === 0) {
                    parent.parent.layer.msg("操作成功");
                    layer.close(index);
                    vm.query(1.1);
                } else {
                    parent.parent.layer.alert(r.msg);
                }
            }
        });
        return false;
    });

    form.on('submit(cancel)', function (data) {
        layer.close(index);
        /*refreshTimer = setInterval(function() {
            console.log(new Date().format("页面刷新"+"yyyy-MM-dd hh:mm:ss"));
            vm.query(1,1);
        }, 1000);*/
        return false;
    });

    form.on('submit(error)', function (data) {
        vm.param.flag = 0;
        /*$("#error").css("color", "Crimson");
        $("#all").css("color", "black");*/
        vm.query(1, 1);
        return false;
    });

    form.on('submit(all)', function (data) {
        console.log("====aaa");
        vm.param.flag = 1;
        /*$("#error").css("color", "black");
        $("#all").css("color", "Crimson");*/
        vm.query(1, 1);
        return false;
    });


    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'cancel') {
            layer.close(index);
        }
    });

    //设备
    //构造列表
    window.initList2 = function (listdata,len) {
        table.render({
            elem: '#test1'
            , id: 'idTest1'
            , data: listdata
            , height: 155
            , cols: [[
                {type: 'numbers', width: '1%'}
                , {field: 'f_Value', title: '机务段名称', width: '11%', minWidth: 72, align: 'center'}
                , {field: 'f_Name', title: '站场名称', width: '9%', minWidth: 72, align: 'center'}
                , {field: 'f_GeographyAddress', title: 'AEI名称', width: '9%', minWidth: 72, align: 'center'}
                , {field: 'f_Number', title: 'AEI编号', width: '7%', minWidth: 72, align: 'center'}
                , {field: 'f_AEIConnetState', title: 'AEI设备通讯状态', width: '12%', align: 'center', templet: '#tpl5'}
                , {field: 'f_Reserve1', title: '磁钢状态', width: '8%', align: 'center', templet: '#tpl1'}
                , {field: 'f_Reserve2', title: '射频状态', width: '8%', align: 'center', templet: '#tpl2'}
                , {field: 'f_Reserve3', title: '灯光状态', width: '8%', align: 'center', templet: '#tpl3'}
                , {field: 'f_Reserve4', title: '相机状态', width: '8%', align: 'center', templet: '#tpl4'}
                , {field: 'f_StateTime', title: '最后检测时间', width: '14%', align: 'center'}

            ]]
            , page: false
            , limit: len
        });
    };


    getdataJson();


    //构造列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cols: [[
                {type: 'numbers', width: '1%'}
                , {field: 'fid', title: 'ID', hide: true}
                , {
                    field: 'ftrainorder',
                    title: '车次',
                    width: '7%',
                    minWidth: 60,
                    templet: '#usernameTpl',
                    align: 'center'
                }
                , {
                    field: 'fTraintypeverdict',
                    title: '识别车型',
                    width: '7%',
                    minWidth: 100,
                    align: 'center',
                    templet: '#titleTpl1'
                }
                , {
                    field: 'fTrainnumberverdict',
                    title: '识别车号',
                    width: '7%',
                    minWidth: 100,
                    align: 'center',
                    templet: '#titleTpl2'
                }
                , {field: 'fdetalReserve2', title: '确认车型', width: '7%', minWidth: 100, align: 'center'}
                , {field: 'fdetalReserve5', title: '确认车号', width: '7%', minWidth: 100, align: 'center'}
                , {field: 'fpasssite', title: '地点', width: '8%', minWidth: 65, align: 'center'}
                , {field: 'fpasspoint', title: '闸楼', width: '8%', minWidth: 65, align: 'center'}
                , {field: 'fdirection', title: '方向', width: '6%', minWidth: 55, align: 'center'}
                , {field: 'ftimethrough', title: '通过时间', width: '13%', minWidth: 130, sort: true, align: 'center'}
                , {field: 'fInforfid', title: '标签', width: '16%', minWidth: 150, align: 'center'}
                , {field: 'fdetalReserve3', title: '确定人', width: '6%', minWidth: 69, align: 'center'}
                , {field: 'fdetalReserve4', title: '确定时间', width: '13%', minWidth: 120, sort: true, align: 'center'}
                , {field: 'fBureauname', title: '配属局', width: '10%', minWidth: 55, align: 'center'}
                , {field: 'fSectionname', title: '配属段', width: '10%', minWidth: 55, align: 'center'}
                , {field: 'fInfoimage1', title: '图像识别', width: '8%', minWidth: 100, align: 'center'}
            ]]
            , page: false
        });
        /*if(listdata.length != 0){
            var ChTraincheckinfoEntity = listdata[0];
            fid = ChTraincheckinfoEntity.fid;
            ftguid = ChTraincheckinfoEntity.ftguid
            $("#fTraintypeverdict").val(ChTraincheckinfoEntity.fTraintypeverdict)
            $("#fTrainnumberverdict").val(ChTraincheckinfoEntity.fTrainnumberverdict)
            $("#ftimethrough").val(ChTraincheckinfoEntity.ftimethrough)
            index=layer.open({
                type: 1,
                title: '提示：编辑车型车号',
                shade: 0.2,
                area: ['480px', '350px'],
                content: $('#editerrorinfo')
            });
            console.log("关闭自动刷新"+new Date().format("yyyy-MM-dd hh:mm:ss"));
            clearInterval(refreshTimer);
        }*/
        $("#main .layui-table tbody tr").dblclick(function (data) {
            fid = $(".layui-table-hover td[data-field='fid'] div").html();
            var fTraintypeverdict = $(".layui-table-hover td[data-field='fTraintypeverdict'] div span").html();
            var fTrainnumberverdict = $(".layui-table-hover td[data-field='fTrainnumberverdict'] div span").html();
            var ftimethrough = $(".layui-table-hover td[data-field='ftimethrough'] div").html();
            //确认车型和确认车号
            var fdetalReserve2 = $(".layui-table-hover td[data-field='fdetalReserve2'] div").html();
            var fdetalReserve5 = $(".layui-table-hover td[data-field='fdetalReserve5'] div").html();
            if ((fdetalReserve2 != null && fdetalReserve2 != '') || (fdetalReserve5 != null && fdetalReserve5 != '')) {
                $("#fTraintypeverdict").val(fdetalReserve2);
                $("#fTrainnumberverdict").val(fdetalReserve5);
            } else {
                $("#fTraintypeverdict").val(fTraintypeverdict);
                $("#fTrainnumberverdict").val(fTrainnumberverdict);
            }
            $("#ftimethrough").val(ftimethrough);
            index = layer.open({
                type: 1,
                title: '提示：请人工确认车型车号',
                shade: 0.2,
                area: ['480px', '350px'],
                content: $('#editerrorinfo')
            });
        })
    };
    window.setPage = function (rowCount) {
        layerparam = laypage.render({
            elem: 'pagination'
            , count: rowCount
            , layout: ['count', 'prev', 'page', 'next', 'skip']
            , jump: function (obj, first) {
                vm.currentPage = obj.curr;
                if (!first) {
                    vm.query(obj.curr, 0);
                }
            }
        });
    };
    vm.query(1, 1);
    $("#error").css("color", "Crimson");
    $("#all").css("color", "black");

    setInterval("vm.query(1,1)", 120000);
    setInterval("getdataJson()", 300000);

    setTimeout(function () {
    }, 1000)

});

function getdataJson() {
    $.ajax({
        type: "POST",
        url: siteurl + '/sys/levelmark/getdata',
        data: JSON.stringify({only:only}),
        async: true,
        cache: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var len = r.deviceList.length;
                initList2(r.deviceList,len);
                $('td[data-content="正常"]').css('background-color', '#90EE90')
                $('td[data-content="正常"]').css('font-weight', 'bold')
                $('td[data-content="异常"]').css('background-color', 'red')
                $('td[data-content="异常"]').css('font-weight', 'bold')
                $('td[data-content="异常"]').css('color', 'black')

            } else {
                alert(r.msg);
            }
        },
        error: function (r) {
        }
    });
}
