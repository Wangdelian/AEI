/**
 * Created by Admin-zbf on 2017/7/21.
 */
var option = {
    title : {
        text: '效率损失占比图',
        subtext: '虚构数据',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['换型','设备故障','换刀/换模','调整/试机','质量风险评估等待']
    },
    series : [
        {
            name: '损失占比',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:60, name:'换型'},
                {value:10, name:'设备故障'},
                {value:0, name:'换刀/换模'},
                {value:0, name:'调整/试机'},
                {value:0, name:'质量风险评估等待'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

$(document).ready(function () {
    echarts.init($("#main")[0]).setOption(option);
});

