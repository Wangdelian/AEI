layui.use(['table', 'laypage', 'layer', 'form', 'layedit', 'laydate'], function () {
    var table = layui.table;
    var form = layui.form;
    var laydate = layui.laydate;

    //时间选择器
    laydate.render({
        elem: '#end-time'
        , type: 'datetime'
        , value: new Date().format("yyyy-MM-dd") + " 08:00:00"
    });

    //自定义验证规则
    form.verify({
        topn: [/^[1-9]$|1[0-9]$|20$/, '必须为1-20的正整数']
    });
    //加载层
    var index;
    var title1 = null;//时间列表
    var title2 = [];
    var tableIssue = [];
    var tablec1000 = [];

    var obj = null;
    table.on('tool(topsortcount)', function (obj_) {
        obj = obj_;
    });

    form.on('submit(export)', function (data) {
            if (data.field.type == "1") {
                if (title1 === null) {
                    parent.layer.alert("请先查询数据后再进行导出操作.");
                    return false;
                }

                downFile2(siteurl + '/mqs/report/exportIssue', {'endTime': $('#end-time').val()});
            } else if (data.field.type == "2") {
                if (title2 === null) {
                    parent.layer.alert("请先查询数据后再进行导出操作.");
                    return false;
                }
                downFile2(siteurl + '/mqs/report/exportc1000', {'endTime': $('#end-time').val()});
            }

            return false;
        }
    );
    form.on('submit(search)', function (data) {
        if (data.field.icc !== "" ||
            data.field.iissuebz !== "" || data.field.pstation !== "") {
            data.field['stationNo'] = '1';
        }
        if (data.field.type == "1") {
            queryIssue(data.field);

        } else if (data.field.type == "2") {
            queryC1000(data.field);
        }
        return false;
    });

//监听班组下拉框选择事件
    getSelectOptions(siteurl + '/generator/mqsproductionteam/productionteamOption', {}, {
        value: 'productionteamid',
        text: 'productionteamname',
        filter: 'iissuebz'
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
                var options = '<option value="">请选择班组</option>';
                r.forEach(function (item) {
                    options += '<option value="' + eval('item.' + domAttribute.value) + '">' + eval('item.' + domAttribute.text) + '</option>';
                });
                $('select[name="' + domAttribute.filter + '"]').empty().append(options);
                form.render('select');
            }
        });
    }

