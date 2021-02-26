var loading_all_id = null;
var mingxi = [];
var mxNumber;
var sum;
var add;

$(document).on("click", "a[id='addmingxi']", function (event) {
    add = 1;//监听点击新增明细事件，点击时标记add为1
});

//根据radio按钮显示不同的表单选项
function getRadioVal() {
    $("#data-contract").val("");
    $("#data-chance").val("");
    if (bx.$data.type == "1") {
        bx.$data.showRadio1 = true;
        bx.$data.showRadio2 = false;
        bx.$data.showRadio3 = false;
        bx.$data.showRadio = true;
        bx.$data.chance = "";
        bx.$data.projectname = "";
    }else if (bx.$data.type == "2") {
        bx.$data.showRadio1 = false;
        bx.$data.showRadio2 = true;
        bx.$data.showRadio3 = false;
        bx.$data.showRadio = true;
        bx.$data.contract = "";
        bx.$data.projectname = "";
    } else if (bx.$data.type == "3") {
        bx.$data.showRadio1 = false;
        bx.$data.showRadio2 = false;
        bx.$data.showRadio3 = true;
        bx.$data.showRadio = false;
        bx.$data.contract = "";
        bx.$data.chance = "";
    }
}


$(function () {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#recordtime',
            trigger: 'click',//怎么触发
            done: function (value) {
                bx.$data.recordtime = value;
            },
            type: 'date',//格式
            format: 'yyyy/MM/dd'
            //max: new Date().valueOf()//最大日期，当前时间点的时间戳
        });
        laydate.render({
            elem: '#expensetime',
            trigger: 'click',
            done: function (value) {
                vm.$data.expensetime = value;
            },
            type: 'date',//格式
            format: 'yyyy/MM/dd'
        });
    });

    $('input[type=radio][name=type]').change(function () {
        getRadioVal();
    });
    var user = getCookie("userinfo");
    //if (user == "" || user == null) {
    //    window.location.href = "/Home/Login";
    //}
    var json = jQuery.parseJSON(user);
    selecthead.$data.account = json[0].account;

    GetBaoXiaoList();
    GetMingXi();
    destoryMingXi();
    loadname();
});

