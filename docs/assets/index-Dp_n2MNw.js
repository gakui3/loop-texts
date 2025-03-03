(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();const b=["ワクワクして明日が楽しみな街","最高でハッピーな街","私も一緒に頑張って希望をもって作りたい街","ドラえもんみたいな街","眠らない街","Future City","平和に暮らせる街","ドラクエみたいな街","アスリートが輝ける街","愛に溢れた街","いつまでも住みたいと思える街","子どもが夢を見られる街"],v=["みんなが笑顔になれる街","テクノロジーが進化し続ける街","自然と都会が融合した街","魔法みたいなワクワクする街","アートと音楽があふれる街","未来を創るイノベーションシティ","スポーツがもっと楽しくなる街","安心して暮らせる街","歴史と文化が息づく街","世界中から人が集まる街","新しいチャレンジが生まれる街","心が落ち着く緑豊かな街"],M=["夢が叶う街","冒険が始まる街","みんなが主役になれる街","ロボットと共存する街","ワクワクが止まらない街","世界一優しい街","美味しいものがいっぱいの街","子どもも大人も楽しめる街","笑い声が響く街","サステナブルな未来都市","時がゆっくり流れる街","世界に誇れる街"];function z(t,e){this.w=t|0,this.h=e|0}z.prototype={area:function(){return this.w*this.h}};function c(t,e,i,o){this.l=t|0,this.t=e|0,this.r=i|0,this.b=o|0}c.prototype={w:function(){return this.r-this.l|0},h:function(){return this.b-this.t|0}};function L(t,e,i,o){this.x=t|0,this.y=e|0,this.w=i|0,this.h=o|0}L.prototype={r:function(){return this.x+this.w|0},b:function(){return this.y+this.h|0},fits:function(t){return this.w<=t.w&&this.h<=t.h}};function h(t){this.rc=t,this.filled=!1,this.c0=null,this.c1=null}h.prototype={insert:function(t){if(this.c0&&this.c1){var e=this.c0.insert(t);return e||this.c1.insert(t)}if(this.filled)return null;var i=this.rc.w(),o=this.rc.h();return t.w>i||t.h>o?null:(this.filled=!0,t.x=this.rc.l,t.y=this.rc.t,this.c0=new h(new c(this.rc.l,this.rc.t+t.h,this.rc.r,this.rc.b)),this.c1=new h(new c(this.rc.l+t.w,this.rc.t,this.rc.r,this.rc.t+t.h)),this)}};function B(t,e){this.root=new h(new c(0,0,t,e)),this.size=new z(t,e)}function m(t,e){var i=new B(1,e);t.sort(function(s,u){return u.w*u.h-s.w*s.h});for(var o=0;o<t.length;o++){var n=i.root.insert(t[o]);if(!n){i.size.w+=t[o].w,i.root=new h(new c(0,0,i.size.w,i.size.h));for(var r=0;r<=o;r++){var l=i.root.insert(t[r]);l||(i.size.w+=50,i.root=new h(new c(0,0,i.size.w,i.size.h)),r=-1)}}}return i}const a=[{height:20,prob:.85},{height:40,prob:.1},{height:60,prob:.05}];function C(){const t=Math.random();let e=0;for(let i=0;i<a.length;i++)if(e+=a[i].prob,t<e)return a[i].height;return a[a.length-1].height}function w(t,e,i,o,n){const r=document.createElement("div");return r.style.position="absolute",r.style.left=i+"px",r.style.top="0px",r.style.width=o+"px",r.style.height=n+"px",t.forEach(l=>{const s=document.createElement("span");s.classList.add("loop-text"),s.style.position="absolute",s.style.left=l.x+"px",s.style.top=l.y+"px",s.style.width=l.w+"px",s.style.height=l.h+"px",s.textContent=l.text,l.h===20?(s.style.fontSize="1em",s.style.fontWeight="normal"):l.h===40?(s.style.fontSize="1.75em",s.style.fontWeight="normal"):l.h===60&&(s.style.fontSize="2em",s.style.fontWeight="bold"),r.appendChild(s)}),e.appendChild(r),{tileDiv:r,offset:i,width:o,items:t}}function g(t){let e=[];for(let i=0;i<t;i++){const o=Math.floor(Math.random()*3);let n="";o===0&&(n=b[Math.floor(Math.random()*b.length)]),o===1&&(n=v[Math.floor(Math.random()*v.length)]),o===2&&(n=M[Math.floor(Math.random()*M.length)]);let r=C(),l=1;r===40&&(l=1.5),r===60&&(l=1.75);let s=n.length*20*l,u=new L(0,0,s,r);u.text=n,e.push(u)}return e}const d=document.getElementById("loop-container");let f=180,y=g(30);m(y,f);let O=y.reduce((t,e)=>Math.max(t,e.x+e.w),0),E=w(y,d,0,O,f),x=g(30);m(x,f);let P=x.reduce((t,e)=>Math.max(t,e.x+e.w),0),F=w(x,d,O,P,f),p=[E,F],I=1;function A(){requestAnimationFrame(A);for(let t=0;t<2;t++){let e=p[t];if(e.offset-=I,e.tileDiv.style.left=e.offset+"px",e.offset+e.width<0){d.removeChild(e.tileDiv);let i=g(20);m(i,f);let o=i.reduce((l,s)=>Math.max(l,s.x+s.w),0),n=p[1-t],r=n.offset+n.width;p[t]=w(i,d,r,o,f)}}}A();
