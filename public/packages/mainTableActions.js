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

var __chunk_5 = require('./chunk-af08879b.js');
require('./chunk-3cd28e33.js');
var __chunk_9 = require('./chunk-93b2e459.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { __chunk_5._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var RSAA = '@@redux-api-middleware/RSAA';
var MT_SAVE_TABLE_SCROLL = 'MT_SAVE_TABLE_SCROLL';

var saveTableScrollAction = function saveTableScrollAction(scroll, reducer) {
  return {
    type: MT_SAVE_TABLE_SCROLL,
    scroll: scroll,
    reducer: reducer
  };
};

var MT_CHANGE_FILTERS_VALUE = 'MT_CHANGE_FILTERS_VALUE';

var changeFiltersValueAction = function changeFiltersValueAction(data, reducer) {
  return {
    type: MT_CHANGE_FILTERS_VALUE,
    data: data,
    reducer: reducer
  };
};

var MT_UPDATE_VISIBLE_COLUMNS = 'MT_UPDATE_VISIBLE_COLUMNS';

var updateVisibleColumnsAction = function updateVisibleColumnsAction(data, reducer) {
  return {
    type: MT_UPDATE_VISIBLE_COLUMNS,
    data: data,
    reducer: reducer
  };
};

var listGetAction = function listGetAction(reducer, url) {
  return __chunk_5._defineProperty({
    needToken: true,
    reducer: reducer
  }, RSAA, {
    endpoint: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    types: ["MT_LIST@".concat(reducer, "_REQUEST"), "MT_LIST@".concat(reducer, "_SUCCESS"), "MT_LIST@".concat(reducer, "_FAILURE")]
  });
};

var MT_GET_SUBLINE_DATA_REQUEST = 'MT_GET_SUBLINE_DATA_REQUEST';
var MT_GET_SUBLINE_DATA_SUCCESS = 'MT_GET_SUBLINE_DATA_SUCCESS';
var MT_GET_SUBLINE_DATA_FAILURE = 'MT_GET_SUBLINE_DATA_FAILURE';
var MTgetSubLineData = function MTgetSubLineData(_ref2) {
  var id = _ref2.id,
      _ref2$subLineKey = _ref2.subLineKey,
      subLineKey = _ref2$subLineKey === void 0 ? 'id' : _ref2$subLineKey,
      _ref2$query = _ref2.query,
      query = _ref2$query === void 0 ? {} : _ref2$query,
      url = _ref2.url,
      reducer = _ref2.reducer;
  return function (dispatch) {
    var queryString = __chunk_9.queryBuilder.stringify(_objectSpread({}, query, __chunk_5._defineProperty({}, subLineKey, id)));
    var endpoint = url;

    if (queryString.length) {
      endpoint = "".concat(endpoint, "?").concat(queryString);
    }

    return dispatch(__chunk_5._defineProperty({
      needToken: true
    }, RSAA, {
      endpoint: endpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      types: [{
        type: MT_GET_SUBLINE_DATA_REQUEST,
        meta: {
          reducer: reducer,
          subLineKey: subLineKey,
          id: id
        }
      }, {
        type: MT_GET_SUBLINE_DATA_SUCCESS,
        meta: {
          reducer: reducer,
          subLineKey: subLineKey,
          id: id
        }
      }, {
        type: MT_GET_SUBLINE_DATA_FAILURE,
        meta: {
          reducer: reducer,
          subLineKey: subLineKey,
          id: id
        }
      }]
    }));
  };
};
var MT_REMOVE_SUBLINE_DATA = 'MT_REMOVE_SUBLINE_DATA';
var MTremoveSubLineData = function MTremoveSubLineData(_ref3) {
  var id = _ref3.id,
      reducer = _ref3.reducer;
  return function (dispatch) {
    return dispatch({
      type: MT_REMOVE_SUBLINE_DATA,
      id: id,
      reducer: reducer
    });
  };
};
var MT_LIST_UPDATE_ITEMS = 'MT_LIST_UPDATE_ITEMS';

var MTupdateItemsAction = function MTupdateItemsAction(items, reducer) {
  return {
    type: MT_LIST_UPDATE_ITEMS,
    items: items,
    reducer: reducer
  };
};

var MT_LIST_AUTO_UPDATE_ITEM = 'MT_LIST_AUTO_UPDATE_ITEM';

var MTautoUpdateItemAction = function MTautoUpdateItemAction(item, reducer) {
  return {
    type: MT_LIST_AUTO_UPDATE_ITEM,
    item: item,
    reducer: reducer
  };
};

var MT_LIST_AUTO_UPDATE_ITEMS = 'MT_LIST_AUTO_UPDATE_ITEMS';
var MTautoUpdateItems = function MTautoUpdateItems(items, reducer) {
  return {
    type: MT_LIST_AUTO_UPDATE_ITEMS,
    items: items,
    reducer: reducer
  };
};
var MT_LIST_REMOVE_ITEM = 'MT_LIST_REMOVE_ITEM';

var MTlistRemoveItemAction = function MTlistRemoveItemAction(id, reducer) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  return {
    type: MT_LIST_REMOVE_ITEM,
    id: id,
    reducer: reducer,
    key: key
  };
};

