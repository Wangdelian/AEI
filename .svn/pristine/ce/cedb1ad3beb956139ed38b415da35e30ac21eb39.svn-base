
var myChart = echarts.init(document.getElementById('main_echart'), 'infographic');
var myChart2 = echarts.init(document.getElementById('main_echart2'), 'infographic');
var myChart3 = echarts.init(document.getElementById('main_echart3'), 'infographic');
var myChart4 = echarts.init(document.getElementById('main_echart4'), 'infographic');
var myChart5 = echarts.init(document.getElementById('main_echart5'), 'infographic');
var myChartPPM = echarts.init(document.getElementById('main_echartPPM'), 'infographic');
var oPPM = {
    title: {
        top: '1%',
        left: 'center',
        text: 'PPM趋势'
    },
    color: [
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#6D59AB',
        '#e5323e',
        '#3D9199',
        '#ca8699',
        '#BB9912',
        '#708090',
        '#6D59AB',
        '#F4A460',
        '#00FFFF',
        '#FFC0CB'
    ],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: '7%',
        data:[]

    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '5%',
        containLabel: true
    },
    toolbox: {
        right:'1%',
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        axisLabel:{
            interval:0
        },
        data: []
    },
    yAxis: {

        type: 'value',

    },
    series: []
};
var o = {
    title: {
        top: '1%',
        left: 'center',
        text: '各版块问题统计'
    },
    color: [
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#6D59AB',
        '#e5323e',
        '#3D9140',
        '#ca8622',
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#6D59AB',
        '#FF9912',
        '#3D9140',
        '#ca8622'
    ],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: '7%',
        data:[]

    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '5%',
        containLabel: true
    },
    toolbox: {
        right:'1%',
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        axisLabel:{
            interval:0
        },
        data: []
    },
    yAxis: {

        boundaryGap : true,
        type: 'value'
    },
    series: [ ]
};

var o2 = {
    title: {
        top: '1%',
        left: 'center',
        text: '各车间过程问题统计'
    },
    color: [
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#6D59AB',
        '#e5323e',
        '#3D9199',
        '#ca8699',
        '#BB9912',
        '#708090',
        '#6D59AB',
        '#F4A460',
        '#00FFFF',
        '#FFC0CB'
    ],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: '7%',
        data:[]

    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '5%',
        containLabel: true
    },
    toolbox: {
        right:'1%',
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        axisLabel:{
            interval:0
        },
        data: []
    },
    yAxis: {

        boundaryGap : true,
        type: 'value'
    },
    series: [ ]
};

var o3 = {
    title: {
        top: '1%',
        left: 'center',
        text: '零部件TOP问题'
    },
    color: [
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#6D59AB',
        '#e5323e',
        '#3D9199',
        '#ca8699',
        '#599555',
        '#BB9912',
        '#3D9140',
        '#6D59AB',
        '#FF9912',
        '#3D9140',
        '#ca8622'
    ],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: '7%',
        data:["数量"]

    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '5%',
        containLabel: true
    },
    toolbox: {
        right:'1%',
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        axisLabel:{
            interval:0,
            boundaryGap:false
        },
        data: []
    },
    yAxis: {
        boundaryGap : true,
        type: 'value'
    },
    series: [
        {
            name: '数量',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            barWidth:'20',
            data: []
        }

    ]
};

var o4 = {
    title: {
        top: '1%',
        left: 'center',
        text: 'TOP CCCs PPM柏拉图'
    },
    color: [
        '#3D59AB',
        '#FF9912',
        '#3D9140',
        '#6D59AB',
        '#e5323e',
        '#3D9199',
        '#ca8699',
        '#BB9912',
        '#708090',
        '#6D59AB',
        '#F4A460',
        '#00FFFF',
        '#FFC0CB'
    ],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: '7%',
        data:[]

    },
    grid: {
        top: '18%',
        left: '1%',
        right: '1%',
        bottom: '5%',
        containLabel: true
    },
    toolbox: {
        right:'1%',
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',

        axisLabel:{
            interval:0,
            rotate:30
        },
        data: []
    },
    yAxis: [{
        boundaryGap : true,
        type: 'value',

    },
        {
            type: 'value',
            name: '占比',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
                formatter: '{value} %'
            },
            splitLine : {
                show:false,
            }
        }
    ],
    series: [
        {
            name: [],
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            barWidth:'20',
            data: []
        },
        {
            name: [],
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            barWidth:'20',
            data: []
        },
        {
            name:'累计占比',
            type:'line',
            yAxisIndex: 1,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%'
                },
            },
            data:[ ]
        }


    ]
};

