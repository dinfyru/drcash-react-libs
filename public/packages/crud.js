'use strict';



function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-076fd344.js');
var __chunk_4 = require('./chunk-26e2e146.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { __chunk_1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CRUD_ACTION_REQUEST = 'CRUD_ACTION_REQUEST';
var CRUD_ACTION_SUCCESS = 'CRUD_ACTION_SUCCESS';
var CRUD_ACTION_FAILURE = 'CRUD_ACTION_FAILURE';
var RSAA = '@@redux-api-middleware/RSAA';
/**
 * Easy request to api server
 * @async
 * @param {Object} params
 * @param {string} [params.method=GET]
 * @param {string} params.endpoint
 * @param {Object} params.keys
 * @param {Object} query
 * @param {Object|Object[]} params.body
 * @param {Object} params.meta
 * @param {string} [params.name=base_]
 * @param {Object} params.headers
 * @returns {Promise} request result
 */

var crud = (function (_ref) {
  var _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      endpoint = _ref.endpoint,
      keys = _ref.keys,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? {} : _ref$query,
      body = _ref.body,
      _ref$meta = _ref.meta,
      meta = _ref$meta === void 0 ? {} : _ref$meta,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? 'base_' : _ref$name,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers,
      _ref$needToken = _ref.needToken,
      needToken = _ref$needToken === void 0 ? true : _ref$needToken,
      _ref$crudTypes = _ref.crudTypes,
      crudTypes = _ref$crudTypes === void 0 ? {
    request: "".concat(name, "_").concat(CRUD_ACTION_REQUEST),
    success: "".concat(name, "_").concat(CRUD_ACTION_SUCCESS),
    failure: "".concat(name, "_").concat(CRUD_ACTION_FAILURE)
  } : _ref$crudTypes,
      _ref$validStatuses = _ref.validStatuses,
      validStatuses = _ref$validStatuses === void 0 ? [] : _ref$validStatuses,
      _ref$errorMessagesByS = _ref.errorMessagesByStatus,
      errorMessagesByStatus = _ref$errorMessagesByS === void 0 ? {} : _ref$errorMessagesByS;

  var metaObj = _objectSpread({
    query: query
  }, meta, {
    validStatuses: validStatuses,
    errorMessagesByStatus: errorMessagesByStatus
  });

  var action = __chunk_1._defineProperty({
    needToken: needToken,
    isCrud: true
  }, RSAA, {
    endpoint: endpoint,
    method: method,
    types: [{
      type: crudTypes.request,
      meta: metaObj
    }, {
      type: crudTypes.success,
      meta: metaObj
    }, {
      type: crudTypes.failure,
      meta: metaObj
    }]
  });

  action[RSAA].headers = _objectSpread({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
  }, headers);

  if (keys) {
    Object.keys(keys).forEach(function (key) {
      action[RSAA].endpoint = action[RSAA].endpoint.replace(":".concat(key), keys[key]);
    });
  }

  if (query && Object.keys(query).length) {
    var compactedQuery = __chunk_4.cloneDeep(query);
    Object.entries(compactedQuery).forEach(function (_ref2) {
      var _ref3 = __chunk_4._slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      var arr = Array.isArray(value) ? value : [value];
      compactedQuery[key] = __chunk_4.compact(arr);
    });
    var queryString = __chunk_4.queryBuilder.stringify(compactedQuery);

    if (queryString.length) {
      action[RSAA].endpoint = "".concat(action[RSAA].endpoint, "?").concat(queryString);
    }
  }

  if (body && headers['Content-Type'] === 'application/json') {
    action[RSAA].body = JSON.stringify(body);
  } else if (body) {
    action[RSAA].body = body;
  }

  return action;
});

var crudAfterMiddleware = (function (store) {
  return function (next) {
    return function (action) {
      if (/.*_FAILURE$/gi.test(action.type)) {
        next({
          type: 'ADD_NOTIFICATION',
          notification: {
            id: parseInt(Math.random().toString().split('.')[1], 10),
            duration: 7000,
            message: 'Something went wrong. Try again later.',
            type: 'NOTIFICATION_TYPE_ERROR',
            canDismiss: true
          }
        });
        return Promise.reject(next(action));
      }

      if (/.*_SUCCESS$/gi.test(action.type)) {
        var cloneAction = __chunk_4.cloneDeep(action); // validate response crud data

        if (!cloneAction.payload.status || !cloneAction.payload.status.length) {
          cloneAction.payload.status = 'EMPTY_STATUS_FROM_BACKEND';
        }

        if (__chunk_1._typeof(cloneAction.payload.payload) !== 'object') {
          cloneAction.payload.payload = {
            item: {},
            items: []
          };
        }

        if (__chunk_1._typeof(cloneAction.payload._meta) !== 'object') {
          cloneAction.payload._meta = {};
        } // validate crud actions for status


        if (cloneAction.meta && cloneAction.meta.validStatuses && cloneAction.payload) {
          var _cloneAction$payload = cloneAction.payload,
              payload = _cloneAction$payload === void 0 ? {
            status: 'INTERNAL_ERROR'
          } : _cloneAction$payload,
              _cloneAction$meta = cloneAction.meta,
              _cloneAction$meta$val = _cloneAction$meta.validStatuses,
              validStatuses = _cloneAction$meta$val === void 0 ? [] : _cloneAction$meta$val,
              _cloneAction$meta$err = _cloneAction$meta.errorMessagesByStatus,
              errorMessagesByStatus = _cloneAction$meta$err === void 0 ? {} : _cloneAction$meta$err;
          var status = payload.status;

          if (status !== 'OK' && validStatuses.indexOf(status) < 0) {
            var message = errorMessagesByStatus[status] ? errorMessagesByStatus[status] : 'Something went wrong. Try again later.';
            next({
              type: 'ADD_NOTIFICATION',
              notification: {
                id: parseInt(Math.random().toString().split('.')[1], 10),
                duration: 7000,
                message: message,
                type: 'NOTIFICATION_TYPE_ERROR',
                canDismiss: true
              }
            });
            return Promise.reject(next(action));
          }
        }

        return next(cloneAction);
      }

      return next(action);
    };
  };
});

var RSAA$1 = '@@redux-api-middleware/RSAA';
var listRegexp = /^LIST_(.*)_REQUEST$/;
var crudBeforeMiddleware = (function () {
  var tokenName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dr-pa-token';
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.isCrud) {
          var newAction = __chunk_4.cloneDeep(action);
          delete newAction.isCrud; // stop request for list if is loading

          if (listRegexp.test(action[RSAA$1].types[0])) {
            var _store$getState = store.getState(),
                isLoading = _store$getState[action.reducer].isLoading;

            if (isLoading) {
              return false;
            }

            delete newAction.reducer;
          }

          if (newAction[RSAA$1].body && newAction[RSAA$1].headers['Content-Type'] === 'application/json' && typeof newAction[RSAA$1].body !== 'string'
          /* fix */
          ) {
              newAction[RSAA$1].body = JSON.stringify(newAction[RSAA$1].body);
            }

          if (action.needToken) {
            newAction[RSAA$1].headers.Authorization = "Bearer ".concat(__chunk_4.getCookie(tokenName));
            delete newAction.needToken;
          }

          return next(newAction);
        }

        return next(action);
      };
    };
  };
});

var initialState = {
  isLoading: {}
};
var crudReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var nextState;

  if (action.type.includes('CRUD_ACTION_REQUEST')) {
    var crudName = action.type.split('_')[0];
    nextState = __chunk_4.cloneDeep(state);
    nextState.isLoading[crudName] = true;
  }

  if (action.type.includes('CRUD_ACTION_SUCCESS') || action.type.includes('CRUD_ACTION_FAILURE')) {
    var _crudName = action.type.split('_')[0];
    nextState = __chunk_4.cloneDeep(state);
    nextState.isLoading[_crudName] = false;
  }

  return nextState || state;
});

exports.CRUD_ACTION_FAILURE = CRUD_ACTION_FAILURE;
exports.CRUD_ACTION_REQUEST = CRUD_ACTION_REQUEST;
exports.CRUD_ACTION_SUCCESS = CRUD_ACTION_SUCCESS;
exports.crud = crud;
exports.crudAfterMiddleware = crudAfterMiddleware;
exports.crudBeforeMiddleware = crudBeforeMiddleware;
exports.crudReducer = crudReducer;
