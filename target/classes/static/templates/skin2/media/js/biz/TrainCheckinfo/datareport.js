var mychart1 = echarts.init(document.getElementById("echart1"), 'infographic');
var o = {
    title: {
        top: '1%',
        left: 'left',
        text: '年修复率统计(日)',
        subtext: '电子标签修复'
    },
    color: [
        '#FF9912',
        '#3D9140',
        '#C1232B',
        '#3D59AB',
        '#6D59AB',
        '#27727B'
    ],
    tooltip: {
        trigger: 'axis',
        formatter: function(params, ticket, callback) {
            var res = null;
            if(params.length > 3) {
                var name = params[0].name;
                res = name + '</br>';
                res += params[2].marker + params[2].seriesName + ":" + params[2].data + '</br>';
                res += params[0].marker + params[0].seriesName + ":" + params[0].data + '</br>';
                res += params[3].marker + params[3].seriesName + ":" + params[3].data + '</br>';
                res += params[1].marker + params[1].seriesName + ":" + params[1].data + '</br>';
            }
            return res;
        }
    },
    legend: {
        top: '7%',
        data:['总识别数','正确识别数','错误识别数','车号修复数']

    },
    grid: {
        top: '18%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {},
            magicType : {show: true, type: ['line', 'bar']}
        }
    },
    xAxis: [{
        type: 'category',
        axisLabel:{
            interval:0
        },
        data: []
    },
        {
            type : 'category',
            axisLabel:{
                interval:0
            },
            axisLine: {show:false},
            axisTick: {show:false},
            axisLabel: {show:false},
            splitArea: {show:false},
            splitLine: {show:false},
            data : []
        }],
    yAxis: {
        type: 'value',
        max: function (value) {
            return value.max;
        }
    },
    series: [
        {
            name: '总识别数',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            barWidth:'20',
            xAxisIndex:1,
            data: []
        },
        {
            name: '正确识别数',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            barWidth:'20',
            data: []
        },
        {
            name: '错误识别数',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            barWidth:'20',
            xAxisIndex:1,
            data: []
        },
        {
            name: '车号修复数',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            barWidth:'20',
            data: []
        }

    ]
};
layui.use(['form', 'layedit', 'laydate','table','laypage'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,table = layui.table
        ,laypage = layui.laypage
        ,laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });

    //监听提交
    form.on('submit(export)', function(data){
        /*layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })*/
        vm.exportreport();
        return false;
    });

    form.on('radio(daterange)', function (data) {
        mychart1.clear();
        vm.search.daterange = data.value;
        if(data.value == 'day'){
            o.title.text ='年修复率统计(日)'
        }else if(data.value == 'week'){
            o.title.text ='年修复率统计(周)'
        }else if(data.value == 'month'){
            o.title.text ='年修复率统计(月)'
        }else{
            o.title.text ='年修复率统计(年)'
        }
        vm.queryreort();
        return false;
    });

    vm.queryreort();


});
var vm = new Vue({
    el: 'main',
    data: {
        search:{
            daterange: 'day'
        }
    },
    methods: {
        queryreort: function(){
            $.ajax({
                type:'post',
                url: siteurl+'/train/chtraincheckinfo/queryecharts',
                data: JSON.stringify(vm.search),
                dataType: 'json',
                async: false,
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function(r){
                    o.xAxis[0].data = r.datelist;
                    o.xAxis[1].data = r.datelist;
                    o.series[0].data = r.totallist;
                    o.series[1].data = r.rightlist;
                    o.series[2].data = r.errorlist;
                    o.series[3].data = r.repairlist;
                    mychart1.setOption(o);
                }
            })
        },
        exportreport: function(){
            self.location.href= siteurl+ '/train/chtraincheckinfo/exportreport';
        }
    }
});

/*
* 柱形图和折线图切换时，X轴数据未对齐，
* 通过此方法进行对齐
**/
mychart1.on('magicTypeChanged', eConsole);
function eConsole(param) {
    if(param.currentType == 'line'){
        o.series[0].type = 'line';
        o.series[1].type = 'line';
        o.series[2].type = 'line';
        o.series[3].type = 'line';

        o.xAxis[0].boundaryGap = false;
        o.xAxis[1].boundaryGap = false;
        mychart1.setOption(o);

    }else{
        o.series[0].type = 'bar';
        o.series[1].type = 'bar';
        o.series[2].type = 'bar';
        o.series[3].type = 'bar';

        o.xAxis[0].boundaryGap = true;
        o.xAxis[1].boundaryGap = true;
        mychart1.setOption(o);
    }
}