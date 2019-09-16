
layui.use(['form', 'layedit', 'laydate','table','laypage'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,table=layui.table
        ,laypage=layui.laypage;

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });


    //监听提交
    form.on('submit(demo122)', function(data){
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        });
        return false;
    });

    var $=layui.$, active={
        export:function(){
            vm.export();
        },
        query:function(){
            var engineno = $('#engineno').val();
            if(engineno != null&&engineno != ''){
                vm.queryTitle();
                vm.query(1,1);
            }
        }

    };

    $('.layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


    //构造列表
    window.initList = function(listdata){
        table.render({
            elem: '#table'
            ,id:'idTest11'
            ,data:listdata
            ,cellMinWidth: 80
            ,height:'full-320'
            ,cols: [[
                {type:'numbers'}
                ,{field:'passpoint',width:160, title:'通过点', templet: '#usernameTpl' ,align: "center"}
                ,{field:'dateoccur',width:150, title:'发生日期', templet: '#usernameTpl' ,align: "center"}
                ,{field:'judgeresult',width:60, title:'判定结果', templet: '#usernameTpl' ,align: "center"}
                ,{field:'baddata',width:80, title:'不合格数据', templet: '#usernameTpl' ,align: "center"}
                ,{field:'icccode',width:70, title:'ICC代码', templet: '#usernameTpl' ,align: "center"}
                ,{field:'icc',width:180, title:'ICC', templet: '#usernameTpl' ,align: "center"}
                ,{field:'itempart',width:90, title:'部位', templet: '#usernameTpl' ,align: "center"}
                ,{field:'failuremodel',width:130, title:'模式', templet: '#usernameTpl' ,align: "center"}
                ,{field:'issuedesc',width:80, title:'问题描述', templet: '#usernameTpl' ,align: "center"}
                ,{field:'createdbyname',width:70, title:'记录人', templet: '#usernameTpl' ,align: "center"}
                ,{field:'onlinerepair',width:70, title:'在线返修', templet: '#usernameTpl' ,align: "center"}
                ,{field:'repaircontent',width:70, title:'维修方法', templet: '#usernameTpl' ,align: "center"}
                ,{field:'replacebarcode',width:70, title:'换件条码', templet: '#usernameTpl' ,align: "center"}
                ,{field:'isappear',width:70, title:'是否再现', templet: '#usernameTpl' ,align: "center"}
                ,{field:'issueattr',width:70, title:'问题属性', templet: '#usernameTpl' ,align: "center"}
                ,{field:'issueseverity',width:70, title:'问题严重度', templet: '#usernameTpl' ,align: "center"}
                ,{field:'zkissuestatus',width:50, title:'状态', templet: '#usernameTpl' ,align: "center"}
                ,{field:'dateclose',width:150, title:'关闭时间', templet: '#usernameTpl' ,align: "center"}
                ,{field:'peopleclose',width:50, title:'关闭人', templet: '#usernameTpl' ,align: "center"}
                ,{field:'remark',width:150, title:'备注', templet: '#usernameTpl' ,align: "center"}

            ]]
            ,page: false
            ,limit: listdata.length //显示的数量
        });
    };

    window.setPage= function(rowCount)
    {
        laypage.render({
            elem: 'pagination'
            ,count: rowCount
            ,layout: ['count', 'prev', 'page', 'next',  'skip']
            ,jump: function(obj, first){
                if(!first){
                    vm.query(obj.curr,0);
                    //console.log(obj.curr);
                }
            }
        });
    };

    window.onSearch= function(conditionObj,pageNum)
    {

    };

});
var vm=new Vue({
    el: '#main',
    data: {
        logSearch: {
            engineno: ''
        }
    },
    methods: {
        queryTitle: function(){
            vm.logSearch.engineno=$('#engineno').val();
            $.ajax({
                type: 'post',
                cache: false,
                async: false,
                data: JSON.stringify(vm.logSearch),
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: siteurl+ '/mqs/report/queryOneIssue',
                success: function(r){
                    if(r.code === 0){
                        if(r.mqsIssueEntity!=null){
                            $('#productiondeptname').val(r.mqsIssueEntity.productiondeptname);
                            $('#enginenoTitle').val(r.mqsIssueEntity.engineno);
                            $('#enginemodel').val(r.mqsIssueEntity.enginemodel);
                            $('#productionlinename').val(r.mqsIssueEntity.productionlinename);
                            $('#enginetype').val(r.mqsIssueEntity.enginetype);
                            // $('#deadlinedate').val(r.mqsIssueEntity.deadlinedate);
                        }else{
                            $('#productiondeptname').val('');
                            $('#enginenoTitle').val('');
                            $('#enginemodel').val('');
                            $('#productionlinename').val('');
                            $('#enginetype').val('');
                            // $('#deadlinedate').val('');
                        }

                    }
                }
            })
        },
        query:function(pageNum,isRefreshDB){
            vm.logSearch.engineno=$('#engineno').val();
            console.log(vm.logSearch.engineno);
            $.ajax({
                type: 'post',
                cache: false,
                async: false,
                url: siteurl+ '/mqs/report/queryQualityResume/' + pageNum,
                data: JSON.stringify(vm.logSearch),
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success: function(r){
                    if(r.code === 0 ){
                        initList(r.page.list);
                    }
                    if (isRefreshDB == 1) {
                        setPage(r.page.totalCount);
                    }
                }

            });
        },
        export:function(){
            downFile2(siteurl+'/mqs/report/exportQualityResumeTable',
                {engineno:$('#engineno').val()}
            );
        }

    }

});
