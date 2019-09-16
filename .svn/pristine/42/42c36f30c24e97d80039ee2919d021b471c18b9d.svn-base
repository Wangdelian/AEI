/**
 * Created by Administrator on 2017/8/11.
 */


var vm =new Vue({
    el: '#container',
    data: {
        promoteData:[]
    },
    methods:{
        getReportList:  function () {
            $.ajax({
                type: "post",
                url: siteurl+"/mes/promote/list",
                contentType: "application/json",
                dataType: "json",
                async: false,
                success:function(r){
                    vm.promoteData = r.list;
                }
            });

        },
        //获取饼图数据
        paint: function(){
            var block = document.getElementsByClassName("main");
            for(var i = 0;i < block.length;i++){
                var data = [{'value':'', 'name':'换型'},
                    {'value':'', 'name':'设备故障'},
                    {'value':'', 'name':'换刀/换模'},
                    {'value':'', 'name':'调整/试机'},
                    {'value':'', 'name':'质量风险评估等待'}];

                data[0].value = vm.promoteData[i].replacetime;
                data[1].value = vm.promoteData[i].equipfaulttime;
                data[2].value = vm.promoteData[i].changknifedix;
                data[3].value = vm.promoteData[i].adjusttesttime;
                data[4].value = vm.promoteData[i].riskassessment;

                vm.draw(data,block[i]);
            }
        },
        //填充饼图
        draw:function (data,obj){
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
                        data:data,
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

                echarts.init(obj).setOption(option);
        }

    }
});

$(function(){
   vm.getReportList();
});

//页面加载完成后执行
window.onload = function(){
    vm.paint();
}





