var loading_all_id = null;
var timestamp;
$(function () {

    var user = getCookie("userinfo");
    //if (user == "" || user == null) {
    //    window.location.href = "/Home/Login";
    //}
    var json = jQuery.parseJSON(user);
    selecthead.$data.account = json[0].account;
    GetApprovalList();
    
    timestamp = new Date().getTime();
    
});

//根据radio按钮显示不同的表单选项
function getRadioVal() {
    if (bx.$data.type == "1") {
        bx.$data.showRadio1 = true;
        bx.$data.showRadio2 = false;
        bx.$data.showRadio3 = false;
        bx.$data.showRadio = true;
    } else if (bx.$data.type == "2") {
        bx.$data.showRadio1 = false;
        bx.$data.showRadio2 = true;
        bx.$data.showRadio3 = false;
        bx.$data.showRadio = true;
    } else if (bx.$data.type == "3") {
        bx.$data.showRadio1 = false;
        bx.$data.showRadio2 = false;
        bx.$data.showRadio3 = true;
        bx.$data.showRadio = false;
    }
    if (chuchaisq.$data.type == "1") {
        chuchaisq.$data.showRadio1 = true;
        chuchaisq.$data.showRadio2 = false;
        chuchaisq.$data.showRadio3 = false;
    } else if (chuchaisq.$data.type == "2") {
        chuchaisq.$data.showRadio1 = false;
        chuchaisq.$data.showRadio2 = true;
        chuchaisq.$data.showRadio3 = false;
    } else if (chuchaisq.$data.type == "6") {
        chuchaisq.$data.showRadio1 = false;
        chuchaisq.$data.showRadio2 = false;
        chuchaisq.$data.showRadio3 = true;
    } else {
        chuchaisq.$data.showRadio1 = false;
        chuchaisq.$data.showRadio2 = false;
        chuchaisq.$data.showRadio3 = false;
    }
    if (chailvbx.$data.type == "1") {
        chailvbx.$data.showRadio1 = true;
        chailvbx.$data.showRadio2 = false;
        chailvbx.$data.showRadio3 = false;
    } else if (chailvbx.$data.type == "2") {
        chailvbx.$data.showRadio1 = false;
        chailvbx.$data.showRadio2 = true;
        chailvbx.$data.showRadio3 = false;
    } else if (chailvbx.$data.type == "6") {
        chailvbx.$data.showRadio1 = false;
        chailvbx.$data.showRadio2 = false;
        chailvbx.$data.showRadio3 = true;
    } else {
        chailvbx.$data.showRadio1 = false;
        chailvbx.$data.showRadio2 = false;
        chailvbx.$data.showRadio3 = false;
    }
}



//实例化费用报销右滑框
var _right1 = new mSlider({
    dom: ".layer-right1",
    direction: "right",
    distance: "85%",
    callback: function () {
        return mingxi = [];
    }
});
//实例化出差申请右滑框
var _right2 = new mSlider({
    dom: ".layer-right2",
    direction: "right",
    distance: "85%",
    callback: function () {
        return mingxi = [];
    }
});
//实例化差旅报销右滑框
var _right3 = new mSlider({
    dom: ".layer-right3",
    direction: "right",
    distance: "85%",
    callback: function () {
        return mingxi = [];
    }
});


