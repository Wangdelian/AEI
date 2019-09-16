$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'generator/mqsregion/list',
        datatype: "json",
        colModel: [			
			{ label: 'regionid', name: 'regionid', index: 'REGIONID', width: 50, key: true },
			{ label: '区域Code', name: 'regioncode', index: 'REGIONCODE', width: 80 }, 			
			{ label: '采集点名称', name: 'regionname', index: 'REGIONNAME', width: 80 }, 			
			{ label: '备注', name: 'remark', index: 'REMARK', width: 80 }, 			
			{ label: '生产线ID', name: 'productionlineid', index: 'PRODUCTIONLINEID', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		mqsRegion: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.mqsRegion = {};
		},
		update: function (event) {
			var regionid = getSelectedRow();
			if(regionid == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(regionid)
		},
		saveOrUpdate: function (event) {
			var url = vm.mqsRegion.regionid == null ? "generator/mqsregion/save" : "generator/mqsregion/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.mqsRegion),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else if(r.msg!=null && r.msg != ""){
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var regionids = getSelectedRows();
			if(regionids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "generator/mqsregion/delete",
                    contentType: "application/json",
				    data: JSON.stringify(regionids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else if(r.msg!=null && r.msg != ""){
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(regionid){
			$.get(baseURL + "generator/mqsregion/info/"+regionid, function(r){
                vm.mqsRegion = r.mqsRegion;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});