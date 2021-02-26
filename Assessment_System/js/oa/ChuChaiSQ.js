var loading_all_id = null;

//根据radio按钮显示不同的表单选项
function getRadioVal() {
    $("#data-contract").val("");
    $("#data-chance").val("");
    if (chuchaisq.$data.type == "1") {
        chuchaisq.$data.showRadio1 = true;
        chuchaisq.$data.showRadio2 = false;
        chuchaisq.$data.showRadio3 = false;
        chuchaisq.$data.chance = "";
        chuchaisq.$data.projectname = "";
    } else if (chuchaisq.$data.type == "2") {
        chuchaisq.$data.showRadio1 = false;
        chuchaisq.$data.showRadio2 = true;
        chuchaisq.$data.showRadio3 = false;
        chuchaisq.$data.contract = "";
        chuchaisq.$data.projectname = "";
    } else if (chuchaisq.$data.type == "6") {
        chuchaisq.$data.showRadio1 = false;
        chuchaisq.$data.showRadio2 = false;
        chuchaisq.$data.showRadio3 = true;
        chuchaisq.$data.chance = "";
        chuchaisq.$data.contract = "";
    } else {
        chuchaisq.$data.showRadio1 = false;
        chuchaisq.$data.showRadio2 = false;
        chuchaisq.$data.showRadio3 = false;
        chuchaisq.$data.contract = "";
        chuchaisq.$data.chance = "";
        chuchaisq.$data.projectname = "";
    }
}


