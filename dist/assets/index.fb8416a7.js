import{_ as b}from"./wallet.3924f472.js";import{_ as w,r as I,a as x,o as k,c as U,i as s,t as B,u as C,b as e,d as a,p as S,j as L,e as M,f as _,q as N}from"./index.7dbf11ab.js";import{T}from"./index.02745042.js";import{S as v}from"./help.088b247f.js";import{U as V}from"./login.66351307.js";import"./moment.17f8281e.js";import"./request.869d566e.js";const n=r=>(S("data-v-0a3c539e"),r=r(),L(),r),$={id:"my"},R={class:"my_header"},j=n(()=>s("div",{class:"autor"},[s("img",{src:b,alt:""})],-1)),q={class:"layout-my"},D={class:"card"},E=n(()=>s("div",null,"\u6211\u7684\u8BA2\u5355",-1)),z=n(()=>s("div",null,"\u8D26\u6237\u4F59\u989D",-1)),A=n(()=>s("div",null,"\u6211\u7684\u6536\u85CF",-1)),F=n(()=>s("div",null,"\u4E2A\u4EBA\u8D44\u6599",-1)),G=n(()=>s("div",null,"\u6211\u7684\u94B1\u5305",-1)),H=n(()=>s("div",null,"\u5B9E\u540D\u8BA4\u8BC1",-1)),J={class:"btn_bottom"},K=N("\u9000\u51FA\u767B\u5F55"),O={setup(r){const c=M();let m=I({userInfo:null});x(()=>{h()});const h=async()=>{let t=await v({type:"L",data:{action:"review",name:"UserInfo"}});m.userInfo=t},y=async()=>{const t=await V({action:"UserLogout"});if(t.code!=0)return T(t.message),!1;v({data:{name:"UserInfo",action:"remove"}}),setTimeout(()=>{c.replace({name:"login"})},300)},d=t=>{t=="collection"?c.push("/my/collection"):t=="real"?c.push("/my/RealView"):t=="card"?c.push("/my/card"):t=="balance"?c.push("/my/balance"):t=="MyBalance"&&c.push("/my/MyBalance")};return(t,i)=>{var p;const l=_("van-icon"),o=_("van-col"),u=_("van-row"),g=_("van-button");return k(),U("div",$,[s("div",R,[j,s("div",null,B((p=C(m).userInfo)==null?void 0:p.UserName),1)]),s("div",q,[s("div",D,[e(u,{class:"card-row",gutter:"24"},{default:a(()=>[e(o,{span:"6",class:"item"},{default:a(()=>[e(l,{name:"balance-list-o"}),E]),_:1}),e(o,{span:"6",class:"item",onClick:i[0]||(i[0]=f=>d("balance"))},{default:a(()=>[e(l,{name:"medal-o"}),z]),_:1}),e(o,{span:"6",class:"item"},{default:a(()=>[e(l,{name:"shop-collect-o"}),A]),_:1}),e(o,{span:"6",class:"item"},{default:a(()=>[e(l,{name:"manager-o"}),F]),_:1})]),_:1}),e(u,{class:"card-row",gutter:"20"},{default:a(()=>[e(o,{span:"6",class:"item",onClick:i[1]||(i[1]=f=>d("MyBalance"))},{default:a(()=>[e(l,{name:"paid"}),G]),_:1}),e(o,{span:"6",class:"item",onClick:i[2]||(i[2]=f=>d("real"))},{default:a(()=>[e(l,{name:"credit-pay"}),H]),_:1}),e(o,{span:"6",class:"item"}),e(o,{span:"6",class:"item"})]),_:1})])]),s("div",J,[e(g,{onClick:y,class:"out-login btn"},{default:a(()=>[K]),_:1})])])}}};var se=w(O,[["__scopeId","data-v-0a3c539e"]]);export{se as default};