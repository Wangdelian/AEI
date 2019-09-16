/**
 * Created by hh on 2017/7/26.
 */
/**
 * Created by hh on 2017/7/18.
 */
//var tbody ;//列表数据对象
var gridObj;//表格对象
//数据总得
var totalCount = 0;
// 页面显示的数据条数
var items_per_page = 8;

//页面加载完毕后执行函数
$(function () {
    //初始化表格数据
    vm.getUserSkinList(1);
    $('#pagination').pagination( vm.getOptionsFromForm());
});


var vm = new Vue({
    el: '#main',
    data: {
        skinSearch: {
            keyWords: '',
        }
    },
    methods: {
        //多条件查询数据
        query: function (pageNum) {
            $.ajax({
                type: "POST",
                url: siteurl+'/sys/userskin/list/'+pageNum,
                data: JSON.stringify(vm.skinSearch),//用户数据
                async: false,
                dataType: "json",
                contentType:'application/json;charset=UTF-8',
                success: function(r){
                    if (r.code === 0) {//判断请求
                        if (r.page.totalCount != 0)//判断是否有数据
                            gridObj = $.fn.bsgrid.init('searchTable', {
                                localData: r.page.list,//数据
                                pageSizeSelect: true,
                                showPageToolbar: false,
                                pageAll: true
                            });
                        else {
                            $("#searchTable tbody").html("");
                        }
                        debugger;
                        //获取总数据
                        totalCount = r.page.totalCount;
                        //设置每页数据量
                        items_per_page = r.page.pageSize;
                        $('#pagination').show();
                        $('#pagination').pagination( vm.getOptionsFromForm());
                    } else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });

        },
        //新增皮肤
        add: function () {
            parent.addTabByContent(SKIN_NEWSKIN_INDEX,35,"新增皮肤",siteurl+'/sys/userskin/addskin');
        },
        //修改皮肤信息
        update: function (userskinid) {
            parent.addTabByContent(SKIN_EDITSKIN_INDEX,35,"编辑皮肤",siteurl+'/sys/userskin/editskin/'+userskinid);
        },
        //单个删除
        delete: function (userskinid) {
            if(confirm("确定要删除选中的记录？")){
                $.ajax({
                    type: "POST",
                    url: siteurl+"/sys/userskin/delete/"+userskinid,
                    contentType: "application/json",
                    success: function(r){
                        if(r.code == 0){
                            alert("删除成功!");
                            parent.refreshTab(35);
                        } else if(r.msg!=null && r.msg != ""){
                            alert(r.msg);
                        }
                    }

                });
            }
        },
        //批量删除
        deleteItem: function (){
            //获取勾选的日志id数组
            var ids = gridObj.getCheckedValues('userskinid');

            if(confirm("确定要删除选中的记录吗？")){
                $.ajax({
                    type: "POST",
                    url: siteurl+"/sys/userskin/deleteBatch/"+ids,
                    dataType: "json",
                    contentType:'application/json;charset=UTF-8',
                    success: function(r){
                        if(r.code == 0){
                            alert("删除成功!");
                            parent.refreshTab(35);
                        } else if(r.msg!=null && r.msg != ""){
                            alert(r.msg);
                        }
                    }

                });
            }
        },
        //初始化表格数据
        getUserSkinList: function (pageNum) {
            $.ajax({
                type: "POST",
                url: siteurl+'/sys/userskin/list/'+pageNum,
                data: JSON.stringify(vm.skinSearch),//用户数据
                async: false,
                dataType: "json",
                contentType:'application/json;charset=UTF-8',
                success: function(r){
                    if (r.code === 0) {//判断请求
                        if (r.page.totalCount != 0)//判断是否有数据
                            gridObj = $.fn.bsgrid.init('searchTable', {
                                localData: r.page.list,//数据
                                pageSizeSelect: true,
                                showPageToolbar: false,
                                pageAll: true
                            });
                        else {
                            $("#searchTable tbody").html("");
                        }
                        debugger;
                        //获取总数据
                        totalCount = r.page.totalCount;
                        //设置每页数据量
                        items_per_page = r.page.pageSize;
                    } else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        //回调函数
        pageselectCallback: function (api){
            vm.getUserSkinList(api.getCurrent());
            //阻止单击事件
            return false;
        },
        //分页页码条
        getOptionsFromForm:function(){
            var data = {
                coping: true,//是否显示首尾页
                totalData: totalCount,//数据总条数
                showData: 10,//每页显示数据数
                count: 2,//当前页前后链接数
                keepShowPN: true,//一直显示前后页
                jump: true,//是否显示跳转
                jumpBtn: "跳转",//跳转按钮名字
                homePage: '首页',
                endPage: '尾页',
                prevContent: '上页',
                nextContent: '下页',
                //回调方法设定
                callback:vm.pageselectCallback
            }
            return data;//返回参数
        },
        //编辑操作
        op1:function(record)  {
            return '<a href="#" onclick="vm.update(\'' + gridObj.getRecordIndexValue(record, 'userskinid') + '\');"><font color="#010101">编辑</font></a>';
        },
        //删除操作
        op2:function (record) {
            return '<a href="#" onclick="vm.delete(\'' + gridObj.getRecordIndexValue(record, 'userskinid') + '\');">删除</a>';
        }
    }
});