//新建费用报销
var bx = new Vue({
    el: '#tab-1',
    data: {
        code: "",//单据编号
        type: "1",//报销类型
        contract: "",//合同编号
        chance: "",//商机编号
        projectname: "",//项目名称
        amount: "",//合同金额
        budget: "",//商机预算
        applicant: "",//申请人
        department: "",//归属部门
        customer: "",//客户代码
        total: "0.00",//报销总额
        consume: "",//已发生金额
        reason: "",//事由
        recordtime: "",//申请时间
        isshow: true,
        showRadio1: true,
        showRadio2: false,
        showRadio3: false,
        showRadio: true
    },

})
//新建出差申请
var chuchaisq = new Vue({
    el: '#tab-2',
    data: {
        code: "",//申请编号
        department: "",//归属部门
        type: "",//出差类型
        contract: "",//合同编号
        chance: "",//商机编号
        projectname: "",//项目名称
        customer: "",//客户代码
        applicant: "",//申请人
        traveler: "",//出差人
        reason: "",//事由
        recordtime: "",//记录时间
        state: "",//审批状态
        traffictool: "",//交通工具
        origin: "",//出发地
        destination: "",//目的地
        province1: "",//出发省
        city1: "", //出发市
        district1: "",//出发区
        province2: "",//目的省
        city2: "", //目的市
        district2: "",//目的区
        departuretime: "",//出发日期
        returntime: "",//返回日期
        dapm: "",//出发上下午
        rapm: "",//返回上下午
        isshow: true,
        showRadio1: true,
        showRadio2: false,
        showRadio3: false,
    },
})
//新建差旅报销
var chailvbx = new Vue({
    el: '#tab-3',
    data: {
        code: "",//申请编号
        travelapplication: "",//出差申请单编号
        department: "",//归属部门
        type: "1",//报销类型
        contract: "",//合同编号
        chance: "",//商机编号
        projectname: "",//项目名称
        amount: "",//合同金额
        budget: "",//商机预算
        customer: "",//客户代码
        applicant: "",//申请人
        reason: "",//事由
        recordtime: "",//记录时间
        state: "",//审批状态
        traffictool: "",//交通工具
        province1: "",//出发省
        city1: "", //出发市
        district1: "",//出发区
        province2: "",//目的省
        city2: "", //目的市
        district2: "",//目的区
        departuretime: "",//出发日期
        returntime: "",//返回日期
        dapm: "",//出发上下午
        rapm: "",//返回上下午
        total: "0.00",//报销总额
        consume: "",//已发生金额
        isshow: true,
        showRadio1: true,
        showRadio2: false,
        showRadio3: false,
        showRadio: true
    },
})


//根据报销类型显示不同的右滑框
function showslider(code, approvaltype,applicant) {
    if (approvaltype == 1) {
        showslider1(code,applicant);
    }
    if (approvaltype == 2) {
        showslider2(code,applicant);
    }
    if (approvaltype == 3) {
        showslider3(code,applicant);
    }

}
//费用报销右侧滑出层
function showslider1(code,applicant) {
    showBaoXiao(code,applicant);
    bx.$data.isshow = true;
    _right1.open();
    
}
//出差申请右侧滑出层
function showslider2(code,applicant) {
    showChuChaiSQ(code,applicant);
    chuchaisq.$data.isshow = true;
    _right2.open();
}
//差旅报销右侧滑出层
function showslider3(code,applicant) {
    showChaiLvBX(code,applicant);
    chailvbx.$data.isshow = true;
    _right3.open();
}
function hidenslider() {
    _right1.close();
    _right2.close();
    _right3.close();
}