$(function () {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#recordtime',
            trigger: 'click',//怎么触发
            done: function (value) {
                chuchaisq.$data.recordtime = value;
            },
            type: 'date',//格式
            format: 'yyyy/MM/dd'
            //max: new Date().valueOf()//最大日期，当前时间点的时间戳
        });
        laydate.render({
            elem: '#departuretime',
            trigger: 'click',
            done: function (value) {
                chuchaisq.$data.departuretime = value;
            },
            type: 'date',//格式
            format: 'yyyy/MM/dd'
        });
        laydate.render({
            elem: '#returntime',
            trigger: 'click',
            done: function (value) {
                chuchaisq.$data.returntime = value;
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


    GetChuChaiSQList();
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
});

//新建出差申请
var chuchaisq = new Vue({
    el: '#tab-1',
    data: {
        code: "",//申请编号
        department: "",//归属部门
        type: "",//出差类型
        contract: "",//合同编号
        chance: "",//商机编号
        projectname: "",//项目名称
        customer: "",//客户代码
        applicant: "",//申请人
        traveler:"",//出差人
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
        rapm:"",//返回上下午
        isshow: true,
        showRadio1: true,
        showRadio2: false,
        showRadio3: false,
    },
    methods: {
        Edit: function () {
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
                swal("提示", "出差类型未选择", "warning");
                return false;
            } if (this.$data.traveler == "") {
                swal("提示", "出差人未填写", "warning");
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
                url: '../OA/AddChuChaiSQ',
                dataType: 'json',//数据类型
                type: 'POST',//类型
                data: {
                    code: this.$data.code,//申请编号
                    department: this.$data.department,//归属部门
                    type: this.$data.type,//出差类型
                    contract: this.$data.contract,//合同编号
                    chance: this.$data.chance,//商机编号
                    projectname: this.$data.projectname,//项目名称
                    customer: this.$data.customer,//客户代码
                    applicant: this.$data.applicant,//申请人
                    traveler: this.$data.traveler,//出差人
                    reason: this.$data.reason,//事由
                    recordtime: this.$data.recordtime,//记录时间
                    state: this.$data.state,//审批状态
                    traffictool: this.$data.traffictool,//交通工具
                    province1: this.$data.province1,
                    city1: this.$data.city1,
                    district1: this.$data.district1,
                    province2: this.$data.province2,
                    city2: this.$data.city2,
                    district2: this.$data.district2,
                    departuretime: this.$data.departuretime,//出发时间
                    returntime: this.$data.returntime,//返回时间
                    dapm: this.$data.dapm,
                    rapm:this.$data.rapm,
                },
                timeout: 20000,//超时
                //请求成功
                success: function (data, status) {
                    $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
                    if (data.Code == "0") {
                        refreshTable();
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



//右侧滑出层
function showslider(id,code) {
    if (id == "") {
        $("#customer").bsSuggest("enable");//客户名称
        $("#data-contract").bsSuggest("enable");//合同名称
        $("#data-chance").bsSuggest("enable");//商机名称
        chuchaisq.$data.isshow = false;
        $("#customer").val("");
        $("#data-contract").val("");
        $("#data-chance").val("");
        chuchaisq.$data.id = "";
        chuchaisq.$data.code = GetGuid();//申请编号
        chuchaisq.$data.department = "";//归属部门
        chuchaisq.$data.type = "";//出差类型
        chuchaisq.$data.contract = "";//合同编号
        chuchaisq.$data.chance = "";//商机编号
        chuchaisq.$data.projectname = "";//项目名称
        chuchaisq.$data.customer = "";//客户代码
        chuchaisq.$data.applicant = selecthead.$data.account;//申请人
        chuchaisq.$data.traveler = "";//出差人
        chuchaisq.$data.recordtime = "";//记录时间
        chuchaisq.$data.reason = "";//事由
        chuchaisq.$data.state = "";//审批状态
        chuchaisq.$data.traffictool = "";//交通工具
        chuchaisq.$data.province1 = "";//出发省
        chuchaisq.$data.city1 = "";//出发市
        chuchaisq.$data.district1 = "";//出发区
        chuchaisq.$data.province2 = "";//目的省
        chuchaisq.$data.city2 = "";//目的市
        chuchaisq.$data.district2 = "";//目的区
        chuchaisq.$data.departuretime = "";//出发时间
        chuchaisq.$data.returntime = "";//返回时间
        chuchaisq.$data.dapm = "";//出发上下午
        chuchaisq.$data.rapm = "";//返回上下午
        
    }
    else {
        step.$data.stepstate = "1";
        GetTrack(code);
        GetStep(code);
        showChuChaiSQ(id);
        chuchaisq.$data.isshow = true;
    }
    _right.open();
}
function hidenslider() {

    _right.close();
}



//加载出差申请表格
function GetChuChaiSQList() {
    loading_all_id = $(document.body).NZ_Loading("show");
    $('#table1').bootstrapTable({
        url: '../OA/ChuChaiSQList',
        toolbar: '#toolbar',
        //clickEdit: true,
        fixedColumns: true,
        pagination: true,       //显示分页条
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        striped: true,
        method: "post",
        singleSelect: true, //禁止多选
        clickToSelect: true, //启用点击选中行
        //onClickRow: function (row) {
        //    //alert(row.code),
        //    GetMingXi(row.code)
        //    refreshMingXi(row.code);
        //},
        queryParams: {
            id: "",
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
                     //field : 'contract';
                 } else if (row.type == 2) {
                     return row.chancename;

                     //field : 'chance';
                 } else if (row.type == 3) {
                     return row.projectname;
                 }
             }
         },
         {
             field: 'traveler',
             align: "center",
             title: '出差人',
         },
         {
             field: 'recordtime',
             align: "center",
             title: '记录时间',
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
                  htm += '<span onclick="delSQ(\'' + value + '\',\'' + item.code + '\')"> <img title="删除" src="../img/delete.png" /></span> ';
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
//显示出差申请单
function showChuChaiSQ(id) {
    $.ajax({
        url: '../OA/ChuChaiSQList',
        dataType: 'json',//数据类型
        type: 'POST',//类型
        data: {
            id: id,
            account:selecthead.$data.account
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $("#customer").bsSuggest("disable");
            $("#data-contract").bsSuggest("disable");
            $("#data-chance").bsSuggest("disable");
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

            $('#distpicker1').distpicker('destroy');//销毁实例
            $("#distpicker1").distpicker({
                province: chuchaisq.$data.province1,
                city: chuchaisq.$data.city1,
                district: chuchaisq.$data.district1
            });
            $('#distpicker3').distpicker('destroy');//销毁实例
            $("#distpicker3").distpicker({
                province: chuchaisq.$data.province2,
                city: chuchaisq.$data.city2,
                district: chuchaisq.$data.district2
            });

            //var departuretime = data[0].departuretime;
            //var dep = [];
            //dep = departuretime.split(",");
            //chuchaisq.$data.dtime = dep[0];
            //chuchaisq.$data.apm1 = dep[1];

            //var returntime = data[0].returntime;
            //var ret = [];
            //ret = returntime.split(",");
            //chuchaisq.$data.rtime = ret[0];
            //chuchaisq.$data.apm2 = ret[1];

            chuchaisq.$data.id = data[0].id;
            chuchaisq.$data.code = data[0].code;//申请编号
            chuchaisq.$data.department = data[0].department;//归属部门
            chuchaisq.$data.type = data[0].type;//出差类型
            chuchaisq.$data.customer = data[0].customer;//客户名称
            chuchaisq.$data.contract = data[0].contract;//合同编号
            chuchaisq.$data.chance = data[0].chance;//商机编号
            chuchaisq.$data.projectname = data[0].projectname;//项目名称
            chuchaisq.$data.departuretime = data[0].departuretime;//出发时间
            chuchaisq.$data.dapm = data[0].dapm;//出发上下午
            chuchaisq.$data.returntime = data[0].returntime;//返回时间
            chuchaisq.$data.rapm = data[0].rapm;//返回上下午
            chuchaisq.$data.traveler = data[0].traveler;//出差人
            chuchaisq.$data.applicant = data[0].applicant;//申请人
            chuchaisq.$data.recordtime = data[0].recordtime;//记录时间
            chuchaisq.$data.traffictool = data[0].traffictool;//交通工具
            chuchaisq.$data.reason = data[0].reason;//事由
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
function delSQ(id,code) {
    if (confirm("确定要删除吗?")) {
        delChuChaiSQ(id, code);
    }
    else {
        return false;
    }
}
//删除出差申请单
function delChuChaiSQ(id,code) {
    loading_all_id = $(document.body).NZ_Loading("show");
    $.ajax({
        url: '../OA/DelChuChaiSQ',
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
        url: '../OA/ChuChaiSQList',
        silent: true, //静态刷新
        query: {
            keywords: selecthead.$data.keywords,
            account: selecthead.$data.account,
            step:selecthead.$data.step
        }
    });
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
        chuchaisq.$data.customer = keyword.id;
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
        chuchaisq.$data.contract = keyword.id;
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
        chuchaisq.$data.chance = keyword.id;
    }).on("onDataRequestSuccess", function (e, result) {

    });
}