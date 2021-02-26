using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Web.Script.Serialization;
using System.Runtime.Serialization.Json;

//using System.Web.Script.Serialization;

namespace Ass.Helper
{
    /// <summary>
    /// JSONSerializer 的摘要说明
    /// </summary>
    public class JSONHelper
    {
        public JSONHelper()
        { }

        /// <summary>
        /// DataTable Json序列化
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static string JSONDataTable(DataTable dt, string totalCount = "0")
        {
            if (totalCount == "0")
            {
                totalCount = dt.Rows.Count.ToString();
            }
            StringBuilder _output = new StringBuilder();
            string value = "";
            // _output.Append("{ \"total\":" + totalCount + " ");
            //_output.Append(",\"rows\":[ ");
            _output.Append("[ ");

            if (dt != null && dt.Rows.Count > 0)
            {


                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    _output.Append("{ ");
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        value = dt.Rows[i][j].ToString();
                        value = Convert.ToString(dt.Rows[i][j].ToString()).Replace("\"", "").Replace("{", "").Replace("}", "").Replace("[", "").Replace("]", "").Replace("\\", "").Replace("\r", "").Replace("\n", "").Replace("\0", "");
                        if (j < dt.Columns.Count - 1)
                            _output.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":" + "\"" + value + "\",");
                        //_output.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":" + "\"" + Convert.ToString(dt.Rows[i][j].ToString()).Replace("\"", "").Replace("\r\n", "").Replace("{", "").Replace("}", "").Replace("[", "").Replace("]", "").Replace("\\", "").Replace("\r", "") + "\","); 
                        else if (j == dt.Columns.Count - 1)
                            _output.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":" + "\"" + value + "\"");
                        //_output.Append("\"" + dt.Columns[j].ColumnName.ToString() + "\":" + "\"" + Convert.ToString(dt.Rows[i][j].ToString()).Replace("\"", "").Replace("\r\n", "").Replace("{", "").Replace("}", "").Replace("[", "").Replace("]", "").Replace("\\", "").Replace("\r", "") + "\"");
                    }

