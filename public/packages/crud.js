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

require('./chunk-8a96f938.js');
var __chunk_5 = require('./chunk-af08879b.js');
require('./chunk-3cd28e33.js');
var __chunk_7 = require('./chunk-04fc15c7.js');
var __chunk_8 = require('./chunk-e635a9c8.js');
var __chunk_9 = require('./chunk-93b2e459.js');
var __chunk_10 = require('./chunk-c11a7971.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { __chunk_5._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var crud = function crud(_ref) {
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
      headers = _ref$headers === void 0 ? {
    'Content-Type': 'application/json'
  } : _ref$headers,
      _ref$needToken = _ref.needToken,
      needToken = _ref$needToken === void 0 ? true : _ref$needToken;

  var action = __chunk_5._defineProperty({
    needToken: needToken
  }, RSAA, {
    endpoint: endpoint,
    method: method,
    types: [{
      type: "".concat(name, "_").concat(CRUD_ACTION_REQUEST),
      meta: _objectSpread({
        query: query
      }, meta)
    }, {
      type: "".concat(name, "_").concat(CRUD_ACTION_SUCCESS),
      meta: _objectSpread({
        query: query
      }, meta)
    }, {
      type: "".concat(name, "_").concat(CRUD_ACTION_FAILURE),
      meta: _objectSpread({
        query: query
      }, meta)
    }]
  });

  if (Object.keys(headers).length) {
    action[RSAA].headers = headers;
  }

  if (keys) {
    Object.keys(keys).forEach(function (key) {
      action[RSAA].endpoint = action[RSAA].endpoint.replace(":".concat(key), keys[key]);
    });
  }

  if (query && Object.keys(query).length) {
    var compactedQuery = __chunk_10.cloneDeep(query);
    Object.entries(compactedQuery).forEach(function (_ref2) {
      var _ref3 = __chunk_7._slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      var arr = Array.isArray(value) ? value : [value];
      compactedQuery[key] = __chunk_8.compact(arr);
    });
    var queryString = __chunk_9.queryBuilder.stringify(compactedQuery);

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
};

exports.CRUD_ACTION_FAILURE = CRUD_ACTION_FAILURE;
exports.CRUD_ACTION_REQUEST = CRUD_ACTION_REQUEST;
exports.CRUD_ACTION_SUCCESS = CRUD_ACTION_SUCCESS;
exports.crud = crud;
