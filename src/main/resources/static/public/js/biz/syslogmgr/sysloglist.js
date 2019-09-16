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
    vm.getSysLogList(1);
    $('#pagination').pagination( vm.getOptionsFromForm());
});


//Vue对象
var vm = new Vue({
    el: '#main',
    data: {
        logSearch: {
            keywordTypeSwitch: 'username',
            timeSwitch: '',
            keyWords: '',
            startTime: '',
            endTime: ''
        }
    },
    methods: {
        //多条件查询数据
        query: function (pageNum) {
            if(vm.logSearch.timeSwitch == ''){
                vm.logSearch.startTime = $('#start').val();
                vm.logSearch.endTime = $('#end').val();
            }
            $.ajax({
                type: "POST",
                url: siteurl+'/sys/log/list/'+pageNum,
                data: JSON.stringify(vm.logSearch),//用户数据
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
        //新增日志
        add: function () {
            parent.addTabByContent(LOG_NEWLOG_INDEX,23,"新增日志",siteurl+'/sys/log/addlog');
        },
        //修改日志
        update: function (id) {

            parent.addTabByContent(LOG_EDITLOG_INDEX,23,"编辑日志",siteurl+'/sys/log/editlog/'+id);
        },
        //单个删除
        delete: function (id) {
            /*var id = gridObj.getRecordIndexValue(record, 'id');*/
            if(confirm("确定要删除选中的记录？")){
                $.ajax({
                    type: "POST",
                    url: siteurl+"/sys/log/delete/"+id,
                    contentType: "application/json",
                    success: function(r){
                        if(r.code == 0){
                            alert("删除成功!");
                            parent.refreshTab(23);
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
            var ids = gridObj.getCheckedValues('id');

            if(confirm("确定要删除选中的记录吗？")){
                $.ajax({
                    type: "POST",
                    url: siteurl+"/sys/log/deleteBatch/"+ids,
                    dataType: "json",
                    contentType:'application/json;charset=UTF-8',
                    success: function(r){
                        if(r.code == 0){
                            alert("删除成功!");
                            parent.refreshTab(23);
                        } else if(r.msg!=null && r.msg != ""){
                            alert(r.msg);
                        }
                    }

                });
            }
        },
        //初始化获取数据
        getSysLogList: function (pageNum) {
            if(vm.logSearch.timeSwitch == ''){
                vm.logSearch.startTime = $('#start').val();
                vm.logSearch.endTime = $('#end').val();
            }
            $.ajax({
                type: "POST",
                url: siteurl+'/sys/log/list/'+pageNum,
                data: JSON.stringify(vm.logSearch),//用户数据
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
            //$('#pagination').pagination( vm.getOptionsFromForm());
        },
         //回调函数
         pageselectCallback: function (api){
            vm.getSysLogList(api.getCurrent());
            //阻止单击事件
            return false;
        },
        //分页的页码条
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
            return '<a href="#" onclick="vm.update(\'' + gridObj.getRecordIndexValue(record, 'id') + '\');"><font color="#010101">编辑</font></a>';
        },
        //删除操作
        op2:function (record) {
            return '<a href="#" onclick="vm.delete(\'' + gridObj.getRecordIndexValue(record, 'id') + '\');">删除</a>';
        }
    }
});

//自定义时间查询隐藏/开启
$('.search-box input[type=radio]').click(function (e) {
    if ($(this).prop('checked')) {
        if ($(this).attr('data-define') === 'define') {
            $('.define-input').show();
        } else {
            $('.define-input').hide();
        }
    }
});
