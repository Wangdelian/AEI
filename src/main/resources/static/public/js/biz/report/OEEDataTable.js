/**
 * Created by Admin-zbf on 2017/7/20.
 */
/**
 *
 * modify by ybl on 2017/8/11
 */

$(function () {
   vm.getWorkLine();
});
window.onload=function() {
    var x = document.getElementsByClassName("paint");
    for(var i = 0;i < x.length;i++){
            var val = x[i].innerHTML;
          //  alert(val);
        var dayss=[];
        var shifts=[];
        var info=[];
        for(var j=0;j<vm.days.length;j++){
            if(val==vm.days[j].workline){
                dayss.push(vm.days[j].dateinfo);
            }
        }
        for(var j=0;j<vm.shifts.length;j++){
            if(val==vm.shifts[j].workline){
                shifts.push(vm.shifts[j].shiftname);
            }
        }
        for(var j=0;j<vm.messData.length;j++){
            if(val==vm.messData[j].workline){
                info.push(vm.messData[j]);
            }
        }
            vm.paint(x[i],dayss,shifts,info);
    }
}
var  vm=new Vue({
    el: '#main',
    data: {
        messData:[],
        workline:[],
        days:[],
        line:[],
        shifts:[],
        indexNow:0,
    },
    methods:{
        getReportList:  function () {
            //alert("加载数据");
            $.get(siteurl+"/mes/trend/list",{"time": new Date().getTime()}, function(r){
                vm.messData = r.list;
            });
            this.getWorkLineDays();
        },
        getWorkLine:function(){
          //  alert("加载工作线");
            var str='';
            $.ajax({
                type: "post",
                url: siteurl+"/mes/trend/worklinelist",
                contentType: "application/json",
                dataType: "json",
                async: false,
                success: function(r){
                   vm.workline=r.list;

                }
            });
            this.getReportList();
        },
        getWorkLineDays:function(){
        //    alert("加载工作日");
            $.get(siteurl+"/mes/trend/worklinedaylist",{"time": new Date().getTime()}, function(r){
                vm.days = r.list;

            });
            this. getWorkLineShift();

        },
        getWorkLineShift:function(){
            $.get(siteurl+"/mes/trend/worklineshiftlist",{"time": new Date().getTime()}, function(r){
                vm.shifts = r.list;
            });
        },
        paint:function (docu,dayss,shifts,info) {
            var datas=[];
            for(var i=0;i<shifts.length;i++){
                var worklinedata={'name':'','type':'','data':{}};
                var data=[];
                for(var j=0;j<info.length;j++){
                    if(info[j].shiftname==shifts[i]){

                        var str=info[j].efficiency;
                        var numindex=str.indexOf('%');
                        var strs=str.substring(0,numindex);
                        data.push(strs+"");
                    }
                }

                worklinedata.name=shifts[i];
                worklinedata.type='line';
                worklinedata.data=data;
                datas.push(worklinedata);
            }

            //条形图
            var option = {
                title: {
                    text: docu.innerHTML+'-设备综合效率月度趋势图',
                    subtext: 'oee月度趋势图',
                    x:'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: shifts
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: dayss
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series:datas
            };
           // var ss=JSON.stringify(datas);
            //console.log(ss);
            var myChart = echarts.init(docu);
            myChart.setOption(option);
    }
    }
});


