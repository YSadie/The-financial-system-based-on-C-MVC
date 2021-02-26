using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assessment_System.Models
{
    public class Chance
    {
        /// <summary>
        /// 商机编码
        /// </summary>
        public string code { get; set; }
        /// <summary>
        /// 原商机编码
        /// </summary>
        public string ycode { get; set; }
        /// <summary>
        /// 客户
        /// </summary>
        public string customer { get; set; }


        public string name { get; set; }
        public string type { get; set; }
        public string source { get; set; }
        public string successrate { get; set; }
        public string budget { get; set; }
        public string purchase { get; set; }
        public string prestatementtime { get; set; }
        public string content { get; set; }
        public string product { get; set; }
        public string saler { get; set; }

    }
}