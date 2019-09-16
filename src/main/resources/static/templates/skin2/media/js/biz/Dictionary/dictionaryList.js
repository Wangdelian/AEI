/**
 * Created by LCJ on 2018/1/26.
 */
var laypage = null;
var table = null;
var form = null;
var $ = null;
var pLayer = parent.layer;

layui.use(['table', 'laypage', 'form', 'layedit'], function () {
    laypage = layui.laypage;
    table = layui.table;
    form = layui.form;
    $ = layui.$;

    //监听表格复选框选择
    table.on('checkbox(demo)', function (obj) {
        console.log(obj)
    });

    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            pLayer.confirm('确定删除字典库么？', function (index) {
                vm.delete(data);
                pLayer.close(index);
            });
        } else if (obj.event === 'edit') {
            vm.MenuOpt.url = siteurl+'/generator/mqsdictlib/initializeEditDictionary/' + data.dictlibid;
            vm.MenuOpt.icon = '&#xe6c6;';
            vm.MenuOpt.title = '编辑字典配置';
            vm.MenuOpt.id = '277';
            parent.app.addTab(vm.MenuOpt);
        }
    });

    var active = {
        //获取选中数据
        getCheckData: function () {
            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            var tablenames = "";
            if (data.length > 0) {

                for (var i = 0; i < data.length; i++) {
                    tablenames += "," + data[i].dictlibid;
                }
                pLayer.confirm('确定删除字典库么？', function (index) {
                    vm.deleteLists(tablenames);
                    pLayer.close(index);
                });
            }
        },

        //增加字典配置
        addDictionary: function () {
            vm.MenuOpt.url = siteurl+'/generator/mqsdictlib/initializeAddDictionary';
            vm.MenuOpt.icon = '&#xe6c6;';
            vm.MenuOpt.title = '新增字典配置';
            vm.MenuOpt.id = '288';
            parent.app.addTab(vm.MenuOpt);
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

    window.initList = function (listdata) {
        table.render({
            elem: '#test'
            , id: 'idTest'
            , data: listdata
            , cols: [[{type: 'numbers'}
                , {type: 'checkbox'}
                , {field: 'dicttype', align: 'center', width: 150, title: '字典类型'}
                , {field: 'dicttypename', align: 'center', width: 150, title: '字典类型名称'}
                , {field: 'dictname', align: 'center', width: 150, title: '字典名称'}
                , {field: 'dictvalue', align: 'center', width: 150,title: '字典值'}
                , {field: 'isdefault', align: 'center', width: 150, title: '是否默认'}
                , {field: 'dictremark', align: 'center',  title: '备注'}
                , {fixed: 'right', align: 'center', width: 120, title: '操作', toolbar: '#barDemo'}
            ]]
            , page: false
        });
    };

    window.setPage = function (rowCount) {
        laypage.render({
            elem: 'pagination'
            , count: rowCount
            , layout: ['count', 'prev', 'page', 'next', 'skip']
            , jump: function (obj, isFirst) {
                if (!isFirst) {
                    vm.getDictionaryList(obj.curr);
                }
            }
        });
    };
    //table列表入口
    vm.getDictionaryList(1);
    /*调用字典类型下拉菜单动态加载*/
    vm.addTypeOption();
    //进行渲染
    form.render();
    //监听查询按钮提交
    form.on('submit(onSearch)', function(data){
        vm.onSearch(data);
    });

});
var vm = new Vue({
    el: '#main',
    data: {
        isRefreshDB: '',
        MenuOpt: {
            url: '',
            icon: '',
            title: '',
            id: ''
        },
        dictionarySearch: {
            dicttype: '',
            dictname: '',
            dictvalue: '',
            isdefault:'',
            dictremark:''
        }
    },
    methods: {
        getDictionaryList: function (pageNum) {
            var url = siteurl + '/generator/mqsdictlib/tablelist/' + pageNum;
            vm.sendAndGetMessages(url, vm.dictionarySearch, pageNum);
        },
        sendAndGetMessages: function (url, data, isRefreshDB) {
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(data),//用户数据
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {//判断请求
                        /*开始构造数据列表*/
                        initList(r.dictionaryList.list);

                        if (isRefreshDB == 1) {
                            setPage(r.dictionaryList.totalCount);
                        }
                    }
                    else {
                        alert(r.msg);
                    }
                }
            });
        },

        //查询事件
        onSearch: function (data) {
            vm.dictionarySearch.dicttype = $('#dicttypeid').val();
            vm.dictionarySearch.dictvalue = $('#dictvalue').val();
            vm.getDictionaryList(1);
        },

        //多项删除
        deleteLists: function (tablenames) {
            var ss = tablenames.substring(1);
            $.ajax({
                type: "POST",
                url: siteurl+'/generator/mqsdictlib/deleteLists/' + ss,
                // data: JSON.stringify(ss),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function () {
                    vm.getDictionaryList(1);
                }
            });
        },

        //单项删除
        delete: function (data) {
            var id=data.dictlibid;
            $.ajax({
                type: "POST",
                url: siteurl+'/generator/mqsdictlib/delete/' + id,
                async: false,
                contentType: 'application/json;charset=UTF-8',
                success: function () {
                    vm.getDictionaryList(1);
                }
            });
        },

        /*添加字典类型的下拉菜单*/
        addTypeOption: function () {
            $.ajax({
                url: siteurl+'/generator/mqsdictlibtype/addOption/-1',
                type: 'POST',
                async: false,
                success: function (data) {
                    //字典类型
                    html = '';
                    for (var i = 0; i < data.length; i++) {
                        html += '<option value=' + data[i].dicttypeid + '>' + data[i].dicttypename + '</option>';
                    }
                    $("select[name='dicttypeid']").append(html);
                },
                error: function (data) {
                    alert('查找板块报错');
                }
            });
        }
    }
});




