var Pe=Object.defineProperty;var je=(n,e,t)=>e in n?Pe(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var ie=(n,e,t)=>je(n,typeof e!="symbol"?e+"":e,t);import{r as l,jj as Ve,jk as Be,jl as Se,R as H,jm as oe,jn as we,it as y,j as $,ik as ae,il as le,iq as De,is as Q,jo as Z,ij as Le,ir as se,jp as q,jq as re,iu as ke}from"./index-C4G2ttAA.js";function Ne(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function ee(n,e){var t=function(o){return e&&l.isValidElement(o)?e(o):o},a=Object.create(null);return n&&l.Children.map(n,function(i){return i}).forEach(function(i){a[i.key]=t(i)}),a}function $e(n,e){n=n||{},e=e||{};function t(f){return f in e?e[f]:n[f]}var a=Object.create(null),i=[];for(var o in n)o in e?i.length&&(a[o]=i,i=[]):i.push(o);var s,p={};for(var u in e){if(a[u])for(s=0;s<a[u].length;s++){var d=a[u][s];p[a[u][s]]=t(d)}p[u]=t(u)}for(s=0;s<i.length;s++)p[i[s]]=t(i[s]);return p}function N(n,e,t){return t[e]!=null?t[e]:n.props[e]}function ve(n,e){return ee(n.children,function(t){return l.cloneElement(t,{onExited:e.bind(null,t),in:!0,appear:N(t,"appear",n),enter:N(t,"enter",n),exit:N(t,"exit",n)})})}function Fe(n,e,t){var a=ee(n.children),i=$e(e,a);return Object.keys(i).forEach(function(o){var s=i[o];if(l.isValidElement(s)){var p=o in e,u=o in a,d=e[o],f=l.isValidElement(d)&&!d.props.in;u&&(!p||f)?i[o]=l.cloneElement(s,{onExited:t.bind(null,s),in:!0,exit:N(s,"exit",n),enter:N(s,"enter",n)}):!u&&p&&!f?i[o]=l.cloneElement(s,{in:!1}):u&&p&&l.isValidElement(d)&&(i[o]=l.cloneElement(s,{onExited:t.bind(null,s),in:d.props.in,exit:N(s,"exit",n),enter:N(s,"enter",n)}))}}),i}var Ie=Object.values||function(n){return Object.keys(n).map(function(e){return n[e]})},Ue={component:"div",childFactory:function(e){return e}},te=function(n){Ve(e,n);function e(a,i){var o;o=n.call(this,a,i)||this;var s=o.handleExited.bind(Ne(o));return o.state={contextValue:{isMounting:!0},handleExited:s,firstRender:!0},o}var t=e.prototype;return t.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},t.componentWillUnmount=function(){this.mounted=!1},e.getDerivedStateFromProps=function(i,o){var s=o.children,p=o.handleExited,u=o.firstRender;return{children:u?ve(i,p):Fe(i,s,p),firstRender:!1}},t.handleExited=function(i,o){var s=ee(this.props.children);i.key in s||(i.props.onExited&&i.props.onExited(o),this.mounted&&this.setState(function(p){var u=Be({},p.children);return delete u[i.key],{children:u}}))},t.render=function(){var i=this.props,o=i.component,s=i.childFactory,p=Se(i,["component","childFactory"]),u=this.state.contextValue,d=Ie(this.state.children).map(s);return delete p.appear,delete p.enter,delete p.exit,o===null?H.createElement(oe.Provider,{value:u},d):H.createElement(oe.Provider,{value:u},H.createElement(o,p,d))},e}(H.Component);te.propTypes={};te.defaultProps=Ue;class G{constructor(){ie(this,"mountEffect",()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())});this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}static create(){return new G}static use(){const e=we(G.create).current,[t,a]=l.useState(!1);return e.shouldMount=t,e.setShouldMount=a,l.useEffect(e.mountEffect,[t]),e}mount(){return this.mounted||(this.mounted=Oe(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}start(...e){this.mount().then(()=>{var t;return(t=this.ref.current)==null?void 0:t.start(...e)})}stop(...e){this.mount().then(()=>{var t;return(t=this.ref.current)==null?void 0:t.stop(...e)})}pulsate(...e){this.mount().then(()=>{var t;return(t=this.ref.current)==null?void 0:t.pulsate(...e)})}}function ze(){return G.use()}function Oe(){let n,e;const t=new Promise((a,i)=>{n=a,e=i});return t.resolve=n,t.reject=e,t}function Ae(n){const{className:e,classes:t,pulsate:a=!1,rippleX:i,rippleY:o,rippleSize:s,in:p,onExited:u,timeout:d}=n,[f,h]=l.useState(!1),M=y(e,t.ripple,t.rippleVisible,a&&t.ripplePulsate),j={width:s,height:s,top:-(s/2)+o,left:-(s/2)+i},g=y(t.child,f&&t.childLeaving,a&&t.childPulsate);return!p&&!f&&h(!0),l.useEffect(()=>{if(!p&&u!=null){const w=setTimeout(u,d);return()=>{clearTimeout(w)}}},[u,p,d]),$.jsx("span",{className:M,style:j,children:$.jsx("span",{className:g})})}const b=ae("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),J=550,Xe=80,Ye=Z`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,Ke=Z`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,We=Z`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,He=Q("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),qe=Q(Ae,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${b.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${Ye};
    animation-duration: ${J}ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
  }

  &.${b.ripplePulsate} {
    animation-duration: ${({theme:n})=>n.transitions.duration.shorter}ms;
  }

  & .${b.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${b.childLeaving} {
    opacity: 0;
    animation-name: ${Ke};
    animation-duration: ${J}ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
  }

  & .${b.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${We};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,Ge=l.forwardRef(function(e,t){const a=le({props:e,name:"MuiTouchRipple"}),{center:i=!1,classes:o={},className:s,...p}=a,[u,d]=l.useState([]),f=l.useRef(0),h=l.useRef(null);l.useEffect(()=>{h.current&&(h.current(),h.current=null)},[u]);const M=l.useRef(!1),j=De(),g=l.useRef(null),w=l.useRef(null),C=l.useCallback(c=>{const{pulsate:E,rippleX:R,rippleY:I,rippleSize:D,cb:U}=c;d(x=>[...x,$.jsx(qe,{classes:{ripple:y(o.ripple,b.ripple),rippleVisible:y(o.rippleVisible,b.rippleVisible),ripplePulsate:y(o.ripplePulsate,b.ripplePulsate),child:y(o.child,b.child),childLeaving:y(o.childLeaving,b.childLeaving),childPulsate:y(o.childPulsate,b.childPulsate)},timeout:J,pulsate:E,rippleX:R,rippleY:I,rippleSize:D},f.current)]),f.current+=1,h.current=U},[o]),v=l.useCallback((c={},E={},R=()=>{})=>{const{pulsate:I=!1,center:D=i||E.pulsate,fakeElement:U=!1}=E;if((c==null?void 0:c.type)==="mousedown"&&M.current){M.current=!1;return}(c==null?void 0:c.type)==="touchstart"&&(M.current=!0);const x=U?null:w.current,V=x?x.getBoundingClientRect():{width:0,height:0,left:0,top:0};let B,T,S;if(D||c===void 0||c.clientX===0&&c.clientY===0||!c.clientX&&!c.touches)B=Math.round(V.width/2),T=Math.round(V.height/2);else{const{clientX:z,clientY:L}=c.touches&&c.touches.length>0?c.touches[0]:c;B=Math.round(z-V.left),T=Math.round(L-V.top)}if(D)S=Math.sqrt((2*V.width**2+V.height**2)/3),S%2===0&&(S+=1);else{const z=Math.max(Math.abs((x?x.clientWidth:0)-B),B)*2+2,L=Math.max(Math.abs((x?x.clientHeight:0)-T),T)*2+2;S=Math.sqrt(z**2+L**2)}c!=null&&c.touches?g.current===null&&(g.current=()=>{C({pulsate:I,rippleX:B,rippleY:T,rippleSize:S,cb:R})},j.start(Xe,()=>{g.current&&(g.current(),g.current=null)})):C({pulsate:I,rippleX:B,rippleY:T,rippleSize:S,cb:R})},[i,C,j]),Y=l.useCallback(()=>{v({},{pulsate:!0})},[v]),F=l.useCallback((c,E)=>{if(j.clear(),(c==null?void 0:c.type)==="touchend"&&g.current){g.current(),g.current=null,j.start(0,()=>{F(c,E)});return}g.current=null,d(R=>R.length>0?R.slice(1):R),h.current=E},[j]);return l.useImperativeHandle(t,()=>({pulsate:Y,start:v,stop:F}),[Y,v,F]),$.jsx(He,{className:y(b.root,o.root,s),ref:w,...p,children:$.jsx(te,{component:null,exit:!0,children:u})})});function _e(n){return Le("MuiButtonBase",n)}const Je=ae("MuiButtonBase",["root","disabled","focusVisible"]),Qe=n=>{const{disabled:e,focusVisible:t,focusVisibleClassName:a,classes:i}=n,s=ke({root:["root",e&&"disabled",t&&"focusVisible"]},_e,i);return t&&a&&(s.root+=` ${a}`),s},Ze=Q("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Je.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),nt=l.forwardRef(function(e,t){const a=le({props:e,name:"MuiButtonBase"}),{action:i,centerRipple:o=!1,children:s,className:p,component:u="button",disabled:d=!1,disableRipple:f=!1,disableTouchRipple:h=!1,focusRipple:M=!1,focusVisibleClassName:j,LinkComponent:g="a",onBlur:w,onClick:C,onContextMenu:v,onDragLeave:Y,onFocus:F,onFocusVisible:c,onKeyDown:E,onKeyUp:R,onMouseDown:I,onMouseLeave:D,onMouseUp:U,onTouchEnd:x,onTouchMove:V,onTouchStart:B,tabIndex:T=0,TouchRippleProps:S,touchRippleRef:z,type:L,...O}=a,A=l.useRef(null),m=ze(),ue=se(m.ref,z),[k,K]=l.useState(!1);d&&k&&K(!1),l.useImperativeHandle(i,()=>({focusVisible:()=>{K(!0),A.current.focus()}}),[]);const ce=m.shouldMount&&!f&&!d;l.useEffect(()=>{k&&M&&!f&&m.pulsate()},[f,M,k,m]);const pe=P(m,"start",I,h),de=P(m,"stop",v,h),fe=P(m,"stop",Y,h),he=P(m,"stop",U,h),me=P(m,"stop",r=>{k&&r.preventDefault(),D&&D(r)},h),ge=P(m,"start",B,h),be=P(m,"stop",x,h),Me=P(m,"stop",V,h),Re=P(m,"stop",r=>{re(r.target)||K(!1),w&&w(r)},!1),Ee=q(r=>{A.current||(A.current=r.currentTarget),re(r.target)&&(K(!0),c&&c(r)),F&&F(r)}),_=()=>{const r=A.current;return u&&u!=="button"&&!(r.tagName==="A"&&r.href)},xe=q(r=>{M&&!r.repeat&&k&&r.key===" "&&m.stop(r,()=>{m.start(r)}),r.target===r.currentTarget&&_()&&r.key===" "&&r.preventDefault(),E&&E(r),r.target===r.currentTarget&&_()&&r.key==="Enter"&&!d&&(r.preventDefault(),C&&C(r))}),ye=q(r=>{M&&r.key===" "&&k&&!r.defaultPrevented&&m.stop(r,()=>{m.pulsate(r)}),R&&R(r),C&&r.target===r.currentTarget&&_()&&r.key===" "&&!r.defaultPrevented&&C(r)});let W=u;W==="button"&&(O.href||O.to)&&(W=g);const X={};W==="button"?(X.type=L===void 0?"button":L,X.disabled=d):(!O.href&&!O.to&&(X.role="button"),d&&(X["aria-disabled"]=d));const Ce=se(t,A),ne={...a,centerRipple:o,component:u,disabled:d,disableRipple:f,disableTouchRipple:h,focusRipple:M,tabIndex:T,focusVisible:k},Te=Qe(ne);return $.jsxs(Ze,{as:W,className:y(Te.root,p),ownerState:ne,onBlur:Re,onClick:C,onContextMenu:de,onFocus:Ee,onKeyDown:xe,onKeyUp:ye,onMouseDown:pe,onMouseLeave:me,onMouseUp:he,onDragLeave:fe,onTouchEnd:be,onTouchMove:Me,onTouchStart:ge,ref:Ce,tabIndex:d?-1:T,type:L,...X,...O,children:[s,ce?$.jsx(Ge,{ref:ue,center:o,...S}):null]})});function P(n,e,t,a=!1){return q(i=>(t&&t(i),a||n[e](i),!0))}export{nt as B};
