"use strict";function ___$insertStyle(e){if(e&&"undefined"!=typeof window){var n=document.createElement("style");return n.setAttribute("type","text/css"),n.innerHTML=e,document.head.appendChild(n),e}}function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var __chunk_1=require("./chunk-c53ebd2a.js"),__chunk_3=require("./chunk-4e52dd64.js"),React=require("react"),React__default=_interopDefault(React),notificationAction=function(e,n){var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:7e3,r={error:"NOTIFICATION_TYPE_ERROR",warning:"NOTIFICATION_TYPE_WARNING",success:"NOTIFICATION_TYPE_SUCCESS",noInternet:"NOTIFICATION_TYPE_NO_INTERNET"};return{type:"ADD_NOTIFICATION",notification:{id:parseInt(Math.random().toString().split(".")[1],10),duration:t,message:n,type:r[e]||r.error,canDismiss:!0}}};___$insertStyle('@charset "UTF-8";\n.alert-type {\n  font-size: 13px;\n  padding: 25px 35px;\n  max-width: 500px;\n  max-height: 250px;\n  box-shadow: 0 6px 4px -3px rgba(0, 0, 0, 0.2);\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n}\n.alert-type > span {\n  line-height: 18px;\n}\n.alert-type.success {\n  color: #0a7c71;\n  background-color: #cff5f2;\n}\n.alert-type.info {\n  color: #2b6a94;\n  background-color: #daeffd;\n}\n.alert-type.error {\n  color: #933432;\n  background-color: #fddddd;\n}\n.alert-type .close {\n  background-color: transparent;\n  border: 0;\n  padding: 0;\n  float: right;\n  margin-left: 20px;\n  color: inherit;\n}\n.alert-type .close:before {\n  content: "";\n  font-family: "Font Awesome 5 Pro";\n  font-weight: 900;\n  font-size: 14px;\n  color: inherit;\n  opacity: 0.6;\n}\n.alert-type .close:hover {\n  cursor: pointer;\n}\n.alert-type .close:hover:before {\n  opacity: 0.8;\n}');var Notification=function(e){function i(){var e,n;__chunk_3._classCallCheck(this,i);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return n=__chunk_3._possibleConstructorReturn(this,(e=__chunk_3._getPrototypeOf(i)).call.apply(e,[this].concat(r))),__chunk_1._defineProperty(__chunk_3._assertThisInitialized(n),"notificationParams",function(e,n){return"NOTIFICATION_TYPE_WARNING"===e?{classType:"warning",message:n}:"NOTIFICATION_TYPE_SUCCESS"===e?{classType:"success",message:n}:{classType:"error",message:n}}),n}return __chunk_3._inherits(i,e),__chunk_3._createClass(i,[{key:"componentDidMount",value:function(){var e=this.props,n=e.handleDismiss,t=e.id,r=e.duration;0!==r&&setTimeout(function(){n(t)},r)}},{key:"render",value:function(){var e=this.props,n=e.handleDismiss,t=e.message,r=e.type,o=e.id,i=this.notificationParams(r,t),a=i.classType,s=i.message;return!("onLine"in navigator&&!navigator.onLine)&&React__default.createElement("div",{style:{transition:"opacity 250ms ease 0s",opacity:1}},React__default.createElement("div",{className:"".concat(a," alert-type"),style:{margin:30}},React__default.createElement("button",{className:"close",onClick:function(){return n(o)}}),React__default.createElement("span",null,s)))}}]),i}(React__default.PureComponent);__chunk_1._defineProperty(Notification,"defaultProps",{duration:0,message:""}),__chunk_1._defineProperty(Notification,"propTypes",{id:__chunk_3.PropTypes.number.isRequired,type:__chunk_3.PropTypes.string.isRequired,message:__chunk_3.PropTypes.oneOfType([__chunk_3.PropTypes.string,__chunk_3.PropTypes.object]),duration:__chunk_3.PropTypes.number,handleDismiss:__chunk_3.PropTypes.func.isRequired}),Notification.displayName="Notification",exports.NotificationTemplate=Notification,exports.notification=notificationAction;
