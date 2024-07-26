var K=Object.defineProperty;var $=(r,e,n)=>e in r?K(r,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[e]=n;var h=(r,e,n)=>$(r,typeof e!="symbol"?e+"":e,n);import{A as d,D as A,d as L,m as k,a as F,c as _,b as O,k as R,l as C,g as M,f as q,e as g,h as B}from"./query.B5fy9Kw6.js";import"./session.nhK5e6A4.js";const H=r=>()=>({async network(e,{client:n,initialValue:t,resolve:i,marshalVariables:s}){if(e.artifact.kind===d.Fragment)return i(e,t);const o=e.fetch??globalThis.fetch,a={name:e.name,text:e.text,hash:e.hash,variables:s(e)},f=await J(n.url,e.fetchParams)({fetch:(c,u)=>{const p=U(a,u)??u;return o(c,p)},metadata:e.metadata,session:e.session||{},...a});i(e,{fetching:!1,variables:e.variables??{},data:f.data,errors:!f.errors||f.errors.length===0?null:f.errors,partial:!1,stale:!1,source:A.Network})}}),J=(r,e)=>{if(!r)throw new Error("Could not find configured client url. Please specify one in your HoudiniClient constructor.");return async({fetch:n,name:t,text:i,variables:s})=>await(await n(r,{method:"POST",body:JSON.stringify({operationName:t,query:i,variables:s}),...e,headers:{Accept:"application/graphql+json, application/json","Content-Type":"application/json",...e==null?void 0:e.headers}})).json()};function U(r,e){const{files:n}=Q({variables:r.variables});if(n.size){const t=e;let i={};if(t!=null&&t.headers){const l=Object.entries(t==null?void 0:t.headers).filter(([f,c])=>!(f.toLowerCase()=="content-type"&&c.toLowerCase()=="application/json"));i=Object.fromEntries(l)}const s=new FormData;e&&(e!=null&&e.body)?s.set("operations",e==null?void 0:e.body):s.set("operations",JSON.stringify({operationName:r.name,query:r.text,variables:r.variables}));const o={};let a=0;return n.forEach(l=>{o[++a]=l}),s.set("map",JSON.stringify(o)),a=0,n.forEach((l,f)=>{s.set(`${++a}`,f,f.name)}),{...t,headers:i,body:s}}}function W(r){return typeof File<"u"&&r instanceof File||typeof Blob<"u"&&r instanceof Blob}function Q(r){if(!arguments.length)throw new TypeError("Argument 1 `value` is required.");const e=new Map,n=new Map;function t(i,s,o){if(W(i)){const f=n.get(i);return f?f.push(s):n.set(i,[s]),null}const a=Array.isArray(i)||typeof FileList<"u"&&i instanceof FileList,l=V(i);if(a||l){let f=e.get(i);const c=!f;if(c&&(f=a?[]:i instanceof Object?{}:Object.create(null),e.set(i,f)),!o.has(i)){const u=s?`${s}.`:"",p=new Set(o).add(i);if(a){let y=0;for(const m of i){const b=t(m,u+y++,p);c&&f.push(b)}}else for(const y in i){const m=t(i[y],u+y,p);c&&(f[y]=m)}}return f}return i}return{clone:t(r,"",new Set),files:n}}function V(r){if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)}const E=(r,e)=>()=>{const n=e(),t=s=>s?(o,a)=>o.artifact.kind!==r?a.next(o):s(o,a):void 0,i=s=>s?(o,a)=>o.artifact.kind!==r?a.resolve(o):s(o,a):void 0;return{start:t(n.start),network:t(n.network),beforeNetwork:t(n.beforeNetwork),afterNetwork:i(n.afterNetwork),end:i(n.end),catch:n.catch?(s,o)=>n.catch(s,o):void 0,cleanup:(...s)=>{var o;return(o=n.cleanup)==null?void 0:o.call(n,...s)}}},z=r=>E(d.Query,function(){let e=null,n=null;return{start(t,{next:i}){var o;const s={session:t.session};t.variables={...n,...Object.fromEntries(Object.entries(((o=t.artifact.input)==null?void 0:o.runtimeScalars)??{}).map(([a,l])=>{var c,u;const f=(u=(c=t.config.features)==null?void 0:c.runtimeScalars)==null?void 0:u[l];return f?[a,f.resolve(s)]:[a,l]})),...t.variables},i(t)},end(t,{resolve:i,marshalVariables:s,variablesChanged:o}){var a,l;if(o(t)&&!((a=t.cacheParams)!=null&&a.disableSubscriptions)){e&&r.unsubscribe(e,((l=e.variables)==null?void 0:l.call(e))||{}),n={...s(t)};const f=n;e={rootType:t.artifact.rootType,selection:t.artifact.selection,variables:()=>f,set:c=>{i(t,{data:c,errors:null,fetching:!1,partial:!1,stale:!1,source:A.Cache,variables:t.variables??{}})}},r.subscribe(e,n)}i(t)},cleanup(){var t;e&&(r.unsubscribe(e,(t=e.variables)==null?void 0:t.call(e)),n=null)}}}),G=r=>E(d.Fragment,function(){let e=null,n=null;return{start(t,{next:i,resolve:s,variablesChanged:o,marshalVariables:a}){var f,c;if(!t.stuff.parentID)return i(t);const l={parent:t.stuff.parentID,variables:a(t)};if(!((f=t.cacheParams)!=null&&f.disableSubscriptions)&&(!L(n,l)||o(t))){e&&r.unsubscribe(e,((c=e.variables)==null?void 0:c.call(e))||{});const u=a(t);e={rootType:t.artifact.rootType,selection:t.artifact.selection,variables:()=>u,parentID:t.stuff.parentID,set:p=>{s(t,{data:p,errors:null,fetching:!1,partial:!1,stale:!1,source:A.Cache,variables:u})}},r.subscribe(e,u),n=l}i(t)},cleanup(){var t;e&&r.unsubscribe(e,(t=e.variables)==null?void 0:t.call(e))}}}),X=r=>E(d.Mutation,()=>({async start(e,{next:n,marshalVariables:t}){const i=r._internal_unstable.storage.createLayer(!0);let s=[];const o=e.stuff.optimisticResponse;o&&(s=r.write({selection:e.artifact.selection,data:await k({selection:e.artifact.selection,data:o}),variables:t(e),layer:i.id})),e.cacheParams={...e.cacheParams,layer:i,notifySubscribers:s,forceNotify:!0},n(e)},afterNetwork(e,{resolve:n}){var t;(t=e.cacheParams)!=null&&t.layer&&r.clearLayer(e.cacheParams.layer.id),n(e)},end(e,{resolve:n,value:t}){var s,o;t.errors&&t.errors.length>0&&(s=e.cacheParams)!=null&&s.layer&&r.clearLayer(e.cacheParams.layer.id),(o=e.cacheParams)!=null&&o.layer&&r._internal_unstable.storage.resolveLayer(e.cacheParams.layer.id),n(e)},catch(e,{error:n}){var t;if((t=e.cacheParams)!=null&&t.layer){const{layer:i}=e.cacheParams;r.clearLayer(i.id),r._internal_unstable.storage.resolveLayer(i.id)}throw n}})),Y=({operations:r,error:e})=>()=>{const n=r.includes("all"),t=i=>n||{[d.Query]:r.includes("query"),[d.Mutation]:r.includes("mutation"),[d.Fragment]:!1,[d.Subscription]:r.includes("subscription")}[i];return{async end(i,{value:s,resolve:o}){if(s.errors&&s.errors.length>0&&t(i.artifact.kind))throw await(e??Z)(s.errors,i);o(i)}}},Z=async r=>new Error(r.map(e=>e.message).join(". ")+"."),x=(r=()=>({}))=>()=>({start(e,{next:n,marshalVariables:t}){n({...e,fetchParams:r({config:e.config,policy:e.policy,metadata:e.metadata,session:e.session,stuff:e.stuff,document:e.artifact,variables:t(e),text:e.text,hash:e.hash})})}}),ee={},te={},T={},re=(r,e=te,n=ee,t=T,i=1)=>()=>({async start(s,{next:o}){const a=s.stuff.optimisticResponse,l={...s};a&&s.artifact.kind===d.Mutation&&s.artifact.optimisticKeys&&(l.stuff.mutationID=i++,v({selection:s.artifact.selection,response:a,callbackStore:e,keyStore:n,objectIDs:t,mutationID:l.stuff.mutationID}),l.stuff.optimisticResponse=a),o(l)},beforeNetwork(s,{next:o}){if(Object.keys(n).length===0)return o(s);const a=S(s.variables??{},e);if(Object.keys(a).length===0)return o(s);for(const l of Object.keys(a))e[l].push(f=>{a[l]=f,Object.values(a).every(c=>c!==null)&&o({...s,variables:I({...s.variables},a)})})},afterNetwork(s,{value:o,resolve:a}){s.artifact.kind===d.Mutation&&s.artifact.optimisticKeys&&typeof s.stuff.mutationID<"u"&&D(r,o.data??{},s.artifact.selection,n,s.stuff.mutationID,{onNewKey:(l,f)=>{e[l].forEach(c=>{c(f)}),delete e[l]},onIDChange:(l,f)=>r.registerKeyMap(l,f)}),a(s)},end(s,{resolve:o}){typeof s.stuff.mutationID<"u"&&(delete n[s.stuff.mutationID],delete t[s.stuff.mutationID]),o(s)}});function v(r){let e=F(r.selection,r.response.__typename,!1);const n=[];for(const[t,{type:i,selection:s,optimisticKey:o}]of Object.entries(e)){const a=r.response[t],l=`${r.path??""}.${t}`;if(o){let f;if(a){const{marshaled:c}=k({data:{marshaled:a},selection:{fields:{value:{type:i,keyRaw:"value"}}}});f=c}else f=ne(i);n.push(f),r.response[t]=f,r.callbackStore[f]=[],r.keyStore[r.mutationID]={[l]:f}}if(s)if(Array.isArray(a))for(const[f,c]of P(a).entries())c&&typeof c=="object"&&!Array.isArray(c)&&v({...r,selection:s,response:c,type:i,path:`${l}[${f}]`});else a&&typeof a=="object"&&v({...r,selection:s,response:a,type:i,path:l})}if(n.length>0){const t=`${r.type}:${_(O,r.type??"",r.response)}`;for(const i of n)r.objectIDs[r.mutationID]={...r.objectIDs[r.mutationID],[i]:t}}return r.response}function S(r,e,n={}){for(const t of Object.values(r))if(typeof t=="string"&&e[t]&&(n[t]=null),Array.isArray(t))for(const i of P(t))i&&typeof i=="object"&&S(i,e,n);else t&&typeof t=="object"&&S(t,e,n);return n}function D(r,e,n,t,i,s,o=T,a="",l=""){let f=F(n,e.__typename,!1),c=null;for(const[u,p]of Object.entries(e)){const y=`${a??""}.${u}`;if(typeof p=="string"&&t[i][y]){const w=t[i][y];s.onNewKey(w,p),c=o[i][w]}if(!n||!f[u])continue;let{type:m,selection:b}=f[u];if(Array.isArray(p))for(const[w,j]of P(p).entries())j&&typeof j=="object"&&b&&D(r,j,b,t,i,s,o,`${y}[${w}]`,m);else p&&typeof p=="object"&&b&&D(r,p,b,t,i,s,o,y,m)}if(c){const u=_(O,l,e);s.onIDChange(`${l}:${u}`,c),r.write({selection:{fields:Object.fromEntries(R(O,l).map(p=>[p,{type:"scalar",keyRaw:p}]))},parent:c,data:e})}}function P(r){const e=[],n=[...r];for(;n.length>0;){const t=n.shift();Array.isArray(t)?n.push(...t):e.push(t)}return e}function I(r,e){for(const[n,t]of Object.entries(r))if(typeof t=="string"&&e[t]&&(r[n]=e[t]),Array.isArray(t))for(const i of P(t))i&&typeof i=="object"&&I(i,e);else t&&typeof t=="object"&&I(t,e);return r}function ne(r){if(r==="Int")return new Date().getTime();if(r==="String")return new Date().getTime().toString();if(r==="ID")return new Date().getTime().toString();throw new Error(`unsupported type for optimistic key: ${r}. Please provide a value in your mutation arguments.`)}const ie=[];var se=ie;class oe{constructor({url:e,fetchParams:n,plugins:t,pipeline:i,throwOnError:s}={}){h(this,"url");h(this,"throwOnError_operations");h(this,"cache",null);h(this,"throwOnError");h(this,"fetchParams");h(this,"pipeline");h(this,"extraPlugins");h(this,"proxies",{});h(this,"componentCache",{});var a,l;if(t&&i)throw new Error("A client cannot be given a pipeline and a list of plugins at the same time.");this.throwOnError_operations=(s==null?void 0:s.operations)??[];let o=((l=(a=globalThis.process)==null?void 0:a.env)==null?void 0:l.HOUDINI_PORT)??"5173";this.url=e??(globalThis.window?"":`https://localhost:${o}`)+C(M()),this.throwOnError=s,this.fetchParams=n,this.pipeline=i,this.extraPlugins=t}setCache(e){this.cache=e}get plugins(){return q([].concat(this.throwOnError?[Y(this.throwOnError)]:[],x(this.fetchParams),this.pipeline??[re(this.cache??g),z(this.cache??g),X(this.cache??g),G(this.cache??g)].concat(this.extraPlugins??[],se,H())))}observe({enableCache:e=!0,fetching:n=!1,...t}){return new B({client:this,plugins:N(this.plugins),fetching:n,enableCache:e,cache:this.cache??void 0,...t})}registerProxy(e,n){this.proxies[e]=n}}function N(r){return r.reduce((e,n)=>{if(typeof n!="function")throw new Error("Encountered client plugin that's not a function");const t=n();if(!t)return e;if(!Array.isArray(t))return e.concat(t);for(const i of t)if(i){if(typeof i=="function")return e.concat(N([i]));e.push(i)}return e},[])}const ae=globalThis.__sveltekit_rkuywh.env,ue=new oe({url:ae.PUBLIC_API_URL});export{ue as default};
