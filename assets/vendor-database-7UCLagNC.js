import{o as e}from"./vendor-misc-IybOkyEH.js";import{_ as t}from"./educational-platform-DNToupFE.js";function n(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function s(e){if(Object.prototype.hasOwnProperty.call(e,"__esModule"))return e;var t=e.default;if("function"==typeof t){var n=function e(){var n=!1;try{n=this instanceof e}catch{}return n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(t){var s=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,s.get?s:{enumerable:!0,get:function(){return e[t]}})}),n}var i={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r=function(e){const t=[];let n=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&s+1<e.length&&56320==(64512&e.charCodeAt(s+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++s)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<e.length;i+=3){const t=e[i],r=i+1<e.length,o=r?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,h=t>>2,l=(3&t)<<4|o>>4;let u=(15&o)<<2|c>>6,d=63&c;a||(d=64,r||(u=64)),s.push(n[h],n[l],n[u],n[d])}return s.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(r(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,s=0;for(;n<e.length;){const i=e[n++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=e[n++];t[s++]=String.fromCharCode((31&i)<<6|63&r)}else if(i>239&&i<365){const r=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[s++]=String.fromCharCode(55296+(r>>10)),t[s++]=String.fromCharCode(56320+(1023&r))}else{const r=e[n++],o=e[n++];t[s++]=String.fromCharCode((15&i)<<12|(63&r)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],r=i<e.length?n[e.charAt(i)]:0;++i;const o=i<e.length?n[e.charAt(i)]:64;++i;const c=i<e.length?n[e.charAt(i)]:64;if(++i,null==t||null==r||null==o||null==c)throw new a;const h=t<<2|r>>4;if(s.push(h),64!==o){const e=r<<4&240|o>>2;if(s.push(e),64!==c){const e=o<<6&192|c;s.push(e)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class a extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const c=function(e){return function(e){const t=r(e);return o.encodeByteArray(t,!0)}(e).replace(/\./g,"")},h=function(e){try{return o.decodeString(e,!0)}catch(t){}return null};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const l=()=>
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,u=()=>{try{return l()||(()=>{if("undefined"==typeof process)return;const e=i.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&h(e[1]);return t&&JSON.parse(t)})()}catch(e){return}},d=e=>u()?.emulatorHosts?.[e],f=e=>{const t=d(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const s=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),s]:[t.substring(0,n),s]},p=()=>u()?.config,g=e=>u()?.[`_${e}`];
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let m=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}};
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function v(e){return(await fetch(e,{credentials:"include"})).ok}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",s=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...e};return[c(JSON.stringify({alg:"none",type:"JWT"})),c(JSON.stringify(r)),""].join(".")}const _={};let b=!1;function T(e,t){if("undefined"==typeof window||"undefined"==typeof document||!y(window.location.host)||_[e]===t||_[e]||b)return;function n(e){return`__firebase__banner__${e}`}_[e]=t;const s="__firebase__banner",i=function(){const e={prod:[],emulator:[]};for(const t of Object.keys(_))_[t]?e.emulator.push(t):e.prod.push(t);return e}().prod.length>0;function r(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{b=!0,function(){const e=document.getElementById(s);e&&e.remove()}()},e}function o(){const e=function(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}(s),t=n("text"),o=document.getElementById(t)||document.createElement("span"),a=n("learnmore"),c=document.getElementById(a)||document.createElement("a"),h=n("preprendIcon"),l=document.getElementById(h)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;!function(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}(t),function(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}(c,a);const n=r();!function(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}(l,h),t.append(l,o,c,n),document.body.appendChild(t)}i?(o.innerText="Preview backend disconnected.",l.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(l.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function S(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function E(){try{return"object"==typeof indexedDB}catch(e){return!1}}function I(){return new Promise((e,t)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}})}function C(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,A.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,P.prototype.create)}}class P{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],r=i?function(e,t){return e.replace(O,(e,n)=>{const s=t[n];return null!=s?String(s):`<${n}?>`})}(i,n):"Error",o=`${this.serviceName}: ${r} (${s}).`;return new A(s,o,n)}}const O=/\{\$([^}]+)}/g;function R(e,t){if(e===t)return!0;const n=Object.keys(e),s=Object.keys(t);for(const i of n){if(!s.includes(i))return!1;const n=e[i],r=t[i];if(j(n)&&j(r)){if(!R(n,r))return!1}else if(n!==r)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function j(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e){const t=[];for(const[n,s]of Object.entries(e))Array.isArray(s)?s.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}function D(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[n,s]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(s)}}),t}function L(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class x{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");s=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===s.next&&(s.next=U),void 0===s.error&&(s.error=U),void 0===s.complete&&(s.complete=U);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch(e){}}),this.observers.push(s),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!=typeof console&&console.error}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function U(){}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e,t=1e3,n=2){const s=t*Math.pow(n,e),i=Math.round(.5*s*(Math.random()-.5)*2);return Math.min(144e5,s+i)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e){return e&&e._delegate?e._delegate:e}class F{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new m;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:B})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:s});n.resolve(e)}catch(t){}}}}clearInstance(e=B){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=B){return this.instances.has(e)}getOptions(e=B){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,r]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(i)&&r.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=e,s===B?void 0:s),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var s;return n||null}normalizeInstanceIdentifier(e=B){return this.component?this.component.multipleInstances?e:B:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class H{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new V(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q,W;(W=q||(q={}))[W.DEBUG=0]="DEBUG",W[W.VERBOSE=1]="VERBOSE",W[W.INFO=2]="INFO",W[W.WARN=3]="WARN",W[W.ERROR=4]="ERROR",W[W.SILENT=5]="SILENT";const z={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},K=q.INFO,G={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},J=(e,t,...n)=>{if(t<e.logLevel)return;(new Date).toISOString();if(!G[t])throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class X{constructor(e){this.name=e,this._logLevel=K,this._logHandler=J,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?z[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===t?.type}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const Z="@firebase/app",Q="0.14.1",ee=new X("@firebase/app"),te="@firebase/app-compat",ne="@firebase/analytics-compat",se="@firebase/analytics",ie="@firebase/app-check-compat",re="@firebase/app-check",oe="@firebase/auth",ae="@firebase/auth-compat",ce="@firebase/database",he="@firebase/data-connect",le="@firebase/database-compat",ue="@firebase/functions",de="@firebase/functions-compat",fe="@firebase/installations",pe="@firebase/installations-compat",ge="@firebase/messaging",me="@firebase/messaging-compat",ye="@firebase/performance",ve="@firebase/performance-compat",we="@firebase/remote-config",_e="@firebase/remote-config-compat",be="@firebase/storage",Te="@firebase/storage-compat",ke="@firebase/firestore",Se="@firebase/ai",Ee="@firebase/firestore-compat",Ie="firebase",Ce="[DEFAULT]",Ae={[Z]:"fire-core",[te]:"fire-core-compat",[se]:"fire-analytics",[ne]:"fire-analytics-compat",[re]:"fire-app-check",[ie]:"fire-app-check-compat",[oe]:"fire-auth",[ae]:"fire-auth-compat",[ce]:"fire-rtdb",[he]:"fire-data-connect",[le]:"fire-rtdb-compat",[ue]:"fire-fn",[de]:"fire-fn-compat",[fe]:"fire-iid",[pe]:"fire-iid-compat",[ge]:"fire-fcm",[me]:"fire-fcm-compat",[ye]:"fire-perf",[ve]:"fire-perf-compat",[we]:"fire-rc",[_e]:"fire-rc-compat",[be]:"fire-gcs",[Te]:"fire-gcs-compat",[ke]:"fire-fst",[Ee]:"fire-fst-compat",[Se]:"fire-vertex","fire-js":"fire-js",[Ie]:"fire-js-all"},Pe=new Map,Oe=new Map,Re=new Map;function je(e,t){try{e.container.addComponent(t)}catch(n){ee.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Ne(e){const t=e.name;if(Re.has(t))return ee.debug(`There were multiple attempts to register component ${t}.`),!1;Re.set(t,e);for(const n of Pe.values())je(n,e);for(const n of Oe.values())je(n,e);return!0}function De(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Le(e){return null!=e&&void 0!==e.settings}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe=new P("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ue{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new F("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xe.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="12.1.0";function $e(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const s={name:Ce,automaticDataCollectionEnabled:!0,...t},i=s.name;if("string"!=typeof i||!i)throw xe.create("bad-app-name",{appName:String(i)});if(n||(n=p()),!n)throw xe.create("no-options");const r=Pe.get(i);if(r){if(R(n,r.options)&&R(s,r.config))return r;throw xe.create("duplicate-app",{appName:i})}const o=new H(i);for(const c of Re.values())o.addComponent(c);const a=new Ue(n,s,o);return Pe.set(i,a),a}function Fe(e=Ce){const t=Pe.get(e);if(!t&&e===Ce&&p())return $e();if(!t)throw xe.create("no-app",{appName:e});return t}function Be(e,t,n){let s=Ae[e]??e;n&&(s+=`-${n}`);const i=s.match(/\s|\//),r=t.match(/\s|\//);if(i||r){const e=[`Unable to register library "${s}" with version "${t}":`];return i&&e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&e.push("and"),r&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void ee.warn(e.join(" "))}Ne(new F(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ve="firebase-heartbeat-store";let He=null;function qe(){return He||(He=e("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Ve)}catch(n){}}}).catch(e=>{throw xe.create("idb-open",{originalErrorMessage:e.message})})),He}async function We(e,t){try{const n=(await qe()).transaction(Ve,"readwrite"),s=n.objectStore(Ve);await s.put(t,ze(e)),await n.done}catch(n){if(n instanceof A)ee.warn(n.message);else{const e=xe.create("idb-set",{originalErrorMessage:n?.message});ee.warn(e.message)}}}function ze(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Je(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=Ge();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let s=1;s<e.length;s++)e[s].date<n&&(n=e[s].date,t=s);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ee.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=Ge(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let s=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),Xe(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Xe(n)>t){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}(this._heartbeatsCache.heartbeats),s=c(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ee.warn(e),""}}}function Ge(){return(new Date).toISOString().substring(0,10)}class Je{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!E()&&I().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await qe()).transaction(Ve),n=await t.objectStore(Ve).get(ze(e));return await t.done,n}catch(t){if(t instanceof A)ee.warn(t.message);else{const e=xe.create("idb-get",{originalErrorMessage:t?.message});ee.warn(e.message)}}}(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return We(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return We(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function Xe(e){return c(JSON.stringify({version:2,heartbeats:e})).length}var Ye;function Ze(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}Ye="",Ne(new F("platform-logger",e=>new Y(e),"PRIVATE")),Ne(new F("heartbeat",e=>new Ke(e),"PRIVATE")),Be(Z,Q,Ye),Be(Z,Q,"esm2020"),Be("fire-js","");const Qe=Ze,et=new P("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),tt=new X("@firebase/auth");function nt(e,...t){tt.logLevel<=q.ERROR&&tt.error(`Auth (${Me}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(e,...t){throw at(e,...t)}function it(e,...t){return at(e,...t)}function rt(e,t,n){const s={...Qe(),[t]:n};return new P("auth","Firebase",s).create(t,{appName:e.name})}function ot(e){return rt(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function at(e,...t){if("string"!=typeof e){const n=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=e.name),e._errorFactory.create(n,...s)}return et.create(e,...t)}function ct(e,t,...n){if(!e)throw at(t,...n)}function ht(e){const t="INTERNAL ASSERTION FAILED: "+e;throw nt(t),new Error(t)}function lt(e,t){e||ht(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(){return"undefined"!=typeof self&&self.location?.href||""}function dt(){return"undefined"!=typeof self&&self.location?.protocol||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==dt()&&"https:"!==dt()&&!S()&&!("connection"in navigator)||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class pt{constructor(e,t){this.shortDelay=e,this.longDelay=t,lt(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(k())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return ft()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(e,t){lt(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},vt=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],wt=new pt(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function bt(e,t,n,s,i={}){return Tt(e,i,async()=>{let i={},r={};s&&("GET"===t?r=s:i={body:JSON.stringify(s)});const o=N({key:e.config.apiKey,...r}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:a,...i};return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&y(e.emulatorConfig.host)&&(c.credentials="include"),mt.fetch()(await St(e,e.config.apiHost,n,o),c)})}async function Tt(e,t,n){e._canInitEmulator=!1;const s={...yt,...t};try{const t=new It(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const r=await i.json();if("needConfirmation"in r)throw Ct(e,"account-exists-with-different-credential",r);if(i.ok&&!("errorMessage"in r))return r;{const t=i.ok?r.errorMessage:r.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Ct(e,"credential-already-in-use",r);if("EMAIL_EXISTS"===n)throw Ct(e,"email-already-in-use",r);if("USER_DISABLED"===n)throw Ct(e,"user-disabled",r);const a=s[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw rt(e,a,o);st(e,a)}}catch(i){if(i instanceof A)throw i;st(e,"network-request-failed",{message:String(i)})}}async function kt(e,t,n,s,i={}){const r=await bt(e,t,n,s,i);return"mfaPendingCredential"in r&&st(e,"multi-factor-auth-required",{_serverResponse:r}),r}async function St(e,t,n,s){const i=`${t}${n}?${s}`,r=e,o=r.config.emulator?gt(e.config,i):`${e.config.apiScheme}://${i}`;if(vt.includes(n)&&(await r._persistenceManagerAvailable,"COOKIE"===r._getPersistenceType())){return r._getPersistence()._getFinalTarget(o).toString()}return o}function Et(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class It{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(it(this.auth,"network-request-failed")),wt.get())})}}function Ct(e,t,n){const s={appName:e.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const i=it(e,t,s);return i.customData._tokenResponse=n,i}function At(e){return void 0!==e&&void 0!==e.enterprise}class Pt{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Et(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Ot(e,t){return bt(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function jt(e){return 1e3*Number(e)}function Nt(e){const[t,n,s]=e.split(".");if(void 0===t||void 0===n||void 0===s)return nt("JWT malformed, contained fewer than 3 sections"),null;try{const e=h(n);return e?JSON.parse(e):(nt("Failed to decode base64 JWT payload"),null)}catch(i){return nt("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Dt(e){const t=Nt(e);return ct(t,"internal-error"),ct(void 0!==t.exp,"internal-error"),ct(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lt(e,t,n=!1){if(n)return t;try{return await t}catch(s){throw s instanceof A&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(s)&&e.auth.currentUser===e&&await e.auth.signOut(),s}}class xt{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Rt(this.lastLoginAt),this.creationTime=Rt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mt(e){const t=e.auth,n=await e.getIdToken(),s=await Lt(e,Ot(t,{idToken:n}));ct(s?.users.length,t,"internal-error");const i=s.users[0];e._notifyReloadListener(i);const r=i.providerUserInfo?.length?$t(i.providerUserInfo):[],o=(a=e.providerData,c=r,[...a.filter(e=>!c.some(t=>t.providerId===e.providerId)),...c]);var a,c;const h=e.isAnonymous,l=!(e.email&&i.passwordHash||o?.length),u=!!h&&l,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Ut(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(e,d)}function $t(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ft{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ct(e.idToken,"internal-error"),ct(void 0!==e.idToken,"internal-error"),ct(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):Dt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ct(0!==e.length,"internal-error");const t=Dt(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(ct(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await async function(e,t){const n=await Tt(e,{},async()=>{const n=N({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=e.config,r=await St(e,s,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&y(e.emulatorConfig.host)&&(a.credentials="include"),mt.fetch()(r,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,r=new Ft;return n&&(ct("string"==typeof n,"internal-error",{appName:e}),r.refreshToken=n),s&&(ct("string"==typeof s,"internal-error",{appName:e}),r.accessToken=s),i&&(ct("number"==typeof i,"internal-error",{appName:e}),r.expirationTime=i),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ft,this.toJSON())}_performRefresh(){return ht("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(e,t){ct("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Vt{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new xt(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ut(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Lt(this,this.stsTokenManager.getToken(this.auth,e));return ct(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=$(e),s=await n.getIdToken(t),i=Nt(s);ct(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r="object"==typeof i.firebase?i.firebase:void 0,o=r?.sign_in_provider;return{claims:i,token:s,authTime:Rt(jt(i.auth_time)),issuedAtTime:Rt(jt(i.iat)),expirationTime:Rt(jt(i.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}(this,e)}reload(){return async function(e){const t=$(e);await Mt(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(ct(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Vt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){ct(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Mt(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Le(this.auth.app))return Promise.reject(ot(this.auth));const e=await this.getIdToken();return await Lt(this,
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){return bt(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,r=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:l,emailVerified:u,isAnonymous:d,providerData:f,stsTokenManager:p}=t;ct(l&&p,e,"internal-error");const g=Ft.fromJSON(this.name,p);ct("string"==typeof l,e,"internal-error"),Bt(n,e.name),Bt(s,e.name),ct("boolean"==typeof u,e,"internal-error"),ct("boolean"==typeof d,e,"internal-error"),Bt(i,e.name),Bt(r,e.name),Bt(o,e.name),Bt(a,e.name),Bt(c,e.name),Bt(h,e.name);const m=new Vt({uid:l,auth:e,email:s,emailVerified:u,displayName:n,isAnonymous:d,photoURL:r,phoneNumber:i,tenantId:o,stsTokenManager:g,createdAt:c,lastLoginAt:h});return f&&Array.isArray(f)&&(m.providerData=f.map(e=>({...e}))),a&&(m._redirectEventId=a),m}static async _fromIdTokenResponse(e,t,n=!1){const s=new Ft;s.updateFromServerResponse(t);const i=new Vt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Mt(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];ct(void 0!==s.localId,"internal-error");const i=void 0!==s.providerUserInfo?$t(s.providerUserInfo):[],r=!(s.email&&s.passwordHash||i?.length),o=new Ft;o.updateFromIdToken(n);const a=new Vt({uid:s.localId,auth:e,stsTokenManager:o,isAnonymous:r}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ut(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash||i?.length)};return Object.assign(a,c),a}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht=new Map;function qt(e){lt(e instanceof Function,"Expected a class definition");let t=Ht.get(e);return t?(lt(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Ht.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Wt.type="NONE";const zt=Wt;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(e,t,n){return`firebase:${e}:${t}:${n}`}class Gt{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=Kt(this.userKey,s.apiKey,i),this.fullPersistenceKey=Kt("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await Ot(this.auth,{idToken:e}).catch(()=>{});return t?Vt._fromGetAccountInfoResponse(this.auth,t,e):null}return Vt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Gt(qt(zt),e,n);const s=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let i=s[0]||qt(zt);const r=Kt(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(r);if(t){let n;if("string"==typeof t){const s=await Ot(e,{idToken:t}).catch(()=>{});if(!s)break;n=await Vt._fromGetAccountInfoResponse(e,s,t)}else n=Vt._fromJSON(e,t);c!==i&&(o=n),i=c;break}}catch{}const a=s.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(r,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(r)}catch{}})),new Gt(i,e,n)):new Gt(i,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Qt(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Xt(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(tn(t))return"Blackberry";if(nn(t))return"Webos";if(Yt(t))return"Safari";if((t.includes("chrome/")||Zt(t))&&!t.includes("edge/"))return"Chrome";if(en(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function Xt(e=k()){return/firefox\//i.test(e)}function Yt(e=k()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Zt(e=k()){return/crios\//i.test(e)}function Qt(e=k()){return/iemobile/i.test(e)}function en(e=k()){return/android/i.test(e)}function tn(e=k()){return/blackberry/i.test(e)}function nn(e=k()){return/webos/i.test(e)}function sn(e=k()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function rn(){return function(){const e=k();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function on(e=k()){return sn(e)||en(e)||nn(e)||tn(e)||/windows phone/i.test(e)||Qt(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function an(e,t=[]){let n;switch(e){case"Browser":n=Jt(k());break;case"Worker":n=`${Jt(k())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${Me}/${s}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,s)=>{try{n(e(t))}catch(i){s(i)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(s){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new dn(this),this.idTokenSubscription=new dn(this),this.beforeStateQueue=new cn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=et,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=qt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Gt.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(n){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await Ot(this,{idToken:e}),n=await Vt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Le(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,i=n?._redirectEventId,r=await this.tryRedirectSignIn(e);t&&t!==i||!r?.user||(n=r.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(i){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return ct(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Mt(e)}catch(t){if("auth/network-request-failed"!==t?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Le(this.app))return Promise.reject(ot(this));const t=e?$(e):null;return t&&ct(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ct(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Le(this.app)?Promise.reject(ot(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Le(this.app)?Promise.reject(ot(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(qt(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return bt(e,"GET","/v2/passwordPolicy",_t(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this),t=new hn(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new P("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return bt(e,"POST","/v2/accounts:revokeToken",_t(e,t))}(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&qt(e)||this._popupRedirectResolver;ct(t,this,"argument-error"),this.redirectPersistenceManager=await Gt.create(this,[qt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i="function"==typeof t?t:t.next.bind(t);let r=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(ct(o,this,"internal-error"),o.then(()=>{r||i(this.currentUser)}),"function"==typeof t){const i=e.addObserver(t,n,s);return()=>{r=!0,i()}}{const n=e.addObserver(t);return()=>{r=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ct(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=an(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(Le(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&function(e,...t){tt.logLevel<=q.WARN&&tt.warn(`Auth (${Me}): ${e}`,...t)}(`Error while retrieving App Check token: ${e.error}`),e?.token}}function un(e){return $(e)}class dn{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new x(e,t);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return ct(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function pn(e){return fn.loadJS(e)}class gn{constructor(){this.enterprise=new mn}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class mn{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const yn="NO_RECAPTCHA";class vn{constructor(e){this.type="recaptcha-enterprise",this.auth=un(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{(async function(e,t){return bt(e,"GET","/v2/recaptchaConfig",_t(e,t))})(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(s=>{if(void 0!==s.recaptchaKey){const n=new Pt(s);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function s(t,n,s){const i=window.grecaptcha;At(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(yn)})}):s(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new gn).execute("siteKey",{action:"verify"})}return new Promise((e,i)=>{n(this.auth).then(n=>{if(!t&&At(window.grecaptcha))s(n,e,i);else{if("undefined"==typeof window)return void i(new Error("RecaptchaVerifier is only supported in browser"));let t=fn.recaptchaEnterpriseScript;0!==t.length&&(t+=n),pn(t).then(()=>{s(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function wn(e,t,n,s=!1,i=!1){const r=new vn(e);let o;if(i)o=yn;else try{o=await r.verify(n)}catch(c){o=await r.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return s?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function _n(e,t,n,s,i){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await wn(e,t,n,"getOobCode"===n);return s(e,i)}return s(e,t).catch(async i=>{if("auth/missing-recaptcha-token"===i.code){const i=await wn(e,t,n,"getOobCode"===n);return s(e,i)}return Promise.reject(i)})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(e,t,n){const s=un(e);ct(/^https?:\/\//.test(t),s,"invalid-emulator-scheme");const i=Tn(t),{host:r,port:o}=function(e){const t=Tn(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const e=i[1];return{host:e,port:kn(s.substr(e.length+1))}}{const[e,t]=s.split(":");return{host:e,port:kn(t)}}}(t),a=null===o?"":`:${o}`,c={url:`${i}//${r}${a}/`},h=Object.freeze({host:r,port:o,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:!1})});if(!s._canInitEmulator)return ct(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),void ct(R(c,s.config.emulator)&&R(h,s.emulatorConfig),s,"emulator-config-failed");s.config.emulator=c,s.emulatorConfig=h,s.settings.appVerificationDisabledForTesting=!0,y(r)?(v(`${i}//${r}${a}`),T("Auth",!0)):function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&console.info;"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function Tn(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function kn(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class Sn{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ht("not implemented")}_getIdTokenResponse(e){return ht("not implemented")}_linkToIdToken(e,t){return ht("not implemented")}_getReauthenticationResolver(e){return ht("not implemented")}}async function En(e,t){return bt(e,"POST","/v1/accounts:signUp",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function In(e,t){return kt(e,"POST","/v1/accounts:signInWithPassword",_t(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cn extends Sn{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Cn(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Cn(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return _n(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",In);case"emailLink":return async function(e,t){return kt(e,"POST","/v1/accounts:signInWithEmailLink",_t(e,t))}(e,{email:this._email,oobCode:this._password});default:st(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return _n(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",En);case"emailLink":return async function(e,t){return kt(e,"POST","/v1/accounts:signInWithEmailLink",_t(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:st(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function An(e,t){return kt(e,"POST","/v1/accounts:signInWithIdp",_t(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn extends Sn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Pn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):st("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const r=new Pn(n,s);return r.idToken=i.idToken||void 0,r.accessToken=i.accessToken||void 0,r.secret=i.secret,r.nonce=i.nonce,r.pendingToken=i.pendingToken||null,r}_getIdTokenResponse(e){return An(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,An(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,An(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=N(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e){const t=D(L(e)),n=t.apiKey??null,s=t.oobCode??null,i=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);ct(n&&s&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=function(e){const t=D(L(e)).link,n=t?D(L(t)).deep_link_id:null,s=D(L(e)).deep_link_id;return(s?D(L(s)).link:null)||s||n||t||e}(e);try{return new On(t)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(){this.providerId=Rn.PROVIDER_ID}static credential(e,t){return Cn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=On.parseLink(t);return ct(n,"argument-error"),Cn._fromEmailAndCode(e,n.code,n.tenantId)}}Rn.PROVIDER_ID="password",Rn.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Rn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn extends jn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn extends Nn{constructor(){super("facebook.com")}static credential(e){return Pn._fromParams({providerId:Dn.PROVIDER_ID,signInMethod:Dn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dn.credentialFromTaggedObject(e)}static credentialFromError(e){return Dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Dn.credential(e.oauthAccessToken)}catch{return null}}}Dn.FACEBOOK_SIGN_IN_METHOD="facebook.com",Dn.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ln extends Nn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Pn._fromParams({providerId:Ln.PROVIDER_ID,signInMethod:Ln.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ln.credentialFromTaggedObject(e)}static credentialFromError(e){return Ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Ln.credential(t,n)}catch{return null}}}Ln.GOOGLE_SIGN_IN_METHOD="google.com",Ln.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xn extends Nn{constructor(){super("github.com")}static credential(e){return Pn._fromParams({providerId:xn.PROVIDER_ID,signInMethod:xn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return xn.credentialFromTaggedObject(e)}static credentialFromError(e){return xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return xn.credential(e.oauthAccessToken)}catch{return null}}}xn.GITHUB_SIGN_IN_METHOD="github.com",xn.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Un extends Nn{constructor(){super("twitter.com")}static credential(e,t){return Pn._fromParams({providerId:Un.PROVIDER_ID,signInMethod:Un.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Un.credentialFromTaggedObject(e)}static credentialFromError(e){return Un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Un.credential(t,n)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Mn(e,t){return kt(e,"POST","/v1/accounts:signUp",_t(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Un.TWITTER_SIGN_IN_METHOD="twitter.com",Un.PROVIDER_ID="twitter.com";class $n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await Vt._fromIdTokenResponse(e,n,s),r=Fn(n);return new $n({user:i,providerId:r,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=Fn(n);return new $n({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function Fn(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends A{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Bn.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Bn(e,t,n,s)}}function Vn(e,t,n,s){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Bn._fromErrorAndOperation(e,n,t,s);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Hn(e,t,n=!1){if(Le(e.app))return Promise.reject(ot(e));const s="signIn",i=await Vn(e,s,t),r=await $n._fromIdTokenResponse(e,s,i);return n||await e._updateCurrentUser(r.user),r}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function qn(e){const t=un(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function Wn(e,t,n){if(Le(e.app))return Promise.reject(ot(e));const s=un(e),i=_n(s,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Mn),r=await i.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&qn(e),t}),o=await $n._fromIdTokenResponse(s,"signIn",r);return await s._updateCurrentUser(o.user),o}function zn(e,t,n){return Le(e.app)?Promise.reject(ot(e)):async function(e,t){return Hn(un(e),t)}($(e),Rn.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&qn(e),t})}function Kn(e,t,n,s){return $(e).onAuthStateChanged(t,n,s)}function Gn(e){return $(e).signOut()}const Jn="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Jn,"1"),this.storage.removeItem(Jn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn extends Xn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=on(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);rn()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,10):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Yn.type="LOCAL";const Zn=Yn;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn extends Xn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Qn.type="SESSION";const es=Qn;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ts{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new ts(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,r=this.handlersMap[s];if(!r?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const o=Array.from(r).map(async e=>e(t.origin,i)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ns(e="",t=10){let n="";for(let s=0;s<t;s++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ts.receivers=[];class ss{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,r;return new Promise((o,a)=>{const c=ns("",20);s.port1.start();const h=setTimeout(()=>{a(new Error("unsupported_event"))},n);r={messageChannel:s,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(h),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(r),s.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{r&&this.removeMessageHandler(r)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function is(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function rs(){return void 0!==is().WorkerGlobalScope&&"function"==typeof is().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const os="firebaseLocalStorageDb",as="firebaseLocalStorage",cs="fbase_key";class hs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ls(e,t){return e.transaction([as],t?"readwrite":"readonly").objectStore(as)}function us(){const e=indexedDB.open(os,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(as,{keyPath:cs})}catch(s){n(s)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(as)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(os);return new hs(e).toPromise()}(),t(await us()))})})}async function ds(e,t,n){const s=ls(e,!0).put({[cs]:t,value:n});return new hs(s).toPromise()}function fs(e,t){const n=ls(e,!0).delete(t);return new hs(n).toPromise()}class ps{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await us()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return rs()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ts._getInstance(rs()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await async function(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new ss(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&(navigator?.serviceWorker?.controller||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await us();return await ds(e,Jn,"1"),await fs(e,Jn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ds(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=ls(e,!1).get(t),s=await new hs(n).toPromise();return void 0===s?null:s.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>fs(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=ls(e,!1).getAll();return new hs(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}ps.type="LOCAL";const gs=ps;new pt(3e4,6e4);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ms extends Sn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return An(e,this._buildIdpRequest())}_linkToIdToken(e,t){return An(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return An(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ys(e){return Hn(e.auth,new ms(e),e.bypassAuthState)}function vs(e){const{auth:t,user:n}=e;return ct(n,t,"internal-error"),
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t,n=!1){const{auth:s}=e;if(Le(s.app))return Promise.reject(ot(s));const i="reauthenticate";try{const r=await Lt(e,Vn(s,i,t,e),n);ct(r.idToken,s,"internal-error");const o=Nt(r.idToken);ct(o,s,"internal-error");const{sub:a}=o;return ct(e.uid===a,s,"user-mismatch"),$n._forOperation(e,i,r)}catch(r){throw"auth/user-not-found"===r?.code&&st(s,"user-mismatch"),r}}(n,new ms(e),e.bypassAuthState)}async function ws(e){const{auth:t,user:n}=e;return ct(n,t,"internal-error"),async function(e,t,n=!1){const s=await Lt(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return $n._forOperation(e,"link",s)}(n,new ms(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:r,type:o}=e;if(r)return void this.reject(r);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ys;case"linkViaPopup":case"linkViaRedirect":return ws;case"reauthViaPopup":case"reauthViaRedirect":return vs;default:st(this.auth,"internal-error")}}resolve(e){lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bs=new pt(2e3,1e4);class Ts extends _s{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Ts.currentPopupAction&&Ts.currentPopupAction.cancel(),Ts.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ct(e,this.auth,"internal-error"),e}async onExecution(){lt(1===this.filter.length,"Popup operations only handle one event");const e=ns();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(it(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(it(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ts.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(it(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,bs.get())};e()}}Ts.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ks="pendingRedirect",Ss=new Map;class Es extends _s{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Ss.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return Kt(ks,e.config.apiKey,e.name)}(t),s=function(e){return qt(e._redirectPersistence)}(e);if(!(await s._isAvailable()))return!1;const i="true"===await s._get(n);return await s._remove(n),i}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Ss.set(this.auth._key(),e)}return this.bypassAuthState||Ss.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function Is(e,t){Ss.set(e._key(),t)}async function Cs(e,t,n=!1){if(Le(e.app))return Promise.reject(ot(e));const s=un(e),i=
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){return t?qt(t):(ct(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}(s,t),r=new Es(s,i,n),o=await r.execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,t)),o}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Os(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Os(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(it(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ps(e))}saveEventToCache(e){this.cachedEventUids.add(Ps(e)),this.lastProcessedEventTime=Date.now()}}function Ps(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function Os({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Rs=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,js=/^https?/;async function Ns(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return bt(e,"GET","/v1/projects",t)}(e);for(const n of t)try{if(Ds(n))return}catch{}st(e,"unauthorized-domain")}function Ds(e){const t=ut(),{protocol:n,hostname:s}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===s?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===s}if(!js.test(n))return!1;if(Rs.test(e))return s===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls=new pt(3e4,6e4);function xs(){const e=is().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function Us(e){return new Promise((t,n)=>{function s(){xs(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{xs(),n(it(e,"network-request-failed"))},timeout:Ls.get()})}if(is().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!is().gapi?.load){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return is()[t]=()=>{gapi.load?s():n(it(e,"network-request-failed"))},pn(`${fn.gapiScript}?onload=${t}`).catch(e=>n(e))}s()}}).catch(e=>{throw Ms=null,e})}let Ms=null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $s=new pt(5e3,15e3),Fs={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Bs=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Vs(e){const t=e.config;ct(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?gt(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,s={apiKey:t.apiKey,appName:e.name,v:Me},i=Bs.get(e.config.apiHost);i&&(s.eid=i);const r=e._getFrameworks();return r.length&&(s.fw=r.join(",")),`${n}?${N(s).slice(1)}`}async function Hs(e){const t=await function(e){return Ms=Ms||Us(e),Ms}(e),n=is().gapi;return ct(n,e,"internal-error"),t.open({where:document.body,url:Vs(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fs,dontclear:!0},t=>new Promise(async(n,s)=>{await t.restyle({setHideOnLeave:!1});const i=it(e,"network-request-failed"),r=is().setTimeout(()=>{s(i)},$s.get());function o(){is().clearTimeout(r),n(t)}t.ping(o).then(o,()=>{s(i)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Ws{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function zs(e,t,n,s=500,i=600){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...qs,width:s.toString(),height:i.toString(),top:r,left:o},h=k().toLowerCase();n&&(a=Zt(h)?"_blank":n),Xt(h)&&(t=t||"http://localhost",c.scrollbars="yes");const l=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=k()){return sn(e)&&!!window.navigator?.standalone}(h)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",a),new Ws(null);const u=window.open(t||"",a,l);ct(u,e,"popup-blocked");try{u.focus()}catch(d){}return new Ws(u)}const Ks="__/auth/handler",Gs="emulator/auth/handler",Js=encodeURIComponent("fac");async function Xs(e,t,n,s,i,r){ct(e.config.authDomain,e,"auth-domain-config-required"),ct(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:Me,eventId:i};if(t instanceof jn){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof Nn){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const l of Object.keys(a))void 0===a[l]&&delete a[l];const c=await e._getAppCheckToken(),h=c?`#${Js}=${encodeURIComponent(c)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${Ks}`;return gt(e,Gs)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}?${N(a).slice(1)}${h}`}const Ys="webStorageSupport";const Zs=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=es,this._completeRedirectFn=Cs,this._overrideRedirectResult=Is}async _openPopup(e,t,n,s){lt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");return zs(e,await Xs(e,t,n,ut(),s),ns())}async _openRedirect(e,t,n,s){await this._originValidation(e);return function(e){is().location.href=e}(await Xs(e,t,n,ut(),s)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(lt(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Hs(e),n=new As(e);return t.register("authEvent",t=>{ct(t?.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ys,{type:Ys},n=>{const s=n?.[0]?.[Ys];void 0!==s&&t(!!s),st(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ns(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return on()||Yt()||sn()}};var Qs="@firebase/auth",ei="1.11.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ti{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ct(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ni=g("authIdTokenMaxAge")||300;let si=null;function ii(e=Fe()){const t=De(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=De(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(R(n.getOptions(),t??{}))return e;st(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:Zs,persistence:[gs,Zn,es]}),s=g("authTokenSyncURL");if(s&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(s,location.origin);if(location.origin===e.origin){const t=(i=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>ni)return;const s=t?.token;si!==s&&(si=s,await fetch(i,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))});!function(e,t,n){$(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e,t,n,s){$(e).onIdTokenChanged(t,n,s)}(n,e=>t(e))}}var i;const r=d("auth");return r&&bn(n,`http://${r}`),n}var ri;fn={loadJS:e=>new Promise((t,n)=>{const s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=e=>{const t=it("internal-error");t.customData=e,n(t)},s.type="text/javascript",s.charset="UTF-8",(document.getElementsByTagName("head")?.[0]??document).appendChild(s)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},ri="Browser",Ne(new F("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:r,authDomain:o}=n.options;ct(r&&!r.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:r,authDomain:o,clientPlatform:ri,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:an(ri)},c=new ln(n,s,i,a);return function(e,t){const n=t?.persistence||[],s=(Array.isArray(n)?n:[n]).map(qt);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(s,t?.popupRedirectResolver)}(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Ne(new F("auth-internal",e=>{const t=un(e.getProvider("auth").getImmediate());return new ti(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Be(Qs,ei,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(ri)),Be(Qs,ei,"esm2020");const oi="@firebase/installations",ai="0.6.19",ci=1e4,hi=`w:${ai}`,li="FIS_v2",ui=36e5,di=new P("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function fi(e){return e instanceof A&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pi({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function gi(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function mi(e,t){const n=(await t.json()).error;return di.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function yi({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function vi(e,{refreshToken:t}){const n=yi(e);return n.append("Authorization",function(e){return`${li} ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function wi(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _i(e){return new Promise(t=>{setTimeout(t,e)})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const bi=/^[cdef][\w-]{21}$/;function Ti(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return bi.test(t)?t:""}catch{return""}}function ki(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si=new Map;function Ei(e,t){const n=ki(e);Ii(n,t),function(e,t){const n=function(){!Ci&&"BroadcastChannel"in self&&(Ci=new BroadcastChannel("[Firebase] FID Change"),Ci.onmessage=e=>{Ii(e.data.key,e.data.fid)});return Ci}();n&&n.postMessage({key:e,fid:t});0===Si.size&&Ci&&(Ci.close(),Ci=null)}(n,t)}function Ii(e,t){const n=Si.get(e);if(n)for(const s of n)s(t)}let Ci=null;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ai="firebase-installations-store";let Pi=null;function Oi(){return Pi||(Pi=e("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(Ai)}})),Pi}async function Ri(e,t){const n=ki(e),s=(await Oi()).transaction(Ai,"readwrite"),i=s.objectStore(Ai),r=await i.get(n);return await i.put(t,n),await s.done,r&&r.fid===t.fid||Ei(e,t.fid),t}async function ji(e){const t=ki(e),n=(await Oi()).transaction(Ai,"readwrite");await n.objectStore(Ai).delete(t),await n.done}async function Ni(e,t){const n=ki(e),s=(await Oi()).transaction(Ai,"readwrite"),i=s.objectStore(Ai),r=await i.get(n),o=t(r);return void 0===o?await i.delete(n):await i.put(o,n),await s.done,!o||r&&r.fid===o.fid||Ei(e,o.fid),o}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Di(e){let t;const n=await Ni(e.appConfig,n=>{const s=function(e){const t=e||{fid:Ti(),registrationStatus:0};return Ui(t)}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(di.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},s=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const s=pi(e),i=yi(e),r=t.getImmediate({optional:!0});if(r){const e=await r.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={fid:n,authVersion:li,appId:e.appId,sdkVersion:hi},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await wi(()=>fetch(s,a));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:gi(e.authToken)}}throw await mi("Create Installation",c)}(e,t);return Ri(e.appConfig,n)}catch(n){throw fi(n)&&409===n.customData.serverCode?await ji(e.appConfig):await Ri(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:s}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Li(e)}:{installationEntry:t}}(e,s);return t=i.registrationPromise,i.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Li(e){let t=await xi(e.appConfig);for(;1===t.registrationStatus;)await _i(100),t=await xi(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await Di(e);return n||t}return t}function xi(e){return Ni(e,e=>{if(!e)throw di.create("installation-not-found");return Ui(e)})}function Ui(e){return 1===(t=e).registrationStatus&&t.registrationTime+ci<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function Mi({appConfig:e,heartbeatServiceProvider:t},n){const s=function(e,{fid:t}){return`${pi(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),i=vi(e,n),r=t.getImmediate({optional:!0});if(r){const e=await r.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={installation:{sdkVersion:hi,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await wi(()=>fetch(s,a));if(c.ok){return gi(await c.json())}throw await mi("Generate Auth Token",c)}async function $i(e,t=!1){let n;const s=await Ni(e.appConfig,s=>{if(!Bi(s))throw di.create("not-registered");const i=s.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+ui}(e)}(i))return s;if(1===i.requestStatus)return n=async function(e,t){let n=await Fi(e.appConfig);for(;1===n.authToken.requestStatus;)await _i(100),n=await Fi(e.appConfig);const s=n.authToken;return 0===s.requestStatus?$i(e,t):s}(e,t),s;{if(!navigator.onLine)throw di.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}(s);return n=async function(e,t){try{const n=await Mi(e,t),s={...t,authToken:n};return await Ri(e.appConfig,s),n}catch(n){if(!fi(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await Ri(e.appConfig,n)}else await ji(e.appConfig);throw n}}(e,t),t}});return n?await n:s.authToken}function Fi(e){return Ni(e,e=>{if(!Bi(e))throw di.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+ci<Date.now()?{...e,authToken:{requestStatus:0}}:e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */})}function Bi(e){return void 0!==e&&2===e.registrationStatus}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Vi(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await Di(e);t&&await t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n);return(await $i(n,t)).token}function Hi(e){return di.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qi="installations",Wi=e=>{const t=De(e.getProvider("app").getImmediate(),qi).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:s}=await Di(t);return s?s.catch(console.error):$i(t).catch(console.error),n.fid}(t),getToken:e=>Vi(t,e)}};Ne(new F(qi,e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw Hi("App Configuration");if(!e.name)throw Hi("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Hi(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:De(t,"heartbeat"),_delete:()=>Promise.resolve()}},"PUBLIC")),Ne(new F("installations-internal",Wi,"PRIVATE")),Be(oi,ai),Be(oi,ai,"esm2020");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const zi="analytics",Ki="https://www.googletagmanager.com/gtag/js",Gi=new X("@firebase/analytics"),Ji=new P("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Xi(e){if(!e.startsWith(Ki)){const t=Ji.create("invalid-gtag-resource",{gtagURL:e});return Gi.warn(t.message),""}return e}function Yi(e){return Promise.all(e.map(e=>e.catch(e=>e)))}function Zi(e,t){const n=function(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}("firebase-js-sdk-policy",{createScriptURL:Xi}),s=document.createElement("script"),i=`${Ki}?l=${e}&id=${t}`;s.src=n?n?.createScriptURL(i):i,s.async=!0,document.head.appendChild(s)}function Qi(e,t,n,s){return async function(i,...r){try{if("event"===i){const[s,i]=r;await async function(e,t,n,s,i){try{let r=[];if(i&&i.send_to){let e=i.send_to;Array.isArray(e)||(e=[e]);const s=await Yi(n);for(const n of e){const e=s.find(e=>e.measurementId===n),i=e&&t[e.appId];if(!i){r=[];break}r.push(i)}}0===r.length&&(r=Object.values(t)),await Promise.all(r),e("event",s,i||{})}catch(r){Gi.error(r)}}(e,t,n,s,i)}else if("config"===i){const[i,o]=r;await async function(e,t,n,s,i,r){const o=s[i];try{if(o)await t[o];else{const e=(await Yi(n)).find(e=>e.measurementId===i);e&&await t[e.appId]}}catch(a){Gi.error(a)}e("config",i,r)}(e,t,n,s,i,o)}else if("consent"===i){const[t,n]=r;e("consent",t,n)}else if("get"===i){const[t,n,s]=r;e("get",t,n,s)}else if("set"===i){const[t]=r;e("set",t)}else e(i,...r)}catch(o){Gi.error(o)}}}const er=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};function tr(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function nr(e,t=er,n){const{appId:s,apiKey:i,measurementId:r}=e.options;if(!s)throw Ji.create("no-app-id");if(!i){if(r)return{measurementId:r,appId:s};throw Ji.create("no-api-key")}const o=t.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new ir;return setTimeout(async()=>{a.abort()},6e4),sr({appId:s,apiKey:i,measurementId:r},o,a,t)}async function sr(e,{throttleEndTimeMillis:t,backoffCount:n},s,i=er){const{appId:r,measurementId:o}=e;try{await function(e,t){return new Promise((n,s)=>{const i=Math.max(t-Date.now(),0),r=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(r),s(Ji.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}(s,t)}catch(a){if(o)return Gi.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${a?.message}]`),{appId:r,measurementId:o};throw a}try{const t=await async function(e){const{appId:t,apiKey:n}=e,s={method:"GET",headers:tr(n)},i="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",t),r=await fetch(i,s);if(200!==r.status&&304!==r.status){let e="";try{const t=await r.json();t.error?.message&&(e=t.error.message)}catch(o){}throw Ji.create("config-fetch-failed",{httpStatus:r.status,responseMessage:e})}return r.json()}(e);return i.deleteThrottleMetadata(r),t}catch(a){const t=a;if(!function(e){if(!(e instanceof A&&e.customData))return!1;const t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(t)){if(i.deleteThrottleMetadata(r),o)return Gi.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${t?.message}]`),{appId:r,measurementId:o};throw a}const c=503===Number(t?.customData?.httpStatus)?M(n,i.intervalMillis,30):M(n,i.intervalMillis),h={throttleEndTimeMillis:Date.now()+c,backoffCount:n+1};return i.setThrottleMetadata(r,h),Gi.debug(`Calling attemptFetch again in ${c} millis`),sr(e,h,s,i)}}class ir{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function rr(e,t,n,s,i,r,o){const a=nr(e);a.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Gi.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>Gi.error(e)),t.push(a);const c=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(){if(!E())return Gi.warn(Ji.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await I()}catch(e){return Gi.warn(Ji.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}return!0}().then(e=>e?s.getId():void 0),[h,l]=await Promise.all([a,c]);(function(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Ki)&&n.src.includes(e))return n;return null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)(r)||Zi(r,h.measurementId),i("js",new Date);const u=o?.config??{};return u.origin="firebase",u.update=!0,null!=l&&(u.firebase_id=l),i("config",h.measurementId,u),h.measurementId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e){this.app=e}_delete(){return delete ar[this.app.options.appId],Promise.resolve()}}let ar={},cr=[];const hr={};let lr,ur,dr="dataLayer",fr=!1;function pr(e,t,n){!function(){const e=[];if(S()&&e.push("This is a browser extension environment."),C()||e.push("Cookies are not available."),e.length>0){const t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=Ji.create("invalid-analytics-context",{errorInfo:t});Gi.warn(n.message)}}();const s=e.options.appId;if(!s)throw Ji.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw Ji.create("no-api-key");Gi.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=ar[s])throw Ji.create("already-exists",{id:s});if(!fr){!function(e){let t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(dr);const{wrappedGtag:e,gtagCore:t}=function(e,t,n,s,i){let r=function(...e){window[s].push(arguments)};return window[i]&&"function"==typeof window[i]&&(r=window[i]),window[i]=Qi(r,e,t,n),{gtagCore:r,wrappedGtag:window[i]}}(ar,cr,hr,dr,"gtag");ur=e,lr=t,fr=!0}ar[s]=rr(e,cr,hr,t,lr,dr,n);return new or(e)}function gr(e=Fe()){const t=De(e=$(e),zi);return t.isInitialized()?t.getImmediate():function(e,t={}){const n=De(e,zi);if(n.isInitialized()){const e=n.getImmediate();if(R(t,n.getOptions()))return e;throw Ji.create("already-initialized")}const s=n.initialize({options:t});return s}(e)}async function mr(){if(S())return!1;if(!C())return!1;if(!E())return!1;try{return await I()}catch(e){return!1}}const yr="@firebase/analytics",vr="0.10.18";Ne(new F(zi,(e,{options:t})=>pr(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t),"PUBLIC")),Ne(new F("analytics-internal",function(e){try{const t=e.getProvider(zi).getImmediate();return{logEvent:(e,n,s)=>function(e,t,n,s){e=$(e),async function(e,t,n,s,i){if(i&&i.global)e("event",n,s);else{const i=await t;e("event",n,{...s,send_to:i})}}(ur,ar[e.app.options.appId],t,n,s).catch(e=>Gi.error(e))}(t,e,n,s)}}catch(t){throw Ji.create("interop-component-reg-failed",{reason:t})}},"PRIVATE")),Be(yr,vr),Be(yr,vr,"esm2020");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Be("firebase","12.1.0","app");var wr,_r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function n(e,t,n){n||(n=0);var s=Array(16);if("string"==typeof t)for(var i=0;16>i;++i)s[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;16>i;++i)s[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];var r=e.g[3],o=t+(r^n&(i^r))+s[0]+3614090360&4294967295;o=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=(n=(i=(r=(t=n+(o<<7&4294967295|o>>>25))+((o=r+(i^t&(n^i))+s[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^r&(t^n))+s[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^i&(r^t))+s[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=t+(r^n&(i^r))+s[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=r+(i^t&(n^i))+s[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^r&(t^n))+s[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^i&(r^t))+s[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=t+(r^n&(i^r))+s[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=r+(i^t&(n^i))+s[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^r&(t^n))+s[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^i&(r^t))+s[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=t+(r^n&(i^r))+s[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=r+(i^t&(n^i))+s[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=i+(n^r&(t^n))+s[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=n+(t^i&(r^t))+s[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=t+(i^r&(n^i))+s[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=r+(n^i&(t^n))+s[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=i+(t^n&(r^t))+s[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=n+(r^t&(i^r))+s[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=t+(i^r&(n^i))+s[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=r+(n^i&(t^n))+s[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=i+(t^n&(r^t))+s[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=n+(r^t&(i^r))+s[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=t+(i^r&(n^i))+s[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=r+(n^i&(t^n))+s[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=i+(t^n&(r^t))+s[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=n+(r^t&(i^r))+s[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=t+(i^r&(n^i))+s[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=r+(n^i&(t^n))+s[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=i+(t^n&(r^t))+s[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=n+(r^t&(i^r))+s[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=t+(n^i^r)+s[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=r+(t^n^i)+s[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=i+(r^t^n)+s[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^r^t)+s[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^i^r)+s[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=r+(t^n^i)+s[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=i+(r^t^n)+s[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^r^t)+s[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^i^r)+s[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=r+(t^n^i)+s[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=i+(r^t^n)+s[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^r^t)+s[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=t+(n^i^r)+s[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=r+(t^n^i)+s[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=i+(r^t^n)+s[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=n+(i^r^t)+s[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=t+(i^(n|~r))+s[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=r+(n^(t|~i))+s[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=i+(t^(r|~n))+s[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=n+(r^(i|~t))+s[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=t+(i^(n|~r))+s[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=r+(n^(t|~i))+s[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=i+(t^(r|~n))+s[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=n+(r^(i|~t))+s[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=t+(i^(n|~r))+s[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=r+(n^(t|~i))+s[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=i+(t^(r|~n))+s[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=n+(r^(i|~t))+s[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((r=(t=n+((o=t+(i^(n|~r))+s[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=r+(n^(t|~i))+s[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((i=r+((o=i+(t^(r|~n))+s[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~t))+s[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+r&4294967295}function s(e,t){this.h=t;for(var n=[],s=!0,i=e.length-1;0<=i;i--){var r=0|e[i];s&&r==t||(n[i]=r,s=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.D=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.C=function(e,n,s){for(var i=Array(arguments.length-2),r=2;r<arguments.length;r++)i[r-2]=arguments[r];return t.prototype[n].apply(e,i)}}(t,function(){this.blockSize=-1}),t.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.u=function(e,t){void 0===t&&(t=e.length);for(var s=t-this.blockSize,i=this.B,r=this.h,o=0;o<t;){if(0==r)for(;o<=s;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(i[r++]=e.charCodeAt(o++),r==this.blockSize){n(this,i),r=0;break}}else for(;o<t;)if(i[r++]=e[o++],r==this.blockSize){n(this,i),r=0;break}}this.h=r,this.o+=t},t.prototype.v=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.o;for(t=e.length-8;t<e.length;++t)e[t]=255&n,n/=256;for(this.u(e),e=Array(16),t=n=0;4>t;++t)for(var s=0;32>s;s+=8)e[n++]=this.g[t]>>>s&255;return e};var i={};function r(e){return-128<=e&&128>e?function(e,t){var n=i;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new s([0|e],0>e?-1:0)}):new s([0|e],0>e?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(0>e)return d(o(-e));for(var t=[],n=1,i=0;e>=n;i++)t[i]=e/n|0,n*=4294967296;return new s(t,0)}var a=r(0),c=r(1),h=r(16777216);function l(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function u(e){return-1==e.h}function d(e){for(var t=e.g.length,n=[],i=0;i<t;i++)n[i]=~e.g[i];return new s(n,~e.h).add(c)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function g(e,t){this.g=e,this.h=t}function m(e,t){if(l(t))throw Error("division by zero");if(l(e))return new g(a,a);if(u(e))return t=m(d(e),t),new g(d(t.g),d(t.h));if(u(t))return t=m(e,d(t)),new g(d(t.g),t.h);if(30<e.g.length){if(u(e)||u(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,s=t;0>=s.l(e);)n=y(n),s=y(s);var i=v(n,1),r=v(s,1);for(s=v(s,2),n=v(n,2);!l(s);){var h=r.add(s);0>=h.l(e)&&(i=i.add(n),r=h),s=v(s,1),n=v(n,1)}return t=f(e,i.j(t)),new g(i,t)}for(i=a;0<=e.l(t);){for(n=Math.max(1,Math.floor(e.m()/t.m())),s=48>=(s=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,s-48),h=(r=o(n)).j(t);u(h)||0<h.l(e);)h=(r=o(n-=s)).j(t);l(r)&&(r=c),i=i.add(r),e=f(e,h)}return new g(i,e)}function y(e){for(var t=e.g.length+1,n=[],i=0;i<t;i++)n[i]=e.i(i)<<1|e.i(i-1)>>>31;return new s(n,e.h)}function v(e,t){var n=t>>5;t%=32;for(var i=e.g.length-n,r=[],o=0;o<i;o++)r[o]=0<t?e.i(o+n)>>>t|e.i(o+n+1)<<32-t:e.i(o+n);return new s(r,e.h)}(e=s.prototype).m=function(){if(u(this))return-d(this).m();for(var e=0,t=1,n=0;n<this.g.length;n++){var s=this.i(n);e+=(0<=s?s:4294967296+s)*t,t*=4294967296}return e},e.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(l(this))return"0";if(u(this))return"-"+d(this).toString(e);for(var t=o(Math.pow(e,6)),n=this,s="";;){var i=m(n,t).g,r=((0<(n=f(n,i.j(t))).g.length?n.g[0]:n.h)>>>0).toString(e);if(l(n=i))return r+s;for(;6>r.length;)r="0"+r;s=r+s}},e.i=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return u(e=f(this,e))?-1:l(e)?0:1},e.abs=function(){return u(this)?d(this):this},e.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0,r=0;r<=t;r++){var o=i+(65535&this.i(r))+(65535&e.i(r)),a=(o>>>16)+(this.i(r)>>>16)+(e.i(r)>>>16);i=a>>>16,o&=65535,a&=65535,n[r]=a<<16|o}return new s(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(l(this)||l(e))return a;if(u(this))return u(e)?d(this).j(d(e)):d(d(this).j(e));if(u(e))return d(this.j(d(e)));if(0>this.l(h)&&0>e.l(h))return o(this.m()*e.m());for(var t=this.g.length+e.g.length,n=[],i=0;i<2*t;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(var r=0;r<e.g.length;r++){var c=this.i(i)>>>16,f=65535&this.i(i),g=e.i(r)>>>16,m=65535&e.i(r);n[2*i+2*r]+=f*m,p(n,2*i+2*r),n[2*i+2*r+1]+=c*m,p(n,2*i+2*r+1),n[2*i+2*r+1]+=f*g,p(n,2*i+2*r+1),n[2*i+2*r+2]+=c*g,p(n,2*i+2*r+2)}for(i=0;i<t;i++)n[i]=n[2*i+1]<<16|n[2*i];for(i=t;i<2*t;i++)n[i]=0;return new s(n,0)},e.A=function(e){return m(this,e).h},e.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)&e.i(i);return new s(n,this.h&e.h)},e.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)|e.i(i);return new s(n,this.h|e.h)},e.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],i=0;i<t;i++)n[i]=this.i(i)^e.i(i);return new s(n,this.h^e.h)},t.prototype.digest=t.prototype.v,t.prototype.reset=t.prototype.s,t.prototype.update=t.prototype.u,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.A,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=o,s.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var s=o(Math.pow(n,8)),i=a,r=0;r<t.length;r+=8){var c=Math.min(8,t.length-r),h=parseInt(t.substring(r,r+c),n);8>c?(c=o(Math.pow(n,c)),i=i.j(c).add(o(h))):i=(i=i.j(s)).add(o(h))}return i},wr=s}).apply(void 0!==_r?_r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var br="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};(function(){var e,t="function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,n){return e==Array.prototype||e==Object.prototype||(e[t]=n.value),e};var n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof br&&br];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(e,s){if(s)e:{var i=n;e=e.split(".");for(var r=0;r<e.length-1;r++){var o=e[r];if(!(o in i))break e;i=i[o]}(s=s(r=i[e=e[e.length-1]]))!=r&&null!=s&&t(i,e,{configurable:!0,writable:!0,value:s})}}("Array.prototype.values",function(e){return e||function(){return function(e,t){e instanceof String&&(e+="");var n=0,s=!1,i={next:function(){if(!s&&n<e.length){var i=n++;return{value:t(i,e[i]),done:!1}}return s=!0,{done:!0,value:void 0}}};return i[Symbol.iterator]=function(){return i},i}(this,function(e,t){return t})}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var s=s||{},i=this||self;function r(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){if(!e)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,s),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function h(e,t,n){return(h=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?a:c).apply(null,arguments)}function l(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function u(e,t){function n(){}n.prototype=t.prototype,e.aa=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Qb=function(e,n,s){for(var i=Array(arguments.length-2),r=2;r<arguments.length;r++)i[r-2]=arguments[r];return t.prototype[n].apply(e,i)}}function d(e){const t=e.length;if(0<t){const n=Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}return[]}function f(e,t){for(let n=1;n<arguments.length;n++){const t=arguments[n];if(r(t)){const n=e.length||0,s=t.length||0;e.length=n+s;for(let i=0;i<s;i++)e[n+i]=t[i]}else e.push(t)}}function p(e){return/^[\s\xa0]*$/.test(e)}function g(){var e=i.navigator;return e&&(e=e.userAgent)?e:""}function m(e){return m[" "](e),e}m[" "]=function(){};var y=!(-1==g().indexOf("Gecko")||-1!=g().toLowerCase().indexOf("webkit")&&-1==g().indexOf("Edge")||-1!=g().indexOf("Trident")||-1!=g().indexOf("MSIE")||-1!=g().indexOf("Edge"));function v(e,t,n){for(const s in e)t.call(n,e[s],s,e)}function w(e){const t={};for(const n in e)t[n]=e[n];return t}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(e,t){let n,s;for(let i=1;i<arguments.length;i++){for(n in s=arguments[i],s)e[n]=s[n];for(let t=0;t<_.length;t++)n=_[t],Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}}function T(e){var t=1;e=e.split(":");const n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function k(e){i.setTimeout(()=>{throw e},0)}function S(){var e=P;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var E=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new I,e=>e.reset());class I{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let C,A=!1,P=new class{constructor(){this.h=this.g=null}add(e,t){const n=E.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},O=()=>{const e=i.Promise.resolve(void 0);C=()=>{e.then(R)}};var R=()=>{for(var e;e=S();){try{e.h.call(e.g)}catch(n){k(n)}var t=E;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}A=!1};function j(){this.s=this.s,this.C=this.C}function N(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}j.prototype.s=!1,j.prototype.ma=function(){this.s||(this.s=!0,this.N())},j.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},N.prototype.h=function(){this.defaultPrevented=!0};var D=function(){if(!i.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};i.addEventListener("test",e,t),i.removeEventListener("test",e,t)}catch(n){}return e}();function L(e,t){if(N.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,s=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(y){e:{try{m(t.nodeName);var i=!0;break e}catch(r){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:x[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&L.aa.h.call(this)}}u(L,N);var x={2:"touch",3:"pen",4:"mouse"};L.prototype.h=function(){L.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var U="closure_listenable_"+(1e6*Math.random()|0),M=0;function $(e,t,n,s,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!s,this.ha=i,this.key=++M,this.da=this.fa=!1}function F(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function B(e){this.src=e,this.g={},this.h=0}function V(e,t){var n=t.type;if(n in e.g){var s,i=e.g[n],r=Array.prototype.indexOf.call(i,t,void 0);(s=0<=r)&&Array.prototype.splice.call(i,r,1),s&&(F(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function H(e,t,n,s){for(var i=0;i<e.length;++i){var r=e[i];if(!r.da&&r.listener==t&&r.capture==!!n&&r.ha==s)return i}return-1}B.prototype.add=function(e,t,n,s,i){var r=e.toString();(e=this.g[r])||(e=this.g[r]=[],this.h++);var o=H(e,t,s,i);return-1<o?(t=e[o],n||(t.fa=!1)):((t=new $(t,this.src,r,!!s,i)).fa=n,e.push(t)),t};var q="closure_lm_"+(1e6*Math.random()|0),W={};function z(e,t,n,s,i){if(Array.isArray(t)){for(var r=0;r<t.length;r++)z(e,t[r],n,s,i);return null}return n=Q(n),e&&e[U]?e.K(t,n,!!o(s)&&!!s.capture,i):function(e,t,n,s,i,r){if(!t)throw Error("Invalid event type");var a=o(i)?!!i.capture:!!i,c=Y(e);if(c||(e[q]=c=new B(e)),n=c.add(t,n,s,a,r),n.proxy)return n;if(s=function(){function e(n){return t.call(e.src,e.listener,n)}const t=X;return e}(),n.proxy=s,s.src=e,s.listener=n,e.addEventListener)D||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),s,i);else if(e.attachEvent)e.attachEvent(J(t.toString()),s);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(s)}return n}(e,t,n,!1,s,i)}function K(e,t,n,s,i){if(Array.isArray(t))for(var r=0;r<t.length;r++)K(e,t[r],n,s,i);else s=o(s)?!!s.capture:!!s,n=Q(n),e&&e[U]?(e=e.i,(t=String(t).toString())in e.g&&(-1<(n=H(r=e.g[t],n,s,i))&&(F(r[n]),Array.prototype.splice.call(r,n,1),0==r.length&&(delete e.g[t],e.h--)))):e&&(e=Y(e))&&(t=e.g[t.toString()],e=-1,t&&(e=H(t,n,s,i)),(n=-1<e?t[e]:null)&&G(n))}function G(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[U])V(t.i,e);else{var n=e.type,s=e.proxy;t.removeEventListener?t.removeEventListener(n,s,e.capture):t.detachEvent?t.detachEvent(J(n),s):t.addListener&&t.removeListener&&t.removeListener(s),(n=Y(t))?(V(n,e),0==n.h&&(n.src=null,t[q]=null)):F(e)}}}function J(e){return e in W?W[e]:W[e]="on"+e}function X(e,t){if(e.da)e=!0;else{t=new L(t,this);var n=e.listener,s=e.ha||e.src;e.fa&&G(e),e=n.call(s,t)}return e}function Y(e){return(e=e[q])instanceof B?e:null}var Z="__closure_events_fn_"+(1e9*Math.random()>>>0);function Q(e){return"function"==typeof e?e:(e[Z]||(e[Z]=function(t){return e.handleEvent(t)}),e[Z])}function ee(){j.call(this),this.i=new B(this),this.M=this,this.F=null}function te(e,t){var n,s=e.F;if(s)for(n=[];s;s=s.F)n.push(s);if(e=e.M,s=t.type||t,"string"==typeof t)t=new N(t,e);else if(t instanceof N)t.target=t.target||e;else{var i=t;b(t=new N(s,e),i)}if(i=!0,n)for(var r=n.length-1;0<=r;r--){var o=t.g=n[r];i=ne(o,s,!0,t)&&i}if(i=ne(o=t.g=e,s,!0,t)&&i,i=ne(o,s,!1,t)&&i,n)for(r=0;r<n.length;r++)i=ne(o=t.g=n[r],s,!1,t)&&i}function ne(e,t,n,s){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,r=0;r<t.length;++r){var o=t[r];if(o&&!o.da&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.fa&&V(e.i,o),i=!1!==a.call(c,s)&&i}}return i&&!s.defaultPrevented}function se(e,t,n){if("function"==typeof e)n&&(e=h(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=h(e.handleEvent,e)}return 2147483647<Number(t)?-1:i.setTimeout(e,t||0)}function ie(e){e.g=se(()=>{e.g=null,e.i&&(e.i=!1,ie(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}u(ee,j),ee.prototype[U]=!0,ee.prototype.removeEventListener=function(e,t,n,s){K(this,e,t,n,s)},ee.prototype.N=function(){if(ee.aa.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],s=0;s<n.length;s++)F(n[s]);delete t.g[e],t.h--}}this.F=null},ee.prototype.K=function(e,t,n,s){return this.i.add(String(e),t,!1,n,s)},ee.prototype.L=function(e,t,n,s){return this.i.add(String(e),t,!0,n,s)};class re extends j{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:ie(this)}N(){super.N(),this.g&&(i.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function oe(e){j.call(this),this.h=e,this.g={}}u(oe,j);var ae=[];function ce(e){v(e.g,function(e,t){this.g.hasOwnProperty(t)&&G(e)},e),e.g={}}oe.prototype.N=function(){oe.aa.N.call(this),ce(this)},oe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var he=i.JSON.stringify,le=i.JSON.parse,ue=class{stringify(e){return i.JSON.stringify(e,void 0)}parse(e){return i.JSON.parse(e,void 0)}};function de(){}function fe(e){return e.h||(e.h=e.i())}de.prototype.h=null;var pe={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ge(){N.call(this,"d")}function me(){N.call(this,"c")}u(ge,N),u(me,N);var ye={},ve=null;function we(){return ve=ve||new ee}function _e(e){N.call(this,ye.La,e)}function be(e){const t=we();te(t,new _e(t))}function Te(e,t){N.call(this,ye.STAT_EVENT,e),this.stat=t}function ke(e){const t=we();te(t,new Te(t,e))}function Se(e,t){N.call(this,ye.Ma,e),this.size=t}function Ee(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return i.setTimeout(function(){e()},t)}function Ie(){this.g=!0}function Ce(e,t,n,s){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var s=n[e];if(!(2>s.length)){var i=s[1];if(Array.isArray(i)&&!(1>i.length)){var r=i[0];if("noop"!=r&&"stop"!=r&&"close"!=r)for(var o=1;o<i.length;o++)i[o]=""}}}return he(n)}catch(a){return t}}(e,n)+(s?" "+s:"")})}ye.La="serverreachability",u(_e,N),ye.STAT_EVENT="statevent",u(Te,N),ye.Ma="timingevent",u(Se,N),Ie.prototype.xa=function(){this.g=!1},Ie.prototype.info=function(){};var Ae,Pe={NO_ERROR:0,TIMEOUT:8};function Oe(){}function Re(e,t,n,s){this.j=e,this.i=t,this.l=n,this.R=s||1,this.U=new oe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new je}function je(){this.i=null,this.g="",this.h=!1}u(Oe,de),Oe.prototype.g=function(){return new XMLHttpRequest},Oe.prototype.i=function(){return{}},Ae=new Oe;var Ne={},De={};function Le(e,t,n){e.L=1,e.v=at(nt(t)),e.m=n,e.P=!0,xe(e,null)}function xe(e,t){e.F=Date.now(),$e(e),e.A=nt(e.v);var n=e.A,s=e.R;Array.isArray(s)||(s=[String(s)]),_t(n.i,"t",s),e.C=0,n=e.j.J,e.h=new je,e.g=cn(e.j,n?t:null,!e.m),0<e.O&&(e.M=new re(h(e.Y,e,e.g),e.O)),t=e.U,n=e.g,s=e.ca;var i="readystatechange";Array.isArray(i)||(i&&(ae[0]=i.toString()),i=ae);for(var r=0;r<i.length;r++){var o=z(n,i[r],s||t.handleEvent,!1,t.h||t);if(!o)break;t.g[o.key]=o}t=e.H?w(e.H):{},e.m?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),be(),function(e,t,n,s,i,r){e.info(function(){if(e.g)if(r)for(var o="",a=r.split("&"),c=0;c<a.length;c++){var h=a[c].split("=");if(1<h.length){var l=h[0];h=h[1];var u=l.split("_");o=2<=u.length&&"type"==u[1]?o+(l+"=")+h+"&":o+(l+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+s+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.u,e.A,e.l,e.R,e.m)}function Ue(e){return!!e.g&&("GET"==e.u&&2!=e.L&&e.j.Ca)}function Me(e,t){var n=e.C,s=t.indexOf("\n",n);return-1==s?De:(n=Number(t.substring(n,s)),isNaN(n)?Ne:(s+=1)+n>t.length?De:(t=t.slice(s,s+n),e.C=s+n,t))}function $e(e){e.S=Date.now()+e.I,Fe(e,e.I)}function Fe(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=Ee(h(e.ba,e),t)}function Be(e){e.B&&(i.clearTimeout(e.B),e.B=null)}function Ve(e){0==e.j.G||e.J||nn(e.j,e)}function He(e){Be(e);var t=e.M;t&&"function"==typeof t.ma&&t.ma(),e.M=null,ce(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ma())}function qe(e,t){try{var n=e.j;if(0!=n.G&&(n.g==e||Je(n.h,e)))if(!e.K&&Je(n.h,e)&&3==n.G){try{var s=n.Da.g.parse(t)}catch(l){s=null}if(Array.isArray(s)&&3==s.length){var i=s;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;tn(n),Wt(n)}Zt(n),ke(18)}}else n.za=i[1],0<n.za-n.T&&37500>i[2]&&n.F&&0==n.v&&!n.C&&(n.C=Ee(h(n.Za,n),6e3));if(1>=Ge(n.h)&&n.ca){try{n.ca()}catch(l){}n.ca=void 0}}else rn(n,11)}else if((e.K||n.g==e)&&tn(n),!p(t))for(i=n.Da.g.parse(t),t=0;t<i.length;t++){let h=i[t];if(n.T=h[0],h=h[1],2==n.G)if("c"==h[0]){n.K=h[1],n.ia=h[2];const t=h[3];null!=t&&(n.la=t,n.j.info("VER="+n.la));const i=h[4];null!=i&&(n.Aa=i,n.j.info("SVER="+n.Aa));const l=h[5];null!=l&&"number"==typeof l&&0<l&&(s=1.5*l,n.L=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const u=e.g;if(u){const e=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var r=s.h;r.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(r.j=r.l,r.g=new Set,r.h&&(Xe(r,r.h),r.h=null))}if(s.D){const e=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(s.ya=e,ot(s.I,s.D,e))}}n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-e.F,n.j.info("Handshake RTT: "+n.R+"ms"));var o=e;if((s=n).qa=an(s,s.J?s.ia:null,s.W),o.K){Ye(s.h,o);var a=o,c=s.L;c&&(a.I=c),a.B&&(Be(a),$e(a)),s.g=o}else Yt(s);0<n.i.length&&Kt(n)}else"stop"!=h[0]&&"close"!=h[0]||rn(n,7);else 3==n.G&&("stop"==h[0]||"close"==h[0]?"stop"==h[0]?rn(n,7):qt(n):"noop"!=h[0]&&n.l&&n.l.ta(h),n.v=0)}be()}catch(l){}}Re.prototype.ca=function(e){e=e.target;const t=this.M;t&&3==Ft(e)?t.j():this.Y(e)},Re.prototype.Y=function(e){try{if(e==this.g)e:{const d=Ft(this.g);var t=this.g.Ba();this.g.Z();if(!(3>d)&&(3!=d||this.g&&(this.h.h||this.g.oa()||Bt(this.g)))){this.J||4!=d||7==t||be(),Be(this);var n=this.g.Z();this.X=n;t:if(Ue(this)){var s=Bt(this.g);e="";var r=s.length,o=4==Ft(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){He(this),Ve(this);var a="";break t}this.h.i=new i.TextDecoder}for(t=0;t<r;t++)this.h.h=!0,e+=this.h.i.decode(s[t],{stream:!(o&&t==r-1)});s.length=0,this.h.g+=e,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(e,t,n,s,i,r,o){e.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+r+" "+o})}(this.i,this.u,this.A,this.l,this.R,d,n),this.o){if(this.T&&!this.K){t:{if(this.g){var c,h=this.g;if((c=h.g?h.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(c)){var l=c;break t}}l=null}if(!(n=l)){this.o=!1,this.s=3,ke(12),He(this),Ve(this);break e}Ce(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,qe(this,n)}if(this.P){let e;for(n=!0;!this.J&&this.C<a.length;){if(e=Me(this,a),e==De){4==d&&(this.s=4,ke(14),n=!1),Ce(this.i,this.l,null,"[Incomplete Response]");break}if(e==Ne){this.s=4,ke(15),Ce(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}Ce(this.i,this.l,e,null),qe(this,e)}if(Ue(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=d||0!=a.length||this.h.h||(this.s=1,ke(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var u=this.j;u.g==this&&u.ba&&!u.M&&(u.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),Qt(u),u.M=!0,ke(11))}}else Ce(this.i,this.l,a,"[Invalid Chunked Response]"),He(this),Ve(this)}else Ce(this.i,this.l,a,null),qe(this,a);4==d&&He(this),this.o&&!this.J&&(4==d?nn(this.j,this):(this.o=!1,$e(this)))}else(function(e){const t={};e=(e.g&&2<=Ft(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let s=0;s<e.length;s++){if(p(e[s]))continue;var n=T(e[s]);const i=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const r=t[i]||[];t[i]=r,r.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,ke(12)):(this.s=0,ke(13)),He(this),Ve(this)}}}catch(d){}},Re.prototype.cancel=function(){this.J=!0,He(this)},Re.prototype.ba=function(){this.B=null;const e=Date.now();0<=e-this.S?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.A),2!=this.L&&(be(),ke(17)),He(this),this.s=2,Ve(this)):Fe(this,this.S-e)};var We=class{constructor(e,t){this.g=e,this.map=t}};function ze(e){this.l=e||10,i.PerformanceNavigationTiming?e=0<(e=i.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(i.chrome&&i.chrome.loadTimes&&i.chrome.loadTimes()&&i.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ke(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Ge(e){return e.h?1:e.g?e.g.size:0}function Je(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Xe(e,t){e.g?e.g.add(t):e.h=t}function Ye(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Ze(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return d(e.i)}function Qe(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(r(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.na&&"function"==typeof e.na)return e.na();if(!e.V||"function"!=typeof e.V){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(r(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const s in e)t[n++]=s;return t}}}(e),s=function(e){if(e.V&&"function"==typeof e.V)return e.V();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(r(e)){for(var t=[],n=e.length,s=0;s<n;s++)t.push(e[s]);return t}for(s in t=[],n=0,e)t[n++]=e[s];return t}(e),i=s.length,o=0;o<i;o++)t.call(void 0,s[o],n&&n[o],e)}ze.prototype.cancel=function(){if(this.i=Ze(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var et=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tt(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof tt){this.h=e.h,st(this,e.j),this.o=e.o,this.g=e.g,it(this,e.s),this.l=e.l;var t=e.i,n=new mt;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),rt(this,n),this.m=e.m}else e&&(t=String(e).match(et))?(this.h=!1,st(this,t[1]||"",!0),this.o=ct(t[2]||""),this.g=ct(t[3]||"",!0),it(this,t[4]),this.l=ct(t[5]||"",!0),rt(this,t[6]||"",!0),this.m=ct(t[7]||"")):(this.h=!1,this.i=new mt(null,this.h))}function nt(e){return new tt(e)}function st(e,t,n){e.j=n?ct(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function it(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.s=t}else e.s=null}function rt(e,t,n){t instanceof mt?(e.i=t,function(e,t){t&&!e.j&&(yt(e),e.i=null,e.g.forEach(function(e,t){var n=t.toLowerCase();t!=n&&(vt(this,t),_t(this,n,e))},e)),e.j=t}(e.i,e.h)):(n||(t=ht(t,pt)),e.i=new mt(t,e.h))}function ot(e,t,n){e.i.set(t,n)}function at(e){return ot(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function ct(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function ht(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,lt),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function lt(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}tt.prototype.toString=function(){var e=[],t=this.j;t&&e.push(ht(t,ut,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(ht(t,ut,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(ht(n,"/"==n.charAt(0)?ft:dt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",ht(n,gt)),e.join("")};var ut=/[#\/\?@]/g,dt=/[#\?:]/g,ft=/[#\?]/g,pt=/[#\?@]/g,gt=/#/g;function mt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function yt(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var s=e[n].indexOf("="),i=null;if(0<=s){var r=e[n].substring(0,s);i=e[n].substring(s+1)}else r=e[n];t(r,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function vt(e,t){yt(e),t=bt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function wt(e,t){return yt(e),t=bt(e,t),e.g.has(t)}function _t(e,t,n){vt(e,t),0<n.length&&(e.i=null,e.g.set(bt(e,t),d(n)),e.h+=n.length)}function bt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function Tt(e,t,n,s,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),s(n)}catch(r){}}function kt(){this.g=new ue}function St(e,t,n){const s=n||"";try{Qe(e,function(e,n){let i=e;o(e)&&(i=he(e)),t.push(s+n+"="+encodeURIComponent(i))})}catch(i){throw t.push(s+"type="+encodeURIComponent("_badmap")),i}}function Et(e){this.l=e.Ub||null,this.j=e.eb||!1}function It(e,t){ee.call(this),this.D=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function Ct(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}function At(e){e.readyState=4,e.l=null,e.j=null,e.v=null,Pt(e)}function Pt(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function Ot(e){let t="";return v(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function Rt(e,t,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=Ot(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):ot(e,t,n))}function jt(e){ee.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(e=mt.prototype).add=function(e,t){yt(this),this.i=null,e=bt(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){yt(this),this.g.forEach(function(n,s){n.forEach(function(n){e.call(t,n,s,this)},this)},this)},e.na=function(){yt(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let s=0;s<t.length;s++){const i=e[s];for(let e=0;e<i.length;e++)n.push(t[s])}return n},e.V=function(e){yt(this);let t=[];if("string"==typeof e)wt(this,e)&&(t=t.concat(this.g.get(bt(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},e.set=function(e,t){return yt(this),this.i=null,wt(this,e=bt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&0<(e=this.V(e)).length?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var s=t[n];const r=encodeURIComponent(String(s)),o=this.V(s);for(s=0;s<o.length;s++){var i=r;""!==o[s]&&(i+="="+encodeURIComponent(String(o[s]))),e.push(i)}}return this.i=e.join("&")},u(Et,de),Et.prototype.g=function(){return new It(this.l,this.j)},Et.prototype.i=function(e){return function(){return e}}({}),u(It,ee),(e=It.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=t,this.readyState=1,Pt(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||i).fetch(new Request(this.A,t)).then(this.Sa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,At(this)),this.readyState=0},e.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Pt(this)),this.g&&(this.readyState=3,Pt(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==i.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ct(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))},e.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.v.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?At(this):Pt(this),3==this.readyState&&Ct(this)}},e.Ra=function(e){this.g&&(this.response=this.responseText=e,At(this))},e.Qa=function(e){this.g&&(this.response=e,At(this))},e.ga=function(){this.g&&At(this)},e.setRequestHeader=function(e,t){this.u.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(It.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),u(jt,ee);var Nt=/^https?$/i,Dt=["POST","PUT"];function Lt(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.m=5,xt(e),Mt(e)}function xt(e){e.A||(e.A=!0,te(e,"complete"),te(e,"error"))}function Ut(e){if(e.h&&void 0!==s&&(!e.v[1]||4!=Ft(e)||2!=e.Z()))if(e.u&&4==Ft(e))se(e.Ea,0,e);else if(te(e,"readystatechange"),4==Ft(e)){e.h=!1;try{const s=e.Z();e:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===s){var o=String(e.D).match(et)[1]||null;!o&&i.self&&i.self.location&&(o=i.self.location.protocol.slice(0,-1)),r=!Nt.test(o?o.toLowerCase():"")}n=r}if(n)te(e,"complete"),te(e,"success");else{e.m=6;try{var a=2<Ft(e)?e.g.statusText:""}catch(c){a=""}e.l=a+" ["+e.Z()+"]",xt(e)}}finally{Mt(e)}}}function Mt(e,t){if(e.g){$t(e);const s=e.g,i=e.v[0]?()=>{}:null;e.g=null,e.v=null,t||te(e,"ready");try{s.onreadystatechange=i}catch(n){}}}function $t(e){e.I&&(i.clearTimeout(e.I),e.I=null)}function Ft(e){return e.g?e.g.readyState:0}function Bt(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Vt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Ht(e){this.Aa=0,this.i=[],this.j=new Ie,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Vt("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Vt("baseRetryDelayMs",5e3,e),this.cb=Vt("retryDelaySeedMs",1e4,e),this.Wa=Vt("forwardChannelMaxRetries",2,e),this.wa=Vt("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new ze(e&&e.concurrentRequestLimit),this.Da=new kt,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function qt(e){if(zt(e),3==e.G){var t=e.U++,n=nt(e.I);if(ot(n,"SID",e.K),ot(n,"RID",t),ot(n,"TYPE","terminate"),Jt(e,n),(t=new Re(e,e.j,t)).L=2,t.v=at(nt(n)),n=!1,i.navigator&&i.navigator.sendBeacon)try{n=i.navigator.sendBeacon(t.v.toString(),"")}catch(s){}!n&&i.Image&&((new Image).src=t.v,n=!0),n||(t.g=cn(t.j,null),t.g.ea(t.v)),t.F=Date.now(),$e(t)}on(e)}function Wt(e){e.g&&(Qt(e),e.g.cancel(),e.g=null)}function zt(e){Wt(e),e.u&&(i.clearTimeout(e.u),e.u=null),tn(e),e.h.cancel(),e.s&&("number"==typeof e.s&&i.clearTimeout(e.s),e.s=null)}function Kt(e){if(!Ke(e.h)&&!e.s){e.s=!0;var t=e.Ga;C||O(),A||(C(),A=!0),P.add(t,e),e.B=0}}function Gt(e,t){var n;n=t?t.l:e.U++;const s=nt(e.I);ot(s,"SID",e.K),ot(s,"RID",n),ot(s,"AID",e.T),Jt(e,s),e.m&&e.o&&Rt(s,e.m,e.o),n=new Re(e,e.j,n,e.B+1),null===e.m&&(n.H=e.o),t&&(e.i=t.D.concat(e.i)),t=Xt(e,n,1e3),n.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),Xe(e.h,n),Le(n,s,t)}function Jt(e,t){e.H&&v(e.H,function(e,n){ot(t,n,e)}),e.l&&Qe({},function(e,n){ot(t,n,e)})}function Xt(e,t,n){n=Math.min(e.i.length,n);var s=e.l?h(e.l.Na,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let o=!0;for(let a=0;a<n;a++){let n=i[a].g;const c=i[a].map;if(n-=t,0>n)t=Math.max(0,i[a].g-100),o=!1;else try{St(c,e,"req"+n+"_")}catch(r){s&&s(c)}}if(o){s=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,s}function Yt(e){if(!e.g&&!e.u){e.Y=1;var t=e.Fa;C||O(),A||(C(),A=!0),P.add(t,e),e.v=0}}function Zt(e){return!(e.g||e.u||3<=e.v)&&(e.Y++,e.u=Ee(h(e.Fa,e),sn(e,e.v)),e.v++,!0)}function Qt(e){null!=e.A&&(i.clearTimeout(e.A),e.A=null)}function en(e){e.g=new Re(e,e.j,"rpc",e.Y),null===e.m&&(e.g.H=e.o),e.g.O=0;var t=nt(e.qa);ot(t,"RID","rpc"),ot(t,"SID",e.K),ot(t,"AID",e.T),ot(t,"CI",e.F?"0":"1"),!e.F&&e.ja&&ot(t,"TO",e.ja),ot(t,"TYPE","xmlhttp"),Jt(e,t),e.m&&e.o&&Rt(t,e.m,e.o),e.L&&(e.g.I=e.L);var n=e.g;e=e.ia,n.L=1,n.v=at(nt(t)),n.m=null,n.P=!0,xe(n,e)}function tn(e){null!=e.C&&(i.clearTimeout(e.C),e.C=null)}function nn(e,t){var n=null;if(e.g==t){tn(e),Qt(e),e.g=null;var s=2}else{if(!Je(e.h,t))return;n=t.D,Ye(e.h,t),s=1}if(0!=e.G)if(t.o)if(1==s){n=t.m?t.m.length:0,t=Date.now()-t.F;var i=e.B;te(s=we(),new Se(s,n)),Kt(e)}else Yt(e);else if(3==(i=t.s)||0==i&&0<t.X||!(1==s&&function(e,t){return!(Ge(e.h)>=e.h.j-(e.s?1:0)||(e.s?(e.i=t.D.concat(e.i),0):1==e.G||2==e.G||e.B>=(e.Va?0:e.Wa)||(e.s=Ee(h(e.Ga,e,t),sn(e,e.B)),e.B++,0)))}(e,t)||2==s&&Zt(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),i){case 1:rn(e,5);break;case 4:rn(e,10);break;case 3:rn(e,6);break;default:rn(e,2)}}function sn(e,t){let n=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(n*=2),n*t}function rn(e,t){if(e.j.info("Error code "+t),2==t){var n=h(e.fb,e),s=e.Xa;const t=!s;s=new tt(s||"//www.google.com/images/cleardot.gif"),i.location&&"http"==i.location.protocol||st(s,"https"),at(s),t?function(e,t){const n=new Ie;if(i.Image){const s=new Image;s.onload=l(Tt,n,"TestLoadImage: loaded",!0,t,s),s.onerror=l(Tt,n,"TestLoadImage: error",!1,t,s),s.onabort=l(Tt,n,"TestLoadImage: abort",!1,t,s),s.ontimeout=l(Tt,n,"TestLoadImage: timeout",!1,t,s),i.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=e}else t(!1)}(s.toString(),n):function(e,t){new Ie;const n=new AbortController,s=setTimeout(()=>{n.abort(),Tt(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(s),e.ok?Tt(0,0,!0,t):Tt(0,0,!1,t)}).catch(()=>{clearTimeout(s),Tt(0,0,!1,t)})}(s.toString(),n)}else ke(2);e.G=0,e.l&&e.l.sa(t),on(e),zt(e)}function on(e){if(e.G=0,e.ka=[],e.l){const t=Ze(e.h);0==t.length&&0==e.i.length||(f(e.ka,t),f(e.ka,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.ra()}}function an(e,t,n){var s=n instanceof tt?nt(n):new tt(n);if(""!=s.g)t&&(s.g=t+"."+s.g),it(s,s.s);else{var r=i.location;s=r.protocol,t=t?t+"."+r.hostname:r.hostname,r=+r.port;var o=new tt(null);s&&st(o,s),t&&(o.g=t),r&&it(o,r),n&&(o.l=n),s=o}return n=e.D,t=e.ya,n&&t&&ot(s,n,t),ot(s,"VER",e.la),Jt(e,s),s}function cn(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Ca&&!e.pa?new jt(new Et({eb:n})):new jt(e.pa)).Ha(e.J),t}function hn(){}function ln(e,t){ee.call(this),this.g=new Ht(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.va&&(e?e["X-WebChannel-Client-Profile"]=t.va:e={"X-WebChannel-Client-Profile":t.va}),this.g.S=e,(e=t&&t.Sb)&&!p(e)&&(this.g.m=e),this.v=t&&t.supportsCrossDomainXhr||!1,this.u=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!p(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new fn(this)}function un(e){ge.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function dn(){me.call(this),this.status=1}function fn(e){this.g=e}(e=jt.prototype).Ha=function(e){this.J=e},e.ea=function(e,t,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ae.g(),this.v=this.o?fe(this.o):fe(Ae),this.g.onreadystatechange=h(this.Ea,this);try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(o){return void Lt(this,o)}if(e=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var r in s)n.set(r,s[r]);else{if("function"!=typeof s.keys||"function"!=typeof s.get)throw Error("Unknown input type for opt_headers: "+String(s));for(const e of s.keys())n.set(e,s.get(e))}s=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),r=i.FormData&&e instanceof i.FormData,!(0<=Array.prototype.indexOf.call(Dt,t,void 0))||s||r||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,a]of n)this.g.setRequestHeader(i,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$t(this),this.u=!0,this.g.send(e),this.u=!1}catch(o){Lt(this,o)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,te(this,"complete"),te(this,"abort"),Mt(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Mt(this,!0)),jt.aa.N.call(this)},e.Ea=function(){this.s||(this.B||this.u||this.j?Ut(this):this.bb())},e.bb=function(){Ut(this)},e.isActive=function(){return!!this.g},e.Z=function(){try{return 2<Ft(this)?this.g.status:-1}catch(e){return-1}},e.oa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.Oa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),le(t)}},e.Ba=function(){return this.m},e.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Ht.prototype).la=8,e.G=1,e.connect=function(e,t,n,s){ke(0),this.W=e,this.H=t||{},n&&void 0!==s&&(this.H.OSID=n,this.H.OAID=s),this.F=this.X,this.I=an(this,null,this.W),Kt(this)},e.Ga=function(e){if(this.s)if(this.s=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const i=new Re(this,this.j,e);let r=this.o;if(this.S&&(r?(r=w(r),b(r,this.S)):r=this.S),null!==this.m||this.O||(i.H=r,r=null),this.P)e:{for(var t=0,n=0;n<this.i.length;n++){var s=this.i[n];if(void 0===(s="__data__"in s.map&&"string"==typeof(s=s.map.__data__)?s.length:void 0))break;if(4096<(t+=s)){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Xt(this,i,t),ot(n=nt(this.I),"RID",e),ot(n,"CVER",22),this.D&&ot(n,"X-HTTP-Session-Id",this.D),Jt(this,n),r&&(this.O?t="headers="+encodeURIComponent(String(Ot(r)))+"&"+t:this.m&&Rt(n,this.m,r)),Xe(this.h,i),this.Ua&&ot(n,"TYPE","init"),this.P?(ot(n,"$req",t),ot(n,"SID","null"),i.T=!0,Le(i,n,null)):Le(i,n,t),this.G=2}}else 3==this.G&&(e?Gt(this,e):0==this.i.length||Ke(this.h)||Gt(this))},e.Fa=function(){if(this.u=null,en(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=Ee(h(this.ab,this),e)}},e.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ke(10),Wt(this),en(this))},e.Za=function(){null!=this.C&&(this.C=null,Wt(this),Zt(this),ke(19))},e.fb=function(e){e?(this.j.info("Successfully pinged google.com"),ke(2)):(this.j.info("Failed to ping google.com"),ke(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=hn.prototype).ua=function(){},e.ta=function(){},e.sa=function(){},e.ra=function(){},e.isActive=function(){return!0},e.Na=function(){},u(ln,ee),ln.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ln.prototype.close=function(){qt(this.g)},ln.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.u&&((n={}).__data__=he(e),e=n);t.i.push(new We(t.Ya++,e)),3==t.G&&Kt(t)},ln.prototype.N=function(){this.g.l=null,delete this.j,qt(this.g),delete this.g,ln.aa.N.call(this)},u(un,ge),u(dn,me),u(fn,hn),fn.prototype.ua=function(){te(this.g,"a")},fn.prototype.ta=function(e){te(this.g,new un(e))},fn.prototype.sa=function(e){te(this.g,new dn)},fn.prototype.ra=function(){te(this.g,"b")},ln.prototype.send=ln.prototype.o,ln.prototype.open=ln.prototype.m,ln.prototype.close=ln.prototype.close,Pe.NO_ERROR=0,Pe.TIMEOUT=8,Pe.HTTP_ERROR=6,pe.OPEN="a",pe.CLOSE="b",pe.ERROR="c",pe.MESSAGE="d",ee.prototype.listen=ee.prototype.K,jt.prototype.listenOnce=jt.prototype.L,jt.prototype.getLastError=jt.prototype.Ka,jt.prototype.getLastErrorCode=jt.prototype.Ba,jt.prototype.getStatus=jt.prototype.Z,jt.prototype.getResponseJson=jt.prototype.Oa,jt.prototype.getResponseText=jt.prototype.oa,jt.prototype.send=jt.prototype.ea,jt.prototype.setWithCredentials=jt.prototype.Ha}).apply(void 0!==br?br:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const Tr="@firebase/firestore",kr="4.9.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Sr.UNAUTHENTICATED=new Sr(null),Sr.GOOGLE_CREDENTIALS=new Sr("google-credentials-uid"),Sr.FIRST_PARTY=new Sr("first-party-uid"),Sr.MOCK_USER=new Sr("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Er="12.0.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=new X("@firebase/firestore");function Cr(e,...t){if(Ir.logLevel<=q.DEBUG){const n=t.map(Pr);Ir.debug(`Firestore (${Er}): ${e}`,...n)}}function Ar(e,...t){if(Ir.logLevel<=q.ERROR){const n=t.map(Pr);Ir.error(`Firestore (${Er}): ${e}`,...n)}}function Pr(e){if("string"==typeof e)return e;try{
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
return t=e,JSON.stringify(t)}catch(n){return e}var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(e,t,n){let s="Unexpected state";"string"==typeof t?s=t:n=t,Rr(e,s,n)}function Rr(e,t,n){let s=`FIRESTORE (${Er}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{s+=" CONTEXT: "+JSON.stringify(n)}catch(i){s+=" CONTEXT: "+n}throw Ar(s),new Error(s)}function jr(e,t,n,s){let i="Unexpected state";"string"==typeof n?i=n:s=n,e||Rr(t,i,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nr="cancelled",Dr="invalid-argument",Lr="failed-precondition";class xr extends A{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class $r{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Sr.UNAUTHENTICATED))}shutdown(){}}class Fr{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Br{constructor(e){this.t=e,this.currentUser=Sr.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){jr(void 0===this.o,42304);let n=this.i;const s=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new Ur;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ur,e.enqueueRetryable(()=>s(this.currentUser))};const r=()=>{const t=i;e.enqueueRetryable(async()=>{await t.promise,await s(this.currentUser)})},o=e=>{Cr("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),r())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(Cr("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ur)}},0),r()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(Cr("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(jr("string"==typeof t.accessToken,31837,{l:t}),new Mr(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return jr(null===e||"string"==typeof e,2055,{h:e}),new Sr(e)}}class Vr{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Sr.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Hr{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Vr(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Sr.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class qr{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Wr{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Le(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){jr(void 0===this.o,3512);const n=e=>{null!=e.error&&Cr("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,Cr("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const s=e=>{Cr("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>s(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?s(e):Cr("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new qr(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(jr("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new qr(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let s=0;s<e;s++)n[s]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=zr(40);for(let s=0;s<n.length;++s)t.length<20&&n[s]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[s]%62))}return t}}function Gr(e,t){return e<t?-1:e>t?1:0}const Jr=55296,Xr=57343;function Yr(e){const t=e.charCodeAt(0);return t>=Jr&&t<=Xr}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr="__name__";class Qr{constructor(e,t,n){void 0===t?t=0:t>e.length&&Or(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&Or(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===Qr.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Qr?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const n=Qr.compareSegments(e.get(s),t.get(s));if(0!==n)return n}return Gr(e.length,t.length)}static compareSegments(e,t){const n=Qr.isNumericId(e),s=Qr.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?Qr.extractNumericId(e).compare(Qr.extractNumericId(t)):function(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const n=e.charAt(s),i=t.charAt(s);if(n!==i)return Yr(n)===Yr(i)?Gr(n,i):Yr(n)?1:-1}return Gr(e.length,t.length)}(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return wr.fromString(e.substring(4,e.length-2))}}class eo extends Qr{construct(e,t,n){return new eo(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new xr(Dr,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new eo(t)}static emptyPath(){return new eo([])}}const to=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class no extends Qr{construct(e,t,n){return new no(e,t,n)}static isValidIdentifier(e){return to.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),no.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Zr}static keyField(){return new no([Zr])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(0===n.length)throw new xr(Dr,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let r=!1;for(;s<e.length;){const t=e[s];if("\\"===t){if(s+1===e.length)throw new xr(Dr,"Path has trailing escape character: "+e);const t=e[s+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new xr(Dr,"Path has invalid escape sequence: "+e);n+=t,s+=2}else"`"===t?(r=!r,s++):"."!==t||r?(n+=t,s++):(i(),s++)}if(i(),r)throw new xr(Dr,"Unterminated ` in path: "+e);return new no(t)}static emptyPath(){return new no([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e){this.path=e}static fromPath(e){return new so(eo.fromString(e))}static fromName(e){return new so(eo.fromString(e).popFirst(5))}static empty(){return new so(eo.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===eo.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return eo.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new so(new eo(e.slice()))}}function io(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new xr(Dr,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=function(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var t;return"function"==typeof e?"a function":Or(12329,{type:typeof e})}(e);throw new xr(Dr,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(e,t){const n={typeString:e};return t&&(n.value=t),n}function oo(e,t){if(!function(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}(e))throw new xr(Dr,"JSON must be an object");let n;for(const s in t)if(t[s]){const i=t[s].typeString,r="value"in t[s]?{value:t[s].value}:void 0;if(!(s in e)){n=`JSON missing required field: '${s}'`;break}const o=e[s];if(i&&typeof o!==i){n=`JSON field '${s}' must be a ${i}.`;break}if(void 0!==r&&o!==r.value){n=`Expected '${s}' field to equal '${r.value}'`;break}}if(n)throw new xr(Dr,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ao=-62135596800,co=1e6;class ho{static now(){return ho.fromMillis(Date.now())}static fromDate(e){return ho.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*co);return new ho(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new xr(Dr,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new xr(Dr,"Timestamp nanoseconds out of range: "+t);if(e<ao)throw new xr(Dr,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new xr(Dr,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/co}_compareTo(e){return this.seconds===e.seconds?Gr(this.nanoseconds,e.nanoseconds):Gr(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ho._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(oo(e,ho._jsonSchema))return new ho(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ao;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ho._jsonSchemaVersion="firestore/timestamp/1.0",ho._jsonSchema={type:ro("string",ho._jsonSchemaVersion),seconds:ro("number"),nanoseconds:ro("number")};
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lo extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(t){throw"undefined"!=typeof DOMException&&t instanceof DOMException?new lo("Invalid base64 string: "+t):t}}(e);return new uo(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new uo(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Gr(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}uo.EMPTY_BYTE_STRING=new uo("");const fo="(default)";class po{constructor(e,t){this.projectId=e,this.database=t||fo}static empty(){return new po("","")}get isDefaultDatabase(){return this.database===fo}isEqual(e){return e instanceof po&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,t=null,n=[],s=[],i=null,r="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=r,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var mo,yo;(yo=mo||(mo={}))[yo.OK=0]="OK",yo[yo.CANCELLED=1]="CANCELLED",yo[yo.UNKNOWN=2]="UNKNOWN",yo[yo.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",yo[yo.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",yo[yo.NOT_FOUND=5]="NOT_FOUND",yo[yo.ALREADY_EXISTS=6]="ALREADY_EXISTS",yo[yo.PERMISSION_DENIED=7]="PERMISSION_DENIED",yo[yo.UNAUTHENTICATED=16]="UNAUTHENTICATED",yo[yo.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",yo[yo.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",yo[yo.ABORTED=10]="ABORTED",yo[yo.OUT_OF_RANGE=11]="OUT_OF_RANGE",yo[yo.UNIMPLEMENTED=12]="UNIMPLEMENTED",yo[yo.INTERNAL=13]="INTERNAL",yo[yo.UNAVAILABLE=14]="UNAVAILABLE",yo[yo.DATA_LOSS=15]="DATA_LOSS",
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
new wr([4294967295,4294967295],0);function vo(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&Cr("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Ur,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const r=Date.now()+n,o=new _o(e,t,r,s,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new xr(Nr,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var bo,To;(To=bo||(bo={})).Ma="default",To.Cache="cache";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ko=new Map,So="firestore.googleapis.com",Eo=!0;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new xr(Dr,"Can't provide ssl option if host option is not set");this.host=So,this.ssl=Eo}else this.host=e.host,this.ssl=e.ssl??Eo;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new xr(Dr,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,s){if(!0===t&&!0===s)throw new xr(Dr,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new xr(Dr,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new xr(Dr,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new xr(Dr,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,n}}class Co{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Io({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new xr(Lr,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new xr(Lr,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Io(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new $r;switch(e.type){case"firstParty":return new Hr(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new xr(Dr,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=ko.get(e);t&&(Cr("ComponentProvider","Removing Datastore"),ko.delete(e),t.terminate())}(this),Promise.resolve()}}function Ao(e,t,n,s={}){e=io(e,Co);const i=y(t),r=e._getSettings(),o={...r,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${n}`;i&&(v(`https://${a}`),T("Firestore",!0)),r.host!==So&&r.host!==a&&function(e,...t){if(Ir.logLevel<=q.WARN){const n=t.map(Pr);Ir.warn(`Firestore (${Er}): ${e}`,...n)}}("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...r,host:a,ssl:i,emulatorOptions:s};if(!R(c,o)&&(e._setSettings(c),s.mockUserToken)){let t,n;if("string"==typeof s.mockUserToken)t=s.mockUserToken,n=Sr.MOCK_USER;else{t=w(s.mockUserToken,e._app?.options.projectId);const i=s.mockUserToken.sub||s.mockUserToken.user_id;if(!i)throw new xr(Dr,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Sr(i)}e._authCredentials=new Fr(new Mr(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Po(this.firestore,e,this._query)}}class Oo{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ro(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Oo(this.firestore,e,this._key)}toJSON(){return{type:Oo._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(oo(t,Oo._jsonSchema))return new Oo(e,n||null,new so(eo.fromString(t.referencePath)))}}Oo._jsonSchemaVersion="firestore/documentReference/1.0",Oo._jsonSchema={type:ro("string",Oo._jsonSchemaVersion),referencePath:ro("string")};class Ro extends Po{constructor(e,t,n){super(e,t,function(e){return new go(e)}(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Oo(this.firestore,null,new so(e))}withConverter(e){return new Ro(this.firestore,e,this._path)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo="AsyncQueue";class No{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new wo(this,"async_queue_retry"),this._c=()=>{const e=vo();e&&Cr(jo,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=vo();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=vo();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Ur;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!function(e){return"IndexedDbTransactionError"===e.name}(e))throw e;Cr(jo,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,Ar("INTERNAL UNHANDLED ERROR: ",Do(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=_o.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(s),s}uc(){this.nc&&Or(47125,{Pc:Do(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Do(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}class Lo extends Co{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new No,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new No(e),this._firestoreClient=void 0,await e}}}function xo(e,t){const n="object"==typeof e?e:Fe(),s="string"==typeof e?e:fo,i=De(n,"firestore").getImmediate({identifier:s});if(!i._initialized){const e=f("firestore");e&&Ao(i,...e)}return i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Uo(uo.fromBase64String(e))}catch(t){throw new xr(Dr,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Uo(uo.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Uo._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(oo(e,Uo._jsonSchema))return Uo.fromBase64String(e.bytes)}}Uo._jsonSchemaVersion="firestore/bytes/1.0",Uo._jsonSchema={type:ro("string",Uo._jsonSchemaVersion),bytes:ro("string")};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Mo{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new xr(Dr,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new no(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new xr(Dr,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new xr(Dr,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Gr(this._lat,e._lat)||Gr(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:$o._jsonSchemaVersion}}static fromJSON(e){if(oo(e,$o._jsonSchema))return new $o(e.latitude,e.longitude)}}$o._jsonSchemaVersion="firestore/geoPoint/1.0",$o._jsonSchema={type:ro("string",$o._jsonSchemaVersion),latitude:ro("number"),longitude:ro("number")};
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fo{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Fo._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(oo(e,Fo._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new Fo(e.vectorValues);throw new xr(Dr,"Expected 'vectorValues' field to be a number array")}}}Fo._jsonSchemaVersion="firestore/vectorValue/1.0",Fo._jsonSchema={type:ro("string",Fo._jsonSchemaVersion),vectorValues:ro("object")};const Bo=new RegExp("[~\\*/\\[\\]]");function Vo(e,t,n,s,i){let r=`Function ${t}() called with invalid data`;r+=". ";return new xr(Dr,r+e+"")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Oo(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new qo(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Wo("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class qo extends Ho{data(){return super.data()}}function Wo(e,t){return"string"==typeof t?function(e,t){if(t.search(Bo)>=0)throw Vo(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e);try{return new Mo(...t.split("."))._internalPath}catch(n){throw Vo(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e)}}(e,t):t instanceof Mo?t._internalPath:t._delegate._internalPath}class zo{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ko extends Ho{constructor(e,t,n,s,i,r){super(e,t,n,s,r),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Go(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Wo("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new xr(Lr,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Ko._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}Ko._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ko._jsonSchema={type:ro("string",Ko._jsonSchemaVersion),bundleSource:ro("string","DocumentSnapshot"),bundleName:ro("string"),bundle:ro("string")};class Go extends Ko{data(e={}){return super.data(e)}}class Jo{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new zo(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Go(this._firestore,this._userDataWriter,n.key,n,new zo(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new xr(Dr,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const s=new Go(e._firestore,e._userDataWriter,n.doc.key,n.doc,new zo(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:s,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const s=new Go(e._firestore,e._userDataWriter,t.doc.key,t.doc,new zo(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,r=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),r=n.indexOf(t.doc.key)),{type:Xo(t.type),doc:s,oldIndex:i,newIndex:r}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new xr(Lr,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Jo._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Kr.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),s.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Xo(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Or(61501,{type:e})}}Jo._jsonSchemaVersion="firestore/querySnapshot/1.0",Jo._jsonSchema={type:ro("string",Jo._jsonSchemaVersion),bundleSource:ro("string","QuerySnapshot"),bundleName:ro("string"),bundle:ro("string")},function(e,t=!0){Er=Me,Ne(new F("firestore",(e,{instanceIdentifier:n,options:s})=>{const i=e.getProvider("app").getImmediate(),r=new Lo(new Br(e.getProvider("auth-internal")),new Wr(i,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new xr(Dr,'"projectId" not provided in firebase.initializeApp.');return new po(e.options.projectId,t)}(i,n),i);return s={useFetchStreams:t,...s},r._setSettings(s),r},"PUBLIC").setMultipleInstances(!0)),Be(Tr,kr,e),Be(Tr,kr,"esm2020")}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Yo="firebasestorage.googleapis.com";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Zo=class e extends A{constructor(t,n,s=0){super(sa(t),`Firebase Storage: ${n} (${sa(t)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,e.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return sa(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}};var Qo,ea,ta,na;function sa(e){return"storage/"+e}function ia(e){return new Zo(Qo.INVALID_ARGUMENT,e)}function ra(){return new Zo(Qo.APP_DELETED,"The Firebase app was deleted.")}(ea=Qo||(Qo={})).UNKNOWN="unknown",ea.OBJECT_NOT_FOUND="object-not-found",ea.BUCKET_NOT_FOUND="bucket-not-found",ea.PROJECT_NOT_FOUND="project-not-found",ea.QUOTA_EXCEEDED="quota-exceeded",ea.UNAUTHENTICATED="unauthenticated",ea.UNAUTHORIZED="unauthorized",ea.UNAUTHORIZED_APP="unauthorized-app",ea.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",ea.INVALID_CHECKSUM="invalid-checksum",ea.CANCELED="canceled",ea.INVALID_EVENT_NAME="invalid-event-name",ea.INVALID_URL="invalid-url",ea.INVALID_DEFAULT_BUCKET="invalid-default-bucket",ea.NO_DEFAULT_BUCKET="no-default-bucket",ea.CANNOT_SLICE_BLOB="cannot-slice-blob",ea.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",ea.NO_DOWNLOAD_URL="no-download-url",ea.INVALID_ARGUMENT="invalid-argument",ea.INVALID_ARGUMENT_COUNT="invalid-argument-count",ea.APP_DELETED="app-deleted",ea.INVALID_ROOT_OPERATION="invalid-root-operation",ea.INVALID_FORMAT="invalid-format",ea.INTERNAL_ERROR="internal-error",ea.UNSUPPORTED_ENVIRONMENT="unsupported-environment";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class oa{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=oa.makeFromUrl(e,t)}catch(i){return new oa(e,"")}if(""===n.path)return n;throw s=e,new Zo(Qo.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+s+"'.");var s}static makeFromUrl(e,t){let n=null;const s="([A-Za-z0-9.\\-_]+)";const i=new RegExp("^gs://"+s+"(/(.*))?$","i");function r(e){e.path_=decodeURIComponent(e.path)}const o=t.replace(/[.]/g,"\\."),a=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${s}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:r},{regex:new RegExp(`^https?://${t===Yo?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${s}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:r}];for(let c=0;c<a.length;c++){const t=a[c],s=t.regex.exec(e);if(s){const e=s[t.indices.bucket];let i=s[t.indices.path];i||(i=""),n=new oa(e,i),t.postModify(n);break}}if(null==n)throw function(e){return new Zo(Qo.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class aa{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ca(e,t,n,s){if(s<t)throw ia(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw ia(`Invalid value for '${e}'. Expected ${n} or less.`)}(na=ta||(ta={}))[na.NO_ERROR=0]="NO_ERROR",na[na.NETWORK_ERROR=1]="NETWORK_ERROR",na[na.ABORT=2]="ABORT";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ha{constructor(e,t,n,s,i,r,o,a,c,h,l,u=!0,d=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=r,this.callback_=o,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=h,this.connectionFactory_=l,this.retry=u,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{if(t)return void e(!1,new la(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const s=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(s),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(s),this.pendingConnection_=null;const t=n.getErrorCode()===ta.NO_ERROR,i=n.getStatus();if(!t||
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){const n=e>=500&&e<600,s=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return n||s||i}(i,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===ta.ABORT;return void e(!1,new la(!1,null,t))}const r=-1!==this.successCodes_.indexOf(i);e(!0,new la(r,n))})},t=(e,t)=>{const n=this.resolve_,s=this.reject_,i=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(i,i.getResponse());!
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){return void 0!==e}(e)?n():n(e)}catch(r){s(r)}else if(null!==i){const e=new Zo(Qo.UNKNOWN,"An unknown error occurred, please check the error payload for server response.");e.serverResponse=i.getErrorText(),this.errorCallback_?s(this.errorCallback_(i,e)):s(e)}else if(t.canceled){s(this.appDelete_?ra():new Zo(Qo.CANCELED,"User canceled the upload/download."))}else{s(new Zo(Qo.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))}};this.canceled_?t(0,new la(!1,null,!0)):this.backoffId_=function(e,t,n){let s=1,i=null,r=null,o=!1,a=0;function c(){return 2===a}let h=!1;function l(...e){h||(h=!0,t.apply(null,e))}function u(t){i=setTimeout(()=>{i=null,e(f,c())},t)}function d(){r&&clearTimeout(r)}function f(e,...t){if(h)return void d();if(e)return d(),void l.call(null,e,...t);if(c()||o)return d(),void l.call(null,e,...t);let n;s<64&&(s*=2),1===a?(a=2,n=0):n=1e3*(s+Math.random()),u(n)}let p=!1;function g(e){p||(p=!0,d(),h||(null!==i?(e||(a=2),clearTimeout(i),u(0)):e||(a=1)))}return u(0),r=setTimeout(()=>{o=!0,g(!0)},n),g}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class la{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function ua(e,t,n,s,i,r,o=!0,a=!1){const c=function(e){const t=encodeURIComponent;let n="?";for(const s in e)e.hasOwnProperty(s)&&(n=n+(t(s)+"=")+t(e[s])+"&");return n=n.slice(0,-1),n}(e.urlParams),h=e.url+c,l=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(l,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(l,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}(l,r),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(l,s),new ha(h,e.method,l,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o,a)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class da{constructor(e,t){this._service=e,this._location=t instanceof oa?t:oa.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new da(e,t)}get root(){const e=new oa(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return function(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new oa(this._location.bucket,e);return new da(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new Zo(Qo.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function fa(e,t){const n=t?.storageBucket;return null==n?null:oa.makeFromBucketSpec(n,e)}class pa{constructor(e,t,n,s,i,r=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=r,this._bucket=null,this._host=Yo,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=s?oa.makeFromBucketSpec(s,this._host):fa(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=oa.makeFromBucketSpec(this._url,e):this._bucket=fa(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ca("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ca("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if(Le(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new da(this,e)}_makeRequest(e,t,n,s,i=!0){if(this._deleted)return new aa(ra());{const r=ua(e,this._appId,n,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(r),r.getPromise().then(()=>this._requests.delete(r),()=>this._requests.delete(r)),r}}async makeRequestWithTokens(e,t){const[n,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,s).getPromise()}}const ga="@firebase/storage",ma="0.14.0",ya="storage";function va(e=Fe(),t){const n=De(e=$(e),ya).getImmediate({identifier:t}),s=f("storage");return s&&function(e,t,n,s={}){!function(e,t,n,s={}){e.host=`${t}:${n}`;const i=y(t);i&&(v(`https://${e.host}/b`),T("Storage",!0)),e._isUsingEmulator=!0,e._protocol=i?"https":"http";const{mockUserToken:r}=s;r&&(e._overrideAuthToken="string"==typeof r?r:w(r,e.app.options.projectId))}(e,t,n,s)}(n,...s),n}function wa(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return new pa(n,s,i,t,Me)}Ne(new F(ya,wa,"PUBLIC").setMultipleInstances(!0)),Be(ga,ma,""),Be(ga,ma,"esm2020");class _a extends Error{constructor(e,t="FunctionsError",n){super(e),this.name=t,this.context=n}}class ba extends _a{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Ta extends _a{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class ka extends _a{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Sa,Ea;(Ea=Sa||(Sa={})).Any="any",Ea.ApNortheast1="ap-northeast-1",Ea.ApNortheast2="ap-northeast-2",Ea.ApSouth1="ap-south-1",Ea.ApSoutheast1="ap-southeast-1",Ea.ApSoutheast2="ap-southeast-2",Ea.CaCentral1="ca-central-1",Ea.EuCentral1="eu-central-1",Ea.EuWest1="eu-west-1",Ea.EuWest2="eu-west-2",Ea.EuWest3="eu-west-3",Ea.SaEast1="sa-east-1",Ea.UsEast1="us-east-1",Ea.UsWest1="us-west-1",Ea.UsWest2="us-west-2";var Ia=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{c(s.next(e))}catch(t){r(t)}}function a(e){try{c(s.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(o,a)}c((s=s.apply(e,t||[])).next())})};class Ca{constructor(e,{headers:n={},customFetch:s,region:i=Sa.Any}={}){this.url=e,this.headers=n,this.region=i,this.fetch=(e=>{let n;return n=e||("undefined"==typeof fetch?(...e)=>t(async()=>{const{default:e}=await Promise.resolve().then(()=>Fa);return{default:e}},void 0,import.meta.url).then(({default:t})=>t(...e)):fetch),(...e)=>n(...e)})(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e,t={}){var n;return Ia(this,void 0,void 0,function*(){try{const{headers:s,method:i,body:r}=t;let o={},{region:a}=t;a||(a=this.region);const c=new URL(`${this.url}/${e}`);let h;a&&"any"!==a&&(o["x-region"]=a,c.searchParams.set("forceFunctionRegion",a)),r&&(s&&!Object.prototype.hasOwnProperty.call(s,"Content-Type")||!s)&&("undefined"!=typeof Blob&&r instanceof Blob||r instanceof ArrayBuffer?(o["Content-Type"]="application/octet-stream",h=r):"string"==typeof r?(o["Content-Type"]="text/plain",h=r):"undefined"!=typeof FormData&&r instanceof FormData?h=r:(o["Content-Type"]="application/json",h=JSON.stringify(r)));const l=yield this.fetch(c.toString(),{method:i||"POST",headers:Object.assign(Object.assign(Object.assign({},o),this.headers),s),body:h}).catch(e=>{throw new ba(e)}),u=l.headers.get("x-relay-error");if(u&&"true"===u)throw new Ta(l);if(!l.ok)throw new ka(l);let d,f=(null!==(n=l.headers.get("Content-Type"))&&void 0!==n?n:"text/plain").split(";")[0].trim();return d="application/json"===f?yield l.json():"application/octet-stream"===f?yield l.blob():"text/event-stream"===f?l:"multipart/form-data"===f?yield l.formData():yield l.text(),{data:d,error:null,response:l}}catch(s){return{data:null,error:s,response:s instanceof ka||s instanceof Ta?s.context:void 0}}})}}var Aa={},Pa={},Oa={},Ra={},ja={},Na={},Da=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("unable to locate global object")}();const La=Da.fetch,xa=Da.fetch.bind(Da),Ua=Da.Headers,Ma=Da.Request,$a=Da.Response,Fa=Object.freeze(Object.defineProperty({__proto__:null,Headers:Ua,Request:Ma,Response:$a,default:xa,fetch:La},Symbol.toStringTag,{value:"Module"})),Ba=s(Fa);var Va,Ha,qa,Wa,za,Ka={};function Ga(){if(Va)return Ka;Va=1,Object.defineProperty(Ka,"__esModule",{value:!0});class e extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}}return Ka.default=e,Ka}function Ja(){if(Ha)return Na;Ha=1;var e=Na&&Na.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Na,"__esModule",{value:!0});const t=e(Ba),n=e(Ga());return Na.default=class{constructor(e){this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=e.headers,this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle,e.fetch?this.fetch=e.fetch:"undefined"==typeof fetch?this.fetch=t.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=Object.assign({},this.headers),this.headers[e]=t,this}then(e,t){void 0===this.schema||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),"GET"!==this.method&&"HEAD"!==this.method&&(this.headers["Content-Type"]="application/json");let s=(0,this.fetch)(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async e=>{var t,s,i;let r=null,o=null,a=null,c=e.status,h=e.statusText;if(e.ok){if("HEAD"!==this.method){const t=await e.text();""===t||(o="text/csv"===this.headers.Accept||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?t:JSON.parse(t))}const n=null===(t=this.headers.Prefer)||void 0===t?void 0:t.match(/count=(exact|planned|estimated)/),i=null===(s=e.headers.get("content-range"))||void 0===s?void 0:s.split("/");n&&i&&i.length>1&&(a=parseInt(i[1])),this.isMaybeSingle&&"GET"===this.method&&Array.isArray(o)&&(o.length>1?(r={code:"PGRST116",details:`Results contain ${o.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},o=null,a=null,c=406,h="Not Acceptable"):o=1===o.length?o[0]:null)}else{const t=await e.text();try{r=JSON.parse(t),Array.isArray(r)&&404===e.status&&(o=[],r=null,c=200,h="OK")}catch(l){404===e.status&&""===t?(c=204,h="No Content"):r={message:t}}if(r&&this.isMaybeSingle&&(null===(i=null==r?void 0:r.details)||void 0===i?void 0:i.includes("0 rows"))&&(r=null,c=200,h="OK"),r&&this.shouldThrowOnError)throw new n.default(r)}return{error:r,data:o,count:a,status:c,statusText:h}});return this.shouldThrowOnError||(s=s.catch(e=>{var t,n,s;return{error:{message:`${null!==(t=null==e?void 0:e.name)&&void 0!==t?t:"FetchError"}: ${null==e?void 0:e.message}`,details:`${null!==(n=null==e?void 0:e.stack)&&void 0!==n?n:""}`,hint:"",code:`${null!==(s=null==e?void 0:e.code)&&void 0!==s?s:""}`},data:null,count:null,status:0,statusText:""}})),s.then(e,t)}returns(){return this}overrideTypes(){return this}},Na}function Xa(){if(qa)return ja;qa=1;var e=ja&&ja.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(ja,"__esModule",{value:!0});const t=e(Ja());class n extends t.default{select(e){let t=!1;const n=(null!=e?e:"*").split("").map(e=>/\s/.test(e)&&!t?"":('"'===e&&(t=!t),e)).join("");return this.url.searchParams.set("select",n),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:s,referencedTable:i=s}={}){const r=i?`${i}.order`:"order",o=this.url.searchParams.get(r);return this.url.searchParams.set(r,`${o?`${o},`:""}${e}.${t?"asc":"desc"}${void 0===n?"":n?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){const s=void 0===n?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:s=n}={}){const i=void 0===s?"offset":`${s}.offset`,r=void 0===s?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${e}`),this.url.searchParams.set(r,""+(t-e+1)),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return"GET"===this.method?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:s=!1,wal:i=!1,format:r="text"}={}){var o;const a=[e?"analyze":null,t?"verbose":null,n?"settings":null,s?"buffers":null,i?"wal":null].filter(Boolean).join("|"),c=null!==(o=this.headers.Accept)&&void 0!==o?o:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${r}; for="${c}"; options=${a};`,this}rollback(){var e;return(null!==(e=this.headers.Prefer)&&void 0!==e?e:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}}return ja.default=n,ja}function Ya(){if(Wa)return Ra;Wa=1;var e=Ra&&Ra.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Ra,"__esModule",{value:!0});const t=e(Xa());class n extends t.default{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}in(e,t){const n=Array.from(new Set(t)).map(e=>"string"==typeof e&&new RegExp("[,()]").test(e)?`"${e}"`:`${e}`).join(",");return this.url.searchParams.append(e,`in.(${n})`),this}contains(e,t){return"string"==typeof t?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return"string"==typeof t?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return"string"==typeof t?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:n,type:s}={}){let i="";"plain"===s?i="pl":"phrase"===s?i="ph":"websearch"===s&&(i="w");const r=void 0===n?"":`(${n})`;return this.url.searchParams.append(e,`${i}fts${r}.${t}`),this}match(e){return Object.entries(e).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){const s=n?`${n}.or`:"or";return this.url.searchParams.append(s,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}}return Ra.default=n,Ra}function Za(){if(za)return Oa;za=1;var e=Oa&&Oa.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Oa,"__esModule",{value:!0});const t=e(Ya());return Oa.default=class{constructor(e,{headers:t={},schema:n,fetch:s}){this.url=e,this.headers=t,this.schema=n,this.fetch=s}select(e,{head:n=!1,count:s}={}){const i=n?"HEAD":"GET";let r=!1;const o=(null!=e?e:"*").split("").map(e=>/\s/.test(e)&&!r?"":('"'===e&&(r=!r),e)).join("");return this.url.searchParams.set("select",o),s&&(this.headers.Prefer=`count=${s}`),new t.default({method:i,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(e,{count:n,defaultToNull:s=!0}={}){const i=[];if(this.headers.Prefer&&i.push(this.headers.Prefer),n&&i.push(`count=${n}`),s||i.push("missing=default"),this.headers.Prefer=i.join(","),Array.isArray(e)){const t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){const e=[...new Set(t)].map(e=>`"${e}"`);this.url.searchParams.set("columns",e.join(","))}}return new t.default({method:"POST",url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}upsert(e,{onConflict:n,ignoreDuplicates:s=!1,count:i,defaultToNull:r=!0}={}){const o=[`resolution=${s?"ignore":"merge"}-duplicates`];if(void 0!==n&&this.url.searchParams.set("on_conflict",n),this.headers.Prefer&&o.push(this.headers.Prefer),i&&o.push(`count=${i}`),r||o.push("missing=default"),this.headers.Prefer=o.join(","),Array.isArray(e)){const t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){const e=[...new Set(t)].map(e=>`"${e}"`);this.url.searchParams.set("columns",e.join(","))}}return new t.default({method:"POST",url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}update(e,{count:n}={}){const s=[];return this.headers.Prefer&&s.push(this.headers.Prefer),n&&s.push(`count=${n}`),this.headers.Prefer=s.join(","),new t.default({method:"PATCH",url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}delete({count:e}={}){const n=[];return e&&n.push(`count=${e}`),this.headers.Prefer&&n.unshift(this.headers.Prefer),this.headers.Prefer=n.join(","),new t.default({method:"DELETE",url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}},Oa}var Qa,ec,tc,nc,sc={},ic={};function rc(){if(ec)return sc;ec=1,Object.defineProperty(sc,"__esModule",{value:!0}),sc.DEFAULT_HEADERS=void 0;const e=(Qa||(Qa=1,Object.defineProperty(ic,"__esModule",{value:!0}),ic.version=void 0,ic.version="0.0.0-automated"),ic);return sc.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${e.version}`},sc}const oc=n(function(){if(nc)return Aa;nc=1;var e=Aa&&Aa.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Aa,"__esModule",{value:!0}),Aa.PostgrestError=Aa.PostgrestBuilder=Aa.PostgrestTransformBuilder=Aa.PostgrestFilterBuilder=Aa.PostgrestQueryBuilder=Aa.PostgrestClient=void 0;const t=e(function(){if(tc)return Pa;tc=1;var e=Pa&&Pa.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Pa,"__esModule",{value:!0});const t=e(Za()),n=e(Ya()),s=rc();class i{constructor(e,{headers:t={},schema:n,fetch:i}={}){this.url=e,this.headers=Object.assign(Object.assign({},s.DEFAULT_HEADERS),t),this.schemaName=n,this.fetch=i}from(e){const n=new URL(`${this.url}/${e}`);return new t.default(n,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(e){return new i(this.url,{headers:this.headers,schema:e,fetch:this.fetch})}rpc(e,t={},{head:s=!1,get:i=!1,count:r}={}){let o;const a=new URL(`${this.url}/rpc/${e}`);let c;s||i?(o=s?"HEAD":"GET",Object.entries(t).filter(([e,t])=>void 0!==t).map(([e,t])=>[e,Array.isArray(t)?`{${t.join(",")}}`:`${t}`]).forEach(([e,t])=>{a.searchParams.append(e,t)})):(o="POST",c=t);const h=Object.assign({},this.headers);return r&&(h.Prefer=`count=${r}`),new n.default({method:o,url:a,headers:h,schema:this.schemaName,body:c,fetch:this.fetch,allowEmpty:!1})}}return Pa.default=i,Pa}());Aa.PostgrestClient=t.default;const n=e(Za());Aa.PostgrestQueryBuilder=n.default;const s=e(Ya());Aa.PostgrestFilterBuilder=s.default;const i=e(Xa());Aa.PostgrestTransformBuilder=i.default;const r=e(Ja());Aa.PostgrestBuilder=r.default;const o=e(Ga());return Aa.PostgrestError=o.default,Aa.default={PostgrestClient:t.default,PostgrestQueryBuilder:n.default,PostgrestFilterBuilder:s.default,PostgrestTransformBuilder:i.default,PostgrestBuilder:r.default,PostgrestError:o.default},Aa}()),{PostgrestClient:ac,PostgrestQueryBuilder:cc,PostgrestFilterBuilder:hc,PostgrestTransformBuilder:lc,PostgrestBuilder:uc,PostgrestError:dc}=oc;class fc{static detectEnvironment(){var e;if("undefined"!=typeof WebSocket)return{type:"native",constructor:WebSocket};if("undefined"!=typeof globalThis&&void 0!==globalThis.WebSocket)return{type:"native",constructor:globalThis.WebSocket};if("undefined"!=typeof global&&void 0!==global.WebSocket)return{type:"native",constructor:global.WebSocket};if("undefined"!=typeof globalThis&&void 0!==globalThis.WebSocketPair&&void 0===globalThis.WebSocket)return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if("undefined"!=typeof globalThis&&globalThis.EdgeRuntime||"undefined"!=typeof navigator&&(null===(e=navigator.userAgent)||void 0===e?void 0:e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};if("undefined"!=typeof process&&process.versions&&process.versions.node){const e=parseInt(process.versions.node.split(".")[0]);return e>=22?void 0!==globalThis.WebSocket?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${e} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${e} detected without native WebSocket support.`,workaround:'For Node.js < 22, install "ws" package and provide it via the transport option:\nimport ws from "ws"\nnew RealtimeClient(url, { transport: ws })'}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`\n\nSuggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){return new(this.getWebSocketConstructor())(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return"native"===e.type||"ws"===e.type}catch(e){return!1}}}const pc=1e4;var gc,mc,yc,vc,wc,_c,bc,Tc,kc,Sc,Ec;(mc=gc||(gc={}))[mc.connecting=0]="connecting",mc[mc.open=1]="open",mc[mc.closing=2]="closing",mc[mc.closed=3]="closed",(vc=yc||(yc={})).closed="closed",vc.errored="errored",vc.joined="joined",vc.joining="joining",vc.leaving="leaving",(_c=wc||(wc={})).close="phx_close",_c.error="phx_error",_c.join="phx_join",_c.reply="phx_reply",_c.leave="phx_leave",_c.access_token="access_token",(bc||(bc={})).websocket="websocket",(kc=Tc||(Tc={})).Connecting="connecting",kc.Open="open",kc.Closing="closing",kc.Closed="closed";class Ic{constructor(){this.HEADER_LENGTH=1}decode(e,t){return e.constructor===ArrayBuffer?t(this._binaryDecode(e)):t("string"==typeof e?JSON.parse(e):{})}_binaryDecode(e){const t=new DataView(e),n=new TextDecoder;return this._decodeBroadcast(e,t,n)}_decodeBroadcast(e,t,n){const s=t.getUint8(1),i=t.getUint8(2);let r=this.HEADER_LENGTH+2;const o=n.decode(e.slice(r,r+s));r+=s;const a=n.decode(e.slice(r,r+i));r+=i;return{ref:null,topic:o,event:a,payload:JSON.parse(n.decode(e.slice(r,e.byteLength)))}}}class Cc{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}(Ec=Sc||(Sc={})).abstime="abstime",Ec.bool="bool",Ec.date="date",Ec.daterange="daterange",Ec.float4="float4",Ec.float8="float8",Ec.int2="int2",Ec.int4="int4",Ec.int4range="int4range",Ec.int8="int8",Ec.int8range="int8range",Ec.json="json",Ec.jsonb="jsonb",Ec.money="money",Ec.numeric="numeric",Ec.oid="oid",Ec.reltime="reltime",Ec.text="text",Ec.time="time",Ec.timestamp="timestamp",Ec.timestamptz="timestamptz",Ec.timetz="timetz",Ec.tsrange="tsrange",Ec.tstzrange="tstzrange";const Ac=(e,t,n={})=>{var s;const i=null!==(s=n.skipTypes)&&void 0!==s?s:[];return Object.keys(t).reduce((n,s)=>(n[s]=Pc(s,e,t,i),n),{})},Pc=(e,t,n,s)=>{const i=t.find(t=>t.name===e),r=null==i?void 0:i.type,o=n[e];return r&&!s.includes(r)?Oc(r,o):Rc(o)},Oc=(e,t)=>{if("_"===e.charAt(0)){const n=e.slice(1,e.length);return Lc(t,n)}switch(e){case Sc.bool:return jc(t);case Sc.float4:case Sc.float8:case Sc.int2:case Sc.int4:case Sc.int8:case Sc.numeric:case Sc.oid:return Nc(t);case Sc.json:case Sc.jsonb:return Dc(t);case Sc.timestamp:return xc(t);case Sc.abstime:case Sc.date:case Sc.daterange:case Sc.int4range:case Sc.int8range:case Sc.money:case Sc.reltime:case Sc.text:case Sc.time:case Sc.timestamptz:case Sc.timetz:case Sc.tsrange:case Sc.tstzrange:default:return Rc(t)}},Rc=e=>e,jc=e=>{switch(e){case"t":return!0;case"f":return!1;default:return e}},Nc=e=>{if("string"==typeof e){const t=parseFloat(e);if(!Number.isNaN(t))return t}return e},Dc=e=>{if("string"==typeof e)try{return JSON.parse(e)}catch(t){return e}return e},Lc=(e,t)=>{if("string"!=typeof e)return e;const n=e.length-1,s=e[n];if("{"===e[0]&&"}"===s){let s;const r=e.slice(1,n);try{s=JSON.parse("["+r+"]")}catch(i){s=r?r.split(","):[]}return s.map(e=>Oc(t,e))}return e},xc=e=>"string"==typeof e?e.replace(" ","T"):e,Uc=e=>{let t=e;return t=t.replace(/^ws/i,"http"),t=t.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),t.replace(/\/+$/,"")+"/api/broadcast"};class Mc{constructor(e,t,n={},s=1e4){this.channel=e,this.event=t,this.payload=n,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var n;return this._hasReceived(e)&&t(null===(n=this.receivedResp)||void 0===n?void 0:n.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);this.channel._on(this.refEvent,{},e=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=e,this._matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(t=>t.status===e).forEach(e=>e.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var $c,Fc,Bc,Vc,Hc,qc,Wc,zc;(Fc=$c||($c={})).SYNC="sync",Fc.JOIN="join",Fc.LEAVE="leave";class Kc{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const n=(null==t?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(n.state,{},e=>{const{onJoin:t,onLeave:n,onSync:s}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Kc.syncState(this.state,e,t,n),this.pendingDiffs.forEach(e=>{this.state=Kc.syncDiff(this.state,e,t,n)}),this.pendingDiffs=[],s()}),this.channel._on(n.diff,{},e=>{const{onJoin:t,onLeave:n,onSync:s}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(e):(this.state=Kc.syncDiff(this.state,e,t,n),s())}),this.onJoin((e,t,n)=>{this.channel._trigger("presence",{event:"join",key:e,currentPresences:t,newPresences:n})}),this.onLeave((e,t,n)=>{this.channel._trigger("presence",{event:"leave",key:e,currentPresences:t,leftPresences:n})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,n,s){const i=this.cloneDeep(e),r=this.transformState(t),o={},a={};return this.map(i,(e,t)=>{r[e]||(a[e]=t)}),this.map(r,(e,t)=>{const n=i[e];if(n){const s=t.map(e=>e.presence_ref),i=n.map(e=>e.presence_ref),r=t.filter(e=>i.indexOf(e.presence_ref)<0),c=n.filter(e=>s.indexOf(e.presence_ref)<0);r.length>0&&(o[e]=r),c.length>0&&(a[e]=c)}else o[e]=t}),this.syncDiff(i,{joins:o,leaves:a},n,s)}static syncDiff(e,t,n,s){const{joins:i,leaves:r}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return n||(n=()=>{}),s||(s=()=>{}),this.map(i,(t,s)=>{var i;const r=null!==(i=e[t])&&void 0!==i?i:[];if(e[t]=this.cloneDeep(s),r.length>0){const n=e[t].map(e=>e.presence_ref),s=r.filter(e=>n.indexOf(e.presence_ref)<0);e[t].unshift(...s)}n(t,r,s)}),this.map(r,(t,n)=>{let i=e[t];if(!i)return;const r=n.map(e=>e.presence_ref);i=i.filter(e=>r.indexOf(e.presence_ref)<0),e[t]=i,s(t,i,n),0===i.length&&delete e[t]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{const s=e[n];return t[n]="metas"in s?s.metas.map(e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e)):s,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}(Vc=Bc||(Bc={})).ALL="*",Vc.INSERT="INSERT",Vc.UPDATE="UPDATE",Vc.DELETE="DELETE",(qc=Hc||(Hc={})).BROADCAST="broadcast",qc.PRESENCE="presence",qc.POSTGRES_CHANGES="postgres_changes",qc.SYSTEM="system",(zc=Wc||(Wc={})).SUBSCRIBED="SUBSCRIBED",zc.TIMED_OUT="TIMED_OUT",zc.CLOSED="CLOSED",zc.CHANNEL_ERROR="CHANNEL_ERROR";class Gc{constructor(e,t={config:{}},n){this.topic=e,this.params=t,this.socket=n,this.bindings={},this.state=yc.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new Mc(this,wc.join,this.params,this.timeout),this.rejoinTimer=new Cc(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=yc.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(e=>e.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=yc.closed,this.socket._remove(this)}),this._onError(e=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,e),this.state=yc.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=yc.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",e=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,e),this.state=yc.errored,this.rejoinTimer.scheduleTimeout())}),this._on(wc.reply,{},(e,t)=>{this._trigger(this._replyEventName(t),e)}),this.presence=new Kc(this),this.broadcastEndpointURL=Uc(this.socket.endPoint),this.private=this.params.config.private||!1}subscribe(e,t=this.timeout){var n,s;if(this.socket.isConnected()||this.socket.connect(),this.state==yc.closed){const{config:{broadcast:i,presence:r,private:o}}=this.params,a=null!==(s=null===(n=this.bindings.postgres_changes)||void 0===n?void 0:n.map(e=>e.filter))&&void 0!==s?s:[],c=!!this.bindings[Hc.PRESENCE]&&this.bindings[Hc.PRESENCE].length>0,h={},l={broadcast:i,presence:Object.assign(Object.assign({},r),{enabled:c}),postgres_changes:a,private:o};this.socket.accessTokenValue&&(h.access_token=this.socket.accessTokenValue),this._onError(t=>null==e?void 0:e(Wc.CHANNEL_ERROR,t)),this._onClose(()=>null==e?void 0:e(Wc.CLOSED)),this.updateJoinPayload(Object.assign({config:l},h)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:t})=>{var n;if(this.socket.setAuth(),void 0!==t){const s=this.bindings.postgres_changes,i=null!==(n=null==s?void 0:s.length)&&void 0!==n?n:0,r=[];for(let n=0;n<i;n++){const i=s[n],{filter:{event:o,schema:a,table:c,filter:h}}=i,l=t&&t[n];if(!l||l.event!==o||l.schema!==a||l.table!==c||l.filter!==h)return this.unsubscribe(),this.state=yc.errored,void(null==e||e(Wc.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes")));r.push(Object.assign(Object.assign({},i),{id:l.id}))}return this.bindings.postgres_changes=r,void(e&&e(Wc.SUBSCRIBED))}null==e||e(Wc.SUBSCRIBED)}).receive("error",t=>{this.state=yc.errored,null==e||e(Wc.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(t).join(", ")||"error")))}).receive("timeout",()=>{null==e||e(Wc.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,n){return this.state===yc.joined&&e===Hc.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(()=>this.subscribe())),this._on(e,t,n)}async send(e,t={}){var n,s;if(this._canPush()||"broadcast"!==e.type)return new Promise(n=>{var s,i,r;const o=this._push(e.type,e,t.timeout||this.timeout);"broadcast"!==e.type||(null===(r=null===(i=null===(s=this.params)||void 0===s?void 0:s.config)||void 0===i?void 0:i.broadcast)||void 0===r?void 0:r.ack)||n("ok"),o.receive("ok",()=>n("ok")),o.receive("error",()=>n("error")),o.receive("timeout",()=>n("timed out"))});{const{event:r,payload:o}=e,a={method:"POST",headers:{Authorization:this.socket.accessTokenValue?`Bearer ${this.socket.accessTokenValue}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:o,private:this.private}]})};try{const e=await this._fetchWithTimeout(this.broadcastEndpointURL,a,null!==(n=t.timeout)&&void 0!==n?n:this.timeout);return await(null===(s=e.body)||void 0===s?void 0:s.cancel()),e.ok?"ok":"error"}catch(i){return"AbortError"===i.name?"timed out":"error"}}}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=yc.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(wc.close,"leave",this._joinRef())};this.joinPush.destroy();let n=null;return new Promise(s=>{n=new Mc(this,wc.leave,{},e),n.receive("ok",()=>{t(),s("ok")}).receive("timeout",()=>{t(),s("timed out")}).receive("error",()=>{s("error")}),n.send(),this._canPush()||n.trigger("ok",{})}).finally(()=>{null==n||n.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=yc.closed,this.bindings={}}async _fetchWithTimeout(e,t,n){const s=new AbortController,i=setTimeout(()=>s.abort(),n),r=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:s.signal}));return clearTimeout(i),r}_push(e,t,n=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new Mc(this,e,t,n);return this._canPush()?s.send():this._addToPushBuffer(s),s}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>100){const e=this.pushBuffer.shift();e&&(e.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${e.event}`,e.payload))}}_onMessage(e,t,n){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,n){var s,i;const r=e.toLocaleLowerCase(),{close:o,error:a,leave:c,join:h}=wc;if(n&&[o,a,c,h].indexOf(r)>=0&&n!==this._joinRef())return;let l=this._onMessage(r,t,n);if(t&&!l)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(r)?null===(s=this.bindings.postgres_changes)||void 0===s||s.filter(e=>{var t,n,s;return"*"===(null===(t=e.filter)||void 0===t?void 0:t.event)||(null===(s=null===(n=e.filter)||void 0===n?void 0:n.event)||void 0===s?void 0:s.toLocaleLowerCase())===r}).map(e=>e.callback(l,n)):null===(i=this.bindings[r])||void 0===i||i.filter(e=>{var n,s,i,o,a,c;if(["broadcast","presence","postgres_changes"].includes(r)){if("id"in e){const r=e.id,o=null===(n=e.filter)||void 0===n?void 0:n.event;return r&&(null===(s=t.ids)||void 0===s?void 0:s.includes(r))&&("*"===o||(null==o?void 0:o.toLocaleLowerCase())===(null===(i=t.data)||void 0===i?void 0:i.type.toLocaleLowerCase()))}{const n=null===(a=null===(o=null==e?void 0:e.filter)||void 0===o?void 0:o.event)||void 0===a?void 0:a.toLocaleLowerCase();return"*"===n||n===(null===(c=null==t?void 0:t.event)||void 0===c?void 0:c.toLocaleLowerCase())}}return e.type.toLocaleLowerCase()===r}).map(e=>{if("object"==typeof l&&"ids"in l){const e=l.data,{schema:t,table:n,commit_timestamp:s,type:i,errors:r}=e,o={schema:t,table:n,commit_timestamp:s,eventType:i,new:{},old:{},errors:r};l=Object.assign(Object.assign({},o),this._getPayloadRecords(e))}e.callback(l,n)})}_isClosed(){return this.state===yc.closed}_isJoined(){return this.state===yc.joined}_isJoining(){return this.state===yc.joining}_isLeaving(){return this.state===yc.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,n){const s=e.toLocaleLowerCase(),i={type:s,filter:t,callback:n};return this.bindings[s]?this.bindings[s].push(i):this.bindings[s]=[i],this}_off(e,t){const n=e.toLocaleLowerCase();return this.bindings[n]&&(this.bindings[n]=this.bindings[n].filter(e=>{var s;return!((null===(s=e.type)||void 0===s?void 0:s.toLocaleLowerCase())===n&&Gc.isEqual(e.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(e[n]!==t[n])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(wc.close,{},e)}_onError(e){this._on(wc.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=yc.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return"INSERT"!==e.type&&"UPDATE"!==e.type||(t.new=Ac(e.columns,e.record)),"UPDATE"!==e.type&&"DELETE"!==e.type||(t.old=Ac(e.columns,e.old_record)),t}}const Jc=()=>{},Xc=25e3,Yc=10,Zc=100,Qc=[1e3,2e3,5e3,1e4];class eh{constructor(e,n){var s;if(this.accessTokenValue=null,this.apiKey=null,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=pc,this.transport=null,this.heartbeatIntervalMs=Xc,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=Jc,this.ref=0,this.reconnectTimer=null,this.logger=Jc,this.conn=null,this.sendBuffer=[],this.serializer=new Ic,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._resolveFetch=e=>{let n;return n=e||("undefined"==typeof fetch?(...e)=>t(async()=>{const{default:e}=await Promise.resolve().then(()=>Fa);return{default:e}},void 0,import.meta.url).then(({default:t})=>t(...e)).catch(e=>{throw new Error(`Failed to load @supabase/node-fetch: ${e.message}. This is required for HTTP requests in Node.js environments without native fetch.`)}):fetch),(...e)=>n(...e)},!(null===(s=null==n?void 0:n.params)||void 0===s?void 0:s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=n.params.apikey,this.endPoint=`${e}/${bc.websocket}`,this.httpEndpoint=Uc(e),this._initializeOptions(n),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(null==n?void 0:n.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||null!==this.conn&&this.isConnected())){if(this._setConnectionState("connecting"),this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=fc.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;if(t.includes("Node.js"))throw new Error(`${t}\n\nTo use Realtime in Node.js, you need to provide a WebSocket implementation:\n\nOption 1: Use Node.js 22+ which has native WebSocket support\nOption 2: Install and provide the "ws" package:\n\n  npm install ws\n\n  import ws from "ws"\n  const client = new RealtimeClient(url, {\n    ...options,\n    transport: ws\n  })`);throw new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:"1.0.0"}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const n=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(n),this._setConnectionState("disconnected")},e?this.conn.close(e,null!=t?t:""):this.conn.close(),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return 0===this.channels.length&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(e=>e.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,n){this.logger(e,t,n)}connectionState(){switch(this.conn&&this.conn.readyState){case gc.connecting:return Tc.Connecting;case gc.open:return Tc.Open;case gc.closing:return Tc.Closing;default:return Tc.Closed}}isConnected(){return this.connectionState()===Tc.Open}isConnecting(){return"connecting"===this._connectionState}isDisconnecting(){return"disconnecting"===this._connectionState}channel(e,t={config:{}}){const n=`realtime:${e}`,s=this.getChannels().find(e=>e.topic===n);if(s)return s;{const n=new Gc(`realtime:${e}`,t,this);return this.channels.push(n),n}}push(e){const{topic:t,event:n,payload:s,ref:i}=e,r=()=>{this.encode(e,e=>{var t;null===(t=this.conn)||void 0===t||t.send(e)})};this.log("push",`${t} ${n} (${i})`,s),this.isConnected()?r():this.sendBuffer.push(r)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}async sendHeartbeat(){var e;if(this.isConnected()){if(this.pendingHeartbeatRef)return this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),this.heartbeatCallback("timeout"),this._wasManualDisconnect=!1,null===(e=this.conn)||void 0===e||e.close(1e3,"heartbeat timeout"),void setTimeout(()=>{var e;this.isConnected()||null===(e=this.reconnectTimer)||void 0===e||e.scheduleTimeout()},Zc);this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.heartbeatCallback("sent"),this._setAuthSafely("heartbeat")}else this.heartbeatCallback("disconnected")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(t=>t.topic===e&&(t._isJoined()||t._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,e=>{"phoenix"===e.topic&&"phx_reply"===e.event&&this.heartbeatCallback("ok"===e.payload.status?"ok":"error"),e.ref&&e.ref===this.pendingHeartbeatRef&&(this.pendingHeartbeatRef=null);const{topic:t,event:n,payload:s,ref:i}=e,r=i?`(${i})`:"",o=s.status||"";this.log("receive",`${o} ${t} ${n} ${r}`.trim(),s),this.channels.filter(e=>e._isMember(t)).forEach(e=>e._trigger(n,s,i)),this._triggerStateCallbacks("message",e)})}_clearTimer(e){var t;"heartbeat"===e&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):"reconnect"===e&&(null===(t=this.reconnectTimer)||void 0===t||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_teardownConnection(){this.conn&&(this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null),this._clearAllTimers(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),this.flushSendBuffer(),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=e=>{this.log("worker","worker error",e.message),this.workerRef.terminate()},this.workerRef.onmessage=e=>{"keepAlive"===e.data.event&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||null===(t=this.reconnectTimer)||void 0===t||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e)}_triggerChanError(){this.channels.forEach(e=>e._trigger(wc.error))}_appendParams(e,t){if(0===Object.keys(t).length)return e;const n=e.match(/\?/)?"&":"?";return`${e}${n}${new URLSearchParams(t)}`}_workerObjectUrl(e){let t;if(e)t=e;else{const e=new Blob(['\n  addEventListener("message", (e) => {\n    if (e.data.event === "start") {\n      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);\n    }\n  });'],{type:"application/javascript"});t=URL.createObjectURL(e)}return t}_setConnectionState(e,t=!1){this._connectionState=e,"connecting"===e?this._wasManualDisconnect=!1:"disconnecting"===e&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t;t=e||(this.accessToken?await this.accessToken():this.accessTokenValue),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(e=>{const n={access_token:t,version:"realtime-js/2.15.1"};t&&e.updateJoinPayload(n),e.joinedOnce&&e._isJoined()&&e._push(wc.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this.setAuth().catch(t=>{this.log("error",`error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(n=>{try{n(t)}catch(s){this.log("error",`error in ${e} callback`,s)}})}catch(n){this.log("error",`error triggering ${e} callbacks`,n)}}_setupReconnectionTimer(){this.reconnectTimer=new Cc(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},Yc)},this.reconnectAfterMs)}_initializeOptions(e){var t,n,s,i,r,o,a,c;if(this.transport=null!==(t=null==e?void 0:e.transport)&&void 0!==t?t:null,this.timeout=null!==(n=null==e?void 0:e.timeout)&&void 0!==n?n:pc,this.heartbeatIntervalMs=null!==(s=null==e?void 0:e.heartbeatIntervalMs)&&void 0!==s?s:Xc,this.worker=null!==(i=null==e?void 0:e.worker)&&void 0!==i&&i,this.accessToken=null!==(r=null==e?void 0:e.accessToken)&&void 0!==r?r:null,(null==e?void 0:e.params)&&(this.params=e.params),(null==e?void 0:e.logger)&&(this.logger=e.logger),((null==e?void 0:e.logLevel)||(null==e?void 0:e.log_level))&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=null!==(o=null==e?void 0:e.reconnectAfterMs)&&void 0!==o?o:e=>Qc[e-1]||1e4,this.encode=null!==(a=null==e?void 0:e.encode)&&void 0!==a?a:(e,t)=>t(JSON.stringify(e)),this.decode=null!==(c=null==e?void 0:e.decode)&&void 0!==c?c:this.serializer.decode.bind(this.serializer),this.worker){if("undefined"!=typeof window&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=null==e?void 0:e.workerUrl}}}class th extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function nh(e){return"object"==typeof e&&null!==e&&"__isStorageError"in e}class sh extends th{constructor(e,t,n){super(e),this.name="StorageApiError",this.status=t,this.statusCode=n}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}}class ih extends th{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}var rh=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{c(s.next(e))}catch(t){r(t)}}function a(e){try{c(s.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(o,a)}c((s=s.apply(e,t||[])).next())})};const oh=e=>{let n;return n=e||("undefined"==typeof fetch?(...e)=>t(async()=>{const{default:e}=await Promise.resolve().then(()=>Fa);return{default:e}},void 0,import.meta.url).then(({default:t})=>t(...e)):fetch),(...e)=>n(...e)},ah=e=>{if(Array.isArray(e))return e.map(e=>ah(e));if("function"==typeof e||e!==Object(e))return e;const t={};return Object.entries(e).forEach(([e,n])=>{const s=e.replace(/([-_][a-z])/gi,e=>e.toUpperCase().replace(/[-_]/g,""));t[s]=ah(n)}),t};var ch=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{c(s.next(e))}catch(t){r(t)}}function a(e){try{c(s.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(o,a)}c((s=s.apply(e,t||[])).next())})};const hh=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),lh=(e,n,s)=>ch(void 0,void 0,void 0,function*(){const i=yield rh(void 0,void 0,void 0,function*(){return"undefined"==typeof Response?(yield t(()=>Promise.resolve().then(()=>Fa),void 0,import.meta.url)).Response:Response});e instanceof i&&!(null==s?void 0:s.noResolveJson)?e.json().then(t=>{const s=e.status||500,i=(null==t?void 0:t.statusCode)||s+"";n(new sh(hh(t),s,i))}).catch(e=>{n(new ih(hh(e),e))}):n(new ih(hh(e),e))}),uh=(e,t,n,s)=>{const i={method:e,headers:(null==t?void 0:t.headers)||{}};return"GET"!==e&&s?((e=>{if("object"!=typeof e||null===e)return!1;const t=Object.getPrototypeOf(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)})(s)?(i.headers=Object.assign({"Content-Type":"application/json"},null==t?void 0:t.headers),i.body=JSON.stringify(s)):i.body=s,Object.assign(Object.assign({},i),n)):i};function dh(e,t,n,s,i,r){return ch(this,void 0,void 0,function*(){return new Promise((o,a)=>{e(n,uh(t,s,i,r)).then(e=>{if(!e.ok)throw e;return(null==s?void 0:s.noResolveJson)?e:e.json()}).then(e=>o(e)).catch(e=>lh(e,a,s))})})}function fh(e,t,n,s){return ch(this,void 0,void 0,function*(){return dh(e,"GET",t,n,s)})}function ph(e,t,n,s,i){return ch(this,void 0,void 0,function*(){return dh(e,"POST",t,s,i,n)})}function gh(e,t,n,s,i){return ch(this,void 0,void 0,function*(){return dh(e,"PUT",t,s,i,n)})}function mh(e,t,n,s,i){return ch(this,void 0,void 0,function*(){return dh(e,"DELETE",t,s,i,n)})}var yh=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{c(s.next(e))}catch(t){r(t)}}function a(e){try{c(s.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(o,a)}c((s=s.apply(e,t||[])).next())})};const vh={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},wh={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class _h{constructor(e,t={},n,s){this.url=e,this.headers=t,this.bucketId=n,this.fetch=oh(s)}uploadOrUpdate(e,t,n,s){return yh(this,void 0,void 0,function*(){try{let i;const r=Object.assign(Object.assign({},wh),s);let o=Object.assign(Object.assign({},this.headers),"POST"===e&&{"x-upsert":String(r.upsert)});const a=r.metadata;"undefined"!=typeof Blob&&n instanceof Blob?(i=new FormData,i.append("cacheControl",r.cacheControl),a&&i.append("metadata",this.encodeMetadata(a)),i.append("",n)):"undefined"!=typeof FormData&&n instanceof FormData?(i=n,i.append("cacheControl",r.cacheControl),a&&i.append("metadata",this.encodeMetadata(a))):(i=n,o["cache-control"]=`max-age=${r.cacheControl}`,o["content-type"]=r.contentType,a&&(o["x-metadata"]=this.toBase64(this.encodeMetadata(a)))),(null==s?void 0:s.headers)&&(o=Object.assign(Object.assign({},o),s.headers));const c=this._removeEmptyFolders(t),h=this._getFinalPath(c),l=yield("PUT"==e?gh:ph)(this.fetch,`${this.url}/object/${h}`,i,Object.assign({headers:o},(null==r?void 0:r.duplex)?{duplex:r.duplex}:{}));return{data:{path:c,id:l.Id,fullPath:l.Key},error:null}}catch(i){if(nh(i))return{data:null,error:i};throw i}})}upload(e,t,n){return yh(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,n)})}uploadToSignedUrl(e,t,n,s){return yh(this,void 0,void 0,function*(){const i=this._removeEmptyFolders(e),r=this._getFinalPath(i),o=new URL(this.url+`/object/upload/sign/${r}`);o.searchParams.set("token",t);try{let e;const t=Object.assign({upsert:wh.upsert},s),r=Object.assign(Object.assign({},this.headers),{"x-upsert":String(t.upsert)});"undefined"!=typeof Blob&&n instanceof Blob?(e=new FormData,e.append("cacheControl",t.cacheControl),e.append("",n)):"undefined"!=typeof FormData&&n instanceof FormData?(e=n,e.append("cacheControl",t.cacheControl)):(e=n,r["cache-control"]=`max-age=${t.cacheControl}`,r["content-type"]=t.contentType);return{data:{path:i,fullPath:(yield gh(this.fetch,o.toString(),e,{headers:r})).Key},error:null}}catch(a){if(nh(a))return{data:null,error:a};throw a}})}createSignedUploadUrl(e,t){return yh(this,void 0,void 0,function*(){try{let n=this._getFinalPath(e);const s=Object.assign({},this.headers);(null==t?void 0:t.upsert)&&(s["x-upsert"]="true");const i=yield ph(this.fetch,`${this.url}/object/upload/sign/${n}`,{},{headers:s}),r=new URL(this.url+i.url),o=r.searchParams.get("token");if(!o)throw new th("No token returned by API");return{data:{signedUrl:r.toString(),path:e,token:o},error:null}}catch(n){if(nh(n))return{data:null,error:n};throw n}})}update(e,t,n){return yh(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,n)})}move(e,t,n){return yh(this,void 0,void 0,function*(){try{return{data:yield ph(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:null==n?void 0:n.destinationBucket},{headers:this.headers}),error:null}}catch(s){if(nh(s))return{data:null,error:s};throw s}})}copy(e,t,n){return yh(this,void 0,void 0,function*(){try{return{data:{path:(yield ph(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:null==n?void 0:n.destinationBucket},{headers:this.headers})).Key},error:null}}catch(s){if(nh(s))return{data:null,error:s};throw s}})}createSignedUrl(e,t,n){return yh(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e),i=yield ph(this.fetch,`${this.url}/object/sign/${s}`,Object.assign({expiresIn:t},(null==n?void 0:n.transform)?{transform:n.transform}:{}),{headers:this.headers});const r=(null==n?void 0:n.download)?`&download=${!0===n.download?"":n.download}`:"";return i={signedUrl:encodeURI(`${this.url}${i.signedURL}${r}`)},{data:i,error:null}}catch(s){if(nh(s))return{data:null,error:s};throw s}})}createSignedUrls(e,t,n){return yh(this,void 0,void 0,function*(){try{const s=yield ph(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),i=(null==n?void 0:n.download)?`&download=${!0===n.download?"":n.download}`:"";return{data:s.map(e=>Object.assign(Object.assign({},e),{signedUrl:e.signedURL?encodeURI(`${this.url}${e.signedURL}${i}`):null})),error:null}}catch(s){if(nh(s))return{data:null,error:s};throw s}})}download(e,t){return yh(this,void 0,void 0,function*(){const n=void 0!==(null==t?void 0:t.transform)?"render/image/authenticated":"object",s=this.transformOptsToQueryString((null==t?void 0:t.transform)||{}),i=s?`?${s}`:"";try{const t=this._getFinalPath(e),s=yield fh(this.fetch,`${this.url}/${n}/${t}${i}`,{headers:this.headers,noResolveJson:!0});return{data:yield s.blob(),error:null}}catch(r){if(nh(r))return{data:null,error:r};throw r}})}info(e){return yh(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const e=yield fh(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:ah(e),error:null}}catch(n){if(nh(n))return{data:null,error:n};throw n}})}exists(e){return yh(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield function(e,t,n,s){return ch(this,void 0,void 0,function*(){return dh(e,"HEAD",t,Object.assign(Object.assign({},n),{noResolveJson:!0}),s)})}(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(n){if(nh(n)&&n instanceof ih){const e=n.originalError;if([400,404].includes(null==e?void 0:e.status))return{data:!1,error:n}}throw n}})}getPublicUrl(e,t){const n=this._getFinalPath(e),s=[],i=(null==t?void 0:t.download)?`download=${!0===t.download?"":t.download}`:"";""!==i&&s.push(i);const r=void 0!==(null==t?void 0:t.transform)?"render/image":"object",o=this.transformOptsToQueryString((null==t?void 0:t.transform)||{});""!==o&&s.push(o);let a=s.join("&");return""!==a&&(a=`?${a}`),{data:{publicUrl:encodeURI(`${this.url}/${r}/public/${n}${a}`)}}}remove(e){return yh(this,void 0,void 0,function*(){try{return{data:yield mh(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(nh(t))return{data:null,error:t};throw t}})}list(e,t,n){return yh(this,void 0,void 0,function*(){try{const s=Object.assign(Object.assign(Object.assign({},vh),t),{prefix:e||""});return{data:yield ph(this.fetch,`${this.url}/object/list/${this.bucketId}`,s,{headers:this.headers},n),error:null}}catch(s){if(nh(s))return{data:null,error:s};throw s}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return"undefined"!=typeof Buffer?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const bh={"X-Client-Info":"storage-js/2.10.4"};var Th=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{c(s.next(e))}catch(t){r(t)}}function a(e){try{c(s.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(o,a)}c((s=s.apply(e,t||[])).next())})};class kh{constructor(e,t={},n,s){const i=new URL(e);if(null==s?void 0:s.useNewHostname){/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes("storage.supabase.")&&(i.hostname=i.hostname.replace("supabase.","storage.supabase."))}this.url=i.href,this.headers=Object.assign(Object.assign({},bh),t),this.fetch=oh(n)}listBuckets(){return Th(this,void 0,void 0,function*(){try{return{data:yield fh(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(e){if(nh(e))return{data:null,error:e};throw e}})}getBucket(e){return Th(this,void 0,void 0,function*(){try{return{data:yield fh(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(nh(t))return{data:null,error:t};throw t}})}createBucket(e,t={public:!1}){return Th(this,void 0,void 0,function*(){try{return{data:yield ph(this.fetch,`${this.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(nh(n))return{data:null,error:n};throw n}})}updateBucket(e,t){return Th(this,void 0,void 0,function*(){try{return{data:yield gh(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(nh(n))return{data:null,error:n};throw n}})}emptyBucket(e){return Th(this,void 0,void 0,function*(){try{return{data:yield ph(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(nh(t))return{data:null,error:t};throw t}})}deleteBucket(e){return Th(this,void 0,void 0,function*(){try{return{data:yield mh(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(nh(t))return{data:null,error:t};throw t}})}}class Sh extends kh{constructor(e,t={},n,s){super(e,t,n,s)}from(e){return new _h(this.url,this.headers,e,this.fetch)}}let Eh="";Eh="undefined"!=typeof Deno?"deno":"undefined"!=typeof document?"web":"undefined"!=typeof navigator&&"ReactNative"===navigator.product?"react-native":"node";const Ih={headers:{"X-Client-Info":`supabase-js-${Eh}/2.55.0`}},Ch={schema:"public"},Ah={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Ph={};var Oh=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{c(s.next(e))}catch(t){r(t)}}function a(e){try{c(s.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(o,a)}c((s=s.apply(e,t||[])).next())})};const Rh=(e,t,n)=>{const s=(e=>{let t;return t=e||("undefined"==typeof fetch?xa:fetch),(...e)=>t(...e)})(n),i="undefined"==typeof Headers?Ua:Headers;return(n,r)=>Oh(void 0,void 0,void 0,function*(){var o;const a=null!==(o=yield t())&&void 0!==o?o:e;let c=new i(null==r?void 0:r.headers);return c.has("apikey")||c.set("apikey",e),c.has("Authorization")||c.set("Authorization",`Bearer ${a}`),s(n,Object.assign(Object.assign({},r),{headers:c}))})};var jh=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{c(s.next(e))}catch(t){r(t)}}function a(e){try{c(s.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(o,a)}c((s=s.apply(e,t||[])).next())})};const Nh="2.71.1",Dh=3e4,Lh=9e4,xh={"X-Client-Info":`gotrue-js/${Nh}`},Uh="X-Supabase-Api-Version",Mh={timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"},$h=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;class Fh extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=n}}function Bh(e){return"object"==typeof e&&null!==e&&"__isAuthError"in e}class Vh extends Fh{constructor(e,t,n){super(e,t,n),this.name="AuthApiError",this.status=t,this.code=n}}class Hh extends Fh{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class qh extends Fh{constructor(e,t,n,s){super(e,n,s),this.name=t,this.status=n}}class Wh extends qh{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}class zh extends qh{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Kh extends qh{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Gh extends qh{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Jh extends qh{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Xh extends qh{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function Yh(e){return Bh(e)&&"AuthRetryableFetchError"===e.name}class Zh extends qh{constructor(e,t,n){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=n}}class Qh extends qh{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const el="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),tl=" \t\n\r=".split(""),nl=(()=>{const e=new Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<tl.length;t+=1)e[tl[t].charCodeAt(0)]=-2;for(let t=0;t<el.length;t+=1)e[el[t].charCodeAt(0)]=t;return e})();function sl(e,t,n){if(null!==e)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;){const e=t.queue>>t.queuedBits-6&63;n(el[e]),t.queuedBits-=6}else if(t.queuedBits>0)for(t.queue=t.queue<<6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;){const e=t.queue>>t.queuedBits-6&63;n(el[e]),t.queuedBits-=6}}function il(e,t,n){const s=nl[e];if(!(s>-1)){if(-2===s)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}for(t.queue=t.queue<<6|s,t.queuedBits+=6;t.queuedBits>=8;)n(t.queue>>t.queuedBits-8&255),t.queuedBits-=8}function rl(e){const t=[],n=e=>{t.push(String.fromCodePoint(e))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},r=e=>{!function(e,t,n){if(0===t.utf8seq){if(e<=127)return void n(e);for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(2===t.utf8seq)t.codepoint=31&e;else if(3===t.utf8seq)t.codepoint=15&e;else{if(4!==t.utf8seq)throw new Error("Invalid UTF-8 sequence");t.codepoint=7&e}t.utf8seq-=1}else if(t.utf8seq>0){if(e<=127)throw new Error("Invalid UTF-8 sequence");t.codepoint=t.codepoint<<6|63&e,t.utf8seq-=1,0===t.utf8seq&&n(t.codepoint)}}(e,s,n)};for(let o=0;o<e.length;o+=1)il(e.charCodeAt(o),i,r);return t.join("")}function ol(e,t){if(!(e<=127)){if(e<=2047)return t(192|e>>6),void t(128|63&e);if(e<=65535)return t(224|e>>12),t(128|e>>6&63),void t(128|63&e);if(e<=1114111)return t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),void t(128|63&e);throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}t(e)}function al(e){const t=[],n={queue:0,queuedBits:0},s=e=>{t.push(e)};for(let i=0;i<e.length;i+=1)il(e.charCodeAt(i),n,s);return new Uint8Array(t)}function cl(e){const t=[];return function(e,t){for(let n=0;n<e.length;n+=1){let s=e.charCodeAt(n);if(s>55295&&s<=56319){const t=1024*(s-55296)&65535;s=65536+(e.charCodeAt(n+1)-56320&65535|t),n+=1}ol(s,t)}}(e,e=>t.push(e)),new Uint8Array(t)}function hl(e){const t=[],n={queue:0,queuedBits:0},s=e=>{t.push(e)};return e.forEach(e=>sl(e,n,s)),sl(null,n,s),t.join("")}const ll=()=>"undefined"!=typeof window&&"undefined"!=typeof document,ul={tested:!1,writable:!1},dl=()=>{if(!ll())return!1;try{if("object"!=typeof globalThis.localStorage)return!1}catch(t){return!1}if(ul.tested)return ul.writable;const e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),ul.tested=!0,ul.writable=!0}catch(t){ul.tested=!0,ul.writable=!1}return ul.writable};const fl=e=>{let n;return n=e||("undefined"==typeof fetch?(...e)=>t(async()=>{const{default:e}=await Promise.resolve().then(()=>Fa);return{default:e}},void 0,import.meta.url).then(({default:t})=>t(...e)):fetch),(...e)=>n(...e)},pl=async(e,t,n)=>{await e.setItem(t,JSON.stringify(n))},gl=async(e,t)=>{const n=await e.getItem(t);if(!n)return null;try{return JSON.parse(n)}catch(s){return n}},ml=async(e,t)=>{await e.removeItem(t)};class yl{constructor(){this.promise=new yl.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}function vl(e){const t=e.split(".");if(3!==t.length)throw new Qh("Invalid JWT structure");for(let n=0;n<t.length;n++)if(!$h.test(t[n]))throw new Qh("JWT not in base64url format");return{header:JSON.parse(rl(t[0])),payload:JSON.parse(rl(t[1])),signature:al(t[2]),raw:{header:t[0],payload:t[1]}}}function wl(e){return("0"+e.toString(16)).substr(-2)}async function _l(e){if(!("undefined"!=typeof crypto&&void 0!==crypto.subtle&&"undefined"!=typeof TextEncoder))return e;const t=await async function(e){const t=(new TextEncoder).encode(e),n=await crypto.subtle.digest("SHA-256",t),s=new Uint8Array(n);return Array.from(s).map(e=>String.fromCharCode(e)).join("")}(e);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function bl(e,t,n=!1){const s=function(){const e=new Uint32Array(56);if("undefined"==typeof crypto){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",t=e.length;let n="";for(let s=0;s<56;s++)n+=e.charAt(Math.floor(Math.random()*t));return n}return crypto.getRandomValues(e),Array.from(e,wl).join("")}();let i=s;n&&(i+="/PASSWORD_RECOVERY"),await pl(e,`${t}-code-verifier`,i);const r=await _l(s);return[r,s===r?"plain":"s256"]}yl.promiseConstructor=Promise;const Tl=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;const kl=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Sl(e){if(!kl.test(e))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function El(){return new Proxy({},{get:(e,t)=>{if("__isUserNotAvailableProxy"===t)return!0;if("symbol"==typeof t){const e=t.toString();if("Symbol(Symbol.toPrimitive)"===e||"Symbol(Symbol.toStringTag)"===e||"Symbol(util.inspect.custom)"===e)return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Il(e){return JSON.parse(JSON.stringify(e))}const Cl=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),Al=[502,503,504];async function Pl(e){var t,n;if(!("object"==typeof(n=e)&&null!==n&&"status"in n&&"ok"in n&&"json"in n&&"function"==typeof n.json))throw new Xh(Cl(e),0);if(Al.includes(e.status))throw new Xh(Cl(e),e.status);let s,i;try{s=await e.json()}catch(o){throw new Hh(Cl(o),o)}const r=function(e){const t=e.headers.get(Uh);if(!t)return null;if(!t.match(Tl))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch(o){return null}}(e);if(r&&r.getTime()>=Mh.timestamp&&"object"==typeof s&&s&&"string"==typeof s.code?i=s.code:"object"==typeof s&&s&&"string"==typeof s.error_code&&(i=s.error_code),i){if("weak_password"===i)throw new Zh(Cl(s),e.status,(null===(t=s.weak_password)||void 0===t?void 0:t.reasons)||[]);if("session_not_found"===i)throw new Wh}else if("object"==typeof s&&s&&"object"==typeof s.weak_password&&s.weak_password&&Array.isArray(s.weak_password.reasons)&&s.weak_password.reasons.length&&s.weak_password.reasons.reduce((e,t)=>e&&"string"==typeof t,!0))throw new Zh(Cl(s),e.status,s.weak_password.reasons);throw new Vh(Cl(s),e.status||500,i)}async function Ol(e,t,n,s){var i;const r=Object.assign({},null==s?void 0:s.headers);r[Uh]||(r[Uh]=Mh.name),(null==s?void 0:s.jwt)&&(r.Authorization=`Bearer ${s.jwt}`);const o=null!==(i=null==s?void 0:s.query)&&void 0!==i?i:{};(null==s?void 0:s.redirectTo)&&(o.redirect_to=s.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",c=await async function(e,t,n,s,i,r){const o=((e,t,n,s)=>{const i={method:e,headers:(null==t?void 0:t.headers)||{}};return"GET"===e?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},null==t?void 0:t.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),n))})(t,s,i,r);let a;try{a=await e(n,Object.assign({},o))}catch(c){throw new Xh(Cl(c),0)}a.ok||await Pl(a);if(null==s?void 0:s.noResolveJson)return a;try{return await a.json()}catch(c){await Pl(c)}}(e,t,n+a,{headers:r,noResolveJson:null==s?void 0:s.noResolveJson},{},null==s?void 0:s.body);return(null==s?void 0:s.xform)?null==s?void 0:s.xform(c):{data:Object.assign({},c),error:null}}function Rl(e){var t;let n=null;var s;(function(e){return e.access_token&&e.refresh_token&&e.expires_in})(e)&&(n=Object.assign({},e),e.expires_at||(n.expires_at=(s=e.expires_in,Math.round(Date.now()/1e3)+s)));return{data:{session:n,user:null!==(t=e.user)&&void 0!==t?t:e},error:null}}function jl(e){const t=Rl(e);return!t.error&&e.weak_password&&"object"==typeof e.weak_password&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&"string"==typeof e.weak_password.message&&e.weak_password.reasons.reduce((e,t)=>e&&"string"==typeof t,!0)&&(t.data.weak_password=e.weak_password),t}function Nl(e){var t;return{data:{user:null!==(t=e.user)&&void 0!==t?t:e},error:null}}function Dl(e){return{data:e,error:null}}function Ll(e){const{action_link:t,email_otp:n,hashed_token:s,redirect_to:i,verification_type:r}=e,o=function(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(n[s[i]]=e[s[i]])}return n}(e,["action_link","email_otp","hashed_token","redirect_to","verification_type"]);return{data:{properties:{action_link:t,email_otp:n,hashed_token:s,redirect_to:i,verification_type:r},user:Object.assign({},o)},error:null}}function xl(e){return e}const Ul=["global","local","others"];class Ml{constructor({url:e="",headers:t={},fetch:n}){this.url=e,this.headers=t,this.fetch=fl(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(e,t=Ul[0]){if(Ul.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Ul.join(", ")}`);try{return await Ol(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(n){if(Bh(n))return{data:null,error:n};throw n}}async inviteUserByEmail(e,t={}){try{return await Ol(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Nl})}catch(n){if(Bh(n))return{data:{user:null},error:n};throw n}}async generateLink(e){try{const{options:t}=e,n=function(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(n[s[i]]=e[s[i]])}return n}(e,["options"]),s=Object.assign(Object.assign({},n),t);return"newEmail"in n&&(s.new_email=null==n?void 0:n.newEmail,delete s.newEmail),await Ol(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:Ll,redirectTo:null==t?void 0:t.redirectTo})}catch(t){if(Bh(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await Ol(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Nl})}catch(t){if(Bh(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,n,s,i,r,o,a;try{const c={nextPage:null,lastPage:0,total:0},h=await Ol(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:null!==(n=null===(t=null==e?void 0:e.page)||void 0===t?void 0:t.toString())&&void 0!==n?n:"",per_page:null!==(i=null===(s=null==e?void 0:e.perPage)||void 0===s?void 0:s.toString())&&void 0!==i?i:""},xform:xl});if(h.error)throw h.error;const l=await h.json(),u=null!==(r=h.headers.get("x-total-count"))&&void 0!==r?r:0,d=null!==(a=null===(o=h.headers.get("link"))||void 0===o?void 0:o.split(","))&&void 0!==a?a:[];return d.length>0&&(d.forEach(e=>{const t=parseInt(e.split(";")[0].split("=")[1].substring(0,1)),n=JSON.parse(e.split(";")[1].split("=")[1]);c[`${n}Page`]=t}),c.total=parseInt(u)),{data:Object.assign(Object.assign({},l),c),error:null}}catch(c){if(Bh(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){Sl(e);try{return await Ol(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Nl})}catch(t){if(Bh(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){Sl(e);try{return await Ol(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Nl})}catch(n){if(Bh(n))return{data:{user:null},error:n};throw n}}async deleteUser(e,t=!1){Sl(e);try{return await Ol(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Nl})}catch(n){if(Bh(n))return{data:{user:null},error:n};throw n}}async _listFactors(e){Sl(e.userId);try{const{data:t,error:n}=await Ol(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:e=>({data:{factors:e},error:null})});return{data:t,error:n}}catch(t){if(Bh(t))return{data:null,error:t};throw t}}async _deleteFactor(e){Sl(e.userId),Sl(e.id);try{return{data:await Ol(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(Bh(t))return{data:null,error:t};throw t}}}function $l(e={}){return{getItem:t=>e[t]||null,setItem:(t,n)=>{e[t]=n},removeItem:t=>{delete e[t]}}}const Fl=!!(globalThis&&dl()&&globalThis.localStorage&&"true"===globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug"));class Bl extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class Vl extends Bl{}async function Hl(e,t,n){const s=new globalThis.AbortController;return t>0&&setTimeout(()=>{s.abort()},t),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,0===t?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:s.signal},async s=>{if(!s){if(0===t)throw new Vl(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);if(Fl)try{await globalThis.navigator.locks.query()}catch(i){}return await n()}try{return await n()}finally{}}))}!function(){if("object"!=typeof globalThis)try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch(e){"undefined"!=typeof self&&(self.globalThis=self)}}();const ql={url:"http://localhost:9999",storageKey:"supabase.auth.token",autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:xh,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1};async function Wl(e,t,n){return await n()}const zl={};class Kl{constructor(e){var t,n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=Kl.nextInstanceID,Kl.nextInstanceID+=1,this.instanceID>0&&ll();const s=Object.assign(Object.assign({},ql),e);if(this.logDebugMessages=!!s.debug,"function"==typeof s.debug&&(this.logger=s.debug),this.persistSession=s.persistSession,this.storageKey=s.storageKey,this.autoRefreshToken=s.autoRefreshToken,this.admin=new Ml({url:s.url,headers:s.headers,fetch:s.fetch}),this.url=s.url,this.headers=s.headers,this.fetch=fl(s.fetch),this.lock=s.lock||Wl,this.detectSessionInUrl=s.detectSessionInUrl,this.flowType=s.flowType,this.hasCustomAuthorizationHeader=s.hasCustomAuthorizationHeader,s.lock?this.lock=s.lock:ll()&&(null===(t=null===globalThis||void 0===globalThis?void 0:globalThis.navigator)||void 0===t?void 0:t.locks)?this.lock=Hl:this.lock=Wl,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?(s.storage?this.storage=s.storage:dl()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=$l(this.memoryStorage)),s.userStorage&&(this.userStorage=s.userStorage)):(this.memoryStorage={},this.storage=$l(this.memoryStorage)),ll()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(i){}null===(n=this.broadcastChannel)||void 0===n||n.addEventListener("message",async e=>{this._debug("received broadcast notification from other tab or client",e),await this._notifyAllSubscribers(e.data.event,e.data.session,!1)})}this.initialize()}get jwks(){var e,t;return null!==(t=null===(e=zl[this.storageKey])||void 0===e?void 0:e.jwks)&&void 0!==t?t:{keys:[]}}set jwks(e){zl[this.storageKey]=Object.assign(Object.assign({},zl[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return null!==(t=null===(e=zl[this.storageKey])||void 0===e?void 0:e.cachedAt)&&void 0!==t?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){zl[this.storageKey]=Object.assign(Object.assign({},zl[this.storageKey]),{cachedAt:e})}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${Nh}) ${(new Date).toISOString()}`,...e),this}async initialize(){return this.initializePromise||(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))()),await this.initializePromise}async _initialize(){var e;try{const t=function(e){const t={},n=new URL(e);if(n.hash&&"#"===n.hash[0])try{new URLSearchParams(n.hash.substring(1)).forEach((e,n)=>{t[n]=e})}catch(s){}return n.searchParams.forEach((e,n)=>{t[n]=e}),t}(window.location.href);let n="none";if(this._isImplicitGrantCallback(t)?n="implicit":await this._isPKCECallback(t)&&(n="pkce"),ll()&&this.detectSessionInUrl&&"none"!==n){const{data:s,error:i}=await this._getSessionFromURL(t,n);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),function(e){return Bh(e)&&"AuthImplicitGrantRedirectError"===e.name}(i)){const t=null===(e=i.details)||void 0===e?void 0:e.code;if("identity_already_exists"===t||"identity_not_found"===t||"single_identity_not_deletable"===t)return{error:i}}return await this._removeSession(),{error:i}}const{session:r,redirectType:o}=s;return this._debug("#_initialize()","detected session in URL",r,"redirect type",o),await this._saveSession(r),setTimeout(async()=>{"recovery"===o?await this._notifyAllSubscribers("PASSWORD_RECOVERY",r):await this._notifyAllSubscribers("SIGNED_IN",r)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return Bh(t)?{error:t}:{error:new Hh("Unexpected error during initialization",t)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,n,s;try{const i=await Ol(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:null!==(n=null===(t=null==e?void 0:e.options)||void 0===t?void 0:t.data)&&void 0!==n?n:{},gotrue_meta_security:{captcha_token:null===(s=null==e?void 0:e.options)||void 0===s?void 0:s.captchaToken}},xform:Rl}),{data:r,error:o}=i;if(o||!r)return{data:{user:null,session:null},error:o};const a=r.session,c=r.user;return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",a)),{data:{user:c,session:a},error:null}}catch(i){if(Bh(i))return{data:{user:null,session:null},error:i};throw i}}async signUp(e){var t,n,s;try{let i;if("email"in e){const{email:n,password:s,options:r}=e;let o=null,a=null;"pkce"===this.flowType&&([o,a]=await bl(this.storage,this.storageKey)),i=await Ol(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:null==r?void 0:r.emailRedirectTo,body:{email:n,password:s,data:null!==(t=null==r?void 0:r.data)&&void 0!==t?t:{},gotrue_meta_security:{captcha_token:null==r?void 0:r.captchaToken},code_challenge:o,code_challenge_method:a},xform:Rl})}else{if(!("phone"in e))throw new Kh("You must provide either an email or phone number and a password");{const{phone:t,password:r,options:o}=e;i=await Ol(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:t,password:r,data:null!==(n=null==o?void 0:o.data)&&void 0!==n?n:{},channel:null!==(s=null==o?void 0:o.channel)&&void 0!==s?s:"sms",gotrue_meta_security:{captcha_token:null==o?void 0:o.captchaToken}},xform:Rl})}}const{data:r,error:o}=i;if(o||!r)return{data:{user:null,session:null},error:o};const a=r.session,c=r.user;return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",a)),{data:{user:c,session:a},error:null}}catch(i){if(Bh(i))return{data:{user:null,session:null},error:i};throw i}}async signInWithPassword(e){try{let t;if("email"in e){const{email:n,password:s,options:i}=e;t=await Ol(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:s,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken}},xform:jl})}else{if(!("phone"in e))throw new Kh("You must provide either an email or phone number and a password");{const{phone:n,password:s,options:i}=e;t=await Ol(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:s,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken}},xform:jl})}}const{data:n,error:s}=t;return s?{data:{user:null,session:null},error:s}:n&&n.session&&n.user?(n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),{data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s}):{data:{user:null,session:null},error:new zh}}catch(t){if(Bh(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOAuth(e){var t,n,s,i;return await this._handleProviderSignIn(e.provider,{redirectTo:null===(t=e.options)||void 0===t?void 0:t.redirectTo,scopes:null===(n=e.options)||void 0===n?void 0:n.scopes,queryParams:null===(s=e.options)||void 0===s?void 0:s.queryParams,skipBrowserRedirect:null===(i=e.options)||void 0===i?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;if("solana"===t)return await this.signInWithSolana(e);throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}async signInWithSolana(e){var t,n,s,i,r,o,a,c,h,l,u,d;let f,p;if("message"in e)f=e.message,p=e.signature;else{const{chain:u,wallet:d,statement:g,options:m}=e;let y;if(ll())if("object"==typeof d)y=d;else{const e=window;if(!("solana"in e)||"object"!=typeof e.solana||!("signIn"in e.solana&&"function"==typeof e.solana.signIn||"signMessage"in e.solana&&"function"==typeof e.solana.signMessage))throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");y=e.solana}else{if("object"!=typeof d||!(null==m?void 0:m.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");y=d}const v=new URL(null!==(t=null==m?void 0:m.url)&&void 0!==t?t:window.location.href);if("signIn"in y&&y.signIn){const e=await y.signIn(Object.assign(Object.assign(Object.assign({issuedAt:(new Date).toISOString()},null==m?void 0:m.signInWithSolana),{version:"1",domain:v.host,uri:v.href}),g?{statement:g}:null));let t;if(Array.isArray(e)&&e[0]&&"object"==typeof e[0])t=e[0];else{if(!(e&&"object"==typeof e&&"signedMessage"in e&&"signature"in e))throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");t=e}if(!("signedMessage"in t&&"signature"in t&&("string"==typeof t.signedMessage||t.signedMessage instanceof Uint8Array)&&t.signature instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");f="string"==typeof t.signedMessage?t.signedMessage:(new TextDecoder).decode(t.signedMessage),p=t.signature}else{if(!("signMessage"in y&&"function"==typeof y.signMessage&&"publicKey"in y&&"object"==typeof y&&y.publicKey&&"toBase58"in y.publicKey&&"function"==typeof y.publicKey.toBase58))throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");f=[`${v.host} wants you to sign in with your Solana account:`,y.publicKey.toBase58(),...g?["",g,""]:[""],"Version: 1",`URI: ${v.href}`,`Issued At: ${null!==(s=null===(n=null==m?void 0:m.signInWithSolana)||void 0===n?void 0:n.issuedAt)&&void 0!==s?s:(new Date).toISOString()}`,...(null===(i=null==m?void 0:m.signInWithSolana)||void 0===i?void 0:i.notBefore)?[`Not Before: ${m.signInWithSolana.notBefore}`]:[],...(null===(r=null==m?void 0:m.signInWithSolana)||void 0===r?void 0:r.expirationTime)?[`Expiration Time: ${m.signInWithSolana.expirationTime}`]:[],...(null===(o=null==m?void 0:m.signInWithSolana)||void 0===o?void 0:o.chainId)?[`Chain ID: ${m.signInWithSolana.chainId}`]:[],...(null===(a=null==m?void 0:m.signInWithSolana)||void 0===a?void 0:a.nonce)?[`Nonce: ${m.signInWithSolana.nonce}`]:[],...(null===(c=null==m?void 0:m.signInWithSolana)||void 0===c?void 0:c.requestId)?[`Request ID: ${m.signInWithSolana.requestId}`]:[],...(null===(l=null===(h=null==m?void 0:m.signInWithSolana)||void 0===h?void 0:h.resources)||void 0===l?void 0:l.length)?["Resources",...m.signInWithSolana.resources.map(e=>`- ${e}`)]:[]].join("\n");const e=await y.signMessage((new TextEncoder).encode(f),"utf8");if(!(e&&e instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");p=e}}try{const{data:t,error:n}=await Ol(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:f,signature:hl(p)},(null===(u=e.options)||void 0===u?void 0:u.captchaToken)?{gotrue_meta_security:{captcha_token:null===(d=e.options)||void 0===d?void 0:d.captchaToken}}:null),xform:Rl});if(n)throw n;return t&&t.session&&t.user?(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers("SIGNED_IN",t.session)),{data:Object.assign({},t),error:n}):{data:{user:null,session:null},error:new zh}}catch(g){if(Bh(g))return{data:{user:null,session:null},error:g};throw g}}async _exchangeCodeForSession(e){const t=await gl(this.storage,`${this.storageKey}-code-verifier`),[n,s]=(null!=t?t:"").split("/");try{const{data:t,error:i}=await Ol(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:n},xform:Rl});if(await ml(this.storage,`${this.storageKey}-code-verifier`),i)throw i;return t&&t.session&&t.user?(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers("SIGNED_IN",t.session)),{data:Object.assign(Object.assign({},t),{redirectType:null!=s?s:null}),error:i}):{data:{user:null,session:null,redirectType:null},error:new zh}}catch(i){if(Bh(i))return{data:{user:null,session:null,redirectType:null},error:i};throw i}}async signInWithIdToken(e){try{const{options:t,provider:n,token:s,access_token:i,nonce:r}=e,o=await Ol(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:i,nonce:r,gotrue_meta_security:{captcha_token:null==t?void 0:t.captchaToken}},xform:Rl}),{data:a,error:c}=o;return c?{data:{user:null,session:null},error:c}:a&&a.session&&a.user?(a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),{data:a,error:c}):{data:{user:null,session:null},error:new zh}}catch(t){if(Bh(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOtp(e){var t,n,s,i,r;try{if("email"in e){const{email:s,options:i}=e;let r=null,o=null;"pkce"===this.flowType&&([r,o]=await bl(this.storage,this.storageKey));const{error:a}=await Ol(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:s,data:null!==(t=null==i?void 0:i.data)&&void 0!==t?t:{},create_user:null===(n=null==i?void 0:i.shouldCreateUser)||void 0===n||n,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken},code_challenge:r,code_challenge_method:o},redirectTo:null==i?void 0:i.emailRedirectTo});return{data:{user:null,session:null},error:a}}if("phone"in e){const{phone:t,options:n}=e,{data:o,error:a}=await Ol(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:t,data:null!==(s=null==n?void 0:n.data)&&void 0!==s?s:{},create_user:null===(i=null==n?void 0:n.shouldCreateUser)||void 0===i||i,gotrue_meta_security:{captcha_token:null==n?void 0:n.captchaToken},channel:null!==(r=null==n?void 0:n.channel)&&void 0!==r?r:"sms"}});return{data:{user:null,session:null,messageId:null==o?void 0:o.message_id},error:a}}throw new Kh("You must provide either an email or phone number.")}catch(o){if(Bh(o))return{data:{user:null,session:null},error:o};throw o}}async verifyOtp(e){var t,n;try{let s,i;"options"in e&&(s=null===(t=e.options)||void 0===t?void 0:t.redirectTo,i=null===(n=e.options)||void 0===n?void 0:n.captchaToken);const{data:r,error:o}=await Ol(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:i}}),redirectTo:s,xform:Rl});if(o)throw o;if(!r)throw new Error("An error occurred on token verification.");const a=r.session,c=r.user;return(null==a?void 0:a.access_token)&&(await this._saveSession(a),await this._notifyAllSubscribers("recovery"==e.type?"PASSWORD_RECOVERY":"SIGNED_IN",a)),{data:{user:c,session:a},error:null}}catch(s){if(Bh(s))return{data:{user:null,session:null},error:s};throw s}}async signInWithSSO(e){var t,n,s;try{let i=null,r=null;return"pkce"===this.flowType&&([i,r]=await bl(this.storage,this.storageKey)),await Ol(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:null!==(n=null===(t=e.options)||void 0===t?void 0:t.redirectTo)&&void 0!==n?n:void 0}),(null===(s=null==e?void 0:e.options)||void 0===s?void 0:s.captchaToken)?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:i,code_challenge_method:r}),headers:this.headers,xform:Dl})}catch(i){if(Bh(i))return{data:null,error:i};throw i}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new Wh;const{error:s}=await Ol(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return{data:{user:null,session:null},error:s}})}catch(e){if(Bh(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:n,type:s,options:i}=e,{error:r}=await Ol(this.fetch,"POST",t,{headers:this.headers,body:{email:n,type:s,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken}},redirectTo:null==i?void 0:i.emailRedirectTo});return{data:{user:null,session:null},error:r}}if("phone"in e){const{phone:n,type:s,options:i}=e,{data:r,error:o}=await Ol(this.fetch,"POST",t,{headers:this.headers,body:{phone:n,type:s,gotrue_meta_security:{captcha_token:null==i?void 0:i.captchaToken}}});return{data:{user:null,session:null,messageId:null==r?void 0:r.message_id},error:o}}throw new Kh("You must provide either an email or phone number and a type")}catch(t){if(Bh(t))return{data:{user:null,session:null},error:t};throw t}}async getSession(){await this.initializePromise;return await this._acquireLock(-1,async()=>this._useSession(async e=>e))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const e=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await e,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch(e){}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const e=t();for(this.pendingInLock.push((async()=>{try{await e}catch(t){}})()),await e;this.pendingInLock.length;){const e=[...this.pendingInLock];await Promise.all(e),this.pendingInLock.splice(0,e.length)}return await e}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",(new Error).stack);try{let e=null;const t=await gl(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),null!==t&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const n=!!e.expires_at&&1e3*e.expires_at-Date.now()<Lh;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",e.expires_at),!n){if(this.userStorage){const t=await gl(this.userStorage,this.storageKey+"-user");(null==t?void 0:t.user)?e.user=t.user:e.user=El()}if(this.storage.isServer&&e.user){let t=this.suppressGetSessionWarning;e=new Proxy(e,{get:(e,n,s)=>(t||"user"!==n||(t=!0,this.suppressGetSessionWarning=!0),Reflect.get(e,n,s))})}return{data:{session:e},error:null}}const{session:s,error:i}=await this._callRefreshToken(e.refresh_token);return i?{data:{session:null},error:i}:{data:{session:s},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;return await this._acquireLock(-1,async()=>await this._getUser())}async _getUser(e){try{return e?await Ol(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Nl}):await this._useSession(async e=>{var t,n,s;const{data:i,error:r}=e;if(r)throw r;return(null===(t=i.session)||void 0===t?void 0:t.access_token)||this.hasCustomAuthorizationHeader?await Ol(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:null!==(s=null===(n=i.session)||void 0===n?void 0:n.access_token)&&void 0!==s?s:void 0,xform:Nl}):{data:{user:null},error:new Wh}})}catch(t){if(Bh(t))return function(e){return Bh(e)&&"AuthSessionMissingError"===e.name}(t)&&(await this._removeSession(),await ml(this.storage,`${this.storageKey}-code-verifier`)),{data:{user:null},error:t};throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async n=>{const{data:s,error:i}=n;if(i)throw i;if(!s.session)throw new Wh;const r=s.session;let o=null,a=null;"pkce"===this.flowType&&null!=e.email&&([o,a]=await bl(this.storage,this.storageKey));const{data:c,error:h}=await Ol(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:null==t?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:a}),jwt:r.access_token,xform:Nl});if(h)throw h;return r.user=c.user,await this._saveSession(r),await this._notifyAllSubscribers("USER_UPDATED",r),{data:{user:r.user},error:null}})}catch(n){if(Bh(n))return{data:{user:null},error:n};throw n}}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new Wh;const t=Date.now()/1e3;let n=t,s=!0,i=null;const{payload:r}=vl(e.access_token);if(r.exp&&(n=r.exp,s=n<=t),s){const{session:t,error:n}=await this._callRefreshToken(e.refresh_token);if(n)return{data:{user:null,session:null},error:n};if(!t)return{data:{user:null,session:null},error:null};i=t}else{const{data:s,error:r}=await this._getUser(e.access_token);if(r)throw r;i={access_token:e.access_token,refresh_token:e.refresh_token,user:s.user,token_type:"bearer",expires_in:n-t,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return{data:{user:i.user,session:i},error:null}}catch(t){if(Bh(t))return{data:{session:null,user:null},error:t};throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var n;if(!e){const{data:s,error:i}=t;if(i)throw i;e=null!==(n=s.session)&&void 0!==n?n:void 0}if(!(null==e?void 0:e.refresh_token))throw new Wh;const{session:s,error:i}=await this._callRefreshToken(e.refresh_token);return i?{data:{user:null,session:null},error:i}:s?{data:{user:s.user,session:s},error:null}:{data:{user:null,session:null},error:null}})}catch(t){if(Bh(t))return{data:{user:null,session:null},error:t};throw t}}async _getSessionFromURL(e,t){try{if(!ll())throw new Gh("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Gh(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if("pkce"===this.flowType)throw new Jh("Not a valid PKCE flow url.");break;case"pkce":if("implicit"===this.flowType)throw new Gh("Not a valid implicit grant flow url.")}if("pkce"===t){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new Jh("No code detected.");const{data:t,error:n}=await this._exchangeCodeForSession(e.code);if(n)throw n;const s=new URL(window.location.href);return s.searchParams.delete("code"),window.history.replaceState(window.history.state,"",s.toString()),{data:{session:t.session,redirectType:null},error:null}}const{provider_token:n,provider_refresh_token:s,access_token:i,refresh_token:r,expires_in:o,expires_at:a,token_type:c}=e;if(!(i&&o&&r&&c))throw new Gh("No session defined in URL");const h=Math.round(Date.now()/1e3),l=parseInt(o);let u=h+l;a&&(u=parseInt(a));const{data:d,error:f}=await this._getUser(i);if(f)throw f;const p={provider_token:n,provider_refresh_token:s,access_token:i,expires_in:l,expires_at:u,refresh_token:r,token_type:c,user:d.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:p,redirectType:e.type},error:null}}catch(n){if(Bh(n))return{data:{session:null,redirectType:null},error:n};throw n}}_isImplicitGrantCallback(e){return Boolean(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await gl(this.storage,`${this.storageKey}-code-verifier`);return!(!e.code||!t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var n;const{data:s,error:i}=t;if(i)return{error:i};const r=null===(n=s.session)||void 0===n?void 0:n.access_token;if(r){const{error:t}=await this.admin.signOut(r,e);if(t&&(!function(e){return Bh(e)&&"AuthApiError"===e.name}(t)||404!==t.status&&401!==t.status&&403!==t.status))return{error:t}}return"others"!==e&&(await this._removeSession(),await ml(this.storage,`${this.storageKey}-code-verifier`)),{error:null}})}onAuthStateChange(e){const t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}),n={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,n),(async()=>{await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})})(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{var n,s;try{const{data:{session:s},error:i}=t;if(i)throw i;await(null===(n=this.stateChangeEmitters.get(e))||void 0===n?void 0:n.callback("INITIAL_SESSION",s)),this._debug("INITIAL_SESSION","callback id",e,"session",s)}catch(i){await(null===(s=this.stateChangeEmitters.get(e))||void 0===s?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",i)}})}async resetPasswordForEmail(e,t={}){let n=null,s=null;"pkce"===this.flowType&&([n,s]=await bl(this.storage,this.storageKey,!0));try{return await Ol(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(i){if(Bh(i))return{data:null,error:i};throw i}}async getUserIdentities(){var e;try{const{data:t,error:n}=await this.getUser();if(n)throw n;return{data:{identities:null!==(e=t.user.identities)&&void 0!==e?e:[]},error:null}}catch(t){if(Bh(t))return{data:null,error:t};throw t}}async linkIdentity(e){var t;try{const{data:n,error:s}=await this._useSession(async t=>{var n,s,i,r,o;const{data:a,error:c}=t;if(c)throw c;const h=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:null===(n=e.options)||void 0===n?void 0:n.redirectTo,scopes:null===(s=e.options)||void 0===s?void 0:s.scopes,queryParams:null===(i=e.options)||void 0===i?void 0:i.queryParams,skipBrowserRedirect:!0});return await Ol(this.fetch,"GET",h,{headers:this.headers,jwt:null!==(o=null===(r=a.session)||void 0===r?void 0:r.access_token)&&void 0!==o?o:void 0})});if(s)throw s;return ll()&&!(null===(t=e.options)||void 0===t?void 0:t.skipBrowserRedirect)&&window.location.assign(null==n?void 0:n.url),{data:{provider:e.provider,url:null==n?void 0:n.url},error:null}}catch(n){if(Bh(n))return{data:{provider:e.provider,url:null},error:n};throw n}}async unlinkIdentity(e){try{return await this._useSession(async t=>{var n,s;const{data:i,error:r}=t;if(r)throw r;return await Ol(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:null!==(s=null===(n=i.session)||void 0===n?void 0:n.access_token)&&void 0!==s?s:void 0})})}catch(t){if(Bh(t))return{data:null,error:t};throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const i=Date.now();return await(n=async n=>(n>0&&await async function(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}(200*Math.pow(2,n-1)),this._debug(t,"refreshing attempt",n),await Ol(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Rl})),s=(e,t)=>{const n=200*Math.pow(2,e);return t&&Yh(t)&&Date.now()+n-i<Dh},new Promise((e,t)=>{(async()=>{for(let r=0;r<1/0;r++)try{const t=await n(r);if(!s(r,null,t))return void e(t)}catch(i){if(!s(r,i))return void t(i)}})()}))}catch(i){if(this._debug(t,"error",i),Bh(i))return{data:{session:null,user:null},error:i};throw i}finally{this._debug(t,"end")}var n,s}_isValidSession(e){return"object"==typeof e&&null!==e&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const n=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",n),ll()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n},error:null}}async _recoverAndRefresh(){var e,t;const n="#_recoverAndRefresh()";this._debug(n,"begin");try{const i=await gl(this.storage,this.storageKey);if(i&&this.userStorage){let t=await gl(this.userStorage,this.storageKey+"-user");this.storage.isServer||!Object.is(this.storage,this.userStorage)||t||(t={user:i.user},await pl(this.userStorage,this.storageKey+"-user",t)),i.user=null!==(e=null==t?void 0:t.user)&&void 0!==e?e:El()}else if(i&&!i.user&&!i.user){const e=await gl(this.storage,this.storageKey+"-user");e&&(null==e?void 0:e.user)?(i.user=e.user,await ml(this.storage,this.storageKey+"-user"),await pl(this.storage,this.storageKey,i)):i.user=El()}if(this._debug(n,"session from storage",i),!this._isValidSession(i))return this._debug(n,"session is not valid"),void(null!==i&&await this._removeSession());const r=1e3*(null!==(t=i.expires_at)&&void 0!==t?t:1/0)-Date.now()<Lh;if(this._debug(n,`session has${r?"":" not"} expired with margin of 90000s`),r){if(this.autoRefreshToken&&i.refresh_token){const{error:e}=await this._callRefreshToken(i.refresh_token);e&&(Yh(e)||(this._debug(n,"refresh failed with a non-retryable error, removing the session",e),await this._removeSession()))}}else if(i.user&&!0===i.user.__isUserNotAvailableProxy)try{const{data:e,error:t}=await this._getUser(i.access_token);!t&&(null==e?void 0:e.user)?(i.user=e.user,await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)):this._debug(n,"could not get user data, skipping SIGNED_IN notification")}catch(s){this._debug(n,"error getting user data, skipping SIGNED_IN notification",s)}else await this._notifyAllSubscribers("SIGNED_IN",i)}catch(i){return void this._debug(n,"error",i)}finally{this._debug(n,"end")}}async _callRefreshToken(e){var t,n;if(!e)throw new Wh;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new yl;const{data:t,error:n}=await this._refreshAccessToken(e);if(n)throw n;if(!t.session)throw new Wh;await this._saveSession(t.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",t.session);const s={session:t.session,error:null};return this.refreshingDeferred.resolve(s),s}catch(i){if(this._debug(s,"error",i),Bh(i)){const e={session:null,error:i};return Yh(i)||await this._removeSession(),null===(t=this.refreshingDeferred)||void 0===t||t.resolve(e),e}throw null===(n=this.refreshingDeferred)||void 0===n||n.reject(i),i}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,t,n=!0){const s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});const s=[],i=Array.from(this.stateChangeEmitters.values()).map(async n=>{try{await n.callback(e,t)}catch(i){s.push(i)}});if(await Promise.all(i),s.length>0){for(let e=0;e<s.length;e+=1);throw s[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const t=Object.assign({},e),n=t.user&&!0===t.user.__isUserNotAvailableProxy;if(this.userStorage){!n&&t.user&&await pl(this.userStorage,this.storageKey+"-user",{user:t.user});const e=Object.assign({},t);delete e.user;const s=Il(e);await pl(this.storage,this.storageKey,s)}else{const e=Il(t);await pl(this.storage,this.storageKey,e)}}async _removeSession(){this._debug("#_removeSession()"),await ml(this.storage,this.storageKey),await ml(this.storage,this.storageKey+"-code-verifier"),await ml(this.storage,this.storageKey+"-user"),this.userStorage&&await ml(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&ll()&&(null===window||void 0===window?void 0:window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),Dh);this.autoRefreshTicker=e,e&&"object"==typeof e&&"function"==typeof e.unref?e.unref():"undefined"!=typeof Deno&&"function"==typeof Deno.unrefTimer&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const t=Date.now();try{return await this._useSession(async e=>{const{data:{session:n}}=e;if(!n||!n.refresh_token||!n.expires_at)return void this._debug("#_autoRefreshTokenTick()","no session");const s=Math.floor((1e3*n.expires_at-t)/Dh);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`),s<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(!(e.isAcquireTimeout||e instanceof Bl))throw e;this._debug("auto refresh token tick lock not available")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!ll()||!(null===window||void 0===window?void 0:window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),null===window||void 0===window||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),"visible"===document.visibilityState?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{"visible"===document.visibilityState?await this._recoverAndRefresh():this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting")}))):"hidden"===document.visibilityState&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){const s=[`provider=${encodeURIComponent(t)}`];if((null==n?void 0:n.redirectTo)&&s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),(null==n?void 0:n.scopes)&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),"pkce"===this.flowType){const[e,t]=await bl(this.storage,this.storageKey),n=new URLSearchParams({code_challenge:`${encodeURIComponent(e)}`,code_challenge_method:`${encodeURIComponent(t)}`});s.push(n.toString())}if(null==n?void 0:n.queryParams){const e=new URLSearchParams(n.queryParams);s.push(e.toString())}return(null==n?void 0:n.skipBrowserRedirect)&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var n;const{data:s,error:i}=t;return i?{data:null,error:i}:await Ol(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:null===(n=null==s?void 0:s.session)||void 0===n?void 0:n.access_token})})}catch(t){if(Bh(t))return{data:null,error:t};throw t}}async _enroll(e){try{return await this._useSession(async t=>{var n,s;const{data:i,error:r}=t;if(r)return{data:null,error:r};const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},"phone"===e.factorType?{phone:e.phone}:{issuer:e.issuer}),{data:a,error:c}=await Ol(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:null===(n=null==i?void 0:i.session)||void 0===n?void 0:n.access_token});return c?{data:null,error:c}:("totp"===e.factorType&&(null===(s=null==a?void 0:a.totp)||void 0===s?void 0:s.qr_code)&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),{data:a,error:null})})}catch(t){if(Bh(t))return{data:null,error:t};throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var n;const{data:s,error:i}=t;if(i)return{data:null,error:i};const{data:r,error:o}=await Ol(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:{code:e.code,challenge_id:e.challengeId},headers:this.headers,jwt:null===(n=null==s?void 0:s.session)||void 0===n?void 0:n.access_token});return o?{data:null,error:o}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+r.expires_in},r)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",r),{data:r,error:o})})}catch(t){if(Bh(t))return{data:null,error:t};throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var n;const{data:s,error:i}=t;return i?{data:null,error:i}:await Ol(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:{channel:e.channel},headers:this.headers,jwt:null===(n=null==s?void 0:s.session)||void 0===n?void 0:n.access_token})})}catch(t){if(Bh(t))return{data:null,error:t};throw t}})}async _challengeAndVerify(e){const{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?{data:null,error:n}:await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){const{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};const n=(null==e?void 0:e.factors)||[],s=n.filter(e=>"totp"===e.factor_type&&"verified"===e.status),i=n.filter(e=>"phone"===e.factor_type&&"verified"===e.status);return{data:{all:n,totp:s,phone:i},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async e=>{var t,n;const{data:{session:s},error:i}=e;if(i)return{data:null,error:i};if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:r}=vl(s.access_token);let o=null;r.aal&&(o=r.aal);let a=o;(null!==(n=null===(t=s.user.factors)||void 0===t?void 0:t.filter(e=>"verified"===e.status))&&void 0!==n?n:[]).length>0&&(a="aal2");return{data:{currentLevel:o,nextLevel:a,currentAuthenticationMethods:r.amr||[]},error:null}}))}async fetchJwk(e,t={keys:[]}){let n=t.keys.find(t=>t.kid===e);if(n)return n;const s=Date.now();if(n=this.jwks.keys.find(t=>t.kid===e),n&&this.jwks_cached_at+6e5>s)return n;const{data:i,error:r}=await Ol(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(r)throw r;return i.keys&&0!==i.keys.length?(this.jwks=i,this.jwks_cached_at=s,n=i.keys.find(t=>t.kid===e),n||null):null}async getClaims(e,t={}){try{let n=e;if(!n){const{data:e,error:t}=await this.getSession();if(t||!e.session)return{data:null,error:t};n=e.session.access_token}const{header:s,payload:i,signature:r,raw:{header:o,payload:a}}=vl(n);(null==t?void 0:t.allowExpired)||function(e){if(!e)throw new Error("Missing exp claim");if(e<=Math.floor(Date.now()/1e3))throw new Error("JWT has expired")}(i.exp);const c=s.alg&&!s.alg.startsWith("HS")&&s.kid&&"crypto"in globalThis&&"subtle"in globalThis.crypto?await this.fetchJwk(s.kid,(null==t?void 0:t.keys)?{keys:t.keys}:null==t?void 0:t.jwks):null;if(!c){const{error:e}=await this.getUser(n);if(e)throw e;return{data:{claims:i,header:s,signature:r},error:null}}const h=function(e){switch(e){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}(s.alg),l=await crypto.subtle.importKey("jwk",c,h,!0,["verify"]);if(!(await crypto.subtle.verify(h,l,r,cl(`${o}.${a}`))))throw new Qh("Invalid JWT signature");return{data:{claims:i,header:s,signature:r},error:null}}catch(n){if(Bh(n))return{data:null,error:n};throw n}}}Kl.nextInstanceID=0;const Gl=Kl;class Jl extends Gl{constructor(e){super(e)}}var Xl=function(e,t,n,s){return new(n||(n=Promise))(function(i,r){function o(e){try{c(s.next(e))}catch(t){r(t)}}function a(e){try{c(s.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(o,a)}c((s=s.apply(e,t||[])).next())})};class Yl{constructor(e,t,n){var s,i,r;if(this.supabaseUrl=e,this.supabaseKey=t,!e)throw new Error("supabaseUrl is required.");if(!t)throw new Error("supabaseKey is required.");const o=(a=e).endsWith("/")?a:a+"/";var a;const c=new URL(o);this.realtimeUrl=new URL("realtime/v1",c),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",c),this.storageUrl=new URL("storage/v1",c),this.functionsUrl=new URL("functions/v1",c);const h=`sb-${c.hostname.split(".")[0]}-auth-token`,l=function(e,t){var n,s;const{db:i,auth:r,realtime:o,global:a}=e,{db:c,auth:h,realtime:l,global:u}=t,d={db:Object.assign(Object.assign({},c),i),auth:Object.assign(Object.assign({},h),r),realtime:Object.assign(Object.assign({},l),o),storage:{},global:Object.assign(Object.assign(Object.assign({},u),a),{headers:Object.assign(Object.assign({},null!==(n=null==u?void 0:u.headers)&&void 0!==n?n:{}),null!==(s=null==a?void 0:a.headers)&&void 0!==s?s:{})}),accessToken:()=>jh(this,void 0,void 0,function*(){return""})};return e.accessToken?d.accessToken=e.accessToken:delete d.accessToken,d}(null!=n?n:{},{db:Ch,realtime:Ph,auth:Object.assign(Object.assign({},Ah),{storageKey:h}),global:Ih});this.storageKey=null!==(s=l.auth.storageKey)&&void 0!==s?s:"",this.headers=null!==(i=l.global.headers)&&void 0!==i?i:{},l.accessToken?(this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(e,t)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(null!==(r=l.auth)&&void 0!==r?r:{},this.headers,l.global.fetch),this.fetch=Rh(t,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.rest=new ac(new URL("rest/v1",c).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch}),this.storage=new Sh(this.storageUrl.href,this.headers,this.fetch,null==n?void 0:n.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Ca(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},n={}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var e,t;return Xl(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();const{data:n}=yield this.auth.getSession();return null!==(t=null===(e=n.session)||void 0===e?void 0:e.access_token)&&void 0!==t?t:this.supabaseKey})}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:s,storageKey:i,flowType:r,lock:o,debug:a},c,h){const l={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Jl({url:this.authUrl.href,headers:Object.assign(Object.assign({},l),c),storageKey:i,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:s,flowType:r,lock:o,debug:a,fetch:h,hasCustomAuthorizationHeader:"Authorization"in this.headers})}_initRealtimeClient(e){return new eh(this.realtimeUrl.href,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},null==e?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,"CLIENT",null==t?void 0:t.access_token)})}_handleTokenChanged(e,t,n){"TOKEN_REFRESHED"!==e&&"SIGNED_IN"!==e||this.changedAccessToken===n?"SIGNED_OUT"===e&&(this.realtime.setAuth(),"STORAGE"==t&&this.auth.signOut(),this.changedAccessToken=void 0):this.changedAccessToken=n}}const Zl=(e,t,n)=>new Yl(e,t,n);!function(){if("undefined"!=typeof window)return!1;if("undefined"==typeof process)return!1;const e=process.version;if(null==e)return!1;const t=e.match(/^v(\d+)\./);!!t&&parseInt(t[1],10)}();export{xo as a,va as b,mr as c,gr as d,Wn as e,zn as f,ii as g,Zl as h,$e as i,n as j,Kn as o,Gn as s};
