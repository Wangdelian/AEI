layui.use(['table','laypage', 'layer','form', 'layedit', 'laydate'], function(){
    var laypage = layui.laypage
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,table = layui.table;
    var $=layui.$;
    form=layui.form;

    laydate.render({
        elem: '#ftimethrough'
        , type: 'datetime'
    });

    //监听表格复选框选择
    table.on('checkbox(demo)', function(obj){
        console.log(obj)
    });
    //监听提交
    form.on('submit(demo1)', function(data){
        data.field.fid = fid;
        data.field.ftguid = ftguid;
        console.log("---");
        console.log(data);
        //存储权限
        $.ajax({
            type: "POST",
            url: siteurl + "/train/chtraincheckinfo/update",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (r) {
                if (r.code === 0) {
                    parent.parent.layer.msg("操作成功");
                    parent.app.renderbymuneid("10",siteurl+"/train/chtraincheckinfo/searchlist");
                    parent.app.closeTab("311");
                } else {
                    parent.parent.layer.alert(r.msg);
                }
            }
        });
        return false;
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
});