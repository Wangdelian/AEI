/**
 * Created by Administrator on 2017/7/14 0014.
 */
var tbody ;//列表数据对象
var gridObj;//表格对象
var datatest="{'username':'controller'}";
var data1={"username":"controller","password":"gz"};
//数据总得
var totalCount = 0;
// 页面显示的数据条数
var items_per_page = 10;
//加载完页面执行
$(function () {
    vm.getProductList(1);
    $('#pagination').pagination(vm.getOptions());
});

//操作1
function op1(record, rowIndex, colIndex, options) {
    return '<a href="#" onclick="javascript:vm.oneditsysrole(\'' + gridObj.getRecordIndexValue(record, 'linecode') + '\');"><font color="#010101">编辑</font></a>';
}
//操作2
function op2(record, rowIndex, colIndex, options) {
    return '<a href="#" onclick="javascript:vm.ondeleteline(\'' + gridObj.getRecordIndexValue(record, 'linecode') + '\');">删除</a>';
}
/**
 **vue js
 */
var  vm=new Vue({
    el: '#main',
    data: {
        searchCase:{
            LineName:''
        }
    },
    methods:{
        getProductList:  function (page) {
            $.ajax({
                type: "POST",
                url: siteurl+'/mes/productline/list/'+page,
                data:JSON.stringify( vm.searchCase),
                async: false,
                dataType: "json",
                contentType:'application/json;charset=UTF-8',
                success: function(r){
                    if(r.code == 0){
                        tbody=r.page.list;
                        console.log(tbody);
                        gridObj = $.fn.bsgrid.init('searchTable', {
                            localData: r.page.list,//数据
                            pageSizeSelect: true,
                            showPageToolbar:false,
                            pageAll: true
                        });
                        totalCount=r.page.totalCount;
                    }else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        //分页参数设定
        getOptions:function (callbackmethod) {
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
                callback: vm.pageselectCallback
            }

            return data;//返回参数
        },


        //回调函数
        pageselectCallback: function (page){
            this.getProductList(page.getCurrent());
            //阻止单击事件
            return false;
        },

        //获取选中checkbox的ID值
        getCheckedIds:  function () {

            var records = this.getCheckedRecords();
            var ids = '';
            for(var i = 0; i < records.length; i++) {
                ids += ',' + gridObj.getRecordIndexValue(records[i], 'linecode');
            }
            var idss=new Array();
            ids=ids.substring(1);
            idss=ids.split(",");
            return idss;
        },
//
        getCheckedRecords:  function () {
            var records = new Array();
            $('#searchTable tbody tr').each(function() {
                if($(this).find('td:eq(0)>input:checked').length == 1){
                    records[records.length] = gridObj.getRowRecord($(this));
                }
            });
            return records;
        },
        //编辑操作
        oneditsysrole: function (linecode)
        {

            parent.addTabByContent(EDITPRODUCTLINE_INDEX,6,"编辑角色",siteurl+'/mes/productline/edit/'+linecode);
        },
        //新增事件
        onAddItem: function ()
        {

            parent.addTabByContent(ADDLINME_INDEX,6,"新增角色","/mes/productline/add");
        },
        //批量删除
        onDeleteItem:function  () {
            var ids = this.getCheckedIds();
            if(confirm('确定;要删除选中的记录？')){
                $.ajax({
                    type: "post",
                    url: siteurl+'/mes/productline/delete/'+ids,
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    dataType: "json",
                    async: false,
                    success: function(r){
                        if(r.code == 0){
                            alert('操作成功', function(index){
                                this.reload();
                            });
                        }else if(r.msg!=null && r.msg != ""){
                            alert(r.msg);
                        }
                    }
                });
            }

        },
//删除操作
        ondeleteline:function(linecode)
        {
            var arrId=new Array(1);
            arrId[0]=linecode;
            if(confirm('确定要删除选中的记录？')){

                $.ajax({
                    type: "post",
                    url: siteurl+'/mes/productline/delete/'+arrId,
                    contentType: "application/json",
                    data: JSON.stringify(arrId),
                    async: false,
                    dataType: "json",
                    success: function(r){
                        if(r.code == 0){
                            alert('操作成功', function(index){
                                this.reload();

                            });
                        }else if(r.msg!=null && r.msg != ""){
                            alert(r.msg);
                        }
                    }
                });
            }
        },
        /**
         * Created by Administrator on 2017/7/19 0019.
         */
        //查询事件
        onSearch:function () {
            $.ajax({
                type: "POST",
                url: siteurl+'/mes/productline/list/'+1,
                data:JSON.stringify(vm.searchCase),
                async: false,
                dataType: "json",
                contentType:'application/json;charset=UTF-8',
                success: function(r){
                    if(r.page.totalCount>0) {
                        if (r.code === 0) {
                            tbody = r.page.list;
                            console.log(tbody);
                            gridObj = $.fn.bsgrid.init('searchTable', {
                                localData: r.page.list,//数据
                                pageSizeSelect: true,
                                showPageToolbar: false,
                                pageAll: true
                            });
                            totalCount = r.page.totalCount;
                            $('#pagination').show();
                            $('#pagination').pagination(vm.getOptions());
                        } else if(r.msg!=null && r.msg != ""){
                            alert(r.msg);
                        }
                    }else{
                        $("#searchTable tbody").html("");
                        $('#pagination').hide();
                    }
                }
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'username': vm.q.username},
                page: page
            }).trigger("reloadGrid");
        },
    }
});