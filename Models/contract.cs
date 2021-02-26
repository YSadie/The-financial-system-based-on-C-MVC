using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assessment_System.Models
{
    public class Contract
    {
        public string id { get; set; }
        public string customer { get; set; }
        public string chance { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string customer_signing { get; set; }
        public string template { get; set; }
        public string contractform { get; set; }
        public string purchaseway { get; set; }
        public string amount { get; set; }
        public string freeservice { get; set; }
        public string margin { get; set; }
        public string signingdate { get; set; }
        public string situation { get; set; }
        public string isdel { get; set; }
        public string recorder { get; set; }
        public string recordtime { get; set; }

    }
}