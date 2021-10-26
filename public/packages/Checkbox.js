"use strict";function ___$insertStyle(e){if(e&&"undefined"!=typeof window){const t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}}var index=require("./index-f7ec947f.js"),defineProperty=require("./defineProperty-f32bb15f.js"),React=require("react");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var React__default=_interopDefaultLegacy(React);function _createSuper(i){var r=_isNativeReflectConstruct();return function(){var e,t=index._getPrototypeOf(i);return t=r?(e=index._getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments),index._possibleConstructorReturn(this,t)}}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}var Checkbox=function(e){index._inherits(i,e);var t=_createSuper(i);function i(e){var r;return index._classCallCheck(this,i),r=t.call(this,e),defineProperty._defineProperty(index._assertThisInitialized(r),"onChange",function(){var e=r.props,t=e.trackValue,i=e.active;e.disabled||(t?r.props.onChange(r.state.active):r.setState(function(e){e=t?i:!e.active;return{active:e="radio"===r.props.type?!0:e}},function(){r.props.onChange(r.state.active)}))}),defineProperty._defineProperty(index._assertThisInitialized(r),"active",function(e){r.setState({active:e})}),r.active=r.active.bind(index._assertThisInitialized(r)),r.state={active:e.active},r}return index._createClass(i,[{key:"render",value:function(){var e=this,t=this.props.type;return this.state.active&&(t+=" active"),this.props.classNames.length&&(t+=" ".concat(this.props.classNames)),this.props.disabled&&(t+=" disabled"),React__default.default.createElement("div",{title:this.props.title,className:t,disabled:this.props.disabled,onClick:function(){e.onChange()}},this.props.children)}}],[{key:"getDerivedStateFromProps",value:function(e,t){var i=e.active;return!e.trackValue&&"radio"!==e.type||i===t.active?null:{active:i}}}]),i}(React.PureComponent);defineProperty._defineProperty(Checkbox,"defaultProps",{classNames:"",title:"",type:"checkbox",active:!1,disabled:!1,trackValue:!1}),defineProperty._defineProperty(Checkbox,"propTypes",{onChange:index.propTypes.func.isRequired,classNames:index.propTypes.string,type:index.propTypes.string,title:index.propTypes.string,active:index.propTypes.bool,disabled:index.propTypes.bool,trackValue:index.propTypes.bool}),Checkbox.displayName="Checkbox",module.exports=Checkbox;