var o5 = {
    title: {
        text: '问题属性分类饼图',
        left: 'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: [ ]
    },
    series : [
        {
            type: 'pie',
            radius : '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data:[ ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label:{
                normal:{
                    show:true,
                    position:'outside',
                    textStyle : {
                        fontWeight : 300 ,
                        fontSize : 16
                    },
                    formatter:'{c} {d}%'
                }
            }
        }
    ]
};



function getPPMxAxisDate(){
    var params={
        startTime: $('#startTimePPM').val(),
        endTime: $('#endTimePPM').val()
    };
    var num=3;
    var arr=[];
    var beginMonth=null,
        endMonth=null;

    $.ajax({
        type: "post",
        async: false,
        url: siteurl+"/mqs/report/getTime/",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (date) {
            beginMonth = new Date(date[0]).getMonth()+1;
            endMonth = new Date(date[1]).getMonth()+1;

            for(var i=beginMonth;i<beginMonth+date[2];i++){
                arr.push((i%12==0?12:i%12)+"月");
            }
            for(var i=beginMonth;i<beginMonth+date[2];i++){
                arr.push((i%12==0?12:i%12)+"月累计");
            }
        },
        error: {}
    });
    return arr;
}



function getPPMLengent(){

    var arr=[];
    var params={
        startTime: $('#startTimePPM').val(),
        endTime: $('#endTimePPM').val()
    };
    $.ajax({
        type : "post",
        async : false,
        url : siteurl+"/mqs/report/getppmlengentlist",
        data: JSON.stringify(params),
        dataType : "json",
        contentType: 'application/json;charset=UTF-8',
        success : function(date) {
            if (date) {
                for (var j = 0; j < date.length; j++) {
                    arr.push(date[j].dutydept);
                }
            }
        },
        error : function(errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }

    });
    //  debugger;
    return arr;

}


function getPPMSeries(){

    var seriesarr=[];
    var lengent=getPPMLengent();

    for(var i=0;i<lengent.length;i++){

        var arr=[];
        var lengentName=lengent[i];
        var params={
            lengentName:lengentName,
            startTime: $('#startTimePPM').val(),
            endTime: $('#endTimePPM').val()
        };



        $.ajax({
            type : "post",
            async : false,
            url :  siteurl+"/mqs/report/ppmlist",
            data: JSON.stringify(params),
            dataType : "json",
            contentType: 'application/json;charset=UTF-8',
            success : function(date) {
                var arrvalue=null;
                if (date) {
                    for (var i = 0; i <date.length; i++) {
                        if(date[i]==0){
                            arr.push(null);
                        }else{
                            arr.push(date[i]);
                        }
                    }
                    for (var i = 0; i <date.length; i++) {
                        arr.push(null);
                    }
                }
            },
            error : function(errorMsg) {
                alert("不好意思,图表请求数据失败啦!");
                myChart3.hideLoading();
            }
        });

        var seriesValue=
            {
                name:lengentName,
                type:'bar',
                data:arr,
                barGap:'-100%',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };
        seriesarr.push(seriesValue);
    }

    for(var i=0;i<lengent.length;i++){
        var arr=[];
        var lengentName=lengent[i];
        var params={
            lengentName:lengentName,
            startTime: $('#startTimePPM').val(),
            endTime: $('#endTimePPM').val()

        };
        $.ajax({
            type : "post",
            async : false,
            url : siteurl+"/mqs/report/ppmnumlist",
            data: JSON.stringify(params),
            dataType : "json",
            contentType: 'application/json;charset=UTF-8',
            success : function(date) {

                if (date) {
                    for (var i = 0; i <date.length; i++) {
                        arr.push(null);
                    }
                    for (var i = 0; i <date.length; i++) {
                        if(date[i]==null){
                            arr.push(null);
                        }else{
                            arr.push(date[i]);
                        }

                    }

                }
            },
            error : function(errorMsg) {
                alert("不好意思,图表请求数据失败啦!");
                myChart3.hideLoading();
            }

        });
        var seriesValue=
            {
                name:lengentName,
                type:'bar',
                data:arr,
                barGap:'-30%',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };

        seriesarr.push(seriesValue);
    }

    return seriesarr;

}


