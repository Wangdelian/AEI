/**
 *
 * @author hezhenmei
 * @email hezheenmei@cqrfid.cn
 */

var zTree, rMenu;
var currentFolder;//存放当前操作节点
var tagLevelmarkid;//记录列表显示部门
var setting = {
    view: {
        selectedMulti: false
    },
    callback: {
        onClick: zTreeOnClick,
        onRightClick: OnRightClick,
        onRename: zTreeOnRename
    },
    zTreeNodes: [
        {levelmarkid: 1, parentId: 0, isParent: true, abname: "重庆微标科技股份有限公司", open: false}
    ],
    data: {
        simpleData: {
            enable: true,
            idKey: "levelmarkid",
            pIdKey: "pid",
            rootPId: 0
        },
        tempId: 1000000,
        key: {
            name: "abname",
            url : ''
        }
    }
};

var table = null;
// var pLayer = parent.main_layer;
var laydate = null;
var form = null;
var array = [];
layui.use(['layer', 'form', 'table', 'laydate'], function () {
    table = layui.table;
    layer = layui.layer;
    laydate = layui.laydate;
    form = layui.form;

    //监听性别操作
    var sex;
    form.on('switch(sexDemo)', function (obj) {
        sex = obj.elem.checked ? 0 : 1;
    });

    //监听锁定操作
    var status;
    form.on('checkbox(lockDemo)', function (obj) {
        status = obj.elem.checked ? 0 : 1;
    });

    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        var userId = data.userId;
        var arrId = new Array(1);
        if (obj.event === 'colclick') {
            $.ajax({
                url: siteurl + '/sys/user/updateSex',
                type: 'POST',
                data: JSON.stringify({sex: sex, userId: data.userId}),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    parent.parent.layer.msg("操作成功");
                },
                error: function (data) {
                    alert('查找板块报错');
                }
            });
            return false;
        }
        else if (obj.event === 'staclick') {
            $.ajax({
                url: siteurl + '/sys/user/updateStatus',
                type: 'POST',
                data: JSON.stringify({status: status, userId: data.userId}),
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {
                    parent.parent.layer.msg("操作成功");
                },
                error: function (data) {
                    alert('查找板块报错');
                }
            });
            return false;
        } else if (obj.event === 'del') {
            var jsonData = {};
            jsonData[0] = userId;
            layer.confirm('确认删除么', function (index) {
                $.ajax({
                    type: "POST",
                    url: siteurl + '/sys/user/delete',
                    data: JSON.stringify(jsonData),
                    async: false,
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        if (r.code === 0) {
                            $(obj.tr[0]).remove();
                            layer.msg("删除操作成功！");
                        } else {
                            layer.alert(r.msg)
                        }
                    }
                });
                layer.close(index);
                refreshTreeNode();
            });
        } else if (obj.event === 'edit') {
            // vm.MenuOpt.url = '/sys/user/edituserlevel/' + userId;
            // vm.MenuOpt.icon = '&#xe6c6;';
            // vm.MenuOpt.title = '编辑用户信息';
            // vm.MenuOpt.id = '31';
            // parent.app.addTab(vm.MenuOpt);
            vm.MenuOpt.url = siteurl + '/sys/user/edituser/' + data.userId;
            vm.MenuOpt.icon = '&#xe6c6;';
            vm.MenuOpt.title = '编辑用户';
            vm.MenuOpt.id = '111';

            parent.app.closeTab('111');
            parent.app.addTab(vm.MenuOpt);
        }
    });

    list(array);
});

var vm = new Vue({
    el: '#main',
    data: {
        showList: true,
        levelname: '',
        roleList: [],
        roleNum: '',
        user: {
            status: 1,
            sex: 1,
            roleIdList: [],
            userlevelmark: []
        },
        MenuOpt: {
            url: '',
            icon: '',
            title: '',
            id: ''
        }
    },
    methods: {
        getTree: function () {
            $.get(siteurl + '/sys/levelmark/list', {"time": new Date().getTime()}, function (r) {
                $.fn.zTree.init($("#treeDemo"), setting, r.levelMarkList);
                zTree = $.fn.zTree.getZTreeObj("treeDemo");
                rMenu = $("#rMenu");
            });
        }
    }
});


//右击事件
function OnRightClick(event, treeId, treeNode) {
    /**
     * 判断右击位置
     * 根目录
     */
    if (treeNode && treeNode.pid == 0) {
        zTree.selectNode(treeNode);
        showRMenu("department", event.clientX, event.clientY);
    }
    /**
     * 部门
     */
    else if (treeNode && treeNode.levelmarkid != null) {
        zTree.selectNode(treeNode);
        showRMenu("department", event.clientX, event.clientY);
    }
    /**
     * 员工
     */
    else if (treeNode && treeNode.levelmarkid == null) {
        zTree.selectNode(treeNode);
        showRMenu("staff", event.clientX, event.clientY);
    }
    /**
     * 空白处
     */
    else {
        zTree.cancelSelectedNode();
        showRMenu("blank", event.clientX, event.clientY);
    }
}

