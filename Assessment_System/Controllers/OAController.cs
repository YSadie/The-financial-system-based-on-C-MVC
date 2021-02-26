using Ass.Helper;
using Ass.ORM;
using Assessment_System.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Assessment_System.Controllers
{
    public class OAController : Controller
    {
        //费用报销初始化
        public ActionResult FeiYongBX()
        {
            return View();
        }
        //出差申请页面初始化
        public ActionResult ChuChaiSQ()
        {
            return View();
        }
        //差旅报销页面初始化
        public ActionResult ChaiLvBX()
        {
            return View();
        }
        //审批配置页面初始化
        public ActionResult ApprovalConfig()
        {
            return View();
        }
        //审批页面初始化
        public ActionResult Approval()
        {
            return View();
        }
        //我的审批页面
        public ActionResult ViewApproval()
        {
            return View();
        }


        // GET: OA
        public ActionResult Index()
        {
            return View();
        }


        /// <summary>
        /// 获取出差申请单编号
        /// </summary>
        /// <returns></returns>
        public string gettravelapplication(string account)
        {
            ImMysqlHelper mysqlhelper = new ImMysqlHelper();
            string strwhere = "";
            if (!string.IsNullOrEmpty(account))
            {
                //查询账号权限
                DataTable userDt = mysqlhelper.Select($"select * from userinfo where account='{account}'");
                if (userDt.Rows.Count > 0)
                {
                    strwhere += $" and applicant='{account}'";
                }
            }
            DataTable dt = mysqlhelper.Select($"select * from travelapplication  where isdel = '0'{strwhere}");
            List<Suggest2> suggestList = new List<Suggest2>();
            foreach (DataRow dr in dt.Rows)
            {
                Suggest2 suggest = new Suggest2();
                suggest.id = dr["id"].ToString();      
                suggest.code = dr["code"].ToString();
                suggestList.Add(suggest);
            }
            string josn = JsonConvert.SerializeObject(new { value = suggestList });
            //   string josn = JSONHelper.ObjectToJSON(suggestList);
            return josn;
        }
        /// <summary>
        /// 获取客户信息
        /// </summary>
        /// <returns></returns>
        public string getcustomer()
        {
            ImMysqlHelper mysqlhelper = new ImMysqlHelper();
            DataTable dt = mysqlhelper.Select("select * from customerinfo  where deleted = '0'");
            List<Suggest> suggestList = new List<Suggest>();
            foreach (DataRow dr in dt.Rows)
            {
                Suggest suggest = new Suggest();
                suggest.id = dr["id"].ToString();
                suggest.word = dr["name"].ToString();
                suggest.description = dr["code"].ToString();
                suggestList.Add(suggest);
            }
            string josn = JsonConvert.SerializeObject(new { value = suggestList });
            //   string josn = JSONHelper.ObjectToJSON(suggestList);
            return josn;
        }
        /// <summary>
        /// 获取合同
        /// </summary>
        /// <returns></returns>
        public string getcontract(string account)
        {
            ImMysqlHelper mysqlhelper = new ImMysqlHelper();
            string strwhere = "";
            if (!string.IsNullOrEmpty(account))
            {
                //查询账号权限
                DataTable userDt = mysqlhelper.Select($"select * from userinfo where account='{account}'");
                if (userDt.Rows.Count > 0 && userDt.Rows[0]["canread"].ToString() == "0")
                {
                    strwhere += $" and saler='{account}'";
                }
            }
            DataTable dt = mysqlhelper.Select($"select * from contract  where isdel = '0' {strwhere}");
            List<Suggest> suggestList = new List<Suggest>();
            foreach (DataRow dr in dt.Rows)
            {
                Suggest suggest = new Suggest();
                suggest.id = dr["id"].ToString();
                suggest.word = dr["name"].ToString();
                suggest.description = dr["code"].ToString();
                suggestList.Add(suggest);
            }
            string josn = JsonConvert.SerializeObject(new { value = suggestList });
            return josn;
        }
        /// <summary>
        /// 获取商机
        /// </summary>
        /// <returns></returns>
        public string getchance(string account)
        {
            ImMysqlHelper mysqlhelper = new ImMysqlHelper();
            string strwhere = "";
            if (!string.IsNullOrEmpty(account))
            {
                //查询账号权限
                DataTable userDt = mysqlhelper.Select($"select * from userinfo where account='{account}'");
                if (userDt.Rows.Count > 0 && userDt.Rows[0]["canread"].ToString() == "0")
                {
                    strwhere += $" and saler='{account}'";
                }
            }
            DataTable dt = mysqlhelper.Select($"select * from chance  where deleted = '0' {strwhere}");
            List<Suggest> suggestList = new List<Suggest>();
            foreach (DataRow dr in dt.Rows)
            {
                Suggest suggest = new Suggest();
                suggest.id = dr["id"].ToString();
                suggest.word = dr["name"].ToString();
                suggest.description = dr["code"].ToString();
                suggestList.Add(suggest);
            }
            string josn = JsonConvert.SerializeObject(new { value = suggestList });
            return josn;
        }


        //加载跟踪记录
        public string GetTrack(string code)
        {
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                //跟踪记录
                string sql = $"SELECT * from approvalprocess a where code='{code}' order by recordtime desc";
                DataTable trackDt = mysqlhelper.Select(sql);
                //用户信息
                DataTable dt = mysqlhelper.Select($"select account,realname from userinfo");
                trackDt.Columns.Add("trackinfo", typeof(string));
                trackDt.Columns.Add("showdate", typeof(string));

                foreach (DataRow dr in trackDt.Rows)
                {
                    dr["showdate"] = DateTime.Parse(dr["recordtime"].ToString()).ToString("yyyy-MM-dd");
                    string realename = dt.Select($"account='{dr["account"]}'")[0]["realname"].ToString();
                    if (dr["result"].ToString() == "1")
                    {
                        dr["trackinfo"] = "审批人：<span style='color:#299eed'>" + realename + "</span>；审批时间：<span style='color:#299eed'>" + dr["showdate"].ToString() + "</span>；审批结果：<span style='color:#4ec757'>" + "审批通过" + "</span>；备注：<span style='color:#299eed'>" + dr["note"].ToString() + "</span>";
                    }
                    else if (dr["result"].ToString() == "2")
                    {
                        dr["trackinfo"] = "审批人：<span style='color:#299eed'>" + realename + "</span>；审批时间：<span style='color:#299eed'>" + dr["showdate"].ToString() + "</span>；审批结果：<span style='color:#D8220A'>" + "审批拒绝" + "</span>；备注：<span style='color:#D8220A'>" + dr["note"].ToString() + "</span>";
                    }
                }


                string josn = JSONHelper.DataTableJson(trackDt);
                return josn;
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);
            }


        }
        public string StepState(string code,string account)
        {

            ImMysqlHelper mysqlhelper = new ImMysqlHelper();

            DataTable rank = mysqlhelper.Select($"SELECT MAX(approvalrank) as maxrank FROM approval_config WHERE account='{account}'");
            DataTable if_finish = mysqlhelper.Select($"SELECT IFNULL((SELECT id from approvalprocess where account IN (SELECT DISTINCT approver FROM approval_config WHERE account='{account}' and approvalrank={rank.Rows[0]["maxrank"]}) and code='{code}'),'n') as finish");
            DataTable if_start = mysqlhelper.Select($"SELECT IFNULL((SELECT id from approvalprocess where account IN (SELECT DISTINCT approver FROM approval_config WHERE account='{account}' and approvalrank=1) and code='{code}' limit 1),'n') as start");
            DataTable if_refuse = mysqlhelper.Select($"SELECT IFNULL((SELECT id from approvalprocess where account IN (SELECT DISTINCT approver FROM approval_config WHERE account='{account}') and code='{code}' AND result=2),'n') as refuse");
            StepState step = new Models.StepState();
            step.complete1 = false;
            step.complete2 = false;
            step.complete3 = false;
            step.current1 = false;
            step.current2 = false;
            step.current3 = false;
            step.liuchengnot1 = true;
            step.liuchengnot2 = true;
            step.liuchengnot3 = true;
            if (if_finish.Rows[0]["finish"].Equals("n") && if_start.Rows[0]["start"].Equals("n"))
            {
                step.complete1 = false;
                step.current1 = true;
                step.liuchengnot1 = false;
                step.stepstate = 1;
            }else if (if_finish.Rows[0]["finish"].Equals("n"))
            {
                step.complete1 = true;
                step.liuchengnot1 = false;
                step.current1 = false;
                step.complete2 = true;
                step.liuchengnot2 = false;
                step.current2 = true;
                step.stepstate = 2;
                if (!if_refuse.Rows[0]["refuse"].Equals("n"))
                {
                    step.complete1 = true;
                    step.liuchengnot1 = false;
                    step.current1 = false;
                    step.complete2 = true;
                    step.liuchengnot2 = false;
                    step.current2 = false;
                    step.complete3 = true;
                    step.liuchengnot3 = false;
                    step.current3 = true;
                    step.stepstate = 3;
                }
            }
            else
            {
                step.complete1 = true;
                step.liuchengnot1 = false;
                step.current1 = false;
                step.complete2 = true;
                step.liuchengnot2 = false;
                step.current2 = false;
                step.complete3 = true;
                step.liuchengnot3 = false;
                step.current3 = true;
                step.stepstate = 3;
            }

            string josn = JSONHelper.ObjectToJSON(step);
            return josn;
        }

        /// <summary>
        /// 获取报销单
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string BaoXiaoList(string keywords,string account,string step)
        {
            string strwhere = "";

            if (!string.IsNullOrEmpty(keywords))
            {
                strwhere += $" and (a.code like '%{keywords}%' or a.contract like '%{keywords}%' or a.chance like '%{keywords}%' or a.projectname like '%{keywords}%')";
            }
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();

                DataTable BaoXiaoDt = mysqlhelper.Select($"SELECT a.*,stramount(a.type, a.contract) as conamount,stramount(a.type, a.chance) as chamount,stramount(a.type, a.projectname) as proamount," +
                                                    $"(select name from customerinfo b where b.code=a.customer LIMIT 1) as customername, " +
                                                    $"(select name from chance c where c.code = a.chance LIMIT 1) as chancename," +
                                                    $"(select name from contract d where d.code=a.contract LIMIT 1) as contractname,"+
                                                    $"(select max(approvalrank) from approval_config where account='{account}') as maxrank,"+
                                                    $"(select max(approvalrank) from approvalprocess where code=a.code) AS nowrank," +
                                                    $"(SELECT IFNULL((SELECT id from approvalprocess where account IN (SELECT DISTINCT approver FROM approval_config WHERE account='{account}') and code=a.code AND result=2 LIMIT 1),'0')) AS refuse FROM expenseaccount a where isdel=0 and applicant='{account}'{strwhere} order by recordtime desc"
                                                    );
                BaoXiaoDt.Columns.Add("step", typeof(string));
                BaoXiaoDt.Columns.Add("fail", typeof(string));
                foreach (DataRow dr in BaoXiaoDt.Rows)
                {
                    dr["fail"] = "0";
                    if (dr["nowrank"].ToString() == dr["maxrank"].ToString())
                    {
                        dr["step"] = "3";
                        if (dr["refuse"].ToString() != "0")
                        {
                            dr["fail"] = "1";//表示是否审批被拒，审批失败
                        }
                    }
                    else if (dr["nowrank"].ToString() == "")
                    {
                        dr["step"] = "1";
                    }
                    else
                    {
                        dr["step"] = "2";
                        if (dr["refuse"].ToString() != "0")
                        {
                            dr["step"] = "3";
                            dr["fail"] = "1";//表示是否审批被拒，审批失败
                        }
                    }
                }
                if (BaoXiaoDt.Rows.Count == 0)
                {
                    return "[]";
                }
                if (!string.IsNullOrEmpty(step) && step != "0")
                {
                    DataRow[] rows = BaoXiaoDt.Select($"step='{step}'");
                    if (rows.Length > 0)
                    {
                        DataTable returnDt = BaoXiaoDt.Clone();
                        foreach (DataRow row in rows)
                            returnDt.Rows.Add(row.ItemArray);  // 将DataRow添加到DataTable中  

                        return JSONHelper.DataTableJson(returnDt);
                    }
                    else
                    {
                        return "[]";
                    }
                }
                string josn = JSONHelper.DataTableJson(BaoXiaoDt);
                return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }

        }

        /// <summary>
        ///通过id获取报销单
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string BaoxiaoByID(string id,string account,string code)
        {
            string strwhere = "";
            if (!string.IsNullOrEmpty(id))
            {
                strwhere += $" and id='{id}'";
            }
            if (!string.IsNullOrEmpty(code))
            {
                strwhere += $" and code='{code}'";
            }
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();

                DataTable BaoXiaoDt = mysqlhelper.Select($"SELECT a.*,stramount(a.type, a.contract) as conamount,stramount(a.type, a.chance) as chamount,stramount(a.type, a.projectname) as proamount,"+
                                                    $"(select name from customerinfo b where b.code=a.customer LIMIT 1) as customername, " +
                                                    $"(select name from chance c where c.code = a.chance LIMIT 1) as chancename," +
                                                    $"(select name from contract d where d.code=a.contract LIMIT 1) as contractname FROM expenseaccount a where isdel=0 and applicant='{account}'{ strwhere} order by recordtime desc"                                  
                                                    );
                if (BaoXiaoDt.Rows.Count == 0)
                {
                    return "[]";
                }
                string josn = JSONHelper.DataTableJson(BaoXiaoDt);
                return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }

        }

        /// <summary>
        /// 根据code获取对应的金额
        /// </summary>
        public string BaoxiaobyCode(string code,string type,string tpcode)
        {
            ImMysqlHelper mysqlhelper = new ImMysqlHelper();

            DataTable BaoXiaoDt = mysqlhelper.Select($" SELECT IFNULL(getconsume({type},'{tpcode}'),'0.00') as getconsume,stramount({type},'{tpcode}') as getamount");
            if (BaoXiaoDt.Rows.Count == 0)
            {
                return "[]";
            }


            string josn = JSONHelper.DataTableJson(BaoXiaoDt);
            return josn;


        }


        /// <summary>
        /// 报销明细表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string BaoXiaoMXList(string code,string id)
        {
            string strwhere = "";
            if (!string.IsNullOrEmpty(id))
            {
                strwhere += $" and id='{id}'";
            }
            if (!string.IsNullOrEmpty(code))
            {
                strwhere += $" and code='{code}'";
            }
            
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();

                DataTable MingXiDt = mysqlhelper.Select($" select * from expenseaccount_detail where isdel='0'{strwhere} order by expensetime desc");
                if (MingXiDt.Rows.Count == 0)
                {
                    return "[]";
                }
                string josn = JSONHelper.DataTableJson(MingXiDt);
                return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }

        }

        /// <summary>
        /// 根据code获取对应的明细
        /// </summary>
        public string BaoxiaomxbyID(string id)
        {
            ImMysqlHelper mysqlhelper = new ImMysqlHelper();
            string strwhere = $" and id='{id}' ";
           
            DataTable MingXiDt = mysqlhelper.Select($" select * from expenseaccount_detail where isdel='0' {strwhere} order by expensetime desc");
            if (MingXiDt.Rows.Count == 0)
            {
                return "[]";
            }


            string josn = JSONHelper.DataTableJson(MingXiDt);
            return josn;


        }

        /// <summary>
        /// 保存报销单
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddBaoXiaoDan(BaoXiao baoxiao)
        {
            
            try
            {
                string mxnull = "0";
                if (baoxiao.mingxidata.Length == 2)
                {
                    mxnull = "1";
                }
                dynamic json = Newtonsoft.Json.JsonConvert.DeserializeObject(baoxiao.mingxidata);
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                DataTable dt = mysqlhelper.Select($"SELECT id FROM expenseaccount WHERE isdel=0 AND code='{baoxiao.code}'");
                string sql4 = "";
                string sql5 = "";
                if (dt.Rows.Count > 0)
                {
                    if (dt.Rows[0]["id"].ToString() != "")//表示是编辑报销单
                    {
                        sql4 = $"update expenseaccount set isdel = '-1' where id = '{dt.Rows[0]["id"]}'";
                        sql5 = $"DELETE FROM expenseaccount_detail WHERE code='{baoxiao.code}'";
                    }
                    mysqlhelper.Update(sql4);
                    mysqlhelper.Delete(sql5);
                }
                string sql = "";
                string sql1 = "INSERT INTO `webassessment`.`expenseaccount`(`code`, `type`, `contract`, `chance`, `projectname`, `applicant`, `department`, `customer`, `total`, `consume`, `reason`, `recordtime`,`state`,`isdel`) " +
                                                $"VALUES('{baoxiao.code}', '{baoxiao.type}', '{baoxiao.contract}', '{baoxiao.chance}', '{baoxiao.projectname}', '{baoxiao.applicant}', '{baoxiao.department}','{baoxiao.customer}','{baoxiao.total}','{baoxiao.consume}','{baoxiao.reason}','{baoxiao.recordtime}','0','0')";
                if (mxnull.Equals("0"))
                {
                    string sql2= "INSERT INTO `webassessment`.`expenseaccount_detail`(`code`, `expensetime`, `amount`, `costtype`, `docunm`, `note`,`isdel`) " +
                                                $"VALUES";
                    string sql3 = "";
                    foreach (var m in json)
                    {
                        if (m.flag == "0")
                        {
                            sql2 += $"('{m.code.ToString()}', '{m.expensetime.ToString()}', '{m.amount.ToString()}', '{m.costtype.ToString()}', '{m.docunm.ToString()}', '{m.note.ToString()}', '0'),";
                        }

                        if (m.flag == "1")
                        {
                            sql3 = $"update expenseaccount_detail set isdel = '-1' where id = '{m.id}'";
                        }
                    }
                    sql2 = sql2.Substring(0, sql2.Length - 1);
                    sql = sql1 + ";" + sql2;
                    mysqlhelper.Transaction(sql);
                    if (sql3 != "")
                    {
                        mysqlhelper.Update(sql3);
                    }
                }
                else
                {
                    mysqlhelper.Insert(sql1);
                }
                

                return JSONHelper.JsonCodeResult("0", "保存成功!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);
            }

        }


        /// <summary>
        /// 保存新增报销明细
        /// </summary>
        /// <returns></returns>
        //public string AddMingXi(BaoXiao_Detail baoxiaod)
        //{
        //    try
        //    {
        //        ImMysqlHelper mysqlhelper = new ImMysqlHelper();
        //        string sql = "INSERT INTO `webassessment`.`expenseaccount_detail`(`code`, `expensetime`, `amount`, `costtype`, `docunm`, `note`,`isdel`) " +
        //                                        $"VALUES('{baoxiaod.code}', '{baoxiaod.expensetime}', '{baoxiaod.amount}', '{baoxiaod.costtype}', '{baoxiaod.docunm}','{baoxiaod.note}','0')";
        //        mysqlhelper.Insert(sql);
        //        return JSONHelper.JsonCodeResult("0", "保存成功!");
        //    }
        //    catch (Exception er)
        //    {
        //        return JSONHelper.JsonCodeResult("-1", er.Message);
        //    }

        //}

        //删除报销单
        public string DelBaoXiao(string id,string code)
        {
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                string sql = $"CALL delbaoxiao('{id}')";    
                mysqlhelper.Update(sql);
                string sql2 = "";
                DataTable dt = mysqlhelper.Select($"SELECT id FROM approvalprocess WHERE code='{code}'");
                if (dt.Rows.Count > 0)
                {
                    if (dt.Rows[0]["id"].ToString() != "")
                    {
                        sql2 = $"DELETE FROM approvalprocess WHERE code='{code}'";
                    }
                    mysqlhelper.Delete(sql2);
                }
                return JSONHelper.JsonCodeResult("0", "作废成功!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);

            }
        }
        //删除报销明细表
        //public string DelMingXi(string id)
        //{
        //    try
        //    {
        //        ImMysqlHelper mysqlhelper = new ImMysqlHelper();
        //        string sql = $"update expenseaccount_detail set isdel='-1' where id='{id}'";
        //        mysqlhelper.Update(sql);
        //        return JSONHelper.JsonCodeResult("0", "作废成功!");
        //    }
        //    catch (Exception er)
        //    {
        //        return JSONHelper.JsonCodeResult("-1", er.Message);

        //    }
        //}



        /// <summary>
        /// 获取出差申请单
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string ChuChaiSQList(string id,string keywords,string account,string step,string code)
        {
            string strwhere = "";
            if (!string.IsNullOrEmpty(id))
            {
                strwhere += $" and id='{id}'";
            }
            if (!string.IsNullOrEmpty(code))
            {
                strwhere += $" and code='{code}'";
            }
            if (!string.IsNullOrEmpty(keywords))
            {
                strwhere += $" and (a.code like '%{keywords}%' or a.contract like '%{keywords}%' or a.chance like '%{keywords}%' or a.projectname like '%{keywords}%')";
            }
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();

                DataTable ChuChaiDt = mysqlhelper.Select($"SELECT a.*," +
                                                    $"(select name from customerinfo b where b.code=a.customer LIMIT 1) as customername, " +
                                                    $"(select name from chance c where c.code = a.chance LIMIT 1) as chancename," +
                                                    $"(select name from contract d where d.code=a.contract LIMIT 1) as contractname," +
                                                    $"(select max(approvalrank) from approval_config where account='{account}') as maxrank," +
                                                    $"(select max(approvalrank) from approvalprocess where code=a.code) AS nowrank," +
                                                    $"(SELECT IFNULL((SELECT id from approvalprocess where account IN (SELECT DISTINCT approver FROM approval_config WHERE account='{account}') and code=a.code AND result=2 limit 1),'0')) AS refuse from travelapplication a where isdel =0 and applicant='{account}'{strwhere} order by recordtime desc");
                ChuChaiDt.Columns.Add("step", typeof(string));
                ChuChaiDt.Columns.Add("fail", typeof(string));
                foreach (DataRow dr in ChuChaiDt.Rows)
                {
                    dr["fail"] = "0";
                    if (dr["nowrank"].ToString() == dr["maxrank"].ToString())
                    {
                        dr["step"] = "3";
                        if (dr["refuse"].ToString() != "0")
                        {
                            dr["fail"] = "1";//表示是否审批被拒，审批失败
                        }
                    }
                    else if (dr["nowrank"].ToString() == "")
                    {
                        dr["step"] = "1";
                    }
                    else
                    {
                        dr["step"] = "2";
                        if (dr["refuse"].ToString() != "0")//refuse为0表示未被拒绝，不为0时有拒绝审批的记录存在
                        {
                            dr["step"] = "3";
                            dr["fail"] = "1";//fail为1表示申请失败，申请结束，fail为0表示未被拒绝
                        }
                    }
                }
                if (ChuChaiDt.Rows.Count == 0)
                {
                    return "[]";
                }
                if (!string.IsNullOrEmpty(step) && step != "0")
                {
                    DataRow[] rows = ChuChaiDt.Select($"step='{step}'");
                    if (rows.Length > 0)
                    {
                        DataTable returnDt = ChuChaiDt.Clone();
                        foreach (DataRow row in rows)
                            returnDt.Rows.Add(row.ItemArray);  // 将DataRow添加到DataTable中  

                        return JSONHelper.DataTableJson(returnDt);
                    }
                    else
                    {
                        return "[]";
                    }
                }
               
                string josn = JSONHelper.DataTableJson(ChuChaiDt);
                return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }

        }
        //删除出差申请单
        public string DelChuChaiSQ(string id,string code)
        {
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                string sql = $"update travelapplication set isdel='-1' where id='{id}'";
                mysqlhelper.Update(sql);
                string sql2 = "";
                DataTable dt = mysqlhelper.Select($"SELECT id FROM approvalprocess WHERE code='{code}'");
                if (dt.Rows.Count > 0)
                {
                    if (dt.Rows[0]["id"].ToString() != "")
                    {
                        sql2 = $"DELETE FROM approvalprocess WHERE code='{code}'";
                    }
                    mysqlhelper.Delete(sql2);
                }
                return JSONHelper.JsonCodeResult("0", "作废成功!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);

            }
        }
        /// <summary>
        /// 保存出差申请单
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddChuChaiSQ(ChuChaiSQ chuchaisq)
        {

            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                DataTable dt = mysqlhelper.Select($"SELECT id FROM travelapplication WHERE isdel=0 AND code='{chuchaisq.code}'");
                string sql2 = "";
                if (dt.Rows.Count > 0)
                {
                    if (dt.Rows[0]["id"].ToString() != "")//表示是编辑操作
                    {
                        sql2 = $"update travelapplication set isdel = '-1' where id = '{dt.Rows[0]["id"]}'";
                    }
                    mysqlhelper.Update(sql2);
                }
                string sql = "INSERT INTO `webassessment`.`travelapplication`(`code`, `department`, `type`, `contract`, `chance`, `projectname`,`customer`, `applicant`, `traveler`, `reason`, `recordtime`,`traffictool`, `origin`, `destination`,`departuretime`,`dapm`,`returntime`,`rapm`,`state`,`isdel`) " +
                                                $"VALUES('{chuchaisq.code}', '{chuchaisq.department}', '{chuchaisq.type}', '{chuchaisq.contract}', '{chuchaisq.chance}', '{chuchaisq.projectname}','{chuchaisq.customer}', '{chuchaisq.applicant}','{chuchaisq.traveler}','{chuchaisq.reason}','{chuchaisq.recordtime}','{chuchaisq.traffictool}',concat('{chuchaisq.province1}',',','{chuchaisq.city1}',',','{chuchaisq.district1}'),concat('{chuchaisq.province2}',',','{chuchaisq.city2}',',','{chuchaisq.district2}'),'{chuchaisq.departuretime}','{chuchaisq.dapm}','{chuchaisq.returntime}','{chuchaisq.rapm}','0','0')";
                mysqlhelper.Insert(sql);
                return JSONHelper.JsonCodeResult("0", "保存成功!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);
            }

        }




        /// <summary>
        /// 获取差旅报销单
        /// </summary>
        /// <returns></returns> 
        [HttpPost]
        public string ChaiLvList(string keywords,string id,string account,string step,string code)
        {
            string strwhere = "";
            if (!string.IsNullOrEmpty(id))
            {
                strwhere += $" and id='{id}'";
            }
            if (!string.IsNullOrEmpty(code))
            {
                strwhere += $" and code='{code}'";
            }
            if (!string.IsNullOrEmpty(keywords))
            {
                strwhere += $" and (a.code like '%{keywords}%' or a.contract like '%{keywords}%' or a.chance like '%{keywords}%' or a.projectname like '%{keywords}%')";
            }
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();

                DataTable BaoXiaoDt = mysqlhelper.Select($"SELECT a.*,stramount(a.type, a.contract) as conamount,stramount(a.type, a.chance) as chamount,stramount(a.type, a.projectname) as proamount," +
                                                    $"(select name from customerinfo b where b.code=a.customer LIMIT 1) as customername, " +
                                                    $"(select name from chance c where c.code = a.chance LIMIT 1) as chancename," +
                                                    $"(select name from contract d where d.code=a.contract LIMIT 1) as contractname,"+
                                                    $"(select max(approvalrank) from approval_config where account='{account}') as maxrank," +
                                                    $"(select max(approvalrank) from approvalprocess where code=a.code) AS nowrank," +
                                                    $"(SELECT IFNULL((SELECT id from approvalprocess where account IN (SELECT DISTINCT approver FROM approval_config WHERE account='{account}') and code=a.code AND result=2 limit 1),'0')) AS refuse FROM travleaccount a where isdel=0 and applicant='{account}'{ strwhere} order by recordtime desc"
                                                    );
                BaoXiaoDt.Columns.Add("step", typeof(string));
                BaoXiaoDt.Columns.Add("fail", typeof(string));
                foreach (DataRow dr in BaoXiaoDt.Rows)
                {
                    dr["fail"] = "0";
                    if (dr["nowrank"].ToString() == dr["maxrank"].ToString())
                    {
                        dr["step"] = "3";
                        if (dr["refuse"].ToString() != "0")
                        {
                            dr["fail"] = "1";//表示是否审批被拒，审批失败
                        }
                    }
                    else if (dr["nowrank"].ToString() == "")
                    {
                        dr["step"] = "1";
                    }
                    else
                    {
                        dr["step"] = "2";
                        if (dr["refuse"].ToString() != "0")//refuse为0表示未被拒绝，不为0时有拒绝审批的记录存在
                        {
                            dr["step"] = "3";
                            dr["fail"] = "1";
                        }
                    }
                }
                if (BaoXiaoDt.Rows.Count == 0)
                {
                    return "[]";
                }
                if (!string.IsNullOrEmpty(step) && step != "0")
                {
                    DataRow[] rows = BaoXiaoDt.Select($"step='{step}'");
                    if (rows.Length > 0)
                    {
                        DataTable returnDt = BaoXiaoDt.Clone();
                        foreach (DataRow row in rows)
                            returnDt.Rows.Add(row.ItemArray);  // 将DataRow添加到DataTable中  

                        return JSONHelper.DataTableJson(returnDt);
                    }
                    else
                    {
                        return "[]";
                    }
                }
                
                string josn = JSONHelper.DataTableJson(BaoXiaoDt);
                return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }

        }
        //删除差旅报销单
        public string DelChaiLvBX(string id,string code)
        {
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                string sql = $"CALL delchailv('{id}')";
                mysqlhelper.Update(sql);
                string sql2 = "";
                DataTable dt = mysqlhelper.Select($"SELECT id FROM approvalprocess WHERE code='{code}'");
                if (dt.Rows.Count > 0)
                {
                    if (dt.Rows[0]["id"].ToString() != "")
                    {
                        sql2 = $"DELETE FROM approvalprocess WHERE code='{code}'";
                    }
                    mysqlhelper.Delete(sql2);
                }
                return JSONHelper.JsonCodeResult("0", "作废成功!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);

            }
        }

        /// <summary>
        /// 差旅报销明细表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string ChaiLvMXList(string code,string id)
        {
            string strwhere = "";
            if (!string.IsNullOrEmpty(id))
            {
                strwhere += $" and id='{id}'";
            }
            if (!string.IsNullOrEmpty(code))
            {
                strwhere += $" and code='{code}'";
            }

            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();

                DataTable MingXiDt = mysqlhelper.Select($"select * from travelaccount_detail where isdel='0'{strwhere} order by expensetime desc");
                if (MingXiDt.Rows.Count == 0)
                {
                    return "[]";
                }
                string josn = JSONHelper.DataTableJson(MingXiDt);
                return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }

        }
        /// <summary>
        /// 差旅报销根据code获取对应的金额
        /// </summary>
        public string ChaiLvBXbyCode(string code, string type, string tpcode)
        {
            ImMysqlHelper mysqlhelper = new ImMysqlHelper();

            DataTable BaoXiaoDt = mysqlhelper.Select($" SELECT IFNULL(chailvconsume({type},'{tpcode}'),'0.00') as getconsume,IFNULL(stramount({type},'{tpcode}'),'0.00') as getamount");
            if (BaoXiaoDt.Rows.Count == 0)
            {
                return "[]";
            }


            string josn = JSONHelper.DataTableJson(BaoXiaoDt);
            return josn;


        }
        /// <summary>
        /// 保存差旅报销单
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddChaiLvBX(ChaiLvBX chailvbx)
        {

            try
            {
                string mxnull = "0";
                if (chailvbx.mingxidata.Length == 2)
                {
                    mxnull = "1";
                }
                dynamic json = Newtonsoft.Json.JsonConvert.DeserializeObject(chailvbx.mingxidata);

                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                string sql = "";
                DataTable dt = mysqlhelper.Select($"SELECT id FROM travleaccount WHERE isdel=0 AND code='{chailvbx.code}'");
                string sql4 = "";
                string sql5 = "";
                if (dt.Rows.Count > 0)
                {
                    if (dt.Rows[0]["id"].ToString() != "")//表示是编辑报销单
                    {
                        sql4 = $"update travleaccount set isdel = '-1' where id = '{dt.Rows[0]["id"]}'";
                        sql5 = $"DELETE FROM travelaccount_detail WHERE code='{chailvbx.code}'";
                    }
                    mysqlhelper.Update(sql4);
                    mysqlhelper.Delete(sql5);
                }
                string sql1 = "INSERT INTO `webassessment`.`travleaccount`(`code`,`travelapplication`,`department`, `type`, `contract`, `chance`, `projectname`, `customer`, `applicant`, `reason`, `recordtime`,`traffictool`, `origin`, `destination`,`departuretime`,`dapm`,`returntime`,`rapm`,`total`,`consume`,`state`,`isdel`) " +
                                                $"VALUES('{chailvbx.code}','{chailvbx.travelapplication}', '{chailvbx.department}', '{chailvbx.type}', '{chailvbx.contract}', '{chailvbx.chance}', '{chailvbx.projectname}','{chailvbx.customer}', '{chailvbx.applicant}','{chailvbx.reason}','{chailvbx.recordtime}','{chailvbx.traffictool}',concat('{chailvbx.province1}',',','{chailvbx.city1}',',','{chailvbx.district1}'),concat('{chailvbx.province2}',',','{chailvbx.city2}',',','{chailvbx.district2}'),'{chailvbx.departuretime}','{chailvbx.dapm}','{chailvbx.returntime}','{chailvbx.rapm}','{chailvbx.total}','{chailvbx.consume}','0','0')";
                if (mxnull.Equals("0"))
                {
                    string sql2 = "INSERT INTO `webassessment`.`travelaccount_detail`(`code`, `expensetime`, `costtype`, `docunm`, `note`, `transportation`, `urbantransportation`, `accommodation`, `totalamount`,`isdel`) " +
                                                $"VALUES";
                    string sql3 = "";
                    foreach (var m in json)
                    {
                        if (m.flag == "0")
                        {
                            sql2 += $"('{m.code.ToString()}', '{m.expensetime.ToString()}', '{m.costtype.ToString()}', '{m.docunm.ToString()}', '{m.note.ToString()}', '{m.transportation.ToString()}', '{m.urbantransportation.ToString()}', '{m.accommodation.ToString()}', '{m.totalamount.ToString()}', '0'),";
                        }

                        if (m.flag == "1")
                        {
                            sql3 = $"update travelaccount_detail set isdel = '-1' where id = '{m.id}'";
                        }
                    }
                    sql2 = sql2.Substring(0, sql2.Length - 1);
                    sql = sql1 + ";" + sql2;
                    mysqlhelper.Transaction(sql);
                    if (sql3 != "")
                    {
                        mysqlhelper.Update(sql3);
                    }
                }
                else
                {
                    mysqlhelper.Insert(sql1);
                }
                
                return JSONHelper.JsonCodeResult("0", "保存成功!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);
            }

        }


        /// <summary>
        /// 获取用户列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string UserList()
        {
            
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();

                DataTable UserDt = mysqlhelper.Select($"SELECT * from userinfo  where isdel =0");
                if (UserDt.Rows.Count == 0)
                {
                    return "[]";
                }
                string josn = JSONHelper.DataTableJson(UserDt);
                return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }

        }
        /// <summary>
        /// 保存审批配置
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddApprovalConfig(ApprovalConfig config)
        {
            try
            {
                dynamic json = Newtonsoft.Json.JsonConvert.DeserializeObject(config.approvalconfig);
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                string sql = "";
                string sql1 = "";
                string sql2 = "INSERT INTO `webassessment`.`approval_config`(`account`, `approvalrank`, `approver`, `type`) VALUES";
                string sql3 = "INSERT INTO `webassessment`.`approval_config`(`account`, `approvalrank`, `approver`, `type`) VALUES";
                string sql4 = "INSERT INTO `webassessment`.`approval_config`(`account`, `approvalrank`, `approver`, `type`) VALUES";
                foreach (var m in json)
                {
                    sql1 = $"DELETE FROM approval_config where account='{m.account.ToString()}'";
                    mysqlhelper.Delete(sql1);
                    sql2 += $"('{m.account.ToString()}', '{m.rank.ToString()}', '{m.approver.ToString()}', '1'),";
                    sql3 += $"('{m.account.ToString()}', '{m.rank.ToString()}', '{m.approver.ToString()}', '2'),";
                    sql4 += $"('{m.account.ToString()}', '{m.rank.ToString()}', '{m.approver.ToString()}', '3'),";
                }
                sql2 = sql2.Substring(0, sql2.Length - 1);
                sql3 = sql3.Substring(0, sql3.Length - 1);
                sql4 = sql4.Substring(0, sql4.Length - 1);
                sql = sql2 + ";" + sql3 + ";" + sql4;
                mysqlhelper.Insert(sql);
                return JSONHelper.JsonCodeResult("0", "保存成功!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);
            }

        }
        //获取审批配置列表
        [HttpPost]
        public string getApprovalConfig(string realname)
        {
            string strwhere = "";
            if (!string.IsNullOrEmpty(realname))
            {
                strwhere += $" where account=(SELECT account FROM userinfo WHERE realname='{realname}')";
            }
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();

                DataTable Dt = mysqlhelper.Select($"SELECT DISTINCT getRealname(account) AS realname,approverRank (account,1) AS rank1,approverRank(account,2) AS rank2,approverRank(account,3) AS rank3,approverRank(account,4) AS rank4 FROM approval_config{strwhere}");

                if (Dt.Rows.Count == 0)
                {
                    return "[]";
                }
          
                string josn = JSONHelper.DataTableJson(Dt);
                return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }
        }       
        //删除审批配置
        public string delApprovalConfig(string name)
        {
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                string sql = $"DELETE FROM approval_config WHERE account=(SELECT account FROM userinfo WHERE realname='{name}')";
                mysqlhelper.Delete(sql);
                return JSONHelper.JsonCodeResult("0", "作废成功!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);

            }
        }
        //编辑审批配置
        public string editApprovalConfig(string name)
        {
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                DataTable Dt = mysqlhelper.Select($"SELECT getRealname(account) AS account,approvalrank,getRealname(approver) AS approver,type FROM approval_config WHERE account=(SELECT account FROM userinfo WHERE realname='{name}')");
                if (Dt.Rows.Count == 0)
                {
                    return "[]";
                }

                string josn = JSONHelper.DataTableJson(Dt);
                return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }
        }





        /// <summary>
        /// 获取审批单列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string ApprovalList(string id, string keywords,string account,string state,string type)
        {
            string strwhere = "";
            if (!string.IsNullOrEmpty(id))
            {
                strwhere += $" and id='{id}'";
            }
            if (!string.IsNullOrEmpty(keywords))
            {
                strwhere += $" and (code like '%{keywords}%')";
            }
            try
            {
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();

                DataTable ApprovalDt = mysqlhelper.Select($"SELECT id,code,(SELECT realname FROM userinfo WHERE account=applicant) AS applicant,applicant as account,isdel,recordtime,state,'1' AS approvaltype,(SELECT getrank(applicant,'{account}',1)) AS approvalrank,(SELECT IFNULL(passrank(code),0)) AS passrank FROM expenseaccount WHERE isdel=0 and applicant in (SELECT DISTINCT account FROM approval_config WHERE approver='{account}') UNION SELECT id,code,(SELECT realname FROM userinfo WHERE account=applicant) AS applicant,applicant as account,isdel,recordtime,state,'2' AS approvaltype,(SELECT getrank(applicant,'{account}',2)) AS approvalrank,(SELECT IFNULL(passrank(code),0)) AS passrank FROM travelapplication WHERE isdel=0 and applicant in (SELECT DISTINCT account FROM approval_config WHERE approver='{account}') UNION SELECT id,code,(SELECT realname FROM userinfo WHERE account=applicant) AS applicant,applicant as account,isdel,recordtime,state,'3' AS approvaltype,(SELECT getrank(applicant,'{account}',3)) AS approvalrank,(SELECT IFNULL(passrank(code),0)) AS passrank FROM travleaccount WHERE isdel=0 and applicant in (SELECT DISTINCT account FROM approval_config WHERE approver='{account}')");
                if (ApprovalDt.Rows.Count == 0)
                {
                    return "[]";
                }
                if (!string.IsNullOrEmpty(state) && state != "-1" && !string.IsNullOrEmpty(type) && type != "0")
                {
                    DataRow[] r1 = ApprovalDt.Select($"((approvalrank='1' and passrank='0') or convert(approvalrank,'System.Int32')=convert(passrank,'System.Int32')+1 or convert(approvalrank,'System.Int32')<=convert(passrank,'System.Int32')) and state='{state}' and approvaltype='{type}'");
                    if (r1.Length > 0)
                    {
                        DataTable returnDt1 = ApprovalDt.Clone();
                        foreach (DataRow row in r1)
                            returnDt1.Rows.Add(row.ItemArray);  // 将DataRow添加到DataTable中  

                        return JSONHelper.DataTableJson(returnDt1);
                    }
                    else
                    {
                        return "[]";
                    }
                }
                if (!string.IsNullOrEmpty(state) && state != "-1")
                {
                    DataRow[] r1 = ApprovalDt.Select($"((approvalrank='1' and passrank='0') or convert(approvalrank,'System.Int32')=convert(passrank,'System.Int32')+1 or convert(approvalrank,'System.Int32')<=convert(passrank,'System.Int32')) and state='{state}'");
                    if (r1.Length > 0)
                    {
                        DataTable returnDt1 = ApprovalDt.Clone();
                        foreach (DataRow row in r1)
                            returnDt1.Rows.Add(row.ItemArray);  // 将DataRow添加到DataTable中  

                        return JSONHelper.DataTableJson(returnDt1);
                    }
                    else
                    {
                        return "[]";
                    }
                }
                if (!string.IsNullOrEmpty(type) && type != "0")
                {
                    DataRow[] r2 = ApprovalDt.Select($"((approvalrank='1' and passrank='0') or convert(approvalrank,'System.Int32')=convert(passrank,'System.Int32')+1 or convert(approvalrank,'System.Int32')<=convert(passrank,'System.Int32')) and approvaltype='{type}'");
                    if (r2.Length > 0)
                    {
                        DataTable returnDt2 = ApprovalDt.Clone();
                        foreach (DataRow row in r2)
                            returnDt2.Rows.Add(row.ItemArray);  // 将DataRow添加到DataTable中  

                        return JSONHelper.DataTableJson(returnDt2);
                    }
                    else
                    {
                        return "[]";
                    }
                }
                
                DataRow[] rows = ApprovalDt.Select($"(approvalrank='1' and passrank='0') or convert(approvalrank,'System.Int32')=convert(passrank,'System.Int32')+1 or convert(approvalrank,'System.Int32')<=convert(passrank,'System.Int32')");
                if (rows.Length > 0)
                {
                    DataTable returnDt = ApprovalDt.Clone();
                    foreach (DataRow row in rows)
                        returnDt.Rows.Add(row.ItemArray);
                    string josn = JSONHelper.DataTableJson(returnDt);
                    return josn;
                }
                else
                {
                    return "[]";
                }
                //string josn = JSONHelper.DataTableJson(ApprovalDt);
                //return josn;
            }
            catch (Exception er)
            {
                return er.Message;
            }

        }
        /// <summary>
        /// 审批通过更新state
        /// </summary>
        /// <returns></returns>
        public string PassApproval(string id,int approvaltype,string account,string rank,string recordtime,string code)
        {
            try
            {
                string sql="";
                string sql2 = "";
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                if(approvaltype==1)
                {
                    sql += $"update expenseaccount set state='1' where id='{id}'";
                }
                if (approvaltype == 2)
                {
                    sql += $"update travelapplication set state='1' where id='{id}'";
                }
                if (approvaltype == 3)
                {
                    sql += $"update travleaccount set state='1' where id='{id}'";
                }
                DataTable dt = mysqlhelper.Select($"SELECT IFNULL((SELECT id FROM approvalprocess WHERE code='{code}' AND account='{account}'),'null') as exist");
                if (dt.Rows[0]["exist"].ToString() == "null")
                {
                    sql2 = "INSERT INTO `webassessment`.`approvalprocess`(`type`, `code`, `account`,`approvalrank`, `recordtime`,`result`,`note`) " +
                             $"VALUES('{approvaltype}', '{code}', '{account}', '{rank}', '{recordtime}', '1','')";
                }
                else
                {
                    return JSONHelper.JsonCodeResult("-1", "不可重复操作!");
                }
                
                mysqlhelper.Update(sql);
                mysqlhelper.Insert(sql2);
                return JSONHelper.JsonCodeResult("0", "审批通过!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);

            }
        }
        /// <summary>
        /// 审批拒绝更新state
        /// </summary>
        /// <returns></returns>
        public string RefuseApproval(string id,int approvaltype, string account,string rank,string recordtime,string code,string note)
        {
            try
            {
                string sql = "";
                string sql2 = "";
                ImMysqlHelper mysqlhelper = new ImMysqlHelper();
                if (approvaltype == 1)
                {
                    sql += $"update expenseaccount set state='2' where id='{id}'";
                }
                if (approvaltype == 2)
                {
                    sql += $"update travelapplication set state='2' where id='{id}'";
                }
                if (approvaltype == 3)
                {
                    sql += $"update travleaccount set state='2' where id='{id}'";
                }
                DataTable dt = mysqlhelper.Select($"SELECT IFNULL((SELECT id FROM approvalprocess WHERE code='{code}' AND account='{account}'),'null') as exist");
                if (dt.Rows[0]["exist"].ToString() == "null")
                {
                    sql2 = "INSERT INTO `webassessment`.`approvalprocess`(`type`, `code`, `account`,`approvalrank`, `recordtime`,`result`,`note`) " +
                             $"VALUES('{approvaltype}', '{code}', '{account}', '{rank}', '{recordtime}', '2','{note}')";
                }
                else
                {
                    return JSONHelper.JsonCodeResult("-1", "不可重复操作!");
                }
                mysqlhelper.Update(sql);
                mysqlhelper.Insert(sql2);
                return JSONHelper.JsonCodeResult("0", "审批拒绝!");
            }
            catch (Exception er)
            {
                return JSONHelper.JsonCodeResult("-1", er.Message);

            }
        }


       

    }
}