function getxAxisDate(){
    var num=3;
    var arr=[];
    var beginMonth=null,
        endMonth=null;
    var params={
        startTime: $('#startTime').val(),
        endTime: $('#endTime').val()
    };
    $.ajax({
        type: "post",
        async: false,
        url: siteurl+"/mqs/report/getTime/",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (date) {
            beginMonth = new Date(date[0]).getMonth()+1;
            endMonth = new Date(date[1]).getMonth()+1;
            for(var i=beginMonth;i<beginMonth+date[2];i++){
                arr.push((i%12==0?12:i%12)+"月");
            }
            for(var i=beginMonth;i<beginMonth+date[2];i++){
                arr.push((i%12==0?12:i%12)+"月累计");
            }
        },
        error: {}
    });
    return arr;
}

function getLengent(){
    var arr=[];
    var params={
        startTime: $('#startTime').val(),
        endTime: $('#endTime').val()
    };
    $.ajax({
        type : "post",
        async : false,
        url : siteurl+"/mqs/report/getlengentlist",
        data: JSON.stringify(params),
        dataType : "json",
        contentType: 'application/json;charset=UTF-8',
        success : function(date) {
            if (date) {
                for (var j = 0; j < date.length; j++) {
                    arr.push(date[j].issueattr);
                }
            }
        },
        error : function(errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart.hideLoading();
        }

    });
    //  debugger;
    return arr;
}

function getSeries(){
    var seriesarr=[];
    var lengent=getLengent();
    for(var i=0;i<lengent.length;i++){
        var arr=[];
        var lengentName=lengent[i];
        var params={
            lengentName:lengentName,
            startTime: $('#startTime').val(),
            endTime: $('#endTime').val()
        };
        $.ajax({
            type : "post",
            async : false,
            url :  siteurl+"/mqs/report/issueattrlist",
            data: JSON.stringify(params),
            dataType : "json",
            contentType: 'application/json;charset=UTF-8',
            success : function(date) {
                var arrvalue=null;
                if (date) {
                    for (var i = 0; i <date.length; i++) {
                        arr.push(date[i]);

                    }
                    for (var i = 0; i <date.length; i++) {
                        arr.push(null);
                    }
                }
            },
            error : function(errorMsg) {
                alert("不好意思,图表请求数据失败啦!");
                myChart.hideLoading();
            }
        });
        var seriesValue=
            {
                name:lengentName,
                type:'bar',
                data:arr,
                barGap:'-30%',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };

        seriesarr.push(seriesValue);
    }
    for(var i=0;i<lengent.length;i++){
        var arr=[];
        var lengentName=lengent[i];
        var params={
            lengentName:lengentName,
            startTime: $('#startTime').val(),
            endTime: $('#endTime').val()
        };
        $.ajax({
            type : "post",
            async : false,
            url : siteurl+"/mqs/report/issueattrnumlist",
            data: JSON.stringify(params),
            dataType : "json",
            contentType: 'application/json;charset=UTF-8',
            success : function(date) {
                if (date) {
                    for (var i = 0; i <date.length; i++) {
                        arr.push(null);
                    }
                    for (var i = 0; i <date.length; i++) {
                        if(date[i]==0){
                            arr.push(null);
                        }else{
                            arr.push(date[i]);
                        }
                    }

                }
            },
            error : function(errorMsg) {
                alert("不好意思,图表请求数据失败啦!");
                myChart.hideLoading();
            }
        });
        var seriesValue=
            {
                name:lengentName,
                type:'bar',
                data:arr,
                barGap:'-30%',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };
        seriesarr.push(seriesValue);
    }
    return seriesarr;
}


function getxAxisDateDutydept(){
    var arr=[];
    var beginMonth=null,
        endMonth=null;
    var params={
        startTime: $('#startTimeDutydept').val(),
        endTime: $('#endTimeDutydept').val()
    };
    $.ajax({
        type: "post",
        async: false,
        url: siteurl+"/mqs/report/getTime/",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (date) {
            beginMonth = new Date(date[0]).getMonth()+1;
            endMonth = new Date(date[1]).getMonth()+1;
            for(var i=beginMonth;i<beginMonth+date[2];i++){
                arr.push((i%12==0?12:i%12)+"月");
            }
            for(var i=beginMonth;i<beginMonth+date[2];i++){
                arr.push((i%12==0?12:i%12)+"月累计");
            }
        },
        error: {}
    });
    //console.log(arr);
    return arr;
}

