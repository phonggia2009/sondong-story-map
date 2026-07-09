import{j as e}from"./query-DfpssVLx.js";import{r as i,u as L}from"./router-G___GQdG.js";import{c as N,u as C,M as O,C as q,a as z,g as U,b as K,L as Q}from"./index-BzmoOjHS.js";import{X as B,M as F,U as X,H as G,E as P,u as J,a as W,b as Y,I as Z,c as _}from"./InformationPanel-Dr-A2JuT.js";import{m,A as M}from"./motion-BCOJ7R20.js";import"./vendor-6tXD-6zM.js";import"./viewer-DmCWo4vE.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=N("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=N("PanelLeftOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=N("Presentation",[["path",{d:"M2 3h20",key:"91anmk"}],["path",{d:"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",key:"2k9sn8"}],["path",{d:"m7 21 5-5 5 5",key:"bip4we"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=N("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),re=i.memo(function({query:t,resultCount:s,totalCount:u,onQueryChange:c,onClear:g,onMoveUp:r,onMoveDown:n,inputRef:b}){const{isDark:d}=C(),y=i.useRef(null),x=b??y,h=i.useCallback(l=>{l.key==="ArrowUp"&&(l.preventDefault(),r()),l.key==="ArrowDown"&&(l.preventDefault(),n()),l.key==="Escape"&&(l.preventDefault(),g())},[r,n,g]),o=t.trim().length>0;return e.jsxs("div",{className:"px-3 py-2",children:[e.jsxs("div",{className:`
        relative flex items-center rounded-xl overflow-hidden
        transition-all duration-200
        ${d?"bg-gov-800 ring-1 ring-gov-700 focus-within:ring-accent-500":"bg-gray-100 ring-1 ring-transparent focus-within:ring-gov-400 focus-within:bg-white"}
      `,children:[e.jsx(ne,{className:`
          flex-shrink-0 w-4 h-4 ml-3
          ${d?"text-gov-500":"text-gray-400"}
        `}),e.jsx("input",{ref:x,type:"text",value:t,onChange:l=>c(l.target.value),onKeyDown:h,placeholder:"Tìm kiếm thôn/xã...",className:`
            flex-1 px-3 py-2.5 text-sm bg-transparent outline-none
            placeholder:text-opacity-50
            ${d?"text-white placeholder:text-gov-500":"text-gray-800 placeholder:text-gray-400"}
          `,"aria-label":"Tìm kiếm thôn xã",autoComplete:"off"}),o&&e.jsx(m.button,{onClick:g,className:`
              flex-shrink-0 mr-2 p-1 rounded-full transition-colors
              ${d?"text-gov-500 hover:text-white hover:bg-gov-700":"text-gray-400 hover:text-gray-700 hover:bg-gray-200"}
            `,initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},whileTap:{scale:.9},"aria-label":"Xóa tìm kiếm",children:e.jsx(B,{className:"w-3.5 h-3.5"})})]}),o&&e.jsx(m.p,{className:`text-xs mt-1.5 px-1 ${d?"text-gov-500":"text-gray-400"}`,initial:{opacity:0},animate:{opacity:1},children:s===0?"Không tìm thấy kết quả":`${s} / ${u} thôn`})]})});function se(a,t){if(!t.trim())return a;const s=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return a.split(s).map((c,g)=>s.test(c)?e.jsx("mark",{className:"bg-accent-400/30 text-accent-300 rounded px-0.5 not-italic",children:c},g):c)}const oe=i.memo(function({village:t,isSelected:s,isActive:u=!1,searchQuery:c="",onClick:g}){const{isDark:r}=C();return e.jsxs(m.button,{id:`village-card-${t.id}`,onClick:()=>g(t),className:`
        w-full text-left px-3 py-3 rounded-xl transition-all duration-200
        flex items-center gap-3 group relative overflow-hidden
        ${s?r?"bg-gov-700 ring-1 ring-accent-500/60 shadow-glow":"bg-gov-50 ring-1 ring-gov-400 shadow-card":u?r?"bg-gov-800/70 ring-1 ring-gov-600":"bg-gray-50 ring-1 ring-gray-200":r?"hover:bg-gov-800/60":"hover:bg-gray-50"}
      `,whileHover:{x:2},whileTap:{scale:.98},layout:!0,"aria-pressed":s,"aria-label":`Xem thôn ${t.name}`,children:[s&&e.jsx(m.div,{className:"absolute left-0 top-0 bottom-0 w-0.5 bg-accent-400 rounded-r",layoutId:"selectedIndicator",transition:{duration:.25,ease:"easeOut"}}),e.jsx("div",{className:`
        flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
        transition-colors duration-200
        ${s?"bg-accent-500 text-white":r?"bg-gov-800 text-gov-400 group-hover:bg-gov-700 group-hover:text-gov-300":"bg-gray-100 text-gray-500 group-hover:bg-gov-100 group-hover:text-gov-600"}
      `,children:t.id}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:`
          text-sm font-semibold truncate
          ${s?r?"text-white":"text-gov-800":r?"text-gov-200 group-hover:text-white":"text-gray-700 group-hover:text-gray-900"}
        `,children:se(t.name,c)}),e.jsxs("div",{className:"flex items-center gap-2 mt-0.5",children:[e.jsxs("span",{className:`
            flex items-center gap-1 text-xs
            ${r?"text-gov-500":"text-gray-400"}
          `,children:[e.jsx(F,{className:"w-3 h-3"}),t.area]}),e.jsxs("span",{className:`
            flex items-center gap-1 text-xs
            ${r?"text-gov-500":"text-gray-400"}
          `,children:[e.jsx(X,{className:"w-3 h-3"}),t.partyMembers," đảng viên"]})]})]}),e.jsx(ee,{className:`
        flex-shrink-0 w-3.5 h-3.5 transition-all duration-200
        ${s?"text-accent-400 opacity-100":r?"text-gov-600 opacity-0 group-hover:opacity-100":"text-gray-300 opacity-0 group-hover:opacity-100"}
      `})]})});function k(a){return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase().trim()}function ie(a){const[t,s]=i.useState(""),[u,c]=i.useState(0),g=i.useRef(null),r=i.useMemo(()=>{if(!t.trim())return a;const o=k(t);return a.filter(l=>{const v=k(l.name),w=k(l.description),j=l.landmarks.map(k).join(" ");return v.includes(o)||w.includes(o)||j.includes(o)})},[t,a]),n=i.useCallback(o=>{s(o),c(0)},[]),b=i.useCallback(()=>{var o;s(""),c(0),(o=g.current)==null||o.focus()},[]),d=i.useCallback(()=>{c(o=>Math.max(0,o-1))},[]),y=i.useCallback(()=>{c(o=>Math.min(r.length-1,o+1))},[r.length]),x=r.length>0,h=t.trim().length>0;return{query:t,results:r,activeIndex:u,inputRef:g,hasResults:x,isFiltering:h,handleQueryChange:n,clearSearch:b,moveUp:d,moveDown:y,setActiveIndex:c}}const le=i.memo(function({villages:t,currentIndex:s,onVillageSelect:u,onPrev:c,onNext:g}){const r=L(),{isDark:n,sidebarOpen:b,isPresenting:d,enterPresentation:y,selectedVillage:x,selectVillage:h}=C(),o=i.useCallback(()=>{y(),r("/presentation")},[y,r]),{query:l,results:v,activeIndex:w,inputRef:j,hasResults:f,isFiltering:$,handleQueryChange:R,clearSearch:D,moveUp:T,moveDown:S,setActiveIndex:V}=ie(t),H=i.useRef(null);i.useEffect(()=>{if(x){const p=document.getElementById(`village-card-${x.id}`);p==null||p.scrollIntoView({behavior:"smooth",block:"nearest"})}},[x]);const A=p=>{u(p),V(v.findIndex(I=>I.id===p.id))},E=()=>{h(null)};return e.jsx(M,{children:b&&!d&&e.jsxs(m.aside,{className:`
            flex flex-col w-72 flex-shrink-0 h-full
            border-r transition-colors duration-300 z-20
            ${n?"bg-gov-950 border-gov-800":"bg-white border-gray-200"}
          `,initial:{width:0,opacity:0},animate:{width:288,opacity:1},exit:{width:0,opacity:0},transition:{duration:.3,ease:"easeInOut"},children:[e.jsxs("div",{className:`
            flex-shrink-0 px-3 py-3 border-b
            ${n?"border-gov-800":"border-gray-100"}
          `,children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(O,{className:`w-4 h-4 ${n?"text-accent-400":"text-gov-600"}`}),e.jsx("span",{className:`text-sm font-semibold ${n?"text-white":"text-gray-800"}`,children:"Danh Sách Thôn"}),e.jsx("span",{className:`
                  text-xs px-1.5 py-0.5 rounded-full font-medium
                  ${n?"bg-gov-800 text-gov-400":"bg-gray-100 text-gray-500"}
                `,children:t.length})]}),x&&e.jsx(m.button,{onClick:E,className:`
                    p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors
                    ${n?"text-gov-400 hover:text-white hover:bg-gov-800":"text-gray-500 hover:text-gray-800 hover:bg-gray-100"}
                  `,whileHover:{scale:1.05},whileTap:{scale:.95},title:"Về tổng quan",children:e.jsx(G,{className:"w-3.5 h-3.5"})})]}),e.jsx(re,{query:l,resultCount:v.length,totalCount:t.length,onQueryChange:R,onClear:D,onMoveUp:T,onMoveDown:S,inputRef:j})]}),e.jsx("div",{ref:H,className:"flex-1 overflow-y-auto overflow-x-hidden px-2 py-2 space-y-1 scrollbar-thin",children:f?v.map((p,I)=>e.jsx(oe,{village:p,isSelected:(x==null?void 0:x.id)===p.id,isActive:$&&I===w,searchQuery:l,onClick:A},p.id)):e.jsx(P,{type:$?"search":"empty",message:$?`Không tìm thấy kết quả cho "${l}"`:"Chưa có dữ liệu thôn xã"})}),e.jsxs("div",{className:`
            flex-shrink-0 border-t p-3 space-y-2
            ${n?"border-gov-800":"border-gray-100"}
          `,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs(m.button,{onClick:c,className:`
                  flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium
                  transition-colors
                  ${n?"bg-gov-800 text-gov-300 hover:bg-gov-700 hover:text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}
                `,whileHover:{scale:1.01},whileTap:{scale:.98},disabled:t.length===0,children:[e.jsx(q,{className:"w-4 h-4"}),"Trước"]}),e.jsx("span",{className:`text-xs ${n?"text-gov-500":"text-gray-400"}`,children:x?`${s+1}/${t.length}`:`0/${t.length}`}),e.jsxs(m.button,{onClick:g,className:`
                  flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium
                  transition-colors
                  ${n?"bg-gov-800 text-gov-300 hover:bg-gov-700 hover:text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}
                `,whileHover:{scale:1.01},whileTap:{scale:.98},disabled:t.length===0,children:["Sau",e.jsx(z,{className:"w-4 h-4"})]})]}),e.jsxs(m.button,{onClick:o,className:`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold
                         bg-gradient-to-r from-gov-700 to-accent-600 text-white
                         hover:from-gov-600 hover:to-accent-500 transition-all shadow-glow`,whileHover:{scale:1.01,y:-1},whileTap:{scale:.98},children:[e.jsx(ae,{className:"w-4 h-4"}),"Trình Chiếu"]})]})]})})});function pe(){const{selectedVillage:a,selectVillage:t,infoPanelOpen:s,setInfoPanelOpen:u,toggleInfoPanel:c,isPresenting:g,isDark:r}=C(),{villages:n,isLoading:b,isError:d,error:y,refetch:x}=J(),h=i.useMemo(()=>a?n.findIndex(f=>f.id===a.id):0,[a,n]),o=i.useCallback(f=>{t(f)},[t]),l=i.useCallback(()=>{if(n.length===0)return;const f=a?(h-1+n.length)%n.length:n.length-1;t(n[f])},[n,a,h,t]),v=i.useCallback(()=>{if(n.length===0)return;const f=a?(h+1)%n.length:0;t(n[f])},[n,a,h,t]);W(n,h),Y([{key:"ArrowLeft",handler:l,description:"Village précédente"},{key:"ArrowRight",handler:v,description:"Village suivante"},{key:"Escape",handler:()=>t(null),description:"Retour à la vue générale"}],!g);const w=a?U(a.image):K(),j=(a==null?void 0:a.name)??"Bản đồ tổng quan";return b?e.jsx(Q,{}):d?e.jsx("div",{className:"flex-1 flex items-center justify-center",children:e.jsx(P,{type:"error",error:y,onRetry:()=>x()})}):n.length===0?e.jsx("div",{className:"flex-1 flex items-center justify-center",children:e.jsx(P,{type:"empty"})}):e.jsxs(m.div,{className:"flex flex-1 overflow-hidden",initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},children:[e.jsx(M,{children:s&&a&&e.jsx(Z,{village:a,onClose:()=>u(!1)})}),e.jsxs("div",{className:"relative flex-1 flex overflow-hidden",children:[e.jsx(_,{imageUrl:w,imageAlt:j,isOverview:!a,label:(a==null?void 0:a.name)??"Tổng quan",villages:n,selectedVillage:a,onVillageClick:o}),e.jsx(M,{children:a&&!s&&e.jsxs(m.button,{onClick:c,title:"Hiện thông tin chi tiết",className:`
                absolute top-3 left-3 z-20
                flex items-center gap-2 px-3 py-2 rounded-xl
                text-xs font-semibold shadow-lg backdrop-blur-sm
                transition-colors
                ${r?"bg-gov-900/80 text-gov-300 hover:bg-gov-800 border border-gov-700":"bg-white/90 text-gray-700 hover:bg-white border border-gray-200"}
              `,initial:{opacity:0,x:-12},animate:{opacity:1,x:0},exit:{opacity:0,x:-12},transition:{duration:.2},whileHover:{scale:1.04},whileTap:{scale:.96},children:[e.jsx(te,{className:"w-4 h-4"}),"Thông tin"]},"open-panel-btn")})]}),e.jsx(le,{villages:n,currentIndex:h,onVillageSelect:o,onPrev:l,onNext:v})]})}export{pe as default};
//# sourceMappingURL=HomePage-CuGrA44v.js.map
