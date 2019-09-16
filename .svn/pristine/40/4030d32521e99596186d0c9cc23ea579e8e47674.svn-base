var gridObj;//表格对象
//Vue对象
var vm = new Vue({
        el: '#main',
        data: {
            q: {
                username: null
            },
            showList: true,
            title: systemname,
            roleList: {},
            user: {
                status: 1,
                roleIdList: []
            },
            userSearch: {
                /*keywordTypeSwitch: 'username',*/
                timeSwitch: 'all',
                keyWords: '',
                startTime: '',
                endTime: '',
                order: 'asc',
                orderType: 'user_id'
            },
            data1: {"username": "controller", "password": "gz"},
            pageDatas: {
                coping: true,//是否显示首尾页
                totalData: 0,//数据总条数
                showData: 6,//每页显示数据数
                count: 2,//当前页前后链接数
                keepShowPN: true,//一直显示前后页
                jump: true,//是否显示跳转
                jumpBtn: "跳转",//跳转按钮名字
                isHide: false,
                homePage: '首页',
                endPage: '尾页',
                prevContent: '上页',
                nextContent: '下页',
                callback: ''
            }
        },
        methods: {
            add: function () {
                vm.showList = false;
                vm.title = "新增";
                vm.roleList = {};
                vm.user = {status: 1, roleIdList: []};

                //获取角色信息
                this.getRoleList();
            },
            update: function () {
                var userId = getSelectedRow();
                if (userId == null) {
                    return;
                }

                vm.showList = false;
                vm.title = "修改";

                vm.getUser(userId);
                //获取角色信息
                this.getRoleList();
            },
            del: function () {
                var userIds = getSelectedRows();
                if (userIds == null) {
                    return;
                }

                confirm('确定要删除选中的记录？', function () {
                    $.ajax({
                        type: "POST",
                        url: "../sys/user/delete",
                        contentType: "application/json",
                        data: JSON.stringify(userIds),
                        success: function (r) {
                            if (r.code == 0) {
                                alert('操作成功', function (index) {
                                    vm.reload();
                                });
                            } else if(r.msg!=null && r.msg != ""){
                                alert(r.msg);
                            }
                        }
                    });
                });
            },
            saveOrUpdate: function (event) {
                var url = vm.user.userId == null ? "../sys/user/save" : "../sys/user/update";
                $.ajax({
                    type: "POST",
                    url: url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.user),
                    success: function (r) {
                        if (r.code === 0) {
                            alert('操作成功', function (index) {
                                vm.reload();
                            });
                        } else if(r.msg!=null && r.msg != ""){
                            alert(r.msg);
                        }
                    }
                });
            },
            getUser: function (userId) {
                $.get("../sys/user/info/" + userId, function (r) {
                    vm.user = r.user;
                });
            },
            getRoleList: function () {
                $.get("../sys/role/select", function (r) {
                    vm.roleList = r.list;
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

            getUserList: function (pageNum) {
                var url = siteurl + '/sys/user/list/' + pageNum;
                vm.sendAndGetMessages(url, vm.data1);
            },

            //编辑按钮
            op1: function (record) {
                return '<a href="#" onclick="javascript:vm.onedituser(\'' + gridObj.getRecordIndexValue(record, 'userId') + '\');"><font color="#010101">编辑</font></a>';
            }
            ,
            //删除按钮
            op2: function (record) {
                return '<a href="#" onclick="javascript:vm.ondeluser(\'' + gridObj.getRecordIndexValue(record, 'userId') + '\');">删除</a>';
            }
            ,

            //编辑操作
            onedituser: function (userid) {
                parent.addTabByContent(USER_EDITUSER_INDEX, USER_LIST_INDEX, "编辑用户", siteurl + '/sys/user/edituser/' + userid);
            }
            ,

            //新增事件
            onAddItem: function () {
                parent.addTabByContent(USER_NEWUSER_INDEX, USER_LIST_INDEX,"新增用户", siteurl +"/sys/user/addUser");
            }
            ,

            //查询事件
            onSearch: function () {
                //vue v-model绑定Input以键盘按下事件为基础，这里没有支持其他控件自定义改变Input值，需要手动获取数据
				
                vm.userSearch.startTime = $('#start').val();
                vm.userSearch.endTime = $('#end').val();
                //主动调用一次onSearchMethod方法请求数据
                vm.onSearchMethod(1);
                //重新调用一次
                $('#pagination').show();
                $('#pagination').pagination(vm.getPageOptions("conditionsSelectCallback"));
            }
            ,

            onSearchMethod: function (pageNum) {
                var url = siteurl + "/sys/user/listByConditons/" + pageNum;
                vm.sendAndGetMessages(url, vm.userSearch);
            }
            ,

            sendAndGetMessages: function (url, data) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(data),//用户数据
                    async: false,
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
						console.log(r);
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
                            vm.pageDatas.totalData = r.page.totalCount;
                            //设置每页数据量
                            vm.pageDatas.showData = r.page.pageSize;
                        } else if(r.msg!=null && r.msg != ""){
                            parent.parent.layer.alert(r.msg);
                        }
                    }
                });
            }
            ,

            //删除单个操作
            ondeluser: function (userId) {
                parent.parent.layer.confirm("请确认是否删除", {icon: 7, shade: 0.3, btn: ['确认', '取消']}, function () {
                    $.ajax({
                        url: siteurl + "/sys/user/delete/" + userId,
                        type: "post",

                        success: function (data) {
                            if (data.code == 0) {
                                parent.parent.layer.msg("删除操作成功！");
								vm.onSearch();
                                //setTimeout(function(){parent.refreshTab(20)},1000);//刷新当前内部窗体
                            } else {
                                parent.parent.layer.alert(data.msg)
                            }
                        }
                    });
                })
            }
            ,

            //多项删除事件
            onDeleteItem: function () {
                parent.parent.layer.confirm("请确认该多选删除操作，该操作不可逆转！",{icon: 7, shade: 0.3, btn: ['确认', '取消']},function () {
                    var ids = vm.getCheckedIds();
                    var json = {};
                    for (var i = 0; i < ids.length; i++) {
                        json[i] = ids[i];
                    }

                    $.ajax({
                        url: siteurl + "/sys/user/deleteLists",
                        type: "POST",
                        data: JSON.stringify(json),
                        async: false,
                        dataType: "json",
                        contentType: 'application/json;charset=UTF-8',
                        success: function (r) {
                            if (r.code === 0) {
                                parent.parent.layer.msg("删除成功");
								vm.onSearch();
                                //setTimeout(function(){parent.refreshTab(20)},1000);
                            } else if(r.msg!=null && r.msg != ""){
                                parent.parent.layer.alert(r.msg);
                            }
                        }
                    });
                },function () {
                    parent.parent.layer.msg("已取消");
                })
            }
            ,

            //分页参数设定
            getPageOptions: function (callbackmethod) {
                //回调方法设定
                vm.pageDatas.callback = callbackmethod == "conditionsSelectCallback" ?
                    vm.conditionsSelectCallback : vm.pageselectCallback
                return vm.pageDatas;//返回参数
            }
            ,
            //无条件查询回调函数
            pageselectCallback: function (api) {
                vm.getUserList(api.getCurrent());
                return false;
            }
            ,
            //多条件查询回调函数
            conditionsSelectCallback: function (api) {
                vm.onSearchMethod(api.getCurrent());
                return false;
            },
            //获取选中checkbox的ID值
            getCheckedIds: function () {
                var records = vm.getCheckedRecords();
                var ids = new Array();
                for (var i = 0; i < records.length; i++) {
                    ids.push(gridObj.getRecordIndexValue(records[i], 'userId'));
                }

                return ids;
            },
			onTestUpload: function () {
				new AjaxUpload('#upload', {
					action: siteurl + '/sys/oss/upload',
					name: 'file',
					autoSubmit:true,
					onSubmit:function(file, extension){
						if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))){
							alert('只支持jpg、png、gif格式的图片！');
							return false;
						}
					},
					onComplete:function(file, response){
						
						alert('上传成功');
					}
				});
				
			},
            //
            getCheckedRecords: function () {
                var records = new Array();
                $('#searchTable tbody tr').each(function () {
                    if ($(this).find('td:eq(0)>input:checked').length == 1) {
                        records[records.length] = gridObj.getRowRecord($(this));
                    }
                });
                return records;
            },
            //排序
            sortBy: function () {
                var url = siteurl + "/sys/user/listByConditons/" + 1;
                if (vm.userSearch.order == "desc") {
                    vm.userSearch.order = "asc";
                }
                else {
                    vm.userSearch.order = "desc";
                }

                //发送请求
                vm.sendAndGetMessages(url, vm.userSearch);
                $('#pagination').pagination(vm.getPageOptions("conditionsSelectCallback"));
            }
        },
        watch: {}
    })
;

//页面加载完毕后执行函数
$(function () {
    vm.getUserList(1);
    //翻页处理
    $('#pagination').show();
    $('#pagination').pagination(vm.getPageOptions("pageselectCallback"));
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

vm.$watch('userSearch.timeSwitch', function () {
    $('.define-input')[0].style.display = vm.userSearch.timeSwitch == "custom" ? "inline" : "none";
})