function getDutydeptLengent(){
    var arr=[];
    var params={
        startTime: $('#startTimeDutydept').val(),
        endTime: $('#endTimeDutydept').val()
    };
    $.ajax({
        type : "post",
        async : false,
        url : siteurl+"/mqs/report/querydutydeptlengentlist",
        data: JSON.stringify(params),
        dataType : "json",
        contentType: 'application/json;charset=UTF-8',
        success : function(date) {
            if (date) {
                for (var j = 0; j < date.length; j++) {
                    arr.push(date[j].dutydept);
                }
            }
        },
        error : function(errorMsg) {
            alert("不好意思,图表请求数据失败啦!");
            myChart2.hideLoading();
        }

    });
    //  debugger;
    return arr;
}

function getDutydeptSeries(){
    var seriesarr=[];
    var lengent=getDutydeptLengent();
    for(var i=0;i<lengent.length;i++){
        var arr=[];
        var lengentName=lengent[i];
        var params={
            lengentName:lengentName,
            startTime: $('#startTimeDutydept').val(),
            endTime: $('#endTimeDutydept').val()
        };
        $.ajax({
            type : "post",
            async : false,
            url :  siteurl+"/mqs/report/dutydeptlist",
            data: JSON.stringify(params),
            dataType : "json",
            contentType: 'application/json;charset=UTF-8',
            success : function(date) {
                var arrvalue=null;
                if (date) {
                    for (var i = 0; i <date.length; i++) {
                        if(date[i]==0){
                            arr.push(null);
                        }else{
                            arr.push(date[i]);
                        }
                    }
                    for (var i = 0; i <date.length; i++) {
                        arr.push(null);
                    }
                }
            },
            error : function(errorMsg) {
                alert("不好意思,图表请求数据失败啦!");
                myChart2.hideLoading();
            }
        });

        var seriesValue=
            {
                name:lengentName,
                type:'bar',
                data:arr,
                barGap:'-30%',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };

        seriesarr.push(seriesValue);
    }
    for(var i=0;i<lengent.length;i++){
        var arr=[];
        var lengentName=lengent[i];
        var params={
            lengentName:lengentName,
            startTime: $('#startTimeDutydept').val(),
            endTime: $('#endTimeDutydept').val()
        };
        $.ajax({
            type : "post",
            async : false,
            url : siteurl+"/mqs/report/dutydeptnumlist",
            data: JSON.stringify(params),
            dataType : "json",
            contentType: 'application/json;charset=UTF-8',
            success : function(date) {
                if (date) {
                    for (var i = 0; i <date.length; i++) {
                        arr.push(null);
                    }
                    for (var i = 0; i <date.length; i++) {
                        if(date[i]==0){
                            arr.push(null);
                        }else{
                            arr.push(date[i]);
                        }
                    }

                }
            },
            error : function(errorMsg) {
                alert("不好意思,图表请求数据失败啦!");
                myChart2.hideLoading();
            }
        });
        var seriesValue=
            {
                name:lengentName,
                type:'bar',
                data:arr,
                barGap:'-30%',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };
        seriesarr.push(seriesValue);
    }
    return seriesarr;
}


function getItemPartSeries(){
    var arr=[];
    var arrSeries=[];
    var arrxAxis=[];
    params={
        startTime: $('#startTimeItemPart').val(),
        endTime: $('#endTimeItemPart').val()
    };
    $.ajax({
        type: "post",
        async: false,
        url: siteurl+"/mqs/report/queryItemPartSeriesList",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json;chartset=UTF-8",
        success:function(date){

            if(date){
                for(var i=0;i<date.length;i++){
                    arrxAxis.push(date[i].itempart);
                    arrSeries.push(date[i].count);
                }
            }
        },
        error:function(errorMsg){
            alert("不好意思,图表请求数据失败啦!");
            myChart3.hideLoading();
        }
    });
    arr.push(arrxAxis);
    arr.push(arrSeries);

    return arr;

}

function getPlatoLengent(){
    var arr=[];
    var params={

    };
    $.ajax({
        type: "post",
        async: false,
        data: JSON.stringify(params),
        url: siteurl+"/mqs/report/getPlatoLengent",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function(data){
            for(var i=0;i<data.length;i++){
                arr.push(data[i].split("-")[0]+"年PPM");
            }
            arr.push("累计占比");

        },
        error:function(errorMsg){
            alert("不好意思,图表请求数据失败啦!");
            myChart4.hideLoading();
        }
    });
    return arr;
}

