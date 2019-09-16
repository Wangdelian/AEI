/**
 * Created by Admin-zbf on 2017/7/17.
 */
var vm = new Vue({
    el: '#main',
    data: {
        showList: true,
        title: systemname,
        dictionary: {
            dictId: null,
            isEnable: 1
        }
    },
    methods: {
        saveOrUpdate: function () {
            var url = vm.dictionary.dictId == null ? siteurl + "/sys/dictionary/save" : siteurl + "/sys/dictionary/update";

            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.dictionary),
                success: function (r) {
                    if (r.code === 0) {
                        parent.parent.layer.msg("操作成功！");
                        setTimeout(function () {
                            onReturn();
                        }, 1000)

                        /*                        if (vm.dictionary.dictId == null)
                         parent.CloseTabByContent(70);*/
                    } else if(r.msg!=null && r.msg != ""){
                        parent.parent.layer.alert(r.msg, {shade: 0});
                    }
                }
            });
            this.getUser(dictionaryId);
        },
        getDictionary: function (dictionaryId) {
            $.get(siteurl + "/sys/dictionary/dictionaryInfo/" + dictionaryId, {"time": new Date().getTime()}, function (r) {
                vm.dictionary = r.dictionary;
            });
        }
    }
})


$(function () {
    vm.getDictionary(dictionaryId);
});