var loading_all_id = null;
var mingxi = [];
var mxNumber;
var add;
var sum;

//根据radio按钮显示不同的表单选项
function getRadioVal() {
    $("#data-contract").val("");
    $("#data-chance").val("");
    if (chailvbx.$data.type == "1") {
        chailvbx.$data.showRadio1 = true;
        chailvbx.$data.showRadio2 = false;
        chailvbx.$data.showRadio3 = false;
        chailvbx.$data.chance = "";
        chailvbx.$data.projectname = "";
    } else if (chailvbx.$data.type == "2") {
        chailvbx.$data.showRadio1 = false;
        chailvbx.$data.showRadio2 = true;
        chailvbx.$data.showRadio3 = false;
        chailvbx.$data.contract = "";
        chailvbx.$data.projectname = "";
    } else if (chailvbx.$data.type == "6") {
        chailvbx.$data.showRadio1 = false;
        chailvbx.$data.showRadio2 = false;
        chailvbx.$data.showRadio3 = true;
        chailvbx.$data.chance = "";
        chailvbx.$data.contract = "";
    } else {
        chailvbx.$data.showRadio1 = false;
        chailvbx.$data.showRadio2 = false;
        chailvbx.$data.showRadio3 = false;
        chailvbx.$data.contract = "";
        chailvbx.$data.chance = "";
        chailvbx.$data.projectname = "";
    }
}

$(function () {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#recordtime',
            trigger: 'click',//怎么触发
            done: function (value) {
                chailvbx.$data.recordtime = value;
            },
            type: 'date',//格式
            format: 'yyyy/MM/dd'
            //max: new Date().valueOf()//最大日期，当前时间点的时间戳
        });
        laydate.render({
            elem: '#expensetime',
            trigger: 'click',//怎么触发
            done: function (value) {
                mx.$data.expensetime = value;
            },
            type: 'date',//格式
            format: 'yyyy/MM/dd'
        });
        laydate.render({
            elem: '#departuretime',
            trigger: 'click',
            done: function (value) {
                chailvbx.$data.departuretime = value;
            },
            type: 'date',//格式
            format: 'yyyy/MM/dd'
        });
        laydate.render({
            elem: '#returntime',
            trigger: 'click',
            done: function (value) {
                chailvbx.$data.returntime = value;
            },
            type: 'date',//格式
            format: 'yyyy/MM/dd'
        });
    });
    $('input[type=radio][name=type]').change(function () {
        getRadioVal();
        getBytpcode();
    });
    var user = getCookie("userinfo");
    //if (user == "" || user == null) {
    //    window.location.href = "/Home/Login";
    //}
    var json = jQuery.parseJSON(user);
    selecthead.$data.account = json[0].account;


    GetChaiLvBXList();
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
        stepstate: "1"
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
            code: code,
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

//右侧滑出层
function showslider(id,code) {
    if (id == "") {
        chailvbx.$data.code = GetGuid();//单据编号
        $("#travelapplication").bsSuggest("enable");//出差申请单编号
        $("#customer").bsSuggest("enable");//客户名称
        $("#data-contract").bsSuggest("enable");//合同名称
        $("#data-chance").bsSuggest("enable");//商机名称
        $("#travelapplication").val("");
        $("#customer").val("");
        $("#data-contract").val("");
        $("#data-chance").val("");
        chailvbx.$data.isshow = false;
        chailvbx.$data.id = "";
        chailvbx.$data.department = "";//归属部门
        chailvbx.$data.type = "";//报销类型
        chailvbx.$data.customer = "";//客户代码
        chailvbx.$data.contract = "";//合同编号
        chailvbx.$data.chance = "";//商机编号
        chailvbx.$data.projectname = "";//项目名称
        chailvbx.$data.total = "";//报销总额
        chailvbx.$data.amount = "";//合同金额
        chailvbx.$data.budget = "";//商机预算
        chailvbx.$data.consume = "";//已发生金额
        chailvbx.$data.applicant = selecthead.$data.account;//申请人
        chailvbx.$data.recordtime = "";//申请时间
        chailvbx.$data.reason = "",//事由
        chailvbx.$data.traffictool="",//交通工具
        chailvbx.$data.province1 = "";
        chailvbx.$data.city1 = "",
        chailvbx.$data.district1 = "",
        chailvbx.$data.province2 = "";
        chailvbx.$data.city2 = "",
        chailvbx.$data.district2 = "",
        chailvbx.$data.departuretime = "",
        chailvbx.$data.returntime = "",
        chailvbx.$data.dapm = "",
        chailvbx.$data.rapm="",
        mx.$data.code = chailvbx.$data.code;
    }
    else {
        step.$data.stepstate = "1";
        GetTrack(code);
        GetStep(code);
        showBaoXiao(id);
        chailvbx.$data.isshow = true;
    }
    _right.open();
}
function hidenslider() {
    _right.close();
}

