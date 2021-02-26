using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assessment_System.Models
{
    public class ApprovalConfig
    {
        /// <summary>
        /// 用户账号
        /// </summary>
        public string account { get; set; }

        /// <summary>
        /// 审批人等级
        /// </summary>
        public string rank { get; set; }
        //最高等级
        public string maxrank { get; set; }
        /// <summary>
        /// 审批人账号
        /// </summary>
        public string approver { get; set; }

        /// <summary>
        /// 报销类型
        /// </summary>
        public string type { get; set; }

        //审批配置的json数据
        public string approvalconfig { get; set; }
    }
}