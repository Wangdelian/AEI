/**
 *hezhenmei
 *
 */
function initZtree() {
    var setting = {
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: {"Y": "", "N": ""}
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "levelmarkid",
                pIdKey: "pid",
                rootPId: null
            },
            key: {
                name: 'abname',
                url : ''
            }
        }
    };

    //部门选择不包含用户信息
    $.ajax({
        type: "POST",
        url: siteurl + '/sys/user/getlevel/-1',
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            vm.zNodes = r.levelMarkList;
            $.fn.zTree.init($("#menuTree"), setting, r.levelMarkList);
        }
    });
    var treeObj = $.fn.zTree.getZTreeObj("menuTree");


    var nodes = vm.recondition.levelmarkid.split(",");
    for (var i = 0, l = nodes.length; i < l; i++) {
        var node = treeObj.getNodeByParam("levelmarkid", nodes[i], null);
    }
}

var form = null;
var layer = parent.layer;

layui.use(['laypage', 'layer', 'form', 'laydate'], function () {
    var laypage = layui.laypage
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , table = layui.table;
    form = layui.form;

    //初始化检修地点选择功能
    initFunctions();
    //初始化树结构
    initZtree();

    //提交验证
    form.verify({
        title: function (value) {
            if (value.length < 3) {
                return '标题不得少于3个字符';
            }
        }
        , select: function (value) {
            if (value === '')
                return '这里还没选择';
        }
        , notNull: function (value) {
            value = value.trim();
            if (value === '')
                return '请输入';
        },
        inputVerify: function (value, item) {
            value = value.trim();
            if (value.length>16) {
                return '长度超过范围，请重新输入！';
            }
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|]/im;
            if (patrn.test(value)) {
                return '不能包含特殊字符，请重新输入！';
            }
        },
        inputRemarkVerify: function (value, item) {
            value = value.trim();
            var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|]/im;
            if (patrn.test(value)) {
                return '不能包含特殊字符，请重新输入！';
            }
        }
    });
    form.verify({
    });
    form.on('select(filter1)', function(data){
        vm.recondition.freconditiontype = data.value;
    });
    form.on('select(filter2)', function(data){
        vm.recondition.freconditionpart = data.value;
    });
    form.on('select(filter3)', function(data){
        vm.recondition.freconditionstatus = data.value;
    });
    var start = laydate.render({
        elem: '#startTime'
        , type: 'datetime'
        , position: 'fixed'
        , done: function (value, date) {
            date.month--;
        }
    });

    //监听提交
    form.on('submit(demo1)', function (data) {
        data.field.freconditionsite = vm.recondition.levelmarkid;
        data.field.frecordpersonnel = vm.recondition.frecordpersonnel;
        data.field.freconditiontype = vm.recondition.freconditiontype;
        data.field.fdisposecontent = vm.recondition.fdisposecontent;
        data.field.freconditionpart = vm.recondition.freconditionpart;
        data.field.fdisposeresult = vm.recondition.fdisposeresult;
        data.field.freconditionstatus = vm.recondition.freconditionstatus;
        data.field.fremark = vm.recondition.fremark;

        $.ajax({
            url: siteurl + '/train/recondition/save',
            type: 'POST',
            data: JSON.stringify(data.field),
            async: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                // 找到需要联动刷新的table所在的window
                var iframeTemp = parent.layui.$('iframe[src="/train/recondition/searchlist"]');
                // 如果找到了才需要重载，找不到证明没有打开即不需要处理
                if (iframeTemp.length) {
                    // 找到这个iframe的window
                    iframeTemp = iframeTemp[0].contentWindow;
                    // 用他的页面的window的layui去处理他页面的任务（重载表格）
                    iframeTemp.vm.query(iframeTemp.vm.currentPage,1);
                }
                parent.app.tabChange('31');
                    //parent.app.renderbymuneid('31', siteurl + '/train/recondition/searchlist/');
                    parent.parent.layer.msg("添加成功！");
                    parent.app.closeTab('222');

            },
            error: function (data) {
                alert('添加失败！');
            }
        });
        return false;
    });
});
var vm = new Vue({
    el: '#main',
    data: {
        flag: '',
        showList: true,
        levelname: '',
        recondition: {
            fId:'',
            levelmarkid:'',
            fReconditionsite:'',
            fDeviceId:'',
            fReconditiontype:'',
            fReconditiontime:'',
            fReconditionpart:'',
            fReconditionstatus:'',
            fDisposecontent:'',
            fDisposeresult:'',
            fRecordpersonnel:'',
            fRecordtime:'',
            fRemark:''
        },
        zNodes: []
    },
    watch: {
        zNodes: function () {
            this.$nextTick(function () {
                form.render()
            })
        }
    },
    methods: {
        //获取选择结果
        selected: function () {
            var treeObj = $.fn.zTree.getZTreeObj("menuTree");
            var nodes = treeObj.getCheckedNodes(true);

            if (nodes == '') {
                layer.msg("所属组织不能为空，请重新选择！");
                return;
            }
            if (nodes.length > 1) {
                layer.msg("所属组织只能选一个，请重新选择！");
                return;
            }
            vm.levelname = nodes[0].abname;
            $("#levelname").val(vm.levelname);
            vm.recondition.levelmarkid = nodes[0].levelmarkid;
            vm.recondition.fReconditionsite = vm.levelname;
        }
    }
});

function initFunctions() {
    //弹窗逻辑判断
    $('#levelname').click(stopPro);

    $('#projectDept-options').click(stopPro);

    $('#levelname').focus(function () {
        showZtree('projectDept-options');
    });

    $(document).click(function () {
        closeZtree('projectDept-options');
    });

    //三个按钮事件
    $('#projectDept-options .layui-btn').on('click', function (event) {
        if (event.target.innerText === '完成') {
            //initPart('projectDept-options', 'menuTree', 'levelname', false);
            vm.selected();
            closeZtree('projectDept-options');
        }
        else if (event.target.innerText === '清空') {
            var treeObj = $.fn.zTree.getZTreeObj('menuTree');
            //取消ztree选择
            treeObj.checkAllNodes(false);
            //清空输入框值
            $('#levelname').val('');
            //关闭选择框
            closeZtree('projectDept-options');
        }
        else {
            closeZtree('projectDept-options');
        }
    });


}

//显示用户树
function showZtree(id) {
    $('#' + id).stop(true);
    $('#' + id).css('z-index', 100);
    $('#' + id).animate({'margin-top': '1px', opacity: 1});
}

//关闭用户树
function closeZtree(id) {
    //停止当前所有动作，stop(true,true)的话会在停止前完成当前动作
    $('#' + id).stop(true);
    $('#' + id).animate({'margin-top': '150px', opacity: 0}, function () {
        $('#' + id).css('z-index', -10000);
    });
}

//阻止默认事件
function stopPro(e) {
    e.stopPropagation();
}
