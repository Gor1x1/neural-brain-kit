"use strict";var Mr=Object.defineProperty;var Td=Object.getOwnPropertyDescriptor;var Ad=Object.getOwnPropertyNames;var Cd=Object.prototype.hasOwnProperty;var Rd=(n,t,e)=>t in n?Mr(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Pd=(n,t)=>{for(var e in t)Mr(n,e,{get:t[e],enumerable:!0})},Id=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ad(t))!Cd.call(n,s)&&s!==e&&Mr(n,s,{get:()=>t[s],enumerable:!(i=Td(t,s))||i.enumerable});return n};var Ld=n=>Id(Mr({},"__esModule",{value:!0}),n);var k=(n,t,e)=>Rd(n,typeof t!="symbol"?t+"":t,e);var av={};Pd(av,{default:()=>el});module.exports=Ld(av);var Ye=require("obsidian");var br=[{prefix:"wiki/projects",color:"#38d2ff",name:"projects"},{prefix:"wiki/concepts",color:"#4cf08c",name:"concepts"},{prefix:"wiki/sources",color:"#5b8cff",name:"sources"},{prefix:"wiki/entities",color:"#8fa6ff",name:"entities"},{prefix:"raw",color:"#8597b5",name:"raw"},{prefix:"inbox",color:"#d6a860",name:"inbox"},{prefix:"templates",color:"#7d8aa3",name:"templates"},{prefix:"*",color:"#cfe0ff",name:"core"}],Sr={nodeSize:1,microNodes:!0,microAmount:1,linkOpacity:1,linkCurve:.16,bloom:.4,glow:.6,impulses:!0,impulseDensity:1,impulseSpeed:1,impulseSize:1,impulseBackground:.35,ambient:.6,labelDensity:.7,clusterLabels:!0,autoRotate:0,depthFog:.55,showUnresolved:!0,showOrphans:!0,fpsCap:60,pixelRatioCap:1.5},wr={nodeSize:1.55,microNodes:!1,microAmount:.4,linkOpacity:1.5,linkCurve:.06,bloom:0,glow:.5,impulses:!0,impulseDensity:.7,impulseSpeed:1,impulseSize:1,impulseBackground:0,ambient:.12,labelDensity:1,clusterLabels:!0,autoRotate:0,depthFog:0,showUnresolved:!0,showOrphans:!0,fpsCap:60,pixelRatioCap:1.5},sl=3,Dd={version:sl,mode:"neural",neural:{...Sr},daily:{...wr},rules:br.map(n=>({...n})),openIn:"tab",hideFiles:[],panelOpen:!1};function $c(n){let t=n??{},e=(t.version??0)===sl;return{...Dd,...t,version:sl,neural:{...Sr,...e?t.neural??{}:{showUnresolved:t.neural?.showUnresolved??!0,showOrphans:t.neural?.showOrphans??!0}},daily:{...wr,...e?t.daily??{}:{showUnresolved:t.daily?.showUnresolved??!0,showOrphans:t.daily?.showOrphans??!0}},rules:t.rules&&t.rules.length?t.rules:br.map(i=>({...i})),hideFiles:t.hideFiles??[]}}var gs=require("obsidian");function Er(n){let t=n.replace("#","");t.length===3&&(t=t.split("").map(i=>i+i).join(""));let e=parseInt(t.slice(0,6),16);return[e>>16&255,e>>8&255,e&255]}function jc(n,t,e){let i=s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0");return`#${i(n)}${i(t)}${i(e)}`}function Nd(n,t,e){n/=255,t/=255,e/=255;let i=Math.max(n,t,e),s=Math.min(n,t,e),r=(i+s)/2,a=0,o=0;if(i!==s){let l=i-s;o=r>.5?l/(2-i-s):l/(i+s),i===n?a=(t-e)/l+(t<e?6:0):i===t?a=(e-n)/l+2:a=(n-t)/l+4,a/=6}return[a,o,r]}function Qc(n,t,e){if(t===0)return[e*255,e*255,e*255];let i=e<.5?e*(1+t):e+t-e*t,s=2*e-i,r=a=>(a<0&&(a+=1),a>1&&(a-=1),a<1/6?s+(i-s)*6*a:a<1/2?i:a<2/3?s+(i-s)*(2/3-a)*6:s);return[r(n+1/3)*255,r(n)*255,r(n-1/3)*255]}function th(n,t,e){if(e<=1)return n;let[i,s,r]=Er(n),[a,o,l]=Nd(i,s,r),c=t/(e-1)-.5;a=(a+c*.05+1)%1,l=Math.max(.42,Math.min(.8,l+c*.16)),o=Math.max(.35,Math.min(1,o-Math.abs(c)*.12));let[h,d,u]=Qc(a,o,l);return jc(h,d,u)}function eh(n){let t=2166136261;for(let a=0;a<n.length;a++)t=Math.imul(t^n.charCodeAt(a),16777619);let e=(t>>>0)%360/360,[i,s,r]=Qc(e,.72,.62);return jc(i,s,r)}var Ud=60,Fd=36,Od=35;function Bd(n,t){let e=null;for(let i of t)i.prefix!=="*"&&(n===i.prefix||n.startsWith(i.prefix+"/"))&&(!e||i.prefix.length>e.prefix.length)&&(e=i);return e}function zd(n){return n.slice(n.lastIndexOf("/")+1).replace(/\.md$/i,"")}function ih(n,t){let e=new Set(t.hideFiles),i=[],s=[],r=new Map,a=new Map(n.files.map(O=>[O.path,O]));for(let O of n.files)e.has(O.path)||(r.set(O.path,i.length),i.push(O.path),s.push(0));let o=O=>{let rt="?"+O,ct=r.get(rt);return ct===void 0&&(ct=i.length,r.set(rt,ct),i.push(rt),s.push(1)),ct},l=new Map,c=(O,rt,ct)=>{if(O===rt)return;let zt=Math.min(O,rt),se=Math.max(O,rt),ge=zt*1000003+se,jt=l.get(ge);jt?(jt.w+=ct,jt.s!==O&&(jt.bi=!0)):l.set(ge,{s:O,t:rt,w:ct,bi:!1})};for(let[O,rt]of Object.entries(n.resolved)){let ct=r.get(O);if(ct!==void 0)for(let[zt,se]of Object.entries(rt)){let ge=r.get(zt);ge!==void 0&&c(ct,ge,se)}}if(t.showUnresolved)for(let[O,rt]of Object.entries(n.unresolved)){let ct=r.get(O);if(ct!==void 0)for(let[zt,se]of Object.entries(rt))c(ct,o(zt),se)}let h=i.map((O,rt)=>rt);if(!t.showOrphans){let O=new Uint8Array(i.length);for(let rt of l.values())O[rt.s]=1,O[rt.t]=1;h=h.filter(rt=>O[rt])}let d=new Int32Array(i.length).fill(-1);h.forEach((O,rt)=>d[O]=rt);let u=h.length,p=h.map(O=>i[O]),m=Uint8Array.from(h.map(O=>s[O])),M=[...l.values()].filter(O=>d[O.s]>=0&&d[O.t]>=0),g=M.length,f=new Uint32Array(g),w=new Uint32Array(g),T=new Uint8Array(g),y=new Float32Array(g),v=new Uint16Array(u),b=new Uint16Array(u);M.forEach((O,rt)=>{f[rt]=d[O.s],w[rt]=d[O.t],T[rt]=O.bi?1:0,y[rt]=1+Math.log1p(O.w-1)*.6,v[f[rt]]++,v[w[rt]]++,b[w[rt]]++,O.bi&&b[f[rt]]++});let A=new Uint32Array(u+1);for(let O=0;O<g;O++)A[f[O]+1]++,A[w[O]+1]++;for(let O=0;O<u;O++)A[O+1]+=A[O];let _=A.slice(0,u),E=new Uint32Array(g*2),C=new Uint32Array(g*2);for(let O=0;O<g;O++){let rt=f[O],ct=w[O];E[_[rt]]=ct,C[_[rt]++]=O,E[_[ct]]=rt,C[_[ct]++]=O}let P=O=>O.includes("/")?O.slice(0,O.indexOf("/")):null,I=new Array(u),F=new Map;for(let O=0;O<u;O++){let rt=p[O];if(m[O]===1){I[O]="unresolved";continue}let ct=P(rt);if(!ct){I[O]="core";continue}let zt=rt.startsWith("wiki/")?rt.split("/").slice(0,2).join("/"):ct;I[O]=zt,F.set(zt,(F.get(zt)??0)+1)}for(let O=0;O<u;O++){let rt=I[O];if((F.get(rt)??0)>Od&&!rt.includes("/")){let ct=p[O].split("/");ct.length>2&&(I[O]=ct[0]+"/"+ct[1])}}let L=[],z=new Map,Z=O=>{let rt=p[O],ct,zt;if(m[O]===1)ct="unresolved",zt="#6f7fa3";else{let ge=Bd(rt,t.rules);if(ge)ct=ge.prefix,zt=ge.color;else{let jt=P(rt);if(jt)ct=jt,zt=eh(jt);else{let xe=t.rules.find(U=>U.prefix==="*");ct="*",zt=xe?.color??"#cfe0ff"}}}let se=z.get(ct);return se===void 0&&(se=L.length,z.set(ct,se),L.push({key:ct,color:zt})),se},X=new Uint16Array(u);for(let O=0;O<u;O++)X[O]=Z(O);let et=new Map,H=[],$=new Uint16Array(u);for(let O=0;O<u;O++){let rt=I[O],ct=et.get(rt);ct===void 0&&(ct=H.length,et.set(rt,ct),H.push({key:rt,label:rt.slice(rt.lastIndexOf("/")+1),family:X[O],size:0,color:L[X[O]].color})),H[ct].size++,$[O]=ct}let K=new Map;H.forEach((O,rt)=>{(K.get(O.family)??K.set(O.family,[]).get(O.family)).push(rt)});for(let O of K.values())O.forEach((rt,ct)=>H[rt].color=th(L[H[rt].family].color,ct,O.length));let ht=new Uint8Array(u),gt=0,Bt=new Float32Array(u);for(let O=0;O<u;O++)v[O]>Ud&&(ht[O]=1),Bt[O]=Math.log1p(b[O]+.5*(v[O]-b[O])),!ht[O]&&Bt[O]>gt&&(gt=Bt[O]);let At=new Float32Array(u),Wt=new Float32Array(u),J=new Float32Array(u),tt=new Array(u);for(let O=0;O<u;O++)At[O]=ht[O]?.6:Math.min(1,Math.pow(Bt[O]/(gt||1),.9)),tt[O]=m[O]===1?p[O].slice(1):zd(p[O]),Wt[O]=m[O]===1?.95:1.25+2.7*At[O];let lt=new Uint8Array(u),wt=new Set(n.bookmarks??[]);for(let O=0;O<u;O++){let rt=a.get(p[O])?.fm;(wt.has(p[O])||rt?.pinned==="true"||rt?.accent==="true")&&(lt[O]=1)}[...Array(u).keys()].filter(O=>!ht[O]&&m[O]===0).sort((O,rt)=>b[rt]-b[O]).slice(0,6).forEach(O=>lt[O]=1);let at=[],Vt=[],fe=[],Ht=new Uint16Array(u);for(let O=0;O<u;O++){if(m[O]!==0)continue;let rt=a.get(p[O]);if(!rt)continue;let ct=0;for(let zt of rt.headings)if(!(zt.l<2||!zt.h.trim())){if(ct++>=Fd)break;at.push(O),Vt.push(zt.l),fe.push(zt.h.trim())}Ht[O]=ct}for(let O=0;O<u;O++)J[O]=Wt[O]*1.3+2.6+Math.cbrt(Ht[O]);return{n:u,ids:p,labels:tt,kind:m,family:X,cluster:$,degree:v,inDegree:b,importance:At,accent:lt,radius:Wt,microRadius:J,mega:ht,families:L,clusters:H,e:g,eSrc:f,eDst:w,eBi:T,eWeight:y,adjStart:A,adjNode:E,adjEdge:C,m:at.length,mParent:Uint32Array.from(at),mLevel:Uint8Array.from(Vt),mText:fe}}function nh(n){let t=2166136261,e=i=>{t=Math.imul(t^i,16777619)};e(n.n),e(n.e),e(n.m);for(let i=0;i<n.e;i++)e(n.eSrc[i]),e(n.eDst[i]);for(let i=0;i<n.n;i++)for(let s=0;s<n.ids[i].length;s++)e(n.ids[i].charCodeAt(s));return(t>>>0).toString(36)}var kd=[{title:"Neurons",sliders:[{key:"nodeSize",label:"Node size",min:.4,max:3,step:.05},{key:"glow",label:"Glow",min:0,max:2,step:.05},{key:"bloom",label:"Bloom",min:0,max:2,step:.05},{key:"microAmount",label:"Heading neurons",min:0,max:1,step:.05}],toggles:[{key:"microNodes",label:"Show heading neurons"}]},{title:"Links",sliders:[{key:"linkOpacity",label:"Link opacity",min:0,max:3,step:.05},{key:"linkCurve",label:"Link curvature",min:0,max:.4,step:.01}]},{title:"Neural flow",sliders:[{key:"impulseDensity",label:"Density",min:0,max:3,step:.05},{key:"impulseSpeed",label:"Speed",min:.2,max:3,step:.05},{key:"impulseSize",label:"Size",min:.4,max:3,step:.05},{key:"impulseBackground",label:"Background traffic",min:0,max:1,step:.05,hint:"0 = only on hover / selection"}],toggles:[{key:"impulses",label:"Impulses on"}]},{title:"Atmosphere",sliders:[{key:"ambient",label:"Ambient dust",min:0,max:2,step:.05},{key:"depthFog",label:"Depth fog",min:0,max:1,step:.05},{key:"autoRotate",label:"Auto-rotate",min:0,max:1.5,step:.05}]},{title:"Labels & content",sliders:[{key:"labelDensity",label:"Label density",min:0,max:1.5,step:.05}],toggles:[{key:"clusterLabels",label:"Folder names"},{key:"showUnresolved",label:"Unresolved links"},{key:"showOrphans",label:"Orphan notes"}]}];function Jt(n,t,e){let i=document.createElement(n);return t&&(i.className=t),e!==void 0&&(i.textContent=e),i}var Tr=class{constructor(t,e){k(this,"engine",e);k(this,"root");k(this,"panel");k(this,"body");k(this,"info");k(this,"status");k(this,"legend");k(this,"toastEl");k(this,"seg");k(this,"inputs",new Map);k(this,"outputs",new Map);k(this,"toastT",0);let i=this.root=Jt("div","nb-hud");for(let c of["pointerdown","pointerup","dblclick","wheel"])i.addEventListener(c,h=>h.stopPropagation());let s=Jt("div","nb-top"),r=Jt("div","nb-seg"),a=(c,h)=>{let d=Jt("button","nb-seg-btn",h);return d.addEventListener("click",()=>{e.switchMode(c)}),r.appendChild(d),d};this.seg={neural:a("neural","Neural"),daily:a("daily","Daily")};let o=Jt("button","nb-icon-btn","\u2699");o.title="Visualization controls",o.addEventListener("click",()=>this.togglePanel());let l=Jt("button","nb-icon-btn","\u2316");l.title="Reset view",l.addEventListener("click",()=>e.resetView()),s.append(r,l,o),this.panel=Jt("div","nb-panel"),this.body=Jt("div","nb-panel-body"),this.panel.appendChild(this.body),this.buildPanel(),this.info=Jt("div","nb-info"),this.info.hidden=!0,this.status=Jt("div","nb-status"),this.status.hidden=!0,this.legend=Jt("div","nb-legend"),this.toastEl=Jt("div","nb-toast"),this.toastEl.hidden=!0,i.append(s,this.panel,this.info,this.legend,this.status,this.toastEl),t.appendChild(i),this.panel.hidden=!e.settings.panelOpen,this.refresh()}togglePanel(){this.panel.hidden=!this.panel.hidden,this.engine.settings.panelOpen=!this.panel.hidden,this.engine.persist()}buildPanel(){let t=this.engine;for(let o of kd){let l=Jt("div","nb-sec");l.appendChild(Jt("div","nb-sec-title",o.title));for(let c of o.sliders){let h=Jt("label","nb-row"),d=Jt("span","nb-row-name",c.label),u=Jt("span","nb-row-val"),p=Jt("input");p.type="range",p.min=String(c.min),p.max=String(c.max),p.step=String(c.step),p.addEventListener("input",()=>{let m=parseFloat(p.value);u.textContent=m.toFixed(2),t.setParam(c.key,m)}),c.hint&&(h.title=c.hint),h.append(d,u,p),l.appendChild(h),this.inputs.set(c.key,p),this.outputs.set(c.key,u)}for(let c of o.toggles??[]){let h=Jt("label","nb-check"),d=Jt("input");d.type="checkbox",d.addEventListener("change",()=>t.setParam(c.key,d.checked)),h.append(d,Jt("span",void 0,c.label)),l.appendChild(h),this.inputs.set(c.key,d)}this.body.appendChild(l)}let e=Jt("label","nb-row nb-row-select");e.appendChild(Jt("span","nb-row-name","Frame cap"));let i=Jt("select");for(let o of[30,60]){let l=Jt("option",void 0,`${o} fps`);l.value=String(o),i.appendChild(l)}i.addEventListener("change",()=>t.setParam("fpsCap",parseInt(i.value,10))),e.appendChild(i),this.inputs.set("fpsCap",i),this.body.appendChild(e);let s=Jt("div","nb-btns"),r=Jt("button","nb-btn","Re-layout");r.title="Compute a fresh layout (the current one is cached and stays stable otherwise)",r.addEventListener("click",()=>{t.relayout()});let a=Jt("button","nb-btn","Reset defaults");a.addEventListener("click",()=>t.resetModeDefaults()),s.append(r,a),this.body.appendChild(s)}refresh(){let t=this.engine.params;for(let[i,s]of this.inputs){let r=t[i];s.type==="checkbox"?s.checked=!!r:s.value=String(r);let a=this.outputs.get(i);a&&typeof r=="number"&&(a.textContent=r.toFixed(2))}let e=this.engine.mode;this.seg.neural.classList.toggle("on",e==="neural"),this.seg.daily.classList.toggle("on",e==="daily"),this.root.dataset.mode=e}setBusy(t,e){if(t===null){this.status.hidden=!0;return}this.status.hidden=!1,this.status.textContent=e===void 0?t:`${t} ${Math.round(e*100)}%`}toast(t){this.toastEl.textContent=t,this.toastEl.hidden=!1,window.clearTimeout(this.toastT),this.toastT=window.setTimeout(()=>this.toastEl.hidden=!0,6e3)}onGraph(t){this.legend.textContent="";let e=new Map;for(let s=0;s<t.n;s++)e.set(t.family[s],(e.get(t.family[s])??0)+1);let i=[...e.entries()].sort((s,r)=>r[1]-s[1]);for(let[s,r]of i){let a=t.families[s],o=Jt("span","nb-chip"),l=Jt("i","nb-dot");l.style.background=a.color,l.style.boxShadow=`0 0 8px ${a.color}`;let c=a.key==="*"?"core":a.key.replace(/^wiki\//,"");o.append(l,Jt("span",void 0,`${c} \xB7 ${r}`)),this.legend.appendChild(o)}this.info.hidden=!0}showInfo(t){let e=this.engine.graph;if(!e||t<0){this.info.hidden=!0;return}this.info.textContent="",this.info.hidden=!1;let i=e.clusters[e.cluster[t]],s=Jt("div","nb-info-title",e.labels[t]);s.style.color=i.color;let r=0;for(let l=0;l<e.m;l++)e.mParent[l]===t&&r++;let a=Jt("div","nb-info-meta",`${e.kind[t]===1?"unresolved link":e.ids[t]}`),o=Jt("div","nb-info-stats",`${e.degree[t]} links${r?` \xB7 ${r} headings`:""}`);if(this.info.append(s,a,o),e.kind[t]===0){let l=Jt("div","nb-btns"),c=Jt("button","nb-btn nb-primary","Open note");c.addEventListener("click",()=>this.engine.openSelected(this.engine.settings.openIn));let h=Jt("button","nb-btn","Open to the side");h.addEventListener("click",()=>this.engine.openSelected("split")),l.append(c,h),this.info.appendChild(l)}}dispose(){window.clearTimeout(this.toastT),this.root.remove()}};function sh(n){let t=+this._x.call(null,n);return rh(this.cover(t),t,n)}function rh(n,t,e){if(isNaN(t))return n;var i,s=n._root,r={data:e},a=n._x0,o=n._x1,l,c,h,d,u;if(!s)return n._root=r,n;for(;s.length;)if((h=t>=(l=(a+o)/2))?a=l:o=l,i=s,!(s=s[d=+h]))return i[d]=r,n;if(c=+n._x.call(null,s.data),t===c)return r.next=s,i?i[d]=r:n._root=r,n;do i=i?i[d]=new Array(2):n._root=new Array(2),(h=t>=(l=(a+o)/2))?a=l:o=l;while((d=+h)==(u=+(c>=l)));return i[u]=s,i[d]=r,n}function ah(n){Array.isArray(n)||(n=Array.from(n));let t=n.length,e=new Float64Array(t),i=1/0,s=-1/0;for(let r=0,a;r<t;++r)isNaN(a=+this._x.call(null,n[r]))||(e[r]=a,a<i&&(i=a),a>s&&(s=a));if(i>s)return this;this.cover(i).cover(s);for(let r=0;r<t;++r)rh(this,e[r],n[r]);return this}function oh(n){if(isNaN(n=+n))return this;var t=this._x0,e=this._x1;if(isNaN(t))e=(t=Math.floor(n))+1;else{for(var i=e-t||1,s=this._root,r,a;t>n||n>=e;)switch(a=+(n<t),r=new Array(2),r[a]=s,s=r,i*=2,a){case 0:e=t+i;break;case 1:t=e-i;break}this._root&&this._root.length&&(this._root=s)}return this._x0=t,this._x1=e,this}function lh(){var n=[];return this.visit(function(t){if(!t.length)do n.push(t.data);while(t=t.next)}),n}function ch(n){return arguments.length?this.cover(+n[0][0]).cover(+n[1][0]):isNaN(this._x0)?void 0:[[this._x0],[this._x1]]}function ci(n,t,e){this.node=n,this.x0=t,this.x1=e}function hh(n,t){var e,i=this._x0,s,r,a=this._x1,o=[],l=this._root,c,h;for(l&&o.push(new ci(l,i,a)),t==null?t=1/0:(i=n-t,a=n+t);c=o.pop();)if(!(!(l=c.node)||(s=c.x0)>a||(r=c.x1)<i))if(l.length){var d=(s+r)/2;o.push(new ci(l[1],d,r),new ci(l[0],s,d)),(h=+(n>=d))&&(c=o[o.length-1],o[o.length-1]=o[o.length-1-h],o[o.length-1-h]=c)}else{var u=Math.abs(n-+this._x.call(null,l.data));u<t&&(t=u,i=n-u,a=n+u,e=l.data)}return e}function uh(n){if(isNaN(l=+this._x.call(null,n)))return this;var t,e=this._root,i,s,r,a=this._x0,o=this._x1,l,c,h,d,u;if(!e)return this;if(e.length)for(;;){if((h=l>=(c=(a+o)/2))?a=c:o=c,t=e,!(e=e[d=+h]))return this;if(!e.length)break;t[d+1&1]&&(i=t,u=d)}for(;e.data!==n;)if(s=e,!(e=e.next))return this;return(r=e.next)&&delete e.next,s?(r?s.next=r:delete s.next,this):t?(r?t[d]=r:delete t[d],(e=t[0]||t[1])&&e===(t[1]||t[0])&&!e.length&&(i?i[u]=e:this._root=e),this):(this._root=r,this)}function fh(n){for(var t=0,e=n.length;t<e;++t)this.remove(n[t]);return this}function dh(){return this._root}function ph(){var n=0;return this.visit(function(t){if(!t.length)do++n;while(t=t.next)}),n}function mh(n){var t=[],e,i=this._root,s,r,a;for(i&&t.push(new ci(i,this._x0,this._x1));e=t.pop();)if(!n(i=e.node,r=e.x0,a=e.x1)&&i.length){var o=(r+a)/2;(s=i[1])&&t.push(new ci(s,o,a)),(s=i[0])&&t.push(new ci(s,r,o))}return this}function gh(n){var t=[],e=[],i;for(this._root&&t.push(new ci(this._root,this._x0,this._x1));i=t.pop();){var s=i.node;if(s.length){var r,a=i.x0,o=i.x1,l=(a+o)/2;(r=s[0])&&t.push(new ci(r,a,l)),(r=s[1])&&t.push(new ci(r,l,o))}e.push(i)}for(;i=e.pop();)n(i.node,i.x0,i.x1);return this}function _h(n){return n[0]}function xh(n){return arguments.length?(this._x=n,this):this._x}function gn(n,t){var e=new al(t??_h,NaN,NaN);return n==null?e:e.addAll(n)}function al(n,t,e){this._x=n,this._x0=t,this._x1=e,this._root=void 0}function vh(n){for(var t={data:n.data},e=t;n=n.next;)e=e.next={data:n.data};return t}var Ze=gn.prototype=al.prototype;Ze.copy=function(){var n=new al(this._x,this._x0,this._x1),t=this._root,e,i;if(!t)return n;if(!t.length)return n._root=vh(t),n;for(e=[{source:t,target:n._root=new Array(2)}];t=e.pop();)for(var s=0;s<2;++s)(i=t.source[s])&&(i.length?e.push({source:i,target:t.target[s]=new Array(2)}):t.target[s]=vh(i));return n};Ze.add=sh;Ze.addAll=ah;Ze.cover=oh;Ze.data=lh;Ze.extent=ch;Ze.find=hh;Ze.remove=uh;Ze.removeAll=fh;Ze.root=dh;Ze.size=ph;Ze.visit=mh;Ze.visitAfter=gh;Ze.x=xh;function yh(n){let t=+this._x.call(null,n),e=+this._y.call(null,n);return Mh(this.cover(t,e),t,e,n)}function Mh(n,t,e,i){if(isNaN(t)||isNaN(e))return n;var s,r=n._root,a={data:i},o=n._x0,l=n._y0,c=n._x1,h=n._y1,d,u,p,m,M,g,f,w;if(!r)return n._root=a,n;for(;r.length;)if((M=t>=(d=(o+c)/2))?o=d:c=d,(g=e>=(u=(l+h)/2))?l=u:h=u,s=r,!(r=r[f=g<<1|M]))return s[f]=a,n;if(p=+n._x.call(null,r.data),m=+n._y.call(null,r.data),t===p&&e===m)return a.next=r,s?s[f]=a:n._root=a,n;do s=s?s[f]=new Array(4):n._root=new Array(4),(M=t>=(d=(o+c)/2))?o=d:c=d,(g=e>=(u=(l+h)/2))?l=u:h=u;while((f=g<<1|M)===(w=(m>=u)<<1|p>=d));return s[w]=r,s[f]=a,n}function bh(n){var t,e,i=n.length,s,r,a=new Array(i),o=new Array(i),l=1/0,c=1/0,h=-1/0,d=-1/0;for(e=0;e<i;++e)isNaN(s=+this._x.call(null,t=n[e]))||isNaN(r=+this._y.call(null,t))||(a[e]=s,o[e]=r,s<l&&(l=s),s>h&&(h=s),r<c&&(c=r),r>d&&(d=r));if(l>h||c>d)return this;for(this.cover(l,c).cover(h,d),e=0;e<i;++e)Mh(this,a[e],o[e],n[e]);return this}function Sh(n,t){if(isNaN(n=+n)||isNaN(t=+t))return this;var e=this._x0,i=this._y0,s=this._x1,r=this._y1;if(isNaN(e))s=(e=Math.floor(n))+1,r=(i=Math.floor(t))+1;else{for(var a=s-e||1,o=this._root,l,c;e>n||n>=s||i>t||t>=r;)switch(c=(t<i)<<1|n<e,l=new Array(4),l[c]=o,o=l,a*=2,c){case 0:s=e+a,r=i+a;break;case 1:e=s-a,r=i+a;break;case 2:s=e+a,i=r-a;break;case 3:e=s-a,i=r-a;break}this._root&&this._root.length&&(this._root=o)}return this._x0=e,this._y0=i,this._x1=s,this._y1=r,this}function wh(){var n=[];return this.visit(function(t){if(!t.length)do n.push(t.data);while(t=t.next)}),n}function Eh(n){return arguments.length?this.cover(+n[0][0],+n[0][1]).cover(+n[1][0],+n[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function Ae(n,t,e,i,s){this.node=n,this.x0=t,this.y0=e,this.x1=i,this.y1=s}function Th(n,t,e){var i,s=this._x0,r=this._y0,a,o,l,c,h=this._x1,d=this._y1,u=[],p=this._root,m,M;for(p&&u.push(new Ae(p,s,r,h,d)),e==null?e=1/0:(s=n-e,r=t-e,h=n+e,d=t+e,e*=e);m=u.pop();)if(!(!(p=m.node)||(a=m.x0)>h||(o=m.y0)>d||(l=m.x1)<s||(c=m.y1)<r))if(p.length){var g=(a+l)/2,f=(o+c)/2;u.push(new Ae(p[3],g,f,l,c),new Ae(p[2],a,f,g,c),new Ae(p[1],g,o,l,f),new Ae(p[0],a,o,g,f)),(M=(t>=f)<<1|n>=g)&&(m=u[u.length-1],u[u.length-1]=u[u.length-1-M],u[u.length-1-M]=m)}else{var w=n-+this._x.call(null,p.data),T=t-+this._y.call(null,p.data),y=w*w+T*T;if(y<e){var v=Math.sqrt(e=y);s=n-v,r=t-v,h=n+v,d=t+v,i=p.data}}return i}function Ah(n){if(isNaN(h=+this._x.call(null,n))||isNaN(d=+this._y.call(null,n)))return this;var t,e=this._root,i,s,r,a=this._x0,o=this._y0,l=this._x1,c=this._y1,h,d,u,p,m,M,g,f;if(!e)return this;if(e.length)for(;;){if((m=h>=(u=(a+l)/2))?a=u:l=u,(M=d>=(p=(o+c)/2))?o=p:c=p,t=e,!(e=e[g=M<<1|m]))return this;if(!e.length)break;(t[g+1&3]||t[g+2&3]||t[g+3&3])&&(i=t,f=g)}for(;e.data!==n;)if(s=e,!(e=e.next))return this;return(r=e.next)&&delete e.next,s?(r?s.next=r:delete s.next,this):t?(r?t[g]=r:delete t[g],(e=t[0]||t[1]||t[2]||t[3])&&e===(t[3]||t[2]||t[1]||t[0])&&!e.length&&(i?i[f]=e:this._root=e),this):(this._root=r,this)}function Ch(n){for(var t=0,e=n.length;t<e;++t)this.remove(n[t]);return this}function Rh(){return this._root}function Ph(){var n=0;return this.visit(function(t){if(!t.length)do++n;while(t=t.next)}),n}function Ih(n){var t=[],e,i=this._root,s,r,a,o,l;for(i&&t.push(new Ae(i,this._x0,this._y0,this._x1,this._y1));e=t.pop();)if(!n(i=e.node,r=e.x0,a=e.y0,o=e.x1,l=e.y1)&&i.length){var c=(r+o)/2,h=(a+l)/2;(s=i[3])&&t.push(new Ae(s,c,h,o,l)),(s=i[2])&&t.push(new Ae(s,r,h,c,l)),(s=i[1])&&t.push(new Ae(s,c,a,o,h)),(s=i[0])&&t.push(new Ae(s,r,a,c,h))}return this}function Lh(n){var t=[],e=[],i;for(this._root&&t.push(new Ae(this._root,this._x0,this._y0,this._x1,this._y1));i=t.pop();){var s=i.node;if(s.length){var r,a=i.x0,o=i.y0,l=i.x1,c=i.y1,h=(a+l)/2,d=(o+c)/2;(r=s[0])&&t.push(new Ae(r,a,o,h,d)),(r=s[1])&&t.push(new Ae(r,h,o,l,d)),(r=s[2])&&t.push(new Ae(r,a,d,h,c)),(r=s[3])&&t.push(new Ae(r,h,d,l,c))}e.push(i)}for(;i=e.pop();)n(i.node,i.x0,i.y0,i.x1,i.y1);return this}function Dh(n){return n[0]}function Nh(n){return arguments.length?(this._x=n,this):this._x}function Uh(n){return n[1]}function Fh(n){return arguments.length?(this._y=n,this):this._y}function _n(n,t,e){var i=new ol(t??Dh,e??Uh,NaN,NaN,NaN,NaN);return n==null?i:i.addAll(n)}function ol(n,t,e,i,s,r){this._x=n,this._y=t,this._x0=e,this._y0=i,this._x1=s,this._y1=r,this._root=void 0}function Oh(n){for(var t={data:n.data},e=t;n=n.next;)e=e.next={data:n.data};return t}var He=_n.prototype=ol.prototype;He.copy=function(){var n=new ol(this._x,this._y,this._x0,this._y0,this._x1,this._y1),t=this._root,e,i;if(!t)return n;if(!t.length)return n._root=Oh(t),n;for(e=[{source:t,target:n._root=new Array(4)}];t=e.pop();)for(var s=0;s<4;++s)(i=t.source[s])&&(i.length?e.push({source:i,target:t.target[s]=new Array(4)}):t.target[s]=Oh(i));return n};He.add=yh;He.addAll=bh;He.cover=Sh;He.data=wh;He.extent=Eh;He.find=Th;He.remove=Ah;He.removeAll=Ch;He.root=Rh;He.size=Ph;He.visit=Ih;He.visitAfter=Lh;He.x=Nh;He.y=Fh;function Bh(n){let t=+this._x.call(null,n),e=+this._y.call(null,n),i=+this._z.call(null,n);return zh(this.cover(t,e,i),t,e,i,n)}function zh(n,t,e,i,s){if(isNaN(t)||isNaN(e)||isNaN(i))return n;var r,a=n._root,o={data:s},l=n._x0,c=n._y0,h=n._z0,d=n._x1,u=n._y1,p=n._z1,m,M,g,f,w,T,y,v,b,A,_;if(!a)return n._root=o,n;for(;a.length;)if((y=t>=(m=(l+d)/2))?l=m:d=m,(v=e>=(M=(c+u)/2))?c=M:u=M,(b=i>=(g=(h+p)/2))?h=g:p=g,r=a,!(a=a[A=b<<2|v<<1|y]))return r[A]=o,n;if(f=+n._x.call(null,a.data),w=+n._y.call(null,a.data),T=+n._z.call(null,a.data),t===f&&e===w&&i===T)return o.next=a,r?r[A]=o:n._root=o,n;do r=r?r[A]=new Array(8):n._root=new Array(8),(y=t>=(m=(l+d)/2))?l=m:d=m,(v=e>=(M=(c+u)/2))?c=M:u=M,(b=i>=(g=(h+p)/2))?h=g:p=g;while((A=b<<2|v<<1|y)===(_=(T>=g)<<2|(w>=M)<<1|f>=m));return r[_]=a,r[A]=o,n}function kh(n){Array.isArray(n)||(n=Array.from(n));let t=n.length,e=new Float64Array(t),i=new Float64Array(t),s=new Float64Array(t),r=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,h=-1/0;for(let d=0,u,p,m,M;d<t;++d)isNaN(p=+this._x.call(null,u=n[d]))||isNaN(m=+this._y.call(null,u))||isNaN(M=+this._z.call(null,u))||(e[d]=p,i[d]=m,s[d]=M,p<r&&(r=p),p>l&&(l=p),m<a&&(a=m),m>c&&(c=m),M<o&&(o=M),M>h&&(h=M));if(r>l||a>c||o>h)return this;this.cover(r,a,o).cover(l,c,h);for(let d=0;d<t;++d)zh(this,e[d],i[d],s[d],n[d]);return this}function Vh(n,t,e){if(isNaN(n=+n)||isNaN(t=+t)||isNaN(e=+e))return this;var i=this._x0,s=this._y0,r=this._z0,a=this._x1,o=this._y1,l=this._z1;if(isNaN(i))a=(i=Math.floor(n))+1,o=(s=Math.floor(t))+1,l=(r=Math.floor(e))+1;else{for(var c=a-i||1,h=this._root,d,u;i>n||n>=a||s>t||t>=o||r>e||e>=l;)switch(u=(e<r)<<2|(t<s)<<1|n<i,d=new Array(8),d[u]=h,h=d,c*=2,u){case 0:a=i+c,o=s+c,l=r+c;break;case 1:i=a-c,o=s+c,l=r+c;break;case 2:a=i+c,s=o-c,l=r+c;break;case 3:i=a-c,s=o-c,l=r+c;break;case 4:a=i+c,o=s+c,r=l-c;break;case 5:i=a-c,o=s+c,r=l-c;break;case 6:a=i+c,s=o-c,r=l-c;break;case 7:i=a-c,s=o-c,r=l-c;break}this._root&&this._root.length&&(this._root=h)}return this._x0=i,this._y0=s,this._z0=r,this._x1=a,this._y1=o,this._z1=l,this}function Hh(){var n=[];return this.visit(function(t){if(!t.length)do n.push(t.data);while(t=t.next)}),n}function Gh(n){return arguments.length?this.cover(+n[0][0],+n[0][1],+n[0][2]).cover(+n[1][0],+n[1][1],+n[1][2]):isNaN(this._x0)?void 0:[[this._x0,this._y0,this._z0],[this._x1,this._y1,this._z1]]}function ne(n,t,e,i,s,r,a){this.node=n,this.x0=t,this.y0=e,this.z0=i,this.x1=s,this.y1=r,this.z1=a}function Wh(n,t,e,i){var s,r=this._x0,a=this._y0,o=this._z0,l,c,h,d,u,p,m=this._x1,M=this._y1,g=this._z1,f=[],w=this._root,T,y;for(w&&f.push(new ne(w,r,a,o,m,M,g)),i==null?i=1/0:(r=n-i,a=t-i,o=e-i,m=n+i,M=t+i,g=e+i,i*=i);T=f.pop();)if(!(!(w=T.node)||(l=T.x0)>m||(c=T.y0)>M||(h=T.z0)>g||(d=T.x1)<r||(u=T.y1)<a||(p=T.z1)<o))if(w.length){var v=(l+d)/2,b=(c+u)/2,A=(h+p)/2;f.push(new ne(w[7],v,b,A,d,u,p),new ne(w[6],l,b,A,v,u,p),new ne(w[5],v,c,A,d,b,p),new ne(w[4],l,c,A,v,b,p),new ne(w[3],v,b,h,d,u,A),new ne(w[2],l,b,h,v,u,A),new ne(w[1],v,c,h,d,b,A),new ne(w[0],l,c,h,v,b,A)),(y=(e>=A)<<2|(t>=b)<<1|n>=v)&&(T=f[f.length-1],f[f.length-1]=f[f.length-1-y],f[f.length-1-y]=T)}else{var _=n-+this._x.call(null,w.data),E=t-+this._y.call(null,w.data),C=e-+this._z.call(null,w.data),P=_*_+E*E+C*C;if(P<i){var I=Math.sqrt(i=P);r=n-I,a=t-I,o=e-I,m=n+I,M=t+I,g=e+I,s=w.data}}return s}var Vd=(n,t,e,i,s,r)=>Math.sqrt((n-i)**2+(t-s)**2+(e-r)**2);function Xh(n,t,e,i){let s=[],r=n-i,a=t-i,o=e-i,l=n+i,c=t+i,h=e+i;return this.visit((d,u,p,m,M,g,f)=>{if(!d.length)do{let w=d.data;Vd(n,t,e,this._x(w),this._y(w),this._z(w))<=i&&s.push(w)}while(d=d.next);return u>l||p>c||m>h||M<r||g<a||f<o}),s}function qh(n){if(isNaN(u=+this._x.call(null,n))||isNaN(p=+this._y.call(null,n))||isNaN(m=+this._z.call(null,n)))return this;var t,e=this._root,i,s,r,a=this._x0,o=this._y0,l=this._z0,c=this._x1,h=this._y1,d=this._z1,u,p,m,M,g,f,w,T,y,v,b;if(!e)return this;if(e.length)for(;;){if((w=u>=(M=(a+c)/2))?a=M:c=M,(T=p>=(g=(o+h)/2))?o=g:h=g,(y=m>=(f=(l+d)/2))?l=f:d=f,t=e,!(e=e[v=y<<2|T<<1|w]))return this;if(!e.length)break;(t[v+1&7]||t[v+2&7]||t[v+3&7]||t[v+4&7]||t[v+5&7]||t[v+6&7]||t[v+7&7])&&(i=t,b=v)}for(;e.data!==n;)if(s=e,!(e=e.next))return this;return(r=e.next)&&delete e.next,s?(r?s.next=r:delete s.next,this):t?(r?t[v]=r:delete t[v],(e=t[0]||t[1]||t[2]||t[3]||t[4]||t[5]||t[6]||t[7])&&e===(t[7]||t[6]||t[5]||t[4]||t[3]||t[2]||t[1]||t[0])&&!e.length&&(i?i[b]=e:this._root=e),this):(this._root=r,this)}function Yh(n){for(var t=0,e=n.length;t<e;++t)this.remove(n[t]);return this}function Zh(){return this._root}function Kh(){var n=0;return this.visit(function(t){if(!t.length)do++n;while(t=t.next)}),n}function Jh(n){var t=[],e,i=this._root,s,r,a,o,l,c,h;for(i&&t.push(new ne(i,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));e=t.pop();)if(!n(i=e.node,r=e.x0,a=e.y0,o=e.z0,l=e.x1,c=e.y1,h=e.z1)&&i.length){var d=(r+l)/2,u=(a+c)/2,p=(o+h)/2;(s=i[7])&&t.push(new ne(s,d,u,p,l,c,h)),(s=i[6])&&t.push(new ne(s,r,u,p,d,c,h)),(s=i[5])&&t.push(new ne(s,d,a,p,l,u,h)),(s=i[4])&&t.push(new ne(s,r,a,p,d,u,h)),(s=i[3])&&t.push(new ne(s,d,u,o,l,c,p)),(s=i[2])&&t.push(new ne(s,r,u,o,d,c,p)),(s=i[1])&&t.push(new ne(s,d,a,o,l,u,p)),(s=i[0])&&t.push(new ne(s,r,a,o,d,u,p))}return this}function $h(n){var t=[],e=[],i;for(this._root&&t.push(new ne(this._root,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));i=t.pop();){var s=i.node;if(s.length){var r,a=i.x0,o=i.y0,l=i.z0,c=i.x1,h=i.y1,d=i.z1,u=(a+c)/2,p=(o+h)/2,m=(l+d)/2;(r=s[0])&&t.push(new ne(r,a,o,l,u,p,m)),(r=s[1])&&t.push(new ne(r,u,o,l,c,p,m)),(r=s[2])&&t.push(new ne(r,a,p,l,u,h,m)),(r=s[3])&&t.push(new ne(r,u,p,l,c,h,m)),(r=s[4])&&t.push(new ne(r,a,o,m,u,p,d)),(r=s[5])&&t.push(new ne(r,u,o,m,c,p,d)),(r=s[6])&&t.push(new ne(r,a,p,m,u,h,d)),(r=s[7])&&t.push(new ne(r,u,p,m,c,h,d))}e.push(i)}for(;i=e.pop();)n(i.node,i.x0,i.y0,i.z0,i.x1,i.y1,i.z1);return this}function jh(n){return n[0]}function Qh(n){return arguments.length?(this._x=n,this):this._x}function tu(n){return n[1]}function eu(n){return arguments.length?(this._y=n,this):this._y}function iu(n){return n[2]}function nu(n){return arguments.length?(this._z=n,this):this._z}function xn(n,t,e,i){var s=new ll(t??jh,e??tu,i??iu,NaN,NaN,NaN,NaN,NaN,NaN);return n==null?s:s.addAll(n)}function ll(n,t,e,i,s,r,a,o,l){this._x=n,this._y=t,this._z=e,this._x0=i,this._y0=s,this._z0=r,this._x1=a,this._y1=o,this._z1=l,this._root=void 0}function su(n){for(var t={data:n.data},e=t;n=n.next;)e=e.next={data:n.data};return t}var Pe=xn.prototype=ll.prototype;Pe.copy=function(){var n=new ll(this._x,this._y,this._z,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1),t=this._root,e,i;if(!t)return n;if(!t.length)return n._root=su(t),n;for(e=[{source:t,target:n._root=new Array(8)}];t=e.pop();)for(var s=0;s<8;++s)(i=t.source[s])&&(i.length?e.push({source:i,target:t.target[s]=new Array(8)}):t.target[s]=su(i));return n};Pe.add=Bh;Pe.addAll=kh;Pe.cover=Vh;Pe.data=Hh;Pe.extent=Gh;Pe.find=Wh;Pe.findAllWithinRadius=Xh;Pe.remove=qh;Pe.removeAll=Yh;Pe.root=Zh;Pe.size=Kh;Pe.visit=Jh;Pe.visitAfter=$h;Pe.x=Qh;Pe.y=eu;Pe.z=nu;function Ei(n){return function(){return n}}function Ge(n){return(n()-.5)*1e-6}function cl(n){return n.x+n.vx}function ru(n){return n.y+n.vy}function Hd(n){return n.z+n.vz}function Ar(n){var t,e,i,s,r=1,a=1;typeof n!="function"&&(n=Ei(n==null?1:+n));function o(){for(var h,d=t.length,u,p,m,M,g,f,w,T=0;T<a;++T)for(u=(e===1?gn(t,cl):e===2?_n(t,cl,ru):e===3?xn(t,cl,ru,Hd):null).visitAfter(l),h=0;h<d;++h)p=t[h],f=i[p.index],w=f*f,m=p.x+p.vx,e>1&&(M=p.y+p.vy),e>2&&(g=p.z+p.vz),u.visit(y);function y(v,b,A,_,E,C,P){var I=[b,A,_,E,C,P],F=I[0],L=I[1],z=I[2],Z=I[e],X=I[e+1],et=I[e+2],H=v.data,$=v.r,K=f+$;if(H){if(H.index>p.index){var ht=m-H.x-H.vx,gt=e>1?M-H.y-H.vy:0,Bt=e>2?g-H.z-H.vz:0,At=ht*ht+gt*gt+Bt*Bt;At<K*K&&(ht===0&&(ht=Ge(s),At+=ht*ht),e>1&&gt===0&&(gt=Ge(s),At+=gt*gt),e>2&&Bt===0&&(Bt=Ge(s),At+=Bt*Bt),At=(K-(At=Math.sqrt(At)))/At*r,p.vx+=(ht*=At)*(K=($*=$)/(w+$)),e>1&&(p.vy+=(gt*=At)*K),e>2&&(p.vz+=(Bt*=At)*K),H.vx-=ht*(K=1-K),e>1&&(H.vy-=gt*K),e>2&&(H.vz-=Bt*K))}return}return F>m+K||Z<m-K||e>1&&(L>M+K||X<M-K)||e>2&&(z>g+K||et<g-K)}}function l(h){if(h.data)return h.r=i[h.data.index];for(var d=h.r=0;d<Math.pow(2,e);++d)h[d]&&h[d].r>h.r&&(h.r=h[d].r)}function c(){if(t){var h,d=t.length,u;for(i=new Array(d),h=0;h<d;++h)u=t[h],i[u.index]=+n(u,h,t)}}return o.initialize=function(h,...d){t=h,s=d.find(u=>typeof u=="function")||Math.random,e=d.find(u=>[1,2,3].includes(u))||2,c()},o.iterations=function(h){return arguments.length?(a=+h,o):a},o.strength=function(h){return arguments.length?(r=+h,o):r},o.radius=function(h){return arguments.length?(n=typeof h=="function"?h:Ei(+h),c(),o):n},o}function Gd(n){return n.index}function au(n,t){var e=n.get(t);if(!e)throw new Error("node not found: "+t);return e}function Cr(n){var t=Gd,e=u,i,s=Ei(30),r,a,o,l,c,h,d=1;n==null&&(n=[]);function u(f){return 1/Math.min(l[f.source.index],l[f.target.index])}function p(f){for(var w=0,T=n.length;w<d;++w)for(var y=0,v,b,A,_=0,E=0,C=0,P,I;y<T;++y)v=n[y],b=v.source,A=v.target,_=A.x+A.vx-b.x-b.vx||Ge(h),o>1&&(E=A.y+A.vy-b.y-b.vy||Ge(h)),o>2&&(C=A.z+A.vz-b.z-b.vz||Ge(h)),P=Math.sqrt(_*_+E*E+C*C),P=(P-r[y])/P*f*i[y],_*=P,E*=P,C*=P,A.vx-=_*(I=c[y]),o>1&&(A.vy-=E*I),o>2&&(A.vz-=C*I),b.vx+=_*(I=1-I),o>1&&(b.vy+=E*I),o>2&&(b.vz+=C*I)}function m(){if(a){var f,w=a.length,T=n.length,y=new Map(a.map((b,A)=>[t(b,A,a),b])),v;for(f=0,l=new Array(w);f<T;++f)v=n[f],v.index=f,typeof v.source!="object"&&(v.source=au(y,v.source)),typeof v.target!="object"&&(v.target=au(y,v.target)),l[v.source.index]=(l[v.source.index]||0)+1,l[v.target.index]=(l[v.target.index]||0)+1;for(f=0,c=new Array(T);f<T;++f)v=n[f],c[f]=l[v.source.index]/(l[v.source.index]+l[v.target.index]);i=new Array(T),M(),r=new Array(T),g()}}function M(){if(a)for(var f=0,w=n.length;f<w;++f)i[f]=+e(n[f],f,n)}function g(){if(a)for(var f=0,w=n.length;f<w;++f)r[f]=+s(n[f],f,n)}return p.initialize=function(f,...w){a=f,h=w.find(T=>typeof T=="function")||Math.random,o=w.find(T=>[1,2,3].includes(T))||2,m()},p.links=function(f){return arguments.length?(n=f,m(),p):n},p.id=function(f){return arguments.length?(t=f,p):t},p.iterations=function(f){return arguments.length?(d=+f,p):d},p.strength=function(f){return arguments.length?(e=typeof f=="function"?f:Ei(+f),M(),p):e},p.distance=function(f){return arguments.length?(s=typeof f=="function"?f:Ei(+f),g(),p):s},p}var Wd={value:()=>{}};function lu(){for(var n=0,t=arguments.length,e={},i;n<t;++n){if(!(i=arguments[n]+"")||i in e||/[\s.]/.test(i))throw new Error("illegal type: "+i);e[i]=[]}return new Rr(e)}function Rr(n){this._=n}function Xd(n,t){return n.trim().split(/^|\s+/).map(function(e){var i="",s=e.indexOf(".");if(s>=0&&(i=e.slice(s+1),e=e.slice(0,s)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:i}})}Rr.prototype=lu.prototype={constructor:Rr,on:function(n,t){var e=this._,i=Xd(n+"",e),s,r=-1,a=i.length;if(arguments.length<2){for(;++r<a;)if((s=(n=i[r]).type)&&(s=qd(e[s],n.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++r<a;)if(s=(n=i[r]).type)e[s]=ou(e[s],n.name,t);else if(t==null)for(s in e)e[s]=ou(e[s],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new Rr(n)},call:function(n,t){if((s=arguments.length-2)>0)for(var e=new Array(s),i=0,s,r;i<s;++i)e[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(r=this._[n],i=0,s=r.length;i<s;++i)r[i].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var i=this._[n],s=0,r=i.length;s<r;++s)i[s].value.apply(t,e)}};function qd(n,t){for(var e=0,i=n.length,s;e<i;++e)if((s=n[e]).name===t)return s.value}function ou(n,t,e){for(var i=0,s=n.length;i<s;++i)if(n[i].name===t){n[i]=Wd,n=n.slice(0,i).concat(n.slice(i+1));break}return e!=null&&n.push({name:t,value:e}),n}var hl=lu;var Un=0,ys=0,vs=0,hu=1e3,Pr,Ms,Ir=0,vn=0,Lr=0,bs=typeof performance=="object"&&performance.now?performance:Date,uu=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function dl(){return vn||(uu(Yd),vn=bs.now()+Lr)}function Yd(){vn=0}function ul(){this._call=this._time=this._next=null}ul.prototype=Dr.prototype={constructor:ul,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?dl():+e)+(t==null?0:+t),!this._next&&Ms!==this&&(Ms?Ms._next=this:Pr=this,Ms=this),this._call=n,this._time=e,fl()},stop:function(){this._call&&(this._call=null,this._time=1/0,fl())}};function Dr(n,t,e){var i=new ul;return i.restart(n,t,e),i}function fu(){dl(),++Un;for(var n=Pr,t;n;)(t=vn-n._time)>=0&&n._call.call(void 0,t),n=n._next;--Un}function cu(){vn=(Ir=bs.now())+Lr,Un=ys=0;try{fu()}finally{Un=0,Kd(),vn=0}}function Zd(){var n=bs.now(),t=n-Ir;t>hu&&(Lr-=t,Ir=n)}function Kd(){for(var n,t=Pr,e,i=1/0;t;)t._call?(i>t._time&&(i=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:Pr=e);Ms=n,fl(i)}function fl(n){if(!Un){ys&&(ys=clearTimeout(ys));var t=n-vn;t>24?(n<1/0&&(ys=setTimeout(cu,n-bs.now()-Lr)),vs&&(vs=clearInterval(vs))):(vs||(Ir=bs.now(),vs=setInterval(Zd,hu)),Un=1,uu(cu))}}function du(){let n=1;return()=>(n=(1664525*n+1013904223)%4294967296)/4294967296}var pu=3;function Nr(n){return n.x}function pl(n){return n.y}function mu(n){return n.z}var Jd=10,$d=Math.PI*(3-Math.sqrt(5)),jd=Math.PI*20/(9+Math.sqrt(221));function Ur(n,t){t=t||2;var e=Math.min(pu,Math.max(1,Math.round(t))),i,s=1,r=.001,a=1-Math.pow(r,1/300),o=0,l=.6,c=new Map,h=Dr(p),d=hl("tick","end"),u=du();n==null&&(n=[]);function p(){m(),d.call("tick",i),s<r&&(h.stop(),d.call("end",i))}function m(f){var w,T=n.length,y;f===void 0&&(f=1);for(var v=0;v<f;++v)for(s+=(o-s)*a,c.forEach(function(b){b(s)}),w=0;w<T;++w)y=n[w],y.fx==null?y.x+=y.vx*=l:(y.x=y.fx,y.vx=0),e>1&&(y.fy==null?y.y+=y.vy*=l:(y.y=y.fy,y.vy=0)),e>2&&(y.fz==null?y.z+=y.vz*=l:(y.z=y.fz,y.vz=0));return i}function M(){for(var f=0,w=n.length,T;f<w;++f){if(T=n[f],T.index=f,T.fx!=null&&(T.x=T.fx),T.fy!=null&&(T.y=T.fy),T.fz!=null&&(T.z=T.fz),isNaN(T.x)||e>1&&isNaN(T.y)||e>2&&isNaN(T.z)){var y=Jd*(e>2?Math.cbrt(.5+f):e>1?Math.sqrt(.5+f):f),v=f*$d,b=f*jd;e===1?T.x=y:e===2?(T.x=y*Math.cos(v),T.y=y*Math.sin(v)):(T.x=y*Math.sin(v)*Math.cos(b),T.y=y*Math.cos(v),T.z=y*Math.sin(v)*Math.sin(b))}(isNaN(T.vx)||e>1&&isNaN(T.vy)||e>2&&isNaN(T.vz))&&(T.vx=0,e>1&&(T.vy=0),e>2&&(T.vz=0))}}function g(f){return f.initialize&&f.initialize(n,u,e),f}return M(),i={tick:m,restart:function(){return h.restart(p),i},stop:function(){return h.stop(),i},numDimensions:function(f){return arguments.length?(e=Math.min(pu,Math.max(1,Math.round(f))),c.forEach(g),i):e},nodes:function(f){return arguments.length?(n=f,M(),c.forEach(g),i):n},alpha:function(f){return arguments.length?(s=+f,i):s},alphaMin:function(f){return arguments.length?(r=+f,i):r},alphaDecay:function(f){return arguments.length?(a=+f,i):+a},alphaTarget:function(f){return arguments.length?(o=+f,i):o},velocityDecay:function(f){return arguments.length?(l=1-f,i):1-l},randomSource:function(f){return arguments.length?(u=f,c.forEach(g),i):u},force:function(f,w){return arguments.length>1?(w==null?c.delete(f):c.set(f,g(w)),i):c.get(f)},find:function(){var f=Array.prototype.slice.call(arguments),w=f.shift()||0,T=(e>1?f.shift():null)||0,y=(e>2?f.shift():null)||0,v=f.shift()||1/0,b=0,A=n.length,_,E,C,P,I,F;for(v*=v,b=0;b<A;++b)I=n[b],_=w-I.x,E=T-(I.y||0),C=y-(I.z||0),P=_*_+E*E+C*C,P<v&&(F=I,v=P);return F},on:function(f,w){return arguments.length>1?(d.on(f,w),i):d.on(f)}}}function Fr(){var n,t,e,i,s,r=Ei(-30),a,o=1,l=1/0,c=.81;function h(m){var M,g=n.length,f=(t===1?gn(n,Nr):t===2?_n(n,Nr,pl):t===3?xn(n,Nr,pl,mu):null).visitAfter(u);for(s=m,M=0;M<g;++M)e=n[M],f.visit(p)}function d(){if(n){var m,M=n.length,g;for(a=new Array(M),m=0;m<M;++m)g=n[m],a[g.index]=+r(g,m,n)}}function u(m){var M=0,g,f,w=0,T,y,v,b,A=m.length;if(A){for(T=y=v=b=0;b<A;++b)(g=m[b])&&(f=Math.abs(g.value))&&(M+=g.value,w+=f,T+=f*(g.x||0),y+=f*(g.y||0),v+=f*(g.z||0));M*=Math.sqrt(4/A),m.x=T/w,t>1&&(m.y=y/w),t>2&&(m.z=v/w)}else{g=m,g.x=g.data.x,t>1&&(g.y=g.data.y),t>2&&(g.z=g.data.z);do M+=a[g.data.index];while(g=g.next)}m.value=M}function p(m,M,g,f,w){if(!m.value)return!0;var T=[g,f,w][t-1],y=m.x-e.x,v=t>1?m.y-e.y:0,b=t>2?m.z-e.z:0,A=T-M,_=y*y+v*v+b*b;if(A*A/c<_)return _<l&&(y===0&&(y=Ge(i),_+=y*y),t>1&&v===0&&(v=Ge(i),_+=v*v),t>2&&b===0&&(b=Ge(i),_+=b*b),_<o&&(_=Math.sqrt(o*_)),e.vx+=y*m.value*s/_,t>1&&(e.vy+=v*m.value*s/_),t>2&&(e.vz+=b*m.value*s/_)),!0;if(m.length||_>=l)return;(m.data!==e||m.next)&&(y===0&&(y=Ge(i),_+=y*y),t>1&&v===0&&(v=Ge(i),_+=v*v),t>2&&b===0&&(b=Ge(i),_+=b*b),_<o&&(_=Math.sqrt(o*_)));do m.data!==e&&(A=a[m.data.index]*s/_,e.vx+=y*A,t>1&&(e.vy+=v*A),t>2&&(e.vz+=b*A));while(m=m.next)}return h.initialize=function(m,...M){n=m,i=M.find(g=>typeof g=="function")||Math.random,t=M.find(g=>[1,2,3].includes(g))||2,d()},h.strength=function(m){return arguments.length?(r=typeof m=="function"?m:Ei(+m),d(),h):r},h.distanceMin=function(m){return arguments.length?(o=m*m,h):Math.sqrt(o)},h.distanceMax=function(m){return arguments.length?(l=m*m,h):Math.sqrt(l)},h.theta=function(m){return arguments.length?(c=m*m,h):Math.sqrt(c)},h}function Qd(n){let t=n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function tp(n){let t=2166136261;for(let e=0;e<n.length;e++)t=Math.imul(t^n.charCodeAt(e),16777619);return t>>>0}var Or=class{constructor(t,e,i){k(this,"g",t);k(this,"o",e);k(this,"pos");k(this,"done",!1);k(this,"progress",0);k(this,"sim",null);k(this,"nodes",[]);k(this,"ticksLeft",0);k(this,"totalTicks",1);k(this,"incremental",!1);let s=t.n;this.pos=new Float32Array(s*3);let r=e.dim,a=Qd(2654435769^s),o=new Uint8Array(s),l=0;if(i)for(let _=0;_<s;_++){let E=i[t.ids[_]];E&&(this.pos[_*3]=E[0],this.pos[_*3+1]=E[1],this.pos[_*3+2]=r===3?E[2]:0,o[_]=1,l++)}if(l===s){this.done=!0,this.progress=1;return}this.incremental=l>=s*.6;let c=e.spread,h=new Float32Array(s);for(let _=0;_<s;_++)h[_]=e.useMicro?(Math.max(t.radius[_]*1.9,t.microRadius[_]*.9)+1.4)*Math.sqrt(c):(t.radius[_]*(r===2?2.6:2)+3)*c;let d=this.placeClusters(a,o,h),u=d.anchors,p=new Array(s);for(let _=0;_<s;_++){let E,C,P;if(this.incremental&&o[_])E=this.pos[_*3],C=this.pos[_*3+1],P=this.pos[_*3+2];else{let I=u[t.cluster[_]],F=I[0],L=I[1],z=I[2];if(this.incremental){let X=0,et=0,H=0,$=0;for(let K=t.adjStart[_];K<t.adjStart[_+1];K++){let ht=t.adjNode[K];o[ht]&&(X+=this.pos[ht*3],et+=this.pos[ht*3+1],H+=this.pos[ht*3+2],$++)}$&&(F=X/$,L=et/$,z=H/$)}let Z=this.incremental?10:d.rad[t.cluster[_]]*.6;E=F+(a()*2-1)*Z,C=L+(a()*2-1)*Z,P=r===3?z+(a()*2-1)*Z:0}p[_]={index:_,x:E,y:C,z:P,vx:0,vy:0,vz:0},this.incremental&&o[_]&&(p[_].fx=E,p[_].fy=C,p[_].fz=r===3?P:0)}this.nodes=p;let m=[];for(let _=0;_<t.e;_++){let E=t.eSrc[_],C=t.eDst[_];m.push({source:E,target:C,mega:t.mega[E]===1||t.mega[C]===1})}let M=t.degree,g=Cr(m).id(_=>_.index).distance(_=>(_.mega?90:26+2.2*Math.min(6,Math.sqrt(Math.min(M[_.source.index],M[_.target.index]))))*c).strength(_=>_.mega?.015:.5/Math.min(M[_.source.index]||1,M[_.target.index]||1)),f=Fr().strength(-30*c).theta(.92).distanceMax(260*c),w=Ar().radius(_=>h[_.index]).strength(.85).iterations(1),T=e.brain,y=d.extent,v=_=>{let E=.1*_+(r===2?.022:.006);for(let C=0;C<s;C++){let P=p[C];if(P.fx!=null)continue;let I=u[t.cluster[C]];P.vx+=(I[0]-P.x)*E,P.vy+=(I[1]-P.y)*E,r===3&&(P.vz+=(I[2]-P.z)*E)}},b=()=>{for(let _=0;_<s;_++){let E=p[_];if(E.fx==null)if(r===3){let C=E.x<0?-.26*y[0]:.26*y[0],P=(E.x-C)/(.78*y[0]),I=E.y/y[1],F=E.z/y[2],L=Math.sqrt(P*P+I*I+F*F);if(L>1){let z=.035*(.4+T)*(L-1);E.vx+=(C-E.x)*z,E.vy-=E.y*z,E.vz-=E.z*z}}else{let C=E.x/y[0],P=E.y/y[1],I=Math.sqrt(C*C+P*P);if(I>1){let F=.04*(I-1);E.vx-=E.x*F,E.vy-=E.y*F}}}},A=()=>{for(let _=0;_<s;_++){let E=p[_];if(E.fx!=null)continue;let C=t.cluster[_],P=u[C],I=E.x-P[0],F=E.y-P[1],L=r===3?E.z-P[2]:0,z=Math.sqrt(I*I+F*F+L*L),Z=d.rad[C]*1.05;if(z>Z){let X=.06*(z-Z)/z;E.vx-=I*X,E.vy-=F*X,r===3&&(E.vz-=L*X)}}};A.initialize=()=>{},v.initialize=()=>{},b.initialize=()=>{},this.totalTicks=this.incremental?120:320,this.ticksLeft=this.totalTicks,this.sim=Ur(p,r).force("link",g).force("charge",f).force("collide",w).force("cluster",v).force("contain",b).force("capsule",A).alphaDecay(1-Math.pow(.001,1/this.totalTicks)).velocityDecay(.42).stop(),this.incremental&&this.sim.alpha(.5)}placeClusters(t,e,i){let s=this.g,r=this.o.dim,a=this.o.spread,o=s.clusters.length,l=new Float64Array(o);for(let T=0;T<s.n;T++)l[s.cluster[T]]+=r===3?i[T]**3:i[T]**2;let c=Array.from(l,T=>(r===3?Math.cbrt(T/.26):Math.sqrt(T/.34))+6),h=s.clusters.map((T,y)=>{let v=0,b=0,A=0,_=0;if(this.incremental)for(let L=0;L<s.n;L++)s.cluster[L]===y&&e[L]&&(v+=this.pos[L*3],b+=this.pos[L*3+1],A+=this.pos[L*3+2],_++);let E=50*a*Math.cbrt(o),C=_?v/_:(t()*2-1)*E,P=_?b/_:(t()*2-1)*E,I=r===3?_?A/_:(t()*2-1)*E:0,F={index:y,x:C,y:P,z:I,vx:0,vy:0,vz:0};return _&&(F.fx=C,F.fy=P,F.fz=r===3?I:0),F}),d=new Map;for(let T=0;T<s.e;T++){if(s.mega[s.eSrc[T]]||s.mega[s.eDst[T]])continue;let y=s.cluster[s.eSrc[T]],v=s.cluster[s.eDst[T]];if(y===v)continue;let b=Math.min(y,v)*4096+Math.max(y,v);d.set(b,(d.get(b)??0)+1)}let u=[...d.entries()].map(([T,y])=>({source:Math.floor(T/4096),target:T%4096,c:y})),p=10*a,m=T=>{let y=.09*T;for(let v of h)v.fx==null&&(v.vx-=v.x*y,v.vy-=v.y*y*(r===3?1.25:1),r===3&&(v.vz-=v.z*y))};m.initialize=()=>{};let M=Ur(h,r).force("link",Cr(u).id(T=>T.index).distance(T=>c[T.source.index]+c[T.target.index]+p).strength(T=>Math.min(.5,.05*Math.sqrt(T.c)))).force("charge",Fr().strength(T=>-30-c[T.index]*2.5)).force("collide",Ar().radius(T=>c[T.index]+p*.5).strength(1).iterations(3)).force("gravity",m).alphaDecay(.02).velocityDecay(.35).stop();for(let T=0;T<300;T++)M.tick();let g=1,f=1,w=1;for(let T of h)g=Math.max(g,Math.abs(T.x)+c[T.index]*.8),f=Math.max(f,Math.abs(T.y)+c[T.index]*.8),w=Math.max(w,Math.abs(T.z)+c[T.index]*.8);return{anchors:h.map(T=>[T.x,T.y,r===3?T.z:0]),rad:c,extent:[g*1.08,f*1.08,w*1.08]}}step(t){if(this.done)return!0;let e=performance.now();for(;this.ticksLeft>0&&performance.now()-e<t;)this.sim.tick(),this.ticksLeft--;return this.progress=1-this.ticksLeft/this.totalTicks,this.write(),this.ticksLeft<=0&&this.finish(),this.done}write(){let t=this.g.n,e=this.pos,i=this.nodes;for(let s=0;s<t;s++)e[s*3]=i[s].x,e[s*3+1]=i[s].y,e[s*3+2]=this.o.dim===3?i[s].z:0}finish(){if(!this.incremental){let t=this.g.n,e=this.pos,i=0,s=0,r=0;for(let a=0;a<t;a++)i+=e[a*3],s+=e[a*3+1],r+=e[a*3+2];i/=t||1,s/=t||1,r/=t||1;for(let a=0;a<t;a++)e[a*3]-=i,e[a*3+1]-=s,e[a*3+2]-=r}this.sim.stop(),this.nodes=[],this.sim=null,this.done=!0,this.progress=1}toCache(){let t={},e=i=>Math.round(i*100)/100;for(let i=0;i<this.g.n;i++)t[this.g.ids[i]]=[e(this.pos[i*3]),e(this.pos[i*3+1]),e(this.pos[i*3+2])];return t}};function Br(n,t){let e=new Float32Array(n.m*3),i=new Uint16Array(n.n);for(let a=0;a<n.m;a++)i[n.mParent[a]]++;let s=new Uint16Array(n.n),r=Math.PI*(3-Math.sqrt(5));for(let a=0;a<n.m;a++){let o=n.mParent[a],l=s[o]++,c=i[o],h=tp(n.ids[o]+":"+l),d=.78+.44*((h&1023)/1023),u=n.microRadius[o]*d;if(t===3){let p=c===1?0:1-l/(c-1)*2,m=Math.sqrt(Math.max(0,1-p*p)),M=r*l+(h>>>10&255)/255;e[a*3]=Math.cos(M)*m*u,e[a*3+1]=p*u,e[a*3+2]=Math.sin(M)*m*u}else{let p=l/c*Math.PI*2+(h>>>10&255)/255;e[a*3]=Math.cos(p)*u,e[a*3+1]=Math.sin(p)*u,e[a*3+2]=0}}return e}var Xe={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hu=0,Gl=1,Gu=2;var Ks=1,Wu=2,rs=3,cn=0,qe=1,ui=2,fi=0,as=1,Vi=2,Wl=3,Xl=4,Xu=5;var Cn=100,qu=101,Yu=102,Zu=103,Ku=104,Ju=200,$u=201,ju=202,Qu=203,ql=204,Yl=205,tf=206,ef=207,nf=208,sf=209,rf=210,af=211,of=212,lf=213,cf=214,ha=0,ua=1,fa=2,$n=3,da=4,pa=5,ma=6,ga=7,Zl=0,hf=1,uf=2,yi=0,Js=1,$s=2,js=3,Qs=4,tr=5,er=6,ir=7;var Kl=300,hn=301,Rn=302,Xa=303,qa=304,nr=306,_a=1e3,Ai=1001,xa=1002,Re=1003,ff=1004;var sr=1005;var Le=1006,Ya=1007;var un=1008;var ai=1009,Jl=1010,$l=1011,os=1012,Za=1013,Mi=1014,bi=1015,De=1016,Ka=1017,Ja=1018,ls=1020,jl=35902,Ql=35899,tc=1021,ec=1022,di=1023,Ci=1026,fn=1027,ic=1028,$a=1029,dn=1030,ja=1031;var Qa=1033,rr=33776,ar=33777,or=33778,lr=33779,to=35840,eo=35841,io=35842,no=35843,so=36196,ro=37492,ao=37496,oo=37488,lo=37489,cr=37490,co=37491,ho=37808,uo=37809,fo=37810,po=37811,mo=37812,go=37813,_o=37814,xo=37815,vo=37816,yo=37817,Mo=37818,bo=37819,So=37820,wo=37821,Eo=36492,To=36494,Ao=36495,Co=36283,Ro=36284,hr=36285,Po=36286;var Ps=2300,va=2301,la=2302,Fl=2303,Ol=2400,Bl=2401,zl=2402;var df=3200;var nc=0,pf=1,Hi="",ei="srgb",Is="srgb-linear",Ls="linear",Qt="srgb";var ca=7680;var mf=519,gf=512,_f=513,xf=514,Io=515,vf=516,yf=517,Lo=518,Mf=519,bf=35044,Pn=35048;var sc="300 es",xi=2e3,Ds=2001;function ep(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ip(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ns(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Sf(){let n=Ns("canvas");return n.style.display="block",n}var gu={},jn=null;function rc(...n){let t="THREE."+n.shift();jn?jn("log",t,...n):console.log(t,...n)}function wf(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Nt(...n){n=wf(n);let t="THREE."+n.shift();if(jn)jn("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Ot(...n){n=wf(n);let t="THREE."+n.shift();if(jn)jn("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function wn(...n){let t=n.join(" ");t in gu||(gu[t]=!0,Nt(...n))}function Ef(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Tf={[ha]:ua,[fa]:ma,[da]:ga,[$n]:pa,[ua]:ha,[ma]:fa,[ga]:da,[pa]:$n},vi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_u=1234567,Cs=Math.PI/180,Qn=180/Math.PI;function cs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]).toLowerCase()}function Zt(n,t,e){return Math.max(t,Math.min(e,n))}function ac(n,t){return(n%t+t)%t}function np(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function sp(n,t,e){return n!==t?(e-n)/(t-n):0}function Rs(n,t,e){return(1-e)*n+e*t}function rp(n,t,e,i){return Rs(n,t,1-Math.exp(-e*i))}function ap(n,t=1){return t-Math.abs(ac(n,t*2)-t)}function op(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function lp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function cp(n,t){return n+Math.floor(Math.random()*(t-n+1))}function hp(n,t){return n+Math.random()*(t-n)}function up(n){return n*(.5-Math.random())}function fp(n){n!==void 0&&(_u=n);let t=_u+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function dp(n){return n*Cs}function pp(n){return n*Qn}function mp(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function gp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function _p(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function xp(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),d=r((t-i)/2),u=a((t-i)/2),p=r((i-t)/2),m=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*m,l*p,o*c);break;case"YXY":n.set(l*p,o*h,l*m,o*c);break;case"ZYZ":n.set(l*m,l*p,o*h,o*c);break;default:Nt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Kn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function We(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var oc={DEG2RAD:Cs,RAD2DEG:Qn,generateUUID:cs,clamp:Zt,euclideanModulo:ac,mapLinear:np,inverseLerp:sp,lerp:Rs,damp:rp,pingpong:ap,smoothstep:op,smootherstep:lp,randInt:cp,randFloat:hp,randFloatSpread:up,seededRandom:fp,degToRad:dp,radToDeg:pp,isPowerOfTwo:mp,ceilPowerOfTwo:gp,floorPowerOfTwo:_p,setQuaternionFromProperEuler:xp,normalize:We,denormalize:Kn},fc=class fc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fc.prototype.isVector2=!0;var Pt=fc,ni=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[a+0],p=r[a+1],m=r[a+2],M=r[a+3];if(d!==M||l!==u||c!==p||h!==m){let g=l*u+c*p+h*m+d*M;g<0&&(u=-u,p=-p,m=-m,M=-M,g=-g);let f=1-o;if(g<.9995){let w=Math.acos(g),T=Math.sin(w);f=Math.sin(f*w)/T,o=Math.sin(o*w)/T,l=l*f+u*o,c=c*f+p*o,h=h*f+m*o,d=d*f+M*o}else{l=l*f+u*o,c=c*f+p*o,h=h*f+m*o,d=d*f+M*o;let w=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=w,c*=w,h*=w,d*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[a],u=r[a+1],p=r[a+2],m=r[a+3];return t[e]=o*m+h*d+l*p-c*u,t[e+1]=l*m+h*u+c*d-o*p,t[e+2]=c*m+h*p+o*u-l*d,t[e+3]=h*m-o*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),d=o(r/2),u=l(i/2),p=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*p*m,this._y=c*p*d-u*h*m,this._z=c*h*m+u*p*d,this._w=c*h*d-u*p*m;break;case"YXZ":this._x=u*h*d+c*p*m,this._y=c*p*d-u*h*m,this._z=c*h*m-u*p*d,this._w=c*h*d+u*p*m;break;case"ZXY":this._x=u*h*d-c*p*m,this._y=c*p*d+u*h*m,this._z=c*h*m+u*p*d,this._w=c*h*d-u*p*m;break;case"ZYX":this._x=u*h*d-c*p*m,this._y=c*p*d+u*h*m,this._z=c*h*m-u*p*d,this._w=c*h*d+u*p*m;break;case"YZX":this._x=u*h*d+c*p*m,this._y=c*p*d+u*h*m,this._z=c*h*m-u*p*d,this._w=c*h*d-u*p*m;break;case"XZY":this._x=u*h*d-c*p*m,this._y=c*p*d-u*h*m,this._z=c*h*m+u*p*d,this._w=c*h*d+u*p*m;break;default:Nt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},dc=class dc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ml.copy(this).projectOnVector(t),this.sub(ml)}reflect(t){return this.sub(ml.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};dc.prototype.isVector3=!0;var B=dc,ml=new B,xu=new ni,pc=class pc{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],p=i[5],m=i[8],M=s[0],g=s[3],f=s[6],w=s[1],T=s[4],y=s[7],v=s[2],b=s[5],A=s[8];return r[0]=a*M+o*w+l*v,r[3]=a*g+o*T+l*b,r[6]=a*f+o*y+l*A,r[1]=c*M+h*w+d*v,r[4]=c*g+h*T+d*b,r[7]=c*f+h*y+d*A,r[2]=u*M+p*w+m*v,r[5]=u*g+p*T+m*b,r[8]=u*f+p*y+m*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,p=c*r-a*l,m=e*d+i*u+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/m;return t[0]=d*M,t[1]=(s*c-h*i)*M,t[2]=(o*i-s*a)*M,t[3]=u*M,t[4]=(h*e-s*l)*M,t[5]=(s*r-o*e)*M,t[6]=p*M,t[7]=(i*l-c*e)*M,t[8]=(a*e-i*r)*M,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return wn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(gl.makeScale(t,e)),this}rotate(t){return wn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(gl.makeRotation(-t)),this}translate(t,e){return wn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(gl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};pc.prototype.isMatrix3=!0;var kt=pc,gl=new kt,vu=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yu=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vp(){let n={enabled:!0,workingColorSpace:Is,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qt&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(s.r=Jn(s.r),s.g=Jn(s.g),s.b=Jn(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hi?Ls:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return wn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return wn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Is]:{primaries:t,whitePoint:i,transfer:Ls,toXYZ:vu,fromXYZ:yu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ei},outputColorSpaceConfig:{drawingBufferColorSpace:ei}},[ei]:{primaries:t,whitePoint:i,transfer:Qt,toXYZ:vu,fromXYZ:yu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ei}}}),n}var Yt=vp();function Bi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Jn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Fn,ya=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Fn===void 0&&(Fn=Ns("canvas")),Fn.width=t.width,Fn.height=t.height;let s=Fn.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Fn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ns("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bi(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Bi(e[i]/255)*255):e[i]=Bi(e[i]);return{data:e,width:t.width,height:t.height}}else return Nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},yp=0,ts=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=cs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(_l(s[a].image)):r.push(_l(s[a]))}else r=_l(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function _l(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ya.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Nt("Texture: Unable to serialize Texture."),{})}var Mp=0,xl=new B,Ke=class n extends vi{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Ai,s=Ai,r=Le,a=un,o=di,l=ai,c=n.DEFAULT_ANISOTROPY,h=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=cs(),this.name="",this.source=new ts(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(xl).x}get height(){return this.source.getSize(xl).y}get depth(){return this.source.getSize(xl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Nt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Nt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _a:t.x=t.x-Math.floor(t.x);break;case Ai:t.x=t.x<0?0:1;break;case xa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _a:t.y=t.y-Math.floor(t.y);break;case Ai:t.y=t.y<0?0:1;break;case xa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Kl;Ke.DEFAULT_ANISOTROPY=1;var mc=class mc{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],m=l[9],M=l[2],g=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-M)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+M)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,y=(p+1)/2,v=(f+1)/2,b=(h+u)/4,A=(d+M)/4,_=(m+g)/4;return T>y&&T>v?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=b/i,r=A/i):y>v?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=b/s,r=_/s):v<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(v),i=A/r,s=_/r),this.set(i,s,r,e),this}let w=Math.sqrt((g-m)*(g-m)+(d-M)*(d-M)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(g-m)/w,this.y=(d-M)/w,this.z=(u-h)/w,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};mc.prototype.isVector4=!0;var _e=mc,Ma=class extends vi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Le,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new Ke(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Le,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ts(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Se=class extends Ma{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Us=class extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ba=class extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Wa=class Wa{constructor(t,e,i,s,r,a,o,l,c,h,d,u,p,m,M,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,d,u,p,m,M,g)}set(t,e,i,s,r,a,o,l,c,h,d,u,p,m,M,g){let f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=m,f[11]=M,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wa().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/On.setFromMatrixColumn(t,0).length(),r=1/On.setFromMatrixColumn(t,1).length(),a=1/On.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,p=a*d,m=o*h,M=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+m*c,e[5]=u-M*c,e[9]=-o*l,e[2]=M-u*c,e[6]=m+p*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,p=l*d,m=c*h,M=c*d;e[0]=u+M*o,e[4]=m*o-p,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=p*o-m,e[6]=M+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,p=l*d,m=c*h,M=c*d;e[0]=u-M*o,e[4]=-a*d,e[8]=m+p*o,e[1]=p+m*o,e[5]=a*h,e[9]=M-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,p=a*d,m=o*h,M=o*d;e[0]=l*h,e[4]=m*c-p,e[8]=u*c+M,e[1]=l*d,e[5]=M*c+u,e[9]=p*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,p=a*c,m=o*l,M=o*c;e[0]=l*h,e[4]=M-u*d,e[8]=m*d+p,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*d+m,e[10]=u-M*d}else if(t.order==="XZY"){let u=a*l,p=a*c,m=o*l,M=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+M,e[5]=a*h,e[9]=p*d-m,e[2]=m*d-p,e[6]=o*h,e[10]=M*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bp,t,Sp)}lookAt(t,e,i){let s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),Yi.crossVectors(i,Qe),Yi.lengthSq()===0&&(Math.abs(i.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),Yi.crossVectors(i,Qe)),Yi.normalize(),zr.crossVectors(Qe,Yi),s[0]=Yi.x,s[4]=zr.x,s[8]=Qe.x,s[1]=Yi.y,s[5]=zr.y,s[9]=Qe.y,s[2]=Yi.z,s[6]=zr.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],p=i[13],m=i[2],M=i[6],g=i[10],f=i[14],w=i[3],T=i[7],y=i[11],v=i[15],b=s[0],A=s[4],_=s[8],E=s[12],C=s[1],P=s[5],I=s[9],F=s[13],L=s[2],z=s[6],Z=s[10],X=s[14],et=s[3],H=s[7],$=s[11],K=s[15];return r[0]=a*b+o*C+l*L+c*et,r[4]=a*A+o*P+l*z+c*H,r[8]=a*_+o*I+l*Z+c*$,r[12]=a*E+o*F+l*X+c*K,r[1]=h*b+d*C+u*L+p*et,r[5]=h*A+d*P+u*z+p*H,r[9]=h*_+d*I+u*Z+p*$,r[13]=h*E+d*F+u*X+p*K,r[2]=m*b+M*C+g*L+f*et,r[6]=m*A+M*P+g*z+f*H,r[10]=m*_+M*I+g*Z+f*$,r[14]=m*E+M*F+g*X+f*K,r[3]=w*b+T*C+y*L+v*et,r[7]=w*A+T*P+y*z+v*H,r[11]=w*_+T*I+y*Z+v*$,r[15]=w*E+T*F+y*X+v*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],m=t[3],M=t[7],g=t[11],f=t[15],w=l*p-c*u,T=o*p-c*d,y=o*u-l*d,v=a*p-c*h,b=a*u-l*h,A=a*d-o*h;return e*(M*w-g*T+f*y)-i*(m*w-g*v+f*b)+s*(m*T-M*v+f*A)-r*(m*y-M*b+g*A)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],m=t[12],M=t[13],g=t[14],f=t[15],w=e*o-i*a,T=e*l-s*a,y=e*c-r*a,v=i*l-s*o,b=i*c-r*o,A=s*c-r*l,_=h*M-d*m,E=h*g-u*m,C=h*f-p*m,P=d*g-u*M,I=d*f-p*M,F=u*f-p*g,L=w*F-T*I+y*P+v*C-b*E+A*_;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/L;return t[0]=(o*F-l*I+c*P)*z,t[1]=(s*I-i*F-r*P)*z,t[2]=(M*A-g*b+f*v)*z,t[3]=(u*b-d*A-p*v)*z,t[4]=(l*C-a*F-c*E)*z,t[5]=(e*F-s*C+r*E)*z,t[6]=(g*y-m*A-f*T)*z,t[7]=(h*A-u*y+p*T)*z,t[8]=(a*I-o*C+c*_)*z,t[9]=(i*C-e*I-r*_)*z,t[10]=(m*b-M*y+f*w)*z,t[11]=(d*y-h*b-p*w)*z,t[12]=(o*E-a*P-l*_)*z,t[13]=(e*P-i*E+s*_)*z,t[14]=(M*T-m*v-g*w)*z,t[15]=(h*v-d*T+u*w)*z,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,p=r*h,m=r*d,M=a*h,g=a*d,f=o*d,w=l*c,T=l*h,y=l*d,v=i.x,b=i.y,A=i.z;return s[0]=(1-(M+f))*v,s[1]=(p+y)*v,s[2]=(m-T)*v,s[3]=0,s[4]=(p-y)*b,s[5]=(1-(u+f))*b,s[6]=(g+w)*b,s[7]=0,s[8]=(m+T)*A,s[9]=(g-w)*A,s[10]=(1-(u+M))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=On.set(s[0],s[1],s[2]).length(),o=On.set(s[4],s[5],s[6]).length(),l=On.set(s[8],s[9],s[10]).length();r<0&&(a=-a),mi.copy(this);let c=1/a,h=1/o,d=1/l;return mi.elements[0]*=c,mi.elements[1]*=c,mi.elements[2]*=c,mi.elements[4]*=h,mi.elements[5]*=h,mi.elements[6]*=h,mi.elements[8]*=d,mi.elements[9]*=d,mi.elements[10]*=d,e.setFromRotationMatrix(mi),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=xi,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(i-s),u=(e+t)/(e-t),p=(i+s)/(i-s),m,M;if(l)m=r/(a-r),M=a*r/(a-r);else if(o===xi)m=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Ds)m=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=xi,l=!1){let c=this.elements,h=2/(e-t),d=2/(i-s),u=-(e+t)/(e-t),p=-(i+s)/(i-s),m,M;if(l)m=1/(a-r),M=a/(a-r);else if(o===xi)m=-2/(a-r),M=-(a+r)/(a-r);else if(o===Ds)m=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Wa.prototype.isMatrix4=!0;var ue=Wa,On=new B,mi=new ue,bp=new B(0,0,0),Sp=new B(1,1,1),Yi=new B,zr=new B,Qe=new B,Mu=new ue,bu=new ni,Qi=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Zt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Mu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bu.setFromEuler(this),this.setFromQuaternion(bu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qi.DEFAULT_ORDER="XYZ";var Fs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},wp=0,Su=new B,Bn=new ni,Li=new ue,kr=new B,Ss=new B,Ep=new B,Tp=new ni,wu=new B(1,0,0),Eu=new B(0,1,0),Tu=new B(0,0,1),Au={type:"added"},Ap={type:"removed"},zn={type:"childadded",child:null},vl={type:"childremoved",child:null},Je=class n extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new B,e=new Qi,i=new ni,s=new B(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new kt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bn.setFromAxisAngle(t,e),this.quaternion.multiply(Bn),this}rotateOnWorldAxis(t,e){return Bn.setFromAxisAngle(t,e),this.quaternion.premultiply(Bn),this}rotateX(t){return this.rotateOnAxis(wu,t)}rotateY(t){return this.rotateOnAxis(Eu,t)}rotateZ(t){return this.rotateOnAxis(Tu,t)}translateOnAxis(t,e){return Su.copy(t).applyQuaternion(this.quaternion),this.position.add(Su.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wu,t)}translateY(t){return this.translateOnAxis(Eu,t)}translateZ(t){return this.translateOnAxis(Tu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?kr.copy(t):kr.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(Ss,kr,this.up):Li.lookAt(kr,Ss,this.up),this.quaternion.setFromRotationMatrix(Li),s&&(Li.extractRotation(s.matrixWorld),Bn.setFromRotationMatrix(Li),this.quaternion.premultiply(Bn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ot("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Au),zn.child=t,this.dispatchEvent(zn),zn.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ap),vl.child=t,this.dispatchEvent(vl),vl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Li.multiply(t.parent.matrixWorld)),t.applyMatrix4(Li),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Au),zn.child=t,this.dispatchEvent(zn),zn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,t,Ep),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,Tp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),p=a(t.animations),m=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Je.DEFAULT_UP=new B(0,1,0);Je.DEFAULT_MATRIX_AUTO_UPDATE=!0;Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Oi=class extends Je{constructor(){super(),this.isGroup=!0,this.type="Group"}},Cp={type:"move"},es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let M of t.hand.values()){let g=e.getJointPose(M,i),f=this._getHandJoint(c,M);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,m=.005;c.inputState.pinching&&u>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Cp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Oi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Af={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Vr={h:0,s:0,l:0};function yl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Ft=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ei){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Yt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Yt.workingColorSpace){if(t=ac(t,1),e=Zt(e,0,1),i=Zt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=yl(a,r,t+1/3),this.g=yl(a,r,t),this.b=yl(a,r,t-1/3)}return Yt.colorSpaceToWorking(this,s),this}setStyle(t,e=ei){function i(r){r!==void 0&&parseFloat(r)<1&&Nt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Nt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Nt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ei){let i=Af[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Nt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bi(t.r),this.g=Bi(t.g),this.b=Bi(t.b),this}copyLinearToSRGB(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ei){return Yt.workingToColorSpace(Oe.copy(this),t),Math.round(Zt(Oe.r*255,0,255))*65536+Math.round(Zt(Oe.g*255,0,255))*256+Math.round(Zt(Oe.b*255,0,255))}getHexString(t=ei){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.workingToColorSpace(Oe.copy(this),e);let i=Oe.r,s=Oe.g,r=Oe.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.workingToColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=ei){Yt.workingToColorSpace(Oe.copy(this),t);let e=Oe.r,i=Oe.g,s=Oe.b;return t!==ei?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Zi),this.setHSL(Zi.h+t,Zi.s+e,Zi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Zi),t.getHSL(Vr);let i=Rs(Zi.h,Vr.h,e),s=Rs(Zi.s,Vr.s,e),r=Rs(Zi.l,Vr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Oe=new Ft;Ft.NAMES=Af;var Os=class extends Je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},gi=new B,Di=new B,Ml=new B,Ni=new B,kn=new B,Vn=new B,Cu=new B,bl=new B,Sl=new B,wl=new B,El=new _e,Tl=new _e,Al=new _e,ji=class n{constructor(t=new B,e=new B,i=new B){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),gi.subVectors(t,e),s.cross(gi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){gi.subVectors(s,e),Di.subVectors(i,e),Ml.subVectors(t,e);let a=gi.dot(gi),o=gi.dot(Di),l=gi.dot(Ml),c=Di.dot(Di),h=Di.dot(Ml),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-p-m,m,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Ni)===null?!1:Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ni.x),l.addScaledVector(a,Ni.y),l.addScaledVector(o,Ni.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return El.setScalar(0),Tl.setScalar(0),Al.setScalar(0),El.fromBufferAttribute(t,e),Tl.fromBufferAttribute(t,i),Al.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(El,r.x),a.addScaledVector(Tl,r.y),a.addScaledVector(Al,r.z),a}static isFrontFacing(t,e,i,s){return gi.subVectors(i,e),Di.subVectors(t,e),gi.cross(Di).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gi.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),gi.cross(Di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;kn.subVectors(s,i),Vn.subVectors(r,i),bl.subVectors(t,i);let l=kn.dot(bl),c=Vn.dot(bl);if(l<=0&&c<=0)return e.copy(i);Sl.subVectors(t,s);let h=kn.dot(Sl),d=Vn.dot(Sl);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(kn,a);wl.subVectors(t,r);let p=kn.dot(wl),m=Vn.dot(wl);if(m>=0&&p<=m)return e.copy(r);let M=p*c-l*m;if(M<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(i).addScaledVector(Vn,o);let g=h*m-p*d;if(g<=0&&d-h>=0&&p-m>=0)return Cu.subVectors(r,s),o=(d-h)/(d-h+(p-m)),e.copy(s).addScaledVector(Cu,o);let f=1/(g+M+u);return a=M*f,o=u*f,e.copy(i).addScaledVector(kn,a).addScaledVector(Vn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},tn=class{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(_i.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(_i.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=_i.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,_i):_i.fromBufferAttribute(r,a),_i.applyMatrix4(t.matrixWorld),this.expandByPoint(_i);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Hr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Hr.copy(i.boundingBox)),Hr.applyMatrix4(t.matrixWorld),this.union(Hr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_i),_i.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ws),Gr.subVectors(this.max,ws),Hn.subVectors(t.a,ws),Gn.subVectors(t.b,ws),Wn.subVectors(t.c,ws),Ki.subVectors(Gn,Hn),Ji.subVectors(Wn,Gn),yn.subVectors(Hn,Wn);let e=[0,-Ki.z,Ki.y,0,-Ji.z,Ji.y,0,-yn.z,yn.y,Ki.z,0,-Ki.x,Ji.z,0,-Ji.x,yn.z,0,-yn.x,-Ki.y,Ki.x,0,-Ji.y,Ji.x,0,-yn.y,yn.x,0];return!Cl(e,Hn,Gn,Wn,Gr)||(e=[1,0,0,0,1,0,0,0,1],!Cl(e,Hn,Gn,Wn,Gr))?!1:(Wr.crossVectors(Ki,Ji),e=[Wr.x,Wr.y,Wr.z],Cl(e,Hn,Gn,Wn,Gr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_i).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_i).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ui),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ui=[new B,new B,new B,new B,new B,new B,new B,new B],_i=new B,Hr=new tn,Hn=new B,Gn=new B,Wn=new B,Ki=new B,Ji=new B,yn=new B,ws=new B,Gr=new B,Wr=new B,Mn=new B;function Cl(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Mn.fromArray(n,r);let o=s.x*Math.abs(Mn.x)+s.y*Math.abs(Mn.y)+s.z*Math.abs(Mn.z),l=t.dot(Mn),c=e.dot(Mn),h=i.dot(Mn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var be=new B,Xr=new Pt,Rp=0,te=class extends vi{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=bf,this.updateRanges=[],this.gpuType=bi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Xr.fromBufferAttribute(this,e),Xr.applyMatrix3(t),this.setXY(e,Xr.x,Xr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Kn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=We(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Kn(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Kn(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Kn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Kn(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array),s=We(s,this.array),r=We(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Bs=class extends te{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var zs=class extends te{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Ie=class extends te{constructor(t,e,i){super(new Float32Array(t),e,i)}},Pp=new tn,Es=new B,Rl=new B,en=class{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Pp.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Es.subVectors(t,this.center);let e=Es.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Es,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Rl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Es.copy(t.center).add(Rl)),this.expandByPoint(Es.copy(t.center).sub(Rl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Ip=0,hi=new ue,Pl=new Je,Xn=new B,ti=new tn,Ts=new tn,Ce=new B,ve=class n extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ep(t)?zs:Bs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return hi.makeRotationFromQuaternion(t),this.applyMatrix4(hi),this}rotateX(t){return hi.makeRotationX(t),this.applyMatrix4(hi),this}rotateY(t){return hi.makeRotationY(t),this.applyMatrix4(hi),this}rotateZ(t){return hi.makeRotationZ(t),this.applyMatrix4(hi),this}translate(t,e,i){return hi.makeTranslation(t,e,i),this.applyMatrix4(hi),this}scale(t,e,i){return hi.makeScale(t,e,i),this.applyMatrix4(hi),this}lookAt(t){return Pl.lookAt(t),Pl.updateMatrix(),this.applyMatrix4(Pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xn).negate(),this.translate(Xn.x,Xn.y,Xn.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ie(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];ti.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new en);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){let i=this.boundingSphere.center;if(ti.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Ts.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(ti.min,Ts.min),ti.expandByPoint(Ce),Ce.addVectors(ti.max,Ts.max),ti.expandByPoint(Ce)):(ti.expandByPoint(Ts.min),ti.expandByPoint(Ts.max))}ti.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ce.fromBufferAttribute(o,c),l&&(Xn.fromBufferAttribute(t,c),Ce.add(Xn)),s=Math.max(s,i.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new te(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new B,l[_]=new B;let c=new B,h=new B,d=new B,u=new Pt,p=new Pt,m=new Pt,M=new B,g=new B;function f(_,E,C){c.fromBufferAttribute(i,_),h.fromBufferAttribute(i,E),d.fromBufferAttribute(i,C),u.fromBufferAttribute(r,_),p.fromBufferAttribute(r,E),m.fromBufferAttribute(r,C),h.sub(c),d.sub(c),p.sub(u),m.sub(u);let P=1/(p.x*m.y-m.x*p.y);isFinite(P)&&(M.copy(h).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(P),g.copy(d).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(P),o[_].add(M),o[E].add(M),o[C].add(M),l[_].add(g),l[E].add(g),l[C].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let _=0,E=w.length;_<E;++_){let C=w[_],P=C.start,I=C.count;for(let F=P,L=P+I;F<L;F+=3)f(t.getX(F+0),t.getX(F+1),t.getX(F+2))}let T=new B,y=new B,v=new B,b=new B;function A(_){v.fromBufferAttribute(s,_),b.copy(v);let E=o[_];T.copy(E),T.sub(v.multiplyScalar(v.dot(E))).normalize(),y.crossVectors(b,E);let P=y.dot(l[_])<0?-1:1;a.setXYZW(_,T.x,T.y,T.z,P)}for(let _=0,E=w.length;_<E;++_){let C=w[_],P=C.start,I=C.count;for(let F=P,L=P+I;F<L;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new te(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);let s=new B,r=new B,a=new B,o=new B,l=new B,c=new B,h=new B,d=new B;if(t)for(let u=0,p=t.count;u<p;u+=3){let m=t.getX(u+0),M=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,g),o.add(h),l.add(h),c.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),p=0,m=0;for(let M=0,g=l.length;M<g;M++){o.isInterleavedBufferAttribute?p=l[M]*o.data.stride+o.offset:p=l[M]*h;for(let f=0;f<h;f++)u[m++]=c[p++]}return new te(u,h,d)}if(this.index===null)return Nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],p=t(u,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Il=new B,Lp=new B,Dp=new kt,ii=class{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Il.subVectors(i,e).cross(Lp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(Il),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Dp.getNormalMatrix(t),s=this.coplanarPoint(Il).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Np=0,zi=class extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=cs(),this.name="",this.type="Material",this.blending=as,this.side=cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ql,this.blendDst=Yl,this.blendEquation=Cn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=$n,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ca,this.stencilZFail=ca,this.stencilZPass=ca,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Nt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Nt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ft().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new ii().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Pt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Pt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Fi=new B,Ll=new B,qr=new B,Yr=new B,nn=class{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Fi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Fi.copy(this.origin).addScaledVector(this.direction,e),Fi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Ll.copy(t).add(e).multiplyScalar(.5),qr.copy(e).sub(t).normalize(),Yr.copy(this.origin).sub(Ll);let r=t.distanceTo(e)*.5,a=-this.direction.dot(qr),o=Yr.dot(this.direction),l=-Yr.dot(qr),c=Yr.lengthSq(),h=Math.abs(1-a*a),d,u,p,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){let M=1/h;d*=M,u*=M,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ll).addScaledVector(qr,u),p}intersectSphere(t,e){if(t.radius<0)return null;Fi.subVectors(t.center,this.origin);let i=Fi.dot(this.direction),s=Fi.dot(Fi)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Fi)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,p=t.z-a.z,m=e.x-a.x,M=e.y-a.y,g=e.z-a.z,f=i.x-a.x,w=i.y-a.y,T=i.z-a.z,y=Math.abs(l),v=Math.abs(c),b=Math.abs(h),A,_,E,C,P,I,F,L,z,Z,X,et;if(y>=v&&y>=b?(E=l,I=d,z=m,et=f,l>=0?(A=c,_=h,C=u,P=p,F=M,L=g,Z=w,X=T):(A=h,_=c,C=p,P=u,F=g,L=M,Z=T,X=w)):v>=b?(E=c,I=u,z=M,et=w,c>=0?(A=h,_=l,C=p,P=d,F=g,L=m,Z=T,X=f):(A=l,_=h,C=d,P=p,F=m,L=g,Z=f,X=T)):(E=h,I=p,z=g,et=T,h>=0?(A=l,_=c,C=d,P=u,F=m,L=M,Z=f,X=w):(A=c,_=l,C=u,P=d,F=M,L=m,Z=w,X=f)),E===0)return null;let H=A/E,$=_/E,K=1/E,ht=C-H*I,gt=P-$*I,Bt=F-H*z,At=L-$*z,Wt=Z-H*et,J=X-$*et,tt=Wt*At-J*Bt,lt=ht*J-gt*Wt,wt=Bt*gt-At*ht;if(s){if(tt<0||lt<0||wt<0)return null}else if((tt<0||lt<0||wt<0)&&(tt>0||lt>0||wt>0))return null;let at=tt+lt+wt;if(at===0)return null;let Vt=K*(tt*I+lt*z+wt*et);return(at>0?Vt<0:Vt>0)?null:this.at(Vt/at,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},En=class extends zi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ru=new ue,bn=new nn,Zr=new en,Pu=new B,Kr=new B,Jr=new B,$r=new B,Dl=new B,jr=new B,Iu=new B,Qr=new B,ze=class extends Je{constructor(t=new ve,e=new En){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){jr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Dl.fromBufferAttribute(d,t),a?jr.addScaledVector(Dl,h):jr.addScaledVector(Dl.sub(e),h))}e.add(jr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(r),bn.copy(t.ray).recast(t.near),!(Zr.containsPoint(bn.origin)===!1&&(bn.intersectSphere(Zr,Pu)===null||bn.origin.distanceToSquared(Pu)>(t.far-t.near)**2))&&(Ru.copy(r).invert(),bn.copy(t.ray).applyMatrix4(Ru),!(i.boundingBox!==null&&bn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,bn)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){let g=u[m],f=a[g.materialIndex],w=Math.max(g.start,p.start),T=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let y=w,v=T;y<v;y+=3){let b=o.getX(y),A=o.getX(y+1),_=o.getX(y+2);s=ta(this,f,t,i,c,h,d,b,A,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let g=m,f=M;g<f;g+=3){let w=o.getX(g),T=o.getX(g+1),y=o.getX(g+2);s=ta(this,a,t,i,c,h,d,w,T,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,M=u.length;m<M;m++){let g=u[m],f=a[g.materialIndex],w=Math.max(g.start,p.start),T=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let y=w,v=T;y<v;y+=3){let b=y,A=y+1,_=y+2;s=ta(this,f,t,i,c,h,d,b,A,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let g=m,f=M;g<f;g+=3){let w=g,T=g+1,y=g+2;s=ta(this,a,t,i,c,h,d,w,T,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Up(n,t,e,i,s,r,a,o){let l;if(t.side===qe?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===cn,o),l===null)return null;Qr.copy(o),Qr.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Qr);return c<e.near||c>e.far?null:{distance:c,point:Qr.clone(),object:n}}function ta(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Kr),n.getVertexPosition(l,Jr),n.getVertexPosition(c,$r);let h=Up(n,t,e,i,Kr,Jr,$r,Iu);if(h){let d=new B;ji.getBarycoord(Iu,Kr,Jr,$r,d),s&&(h.uv=ji.getInterpolatedAttribute(s,o,l,c,d,new Pt)),r&&(h.uv1=ji.getInterpolatedAttribute(r,o,l,c,d,new Pt)),a&&(h.normal=ji.getInterpolatedAttribute(a,o,l,c,d,new B),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new B,materialIndex:0};ji.getNormal(Kr,Jr,$r,u.normal),h.face=u,h.barycoord=d}return h}var Sa=class extends Ke{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Re,h=Re,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var sn=class extends te{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}};var Sn=new en,Fp=new Pt(.5,.5),ea=new B,ks=class{constructor(t=new ii,e=new ii,i=new ii,s=new ii,r=new ii,a=new ii){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=xi,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],p=r[7],m=r[8],M=r[9],g=r[10],f=r[11],w=r[12],T=r[13],y=r[14],v=r[15];if(s[0].setComponents(c-a,p-h,f-m,v-w).normalize(),s[1].setComponents(c+a,p+h,f+m,v+w).normalize(),s[2].setComponents(c+o,p+d,f+M,v+T).normalize(),s[3].setComponents(c-o,p-d,f-M,v-T).normalize(),i)s[4].setComponents(l,u,g,y).normalize(),s[5].setComponents(c-l,p-u,f-g,v-y).normalize();else if(s[4].setComponents(c-l,p-u,f-g,v-y).normalize(),e===xi)s[5].setComponents(c+l,p+u,f+g,v+y).normalize();else if(e===Ds)s[5].setComponents(l,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Sn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Sn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Sn)}intersectsSprite(t){Sn.center.set(0,0,0);let e=Fp.distanceTo(t.center);return Sn.radius=.7071067811865476+e,Sn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Sn)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ea.x=s.normal.x>0?t.max.x:t.min.x,ea.y=s.normal.y>0?t.max.y:t.min.y,ea.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ea)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var wa=class extends zi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ea=new B,Ta=new B,Lu=new ue,As=new nn,ia=new en,Nl=new B,Du=new B,Aa=class extends Je{constructor(t=new ve,e=new wa){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Ea.fromBufferAttribute(e,s-1),Ta.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Ea.distanceTo(Ta);t.setAttribute("lineDistance",new Ie(i,1))}else Nt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ia.copy(i.boundingSphere),ia.applyMatrix4(s),ia.radius+=r,t.ray.intersectsSphere(ia)===!1)return;Lu.copy(s).invert(),As.copy(t.ray).applyMatrix4(Lu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let p=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let M=p,g=m-1;M<g;M+=c){let f=h.getX(M),w=h.getX(M+1),T=na(this,t,As,l,f,w,M);T&&e.push(T)}if(this.isLineLoop){let M=h.getX(m-1),g=h.getX(p),f=na(this,t,As,l,M,g,m-1);f&&e.push(f)}}else{let p=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let M=p,g=m-1;M<g;M+=c){let f=na(this,t,As,l,M,M+1,M);f&&e.push(f)}if(this.isLineLoop){let M=na(this,t,As,l,m-1,p,m-1);M&&e.push(M)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function na(n,t,e,i,s,r,a){let o=n.geometry.attributes.position;if(Ea.fromBufferAttribute(o,s),Ta.fromBufferAttribute(o,r),e.distanceSqToSegment(Ea,Ta,Nl,Du)>i)return;Nl.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Nl);if(!(c<t.near||c>t.far))return{distance:c,point:Du.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Nu=new B,Uu=new B,Vs=class extends Aa{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Nu.fromBufferAttribute(e,s),Uu.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Nu.distanceTo(Uu);t.setAttribute("lineDistance",new Ie(i,1))}else Nt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ca=class extends zi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Fu=new ue,kl=new nn,sa=new en,ra=new B,ki=class extends Je{constructor(t=new ve,e=new Ca){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),sa.copy(i.boundingSphere),sa.applyMatrix4(s),sa.radius+=r,t.ray.intersectsSphere(sa)===!1)return;Fu.copy(s).invert(),kl.copy(t.ray).applyMatrix4(Fu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let m=u,M=p;m<M;m++){let g=c.getX(m);ra.fromBufferAttribute(d,g),Ou(ra,g,l,s,t,e,this)}}else{let u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let m=u,M=p;m<M;m++)ra.fromBufferAttribute(d,m),Ou(ra,m,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ou(n,t,e,i,s,r,a){let o=kl.distanceSqToPoint(n);if(o<e){let l=new B;kl.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Hs=class extends Ke{constructor(t=[],e=hn,i,s,r,a,o,l,c,h){super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var rn=class extends Ke{constructor(t,e,i=Mi,s,r,a,o=Re,l=Re,c,h=Ci,d=1){if(h!==Ci&&h!==fn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ts(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ra=class extends rn{constructor(t,e=Mi,i=hn,s,r,a=Re,o=Re,l,c=Ci){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Gs=class extends Ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},is=class n extends ve{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,p=0;m("z","y","x",-1,-1,i,e,t,a,r,0),m("z","y","x",1,-1,i,e,-t,a,r,1),m("x","z","y",1,1,t,i,e,s,a,2),m("x","z","y",1,-1,t,i,-e,s,a,3),m("x","y","z",1,-1,t,e,i,s,r,4),m("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ie(c,3)),this.setAttribute("normal",new Ie(h,3)),this.setAttribute("uv",new Ie(d,2));function m(M,g,f,w,T,y,v,b,A,_,E){let C=y/A,P=v/_,I=y/2,F=v/2,L=b/2,z=A+1,Z=_+1,X=0,et=0,H=new B;for(let $=0;$<Z;$++){let K=$*P-F;for(let ht=0;ht<z;ht++){let gt=ht*C-I;H[M]=gt*w,H[g]=K*T,H[f]=L,c.push(H.x,H.y,H.z),H[M]=0,H[g]=0,H[f]=b>0?1:-1,h.push(H.x,H.y,H.z),d.push(ht/A),d.push(1-$/_),X+=1}}for(let $=0;$<_;$++)for(let K=0;K<A;K++){let ht=u+K+z*$,gt=u+K+z*($+1),Bt=u+(K+1)+z*($+1),At=u+(K+1)+z*$;l.push(ht,gt,At),l.push(gt,Bt,At),et+=6}o.addGroup(p,et,E),p+=et,u+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Tn=class n extends ve{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,p=[],m=[],M=[],g=[];for(let f=0;f<h;f++){let w=f*u-a;for(let T=0;T<c;T++){let y=T*d-r;m.push(y,-w,0),M.push(0,0,1),g.push(T/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<o;w++){let T=w+c*f,y=w+c*(f+1),v=w+1+c*(f+1),b=w+1+c*f;p.push(T,y,b),p.push(y,v,b)}this.setIndex(p),this.setAttribute("position",new Ie(m,3)),this.setAttribute("normal",new Ie(M,3)),this.setAttribute("uv",new Ie(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};function In(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(Bu(s))s.isRenderTargetTexture?(Nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Bu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function ke(n){let t={};for(let e=0;e<n.length;e++){let i=In(n[e]);for(let s in i)t[s]=i[s]}return t}function Bu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Op(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function lc(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}var Gi={clone:In,merge:ke},Bp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,me=class extends zi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bp,this.fragmentShader=zp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=In(t.uniforms),this.uniformsGroups=Op(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Ft().setHex(s.value);break;case"v2":this.uniforms[i].value=new Pt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new B().fromArray(s.value);break;case"v4":this.uniforms[i].value=new _e().fromArray(s.value);break;case"m3":this.uniforms[i].value=new kt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ue().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ns=class extends me{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Pa=class extends zi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ia=class extends zi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function qn(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Ul(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var an=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];t:{e:{let a;i:{n:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break e}a=e.length;break i}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break e}a=i,i=0;break i}break t}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},La=class extends an{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ol,endingEnd:Ol}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Bl:r=t,o=2*e-i;break;case zl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Bl:a=t,l=2*i-e;break;case zl:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,m=(i-e)/(s-e),M=m*m,g=M*m,f=-u*g+2*u*M-u*m,w=(1+u)*g+(-1.5-2*u)*M+(-.5+u)*m+1,T=(-1-p)*g+(1.5+p)*M+.5*m,y=p*g-p*M;for(let v=0;v!==o;++v)r[v]=f*a[h+v]+w*a[c+v]+T*a[l+v]+y*a[d+v];return r}},Da=class extends an{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Na=class extends an{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ua=class extends an{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(i-e)/(s-e),M=1-m;for(let g=0;g!==o;++g)r[g]=a[c+g]*M+a[l+g]*m;return r}let u=o*2,p=t-1;for(let m=0;m!==o;++m){let M=a[c+m],g=a[l+m],f=p*u+m*2,w=d[f],T=d[f+1],y=t*u+m*2,v=h[y],b=h[y+1],A=Vp(i,e,w,v,s);r[m]=Cf(A,M,T,b,g)}return r}};function Cf(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function kp(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function Vp(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=Cf(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let l=kp(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var si=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=qn(e,this.TimeBufferType),this.values=qn(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:qn(t.times,Array),values:qn(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Ul(t.settings)&&(i.settings={inTangents:qn(t.settings.inTangents,Array),outTangents:qn(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Na(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Da(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new La(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ua(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ps:e=this.InterpolantFactoryMethodDiscrete;break;case va:e=this.InterpolantFactoryMethodLinear;break;case la:e=this.InterpolantFactoryMethodSmooth;break;case Fl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Nt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ps;case this.InterpolantFactoryMethodLinear:return va;case this.InterpolantFactoryMethodSmooth:return la;case this.InterpolantFactoryMethodBezier:return Fl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Ul(this.settings)&&(zu(this.settings.inTangents,t),zu(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ot("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Ot("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Ot("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Ot("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&ip(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ot("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===la,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,u=d-i,p=d+i;for(let m=0;m!==i;++m){let M=e[d+m];if(M!==e[u+m]||M!==e[p+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,u=a*i;for(let p=0;p!==i;++p)e[u+p]=e[d+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Ul(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function zu(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}si.prototype.ValueTypeName="";si.prototype.TimeBufferType=Float32Array;si.prototype.ValueBufferType=Float32Array;si.prototype.DefaultInterpolation=va;var on=class extends si{constructor(t,e,i){super(t,e,i)}};on.prototype.ValueTypeName="bool";on.prototype.ValueBufferType=Array;on.prototype.DefaultInterpolation=Ps;on.prototype.InterpolantFactoryMethodLinear=void 0;on.prototype.InterpolantFactoryMethodSmooth=void 0;var Fa=class extends si{constructor(t,e,i,s){super(t,e,i,s)}};Fa.prototype.ValueTypeName="color";var Oa=class extends si{constructor(t,e,i,s){super(t,e,i,s)}};Oa.prototype.ValueTypeName="number";var Ba=class extends an{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)ni.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ws=class extends si{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new Ba(this.times,this.values,this.getValueSize(),t)}};Ws.prototype.ValueTypeName="quaternion";Ws.prototype.InterpolantFactoryMethodSmooth=void 0;var ln=class extends si{constructor(t,e,i){super(t,e,i)}};ln.prototype.ValueTypeName="string";ln.prototype.ValueBufferType=Array;ln.prototype.DefaultInterpolation=Ps;ln.prototype.InterpolantFactoryMethodLinear=void 0;ln.prototype.InterpolantFactoryMethodSmooth=void 0;var za=class extends si{constructor(t,e,i,s){super(t,e,i,s)}};za.prototype.ValueTypeName="vector";var ka=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let p=c[d],m=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Rf=new ka,Va=class{constructor(t){this.manager=t!==void 0?t:Rf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Va.DEFAULT_MATERIAL_NAME="__DEFAULT";var aa=new B,oa=new ni,Ti=new B,Xs=class extends Je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=xi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(aa,oa,Ti),Ti.x===1&&Ti.y===1&&Ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(aa,oa,Ti.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(aa,oa,Ti),Ti.x===1&&Ti.y===1&&Ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(aa,oa,Ti.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$i=new B,ku=new Pt,Vu=new Pt,Be=class extends Xs{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Qn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Cs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qn*2*Math.atan(Math.tan(Cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($i.x,$i.y).multiplyScalar(-t/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($i.x,$i.y).multiplyScalar(-t/$i.z)}getViewSize(t,e){return this.getViewBounds(t,ku,Vu),e.subVectors(Vu,ku)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Cs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var An=class extends Xs{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var qs=class extends ve{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var Yn=-90,Zn=1,Ha=class extends Je{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Be(Yn,Zn,t,e);s.layers=this.layers,this.add(s);let r=new Be(Yn,Zn,t,e);r.layers=this.layers,this.add(r);let a=new Be(Yn,Zn,t,e);a.layers=this.layers,this.add(a);let o=new Be(Yn,Zn,t,e);o.layers=this.layers,this.add(o);let l=new Be(Yn,Zn,t,e);l.layers=this.layers,this.add(l);let c=new Be(Yn,Zn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===xi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ds)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},Ga=class extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Ys=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Hp.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Hp(){this._document.hidden===!1&&this.reset()}var cc="\\[\\]\\.:\\/",Gp=new RegExp("["+cc+"]","g"),hc="[^"+cc+"]",Wp="[^"+cc.replace("\\.","")+"]",Xp=/((?:WC+[\/:])*)/.source.replace("WC",hc),qp=/(WCOD+)?/.source.replace("WCOD",Wp),Yp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hc),Zp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hc),Kp=new RegExp("^"+Xp+qp+Yp+Zp+"$"),Jp=["material","materials","bones","map"],Vl=class{constructor(t,e,i){let s=i||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},pe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Gp,"")}static parseTrackName(t){let e=Kp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Jp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Nt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Ot("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=Vl;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var XM=new Float32Array(1);var ss=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Zt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Zt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var gc=class gc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};gc.prototype.isMatrix2=!0;var Hl=gc;var Zs=class extends vi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function uc(n,t,e,i){let s=$p(i);switch(e){case tc:return n*t;case ic:return n*t/s.components*s.byteLength;case $a:return n*t/s.components*s.byteLength;case dn:return n*t*2/s.components*s.byteLength;case ja:return n*t*2/s.components*s.byteLength;case ec:return n*t*3/s.components*s.byteLength;case di:return n*t*4/s.components*s.byteLength;case Qa:return n*t*4/s.components*s.byteLength;case rr:case ar:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case or:case lr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case eo:case no:return Math.max(n,16)*Math.max(t,8)/4;case to:case io:return Math.max(n,8)*Math.max(t,8)/2;case so:case ro:case oo:case lo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ao:case cr:case co:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ho:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case uo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case fo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case po:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case mo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case go:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case _o:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case xo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case vo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case yo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Mo:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case bo:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case So:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case wo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Eo:case To:case Ao:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Co:case Ro:return Math.ceil(n/4)*Math.ceil(t/4)*8;case hr:case Po:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function $p(n){switch(n){case ai:case Jl:return{byteLength:1,components:1};case os:case $l:case De:return{byteLength:2,components:1};case Ka:case Ja:return{byteLength:2,components:4};case Mi:case Za:case bi:return{byteLength:4,components:1};case jl:case Ql:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function $f(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Qp(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,h);else{d.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<d.length;p++){let m=d[u],M=d[p];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++u,d[u]=M)}d.length=u+1;for(let p=0,m=d.length;p<m;p++){let M=d[p];n.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var tm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,em=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,im=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,am=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,om=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,cm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,um=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,dm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ym=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Sm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Em=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Tm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Am=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Im=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Dm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Nm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Um=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Om=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,km=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Hm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,qm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Ym=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Km=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$m=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Qm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,eg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ig=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ng=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ag=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,og=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ug=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Sg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Eg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ag=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Pg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ig=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ng=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ug=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Og=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,kg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Kg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,t0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,e0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,o0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,l0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,c0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,u0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,d0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,p0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,m0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,v0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,M0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,b0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,E0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,A0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,R0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,P0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,L0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,D0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:tm,alphahash_pars_fragment:em,alphamap_fragment:im,alphamap_pars_fragment:nm,alphatest_fragment:sm,alphatest_pars_fragment:rm,aomap_fragment:am,aomap_pars_fragment:om,batching_pars_vertex:lm,batching_vertex:cm,begin_vertex:hm,beginnormal_vertex:um,bsdfs:fm,iridescence_fragment:dm,bumpmap_pars_fragment:pm,clipping_planes_fragment:mm,clipping_planes_pars_fragment:gm,clipping_planes_pars_vertex:_m,clipping_planes_vertex:xm,color_fragment:vm,color_pars_fragment:ym,color_pars_vertex:Mm,color_vertex:bm,common:Sm,cube_uv_reflection_fragment:wm,defaultnormal_vertex:Em,displacementmap_pars_vertex:Tm,displacementmap_vertex:Am,emissivemap_fragment:Cm,emissivemap_pars_fragment:Rm,colorspace_fragment:Pm,colorspace_pars_fragment:Im,envmap_fragment:Lm,envmap_common_pars_fragment:Dm,envmap_pars_fragment:Nm,envmap_pars_vertex:Um,envmap_physical_pars_fragment:qm,envmap_vertex:Fm,fog_vertex:Om,fog_pars_vertex:Bm,fog_fragment:zm,fog_pars_fragment:km,gradientmap_pars_fragment:Vm,lightmap_pars_fragment:Hm,lights_lambert_fragment:Gm,lights_lambert_pars_fragment:Wm,lights_pars_begin:Xm,lights_toon_fragment:Ym,lights_toon_pars_fragment:Zm,lights_phong_fragment:Km,lights_phong_pars_fragment:Jm,lights_physical_fragment:$m,lights_physical_pars_fragment:jm,lights_fragment_begin:Qm,lights_fragment_maps:tg,lights_fragment_end:eg,lightprobes_pars_fragment:ig,logdepthbuf_fragment:ng,logdepthbuf_pars_fragment:sg,logdepthbuf_pars_vertex:rg,logdepthbuf_vertex:ag,map_fragment:og,map_pars_fragment:lg,map_particle_fragment:cg,map_particle_pars_fragment:hg,metalnessmap_fragment:ug,metalnessmap_pars_fragment:fg,morphinstance_vertex:dg,morphcolor_vertex:pg,morphnormal_vertex:mg,morphtarget_pars_vertex:gg,morphtarget_vertex:_g,normal_fragment_begin:xg,normal_fragment_maps:vg,normal_pars_fragment:yg,normal_pars_vertex:Mg,normal_vertex:bg,normalmap_pars_fragment:Sg,clearcoat_normal_fragment_begin:wg,clearcoat_normal_fragment_maps:Eg,clearcoat_pars_fragment:Tg,iridescence_pars_fragment:Ag,opaque_fragment:Cg,packing:Rg,premultiplied_alpha_fragment:Pg,project_vertex:Ig,dithering_fragment:Lg,dithering_pars_fragment:Dg,roughnessmap_fragment:Ng,roughnessmap_pars_fragment:Ug,shadowmap_pars_fragment:Fg,shadowmap_pars_vertex:Og,shadowmap_vertex:Bg,shadowmask_pars_fragment:zg,skinbase_vertex:kg,skinning_pars_vertex:Vg,skinning_vertex:Hg,skinnormal_vertex:Gg,specularmap_fragment:Wg,specularmap_pars_fragment:Xg,tonemapping_fragment:qg,tonemapping_pars_fragment:Yg,transmission_fragment:Zg,transmission_pars_fragment:Kg,uv_pars_fragment:Jg,uv_pars_vertex:$g,uv_vertex:jg,worldpos_vertex:Qg,background_vert:t0,background_frag:e0,backgroundCube_vert:i0,backgroundCube_frag:n0,cube_vert:s0,cube_frag:r0,depth_vert:a0,depth_frag:o0,distance_vert:l0,distance_frag:c0,equirect_vert:h0,equirect_frag:u0,linedashed_vert:f0,linedashed_frag:d0,meshbasic_vert:p0,meshbasic_frag:m0,meshlambert_vert:g0,meshlambert_frag:_0,meshmatcap_vert:x0,meshmatcap_frag:v0,meshnormal_vert:y0,meshnormal_frag:M0,meshphong_vert:b0,meshphong_frag:S0,meshphysical_vert:w0,meshphysical_frag:E0,meshtoon_vert:T0,meshtoon_frag:A0,points_vert:C0,points_frag:R0,shadow_vert:P0,shadow_frag:I0,sprite_vert:L0,sprite_frag:D0},xt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},Pi={basic:{uniforms:ke([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:ke([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:ke([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:ke([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:ke([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:ke([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:ke([xt.points,xt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:ke([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:ke([xt.common,xt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:ke([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:ke([xt.sprite,xt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:ke([xt.common,xt.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:ke([xt.lights,xt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Pi.physical={uniforms:ke([Pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};var Do={r:0,b:0,g:0},N0=new ue,jf=new kt;jf.set(-1,0,0,0,1,0,0,0,1);function U0(n,t,e,i,s,r){let a=new Ft(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function p(w){let T=w.isScene===!0?w.background:null;if(T&&T.isTexture){let y=w.backgroundBlurriness>0;T=t.get(T,y)}return T}function m(w){let T=!1,y=p(w);y===null?g(a,o):y&&y.isColor&&(g(y,1),T=!0);let v=n.xr.getEnvironmentBlendMode();v==="additive"?e.buffers.color.setClear(0,0,0,1,r):v==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(w,T){let y=p(T);y&&(y.isCubeTexture||y.mapping===nr)?(c===void 0&&(c=new ze(new is(1,1,1),new me({name:"BackgroundCubeMaterial",uniforms:In(Pi.backgroundCube.uniforms),vertexShader:Pi.backgroundCube.vertexShader,fragmentShader:Pi.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(v,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(N0.makeRotationFromEuler(T.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(jf),c.material.toneMapped=Yt.getTransfer(y.colorSpace)!==Qt,(h!==y||d!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ze(new Tn(2,2),new me({name:"BackgroundMaterial",uniforms:In(Pi.background.uniforms),vertexShader:Pi.background.vertexShader,fragmentShader:Pi.background.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Yt.getTransfer(y.colorSpace)!==Qt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function g(w,T){w.getRGB(Do,lc(n)),e.buffers.color.setClear(Do.r,Do.g,Do.b,T,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),o=T,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,g(a,o)},render:m,addToRenderList:M,dispose:f}}function F0(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o(P,I,F,L,z){let Z=!1,X=d(P,L,F,I);r!==X&&(r=X,c(r.object)),Z=p(P,L,F,z),Z&&m(P,L,F,z),z!==null&&t.update(z,n.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,y(P,I,F,L),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function h(P){return n.deleteVertexArray(P)}function d(P,I,F,L){let z=L.wireframe===!0,Z=i[I.id];Z===void 0&&(Z={},i[I.id]=Z);let X=P.isInstancedMesh===!0?P.id:0,et=Z[X];et===void 0&&(et={},Z[X]=et);let H=et[F.id];H===void 0&&(H={},et[F.id]=H);let $=H[z];return $===void 0&&($=u(l()),H[z]=$),$}function u(P){let I=[],F=[],L=[];for(let z=0;z<e;z++)I[z]=0,F[z]=0,L[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:L,object:P,attributes:{},index:null}}function p(P,I,F,L){let z=r.attributes,Z=I.attributes,X=0,et=F.getAttributes();for(let H in et)if(et[H].location>=0){let K=z[H],ht=Z[H];if(ht===void 0&&(H==="instanceMatrix"&&P.instanceMatrix&&(ht=P.instanceMatrix),H==="instanceColor"&&P.instanceColor&&(ht=P.instanceColor)),K===void 0||K.attribute!==ht||ht&&K.data!==ht.data)return!0;X++}return r.attributesNum!==X||r.index!==L}function m(P,I,F,L){let z={},Z=I.attributes,X=0,et=F.getAttributes();for(let H in et)if(et[H].location>=0){let K=Z[H];K===void 0&&(H==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),H==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));let ht={};ht.attribute=K,K&&K.data&&(ht.data=K.data),z[H]=ht,X++}r.attributes=z,r.attributesNum=X,r.index=L}function M(){let P=r.newAttributes;for(let I=0,F=P.length;I<F;I++)P[I]=0}function g(P){f(P,0)}function f(P,I){let F=r.newAttributes,L=r.enabledAttributes,z=r.attributeDivisors;F[P]=1,L[P]===0&&(n.enableVertexAttribArray(P),L[P]=1),z[P]!==I&&(n.vertexAttribDivisor(P,I),z[P]=I)}function w(){let P=r.newAttributes,I=r.enabledAttributes;for(let F=0,L=I.length;F<L;F++)I[F]!==P[F]&&(n.disableVertexAttribArray(F),I[F]=0)}function T(P,I,F,L,z,Z,X){X===!0?n.vertexAttribIPointer(P,I,F,z,Z):n.vertexAttribPointer(P,I,F,L,z,Z)}function y(P,I,F,L){M();let z=L.attributes,Z=F.getAttributes(),X=I.defaultAttributeValues;for(let et in Z){let H=Z[et];if(H.location>=0){let $=z[et];if($===void 0&&(et==="instanceMatrix"&&P.instanceMatrix&&($=P.instanceMatrix),et==="instanceColor"&&P.instanceColor&&($=P.instanceColor)),$!==void 0){let K=$.normalized,ht=$.itemSize,gt=t.get($);if(gt===void 0)continue;let Bt=gt.buffer,At=gt.type,Wt=gt.bytesPerElement,J=At===n.INT||At===n.UNSIGNED_INT||$.gpuType===Za;if($.isInterleavedBufferAttribute){let tt=$.data,lt=tt.stride,wt=$.offset;if(tt.isInstancedInterleavedBuffer){for(let at=0;at<H.locationSize;at++)f(H.location+at,tt.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let at=0;at<H.locationSize;at++)g(H.location+at);n.bindBuffer(n.ARRAY_BUFFER,Bt);for(let at=0;at<H.locationSize;at++)T(H.location+at,ht/H.locationSize,At,K,lt*Wt,(wt+ht/H.locationSize*at)*Wt,J)}else{if($.isInstancedBufferAttribute){for(let tt=0;tt<H.locationSize;tt++)f(H.location+tt,$.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let tt=0;tt<H.locationSize;tt++)g(H.location+tt);n.bindBuffer(n.ARRAY_BUFFER,Bt);for(let tt=0;tt<H.locationSize;tt++)T(H.location+tt,ht/H.locationSize,At,K,ht*Wt,ht/H.locationSize*tt*Wt,J)}}else if(X!==void 0){let K=X[et];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(H.location,K);break;case 3:n.vertexAttrib3fv(H.location,K);break;case 4:n.vertexAttrib4fv(H.location,K);break;default:n.vertexAttrib1fv(H.location,K)}}}}w()}function v(){E();for(let P in i){let I=i[P];for(let F in I){let L=I[F];for(let z in L){let Z=L[z];for(let X in Z)h(Z[X].object),delete Z[X];delete L[z]}}delete i[P]}}function b(P){if(i[P.id]===void 0)return;let I=i[P.id];for(let F in I){let L=I[F];for(let z in L){let Z=L[z];for(let X in Z)h(Z[X].object),delete Z[X];delete L[z]}}delete i[P.id]}function A(P){for(let I in i){let F=i[I];for(let L in F){let z=F[L];if(z[P.id]===void 0)continue;let Z=z[P.id];for(let X in Z)h(Z[X].object),delete Z[X];delete z[P.id]}}}function _(P){for(let I in i){let F=i[I],L=P.isInstancedMesh===!0?P.id:0,z=F[L];if(z!==void 0){for(let Z in z){let X=z[Z];for(let et in X)h(X[et].object),delete X[et];delete z[Z]}delete F[L],Object.keys(F).length===0&&delete i[I]}}}function E(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:C,dispose:v,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:g,disableUnusedAttributes:w}}function O0(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];e.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function B0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==di&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let _=A===De&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==ai&&A!==bi&&!_&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Nt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:y,maxSamples:v,samples:b}}function z0(n){let t=this,e=null,i=0,s=!1,r=!1,a=new ii,o=new kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||i!==0||s;return s=u,i=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){let m=d.clippingPlanes,M=d.clipIntersection,g=d.clipShadows,f=n.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{let w=r?0:i,T=w*4,y=f.clippingState||null;l.value=y,y=h(m,u,T,p);for(let v=0;v!==T;++v)y[v]=e[v];f.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,p,m){let M=d!==null?d.length:0,g=null;if(M!==0){if(g=l.value,m!==!0||g===null){let f=p+M*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(g===null||g.length<f)&&(g=new Float32Array(f));for(let T=0,y=p;T!==M;++T,y+=4)a.copy(d[T]).applyMatrix4(w,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,g}}var us=4,k0=6,V0=20,H0=256,ur=new An,Pf=new Ft,_c=null,xc=0,vc=0,yc=!1,G0=new B,Ln=new B,Uo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=G0}=r;_c=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Df(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(_c,xc,vc),this._renderer.xr.enabled=yc,t.scissorTest=!1,hs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===hn||t.mapping===Rn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_c=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Le,minFilter:Le,generateMipmaps:!1,type:De,format:di,colorSpace:Is,depthBuffer:!1},s=If(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=If(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=W0(r)),this._blurMaterial=q0(r,t,e),this._ggxMaterial=X0(r,t,e)}return s}_compileMaterial(t){let e=new ze(new ve,t);this._renderer.compile(e,ur)}_sceneToCubeUV(t,e,i,s,r){let l=new Be(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Pf),d.toneMapping=yi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ze(new is,new En({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1})));let M=this._backgroundBox,g=M.material,f=!1,w=t.background;w?w.isColor&&(g.color.copy(w),t.background=null,f=!0):(g.color.copy(Pf),f=!0);for(let T=0;T<6;T++){let y=T%3;y===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):y===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));let v=this._cubeSize;hs(s,y*v,T>2?v:0,v,v),d.setRenderTarget(s),f&&d.render(M,l),d.render(t,l)}d.toneMapping=p,d.autoClear=u,t.background=w}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===hn||t.mapping===Rn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Df()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;hs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,ur)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,p=d*u,{_lodMax:m}=this,M=this._sizeLods[i],g=3*M*(i>m-us?i-m+us:0),f=4*(this._cubeSize-M);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=m-e,hs(r,g,f,3*M,2*M),s.setRenderTarget(r),s.render(o,ur),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,hs(t,g,f,3*M,2*M),s.setRenderTarget(t),s.render(o,ur)}_blur(t,e,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-us?s-this._lodMax+us:0),u=4*(this._cubeSize-h);hs(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,ur)}};function W0(n){let t=[],e=[],i=n,s=n-us+1+k0;for(let r=0;r<s;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,p=3,m=new Float32Array(p*u*d),M=new Float32Array(p*u*d);for(let f=0;f<d;f++){let w=f%3*2/3-1,T=f>2?0:-1,y=[w,T,0,w+2/3,T,0,w+2/3,T+1,0,w,T,0,w+2/3,T+1,0,w,T+1,0];m.set(y,p*u*f);for(let v=0;v<u;v++){let b=h[v*2]*2-1,A=h[v*2+1]*2-1;f===0?Ln.set(1,A,b):f===1?Ln.set(-b,1,-A):f===2?Ln.set(-b,A,1):f===3?Ln.set(-1,A,-b):f===4?Ln.set(-b,-1,A):Ln.set(b,A,-1),Ln.toArray(M,(f*u+v)*p)}}let g=new ve;g.setAttribute("position",new te(m,p)),g.setAttribute("outputDirection",new te(M,p)),e.push(new ze(g,null)),i>us&&i--}return{lodMeshes:e,sizeLods:t}}function If(n,t,e){let i=new Se(n,t,e);return i.texture.mapping=nr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function hs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function X0(n,t,e){return new me({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:H0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Bo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function q0(n,t,e){return new me({name:"SphericalGaussianBlur",defines:{SAMPLES:V0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Bo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Lf(){return new me({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Df(){return new me({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Bo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Fo=class extends Se{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Hs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new is(5,5,5),r=new me({name:"CubemapFromEquirect",uniforms:In(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qe,blending:fi});r.uniforms.tEquirect.value=e;let a=new ze(s,r),o=e.minFilter;return e.minFilter===un&&(e.minFilter=Le),new Ha(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}};function Y0(n){let t=new WeakMap,e=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){let p=u.mapping;if(p===Xa||p===qa)if(t.has(u)){let m=t.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let M=new Fo(m.height);return M.fromEquirectangularTexture(n,u),t.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let p=u.mapping,m=p===Xa||p===qa,M=p===hn||p===Rn;if(m||M){let g=e.get(u),f=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new Uo(n)),g=m?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{let w=u.image;return m&&w&&w.height>0||M&&w&&l(w)?(i===null&&(i=new Uo(n)),g=m?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,p){return p===Xa?u.mapping=hn:p===qa&&(u.mapping=Rn),u}function l(u){let p=0,m=6;for(let M=0;M<m;M++)u[M]!==void 0&&p++;return p===m}function c(u){let p=u.target;p.removeEventListener("dispose",c);let m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function Z0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&wn("WebGLRenderer: "+i+" extension not supported."),s}}}function K0(n,t,e,i){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];let p=r.get(u);p&&(t.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let p in u)t.update(u[p],n.ARRAY_BUFFER)}function c(d){let u=[],p=d.index,m=d.attributes.position,M=0;if(m===void 0)return;if(p!==null){let w=p.array;M=p.version;for(let T=0,y=w.length;T<y;T+=3){let v=w[T+0],b=w[T+1],A=w[T+2];u.push(v,b,b,A,A,v)}}else{let w=m.array;M=m.version;for(let T=0,y=w.length/3-1;T<y;T+=3){let v=T+0,b=T+1,A=T+2;u.push(v,b,b,A,A,v)}}let g=new(m.count>=65535?zs:Bs)(u,1);g.version=M;let f=r.get(d);f&&t.remove(f),r.set(d,g)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function J0(n,t,e){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){n.drawElements(i,u,r,d*a),e.update(u,i,1)}function c(d,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,d*a,p),e.update(u,i,p))}function h(d,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,p);let M=0;for(let g=0;g<p;g++)M+=u[g];e.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function $0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Ot("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function j0(n,t,e){let i=new WeakMap,s=new _e;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let E=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],T=0;p===!0&&(T=1),m===!0&&(T=2),M===!0&&(T=3);let y=o.attributes.position.count*T,v=1;y>t.maxTextureSize&&(v=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let b=new Float32Array(y*v*4*d),A=new Us(b,y,v,d);A.type=bi,A.needsUpdate=!0;let _=T*4;for(let C=0;C<d;C++){let P=g[C],I=f[C],F=w[C],L=y*v*4*C;for(let z=0;z<P.count;z++){let Z=z*_;p===!0&&(s.fromBufferAttribute(P,z),b[L+Z+0]=s.x,b[L+Z+1]=s.y,b[L+Z+2]=s.z,b[L+Z+3]=0),m===!0&&(s.fromBufferAttribute(I,z),b[L+Z+4]=s.x,b[L+Z+5]=s.y,b[L+Z+6]=s.z,b[L+Z+7]=0),M===!0&&(s.fromBufferAttribute(F,z),b[L+Z+8]=s.x,b[L+Z+9]=s.y,b[L+Z+10]=s.z,b[L+Z+11]=F.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new Pt(y,v)},i.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];let m=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Q0(n,t,e,i,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var t_={[Js]:"LINEAR_TONE_MAPPING",[$s]:"REINHARD_TONE_MAPPING",[js]:"CINEON_TONE_MAPPING",[Qs]:"ACES_FILMIC_TONE_MAPPING",[er]:"AGX_TONE_MAPPING",[ir]:"NEUTRAL_TONE_MAPPING",[tr]:"CUSTOM_TONE_MAPPING"};function e_(n,t,e,i,s,r){let a=new Se(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new ve;c.setAttribute("position",new Ie([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ie([0,2,0,0,2,0],2));let h=new ns({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ze(c,h),u=new An(-1,1,1,-1,0,1),p=null,m=null,M=!1,g,f=null,w=[],T=!1;this.setSize=function(y,v){a.setSize(y,v),o!==null&&o.setSize(y,v),l!==null&&l.setSize(y,v);for(let b=0;b<w.length;b++){let A=w[b];A.setSize&&A.setSize(y,v)}},this.setEffects=function(y){w=y,T=w.length>0&&w[0].isRenderPass===!0;let v=a.width,b=a.height;w.length>0&&o===null&&(o=new Se(v,b,{type:De,depthBuffer:!1,stencilBuffer:!1}),l=new Se(v,b,{type:De,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<w.length;A++){let _=w[A];_.setSize&&_.setSize(v,b)}},this.begin=function(y,v){if(M||y.toneMapping===yi&&w.length===0)return!1;if(f=v,v!==null){let b=v.width,A=v.height;(a.width!==b||a.height!==A)&&this.setSize(b,A)}return T===!1&&y.setRenderTarget(a),g=y.toneMapping,y.toneMapping=yi,!0},this.hasRenderPass=function(){return T},this.end=function(y,v){y.toneMapping=g,M=!0;let b=a,A=o;for(let _=0;_<w.length;_++){let E=w[_];E.enabled!==!1&&(E.render(y,A,b,v),E.needsSwap!==!1&&(b=A,A=A===o?l:o))}if(p!==y.outputColorSpace||m!==y.toneMapping){p=y.outputColorSpace,m=y.toneMapping,h.defines={},Yt.getTransfer(p)===Qt&&(h.defines.SRGB_TRANSFER="");let _=t_[m];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,y.setRenderTarget(f),y.render(d,u),f=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Qf=new Ke,Sc=new rn(1,1),td=new Us,ed=new ba,id=new Hs,Nf=[],Uf=[],Ff=new Float32Array(16),Of=new Float32Array(9),Bf=new Float32Array(4);function ds(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Nf[s];if(r===void 0&&(r=new Float32Array(s),Nf[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function we(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ee(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function zo(n,t){let e=Uf[t];e===void 0&&(e=new Int32Array(t),Uf[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function i_(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function n_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2fv(this.addr,t),Ee(e,t)}}function s_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;n.uniform3fv(this.addr,t),Ee(e,t)}}function r_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4fv(this.addr,t),Ee(e,t)}}function a_(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,i))return;Bf.set(i),n.uniformMatrix2fv(this.addr,!1,Bf),Ee(e,i)}}function o_(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,i))return;Of.set(i),n.uniformMatrix3fv(this.addr,!1,Of),Ee(e,i)}}function l_(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,i))return;Ff.set(i),n.uniformMatrix4fv(this.addr,!1,Ff),Ee(e,i)}}function c_(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function h_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2iv(this.addr,t),Ee(e,t)}}function u_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3iv(this.addr,t),Ee(e,t)}}function f_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4iv(this.addr,t),Ee(e,t)}}function d_(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function p_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2uiv(this.addr,t),Ee(e,t)}}function m_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3uiv(this.addr,t),Ee(e,t)}}function g_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4uiv(this.addr,t),Ee(e,t)}}function __(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Sc.compareFunction=e.isReversedDepthBuffer()?Lo:Io,r=Sc):r=Qf,e.setTexture2D(t||r,s)}function x_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||ed,s)}function v_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||id,s)}function y_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||td,s)}function M_(n){switch(n){case 5126:return i_;case 35664:return n_;case 35665:return s_;case 35666:return r_;case 35674:return a_;case 35675:return o_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return h_;case 35668:case 35672:return u_;case 35669:case 35673:return f_;case 5125:return d_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return __;case 35679:case 36299:case 36307:return x_;case 35680:case 36300:case 36308:case 36293:return v_;case 36289:case 36303:case 36311:case 36292:return y_}}function b_(n,t){n.uniform1fv(this.addr,t)}function S_(n,t){let e=ds(t,this.size,2);n.uniform2fv(this.addr,e)}function w_(n,t){let e=ds(t,this.size,3);n.uniform3fv(this.addr,e)}function E_(n,t){let e=ds(t,this.size,4);n.uniform4fv(this.addr,e)}function T_(n,t){let e=ds(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function A_(n,t){let e=ds(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function C_(n,t){let e=ds(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function R_(n,t){n.uniform1iv(this.addr,t)}function P_(n,t){n.uniform2iv(this.addr,t)}function I_(n,t){n.uniform3iv(this.addr,t)}function L_(n,t){n.uniform4iv(this.addr,t)}function D_(n,t){n.uniform1uiv(this.addr,t)}function N_(n,t){n.uniform2uiv(this.addr,t)}function U_(n,t){n.uniform3uiv(this.addr,t)}function F_(n,t){n.uniform4uiv(this.addr,t)}function O_(n,t,e){let i=this.cache,s=t.length,r=zo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Ee(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Sc:a=Qf;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function B_(n,t,e){let i=this.cache,s=t.length,r=zo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Ee(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ed,r[a])}function z_(n,t,e){let i=this.cache,s=t.length,r=zo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Ee(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||id,r[a])}function k_(n,t,e){let i=this.cache,s=t.length,r=zo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Ee(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||td,r[a])}function V_(n){switch(n){case 5126:return b_;case 35664:return S_;case 35665:return w_;case 35666:return E_;case 35674:return T_;case 35675:return A_;case 35676:return C_;case 5124:case 35670:return R_;case 35667:case 35671:return P_;case 35668:case 35672:return I_;case 35669:case 35673:return L_;case 5125:return D_;case 36294:return N_;case 36295:return U_;case 36296:return F_;case 35678:case 36198:case 36298:case 36306:case 35682:return O_;case 35679:case 36299:case 36307:return B_;case 35680:case 36300:case 36308:case 36293:return z_;case 36289:case 36303:case 36311:case 36292:return k_}}var wc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=M_(e.type)}},Ec=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=V_(e.type)}},Tc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Mc=/(\w+)(\])?(\[|\.)?/g;function zf(n,t){n.seq.push(t),n.map[t.id]=t}function H_(n,t,e){let i=n.name,s=i.length;for(Mc.lastIndex=0;;){let r=Mc.exec(i),a=Mc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){zf(e,c===void 0?new wc(o,n,t):new Ec(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new Tc(o),zf(e,d)),e=d}}}var fs=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);H_(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function kf(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var G_=37297,W_=0;function X_(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Vf=new kt;function q_(n){Yt._getMatrix(Vf,Yt.workingColorSpace,n);let t=`mat3( ${Vf.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(n)){case Ls:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return Nt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Hf(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+X_(n.getShaderSource(t),o)}else return r}function Y_(n,t){let e=q_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Z_={[Js]:"Linear",[$s]:"Reinhard",[js]:"Cineon",[Qs]:"ACESFilmic",[er]:"AgX",[ir]:"Neutral",[tr]:"Custom"};function K_(n,t){let e=Z_[t];return e===void 0?(Nt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var No=new B;function J_(){Yt.getLuminanceCoefficients(No);let n=No.x.toFixed(4),t=No.y.toFixed(4),e=No.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dr).join(`
`)}function j_(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Q_(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function dr(n){return n!==""}function Gf(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wf(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var tx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ac(n){return n.replace(tx,ix)}var ex=new Map;function ix(n,t){let e=qt[t];if(e===void 0){let i=ex.get(t);if(i!==void 0)e=qt[i],Nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ac(e)}var nx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xf(n){return n.replace(nx,sx)}function sx(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function qf(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var rx={[Ks]:"SHADOWMAP_TYPE_PCF",[rs]:"SHADOWMAP_TYPE_VSM"};function ax(n){return rx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ox={[hn]:"ENVMAP_TYPE_CUBE",[Rn]:"ENVMAP_TYPE_CUBE",[nr]:"ENVMAP_TYPE_CUBE_UV"};function lx(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":ox[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var cx={[Rn]:"ENVMAP_MODE_REFRACTION"};function hx(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":cx[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ux={[Zl]:"ENVMAP_BLENDING_MULTIPLY",[hf]:"ENVMAP_BLENDING_MIX",[uf]:"ENVMAP_BLENDING_ADD"};function fx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ux[n.combine]||"ENVMAP_BLENDING_NONE"}function dx(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function px(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=ax(e),c=lx(e),h=hx(e),d=fx(e),u=dx(e),p=$_(e),m=j_(r),M=s.createProgram(),g,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(dr).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(dr).join(`
`),f.length>0&&(f+=`
`)):(g=[qf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dr).join(`
`),f=[qf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==yi?"#define TONE_MAPPING":"",e.toneMapping!==yi?qt.tonemapping_pars_fragment:"",e.toneMapping!==yi?K_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Y_("linearToOutputTexel",e.outputColorSpace),J_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(dr).join(`
`)),a=Ac(a),a=Gf(a,e),a=Wf(a,e),o=Ac(o),o=Gf(o,e),o=Wf(o,e),a=Xf(a),o=Xf(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",e.glslVersion===sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let T=w+g+a,y=w+f+o,v=kf(s,s.VERTEX_SHADER,T),b=kf(s,s.FRAGMENT_SHADER,y);s.attachShader(M,v),s.attachShader(M,b),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function A(P){if(n.debug.checkShaderErrors){let I=s.getProgramInfoLog(M)||"",F=s.getShaderInfoLog(v)||"",L=s.getShaderInfoLog(b)||"",z=I.trim(),Z=F.trim(),X=L.trim(),et=!0,H=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,v,b);else{let $=Hf(s,v,"vertex"),K=Hf(s,b,"fragment");Ot("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+$+`
`+K)}else z!==""?Nt("WebGLProgram: Program Info Log:",z):(Z===""||X==="")&&(H=!1);H&&(P.diagnostics={runnable:et,programLog:z,vertexShader:{log:Z,prefix:g},fragmentShader:{log:X,prefix:f}})}s.deleteShader(v),s.deleteShader(b),_=new fs(s,M),E=Q_(s,M)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(M,G_)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=W_++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=v,this.fragmentShader=b,this}var mx=0,Cc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Rc(t),e.set(t,i)),i}},Rc=class{constructor(t){this.id=mx++,this.code=t,this.usedTimes=0}};function gx(n){return n===dn||n===cr||n===hr}function _x(n,t,e,i,s,r){let a=new Fs,o=new Cc,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function M(_,E,C,P,I,F){let L=P.fog,z=I.geometry,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,et=t.get(_.envMap||Z,X),H=et&&et.mapping===nr?et.image.height:null,$=p[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Nt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let K=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ht=K!==void 0?K.length:0,gt=0;z.morphAttributes.position!==void 0&&(gt=1),z.morphAttributes.normal!==void 0&&(gt=2),z.morphAttributes.color!==void 0&&(gt=3);let Bt,At,Wt,J;if($){let ce=Pi[$];Bt=ce.vertexShader,At=ce.fragmentShader}else{Bt=_.vertexShader,At=_.fragmentShader;let ce=o.getVertexShaderStage(_),ee=o.getFragmentShaderStage(_);o.update(_,ce,ee),Wt=ce.id,J=ee.id}let tt=n.getRenderTarget(),lt=n.state.buffers.depth.getReversed(),wt=I.isInstancedMesh===!0,at=I.isBatchedMesh===!0,Vt=!!_.map,fe=!!_.matcap,Ht=!!et,O=!!_.aoMap,rt=!!_.lightMap,ct=!!_.bumpMap&&_.wireframe===!1,zt=!!_.normalMap,se=!!_.displacementMap,ge=!!_.emissiveMap,jt=!!_.metalnessMap,xe=!!_.roughnessMap,U=_.anisotropy>0,Ne=_.clearcoat>0,re=_.dispersion>0,R=_.retroreflectivity>0,x=_.iridescence>0,V=_.sheen>0,q=_.transmission>0,j=U&&!!_.anisotropyMap,ot=Ne&&!!_.clearcoatMap,ut=Ne&&!!_.clearcoatNormalMap,Q=Ne&&!!_.clearcoatRoughnessMap,nt=x&&!!_.iridescenceMap,ft=x&&!!_.iridescenceThicknessMap,It=V&&!!_.sheenColorMap,_t=V&&!!_.sheenRoughnessMap,dt=!!_.specularMap,Lt=!!_.specularColorMap,Ut=!!_.specularIntensityMap,Gt=q&&!!_.transmissionMap,N=q&&!!_.thicknessMap,pt=!!_.gradientMap,it=!!_.alphaMap,mt=_.alphaTest>0,Mt=!!_.alphaHash,st=!!_.extensions,Dt=yi;_.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Dt=n.toneMapping);let Ct={shaderID:$,shaderType:_.type,shaderName:_.name,vertexShader:Bt,fragmentShader:At,defines:_.defines,customVertexShaderID:Wt,customFragmentShaderID:J,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:at,batchingColor:at&&I._colorsTexture!==null,instancing:wt,instancingColor:wt&&I.instanceColor!==null,instancingMorph:wt&&I.morphTexture!==null,outputColorSpace:tt===null?n.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Yt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Vt,matcap:fe,envMap:Ht,envMapMode:Ht&&et.mapping,envMapCubeUVHeight:H,aoMap:O,lightMap:rt,bumpMap:ct,normalMap:zt,displacementMap:se,emissiveMap:ge,normalMapObjectSpace:zt&&_.normalMapType===pf,normalMapTangentSpace:zt&&_.normalMapType===nc,packedNormalMap:zt&&_.normalMapType===nc&&gx(_.normalMap.format),metalnessMap:jt,roughnessMap:xe,anisotropy:U,anisotropyMap:j,clearcoat:Ne,clearcoatMap:ot,clearcoatNormalMap:ut,clearcoatRoughnessMap:Q,dispersion:re,retroreflection:R,iridescence:x,iridescenceMap:nt,iridescenceThicknessMap:ft,sheen:V,sheenColorMap:It,sheenRoughnessMap:_t,specularMap:dt,specularColorMap:Lt,specularIntensityMap:Ut,transmission:q,transmissionMap:Gt,thicknessMap:N,gradientMap:pt,opaque:_.transparent===!1&&_.blending===as&&_.alphaToCoverage===!1,alphaMap:it,alphaTest:mt,alphaHash:Mt,combine:_.combine,mapUv:Vt&&m(_.map.channel),aoMapUv:O&&m(_.aoMap.channel),lightMapUv:rt&&m(_.lightMap.channel),bumpMapUv:ct&&m(_.bumpMap.channel),normalMapUv:zt&&m(_.normalMap.channel),displacementMapUv:se&&m(_.displacementMap.channel),emissiveMapUv:ge&&m(_.emissiveMap.channel),metalnessMapUv:jt&&m(_.metalnessMap.channel),roughnessMapUv:xe&&m(_.roughnessMap.channel),anisotropyMapUv:j&&m(_.anisotropyMap.channel),clearcoatMapUv:ot&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:ut&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:It&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:_t&&m(_.sheenRoughnessMap.channel),specularMapUv:dt&&m(_.specularMap.channel),specularColorMapUv:Lt&&m(_.specularColorMap.channel),specularIntensityMapUv:Ut&&m(_.specularIntensityMap.channel),transmissionMapUv:Gt&&m(_.transmissionMap.channel),thicknessMapUv:N&&m(_.thicknessMap.channel),alphaMapUv:it&&m(_.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(zt||U),vertexNormals:!!z.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!z.attributes.uv&&(Vt||it),fog:!!L,useFog:_.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||z.attributes.normal===void 0&&zt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:lt,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:gt,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Dt,decodeVideoTexture:Vt&&_.map.isVideoTexture===!0&&Yt.getTransfer(_.map.colorSpace)===Qt,decodeVideoTextureEmissive:ge&&_.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(_.emissiveMap.colorSpace)===Qt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ui,flipSided:_.side===qe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:st&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&_.extensions.multiDraw===!0||at)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ct.vertexUv1s=l.has(1),Ct.vertexUv2s=l.has(2),Ct.vertexUv3s=l.has(3),l.clear(),Ct}function g(_){let E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(let C in _.defines)E.push(C),E.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(f(E,_),w(E,_),E.push(n.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function f(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function w(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function T(_){let E=p[_.type],C;if(E){let P=Pi[E];C=Gi.clone(P.uniforms)}else C=_.uniforms;return C}function y(_,E){let C=h.get(E);return C!==void 0?++C.usedTimes:(C=new px(n,E,_,s),c.push(C),h.set(E,C)),C}function v(_){if(--_.usedTimes===0){let E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function A(){o.dispose()}return{getParameters:M,getProgramCacheKey:g,getUniforms:T,acquireProgram:y,releaseProgram:v,releaseShaderCache:b,programs:c,dispose:A}}function xx(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function vx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Yf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Zf(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,m,M,g,f){let w=n[t];return w===void 0?(w={id:u.id,object:u,geometry:p,material:m,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:g,group:f},n[t]=w):(w.id=u.id,w.object=u,w.geometry=p,w.material=m,w.materialVariant=a(u),w.groupOrder=M,w.renderOrder=u.renderOrder,w.z=g,w.group=f),t++,w}function l(u,p,m,M,g,f,w){w.reversedDepth===!0&&(g=-g);let T=o(u,p,m,M,g,f);m.transmission>0?i.push(T):m.transparent===!0?s.push(T):e.push(T)}function c(u,p,m,M,g,f){let w=o(u,p,m,M,g,f);m.transmission>0?i.unshift(w):m.transparent===!0?s.unshift(w):e.unshift(w)}function h(u,p){e.length>1&&e.sort(u||vx),i.length>1&&i.sort(p||Yf),s.length>1&&s.sort(p||Yf)}function d(){for(let u=t,p=n.length;u<p;u++){let m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function yx(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new Zf,n.set(i,[a])):s>=r.length?(a=new Zf,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Mx(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new B,color:new Ft};break;case"SpotLight":e={position:new B,direction:new B,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new B,halfWidth:new B,halfHeight:new B};break}return n[t.id]=e,e}}}function bx(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Sx=0;function wx(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Ex(n){let t=new Mx,e=bx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);let s=new B,r=new ue,a=new ue;function o(c){let h=0,d=0,u=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let p=0,m=0,M=0,g=0,f=0,w=0,T=0,y=0,v=0,b=0,A=0,_=0,E=0,C=0;c.sort(wx);for(let I=0,F=c.length;I<F;I++){let L=c[I],z=L.color,Z=L.intensity,X=L.distance,et=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===dn?et=L.shadow.map.texture:et=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=z.r*Z,d+=z.g*Z,u+=z.b*Z;else if(L.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(L.sh.coefficients[H],Z);C++}else if(L.isSunLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,K=e.get(L);K.shadowIntensity=$.intensity,K.shadowBias=$.bias,K.shadowNormalBias=$.normalBias,K.shadowRadius=$.radius,K.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),i.sunShadow[m]=K,i.sunShadowMap[m]=et;let ht=$.getViewportCount();for(let gt=0;gt<ht;gt++)i.sunShadowMatrix[M+gt]=$.getMatrix(gt),i.sunShadowCascade[M+gt]=$._cascadeData[gt];M+=ht,m++}i.sun[p]=H,p++}else if(L.isDirectionalLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,K=e.get(L);K.shadowIntensity=$.intensity,K.shadowBias=$.bias,K.shadowNormalBias=$.normalBias,K.shadowRadius=$.radius,K.shadowMapSize=$.mapSize,i.directionalShadow[g]=K,i.directionalShadowMap[g]=et,i.directionalShadowMatrix[g]=L.shadow.matrix,v++}i.directional[g]=H,g++}else if(L.isSpotLight){let H=t.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(z).multiplyScalar(Z),H.distance=X,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,i.spot[w]=H;let $=L.shadow;if(L.map&&(i.spotLightMap[_]=L.map,_++,$.updateMatrices(L),L.castShadow&&E++),i.spotLightMatrix[w]=$.matrix,L.castShadow){let K=e.get(L);K.shadowIntensity=$.intensity,K.shadowBias=$.bias,K.shadowNormalBias=$.normalBias,K.shadowRadius=$.radius,K.shadowMapSize=$.mapSize,i.spotShadow[w]=K,i.spotShadowMap[w]=et,A++}w++}else if(L.isRectAreaLight){let H=t.get(L);H.color.copy(z).multiplyScalar(Z),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),i.rectArea[T]=H,T++}else if(L.isPointLight){let H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){let $=L.shadow,K=e.get(L);K.shadowIntensity=$.intensity,K.shadowBias=$.bias,K.shadowNormalBias=$.normalBias,K.shadowRadius=$.radius,K.shadowMapSize=$.mapSize,K.shadowCameraNear=$.camera.near,K.shadowCameraFar=$.camera.far,i.pointShadow[f]=K,i.pointShadowMap[f]=et,i.pointShadowMatrix[f]=L.shadow.matrix,b++}i.point[f]=H,f++}else if(L.isHemisphereLight){let H=t.get(L);H.skyColor.copy(L.color).multiplyScalar(Z),H.groundColor.copy(L.groundColor).multiplyScalar(Z),i.hemi[y]=H,y++}}T>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xt.LTC_FLOAT_1,i.rectAreaLTC2=xt.LTC_FLOAT_2):(i.rectAreaLTC1=xt.LTC_HALF_1,i.rectAreaLTC2=xt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let P=i.hash;(P.sunLength!==p||P.directionalLength!==g||P.pointLength!==f||P.spotLength!==w||P.rectAreaLength!==T||P.hemiLength!==y||P.numSunShadows!==m||P.numDirectionalShadows!==v||P.numPointShadows!==b||P.numSpotShadows!==A||P.numSpotMaps!==_||P.numLightProbes!==C)&&(i.sun.length=p,i.directional.length=g,i.spot.length=w,i.rectArea.length=T,i.point.length=f,i.hemi.length=y,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.directionalShadowMatrix.length=v,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+_-E,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,P.sunLength=p,P.directionalLength=g,P.pointLength=f,P.spotLength=w,P.rectAreaLength=T,P.hemiLength=y,P.numSunShadows=m,P.numDirectionalShadows=v,P.numPointShadows=b,P.numSpotShadows=A,P.numSpotMaps=_,P.numLightProbes=C,i.version=Sx++)}function l(c,h){let d=0,u=0,p=0,m=0,M=0,g=0,f=h.matrixWorldInverse;for(let w=0,T=c.length;w<T;w++){let y=c[w];if(y.isSunLight){let v=i.sun[d];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(f),d++}else if(y.isDirectionalLight){let v=i.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(f),u++}else if(y.isSpotLight){let v=i.spot[m];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(f),v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(f),m++}else if(y.isRectAreaLight){let v=i.rectArea[M];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(f),a.identity(),r.copy(y.matrixWorld),r.premultiply(f),a.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),M++}else if(y.isPointLight){let v=i.point[p];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(f),p++}else if(y.isHemisphereLight){let v=i.hemi[g];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(f),g++}}}return{setup:o,setupView:l,state:i}}function Kf(n){let t=new Ex(n),e=[],i=[],s=[];function r(u){d.camera=u,e.length=0,i.length=0,s.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Tx(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Kf(n),t.set(s,[o])):r>=a.length?(o=new Kf(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Ax=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Rx=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],Px=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Jf=new ue,fr=new B,bc=new B;function Ix(n,t,e){let i=new ks,s=new Pt,r=new Pt,a=new _e,o=new Pa,l=new Ia,c={},h=e.maxTextureSize,d={[cn]:qe,[qe]:cn,[ui]:ui},u=new me({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:Ax,fragmentShader:Cx}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let m=new ve;m.setAttribute("position",new te(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new ze(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ks;let f=this.type;this.render=function(b,A,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===Wu&&(Nt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ks);let E=n.getRenderTarget(),C=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),I=n.state;I.setBlending(fi),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let F=f!==this.type;F&&A.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(z=>z.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,z=b.length;L<z;L++){let Z=b[L],X=Z.shadow;if(X===void 0){Nt("WebGLShadowMap:",Z,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let et=X.getFrameExtents();s.multiply(et),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/et.x),s.x=r.x*et.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/et.y),s.y=r.y*et.y,X.mapSize.y=r.y));let H=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=H,X.map===null||F===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===rs){if(Z.isPointLight){Nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Se(s.x,s.y,{format:dn,type:De,minFilter:Le,magFilter:Le,generateMipmaps:!1}),X.map.texture.name=Z.name+".shadowMap",X.map.depthTexture=new rn(s.x,s.y,bi),X.map.depthTexture.name=Z.name+".shadowMapDepth",X.map.depthTexture.format=Ci,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Re,X.map.depthTexture.magFilter=Re}else Z.isPointLight?(X.map=new Fo(s.x),X.map.depthTexture=new Ra(s.x,Mi)):(X.map=new Se(s.x,s.y),X.map.depthTexture=new rn(s.x,s.y,Mi)),X.map.depthTexture.name=Z.name+".shadowMap",X.map.depthTexture.format=Ci,this.type===Ks?(X.map.depthTexture.compareFunction=H?Lo:Io,X.map.depthTexture.minFilter=Le,X.map.depthTexture.magFilter=Le):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Re,X.map.depthTexture.magFilter=Re);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==s.x||X.map.height!==s.y)&&X.map.setSize(s.x,s.y);let $=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();Z.isPointLight!==!0&&X.updateMatrices(Z,_);for(let K=0;K<$;K++){let ht=X.getCamera(K);if(Z.isPointLight){let gt=X.camera,Bt=X.matrix,At=Z.distance||gt.far;At!==gt.far&&(gt.far=At,gt.updateProjectionMatrix()),fr.setFromMatrixPosition(Z.matrixWorld),gt.position.copy(fr),bc.copy(gt.position),bc.add(Rx[K]),gt.up.copy(Px[K]),gt.lookAt(bc),gt.updateMatrixWorld(),Bt.makeTranslation(-fr.x,-fr.y,-fr.z),Jf.multiplyMatrices(gt.projectionMatrix,gt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Jf,gt.coordinateSystem,gt.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,K),n.clear();else{K===0&&(n.setRenderTarget(X.map),n.clear());let gt=X.getViewport(K);a.set(r.x*gt.x,r.y*gt.y,r.x*gt.z,r.y*gt.w),I.viewport(a)}i=X.getFrustum(K),y(A,_,ht,Z,this.type)}X.isPointLightShadow!==!0&&this.type===rs&&w(X,_),X.needsUpdate=!1}f=this.type,g.needsUpdate=!1,n.setRenderTarget(E,C,P)};function w(b,A){let _=t.update(M);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new Se(s.x,s.y,{format:dn,type:De}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,_,u,M,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,_,p,M,null)}function T(b,A,_,E){let C=null,P=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)C=P;else if(C=_.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let I=C.uuid,F=A.uuid,L=c[I];L===void 0&&(L={},c[I]=L);let z=L[F];z===void 0&&(z=C.clone(),L[F]=z,A.addEventListener("dispose",v)),C=z}if(C.visible=A.visible,C.wireframe=A.wireframe,E===rs?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:d[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let I=n.properties.get(C);I.light=_}return C}function y(b,A,_,E,C){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===rs)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);let F=t.update(b),L=b.material;if(Array.isArray(L)){let z=F.groups;for(let Z=0,X=z.length;Z<X;Z++){let et=z[Z],H=L[et.materialIndex];if(H&&H.visible){let $=T(b,H,E,C);b.onBeforeShadow(n,b,A,_,F,$,et),n.renderBufferDirect(_,null,F,$,b,et),b.onAfterShadow(n,b,A,_,F,$,et)}}}else if(L.visible){let z=T(b,L,E,C);b.onBeforeShadow(n,b,A,_,F,z,null),n.renderBufferDirect(_,null,F,z,b,null),b.onAfterShadow(n,b,A,_,F,z,null)}}let I=b.children;for(let F=0,L=I.length;F<L;F++)y(I[F],A,_,E,C)}function v(b){b.target.removeEventListener("dispose",v);for(let _ in c){let E=c[_],C=b.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function Lx(n,t){function e(){let N=!1,pt=new _e,it=null,mt=new _e(0,0,0,0);return{setMask:function(Mt){it!==Mt&&!N&&(n.colorMask(Mt,Mt,Mt,Mt),it=Mt)},setLocked:function(Mt){N=Mt},setClear:function(Mt,st,Dt,Ct,ce){ce===!0&&(Mt*=Ct,st*=Ct,Dt*=Ct),pt.set(Mt,st,Dt,Ct),mt.equals(pt)===!1&&(n.clearColor(Mt,st,Dt,Ct),mt.copy(pt))},reset:function(){N=!1,it=null,mt.set(-1,0,0,0)}}}function i(){let N=!1,pt=!1,it=null,mt=null,Mt=null;return{setReversed:function(st){if(pt!==st){let Dt=t.get("EXT_clip_control");st?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),pt=st;let Ct=Mt;Mt=null,this.setClear(Ct)}},getReversed:function(){return pt},setTest:function(st){st?tt(n.DEPTH_TEST):lt(n.DEPTH_TEST)},setMask:function(st){it!==st&&!N&&(n.depthMask(st),it=st)},setFunc:function(st){if(pt&&(st=Tf[st]),mt!==st){switch(st){case ha:n.depthFunc(n.NEVER);break;case ua:n.depthFunc(n.ALWAYS);break;case fa:n.depthFunc(n.LESS);break;case $n:n.depthFunc(n.LEQUAL);break;case da:n.depthFunc(n.EQUAL);break;case pa:n.depthFunc(n.GEQUAL);break;case ma:n.depthFunc(n.GREATER);break;case ga:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}mt=st}},setLocked:function(st){N=st},setClear:function(st){Mt!==st&&(Mt=st,pt&&(st=1-st),n.clearDepth(st))},reset:function(){N=!1,it=null,mt=null,Mt=null,pt=!1}}}function s(){let N=!1,pt=null,it=null,mt=null,Mt=null,st=null,Dt=null,Ct=null,ce=null;return{setTest:function(ee){N||(ee?tt(n.STENCIL_TEST):lt(n.STENCIL_TEST))},setMask:function(ee){pt!==ee&&!N&&(n.stencilMask(ee),pt=ee)},setFunc:function(ee,pi,Si){(it!==ee||mt!==pi||Mt!==Si)&&(n.stencilFunc(ee,pi,Si),it=ee,mt=pi,Mt=Si)},setOp:function(ee,pi,Si){(st!==ee||Dt!==pi||Ct!==Si)&&(n.stencilOp(ee,pi,Si),st=ee,Dt=pi,Ct=Si)},setLocked:function(ee){N=ee},setClear:function(ee){ce!==ee&&(n.clearStencil(ee),ce=ee)},reset:function(){N=!1,pt=null,it=null,mt=null,Mt=null,st=null,Dt=null,Ct=null,ce=null}}}let r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},p=new WeakMap,m=[],M=null,g=!1,f=null,w=null,T=null,y=null,v=null,b=null,A=null,_=new Ft(0,0,0),E=0,C=!1,P=null,I=null,F=null,L=null,z=null,Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,et=0,H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=et>=1):H.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=et>=2);let $=null,K={},ht=n.getParameter(n.SCISSOR_BOX),gt=n.getParameter(n.VIEWPORT),Bt=new _e().fromArray(ht),At=new _e().fromArray(gt);function Wt(N,pt,it,mt){let Mt=new Uint8Array(4),st=n.createTexture();n.bindTexture(N,st),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Dt=0;Dt<it;Dt++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(pt,0,n.RGBA,1,1,mt,0,n.RGBA,n.UNSIGNED_BYTE,Mt):n.texImage2D(pt+Dt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Mt);return st}let J={};J[n.TEXTURE_2D]=Wt(n.TEXTURE_2D,n.TEXTURE_2D,1),J[n.TEXTURE_CUBE_MAP]=Wt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[n.TEXTURE_2D_ARRAY]=Wt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),J[n.TEXTURE_3D]=Wt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(n.DEPTH_TEST),a.setFunc($n),ct(!1),zt(Gl),tt(n.CULL_FACE),O(fi);function tt(N){h[N]!==!0&&(n.enable(N),h[N]=!0)}function lt(N){h[N]!==!1&&(n.disable(N),h[N]=!1)}function wt(N,pt){return u[N]!==pt?(n.bindFramebuffer(N,pt),u[N]=pt,N===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=pt),N===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=pt),!0):!1}function at(N,pt){let it=m,mt=!1;if(N){it=p.get(pt),it===void 0&&(it=[],p.set(pt,it));let Mt=N.textures;if(it.length!==Mt.length||it[0]!==n.COLOR_ATTACHMENT0){for(let st=0,Dt=Mt.length;st<Dt;st++)it[st]=n.COLOR_ATTACHMENT0+st;it.length=Mt.length,mt=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,mt=!0);mt&&n.drawBuffers(it)}function Vt(N){return M!==N?(n.useProgram(N),M=N,!0):!1}let fe={[Cn]:n.FUNC_ADD,[qu]:n.FUNC_SUBTRACT,[Yu]:n.FUNC_REVERSE_SUBTRACT};fe[Zu]=n.MIN,fe[Ku]=n.MAX;let Ht={[Ju]:n.ZERO,[$u]:n.ONE,[ju]:n.SRC_COLOR,[ql]:n.SRC_ALPHA,[rf]:n.SRC_ALPHA_SATURATE,[nf]:n.DST_COLOR,[tf]:n.DST_ALPHA,[Qu]:n.ONE_MINUS_SRC_COLOR,[Yl]:n.ONE_MINUS_SRC_ALPHA,[sf]:n.ONE_MINUS_DST_COLOR,[ef]:n.ONE_MINUS_DST_ALPHA,[af]:n.CONSTANT_COLOR,[of]:n.ONE_MINUS_CONSTANT_COLOR,[lf]:n.CONSTANT_ALPHA,[cf]:n.ONE_MINUS_CONSTANT_ALPHA};function O(N,pt,it,mt,Mt,st,Dt,Ct,ce,ee){if(N===fi){g===!0&&(lt(n.BLEND),g=!1);return}if(g===!1&&(tt(n.BLEND),g=!0),N!==Xu){if(N!==f||ee!==C){if((w!==Cn||v!==Cn)&&(n.blendEquation(n.FUNC_ADD),w=Cn,v=Cn),ee)switch(N){case as:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vi:n.blendFunc(n.ONE,n.ONE);break;case Wl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Xl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ot("WebGLState: Invalid blending: ",N);break}else switch(N){case as:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Wl:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xl:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",N);break}T=null,y=null,b=null,A=null,_.set(0,0,0),E=0,f=N,C=ee}return}Mt=Mt||pt,st=st||it,Dt=Dt||mt,(pt!==w||Mt!==v)&&(n.blendEquationSeparate(fe[pt],fe[Mt]),w=pt,v=Mt),(it!==T||mt!==y||st!==b||Dt!==A)&&(n.blendFuncSeparate(Ht[it],Ht[mt],Ht[st],Ht[Dt]),T=it,y=mt,b=st,A=Dt),(Ct.equals(_)===!1||ce!==E)&&(n.blendColor(Ct.r,Ct.g,Ct.b,ce),_.copy(Ct),E=ce),f=N,C=!1}function rt(N,pt){N.side===ui?lt(n.CULL_FACE):tt(n.CULL_FACE);let it=N.side===qe;pt&&(it=!it),ct(it),N.blending===as&&N.transparent===!1?O(fi):O(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let mt=N.stencilWrite;o.setTest(mt),mt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ge(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?tt(n.SAMPLE_ALPHA_TO_COVERAGE):lt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ct(N){P!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),P=N)}function zt(N){N!==Hu?(tt(n.CULL_FACE),N!==I&&(N===Gl?n.cullFace(n.BACK):N===Gu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):lt(n.CULL_FACE),I=N}function se(N){N!==F&&(X&&n.lineWidth(N),F=N)}function ge(N,pt,it){N?(tt(n.POLYGON_OFFSET_FILL),(L!==pt||z!==it)&&(L=pt,z=it,a.getReversed()&&(pt=-pt),n.polygonOffset(pt,it))):lt(n.POLYGON_OFFSET_FILL)}function jt(N){N?tt(n.SCISSOR_TEST):lt(n.SCISSOR_TEST)}function xe(N){N===void 0&&(N=n.TEXTURE0+Z-1),$!==N&&(n.activeTexture(N),$=N)}function U(N,pt,it){it===void 0&&($===null?it=n.TEXTURE0+Z-1:it=$);let mt=K[it];mt===void 0&&(mt={type:void 0,texture:void 0},K[it]=mt),(mt.type!==N||mt.texture!==pt)&&($!==it&&(n.activeTexture(it),$=it),n.bindTexture(N,pt||J[N]),mt.type=N,mt.texture=pt)}function Ne(){let N=K[$];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function re(){try{n.compressedTexImage2D(...arguments)}catch(N){Ot("WebGLState:",N)}}function R(){try{n.compressedTexImage3D(...arguments)}catch(N){Ot("WebGLState:",N)}}function x(){try{n.texSubImage2D(...arguments)}catch(N){Ot("WebGLState:",N)}}function V(){try{n.texSubImage3D(...arguments)}catch(N){Ot("WebGLState:",N)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(N){Ot("WebGLState:",N)}}function j(){try{n.compressedTexSubImage3D(...arguments)}catch(N){Ot("WebGLState:",N)}}function ot(){try{n.texStorage2D(...arguments)}catch(N){Ot("WebGLState:",N)}}function ut(){try{n.texStorage3D(...arguments)}catch(N){Ot("WebGLState:",N)}}function Q(){try{n.texImage2D(...arguments)}catch(N){Ot("WebGLState:",N)}}function nt(){try{n.texImage3D(...arguments)}catch(N){Ot("WebGLState:",N)}}function ft(N){return d[N]!==void 0?d[N]:n.getParameter(N)}function It(N,pt){d[N]!==pt&&(n.pixelStorei(N,pt),d[N]=pt)}function _t(N){Bt.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Bt.copy(N))}function dt(N){At.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),At.copy(N))}function Lt(N,pt){let it=c.get(pt);it===void 0&&(it=new WeakMap,c.set(pt,it));let mt=it.get(N);mt===void 0&&(mt=n.getUniformBlockIndex(pt,N.name),it.set(N,mt))}function Ut(N,pt){let mt=c.get(pt).get(N);l.get(pt)!==mt&&(n.uniformBlockBinding(pt,mt,N.__bindingPointIndex),l.set(pt,mt))}function Gt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},$=null,K={},u={},p=new WeakMap,m=[],M=null,g=!1,f=null,w=null,T=null,y=null,v=null,b=null,A=null,_=new Ft(0,0,0),E=0,C=!1,P=null,I=null,F=null,L=null,z=null,Bt.set(0,0,n.canvas.width,n.canvas.height),At.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:lt,bindFramebuffer:wt,drawBuffers:at,useProgram:Vt,setBlending:O,setMaterial:rt,setFlipSided:ct,setCullFace:zt,setLineWidth:se,setPolygonOffset:ge,setScissorTest:jt,activeTexture:xe,bindTexture:U,unbindTexture:Ne,compressedTexImage2D:re,compressedTexImage3D:R,texImage2D:Q,texImage3D:nt,pixelStorei:It,getParameter:ft,updateUBOMapping:Lt,uniformBlockBinding:Ut,texStorage2D:ot,texStorage3D:ut,texSubImage2D:x,texSubImage3D:V,compressedTexSubImage2D:q,compressedTexSubImage3D:j,scissor:_t,viewport:dt,reset:Gt}}function Dx(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pt,h=new WeakMap,d=new Set,u,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(R,x){return m?new OffscreenCanvas(R,x):Ns("canvas")}function g(R,x,V){let q=1,j=re(R);if((j.width>V||j.height>V)&&(q=V/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let ot=Math.floor(q*j.width),ut=Math.floor(q*j.height);u===void 0&&(u=M(ot,ut));let Q=x?M(ot,ut):u;return Q.width=ot,Q.height=ut,Q.getContext("2d").drawImage(R,0,0,ot,ut),Nt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+ot+"x"+ut+")."),Q}else return"data"in R&&Nt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),R;return R}function f(R){return R.generateMipmaps}function w(R){n.generateMipmap(R)}function T(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(R,x,V,q,j,ot=!1){if(R!==null){if(n[R]!==void 0)return n[R];Nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ut;q&&(ut=t.get("EXT_texture_norm16"),ut||Nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=x;if(x===n.RED&&(V===n.FLOAT&&(Q=n.R32F),V===n.HALF_FLOAT&&(Q=n.R16F),V===n.UNSIGNED_BYTE&&(Q=n.R8),V===n.UNSIGNED_SHORT&&ut&&(Q=ut.R16_EXT),V===n.SHORT&&ut&&(Q=ut.R16_SNORM_EXT)),x===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.R8UI),V===n.UNSIGNED_SHORT&&(Q=n.R16UI),V===n.UNSIGNED_INT&&(Q=n.R32UI),V===n.BYTE&&(Q=n.R8I),V===n.SHORT&&(Q=n.R16I),V===n.INT&&(Q=n.R32I)),x===n.RG&&(V===n.FLOAT&&(Q=n.RG32F),V===n.HALF_FLOAT&&(Q=n.RG16F),V===n.UNSIGNED_BYTE&&(Q=n.RG8),V===n.UNSIGNED_SHORT&&ut&&(Q=ut.RG16_EXT),V===n.SHORT&&ut&&(Q=ut.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RG8UI),V===n.UNSIGNED_SHORT&&(Q=n.RG16UI),V===n.UNSIGNED_INT&&(Q=n.RG32UI),V===n.BYTE&&(Q=n.RG8I),V===n.SHORT&&(Q=n.RG16I),V===n.INT&&(Q=n.RG32I)),x===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),V===n.UNSIGNED_INT&&(Q=n.RGB32UI),V===n.BYTE&&(Q=n.RGB8I),V===n.SHORT&&(Q=n.RGB16I),V===n.INT&&(Q=n.RGB32I)),x===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),V===n.UNSIGNED_INT&&(Q=n.RGBA32UI),V===n.BYTE&&(Q=n.RGBA8I),V===n.SHORT&&(Q=n.RGBA16I),V===n.INT&&(Q=n.RGBA32I)),x===n.RGB&&(V===n.UNSIGNED_SHORT&&ut&&(Q=ut.RGB16_EXT),V===n.SHORT&&ut&&(Q=ut.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),x===n.RGBA){let nt=ot?Ls:Yt.getTransfer(j);V===n.FLOAT&&(Q=n.RGBA32F),V===n.HALF_FLOAT&&(Q=n.RGBA16F),V===n.UNSIGNED_BYTE&&(Q=nt===Qt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&ut&&(Q=ut.RGBA16_EXT),V===n.SHORT&&ut&&(Q=ut.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function v(R,x){let V;return R?x===null||x===Mi||x===ls?V=n.DEPTH24_STENCIL8:x===bi?V=n.DEPTH32F_STENCIL8:x===os&&(V=n.DEPTH24_STENCIL8,Nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Mi||x===ls?V=n.DEPTH_COMPONENT24:x===bi?V=n.DEPTH_COMPONENT32F:x===os&&(V=n.DEPTH_COMPONENT16),V}function b(R,x){return f(R)===!0||R.isFramebufferTexture&&R.minFilter!==Re&&R.minFilter!==Le?Math.log2(Math.max(x.width,x.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?x.mipmaps.length:1}function A(R){let x=R.target;x.removeEventListener("dispose",A),E(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function _(R){let x=R.target;x.removeEventListener("dispose",_),P(x)}function E(R){let x=i.get(R);if(x.__webglInit===void 0)return;let V=R.source,q=p.get(V);if(q){let j=q[x.__cacheKey];j.usedTimes--,j.usedTimes===0&&C(R),Object.keys(q).length===0&&p.delete(V)}i.remove(R)}function C(R){let x=i.get(R);n.deleteTexture(x.__webglTexture);let V=R.source,q=p.get(V);delete q[x.__cacheKey],a.memory.textures--}function P(R){let x=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(x.__webglFramebuffer[q]))for(let j=0;j<x.__webglFramebuffer[q].length;j++)n.deleteFramebuffer(x.__webglFramebuffer[q][j]);else n.deleteFramebuffer(x.__webglFramebuffer[q]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[q])}else{if(Array.isArray(x.__webglFramebuffer))for(let q=0;q<x.__webglFramebuffer.length;q++)n.deleteFramebuffer(x.__webglFramebuffer[q]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let q=0;q<x.__webglColorRenderbuffer.length;q++)x.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[q]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let V=R.textures;for(let q=0,j=V.length;q<j;q++){let ot=i.get(V[q]);ot.__webglTexture&&(n.deleteTexture(ot.__webglTexture),a.memory.textures--),i.remove(V[q])}i.remove(R)}let I=0;function F(){I=0}function L(){return I}function z(R){I=R}function Z(){let R=I;return R>=s.maxTextures&&Nt("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),I+=1,R}function X(R){let x=[];return x.push(R.wrapS),x.push(R.wrapT),x.push(R.wrapR||0),x.push(R.magFilter),x.push(R.minFilter),x.push(R.anisotropy),x.push(R.internalFormat),x.push(R.format),x.push(R.type),x.push(R.generateMipmaps),x.push(R.premultiplyAlpha),x.push(R.flipY),x.push(R.unpackAlignment),x.push(R.colorSpace),x.join()}function et(R,x){let V=i.get(R);if(R.isVideoTexture&&U(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&V.__version!==R.version){let q=R.image;if(q===null)Nt("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Nt("WebGLRenderer: Texture marked for update but image is incomplete");else{lt(V,R,x);return}}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+x)}function H(R,x){let V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){lt(V,R,x);return}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+x)}function $(R,x){let V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){lt(V,R,x);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+x)}function K(R,x){let V=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&V.__version!==R.version){wt(V,R,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+x)}let ht={[_a]:n.REPEAT,[Ai]:n.CLAMP_TO_EDGE,[xa]:n.MIRRORED_REPEAT},gt={[Re]:n.NEAREST,[ff]:n.NEAREST_MIPMAP_NEAREST,[sr]:n.NEAREST_MIPMAP_LINEAR,[Le]:n.LINEAR,[Ya]:n.LINEAR_MIPMAP_NEAREST,[un]:n.LINEAR_MIPMAP_LINEAR},Bt={[gf]:n.NEVER,[Mf]:n.ALWAYS,[_f]:n.LESS,[Io]:n.LEQUAL,[xf]:n.EQUAL,[Lo]:n.GEQUAL,[vf]:n.GREATER,[yf]:n.NOTEQUAL};function At(R,x){if(x.type===bi&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Le||x.magFilter===Ya||x.magFilter===sr||x.magFilter===un||x.minFilter===Le||x.minFilter===Ya||x.minFilter===sr||x.minFilter===un)&&Nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,ht[x.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,ht[x.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,ht[x.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,gt[x.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,gt[x.minFilter]),x.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,Bt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Re||x.minFilter!==sr&&x.minFilter!==un||x.type===bi&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Wt(R,x){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,x.addEventListener("dispose",A));let q=x.source,j=p.get(q);j===void 0&&(j={},p.set(q,j));let ot=X(x);if(ot!==R.__cacheKey){j[ot]===void 0&&(j[ot]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),j[ot].usedTimes++;let ut=j[R.__cacheKey];ut!==void 0&&(j[R.__cacheKey].usedTimes--,ut.usedTimes===0&&C(x)),R.__cacheKey=ot,R.__webglTexture=j[ot].texture}return V}function J(R,x,V){return Math.floor(Math.floor(R/V)/x)}function tt(R,x,V,q){let ot=R.updateRanges;if(ot.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,V,q,x.data);else{ot.sort((It,_t)=>It.start-_t.start);let ut=0;for(let It=1;It<ot.length;It++){let _t=ot[ut],dt=ot[It],Lt=_t.start+_t.count,Ut=J(dt.start,x.width,4),Gt=J(_t.start,x.width,4);dt.start<=Lt+1&&Ut===Gt&&J(dt.start+dt.count-1,x.width,4)===Ut?_t.count=Math.max(_t.count,dt.start+dt.count-_t.start):(++ut,ot[ut]=dt)}ot.length=ut+1;let Q=e.getParameter(n.UNPACK_ROW_LENGTH),nt=e.getParameter(n.UNPACK_SKIP_PIXELS),ft=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let It=0,_t=ot.length;It<_t;It++){let dt=ot[It],Lt=Math.floor(dt.start/4),Ut=Math.ceil(dt.count/4),Gt=Lt%x.width,N=Math.floor(Lt/x.width),pt=Ut,it=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Gt),e.pixelStorei(n.UNPACK_SKIP_ROWS,N),e.texSubImage2D(n.TEXTURE_2D,0,Gt,N,pt,it,V,q,x.data)}R.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(n.UNPACK_SKIP_ROWS,ft)}}function lt(R,x,V){let q=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(q=n.TEXTURE_3D);let j=Wt(R,x),ot=x.source;e.bindTexture(q,R.__webglTexture,n.TEXTURE0+V);let ut=i.get(ot);if(ot.version!==ut.__version||j===!0){if(e.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let it=Yt.getPrimaries(Yt.workingColorSpace),mt=x.colorSpace===Hi?null:Yt.getPrimaries(x.colorSpace),Mt=x.colorSpace===Hi||it===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt)}e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let nt=g(x.image,!1,s.maxTextureSize);nt=Ne(x,nt);let ft=r.convert(x.format,x.colorSpace),It=r.convert(x.type),_t=y(x.internalFormat,ft,It,x.normalized,x.colorSpace,x.isVideoTexture);At(q,x);let dt,Lt=x.mipmaps,Ut=x.isVideoTexture!==!0,Gt=ut.__version===void 0||j===!0,N=ot.dataReady,pt=b(x,nt);if(x.isDepthTexture)_t=v(x.format===fn,x.type),Gt&&(Ut?e.texStorage2D(n.TEXTURE_2D,1,_t,nt.width,nt.height):e.texImage2D(n.TEXTURE_2D,0,_t,nt.width,nt.height,0,ft,It,null));else if(x.isDataTexture)if(Lt.length>0){Ut&&Gt&&e.texStorage2D(n.TEXTURE_2D,pt,_t,Lt[0].width,Lt[0].height);for(let it=0,mt=Lt.length;it<mt;it++)dt=Lt[it],Ut?N&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,dt.width,dt.height,ft,It,dt.data):e.texImage2D(n.TEXTURE_2D,it,_t,dt.width,dt.height,0,ft,It,dt.data);x.generateMipmaps=!1}else Ut?(Gt&&e.texStorage2D(n.TEXTURE_2D,pt,_t,nt.width,nt.height),N&&tt(x,nt,ft,It)):e.texImage2D(n.TEXTURE_2D,0,_t,nt.width,nt.height,0,ft,It,nt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ut&&Gt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,_t,Lt[0].width,Lt[0].height,nt.depth);for(let it=0,mt=Lt.length;it<mt;it++)if(dt=Lt[it],x.format!==di)if(ft!==null)if(Ut){if(N)if(x.layerUpdates.size>0){let Mt=uc(dt.width,dt.height,x.format,x.type);for(let st of x.layerUpdates){let Dt=dt.data.subarray(st*Mt/dt.data.BYTES_PER_ELEMENT,(st+1)*Mt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,st,dt.width,dt.height,1,ft,Dt)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,dt.width,dt.height,nt.depth,ft,dt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,it,_t,dt.width,dt.height,nt.depth,0,dt.data,0,0);else Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?N&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,it,0,0,0,dt.width,dt.height,nt.depth,ft,It,dt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,it,_t,dt.width,dt.height,nt.depth,0,ft,It,dt.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Ut&&Gt&&e.texStorage2D(n.TEXTURE_2D,pt,_t,Lt[0].width,Lt[0].height);for(let it=0,mt=Lt.length;it<mt;it++)dt=Lt[it],x.format!==di?ft!==null?Ut?N&&e.compressedTexSubImage2D(n.TEXTURE_2D,it,0,0,dt.width,dt.height,ft,dt.data):e.compressedTexImage2D(n.TEXTURE_2D,it,_t,dt.width,dt.height,0,dt.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?N&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,dt.width,dt.height,ft,It,dt.data):e.texImage2D(n.TEXTURE_2D,it,_t,dt.width,dt.height,0,ft,It,dt.data)}else if(x.isDataArrayTexture)if(Ut){if(Gt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,pt,_t,nt.width,nt.height,nt.depth),N)if(x.layerUpdates.size>0){let it=uc(nt.width,nt.height,x.format,x.type);for(let mt of x.layerUpdates){let Mt=nt.data.subarray(mt*it/nt.data.BYTES_PER_ELEMENT,(mt+1)*it/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,mt,nt.width,nt.height,1,ft,It,Mt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ft,It,nt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,_t,nt.width,nt.height,nt.depth,0,ft,It,nt.data);else if(x.isData3DTexture)Ut?(Gt&&e.texStorage3D(n.TEXTURE_3D,pt,_t,nt.width,nt.height,nt.depth),N&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ft,It,nt.data)):e.texImage3D(n.TEXTURE_3D,0,_t,nt.width,nt.height,nt.depth,0,ft,It,nt.data);else if(x.isFramebufferTexture){if(Gt)if(Ut)e.texStorage2D(n.TEXTURE_2D,pt,_t,nt.width,nt.height);else{let it=nt.width,mt=nt.height;for(let Mt=0;Mt<pt;Mt++)e.texImage2D(n.TEXTURE_2D,Mt,_t,it,mt,0,ft,It,null),it>>=1,mt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){let it=n.canvas;if(it.hasAttribute("layoutsubtree")||it.setAttribute("layoutsubtree","true"),nt.parentNode!==it){it.appendChild(nt),d.add(x),it.onpaint=mt=>{let Mt=mt.changedElements;for(let st of d)Mt.includes(st.image)&&(st.needsUpdate=!0)},it.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,nt);else{let Mt=n.RGBA,st=n.RGBA,Dt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Mt,st,Dt,nt)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Lt.length>0){if(Ut&&Gt){let it=re(Lt[0]);e.texStorage2D(n.TEXTURE_2D,pt,_t,it.width,it.height)}for(let it=0,mt=Lt.length;it<mt;it++)dt=Lt[it],Ut?N&&e.texSubImage2D(n.TEXTURE_2D,it,0,0,ft,It,dt):e.texImage2D(n.TEXTURE_2D,it,_t,ft,It,dt);x.generateMipmaps=!1}else if(Ut){if(Gt){let it=re(nt);e.texStorage2D(n.TEXTURE_2D,pt,_t,it.width,it.height)}N&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft,It,nt)}else e.texImage2D(n.TEXTURE_2D,0,_t,ft,It,nt);f(x)&&w(q),ut.__version=ot.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function wt(R,x,V){if(x.image.length!==6)return;let q=Wt(R,x),j=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+V);let ot=i.get(j);if(j.version!==ot.__version||q===!0){e.activeTexture(n.TEXTURE0+V);let ut=Yt.getPrimaries(Yt.workingColorSpace),Q=x.colorSpace===Hi?null:Yt.getPrimaries(x.colorSpace),nt=x.colorSpace===Hi||ut===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let ft=x.isCompressedTexture||x.image[0].isCompressedTexture,It=x.image[0]&&x.image[0].isDataTexture,_t=[];for(let st=0;st<6;st++)!ft&&!It?_t[st]=g(x.image[st],!0,s.maxCubemapSize):_t[st]=It?x.image[st].image:x.image[st],_t[st]=Ne(x,_t[st]);let dt=_t[0],Lt=r.convert(x.format,x.colorSpace),Ut=r.convert(x.type),Gt=y(x.internalFormat,Lt,Ut,x.normalized,x.colorSpace),N=x.isVideoTexture!==!0,pt=ot.__version===void 0||q===!0,it=j.dataReady,mt=b(x,dt);At(n.TEXTURE_CUBE_MAP,x);let Mt;if(ft){N&&pt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,mt,Gt,dt.width,dt.height);for(let st=0;st<6;st++){Mt=_t[st].mipmaps;for(let Dt=0;Dt<Mt.length;Dt++){let Ct=Mt[Dt];x.format!==di?Lt!==null?N?it&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Dt,0,0,Ct.width,Ct.height,Lt,Ct.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Dt,Gt,Ct.width,Ct.height,0,Ct.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Dt,0,0,Ct.width,Ct.height,Lt,Ut,Ct.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Dt,Gt,Ct.width,Ct.height,0,Lt,Ut,Ct.data)}}}else{if(Mt=x.mipmaps,N&&pt){Mt.length>0&&mt++;let st=re(_t[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,mt,Gt,st.width,st.height)}for(let st=0;st<6;st++)if(It){N?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,_t[st].width,_t[st].height,Lt,Ut,_t[st].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Gt,_t[st].width,_t[st].height,0,Lt,Ut,_t[st].data);for(let Dt=0;Dt<Mt.length;Dt++){let ce=Mt[Dt].image[st].image;N?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Dt+1,0,0,ce.width,ce.height,Lt,Ut,ce.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Dt+1,Gt,ce.width,ce.height,0,Lt,Ut,ce.data)}}else{N?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Lt,Ut,_t[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Gt,Lt,Ut,_t[st]);for(let Dt=0;Dt<Mt.length;Dt++){let Ct=Mt[Dt];N?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Dt+1,0,0,Lt,Ut,Ct.image[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,Dt+1,Gt,Lt,Ut,Ct.image[st])}}}f(x)&&w(n.TEXTURE_CUBE_MAP),ot.__version=j.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function at(R,x,V,q,j,ot){let ut=r.convert(V.format,V.colorSpace),Q=r.convert(V.type),nt=y(V.internalFormat,ut,Q,V.normalized,V.colorSpace),ft=i.get(x),It=i.get(V);if(It.__renderTarget=x,!ft.__hasExternalTextures){let _t=Math.max(1,x.width>>ot),dt=Math.max(1,x.height>>ot);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?e.texImage3D(j,ot,nt,_t,dt,x.depth,0,ut,Q,null):e.texImage2D(j,ot,nt,_t,dt,0,ut,Q,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),xe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,j,It.__webglTexture,0,jt(x)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,j,It.__webglTexture,ot),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Vt(R,x,V){if(n.bindRenderbuffer(n.RENDERBUFFER,R),x.depthBuffer){let q=x.depthTexture,j=q&&q.isDepthTexture?q.type:null,ot=v(x.stencilBuffer,j),ut=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;xe(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,jt(x),ot,x.width,x.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,jt(x),ot,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ot,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ut,n.RENDERBUFFER,R)}else{let q=x.textures;for(let j=0;j<q.length;j++){let ot=q[j],ut=r.convert(ot.format,ot.colorSpace),Q=r.convert(ot.type),nt=y(ot.internalFormat,ut,Q,ot.normalized,ot.colorSpace);xe(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,jt(x),nt,x.width,x.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,jt(x),nt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,nt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function fe(R,x,V){let q=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let j=i.get(x.depthTexture);if(j.__renderTarget=x,(!j.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),q){if(j.__webglInit===void 0&&(j.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),j.__webglTexture===void 0){j.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),At(n.TEXTURE_CUBE_MAP,x.depthTexture);let ft=r.convert(x.depthTexture.format),It=r.convert(x.depthTexture.type),_t;x.depthTexture.format===Ci?_t=n.DEPTH_COMPONENT24:x.depthTexture.format===fn&&(_t=n.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,_t,x.width,x.height,0,ft,It,null)}}else et(x.depthTexture,0);let ot=j.__webglTexture,ut=jt(x),Q=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,nt=x.depthTexture.format===fn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Ci)xe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,Q,ot,0,ut):n.framebufferTexture2D(n.FRAMEBUFFER,nt,Q,ot,0);else if(x.depthTexture.format===fn)xe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,Q,ot,0,ut):n.framebufferTexture2D(n.FRAMEBUFFER,nt,Q,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ht(R){let x=i.get(R),V=R.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==R.depthTexture){let q=R.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),q){let j=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),x.__depthDisposeCallback=j}x.__boundDepthTexture=q}if(R.depthTexture&&!x.__autoAllocateDepthBuffer)if(V)for(let q=0;q<6;q++)fe(x.__webglFramebuffer[q],R,q);else{let q=R.texture.mipmaps;q&&q.length>0?fe(x.__webglFramebuffer[0],R,0):fe(x.__webglFramebuffer,R,0)}else if(V){x.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[q]),x.__webglDepthbuffer[q]===void 0)x.__webglDepthbuffer[q]=n.createRenderbuffer(),Vt(x.__webglDepthbuffer[q],R,!1);else{let j=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=x.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,ot),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,ot)}}else{let q=R.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Vt(x.__webglDepthbuffer,R,!1);else{let j=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ot),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,ot)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function O(R,x,V){let q=i.get(R);x!==void 0&&at(q.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Ht(R)}function rt(R){let x=R.texture,V=i.get(R),q=i.get(x);R.addEventListener("dispose",_);let j=R.textures,ot=R.isWebGLCubeRenderTarget===!0,ut=j.length>1;if(ut||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=x.version,a.memory.textures++),ot){V.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer[Q]=[];for(let nt=0;nt<x.mipmaps.length;nt++)V.__webglFramebuffer[Q][nt]=n.createFramebuffer()}else V.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer=[];for(let Q=0;Q<x.mipmaps.length;Q++)V.__webglFramebuffer[Q]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(ut)for(let Q=0,nt=j.length;Q<nt;Q++){let ft=i.get(j[Q]);ft.__webglTexture===void 0&&(ft.__webglTexture=n.createTexture(),a.memory.textures++)}if(R.samples>0&&xe(R)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Q=0;Q<j.length;Q++){let nt=j[Q];V.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[Q]);let ft=r.convert(nt.format,nt.colorSpace),It=r.convert(nt.type),_t=y(nt.internalFormat,ft,It,nt.normalized,nt.colorSpace,R.isXRRenderTarget===!0),dt=jt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,_t,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,V.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),Vt(V.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ot){e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),At(n.TEXTURE_CUBE_MAP,x);for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0)for(let nt=0;nt<x.mipmaps.length;nt++)at(V.__webglFramebuffer[Q][nt],R,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,nt);else at(V.__webglFramebuffer[Q],R,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);f(x)&&w(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ut){for(let Q=0,nt=j.length;Q<nt;Q++){let ft=j[Q],It=i.get(ft),_t=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(_t=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(_t,It.__webglTexture),At(_t,ft),at(V.__webglFramebuffer,R,ft,n.COLOR_ATTACHMENT0+Q,_t,0),f(ft)&&w(_t)}e.unbindTexture()}else{let Q=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Q=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Q,q.__webglTexture),At(Q,x),x.mipmaps&&x.mipmaps.length>0)for(let nt=0;nt<x.mipmaps.length;nt++)at(V.__webglFramebuffer[nt],R,x,n.COLOR_ATTACHMENT0,Q,nt);else at(V.__webglFramebuffer,R,x,n.COLOR_ATTACHMENT0,Q,0);f(x)&&w(Q),e.unbindTexture()}R.depthBuffer&&Ht(R)}function ct(R){let x=R.textures;for(let V=0,q=x.length;V<q;V++){let j=x[V];if(f(j)){let ot=T(R),ut=i.get(j).__webglTexture;e.bindTexture(ot,ut),w(ot),e.unbindTexture()}}}let zt=[],se=[];function ge(R){if(R.samples>0){if(xe(R)===!1){let x=R.textures,V=R.width,q=R.height,j=n.COLOR_BUFFER_BIT,ot=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ut=i.get(R),Q=x.length>1;if(Q)for(let ft=0;ft<x.length;ft++)e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer);let nt=R.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ut.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let ft=0;ft<x.length;ft++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ut.__webglColorRenderbuffer[ft]);let It=i.get(x[ft]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,It,0)}n.blitFramebuffer(0,0,V,q,0,0,V,q,j,n.NEAREST),l===!0&&(zt.length=0,se.length=0,zt.push(n.COLOR_ATTACHMENT0+ft),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(zt.push(ot),se.push(ot),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,se)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,zt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let ft=0;ft<x.length;ft++){e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,ut.__webglColorRenderbuffer[ft]);let It=i.get(x[ft]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ut.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,It,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let x=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function jt(R){return Math.min(s.maxSamples,R.samples)}function xe(R){let x=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function U(R){let x=a.render.frame;h.get(R)!==x&&(h.set(R,x),R.update())}function Ne(R,x){let V=R.colorSpace,q=R.format,j=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==Is&&V!==Hi&&(Yt.getTransfer(V)===Qt?(q!==di||j!==ai)&&Nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",V)),x}function re(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=F,this.getTextureUnits=L,this.setTextureUnits=z,this.setTexture2D=et,this.setTexture2DArray=H,this.setTexture3D=$,this.setTextureCube=K,this.rebindTextures=O,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=at,this.useMultisampledRTT=xe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Nx(n,t){function e(i,s=Hi){let r,a=Yt.getTransfer(s);if(i===ai)return n.UNSIGNED_BYTE;if(i===Ka)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ja)return n.UNSIGNED_SHORT_5_5_5_1;if(i===jl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ql)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Jl)return n.BYTE;if(i===$l)return n.SHORT;if(i===os)return n.UNSIGNED_SHORT;if(i===Za)return n.INT;if(i===Mi)return n.UNSIGNED_INT;if(i===bi)return n.FLOAT;if(i===De)return n.HALF_FLOAT;if(i===tc)return n.ALPHA;if(i===ec)return n.RGB;if(i===di)return n.RGBA;if(i===Ci)return n.DEPTH_COMPONENT;if(i===fn)return n.DEPTH_STENCIL;if(i===ic)return n.RED;if(i===$a)return n.RED_INTEGER;if(i===dn)return n.RG;if(i===ja)return n.RG_INTEGER;if(i===Qa)return n.RGBA_INTEGER;if(i===rr||i===ar||i===or||i===lr)if(a===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===to||i===eo||i===io||i===no)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===to)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===eo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===io)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===no)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===so||i===ro||i===ao||i===oo||i===lo||i===cr||i===co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===so||i===ro)return a===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ao)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===oo)return r.COMPRESSED_R11_EAC;if(i===lo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===cr)return r.COMPRESSED_RG11_EAC;if(i===co)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ho||i===uo||i===fo||i===po||i===mo||i===go||i===_o||i===xo||i===vo||i===yo||i===Mo||i===bo||i===So||i===wo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ho)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===uo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===fo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===po)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===go)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_o)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Mo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===So)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Eo||i===To||i===Ao)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Eo)return a===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===To)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ao)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Co||i===Ro||i===hr||i===Po)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Co)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ro)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===hr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Po)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ls?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var Ux=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Fx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Pc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Gs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new me({vertexShader:Ux,fragmentShader:Fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ze(new Tn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ic=class extends vi{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,m=null,M=typeof XRWebGLBinding<"u",g=new Pc,f={},w=e.getContextAttributes(),T=null,y=null,v=[],b=[],A=new Pt,_=null,E=null,C=new Be;C.viewport=new _e;let P=new Be;P.viewport=new _e;let I=[C,P],F=new Ga,L=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let tt=v[J];return tt===void 0&&(tt=new es,v[J]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(J){let tt=v[J];return tt===void 0&&(tt=new es,v[J]=tt),tt.getGripSpace()},this.getHand=function(J){let tt=v[J];return tt===void 0&&(tt=new es,v[J]=tt),tt.getHandSpace()};function Z(J){let tt=b.indexOf(J.inputSource);if(tt===-1)return;let lt=v[tt];lt!==void 0&&(lt.update(J.inputSource,J.frame,c||a),lt.dispatchEvent({type:J.type,data:J.inputSource}))}function X(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",et);for(let J=0;J<v.length;J++){let tt=b[J];tt!==null&&(b[J]=null,v[J].disconnect(tt))}L=null,z=null,g.reset();for(let J in f)delete f[J];if(t.setRenderTarget(T),p=null,u=null,d=null,s=null,y=null,Wt.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(A.width,A.height,!1),E!==null){let J=E.camera;J.fov=E.fov,J.zoom=E.zoom,J.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&Nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&Nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",X),s.addEventListener("inputsourceschange",et),w.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let lt=null,wt=null,at=null;w.depth&&(at=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,lt=w.stencil?fn:Ci,wt=w.stencil?ls:Mi);let Vt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Vt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Se(u.textureWidth,u.textureHeight,{format:di,type:ai,depthTexture:new rn(u.textureWidth,u.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,lt),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let lt={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,lt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Se(p.framebufferWidth,p.framebufferHeight,{format:di,type:ai,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Wt.setContext(s),Wt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function et(J){for(let tt=0;tt<J.removed.length;tt++){let lt=J.removed[tt],wt=b.indexOf(lt);wt>=0&&(b[wt]=null,v[wt].disconnect(lt))}for(let tt=0;tt<J.added.length;tt++){let lt=J.added[tt],wt=b.indexOf(lt);if(wt===-1){for(let Vt=0;Vt<v.length;Vt++)if(Vt>=b.length){b.push(lt),wt=Vt;break}else if(b[Vt]===null){b[Vt]=lt,wt=Vt;break}if(wt===-1)break}let at=v[wt];at&&at.connect(lt)}}let H=new B,$=new B;function K(J,tt,lt){H.setFromMatrixPosition(tt.matrixWorld),$.setFromMatrixPosition(lt.matrixWorld);let wt=H.distanceTo($),at=tt.projectionMatrix.elements,Vt=lt.projectionMatrix.elements,fe=at[14]/(at[10]-1),Ht=at[14]/(at[10]+1),O=(at[9]+1)/at[5],rt=(at[9]-1)/at[5],ct=(at[8]-1)/at[0],zt=(Vt[8]+1)/Vt[0],se=fe*ct,ge=fe*zt,jt=wt/(-ct+zt),xe=jt*-ct;if(tt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(xe),J.translateZ(jt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),at[10]===-1)J.projectionMatrix.copy(tt.projectionMatrix),J.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let U=fe+jt,Ne=Ht+jt,re=se-xe,R=ge+(wt-xe),x=O*Ht/Ne*U,V=rt*Ht/Ne*U;J.projectionMatrix.makePerspective(re,R,x,V,U,Ne),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ht(J,tt){tt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(tt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let tt=J.near,lt=J.far;g.texture!==null&&(g.depthNear>0&&(tt=g.depthNear),g.depthFar>0&&(lt=g.depthFar)),F.near=P.near=C.near=tt,F.far=P.far=C.far=lt,(L!==F.near||z!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),L=F.near,z=F.far),F.layers.mask=J.layers.mask|6,C.layers.mask=F.layers.mask&-5,P.layers.mask=F.layers.mask&-3;let wt=J.parent,at=F.cameras;ht(F,wt);for(let Vt=0;Vt<at.length;Vt++)ht(at[Vt],wt);at.length===2?K(F,C,P):F.projectionMatrix.copy(C.projectionMatrix),E===null&&J.isPerspectiveCamera&&(E={camera:J,fov:J.fov,zoom:J.zoom}),gt(J,F,wt)};function gt(J,tt,lt){lt===null?J.matrix.copy(tt.matrixWorld):(J.matrix.copy(lt.matrixWorld),J.matrix.invert(),J.matrix.multiply(tt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(tt.projectionMatrix),J.projectionMatrixInverse.copy(tt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Qn*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(J){return f[J]};let Bt=null;function At(J,tt){if(h=tt.getViewerPose(c||a),m=tt,h!==null){let lt=h.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let wt=!1;lt.length!==F.cameras.length&&(F.cameras.length=0,wt=!0);for(let Ht=0;Ht<lt.length;Ht++){let O=lt[Ht],rt=null;if(p!==null)rt=p.getViewport(O);else{let zt=d.getViewSubImage(u,O);rt=zt.viewport,Ht===0&&(t.setRenderTargetTextures(y,zt.colorTexture,zt.depthStencilTexture),t.setRenderTarget(y))}let ct=I[Ht];ct===void 0&&(ct=new Be,ct.layers.enable(Ht),ct.viewport=new _e,I[Ht]=ct),ct.matrix.fromArray(O.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(O.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(rt.x,rt.y,rt.width,rt.height),Ht===0&&(F.matrix.copy(ct.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),wt===!0&&F.cameras.push(ct)}let at=s.enabledFeatures;if(at&&at.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=i.getBinding();let Ht=d.getDepthInformation(lt[0]);Ht&&Ht.isValid&&Ht.texture&&g.init(Ht,s.renderState)}if(at&&at.includes("camera-access")&&M){t.state.unbindTexture(),d=i.getBinding();for(let Ht=0;Ht<lt.length;Ht++){let O=lt[Ht].camera;if(O){let rt=f[O];rt||(rt=new Gs,f[O]=rt);let ct=d.getCameraImage(O);rt.sourceTexture=ct}}}}for(let lt=0;lt<v.length;lt++){let wt=b[lt],at=v[lt];wt!==null&&at!==void 0&&at.update(wt,tt,c||a)}Bt&&Bt(J,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),m=null}let Wt=new $f;Wt.setAnimationLoop(At),this.setAnimationLoop=function(J){Bt=J},this.dispose=function(){}}},Ox=new ue,nd=new kt;nd.set(-1,0,0,0,1,0,0,0,1);function Bx(n,t){function e(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,lc(n)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,w,T,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(g,f):f.isMeshLambertMaterial?(r(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(g,f),d(g,f)):f.isMeshPhongMaterial?(r(g,f),h(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(g,f),u(g,f),f.isMeshPhysicalMaterial&&p(g,f,y)):f.isMeshMatcapMaterial?(r(g,f),m(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),M(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,w,T):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,e(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===qe&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,e(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===qe&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,e(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,e(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);let w=t.get(f),T=w.envMap,y=w.envMapRotation;T&&(g.envMap.value=T,g.envMapRotation.value.setFromMatrix4(Ox.makeRotationFromEuler(y)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(nd),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,w,T){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*w,g.scale.value=T*.5,f.map&&(g.map.value=f.map,e(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function h(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function d(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function u(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,w){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===qe&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.retroreflectivity>0&&(g.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,f){f.matcap&&(g.matcap.value=f.matcap)}function M(g,f){let w=t.get(f).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function zx(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){let b=v.program;i.uniformBlockBinding(y,b)}function c(y,v){let b=s[y.id];b===void 0&&(g(y),b=h(y),s[y.id]=b,y.addEventListener("dispose",w));let A=v.program;i.updateUBOMapping(y,A);let _=t.render.frame;r[y.id]!==_&&(u(y),r[y.id]=_)}function h(y){let v=d();y.__bindingPointIndex=v;let b=n.createBuffer(),A=y.__size,_=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,A,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,b),b}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let v=s[y.id],b=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let _=0,E=b.length;_<E;_++){let C=b[_];if(Array.isArray(C))for(let P=0,I=C.length;P<I;P++)p(C[P],_,P,A);else p(C,_,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,v,b,A){if(M(y,v,b,A)===!0){let _=y.__offset,E=y.value;if(Array.isArray(E)){let C=0;for(let P=0;P<E.length;P++){let I=E[P],F=f(I);m(I,y.__data,C),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(C+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(E,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,y.__data)}}function m(y,v,b){typeof y=="number"||typeof y=="boolean"?v[0]=y:y.isMatrix3?(v[0]=y.elements[0],v[1]=y.elements[1],v[2]=y.elements[2],v[3]=0,v[4]=y.elements[3],v[5]=y.elements[4],v[6]=y.elements[5],v[7]=0,v[8]=y.elements[6],v[9]=y.elements[7],v[10]=y.elements[8],v[11]=0):ArrayBuffer.isView(y)?v.set(new y.constructor(y.buffer,y.byteOffset,v.length)):y.toArray(v,b)}function M(y,v,b,A){let _=y.value,E=v+"_"+b;if(A[E]===void 0)return typeof _=="number"||typeof _=="boolean"?A[E]=_:ArrayBuffer.isView(_)?A[E]=_.slice():A[E]=_.clone(),!0;{let C=A[E];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return A[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function g(y){let v=y.uniforms,b=0,A=16;for(let E=0,C=v.length;E<C;E++){let P=Array.isArray(v[E])?v[E]:[v[E]];for(let I=0,F=P.length;I<F;I++){let L=P[I],z=Array.isArray(L.value)?L.value:[L.value];for(let Z=0,X=z.length;Z<X;Z++){let et=z[Z],H=f(et),$=b%A,K=$%H.boundary,ht=$+K;b+=K,ht!==0&&A-ht<H.storage&&(b+=A-ht),L.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=H.storage}}}let _=b%A;return _>0&&(b+=A-_),y.__size=b,y.__cache={},this}function f(y){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?Nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(v.boundary=16,v.storage=y.byteLength):Nt("WebGLRenderer: Unsupported uniform value type.",y),v}function w(y){let v=y.target;v.removeEventListener("dispose",w);let b=a.indexOf(v.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function T(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:T}}var kx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ri=null;function Vx(){return Ri===null&&(Ri=new Sa(kx,16,16,dn,De),Ri.name="DFG_LUT",Ri.minFilter=Le,Ri.magFilter=Le,Ri.wrapS=Ai,Ri.wrapT=Ai,Ri.generateMipmaps=!1,Ri.needsUpdate=!0),Ri}var Oo=class{constructor(t={}){let{canvas:e=Sf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=ai}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let M=p,g=new Set([Qa,ja,$a]),f=new Set([ai,Mi,os,ls,Ka,Ja]),w=new Uint32Array(4),T=new Int32Array(4),y=new B,v=null,b=null,A=[],_=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,P=!1,I=null,F=null,L=null,z=null;this._outputColorSpace=ei;let Z=0,X=0,et=null,H=-1,$=null,K=new _e,ht=new _e,gt=null,Bt=new Ft(0),At=0,Wt=e.width,J=e.height,tt=1,lt=null,wt=null,at=new _e(0,0,Wt,J),Vt=new _e(0,0,Wt,J),fe=!1,Ht=new ks,O=!1,rt=!1,ct=new ue,zt=new B,se=new _e,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},jt=!1;function xe(){return et===null?tt:1}let U=i;function Ne(S,D){return e.getContext(S,D)}let re,R,x,V,q,j,ot,ut,Q,nt,ft,It,_t,dt,Lt,Ut,Gt,N,pt,it,mt,Mt,st;try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ce,!1),e.addEventListener("webglcontextrestored",ee,!1),e.addEventListener("webglcontextcreationerror",pi,!1),U===null){let D="webgl2";if(U=Ne(D,S),U===null)throw Ne(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Dt()}catch(S){throw e.removeEventListener("webglcontextlost",ce,!1),e.removeEventListener("webglcontextrestored",ee,!1),e.removeEventListener("webglcontextcreationerror",pi,!1),Ot("WebGLRenderer: "+S.message),S}function Dt(){re=new Z0(U),re.init(),mt=new Nx(U,re),R=new B0(U,re,t,mt),x=new Lx(U,re),R.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),F=U.createFramebuffer(),L=U.createFramebuffer(),z=U.createFramebuffer(),V=new $0(U),q=new xx,j=new Dx(U,re,x,q,R,mt,V),ot=new Y0(C),ut=new Qp(U),Mt=new F0(U,ut),Q=new K0(U,ut,V,Mt),nt=new Q0(U,Q,ut,Mt,V),N=new j0(U,R,j),Lt=new z0(q),ft=new _x(C,ot,re,R,Mt,Lt),It=new Bx(C,q),_t=new yx,dt=new Tx(re),Gt=new U0(C,ot,x,nt,m,l),Ut=new Ix(C,nt,R),st=new zx(U,V,R,x),pt=new O0(U,re,V),it=new J0(U,re,V),V.programs=ft.programs,C.capabilities=R,C.extensions=re,C.properties=q,C.renderLists=_t,C.shadowMap=Ut,C.state=x,C.info=V}M!==ai&&(E=new e_(M,e.width,e.height,o,s,r));let Ct=new Ic(C,U);this.xr=Ct,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let S=re.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=re.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(S){S!==void 0&&(tt=S,this.setSize(Wt,J,!1))},this.getSize=function(S){return S.set(Wt,J)},this.setSize=function(S,D,Y=!0){if(Ct.isPresenting){Nt("WebGLRenderer: Can't change size while VR device is presenting.");return}Wt=S,J=D,e.width=Math.floor(S*tt),e.height=Math.floor(D*tt),Y===!0&&(e.style.width=S+"px",e.style.height=D+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(Wt*tt,J*tt).floor()},this.setDrawingBufferSize=function(S,D,Y){Wt=S,J=D,tt=Y,e.width=Math.floor(S*Y),e.height=Math.floor(D*Y),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(M===ai){Ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){Nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(K)},this.getViewport=function(S){return S.copy(at)},this.setViewport=function(S,D,Y,G){S.isVector4?at.set(S.x,S.y,S.z,S.w):at.set(S,D,Y,G),x.viewport(K.copy(at).multiplyScalar(tt).round())},this.getScissor=function(S){return S.copy(Vt)},this.setScissor=function(S,D,Y,G){S.isVector4?Vt.set(S.x,S.y,S.z,S.w):Vt.set(S,D,Y,G),x.scissor(ht.copy(Vt).multiplyScalar(tt).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(S){x.setScissorTest(fe=S)},this.setOpaqueSort=function(S){lt=S},this.setTransparentSort=function(S){wt=S},this.getClearColor=function(S){return S.copy(Gt.getClearColor())},this.setClearColor=function(){Gt.setClearColor(...arguments)},this.getClearAlpha=function(){return Gt.getClearAlpha()},this.setClearAlpha=function(){Gt.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,Y=!0){let G=0;if(S){let W=!1;if(et!==null){let yt=et.texture.format;W=g.has(yt)}if(W){let yt=et.texture.type,St=f.has(yt),vt=Gt.getClearColor(),Et=Gt.getClearAlpha(),Rt=vt.r,Xt=vt.g,Kt=vt.b;St?(w[0]=Rt,w[1]=Xt,w[2]=Kt,w[3]=Et,U.clearBufferuiv(U.COLOR,0,w)):(T[0]=Rt,T[1]=Xt,T[2]=Kt,T[3]=Et,U.clearBufferiv(U.COLOR,0,T))}else G|=U.COLOR_BUFFER_BIT}D&&(G|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),I=S},this.dispose=function(){e.removeEventListener("webglcontextlost",ce,!1),e.removeEventListener("webglcontextrestored",ee,!1),e.removeEventListener("webglcontextcreationerror",pi,!1),Gt.dispose(),_t.dispose(),dt.dispose(),q.dispose(),ot.dispose(),nt.dispose(),Mt.dispose(),st.dispose(),ft.dispose(),Ct.dispose(),Ct.removeEventListener("sessionstart",Hc),Ct.removeEventListener("sessionend",Gc),mn.stop()};function ce(S){S.preventDefault(),rc("WebGLRenderer: Context Lost."),P=!0}function ee(){rc("WebGLRenderer: Context Restored."),P=!1;let S=V.autoReset,D=Ut.enabled,Y=Ut.autoUpdate,G=Ut.needsUpdate,W=Ut.type;Dt(),V.autoReset=S,Ut.enabled=D,Ut.autoUpdate=Y,Ut.needsUpdate=G,Ut.type=W}function pi(S){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Si(S){let D=S.target;D.removeEventListener("dispose",Si),vd(D)}function vd(S){yd(S),q.remove(S)}function yd(S){let D=q.get(S).programs;D!==void 0&&(D.forEach(function(Y){ft.releaseProgram(Y)}),S.isShaderMaterial&&ft.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,Y,G,W,yt){D===null&&(D=ge);let St=W.isMesh&&W.matrixWorld.determinantAffine()<0,vt=Sd(S,D,Y,G,W);x.setMaterial(G,St);let Et=Y.index,Rt=1;if(G.wireframe===!0){if(Et=Q.getWireframeAttribute(Y),Et===void 0)return;Rt=2}let Xt=Y.drawRange,Kt=Y.attributes.position,Tt=Xt.start*Rt,ie=(Xt.start+Xt.count)*Rt;yt!==null&&(Tt=Math.max(Tt,yt.start*Rt),ie=Math.min(ie,(yt.start+yt.count)*Rt)),Et!==null?(Tt=Math.max(Tt,0),ie=Math.min(ie,Et.count)):Kt!=null&&(Tt=Math.max(Tt,0),ie=Math.min(ie,Kt.count));let Me=ie-Tt;if(Me<0||Me===1/0)return;Mt.setup(W,G,vt,Y,Et);let de,le=pt;if(Et!==null&&(de=ut.get(Et),le=it,le.setIndex(de)),W.isMesh)G.wireframe===!0?(x.setLineWidth(G.wireframeLinewidth*xe()),le.setMode(U.LINES)):le.setMode(U.TRIANGLES);else if(W.isLine){let Ue=G.linewidth;Ue===void 0&&(Ue=1),x.setLineWidth(Ue*xe()),W.isLineSegments?le.setMode(U.LINES):W.isLineLoop?le.setMode(U.LINE_LOOP):le.setMode(U.LINE_STRIP)}else W.isPoints?le.setMode(U.POINTS):W.isSprite&&le.setMode(U.TRIANGLES);if(W.isBatchedMesh)if(re.get("WEBGL_multi_draw"))le.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Ue=W._multiDrawStarts,bt=W._multiDrawCounts,Ve=W._multiDrawCount,$t=Et?ut.get(Et).bytesPerElement:1,li=q.get(G).currentProgram.getUniforms();for(let wi=0;wi<Ve;wi++)li.setValue(U,"_gl_DrawID",wi),le.render(Ue[wi]/$t,bt[wi])}else if(W.isInstancedMesh)le.renderInstances(Tt,Me,W.count);else if(Y.isInstancedBufferGeometry){let Ue=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,bt=Math.min(Y.instanceCount,Ue);le.renderInstances(Tt,Me,bt)}else le.render(Tt,Me)};function Vc(S,D,Y,G){I!==null&&S.isNodeMaterial&&I.setObject(G,S),O===!0&&Lt.setState(S,Y,!1),S.transparent===!0&&S.side===ui&&S.forceSinglePass===!1?(S.side=qe,S.needsUpdate=!0,yr(S,D,G),S.side=cn,S.needsUpdate=!0,yr(S,D,G),S.side=ui):yr(S,D,G)}this.compile=function(S,D,Y=null){Y===null&&(Y=S),I!==null&&I.renderStart(S,D,Y),b=dt.get(Y),b.init(D),_.push(b),Y.traverseVisible(function(W){W.isLight&&W.layers.test(D.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),S!==Y&&S.traverseVisible(function(W){W.isLight&&W.layers.test(D.layers)&&(b.pushLight(W),W.castShadow&&b.pushShadow(W))}),b.setupLights(),I!==null&&I.updateLights(b.state.lightsArray),rt=this.localClippingEnabled,O=Lt.init(this.clippingPlanes,rt),O===!0&&Lt.setGlobalState(this.clippingPlanes,D),I!==null&&Ut.render(b.state.shadowsArray,Y,D);let G=new Set;return S.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let yt=W.material;if(yt)if(Array.isArray(yt))for(let St=0;St<yt.length;St++){let vt=yt[St];Vc(vt,Y,D,W),G.add(vt)}else Vc(yt,Y,D,W),G.add(yt)}),b=_.pop(),I!==null&&I.renderEnd(),G},this.compileAsync=function(S,D,Y=null){let G=this.compile(S,D,Y);return new Promise(W=>{function yt(){if(G.forEach(function(St){let Et=q.get(St).currentProgram;(Et===void 0||Et.isReady())&&G.delete(St)}),G.size===0){W(S);return}setTimeout(yt,10)}re.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let il=null;function Md(S){il&&il(S)}function Hc(){mn.stop()}function Gc(){mn.start()}let mn=new $f;mn.setAnimationLoop(Md),typeof self<"u"&&mn.setContext(self),this.setAnimationLoop=function(S){il=S,Ct.setAnimationLoop(S),S===null?mn.stop():mn.start()},Ct.addEventListener("sessionstart",Hc),Ct.addEventListener("sessionend",Gc),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;I!==null&&I.renderStart(S,D);let Y=Ct.enabled===!0&&Ct.isPresenting===!0,G=E!==null&&(et===null||Y)&&E.begin(C,et);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Ct.enabled===!0&&Ct.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ct.cameraAutoUpdate===!0&&Ct.updateCamera(D),D=Ct.getCamera()),S.isScene===!0&&S.onBeforeRender(C,S,D,et),b=dt.get(S,_.length),b.init(D),b.state.textureUnits=j.getTextureUnits(),_.push(b),ct.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Ht.setFromProjectionMatrix(ct,xi,D.reversedDepth),rt=this.localClippingEnabled,O=Lt.init(this.clippingPlanes,rt),v=_t.get(S,A.length),v.init(),A.push(v),Ct.enabled===!0&&Ct.isPresenting===!0){let St=C.xr.getDepthSensingMesh();St!==null&&nl(St,D,-1/0,C.sortObjects)}nl(S,D,0,C.sortObjects),v.finish(),I!==null&&I.updateLights(b.state.lightsArray),C.sortObjects===!0&&v.sort(lt,wt),jt=Ct.enabled===!1||Ct.isPresenting===!1||Ct.hasDepthSensing()===!1,jt&&Gt.addToRenderList(v,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),O===!0&&Lt.beginShadows();let W=b.state.shadowsArray;if(Ut.render(W,S,D),O===!0&&Lt.endShadows(),(G&&E.hasRenderPass())===!1){let St=v.opaque,vt=v.transmissive;if(b.setupLights(),D.isArrayCamera){let Et=D.cameras;if(vt.length>0)for(let Rt=0,Xt=Et.length;Rt<Xt;Rt++){let Kt=Et[Rt];Xc(St,vt,S,Kt)}jt&&Gt.render(S);for(let Rt=0,Xt=Et.length;Rt<Xt;Rt++){let Kt=Et[Rt];Wc(v,S,Kt,Kt.viewport)}}else vt.length>0&&Xc(St,vt,S,D),jt&&Gt.render(S),Wc(v,S,D)}et!==null&&X===0&&(j.updateMultisampleRenderTarget(et),j.updateRenderTargetMipmap(et)),G&&E.end(C),S.isScene===!0&&S.onAfterRender(C,S,D),Mt.resetDefaultState(),H=-1,$=null,_.pop(),_.length>0?(b=_[_.length-1],j.setTextureUnits(b.state.textureUnits),O===!0&&Lt.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?v=A[A.length-1]:v=null,I!==null&&I.renderEnd()};function nl(S,D,Y,G){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)Y=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLightProbeGrid)b.pushLightProbeGrid(S);else if(S.isLight)b.pushLight(S),S.castShadow&&b.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(Ht)){G&&se.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ct);let St=nt.update(S),vt=S.material;vt.visible&&v.push(S,St,vt,Y,se.z,null,D)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(Ht))){let St=nt.update(S),vt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),se.copy(S.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),se.copy(St.boundingSphere.center)),se.applyMatrix4(S.matrixWorld).applyMatrix4(ct)),Array.isArray(vt)){let Et=St.groups;for(let Rt=0,Xt=Et.length;Rt<Xt;Rt++){let Kt=Et[Rt],Tt=vt[Kt.materialIndex];Tt&&Tt.visible&&v.push(S,St,Tt,Y,se.z,Kt,D)}}else vt.visible&&v.push(S,St,vt,Y,se.z,null,D)}}let yt=S.children;for(let St=0,vt=yt.length;St<vt;St++)nl(yt[St],D,Y,G)}function Wc(S,D,Y,G){let{opaque:W,transmissive:yt,transparent:St}=S;b.setupLightsView(Y),O===!0&&Lt.setGlobalState(C.clippingPlanes,Y),G&&x.viewport(K.copy(G)),W.length>0&&vr(W,D,Y),yt.length>0&&vr(yt,D,Y),St.length>0&&vr(St,D,Y),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Xc(S,D,Y,G){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[G.id]===void 0){let Tt=re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[G.id]=new Se(1,1,{generateMipmaps:!0,type:Tt?De:ai,minFilter:un,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Yt.workingColorSpace})}let yt=b.state.transmissionRenderTarget[G.id],St=G.viewport||K;yt.setSize(St.z*C.transmissionResolutionScale,St.w*C.transmissionResolutionScale);let vt=C.getRenderTarget(),Et=C.getActiveCubeFace(),Rt=C.getActiveMipmapLevel();C.setRenderTarget(yt),C.getClearColor(Bt),At=C.getClearAlpha(),At<1&&C.setClearColor(16777215,.5),C.clear(),jt&&Gt.render(Y);let Xt=C.toneMapping;C.toneMapping=yi;let Kt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),b.setupLightsView(G),O===!0&&Lt.setGlobalState(C.clippingPlanes,G),vr(S,Y,G),j.updateMultisampleRenderTarget(yt),j.updateRenderTargetMipmap(yt),re.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let ie=0,Me=D.length;ie<Me;ie++){let de=D[ie],{object:le,geometry:Ue,material:bt,group:Ve}=de;if(bt.side===ui&&le.layers.test(G.layers)){let $t=bt.side;bt.side=qe,bt.needsUpdate=!0,qc(le,Y,G,Ue,bt,Ve),bt.side=$t,bt.needsUpdate=!0,Tt=!0}}Tt===!0&&(j.updateMultisampleRenderTarget(yt),j.updateRenderTargetMipmap(yt))}C.setRenderTarget(vt,Et,Rt),C.setClearColor(Bt,At),Kt!==void 0&&(G.viewport=Kt),C.toneMapping=Xt}function vr(S,D,Y){let G=D.isScene===!0?D.overrideMaterial:null;for(let W=0,yt=S.length;W<yt;W++){let St=S[W],{object:vt,geometry:Et,group:Rt}=St,Xt=St.material;Xt.allowOverride===!0&&G!==null&&(Xt=G),vt.layers.test(Y.layers)&&qc(vt,D,Y,Et,Xt,Rt)}}function qc(S,D,Y,G,W,yt){I!==null&&W.isNodeMaterial&&I.setObject(S,W),S.onBeforeRender(C,D,Y,G,W,yt),S.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),W.onBeforeRender(C,D,Y,G,S,yt),W.transparent===!0&&W.side===ui&&W.forceSinglePass===!1?(W.side=qe,W.needsUpdate=!0,C.renderBufferDirect(Y,D,G,W,S,yt),W.side=cn,W.needsUpdate=!0,C.renderBufferDirect(Y,D,G,W,S,yt),W.side=ui):C.renderBufferDirect(Y,D,G,W,S,yt),S.onAfterRender(C,D,Y,G,W,yt)}function yr(S,D,Y){D.isScene!==!0&&(D=ge);let G=q.get(S),W=b.state.lights,yt=b.state.shadowsArray,St=W.state.version,vt=ft.getParameters(S,W.state,yt,D,Y,b.state.lightProbeGridArray),Et=ft.getProgramCacheKey(vt),Rt=G.programs;G.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,G.fog=D.fog;let Xt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;G.envMap=ot.get(S.envMap||G.environment,Xt),G.envMapRotation=G.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Rt===void 0&&(S.addEventListener("dispose",Si),Rt=new Map,G.programs=Rt);let Kt=Rt.get(Et);if(Kt!==void 0){if(G.currentProgram===Kt&&G.lightsStateVersion===St)return Zc(S,vt),Kt}else vt.uniforms=ft.getUniforms(S),I!==null&&S.isNodeMaterial&&I.build(S,Y,vt),S.onBeforeCompile(vt,C),Kt=ft.acquireProgram(vt,Et),Rt.set(Et,Kt),G.uniforms=vt.uniforms;let Tt=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Tt.clippingPlanes=Lt.uniform),Zc(S,vt),G.needsLights=Ed(S),G.lightsStateVersion=St,G.needsLights&&(Tt.ambientLightColor.value=W.state.ambient,Tt.lightProbe.value=W.state.probe,Tt.sunLights.value=W.state.sun,Tt.sunLightShadows.value=W.state.sunShadow,Tt.directionalLights.value=W.state.directional,Tt.directionalLightShadows.value=W.state.directionalShadow,Tt.spotLights.value=W.state.spot,Tt.spotLightShadows.value=W.state.spotShadow,Tt.rectAreaLights.value=W.state.rectArea,Tt.ltc_1.value=W.state.rectAreaLTC1,Tt.ltc_2.value=W.state.rectAreaLTC2,Tt.pointLights.value=W.state.point,Tt.pointLightShadows.value=W.state.pointShadow,Tt.hemisphereLights.value=W.state.hemi,Tt.sunShadowMatrix.value=W.state.sunShadowMatrix,Tt.sunShadowCascade.value=W.state.sunShadowCascade,Tt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Tt.spotLightMatrix.value=W.state.spotLightMatrix,Tt.spotLightMap.value=W.state.spotLightMap,Tt.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=b.state.lightProbeGridArray.length>0,G.currentProgram=Kt,G.uniformsList=null,Kt}function Yc(S){if(S.uniformsList===null){let D=S.currentProgram.getUniforms();S.uniformsList=fs.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Zc(S,D){let Y=q.get(S);Y.outputColorSpace=D.outputColorSpace,Y.batching=D.batching,Y.batchingColor=D.batchingColor,Y.instancing=D.instancing,Y.instancingColor=D.instancingColor,Y.instancingMorph=D.instancingMorph,Y.skinning=D.skinning,Y.morphTargets=D.morphTargets,Y.morphNormals=D.morphNormals,Y.morphColors=D.morphColors,Y.morphTargetsCount=D.morphTargetsCount,Y.numClippingPlanes=D.numClippingPlanes,Y.numIntersection=D.numClipIntersection,Y.vertexAlphas=D.vertexAlphas,Y.vertexTangents=D.vertexTangents,Y.toneMapping=D.toneMapping}function bd(S,D){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(D.matrixWorld);for(let Y=0,G=S.length;Y<G;Y++){let W=S[Y];if(W.texture!==null&&W.boundingBox.containsPoint(y))return W}return null}function Sd(S,D,Y,G,W){D.isScene!==!0&&(D=ge),j.resetTextureUnits();let yt=D.fog,St=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?D.environment:null,vt=et===null?C.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Yt.workingColorSpace,Et=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Rt=ot.get(G.envMap||St,Et),Xt=G.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Kt=!!Y.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Tt=!!Y.morphAttributes.position,ie=!!Y.morphAttributes.normal,Me=!!Y.morphAttributes.color,de=yi;G.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(de=C.toneMapping);let le=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ue=le!==void 0?le.length:0,bt=q.get(G),Ve=b.state.lights;if(O===!0&&(rt===!0||S!==$)){let he=S===$&&G.id===H;Lt.setState(G,S,he)}let $t=!1;G.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==Ve.state.version||bt.outputColorSpace!==vt||W.isBatchedMesh&&bt.batching===!1||!W.isBatchedMesh&&bt.batching===!0||W.isBatchedMesh&&bt.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&bt.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&bt.instancing===!1||!W.isInstancedMesh&&bt.instancing===!0||W.isSkinnedMesh&&bt.skinning===!1||!W.isSkinnedMesh&&bt.skinning===!0||W.isInstancedMesh&&bt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&bt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&bt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&bt.instancingMorph===!1&&W.morphTexture!==null||bt.envMap!==Rt||G.fog===!0&&bt.fog!==yt||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==Lt.numPlanes||bt.numIntersection!==Lt.numIntersection)||bt.vertexAlphas!==Xt||bt.vertexTangents!==Kt||bt.morphTargets!==Tt||bt.morphNormals!==ie||bt.morphColors!==Me||bt.toneMapping!==de||bt.morphTargetsCount!==Ue||!!bt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&($t=!0):($t=!0,bt.__version=G.version);let li=bt.currentProgram;$t===!0&&(li=yr(G,D,W),I&&G.isNodeMaterial&&I.onUpdateProgram(G,li,bt));let wi=!1,Wi=!1,Dn=!1,oe=li.getUniforms(),ye=bt.uniforms;if(x.useProgram(li.program)&&(wi=!0,Wi=!0,Dn=!0),G.id!==H&&(H=G.id,Wi=!0),bt.needsLights){let he=bd(b.state.lightProbeGridArray,W);bt.lightProbeGrid!==he&&(bt.lightProbeGrid=he,Wi=!0)}if(wi||$!==S){x.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),oe.setValue(U,"projectionMatrix",S.projectionMatrix),oe.setValue(U,"viewMatrix",S.matrixWorldInverse);let qi=oe.map.cameraPosition;qi!==void 0&&qi.setValue(U,zt.setFromMatrixPosition(S.matrixWorld)),R.logarithmicDepthBuffer&&oe.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&oe.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),$!==S&&($=S,Wi=!0,Dn=!0)}if(bt.needsLights&&(Ve.state.sunShadowMap.length>0&&oe.setValue(U,"sunShadowMap",Ve.state.sunShadowMap,j),Ve.state.directionalShadowMap.length>0&&oe.setValue(U,"directionalShadowMap",Ve.state.directionalShadowMap,j),Ve.state.spotShadowMap.length>0&&oe.setValue(U,"spotShadowMap",Ve.state.spotShadowMap,j),Ve.state.pointShadowMap.length>0&&oe.setValue(U,"pointShadowMap",Ve.state.pointShadowMap,j)),W.isSkinnedMesh){oe.setOptional(U,W,"bindMatrix"),oe.setOptional(U,W,"bindMatrixInverse");let he=W.skeleton;he&&(he.boneTexture===null&&he.computeBoneTexture(),oe.setValue(U,"boneTexture",he.boneTexture,j))}W.isBatchedMesh&&(oe.setOptional(U,W,"batchingTexture"),oe.setValue(U,"batchingTexture",W._matricesTexture,j),oe.setOptional(U,W,"batchingIdTexture"),oe.setValue(U,"batchingIdTexture",W._indirectTexture,j),oe.setOptional(U,W,"batchingColorTexture"),W._colorsTexture!==null&&oe.setValue(U,"batchingColorTexture",W._colorsTexture,j));let Xi=Y.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&N.update(W,Y,li),(Wi||bt.receiveShadow!==W.receiveShadow)&&(bt.receiveShadow=W.receiveShadow,oe.setValue(U,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&D.environment!==null&&(ye.envMapIntensity.value=D.environmentIntensity),ye.dfgLUT!==void 0&&(ye.dfgLUT.value=Vx()),Wi){if(oe.setValue(U,"toneMappingExposure",C.toneMappingExposure),bt.needsLights&&wd(ye,Dn),yt&&G.fog===!0&&It.refreshFogUniforms(ye,yt),It.refreshMaterialUniforms(ye,G,tt,J,b.state.transmissionRenderTarget[S.id]),bt.needsLights&&bt.lightProbeGrid){let he=bt.lightProbeGrid;ye.probesSH.value=he.texture,ye.probesMin.value.copy(he.boundingBox.min),ye.probesMax.value.copy(he.boundingBox.max),ye.probesResolution.value.copy(he.resolution)}fs.upload(U,Yc(bt),ye,j)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(fs.upload(U,Yc(bt),ye,j),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&oe.setValue(U,"center",W.center),oe.setValue(U,"modelViewMatrix",W.modelViewMatrix),oe.setValue(U,"normalMatrix",W.normalMatrix),oe.setValue(U,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){let he=G.uniformsGroups;for(let qi=0,Nn=he.length;qi<Nn;qi++){let Jc=he[qi];st.update(Jc,li),st.bind(Jc,li)}}return li}function wd(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.sunLights.needsUpdate=D,S.sunLightShadows.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Ed(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(S,D,Y){let G=q.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),q.get(S.texture).__webglTexture=D,q.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Y,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){let Y=q.get(S);Y.__webglFramebuffer=D,Y.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,Y=0){et=S,Z=D,X=Y;let G=null,W=!1,yt=!1;if(S){let vt=q.get(S);if(vt.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(U.FRAMEBUFFER,vt.__webglFramebuffer),K.copy(S.viewport),ht.copy(S.scissor),gt=S.scissorTest,x.viewport(K),x.scissor(ht),x.setScissorTest(gt),H=-1;return}else if(vt.__webglFramebuffer===void 0)j.setupRenderTarget(S);else if(vt.__hasExternalTextures)j.rebindTextures(S,q.get(S.texture).__webglTexture,q.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Xt=S.depthTexture;if(vt.__boundDepthTexture!==Xt){if(Xt!==null&&q.has(Xt)&&(S.width!==Xt.image.width||S.height!==Xt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(S)}}let Et=S.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(yt=!0);let Rt=q.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Rt[D])?G=Rt[D][Y]:G=Rt[D],W=!0):S.samples>0&&j.useMultisampledRTT(S)===!1?G=q.get(S).__webglMultisampledFramebuffer:Array.isArray(Rt)?G=Rt[Y]:G=Rt,K.copy(S.viewport),ht.copy(S.scissor),gt=S.scissorTest}else K.copy(at).multiplyScalar(tt).floor(),ht.copy(Vt).multiplyScalar(tt).floor(),gt=fe;if(Y!==0&&(G=F),x.bindFramebuffer(U.FRAMEBUFFER,G)&&x.drawBuffers(S,G),x.viewport(K),x.scissor(ht),x.setScissorTest(gt),W){let vt=q.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,vt.__webglTexture,Y)}else if(yt){let vt=D;for(let Et=0;Et<S.textures.length;Et++){let Rt=q.get(S.textures[Et]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Et,Rt.__webglTexture,Y,vt)}}else if(S!==null&&Y!==0){let vt=q.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,vt.__webglTexture,Y)}H=-1};function Kc(S){let D=q.get(S);return(D.__readFormat!==S.format||D.__readType!==S.type)&&(D.__readFormat=S.format,D.__readType=S.type,D.__formatReadable=R.textureFormatReadable(S.format),D.__typeReadable=R.textureTypeReadable(S.type)),D}this.readRenderTargetPixels=function(S,D,Y,G,W,yt,St,vt=0){if(!(S&&S.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&St!==void 0&&(Et=Et[St]),Et){x.bindFramebuffer(U.FRAMEBUFFER,Et);try{let Rt=S.textures[vt],Xt=Rt.format,Kt=Rt.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+vt);let Tt=Kc(Rt);if(Tt.__formatReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Tt.__typeReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-G&&Y>=0&&Y<=S.height-W&&U.readPixels(D,Y,G,W,mt.convert(Xt),mt.convert(Kt),yt)}finally{let Rt=et!==null?q.get(et).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(S,D,Y,G,W,yt,St,vt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&St!==void 0&&(Et=Et[St]),Et)if(D>=0&&D<=S.width-G&&Y>=0&&Y<=S.height-W){x.bindFramebuffer(U.FRAMEBUFFER,Et);let Rt=S.textures[vt],Xt=Rt.format,Kt=Rt.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+vt);let Tt=Kc(Rt);if(Tt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Tt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ie=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ie),U.bufferData(U.PIXEL_PACK_BUFFER,yt.byteLength,U.STREAM_READ),U.readPixels(D,Y,G,W,mt.convert(Xt),mt.convert(Kt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Me=et!==null?q.get(et).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,Me);let de=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Ef(U,de,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ie),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,yt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ie),U.deleteSync(de),yt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,Y=0){let G=Math.pow(2,-Y),W=Math.floor(S.image.width*G),yt=Math.floor(S.image.height*G),St=D!==null?D.x:0,vt=D!==null?D.y:0;j.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,Y,0,0,St,vt,W,yt),x.unbindTexture()},this.copyTextureToTexture=function(S,D,Y=null,G=null,W=0,yt=0){let St,vt,Et,Rt,Xt,Kt,Tt,ie,Me,de=S.isCompressedTexture?S.mipmaps[yt]:S.image;if(Y!==null)St=Y.max.x-Y.min.x,vt=Y.max.y-Y.min.y,Et=Y.isBox3?Y.max.z-Y.min.z:1,Rt=Y.min.x,Xt=Y.min.y,Kt=Y.isBox3?Y.min.z:0;else{let ye=Math.pow(2,-W);St=Math.floor(de.width*ye),vt=Math.floor(de.height*ye),S.isDataArrayTexture?Et=de.depth:S.isData3DTexture?Et=Math.floor(de.depth*ye):Et=1,Rt=0,Xt=0,Kt=0}G!==null?(Tt=G.x,ie=G.y,Me=G.z):(Tt=0,ie=0,Me=0);let le=mt.convert(D.format),Ue=mt.convert(D.type),bt;D.isData3DTexture?(j.setTexture3D(D,0),bt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(j.setTexture2DArray(D,0),bt=U.TEXTURE_2D_ARRAY):(j.setTexture2D(D,0),bt=U.TEXTURE_2D),x.activeTexture(U.TEXTURE0),x.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),x.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),x.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);let Ve=x.getParameter(U.UNPACK_ROW_LENGTH),$t=x.getParameter(U.UNPACK_IMAGE_HEIGHT),li=x.getParameter(U.UNPACK_SKIP_PIXELS),wi=x.getParameter(U.UNPACK_SKIP_ROWS),Wi=x.getParameter(U.UNPACK_SKIP_IMAGES);x.pixelStorei(U.UNPACK_ROW_LENGTH,de.width),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,de.height),x.pixelStorei(U.UNPACK_SKIP_PIXELS,Rt),x.pixelStorei(U.UNPACK_SKIP_ROWS,Xt),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Kt);let Dn=S.isDataArrayTexture||S.isData3DTexture,oe=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){let ye=q.get(S),Xi=q.get(D),he=q.get(ye.__renderTarget),qi=q.get(Xi.__renderTarget);x.bindFramebuffer(U.READ_FRAMEBUFFER,he.__webglFramebuffer),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,qi.__webglFramebuffer);for(let Nn=0;Nn<Et;Nn++)Dn&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,q.get(S).__webglTexture,W,Kt+Nn),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,q.get(D).__webglTexture,yt,Me+Nn)),U.blitFramebuffer(Rt,Xt,St,vt,Tt,ie,St,vt,U.DEPTH_BUFFER_BIT,U.NEAREST);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(W!==0||S.isRenderTargetTexture||q.has(S)){let ye=q.get(S),Xi=q.get(D);x.bindFramebuffer(U.READ_FRAMEBUFFER,L),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let he=0;he<Et;he++)Dn?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ye.__webglTexture,W,Kt+he):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ye.__webglTexture,W),oe?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Xi.__webglTexture,yt,Me+he):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Xi.__webglTexture,yt),W!==0?U.blitFramebuffer(Rt,Xt,St,vt,Tt,ie,St,vt,U.COLOR_BUFFER_BIT,U.NEAREST):oe?U.copyTexSubImage3D(bt,yt,Tt,ie,Me+he,Rt,Xt,St,vt):U.copyTexSubImage2D(bt,yt,Tt,ie,Rt,Xt,St,vt);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else oe?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(bt,yt,Tt,ie,Me,St,vt,Et,le,Ue,de.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(bt,yt,Tt,ie,Me,St,vt,Et,le,de.data):U.texSubImage3D(bt,yt,Tt,ie,Me,St,vt,Et,le,Ue,de):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,yt,Tt,ie,St,vt,le,Ue,de.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,yt,Tt,ie,de.width,de.height,le,de.data):U.texSubImage2D(U.TEXTURE_2D,yt,Tt,ie,St,vt,le,Ue,de);x.pixelStorei(U.UNPACK_ROW_LENGTH,Ve),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,$t),x.pixelStorei(U.UNPACK_SKIP_PIXELS,li),x.pixelStorei(U.UNPACK_SKIP_ROWS,wi),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Wi),yt===0&&D.generateMipmaps&&U.generateMipmap(bt),x.unbindTexture()},this.initRenderTarget=function(S){q.get(S).__webglFramebuffer===void 0&&j.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?j.setTextureCube(S,0):S.isData3DTexture?j.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?j.setTexture2DArray(S,0):j.setTexture2D(S,0),x.unbindTexture()},this.resetState=function(){Z=0,X=0,et=null,x.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}};var sd={type:"change"},Nc={type:"start"},ad={type:"end"},ko=new nn,rd=new ii,Hx=Math.cos(70*oc.DEG2RAD),Te=new B,$e=2*Math.PI,ae={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Dc=1e-6,Vo=class extends Zs{constructor(t,e=null){super(t,e),this.state=ae.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},this.touches={ONE:ri.ROTATE,TWO:ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new ni,this._lastTargetPosition=new B,this._quat=new ni().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ss,this._sphericalDelta=new ss,this._scale=1,this._panOffset=new B,this._rotateStart=new Pt,this._rotateEnd=new Pt,this._rotateDelta=new Pt,this._panStart=new Pt,this._panEnd=new Pt,this._panDelta=new Pt,this._dollyStart=new Pt,this._dollyEnd=new Pt,this._dollyDelta=new Pt,this._dollyDirection=new B,this._mouse=new Pt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Wx.bind(this),this._onPointerDown=Gx.bind(this),this._onPointerUp=Xx.bind(this),this._onContextMenu=jx.bind(this),this._onMouseWheel=Zx.bind(this),this._onKeyDown=Kx.bind(this),this._onTouchStart=Jx.bind(this),this._onTouchMove=$x.bind(this),this._onMouseDown=qx.bind(this),this._onMouseMove=Yx.bind(this),this._interceptControlDown=Qx.bind(this),this._interceptControlUp=tv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ae.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sd),this.update(),this.state=ae.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Te.copy(e).sub(this.target),Te.applyQuaternion(this._quat),this._spherical.setFromVector3(Te),this.autoRotate&&this.state===ae.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=$e:i>Math.PI&&(i-=$e),s<-Math.PI?s+=$e:s>Math.PI&&(s-=$e),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Te.setFromSpherical(this._spherical),Te.applyQuaternion(this._quatInverse),e.copy(this.target).add(Te),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Te.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new B(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Te.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ko.origin.copy(this.object.position),ko.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ko.direction))<Hx?this.object.lookAt(this.target):(rd.setFromNormalAndCoplanarPoint(this.object.up,this.target),ko.intersectPlane(rd,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Dc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Dc||this._lastTargetPosition.distanceToSquared(this.target)>Dc?(this.dispatchEvent(sd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?$e/60*this.autoRotateSpeed*t:$e/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Te.setFromMatrixColumn(e,0),Te.multiplyScalar(-t),this._panOffset.add(Te)}_panUp(t,e){this.screenSpacePanning===!0?Te.setFromMatrixColumn(e,1):(Te.setFromMatrixColumn(e,0),Te.crossVectors(this.object.up,Te)),Te.multiplyScalar(t),this._panOffset.add(Te)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Te.copy(s).sub(this.target);let r=Te.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft($e*this._rotateDelta.x/e.clientHeight),this._rotateUp($e*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp($e*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-$e*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft($e*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-$e*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft($e*this._rotateDelta.x/e.clientHeight),this._rotateUp($e*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Pt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function Gx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Wx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Xx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ad),this.state=ae.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function qx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ae.DOLLY;break;case Xe.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ae.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ae.ROTATE}break;case Xe.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ae.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ae.PAN}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(Nc)}function Yx(n){switch(this.state){case ae.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ae.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ae.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Zx(n){this.enabled===!1||this.enableZoom===!1||this.state!==ae.NONE||(n.preventDefault(),this.dispatchEvent(Nc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(ad))}function Kx(n){this.enabled!==!1&&this._handleKeyDown(n)}function Jx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ae.TOUCH_ROTATE;break;case ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ae.TOUCH_PAN;break;default:this.state=ae.NONE}break;case 2:switch(this.touches.TWO){case ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ae.TOUCH_DOLLY_PAN;break;case ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ae.TOUCH_DOLLY_ROTATE;break;default:this.state=ae.NONE}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(Nc)}function $x(n){switch(this._trackPointer(n),this.state){case ae.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ae.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ae.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ae.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ae.NONE}}function jx(n){this.enabled!==!1&&n.preventDefault()}function Qx(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tv(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var ps={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var oi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},ev=new An(-1,1,1,-1,0,1),Uc=class extends ve{constructor(){super(),this.setAttribute("position",new Ie([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ie([0,2,0,0,2,0],2))}},iv=new Uc,pn=class{constructor(t){this._mesh=new ze(iv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,ev)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Ho=class extends oi{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof me?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Gi.clone(t.uniforms),this.material=new me({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new pn(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var pr=class extends oi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Go=class extends oi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Wo=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new Pt);this._width=i.width,this._height=i.height,e=new Se(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:De}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ho(ps),this.copyPass.material.blending=fi,this.timer=new Ys}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}pr!==void 0&&(a instanceof pr?i=!0:a instanceof Go&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new Pt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Xo=class extends oi{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ft}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var od={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ft(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var ms=class n extends oi{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Pt(t.x,t.y):new Pt(256,256),this.clearColor=new Ft(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Se(r,a,{type:De,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new Se(r,a,{type:De,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let u=new Se(r,a,{type:De,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}let o=od;this.highPassUniforms=Gi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new me({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Pt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Gi.clone(ps.uniforms),this.blendMaterial=new me({uniforms:this.copyUniforms,vertexShader:ps.vertexShader,fragmentShader:ps.fragmentShader,premultipliedAlpha:!0,blending:Vi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ft,this._oldClearAlpha=1,this._basic=new En,this._fsQuad=new pn(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Pt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){let e=[],i=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(i*i))/i);let s=[],r=[];for(let a=1;a<t;a+=2){let o=e[a],l=a+1<t?e[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new me({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new Pt(.5,.5)},direction:{value:new Pt(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new me({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};ms.BlurDirectionX=new Pt(1,0);ms.BlurDirectionY=new Pt(0,1);var mr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var qo=class extends oi{constructor(){super(),this.isOutputPass=!0,this.uniforms=Gi.clone(mr.uniforms),this.material=new ns({name:mr.name,uniforms:this.uniforms,vertexShader:mr.vertexShader,fragmentShader:mr.fragmentShader}),this._fsQuad=new pn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Yt.getTransfer(this._outputColorSpace)===Qt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Js?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===$s?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===js?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Qs?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===er?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ir?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===tr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Yo=`
float fogK(float dist){ return 1.0 - uFog * smoothstep(uFogNear, uFogFar, dist); }
float introK(vec3 p){ return clamp(uIntro * 1.8 - length(p) / uRadius * 0.8, 0.0, 1.0); }
`,Fc=`
uniform float uTime, uFade, uPxRatio, uScale, uSizeMul, uMinPx, uMaxPx, uDim, uFog, uFogNear, uFogFar, uIntro, uRadius, uMinPxK, uAlphaK;
attribute float aSize;
attribute vec3 aColor;
attribute float aS0;
attribute float aS1;
attribute float aPulse;
attribute float aSeed;
attribute float aHot;
varying vec3 vColor;
varying float vAlpha;
varying float vHot;
varying float vPx;
${Yo}
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float dist = max(1.0, -mv.z);
  float st = mix(aS0, aS1, uFade);
  float sel = smoothstep(3.5, 4.0, st);
  float act = clamp(st - 1.0, 0.0, 2.0);
  float ik = introK(position);
  float tw = 0.88 + 0.12 * sin(uTime * 0.9 + aSeed * 60.0);
  float breathe = sel * (0.5 + 0.5 * sin(uTime * 2.4));
  float px = aSize * uSizeMul * uScale / dist;
  px *= 1.0 + 0.22 * act + 0.55 * aPulse + 0.3 * breathe;
  px = clamp(px, uMinPx * uMinPxK, uMaxPx) * ik;
  gl_PointSize = max(1.0, px * uPxRatio * ${5 .toFixed(1)});
  vPx = gl_PointSize * 0.5;
  float dimK = mix(uDim, 1.0, clamp(st, 0.0, 1.0));
  vAlpha = uAlphaK * dimK * fogK(dist) * tw * ik * (1.0 + 0.45 * aPulse + 0.35 * act + 0.35 * breathe);
  vColor = aColor;
  vHot = clamp(aHot + 0.22 * act + 0.4 * sel + 0.55 * aPulse, 0.0, 1.0);
  gl_Position = projectionMatrix * mv;
}`,Oc=`
precision highp float;
uniform float uGlow, uSharp;
varying vec3 vColor;
varying float vAlpha;
varying float vHot;
varying float vPx;
void main(){
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0 || vAlpha < 0.004) discard;
  float rp = r * vPx;                       // distance from the centre in device pixels
  float cs = max(0.8, vPx * 0.17);          // core sigma: never thinner than ~1.5 px, grows with the node
  float coreG = exp(-(rp * rp) / (cs * cs));
  float coreD = 1.0 - smoothstep(cs * 1.1, cs * 1.5, rp);
  float core = mix(coreG, coreD, uSharp);
  float halo = exp(-r * r * 7.0) * 0.26 * uGlow * (1.0 - smoothstep(0.78, 1.0, r));
  vec3 col = vColor * (core + halo) + vec3(1.0) * core * vHot * 0.28;
  gl_FragColor = vec4(col, vAlpha);
}`,ld=`
uniform float uFade, uLinkAlpha, uDim, uFog, uFogNear, uFogFar, uIntro, uRadius, uCross;
attribute vec3 aColor;
attribute float aS0;
attribute float aS1;
attribute float aBase;
attribute float aCross;
varying vec4 vC;
${Yo}
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float dist = max(1.0, -mv.z);
  float st = mix(aS0, aS1, uFade);
  float act = clamp((st - 1.0) * 0.5, 0.0, 1.0); // incident edges of the focus are driven to 3
  float dimK = mix(uDim * 0.5, 1.0, clamp(st, 0.0, 1.0));
  float a = aBase * mix(1.0, uCross, aCross) * uLinkAlpha * dimK * fogK(dist) * introK(position);
  a = a + act * 0.55 * introK(position);
  vC = vec4(aColor * (1.0 + act * 1.4), a);
  gl_Position = projectionMatrix * mv;
}`,cd=`
precision highp float;
varying vec4 vC;
void main(){ gl_FragColor = vC; }`,hd=`
uniform float uTime, uPxRatio, uScale, uImpSize, uFog, uFogNear, uFogFar, uMinPx, uMaxPx;
attribute vec3 aC;
attribute vec3 aB;
attribute vec4 aT;      // start, duration, trail index, size scale
attribute vec3 aColor;
varying vec3 vColor;
varying float vAlpha;
${Yo.replace("float introK(vec3 p){ return clamp(uIntro * 1.8 - length(p) / uRadius * 0.8, 0.0, 1.0); }","")}
void main(){
  float age = (uTime - aT.x) / aT.y;
  if (age < 0.0 || age > 1.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; vAlpha = 0.0; vColor = vec3(0.0); return; }
  float tt = clamp(age - aT.z * 0.05, 0.0, 1.0);
  vec3 p = mix(mix(position, aC, tt), mix(aC, aB, tt), tt);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = max(1.0, -mv.z);
  float env = pow(sin(3.14159265 * age), 0.55);
  float trail = 1.0 - aT.z * 0.32;
  float px = clamp(uImpSize * aT.w * uScale * 0.55 / dist * trail, uMinPx, uMaxPx);
  gl_PointSize = px * uPxRatio * 4.0;
  vAlpha = env * trail * fogK(dist);
  vColor = aColor;
  gl_Position = projectionMatrix * mv;
}`,ud=`
precision highp float;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0 || vAlpha < 0.004) discard;
  float core = exp(-pow(r / 0.2, 2.0));
  float halo = exp(-r * r * 5.0) * 0.3;
  vec3 col = mix(vColor, vec3(1.0), 0.45) * core * 0.95 + vColor * halo;
  gl_FragColor = vec4(col, vAlpha);
}`,fd=`
uniform float uTime, uPxRatio, uAmbient, uFog, uFogNear, uFogFar;
attribute vec4 aSeed;
attribute vec3 aColor;
varying vec3 vColor;
varying float vAlpha;
${Yo.replace("float introK(vec3 p){ return clamp(uIntro * 1.8 - length(p) / uRadius * 0.8, 0.0, 1.0); }","")}
void main(){
  vec3 d = vec3(sin(uTime * 0.05 * aSeed.x + aSeed.y * 6.283), sin(uTime * 0.043 * aSeed.y + aSeed.z * 6.283), sin(uTime * 0.037 * aSeed.z + aSeed.x * 6.283)) * 9.0;
  vec4 mv = modelViewMatrix * vec4(position + d, 1.0);
  float dist = max(1.0, -mv.z);
  gl_PointSize = (0.8 + aSeed.w * 1.7) * uPxRatio * clamp(500.0 / dist, 0.55, 1.6);
  float tw = 0.5 + 0.5 * sin(uTime * (0.25 + aSeed.x * 0.4) + aSeed.w * 30.0);
  vAlpha = uAmbient * (0.1 + 0.28 * tw) * (0.4 + 0.6 * aSeed.w) * mix(1.0, fogK(dist), 0.6);
  vColor = aColor;
  gl_Position = projectionMatrix * mv;
}`,dd=`
precision highp float;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0) discard;
  float a = exp(-r * r * 3.5);
  gl_FragColor = vec4(vColor * a, vAlpha);
}`,pd=`
uniform float uIntro, uRadius, uNebula;
attribute vec3 aCenter;
attribute float aScale;
attribute vec3 aColor;
attribute float aAlpha;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
void main(){
  vec4 mv = modelViewMatrix * vec4(aCenter, 1.0);
  mv.xy += position.xy * aScale;
  vUv = position.xy * 2.0;
  vColor = aColor;
  vAlpha = aAlpha * uNebula * clamp(uIntro * 1.4, 0.0, 1.0);
  gl_Position = projectionMatrix * mv;
}`,md=`
precision highp float;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
void main(){
  float r = length(vUv);
  if (r > 1.0) discard;
  float a = exp(-r * r * 3.2) * (1.0 - smoothstep(0.7, 1.0, r));
  gl_FragColor = vec4(vColor * a, vAlpha);
}`;var gr=3,Zo=class{constructor(t,e,i){k(this,"U",t);k(this,"points");k(this,"pulse");k(this,"geo",new ve);k(this,"cap");k(this,"head",0);k(this,"acc",0);k(this,"g");k(this,"pos");k(this,"ctrl");k(this,"nodeCol");k(this,"cum",new Float32Array(0));k(this,"arrivals",[]);k(this,"A");k(this,"C");k(this,"B");k(this,"T");k(this,"Col");k(this,"dirty",!1);k(this,"active",[]);this.cap=e;let s=e*gr,r=o=>new te(new Float32Array(s*o),o).setUsage(Pn);this.A=r(3),this.C=r(3),this.B=r(3),this.T=r(4),this.Col=r(3);let a=this.T.array;for(let o=0;o<s;o++)a[o*4]=-1e6,a[o*4+1]=1,a[o*4+2]=o%gr,a[o*4+3]=1;this.geo.setAttribute("position",this.A),this.geo.setAttribute("aC",this.C),this.geo.setAttribute("aB",this.B),this.geo.setAttribute("aT",this.T),this.geo.setAttribute("aColor",this.Col),this.points=new ki(this.geo,new me({uniforms:t,vertexShader:hd,fragmentShader:ud,transparent:!0,depthTest:!1,depthWrite:!1,blending:Vi})),this.points.frustumCulled=!1,this.points.renderOrder=5,this.pulse=new Float32Array(i)}setGraph(t,e,i,s){this.g=t,this.pos=e,this.ctrl=i,this.nodeCol=s,this.cum=new Float32Array(t.e);let r=0;for(let a=0;a<t.e;a++){let o=t.eSrc[a],l=t.eDst[a],c=(.35+t.importance[o]+t.importance[l])*(t.mega[o]||t.mega[l]?.08:1)*(t.kind[o]===1||t.kind[l]===1?.3:1);r+=c,this.cum[a]=r}this.clear(),this.pulse.length!==t.n&&(this.pulse=new Float32Array(t.n))}clear(){let t=this.T.array;for(let e=0;e<this.cap*gr;e++)t[e*4]=-1e6;this.T.needsUpdate=!0,this.arrivals.length=0,this.pulse?.fill(0),this.active.length=0}pickBackground(t){let e=this.cum,i=e.length;if(!i)return-1;let s=t*e[i-1],r=0,a=i-1;for(;r<a;){let o=r+a>>1;e[o]<s?r=o+1:a=o}return r}spawn(t,e,i,s,r){let a=this.g,o=this.pos,l=a.eSrc[t],c=a.eDst[t];if(r!==0?r<0:a.eBi[t]?Math.random()<.5:!1){let F=l;l=c,c=F}let d=o[l*3],u=o[l*3+1],p=o[l*3+2],m=o[c*3],M=o[c*3+1],g=o[c*3+2],f=Math.hypot(m-d,M-u,g-p),w=Math.max(.9,Math.min(7,f/(32*i))),T=this.head;this.head=(this.head+1)%this.cap;let y=this.nodeCol,v=(y[l*3]+y[c*3])*.5,b=(y[l*3+1]+y[c*3+1])*.5,A=(y[l*3+2]+y[c*3+2])*.5,_=this.A.array,E=this.C.array,C=this.B.array,P=this.T.array,I=this.Col.array;for(let F=0;F<gr;F++){let L=T*gr+F;_[L*3]=d,_[L*3+1]=u,_[L*3+2]=p,E[L*3]=this.ctrl[t*3],E[L*3+1]=this.ctrl[t*3+1],E[L*3+2]=this.ctrl[t*3+2],C[L*3]=m,C[L*3+1]=M,C[L*3+2]=g,P[L*4]=e,P[L*4+1]=w,P[L*4+2]=F,P[L*4+3]=s*(.9+a.importance[l]*.5),I[L*3]=v,I[L*3+1]=b,I[L*3+2]=A}this.dirty=!0,this.arrivals.push({t:e+w,node:c})}update(t,e,i,s){if(this.U.uImpSize.value=s.impulseSize,!s.impulses||!this.g||!this.g.e)return this.points.visible=!1,!1;this.points.visible=!0;let r=this.g,a=18*s.impulseBackground*s.impulseDensity,o=i>=0?28*s.impulseDensity:0;this.acc+=e*(a+o);let l=24;for(;this.acc>=1&&l-- >0;){if(this.acc-=1,i>=0&&Math.random()<o/(o+a+1e-6)){let u=r.adjStart[i+1]-r.adjStart[i];if(u>0){let p=r.adjStart[i]+Math.floor(Math.random()*u),m=r.adjEdge[p],M=r.eBi[m]?0:r.eSrc[m]===i?1:-1;this.spawn(m,t,s.impulseSpeed,1.15,M);continue}}let d=this.pickBackground(Math.random());d>=0&&this.spawn(d,t,s.impulseSpeed,1,0)}if(this.acc>4&&(this.acc=4),this.dirty){for(let h of[this.A,this.C,this.B,this.T,this.Col])h.needsUpdate=!0;this.dirty=!1}let c=!1;if(this.arrivals.length){let h=0;for(let d=0;d<this.arrivals.length;d++){let u=this.arrivals[d];u.t<=t?(this.pulse[u.node]<.02&&this.active.push(u.node),this.pulse[u.node]=Math.min(1,this.pulse[u.node]+.65),c=!0):this.arrivals[h++]=u}this.arrivals.length=h}if(this.active.length){let h=Math.exp(-e*2.4),d=0;for(let u=0;u<this.active.length;u++){let p=this.active[u];this.pulse[p]*=h,this.pulse[p]<.02?this.pulse[p]=0:this.active[d++]=p}this.active.length=d,c=!0}return c}dispose(){this.geo.dispose(),this.points.material.dispose()}};var Ko=(n,t,e)=>{let i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)},Jo=class{constructor(t){k(this,"canvas");k(this,"ctx");k(this,"dpr",1);k(this,"alpha",new Map);k(this,"last",new Map);k(this,"widths",new Map);k(this,"font",'system-ui, "Segoe UI", sans-serif');k(this,"clusterAlpha",[]);this.canvas=document.createElement("canvas"),this.canvas.className="nb-labels",t.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d");try{let e=getComputedStyle(document.body).getPropertyValue("--font-interface").trim();e&&(this.font=`${e}, "Sylfaen", "Noto Sans Armenian", sans-serif`)}catch{}}resize(t,e,i){this.dpr=i,this.canvas.width=Math.round(t*i),this.canvas.height=Math.round(e*i),this.canvas.style.width=t+"px",this.canvas.style.height=e+"px",this.widths.clear()}clear(){this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.alpha.clear(),this.last.clear()}textW(t,e){let i=e+"|"+t,s=this.widths.get(i);return s===void 0&&(this.ctx.font=`${e}px ${this.font}`,s=this.ctx.measureText(t).width,this.widths.size>4e3&&this.widths.clear(),this.widths.set(i,s)),s}draw(t){let{g:e,w:i,h:s,params:r}=t,a=this.ctx;a.setTransform(this.dpr,0,0,this.dpr,0,0),a.clearRect(0,0,i,s),a.textBaseline="middle",a.lineJoin="round";let o=t.focus>=0?t.focus:t.sel,l=r.clusterLabels?this.drawClusters(t):[],c=t.mode==="daily"?.1:.2,h=Math.max(0,Math.min(1,(1-t.zoomK)/(1-c))),d=Math.round(r.labelDensity*(4*Ko(1.5,.95,t.zoomK)+76*Math.pow(h,1.3))),u=[],p=new Map,m=[],M=80,g=(v,b,A,_)=>{let E=m.length;m.push(v,b,A,_);for(let C=Math.floor(v/M);C<=Math.floor(A/M);C++)for(let P=Math.floor(b/M);P<=Math.floor(_/M);P++){let I=C*4096+P;(p.get(I)??p.set(I,[]).get(I)).push(E)}};for(let v=0;v<l.length;v+=4)g(l[v],l[v+1],l[v+2],l[v+3]);let f=(v,b,A)=>{let _=e.labels[v],E=this.textW(_,b),C=b+2,P=t.rpx[v]*.5+6,I=t.sx[v],F=t.sy[v],L=[[I+P,F,"l"],[I-P-E,F,"r"],[I-E/2,F-P-C*.6,"l"],[I-E/2,F+P+C*.6,"l"]];for(let[z,Z,X]of L){let et=z,H=Z-C/2,$=z+E,K=Z+C/2;if(et<4||$>i-4||H<4||K>s-4)continue;let ht=!1,gt=Math.floor(et/M),Bt=Math.floor($/M),At=Math.floor(H/M),Wt=Math.floor(K/M);t:for(let tt=gt;tt<=Bt;tt++)for(let lt=At;lt<=Wt;lt++){let wt=p.get(tt*4096+lt);if(wt){for(let at of wt)if(et<m[at+2]+4&&$>m[at]-4&&H<m[at+3]+2&&K>m[at+1]-2){ht=!0;break t}}}if(ht&&!A)continue;let J=m.length;m.push(et,H,$,K);for(let tt=gt;tt<=Bt;tt++)for(let lt=At;lt<=Wt;lt++){let wt=tt*4096+lt;(p.get(wt)??p.set(wt,[]).get(wt)).push(J)}return{i:v,x:z,y:Z,size:b,align:X,forced:A}}return null},w=[];if(t.focus>=0&&w.push(t.focus),t.sel>=0&&t.sel!==t.focus&&w.push(t.sel),o>=0){let v=[];for(let b=e.adjStart[o];b<e.adjStart[o+1];b++)v.push(e.adjNode[b]);v.sort((b,A)=>e.importance[A]-e.importance[b]);for(let b of v.slice(0,Math.round(6+10*r.labelDensity)))t.vis[b]&&w.push(b)}let T=new Set(w);for(let v of w){if(!t.vis[v])continue;let b=v===t.focus||v===t.sel,A=f(v,b?14:11.5,b);A&&u.push(A)}if(d>0){let v=[],b=1-(.2+.8*Math.pow(h,.8)),A=i/2,_=s/2,E=Math.hypot(i,s)*.5;for(let P=0;P<e.n;P++){if(!t.vis[P]||T.has(P))continue;let I=e.importance[P]+(e.accent[P]?.2:0),F=1-Math.min(1,Math.hypot(t.sx[P]-A,t.sy[P]-_)/E),L=I*.7+F*.3*h;I<b&&h<.98&&L<b*.75||v.push({i:P,s:L})}v.sort((P,I)=>I.s-P.s);let C=0;for(let P of v){if(C>=d)break;let I=10.5+3*e.importance[P.i],F=f(P.i,I,!1);F&&(u.push(F),C++)}}let y=new Set;for(let v of u)y.add(v.i),this.last.set(v.i,v);for(let[v,b]of this.alpha)if(!y.has(v)){let A=b-.09;A<=.02?(this.alpha.delete(v),this.last.delete(v)):this.alpha.set(v,A)}for(let v of u)this.alpha.set(v.i,Math.min(1,(this.alpha.get(v.i)??0)+(v.forced?.35:.14)));for(let[v,b]of this.alpha){let A=this.last.get(v),_=t.mode==="neural"?1-.5*Ko(.9,1.7,t.dist[v]/t.frameDist):1;this.paint(e,A,b*_,t)}a.globalAlpha=1}paint(t,e,i,s){let r=this.ctx,a=s.focus>=0?s.focus:s.sel,o=e.i===s.focus||e.i===s.sel;r.font=`${o?600:400} ${e.size}px ${this.font}`;let l=t.labels[e.i];r.globalAlpha=Math.max(0,Math.min(1,i))*(a>=0&&!o&&!e.forced?.5:1),r.lineWidth=3.2,r.strokeStyle="rgba(5,8,14,0.92)",r.strokeText(l,e.x,e.y);let[c,h,d]=Er(t.clusters[t.cluster[e.i]].color),u=o?0:.72;r.fillStyle=`rgb(${Math.round(c+(255-c)*(o?1:u))},${Math.round(h+(255-h)*(o?1:u))},${Math.round(d+(255-d)*(o?1:u))})`,t.kind[e.i]===1&&(r.fillStyle="rgb(160,175,205)"),r.fillText(l,e.x,e.y)}drawClusters(t){let{g:e,params:i}=t,s=this.ctx,r=(t.mode==="daily",1),a=Ko(.22,.5,t.zoomK)*(1-Ko(2.2,3.8,t.zoomK))*r,o=Math.max(...e.clusters.map(d=>d.size),1),l=[],c=[],h=e.clusters.map((d,u)=>u).sort((d,u)=>e.clusters[u].size-e.clusters[d].size);for(s.save(),s.letterSpacing="3px";this.clusterAlpha.length<e.clusters.length;)this.clusterAlpha.push(0);for(let d of h){let u=e.clusters[d],m=t.clusterXY[d*3+2]&&u.size>=2?a:0,M=10.5+7*Math.sqrt(u.size/o),g=u.label.toUpperCase(),f=this.textW(g,M)+g.length*3,w=t.clusterXY[d*3]-f/2,T=t.clusterXY[d*3+1],y=w,v=w+f,b=T-M,A=T+M;for(let I=0;I<l.length;I+=4)if(y<l[I+2]&&v>l[I]&&b<l[I+3]&&A>l[I+1]){m=0;break}m>0&&l.push(y,b,v,A),this.clusterAlpha[d]+=(m-this.clusterAlpha[d])*.15;let _=this.clusterAlpha[d];if(_<.02)continue;_>.25&&c.push(y,b,v,A),s.font=`500 ${M}px ${this.font}`,s.globalAlpha=_*.7;let[E,C,P]=Er(u.color);s.fillStyle=`rgb(${E},${C},${P})`,s.lineWidth=3,s.strokeStyle="rgba(5,8,14,0.55)",s.strokeText(g,w,T),s.fillText(g,w,T)}return s.restore(),s.textBaseline="middle",c}};function _d(){let n=t=>({value:t});return{uTime:n(0),uFade:n(1),uPxRatio:n(1),uScale:n(900),uSizeMul:n(1),uMinPx:n(1.1),uMaxPx:n(28),uDim:n(.1),uFog:n(.5),uFogNear:n(300),uFogFar:n(1400),uIntro:n(0),uRadius:n(200),uGlow:n(1),uSharp:n(0),uMinPxK:n(1),uAlphaK:n(1),uCross:n(.7),uLinkAlpha:n(1),uImpSize:n(1),uAmbient:n(1),uNebula:n(1)}}var nv=n=>{let t=new Ft(n);return[t.r,t.g,t.b]};function _r(n,t,e){return new me({uniforms:e,vertexShader:n,fragmentShader:t,transparent:!0,depthTest:!1,depthWrite:!1,blending:Vi})}function Ii(n,t){return new te(n,t).setUsage(Pn)}function je(n){let t=n+1831565813>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}var $o=class{constructor(t){k(this,"U",t);k(this,"group",new Oi);k(this,"g");k(this,"segs",8);k(this,"ctrl",new Float32Array(0));k(this,"nodeCol",new Float32Array(0));k(this,"flat",1);k(this,"microOff",new Float32Array(0));k(this,"microFrom",new Float32Array(0));k(this,"microTo",new Float32Array(0));k(this,"pos",new Float32Array(0));k(this,"edgeRand",new Float32Array(0));k(this,"curve",.16);k(this,"nodes");k(this,"micro");k(this,"edges");k(this,"ambient");k(this,"nebula");k(this,"nS0",new Float32Array(0));k(this,"nS1",new Float32Array(0));k(this,"mS0",new Float32Array(0));k(this,"mS1",new Float32Array(0));k(this,"eS0",new Float32Array(0));k(this,"eS1",new Float32Array(0));k(this,"fade",1);k(this,"nPulse",new Float32Array(0));k(this,"cNeb",new Float32Array(0));k(this,"nebCount",0);k(this,"accentIdx",[]);k(this,"visibleMicro",0)}setParams(t){this.curve=t.linkCurve}build(t,e,i,s,r){this.disposeObjects(),this.g=t,this.flat=e===2?0:1,this.pos=i,this.microOff=new Float32Array(s),this.curve=r.linkCurve;let a=t.n,o=t.m,l=t.e;this.segs=l>6e3?4:8,this.nodeCol=new Float32Array(a*3);for(let _=0;_<a;_++){let E=nv(t.clusters[t.cluster[_]].color);this.nodeCol[_*3]=E[0],this.nodeCol[_*3+1]=E[1],this.nodeCol[_*3+2]=E[2]}let c=new ve,h=new Float32Array(a),d=new Float32Array(a),u=new Float32Array(a),p=new Float32Array(a*3);this.accentIdx=[];for(let _=0;_<a;_++){h[_]=t.radius[_],d[_]=(t.accent[_]?.5:0)+t.importance[_]*.2,u[_]=je(_*7+3);let E=t.accent[_]?.28:0;for(let C=0;C<3;C++)p[_*3+C]=this.nodeCol[_*3+C]*(1-E)+E;t.accent[_]&&this.accentIdx.push(_)}this.nS0=new Float32Array(a).fill(1),this.nS1=new Float32Array(a).fill(1),this.nPulse=new Float32Array(a),c.setAttribute("position",Ii(new Float32Array(a*3),3)),c.setAttribute("aSize",new te(h,1)),c.setAttribute("aColor",new te(p,3)),c.setAttribute("aHot",new te(d,1)),c.setAttribute("aSeed",new te(u,1)),c.setAttribute("aS0",Ii(this.nS0,1)),c.setAttribute("aS1",Ii(this.nS1,1)),c.setAttribute("aPulse",Ii(this.nPulse,1)),this.nodes=new ki(c,_r(Fc,Oc,this.U)),this.nodes.frustumCulled=!1,this.nodes.renderOrder=4;let m=new ve,M=new Float32Array(o),g=new Float32Array(o),f=new Float32Array(o*3),w=new Float32Array(o);for(let _=0;_<o;_++){let E=t.mParent[_];M[_]=.5+(4-Math.min(4,t.mLevel[_]))*.07,g[_]=je(_*13+5);for(let C=0;C<3;C++)f[_*3+C]=this.nodeCol[E*3+C]*.8+.2}this.mS0=new Float32Array(o).fill(1),this.mS1=new Float32Array(o).fill(1),m.setAttribute("position",Ii(new Float32Array(o*3),3)),m.setAttribute("aSize",new te(M,1)),m.setAttribute("aColor",new te(f,3)),m.setAttribute("aHot",new te(w,1)),m.setAttribute("aSeed",new te(g,1)),m.setAttribute("aS0",Ii(this.mS0,1)),m.setAttribute("aS1",Ii(this.mS1,1)),m.setAttribute("aPulse",new te(new Float32Array(o),1)),this.micro=new ki(m,_r(Fc,Oc,{...this.U,uMinPxK:{value:.72},uAlphaK:{value:.7}})),this.micro.frustumCulled=!1,this.micro.renderOrder=3;let T=l*this.segs*2,y=new ve,v=new Float32Array(T*3),b=new Float32Array(T),A=new Float32Array(T);this.edgeRand=new Float32Array(l*3),this.ctrl=new Float32Array(l*3);for(let _=0;_<l;_++){let E=t.eSrc[_],C=t.eDst[_];this.edgeRand[_*3]=je(_*3+1)*2-1,this.edgeRand[_*3+1]=je(_*3+2)*2-1,this.edgeRand[_*3+2]=je(_*3+3);let P=t.mega[E]||t.mega[C],I=t.kind[E]===1||t.kind[C]===1,F=.2*(.8+.25*Math.min(2,t.eWeight[_]-1))*(P?.22:1)*(I?.6:1);for(let L=0;L<this.segs;L++)for(let z=0;z<2;z++){let Z=(_*this.segs+L)*2+z,X=(L+z)/this.segs;for(let et=0;et<3;et++)v[Z*3+et]=this.nodeCol[E*3+et]*(1-X)+this.nodeCol[C*3+et]*X;b[Z]=F,A[Z]=t.cluster[E]===t.cluster[C]?0:1}}this.eS0=new Float32Array(T).fill(1),this.eS1=new Float32Array(T).fill(1),y.setAttribute("position",Ii(new Float32Array(T*3),3)),y.setAttribute("aColor",new te(v,3)),y.setAttribute("aBase",new te(b,1)),y.setAttribute("aCross",new te(A,1)),y.setAttribute("aS0",Ii(this.eS0,1)),y.setAttribute("aS1",Ii(this.eS1,1)),this.edges=new Vs(y,_r(ld,cd,this.U)),this.edges.frustumCulled=!1,this.edges.renderOrder=2,this.buildNebula(),this.group.add(this.nebula,this.edges,this.micro,this.nodes),this.writePositions()}buildNebula(){let t=this.g,e=t.clusters.length+this.accentIdx.length;this.nebCount=e;let i=new Tn(1,1),s=new qs;s.index=i.index,s.setAttribute("position",i.attributes.position),this.cNeb=new Float32Array(e*3);let r=new Float32Array(e*3),a=new Float32Array(e),o=new Float32Array(e);t.clusters.forEach((c,h)=>{let d=new Ft(c.color);r.set([d.r,d.g,d.b],h*3),o[h]=(.028+.04*Math.min(1,c.size/24))*(c.key==="unresolved"?.3:1)}),this.accentIdx.forEach((c,h)=>{let d=t.clusters.length+h;r.set(this.nodeCol.subarray(c*3,c*3+3),d*3),o[d]=.1,a[d]=t.radius[c]*9}),s.setAttribute("aCenter",new sn(this.cNeb,3).setUsage(Pn)),s.setAttribute("aScale",new sn(a,1).setUsage(Pn)),s.setAttribute("aColor",new sn(r,3)),s.setAttribute("aAlpha",new sn(o,1)),s.instanceCount=e;let l=_r(pd,md,this.U);l.side=ui,this.nebula=new ze(s,l),this.nebula.frustumCulled=!1,this.nebula.renderOrder=0}buildAmbient(t,e){this.ambient&&(this.group.remove(this.ambient),this.ambient.geometry.dispose(),this.ambient.material.dispose());let i=new Float32Array(e*3),s=new Float32Array(e*4),r=new Float32Array(e*3),a=[new Ft("#5ec8ff"),new Ft("#8f7bff"),new Ft("#3fe0d0"),new Ft("#6fa0ff")];for(let l=0;l<e;l++){let h=je(l*5+1)<.55?t*.95*Math.cbrt(je(l*5+2)):t*(1.25+1.5*je(l*5+2)),d=je(l*5+3)*Math.PI*2,u=Math.acos(2*je(l*5+4)-1);i[l*3]=h*Math.sin(u)*Math.cos(d)*1.15,i[l*3+1]=h*Math.cos(u)*.8,i[l*3+2]=h*Math.sin(u)*Math.sin(d),s[l*4]=.4+je(l*11+1),s[l*4+1]=je(l*11+2),s[l*4+2]=je(l*11+3),s[l*4+3]=je(l*11+4);let p=a[l%a.length];r.set([p.r,p.g,p.b],l*3)}let o=new ve;o.setAttribute("position",new te(i,3)),o.setAttribute("aSeed",new te(s,4)),o.setAttribute("aColor",new te(r,3)),this.ambient=new ki(o,_r(fd,dd,this.U)),this.ambient.frustumCulled=!1,this.ambient.renderOrder=1,this.group.add(this.ambient)}writePositions(){let t=this.g,e=this.pos,i=this.nodes.geometry.attributes.position;i.array.set(e),i.needsUpdate=!0;let s=this.micro.geometry.attributes.position,r=s.array;for(let f=0;f<t.m;f++){let w=t.mParent[f]*3;r[f*3]=e[w]+this.microOff[f*3],r[f*3+1]=e[w+1]+this.microOff[f*3+1],r[f*3+2]=e[w+2]+this.microOff[f*3+2]}s.needsUpdate=!0;let a=this.edges.geometry.attributes.position,o=a.array,l=this.segs,c=this.curve,h=this.flat;for(let f=0;f<t.e;f++){let w=t.eSrc[f]*3,T=t.eDst[f]*3,y=e[w],v=e[w+1],b=e[w+2],A=e[T],_=e[T+1],E=e[T+2],C=A-y,P=_-v,I=E-b,F=Math.sqrt(C*C+P*P+I*I)||1,L=this.edgeRand[f*3],z=this.edgeRand[f*3+1],Z=this.edgeRand[f*3+2]*2-1,X=P*Z-I*z,et=I*L-C*Z,H=(C*z-P*L)*h;if(X*X+et*et+H*H<F*F*1e-4){let lt=L<0?-1:1;X=-P*lt,et=C*lt,H=0}let $=Math.sqrt(X*X+et*et+H*H)||1,K=F*c*(.55+.45*Math.abs(this.edgeRand[f*3+2]))/$,ht=(y+A)*.5+X*K,gt=(v+_)*.5+et*K,Bt=(b+E)*.5+H*K;this.ctrl[f*3]=ht,this.ctrl[f*3+1]=gt,this.ctrl[f*3+2]=Bt;let At=f*l*6,Wt=y,J=v,tt=b;for(let lt=1;lt<=l;lt++){let wt=lt/l,at=1-wt,Vt=at*at*y+2*at*wt*ht+wt*wt*A,fe=at*at*v+2*at*wt*gt+wt*wt*_,Ht=at*at*b+2*at*wt*Bt+wt*wt*E;o[At++]=Wt,o[At++]=J,o[At++]=tt,o[At++]=Vt,o[At++]=fe,o[At++]=Ht,Wt=Vt,J=fe,tt=Ht}}a.needsUpdate=!0;let d=t.clusters.length,u=new Float64Array(d*3),p=new Uint32Array(d);for(let f=0;f<t.n;f++){let w=t.cluster[f];u[w*3]+=e[f*3],u[w*3+1]+=e[f*3+1],u[w*3+2]+=e[f*3+2],p[w]++}let m=this.nebula.geometry.attributes.aCenter,M=this.nebula.geometry.attributes.aScale,g=new Float64Array(d);for(let f=0;f<d;f++){let w=p[f]||1;this.cNeb[f*3]=u[f*3]/w,this.cNeb[f*3+1]=u[f*3+1]/w,this.cNeb[f*3+2]=u[f*3+2]/w}for(let f=0;f<t.n;f++){let w=t.cluster[f],T=e[f*3]-this.cNeb[w*3],y=e[f*3+1]-this.cNeb[w*3+1],v=e[f*3+2]-this.cNeb[w*3+2];g[w]+=T*T+y*y+v*v}for(let f=0;f<d;f++)M.array[f]=Math.min(60+26*Math.sqrt(p[f]||1),Math.max(36,3.6*Math.sqrt(g[f]/(p[f]||1))+20));this.accentIdx.forEach((f,w)=>this.cNeb.set(e.subarray(f*3,f*3+3),(d+w)*3)),m.needsUpdate=!0,M.needsUpdate=!0}beginMicroMorph(t){this.microFrom=this.microOff.slice(),this.microTo=t.slice()}lerpMicro(t){let e=this.microFrom,i=this.microTo,s=this.microOff;for(let r=0;r<s.length;r++)s[r]=e[r]+(i[r]-e[r])*t}clusterCentre(t){return[this.cNeb[t*3],this.cNeb[t*3+1],this.cNeb[t*3+2]]}setMicroVisible(t,e){if(this.micro.visible=t&&this.g.m>0,!this.micro.visible)return;let i=Math.max(0,Math.min(this.g.m,Math.round(this.g.m*e)));i!==this.visibleMicro&&(this.visibleMicro=i,this.micro.geometry.setDrawRange(0,i))}setNodeCount(t){this.nodes.visible=t}setFocus(t,e){let i=this.g,s=i.n,r=i.e,a=this.segs;this.snapshot();let o=new Float32Array(s),l=new Float32Array(i.m),c=new Float32Array(r),h=t>=0?t:e;if(h<0)o.fill(1),l.fill(1),c.fill(1);else{o[h]=h===e?4:3;for(let d=i.adjStart[h];d<i.adjStart[h+1];d++)o[i.adjNode[d]]=2,c[i.adjEdge[d]]=3;e>=0&&(o[e]=4);for(let d=0;d<i.m;d++){let u=i.mParent[d];l[d]=u===h?2:o[u]===2?1:0}}this.nS1.set(o),this.mS1.set(l);for(let d=0;d<r;d++)this.eS1.fill(c[d],d*a*2,(d+1)*a*2);this.fade=0,this.U.uFade.value=0,this.flagStates()}snapshot(){let t=this.fade;if(t>=1){this.nS0.set(this.nS1),this.mS0.set(this.mS1),this.eS0.set(this.eS1);return}let e=(i,s)=>{for(let r=0;r<i.length;r++)i[r]=i[r]+(s[r]-i[r])*t};e(this.nS0,this.nS1),e(this.mS0,this.mS1),e(this.eS0,this.eS1)}flagStates(){for(let t of[this.nodes,this.micro,this.edges])t.geometry.attributes.aS0.needsUpdate=!0,t.geometry.attributes.aS1.needsUpdate=!0}tickFade(t){if(this.fade>=1)return!1;this.fade=Math.min(1,this.fade+t/.38);let e=this.fade;return this.U.uFade.value=e*e*(3-2*e),this.fade<1}applyPulses(t){this.nPulse.set(t),this.nodes.geometry.attributes.aPulse.needsUpdate=!0}disposeObjects(){for(let t of[this.nodes,this.micro,this.edges,this.nebula])t&&(this.group.remove(t),t.geometry.dispose(),t.material.dispose())}dispose(){this.disposeObjects(),this.ambient&&(this.group.remove(this.ambient),this.ambient.geometry.dispose(),this.ambient.material.dispose())}};var Bc={neural:527121,daily:1053723},jo=class{constructor(t,e){k(this,"hooks",e);k(this,"stats",{fps:0,frameMs:0,points:0});k(this,"host");k(this,"renderer");k(this,"composer");k(this,"bloom");k(this,"scene",new Os);k(this,"camera",new Be(50,1,1,6e4));k(this,"controls");k(this,"U",_d());k(this,"layers",new $o(this.U));k(this,"impulses");k(this,"labels");k(this,"vignette");k(this,"g");k(this,"pos",new Float32Array(0));k(this,"dim",3);k(this,"mode","neural");k(this,"p");k(this,"w",1);k(this,"h",1);k(this,"dpr",1);k(this,"frameDist",600);k(this,"radius",200);k(this,"cx",0);k(this,"cy",0);k(this,"cz",0);k(this,"running",!1);k(this,"raf",0);k(this,"last",0);k(this,"lastRender",0);k(this,"t0",performance.now()/1e3);k(this,"lastInteract",0);k(this,"reduced",!1);k(this,"pendingPick",null);k(this,"hover",-1);k(this,"sel",-1);k(this,"appliedFocus",[-2,-2]);k(this,"down",null);k(this,"projDirty",!0);k(this,"lastView",new ue);k(this,"sx",new Float32Array(0));k(this,"sy",new Float32Array(0));k(this,"dist",new Float32Array(0));k(this,"vis",new Uint8Array(0));k(this,"rpx",new Float32Array(0));k(this,"clusterXY",new Float32Array(0));k(this,"fly",null);k(this,"morph",null);k(this,"intro",1);k(this,"introDur",0);k(this,"qLevel",0);k(this,"slowFrames",0);k(this,"fpsAcc",0);k(this,"fpsN",0);k(this,"fpsT",0);k(this,"ro");k(this,"mq",null);k(this,"ownerWin");k(this,"morphDim",3);k(this,"flyDir",null);k(this,"onMove",t=>{t.buttons||(this.pendingPick=this.rel(t),this.markInteract())});k(this,"onDown",t=>{let e=this.rel(t);this.down={x:e.x,y:e.y,t:performance.now()},this.markInteract()});k(this,"onUp",t=>{let e=this.down;if(this.down=null,!e||t.button!==0)return;let i=this.rel(t);if(Math.hypot(i.x-e.x,i.y-e.y)>5||performance.now()-e.t>600)return;this.projectNow();let s=this.pick(i.x,i.y);this.select(s,s>=0),this.hooks.onSelect(s)});k(this,"onLeave",()=>{this.pendingPick=null,this.hover!==-1&&(this.hover=-1,this.syncFocus(),this.hooks.onHover(-1),this.renderer.domElement.style.cursor="")});k(this,"onDbl",t=>{let e=this.rel(t);this.projectNow();let i=this.pick(e.x,e.y);i>=0&&this.g.kind[i]===0&&this.hooks.onOpen(i,t)});this.host=t,this.ownerWin=t.ownerDocument.defaultView??window,this.renderer=new Oo({antialias:!1,alpha:!1,powerPreference:"high-performance",stencil:!1}),this.renderer.setClearColor(0,1),this.scene.background=new Ft(Bc.neural);let i=this.renderer.domElement;i.className="nb-canvas",t.appendChild(i),this.vignette=t.ownerDocument.createElement("div"),this.vignette.className="nb-vignette",t.appendChild(this.vignette),this.labels=new Jo(t),this.scene.add(this.layers.group),this.composer=new Wo(this.renderer),this.composer.addPass(new Xo(this.scene,this.camera)),this.bloom=new ms(new Pt(256,256),.6,.55,.25),this.composer.addPass(this.bloom),this.composer.addPass(new qo),this.controls=new Vo(this.camera,i),this.controls.enableDamping=!0,this.controls.dampingFactor=.09,this.controls.zoomSpeed=.9,this.controls.rotateSpeed=.65,this.controls.zoomToCursor=!0,this.controls.screenSpacePanning=!0,this.controls.minDistance=12,this.controls.addEventListener("start",()=>{this.fly=null,this.markInteract()}),this.controls.addEventListener("change",()=>{this.projDirty=!0}),i.addEventListener("pointermove",this.onMove),i.addEventListener("pointerdown",this.onDown),i.addEventListener("pointerup",this.onUp),i.addEventListener("pointerleave",this.onLeave),i.addEventListener("dblclick",this.onDbl),i.addEventListener("wheel",()=>this.markInteract(),{passive:!0}),this.mq=this.ownerWin.matchMedia?.("(prefers-reduced-motion: reduce)")??null,this.reduced=!!this.mq?.matches,this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t),this.resize()}setGraph(t,e,i,s,r,a,o){let l=o.intro;this.g=t,this.dim=s,this.mode=a,this.p=r,this.camera.fov=a==="daily"?32:50,this.camera.updateProjectionMatrix(),this.pos=e.slice(),this.hover=-1,this.sel=-1,this.appliedFocus=[-2,-2],this.sx=new Float32Array(t.n),this.sy=new Float32Array(t.n),this.dist=new Float32Array(t.n),this.vis=new Uint8Array(t.n),this.rpx=new Float32Array(t.n),this.clusterXY=new Float32Array(t.clusters.length*3),this.layers.build(t,s,this.pos,i,r),this.measure(),this.layers.buildAmbient(this.radius,1500),this.impulses||(this.impulses=new Zo(this.U,420,t.n),this.scene.add(this.impulses.points)),this.impulses.setGraph(t,this.pos,this.layers.ctrl,this.layers.nodeCol),this.applyParams(r,a),o.keepCamera||this.resetCamera(!1),this.labels.clear(),this.intro=l?0:1,this.introDur=l?2.6:0,this.U.uIntro.value=this.intro,this.projDirty=!0,this.stats.points=t.n+t.m}morphTo(t,e,i,s=1.1){this.layers.beginMicroMorph(i),this.morphDim=e,this.morph={from:this.pos.slice(),to:t.slice(),t:0,dur:s},this.impulses?.clear(),this.fly=null}setMode(t,e){this.mode=t,this.applyParams(e,t)}applyParams(t,e){let i=!this.p;this.p=t,this.mode=e;let s=this.U,r=e==="daily";s.uSizeMul.value=t.nodeSize,s.uGlow.value=t.glow,s.uSharp.value=r?.8:0,s.uDim.value=r?.16:.1,s.uFog.value=t.depthFog,s.uAmbient.value=this.reduced?0:t.ambient,s.uNebula.value=r?.3:.45,s.uCross.value=r?.4:.7,s.uMinPx.value=r?2.1:1.1,s.uMaxPx.value=20,this.scene.background.set(r?Bc.daily:Bc.neural),this.vignette.classList.toggle("nb-vignette-daily",r),this.camera.fov=r?32:50,this.camera.updateProjectionMatrix(),this.bloom.strength=t.bloom,this.bloom.radius=.38,this.bloom.threshold=.5,this.bloom.enabled=t.bloom>.01&&this.qLevel<2,this.g&&(this.layers.setParams(t),this.layers.setMicroVisible(t.microNodes,t.microAmount),i||this.layers.writePositions()),this.controls.enableRotate=!r,this.controls.mouseButtons=r?{LEFT:Xe.PAN,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN}:{LEFT:Xe.ROTATE,MIDDLE:Xe.DOLLY,RIGHT:Xe.PAN},this.controls.touches=r?{ONE:ri.PAN,TWO:ri.DOLLY_PAN}:{ONE:ri.ROTATE,TWO:ri.DOLLY_PAN},this.controls.autoRotateSpeed=t.autoRotate*.8,this.updatePixelRatio(),this.projDirty=!0}updatePixelRatio(){let t=Math.min(this.ownerWin.devicePixelRatio||1,this.p?.pixelRatioCap??1.5,this.qLevel>=1?1:9);Math.abs(t-this.dpr)>.01&&(this.dpr=t,this.resize())}measure(){let t=this.pos,e=this.g.n,i=0,s=0,r=0;for(let h=0;h<e;h++)i+=t[h*3],s+=t[h*3+1],r+=t[h*3+2];i/=e||1,s/=e||1,r/=e||1,this.cx=i,this.cy=s,this.cz=r;let a=[],o=1,l=1;for(let h=0;h<e;h++){let d=t[h*3]-i,u=t[h*3+1]-s,p=t[h*3+2]-r;a.push(Math.hypot(d,u,p)),Math.abs(d)>o&&(o=Math.abs(d)),Math.abs(u)>l&&(l=Math.abs(u))}a.sort((h,d)=>h-d),this.radius=Math.max(60,a[Math.floor(a.length*.9)]??100);let c=Math.tan(this.camera.fov*Math.PI/360);this.dim===3?this.frameDist=this.radius/c*1.12:this.frameDist=Math.max(l/c,o/(c*this.camera.aspect))*1.12,this.U.uRadius.value=this.radius,this.U.uFogNear.value=this.frameDist*.75,this.U.uFogFar.value=this.frameDist*2.3,this.controls.maxDistance=this.frameDist*5,this.camera.far=this.frameDist*12,this.camera.updateProjectionMatrix()}resetCamera(t=!0){let e=new B(this.cx,this.cy,this.cz),i=this.dim===3?new B(.28,.3,1).normalize():new B(0,0,1);this.dim===2&&this.camera.up.set(0,1,0),t&&!this.reduced?(this.fly={target:e,dist:this.frameDist},this.flyDir=i):(this.controls.target.copy(e),this.camera.position.copy(e).addScaledVector(i,this.frameDist),this.controls.update()),this.markInteract()}flyTo(t){if(t<0||!this.g)return;let e=this.g,i=this.pos,s=0;for(let o=e.adjStart[t];o<e.adjStart[t+1];o++){let l=e.adjNode[o];e.mega[l]||(s=Math.max(s,Math.hypot(i[l*3]-i[t*3],i[l*3+1]-i[t*3+1],i[l*3+2]-i[t*3+2])))}s=Math.min(Math.max(s*.8,e.microRadius[t]*3.2,26),this.radius*.7);let r=Math.tan(this.camera.fov*Math.PI/360),a=Math.max(30,s/r*(this.dim===2?1.3:1.45));this.fly={target:new B(i[t*3],i[t*3+1],i[t*3+2]),dist:a},this.flyDir=null,this.markInteract()}select(t,e=!0){this.sel=t,this.syncFocus(),e&&t>=0&&this.flyTo(t)}syncFocus(){this.g&&(this.appliedFocus[0]===this.hover&&this.appliedFocus[1]===this.sel||(this.appliedFocus=[this.hover,this.sel],this.layers.setFocus(this.hover,this.sel),this.projDirty=!0))}markInteract(){this.lastInteract=performance.now()}rel(t){let e=this.renderer.domElement.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}pick(t,e){let i=this.g;if(!i)return-1;let s=-1,r=1;for(let a=0;a<i.n;a++){if(!this.vis[a])continue;let o=Math.max(9,this.rpx[a]*.9+5),l=this.sx[a]-t,c=this.sy[a]-e,h=(l*l+c*c)/(o*o);(h<r||h<1&&s>=0&&Math.abs(h-r)<.05&&this.dist[a]<this.dist[s])&&(r=h,s=a)}return s}projectNow(){if(!this.g)return;this.camera.updateMatrixWorld();let e=new ue().multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse).elements,i=this.camera.matrixWorldInverse.elements,s=this.g,r=this.pos,a=this.w,o=this.h,l=o/(2*Math.tan(this.camera.fov*Math.PI/360));for(let c=0;c<s.n;c++){let h=r[c*3],d=r[c*3+1],u=r[c*3+2],p=e[3]*h+e[7]*d+e[11]*u+e[15];if(p<=.01){this.vis[c]=0;continue}let m=(e[0]*h+e[4]*d+e[8]*u+e[12])/p,M=(e[1]*h+e[5]*d+e[9]*u+e[13])/p,g=(m*.5+.5)*a,f=(1-(M*.5+.5))*o;this.sx[c]=g,this.sy[c]=f;let w=-(i[2]*h+i[6]*d+i[10]*u+i[14]);this.dist[c]=w,this.rpx[c]=s.radius[c]*this.U.uSizeMul.value*l/Math.max(1,w),this.vis[c]=g>-20&&g<a+20&&f>-20&&f<o+20?1:0}for(let c=0;c<s.clusters.length;c++){let[h,d,u]=this.layers.clusterCentre(c),p=e[3]*h+e[7]*d+e[11]*u+e[15];if(p<=.01){this.clusterXY[c*3+2]=0;continue}let m=(e[0]*h+e[4]*d+e[8]*u+e[12])/p,M=(e[1]*h+e[5]*d+e[9]*u+e[13])/p;this.clusterXY[c*3]=(m*.5+.5)*a,this.clusterXY[c*3+1]=(1-(M*.5+.5))*o,this.clusterXY[c*3+2]=1}this.lastView.copy(this.camera.matrixWorldInverse),this.projDirty=!1}resize(){let t=Math.max(1,this.host.clientWidth),e=Math.max(1,this.host.clientHeight);this.w=t,this.h=e,(!this.dpr||this.dpr===1)&&(this.dpr=Math.min(this.ownerWin.devicePixelRatio||1,this.p?.pixelRatioCap??1.5)),this.renderer.setPixelRatio(this.dpr),this.renderer.setSize(t,e,!1),this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.composer.setPixelRatio(this.dpr),this.composer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.U.uPxRatio.value=this.dpr,this.U.uScale.value=e/(2*Math.tan(this.camera.fov*Math.PI/360)),this.labels.resize(t,e,Math.min(2,this.ownerWin.devicePixelRatio||1)),this.projDirty=!0}start(){if(this.running)return;this.running=!0,this.last=performance.now()/1e3;let t=()=>{this.running&&(this.raf=this.ownerWin.requestAnimationFrame(t),this.frame())};this.raf=this.ownerWin.requestAnimationFrame(t)}stop(){this.running=!1,this.ownerWin.cancelAnimationFrame(this.raf)}frame(){if(!this.g||!this.p)return;let t=performance.now(),e=t/1e3,i=t-this.lastInteract>3500,s=this.ownerWin.document.hasFocus(),r=s?i?Math.min(this.p.fpsCap,30):this.p.fpsCap:10;if(e-this.lastRender<1/r-.003)return;let a=Math.min(.1,e-this.last);this.last=e,this.lastRender=e;let o=performance.now(),l=e-this.t0;if(l>3e4&&(this.t0=e,l=0,this.impulses.clear()),this.U.uTime.value=l,this.intro<1){this.intro=Math.min(1,this.intro+a/Math.max(.01,this.introDur));let m=this.intro;this.U.uIntro.value=m*m*(3-2*m)}else this.U.uIntro.value=1;if(this.morph){let m=this.morph;m.t=Math.min(1,m.t+a/m.dur);let M=m.t*m.t*(3-2*m.t);for(let g=0;g<this.pos.length;g++)this.pos[g]=m.from[g]+(m.to[g]-m.from[g])*M;this.layers.flat=this.morphDim===2?1-M:M,this.layers.lerpMicro(M),this.layers.writePositions(),this.projDirty=!0,m.t>=1&&(this.morph=null,this.dim=this.morphDim,this.measure(),this.impulses.setGraph(this.g,this.pos,this.layers.ctrl,this.layers.nodeCol),this.layers.buildAmbient(this.radius,1500),this.resetCamera(!0))}if(this.fly){let m=this.reduced?1:1-Math.exp(-a*3.4),M=this.controls.target;M.lerp(this.fly.target,m);let g=this.flyDir??this.camera.position.clone().sub(M).normalize(),f=this.camera.position.distanceTo(M),w=f+(this.fly.dist-f)*m;this.camera.position.copy(M).addScaledVector(g,w),M.distanceTo(this.fly.target)<.4&&Math.abs(w-this.fly.dist)<.8&&(this.fly=null),this.projDirty=!0}if(this.controls.autoRotate=!this.reduced&&this.p.autoRotate>0&&this.mode==="neural"&&i&&this.sel<0&&this.hover<0&&!this.fly&&!this.morph,this.controls.update(a),this.controls.autoRotate&&(this.projDirty=!0),this.camera.updateMatrixWorld(),(this.projDirty||!this.lastView.equals(this.camera.matrixWorldInverse))&&this.projectNow(),this.pendingPick){let m=this.pick(this.pendingPick.x,this.pendingPick.y);this.pendingPick=null,m!==this.hover&&(this.hover=m,this.syncFocus(),this.hooks.onHover(m),this.renderer.domElement.style.cursor=m>=0?"pointer":"")}let h=this.camera.position.distanceTo(this.controls.target)/this.frameDist,d=.5+.5*(1-Math.max(0,Math.min(1,(h-.25)/1.1)));this.U.uLinkAlpha.value=this.p.linkOpacity*d,this.layers.tickFade(a);let u=this.hover>=0?this.hover:this.sel;if(!this.morph&&this.intro>=.6){let m=this.reduced?{...this.p,impulseDensity:this.p.impulseDensity*.35}:this.p;this.impulses.update(l,a,u,m)&&this.layers.applyPulses(this.impulses.pulse)}else this.impulses.points.visible=!1;this.labels.draw({g:this.g,w:this.w,h:this.h,sx:this.sx,sy:this.sy,dist:this.dist,vis:this.vis,rpx:this.rpx,zoomK:h,focus:this.hover,sel:this.sel,params:this.p,clusterXY:this.clusterXY,mode:this.mode,frameDist:this.frameDist}),this.composer.render(a);let p=performance.now()-o;this.stats.frameMs=this.stats.frameMs*.9+p*.1,this.fpsAcc+=a,this.fpsN++,this.fpsAcc>=1&&(this.stats.fps=Math.round(this.fpsN/this.fpsAcc),s&&!i&&this.p.fpsCap>=30&&(this.stats.fps<24?this.slowFrames++:this.slowFrames=Math.max(0,this.slowFrames-1),this.slowFrames>=4&&this.qLevel<2&&(this.qLevel++,this.slowFrames=0,this.hooks.onQuality?.(this.qLevel===1?"Slow GPU: resolution lowered":"Slow GPU: glow (bloom) turned off"),this.applyParams(this.p,this.mode))),this.fpsAcc=0,this.fpsN=0)}get selected(){return this.sel}get quality(){return this.qLevel}get graph(){return this.g}setPositionsInstant(t){this.pos.set(t),this.layers.writePositions(),this.projDirty=!0}dispose(){this.stop(),this.ro.disconnect(),this.controls.dispose(),this.layers.dispose(),this.impulses?.dispose(),this.composer.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer.domElement.remove(),this.labels.canvas.remove(),this.vignette.remove()}};var Qo={neural:{dim:3,spread:1,brain:.6,useMicro:!0},daily:{dim:2,spread:1.35,brain:0,useMicro:!1}},sv=()=>new Promise(n=>requestAnimationFrame(()=>n())),tl=class{constructor(t,e,i){k(this,"root",t);k(this,"host",e);k(this,"settings",i);k(this,"scene");k(this,"hud");k(this,"graph",null);k(this,"raw",null);k(this,"hash","");k(this,"layouts",{});k(this,"token",0);k(this,"disposed",!1);this.scene=new jo(t,{onSelect:s=>this.hud.showInfo(s),onOpen:(s,r)=>{let a=this.graph;a&&this.host.openNote(a.ids[s],r.ctrlKey||r.metaKey?"split":this.settings.openIn)},onHover:()=>{},onQuality:s=>this.hud.toast(s)}),this.hud=new Tr(t,this)}get mode(){return this.settings.mode}get params(){return this.settings[this.settings.mode]}buildOpts(){let t=this.settings.neural;return{rules:this.settings.rules,showUnresolved:t.showUnresolved,showOrphans:t.showOrphans,hideFiles:this.settings.hideFiles}}async setRaw(t,e,i=!1){this.raw=t;let s=ih(t,this.buildOpts()),r=nh(s);if(!e&&!i&&r===this.hash){this.graph=s;return}let a=++this.token;if(this.hash=r,!s.n){this.hud.setBusy("The vault has no notes to show yet.");return}let o=this.mode;this.hud.setBusy("Mapping neurons\u2026",0);let l=await this.layoutFor(o,s,a);if(!l||a!==this.token||this.disposed)return;this.graph=s,this.layouts={[o]:l};let c=Qo[o].dim;this.scene.setGraph(s,l,Br(s,c),c,this.params,o,{intro:e,keepCamera:!e}),this.scene.start(),this.hud.onGraph(s),this.hud.setBusy(null)}async layoutFor(t,e,i,s=!0){let r=s?await this.host.readCache(t):null,a=new Or(e,Qo[t],r??void 0),o=!a.done;for(;!a.done;)if(a.step(10),this.hud.setBusy("Mapping neurons\u2026",a.progress),await sv(),i!==this.token||this.disposed)return null;return o&&this.host.writeCache(t,a.toCache()),a.pos}async switchMode(t){if(t===this.settings.mode&&this.layouts[t])return;let e=this.graph;if(this.settings.mode=t,this.host.saveSettings(),this.hud.refresh(),!e)return;let i=++this.token,s=this.layouts[t]??null;if(!s){if(this.hud.setBusy("Mapping neurons\u2026",0),s=await this.layoutFor(t,e,i),this.hud.setBusy(null),!s||i!==this.token)return;this.layouts[t]=s}let r=Qo[t].dim;this.scene.setMode(t,this.params),this.scene.morphTo(s,r,Br(e,r),1.2)}async relayout(){let t=this.graph;if(!t)return;let e=this.mode,i=++this.token;this.hud.setBusy("Re-mapping neurons\u2026",0);let s=await this.layoutFor(e,t,i,!1);if(this.hud.setBusy(null),!s||i!==this.token)return;this.layouts={[e]:s};let r=Qo[e].dim;this.scene.morphTo(s,r,Br(t,r),1.4)}setParam(t,e){let i=t==="showUnresolved"||t==="showOrphans";if(i?(this.settings.neural[t]=e,this.settings.daily[t]=e):this.settings[this.mode][t]=e,this.host.saveSettings(),i){this.raw&&this.setRaw(this.raw,!1,!0);return}this.scene.applyParams(this.params,this.mode)}resetModeDefaults(){let t=this.mode==="neural"?Sr:wr,e={showUnresolved:this.params.showUnresolved,showOrphans:this.params.showOrphans};this.settings[this.mode]={...t,...e},this.host.saveSettings(),this.scene.applyParams(this.params,this.mode),this.hud.refresh()}resetView(){this.scene.resetCamera(!0)}persist(){this.host.saveSettings()}openSelected(t){let e=this.graph,i=this.scene.selected;e&&i>=0&&e.kind[i]===0&&this.host.openNote(e.ids[i],t)}dispose(){this.disposed=!0,this.token++,this.hud.dispose(),this.scene.dispose()}};function rv(n){try{let t=n.internalPlugins?.getPluginById?.("bookmarks"),e=[],i=s=>{for(let r of s??[])r.type==="file"&&r.path&&e.push(r.path),r.items&&i(r.items)};return i(t?.instance?.items),e}catch{return[]}}function zc(n){let t={files:[],resolved:{},unresolved:{},bookmarks:rv(n)},e=n.metadataCache;for(let i of n.vault.getMarkdownFiles()){let s=e.getFileCache(i),r={};for(let[a,o]of Object.entries(s?.frontmatter??{}))a!=="position"&&(r[a]=Array.isArray(o)?o.join(","):String(o));t.files.push({path:i.path,headings:(s?.headings??[]).map(a=>({h:a.heading,l:a.level})),tags:(s?.tags??[]).map(a=>a.tag.replace(/^#/,"")),fm:r})}return t.resolved=e.resolvedLinks,t.unresolved=e.unresolvedLinks,t}var _s="neural-brain-view",xd=2,xr=class extends gs.ItemView{constructor(e,i){super(e);k(this,"plugin",i);k(this,"engine",null);k(this,"io",null);k(this,"writeTimers",new Map);this.navigation=!1}getViewType(){return _s}getDisplayText(){return"Neural Brain"}getIcon(){return"brain-circuit"}cachePath(e){return`${this.plugin.manifest.dir}/layout-${e}.json`}host(){let e=this.app.vault.adapter;return{readCache:async i=>{try{let s=this.cachePath(i);if(!await e.exists(s))return null;let r=JSON.parse(await e.read(s));return r.v===xd?r.pos:null}catch{return null}},writeCache:(i,s)=>{window.clearTimeout(this.writeTimers.get(i)),this.writeTimers.set(i,window.setTimeout(()=>{e.write(this.cachePath(i),JSON.stringify({v:xd,pos:s})).catch(()=>{})},400))},saveSettings:()=>this.plugin.saveSoon(),openNote:(i,s)=>{let r=this.app.vault.getAbstractFileByPath(i);if(!(r instanceof gs.TFile))return;(s==="same"?this.leaf:s==="split"?this.app.workspace.getLeaf("split"):s==="window"?this.app.workspace.getLeaf("window"):this.app.workspace.getLeaf("tab")).openFile(r)}}}async onOpen(){let e=this.contentEl;e.empty(),e.addClass("nb-root");try{this.engine=new tl(e,this.host(),this.plugin.cfg)}catch(s){e.createEl("div",{text:"Neural Brain could not start WebGL: "+String(s),cls:"nb-status"});return}this.io=new IntersectionObserver(s=>{let r=s.some(a=>a.isIntersecting);this.engine&&(r?this.engine.scene.start():this.engine.scene.stop())}),this.io.observe(e);let i=(0,gs.debounce)(()=>{this.engine&&this.engine.setRaw(zc(this.app),!1)},2500,!0);this.registerEvent(this.app.metadataCache.on("resolved",i)),this.registerEvent(this.app.vault.on("delete",i)),this.registerEvent(this.app.vault.on("rename",i)),this.app.workspace.onLayoutReady(()=>{this.engine?.setRaw(zc(this.app),!0)})}async onClose(){this.io?.disconnect(),this.io=null;for(let e of this.writeTimers.values())window.clearTimeout(e);this.engine?.dispose(),this.engine=null}};var el=class extends Ye.Plugin{constructor(){super(...arguments);k(this,"cfg");k(this,"saveSoon",(0,Ye.debounce)(()=>{this.saveData(this.cfg)},700,!0))}async onload(){this.cfg=$c(await this.loadData()),this.registerView(_s,e=>new xr(e,this)),this.addRibbonIcon("brain-circuit","Open Neural Brain",()=>{this.activate()}),this.addCommand({id:"open",name:"Open Neural Brain",callback:()=>{this.activate()}}),this.addCommand({id:"mode-neural",name:"Switch to Neural (3D showcase) mode",callback:()=>{this.setMode("neural")}}),this.addCommand({id:"mode-daily",name:"Switch to Daily (flat, readable) mode",callback:()=>{this.setMode("daily")}}),this.addCommand({id:"relayout",name:"Re-layout the neural graph",callback:()=>{this.eachView(e=>e.engine?.relayout())}}),this.addSettingTab(new kc(this.app,this))}onunload(){this.saveData(this.cfg)}async activate(){let e=this.app.workspace.getLeavesOfType(_s)[0],i=e??this.app.workspace.getLeaf("tab");e||await i.setViewState({type:_s,active:!0}),this.app.workspace.revealLeaf(i)}async setMode(e){await this.activate(),await this.eachView(i=>i.engine?.switchMode(e))}async eachView(e){for(let i of this.app.workspace.getLeavesOfType(_s))i.view instanceof xr&&await e(i.view)}},kc=class extends Ye.PluginSettingTab{constructor(e,i){super(e,i);k(this,"plugin",i)}display(){let{containerEl:e}=this;e.empty();let i=this.plugin.cfg,s=()=>{this.plugin.saveSoon(),this.plugin.eachView(a=>a.engine&&a.engine.raw&&a.engine.setRaw(a.engine.raw,!1,!0))};e.createEl("p",{text:"Most controls (sliders, Neural / Daily mode) live in the gear-icon panel inside the graph view. This page holds the structural options.",cls:"setting-item-description"}),new Ye.Setting(e).setName("Open notes in").setDesc("Where a double-click opens the note. Ctrl/Cmd + double-click always opens to the side.").addDropdown(a=>a.addOptions({tab:"New tab",split:"Split (to the side)",window:"New window"}).setValue(i.openIn).onChange(o=>{i.openIn=o,this.plugin.saveSoon()})),new Ye.Setting(e).setName("Hidden files").setDesc("Comma-separated vault paths to leave out of the graph (e.g. log.md). Notes themselves are never changed.").addText(a=>a.setPlaceholder("log.md, Untitled.md").setValue(i.hideFiles.join(", ")).onChange(o=>{i.hideFiles=o.split(",").map(l=>l.trim()).filter(Boolean),s()})),e.createEl("h3",{text:"Folder colours"}),e.createEl("p",{text:'Longest matching path prefix wins; "*" is the fallback for root files. Same family = same colour everywhere.',cls:"setting-item-description"}),i.rules.forEach((a,o)=>{new Ye.Setting(e).setName(a.prefix==="*"?"Root files (*)":a.prefix).addColorPicker(l=>l.setValue(a.color).onChange(c=>{a.color=c,s()})).addExtraButton(l=>l.setIcon("trash").setTooltip("Remove rule").onClick(()=>{i.rules.splice(o,1),s(),this.display()}))});let r="";new Ye.Setting(e).setName("Add folder rule").addText(a=>a.setPlaceholder("Folder/Sub").onChange(o=>r=o.trim())).addButton(a=>a.setButtonText("Add").onClick(()=>{r&&(i.rules.push({prefix:r,color:"#5ec8ff",name:r}),s(),this.display())})),new Ye.Setting(e).setName("Reset folder colours").addButton(a=>a.setButtonText("Reset").onClick(()=>{i.rules=br.map(o=>({...o})),s(),this.display()})),e.createEl("h3",{text:"Layout"}),new Ye.Setting(e).setName("Re-layout").setDesc("Positions are cached so the graph stays identical between sessions. Recompute only when you want a fresh arrangement.").addButton(a=>a.setButtonText("Re-layout now").onClick(()=>{this.plugin.eachView(o=>o.engine?.relayout()),new Ye.Notice("Neural Brain: re-layout started")}))}};
