var icc = [];
var year = [];
var month1 = [];
var month2 = [];
var month3 = [];
var week1 = [];
var week2 = [];
var week3 = [];
var week4 = [];
var week5 = [];
var week6 = [];
var days = [];
var day1 = [];
var day2 = [];
var day3 = [];
var day4 = [];
var day5 = [];
var day6 = [];
var day7 = [];
var day8 = [];
var day9 = [];
var day10 = [];
var day11 = [];
var day12 = [];
var day13 = [];
var day14 = [];
var day15 = [];
var day16 = [];
var day17 = [];
var day18 = [];
var day19 = [];
var day20 = [];
var seriesarr = [];
var dayList = [];
var myChart = echarts.init(document.getElementById('main_echart'), 'infographic');

layui.use(['table', 'layer', 'form', 'laydate'], function () {
    var layer = layui.layer;
    var table = layui.table;
    var form = layui.form;
    var laydate = layui.laydate;
    //时间选择器

    //时间选择器
    laydate.render({
        elem: '#endTime'
        , type: 'datetime'
        , done: function (value, date) {
            date.month--;
        }
    });


    form.on('submit(search)', function (data) {
        queryC1000(data.field);
    });

});


function queryC1000(condition) {
    $.ajax({
        url: siteurl + '/mqs/report/c1000Value',
        type: "POST",
        async: true,
        data: JSON.stringify(condition),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            icc = [];
            year = [];
            month1 = [];
            month2 = [];
            month3 = [];
            week1 = [];
            week2 = [];
            week3 = [];
            week4 = [];
            week5 = [];
            week6 = [];
            days = [];
            day1 = [];
            day2 = [];
            day3 = [];
            day4 = [];
            day5 = [];
            day6 = [];
            day7 = [];
            day8 = [];
            day9 = [];
            day10 = [];
            day11 = [];
            day12 = [];
            day13 = [];
            day14 = [];
            day15 = [];
            day16 = [];
            day17 = [];
            day18 = [];
            day19 = [];
            day20 = [];
            seriesarr = [];
            dayList = [];
            dayList = r.dayList;
            dayList.splice(0, 2);
            for (var i = 0; i < r.TableC1000.length - 1; i++) {
                icc[i] = r.TableC1000[i].title1;
                year[i] = r.TableC1000[i].year;
                month1[i] = r.TableC1000[i].month1;
                month2[i] = r.TableC1000[i].month2;
                month3[i] = r.TableC1000[i].month3;
                week1[i] = r.TableC1000[i].week1;
                week2[i] = r.TableC1000[i].week2;
                week3[i] = r.TableC1000[i].week3;
                week4[i] = r.TableC1000[i].week4;
                week5[i] = r.TableC1000[i].week5;
                week6[i] = r.TableC1000[i].week6;
                days[i] = r.TableC1000[i].days;
                day1[i] = r.TableC1000[i].day1;
                day2[i] = r.TableC1000[i].day2;
                day3[i] = r.TableC1000[i].day3;
                day4[i] = r.TableC1000[i].day4;
                day5[i] = r.TableC1000[i].day5;
                day6[i] = r.TableC1000[i].day6;
                day7[i] = r.TableC1000[i].day7;
                day8[i] = r.TableC1000[i].day8;
                day9[i] = r.TableC1000[i].day9;
                day10[i] = r.TableC1000[i].day10;
                day11[i] = r.TableC1000[i].day11;
                day12[i] = r.TableC1000[i].day12;
                day13[i] = r.TableC1000[i].day13;
                day14[i] = r.TableC1000[i].day14;
                day15[i] = r.TableC1000[i].day15;
                day16[i] = r.TableC1000[i].day16;
                day17[i] = r.TableC1000[i].day17;
                day18[i] = r.TableC1000[i].day18;
                day19[i] = r.TableC1000[i].day19;
                day20[i] = r.TableC1000[i].day20;
            }
            seriesarr = [];
            for (var i = 0; i < icc.length; i++) {
                var seriesValue =
                    {
                        name: icc[i],
                        type: 'line',
                        data: [year[i], month1[i], month2[i], month3[i], week1[i], week2[i], week3[i], week4[i], week5[i],
                            week6[i], days[i], day1[i], day2[i], day3[i], day4[i], day5[i], day6[i], day7[i], day8[i], day9[i], day10[i],
                            day11[i], day12[i], day13[i], day14[i], day15[i], day16[i], day17[i], day18[i], day19[i], day20[i]]
                    };
                seriesarr.push(seriesValue);
            }
            var option = {
                title: {
                    text: 'ICC问题趋势',
                    left:'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    top: '30',
                    data:icc
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data:dayList
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: seriesarr
            };

            console.log(option.series);

            myChart.clear();
            myChart.setOption(option);
            /*parent.layer.close(index);*/
        }
    });
}


