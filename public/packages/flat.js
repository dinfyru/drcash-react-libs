"use strict";function ___$insertStyle(t){if(t&&"undefined"!=typeof window){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=t,document.head.appendChild(e),t}}Object.defineProperty(exports,"__esModule",{value:!0});var isBuffer=function(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)},defaultDelimiter="[]",flatten=function(t){var s=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},p=s.delimiter||defaultDelimiter,d=s.maxDepth,b={};return function l(f,c){var a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1;Object.keys(f).forEach(function(t){var e=f[t],r=s.safe&&Array.isArray(e),n=Object.prototype.toString.call(e),i=isBuffer(e),o="[object Object]"===n||"[object Array]"===n,u=c?c+delimit(p,t):t;if(!r&&!i&&o&&Object.keys(e).length&&(!s.maxDepth||a<d))return l(e,u,a+1);b[u]=e})}(t),b};function delimit(t,e){if(1===t.length)return t+e;var r=t.split("");return r[0]+e+r[1]}function splitKey(t,e){if(2!==e.length)return t.split(e);var r=e.split(""),n=new RegExp("\\".concat(r[1]),"g");return t.replace(n,"").split(r[0])}var unflatten=function l(f){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},a=c.delimiter||defaultDelimiter,s=c.overwrite||!1,p={};if(isBuffer(f)||"[object Object]"!==Object.prototype.toString.call(f))return f;function d(t){var e=Number(t);return isNaN(e)||-1!==t.indexOf(".")||c.object?t:e}return Object.keys(f).sort(function(t,e){return t.length-e.length}).forEach(function(t){for(var e=splitKey(t,a),r=d(e.shift()),n=d(e[0]),i=p;void 0!==n;){var o=Object.prototype.toString.call(i[r]),u="[object Object]"===o||"[object Array]"===o;if(!s&&!u&&void 0!==i[r])return;(s&&!u||!s&&null==i[r])&&(i[r]="number"!=typeof n||c.object?{}:[]),i=i[r],0<e.length&&(r=d(e.shift()),n=d(e[0]))}i[r]=l(f[t],c)}),p};exports.flatten=flatten,exports.unflatten=unflatten;
