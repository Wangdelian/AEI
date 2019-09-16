/*******************************************************
 *修改标记
 *修改时间：2017/12/15 15:39
 *修改人：  dyc
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/

layui.use(['table','laypage', 'layer','form', 'layedit', 'laydate'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,table = layui.table;
    var $=layui.$;
    form=layui.form;

    laydate.render({
        elem: '#dateoccur'
        , calendar: true
    });

    laydate.render({
        elem: '#dateeraexecuted'
        , calendar: true
    });

    laydate.render({
        elem: '#dateicaexecuted'
        , calendar: true
    });

    laydate.render({
        elem: '#datepcaexecuted'
        , calendar: true
    });

    //监听表格复选框选择
    table.on('checkbox(demo)', function(obj){
        console.log(obj)
    });
    //监听工具条
    table.on('tool(demo)', function(obj){
        var data = obj.data;
        if(obj.event === 'build'){
            vm.codegen(data.tableName);
        }
    });
    addProductdeptOption();
    addProductlineOption(form);
    form.render();


    form.on('select(select1)', function (data) {
        inputValue('repaircontent')
    });

    //监听提交
    form.on('submit(demo1)', function(data){
        data.field.zerokmissueid=zerokmissueid;
        data.field.repaircontent=$("#repaircontentinput").val();
        //存储权限
        var url =  siteurl + "/mqs/mqszerokmissue/update";
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (r) {
                if (r.code === 0) {
                    parent.parent.layer.msg("操作成功");
                    parent.app.renderbymuneid("36",siteurl+"/mqs/mqszerokmissue/searchlist");
                } else {
                    parent.parent.layer.alert(r.msg);
                }
            }
        });
        return false;
    });


    var $ = layui.$, active = {
        getCheckData: function(){ //获取选中数据
            var checkStatus = table.checkStatus('idTest')
                ,data = checkStatus.data;
            var productiondeptids=[];
            if (data.length>0)
            {
                for (var i=0;i<data.length;i++)
                {
                    productiondeptids[i]=data[i].productiondeptid;
                }
                vm.del(productiondeptids);
            }
        }
        ,getCheckLength: function(){ //获取选中数目
            var checkStatus = table.checkStatus('idTest')
                ,data = checkStatus.data;
            layer.msg('选中了：'+ data.length + ' 个');
        }
        ,isAll: function(){ //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            layer.msg(checkStatus.isAll ? '全选': '未全选')
        }
        ,SearchList: function(){
            //查询按钮触发
            vm.update(16);
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
    /*监听关闭按钮的触发*/
    $('#close').on('click', function () {
        parent.app.closeTab('311');
    });
    window.Hello = function(listdata){
        //查询按钮触发
        table.reload('idTest', {
            data: listdata
        });
    };
    addOptions();
    addicc(form);
    form.render();
});

