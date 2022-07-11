/*
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-17 22:28:33
 * @LastEditors: Zhengzq zhengzq@zzjgtl.com
 * @LastEditTime: 2022-05-31 22:13:03
 * @FilePath: /Collection/src/httpAction/market.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "@/utils/request";
let url='/api/Shuzi/Main.ashx';
export function getMyMarket(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}
export function GetMarketMemberProductList(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}
export function GetMarketMemberProductInfo(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}

export function SubmitOrder(params){
    return service({
        url:'/api/Shuzi/Member.ashx',
        method:"get",
        loadingMsg:"提交订单...",
        // customLoading:true, //是否自定义loading
        params
    })
}