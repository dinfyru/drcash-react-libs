"use strict";function ___$insertStyle(e){if(e&&"undefined"!=typeof window){var t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}}var addEvent=function(e,t,n){null!=e&&void 0!==e&&(e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on".concat(t),n):e["on".concat(t)]=n)},removeEvent=function(e,t,n){null!=e&&void 0!==e&&(e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent?e.detachEvent("on".concat(t),n):e["on".concat(t)]=null)},elemOffset=function(e){var t={top:0,left:0};if(!(e&&e.ownerDocument))return t;var n=e.ownerDocument.documentElement;t=e.getBoundingClientRect();var o=window;return{top:t.top+(o.pageYOffset||n.scrollTop)-(n.clientTop||0),left:t.left+(o.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}},findByValue=function(e,t,n){var o=[];for(var r in e)1*e[r][n]==1*t&&o.push(r);return o},getCookie=function(e){var t="; ".concat(document.cookie).split("; ".concat(e,"="));if(2===t.length)return t.pop().split(";").shift()};exports.addEvent=addEvent,exports.elemOffset=elemOffset,exports.findByValue=findByValue,exports.getCookie=getCookie,exports.removeEvent=removeEvent;
