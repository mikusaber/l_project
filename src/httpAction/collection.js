import service from "@/utils/request";
import Login from "@/api/Login";
let Member = "/api/Shuzi/Member.ashx";
let Main = "/api/Shuzi/Main.ashx";
export function getMyProduct(params) {
  return service({
    url: Member,
    method: "get",
    loadingMsg: "正在加载...",
    // customLoading:true, //是否自定义loading
    params,
  });
}
export function ProductPaid(params) {
  return service({
    url: Member,
    method: "get",
    loadingMsg: "正在支付",
    // customLoading:true, //是否自定义loading
    params,
  });
}
export function OnSaleProduct(params) {
  return service({
    url: Member,
    method: "get",
    loadingMsg: "正在寄售",
    // customLoading:true, //是否自定义loading
    params,
  });
}
export function SubmitOrder(params) {
  return service({
    url: Member,
    method: "get",
    // loadingMsg:"取消寄售",
    // customLoading:true, //是否自定义loading
    params,
  });
}
export function CancelOnSaleProduct(params) {
  return service({
    url: Member,
    method: "get",
    // loadingMsg:"取消寄售",
    // customLoading:true, //是否自定义loading
    params,
  });
}
export function GetMemberProductInfo(params) {
  return service({
    url: Member,
    method: "get",
    // loadingMsg:"取消寄售",
    // customLoading:true, //是否自定义loading
    params,
  });
}
export function GetMainProductInfo(params) {
  return service({
    url: Main,
    method: "get",
    // loadingMsg:"取消寄售",
    // customLoading:true, //是否自定义loading
    params,
  });
}

export function GetAmountDetailList(params) {
  return service({
    url: Member,
    method: "get",
    // loadingMsg:"取消寄售",
    // customLoading:true, //是否自定义loading
    params,
  });
}

export function GetPaymentCompanyList(params) {
  return service({
    url: Member,
    method: "get",
    // loadingMsg:"取消寄售",
    // customLoading:true, //是否自定义loading
    params,
  });
}
