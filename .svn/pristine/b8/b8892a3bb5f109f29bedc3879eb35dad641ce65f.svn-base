/*声明layui*/
layui.use(['laypage', 'layer', 'form'], function () {
    var laypage = layui.laypage, layer = layui.layer;
    var form = layui.form;
    addOption();
    form.render();

    //监听提交
    form.on('submit(demo1)', function(data){

        $.ajax({
            url: siteurl+'/mqs/mqsstation/save',
            type: 'POST',
            data:JSON.stringify(data.field),
            async: false,
            dataType: "json",
            contentType:'application/json;charset=UTF-8',
            success: function (data) {
                var MenuOpt = {
                    url: siteurl+'/mqs/mqsstation/searchlist/',
                    icon: '&#xe6c6;',
                    title: '采集点管理',
                    id: '21'
                };
                parent.app.closeTab('21');
                parent.app.addTab(MenuOpt);
                parent.parent.layer.msg("操作成功");
                parent.app.closeTab('222');

            },
            error: function (data) {
                alert('查找板块报错');
            }
        });
        return false;
    });

});
//动态添加option
function addOption() {
    $.ajax({
        url: siteurl+'/mqs/mqsstation/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            //生产线
            var html = '';
            for (var i = 0; i < data.productionline.length; i++) {
                html += '<option value=' + data.productionline[i].productionlineid + '>' + data.productionline[i].productionlinename + '</option>';
            }
            $("select[name='productionlineid']").append(html);
            //区域
            var html = '';
            for (var i = 0; i < data.region.length; i++) {
                html += '<option value=' + data.region[i].regionid + '>' + data.region[i].regionname + '</option>';
            }
            $("select[name='regionid']").append(html);
            //MES工位
            var html = '';
            for (var i = 0; i < data.mesStation.length; i++) {
                html += '<option value=' + data.mesStation[i].messtationid + '>' + data.mesStation[i].messtationname + '</option>';
            }
            $("select[name='mesStationid']").append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
};