//新建差旅报销
var chailvbx = new Vue({
    el: '#tab-1',
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
    methods: {
        Edit: function () {
            $("#travelapplication").bsSuggest("enable");//出差申请单编号
            $("#customer").bsSuggest("enable");//客户名称
            $("#data-contract").bsSuggest("enable");//合同名称
            $("#data-chance").bsSuggest("enable");//商机名称
            this.$data.isshow = false;
        },
        Add: function () {
            //出发地判断
            if ((this.$data.province1 == "天津市" && this.$data.city1 == "天津市郊县") || (this.$data.province1 == "上海市" && this.$data.city1 == "上海市郊县")
                || (this.$data.province1 == "河南省" && this.$data.city1 == "济源市") || (this.$data.province1 == "湖北省" && this.$data.city1 == "仙桃市")
                || (this.$data.province1 == "湖北省" && this.$data.city1 == "潜江市") || (this.$data.province1 == "湖北省" && this.$data.city1 == "天门市")
                || (this.$data.province1 == "湖北省" && this.$data.city1 == "神农架林区") || (this.$data.province1 == "重庆市" && this.$data.city1 == "重庆市郊县")) {
                this.$data.district1 = " ";
            }
            if ((this.$data.province1 == "海南省" && this.$data.city1 != "海口市") || (this.$data.province1 == "海南省" && this.$data.city1 != "三亚市")
                || (this.$data.province1 == "海南省" && this.$data.city1 != "三沙市")) {
                this.$data.district1 = " ";
            }
            if ((this.$data.province1 == "新疆维吾尔自治区" && this.$data.city1 == "石河子市") || (this.$data.province1 == "新疆维吾尔自治区" && this.$data.city1 == "阿拉尔市")
                || (this.$data.province1 == "新疆维吾尔自治区" && this.$data.city1 == "图木舒克市") || (this.$data.province1 == "新疆维吾尔自治区" && this.$data.city1 == "五家渠市")
                || (this.$data.province1 == "新疆维吾尔自治区" && this.$data.city1 == "北屯市") || (this.$data.province1 == "新疆维吾尔自治区" && this.$data.city1 == "铁门关市")
                || (this.$data.province1 == "新疆维吾尔自治区" && this.$data.city1 == "双河市") || (this.$data.province1 == "新疆维吾尔自治区" && this.$data.city1 == "可克达拉市")) {
                this.$data.district1 = " ";
            }
            if (this.$data.province1 == "台湾省") {
                this.$data.city1 = " ";
                this.$data.district1 = " ";
            }
            if (this.$data.province1 == "香港特别行政区") {
                this.$data.district1 = " ";
            }
            if (this.$data.province1 == "澳门特别行政区") {
                this.$data.district1 = " ";
            }
            //目的地判断
            if ((this.$data.province2 == "天津市" && this.$data.city2 == "天津市郊县") || (this.$data.province2 == "上海市" && this.$data.city2 == "上海市郊县")
                || (this.$data.province2 == "河南省" && this.$data.city2 == "济源市") || (this.$data.province2 == "湖北省" && this.$data.city2 == "仙桃市")
                || (this.$data.province2 == "湖北省" && this.$data.city2 == "潜江市") || (this.$data.province2 == "湖北省" && this.$data.city2 == "天门市")
                || (this.$data.province2 == "湖北省" && this.$data.city2 == "神农架林区") || (this.$data.province2 == "重庆市" && this.$data.city2 == "重庆市郊县")) {
                this.$data.district2 = " ";
            }
            if ((this.$data.province2 == "海南省" && this.$data.city2 != "海口市") || (this.$data.province2 == "海南省" && this.$data.city2 != "三亚市")
                || (this.$data.province2 == "海南省" && this.$data.city2 != "三沙市")) {
                this.$data.district2 = " ";
            }
            if ((this.$data.province2 == "新疆维吾尔自治区" && this.$data.city2 == "石河子市") || (this.$data.province2 == "新疆维吾尔自治区" && this.$data.city2 == "阿拉尔市")
                || (this.$data.province2 == "新疆维吾尔自治区" && this.$data.city2 == "图木舒克市") || (this.$data.province2 == "新疆维吾尔自治区" && this.$data.city2 == "五家渠市")
                || (this.$data.province2 == "新疆维吾尔自治区" && this.$data.city2 == "北屯市") || (this.$data.province2 == "新疆维吾尔自治区" && this.$data.city2 == "铁门关市")
                || (this.$data.province2 == "新疆维吾尔自治区" && this.$data.city2 == "双河市") || (this.$data.province2 == "新疆维吾尔自治区" && this.$data.city2 == "可克达拉市")) {
                this.$data.district2 = " ";
            }
            if (this.$data.province2 == "台湾省") {
                this.$data.city2 = " ";
                this.$data.district2 = " ";
            }
            if (this.$data.province2 == "香港特别行政区") {
                this.$data.district2 = " ";
            }
            if (this.$data.province2 == "澳门特别行政区") {
                this.$data.district2 = " ";
            }
            if (this.$data.code == "") {
                swal("提示", "申请编号不可为空", "warning");
                return false;
            } if (this.$data.type == "") {
                swal("提示", "报销类型未选择", "warning");
                return false;
            } if (this.$data.travelapplication == "") {
                swal("提示", "出差申请单编号未填写", "warning");
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
            } if (this.$data.traffictool == "") {
                swal("提示", "交通工具未选择", "warning");
                return false;
            } if (this.$data.departuretime == "") {
                swal("提示", "出发时间未填写", "warning");
                return false;
            } if (this.$data.returntime == "") {
                swal("提示", "返回时间未填写", "warning");
                return false;
            }
            if (this.$data.dapm == "") {
                swal("提示", "出发时间上下午未选择", "warning");
                return false;
            } if (this.$data.rapm == "") {
                swal("提示", "返回时间上下午未选择", "warning");
                return false;
            }
            if (this.$data.province1 == "") {
                swal("提示", "出发省未选择", "warning");
                return false;
            }
            if (this.$data.city1 == "") {
                swal("提示", "出发市未选择", "warning");
                return false;
            }
            if (this.$data.district1 == "") {
                swal("提示", "出发区未选择", "warning");
                return false;
            }
            if (this.$data.province2 == "") {
                swal("提示", "返回省未选择", "warning");
                return false;
            }
            if (this.$data.city2 == "") {
                swal("提示", "返回市未选择", "warning");
                return false;
            }
            if (this.$data.district2 == "") {
                swal("提示", "返回区未选择", "warning");
                return false;
            }
            loading_all_id = $(document.body).NZ_Loading("show");
            $.ajax({
                url: '../OA/AddChaiLvBX',
                dataType: 'json',//数据类型
                type: 'POST',//类型
                data: {
                    code: this.$data.code,//申请编号
                    travelapplication:this.$data.travelapplication,//出差申请单编号
                    department: this.$data.department,//归属部门
                    type: this.$data.type,//出差类型
                    contract: this.$data.contract,//合同编号
                    chance: this.$data.chance,//商机编号
                    projectname: this.$data.projectname,//项目名称
                    customer: this.$data.customer,//客户代码
                    applicant: this.$data.applicant,//申请人
                    reason: this.$data.reason,//事由
                    recordtime: this.$data.recordtime,//记录时间
                    state: this.$data.state,//审批状态
                    traffictool: this.$data.traffictool,//交通工具
                    total: this.$data.total,//报销总额
                    consume:this.$data.consume,//已报销金额

                    province1: this.$data.province1,
                    city1: this.$data.city1,
                    district1: this.$data.district1,
                    province2: this.$data.province2,
                    city2: this.$data.city2,
                    district2: this.$data.district2,
                    departuretime: this.$data.departuretime,//出发时间
                    returntime: this.$data.returntime,//返回时间
                    dapm: this.$data.dapm,
                    rapm: this.$data.rapm,

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
        },

    },

})

//加载差旅报销单
function GetChaiLvBXList() {
    loading_all_id = $(document.body).NZ_Loading("show");
    $('#table1').bootstrapTable({
        url: '../OA/ChaiLvList',
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
            transMingXi(row.code);//将数据库中的明细数据取出放在mingxi里
            setTimeout(function () {
                refreshMingXi();
            }, 200)


            return mingxi;
        },
        queryParams: {
            keywords: selecthead.$data.keywords,
            account: selecthead.$data.account,
            step:selecthead.$data.step
        },
        //contentType:'application/json',
        columns: [
            {
                field: 'code',
                align: "center",
                title: '申请编号'
            },
            {
                field: 'travelapplication',
                align: "center",
                title: '出差申请单编号'
            },
              {
                  field: 'department',
                  align: "center",
                  title: '归属部门'
              },
        {
            field: 'type',
            align: "center",
            title: '出差类型',
            formatter: function (value, item, index) {
                if (value == "1") {
                    return "合同";
                } else if (value == "2") {
                    return "商机";
                } else if (value == "3") {
                    return "培训";
                } else if (value == "4") {
                    return "会议";
                } else if (value == "5") {
                    return "招聘";
                } else if (value == "6") {
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
             formatter: function (value, row, field) {
                 if (row.type == 1) {
                     return row.contractname;
                 } else if (row.type == 2) {
                     return row.chancename;
                 } else if (row.type == 3) {
                     return row.projectname;
                 }
             }
         },
         {
             field: 'traffictool',
             align: "center",
             title: '交通工具',
             formatter: function (value, item, index) {
                 if (value == "1") {
                     return "火车";
                 } else if (value == "2") {
                     return "汽车";
                 } else if (value == "3") {
                     return "飞机";
                 } else if (value == "4") {
                     return "自驾";
                 } else if (value == "5") {
                     return "其他";
                 }
                 else {
                     return value;
                 }
             }
         },
         {
             field: 'origin',
             align: "center",
             title: '出发地',
         },
          {
              field: 'destination',
              align: "center",
              title: '目的地',
          },
          {
              field: 'departuretime',
              align: "center",
              title: '出发时间',
              formatter: function (value, item, index) {
                  return item.departuretime + item.dapm;
              }
          },
          {
              field: 'returntime',
              align: "center",
              title: '返回时间',
              formatter: function (value, item, index) {
                  return item.returntime + item.rapm;
              }
          },
          {
              field: 'recordtime',
              align: "center",
              title: '申请时间',
          },
          {
              field: 'state',
              align: "center",
              title: '当前状态',
              formatter: function (value, item, index) {
                  if (item.step == "1") {
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
                  htm = '<span  title="编辑" onclick="showslider(\'' + item.id + '\',\'' + item.code + '\')"><img src="/img/view.png" /></span>';
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

//查看差旅报销单
function showBaoXiao(id) {
    $.ajax({
        url: '../OA/ChaiLvList',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            id: id,
            account: selecthead.$data.account
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $("#travelapplication").bsSuggest("disable");//出差申请单编号
            $("#customer").bsSuggest("disable");
            $("#data-contract").bsSuggest("disable");
            $("#data-chance").bsSuggest("disable");
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
            chailvbx.$data.departuretime = data[0].departuretime;//出发日期
            chailvbx.$data.dapm = data[0].dapm;//出发上下午
            chailvbx.$data.returntime = data[0].returntime;//返回日期
            chailvbx.$data.rapm = data[0].rapm;//返回上下午
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
            getRadioVal();
            $("#travelapplication").val(data[0].travelapplication);//出差申请单编号
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
function delBX(id, code) {
    if (confirm("确定要删除吗?")) {
        delBaoXiao(id, code);
    }
    else {
        return false;
    }
}
//删除差旅报销单
function delBaoXiao(id,code) {
    loading_all_id = $(document.body).NZ_Loading("show");
    $.ajax({
        url: '../OA/DelChaiLvBX',
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

//onblur触发函数
function getBytpcode() {
    BaoxiaobyCode(chailvbx.$data.code, chailvbx.$data.type); 
}
//根据code显示报销单对应金额
function BaoxiaobyCode(code, type) {
    sum = $("#sum").text();
    var tpcode = '';
    if (type == 1) {
        tpcode = chailvbx.$data.contract;
    } else if (type == 2) {
        tpcode = chailvbx.$data.chance;
    } else {
        tpcode = "";
    }
    //alert(tpcode);
    $.ajax({
        url: '../OA/ChaiLvBXbyCode',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            code: code,
            type: type,
            tpcode: tpcode
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            chailvbx.$data.total = sum;//报销总额
            type = chailvbx.$data.type;//报销类型
            chailvbx.$data.consume = data[0].getconsume;//已发生金额
            function getAmount(type) {
                if (type == 1) {
                    chailvbx.$data.amount = data[0].getamount;
                } else if (type == 2) {
                    chailvbx.$data.budget = data[0].getamount;
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


$(document).on("click", "a[id='addmingxi']", function (event) {
    add = 1;//监听点击新增明细事件，点击时标记add为1
});

//新建差旅报销单明细
var mx = new Vue({
    el: '#AddBaoXiaoMX',
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
        Edit: function () {
            this.$data.isshow = false;
        },
        Submit: function () {
            if (this.$data.code == "") {
                swal("提示", "申请单编号不可为空", "warning");
                return false;
            } if (this.$data.costtype == "") {
                swal("提示", "费用类型未选择", "warning");
                return false;
            } if (this.$data.expensetime == "") {
                swal("提示", "报销日期未填写", "warning");
                return false;
            } if (this.$data.docunm == "") {
                swal("提示", "单据张数未填写", "warning");
                return false;
            } if (this.$data.transportation == "") {
                swal("提示", "交通费未填写", "warning");
                return false;
            } if (this.$data.urbantransportation == "") {
                swal("提示", "市区交通费未填写", "warning");
                return false;
            } if (this.$data.accommodation == "") {
                swal("提示", "住宿费未填写", "warning");
                return false;
            } if (this.$data.totalamount == "") {
                swal("提示", "报销总额未填写", "warning");
                return false;
            }
            var data = $("#mingxi").serializeArray(); //自动将form表单封装成json
            var a = {};
            $.each(data, function (i, obj) {
                a[obj.name] = obj.value;
            });
            if (add == 1) { //add为1表示是新增的明细数据
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
            refreshMingXi();
            return mignxi;

           
        },
    },

})
//获取明细数据并进行数据处理
function transMingXi(code) {
    $.ajax({
        url: '../OA/ChaiLvMXList',
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
                temp["totalamount"] = data[i].totalamount;//报销总额
                temp["docunm"] = data[i].docunm;//单据张数
                temp["note"] = data[i].note;//备注信息
                temp["transportation"] = data[i].transportation;//交通费
                temp["urbantransportation"] = data[i].urbantransportation;//市区交通费
                temp["accommodation"] = data[i].accommodation;//住宿费
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
        onClickRow: function (row, $element) {
            var index = $element.data('index');
            getNumber(index + 1);
            add = 0;
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
            field: 'docunm',
            align: "center",
            title: '单据张数'
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
               return '<span style="color:#1c84c6">' + "报销合计："+ '<span id="sum" style="color:#1c84c6">'+ sum.toFixed(2)+ '</span>' +"元" + '</span>';
           }
       },      
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

//查看报销明细表
function showMingXi(id) {
    mingxi[id - 1].flag = 1;
    mx.$data.isshow = true;
    var b = mingxi.slice(id - 1, id);
    mx.$data.code = b[0].code;//申请单编号
    mx.$data.expensetime = b[0].expensetime;//报销日期
    mx.$data.costtype = b[0].costtype;//费用类型
    mx.$data.transportation = b[0].transportation;//交通费
    mx.$data.urbantransportation = b[0].urbantransportation;//市区交通费
    mx.$data.accommodation = b[0].accommodation;//住宿费
    mx.$data.docunm = b[0].docunm;//单据张数
    mx.$data.note = b[0].note;//备注信息
    mx.$data.totalamount = b[0].totalamount;//报销金额
    $('#AddBaoXiaoMX').modal('show');
}
//确认删除弹框
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
    refreshMingXi();
    return mingxi;

}

//新增明细弹出模态框
function showAddMingXi() {
    mx.$data.code = chailvbx.$data.code;//报销单号
    mx.$data.isshow = false;
    mx.$data.expensetime = "",//报销日期
    mx.$data.transportation="",//交通费
    mx.$data.costtype = "",//费用类型
    mx.$data.docunm = "",//单据张数
    mx.$data.note = "",//备注信息
    mx.$data.urbantransportation = "",//市区交通费
    mx.$data.accommodation = "",//住宿费
    mx.$data.totalamount="",//报销总额
    $('#AddBaoXiaoMX').modal('show')
}

//刷新表格
function refreshTable() {
    $("#table1").bootstrapTable('refresh', {
        url: '../OA/ChaiLvList',
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
    chailvbx.$data.total = sum;//报销总额
}

//清空报销明细表
function destoryMingXi() {
    $('#table').bootstrapTable('removeAll');
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
        account: "",//账户搜索
        step:"0"
    },
    methods: {

    }
})


//加载客户、合同、商机名称
function loadname() {
    //出差申请单编号
    $("#travelapplication").bsSuggest({
        url: '../OA/gettravelapplication?account=' + selecthead.$data.account,
        indexId: 0,
        indexKey: 1,
        autoSelect: true,
        showBtn: true,
    }).on('onSetSelectValue', function (e, keyword) {
        chailvbx.$data.travelapplication = keyword.key;
    }).on("onDataRequestSuccess", function (e, result) {

    });
    //客户名称
    $("#customer").bsSuggest({
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
    $("#data-contract").bsSuggest({
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
    $("#data-chance").bsSuggest({
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