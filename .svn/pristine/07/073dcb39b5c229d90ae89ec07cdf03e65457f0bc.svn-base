/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JQuery版本： 
 *Vue.js版本：
 *公司名称：
 *命名空间：io.jeasyframework.controller
 *文件名：  andonreport.js 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/06/20 15:39
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/06/20 15:39
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
var gridObj;//表格对象
//数据总得
var totalCount = 0;
//页面显示的数据条数
var items_per_page = 8;


//页面加载完毕后执行函数
$(function () {
    //初始化表格数据
    vm.getAndonReportList(1,false);
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
            vm.getAndonReportList(pageNum,true);
        },
        /**
         * 描述：初始化获取数据
         * 参数说明：
         * pageNum        页码
         * isResetPageNo  是否重置页码为1
         */
        getAndonReportList: function (pageNum,isResetPageNo) {
            if(vm.logSearch.timeSwitch == ''){
                vm.logSearch.startTime = $('#start').val();
                vm.logSearch.endTime = $('#end').val();
            }
            $.ajax({
                type: "POST",
                url: siteurl+'/biz/report/listbygroupcheckreport/'+pageNum,
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
                        
                        //获取总数据
                        totalCount = r.page.totalCount;
                        //设置每页数据量
                        items_per_page = r.page.pageSize;
                        if (isResetPageNo==true)
                        {
                            $('#pagination').show();
                            $('#pagination').pagination( vm.getOptionsFromForm());
                        }
                    } else  if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        /*
        * 翻页回调函数
        */
        pageselectCallback: function (api){
            vm.getAndonReportList(api.getCurrent());
            //阻止单击事件
            return false;
        },
        /*
        * 翻页参数初始化
        */
        getOptionsFromForm:function(){
        var data = {
            coping: true,//是否显示首尾页
            totalData: totalCount,//数据总条数
            showData: CONST_PAGESIZE,//每页显示数据数
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
