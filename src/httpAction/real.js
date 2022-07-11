/*
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-19 20:31:06
 * @LastEditors: xueyang xueyang_xyy@163.com
 * @LastEditTime: 2022-05-19 20:32:03
 * @FilePath: /Collection/src/httpAction/real.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "@/utils/request";
let url='/api/Shuzi/Member.ashx';
// 实名认证
export function UserAuthorizeIdCard(params){
    return service({
        url,
        method:"get",
        loadingMsg:"正在加载...",
        // customLoading:true, //是否自定义loading
        params
    })
}