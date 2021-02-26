var loading_all_id = null;
var config = [];
var configresult = [];
var keywords = null;


$(function () {

    var user = getCookie("userinfo");
    //if (user == "" || user == null) {
    //    window.location.href = "/Home/Login";
    //}
    var json = jQuery.parseJSON(user);
    selecthead.$data.account = json[0].account;

    GetUserList();
    Rank1();
    Rank2();
    Rank3();
    Rank4();
    getApprovalConfig();
});

//新增审批等级
function AddRank() {
    if (approval.$data.showrank2 == false) {
        approval.$data.showrank2 = true;
    }
    else {
        if (approval.$data.showrank3 == false) {
            approval.$data.showrank3 = true;
        } else {
            if (approval.$data.showrank4 == false) {
                approval.$data.showrank4 = true;
            }
        }
    }
}
//删除审批等级
function DelRank() {
    if (approval.$data.showrank4 == true) {
        approval.$data.showrank4 = false;
        $('#table5').bootstrapTable('uncheckAll');
    }
    else {
        if (approval.$data.showrank3 == true) {
            approval.$data.showrank3 = false;
            $('#table5').bootstrapTable('uncheckAll');
            $('#table4').bootstrapTable('uncheckAll');
        } else {
            if (approval.$data.showrank2 == true) {
                approval.$data.showrank2 = false;
                $('#table5').bootstrapTable('uncheckAll');
                $('#table4').bootstrapTable('uncheckAll');
                $('#table3').bootstrapTable('uncheckAll');
            }
        }
    }
}



var approval = new Vue({
    el: '#tablebox',
    data: {
        account: "",//用户账号
        rank: "",//审批人等级
        approver:"",//审批人账号
        type: "",//审批类型
        showrank2: false,//二级审批表显示状态
        showrank3: false,//三级审批表显示状态
        showrank4: false,//四级审批表显示状态
    },
    methods: {
        Add: function () {
            
            
        },
    }
})


function AddApproval() {
    loading_all_id = $(document.body).NZ_Loading("show");
    getSelections();
    $.ajax({
        url: '../OA/AddApprovalConfig',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            approvalconfig: JSON.stringify(config),//审批配置的json文件
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
            if (data.Code == "0") {
                reset();
                config = [];
                swal("成功", data.msg, "success");
            } else {
                swal("失败", data.msg, "error");
            }
        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
            if (textStatus === 'timeout') {
                alert('请求超時');
            }
        }
    })
}

//加载用户列表
function GetUserList() {
    loading_all_id = $(document.body).NZ_Loading("show");
    $('#table1').bootstrapTable({
        url: '../OA/UserList',
        toolbar: '#toolbar',
        pagination: true,       //显示分页条
        pageNumber: 1,
        pageSize: 10,
        paginationDetailHAlign: ' hidden',
        pageList: [10, 25, 50, 100],
        striped: true,
        method: "post",
        clickToSelect: true, //启用点击选中行
        columns: [
            {
                checkbox: true,
                formatter: function (value, item, index) {
                    if (item.realname == user.$data.account) {
                        return checked=true;
                    }
                }
            },
            {
                field: 'realname',
                align: "center",
                title: '姓名',
            }
        ],
        onLoadSuccess: function () {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
        },
        onLoadError: function () {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
        }
    });

}
//加载一级审批人
function Rank1() {
    $('#table2').bootstrapTable({
        url: '../OA/UserList',
        toolbar: '#toolbar',
        pagination: true,       //显示分页条
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        paginationDetailHAlign: ' hidden',
        striped: true,
        method: "post",
        clickToSelect: true, //启用点击选中行
        columns: [
            {
                checkbox: true,
                formatter: function (value, item, index) {
                    for (var i = 0; i < configresult.length; i++) {
                        if (configresult[i]["rank"] == "1" && configresult[i]["approver"] == item.realname) {
                            return checked = true;
                        }
                    }
                }
            },
            {
                field: 'realname',
                align: "center",
                title: '姓名'
            }
        ],
    });
}
//加载二级审批人
function Rank2() {
    $('#table3').bootstrapTable({
        url: '../OA/UserList',
        toolbar: '#toolbar',
        pagination: true,       //显示分页条
        pageNumber: 1,
        pageSize: 10,
        paginationDetailHAlign: ' hidden',
        pageList: [10, 25, 50, 100],
        striped: true,
        method: "post",
        clickToSelect: true, //启用点击选中行
        columns: [
            {
                checkbox: true,
                formatter: function (value, item, index) {
                    for (var i = 0; i < configresult.length; i++) {
                        if (configresult[i]["rank"] == "2" && configresult[i]["approver"] == item.realname) {
                            return checked = true;
                        }
                    }
                }
            },
            {
                field: 'realname',
                align: "center",
                title: '姓名'
            }
        ],
    });
}
//加载三级审批人
function Rank3() {
    $('#table4').bootstrapTable({
        url: '../OA/UserList',
        toolbar: '#toolbar',
        pagination: true,       //显示分页条
        pageNumber: 1,
        pageSize: 10,
        paginationDetailHAlign: ' hidden',
        pageList: [10, 25, 50, 100],
        striped: true,
        method: "post",
        clickToSelect: true, //启用点击选中行
        columns: [
            {
                checkbox: true,
                formatter: function (value, item, index) {
                    for (var i = 0; i < configresult.length; i++) {
                        if (configresult[i]["rank"] == "3" && configresult[i]["approver"] == item.realname) {
                            return checked = true;
                        }
                    }
                }
            },
            {
                field: 'realname',
                align: "center",
                title: '姓名'
            }
        ],
    });
}
//加载四级审批人
function Rank4() {
    $('#table5').bootstrapTable({
        url: '../OA/UserList',
        toolbar: '#toolbar',
        pagination: true,       //显示分页条
        pageNumber: 1,
        pageSize: 10,
        paginationDetailHAlign: ' hidden',
        pageList: [10, 25, 50, 100],
        striped: true,
        method: "post",
        clickToSelect: true, //启用点击选中行
        columns: [
            {
                checkbox: true,
                formatter: function (value, item, index) {
                    for (var i = 0; i < configresult.length; i++) {
                        if (configresult[i]["rank"] == "4" && configresult[i]["approver"] == item.realname) {
                            return checked = true;
                        }
                    }
                }
            },
            {
                field: 'realname',
                align: "center",
                title: '姓名'
            }
        ],
    });
}

