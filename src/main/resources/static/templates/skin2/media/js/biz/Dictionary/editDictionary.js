/**
 * Created by LCJ on 2018/1/29.
 */
var laypage = null;
var pLayer = parent.layer;
var form = null;
var $ = null;

layui.use(['laypage', 'form'], function () {

    laypage = layui.laypage;
    form = layui.form;
    $ = layui.$;
    /*调用字典类型下拉菜单动态加载*/
    addTypeOption();
    /*调用字典是否默认下拉菜单动态加载*/
    addIsDefaultOption();
    form.render();

    form.on('submit(demo1)', function (data) {
        $.ajax({
            url: siteurl+'/generator/mqsdictlib/update',
            type: 'POST',
            data: JSON.stringify(data.field),
            async: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                var MenuOpt = {
                    url:  siteurl +'/generator/mqsdictlib/initializeDictionaryList',
                    icon: '&#xe6c6;',
                    title: '字典配置',
                    id: '17'
                };
                parent.app.closeTab('17');
                parent.app.addTab(MenuOpt);
                parent.parent.layer.msg("操作成功");
                parent.app.closeTab('288');
            },
            error: function (data) {
                alert('查找板块报错');
            }
        });
        return false;
    });

});

/*添加字典类型的下拉菜单*/
function addTypeOption(data) {
    $.ajax({
        url: siteurl+'/generator/mqsdictlibtype/addOption/'+dicttype,
        type: 'POST',
        async: false,
        success: function (data) {
            //字典类型
            html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<option value=' + data[i].dicttypeid + '>' + data[i].dicttypename + '</option>';
            }
            $("select[name='dicttype']").empty().append(html);
        },
        error: function (data) {
            alert('查找板块报错');
        }
    });
}

/*调用字典是否默认下拉菜单动态加载*/
function addIsDefaultOption() {
    html = '';
    if(isdefault>0){
        html += '<option value=1 selected>' + '是' + '</option>';
        html+='<option value=0>' + '否'+ '</option>';
    }else{
        html+='<option value=0 selected>' + '否' + '</option>';
        html += '<option value=1>' + '是' + '</option>';
    }
    $("select[name='isdefault']").empty().append(html);
}