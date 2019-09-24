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

require('./chunk-8a96f938.js');
var __chunk_5 = require('./chunk-af08879b.js');
require('./chunk-3cd28e33.js');
var __chunk_7 = require('./chunk-04fc15c7.js');
var __chunk_8 = require('./chunk-e635a9c8.js');
var __chunk_9 = require('./chunk-93b2e459.js');
var __chunk_10 = require('./chunk-c11a7971.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { __chunk_5._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var REQUEST_REGEXP = /^MT_LIST@(.+)_REQUEST$/;
var RSAA = '@@redux-api-middleware/RSAA';
var mainTableMiddleware = (function (store) {
  return function (next) {
    return function (action) {
      if (action[RSAA]) {
        var newAction = _objectSpread({}, action); // stop request for list if is loading


        if (REQUEST_REGEXP.test(action[RSAA].types[0])) {
          var _store$getState = store.getState(),
              _store$getState$mainT = _store$getState.mainTable[action.reducer],
              isLoading = _store$getState$mainT.isLoading,
              filtersValue = _store$getState$mainT.filtersValue;

          if (isLoading) {
            return false;
          }

          if (filtersValue && Object.keys(filtersValue).length) {
            var compactedQuery = __chunk_10.cloneDeep(filtersValue);
            Object.entries(compactedQuery).forEach(function (_ref) {
              var _ref2 = __chunk_7._slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              var arr = Array.isArray(value) ? value : [value];
              compactedQuery[key] = __chunk_8.compact(arr);
            });
            var queryString = __chunk_9.queryBuilder.stringify(compactedQuery);

            if (queryString.length) {
              newAction[RSAA].endpoint = "".concat(newAction[RSAA].endpoint, "?").concat(queryString);
            }
          }

          delete newAction.reducer;
        }

        return next(newAction);
      }

      return next(action);
    };
  };
});

module.exports = mainTableMiddleware;
