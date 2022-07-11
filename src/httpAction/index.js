/*
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-17 22:28:33
 * @LastEditors: Zhengzq zhengzq@zzjgtl.com
 * @LastEditTime: 2022-06-15 15:11:55
 * @FilePath: /Collection/src/httpAction/market.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "@/utils/request";
let url='/api/Shuzi/Main.ashx';
export function GetProductList(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}

export function GetNoticeList(params){
    return service({
        url,
        method:"get",
        // loadingMsg:"正在加载...",
        customLoading:true, //是否自定义loading
        params
    })
}

export function GetSearch(params){
    return service({
        url,
        method:"get",
        // loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}

export function GetIndexBanners(params){
    return service({
        url,
        method:"get",
        // loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}