//查看费用报销单
function showBaoXiao(code,applicant) {
    $.ajax({
        url: '../OA/BaoxiaoByID',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            code: code,
            account:applicant
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
            $("#customer").val(data[0].customername);//客户名称
            $("#data-contract").val(data[0].contractname);//合同名称
            $("#data-chance").val(data[0].chancename);//商机名称
            getRadioVal();
        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus === 'timeout') {
                alert('请求超时');
            }
        }
    })
}
//查看出差申请单
function showChuChaiSQ(code,applicant) {
    $.ajax({
        url: '../OA/ChuChaiSQList',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            code: code,
            account:applicant
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $("#chuchai_customer").bsSuggest("disable");
            $("#chuchai_data-contract").bsSuggest("disable");
            $("#chuchai_data-chance").bsSuggest("disable");
            chuchaisq.$data.isshow = true;
            var origin = data[0].origin;
            var ori = new Array();
            ori = origin.split(",");
            chuchaisq.$data.province1 = ori[0];
            chuchaisq.$data.city1 = ori[1];
            chuchaisq.$data.district1 = ori[2];

            var destination = data[0].destination;
            var des = new Array();
            des = destination.split(",");
            chuchaisq.$data.province2 = des[0];
            chuchaisq.$data.city2 = des[1];
            chuchaisq.$data.district2 = des[2];

            $('#chuchai_distpicker1').distpicker('destroy');//销毁实例
            $("#chuchai_distpicker1").distpicker({
                province: chuchaisq.$data.province1,
                city: chuchaisq.$data.city1,
                district: chuchaisq.$data.district1
            });
            $('#chuchai_distpicker3').distpicker('destroy');//销毁实例
            $("#chuchai_distpicker3").distpicker({
                province: chuchaisq.$data.province2,
                city: chuchaisq.$data.city2,
                district: chuchaisq.$data.district2
            });

            chuchaisq.$data.departuretime = data[0].departuretime;
            chuchaisq.$data.dapm = data[0].dapm;
            chuchaisq.$data.returntime = data[0].returntime;
            chuchaisq.$data.rapm = data[0].rapm;
            chuchaisq.$data.id = data[0].id;
            chuchaisq.$data.code = data[0].code;//申请编号
            chuchaisq.$data.department = data[0].department;//归属部门
            chuchaisq.$data.type = data[0].type;//出差类型
            chuchaisq.$data.customer = data[0].customer;//客户名称
            chuchaisq.$data.contract = data[0].contract;//合同编号
            chuchaisq.$data.chance = data[0].chance;//商机编号
            chuchaisq.$data.projectname = data[0].projectname;//项目名称
            chuchaisq.$data.traveler = data[0].traveler;//出差人
            chuchaisq.$data.applicant = data[0].applicant;//申请人
            chuchaisq.$data.recordtime = data[0].recordtime;//记录时间
            chuchaisq.$data.traffictool = data[0].traffictool;//交通工具
            chuchaisq.$data.reason = data[0].reason;//事由

            $("#chuchai_customer").val(data[0].customername);//客户名称
            $("#chuchai_data-contract").val(data[0].contractname);//合同名称
            $("#chuchai_data-chance").val(data[0].chancename);//商机名称
            getRadioVal();
        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus === 'timeout') {
                alert('请求超时');
            }
        }
    })
}
//查看差旅报销单
function showChaiLvBX(code,applicant) {
    $.ajax({
        url: '../OA/ChaiLvList',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            code: code,
            account: applicant
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $("#travelapplication").bsSuggest("disable");//出差申请单编号
            $("#chailv_customer").bsSuggest("disable");
            $("#chailv_data-contract").bsSuggest("disable");
            $("#chailv_data-chance").bsSuggest("disable");
            var origin = data[0].origin;
            var ori = new Array();
            ori = origin.split(",");
            chailvbx.$data.province1 = ori[0];
            chailvbx.$data.city1 = ori[1];
            chailvbx.$data.district1 = ori[2];

            var destination = data[0].destination;
            var des = new Array();
            des = destination.split(",");
            chailvbx.$data.province2 = des[0];
            chailvbx.$data.city2 = des[1];
            chailvbx.$data.district2 = des[2];

            $('#distpicker1').distpicker('destroy');//销毁实例
            $("#distpicker1").distpicker({
                province: chailvbx.$data.province1,
                city: chailvbx.$data.city1,
                district: chailvbx.$data.district1
            });
            $('#distpicker3').distpicker('destroy');//销毁实例
            $("#distpicker3").distpicker({
                province: chailvbx.$data.province2,
                city: chailvbx.$data.city2,
                district: chailvbx.$data.district2
            });

            chailvbx.$data.isshow = true;
            chailvbx.$data.departuretime = data[0].departuretime;
            chailvbx.$data.dapm = data[0].dapm;
            chailvbx.$data.returntime = data[0].returntime;
            chailvbx.$data.rapm = data[0].rapm;
            chailvbx.$data.id = data[0].id;
            chailvbx.$data.code = data[0].code;//申请编号
            chailvbx.$data.department = data[0].department;//归属部门
            chailvbx.$data.type = data[0].type;//申请类型
            chailvbx.$data.customer = data[0].customer;//客户编号
            chailvbx.$data.contract = data[0].contract;//合同编号
            chailvbx.$data.chance = data[0].chance;//商机编号
            chailvbx.$data.projectname = data[0].projectname;//项目名称
            chailvbx.$data.applicant = data[0].applicant;//申请人
            chailvbx.$data.reason = data[0].reason;//事由
            chailvbx.$data.recordtime = data[0].recordtime;//记录时间
            chailvbx.$data.state = data[0].state;//审批状态
            chailvbx.$data.traffictool = data[0].traffictool;//交通工具
            chailvbx.$data.total = data[0].total;//报销总额
            chailvbx.$data.consume = data[0].consume;//已发生金额
            chailvbx.$data.amount = data[0].conamount;//合同金额
            chailvbx.$data.budget = data[0].chamount;//商机预算
            $("#travelapplication").val(data[0].travelapplication);//出差申请单编号
            $("#chailv_customer").val(data[0].customername);//客户名称
            $("#chailv_data-contract").val(data[0].contractname);//合同名称
            $("#chailv_data-chance").val(data[0].chancename);//商机名称
            getRadioVal();
        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus === 'timeout') {
                alert('请求超时');
            }
        }
    })
}


