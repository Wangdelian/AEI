/*声明layui*/
layui.use(['laypage', 'layer', 'form', 'laydate', 'table'], function () {
    var laypage = layui.laypage, layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var layer = layui.layer;
    form.render();
    form.on('submit(demo1)', function (data) {
        data.field.stationid = stationid;
        $.ajax({
            url: siteurl + '/mqs/mqsstation/update',
            type: 'POST',
            data: JSON.stringify(data.field),
            async: false,
            cache: false,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                parent.parent.layer.msg("操作成功");
                var MenuOpt = {
                    url: siteurl + '/mqs/mqsstation/searchlist/',
                    icon: '&#xe6c6;',
                    title: '采集点管理',
                    id: '21'
                };
                parent.app.closeTab('21');
                parent.app.addTab(MenuOpt);
                parent.parent.layer.msg("操作成功");
                parent.app.closeTab('211');
            },
            error: function (data) {
                alert('查找板块报错');
            }
        });
        return false;//阻止more吗的form表单提交
    });

    form.on('select', function (data) {
        if (data.elem.getAttribute('lay-filter') == "select1") {
            vm.station.productionlineid = data.value;
        }
        if (data.elem.getAttribute('lay-filter') == "select2") {
            vm.station.regionid = data.value;
        }
        if (data.elem.getAttribute('lay-filter') == "select3") {
            vm.station.mesStationid = data.value;
        }
        // console.log("1..........")
        // console.log(data.elem.getAttribute('lay-filter')); //得到select原始DOM对象
        // console.log(data.value); //得到被选中的值
        // console.log(data.othis); //得到美化后的DOM对象
    });
})

var vm = new Vue({
    el: '#main',
    data: {
        form: null,
        MenuOpt: {
            url: '',
            icon: '',
            title: '',
            id: ''
        },
        station: {
            loglist: {},
            list: [],
            stationid: '',
            stationcode: '',
            stationname: '',
            regionid: '',
            productionlineid: '',
            productiondeptname: '',
            mesStationname: '',
            mesStationid: '',
            remark: ''
        },
        layer: null
    },
    methods: {
//动态添加option
        addOption: function () {
            $.ajax({
                url: siteurl + '/mqs/mqsstation/addOption',
                type: 'POST',
                async: false,
                success: function (data) {
                    //生产线
                    var html = '';
                    for (var i = 0; i < data.productionline.length; i++) {
                        if (productionlineid == data.productionline[i].productionlinename) {
                            html += '<option selected value=' + data.productionline[i].productionlineid + '>' + data.productionline[i].productionlinename + '</option>';
                        }
                        else {
                            html += '<option value=' + data.productionline[i].productionlineid + '>' + data.productionline[i].productionlinename + '</option>';
                        }

                    }
                    $("select[name='productionlineid']").append(html);
                    //区域
                    var html = '';
                    for (var i = 0; i < data.region.length; i++) {
                        if (regionid == data.region[i].regionname) {
                            html += '<option selected value=' + data.region[i].regionid + '>' + data.region[i].regionname + '</option>';
                        }
                        else {
                            html += '<option value=' + data.region[i].regionid + '>' + data.region[i].regionname + '</option>';
                        }

                    }
                    $("select[name='regionid']").append(html);
                    //mes工位
                    var html = '';
                    for (var i = 0; i < data.mesStation.length; i++) {
                        if (mesStationid == data.mesStation[i].messtationid) {
                            html += '<option selected value=' + data.mesStation[i].messtationid + '>' + data.mesStation[i].messtationname + '</option>';
                        } else {
                            html += '<option value=' + data.mesStation[i].messtationid + '>' + data.mesStation[i].messtationname + '</option>';
                        }
                    }
                    $("select[name='mesStationid']").append(html);


                },
                error: function (data) {
                    alert('查找板块报错');
                }
            });
        },
        getStation: function (stationid) {
            $.ajax({
                type: "GET",
                url: siteurl + '/mqs/mqsstation/info/' + stationid,
                async: false,
                cache: false,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code == 0) {

                    } else {
                        parent.parent.layer.alert(r.msg, {shade: 0.3});
                    }
                }
            });
        }
    }
});

$(function () {
    vm.addOption();
    vm.getStation(stationid)
})