//显示菜单事件
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    if (type == "root") {
        /**
         * 根目录只需要刷新、新建和查看功能
         */
        $("#m_del").hide();
        $("#m_edit").hide();
        $("#m_add").hide();
        $("#m_refresh").show();
        $("#m_details").hide();
        $("#m_rename").hide();
        $("#m_remove").hide();
    } else if (type === "blank") {
        /**
         *空白区只需要新建文件夹功能
         */
        $("#m_edit").hide();
        $("#m_del").hide();
        $("#m_add").show();
        $("#m_refresh").show();
        $("#m_details").hide();
        $("#m_rename").hide();
        $("#m_remove").hide();
    }
    else if (type === "staff") {
        /**
         *员工
         */
        $("#m_del").show();
        $("#m_edit").show();
        $("#m_add").hide();
        $("#m_refresh").hide();
        $("#m_details").show();
        $("#m_rename").hide();
        $("#m_remove").hide();
    }
    else if (type === "department") {
        /**
         *部门
         */
        $("#m_del").hide();
        $("#m_edit").hide();
        $("#m_add").show();
        $("#m_refresh").show();
        $("#m_details").hide();
        $("#m_rename").show();
        $("#m_remove").show();
    }

    y += document.body.scrollTop;
    x += document.body.scrollLeft;
    rMenu.css({"top": y + "px", "left": x + "px", "visibility": "visible"});

    $("body").bind("mousedown", onBodyMouseDown);
}

//隐藏菜单事件
function hideRMenu() {
    if (rMenu) rMenu.css({"visibility": "hidden"});
    $("body").unbind("mousedown", onBodyMouseDown);
}

//响应右击事件
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({"visibility": "hidden"});
    }
}

//新增部门事件
var addCount = 1;

function addTreeNode() {
    hideRMenu();
    if (zTree.getSelectedNodes()[0] === undefined)
        zTree.selectNode(zTree.getNodesByParam("levelmarkid", 1000000)[0]);

    var newNode = {
        levelmarkid: null,
        isParent: true,
        abname: "新增部门",
        icon: siteurl + '/templates/skin2/media/js/plugins/zTree_v3/images/depart3.png',
        // pid: zTree.getSelectedNodes()[0].levelmarkid
    };

    if (zTree.getSelectedNodes()[0]) {
        newNode.pid = zTree.getSelectedNodes()[0].levelmarkid
        commitNode(newNode);
        newNode.levelmarkid = levelmark.levelmarkid;
        zTree.editName(zTree.addNodes(zTree.getSelectedNodes()[0], newNode)[0]);
    } else {
        newNode.pid = 1;
        commitNode(newNode);
        newNode.levelmarkid = levelmark.levelmarkid;
        zTree.editName(zTree.addNodes(null, newNode)[0]);
    }
    //生成节点后提交
    // commitNode(levelmark);
    //初级处理办法，先在后台生成文件夹，再重新加载该节点
    // refreshTreeNode();
}

var levelmark = [];

//提交信息
function commitNode(treeNode) {
    var url = null;
    var code = 0;
    if (treeNode.levelmarkid === null || treeNode.levelmarkid === undefined)
        url = siteurl + "/sys/levelmark/save";
    else
        url = siteurl + "/sys/levelmark/update";

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
            levelmark = r.levelMark;
        }
    })
    return code;
}

//删除人员事件
function delTreeNode() {
    hideRMenu();
    var node = zTree.getSelectedNodes();
    var userId = node[0].levelmarkextvalue1;

    var jsonData = {};
    jsonData[0] = userId;
    layer.confirm('确认删除么', function (index) {
        $.ajax({
            type: "POST",
            url: siteurl + '/sys/user/delete',
            data: JSON.stringify(jsonData),
            async: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (r) {
                if (r.code === 0) {
                    layer.msg("删除操作成功！");
                } else {
                    layer.alert(r.msg)
                }
            }
        });
        layer.close(index);
        refreshTreeNode();
    });
}

//删除部门事件
function removeTreeNode() {
    hideRMenu();
    var node = zTree.getSelectedNodes();
    array = [];
    lid = node[0].levelmarkid;
    $.ajax({
        type: "POST",
        url: siteurl + '/sys/user/listByLevelmarkid/' + lid,
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            array = r.userList;
        }
    });
    if (array.length == 0) {
        layer.confirm('确认删除么', function (index) {
            $.ajax({
                type: "POST",
                url: siteurl + '/sys/levelmark/remove/' + lid,
                async: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        layer.msg("删除操作成功！");
                    } else {
                        layer.alert(r.msg)
                    }
                }
            });
            layer.close(index);
            refreshTreeNode();
        });
    }
    else {
        layer.confirm("本部门下有用户，不能删除！")
    }
}

//编辑名称事件
function renameTreeNode() {
    hideRMenu();
    currentFolder = zTree.getSelectedNodes()[0];
    zTree.editName(currentFolder);
}