//加载审批配置表
function getApprovalConfig() {
    $('#showtable').bootstrapTable({
        url: '../OA/getApprovalConfig',
        toolbar: '#toolbar',
        pagination: true,       //显示分页条
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        striped: true,
        method: "post",
        clickToSelect: true, //启用点击选中行
        queryParams:{
            realname: keywords
        },
        columns: [
            {
                field: 'realname',
                align: "center",
                title: '姓名',
            },
            {
                field: 'rank1',
                align: "center",
                title: '一级审批人'
            },
            {
                field: 'rank2',
                align: "center",
                title: '二级审批人'
            },
            {
                field: 'rank3',
                align: "center",
                title: '三级审批人'
            },
            {
                field: 'rank4',
                align: "center",
                title: '四级审批人'
            },
            {
                field: 'id',
                align: "center",
                title: '操作',
                formatter: function (value, item, index) {
                    htm = '<span  title="编辑" onclick="editApprovalConfig(\'' + item.realname + '\')"><img src="/img/edit.png" /></span>';
                    htm += '<span onclick="delApprovalConfig(\'' + item.realname + '\')"> <img title="删除" src="../img/delete.png" /></span> ';
                    return htm;
                }
            },
        ],
    });
}

//用户配置
var user = new Vue({
    el: '#user',
    data: {
        account: "",//用户账号
        maxrank:"",//最高审批等级
    },
})
//编辑审批配置
function editApprovalConfig(name) {
    configresult = [];
    $.ajax({
        url: '../OA/editApprovalConfig',
        dataType: 'json',//数据类型
        type: 'GET',//类型
        data: {
            name: name
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            user.$data.account = data[0].account;//用户账号
            for (var i = 0; i < data.length; i++) {
                var a = {};
                a["account"] = data[i].account;
                a["rank"] = data[i].approvalrank;
                a["approver"] = data[i].approver;
                a["type"] = data[i].type;
                configresult.push(a);
            }
            for (var i = 0; i < configresult.length; i++) {
                var rank=1;
                if (parseInt(configresult[i]["rank"]) > rank) {
                    rank = parseInt(configresult[i]["rank"]);  
                }
                if (rank == 1) {
                    approval.$data.showrank2 = false;
                    approval.$data.showrank3 = false;
                    approval.$data.showrank4 = false;
                }
                if (rank == 2) {
                    approval.$data.showrank2 = true;
                    approval.$data.showrank3 = false;
                    approval.$data.showrank4 = false;
                }
                if (rank == 3) {
                    approval.$data.showrank2 = true;
                    approval.$data.showrank3 = true;
                    approval.$data.showrank4 = false;
                }
                if (rank == 4) {
                    approval.$data.showrank2 = true;
                    approval.$data.showrank3 = true;
                    approval.$data.showrank4 = true;
                }
            }
            refreshTable();
            return configresult;
        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus === 'timeout') {
                alert('请求超时');
            }
        }
    })
}
//删除审批配置
function delApprovalConfig(name) {
    loading_all_id = $(document.body).NZ_Loading("show");
    $.ajax({
        url: '../OA/delApprovalConfig',
        dataType: 'json',//数据类型
        type: 'GET',//类型
        data: {
            name: name
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
            if (data.Code == "0") {

                refreshTable();

                swal("成功", data.msg, "success");
            } else {
                swal("失败", data.msg, "error");
            }
        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
            if (textStatus === 'timeout') {
                alert('请求超时');
            }
        }
    })
}



