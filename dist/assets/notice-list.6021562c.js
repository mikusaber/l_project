var g=Object.defineProperty;var _=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var l=(s,e,t)=>e in s?g(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,p=(s,e)=>{for(var t in e||(e={}))h.call(e,t)&&l(s,t,e[t]);if(_)for(var t of _(e))f.call(e,t)&&l(s,t,e[t]);return s};import{b as N}from"./index.014ecec4.js";import{_ as y,r as L,a as k,o as n,c as r,F as x,g as b,u as w,e as B,f as C,i as c,b as S,t as d}from"./index.7dbf11ab.js";import"./request.869d566e.js";import"./index.02745042.js";const F={class:"notice_list"},G=["onClick"],I={class:"left"},T={class:"right"},V={class:"tit"},q={class:"time"},z={setup(s){const e=B(),t=L({list:[],pages:{pageNo:1,pageSize:10},total:0});k(()=>{u()});const u=async()=>{try{let o=p({action:"GetNoticeList"},t.pages);const a=await N(o);a.code==0&&(t.list=a.data)}catch(o){console.log(o)}},m=o=>{let a={path:"/notice",query:{id:o}};e.push(a)};return(o,a)=>{const v=C("van-icon");return n(),r("div",F,[(n(!0),r(x,null,b(w(t).list,i=>(n(),r("div",{class:"notice_item",onClick:D=>m(i.Id)},[c("div",I,[S(v,{name:"volume"})]),c("div",T,[c("p",V,d(i.Title),1),c("p",q,d(i.PubTimeStr),1)])],8,G))),256))])}}};var j=y(z,[["__scopeId","data-v-001347d7"]]);export{j as default};