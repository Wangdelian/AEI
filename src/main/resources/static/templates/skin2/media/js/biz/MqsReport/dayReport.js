layui.use('table', function () {
    var table = layui.table;

    table.render({
        elem: '#test'
        , url: '/demo/table/user/'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {field: 'id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: 80, title: '名称'}
            , {field: 'sex', width: 80, title: '当天值', sort: true}

        ]]
    });

    queryftt();
    queryc1000();
    queryppm();
    queryaudit();
    queryqcm();

});

function queryftt() {
    $.ajax({
        url: siteurl + '/mqs/ftt/fttValue',
        type: "POST",
        async: false,
        data: JSON.stringify({endTime: ""}),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            var alltable = r.fttTable1;
            $(".fttvalue").text(alltable[0].day20 + '%');

        }
    });
}

function queryc1000() {
    $.ajax({
        url: siteurl + '/mqs/c1000/c1000Value',
        type: "POST",
        async: false,
        data: JSON.stringify({endTime: "", isZX: "1"}),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            var alltable = r.c1000Table1;
            $(".c1000value").text(alltable[0].day20);
        }
    });
}

/*queryppm,queryaudit中需要
* */
function addProductdeptOption() {
    var arr = [];
    $.ajax({
        url: siteurl + '/mqs/mqsproductdept/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            html = '';
            for (var i = 0; i < data.length; i++) {
                arr.push(data[i].productiondeptname);
            }
        }
    });
    return arr;
};

function queryppm() {
    var params = {
        endTime: "",
        enginemodel: "",
        productiondeptname: addProductdeptOption(),
        productionlinename: "",
        startTime: ""
    }
    $.ajax({
        type: 'POST',
        url: siteurl + '/mqs/report/tablelist',
        data: JSON.stringify(params),
        async: false,
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            for (k in data) {
                for (m in data[k]) {
                    if (data[k][m] == null) {
                        data[k][m] = 0;
                    }
                }
            }
            $(".ppm").text(data[0].day1)
        }
    });
}

/*
* audit需要
* */
function addEnginetypeOption() {
    var arr = [];
    $.ajax({
        url: siteurl + '/mqs/mqsauditissue/addOption',
        type: 'POST',
        async: false,
        success: function (data) {
            //机型
            html = '';
            for (var i = 0; i < data.enginetype.length; i++) {
                arr.push(data.enginetype[i].dictvalue);
            }
        }
    });
    return arr;
};

function queryaudit() {
    var params = {
        enginetype: addEnginetypeOption(),
        productiondeptname: addProductdeptOption()
    }
    $.ajax({
        url: siteurl + '/mqs/audit/auditValue',
        type: "POST",
        async: false,
        data: JSON.stringify(params),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            dayList = r.dayList;
            $(".audit").text(r.auditTable1[0].day20)
        }
    })
}

function queryqcm() {
    var param = {
        dateclose: "",
        datecreated: "",
        enginemodel: "",
        icc: "",
        issuesource: "",
        productiondeptname: "",
        productionlinename: "",
        qcmstate: ""
    }
    $.ajax({
        type: "POST",
        url: siteurl + '/mqs/mqsqcmtable/tablelist/' + 1,
        data: JSON.stringify(param),
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (r) {
            $(".qcm").text(r.page.list[0].datelist[9].datecount)
        }
    });
};