//采集点下拉列表
    function addOptions() {
        $.ajax({
            url: siteurl + '/mqs/mqszerokmissue/addOptions',
            type: 'post',
            async: false,
            success: function (data) {
                /*采集点*/
                var html = '';
                for (var i = 0; i < data.pstationlist.length; i++) {
                    html += '<option value' + data.pstationlist[i].stationname + '>' + data.pstationlist[i].stationname + '</option>'
                }
                $("select[name='pstation']").append(html);
                form.render('select');
            }
        })
    }

    function queryC1000(condition) {
        index = parent.layer.load(0, {shade: 0.2});
        $.ajax({
            url: siteurl + '/mqs/report/c1000Value',
            type: "POST",
            async: false,
            data: JSON.stringify(condition),
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (r) {
                title2 = r.dayList;
                tablec1000 = r.TableC1000;
                title2[0] = 'ICC';
                initFTTTable2(title2, tablec1000);
                $('td[data-field="title"]').remove();
                parent.layer.close(index);
            }
        });
    }

    function queryIssue(condition) {
        index = parent.layer.load(0, {shade: 0.2});
        $.ajax({
            url: siteurl + '/mqs/report/issueValue',
            type: "POST",
            async: true,
            data: JSON.stringify(condition),
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (r) {
                title1 = r.dayList;
                tableIssue = r.TableIssue;
                title1[0] = '采集点';
                title1[1] = 'ICC';
                initFTTTable1(title1, tableIssue);
                parent.layer.close(index);
            }
        });
    }

    function initFTTTable1(title, data) {
        table.render({
            elem: '#table'
            , id: 'table-id'
            , data: data
            , limit: 10000
            , width: 1665
            , cols: [[
                {field: 'title', title: '', width: 140, colspan: 2, event: 'setSign'}
                , {title: 'Year', colspan: 1, width: 44}
                , {title: 'Month', colspan: 3}
                , {title: 'Week', colspan: 6}
                , {title: 'Day', colspan: 21}
            ], [
                {field: 'title1', width: 127, title: title[0], event: title[0]}
                , {field: 'title2', width: 140, title: title[1], event: title[1]}
                , {field: 'year', width: 44, title: title[2], event: title[2]}
                , {field: 'month1', width: 44, title: title[3], event: title[3]}
                , {field: 'month2', width: 44, title: title[4], event: title[4]}
                , {field: 'month3', width: 44, title: title[5], event: title[5]}
                , {field: 'week1', width: 44, title: title[6], event: title[6] + 'w'}
                , {field: 'week2', width: 44, title: title[7], event: title[7] + 'w'}
                , {field: 'week3', width: 44, title: title[8], event: title[8] + 'w'}
                , {field: 'week4', width: 44, title: title[9], event: title[9] + 'w'}
                , {field: 'week5', width: 44, title: title[10], event: title[10] + 'w'}
                , {field: 'week6', width: 44, title: title[11], event: title[11] + 'w'}
                , {field: 'days', width: 44, title: title[12], event: title[12]}
                , {field: 'day1', width: 44, title: title[13], event: title[13]}
                , {field: 'day2', width: 44, title: title[14], event: title[14]}
                , {field: 'day3', width: 44, title: title[15], event: title[15]}
                , {field: 'day4', width: 44, title: title[16], event: title[16]}
                , {field: 'day5', width: 44, title: title[17], event: title[17]}
                , {field: 'day6', width: 44, title: title[18], event: title[18]}
                , {field: 'day7', width: 44, title: title[19], event: title[19]}
                , {field: 'day8', width: 44, title: title[20], event: title[20]}
                , {field: 'day9', width: 44, title: title[21], event: title[21]}
                , {field: 'day10', width: 44, title: title[22], event: title[22]}
                , {field: 'day11', width: 44, title: title[23], event: title[23]}
                , {field: 'day12', width: 44, title: title[24], event: title[24]}
                , {field: 'day13', width: 44, title: title[25], event: title[25]}
                , {field: 'day14', width: 44, title: title[26], event: title[26]}
                , {field: 'day15', width: 44, title: title[27], event: title[27]}
                , {field: 'day16', width: 44, title: title[28], event: title[28]}
                , {field: 'day17', width: 44, title: title[29], event: title[29]}
                , {field: 'day18', width: 44, title: title[30], event: title[30]}
                , {field: 'day19', width: 44, title: title[31], event: title[31]}
                , {field: 'day20', width: 44, title: title[32], event: title[32]}
            ]]
        });
        console.log($('.pointer td[lay-event] div').addClass("link"));

    }

    function initFTTTable2(title, data) {
        table.render({
            elem: '#table'
            , id: 'table-id'
            , data: data
            , width: 1588
            , limit: 10000
            , cols: [[
                {field: 'title', title: '', width: 150, colspan: 1, event: 'setSign'}
                , {title: 'Year', colspan: 1, width: 55}
                , {title: 'Month', colspan: 3}
                , {title: 'Week', colspan: 6}
                , {title: 'Day', colspan: 21}
            ], [
                {field: 'title1', width: 150, title: title[0], event: 'ICC'}
                , {field: 'year', width: 55, title: title[2], event: 'ICC'}
                , {field: 'month1', width: 45, title: title[3], event: 'ICC'}
                , {field: 'month2', width: 45, title: title[4], event: 'ICC'}
                , {field: 'month3', width: 45, title: title[5], event: 'ICC'}
                , {field: 'week1', width: 45, title: title[6], event: 'ICC'}
                , {field: 'week2', width: 45, title: title[7], event: 'ICC'}
                , {field: 'week3', width: 45, title: title[8], event: 'ICC'}
                , {field: 'week4', width: 45, title: title[9], event: 'ICC'}
                , {field: 'week5', width: 45, title: title[10], event: 'ICC'}
                , {field: 'week6', width: 45, title: title[11], event: 'ICC'}
                , {field: 'days', width: 45, title: title[12], event: 'ICC'}
                , {field: 'day1', width: 45, title: title[13], event: 'ICC'}
                , {field: 'day2', width: 45, title: title[14], event: 'ICC'}
                , {field: 'day3', width: 45, title: title[15], event: 'ICC'}
                , {field: 'day4', width: 45, title: title[16], event: 'ICC'}
                , {field: 'day5', width: 45, title: title[17], event: 'ICC'}
                , {field: 'day6', width: 45, title: title[18], event: 'ICC'}
                , {field: 'day7', width: 45, title: title[19], event: 'ICC'}
                , {field: 'day8', width: 45, title: title[20], event: 'ICC'}
                , {field: 'day9', width: 45, title: title[21], event: 'ICC'}
                , {field: 'day10', width: 45, title: title[22], event: 'ICC'}
                , {field: 'day11', width: 45, title: title[23], event: 'ICC'}
                , {field: 'day12', width: 45, title: title[24], event: 'ICC'}
                , {field: 'day13', width: 45, title: title[25], event: 'ICC'}
                , {field: 'day14', width: 45, title: title[26], event: 'ICC'}
                , {field: 'day15', width: 45, title: title[27], event: 'ICC'}
                , {field: 'day16', width: 45, title: title[28], event: 'ICC'}
                , {field: 'day17', width: 45, title: title[29], event: 'ICC'}
                , {field: 'day18', width: 45, title: title[30], event: 'ICC'}
                , {field: 'day19', width: 45, title: title[31], event: 'ICC'}
                , {field: 'day20', width: 45, title: title[32], event: 'ICC'}
            ]]
        });
    }

    addOptions();

    //跳转 只有是问题数 类型的时候才可以
    $('div[class="pointer"]').dblclick(function (e) {
        if (obj.event != 'ICC' && obj.event != '采集点') {
            var title = obj.data.title1;
            var title2 = obj.data.title2;
            var iissuebz = $("#iissuebz").val();

            if (title2 === '总计数据行数' || title2 === '总计')
                return;

            parent.app.addTab({
                url: encodeURI(siteurl + '/mqs/mqsissue/list/?title=' + title2 + '&fragment=' + obj.event + '&pstation=' + title + '&iissuebz=' + iissuebz),
                icon: '&#xe62d;',
                title: '单一问题查询',
                id: '49'
            });
        }
    });


});