//查看跟踪记录
var step = new Vue({
    el: '#tab-2',
    data: {
        complete1: false,
        complete2: false,
        complete3: false,
        current1: false,
        current2: false,
        current3: false,
        liuchengnot1: true,
        liuchengnot2: true,
        liuchengnot3: true,
        stepstate:"1"
    }
})
//加载跟踪记录
function GetTrack(code) {
    $(".timeline").html("暂无记录");
    $.ajax({
        url: '../OA/GetTrack',
        dataType: 'json',//数据类型
        type: 'Get',//类型
        data: {
            code: code,
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
            var timeline = "";
            for (var i = 0; i < data.length; i++) {
                var name = "";
                var logohtm = "";
                switch (step.$data.stepstate) {
                    case "1":
                        name = "发起申请";
                        logohtm = "  <i class='fa fa-unlock'></i>" + data[i].showdate;
                        break;
                    case "2":
                        name = "审批中";
                        logohtm = "  <i class='fa fa-briefcase'></i>" + data[i].showdate;
                        break;
                    case "3":
                        name = "审批完成";
                        logohtm = "  <i class='fa fa-wrench'></i>" + data[i].showdate;
                        break;
                }
                timeline += "<div class='timeline-item'>";
                timeline += " <div class='row'>";
                timeline += "<div class='col-xs-3 date'>";
                timeline += logohtm;// "  <i class='fa fa-unlock'></i>" + data[i].showdate;
                timeline += "</div>";
                timeline += "<div class='col-xs-9 content no-top-border' style='width:85%'>";
                timeline += "<p class='m-b-xs'>";
                timeline += "<strong>" + name + "</strong>";
                timeline += "  </p>";
                timeline += " <p>" + data[i].trackinfo + "</p>";
                timeline += "</div>";
                timeline += "</div>";
                timeline += "</div>";
            }
            $(".timeline").html(timeline);
            $(".timeline").css("height", document.documentElement.clientHeight - 214 + "px");

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
//加载步骤
function GetStep(code) {
    $.ajax({
        url: '../OA/StepState',
        dataType: 'json',//数据类型
        type: 'Get',//类型
        data: {
            code:code,
            account: selecthead.$data.account,
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            step.$data.complete1 = data.complete1;
            step.$data.complete2 = data.complete2;
            step.$data.complete3 = data.complete3;
            step.$data.current1 = data.current1;
            step.$data.current2 = data.current2;
            step.$data.current3 = data.current3;
            step.$data.liuchengnot1 = data.liuchengnot1;
            step.$data.liuchengnot2 = data.liuchengnot2;
            step.$data.liuchengnot3 = data.liuchengnot3;
            step.$data.stepstate = data.stepstate;
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





//实例化一个右滑框
var _right = new mSlider({
    dom: ".layer-right",
    direction: "right",
    distance: "85%",
    callback: function () {
        return mingxi = [];
    }
});


//新建报销
var bx = new Vue({
    el: '#tab-1',
    data: {
        code: "",//单据编号
        type: "1",//报销类型
        contract: "",//合同编号
        chance: "",//商机编号
        projectname: "",//项目名称
        amount: "",//合同金额
        budget:"",//商机预算
        applicant: "",//申请人
        department: "",//归属部门
        customer: "",//客户代码
        total: "0.00",//报销总额
        consume: "",//已发生金额
        reason: "",//事由
        recordtime: "",//申请时间
        state:"",//审批状态
        isshow: true,
        showRadio1: true,
        showRadio2: false,
        showRadio3: false,
        showRadio:true
    },
    methods: {
        Edit: function () {
            $("#customer").bsSuggest("enable");//客户名称
            $("#data-contract").bsSuggest("enable");//合同名称
            $("#data-chance").bsSuggest("enable");//商机名称
            this.$data.isshow = false;
        },
        Add: function () {
            if (this.$data.code == "") {
                swal("提示", "单据编号不可为空", "warning");
                return false;
            } if (this.$data.type == "") {
                swal("提示", "报销类型未选择", "warning");
                return false;
            } if (this.$data.applicant == "") {
                swal("提示", "申请人/部门未填写", "warning");
                return false;
            } if (this.$data.department == "") {
                swal("提示", "归属部门未选择", "warning");
                return false;
            } if (this.$data.customer == "") {
                swal("提示", "客户名称未填写", "warning");
                return false;
            } if (this.$data.recordtime == "") {
                swal("提示", "申请时间未填写", "warning");
                return false;
            } 
            loading_all_id = $(document.body).NZ_Loading("show");
            $.ajax({
                url: '../OA/AddBaoXiaoDan',
                dataType: 'json',//数据类型
                type: 'POST',//类型
                data: {
                    code: this.$data.code,//单据编号
                    type: this.$data.type,//报销类型
                    contract: this.$data.contract,//合同编号
                    chance: this.$data.chance,//商机编号
                    projectname: this.$data.projectname,//项目名称
                    amount: this.$data.amount,//合同金额
                    applicant: this.$data.applicant,//申请人
                    department: this.$data.department,//归属部门
                    customer: this.$data.customer,//客户代码
                    total: this.$data.total,//报销总额
                    consume: this.$data.consume,//已发生金额
                    reason: this.$data.reason,//事由
                    recordtime: this.$data.recordtime,//申请时间
                    //明细数据
                    mingxidata: JSON.stringify(mingxi),//明细的全部数据

                },
                timeout: 20000,//超时
                //请求成功
                success: function (data, status) {
                    $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
                    if (data.Code == "0") {
                        refreshTable();
                        mingxi = [];
                        refreshMingXi();
                        hidenslider();
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
    },

})

function showslider() {
    bx.$data.code = GetGuid();//单据编号
    $("#customer").bsSuggest("enable");//客户名称
    $("#data-contract").bsSuggest("enable");//合同名称
    $("#data-chance").bsSuggest("enable");//商机名称
    bx.$data.isshow = false;
    $("#customer").val("");
    $("#data-contract").val("");
    $("#data-chance").val("");
    bx.$data.id = "";
    bx.$data.department = "";//归属部门
    bx.$data.type = "";//报销类型
    bx.$data.customer = "";//客户代码
    bx.$data.contract = "";//合同编号
    bx.$data.chance = "";//商机编号
    bx.$data.projectname = "";//项目名称
    bx.$data.total = "";//报销总额
    bx.$data.amount = "";//合同金额
    bx.$data.budget = "";//商机预算
    bx.$data.consume = "";//已发生金额
    bx.$data.applicant = selecthead.$data.account;//申请人
    bx.$data.recordtime = "";//申请时间
    bx.$data.reason = "";//事由
    vm.$data.code = bx.$data.code;
    _right.open();
}
//右侧滑出层
function showsliderByID(code) {
    step.$data.stepstate = "1";
    GetStep(code);
    GetTrack(code);
    showBaoXiao(code);
    bx.$data.isshow = true;
    _right.open();
}
function hidenslider() {  
    _right.close();
}



//加载报销单表格
function GetBaoXiaoList() {
    loading_all_id = $(document.body).NZ_Loading("show");
    $('#table1').bootstrapTable({
        url: '../OA/BaoXiaoList',
        toolbar: '#toolbar',
        //clickEdit: true,
        fixedColumns: true,
        pagination: true,       //显示分页条
        pageNumber: 1,
        pageSize: 10,
        pageList:[10,25,50,100],
        striped: true,
        method:"post",
        singleSelect: true, //禁止多选
        clickToSelect: true, //启用点击选中行
        onClickRow:function(row){
            //alert(row.code),
            //GetMingXi(row.code)
            transMingXi(row.code);//将数据库中的明细数据取出放在mingxi里
            //GetMingXi();
            //refreshMingXi(row.code);
            setTimeout(function () {
                refreshMingXi();
            },200)
           
           
            return mingxi;
        },
        queryParams:{
            keywords: selecthead.$data.keywords,
            account: selecthead.$data.account,
            step:selecthead.$data.step
        },
        //contentType:'application/json',
        columns: [   
            {
                field: 'code',
                align: "center",
                title: '单据编号'
            },
              {
                  field: 'department',
                  align: "center",
                  title: '归属部门'
              },
        {
            field: 'type',
            align: "center",
            title: '报销类型',
            formatter: function (value, item, index) {
                if (value == "1") {
                    return "合同";
                } else if (value == "2") {
                    return "商机";
                } else if (value == "3") {
                    return "其他";
                }
                else {
                    return value;
                }
            }
        },
         {
             field: 'customername',
             align: "center",
             title: '客户名称'
         },
         {
             field: 'contract',
             align: "center",
             title: '合同/商机/项目名称',
             formatter: function (value,row,field) {
                 if (row.type == 1) {
                     return row.contractname;
                     //field : 'contract';
                 } else if (row.type == 2) {
                     return row.chancename;

                     //field : 'chance';
                 } else if (row.type == 3) {
                     return row.projectname;

                     //field : 'projectname';
                 }
             }
         },
         {
             field: 'total',
             align: "center",
             title: '报销总额',
         },
          {
              field: 'amount',
              align: "center",
              title: '合同/商机金额',
              formatter: function (value,row, field) {
                  if (row.contract !== "") {
                      return row.conamount;
                  } else if (row.chance !== "") {
                      return row.chamount;
                  }
              }
          },
          {
              field: 'consume',
              align: "center",
              title: '已发生金额',
          }, 
          {
              field: 'recordtime',
              align: "center",
              title: '申请时间',
          },
          {
              field: 'step',
              align: "center",
              title: '当前状态',
              formatter: function (value, item, index) {
                  if (item.step=="1") {
                      return "发起申请";
                  } else if (item.step == "2") {
                      return "审批中";
                  } else if (item.step == "3") {
                      if (item.fail == "1") {
                          var a = '<span style="color:#D8220A;">' + "审批拒绝" + '</span>';
                          return a;
                      }
                      else {
                          var a = '<span style="color:#51c688">' + "审批完成" + '</span>';
                          return a;
                      }
                  }
              }
          },
          {
              field: 'id',
              align: "center",
              title: '操作',
              formatter: function (value, item, index) {
                  htm = '<span  title="编辑" onclick="showsliderByID(\'' + item.code + '\')"><img src="/img/view.png" /></span>';
                  htm += '<span onclick="delBX(\'' + value + '\',\'' + item.code + '\')"> <img title="删除" src="../img/delete.png" /></span> ';
                  return htm;
              }
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


//onblur触发函数
function getBytpcode() {
    BaoxiaobyCode(bx.$data.code, bx.$data.type);
}


//根据code显示报销单金额
function BaoxiaobyCode(code, type) {
    sum = $("#sum").text();
    var tpcode = '';
    if (type==1) {
        tpcode = bx.$data.contract;
    } else if (type == 2) {
        tpcode = bx.$data.chance;
    } else if (type == 3) {
        tpcode = bx.$data.projectname;
    }
    //alert(tpcode);
    $.ajax({
        url: '../OA/BaoxiaobyCode',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            code: code,
            type: type,
            tpcode: tpcode,
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {   
            bx.$data.total = sum;//报销总额
            type = bx.$data.type;//报销类型
            bx.$data.consume = data[0].getconsume;//已发生金额
            function getAmount(type){
                if (type == 1) {
                    bx.$data.amount = data[0].getamount;
                } else if (type == 2) {
                    bx.$data.budget = data[0].getamount;
                }
            }
            getAmount(type);
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


//显示报销单
function showBaoXiao(code) {
    $.ajax({
        url: '../OA/BaoxiaoByID',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            code: code,
            account: selecthead.$data.account
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $("#customer").bsSuggest("disable");
            $("#data-contract").bsSuggest("disable");
            $("#data-chance").bsSuggest("disable");
            bx.$data.isshow = true;
            bx.$data.id = data[0].id;
            bx.$data.code = data[0].code;//单据编号
            bx.$data.department = data[0].department;//归属部门
            bx.$data.type = data[0].type;//报销类型
            bx.$data.customer = data[0].customer;//客户名称
            bx.$data.contract = data[0].contract;//合同编号
            bx.$data.chance = data[0].chance;//商机编号
            bx.$data.projectname = data[0].projectname;//项目名称
            bx.$data.total = data[0].total;//报销总额
            bx.$data.amount = data[0].conamount;//合同金额
            bx.$data.budget = data[0].chamount;//商机预算
            bx.$data.consume = data[0].consume;//已发生金额
            bx.$data.applicant = data[0].applicant;//申请人
            bx.$data.recordtime = data[0].recordtime;//申请时间
            bx.$data.reason = data[0].reason;//事由
            getRadioVal();
            $("#customer").val(data[0].customername);//客户名称
            $("#data-contract").val(data[0].contractname);//合同名称
            $("#data-chance").val(data[0].chancename);//商机名称
            
        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus === 'timeout') {
                alert('请求超时');
            }
        }
    })
}

//确认删除弹框
function delBX(id,code) {
    if (confirm("确定要删除吗?")) {
        delBaoXiao(id, code);
    }
    else {
        return false;
    }
}
//删除报销单
function delBaoXiao(id,code) {
    loading_all_id = $(document.body).NZ_Loading("show");
    $.ajax({
        url: '../OA/DelBaoXiao',
        dataType: 'json',//数据类型
        type: 'GET',//类型
        data: {
            id: id,
            code:code
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
            if (data.Code == "0") {

                refreshTable();
                refreshMingXi();
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


//清空报销明细表
function destoryMingXi() {
    $('#table').bootstrapTable('removeAll');
    //$('#table').bootstrapTable('refresh');
}

//获取明细数据并进行数据处理
function transMingXi(code) {
    $.ajax({
        url: '../OA/BaoXiaoMXList',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            code: code
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {           
            for (var i = 0; i < data.length; i++) {
                var temp = {};
                temp["code"] = data[i].code;//单据编号
                temp["expensetime"] = data[i].expensetime;//报销日期
                temp["costtype"] = data[i].costtype;//费用类型
                temp["amount"] = data[i].amount;//报销金额
                temp["docunm"] = data[i].docunm;//单据张数
                temp["note"] = data[i].note;//备注信息
                temp["flag"] = 0;
                temp["id"] = data[i].id;//数据库中明细记录的id
                mingxi.push(temp);
            }
            return mingxi;
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

//加载报销明细表
function getNumber(num) {
    mxNumber = num;
    return mxNumber;
}
//function GetMingXi(code) {
function GetMingXi() {
    $('#table').bootstrapTable({
        toolbar: '#toolbar',
        clickEdit: true,
        pagination: true,       //显示分页条
        paginationDetailHAlign:' hidden',
        striped: true,
        showFooter: true,
        pageSize: 4,
        pageNumber: 1,
        data: mingxi,//从明细数组加载数据
        columns: [
            {
            field: 'number',
            align: "center",
            title: '序号',
            formatter: function (value, row, index) {
                //var pageSize = $('#table').bootstrapTable('getOptions').pageSize;//每页多少条记录
                //var pageNumber = $('#table').bootstrapTable('getOptions').pageNumber;//当前是第几页
                //console.log(pageSize + "+" + pageNumber);
                //return pageSize * (pageNumber - 1) + index + 1;//返回每条的序号：每页条数*（当前页-1）+序号
                return index + 1;
            }
        },
            {
            field: 'code',
            align: "center",
            title: '单据编号'
        }
        , {
            field: 'expensetime',
            align: "center",
            title: '报销日期',
        },
       {
           field: 'costtype',
           align: "center",
           title: '费用类型',
       },
       {
           field: 'amount',
           align: "center",
           title: '报销金额',
           footerFormatter: function (value) {
               var sum = 0;
               for (var i in value) {
                   if (value[i].amount != null) {
                       sum += parseFloat(value[i].amount);
                   }
               }
               return '<span style="color:#1c84c6">' + "报销合计：" + '<span id="sum" style="color:#1c84c6">' + sum.toFixed(2) + '</span>' + "元" + '</span>';
           }
       },
              {
                  field: 'docunm',
                  align: "center",
                  title: '单据张数'
                  //footerFormatter:function(value){
                  //    return "报销总额";
                  //}
              },
             //{
             //    field: 'note',
             //    align: "center",
             //    title: '备注信息',
             //    visible:false

             //},
             //{
             //    field: 'flag',
             //    align: "center",
             //    title: '改、删标记',
             //    visible: false

             //},
             //{
             //    field: 'id',
             //    align: "center",
             //    title: '数据库对应id',
             //    visible: false

             //},
             {
                 field: 'number',
                 align: "center",
                 title: '操作',
                 formatter: function (value, item, index) {

                     var htm = '<img src="/img/view.png"   title="查看" onclick="showMingXi(\'' + (index + 1) + '\')"/>';
                     htm += '<span onclick="delMX(\'' + (index+1) + '\')"> <img title="删除" src="../img/delete.png" /></span> '; 
                     return htm;
                 }

             },
        ],

        onLoadSuccess: function () {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });

        },
        onLoadError: function () {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
        }
    });
}

//显示报销明细表
function showMingXi(id) {
    mingxi[id-1].flag = 1;
    vm.$data.isshow = true;
    var b = mingxi.slice(id - 1, id);
    vm.$data.code = b[0].code;//单据编号
    vm.$data.expensetime = b[0].expensetime;//报销日期
    vm.$data.costtype = b[0].costtype;//费用类型
    vm.$data.amount = b[0].amount;//报销金额
    vm.$data.docunm = b[0].docunm;//单据张数
    vm.$data.note = b[0].note;//备注信息
    $('#AddBaoXiaoMX').modal('show');
}
//function showMingXi(id) {
//    loading_all_id = $(document.body).NZ_Loading("show");
//    $('#AddBaoXiaoMX').modal('show')
//    $.ajax({
//        url: '../OA/BaoxiaomxbyID',
//        dataType: 'json',//数据类型
//        type: 'GET',//类型
//        data: {
//            id: id
//        },
//        timeout: 20000,//超时
//        //请求成功
//        success: function (data, status) {
//            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
//            vm.$data.isshow = true;
//            vm.$data.code = data[0].code;//单据编号
//            vm.$data.expensetime = data[0].expensetime;//报销日期
//            vm.$data.costtype = data[0].costtype;//费用类型
//            vm.$data.amount = data[0].amount;//报销金额
//            vm.$data.docunm = data[0].docunm;//单据张数
//            vm.$data.note = data[0].note;//备注信息
//        },
//        //失败/超时
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
//            if (textStatus === 'timeout') {
//                alert('请求超时');
//            }
//        }
//    })
//}

//确认删除明细弹框
function delMX(id) {
    if (confirm("确定要删除吗?")) {
        delMingXi(id);
    }
    else {
        return false;
    }
}
//删除报销明细记录
function delMingXi(id) {
    var a = id - 1;
    mingxi.splice(a, 1);
    swal("删除成功", "删除成功", "success");
    
    //refreshMingXi(mxcode);
    refreshMingXi();
    return mingxi;
    
}

    //loading_all_id = $(document.body).NZ_Loading("show");
    //$.ajax({
    //    url: '../OA/DelMingXi',
    //    dataType: 'json',//数据类型
    //    type: 'GET',//类型
    //    data: {
    //        id: id
    //    },
    //    timeout: 20000,//超时
    //    //请求成功
    //    success: function (data, status) {
    //        $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
    //        if (data.Code == "0") {
    //            refreshMingXi();
    //            swal("成功", data.msg, "success");
    //        } else {
    //            swal("失败", data.msg, "error");
    //        }
    //    },
    //    //失败/超时
    //    error: function (XMLHttpRequest, textStatus, errorThrown) {
    //        $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
    //        if (textStatus === 'timeout') {
    //            alert('请求超时');
    //        }
    //    }
    //})
//}
//新增报销明细 模态框
var vm = new Vue({
    el: '#AddBaoXiaoMX',
    data: {
        code: "",//单据编号
        expensetime: "",//报销日期
        costtype: "",//费用类型
        amount: "",//报销金额
        docunm: "",//单据张数
        note: "",//备注信息
        isshow: false
    },
    methods: {
        //添加
        //Add: function () {
        //    //var user = getCookie("userinfo");
        //    //if (user == "" || user == null) {
        //    //    window.location.href = "/Imbusiniss/Login";
        //    //}
        //    //var json = jQuery.parseJSON(user);
        //    mxcode = this.$data.code;
        //    if (this.$data.code == "") {
        //        swal("提示", "单据编号不可为空", "warning");
        //        return false;
        //    }
        //    if (this.$data.expensetime == "") {
        //        swal("提示", "报销日期不能为空", "warning");
        //        return false;
        //    }
        //    if (this.$data.costtype == "") {
        //        swal("提示", "费用类型不能为空", "warning");
        //        return false;
        //    }
        //    if (this.$data.amount == "") {
        //        swal("提示", "报销金额不能为空", "warning");
        //        return false;
        //    }
        //    loading_all_id = $(document.body).NZ_Loading("show");
        //    $.ajax({
        //        url: '../OA/AddMingXi',
        //        dataType: 'json',//数据类型
        //        type: 'POST',//类型
        //        data: {
        //            code: this.$data.code,//单据编号
        //            expensetime: this.$data.expensetime,//报销日期
        //            costtype: this.$data.costtype,//费用类型
        //            amount: this.$data.amount,//报销金额
        //            docunm: this.$data.docunm,//单据张数
        //            note: this.$data.note,//备注信息
        //            //recorder: json[0].account
        //        },
        //        timeout: 20000,//超时
        //        //请求成功
        //        success: function (data, status) {
        //            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
        //            if (data.Code == "0") {
        //                $('#AddBaoXiaoMX').modal('hide')
        //                swal("成功", data.msg, "success");
        //                //refreshMingXi(mxcode);
        //                refreshMingXi();
        //            } else {
        //                swal("失败", data.msg, "error");
        //            }
        //        },
        //        //失败/超时
        //        error: function (XMLHttpRequest, textStatus, errorThrown) {
        //            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
        //            if (textStatus === 'timeout') {
        //                alert('请求超时');
        //            }
        //        }
        //    })
        //},
        //编辑
        Edit: function () {
            this.$data.isshow = false;
        },
        //提交表单
        Submit: function () {
            if (this.$data.code == "") {
                swal("提示", "单据编号不可为空", "warning");
                return false;
            }
            if (this.$data.expensetime == "") {
                swal("提示", "报销日期不能为空", "warning");
                return false;
            }
            if (this.$data.costtype == "") {
                swal("提示", "费用类型不能为空", "warning");
                return false;
            }
            if (this.$data.amount == "") {
                swal("提示", "报销金额不能为空", "warning");
                return false;
            }
            var mxcode = this.$data.code;
            var data = $("#mingxi").serializeArray(); //自动将form表单封装成json
            var a = {};
            $.each(data, function (i, obj) {    
                a[obj.name] = obj.value;
            });
            if (add == 1) {  //add为1时表示是新增的明细记录
                a["flag"] = 0;
                a["id"] = "";
                mingxi.push(a);
            } else {
                a["flag"] = 1;
                if (mingxi[mxNumber - 1].id != "") {
                    a["id"] = mingxi[mxNumber - 1].id;
                } else {
                    a["id"] = "";
                }
                var x = mxNumber - 1
                mingxi.splice(x, 1, a);
            }
            
            
            $('#AddBaoXiaoMX').modal('hide')
            swal("成功", "添加成功", "success");
            //refreshMingXi(mxcode);
            refreshMingXi();
            return mingxi;
        }
    }
})



//点击查看按钮弹出模态框
function showAddMingXi() {
    vm.$data.isshow = false;
    vm.$data.code=bx.$data.code,//单据编号
    vm.$data.expensetime= "",//报销日期
    vm.$data.costtype= "",//费用类型
    vm.$data.amount= "",//报销金额
    vm.$data.docunm= "",//单据张数
    vm.$data.note= "",//备注信息
    isshow = true;
    $('#AddBaoXiaoMX').modal('show')
}



//刷新表格
function refreshTable() {
    $("#table1").bootstrapTable('refresh', {
        url: '../OA/BaoXiaoList',
        silent: true, //静态刷新
        query: {
            keywords: selecthead.$data.keywords,
            account: selecthead.$data.account,
            step:selecthead.$data.step
        }
    }); 
}
//刷新明细表
function refreshMingXi() {
    $("#table").bootstrapTable('destroy');
    GetMingXi();
    sum = $("#sum").text();
    bx.$data.total = sum;//报销总额
}

//在Jquery里格式化Date日期时间数据
function timetoData(time) {
    var times = time.split(' ')[0].split('/')
    //var datetime = new Date();
    //datetime.setTime(time);
    var year = times[0];
    var month = times[1] + 1 < 10 ? "0" + times[1] : times[1];
    var date = times[2] < 10 ? "0" + times[2] : times[2];
    //var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    //var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    //var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date;
}

//编号自动生成规则
function GetGuid() {
    var date = new Date();                //得到当前日期原始模式
    var newyear = date.getFullYear();     //得到当前日期年份
    var newmonth = date.getMonth() + 1;   //得到当前日期月份（注意： getMonth()方法一月为 0, 二月为 1, 以此类推。）
    var day = date.getDate();            //得到当前某日日期（1-31）
    newmonth = (newmonth < 10 ? "0" + newmonth : newmonth);  //10月以下的月份自动加0
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var millsecond = date.getMilliseconds();
    return newyear + newmonth + day + "-" + hour + minutes + seconds;
}



//搜索条件
var selecthead = new Vue({
    el: '#ibox-title',
    data: {
        keywords: "",//关键字搜索
        account: "",
        step:"0"
    },
    methods: {

    }
})


//加载客户、合同、商机名称
function loadname() {
    //客户名称
    $("#customer").bsSuggest({
        url: '../OA/getcustomer',
        indexId: 2,
        indexKey: 1,
        autoSelect: true,
        showBtn: true,
    }).on('onSetSelectValue', function (e, keyword) {
        bx.$data.customer = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
    //合同名称
    $("#data-contract").bsSuggest({
        url: '../OA/getcontract?account=' + selecthead.$data.account,//请求数据的url地址
        indexId: 2,//每组的第几个数据作为输入框的data-id，设为-1且idField为空则不设此值
        indexKey: 1,//data.value的第几个数据作为输入框的内容
        autoSelect: true,//键盘向上/下方向键时，是否自动选择值
        showBtn: true,//是否显示下拉按钮
    }).on('onSetSelectValue', function (e, keyword) {
        bx.$data.contract = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
    //商机名称
    $("#data-chance").bsSuggest({
        url: '../OA/getchance?account=' + selecthead.$data.account,
        indexId: 2,
        indexKey: 1,
        autoSelect: true,
        //  showBtn: false,
    }).on('onSetSelectValue', function (e, keyword) {
        bx.$data.chance = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
}