function getPlatoxAxisLengent(){
    var arr=[];
    var params={

    };
    $.ajax({
        type: "post",
        async: false,
        data: JSON.stringify(params),
        url: siteurl+"/mqs/report/getPlatoxAxisLengent",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function(data){
            for(var i=0;i<data.length;i++){
                arr.push(data[i].ccc);
            }

        },
        error:function(errorMsg){
            alert("不好意思,图表请求数据失败啦!");
            myChart4.hideLoading();

        }

    });
    return arr;
}

function getPlatoSeries(){
    var arr=[];
    var params={
    };
    $.ajax({
        type: "post",
        async: false,
        data: JSON.stringify(params),
        url: siteurl+"/mqs/report/getPlatoSeries",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function(data){
            for(var i=0;i<data.length;i++){
                for(var j=0;j<data[i].length;j++){
                    if(data[i][j]==0){
                        data[i][j]="";
                    }
                }
                arr.push(data[i]);
            }

        },
        error:function(errorMsg){
            alert("不好意思,图表请求数据失败啦!");
            myChart4.hideLoading();
        }
    });
    console.log(arr);
    return arr;
}

function getIssueAttrBingSeries(){
    var arr=[];
    var lengentarr=[];
    var seriesarr=[];
    var params={
        startTime: $('#startTimeBing').val(),
        endTime: $('#endTimeBing').val()
    };
    $.ajax({
        type: "post",
        async: false,
        data: JSON.stringify(params),
        url: siteurl+"/mqs/report/getIssueAttrBingSeries",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function(data){
            for(var i=0;i<data.length;i++){
                seriesarr.push({value:data[i].count, name:data[i].issueattr});
                lengentarr.push(data[i].issueattr);
            }
            arr.push(seriesarr);
            arr.push(lengentarr);
        },
        error:function(errorMsg){
            alert("不好意思,图表请求数据失败啦!");
            myChart5.hideLoading();
        }
    });
    return arr;
}