function addicc(form) {
    $('#icc_select').combogrid({
        mode: 'remote',//远程连接方式
        //fitColumns:true,//自动大小
        delay:1200,//1s延时查询
        striped: true,
        method: 'post',//请求方式
        required: true,
        dataType: 'json',
        panelWidth: 750,
        idField: 'iqiIcc',
        textField: 'iqiIcc',
        missingMessage:"这是必填项不能为空",
        url: siteurl+'/mqs/mqszerokmissue/addIccOption/'+ null,
        editable: true,
        columns: [[
            {field: 'iqiIcccode', title: 'Icc编码', width: 80},
            {field: 'iqiIcc', title: 'Icc名称', width: 220},
            {field: 'iqiVrt', title: 'Vrt名称', width: 100},
            {field: 'iqiVfg', title: 'Vfg名称', width: 140},
            {field: 'iqiCcc', title: 'Ccc名称', width: 200},
            {field: 'iqiModel', title: '模式', width: 120},
            {field: 'iqiSite', title: '部位', width: 140}

        ]],
        onClickRow: function (rowIndex, rowData) {
            $('#vrt').val(rowData.iqiVrt);
            $('#ccc').val( rowData.iqiCcc);
            $('#vfg').val( rowData.iqiVfg);
            $('#iqimodel').val( rowData.iqiModel);
            $('#iqisite').val( rowData.iqiSite);
            $('#iqiicccode').val( rowData.iqiIcccode);
            $('#iqiccccode').val( rowData.iqiCcccode);
            $('#iqivfgcode').val( rowData.iqiVfgcode);
            $('#iqivrtcode').val( rowData.iqiVrtcode);
            form.render();
        },
        fitColumns: true,
        keyHandler: {
            up: function () {               //【向上键】押下处理
                //取得选中行
                var selected = $('#icc_select').combogrid('grid').datagrid('getSelected');
                if (selected) {
                    //取得选中行的rowIndex
                    var index = $('#icc_select').combogrid('grid').datagrid('getRowIndex', selected);
                    //向上移动到第一行为止
                    if (index > 0) {
                        $('#icc_select').combogrid('grid').datagrid('selectRow', index - 1);
                    }
                } else {
                    var rows = $('#icc_select').combogrid('grid').datagrid('getRows');
                    $('#icc_select').combogrid('grid').datagrid('selectRow', rows.length - 1);
                }
            },
            down: function () {             //【向下键】押下处理
                //取得选中行
                var selected = $('#icc_select').combogrid('grid').datagrid('getSelected');
                if (selected) {
                    //取得选中行的rowIndex
                    var index = $('#icc_select').combogrid('grid').datagrid('getRowIndex', selected);
                    //向下移动到当页最后一行为止
                    if (index < $('#icc_select').combogrid('grid').datagrid('getData').rows.length - 1) {
                        $('#icc_select').combogrid('grid').datagrid('selectRow', index + 1);
                    }
                } else {
                    $('#icc_select').combogrid('grid').datagrid('selectRow', 0);
                }
            },

            enter: function () {             //【回车键】押下处理
                var grid=$('#icc_select').combogrid('grid');//获取表格对象
                var row = grid.datagrid('getSelected');//获取行数据
                //alert(row.iqi_Icccode);
                $('#vrt').attr('value',row.iqiVrt);
                $('#ccc').attr('value',row.iqiCcc);
                $('#vfg').attr('value',row.iqiVfg);
                $('#iqimodel').attr('value',row.iqiModel);
                $('#iqisite').attr('value',row.iqiSite);
                $('#iqiicccode').attr('value',row.iqiIcccode);
                $('#iqiccccode').attr('value',row.iqiCcccode);
                $('#iqivfgcode').attr('value',row.iqiVfgcode);
                $('#iqivrtcode').attr('value',row.iqiVrtcode);
                $('#icc_select').combogrid('hidePanel');
            },
            query: function (keyword) {
                if (keyword == "") {
                    keyword="null";
                }
                var keywordencode = encodeURI(keyword);
                //设置查询参数
                var queryParams = $('#icc_select').combogrid('grid').datagrid('options').queryParams;
                $.ajax({
                    type: 'POST',
                    url : siteurl+'/mqs/mqszerokmissue/addIccOption/'+keywordencode,
                    success: function (result) {
                        $('#icc_select').combogrid('grid').datagrid('loadData', result);
                        if(keyword=='null') {
                            keyword='';
                        }
                        $('#icc_select').combogrid('setValue', keyword);
                    }
                });
            }
        }
    });
}
function addOptions(){
    $.ajax({
        url: siteurl+'/mqs/mqszerokmissue/addOptions',
        type: 'post',
        async: false,
        success: function (data) {
            /*系列*/
            html = '';
            for (var i = 0; i < data.enginemodellist.length; i++) {
                if(enginemodel==data.enginemodellist[i].dictvalue){
                    html += '<option selected value=' + data.enginemodellist[i].dictvalue + '>' + data.enginemodellist[i].dictvalue + '</option>';
                }else{
                    html += '<option value=' + data.enginemodellist[i].dictvalue + '>' + data.enginemodellist[i].dictvalue + '</option>';
                }
            }
            $("select[name='enginemodel']").append(html);

            /*问题属性*/
            html = '';
            for (var i = 0; i < data.issueattrlist.length; i++) {
                if(issueattr==data.issueattrlist[i].dictvalue){
                    html += '<option selected value=' + data.issueattrlist[i].dictvalue + '>' + data.issueattrlist[i].dictvalue + '</option>';
                }else{
                    html += '<option value=' + data.issueattrlist[i].dictvalue + '>' + data.issueattrlist[i].dictvalue + '</option>';
                }
            }
            $("select[name='issueattr']").append(html);

            /*责任单位*/
            html = '';
            for (var i = 0; i < data.dutydeptlist.length; i++) {
                if(dutydept==data.dutydeptlist[i].dictvalue){
                    html += '<option selected value=' + data.dutydeptlist[i].dictvalue + '>' + data.dutydeptlist[i].dictvalue + '</option>';
                }else{
                    html += '<option value=' + data.dutydeptlist[i].dictvalue + '>' + data.dutydeptlist[i].dictvalue + '</option>';
                }
            }
            $("select[name='dutydept']").append(html);

            /*状态*/
            html = '';
            for (var i = 0; i < data.zkissuestatuslist.length; i++) {
                if(zkissuestatus==data.zkissuestatuslist[i].dictvalue){
                    html += '<option selected value=' + data.zkissuestatuslist[i].dictvalue + '>' + data.zkissuestatuslist[i].dictvalue + '</option>';
                }else{
                    html += '<option value=' + data.zkissuestatuslist[i].dictvalue + '>' + data.zkissuestatuslist[i].dictvalue + '</option>';
                }
            }
            $("select[name='zkissuestatus']").append(html);

            /*维修方法*/
            html = '';
            for (var i = 0; i < data.repaircontentlist.length; i++) {
                if(repaircontent==data.repaircontentlist[i].dictvalue){
                    html += '<option selected value=' + data.repaircontentlist[i].dictvalue + '>' + data.repaircontentlist[i].dictvalue + '</option>';
                }else{
                    html += '<option value=' + data.repaircontentlist[i].dictvalue + '>' + data.repaircontentlist[i].dictvalue + '</option>';
                }
            }
            $("select[name='repaircontent']").append(html);

            /*采集点*/
            html = '';
            for (var i = 0; i < data.pstationlist.length; i++) {
                if(pstation==data.pstationlist[i].dictvalue){
                    html += '<option selected value=' + data.pstationlist[i].stationname + '>' + data.pstationlist[i].stationname + '</option>';
                }else{
                    html += '<option value=' + data.pstationlist[i].stationname + '>' + data.pstationlist[i].stationname + '</option>';
                }
            }
            $("select[name='pstation']").append(html);

            /*问题严重程度*/
            html = '';
            for (var i = 0; i < data.issueseveritylist.length; i++) {
                if(issueseverity==data.issueseveritylist[i].dictvalue){
                    html += '<option selected value=' + data.issueseveritylist[i].dictvalue + '>' + data.issueseveritylist[i].dictvalue + '</option>';
                }else{
                    html += '<option value=' + data.issueseveritylist[i].dictvalue + '>' + data.issueseveritylist[i].dictvalue + '</option>';
                }
            }
            $("select[name='issueseverity']").append(html);

            /*机型*/
            html = '';
            for (var i = 0; i < data.enginetypelist.length; i++) {
                if(enginetype==data.enginetypelist[i].dictvalue){
                    html += '<option selected value=' + data.enginetypelist[i].dictvalue + '>' + data.enginetypelist[i].dictvalue + '</option>';
                }else{
                    html += '<option value=' + data.enginetypelist[i].dictvalue + '>' + data.enginetypelist[i].dictvalue + '</option>';
                }
            }
            $("select[name='enginetype']").append(html);

            /*发生基地*/
            html = '';
            for (var i = 0; i < data.productionbaselist.length; i++) {
                if(productionbase==data.productionbaselist[i].dictvalue){
                    html += '<option selected value=' + data.productionbaselist[i].dictvalue + '>' + data.productionbaselist[i].dictvalue + '</option>';
                }else{
                    html += '<option value=' + data.productionbaselist[i].dictvalue + '>' + data.productionbaselist[i].dictvalue + '</option>';
                }
            }
            $("select[name='productionbase']").append(html);

            /*完成状态*/
            html = '';
            for (var i = 0; i < data.finishedstatuslist.length; i++) {
                if(finishedstatus==data.finishedstatuslist[i].dictvalue){
                    html += '<option selected value=' + data.finishedstatuslist[i].dictvalue + '>' + data.finishedstatuslist[i].dictvalue + '</option>';
                }else{
                    html += '<option value=' + data.finishedstatuslist[i].dictvalue + '>' + data.finishedstatuslist[i].dictvalue + '</option>';
                }
            }
            $("select[name='finishedstatus']").append(html);

            /*周*/
            html = '';
            var　weekarr = ["第1周","第2周","第3周","第4周"];
            for(var i=0;i<weekarr.length;i++){
                if(zkweek == weekarr[i]){
                    html += '<option selected value='+weekarr[i]+'>'+weekarr[i]+'</option>';
                }else{
                    html += '<option  value='+weekarr[i]+'>'+weekarr[i]+'</option>';
                }
            }
            $("select[name='zkweek']").append(html);

        },
        error: function () {
            alert('查找板块报错');
        }
    })

}

function addProductdeptOption() {
    $.ajax({
        url: siteurl+'/mqs/mqsproductdept/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            var html='';
            for (var i = 0; i < data.length; i++) {//循环数据
                if(productiondeptname==data[i].productiondeptname){
                    html += '<option selected value= "'+data[i].productiondeptname +'">'+ data[i].productiondeptname+'</option>'
                }else{
                    html += '<option value="'+data[i].productiondeptname + '">'+data[i].productiondeptname + '</option>'
                }
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
            for(var i=0;i<data.length;i++){
                if(productionlinename==data[i].productionlinename){
                    html += '<option selected value= "'+data[i].productionlinename +'">'+ data[i].productionlinename+'</option>'
                }else{
                    html += '<option value="'+data[i].productionlinename + '">'+data[i].productionlinename + '</option>'
                }
            }
            $("select[name='productionlinename']").append(html);
            form.render();
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
};

function inputValue(idName) {
    var arrValue=document.getElementById(idName).options[document.getElementById(idName).selectedIndex].value;
    $("#"+idName+"").parent('span').next('span').children('input.repaircontentinput').val(arrValue)
}