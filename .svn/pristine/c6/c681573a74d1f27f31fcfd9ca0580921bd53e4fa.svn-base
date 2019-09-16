/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JQuery版本： 
 *Vue.js版本：
 *公司名称：
 *命名空间：io.jeasyframework.controller
 *文件名：  sysloglist.js 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/12/12 15:39
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/12/12 15:39
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/

$(function () {
    //初始化表格数据

});
layui.use(['table','laypage', 'layer','form', 'layedit', 'laydate'], function(){
	var laypage = layui.laypage,layer = layui.layer;
	var table = layui.table;
	var form = layui.form;
	  
	
	//监听表格复选框选择
	table.on('checkbox(demo)', function(obj){
		console.log(obj)
	});
	//监听工具条
	table.on('tool(demo)', function(obj){
		var data = obj.data;
		if(obj.event === 'build'){
            vm.codegen(data.tableName);
		} 
	});

	var $ = layui.$, active = {
		getCheckData: function(){ //获取选中数据
			var checkStatus = table.checkStatus('idTest')
			,data = checkStatus.data;
			var tablenames='';
			if (data.length>0)
			{
				
				for (var i=0;i<data.length;i++)
				{
					if (tablenames=='')
					{
						tablenames=data[i].tableName;
					}
					else
					{
						tablenames=tablenames+','+data[i].tableName;
					}
				}
				vm.codegen(tablenames);
			}

			//layer.alert(tablenames);
			//layer.alert(JSON.stringify(data));
		}
		,getCheckLength: function(){ //获取选中数目
			var checkStatus = table.checkStatus('idTest')
			,data = checkStatus.data;
			layer.msg('选中了：'+ data.length + ' 个');
		}
		,isAll: function(){ //验证是否全选
			var checkStatus = table.checkStatus('idTest');
			layer.msg(checkStatus.isAll ? '全选': '未全选')
		}
		,SearchList: function(){
			alert('test11111');
			//查询按钮触发
			vm.update(16);
		}
	};
		  
	$('.demoTable .layui-btn').on('click', function(){
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	$('.layui-btn').on('click', function(){
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	window.Hello = function(listdata){
	   //查询按钮触发
		table.reload('idTest', {
		  data: listdata
		});
	}
	//构造列表
	window.initList = function(listdata){
		table.render({
			elem: '#test'
			,id:'idTest'
			,data:listdata
			,cellMinWidth: 80
			,height:'full-130'
			,cols: [[
			  {type:'numbers'}
			  ,{type: 'checkbox'}
			  ,{field:'tableName', title:'唯一ID', width:300, unresize: true, sort: true}
			  ,{field:'tableName',width:300, title:'表名', templet: '#usernameTpl'}
			  ,{field:'comments',width:350, title:'备注'}
			  ,{fixed: 'right', title:'操作',width:178, align:'center', toolbar: '#barDemo'}
			]]
			,page: false
		});
	}
	window.setPage= function(rowCount)
	{
		laypage.render({
			elem: 'pagination'
			,count: rowCount
			,layout: ['count', 'prev', 'page', 'next',  'skip']
			,jump: function(obj, first){
			    
			    if(!first){
			        vm.query(obj.curr,0);
				    console.log(obj.curr);
			    }
		 	}
		});
	}
	window.onSearch= function(conditionObj,pageNum)
	{
		
	}
	//列表入口
	vm.query(1,1);

});
var vm = new Vue({
    el: '#main',
	data: {
        logSearch: {
            tableName: ''
        }
    },
    methods: {
        //得到参数
        query: function (pageNum,isRefreshDB) {
            //onSearch(JSON.stringify(vm.logSearch),pageNum);
			console.log(isRefreshDB);
            $.ajax({
			    type: "POST",
			    url: siteurl+'/sys/generator/tablelist/'+pageNum,
			    data: JSON.stringify(vm.logSearch),//用户数据
			    async: false,
			    dataType: "json",
			    contentType:'application/json;charset=UTF-8',
			    success: function(r){
			        if (r.code === 0) {//判断请求
			            //console.log(r.page.list);
						initList(r.page.list);
						if (isRefreshDB==1)
						{
							setPage(r.page.totalCount);
						}
			        } else if(r.msg!=null && r.msg != ""){
			            alert(r.msg);
			        }
			    }
			});	
        },
        //修改日志
        update: function (id) {

        },
        codegen:function(tablenames)
        {
            location.href = siteurl+"/sys/generator/codegen?tables=" + tablenames;
        }
    }
});
function ontestalpha()
{
	 Hello();
}