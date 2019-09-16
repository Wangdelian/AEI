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
    vm.getmesSchedule(linecode);
});
/**
 **vue js
 */
var  vm=new Vue({
    el: '#main',
    data: {
        productionline:{
        },
        mesMax:{}
    },
    methods:{
        getmesSchedule : function(id){

            $.get(siteurl+"/mes/productline/info/"+id, {"time": new Date().getTime()}, function(r){
                vm.productionline = r.product;
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
        saveOrUpdate: function (event) {
            //存储权限
            var url = vm.productionline.linecode == null ? siteurl+"/mes/productline/save" : siteurl+"/mes/productline/update";
            $.ajax({
                type: "POST",
                url: url,
                aysc:false,
                contentType: "application/json",
                data: JSON.stringify(vm.productionline),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功');
                    }else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        //查询事件
        onSearch:function () {
            $.ajax({
                type: "POST",
                url: siteurl+'/sys/role/list/'+1,
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
    }
});