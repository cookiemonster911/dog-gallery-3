import{i as Se,Q as Ie,g as je,p as Ne}from"../chunks/query.B5fy9Kw6.js";import{R as Re}from"../chunks/session.nhK5e6A4.js";import{s as Te,f as me,n as ee,h as Ae}from"../chunks/scheduler.r5UgEgUv.js";import{S as He,i as Ce,e as b,s as W,t as Q,H as Oe,c as m,a as k,d as y,f as $,b as G,z as qe,o as p,g as Pe,h as s,j as Z}from"../chunks/index.D2EkJ-zn.js";const ze={name:"Dog",kind:"HoudiniQuery",hash:"9ce78c45b71be67fc637b289dc9f43f86d6fc0a0267216510be4423bc2ae7c1a",raw:`query Dog($dogId: String!) {
  dog(where: {slug: $dogId}) {
    id
    name
    department
    batch
    slug
    picture {
      url
      id
    }
    description {
      json
      references {
        __typename
        ... on Dog {
          id
          name
          slug
        }
        __typename
      }
    }
  }
}
`,rootType:"Query",selection:{fields:{dog:{type:"Dog",keyRaw:"dog(where: {slug: $dogId})",nullable:!0,selection:{fields:{id:{type:"ID",keyRaw:"id",visible:!0},name:{type:"String",keyRaw:"name",visible:!0},department:{type:"String",keyRaw:"department",visible:!0},batch:{type:"Int",keyRaw:"batch",visible:!0},slug:{type:"String",keyRaw:"slug",nullable:!0,visible:!0},picture:{type:"Asset",keyRaw:"picture",selection:{fields:{url:{type:"String",keyRaw:"url",visible:!0},id:{type:"ID",keyRaw:"id",visible:!0}}},visible:!0},description:{type:"DogDescriptionRichText",keyRaw:"description",selection:{fields:{json:{type:"RichTextAST",keyRaw:"json",visible:!0},references:{type:"DogDescriptionRichTextEmbeddedTypes",keyRaw:"references",selection:{abstractFields:{fields:{Dog:{id:{type:"ID",keyRaw:"id",visible:!0},name:{type:"String",keyRaw:"name",visible:!0},slug:{type:"String",keyRaw:"slug",nullable:!0,visible:!0},__typename:{type:"String",keyRaw:"__typename",visible:!0}}},typeMap:{}},fields:{__typename:{type:"String",keyRaw:"__typename",visible:!0}}},abstract:!0,visible:!0}}},visible:!0}}},visible:!0}}},pluginData:{"houdini-svelte":{}},input:{fields:{dogId:"String"},types:{},defaults:{},runtimeScalars:{}},policy:"CacheOrNetwork",partial:!1};class Ve extends Ie{constructor(){super({artifact:ze,storeName:"DogStore",variables:!0})}}async function Be(e){await Se();const r=new Ve;return await r.fetch(e),{Dog:r}}async function Fe(e,r){return{dogId:Ne(e,"String",r.params.dogId)}}async function Me(e){const r=new Re(e),t=je(),n=[],i={};i.Dog=await Fe(t,e),n.push(Be({variables:i.Dog,event:e,blocking:void 0}));let a={};try{a=Object.assign({},...await Promise.all(n))}catch(o){throw o}return{...r.returnValue,...a}}const sr=Object.freeze(Object.defineProperty({__proto__:null,load:Me},Symbol.toStringTag,{value:"Module"}));function re(e){return e.children!==void 0}function ke(e){return e.text!==void 0}function Le(e){var r=e.children;if(r.length>1){var t=r.filter(function n(i){return ke(i)&&i.text!==""?!0:re(i)?(i.children=i.children.filter(n)).length:!1});return!(t.length>0)}else if(r[0].text==="")return!0;return!1}var te;(function(e){e[e["heading-one"]=0]="heading-one",e[e["heading-two"]=1]="heading-two",e[e["heading-three"]=2]="heading-three",e[e["heading-four"]=3]="heading-four",e[e["heading-five"]=4]="heading-five",e[e["heading-six"]=5]="heading-six",e[e.table_head=6]="table_head"})(te||(te={}));var Qe={"heading-one":"h1","heading-two":"h2","heading-three":"h3","heading-four":"h4","heading-five":"h5","heading-six":"h6",class:"class",link:"a",image:"img",iframe:"iframe",video:"video","bulleted-list":"ul","numbered-list":"ol","list-item":"li","list-item-child":"list_item_child",table:"table",table_head:"table_head",table_body:"table_body",table_row:"table_row",table_cell:"table_cell",table_header_cell:"table_header_cell","block-quote":"blockquote",paragraph:"p",bold:"bold",italic:"italic",underline:"underline",code:"code","code-block":"code_block"};function Ge(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */var Ke=/["'&<>]/,Ue=Ye;function Ye(e){var r=""+e,t=Ke.exec(r);if(!t)return r;var n,i="",a=0,o=0;for(a=t.index;a<r.length;a++){switch(r.charCodeAt(a)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 39:n="&#39;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}o!==a&&(i+=r.substring(o,a)),o=a+1,i+=n}return o!==a?i+r.substring(o,a):i}const K=Ge(Ue);function R(){return R=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},R.apply(this,arguments)}function xe(e,r){if(e==null)return{};var t={},n=Object.keys(e),i,a;for(a=0;a<n.length;a++)i=n[a],!(r.indexOf(i)>=0)&&(t[i]=e[i]);return t}function We(e){var r=e.url;return`
    <audio
      style="display: block; max-width: 100%; height: auto"
      src="`+r+`"
      controls=""
    >
      <p>
        Your browser doesn&#x27;t support HTML5 audio. Here is a
        <a href="`+r+`">link to the audio</a>
        instead.
      </p>
    </audio>
  `}function $e(e){var r=e.url;return`
    <div
      style="
        position: relative;
        overflow: hidden;
        width: 100%;
        padding-top: 56.25%;
      "
    >
      <iframe
        style="
          position: absolute;
          top: 0px;
          bottom: 0px;
          right: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
        "
        src="`+K(r)+`"
        loading="lazy"
        allow="fullscreen"
        frameBorder="0"
        referrerPolicy="no-referrer"
      ></iframe>
    </div>
  `}function ye(e){var r=e.src,t=e.width,n=e.height,i=e.altText,a=e.title;return`
    <img loading="lazy" src="`+K(r)+'" '+(t?'width="'+t+'"':"")+" "+(n?'height="'+n+'"':"")+" "+(i?'alt="'+i+'"':"")+" "+(a?'title="'+a+'"':"")+` />
  `}function _e(e){var r=e.src,t=e.width,n=e.height,i=e.title;return`
    <video src="`+K(r)+'" controls width="'+(t||"100%")+'" height="'+(n||"100%")+'" '+(i?'title="'+i+'"':"")+`>
      <p>
        Your browser doesn't support HTML5 video. Here is a
        <a href="`+r+`">link to the video</a> instead.
      </p>
    </video>
  `}function Je(e){var r=e.className,t=e.children;return'<div class="'+r+'">'+t+"</div>"}function Xe(e){var r=e.children,t=xe(e,["children"]),n=t.href,i=t.rel,a=t.id,o=t.title,h=t.openInNewTab,l=t.className;return`
    <a href="`+K(n)+'" target="'+(h?"_blank":"_self")+'" '+(l?'class="'+l+'"':"")+" "+(i?'rel="'+i+'"':"")+" "+(o?'title="'+o+'"':"")+" "+(a?'id="'+a+'"':"")+" "+(i?'rel="'+i+'"':"")+`>
      `+r+`
    </a>
  `}function J(e){return e.mimeType,""}var E={a:Xe,class:Je,video:_e,img:ye,iframe:$e,blockquote:function(r){var t=r.children;return"<blockquote>"+t+"</blockquote>"},ul:function(r){var t=r.children;return"<ul>"+t+"</ul>"},ol:function(r){var t=r.children;return"<ol>"+t+"</ol>"},li:function(r){var t=r.children;return"<li>"+t+"</li>"},p:function(r){var t=r.children;return"<p>"+t+"</p>"},h1:function(r){var t=r.children;return"<h1>"+t+"</h1>"},h2:function(r){var t=r.children;return"<h2>"+t+"</h2>"},h3:function(r){var t=r.children;return"<h3>"+t+"</h3>"},h4:function(r){var t=r.children;return"<h4>"+t+"</h4>"},h5:function(r){var t=r.children;return"<h5>"+t+"</h5>"},h6:function(r){var t=r.children;return"<h6>"+t+"</h6>"},table:function(r){var t=r.children;return"<table>"+t+"</table>"},table_head:function(r){var t=r.children;return"<thead>"+t+"</thead>"},table_body:function(r){var t=r.children;return"<tbody>"+t+"</tbody>"},table_row:function(r){var t=r.children;return"<tr>"+t+"</tr>"},table_cell:function(r){var t=r.children;return"<td>"+t+"</td>"},table_header_cell:function(r){var t=r.children;return"<th>"+t+"</th>"},bold:function(r){var t=r.children;return"<b>"+t+"</b>"},italic:function(r){var t=r.children;return"<i>"+t+"</i>"},underline:function(r){var t=r.children;return"<u>"+t+"</u>"},code:function(r){var t=r.children;return"<code>"+t+"</code>"},code_block:function(r){var t=r.children;return`<pre
      style="
        white-space: pre;
        word-wrap: break-word;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        font-family: monospace;
      "
    >
      `+t+`
    </pre>`},list_item_child:function(r){var t=r.children;return""+t},Asset:{audio:We,image:function(r){return ye(R({},r,{src:r.url}))},video:function(r){return _e(R({},r,{src:r.url}))},font:J,application:J,model:J,text:J},embed:{},link:{}};function Ze(e){return Array.isArray(e)?e:e.children}function Ee(e){if(e.includes(`
`)){var r=e.split(`
`);return r.map(function(t,n){return""+t+(n===r.length-1?"":"<br />")}).join("")}return e}function er(e){var r=e.shouldSerialize,t=e.textNode,n=e.renderers,i=t.text,a=t.bold,o=t.italic,h=t.underline,l=t.code,f=K(i),d=r?Ee(f):f,g=n==null?void 0:n.bold,x=n==null?void 0:n.italic,v=n==null?void 0:n.underline,D=n==null?void 0:n.code;return a&&g&&(d=g({children:d})),o&&x&&(d=x({children:d})),h&&v&&(d=v({children:d})),l&&D&&(d=D({children:d})),d}function rr(e){var r=e.element,t=e.references,n=e.renderers,i=r.children,a=r.type,o=xe(r,["children","type"]),h=o.nodeId,l=o.nodeType;if(a in te&&Le({children:i}))return"";var f=h&&l,d=f?t==null?void 0:t.filter(function(H){return H.id===h})[0]:null,g;if(f&&l!=="Asset"){var x,v,D=a==="link"?n==null||(x=n.link)==null?void 0:x[l]:n==null||(v=n.embed)==null?void 0:v[l];if(D!==void 0)g=D;else return console.warn("[@graphcms/rich-text-html-renderer]: No renderer found for custom "+a+" nodeType "+l+"."),""}if(f&&l==="Asset"){var I,j=n==null||(I=n.Asset)==null?void 0:I[d==null?void 0:d.mimeType];if(j!==void 0)g=j;else{var T,P=d==null?void 0:d.mimeType.split("/")[0];g=n==null||(T=n.Asset)==null?void 0:T[P]}}var _=f?g:n==null?void 0:n[Qe[a]];if(_){var z=R({},o,d),A=De({content:i,renderers:n,references:t,parent:r}).join("");return _(R({},z,{children:A}))}return""}function tr(e){var r=e.node,t=e.parent,n=e.references,i=e.renderers;if(ke(r)){var a=t&&re(t)&&t.type!=="code-block";return er({shouldSerialize:a,textNode:r,renderers:i})}return re(r)?rr({element:r,renderers:i,references:n}):(r.type,"")}function De(e){var r=e.content,t=e.parent,n=e.references,i=e.renderers,a=Ze(r);return a.map(function(o){return tr({node:o,parent:t||null,renderers:i,references:n})})}function we(e){var r=e.renderers,t=e.content,n=e.references,i=R({},E==null?void 0:E.Asset,r==null?void 0:r.Asset),a=R({},E,r,{Asset:i});return De({content:t,references:n,renderers:a}).join("")}function nr(e){var ne,ie,ae,le,oe,de,se,ce,ue,he;let r,t,n,i,a,o,h,l,f,d=((ie=(ne=e[1].data)==null?void 0:ne.dog)==null?void 0:ie.name)+"",g,x,v,D,I,j=((le=(ae=e[1].data)==null?void 0:ae.dog)==null?void 0:le.department)+"",T,P,_,z,A,H=((de=(oe=e[1].data)==null?void 0:oe.dog)==null?void 0:de.batch)+"",U,X,C,V,Y=we({content:(ce=(se=e[1].data)==null?void 0:se.dog)==null?void 0:ce.description.json,references:(he=(ue=e[1].data)==null?void 0:ue.dog)==null?void 0:he.description.references})+"";return{c(){r=b("div"),t=b("section"),n=b("figure"),i=b("img"),h=W(),l=b("div"),f=b("h1"),g=Q(d),x=W(),v=b("p"),D=Q("Department: "),I=b("b"),T=Q(j),P=W(),_=b("p"),z=Q("Batch: "),A=b("b"),U=Q(H),X=W(),C=b("div"),V=new Oe(!1),this.h()},l(c){r=m(c,"DIV",{});var u=k(r);t=m(u,"SECTION",{class:!0});var w=k(t);n=m(w,"FIGURE",{class:!0});var N=k(n);i=m(N,"IMG",{src:!0,alt:!0,class:!0}),N.forEach(y),h=$(w),l=m(w,"DIV",{class:!0});var S=k(l);f=m(S,"H1",{class:!0});var B=k(f);g=G(B,d),B.forEach(y),x=$(S),v=m(S,"P",{class:!0});var O=k(v);D=G(O,"Department: "),I=m(O,"B",{});var F=k(I);T=G(F,j),F.forEach(y),O.forEach(y),P=$(S),_=m(S,"P",{class:!0});var q=k(_);z=G(q,"Batch: "),A=m(q,"B",{});var M=k(A);U=G(M,H),M.forEach(y),q.forEach(y),S.forEach(y),w.forEach(y),X=$(u),C=m(u,"DIV",{class:!0});var L=k(C);V=qe(L,!1),L.forEach(y),u.forEach(y),this.h()},h(){var c,u,w,N;me(i.src,a=(u=(c=e[1].data)==null?void 0:c.dog)==null?void 0:u.picture.url)||p(i,"src",a),p(i,"alt",o="Dog - "+((N=(w=e[1].data)==null?void 0:w.dog)==null?void 0:N.name)),p(i,"class","aspect-square w-full object-cover"),p(n,"class","basis-[33%]"),p(f,"class","text-6xl font-bold leading-loose"),p(v,"class","text-muted-foreground text-3xl leading-normal"),p(_,"class","text-muted-foreground text-3xl leading-normal"),p(l,"class","flex-1"),p(t,"class","mt-2 flex gap-x-6"),V.a=null,p(C,"class","prose mt-3")},m(c,u){Pe(c,r,u),s(r,t),s(t,n),s(n,i),s(t,h),s(t,l),s(l,f),s(f,g),s(l,x),s(l,v),s(v,D),s(v,I),s(I,T),s(l,P),s(l,_),s(_,z),s(_,A),s(A,U),s(r,X),s(r,C),V.m(Y,C)},p(c,[u]){var w,N,S,B,O,F,q,M,L,fe,ve,ge,pe,be;u&2&&!me(i.src,a=(N=(w=c[1].data)==null?void 0:w.dog)==null?void 0:N.picture.url)&&p(i,"src",a),u&2&&o!==(o="Dog - "+((B=(S=c[1].data)==null?void 0:S.dog)==null?void 0:B.name))&&p(i,"alt",o),u&2&&d!==(d=((F=(O=c[1].data)==null?void 0:O.dog)==null?void 0:F.name)+"")&&Z(g,d),u&2&&j!==(j=((M=(q=c[1].data)==null?void 0:q.dog)==null?void 0:M.department)+"")&&Z(T,j),u&2&&H!==(H=((fe=(L=c[1].data)==null?void 0:L.dog)==null?void 0:fe.batch)+"")&&Z(U,H),u&2&&Y!==(Y=we({content:(ge=(ve=c[1].data)==null?void 0:ve.dog)==null?void 0:ge.description.json,references:(be=(pe=c[1].data)==null?void 0:pe.dog)==null?void 0:be.description.references})+"")&&V.p(Y)},i:ee,o:ee,d(c){c&&y(r)}}}function ir(e,r,t){let n,i,a=ee,o=()=>(a(),a=Ae(n,l=>t(1,i=l)),n);e.$$.on_destroy.push(()=>a());let{data:h}=r;return e.$$set=l=>{"data"in l&&t(2,h=l.data)},e.$$.update=()=>{e.$$.dirty&4&&o(t(0,n=h.Dog))},[n,i,h]}class cr extends He{constructor(r){super(),Ce(this,r,ir,nr,Te,{data:2})}}export{cr as component,sr as universal};