$(function () {
    o.legend.data=getLengent();
    o.series=getSeries();
    o.xAxis.data=getxAxisDate();
    //初始化表格数据
    myChart.setOption(o);

    o2.legend.data=getDutydeptLengent();
    o2.series=getDutydeptSeries();
    o2.xAxis.data=getxAxisDateDutydept();
    myChart2.setOption(o2);

    o3.xAxis.data=getItemPartSeries()[0];
    o3.series[0].data=getItemPartSeries()[1];
    myChart3.setOption(o3);

    o4.legend.data=getPlatoLengent();
    o4.xAxis.data=getPlatoxAxisLengent();
    o4.series[0].data=getPlatoSeries()[0];
    o4.series[0].name=getPlatoLengent()[0];
    o4.series[1].data=getPlatoSeries()[1];
    o4.series[1].name=getPlatoLengent()[1];
    o4.series[2].data=getPlatoSeries()[2];
    myChart4.setOption(o4);

    o5.series[0].data=getIssueAttrBingSeries()[0];
    o5.legend.data=getIssueAttrBingSeries()[1];
    myChart5.setOption(o5);


    oPPM.xAxis.data=getPPMxAxisDate();
    oPPM.legend.data=getPPMLengent();
    oPPM.series=getPPMSeries();
    myChartPPM.setOption(oPPM);


});
layui.use(['table','laypage', 'layer','form', 'layedit', 'laydate'], function(){
    var laypage = layui.laypage,layer = layui.layer;
    var table = layui.table;
    form = layui.form;
    laydate = layui.laydate;
    //时间选择器

    var startTime = laydate.render({
        elem: '#startTime'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            endTime.config.min = date;
        }
    });
    var endTime = laydate.render({
        elem: '#endTime'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            startTime.config.max = date;
        }
    });

    var startTimePPM = laydate.render({
        elem: '#startTimePPM'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            endTimePPM.config.min = date;
        }
    });
    var endTimePPM = laydate.render({
        elem: '#endTimePPM'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            startTimePPM.config.max = date;
        }
    });

    var startTimeDutydept = laydate.render({
        elem: '#startTimeDutydept'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            endTimeDutydept.config.min = date;
        }
    });
    var endTimeDutydept = laydate.render({
        elem: '#endTimeDutydept'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            startTimeDutydept.config.max = date;
        }
    });

    var startTimeItemPart = laydate.render({
        elem: '#startTimeItemPart'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            endTimeItemPart.config.min = date;
        }
    });
    var endTimeItemPart =  laydate.render({
        elem: '#endTimeItemPart'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            startTimeItemPart.config.max = date;
        }
    });

    var startTimeBing = laydate.render({
        elem: '#startTimeBing'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            endTimeBing.config.min = date;
        }
    });
    var endTimeBing = laydate.render({
        elem: '#endTimeBing'
        , calendar: true
        ,done: function (value, date) {
            date.month--;
            startTimeBing.config.max = date;
        }
    });

    //监听性别操作
    form.on('switch(sexDemo)', function(obj){
        layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
    });

    //监听锁定操作
    form.on('checkbox(lockDemo)', function(obj){
        layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
    });
    //监听表格复选框选择
    table.on('checkbox(demo)', function(obj){
        console.log(obj)
    });

    var $ = layui.$, active = {
        SearchList: function(){
            var startTime=$("#startTime").val();
            var endTime=$("#endTime").val();
            var d1 = new Date(startTime.replace(/\-/g, "\/"));
            var d2 = new Date(endTime.replace(/\-/g, "\/"));

            if(startTime!=""&&endTime!=""&&d1 >=d2)
            {
                layer.alert('开始时间不能大于结束时间');
                return false;
            }

            myChart.clear();
            o.legend.data=getLengent();
            o.series=getSeries();
            o.xAxis.data=getxAxisDate();
            //初始化表格数据
            myChart.setOption(o);


        },
        SearchListDutydept: function(){
            var startTime=$("#startTimeDutydept").val();
            var endTime=$("#endTimeDutydept").val();
            var d1 = new Date(startTime.replace(/\-/g, "\/"));
            var d2 = new Date(endTime.replace(/\-/g, "\/"));

            if(startTime!=""&&endTime!=""&&d1 >=d2)
            {
                layer.alert('开始时间不能大于结束时间');
                return false;
            }
            myChart2.clear();
            o2.legend.data=getDutydeptLengent();
            o2.series=getDutydeptSeries();
            o2.xAxis.data=getxAxisDateDutydept();
            //初始化表格数据
            myChart2.setOption(o2);

        },

        SearchListItemPart:function(){
            var startTime=$("#startTimeItemPart").val();
            var endTime=$("#endTimeItemPart").val();
            var d1 = new Date(startTime.replace(/\-/g, "\/"));
            var d2 = new Date(endTime.replace(/\-/g, "\/"));

            if(startTime!=""&&endTime!=""&&d1 >=d2)
            {
                layer.alert('开始时间不能大于结束时间');
                return false;
            }
            myChart3.clear();
            o3.xAxis.data=getItemPartSeries()[0];
            o3.series[0].data=getItemPartSeries()[1];
            myChart3.setOption(o3);
        },

        SearchListBing:function(){
            var startTime=$("#startTimeBing").val();
            var endTime=$("#endTimeBing").val();
            var d1 = new Date(startTime.replace(/\-/g, "\/"));
            var d2 = new Date(endTime.replace(/\-/g, "\/"));

            if(startTime!=""&&endTime!=""&&d1 >=d2)
            {
                layer.alert('开始时间不能大于结束时间');
                return false;
            }
            myChart5.clear();
            o5.series[0].data=getIssueAttrBingSeries()[0];
            o5.legend.data=getIssueAttrBingSeries()[1];
            myChart5.setOption(o5);
        },
        SearchListPPM: function(){
            var startTime=$("#startTimePPM").val();
            var endTime=$("#endTimePPM").val();
            var d1 = new Date(startTime.replace(/\-/g, "\/"));
            var d2 = new Date(endTime.replace(/\-/g, "\/"));

            if(startTime!=""&&endTime!=""&&d1 >=d2)
            {
                layer.alert('开始时间不能大于结束时间');
                return false;
            }
            myChartPPM.clear();
            oPPM.xAxis.data=getPPMxAxisDate();
            oPPM.legend.data=getPPMLengent();
            oPPM.series=getPPMSeries();
            myChartPPM.setOption(oPPM);

        }
    };
    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $('.layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //完整功能
    laypage.render({
        elem: 'demo7'
        ,count: 100
        ,layout: ['count', 'prev', 'page', 'next',  'skip']
        ,jump: function(obj){
            console.log(obj)
        }
    });
    window.Hello = function(listdata){
        //查询按钮触发
        table.reload('idTest', {
            data: listdata
        });
    };
    //构造列表
    window.initList = function(listdata){

    };
    window.onSearch= function(conditionObj,pageNum)
    {

    }

});