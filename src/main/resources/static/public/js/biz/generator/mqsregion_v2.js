/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JQuery版本： 
 *Vue.js版本：
 *公司名称：
 *命名空间：
 *文件名：  mqsRegion.js 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@gmail.com
 *创建时间：2017-12-15 11:24:13
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017-12-15 11:24:13
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
var gridObj;

var totalCount = 0;

var items_per_page = 8;



$(function () {

    vm.getMqsRegionList(1,false);
    $("#pagination").pagination( vm.getOptionsFromForm());
});


var vm = new Vue({
    el: "#main",
    data: {
        logSearch: {
            keywordTypeSwitch: "username",
            timeSwitch: "",
            keyWords: "",
            startTime: "",
            endTime: ""
        }
    },
    methods: {

        query: function (pageNum) {
            vm.getMqsRegionList(pageNum,true);
        },

        getMqsRegionList: function (pageNum,isResetPageNo) {
            if(vm.logSearch.timeSwitch == ""){
                vm.logSearch.startTime = $("#startdate").val();
                vm.logSearch.endTime = $("#enddate").val();
            }
            $.ajax({
                type: "POST",
                url: siteurl+"/biz/report/listbyandonreport/"+pageNum,
                data: JSON.stringify(vm.logSearch),
                async: false,
                dataType: "json",
                contentType:"application/json;charset=UTF-8",
                success: function(r){
                    if (r.code === 0) {
                        if (r.page.totalCount != 0)
                            gridObj = $.fn.bsgrid.init("searchTable", {
                                localData: r.page.list,
                                pageSizeSelect: true,
                                showPageToolbar: false,
                                pageAll: true
                            });
                        else {
                            $("#searchTable tbody").html("");
                        }
                        
                        
                        totalCount = r.page.totalCount;
                       
                        items_per_page = r.page.pageSize;
                        if (isResetPageNo==true)
                        {
                            $("#pagination").show();
                            $("#pagination").pagination( vm.getOptionsFromForm());
                        }
                    } else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        
        pageselectCallback: function (api){
            vm.getMqsRegionList(api.getCurrent());
           
            return false;
        },
        
        getOptionsFromForm:function(){
        var data = {
            coping: true,
            totalData: totalCount,
            showData: CONST_PAGESIZE,
            count: 2,
            keepShowPN: true,
            jump: true,
            jumpBtn: "跳转",
            homePage: "首页",
            endPage: "尾页",
            prevContent: "上页",
            nextContent: "下页",
            callback:vm.pageselectCallback
        }
         return data;
        }
    }
});

$(".search-box input[type=radio]").click(function (e) {
    if ($(this).prop("checked")) {
        if ($(this).attr("data-define") === "define") {
            $(".define-input").show();
        } else {
            $(".define-input").hide();
        }
    }
});
