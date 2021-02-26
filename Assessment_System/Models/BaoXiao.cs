using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assessment_System.Models
{
    public class BaoXiao
    {
        /// <summary>
        /// 单据编号
        /// </summary>
        public string code { get; set; }
        /// <summary>
        /// 报销类型
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
        /// 合同金额
        /// </summary>
        public string amount { get; set; }
        /// <summary>
        /// 申请人
        /// </summary>
        public string applicant { get; set; }
        /// <summary>
        /// 所属部门
        /// </summary>
        public string department { get; set; }
        /// <summary>
        /// 客户名称
        /// </summary>
        public string customer { get; set; }
        /// <summary>
        /// 报销总额
        /// </summary>
        public string total{ get; set; }
        /// <summary>
        /// 已发生金额
        /// </summary>
        public string consume { get; set; }
        /// <summary>
        /// 事由
        /// </summary>
        public string reason { get; set; }
        /// <summary>
        /// 申请时间
        /// </summary>
        public string recordtime { get; set; }

        //报销明细
        public string mingxidata { get; set; }
    }
}