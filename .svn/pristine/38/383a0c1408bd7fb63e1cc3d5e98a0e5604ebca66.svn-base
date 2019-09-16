layui.use(['table', 'layer', 'form', 'laydate'], function () {
    var layer = layui.layer;
    var table = layui.table;
    var form = layui.form;
    var laydate = layui.laydate;
    //时间选择器
    laydate.render({
        elem: '#end-time'
        , type: 'datetime'
        , value: new Date()
    });

    //加载层
    var index;
    form.on('submit(search)', function (data) {
        $('button[lay-filter="export"]').addClass("layui-btn-disabled").attr('title', '正在处理数据，请稍等...').attr("disabled", "disabled");
        query(data.field);

        return false;
    });

    //导出根据自己需求是否需要使用utils.js里的快捷方法
    form.on('submit(export)', function () {
        var form = $("<form></form>").attr("action", siteurl + '/mqs/c1000/exportC1000Health').attr("method", "post");

        form.append($("<input/>").attr("type", "hidden"));
        form.appendTo('body').submit().remove();

        return false;
    });
    /*
        form.on('submit(generate)', function () {
            index = parent.layer.load(0, {shade: 0.2});

            $.ajax({
                url: siteurl + '/mqs/ftt/generateFtt',
                type: "GET",
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (r) {
                    if (r.code === 0) {
                        parent.layer.close(index);
                        parent.layer.alert(r.re);
                    }
                }
            });
            return false;
        });*/

    //生产单位下拉列表
    /*    getSelectOptions(siteurl + '/mqs/mqsproductdept/addOption', {}, {
            value: 'productiondeptid',
            text: 'productiondeptname',
            filter: 'productionDeptName'
        });

        getSelectOptions(siteurl + '/mqs/mqsproductline/addProductlineOptionBydeptid/0', {}, {
            value: 'productionlineid',
            text: 'productionlinename',
            filter: 'lineName'
        });

        getSelectOptions(siteurl + '/mqs/mqsregion/pregionOption/0', {}, {
            value: 'regionid',
            text: 'regionname',
            filter: 'pregion'
        });*/


    getSelectOptions(siteurl + '/generator/mqsproductionteam/productionteamOption', {}, {
        value: 'productionteamid',
        text: 'productionteamname',
        filter: 'issuebz'
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
        index = parent.layer.load(0, {shade: 0.2});

        $.ajax({
            url: siteurl + '/mqs/c1000/c1000HealthValue',
            type: "POST",
            data: JSON.stringify(condition),
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (r) {
                initFTTTable('#c1000Health-table', 'c1000Health-table-id', '', r.dayList, r.c1000Table);

                $('button[lay-filter="export"]').removeAttr("disabled").removeAttr('title').removeClass("layui-btn-disabled");
                parent.layer.close(index);
            }
        });
    }

    //因为每个表的数据都是一个样的，所以后台以FTTTableEntity的形式返回
    //参数对应规则：elemId对应table标签里的id，tableId对应将生成的layui-table的ID，tableDec代表该表的说明,title表示了时间表头，data就不说了
    function initFTTTable(elemId, tableId, tableDec, title, data) {
        table.render({
            elem: elemId
            , id: tableId
            , data: data
            , limit: data.length
            , width: 1600
            , cols: [[
                {field: 'title', title: tableDec, width: 140, rowspan: 2, colspan: 1, event: 'setSign'}
                , {title: 'Year', colspan: 2}
                , {title: 'Month', colspan: 3}
                , {title: 'Week', colspan: 6}
                , {title: 'Day', colspan: 21}
            ], [
                {field: 'year1', width: 44, title: title[0], event: 'setSign'}
                , {field: 'year2', width: 44, title: title[1], event: 'setSign'}
                , {field: 'month1', width: 44, title: title[2], event: 'setSign'}
                , {field: 'month2', width: 44, title: title[3], event: 'setSign'}
                , {field: 'month3', width: 44, title: title[4], event: 'setSign'}
                , {field: 'week1', width: 44, title: title[5], event: 'setSign'}
                , {field: 'week2', width: 44, title: title[6], event: 'setSign'}
                , {field: 'week3', width: 44, title: title[7], event: 'setSign'}
                , {field: 'week4', width: 44, title: title[8], event: 'setSign'}
                , {field: 'week5', width: 44, title: title[9], event: 'setSign'}
                , {field: 'week6', width: 44, title: title[10], event: 'setSign'}
                , {field: 'days', width: 44, title: title[11], event: 'setSign'}
                , {field: 'day1', width: 44, title: title[12], event: 'setSign'}
                , {field: 'day2', width: 44, title: title[13], event: 'setSign'}
                , {field: 'day3', width: 44, title: title[14], event: 'setSign'}
                , {field: 'day4', width: 44, title: title[15], event: 'setSign'}
                , {field: 'day5', width: 44, title: title[16], event: 'setSign'}
                , {field: 'day6', width: 44, title: title[17], event: 'setSign'}
                , {field: 'day7', width: 44, title: title[18], event: 'setSign'}
                , {field: 'day8', width: 44, title: title[19], event: 'setSign'}
                , {field: 'day9', width: 44, title: title[20], event: 'setSign'}
                , {field: 'day10', width: 44, title: title[21], event: 'setSign'}
                , {field: 'day11', width: 44, title: title[22], event: 'setSign'}
                , {field: 'day12', width: 44, title: title[23], event: 'setSign'}
                , {field: 'day13', width: 44, title: title[24], event: 'setSign'}
                , {field: 'day14', width: 44, title: title[25], event: 'setSign'}
                , {field: 'day15', width: 44, title: title[26], event: 'setSign'}
                , {field: 'day16', width: 44, title: title[27], event: 'setSign'}
                , {field: 'day17', width: 44, title: title[28], event: 'setSign'}
                , {field: 'day18', width: 44, title: title[29], event: 'setSign'}
                , {field: 'day19', width: 44, title: title[30], event: 'setSign'}
                , {field: 'day20', width: 44, title: title[31], event: 'setSign'}
            ]]
        });
    }

    query({endTime: ''});
});