//获取选择的用户和各级审批人信息
function getSelections() {
    var user = $('#table1').bootstrapTable('getSelections');
    var uaccount = new Array();
    for(var i=0;i<user.length;i++){
        uaccount[i] = user[i].account;  //用户账号
    };
    var rank1 = $('#table2').bootstrapTable('getSelections');
    var r1 = new Array();
    for (var i = 0; i < rank1.length; i++) {
        r1[i] = rank1[i].account; //一级审批人账号
    };
    var rank2 = $('#table3').bootstrapTable('getSelections');
    var r2 = new Array();
    for (var i = 0; i < rank2.length; i++) {
        r2[i] = rank2[i].account; //二级审批人账号
    };
    var rank3 = $('#table4').bootstrapTable('getSelections');
    var r3 = new Array();
    for (var i = 0; i < rank3.length; i++) {
        r3[i] = rank3[i].account; //三级审批人账号
    };
    var rank4 = $('#table5').bootstrapTable('getSelections');
    var r4 = new Array();
    for (var i = 0; i < rank4.length; i++) {
        r4[i] = rank4[i].account; //四级审批人账号
    };

      


    for (var i = 0; i < uaccount.length; i++) {
        for (var j = 0; j < r1.length; j++) {
            var a1 = {};//一级审批
            a1["account"] = uaccount[i];
            a1["rank"] = 1;
            a1["approver"] = r1[j];
            config.push(a1);
        }
    }
    
    if (r2.length != 0) {
        for (var i = 0; i < uaccount.length; i++) {
            for (var j = 0; j < r2.length; j++) {
                var a2 = {};//二级审批
                a2["account"] = uaccount[i];
                a2["rank"] = 2;
                a2["approver"] = r2[j];
                config.push(a2);
            }
        }
    }
    if (r3.length != 0) {
        for (var i = 0; i < uaccount.length; i++) {
            for (var j = 0; j < r3.length; j++) {
                var a3 = {};//三级审批
                a3["account"] = uaccount[i];
                a3["rank"] = 3;
                a3["approver"] = r3[j];
                config.push(a3);
            }
        }
    }
    if (r4.length != 0) {
        for (var i = 0; i < uaccount.length; i++) {
            for (var j = 0; j < r4.length; j++) {
                var a4 = {};//四级审批
                a4["account"] = uaccount[i];
                a4["rank"] = 4;
                a4["approver"] = r4[j];
                config.push(a4);
            }
        }
    }
    

}

function reset() {
    user.$data.account = "";
    configresult = [];
    approval.$data.showrank2 = false;
    approval.$data.showrank3 = false;
    approval.$data.showrank4 = false;
    refreshTable();
}

//刷新表格
function refreshTable() {
    keywords = $(" input[ name='keywords']").val();
    $("#table1").bootstrapTable('destroy');
    $("#table2").bootstrapTable('destroy');
    $("#table3").bootstrapTable('destroy');
    $("#table4").bootstrapTable('destroy');
    $("#table5").bootstrapTable('destroy');
    //$("#showtable").bootstrapTable('destroy');
    GetUserList();
    Rank1();
    Rank2();
    Rank3();
    Rank4();
    //getApprovalConfig();
    $("#showtable").bootstrapTable('refresh', {
        url: '../OA/getApprovalConfig',
        silent: true, //静态刷新
        query: {
            realname:keywords
        }
    });

}

//搜索条件
var selecthead = new Vue({
    el: '#ibox-title',
    data: {
        account:"",
    },
    methods: {

    }
})