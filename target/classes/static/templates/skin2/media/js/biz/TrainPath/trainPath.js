//var pathIndex = 1;
var vm = new Vue({
    el: 'main',
    data: {
        search: {
            type:'',
            number:''
        }
    },
    methods: {
    }
});
layui.use(['form', 'layedit', 'flow', 'table', 'laypage'], function () {
    var flow = layui.flow;
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , table = layui.table
        , laypage = layui.laypage
        , laydate = layui.laydate;
    var $ = layui.$;

    //机车运行轨迹流加载
    function loadPath() {
        flow.load({
            elem: '#pathContainer' //流加载容器
            , scrollElem: '#pathContainer' //滚动条所在元素，一般不用填，此处只是演示需要。
            , isAuto: false
            , isLazyimg: true
            , done: function (page, next) { //加载下一页
                $.ajax({
                    type: 'post',
                    url: siteurl + '/train/trainpath/trainPath/' + page,
                    data: JSON.stringify(vm.search),
                    dataType: 'json',
                    async: false,
                    cache: false,
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        if (r.code === 0) {
                            if (r.page.list.length < 1) {
                                $('#pathContainer').html('<h3>暂无数据!请选择车型车号!</h3>');
                                return;
                            }
                            var lis = [];
                            for (var i = 0; i < r.page.list.length; i++) {
                                lis.push('<li>\n' +
                                    '            <div>\n' +
                                    '                <time>' + r.page.list[i].ftimethrough + '</time>\n' +
                                    '                <div class="discovery">\n' +
                                    '                    <p>'+r.page.list[i].fpasssite+'</p>\n' +
                                    '                    <p>'+r.page.list[i].fpasspoint+'</p>\n' +
                                    '                    <p>方向：'+r.page.list[i].fdirection+'</p>\n' +
                                    '                </div>\n' +
                                    '            </div>\n' +
                                    '        </li>');
                                /*lis.push('<li>\n' +
                                    '<div>\n' +
                                    '<time>' + r.page.list[i].ftimethrough + '</time>\n' +
                                    '<div>\n' +
                                    '<ul>'+
                                    '<li>'+r.page.list[i].fpasssite+'</li>'+
                                    '<li>'+r.page.list[i].fpasspoint+'</li>'+
                                    '<li>'+r.page.list[i].fdirection+'</li>'+
                                    '</ul>'+
                                    '</div>\n' +
                                    '</li>');*/


                                /*lis.push('<li class="layui-timeline-item">'+
                                    '<i class="layui-icon layui-timeline-axis">&#xe63f;</i>' +
                                    '<div class="layui-timeline-content layui-text">' +
                                    '<h3 class="layui-timeline-title">('+ pathIndex++ +')   ' + r.page.list[i].ftimethrough + '</h3>'+
                                    '<ul>'+
                                    '<li>'+r.page.list[i].fpasssite+'</li>'+
                                    '<li>'+r.page.list[i].fpasspoint+'</li>'+
                                    '<li>'+r.page.list[i].fdirection+'</li>'+
                                '</ul>'+
                                '</div>'+
                                '</li>')*/
                            }
                            next(lis.join(''), page < Math.ceil(r.page.totalCount/10));
                        } else {
                            alert(r.msg);
                        }

                    }
                })
            }
        });
    }

    //监听查询按钮
    form.on('submit(demo1)', function (data) {
        vm.search = data.field;
        $('#pathContainer').animate({scrollTop:0},'slow');
        $('#pathContainer').html('');
        //pathIndex = 1;
        loadPath();
        callbackFunc();
        form.render();
        return false;
    });

    //监听车型选择
    form.on('select(type)', function (data) {
        if(data.value!=""){
            queryNumber(data.value);
            form.render();
        }
        return false;
    });


    queryType();
    form.render();

});
//初始化车型选择列表
function queryType() {
    var html = '<option value="">请搜索选择</option>';
    $.ajax({
        type: 'post',
        url: siteurl + '/train/trainpath/queryType',
        dataType: 'json',
        data: JSON.stringify({}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.list;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                            html += "<option value='" + list[i].fTraintypeverdict + "'>" + list[i].fTraintypeverdict + "</option>"
                    }
                }
                $("select[name='type']").empty().append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}

//初始化车号选择列表
function queryNumber(data) {
    var html = '<option value="">请搜索选择</option>';
    $.ajax({
        type: 'post',
        url: siteurl + '/train/trainpath/queryNumber',
        dataType: 'json',
        data: JSON.stringify({type:data}),
        async: false,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            if (r.code === 0) {
                var list = r.list;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {
                        html += "<option value='" + list[i].fTrainnumberverdict + "'>" + list[i].fTrainnumberverdict + "</option>"
                    }
                }
                $("select[name='number']").empty().append(html);
            } else {
                alert(r.msg);
            }
        }
    })
}



var items = document.querySelectorAll(".timeline li");

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function callbackFunc() {
    items = document.querySelectorAll(".timeline li");
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            if(!items[i].classList.contains("in-view")){
                items[i].classList.add("in-view");
            }
        } else if(items[i].classList.contains("in-view")) {
            items[i].classList.remove("in-view");
        }
    }
}
$('#pathContainer').scroll(function(){
    callbackFunc();
    }
);