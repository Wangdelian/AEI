var layerparam;
var only = 0;
var pageNumIn = 1;
var pageNumOut = 1;

var vm = new Vue({
    el: 'main',
    data: {
        param: {
            flag: '1'
        }
    },
    methods: {
        /*进段列表*/
        query: function (pageNum, isRefreshDB) {
            pageNumIn = pageNum;
            vm.param.direction = "进段";
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
                        /*//本次运行里程颜色标记
                        var miletd = $('td[data-field="ftrainattribute"]');
                        for(var i=0;i<miletd.length;i++){

                            miletd[i].style.fontWeight = 'bold';
                            if(miletd[i].textContent > mileage || miletd[i].textContent === ""){
                                miletd[i].style.backgroundColor = 'red';
                                miletd[i].style.color = 'black';
                            }else{
                                miletd[i].style.backgroundColor = '#90EE90';
                            }
                        }*/
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
        /*出段列表*/
        ,queryOut: function (pageNum, isRefreshDB) {
            pageNumOut = pageNum;
            vm.param.direction = "出段";
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
                        initListOut(r.page.list);
                        /*//本次运行里程颜色标记
                        var miletd = $('td[data-field="ftrainattribute"]');
                        for(var i=0;i<miletd.length;i++){

                            miletd[i].style.fontWeight = 'bold';
                            if(miletd[i].textContent > mileage || miletd[i].textContent === ""){
                                miletd[i].style.backgroundColor = 'red';
                                miletd[i].style.color = 'black';
                            }else{
                                miletd[i].style.backgroundColor = '#90EE90';
                            }
                        }*/
                        $("td[data-field='fid'],th[data-field='fid']").hide();
                        if (isRefreshDB == 1) {
                            setPageOut(r.page.totalCount);
                        }
                    } else {
                        alert(r.msg);
                    }

                }
            })
        }
        /*判断是否有新的列车出入*/
        ,checkChange: function () {
            $.ajax({
                type: 'post',
                url: siteurl + '/train/chtraincheckinfo/checkChange',
                data: {},
                contentType: 'application/json;charset=UTF-8',
                dataType: 'json',
                async: false,
                cache: false,
                success: function (r) {
                    if (r.code === 0) {

                    } else {

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

    /*
    abnameTotal为用户组织机构，从所属部门到最高部门，用‘/’分隔
     */
    var abnameArr = abnameTotal.split('/');
    var levelmarkidArr = levelmarkidTotal.split('/')
    if (levelmarkid.length < 3) {
        queryJu();
        form.render();
        form.on('select(fBureaunameSelect)', function (data) {
            if(data.value!=""){
                queryDuan($("#fBureaunameSelect").val());
                form.render();
            }else{
                $('#fSectionnameSelect option').not(":first").remove();
                $('#fpasssiteSelect option').not(":first").remove();
                form.render();
            }
            return false;
        });
        form.on('select(fSectionnameSelect)', function (data) {
            if(data.value!=""){
                queryChang($("#fSectionnameSelect").val());
                form.render();
            }else{
                $('#fpasssiteSelect option').not(":first").remove();
                form.render();
            }
            return false;
        });
        form.on('select(fpasssiteSelect)', function (data) {
            if(data.value!=""){
                queryDecice($("#fpasssiteSelect").val());
                form.render();
            }else{
                $('#fdeviceSelect option').not(":first").remove();
                form.render();
            }
            return false;
        });
    } else if (levelmarkid.length < 8 && levelmarkid.length >= 3) {
        if (abnameArr.length > 1) {
            var html = "<option value='" + levelmarkidArr[1] + "' selected>" + abnameArr[1] + "</option>";
            $("select[name='fBureaunameSelect']").append(html);
            $("select[name='fBureaunameSelect']").attr("disabled", "disabled");
            vm.search.fBureauname = levelmarkidArr[1];
            $("#selec1").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        queryDuan($("#fBureaunameSelect").val());
        var ob = $("select[name='fSectionnameSelect']");
        form.render();
        form.on('select(fSectionnameSelect)', function (data) {
            if(data.value!=""){
                queryChang($("#fSectionnameSelect").val());
                form.render();
            }else{
                $('#fpasssiteSelect option').not(":first").remove();
                form.render();
            }
            return false;
        });
        form.on('select(fpasssiteSelect)', function (data) {
            if(data.value!=""){
                queryDecice($("#fpasssiteSelect").val());
                form.render();
            }else{
                $('#fdeviceSelect option').not(":first").remove();
                form.render();
            }
            return false;
        });
    } else if (levelmarkid.length < 13 && levelmarkid.length >= 8) {
        if (abnameArr.length > 1) {
            var html = "<option value='" + levelmarkidArr[1] + "' selected>" + abnameArr[1] + "</option>";
            $("select[name='fBureaunameSelect']").append(html);
            $("select[name='fBureaunameSelect']").attr("disabled", "disabled");
            vm.search.fBureauname = levelmarkidArr[1];
            $("#selec1").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        if (abnameArr.length > 2) {
            var html = "<option value='" + levelmarkidArr[2] + "' selected>" + abnameArr[2] + "</option>";
            $("select[name='fSectionnameSelect']").append(html);
            $("select[name='fSectionnameSelect']").attr("disabled", "disabled");
            vm.search.fSectionname = levelmarkidArr[2];
            $("#selec2").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        queryChang($("#fSectionname").val());
        form.on('select(fpasssiteSelect)', function (data) {
            if(data.value!=""){
                queryDecice($("#fpasssiteSelect").val());
                form.render();
            }else{
                $('#fdeviceSelect option').not(":first").remove();
                form.render();
            }
            return false;
        });
        form.render();
    } else {
        if (abnameArr.length > 1) {
            var html = "<option value='" + levelmarkidArr[1] + "' selected>" + abnameArr[1] + "</option>";
            $("select[name='fBureaunameSelect']").append(html);
            $("select[name='fBureaunameSelect']").attr("disabled", "disabled");
            vm.search.fBureauname = levelmarkidArr[1];
            $("#selec1").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        if (abnameArr.length > 2) {
            var html = "<option value='" + levelmarkidArr[2] + "' selected>" + abnameArr[2] + "</option>";
            $("select[name='fSectionnameSelect']").append(html);
            $("select[name='fSectionnameSelect']").attr("disabled", "disabled");
            vm.search.fSectionname = levelmarkidArr[2];
            $("#selec2").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        if (abnameArr.length > 3) {
            var html = "<option value='" + levelmarkidArr[3] + "' selected>" + abnameArr[3] + "</option>";
            $("select[name='fpasssiteSelect']").append(html);
            $("select[name='fpasssiteSelect']").attr("disabled", "disabled");
            vm.search.fpasssite = levelmarkidArr[3];
            $("#selec3").click(function () {
                parent.parent.layer.msg("对不起，您没有权限！");
            })
        }
        queryDecice($("#fpasssiteSelect").val());
        form.render();
    }

    //AEI设备选择完成
    form.on('select(fdeviceSelect)', function (data) {
        if(data.value != ''){
            for(var i=0;i<alldeviceList.length;i++){
                if(alldeviceList[i].f_LevelMarkID == data.value){
                    fPasssiteAdd = alldeviceList[i].f_Name;
                    fPasspointAdd = alldeviceList[i].f_GeographyAddress;
                }
            }
        }
        return false;
    });

    //时间选择器
    var start = laydate.render({
        elem: '#ftimearriveAdd'
        , type: 'datetime'
        , done: function (value, date) {
            date.month--;
            //end.config.min = date;
        }
    });
    //时间选择器
    var end = laydate.render({
        elem: '#ftimethroughAdd'
        , type: 'datetime'
        , done: function (value, date) {
            date.month--;
            //start.config.max = date;
        }
    });


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

    $('#addinfoButton').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加过车记录',
            shade: 0.2,
            area: ['680px', '470px'],
            content: $('#addinfo')
        });
    });

    //异常筛选按钮
    form.on('checkbox(lockDemo)', function(data){
        if(data.elem.checked){
            only = "1";
        }else{
            only = "0";
        }
        getdataJson();
    });

    //列表隐藏按钮
    form.on('checkbox(hideDemo)', function(data){
        if(data.elem.checked){
            $('#table1').css('display', 'none');
        }else{
            $('#table1').css('display', 'block');
        }
    });

    //修改界面保存
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
                    vm.query(1,1);
                    vm.queryOut(1,1);
                } else {
                    parent.parent.layer.alert(r.msg);
                }
            }
        });
        return false;
    });


    //添加界面保存
    form.on('submit(demoAdd)', function (data) {
        var addData = {};
        addData.fDeviceid = data.field.fdeviceSelect;
        addData.fPasssite = fPasssiteAdd;
        addData.fPasspoint = fPasspointAdd;
        addData.fDirection = data.field.fdirectionAdd;
        addData.fTimearrive = data.field.ftimearriveAdd;
        addData.fTimethrough = data.field.ftimethroughAdd;
        addData.fTrainorder = data.field.fTrainorderAdd;
        addData.fTraintypeverdict = data.field.fTraintypeverdictAdd;
        addData.fTrainnumberverdict = data.field.fTrainnumberverdictAdd;
        addData.fBureauname = data.field.fBureaunameAdd;
        addData.fSectionname = data.field.fSectionnameAdd;
        console.log(addData);
        layer.close(index);
        return false;
    });

    //修改界面关闭
    form.on('submit(cancel)', function (data) {
        layer.close(index);
        /*refreshTimer = setInterval(function() {
            console.log(new Date().format("页面刷新"+"yyyy-MM-dd hh:mm:ss"));
            vm.query(1,1);
        }, 1000);*/
        return false;
    });

    //添加界面关闭
    $('#cancelAdd').on('click', function () {
        layer.close(index);
        return false;
    });

    form.on('submit(error)', function (data) {
        vm.param.flag = 0;
        /*$("#error").css("color", "Crimson");
        $("#all").css("color", "black");*/
        vm.query(1, 1);
        vm.queryOut(1,1);
        return false;
    });

    form.on('submit(all)', function (data) {
        console.log("====aaa");
        vm.param.flag = 1;
        /*$("#error").css("color", "black");
        $("#all").css("color", "Crimson");*/
        vm.query(1, 1);
        vm.queryOut(1,1);
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


    //构造进段列表
    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cols: [[
                {templet: function (d) { return d.LAY_INDEX+(pageNumIn-1)*10;}, width: '8%',}
                , {field: 'fid', title: 'ID', hide: true}
                , {
                    field: 'ftrainorder',
                    title: '车次',
                    width: '14%',
                    templet: '#usernameTpl',
                    align: 'center'
                }
                , {
                    field: 'fTraintypeverdict',
                    title: '识别车型',
                    width: '15%',
                    minWidth: 100,
                    align: 'center',
                    templet: '#titleTpl1'
                }
                , {
                    field: 'fTrainnumberverdict',
                    title: '识别车号',
                    width: '15%',
                    minWidth: 100,
                    align: 'center',
                    templet: '#titleTpl2'
                }
                , {field: 'fpasssite', title: '地点', width: '18%', minWidth: 65, align: 'center'}
                , {field: 'fpasspoint', title: '闸楼', width: '18%', minWidth: 65, align: 'center'}
                , {field: 'ftrainstatus', title: '当前里程(km)', width: '23%', minWidth: 65, align: 'center'}/*
                , {field: 'fdirection', title: '方向', width: '6%', minWidth: 55, align: 'center'}*/

                , {field: 'ftrainattribute', title: '出入里程(km)', width: '23%', minWidth: 65,align: 'center'}

                , {field: 'ftimethrough', title: '通过时间', width: '27%', minWidth: 130, sort: true, align: 'center'}
                , {field: 'fInforfid', title: '标签', width: '32%', minWidth: 150, align: 'center'}
                , {field: 'fdetalReserve2', title: '确认车型', width: '15%', minWidth: 100, align: 'center'}
                , {field: 'fdetalReserve5', title: '确认车号', width: '15%', minWidth: 100, align: 'center'}
                , {field: 'fdetalReserve3', title: '确定人', width: '20%', minWidth: 69, align: 'center'}
                , {field: 'fdetalReserve4', title: '确定时间', width: '27%', minWidth: 120, sort: true, align: 'center'}
                , {field: 'fBureauname', title: '配属局', width: '20%', minWidth: 55, align: 'center'}
                , {field: 'fSectionname', title: '配属段', width: '20%', minWidth: 55, align: 'center'}
                , {field: 'fInfoimage1', title: '图像识别', width: '15%', minWidth: 100, align: 'center'}
            ]]
            , page: false
            , height:450
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
        /*$("#main .layui-table tbody tr").dblclick(function (data) {
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
        })*/
    };
    window.setPage = function (rowCount) {
        layerparam = laypage.render({
            elem: 'pagination'
            , count: rowCount
            , layout: ['count', 'prev', 'page',  'next']
            , jump: function (obj, first) {
                vm.currentPage = obj.curr;
                if (!first) {
                    vm.query(obj.curr, 0);
                }
            }
        });
    };

    //构造出段列表
    window.initListOut = function (listdata) {
        table.render({
            elem: '#testOut'
            , id: 'idTestOut'
            , data: listdata
            , cols: [[
                {templet: function (d) { return d.LAY_INDEX+(pageNumOut-1)*10;}, width: '8%',}
                , {field: 'fid', title: 'ID', hide: true}
                , {
                    field: 'ftrainorder',
                    title: '车次',
                    width: '14%',
                    templet: '#usernameTpl',
                    align: 'center'
                }
                , {
                    field: 'fTraintypeverdict',
                    title: '识别车型',
                    width: '15%',
                    minWidth: 100,
                    align: 'center',
                    templet: '#titleTpl1'
                }
                , {
                    field: 'fTrainnumberverdict',
                    title: '识别车号',
                    width: '15%',
                    minWidth: 100,
                    align: 'center',
                    templet: '#titleTpl2'
                }
                , {field: 'fpasssite', title: '地点', width: '18%', minWidth: 65, align: 'center'}
                , {field: 'fpasspoint', title: '闸楼', width: '18%', minWidth: 65, align: 'center'}
                , {field: 'ftrainstatus', title: '当前里程(km)', width: '23%', minWidth: 65, align: 'center'}/*
                , {field: 'fdirection', title: '方向', width: '6%', minWidth: 55, align: 'center'}
                , {field: 'ftrainattribute', title: '出入里程(km)', width: '23%', minWidth: 65,align: 'center'}*/
                , {field: 'ftimethrough', title: '通过时间', width: '27%', minWidth: 130, sort: true, align: 'center'}
                , {field: 'fInforfid', title: '标签', width: '32%', minWidth: 150, align: 'center'}
                , {field: 'fdetalReserve2', title: '确认车型', width: '15%', minWidth: 100, align: 'center'}
                , {field: 'fdetalReserve5', title: '确认车号', width: '15%', minWidth: 100, align: 'center'}
                , {field: 'fdetalReserve3', title: '确定人', width: '20%', minWidth: 69, align: 'center'}
                , {field: 'fdetalReserve4', title: '确定时间', width: '27%', minWidth: 120, sort: true, align: 'center'}
                , {field: 'fBureauname', title: '配属局', width: '20%', minWidth: 55, align: 'center'}
                , {field: 'fSectionname', title: '配属段', width: '20%', minWidth: 55, align: 'center'}
                , {field: 'fInfoimage1', title: '图像识别', width: '15%', minWidth: 100, align: 'center'}
            ]]
            , page: false
            , height:450
        });
        $("#main .layui-table tbody tr").dblclick(function (data) {
            fid = $(".layui-table-hover td[data-field='fid'] div").html();
            var fTraintypeverdict = $(".layui-table-hover td[data-field='fTraintypeverdict'] div span").html();
            var fTrainnumberverdict = $(".layui-table-hover td[data-field='fTrainnumberverdict'] div span").html();
            var fBureauname = $(".layui-table-hover td[data-field='fBureauname'] div").html();
            var fSectionname = $(".layui-table-hover td[data-field='fSectionname'] div").html();
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
            $("#fBureauname").val(fBureauname);
            $("#fSectionname").val(fSectionname);
            index = layer.open({
                type: 1,
                title: '提示：请人工确认车型车号',
                shade: 0.2,
                area: ['480px', '430px'],
                content: $('#editerrorinfo')
            });
        })
    };
    window.setPageOut = function (rowCount) {
        layerparam = laypage.render({
            elem: 'paginationOut'
            , count: rowCount
            , layout: ['count', 'prev', 'page',  'next']
            , jump: function (obj, first) {
                vm.currentPage = obj.curr;
                if (!first) {
                    vm.queryOut(obj.curr, 0);
                }
            }
        });
    };
    vm.query(1, 1);
    vm.queryOut(1,1);
    $("#error").css("color", "Crimson");
    $("#all").css("color", "black");

    setInterval("vm.query(1,1)", 120000);
    setInterval("vm.queryOut(1,1)", 120000);
    setInterval("getdataJson()", 300000);
    /*
    setInterval("vm.checkChange()", 2000);*/

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
                $('td[data-content="正常"]').css('background-color', '#90EE90');
                $('td[data-content="正常"]').css('font-weight', 'bold');
                $('td[data-content="异常"]').css('background-color', 'red');
                $('td[data-content="异常"]').css('font-weight', 'bold');
                $('td[data-content="异常"]').css('color', 'black');

            } else {
                alert(r.msg);
            }
        },
        error: function (r) {
        }
    });
}

