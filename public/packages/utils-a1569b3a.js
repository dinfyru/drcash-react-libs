function ___$insertStyle(e){if(e&&"undefined"!=typeof window){const t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}}var index$1=require("./index-7fc3e9ae.js"),index=require("./index-1ba0118e.js");function compact(e){for(var t=-1,n=e?e.length:0,r=0,o=[];++t<n;){var c=e[t];c&&(o[r++]=c)}return o}var lodash_compact=compact,strictUriEncode=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})};function encoderForArrayFormat(r){switch(r.arrayFormat){case"index":return function(e,t,n){return(null===t?[encode(e,r),"[",n,"]"]:[encode(e,r),"[",encode(n,r),"]=",encode(t,r)]).join("")};case"bracket":return function(e,t){return null===t?encode(e,r):[encode(e,r),"[]=",encode(t,r)].join("")};default:return function(e,t){return null===t?encode(e,r):[encode(e,r),"=",encode(t,r)].join("")}}}function parserForArrayFormat(e){var r;switch(e.arrayFormat){case"index":return function(e,t,n){r=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),r?(void 0===n[e]&&(n[e]={}),n[e][r[1]]=t):n[e]=t};case"bracket":return function(e,t,n){r=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),r?void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=[t]:n[e]=t};default:return function(e,t,n){void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=t}}}function encode(e,t){return t.encode?(t.strict?strictUriEncode:encodeURIComponent)(e):e}function keysSorter(t){return Array.isArray(t)?t.sort():"object"==typeof t?keysSorter(Object.keys(t)).sort(function(e,t){return Number(e)-Number(t)}).map(function(e){return t[e]}):t}var extract=function(e){return e.split("?")[1]||""},parse=function(e,t){var n=parserForArrayFormat(t=index.objectAssign({arrayFormat:"none"},t)),r=Object.create(null);return"string"==typeof e&&(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),e=t.shift(),t=void 0===(t=0<t.length?t.join("="):void 0)?null:decodeURIComponent(t);n(decodeURIComponent(e),t,r)}),Object.keys(r).sort().reduce(function(e,t){var n=r[t];return Boolean(n)&&"object"==typeof n&&!Array.isArray(n)?e[t]=keysSorter(n):e[t]=n,e},Object.create(null))):r},stringify=function(r,o){var c=encoderForArrayFormat(o=index.objectAssign({encode:!0,strict:!0,arrayFormat:"none"},o));return r?Object.keys(r).sort().map(function(t){var e=r[t];if(void 0===e)return"";if(null===e)return encode(t,o);if(Array.isArray(e)){var n=[];return e.slice().forEach(function(e){void 0!==e&&n.push(c(t,e,n.length))}),n.join("&")}return encode(t,o)+"="+encode(e,o)}).filter(function(e){return 0<e.length}).join("&"):""},queryString={extract:extract,parse:parse,stringify:stringify};function ownKeys(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(n),!0).forEach(function(e){index._defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var CRUD_ACTION_REQUEST="CRUD_ACTION_REQUEST",CRUD_ACTION_SUCCESS="CRUD_ACTION_SUCCESS",CRUD_ACTION_FAILURE="CRUD_ACTION_FAILURE",RSAA="@@redux-api-middleware/RSAA",crud=function(e){var n,t=e.method,r=void 0===t?"GET":t,o=e.endpoint,c=e.keys,i=e.query,a=void 0===i?{}:i,s=e.body,d=e.meta,u=void 0===d?{}:d,p=e.name,f=void 0===p?"base_":p,l=e.headers,y=void 0===l?{}:l,t=e.needToken,i=void 0===t||t,d=e.uploadFile,p=void 0!==d&&d,l=e.crudTypes,t=void 0===l?{request:"".concat(f,"_").concat(CRUD_ACTION_REQUEST),success:"".concat(f,"_").concat(CRUD_ACTION_SUCCESS),failure:"".concat(f,"_").concat(CRUD_ACTION_FAILURE)}:l,d=e.validStatuses,f=void 0===d?[]:d,l=e.errorMessagesByStatus,d=void 0===l?{}:l,e=u.disableFilters,l=u.requiredFilters,v=void 0===l?[]:l,A=_objectSpread(_objectSpread({query:a},u),{},{validStatuses:f,errorMessagesByStatus:d}),C=index._defineProperty({needToken:i,isCrud:!0},RSAA,{endpoint:o,method:r,types:[{type:t.request,meta:A},{type:t.success,meta:A},{type:t.failure,meta:function(e,t,n){return n?_objectSpread({status:n.status,statusText:n.statusText},A):{status:"network"}}}]});return C[RSAA].headers=_objectSpread(p?{}:{"Content-Type":"application/json","Cache-Control":"no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"},y),c&&Object.keys(c).forEach(function(e){C[RSAA].endpoint=C[RSAA].endpoint.replace(":".concat(e),c[e])}),a&&Object.keys(a).length&&(n=index$1.lodash_clonedeep(a),Object.entries(n).forEach(function(e){var t=index$1._slicedToArray(e,2),e=t[0],t=t[1],t=Array.isArray(t)?t:[t];n[e]=lodash_compact(t)}),e&&v&&v.length&&Object.keys(n).forEach(function(e){v.indexOf(e)<0&&delete n[e]}),(e=queryString.stringify(n)).length&&(C[RSAA].endpoint="".concat(C[RSAA].endpoint,"?").concat(e))),s&&"application/json"===C[RSAA].headers["Content-Type"]?C[RSAA].body=JSON.stringify(s):s&&(C[RSAA].body=s),C},addEvent=function(e,t,n){null!=e&&void 0!==e&&(e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on".concat(t),n):e["on".concat(t)]=n)},removeEvent=function(e,t,n){null!=e&&void 0!==e&&(e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent?e.detachEvent("on".concat(t),n):e["on".concat(t)]=null)},elemOffset=function(e){var t={top:0,left:0};if(!(e&&e.ownerDocument))return t;var n=e.ownerDocument.documentElement,t=e.getBoundingClientRect(),e=window;return{top:t.top+(e.pageYOffset||n.scrollTop)-(n.clientTop||0),left:t.left+(e.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}},findByValue=function(e,t,n){var r,o=[];for(r in e)+e[r][n]==+t&&o.push(r);return o},getCookie=function(e){e="; ".concat(document.cookie).split("; ".concat(e,"="));if(2===e.length)return e.pop().split(";").shift()};exports.CRUD_ACTION_FAILURE=CRUD_ACTION_FAILURE,exports.CRUD_ACTION_REQUEST=CRUD_ACTION_REQUEST,exports.CRUD_ACTION_SUCCESS=CRUD_ACTION_SUCCESS,exports.addEvent=addEvent,exports.crud=crud,exports.elemOffset=elemOffset,exports.findByValue=findByValue,exports.getCookie=getCookie,exports.lodash_compact=lodash_compact,exports.queryString=queryString,exports.removeEvent=removeEvent;