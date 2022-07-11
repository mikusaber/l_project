/*
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-17 22:28:33
 * @LastEditors: xueyang xueyang_xyy@163.com
 * @LastEditTime: 2022-05-21 23:53:00
 * @FilePath: /Collection/src/httpAction/market.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "@/utils/request";
let url='/api/Shuzi/Member.ashx';
export function GetBankCardList(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}
// 添加银行卡
export function ModifyBankCard(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}
// 删除银行卡
export function DeleteBankCard(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}

// 汇付宝-绑定银行卡
export function BindPayBankCard(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在跳转第三方支付",
        // customLoading:true, //是否自定义loading
        params
    })
}

// 汇付宝-获取银行卡详情
export function GetPayBankCardInfo(params){
    return service({
        url,
        method:"get",
        // loadingMsg:"正在加载...",
        customLoading:true, //是否自定义loading
        params
    })
}

// 汇付宝-获取银行卡列表
export function GetPayBankCardList(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}

