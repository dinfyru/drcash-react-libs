function ___$insertStyle(e){if(e&&"undefined"!=typeof window){const t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}}Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),index=require("./index-2a7a8792.js"),index$3=require("./index-101b7486.js"),_extends=require("./extends-748f8651.js"),index$2=require("./index-565a9c6e.js"),index$1=require("./index-8f50ebe2.js"),utils=require("./utils-943d3f75.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var React__default=_interopDefaultLegacy(React),TTitle=function(e){var o,l,t=e.titleTemplate,i=e.visibleColumns,t=(o=[],l=0,t.forEach(function(e,t){var a,r=e.props,n=e.value,e=_extends._toConsumableArray(e.columns);i&&e.forEach(function(){i[l]&&(a=!0),l++}),i&&!a||(n=React__default.default.createElement("th",_extends._extends({key:t,"js-title-index":t},r),React__default.default.createElement("span",null,n)),o.push(n))}),o);return React__default.default.createElement("thead",null,React__default.default.createElement("tr",null,React__default.default.createElement("th",{className:"padding-table"}," "),t,React__default.default.createElement("th",{className:"padding-table"}," ")))};TTitle.displayName="TTitle",TTitle.defaultProps={visibleColumns:null},TTitle.propTypes={titleTemplate:index.propTypes.array.isRequired,visibleColumns:index.propTypes.array};var classnames=index$1.createCommonjsModule(function(e){function l(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var r,n=typeof a;if("string"==n||"number"==n)e.push(a);else if(Array.isArray(a))!a.length||(r=l.apply(null,a))&&e.push(r);else if("object"==n)if(a.toString===Object.prototype.toString||a.toString.toString().includes("[native code]"))for(var o in a)i.call(a,o)&&a[o]&&e.push(o);else e.push(a.toString())}}return e.join(" ")}var i;i={}.hasOwnProperty,e.exports?e.exports=l.default=l:window.classNames=l}),ORDER_BY_DESC="DESC",ORDER_BY_ASC="ASC",THead=function(e){var i,t=e.template,s=e.getItems,d=e.sortType,u=e.sortBy,a=e.filtersValue,c=e.reducer,_=function(){return a.sort_by===u&&a.sort_type===ORDER_BY_DESC?ORDER_BY_ASC:ORDER_BY_DESC},t=(i=[],t.forEach(function(e,t){var a=e.thead,r=a.value,n=a.sortKey,o=a.sortLtr,l=a.className,a=e.thead,e=r;"function"==typeof r&&(e=r());a=a.props?index$2.lodash_clonedeep(a.props):{};a.title=a.title||r,a.className=classnames([l,n&&"cup"]);o=React__default.default.createElement("th",_extends._extends({key:t},a,{onClick:function(){return function(e){e=e.sortKey;if(!e)return!1;s({sort_type:_(),sort_by:e,offset:0},c)}({sortKey:n})}}),o&&n&&React__default.default.createElement("span",{className:"sorting ltr ".concat(u===n?d.toLowerCase():"")}),e,!o&&n&&React__default.default.createElement("span",{className:"sorting fal ".concat(u===n?d.toLowerCase():"")}));i.push(o)}),i);return React__default.default.createElement("thead",null,React__default.default.createElement("tr",null,React__default.default.createElement("th",{className:"dr-padding"}," "),t,React__default.default.createElement("th",{className:"dr-padding"}," ")))};THead.displayName="THead",THead.propTypes={template:index.propTypes.array.isRequired,getItems:index.propTypes.func.isRequired,reducer:index.propTypes.string.isRequired,filtersValue:index.propTypes.object.isRequired,sortType:index.propTypes.string,sortBy:index.propTypes.string},THead.defaultProps={sortType:null,sortBy:null,isHidden:!1,softSort:!1,visibleColumns:null};var TBodyPart=function(e){var t=e.template,a=e.items;return function(){for(var l=[],e=0;e<a.length;e+=1)!function(n){var o=a[n];t.forEach(function(e,t){var a,e=e.tbody;if(l[n]||(l[n]=[],o.id&&(l[n].id=o.id)),"function"==typeof e.value)try{a=e.value(o)}catch(e){a="n/a"}else"string"==typeof e.value?a=e.value:!e.value&&e.key&&(a=o[e.key]);var r=e.props?index$2.lodash_clonedeep(e.props):{};Object.keys(r).forEach(function(e){"function"==typeof r[e]&&(r[e]=r[e](o))}),l[n][t]=React__default.default.createElement("td",r,a)})}(e);return l}().map(function(e,t){return React__default.default.createElement("tr",{key:t,"data-id":e.id||t},React__default.default.createElement("td",{className:"dr-padding"}," "),e.map(function(e,t){return React__default.default.createElement(React__default.default.Fragment,{key:t},e)}),React__default.default.createElement("td",{className:"dr-padding"}," "))})};TBodyPart.propTypes={template:index.propTypes.array.isRequired,items:index.propTypes.array.isRequired};var BlockedItems=function(l){function e(){for(var e=l.tableRefs.parent.current,t=e.querySelectorAll(".blocked-item"),a=0;a<t.length;a++){var r=t[a],n=r.getAttribute("item-data-id"),o=e.querySelector('tbody tr[data-id="'.concat(n,'"]'));o.length||(n=e.scrollTop+(Math.abs(utils.elemOffset(o).top)-utils.elemOffset(e).top)+1,o=o.offsetHeight-1,r.style.top="".concat(n,"px"),r.style.height="".concat(o,"px"),r.style.lineHeight="".concat(o,"px"))}}var t=l.blockedItems;return React.useEffect(function(){return utils.addEvent(window,"resize",e),function(){utils.removeEvent(window,"resize",e)}},[]),React.useEffect(function(){e()},[t]),t.map(function(e){return React__default.default.createElement("tr",{className:"blocked-item",key:e,"item-data-id":e},React__default.default.createElement("td",null,React__default.default.createElement("span",{className:"loading"})))})},TBody=function(e){var t=e.items,a=e.template,r=e.forwardedRef,n=e.isLoading,o=e.messages,l=e.blockedItems,i=e.tableRefs,s=React.useMemo(function(){return{isNoData:!(t.length&&t[0].length||n),colsCount:a.length+2}},[a,t]),e=s.isNoData,s=s.colsCount;return React__default.default.createElement("tbody",{ref:r},t.map(function(e,t){return React__default.default.createElement(TBodyPart,{key:t,items:e,template:a})}),e&&React__default.default.createElement("tr",{className:"no-border"},React__default.default.createElement("td",{colSpan:s},React__default.default.createElement("span",{className:"no-data"},o.noDataContent))),n&&React__default.default.createElement("tr",{className:"no-border"},React__default.default.createElement("td",{colSpan:s},React__default.default.createElement("span",{className:"loading"},React__default.default.createElement("span",null)))),React__default.default.createElement(BlockedItems,{blockedItems:l,tableRefs:i}))};TBody.displayName="TBody",TBody.defaultProps={isLoading:!1,blockedItems:[]},TBody.propTypes={template:index.propTypes.array.isRequired,forwardedRef:index.propTypes.object.isRequired,tableRefs:index.propTypes.object.isRequired,isLoading:index.propTypes.bool,items:index.propTypes.array.isRequired,blockedItems:index.propTypes.array,messages:index.propTypes.object.isRequired};var TFoot=function(e){var t=e.forwardedRef,a=e.tfootItem,r=e.tfootOtherTemplate,n=a?a.item:null,o=a?a.isLoading:null,a=function(){var n=e.template,o=e.tfootItem,l=[],i=o?o.item:null;if(!o)return!1;var s=0;return n.forEach(function(e,t){var a,e=e.tfoot;if(!(s>=n.length))if(e){if("function"==typeof e.value)try{a=e.value(i)}catch(e){a="n/a"}else"string"==typeof e.value?a=e.value:!e.value&&e.key&&(a=i[e.key]);var r=e.props?index$2.lodash_clonedeep(e.props):{};e.isWholeLine?(s+=n.length,r.colSpan=n.length):s++,Object.keys(r).forEach(function(e){"function"==typeof r[e]&&(r[e]=r[e](o))}),l[t]=React__default.default.createElement("td",_extends._extends({key:t},r),a)}else l[t]=React__default.default.createElement("td",{key:t})}),l}();return React__default.default.createElement("tfoot",{ref:t},r,React__default.default.createElement("tr",null,React__default.default.createElement("th",{className:"dr-padding"}," "),a,React__default.default.createElement("td",{className:"dr-padding"}," ")),n&&o&&!Object.keys(n).length&&React__default.default.createElement("tr",{className:"tfoot-loading no-border"},React__default.default.createElement("td",null,React__default.default.createElement("span",{className:"loading"},React__default.default.createElement("span",null)))))};TFoot.displayName="TFoot",TFoot.defaultProps={tfootItem:null},TFoot.propTypes={template:index.propTypes.array.isRequired,forwardedRef:index.propTypes.object.isRequired,tfootItem:index.propTypes.object};var TableComponent=function(o){function r(e){var t=o.listGet,a=o.changeFiltersValue,r=(n=s[l].filtersValue).offset,n=n.limit;a(e||{offset:r+n},l),t(l,i)}var n={parent:React.useRef(null),tbody:React__default.default.createRef(),tfoot:React__default.default.createRef()},e=o.template,l=o.reducer,t=o.id,i=o.url,s=o.data,d=o.onInit,u=o.refreshTableOnPush,c=o.initFiltersValue,a=o.tfootItem,_=o.visibleColumnsMiddleware,p=o.messages,T=o.disableLazyLoad,f=o.titleTemplate,E=s[l],m=E.isLoading,S=E.isLastPage,y=E.items,I=E.visibleColumns,b=E.blockedItems,E=E.filtersValue,R=_(I);React.useEffect(function(){var e=index$3.dist(r,500);d({getItems:r,debounceGetItems:e});var t=o.listGet,a=o.changeFiltersValue,e=o.history.action;c&&(Object.keys(s[l].filtersValue).length&&(!u||"PUSH"!==e&&"POP"!==e)||a(c,l)),(u&&("PUSH"===e||"POP"===e)||!s[l].items.length&&null===s[l].isLastPage)&&i&&t(l,i)},[]);function M(){if(T||S||m)return!1;var e=n.parent.current,t=n.tbody.current,a=t.offsetHeight-e.offsetHeight,e=Math.abs(utils.elemOffset(t).top-utils.elemOffset(e).top);a-document.getElementsByTagName("html")[0].offsetHeight/2<e&&r()}I=React.useMemo(function(){return R?e.filter(function(e,t){return R[t]}):e},[R]);return React__default.default.createElement("div",{ref:n.parent,className:"dr-table",id:t||l,onWheel:M,onTouchMove:M},React__default.default.createElement("table",null,!!f.length&&React__default.default.createElement(TTitle,{titleTemplate:f,visibleColumns:R}),React__default.default.createElement(THead,{template:I,titleTemplate:f,getItems:r,reducer:l,filtersValue:E}),React__default.default.createElement(TFoot,{tfootItem:a,template:I,forwardedRef:n.tfoot}),React__default.default.createElement(TBody,{template:I,items:y,tableRefs:n,forwardedRef:n.tbody,messages:p,isLoading:m,blockedItems:b})))};function ownKeys$2(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function _objectSpread$2(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys$2(Object(a),!0).forEach(function(e){index$1._defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys$2(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}TableComponent.displayName="TableComponent",TableComponent.defaultProps={id:null,titleTemplate:[],reducer:"",onInit:function(){},tfootItem:null,initFiltersValue:null,visibleColumnsMiddleware:function(e){return e},refreshTableOnPush:!1,disableLazyLoad:!1,messages:{noDataContent:"No content"}},TableComponent.propTypes={url:index.propTypes.string,id:index.propTypes.string,template:index.propTypes.array.isRequired,titleTemplate:index.propTypes.array,reducer:index.propTypes.string,onInit:index.propTypes.func,visibleColumnsMiddleware:index.propTypes.func,data:index.propTypes.object.isRequired,tfootItem:index.propTypes.object,initFiltersValue:index.propTypes.object,refreshTableOnPush:index.propTypes.bool,disableLazyLoad:index.propTypes.bool,listGet:index.propTypes.func.isRequired,changeFiltersValue:index.propTypes.func.isRequired,messages:index.propTypes.object};var REQUEST_REGEXP=/^MT_LIST@(.+)_REQUEST$/,RSAA="@@redux-api-middleware/RSAA",mainTableBeforeMiddleware=function(i){return function(l){return function(e){if(e[RSAA]){var t=_objectSpread$2({},e),a="object"===index$1._typeof(e[RSAA].types[0])?e[RSAA].types[0].type:e[RSAA].types[0];if(REQUEST_REGEXP.test(a)){var r,n,o=a.match(REQUEST_REGEXP)[1],a=i.getState().mainTable[o],o=a.isLoading,a=a.filtersValue;return o?!1:(a&&Object.keys(a).length&&(r=index$2.lodash_clonedeep(a),Object.entries(r).forEach(function(e){var t=index$2._slicedToArray(e,2),e=t[0],t=t[1],t=Array.isArray(t)?t:[t];r[e]=utils.lodash_compact(t)}),a=(o=t[RSAA].types[0].meta).disableFilters,n=o.requiredFilters,a&&n&&n.length&&Object.keys(r).forEach(function(e){n.indexOf(e)<0&&delete r[e]}),(a=utils.queryString.stringify(r)).length&&(t[RSAA].endpoint="".concat(t[RSAA].endpoint,"?").concat(a))),l(t))}return l(t)}return l(e)}}};function ownKeys$1(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function _objectSpread$1(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys$1(Object(a),!0).forEach(function(e){index$1._defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys$1(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var MT_SAVE_TABLE_SCROLL="MT_SAVE_TABLE_SCROLL",saveTableScrollAction=function(e,t){return{type:MT_SAVE_TABLE_SCROLL,scroll:e,reducer:t}},MT_CHANGE_FILTERS_VALUE="MT_CHANGE_FILTERS_VALUE",changeFiltersValueAction=function(e,t){return{type:MT_CHANGE_FILTERS_VALUE,data:e,reducer:t}},MT_UPDATE_VISIBLE_COLUMNS="MT_UPDATE_VISIBLE_COLUMNS",updateVisibleColumnsAction=function(e,t){return{type:MT_UPDATE_VISIBLE_COLUMNS,data:e,reducer:t}},MT_GET_SUBLINE_DATA_REQUEST="MT_GET_SUBLINE_DATA_REQUEST",MT_GET_SUBLINE_DATA_SUCCESS="MT_GET_SUBLINE_DATA_SUCCESS",MT_GET_SUBLINE_DATA_FAILURE="MT_GET_SUBLINE_DATA_FAILURE",MTgetSubLineData=function(e){var t=e.id,a=e.subLineKey,r=void 0===a?"id":a,n=e.query,a=e.url,e=e.reducer;return utils.crud({endpoint:a,query:_objectSpread$1(_objectSpread$1({},void 0===n?{}:n),{},index$1._defineProperty({},r,t)),crudTypes:{request:MT_GET_SUBLINE_DATA_REQUEST,success:MT_GET_SUBLINE_DATA_SUCCESS,failure:MT_GET_SUBLINE_DATA_FAILURE},meta:{reducer:e,subLineKey:r,id:t}})},MT_REMOVE_SUBLINE_DATA="MT_REMOVE_SUBLINE_DATA",MTremoveSubLineData=function(e){var t=e.id,a=e.reducer;return function(e){return e({type:MT_REMOVE_SUBLINE_DATA,id:t,reducer:a})}},MT_LIST_UPDATE_ITEMS="MT_LIST_UPDATE_ITEMS",MTupdateItemsAction=function(e,t){return{type:MT_LIST_UPDATE_ITEMS,items:e,reducer:t}},MT_LIST_AUTO_UPDATE_ITEM="MT_LIST_AUTO_UPDATE_ITEM",MTautoUpdateItemAction=function(e,t,a){return{type:MT_LIST_AUTO_UPDATE_ITEM,item:e,reducer:t,key:a}},MT_LIST_AUTO_UPDATE_ITEMS="MT_LIST_AUTO_UPDATE_ITEMS",MTautoUpdateItems=function(e,t){return{type:MT_LIST_AUTO_UPDATE_ITEMS,items:e,reducer:t}},MT_LIST_REMOVE_ITEM="MT_LIST_REMOVE_ITEM",MTlistRemoveItemAction=function(e,t){return{type:MT_LIST_REMOVE_ITEM,id:e,reducer:t,key:2<arguments.length&&void 0!==arguments[2]?arguments[2]:"id"}},MT_SET_ITEMS="MT_SET_ITEMS",MTsetItems=function(e,t){return{type:MT_SET_ITEMS,items:e,reducer:t}},filtersDataGetAction=function(e,t,a,r){return utils.crud({endpoint:t,query:a,meta:{modifyResponse:r},crudTypes:{request:"MT_FILTERS_DATA@".concat(e,"_REQUEST"),success:"MT_FILTERS_DATA@".concat(e,"_SUCCESS"),failure:"MT_FILTERS_DATA@".concat(e,"_FAILURE")}})},MT_DISABLE_ITEM_SWITCHER="MT_DISABLE_ITEM_SWITCH",disableItemSwitcherAction=function(e,t,a){return{type:MT_DISABLE_ITEM_SWITCHER,data:e,reducer:t,byIndex:a}},listGetAction=function(e,t,a,r,n){return utils.crud({endpoint:t,crudTypes:{request:"MT_LIST@".concat(e,"_REQUEST"),success:"MT_LIST@".concat(e,"_SUCCESS"),failure:"MT_LIST@".concat(e,"_FAILURE")},meta:{reloadItemsOnRequest:a,mainTableRequest:!0,disableFilters:r,requiredFilters:n}})},MTsaveTableScroll=function(t,a){return function(e){return e(saveTableScrollAction(t,a))}},MTchangeFiltersValue=function(t,a){return function(e){return e(changeFiltersValueAction(t,a))}},MTfiltersDataGet=function(t,a,r,n){return function(e){return e(filtersDataGetAction(t,a,r,n))}},MTupdateItems=function(t,a){return function(e){return e(MTupdateItemsAction(t,a))}},MTupdateVisibleColumns=function(t,a){return function(e){return e(updateVisibleColumnsAction(t,a))}},MTautoUpdateItem=function(t,a,r){return function(e){return e(MTautoUpdateItemAction(t,a,r))}},MTlistRemoveItem=function(t,a,r){return function(e){return e(MTlistRemoveItemAction(t,a,r))}},MTdisableItemSwitcher=function(t,a,r){return function(e){return e(disableItemSwitcherAction(t,a,r))}},MTlistGet=function(t,a,r,n,o){return function(e){return e(listGetAction(t,a,r,n,o))}};function ownKeys(t,e){var a,r=Object.keys(t);return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(t),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,a)),r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(a),!0).forEach(function(e){index$1._defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var REQUEST_LIST_REGEXP=/^MT_LIST@(.+)_REQUEST$/,SUCCESS_LIST_REGEXP=/^MT_LIST@(.+)_SUCCESS$/,FAILURE_LIST_REGEXP=/^MT_LIST@(.+)_FAILURE$/,SUCCESS_FILTERS_DATA_REGEXP=/^MT_FILTERS_DATA@(.+)_SUCCESS$/,tableExample={items:[],isLastPage:null,isLoading:!1,scroll:{},subLineData:{},filtersValue:{},blockedItems:[]},initialState={filtersData:{}},mainTableReducer=function(){var e,t,a,r,n,o,l,i,s,d,u,c,_,p,T,f,E,m,S,y,I,b,R,M,A,L,h,x,g,U,O=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,D=1<arguments.length?arguments[1]:void 0;return D.type===MT_REMOVE_SUBLINE_DATA&&(a=D.id,e=D.reducer,(t=index$2.lodash_clonedeep(O))[e].subLineData[a]&&delete t[e].subLineData[a]),D.type===MT_GET_SUBLINE_DATA_REQUEST&&(l=(a=D.meta).id,r=a.subLineKey,a=a.reducer,(t=index$2.lodash_clonedeep(O))[a].subLineData[l]={isLoading:!0,items:[],key:r}),D.type===MT_GET_SUBLINE_DATA_FAILURE&&(o=(n=D.meta).id,i=n.reducer,(t=index$2.lodash_clonedeep(O))[i].subLineData[o]&&delete t[i].subLineData[o]),D.type===MT_GET_SUBLINE_DATA_SUCCESS&&(r=(l=D.meta).id,n=l.reducer,o=(i=D.payload).status,l=i.payload,i=!!(t=index$2.lodash_clonedeep(O))[n].subLineData[r],"OK"===o&&l.items.length&&i?(t[n].subLineData[r].isLoading=!1,t[n].subLineData[r].items=_extends._toConsumableArray(l.items)):i&&delete t[n].subLineData[r]),D.type===MT_LIST_REMOVE_ITEM&&(s=D.id,c=D.reducer,T=D.key,d=void 0===T?"id":T,T=(T=(T=index$2.lodash_clonedeep(O[c].items)).map(function(e){var t=index$2.lodash_clonedeep(e),e=t.findIndex(function(e){return e[d]===s});return 0<=e&&delete t[e],t.filter(function(e){return Boolean(e)})})).filter(function(e){return Array.isArray(e)&&e.length}).filter(function(e){return Boolean(e)}),(t=index$2.lodash_clonedeep(O))[c].items=T),D.type===MT_LIST_AUTO_UPDATE_ITEM&&(u=D.item,c=D.reducer,T=D.key,(p=u[_=T||"id"])||T||(p=u[_="uuid"]),T=(T=index$2.lodash_clonedeep(O[c].items)).map(function(e){var t=index$2.lodash_clonedeep(e),e=t.findIndex(function(e){return e[_]===p});return 0<=e&&(t[e]=u),t}),(t=index$2.lodash_clonedeep(O))[c].items=T),D.type===MT_SAVE_TABLE_SCROLL&&(E=D.reducer,m=D.scroll,f=index$2.lodash_clonedeep(O),t=_objectSpread(_objectSpread({},f),{},index$1._defineProperty({},E,_objectSpread(_objectSpread({},f[E]),{},{scroll:m})))),D.type===MT_CHANGE_FILTERS_VALUE&&(f=D.reducer,E=D.data,m=index$2.lodash_clonedeep(O),S=_objectSpread(_objectSpread({},m[f]),{},{filtersValue:_objectSpread(_objectSpread({},m[f].filtersValue),E)}),Object.entries(S.filtersValue).forEach(function(e){var t=index$2._slicedToArray(e,2),e=t[0],t=t[1];!1!==t&&void 0!==t||delete S.filtersValue[e]}),0===E.offset&&(S.items=[]),t=_objectSpread(_objectSpread({},O),{},index$1._defineProperty({},D.reducer,S))),SUCCESS_FILTERS_DATA_REGEXP.test(D.type)&&(R=D.type.match(SUCCESS_FILTERS_DATA_REGEXP)[1],"OK"===D.payload.status&&(x=D.payload.payload.items,y=D.meta.modifyResponse,(t=index$2.lodash_clonedeep(O)).filtersData[R]=y?x.map(function(e){return{label:e[y.label],value:e[y.value]}}):x||[])),D.type===MT_DISABLE_ITEM_SWITCHER&&(I=D.data,b=D.reducer,L=D.byIndex,t=index$2.lodash_clonedeep(O),L||Object.keys(I).forEach(function(e){I[e]?t[b].blockedItems.indexOf(e)<0&&t[b].blockedItems.push(e):0<=(e=t[b].blockedItems.indexOf(e))&&delete t[b].blockedItems[e]}),t[b].blockedItems=t[b].blockedItems.filter(function(e){return e})),D.type===MT_SET_ITEMS&&(A=D.items,M=D.reducer,(t=index$2.lodash_clonedeep(O))[M].items=[index$2.lodash_clonedeep(A)]),REQUEST_LIST_REGEXP.test(D.type)&&(h=D.type.match(REQUEST_LIST_REGEXP)[1],(t=index$2.lodash_clonedeep(O))[h].isLoading=!0),SUCCESS_LIST_REGEXP.test(D.type)&&(R=D.type.match(SUCCESS_LIST_REGEXP)[1],(t=index$2.lodash_clonedeep(O))[R].isLoading=!1,"OK"===D.payload.status?(M=(L=(x=D.payload).payload).items,A=L.item,h=x._meta,L=D.meta.reloadItemsOnRequest,h=(x=void 0===h?{is_last_page:!1,total:0}:h).is_last_page,x=x.total,t[R].isLastPage=h,t[R].total=x,M&&M.length||A?t[R].items=L?[M||[A]]:[].concat(_extends._toConsumableArray(t[R].items),[M||[A]]):t[R].isLastPage=!0):t[R].isLastPage=!0),FAILURE_LIST_REGEXP.test(D.type)&&(g=D.type.match(FAILURE_LIST_REGEXP)[1],(t=index$2.lodash_clonedeep(O))[g].isLoading=!1,t[g].isLastPage=!0),D.type===MT_LIST_UPDATE_ITEMS&&(U=D.items,g=D.reducer,(t=index$2.lodash_clonedeep(O))[g].items=U),D.type===MT_UPDATE_VISIBLE_COLUMNS&&(U=D.data,D=D.reducer,(t=index$2.lodash_clonedeep(O))[D].visibleColumns=U),t||O},mainTableReducer$1=function(){return(0<arguments.length&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(e){initialState[e]=index$2.lodash_clonedeep(tableExample)}),mainTableReducer};exports.MT_CHANGE_FILTERS_VALUE=MT_CHANGE_FILTERS_VALUE,exports.MT_DISABLE_ITEM_SWITCHER=MT_DISABLE_ITEM_SWITCHER,exports.MT_GET_SUBLINE_DATA_FAILURE=MT_GET_SUBLINE_DATA_FAILURE,exports.MT_GET_SUBLINE_DATA_REQUEST=MT_GET_SUBLINE_DATA_REQUEST,exports.MT_GET_SUBLINE_DATA_SUCCESS=MT_GET_SUBLINE_DATA_SUCCESS,exports.MT_LIST_AUTO_UPDATE_ITEM=MT_LIST_AUTO_UPDATE_ITEM,exports.MT_LIST_AUTO_UPDATE_ITEMS=MT_LIST_AUTO_UPDATE_ITEMS,exports.MT_LIST_REMOVE_ITEM=MT_LIST_REMOVE_ITEM,exports.MT_LIST_UPDATE_ITEMS=MT_LIST_UPDATE_ITEMS,exports.MT_REMOVE_SUBLINE_DATA=MT_REMOVE_SUBLINE_DATA,exports.MT_SAVE_TABLE_SCROLL=MT_SAVE_TABLE_SCROLL,exports.MT_UPDATE_VISIBLE_COLUMNS=MT_UPDATE_VISIBLE_COLUMNS,exports.MTautoUpdateItem=MTautoUpdateItem,exports.MTautoUpdateItems=MTautoUpdateItems,exports.MTchangeFiltersValue=MTchangeFiltersValue,exports.MTdisableItemSwitcher=MTdisableItemSwitcher,exports.MTfiltersDataGet=MTfiltersDataGet,exports.MTgetSubLineData=MTgetSubLineData,exports.MTlistGet=MTlistGet,exports.MTlistRemoveItem=MTlistRemoveItem,exports.MTremoveSubLineData=MTremoveSubLineData,exports.MTsaveTableScroll=MTsaveTableScroll,exports.MTsetItems=MTsetItems,exports.MTupdateItems=MTupdateItems,exports.MTupdateVisibleColumns=MTupdateVisibleColumns,exports.Table=TableComponent,exports.mainTableBeforeMiddleware=mainTableBeforeMiddleware,exports.mainTableReducer=mainTableReducer$1;