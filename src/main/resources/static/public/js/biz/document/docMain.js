var vm = new Vue({
    el: '#row',
    data: {
        item: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//测试临时使用数据
        fileList: null,//文件夹下的文件列表
        parentFolder: null,//临时父节点
        currentFolder: null,//存放当前操作节点
        zTree: null,//存放当前树对象
        rMenu: null,//右键菜单
        layer: layer,
        nameSearch: '',
        zTreeNodes: [
            {folderId: 1000000, parentId: 0, isParent: true, folderName: "全部文件", open: false}
        ],
        zTreeSetting: {
            treeId: "",
            view: {
                selectedMulti: false
            },
            check: {
                enable: false//显示多选框
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "folderId",
                    pIdKey: "parentId",
                    rootPId: null
                },
                key: {
                    name: "folderName"
                }
            },
            async: {
                enable: true,
                url: "/document/folder/getDocumentList",
                autoParam: ["folderId", "parentId"],
                otherParam: {
                    "otherParam": "zTreeAsyncTest"
                },
                dataFilter: ajaxDataFilter

            },
            callback: {
                onClick: zTreeOnClick,
                onRightClick: OnRightClick,
                onRename: zTreeOnRename
            }
        }
    },
    methods: {
        //调试输出方法
        docTest: function () {
            console.log("---------------" + new Date() + "--------------");
        },
        //获取文件夹信息
        getFolder: function (folderId) {
            $.ajax({
                url: siteurl + "/document/folder/getFolder/" + folderId,
                async: false,
                dataType: "json",
                success: function (r) {
                    r.code === 0 ? vm.parentFolder = r.folder : null;
                }
            });
        },
        getFileList: function (treeNode) {
            vm.ajaxFileList(siteurl + "/document/file/getFileList/" + treeNode.folderId);
            vm.locationFormat(treeNode);
        },
        //请求文件数据
        ajaxFileList: function (url) {
            $('#file-data').bootstrapTable('destroy');
            $("#file-data").bootstrapTable({
                url: url + "?t=" + $.now(),
                dataType: "json",
                striped: true,
                clickToSelect: true,
                height: $('#data-table').height(),
                columns: [{
                    checkbox: true,
                    align: 'center'
                }, {
                    title: '文件名',
                    field: 'fileName',
                    align: 'left',
                    valign: 'middle',
                    formatter: function (value, row) {
                        return "<a onclick='vm.fileDetail(" + row.fileId + ")'>" + value + "</a>"
                    }
                }, {
                    title: '大小',
                    field: 'fileSize',
                    align: 'center',
                    valign: 'middle',
                    formatter: vm.sizeFormat
                }, {
                    title: '创建时间',
                    field: 'createTime',
                    align: 'left',
                    valign: 'middle'
                }, {
                    title: '修改时间',
                    field: 'mdedTime',
                    align: 'left',
                    valign: 'middle'
                }, {
                    title: '操作',
                    field: 'operate',
                    align: 'center',
                    formatter: vm.operateFormatter
                }],
                onLoadError: function () {
                    vm.layer.msg("加载数据失败，请重试！");
                }
            });
        },
        //格式化文件大小
        sizeFormat: function (value) {
            if (value < 1024)
                return value.toFixed(2) + 'B';
            else if (value >= 1024 && value < 1048576)
                return (value / 1024).toFixed(2) + 'KB';
            else if (value >= 1048576 && value < 1073741824)
                return (value / 1048576).toFixed(2) + 'MB';
            else
                return (value / 1073741824).toFixed(2) + 'GB';
        },
        //格式化当前位置地址
        locationFormat: function (treeNode) {
            //判断父节点是否是根节点或者一级节点
            //<li class="active"><a href="#">全部文件</a></li>
            if (treeNode.folderId === vm.zTreeNodes[0].folderId)
                $("#location").empty().append('当前位置：<li class="active">全部文件</li>');
            else {
                vm.getFolder(treeNode.parentId);
                if (vm.parentFolder.folderId === vm.zTreeNodes[0].folderId) {
                    $("#location").empty().append('当前位置：<li><a onclick="vm.locationJump(vm.zTreeNodes[0].folderId)">全部文件</a></li><li class="active">' + treeNode.folderName + '</li>');
                } else if (vm.parentFolder.parentId === vm.zTreeNodes[0].folderId) {
                    $("#location").empty().append('当前位置：<li><a onclick="vm.locationJump(vm.zTreeNodes[0].folderId)">全部文件</a></li><li><a onclick="vm.locationJump(' + vm.parentFolder.folderId + ')">' + vm.parentFolder.folderName + '</a></li><li class="active">' + treeNode.folderName + '</li>');
                } else {
                    $("#location").empty().append('当前位置：<li><a onclick="vm.locationJump(vm.zTreeNodes[0].folderId)">全部文件</a></li><li class="active"><a>...&nbsp;</a></li><li><a onclick="vm.locationJump(' + vm.parentFolder.parentId + ')">' + vm.parentFolder.folderName + '</a></li><li class="active">' + treeNode.folderName + '</li>');
                }
            }
        },
        //文件项操作
        operateFormatter: function (value, row, index) {
            return ['<span><a href="/document/file/download/' + row.fileId + '" class="text-primary">下载</a></span>\n' +
            '<span><a href="#" class="text-danger" onclick="vm.delFile(' + row.fileId + ')">删除</a></span>'].join('');

        },
        //地址跳转
        locationJump: function (id) {
            if (id == vm.zTreeNodes[0].folderId) {
                vm.currentFolder = vm.zTreeNodes[0];
                vm.getFileList(vm.zTreeNodes[0]);
            }
            else {
                vm.currentFolder = vm.parentFolder;
                vm.getFolder(id);
                vm.getFileList(vm.currentFolder);
            }
        },
        //显示菜单事件
        showRMenu: function (type, x, y) {
            $("#rMenu div").show();
            if (type === "root") {
                /**
                 * 根目录只需要刷新、新建和查看功能
                 */
                $("#m_edit").hide();
                $("#m_del").hide();
                $("#m_refresh").show();
                $("#m_details").show();
            } else if (type === "blank") {
                /**
                 *空白区只需要新建文件夹功能
                 */
                $("#m_edit").hide();
                $("#m_del").hide();
                $("#m_refresh").hide();
                $("#m_details").hide();
            }
            else {
                $("#m_edit").show();
                $("#m_del").show();
                $("#m_refresh").show();
                $("#m_details").show();
            }

            y += document.body.scrollTop;
            x += document.body.scrollLeft;
            vm.rMenu.css({"top": y + "px", "left": x + "px", "visibility": "visible"});

            $("body").bind("mousedown", vm.onBodyMouseDown);
        },
        //隐藏菜单事件
        hideRMenu: function () {
            if (vm.rMenu) vm.rMenu.css({"visibility": "hidden"});
            $("body").unbind("mousedown", vm.onBodyMouseDown);
        },
        //响应右击事件
        onBodyMouseDown: function (event) {
            if (!(event.target.id === "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
                vm.rMenu.css({"visibility": "hidden"});
            }
        },
        //添加树节点事件
        addTreeNode: function () {
            vm.hideRMenu();
            if (vm.zTree.getSelectedNodes()[0] === undefined)
                vm.zTree.selectNode(vm.zTree.getNodesByParam("folderId", 1000000)[0]);

            var newNode = {
                folderId: null,
                isParent: true,
                folderName: "新建文件夹",
                parentId: vm.zTree.getSelectedNodes()[0].folderId
            };
            //生成节点后提交
            vm.commitNode(newNode);
            //初级处理办法，先在后台生成文件夹，再重新加载该节点
            vm.refreshTreeNode();
        },
        //提交信息
        commitNode: function (treeNode) {
            var url = null;
            var code = 0;
            if (treeNode.folderId === null || treeNode.folderId === undefined)
                url = siteurl + "/document/folder/addFolder";
            else
                url = siteurl + "/document/folder/editFolder";

            //处理请求
            $.ajax({
                url: url,
                async: false,
                type: "POST",
                data: JSON.stringify(treeNode),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code !== 0) {
                        code = r.code;
                    }
                }
            })

            return code;
        },
        //强制刷新节点
        reAsyncChildNodes: function () {
            vm.zTree.reAsyncChildNodes(vm.zTree.getSelectedNodes()[0], "refresh");
        },
        //刷新事件
        refreshTreeNode: function () {
            vm.hideRMenu();
            vm.reAsyncChildNodes();
        },
        //删除树节点事件
        removeTreeNode: function () {
            vm.hideRMenu();
            var nodes = vm.zTree.getSelectedNodes();
            if (nodes && nodes.length > 0) {
                var msg = "请确认删除文件夹操作！";
                vm.layer.confirm(msg, {icon: 3, title: '提示', shade: 0}, function (index) {
                    $.ajax({
                        url: siteurl + "/document/folder/delFolder/" + nodes[0].folderId,
                        async: false,
                        success: function (r) {
                            if (r.deleteR === 1)
                                vm.layer.msg("已删除!");
                            else
                                vm.layer.msg("删除失败！");
                        }
                    })
                    ;
                    vm.zTree.removeNode(nodes[0]);
                    vm.layer.close(index);
                });

            }
        },
        //编辑名称事件
        editTreeNode: function () {
            vm.hideRMenu();
            vm.currentFolder = vm.zTree.getSelectedNodes()[0];
            vm.zTree.editName(vm.currentFolder);
        },
        //查看文件夹信息
        treeNodeDetails: function () {
            vm.hideRMenu();
            var node = vm.zTree.getSelectedNodes();
            vm.layer.open({
                type: 1,
                title: '文件夹信息',
                anim: 0,//关闭打开窗口动画
                isOutAnim: true,//关闭关闭窗口动画
                shade: 0,
                area: [], //宽高
                content: '<div style="padding: 20px;"><table> <tr> <td>文件夹名：</td> <td>' + node[0].folderName + '</td> </tr> <tr> <td>创建者：</td> <td>' + (node[0].creatorName === undefined ? "未知" : node[0].creatorName) + '</td> </tr> <tr> <td>创建时间：</td> <td>' + (node[0].createTime === undefined ? "未知" : node[0].createTime) + '</td> </tr> <tr> <td>最后一次修改人：</td> <td>' + (node[0].menderName === undefined || node[0].menderName === null ? "未知" : node[0].menderName) + '</td> </tr> <tr> <td>最后一次修改时间：</td> <td>' + (node[0].mendTime === undefined || node[0].mendTime === null ? "未知" : node[0].mendTime) + '</td> </tr> </table></div>'
            });
        },
        /**
         * 文件区
         */
        //上传文件
        uploadDocFile: function () {
            if (vm.currentFolder === null) {
                vm.layer.msg("请先选择目标文件夹!", {anim: 6});
                return;
            }
            //实际处理文件在iniUploadBlock方法配置项里
        },
        //初始化上传按钮
        iniUploadBlock: function () {
            var url = siteurl + '/document/file/upload?fileId=' + vm.currentFolder.folderId;
            var uploadB = new AjaxUpload('#upload', {
                action: url,
                name: 'file',
                autoSubmit: true,
                onSubmit: function (file, extension) {
                    uploadB._settings.action = siteurl + '/document/file/upload?fileId=' + vm.currentFolder.folderId;
                    vm.layer.msg('上传中，请稍后...', {icon: 16, shade: 0, time: 0});
                },
                onComplete: function (file, response) {
                    vm.layer.closeAll('dialog');
                    vm.layer.alert('上传成功', {shade: 0});
                    vm.getFileList(vm.currentFolder);
                }
            });
        },
        //刷新文件夹下文件
        refreshFileList: function () {
            vm.getFileList(vm.currentFolder);
            vm.layer.msg('刷新成功！');
        },
        //搜索文件
        searchByName: function () {
            vm.ajaxFileList(siteurl + "/document/file/queryByConditions/" + vm.nameSearch);
            $("#location").empty().append('当前位置：<li class="active">全部文件</li>');
        },
        //查看文件信息
        fileDetail: function (fileId) {
            $.ajax({
                url: siteurl + "/document/file/fileDetail/" + fileId + "?t=" + $.now(),
                dataType: "json",
                async: false,
                type: "GET",
                success: function (list) {
                    fileDetail.thisFile = list;

                    fileDetail.thisFile.fileSize = vm.sizeFormat(fileDetail.thisFile.fileSize);
                }
            });
            layer.open({
                type: 1,
                shade: false,
                maxWidth: 610,
                title: '文件详情', //不显示标题
                content: $('#fileDetail'),
                cancel: function () {
                }
            });
        },
        //批量下载
        downloadFiles: function () {
            vm.layer.alert("暂不提供该功能", {icon: 6, shade: 0});
        },
        //批量删除文件
        delFiles: function () {
            var data = $('#file-data').bootstrapTable('getSelections');

            if (data.length === 0) {
                vm.layer.alert("你还没有选择文件哦！", {icon: 5, shade: 0});
                return;
            }
            vm.layer.confirm("真的要删除吗？", {icon: 3, title: '提示', shade: 0}, function () {
                var jData = {};
                for (var i = 0; i < data.length; i++)
                    jData[i] = data[i].fileId;
                $.ajax({
                    url: siteurl + "/document/file/deleteFiles",
                    data: jData,
                    dataType: "json",
                    async: false,
                    type: "POST",
                    success: function (r) {
                        vm.layer.alert("删除了" + r.del + "个文件！",{shade: 0});
                        vm.getFileList(vm.currentFolder);
                    }
                })
            })
        },
        //删除文件
        delFile: function (fileId) {
            vm.layer.confirm("确认删除吗？", {icon: 3, title: '提示',shade: 0}, function () {
                $.post(siteurl + "/document/file/deleteFile/" + fileId, function (data) {
                    if (data.key === 1) {
                        vm.layer.msg("删除成功！");
                        vm.getFileList(vm.currentFolder);
                    }
                    else
                        vm.layer.alert("删除失败！",{shade: 0});
                });
            });

        }
    }
});
//修改文件夹名称后回调事件
function zTreeOnRename(event, treeId, treeNode, isCancel) {
    if (0 !== vm.commitNode(treeNode)) {
        vm.layer.msg("命名冲突了！", {icon: 5});
        vm.editTreeNode();
    }
}
//右击事件
function OnRightClick(event, treeId, treeNode) {
    /**
     * 判断右击位置
     * 根目录
     */
    if (treeNode && event.target.textContent === "全部文件"
        && (event.target.id === "folderList_1_span" || event.target.id === "folderList_1_a")) {
        vm.zTree.selectNode(treeNode);
        vm.showRMenu("root", event.clientX, event.clientY);
    }
    /**
     * 子目录
     */
    else if (treeNode && !treeNode.noR) {
        vm.zTree.selectNode(treeNode);
        vm.showRMenu("node", event.clientX, event.clientY);
    }
    /**
     * 空白
     */
    else {
        vm.zTree.cancelSelectedNode();
        vm.showRMenu("blank", event.clientX, event.clientY);
    }
}
//点击获取文件夹下文件事件
function zTreeOnClick(event, treeId, treeNode) {
    vm.currentFolder = treeNode;
    //同步请求列表
    vm.getFileList(treeNode);
    //初始化上传按钮
    vm.iniUploadBlock();
    return true;
}
//请求过滤
function ajaxDataFilter(treeId, parentNode, responseData) {
    //不能修改parentNode值，等待修复
    //----------
    return responseData;
}

var fileDetail = new Vue({
    el: '#fileDetail',
    data: {
        thisFile: []
    },
    methods: {
        saveFile: function () {
            $.post(siteurl + "/document/file/editFileDetail", fileDetail.thisFile, function (data) {
                if (data.key === 1) {
                    fileDetail.closeIframe();
                    vm.layer.msg("保存成功");
                    vm.getFileList(vm.currentFolder);
                } else
                    vm.layer.alert("保存失败！",{shade: 0})

            });
        },
        closeIframe: function () {
            layer.closeAll();
        }
    }

});

/*初始化左侧树*/
$(document).ready(function () {
    $.fn.zTree.init($("#folderList"), vm.zTreeSetting, vm.zTreeNodes);
    vm.zTree = $.fn.zTree.getZTreeObj("folderList");
    vm.rMenu = $("#rMenu");
});