using Ass.Helper;
using Ass.ORM;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Assessment_System.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {

            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult desktop()
        {
            return View();
        }
        [HttpPost]
        public string Login(string yonghu, string psw)
        {
            ImMysqlHelper mysqlhelp = new ImMysqlHelper();
            DataTable dt = mysqlhelp.Select($"select * from userinfo where account='{yonghu}' and pwd='{psw}' and isdel='0'");


            if (dt.Rows.Count > 0)
            {
                string userjosn = JSONHelper.DataTableJson(dt);



                return JSONHelper.JsonCodeResult("0", userjosn);

            }
            else
            {
                return JSONHelper.JsonCodeResult("-1", "账号或密码错误");

            }
        }


    }
}