var filtersDataGetAction = function filtersDataGetAction(reducer, url, params) {
  var query = __chunk_9.queryBuilder.stringify(params);
  var endpoint = "".concat(url).concat(query && query.length ? "?".concat(query) : '');
  return __chunk_5._defineProperty({
    needToken: true
  }, RSAA, {
    endpoint: endpoint,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    types: ["MT_FILTERS_DATA@".concat(reducer, "_REQUEST"), "MT_FILTERS_DATA@".concat(reducer, "_SUCCESS"), "MT_FILTERS_DATA@".concat(reducer, "_FAILURE")]
  });
};

var MT_DISABLE_ITEM_SWITCHER = 'MT_DISABLE_ITEM_SWITCH';

var disableItemSwitcherAction = function disableItemSwitcherAction(data, reducer, byIndex) {
  return {
    type: MT_DISABLE_ITEM_SWITCHER,
    data: data,
    reducer: reducer,
    byIndex: byIndex
  };
};

var MTsaveTableScroll = function MTsaveTableScroll(scroll, reducer) {
  return function (dispatch) {
    return dispatch(saveTableScrollAction(scroll, reducer));
  };
};
var MTchangeFiltersValue = function MTchangeFiltersValue(data, reducer) {
  return function (dispatch) {
    return dispatch(changeFiltersValueAction(data, reducer));
  };
};
var MTlistGet = function MTlistGet(reducer, url) {
  return function (dispatch) {
    return dispatch(listGetAction(reducer, url));
  };
};
var MTfiltersDataGet = function MTfiltersDataGet(reducer, url, params) {
  return function (dispatch) {
    return dispatch(filtersDataGetAction(reducer, url, params));
  };
};
var MTupdateItems = function MTupdateItems(items, reducer) {
  return function (dispatch) {
    return dispatch(MTupdateItemsAction(items, reducer));
  };
};
var MTupdateVisibleColumns = function MTupdateVisibleColumns(data, reducer) {
  return function (dispatch) {
    return dispatch(updateVisibleColumnsAction(data, reducer));
  };
};
var MTautoUpdateItem = function MTautoUpdateItem(item, reducer) {
  return function (dispatch) {
    return dispatch(MTautoUpdateItemAction(item, reducer));
  };
};
var MTlistRemoveItem = function MTlistRemoveItem(id, reducer, key) {
  return function (dispatch) {
    return dispatch(MTlistRemoveItemAction(id, reducer, key));
  };
};
var MTdisableItemSwitcher = function MTdisableItemSwitcher(data, reducer, byIndex) {
  return function (dispatch) {
    return dispatch(disableItemSwitcherAction(data, reducer, byIndex));
  };
};

exports.MT_CHANGE_FILTERS_VALUE = MT_CHANGE_FILTERS_VALUE;
exports.MT_DISABLE_ITEM_SWITCHER = MT_DISABLE_ITEM_SWITCHER;
exports.MT_GET_SUBLINE_DATA_FAILURE = MT_GET_SUBLINE_DATA_FAILURE;
exports.MT_GET_SUBLINE_DATA_REQUEST = MT_GET_SUBLINE_DATA_REQUEST;
exports.MT_GET_SUBLINE_DATA_SUCCESS = MT_GET_SUBLINE_DATA_SUCCESS;
exports.MT_LIST_AUTO_UPDATE_ITEM = MT_LIST_AUTO_UPDATE_ITEM;
exports.MT_LIST_AUTO_UPDATE_ITEMS = MT_LIST_AUTO_UPDATE_ITEMS;
exports.MT_LIST_REMOVE_ITEM = MT_LIST_REMOVE_ITEM;
exports.MT_LIST_UPDATE_ITEMS = MT_LIST_UPDATE_ITEMS;
exports.MT_REMOVE_SUBLINE_DATA = MT_REMOVE_SUBLINE_DATA;
exports.MT_SAVE_TABLE_SCROLL = MT_SAVE_TABLE_SCROLL;
exports.MT_UPDATE_VISIBLE_COLUMNS = MT_UPDATE_VISIBLE_COLUMNS;
exports.MTautoUpdateItem = MTautoUpdateItem;
exports.MTautoUpdateItems = MTautoUpdateItems;
exports.MTchangeFiltersValue = MTchangeFiltersValue;
exports.MTdisableItemSwitcher = MTdisableItemSwitcher;
exports.MTfiltersDataGet = MTfiltersDataGet;
exports.MTgetSubLineData = MTgetSubLineData;
exports.MTlistGet = MTlistGet;
exports.MTlistRemoveItem = MTlistRemoveItem;
exports.MTremoveSubLineData = MTremoveSubLineData;
exports.MTsaveTableScroll = MTsaveTableScroll;
exports.MTupdateItems = MTupdateItems;
exports.MTupdateVisibleColumns = MTupdateVisibleColumns;
