function ___$insertStyle(e){if(e&&"undefined"!=typeof window){const t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}}Object.defineProperty(exports,"__esModule",{value:!0});var utils=require("./utils-c03c939c.js"),index$1=require("./index-8f50ebe2.js"),index=require("./index-565a9c6e.js"),ignoreStatuses=["OK","NO_ROWS"],crudAfterMiddleware=function(e){return function(d){return function(e){if(/.*_FAILURE$/gi.test(e.type)&&401!==e.meta.status)return d({type:"ADD_NOTIFICATION",notification:{id:parseInt(Math.random().toString().split(".")[1],10),duration:7e3,message:"Something went wrong. Try again later.",type:"NOTIFICATION_TYPE_ERROR",canDismiss:!0}}),Promise.reject(d(e));if(/.*_SUCCESS$/gi.test(e.type)){var t=index.lodash_clonedeep(e);if(t.payload.status&&t.payload.status.length||(t.payload.status="EMPTY_STATUS_FROM_BACKEND"),"object"!==index$1._typeof(t.payload.payload)&&(t.payload.payload={item:{},items:[]}),"object"!==index$1._typeof(t.payload._meta)&&(t.payload._meta={}),t.meta&&t.meta.validStatuses&&t.payload){var i=t.payload,r=t.meta,n=r.validStatuses,n=void 0===n?[]:n,r=r.errorMessagesByStatus,r=void 0===r?{}:r,i=(void 0===i?{status:"INTERNAL_ERROR"}:i).status;if(ignoreStatuses.indexOf(i)<0&&n.indexOf(i)<0){i=r[i]||"Something went wrong. Try again later.";return d({type:"ADD_NOTIFICATION",notification:{id:parseInt(Math.random().toString().split(".")[1],10),duration:7e3,message:i,type:"NOTIFICATION_TYPE_ERROR",canDismiss:!0}}),Promise.reject(d(e))}}return d(t)}return d(e)}}},RSAA="@@redux-api-middleware/RSAA",listRegexp=/^LIST_(.*)_REQUEST$/,crudBeforeMiddleware=function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"dr-pa-token";return function(r){return function(i){return function(e){if(e.isCrud){var t=index.lodash_clonedeep(e);if(delete t.isCrud,listRegexp.test(e[RSAA].types[0])){if(r.getState()[e.reducer].isLoading)return!1;delete t.reducer}return t[RSAA].body&&"application/json"===t[RSAA].headers["Content-Type"]&&"string"!=typeof t[RSAA].body&&(t[RSAA].body=JSON.stringify(t[RSAA].body)),e.needToken&&(t[RSAA].headers.Authorization="Bearer ".concat(utils.getCookie(n)),delete t.needToken),i(t)}return i(e)}}}},initialState={isLoading:{}},crudReducer=function(){var e,t,i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,r=1<arguments.length?arguments[1]:void 0;return r.type.includes("CRUD_ACTION_REQUEST")&&(e=r.type.split("_")[0],(t=index.lodash_clonedeep(i)).isLoading[e]=!0),(r.type.includes("CRUD_ACTION_SUCCESS")||r.type.includes("CRUD_ACTION_FAILURE"))&&(r=r.type.split("_")[0],(t=index.lodash_clonedeep(i)).isLoading[r]=!1),t||i};exports.CRUD_ACTION_FAILURE=utils.CRUD_ACTION_FAILURE,exports.CRUD_ACTION_REQUEST=utils.CRUD_ACTION_REQUEST,exports.CRUD_ACTION_SUCCESS=utils.CRUD_ACTION_SUCCESS,exports.crud=utils.crud,exports.crudAfterMiddleware=crudAfterMiddleware,exports.crudBeforeMiddleware=crudBeforeMiddleware,exports.crudReducer=crudReducer;
