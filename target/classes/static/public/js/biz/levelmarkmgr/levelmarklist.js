/**
 * Created by Administrator on 2017/8/3.
 */
var addCount = 1;
var rMenu = $("#rMenu");
var zTree;

//初次加载树
$(function () {
    vm.getLevelMark();
});

var vm = new Vue({
    el:'#main',
    data:{
        levelMarkList:{
        }
    },
    methods: {
        //获取组织机构树
        getLevelMark: function(){
            //加载组织机构树
            $.get(siteurl+"/sys/levelmark/list",{"time": new Date().getTime()}, function(r){
                if(r.code === 0){
                    $.fn.zTree.init($("#menuTree"), setting, r.levelMarkList);
                    zTree = $.fn.zTree.getZTreeObj("menuTree");
                }else if(r.msg!=null && r.msg != ""){
                    alert(r.msg);
                }
            });

            vm.getInfo(1);
        },
        //修改节点信息
        update: function (event) {
            var url = siteurl+"/sys/levelmark/update";
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.levelMarkList),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功');
                    } else if(r.msg!=null && r.msg != ""){
                        alert(r.msg);
                    }
                }
            });
        },
        //获取节点信息
        getInfo:function(levelmarkid){
            $.get(siteurl+"/sys/levelmark/info/"+levelmarkid, {"time": new Date().getTime()}, function(r){
                vm.levelMarkList = r.levelMark;
            });
        },
        //右键显示菜单回调函数
        OnRightClick:function (event, treeId, treeNode) {
        /* if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
         zTree.cancelSelectedNode();
         showRMenu("root", event.clientX, event.clientY);
         } else*/ if (treeNode && !treeNode.noR) {
            zTree.selectNode(treeNode);
            vm.showRMenu( event.clientX, event.clientY,treeNode);
            }
        },
        //显示菜单
        showRMenu:function ( x, y,nodes) {
                var levelmarkvalue = nodes.levelmarkvalue;
                if(levelmarkvalue != null){
                    $("#rMenu ul").eq(0).show();
                    $("#rMenu ul").eq(1).hide();
                }else
                {
                    $("#rMenu ul").eq(0).hide();
                    $("#rMenu ul").eq(1).show();
                }


            y += document.body.scrollTop;
            x += document.body.scrollLeft;
            rMenu.css({"top":y+"px", "left":x+"px", "display":"block"});

            $("body").bind("mousedown", vm.onBodyMouseDown);
        },
        //隐藏菜单
        hideRMenu:function () {
            if (rMenu) rMenu.css({"display": "none"});
            $("body").unbind("mousedown", vm.onBodyMouseDown);
        },
        onBodyMouseDown:function (event){
            if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
                rMenu.css({"display": "none"});
            }
        },
        //新增节点
        addTreeNode:function () {
            vm.hideRMenu();
            var nodes = zTree.getSelectedNodes();

            var pid = nodes[0].levelmarkid;
            if(nodes && nodes.length>0){
                if(pid != null ||  (nodes[0].children && nodes[0].children.length > 0)){
                    parent.addTabByContent(ADDLEVELMARK_INDEX,22,"新增部门",siteurl+'/sys/levelmark/add/'+pid);
                }
            }
            /* var newNode = { name:"newNode " + (addCount++)};
             if (zTree.getSelectedNodes()[0]) {
             zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
             } else {
             zTree.addNodes(null, newNode);
             }*/
        },
        //删除节点
        removeTreeNode:function () {
            vm.hideRMenu();
            var nodes = zTree.getSelectedNodes();
            var levelmarkid = nodes[0].levelmarkid;
            if (nodes && nodes.length>0) {
                if (levelmarkid != null || (nodes[0].children && nodes[0].children.length > 0)) {
                    var msg = "删除部门会删除其下所有员工，确定要删除此部门吗？";
                    if (confirm(msg)==true){
                        zTree.removeNode(nodes[0]);

                        //删除机构信息
                        $.get(siteurl+"/sys/levelmark/remove/"+levelmarkid,{"time": new Date().getTime()}, function(r){
                            if(r.code == 0){
                                alert("删除成功!");
                            } else if(r.msg!=null && r.msg != ""){
                                alert(r.msg);
                            }
                        });
                    }
                } else {
                    zTree.removeNode(nodes[0]);
                }
            }
        },
        //修改节点信息
        modifyTreeNode:function (){
            vm.hideRMenu();
            var nodes = zTree.getSelectedNodes();

            var userid = nodes[0].levelmarkextvalue1;
            if(nodes && nodes.length>0){
                if(userid != null){
                    parent.addTabByContent(USER_EDITUSER_INDEX, 22, "编辑用户", siteurl + '/sys/user/edituser/' + parseInt(userid));
                }
                else{
                    alert("请在右侧表单编辑部门信息并保存！");
                }
            }

           /* var nodes = zTree.getSelectedNodes();
            var levelmarkid = nodes[0].levelmarkid;
            if(nodes && nodes.length>0){
                if(nodes[0].children && nodes[0].children.length > 0){
                    parent.addTabByContent(65,22,"编辑组织",siteurl+'/sys/levelmark/edit/'+levelmarkid);
                }else
                {

                }
            }*/
        },
        //左键点击节点，右键显示节点信息
        zTreeOnClick:function (event, treeId, treeNode) {
            var levelmarkid = treeNode.levelmarkid;

            //加载右边机构信息
            vm.getInfo(levelmarkid);
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'username': vm.q.username},
                page:page
            }).trigger("reloadGrid");
        }

    }
});

//树的配置
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "levelmarkid",
            pIdKey: "pid",
            rootPId: 0
        },
        key: {
            name: "abname"
        }
    },
    //用于右键显示菜单
    view: {
        dblClickExpand: false,
    },
    callback: {
        onRightClick: vm.OnRightClick,
        onClick: vm.zTreeOnClick,
    }
}