//修改文件夹名称后回调事件
function zTreeOnRename(event, treeId, treeNode, isCancel) {
    if (0 !== commitNode(treeNode)) {
        layer.msg("命名冲突了！", {icon: 5});
        renameTreeNode();
    }
}

//刷新节点
function refreshTreeNode() {
    hideRMenu();
    $.get(siteurl + '/sys/levelmark/list', {"time": new Date().getTime()}, function (r) {
        $.fn.zTree.init($("#treeDemo"), setting, r.levelMarkList);
    });
}

//查看人员信息
function treeNodeDetails() {
    hideRMenu();
    var node = zTree.getSelectedNodes();
    var sarray = null;
    levelmarkextvalue1 = node[0].levelmarkextvalue1;
    if (node[0].levelmarkextvalue1 != null) {
        $.ajax({
            type: "POST",
            url: siteurl + '/sys/user/info/' + levelmarkextvalue1,
            async: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (r) {
                sarray = r.user;
            }
        });
    }
    layer.open({
        type: 1,
        title: '用户详情',
        anim: 0,//关闭打开窗口动画
        isOutAnim: true,//关闭关闭窗口动画
        area: [], //宽高
        content: '<div style="padding: 20px;"><table>' +
        '<tr> <td>用户名：</td> <td>' + sarray.username + '</td> </tr>' +
        '<tr> <td>中文名：</td> <td>' + sarray.chineseName + '</td> </tr>' +
        '<tr> <td>创建者：</td> <td>' + (sarray.createUserId === undefined ? "未知" : sarray.createUserId) + '</td> </tr>' +
        '<tr> <td>创建时间：</td> <td>' + (sarray.createTime === undefined ? "未知" : sarray.createTime) + '</td> </tr>' +
        '<tr> <td>最后一次修改时间：</td> <td>' + (sarray.dateLastLogin === undefined || sarray.dateLastLogin === null ? "未知" : sarray.dateLastLogin) + '</td> </tr>' +
        '</table></div>'
    });
}

//编辑人员信息
function editTreeNode() {
    hideRMenu();
    var node = zTree.getSelectedNodes();
    var userId = node[0].levelmarkextvalue1;
    // vm.MenuOpt.url = '/sys/user/edituserlevel/' + userId;
    // vm.MenuOpt.icon = '&#xe6c6;';
    // vm.MenuOpt.title = '编辑用户信息';
    // vm.MenuOpt.id = '31';
    // parent.app.addTab(vm.MenuOpt);
    vm.MenuOpt.url = siteurl + '/sys/user/edituser/' + userId;
    vm.MenuOpt.icon = '&#xe6c6;';
    vm.MenuOpt.title = '编辑用户';
    vm.MenuOpt.id = '11';

    parent.app.closeTab('11');
    parent.app.addTab(vm.MenuOpt);
}

//点击获取文件夹下文件事件
function zTreeOnClick(event, treeId, treeNode) {
    array = [];
    tagLevelmarkid = treeNode.levelmarkid;
    if (treeNode.levelmarkid != null) {
        $.ajax({
            type: "POST",
            url: siteurl + '/sys/user/listByLevelmarkid/' + tagLevelmarkid,
            async: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (r) {
                array = r.userList;
            }
        });
    }
    list(array);
}

function list(array) {
    table.render({
        elem: '#table'
        , data: array
        , cols: [[
            {field: 'userId',width:'10%', title: '唯一ID'}
            , {field: 'username',width:'14%', title: '登录名'}
            , {field: 'chineseName',width:'24%', title: '姓名'}
            , {field: 'email',width:'10%', title: '邮箱'}
            , {field: 'skin',width:'10%', title: '系统UI'}
            , {field: 'createTime',width:'22%', title: '创建时间'}
            , {field: 'dateLastLogin',width:'22%', title: '最后登录时间'}
            , {field: 'sex', title: '性别',width:'10%', templet: '#switchTpl', unresize: true, event: 'colclick'}
            , {field: 'status', title: '是否锁定',width:'15%', templet: '#checkboxTpl', unresize: true, event: 'staclick'}
            , {fixed: 'right', title: '操作',width:'16%', align: 'center', toolbar: '#barDemo'}
        ]]
        ,page:true
        ,height: 'full-130'
    });
}

//请求文件数据
function ajaxFileList(url) {
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
}

//用户查询
function searchByName() {
    vm.user.username =vm.user.username.trim();
    if(vm.user.username==""){

    }else{
        value = vm.user.username;
        if (value.length>16) {
            layer.msg('长度超过范围，请重新输入！');
            return ;
        }
        var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|]/im;
        if (patrn.test(value)) {
            layer.msg('不能包含特殊字符，请重新输入！');
            return ;
        }
    }
    var slist = [];
    $.ajax({
        type: "POST",
        url: siteurl + '/sys/user/queryByLid/',
        data: JSON.stringify({"levelmarkid": tagLevelmarkid, "username": vm.user.username.trim()}),//用户数据
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            slist = r.list;
        }
    });
    list(slist);
}

$(function () {
    vm.getTree();
});