                    if (i == dt.Rows.Count - 1)
                        _output.Append("} ");
                    else
                        _output.Append("}, ");
                }
            }
            _output.Append("]");
            //    _output.Append("}");
            return _output.ToString();
        }


        /// <summary>
        /// DataRow[] Json序列化
        /// </summary>
        /// <param name="DataRows"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        public static string JSONDataRows(DataRow[] DataRows, string totalCount = "0")
        {
            if (totalCount == "0")
            {
                totalCount = DataRows.Length.ToString();
            }
            StringBuilder _output = new StringBuilder();
            string value = "";
            _output.Append("[ ");
            if (DataRows != null && DataRows.Length > 0)
            {


                for (int i = 0; i < DataRows.Length; i++)
                {
                    _output.Append("{ ");
                    for (int j = 0; j < DataRows[0].Table.Columns.Count; j++)
                    {
                        value = DataRows[i][j].ToString();
                        value = Convert.ToString(DataRows[i][j].ToString()).Replace("\"", "").Replace("{", "").Replace("}", "").Replace("[", "").Replace("]", "").Replace("\\", "").Replace("\r", "").Replace("\n", "").Replace("\0", "");
                        if (j < DataRows.Length - 1)
                            _output.Append("\"" + DataRows[0].Table.Columns[j].ColumnName.ToString() + "\":" + "\"" + value + "\",");
                        else if (j == DataRows[0].Table.Columns.Count - 1)
                            _output.Append("\"" + DataRows[0].Table.Columns[j].ColumnName.ToString() + "\":" + "\"" + value + "\"");
                    }

                    if (i == DataRows.Length - 1)
                        _output.Append("} ");
                    else
                        _output.Append("}, ");
                }
            }
            _output.Append("]");
            return _output.ToString();
        }

        /// <summary>
        /// DropDnowList Json序列化
        /// </summary>
        /// <param name="dt">表名</param>
        /// <param name="id">编码</param>
        /// <param name="text">内容</param>
        /// <param name="select">第一项是否选中</param>
        /// <returns></returns>
        public static string JSONDropDnowList(DataTable dt, string id, string text, bool selected)
        {
            StringBuilder _output = new StringBuilder();
            _output.Append("[");
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    if (i == 0 && selected == true)
                        _output.Append("{\"id\":\"" + dt.Rows[i][id] + "\",\"text\":\"" + dt.Rows[i][text] + "\",\"selected\":\"true\"},");
                    else
                        _output.Append("{\"id\":\"" + dt.Rows[i][id] + "\",\"text\":\"" + dt.Rows[i][text] + "\"},");
                }
                _output.Remove(_output.Length - 1, 1);
            }

            _output.Append("]");
            return _output.ToString();
        }

        /// <summary>
        /// select标签初始化
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="id"></param>
        /// <param name="text"></param>
        /// <param name="selected"></param>
        /// <returns></returns>
        public static string JSONOptionList(DataTable dt, string id, string text, bool selected)
        {
            StringBuilder _output = new StringBuilder();
            _output.Append("[");
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    if (i == 0 && selected == true)
                        _output.Append("<option \"id\"=\"" + dt.Rows[i][id] + "\"  value=\"" + dt.Rows[i][id] + "\"> " + dt.Rows[i][text] + "</option>");
                    else
                        _output.Append("<option \"id\"=\"" + dt.Rows[i][id] + "\" value=\"" + dt.Rows[i][id] + "\"> " + dt.Rows[i][text] + "</option> ");
                }
                _output.Remove(_output.Length - 1, 1);
            }

            _output.Append("]");
            return _output.ToString();
        }

        /// <summary>
        /// tree Json序列化
        /// </summary>
        /// <param name="dt">表名</param>
        /// <param name="id">编码</param>
        /// <param name="text">名称</param>
        /// <param name="flmc">父类名称</param>
        /// <returns></returns>
        public static string JSONTreeList(DataTable dt, string id, string text, string flmc)
        {
            string iderr = "";
            try
            {

                StringBuilder sbtree = new StringBuilder();
                if (dt.Rows.Count > 0)
                {
                    DataView dv1 = dt.DefaultView;
                    dv1.RowFilter = flmc + "='*'";
                    sbtree.Append("[");
                    for (int i = 0; i < dv1.Count; i++)
                    {
                        DataRow[] drLevel2 = dt.Select(flmc + "='" + dv1[i][id] + "'");
                        sbtree.Append("{\"text\":\"" + dv1[i][text] + "\",\"id\":\"" + dv1[i][id] + "\",");
                        for (int j = 0; j < drLevel2.Length; j++)
                        {
                            if (j == 0)
                            {
                                sbtree.Append("  \"nodes\":[");
                            }
                            iderr = drLevel2[j][id].ToString();
                            sbtree.Append("{\"text\":\"" + drLevel2[j][text] + "\",\"id\":\"" + drLevel2[j][id] + "\"");
                            /********第三层菜单👇***********/
                            DataRow[] drLevel3 = dt.Select(flmc + "='" + dv1[j][id] + "'");
                            for (int k = 0; k < drLevel3.Length; k++)
                            {
                                if (k == 0)
                                {
                                    sbtree.Append("  \"nodes\":[");
                                }
                                sbtree.Append("{\"text\":\"" + drLevel3[k][text] + "\",\"id\":\"" + drLevel3[k][id] + "\"},");
                                if (k == drLevel3.Length - 1)
                                {
                                    sbtree.Remove(sbtree.Length - 1, 1);
                                    sbtree.Append("]},");
                                }

                            }
                            sbtree.Append("},");
                            /********第三层菜单👆***********/

                            if (j == drLevel2.Length - 1)
                            {
                                sbtree.Remove(sbtree.Length - 1, 1);
                                sbtree.Append("]},");
                            }
                        }

                        if (drLevel2.Length == 0)
                        {
                            sbtree.Remove(sbtree.Length - 1, 1);
                            sbtree.Append("},");
                        }
                    }
                    sbtree.Remove(sbtree.Length - 1, 1);
                    sbtree.Append("]");
                }
                return sbtree.ToString();

            }
            catch (Exception er)
            {

                throw new Exception(er.Message);
            }
        }

        /// <summary>
        /// tree Json序列化
        /// </summary>
        /// <param name="dt">表名</param>
        /// <param name="id">编码</param>
        /// <param name="text">名称</param>
        /// <param name="flmc">父类名称</param>
        /// <returns></returns>
        public static string JSONTreeList(DataTable dt, string id, string text, string flmc, string mjpb)
        {
            StringBuilder sbtree = new StringBuilder();
            if (dt.Rows.Count > 0)
            {
                DataView dv = dt.DefaultView;
                dv.RowFilter = flmc + "=0";
                sbtree.Append("[");
                for (int i = 0; i < dv.Count; i++)
                {
                    DataRow[] drs = dt.Select(flmc + "=" + dv[i][id]);
                    if (i == 0)
                    {
                        sbtree.Append("{\"text\":\"" + dv[i][text] + "\",\"state\":\"open\",\"id\":\"" + dv[i][id] + "|" + dv[i][mjpb] + "\",");
                        for (int j = 0; j < drs.Length; j++)
                        {
                            if (j == 0)
                                sbtree.Append("  \"children\":[");
                            sbtree.Append("{\"text\":\"" + drs[j][text] + "\",\"id\":\"" + drs[j][id] + "|" + drs[j][mjpb] + "\"},");
                            if ((j + 1) == drs.Length)
                            {
                                sbtree.Remove(sbtree.Length - 1, 1);
                                sbtree.Append("]},");
                            }
                        }
                    }
                    else
                    {
                        sbtree.Append("{\"text\":\"" + dv[i][text] + "\",\"state\":\"closed\",\"id\":\"" + dv[i][id] + "|" + dv[i][mjpb] + "\",");
                        for (int j = 0; j < drs.Length; j++)
                        {
                            if (j == 0)
                                sbtree.Append("  \"children\":[");
                            sbtree.Append("{\"text\":\"" + drs[j][text] + "\",\"id\":\"" + drs[j][id] + "|" + drs[j][mjpb] + "\"},");
                            if ((j + 1) == drs.Length)
                            {
                                sbtree.Remove(sbtree.Length - 1, 1);
                                sbtree.Append("]},");
                            }
                        }
                    }
                    if (drs.Length == 0)
                    {
                        sbtree.Remove(sbtree.Length - 1, 1);
                        sbtree.Append("},");
                    }
                }
                sbtree.Remove(sbtree.Length - 1, 1);
                sbtree.Append("]");
            }
            return sbtree.ToString();
        }

        /// <summary>
        /// 返回处理结果 json
        /// </summary>
        /// <param name="code">验证码0成功 -1失败</param>
        /// <param name="msg">错误消息</param>
        /// <param name="data">成功的数据或消息</param>
        /// <returns></returns>
        public static string JsonCodeResult(string code, string msg)
        {

            msg = String2Json(msg);//msg.Replace("\n", string.Empty).Replace("\r", string.Empty);
            string json = "{ \"Code\":\"" + code + "\" , \"msg\":\"" + msg + "\"}";


            return json;

        }
        
        /// <summary>
        /// 去掉json特殊字符
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static string String2Json(string s)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < s.Length; i++)
            {
                char c = s.ToArray()[i];
                switch (c)
                {
                    case '\"':
                        sb.Append("\\\""); break;
                    case '\\':
                        sb.Append("\\\\"); break;
                    case '/':
                        sb.Append("\\/"); break;
                    case '\b':
                        sb.Append("\\b"); break;
                    case '\f':
                        sb.Append("\\f"); break;
                    case '\n':
                        sb.Append("\\n"); break;
                    case '\r':
                        sb.Append("\\r"); break;
                    case '\t':
                        sb.Append("\\t"); break;
                    default:
                        if ((c >= 0 && c <= 31) || c == 127)//在ASCⅡ码中，第0～31号及第127号(共33个)是控制字符或通讯专用字符
                        {

                        }
                        else
                        {
                            sb.Append(c);
                        }
                        break;
                }
            }
            return sb.ToString();
        }
        /// <summary>
        /// 返回处理结果 json
        /// </summary>
        /// <param name="code">0成功 -1失败</param>
        /// <param name="msg"></param>
        /// <param name="data">josn格式的字符串</param>
        /// <returns></returns>
        public static string JsonCodeResult(string code, string msg, string data)
        {
            msg = String2Json(msg);//msg.Replace("\n", string.Empty).Replace("\r", string.Empty);
            string json = "{ \"Code\":\"" + code + "\" , \"msg\":\"" + msg + "\", \"data\":\"" + data + "\"}";
            return json;
        }


        /// <summary> 
        /// 对象转JSON 
        /// </summary> 
        /// <param name="obj">对象</param> 
        /// <returns>JSON格式的字符串</returns> 
        public static string ObjectToJSON(object obj)
        {
            ///yqf 20190821
            ////加入格式，默认带出有T格式
            //IsoDateTimeConverter timejson = new IsoDateTimeConverter
            //{
            //    DateTimeFormat = "yyyy'-'MM'-'dd' 'HH':'mm':'ss"
            //};
            // string json = JsonConvert.SerializeObject(obj, timejson);
            string json = JsonConvert.SerializeObject(obj);
            return json;
            //JavaScriptSerializer jss = new JavaScriptSerializer();
            //try
            //{
            //    string str = jss.Serialize(obj);

            //    str = Regex.Replace(str, @"\\/Date\((\d+)\)\\/", match =>
            //    {
            //        DateTime dt = new DateTime(1970, 1, 1);
            //        dt = dt.AddMilliseconds(long.Parse(match.Groups[1].Value));
            //        dt = dt.ToLocalTime();
            //        return dt.ToString("yyyy-MM-dd HH:mm:ss");
            //    });
            //    return str;
            //}
            //catch (Exception ex)
            //{
            //    throw new Exception("JSONHelper.ObjectToJSON(): " + ex.Message);
            //}
        }
        public static string ObjectToJSONOLD(object obj)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            try
            {
                return jss.Serialize(obj);
            }
            catch (Exception ex)
            {
                throw new Exception("JSONHelper.ObjectToJSON(): " + ex.Message);
            }
        }
        /// <summary> 
        /// 数据表转键值对集合 
        /// 把DataTable转成 List集合, 存每一行 
        /// 集合中放的是键值对字典,存每一列 
        /// </summary> 
        /// <param name="dt">数据表</param> 
        /// <returns>哈希表数组</returns> 
        public static List<Dictionary<string, object>> DataTableToList(DataTable dt, bool lower = false)
        {
            List<Dictionary<string, object>> list
            = new List<Dictionary<string, object>>();
            foreach (DataRow dr in dt.Rows)
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                foreach (DataColumn dc in dt.Columns)
                {
                    dic.Add(lower ? dc.ColumnName.ToLower() : dc.ColumnName, dr[dc.ColumnName]);
                }
                list.Add(dic);
            }
            return list;
        }
        /// <summary> 
        /// 数据集转键值对数组字典 
        /// </summary> 
        /// <param name="dataSet">数据集</param> 
        /// <returns>键值对数组字典</returns> 
        public static Dictionary<string, List<Dictionary<string, object>>> DataSetToDic(DataSet ds)
        {
            Dictionary<string, List<Dictionary<string, object>>> result = new Dictionary<string, List<Dictionary<string, object>>>();
            foreach (DataTable dt in ds.Tables)
                result.Add(dt.TableName, DataTableToList(dt));
            return result;
        }
        /// <summary> 
        /// 数据表转JSON 
        /// </summary> 
        /// <param name="dataTable">数据表</param> 
        /// <param name="lower">使用小写字段名</param>
        /// <returns>JSON字符串</returns> 
        public static string DataTableToJSON(DataTable dt, bool lower = false)
        {
            string result = JsonConvert.SerializeObject(dt, new DataTableConverter());
            return result;
            //return ObjectToJSONOLD(DataTableToList(dt, lower));
        }

        public static string DataTableJson(DataTable dt)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("[");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                sb.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    sb.Append("\"");
                    sb.Append(dt.Columns[j].ColumnName);
                    sb.Append("\":\"");
                    sb.Append(dt.Rows[i][j].ToString());
                    sb.Append("\",");
                }
                sb.Remove(sb.Length - 1, 1);
                sb.Append("},");
            }
            sb.Remove(sb.Length - 1, 1);
            sb.Append("]");
            return sb.ToString();
        }


        public static string DataRowToJSON(DataRow[] drs, bool lower = false)
        {
            return ObjectToJSON(DataRowToList(drs, lower));
        }

        public static List<Dictionary<string, object>> DataRowToList(DataRow[] drs, bool lower = false)
        {
            List<Dictionary<string, object>> list
            = new List<Dictionary<string, object>>();
            foreach (DataRow dr in drs)
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                foreach (DataColumn dc in dr.Table.Columns)
                {
                    dic.Add(lower ? dc.ColumnName.ToLower() : dc.ColumnName, dr[dc.ColumnName]);
                }
                list.Add(dic);
            }
            return list;
        }
        /// <summary>
        /// JSON文本转对象,泛型方法 
        /// </summary> 
        /// <typeparam name="T">类型</typeparam> 
        /// <param name="jsonText">JSON文本</param> 
        /// <returns>指定类型的对象</returns> 
        public static T JSONToObject<T>(string jsonText)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            try
            {
                return jss.Deserialize<T>(jsonText);
            }
            catch (Exception ex)
            {
                throw new Exception("JSONHelper.JSONToObject(): " + ex.Message);
            }
        }
        /// <summary> 
        /// 将JSON文本转换为数据表数据 
        /// </summary> 
        /// <param name="jsonText">JSON文本</param> 
        /// <returns>数据表字典</returns> 
        public static Dictionary<string, List<Dictionary<string, object>>> TablesDataFromJSON(string jsonText)
        {
            return JSONToObject<Dictionary<string, List<Dictionary<string, object>>>>(jsonText);
        }
        /// <summary> 
        /// 将JSON文本转换成数据行 
        /// </summary> 
        /// <param name="jsonText">JSON文本</param> 
        /// <returns>数据行的字典</returns> 
        public static Dictionary<string, object> DataRowFromJSON(string jsonText)
        {
            return JSONToObject<Dictionary<string, object>>(jsonText);
        }
        /// <summary>
        /// Json转换成对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="jsonText"></param>
        /// <returns></returns>
        public static T JsonToObject<T>(string jsonText)
        {
            DataContractJsonSerializer s = new DataContractJsonSerializer(typeof(T));
            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jsonText));
            T obj = (T)s.ReadObject(ms);
            ms.Dispose();
            return obj;
        }
    }

    public partial class JsonCodeResult
    {
        private object _data;

        public JsonCodeResult(object data)
        {
            _data = data;
            Info = new List<MessageInfo>(0);
        }

        public JsonCodeResult()
        {
            Info = new List<MessageInfo>(0);
        }

        /// <summary>
        /// 返回的数据
        /// </summary>
        public object Data
        {
            get { return _data; }
            set { _data = value; }
        }

        /// <summary>
        /// 消息数组
        /// </summary>
        public List<MessageInfo> Info
        {
            get;
            set;
        }

        /// <summary>
        /// 成功标识
        /// </summary>
        public bool Success
        {
            get { return Info == null || Info.Count == 0; }
        }


        public class MessageInfo
        {
            /// <summary>
            /// 消息体
            /// </summary>
            public string Message { get; set; }
            /// <summary>
            /// 消息类型 见MessageType类
            /// </summary>
            public string Type { get; set; }
        }

        public class MessageType
        {
            public const string Alert = "Alert";
            public const string Confirm = "Confirm";
            //public const string Error = "Error";
        }

    }


}