function queryJu() {
    var html = '';
    $.ajax({
        type: 'post',
        url: siteurl + '/train/chtraincheckinfo/queryJu',
        dataType: 'json',
        data: JSON.stringify({}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.juInfoList;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        if(levelmarkid == list[i].fdeviceid){
                            html += "<option selected value='" + list[i].fdeviceid + "'>" + list[i].fBureauname + "</option>"
                        }else{
                            html += "<option value='" + list[i].fdeviceid + "'>" + list[i].fBureauname + "</option>"
                        }
                    }
                }
                $("select[name='fBureaunameSelect']").append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}

function queryDuan(data) {
    var html = '<option value="">请选择</option>';
    $.ajax({
        type: 'post',
        url: siteurl + '/train/chtraincheckinfo/queryDuan',
        dataType: 'json',
        data: JSON.stringify({fBureauname:data}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.juInfoList;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        if(levelmarkid == list[i].fdeviceid){
                            html += "<option selected value='" + list[i].fdeviceid + "'>" + list[i].fSectionname + "</option>"
                        }else{
                            html += "<option value='" + list[i].fdeviceid + "'>" + list[i].fSectionname + "</option>"
                        }
                    }
                }
                $("select[name='fSectionnameSelect']").empty().append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}

function queryChang(data) {
    var html = '<option value="">请选择</option>';
    $.ajax({
        type: 'post',
        url: siteurl + '/train/chtraincheckinfo/queryChang',
        dataType: 'json',
        data: JSON.stringify({fSectionname:data}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.juInfoList;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        if(levelmarkid == list[i].fdeviceid){
                            html += "<option selected value='" + list[i].fdeviceid + "'>" + list[i].fpasssite + "</option>"
                        }else{
                            html += "<option value='" + list[i].fdeviceid + "'>" + list[i].fpasssite + "</option>"
                        }
                    }
                }
                $("select[name='fpasssiteSelect']").empty().append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}

var alldeviceList;
var fPasssiteAdd;
var fPasspointAdd;
function queryDecice(data) {
    var html = '<option value="">请选择</option>';
    $.ajax({
        type: "POST",
        url: siteurl + '/sys/levelmark/getdata',
        data: JSON.stringify({}),
        async: false,
        cache: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.deviceList;
                alldeviceList = r.deviceList;
                console.log(list);
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        if (list[i].f_LevelMarkID.indexOf(data) != -1) {
                            html += "<option value='" + list[i].f_LevelMarkID + "'>" + list[i].f_GeographyAddress + "</option>";
                        }
                    }
                }
                $("select[name='fdeviceSelect']").empty().append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}
