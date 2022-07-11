import moment from "moment";

// 数据存储工具
/**
 * 使用示例
 * Storage(Object)
 * Object：{
 *  // S代表 sessionStorage存储
 *  // L代表 localStorage存储
 *  type:"S", // 类型
 *
 *  // name 代表存储key值 - String
 *  // name 代表存储key值 - String
 *  data:{
 *      action:'add',// action 代表行为 - 'add' 存储数据  'remove' 删除数据 'review' 获取数据
 *      name:'user',// name 代表存储key值 - String
 *      value:String || Object,// value 代表存储的数据
 *  },
 *  isJson:true, // 是否需要json转换
 * }
 */
export function Storage({ type = "S", data = {}, isJson = true }) {
  console.log(data);
  return new Promise((resolve, reject) => {
    let S = sessionStorage,
      L = localStorage,
      mode = L,
      action = data.action || "add";
    if (type == "S") mode = S;
    if (action == "add") {
      if (isJson) {
        mode.setItem(data.name, JSON.stringify(data.value));
      } else {
        mode.setItem(data.name, data.value);
      }
    } else if (action == "remove") {
      mode.removeItem(data.name);
    } else if (action == "review") {
      let item;
      if (isJson) {
        item = JSON.parse(mode.getItem(data.name));
      } else {
        item = mode.getItem(data.name);
      }
      resolve(item);
    }
  });
}

export function autoZero(val) {
  if (val < 10) {
    return "0" + val;
  } else {
    return val;
  }
}
export function jsonp(url, jsonpCallback, success) {
  let script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.type = "text/javascript";
  window[jsonpCallback] = function (data) {
    success && success(data);
  };
  document.body.appendChild(script);
}

export const exchangeDateTime = (date, type = "") => {
  switch (type) {
    case 40:
      //2021-04
      return moment(date).format("MM/DD");
    case 39:
      //2021-04
      return moment(date).format("YYYY-MM");
    case 38:
      return moment(date).format("MM月DD日");
    case 37:
      //17 May 2022 5:38 PM
      return moment(date).format("DD MMM YYYY h:mm A");
    case 36:
      //15-04-2021 5:24 PM
      return moment(date).format("DD-MM-YYYY H:mm A");
    case 35:
      //15/04/2021 5:24 PM
      return moment(date).format("DD/MM/YYYY H:mm A");
    case 34:
      //15/04/2021 17:24
      return moment(date).format("DD/MM/YYYY H:mm");
    // 03:33
    case 33:
      return moment(date).format("HH:mm");
    // isToday
    case 32:
      return moment().isSame(date, "day");
    case 31:
      /* Monday */
      return moment(date).format("dddd");
    case 30:
      //15-04-2021
      return moment(date).format("DD-MM-YYYY");
    case 29:
      return moment().format("DD MMM YYYY, hh:mma");
    case 28:
      return moment(date).valueOf();
    case 27:
      // 3 next year
      return moment(date).add(3, "year");
    case 26:
      return moment(moment(date).format("YYYY-MM-DD")).valueOf();
    case 25:
      // next day
      return moment(date).add(1, "day");
    case 24:
      /* Monday 1 January 2020 */
      return moment(date).format("dd MMM DD YYYY");
    case 23:
      //2021-04-15 03:24:12
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    case 22:
      /* 1 Jan 2020,18:00 */
      return moment(date).format("DD MMM YYYY,HH:mm");
    case 20:
      /* 1 Jan 2020,Fri */
      return moment(date).format("DD MMM YYYY,ddd");
    case 18:
      /* 1 Jan 2020 */
      return moment(date).format("DD MMM YYYY");
    case 17:
      /* 1 January 2020,Fri */
      return moment(date).format("DD MMMM YYYY,ddd");
    case 16:
      /* 毫秒 */
      return moment(date).valueOf();
    case 15:
      /* January 2020 */
      return moment(date).format("MMMM YYYY");
    case 14:
      //2021-04-15 17:24:12
      return moment(date).format("YYYY-MM-DD H:mm:ss");
    case 13:
      /* 05 February 2021, 00:00 */
      return moment(date).format("DD MMMM YYYY, HH:mm");
    case 12:
      /* Mon Apr 26 2021 12:00:00 GMT+0800 (中国标准时间) */
      return moment(date).toDate();
    case 11:
      /* Monday, 1 January 2020 */
      return moment(date).format("dddd, DD MMMM YYYY");
    case 10:
      // 1 / 2 / 3 / 4 / 5 / 6 / 7
      return moment(date).day();
    case 9:
      // 15 April 2021
      return moment(date).format("DD MMMM YYYY");
    case 8:
      // 17:22
      return moment(date).format("HH:mm");
    case 7:
      // 15 Apr 17:23 PM
      return moment(date).format("DD MMM H:mm A");
    case 6:
      // 17:23 pm
      return moment(date).format("H:mm a");
    case 5:
      //15 Apr
      return moment(date).format("DD MMM");
    case 4:
      //Thursday
      return moment(date).format("dddd");
    case 3:
      //2021-04-15 17:24
      return moment(date).format("YYYY-MM-DD H:mm");
    case 2:
      //2021-04-15
      return moment(date).format("YYYY-MM-DD");
    case 1:
      //17:25
      return moment(date).format("H:mm");
    default:
      //15/04/2021
      return moment(date).format("DD/MM/YYYY");
  }
};

export function initNVC(scene = 'nvc_message_h5',callBack) {
    // 实例化nc
    AWSC.use("nvc", function (state, module) {
      // 初始化
      window.nvc = module.init({
        // 应用类型标识。它和使用场景标识（scene字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
        appkey: "FFFF0N0N00000000ACB2",
        // appkey: "FFFF0N0N00000000ACB2",
        //使用场景标识。它和应用类型标识（appkey字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
        scene,
        //滑动验证长度配置
        customWidth: 300,
        //前端滑动验证通过时会触发该回调参数。您可以在该回调参数中将会话ID（sessionId）、签名串（sig）、请求唯一标识（token）字段记录下来，随业务请求一同发送至您的服务端调用验签。
        success: function (data) {
          callBack({type:'success',data})
        },
        // 滑动验证失败时触发该回调参数。
        fail: function (failCode) {
          callBack({type:'fail',failCode})
        },
        // 验证码加载出现异常时触发该回调参数。
        error: function (errorCode) {
          callBack({type:'error',errorCode})

        },
      });
    });
}
