using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assessment_System.Models
{
    public class ChaiLvBX
    {
        /// <summary>
        /// 申请编号
        /// </summary>
        public string code { get; set; }
        /// <summary>
        /// 出差申请单编号
        /// </summary>
        public string travelapplication { get; set; }
        /// <summary>
        /// 所属部门
        /// </summary>
        public string department { get; set; }
        /// <summary>
        /// 出差类型
        /// </summary>
        public string type { get; set; }
        /// <summary>
        /// 合同编号
        /// </summary>
        public string contract { get; set; }
        /// 商机编号
        /// </summary>
        public string chance { get; set; }
        /// 项目名称
        /// </summary>
        public string projectname { get; set; }
        /// <summary>
        /// 客户代码
        /// </summary>
        public string customer { get; set; }
        /// <summary>
        /// 申请人
        /// </summary>
        public string applicant { get; set; }
        /// <summary>
        /// 事由
        /// </summary>
        public string reason { get; set; }
        /// <summary>
        /// 申请时间
        /// </summary>
        public string recordtime { get; set; }
        /// <summary>
        /// 审批状态
        /// </summary>
        public string state { get; set; }
        /// <summary>
        /// 交通工具
        /// </summary>
        public string traffictool { get; set; }
        //出发地省市区
        public string province1 { get; set; }
        public string city1 { get; set; }
        public string district1 { get; set; }
        //目的地省市区
        public string province2 { get; set; }
        public string city2 { get; set; }
        public string district2 { get; set; }
        //出发和返回时间
        public string departuretime { get; set; }
        public string returntime { get; set; }
        //出发返回上下午
        public string dapm { get; set; }
        public string rapm { get; set; }
        
       
        
        /// <summary>
        /// 报销总额
        /// </summary>
        public string total { get; set; }
        /// <summary>
        /// 已发生金额
        /// </summary>
        public string consume { get; set; }
       
        

        //报销明细
        public string mingxidata { get; set; }
    }
}