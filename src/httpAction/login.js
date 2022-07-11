import service from "@/utils/request";
import Login from "@/api/Login";
let url = "/api/Shuzi/Member.ashx";

export function login(data) {
  return service({
    url,
    method: "post",
    loadingMsg: "正在登录",
    // customLoading:true, //是否自定义loading
    data,
  });
}
export function getUserInfo(params) {
  return service({
    url,
    method: "get",
    // loadingMsg:"获取用户信息",
    // customLoading:true, // 是否自定义loading
    params,
  });
}
export function UserLogout(params) {
  return service({
    url,
    method: "get",
    // loadingMsg:"退出登录",
    // customLoading:true, // 是否自定义loading
    params,
  });
}

export function getCode(data) {
  return service({
    url,
    method: "POST",
    // loadingMsg:"正在登录",
    // customLoading: true, //是否自定义loading
    data,
  });
}

export function VerUserLogin(data) {
  return service({
    url,
    method: "POST",
    // loadingMsg:"正在登录",
    // customLoading: true, //是否自定义loading
    data,
  });
}
