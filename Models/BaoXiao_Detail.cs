using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assessment_System.Models
{
    public class BaoXiao_Detail
    {
        /// <summary>
        /// 单据编号
        /// </summary>
        public string code { get; set; }

        /// <summary>
        /// 报销日期
        /// </summary>
        public string expensetime { get; set; }

        /// <summary>
        /// 报销金额
        /// </summary>
        public string amount { get; set; }

        /// <summary>
        /// 费用类型
        /// </summary>
        public string costtype { get; set; }

        /// <summary>
        /// 单据张数
        /// </summary>
        public string docunm { get; set; }

        /// <summary>
        /// 备注信息
        /// </summary>
        public string note { get; set; }
    }
}