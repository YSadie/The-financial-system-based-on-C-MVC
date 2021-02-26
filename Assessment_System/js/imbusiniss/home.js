//查看跟踪记录
var vm = new Vue({
    el: '#home',
    data: {
        ContractAmmount: "0",//累计合同金额
        ReceivableAmmount: "0",//累计回款金额
        ChanceTotal: "0",//商机总数
        ChanceOnline: "0",//在线商机
        /// <summary>
        /// 已成单商机
        /// </summary>
        ChanceScuess: "0",
        /// <summary>
        /// 终止商机
        /// </summary>
        ChanceFail: "0",
        /// <summary>
        /// 客户总计
        /// </summary>
        CustomerTotal: "0",
        /// <summary>
        /// 已签订合同客户
        /// </summary>
        CustomerSigned: "0",
        account: "",//登录账号
        contractlist: []

    }

})


$(function () {
    //loading_all_id = $(document.body).NZ_Loading("show");
    var user = getCookie("userinfo");
    //if (user == "" || user == null) {
    //    window.location.href = "/Home/Login";
    //}
    var json = jQuery.parseJSON(user);
    vm.$data.account = json[0].account;
    //GetHomefinfo();

})
//获取首页信息
function GetHomefinfo() {
    $.ajax({
        url: '../Home/HomeInfo',
        dataType: 'json',//数据类型
        type: 'Get',//类型
        data: {
            account: vm.$data.account
        },
        timeout: 20000,//超时
        //请求成功
        success: function (data, status) {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
            vm.$data.ContractAmmount = data.ContractAmmount;
            vm.$data.ReceivableAmmount = data.ReceivableAmmount;
            vm.$data.ChanceTotal = data.ChanceTotal;
            vm.$data.ChanceOnline = data.ChanceOnline;
            vm.$data.ChanceScuess = data.ChanceScuess;
            vm.$data.ChanceFail = data.ChanceFail;
            vm.$data.CustomerTotal = data.CustomerTotal;
            vm.$data.CustomerSigned = data.CustomerSigned;
            vm.$data.contractlist = $.parseJSON(data.contractlist);

        },
        //失败/超时
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $(document.body).NZ_Loading("hide", { loadingid: loading_all_id });
            if (textStatus === 'timeout') {
                alert('請求超時');
            }
        }
    })
}
function GetContract() {

}