import{_ as I}from"./wallet.3924f472.js";import{S as L}from"./help.088b247f.js";import{G as N}from"./collection.87132f53.js";import{a as S}from"./login.66351307.js";import{_ as x,r as V,a as k,w as A,o as n,h as g,d as _,u as l,f as h,c as f,i as e,t as i,F as b,g as w,S as C,l as m,p as G,j as U}from"./index.7dbf11ab.js";import"./moment.17f8281e.js";import"./request.869d566e.js";import"./index.02745042.js";const d=r=>(G("data-v-4a8e00ce"),r=r(),U(),r),z={key:0,class:"balance"},B={class:"head-card"},D=d(()=>e("img",{class:"head-user",src:I,alt:""},null,-1)),F=d(()=>e("p",{class:"title"},"\u603B\u4F59\u989D(CNY)",-1)),M={class:"price"},R={class:"left"},$=d(()=>e("div",{class:"right"},[e("span",null,"\u5145\u503C"),e("span",null,"\u63D0\u73B0")],-1)),j={class:"order-list"},E=d(()=>e("p",{class:"list-tit"},[e("span",{class:"left"},"\u4F59\u989D\u660E\u7EC6"),e("span",{class:"right"},"\u67E5\u770B\u5168\u90E8")],-1)),Y=d(()=>e("p",null,"\u6CA1\u6709\u66F4\u591A\u4E86",-1)),q={class:"top"},H={class:"item-tit"},J={class:"bot"},K={class:"intro"},O={class:"time"},P={setup(r){const s=V({userInfo:null,pageNo:1,pageSize:20,list:[],listTotal:0,loading:!1,listLoading:!1,finished:!1});k(()=>{u(),p()}),A(()=>s.pageNo,()=>{p()});const v=async()=>{u(),s.loading=!0,s.list=[],s.listTotal=0,s.pageNo==1?p():s.pageNo=1},T=async()=>{if(s.list.length>=s.listTotal)return!1;s.list.length<s.listTotal&&!s.listLoading&&(s.listLoading=!0,s.pageNo+=1)},p=async()=>{try{let t={action:"GetAmountDetailList",pageNo:s.pageNo,pageSize:s.pageSize};const o=await N(t);if(s.listLoading=!1,s.loading=!1,o.code!=0)return!1;s.listTotal=o.total;let c=[...s.list,...o.data];c.length>=s.listTotal?s.finished=!0:s.finished=!1,s.list=c}catch(t){console.log(t),s.loading=!1}},u=async()=>{try{const t=await S({action:"GetMemberInfo"});if(t.code!=0)return Toast(t.message),!1;let o={type:"L",data:{action:"add",name:"UserInfo",value:t.data}};L(o),s.userInfo=t.data}catch(t){console.log(t)}};return(t,o)=>{const c=h("van-list"),y=h("van-pull-refresh");return n(),g(y,{style:{"min-height":"100%"},modelValue:l(s).loading,"onUpdate:modelValue":o[1]||(o[1]=a=>l(s).loading=a),onRefresh:v},{default:_(()=>[l(s).userInfo?(n(),f("div",z,[e("div",B,[D,F,e("div",M,[e("div",R,"\uFFE5"+i(l(s).userInfo.AvailableAmount),1),$])]),e("div",j,[E,l(s).list.length?(n(),g(c,{key:0,modelValue:l(s).listLoading,"onUpdate:modelValue":o[0]||(o[0]=a=>l(s).listLoading=a),finished:l(s).finished,offset:10,"finish-text":"\u6CA1\u6709\u66F4\u591A\u4E86",onLoad:T},{finished:_(()=>[Y]),default:_(()=>[(n(!0),f(b,null,w(l(s).list,a=>(n(),f("div",{key:a.Id,class:"item"},[e("p",q,[e("span",H,i(a.TradeTypeText),1),e("span",{class:C(["price",a.TradeAmount>0?"add":"reduce"])},i(`${a.TradeAmount>0?"+":""}${a.TradeAmount}`),3)]),e("p",J,[e("span",K,i(a.Remark),1),e("span",O,i(a.TradeTimeText),1)])]))),128))]),_:1},8,["modelValue","finished"])):m("",!0)])])):m("",!0)]),_:1},8,["modelValue"])}}};var os=x(P,[["__scopeId","data-v-4a8e00ce"]]);export{os as default};
