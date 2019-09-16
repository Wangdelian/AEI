layui.use(['table', 'layer', 'form', 'laydate'], function () {
        var table = layui.table;
        var form = layui.form;
        var laydate = layui.laydate;

        var stationChineseName = '';
        //时间选择器
        laydate.render({
            elem: '#end-time'
            , type: 'datetime'
            , value: new Date().format("yyyy-MM-dd") + " 08:00:00"
        });

        //加载层
        var index;
        form.on('submit(search)', function (data) {
            data.field['stationChineseName'] = stationChineseName;

            $('button[lay-filter="export"]').addClass("layui-btn-disabled").attr('title', '正在处理数据，请稍等...').attr("disabled", "disabled");
            query(data.field);

            return false;
        });

        //导出根据自己需求是否需要使用utils.js里的快捷方法
        form.on('submit(export)', function () {
            var form = $("<form></form>").attr("action", siteurl + '/mqs/ftt/exportFtt').attr("method", "post");

            form.append($("<input/>").attr("type", "hidden").attr("name", "imageData").attr("value", myChart.getDataURL({
                backgroundColor: '#fff'
            })));
            form.appendTo('body').submit().remove();

            return false;
        });

        var myChart = echarts.init(document.getElementById('main_echart'), 'infographic');

        getSelectOptions(siteurl + '/mqs/mqsstation/stationOptionWithoutId', {}, {
            value: 'mesStationid',
            text: 'stationname',
            filter: 'station'
        });

        getSelectOptions(siteurl + '/mqs/fttDirect/modelList', {}, {
            value: 'enginemodel',
            text: 'enginemodel',
            filter: 'model'
        });

        //layui会在jquery之前获取单击事件信息，无法通过stop阻止，只能在layui获取单击信息时将单击对象的信息存下载，再在双击是进行判断，
        //由于没有阻止单击事件，所以在双击时，单击事件一定会发生，不会导致obj无信息
        var obj = null;
        table.on('tool(mqsIssue)', function (obj_) {
            obj = obj_;
        });

        $("div").dblclick(function (e) {
            if (obj.event !== 'setSign') {
                var title = $(obj.tr[0]).children(':first').children(':first')[0].innerText;

                if (title === '问题总数' || title === '-' || title === 'TOP5 ICCs')
                    return;

                $('.red').removeClass("red");
                $(e.target).addClass("red");

                parent.app.closeTab('122');
                parent.app.addTab({
                    url: encodeURI(siteurl + '/mqs/mqsissue/list/?title=' + title + '&fragment=' + obj.event),
                    icon: '&#xe62d;',
                    title: '单一问题查询',
                    id: '49'
                });
            }
        });

        form.on('select(station)', function (data) {
            var dom = data.othis[0].getElementsByClassName("layui-this")[0];

            if (dom != undefined)
                stationChineseName = data.othis[0].getElementsByClassName("layui-this")[0].innerText;
            else
                stationChineseName = '';
        });

        //获取下拉列表，参数：地址，查询条件，下拉列表value,text,以及对应的下拉列表lay-filter名
        function getSelectOptions(url, data, domAttribute) {
            $.ajax({
                url: url,
                type: "POST",
                async: false,
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    var options = '<option value="">请选择</option>';
                    r.forEach(function (item) {
                        options += '<option value="' + eval('item.' + domAttribute.value) + '">' + eval('item.' + domAttribute.text) + '</option>';
                    });
                    $('select[name="' + domAttribute.filter + '"]').empty().append(options);
                    form.render('select');
                }
            });
        }

        function query(condition) {
            var dayList;
            setTimeout(function () {
                parent.layer.msg('查询FTT中', {offset: 'b'});

                $.ajax({
                    url: siteurl + '/mqs/fttDirect/fttValue',
                    type: "POST",
                    async: false,
                    data: JSON.stringify(condition),
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        dayList = r.dayList;
                        myChart.setOption({
                            title: {
                                top: '1%',
                                left: 'center',
                                text: 'FTT趋势图'
                            },
                            color: [
                                '#94D352',
                                '#C60000',
                                '#4A82BD',
                                '#e22eca',
                                '#722FA5',
                                '#FF4500',
                                '#ca8622'
                            ],
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                top: '7%',
                                data: ['年', '月', '周', '20DAY', 'DAY', 'KPI']
                            },
                            grid: {
                                top: '18%',
                                left: '0%',
                                right: '0%',
                                bottom: '3%',
                                containLabel: true
                            },
                            toolbox: {
                                right: '1%',
                                feature: {
                                    saveAsImage: {}
                                }
                            },
                            xAxis: {
                                type: 'category',
                                data: r.dayList
                            },
                            yAxis: {
                                interval: 100,
                                type: 'value'
                            },
                            series: [
                                {
                                    name: '年',
                                    type: 'bar',
                                    data: r.fttYear,
                                    barWidth: '30',
                                    barGap: '-100%',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    }
                                },
                                {
                                    name: '月',
                                    type: 'bar',
                                    barWidth: '30',
                                    data: r.fttMonth,
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    }
                                },
                                {
                                    name: '周',
                                    type: 'bar',
                                    barWidth: '30',
                                    data: r.fttWeek,
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    }
                                },
                                {
                                    name: '20DAY',
                                    type: 'bar',
                                    barWidth: '30',
                                    data: r.fttDays,
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    }
                                },
                                {
                                    name: 'DAY',
                                    type: 'line',
                                    data: r.fttDay,
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    }
                                },
                                {
                                    name: 'KPI',
                                    type: 'line',
                                    data: r.fttAv,
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    },
                                    smooth: false,   //关键点，为true是不支持虚线的，实线就用true
                                    itemStyle: {
                                        normal: {
                                            lineStyle: {
                                                type: 'dotted'  //'dotted'虚线 'solid'实线
                                            }
                                        }
                                    }
                                }
                            ]
                        });

                        initFTTTable('#ftt-table', 'ftt-table-id', '', r.dayList, r.fttTable1);
                    }
                });
            }, 100);

            setTimeout(function () {
                parent.layer.msg('查询S类信息中', {offset: 'b'});

                $.ajax({
                    url: siteurl + '/mqs/ftt/SValue',
                    type: "POST",
                    async: true,
                    data: JSON.stringify(condition),
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        initFTTTable('#S', 'S-table-id', 'S类', dayList, r.fttTableS);
                    }
                });
            }, 100);

            setTimeout(function () {
                parent.layer.msg('查询A类信息中', {offset: 'b'});

                $.ajax({
                    url: siteurl + '/mqs/ftt/AValue',
                    type: "POST",
                    async: true,
                    data: JSON.stringify(condition),
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        initFTTTable('#A', 'A-table-id', 'A类', dayList, r.fttTableA);
                    }
                });
            }, 100);

            setTimeout(function () {
                parent.layer.msg('查询B类信息中', {offset: 'b'});
                $.ajax({
                    url: siteurl + '/mqs/ftt/BValue',
                    type: "POST",
                    async: true,
                    data: JSON.stringify(condition),
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        initFTTTable('#B', 'B-table-id', 'B类', dayList, r.fttTableB);
                    }
                });
            }, 100)

            setTimeout(function () {
                parent.layer.msg('查询C类信息中', {offset: 'b'});
                $.ajax({
                    url: siteurl + '/mqs/ftt/CValue',
                    type: "POST",
                    async: true,
                    data: JSON.stringify(condition),
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        initFTTTable('#C', 'C-table-id', 'C类', dayList, r.fttTableC);
                    }
                });
            }, 100);

            setTimeout(function () {
                parent.layer.msg('查询近一天信息中', {offset: 'b'});
                $.ajax({
                    url: siteurl + '/mqs/ftt/recentDayValue',
                    type: "POST",
                    async: true,
                    data: JSON.stringify(condition),
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        initFTTTable('#near-day', 'day-table-id', 'TOP10 ICCs-最近一天', dayList, r.fttTableOneDay);
                    }
                });
            }, 100);

            setTimeout(function () {
                parent.layer.msg('查询近一月信息中', {offset: 'b'});
                $.ajax({
                    url: siteurl + '/mqs/ftt/recentMonthValue',
                    type: "POST",
                    async: true,
                    data: JSON.stringify(condition),
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        initFTTTable('#near-month', 'month-table-id', 'TOP10 ICCs-最近一月', dayList, r.fttTableOneMonth);
                    }
                });
            }, 100);

            setTimeout(function () {
                parent.layer.msg('查询近一年信息中', {offset: 'b'});
                $.ajax({
                    url: siteurl + '/mqs/ftt/recentYearValue',
                    type: "POST",
                    async: true,
                    data: JSON.stringify(condition),
                    dataType: "json",
                    contentType: 'application/json;charset=UTF-8',
                    success: function (r) {
                        initFTTTable('#near-year', 'year-table-id', 'TOP10 ICCs-最近一年', dayList, r.fttTableOneYear);

                        $('button[lay-filter="export"]').removeAttr("disabled").removeAttr('title').removeClass("layui-btn-disabled");
                    }
                });
            }, 100);
        }

        //因为每个表的数据都是一个样的，所以后台以FTTTableEntity的形式返回
        //参数对应规则：elemId对应table标签里的id，tableId对应将生成的layui-table的ID，tableDec代表该表的说明,title表示了时间表头，data就不说了
        function initFTTTable(elemId, tableId, tableDec, title, data) {
            table.render({
                elem: elemId
                , id: 'ftt-table-id'
                , data: data
                , width: 1679
                , cols: [[
                    {field: 'title', title: tableDec, width: 217, rowspan: 2, colspan: 1, event: 'setSign'}
                    , {title: 'Year', colspan: 2}
                    , {title: 'Month', colspan: 3}
                    , {title: 'Week', colspan: 6}
                    , {title: 'Day', colspan: 21}
                ], [
                    {field: 'year1', width: 44, title: title[0], event: title[0]}
                    , {field: 'year2', width: 44, title: title[1], event: title[1]}
                    , {field: 'month1', width: 44, title: title[2], event: title[2]}
                    , {field: 'month2', width: 44, title: title[3], event: title[3]}
                    , {field: 'month3', width: 44, title: title[4], event: title[4]}
                    , {field: 'week1', width: 44, title: title[5], event: title[5] + 'w'}
                    , {field: 'week2', width: 44, title: title[6], event: title[6] + 'w'}
                    , {field: 'week3', width: 44, title: title[7], event: title[7] + 'w'}
                    , {field: 'week4', width: 44, title: title[8], event: title[8] + 'w'}
                    , {field: 'week5', width: 44, title: title[9], event: title[9] + 'w'}
                    , {field: 'week6', width: 44, title: title[10], event: title[10] + 'w'}
                    , {field: 'days', width: 44, title: title[11], event: title[11]}
                    , {field: 'day1', width: 44, title: title[12], event: title[12]}
                    , {field: 'day2', width: 44, title: title[13], event: title[13]}
                    , {field: 'day3', width: 44, title: title[14], event: title[14]}
                    , {field: 'day4', width: 44, title: title[15], event: title[15]}
                    , {field: 'day5', width: 44, title: title[16], event: title[16]}
                    , {field: 'day6', width: 44, title: title[17], event: title[17]}
                    , {field: 'day7', width: 44, title: title[18], event: title[18]}
                    , {field: 'day8', width: 44, title: title[19], event: title[19]}
                    , {field: 'day9', width: 44, title: title[20], event: title[20]}
                    , {field: 'day10', width: 44, title: title[21], event: title[21]}
                    , {field: 'day11', width: 44, title: title[22], event: title[22]}
                    , {field: 'day12', width: 44, title: title[23], event: title[23]}
                    , {field: 'day13', width: 44, title: title[24], event: title[24]}
                    , {field: 'day14', width: 44, title: title[25], event: title[25]}
                    , {field: 'day15', width: 44, title: title[26], event: title[26]}
                    , {field: 'day16', width: 44, title: title[27], event: title[27]}
                    , {field: 'day17', width: 44, title: title[28], event: title[28]}
                    , {field: 'day18', width: 44, title: title[29], event: title[29]}
                    , {field: 'day19', width: 44, title: title[30], event: title[30]}
                    , {field: 'day20', width: 44, title: title[31], event: title[31]}
                ]]
            });
        }

        //query({endTime: ''});
    }
);

