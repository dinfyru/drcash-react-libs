"use strict";function ___$insertStyle(e){if(e&&"undefined"!=typeof window){var t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}}require("./chunk-8a96f938.js");var __chunk_3=require("./chunk-4a240d20.js"),__chunk_5=require("./chunk-af08879b.js");require("./chunk-3cd28e33.js");var __chunk_7=require("./chunk-04fc15c7.js");require("./chunk-93b2e459.js");var __chunk_10=require("./chunk-c11a7971.js"),mainTableActions=require("./mainTableActions.js");function ownKeys(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(n,!0).forEach(function(e){__chunk_5._defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var REQUEST_LIST_REGEXP=/^MT_LIST@(.+)_REQUEST$/,SUCCESS_LIST_REGEXP=/^MT_LIST@(.+)_SUCCESS$/,FAILURE_LIST_REGEXP=/^MT_LIST@(.+)_FAILURE$/,SUCCESS_FILTERS_DATA_REGEXP=/^MT_FILTERS_DATA@(.+)_SUCCESS$/,tableExample={items:[],isLastPage:null,isLoading:!1,scroll:{},filtersValue:{},blockedItems:[]},initialState={filtersData:{}},reducer=function(e,t){var n,r=0<arguments.length&&void 0!==e?e:initialState,_=1<arguments.length?t:void 0;if(_.type===mainTableActions.MT_LIST_REMOVE_ITEM){var i=_.id,c=_.reducer,a=__chunk_10.cloneDeep(r[c].items);a=(a=a.map(function(e){var t=__chunk_10.cloneDeep(e),n=t.findIndex(function(e){return e.id===i});return 0<=n&&delete t[n],t.filter(function(e){return Boolean(e)})})).filter(function(e){return Array.isArray(e)&&e.length}).filter(function(e){return Boolean(e)}),(n=__chunk_10.cloneDeep(r))[c].items=a}if(_.type===mainTableActions.MT_LIST_AUTO_UPDATE_ITEM){var o=_.item,u=_.item.id,l=_.reducer,s=__chunk_10.cloneDeep(r[l].items);s=s.map(function(e){var t=__chunk_10.cloneDeep(e),n=t.findIndex(function(e){return e.id===u});return 0<=n&&(t[n]=o),t}),(n=__chunk_10.cloneDeep(r))[l].items=s}if(_.type===mainTableActions.MT_SAVE_TABLE_SCROLL){var d=_.reducer,E=_.scroll,p=__chunk_10.cloneDeep(r);n=_objectSpread({},p,__chunk_5._defineProperty({},d,_objectSpread({},p[d],{scroll:E})))}if(_.type===mainTableActions.MT_CHANGE_FILTERS_VALUE){var f=_.reducer,S=_.data,T=__chunk_10.cloneDeep(r),h=_objectSpread({},T[f],{filtersValue:_objectSpread({},T[f].filtersValue,{},S)});Object.entries(h.filtersValue).forEach(function(e){var t=__chunk_7._slicedToArray(e,2),n=t[0],r=t[1];!1!==r&&void 0!==r||delete h.filtersValue[n]}),0===S.offset&&(h.items=[]),n=_objectSpread({},r,__chunk_5._defineProperty({},_.reducer,h))}if(SUCCESS_FILTERS_DATA_REGEXP.test(_.type)){var m=_.type.match(SUCCESS_FILTERS_DATA_REGEXP)[1];if("OK"===_.payload.status){var y=_.payload.payload.items;(n=__chunk_10.cloneDeep(r)).filtersData[m]=y}}if(_.type===mainTableActions.MT_DISABLE_ITEM_SWITCHER){var b=_.data,I=_.reducer,k=_.byIndex;n=__chunk_10.cloneDeep(r),k||Object.keys(b).forEach(function(e){if(b[e]){n[I].blockedItems.indexOf(e)<0&&n[I].blockedItems.push(e)}else{var t=n[I].blockedItems.indexOf(e);0<=t&&delete n[I].blockedItems[t]}}),n[I].blockedItems=n[I].blockedItems.filter(function(e){return e})}if(REQUEST_LIST_REGEXP.test(_.type)){var L=_.type.match(REQUEST_LIST_REGEXP)[1];(n=__chunk_10.cloneDeep(r))[L].isLoading=!0}if(SUCCESS_LIST_REGEXP.test(_.type)){var A=_.type.match(SUCCESS_LIST_REGEXP)[1];if("OK"===_.payload.status){var v=_.payload,D=v.payload.items,R=v._meta,P=R.is_last_page,j=R.total;(n=__chunk_10.cloneDeep(r))[A].isLoading=!1,n[A].isLastPage=P,n[A].total=j,D.length&&(n[A].items=[].concat(__chunk_3._toConsumableArray(n[A].items),[D]))}}if(FAILURE_LIST_REGEXP.test(_.type)){var O=_.type.match(FAILURE_LIST_REGEXP)[1];(n=__chunk_10.cloneDeep(r))[O].isLoading=!1,n[O].isLastPage=!0}if(_.type===mainTableActions.MT_LIST_UPDATE_ITEMS){var C=_.items,U=_.reducer;(n=__chunk_10.cloneDeep(r))[U].items=C}if(_.type===mainTableActions.MT_UPDATE_VISIBLE_COLUMNS){var g=_.data,M=_.reducer;(n=__chunk_10.cloneDeep(r))[M].visibleColumns=g}return n||r},mainTableReducer=function(){return(0<arguments.length&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(e){initialState[e]=__chunk_10.cloneDeep(tableExample)}),reducer};module.exports=mainTableReducer;
