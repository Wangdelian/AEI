var gridObj;//表格对象

//页面加载完毕后执行函数
$(function () {
    vm.getDictionaryList(1);
    //设置分页 .pagination(需要的参数), getOptions()自定义参数的方法, pageselectCallback指定回调方法
    $('#pagination').show()
    $('#pagination').pagination(vm.getPageOptions("pageselectCallback"));
});

var vm = new Vue({
    el: '#main',
    data: {
        dictionarySearch: {
            keywordTypeSwitch: "name",
            keyWords: "",
            orderType: "dictId",//设定按照id排序，所需要选择排序，只需要更改此值
            order: "asc"//
        },
        data1: {"username": "controller", "password": "gz"},
        pageDatas: {
            coping: true,//是否显示首尾页
            totalData: 0,//数据总条数
            showData: 9,//每页显示数据数
            count: 2,//当前页前后链接数
            keepShowPN: true,//一直显示前后页
            jump: true,//是否显示跳转
            jumpBtn: "跳转",//跳转按钮名字
            isHide: false,
            homePage: '首页',
            endPage: '尾页',
            prevContent: '上页',
            nextContent: '下页',
            //回调方法设定
            callback: ''
        },
    },
    methods: {
        //新增功能
        onadddictionary: function () {
            parent.addTabByContent(DICTIONARY_NEWDICTIONARY_INDEX, 25, "增加字典", siteurl + '/sys/dictionary/initializeAddDictionary');
        },
        //编辑字典信息功能
        oneditdictionary: function (dictionaryId) {
            parent.addTabByContent(DICTIONARY_EDITDICTIONARY_INDEX, 25, "编辑字典", siteurl + '/sys/dictionary/initializeEditDictionary/' + dictionaryId);
        },
        //删除功能
        ondeldictionary: function (dictionaryId) {
            parent.parent.layer.confirm("确定删除吗？", {icon: 7,shade: 0.3, btn: ['确认', '取消']}, function () {
                var url = siteurl + "/sys/dictionary/delete/" + dictionaryId;
                $.ajax({
                    type: "POST",
                    url: url,
                    success: function (r) {
                        if (r.code === 0) {
                            parent.parent.layer.msg('删除操作成功');
                            setTimeout(function(){parent.refreshTab(25)},1000);
                        } else if(r.msg!=null && r.msg != ""){
                            parent.parent.layer.alert(r.msg, {shade: 0.3});
                        }
                    }
                })
            }, function () {
                parent.parent.layer.msg("已取消删除操作");
            })
        },

        //删除多项
        onDeleteItem: function () {
            parent.parent.layer.confirm("请确认多选删除操作", {icon: 7,shade: 0.3, btn: ['确认', '取消']}, function () {
                var ids = vm.getCheckedIds();
                var json = {};

                for (var i = 0; i < ids.length; i++) {
                    json[i] = ids[i];
                }

                $.ajax({
                    url: siteurl + "/sys/dictionary/deleteLists",
                    type: "POST",
                    data: JSON.stringify(json),
                    async: false,
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        if (r.code === 0) {
                            parent.parent.layer.msg('删除操作成功');
                            setTimeout(function(){parent.refreshTab(25)},1000);
                        } else if(r.msg!=null && r.msg != ""){
                            parent.parent.layer.msg(r.msg);
                        }
                    }
                });
            }, function () {
                parent.parent.layer.msg("已取消删除操作");
            })
        },
        //无条件请求数据
        getDictionaryList: function (pageNum) {
            var url = siteurl + '/sys/dictionary/list/' + pageNum;
            vm.sendAndGetMessages(url, vm.data1);
        },
        //搜索触发事件
        onSearch: function () {
            //主动调用onSearchMethod
            vm.onSearchMethod(1);
            $('#pagination').show();
            $('#pagination').pagination(vm.getPageOptions("conditionsSelectCallback"));
        },
        //搜索请求事件
        onSearchMethod: function (pageNum) {
            var url = siteurl + "/sys/dictionary/listByConditons/" + pageNum;

            //ajax请求
            vm.sendAndGetMessages(url, vm.dictionarySearch);
        },
        //获得选择的每行对象列表
        getCheckedRecords: function () {
            var records = new Array();
            $('#searchTable tbody tr').each(function () {
                if ($(this).find('td:eq(0)>input:checked').length == 1) {
                    records[records.length] = gridObj.getRowRecord($(this));
                }
            });
            return records;
        },

        //获取多选列表
        getCheckedIds: function () {
            var records = vm.getCheckedRecords();
            var ids = new Array();
            for (var i = 0; i < records.length; i++) {
                ids.push(gridObj.getRecordIndexValue(records[i], 'dictId'));
            }

            return ids;
        },
        //分页参数设定
        getPageOptions: function (callbackmethod) {
            vm.pageDatas.callback = callbackmethod == "conditionsSelectCallback" ?
                vm.conditionsSelectCallback : vm.pageselectCallback;

            return vm.pageDatas;//返回参数
        }
        ,

        //无条件查询回调函数
        pageselectCallback: function (api) {
            vm.getDictionaryList(api.getCurrent());//api.getCurrent()获取当前页页码，传递给getDictionaryList到后台取数据
            //阻止单击事件
            return false;
        }
        ,

        //多条件查询回调函数
        conditionsSelectCallback: function (api) {
            vm.onSearchMethod(api.getCurrent());
            //阻止单击事件
            return false;
        },
        //发送请求
        sendAndGetMessages: function (url, data) {
            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify(data),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        if (r.dictionaryList.totalCount != 0)
                            gridObj = $.fn.bsgrid.init('searchTable', {
                                localData: r.dictionaryList.list,//数据
                                pageSizeSelect: true,
                                showPageToolbar: false,
                                pageAll: true
                            });
                        else {
                            $("#searchTable tbody").html("");
                        }

                        vm.pageDatas.totalData = r.dictionaryList.totalCount;
                        vm.pageDatas.showData = r.dictionaryList.pageSize;
                    } else if(r.msg!=null && r.msg != ""){
                        parent.parent.layer.alert(r.msg);
                    }
                }
            });
        },
        //操作1,编辑按钮事件
        op1: function (record) {
            return '<a href="#" onclick="javascript:vm.oneditdictionary(\'' + gridObj.getRecordIndexValue(record, 'dictId') + '\');"><font color="#010101">编辑</font></a>';
        },
        //操作2,删除按钮事件
        op2: function (record) {
            return '<a href="#" onclick="javascript:vm.ondeldictionary(\'' + gridObj.getRecordIndexValue(record, 'dictId') + '\');">删除</a>';
        },
        //排序
        sortBy: function () {
            //每次排序都从头开始，并不影响分页
            var url = siteurl + "/sys/dictionary/listByConditons/" + 1;
            if (vm.dictionarySearch.order == "desc") {
                vm.dictionarySearch.order = "asc";
            }
            else {
                vm.dictionarySearch.order = "desc";
            }

            //发送请求
            vm.sendAndGetMessages(url, vm.dictionarySearch);
            $('#pagination').pagination(vm.getPageOptions("conditionsSelectCallback"));
        }
    }
})