//清空报销明细表
function destoryMingXi() {
    $('#table2').bootstrapTable('removeAll');
    $('#table3').bootstrapTable('removeAll');
}
//加载费用报销明细
function GetBaoxiaoMingXi(code) {
    $('#table2').bootstrapTable({
        url: '../OA/BaoXiaoMXList',
        toolbar: '#toolbar',
        clickEdit: true,
        pagination: true,       //显示分页条
        striped: true,
        showFooter: true,
        pageSize: 4,
        pageNumber: 1,
        method: "post",
        queryParams: {
            code:code
        },
        columns: [
            {
                field: 'number',
                align: "center",
                title: '序号',
                formatter: function (value, row, index) {
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
              },
              {
                  field: 'id',
                  align: "center",
                  title: '操作',
                  formatter: function (value, item, index) {

                      var htm = '<img src="/img/view.png"   title="查看" onclick="showBXMingXi(\'' + item.id + '\')"/>';
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
//加载差旅报销明细
function GetChailvMingXi(code) {
    $('#table3').bootstrapTable({
        url: '../OA/ChaiLvMXList',
        toolbar: '#toolbar',
        clickEdit: true,
        pagination: true,       //显示分页条
        striped: true,
        showFooter: true,
        pageSize: 4,
        pageNumber: 1,
        method: "post",
        queryParams: {
            code: code
        },
        columns: [
            {
                field: 'number',
                align: "center",
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
            {
                field: 'code',
                align: "center",
                title: '出差申请单编号'
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
            field: 'transportation',
            align: "center",
            title: '交通费'
        },
        {
            field: 'urbantransportation',
            align: "center",
            title: '市区交通费'
        },
        {
            field: 'accommodation',
            align: "center",
            title: '住宿费'
        },
       {
           field: 'totalamount',
           align: "center",
           title: '报销总额',
           footerFormatter: function (value) {
               var sum = 0;
               for (var i in value) {
                   if (value[i].totalamount != null) {
                       sum += parseFloat(value[i].totalamount);
                   }
               }
               return '<span style="color:#1c84c6">' + "报销合计：" + '<span id="sum" style="color:#1c84c6">' + sum.toFixed(2) + '</span>' + "元" + '</span>';
           }
       },
       {
           field: 'docunm',
           align: "center",
           title: '单据张数'
       },
       {
           field: 'id',
           align: "center",
           title: '操作',
           formatter: function (value, item, index) {

               var htm = '<img src="/img/view.png"   title="查看" onclick="showCLMingXi(\'' + item.id + '\')"/>';
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

//新建费用报销明细
var fymx = new Vue({
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
    }
})
//新建差旅报销明细
var clmx = new Vue({
    el: '#AddChaiLvMX',
    data: {
        code: "",//出差费申请单编号
        expensetime: "",//报销日期
        costtype: "1",//费用类型
        docunm: "",//单据张数
        transportation: "",//交通费
        urbantransportation: "",//市区交通费
        accommodation: "",//住宿费
        totalamount: "",//报销总额
        note: "",//备注信息
        isshow: false
    },
    methods: {
    }
})
//查看费用报销明细
function showBXMingXi(id) {
    $.ajax({
        url: '../OA/BaoXiaoMXList',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            id:id
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            fymx.$data.isshow = true;
            fymx.$data.code = data[0].code;//单据编号
            fymx.$data.expensetime = data[0].expensetime;//报销日期
            fymx.$data.costtype = data[0].costtype;//费用类型
            fymx.$data.amount = data[0].amount;//报销金额
            fymx.$data.docunm = data[0].docunm;//单据张数
            fymx.$data.note = data[0].note;//备注信息
            $('#AddBaoXiaoMX').modal('show');
        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus === 'timeout') {
                alert('请求超时');
            }
        }
    })
}
//查看差旅报销明细
function showCLMingXi(id) {
    $.ajax({
        url: '../OA/ChaiLvMXList',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            id:id
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            clmx.$data.isshow = true;
            clmx.$data.code = data[0].code;//申请单编号
            clmx.$data.expensetime = data[0].expensetime;//报销日期
            clmx.$data.costtype = data[0].costtype;//费用类型
            clmx.$data.transportation = data[0].transportation;//交通费
            clmx.$data.urbantransportation = data[0].urbantransportation;//市区交通费
            clmx.$data.accommodation = data[0].accommodation;//住宿费
            clmx.$data.docunm = data[0].docunm;//单据张数
            clmx.$data.note = data[0].note;//备注信息
            clmx.$data.totalamount = data[0].totalamount;//报销金额
            $('#AddChaiLvMX').modal('show');
        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus === 'timeout') {
                alert('请求超时');
            }
        }
    })
}



//加载审批单
function GetApprovalList() {
    var a = selecthead.$data.keywords;
    loading_all_id = $(document.body).NZ_Loading("show");
    $('#table1').bootstrapTable({
        url: '../OA/ApprovalList',
        toolbar: '#toolbar',
        fixedColumns: true,
        pagination: true,       //显示分页条
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        striped: true,
        method: "post",
        singleSelect: true, //禁止多选
        clickToSelect: true, //启用点击选中行
        onClickRow: function (row) {
            $("#table2").bootstrapTable('destroy');
            GetBaoxiaoMingXi(row.code);
            $("#table3").bootstrapTable('destroy');
            GetChailvMingXi(row.code);
        },
        queryParams: {
            account: selecthead.$data.account,
            keywords: selecthead.$data.keywords,
            state: selecthead.$data.state,
            type:selecthead.$data.type
        },
        columns: [
            {
                field: 'code',
                align: "center",
                title: '审批单编号'
            },
            {
                field: 'approvaltype',
                align: "center",
                title: '审批类型',
                formatter: function (value, item, index) {
                    if (value == "1") {
                        return "费用报销";
                    } else if (value == "2") {
                        return "出差申请";
                    } else if (value == "3") {
                        return "差旅报销";
                    } 
                    else {
                        return value;
                    }
                }
            },
              {
                  field: 'applicant',
                  align: "center",
                  title: '申请人'
              },
          {
              field: 'recordtime',
              align: "center",
              title: '申请时间',
          },
          {
              field: 'state',
              align: "center",
              title: '审批状态',
              formatter: function (value, item, index) {
                  if (value == "0") {
                      return "待审批";
                  } else if (value == "1") {
                      var a = '<span style="color:#51c688">' + "审批通过" + '</span>';
                      return a;
                  } else if (value == "2") {
                      var a = '<span style="color:#D8220A;">' + "审批拒绝" + '</span>';
                      return a;
                  }
                  else {
                      return value;
                  }
              }
          },
          {
              field: 'rank',
              align: "center",
              title: '审批等级',
          },
          {
              field: 'id',
              align: "center",
              title: '操作',
              formatter: function (value, item, index) {
                  htm = '<span  title="查看" onclick="showslider(\'' + item.code + '\',\'' + item.approvaltype + '\',\'' + item.account
                      + '\')"><img src="/img/view.png" /></span>';
                  htm += '<span onclick="pass(\'' + item.id + '\',\'' + item.code + '\',\'' + item.approvaltype + '\',\'' + item.approvalrank + '\')"> <img title="审批通过" src="../img/启用.png" /></span> ';
                  htm += '<span onclick="refuse(\'' + item.id + '\',\'' + item.code + '\',\'' + item.approvaltype + '\',\'' + item.approvalrank + '\')"> <img title="审批拒绝" src="../img/禁用.png" /></span> ';
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

//审批通过
function pass(id,code,approvaltype,rank) {
    loading_all_id = $(document.body).NZ_Loading("show");
    $.ajax({
        url: '../OA/PassApproval',
        dataType: 'json',//数据类型
        type: 'GET',//类型
        data: {
            account:selecthead.$data.account,
            recordtime:timetoData(timestamp),
            id: id,
            approvaltype: approvaltype,
            code: code,
            rank: rank
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
//审批拒绝
function refuse(id,code,approvaltype, rank) {
    var p = prompt("输入拒绝原因:");
    loading_all_id = $(document.body).NZ_Loading("show");
    $.ajax({
        url: '../OA/RefuseApproval',
        dataType: 'json',//数据类型
        type: 'GET',//类型
        data: {
            account: selecthead.$data.account,
            recordtime: timetoData(timestamp),
            id: id,
            approvaltype: approvaltype,
            code: code,
            rank: rank,
            note:p
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



//刷新表格
function refreshTable() {
    $("#table1").bootstrapTable('refresh', {
        url: '../OA/ApprovalList',
        silent: true, //静态刷新
        query: {
            keywords: selecthead.$data.keywords,
            account: selecthead.$data.account,
            state: selecthead.$data.state,
            type:selecthead.$data.type
        }
    });
}
//在Jquery里格式化Date日期时间数据
function timetoData(time) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minute = datetime.getMinutes();
    var second = datetime.getSeconds();
    var recordtime = year + "/" + month + "/" + date +" "+ hour + ":" + minute + ":" + second;
    return recordtime;
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
        state: "-1",
        type:"0"
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

    //客户名称
    $("#chuchai_customer").bsSuggest({
        url: '../OA/getcustomer',
        indexId: 2,
        indexKey: 1,
        autoSelect: true,
        showBtn: true,
    }).on('onSetSelectValue', function (e, keyword) {
        chuchaisq.$data.customer = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
    //合同名称
    $("#chuchai_data-contract").bsSuggest({
        url: '../OA/getcontract?account=' + selecthead.$data.account,//请求数据的url地址
        indexId: 2,//每组的第几个数据作为输入框的data-id，设为-1且idField为空则不设此值
        indexKey: 1,//data.value的第几个数据作为输入框的内容
        autoSelect: true,//键盘向上/下方向键时，是否自动选择值
        showBtn: true,//是否显示下拉按钮
    }).on('onSetSelectValue', function (e, keyword) {
        chuchaisq.$data.contract = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
    //商机名称
    $("#chuchai_data-chance").bsSuggest({
        url: '../OA/getchance?account=' + selecthead.$data.account,
        indexId: 2,
        indexKey: 1,
        autoSelect: true,
        //  showBtn: false,
    }).on('onSetSelectValue', function (e, keyword) {
        chuchaisq.$data.chance = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });


    //出差申请单编号
    $("#travelapplication").bsSuggest({
        url: '../OA/gettravelapplication',
        indexId: 1,
        indexKey: 1,
        autoSelect: true,
        showBtn: true,
    }).on('onSetSelectValue', function (e, keyword) {
        chailvbx.$data.travelapplication = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
    //客户名称
    $("#chailv_customer").bsSuggest({
        url: '../OA/getcustomer',
        indexId: 2,
        indexKey: 1,
        autoSelect: true,
        showBtn: true,
    }).on('onSetSelectValue', function (e, keyword) {
        chailvbx.$data.customer = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
    //合同名称
    $("#chailv_data-contract").bsSuggest({
        url: '../OA/getcontract?account=' + selecthead.$data.account,//请求数据的url地址
        indexId: 2,//每组的第几个数据作为输入框的data-id，设为-1且idField为空则不设此值
        indexKey: 1,//data.value的第几个数据作为输入框的内容
        autoSelect: true,//键盘向上/下方向键时，是否自动选择值
        showBtn: true,//是否显示下拉按钮
    }).on('onSetSelectValue', function (e, keyword) {
        chailvbx.$data.contract = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
    //商机名称
    $("#chailv_data-chance").bsSuggest({
        url: '../OA/getchance?account=' + selecthead.$data.account,
        indexId: 2,
        indexKey: 1,
        autoSelect: true,
        //  showBtn: false,
    }).on('onSetSelectValue', function (e, keyword) {
        chailvbx.$data.chance = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
}