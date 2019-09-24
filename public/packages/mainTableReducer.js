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
var __chunk_3 = require('./chunk-4a240d20.js');
var __chunk_5 = require('./chunk-af08879b.js');
require('./chunk-3cd28e33.js');
var __chunk_7 = require('./chunk-04fc15c7.js');
require('./chunk-93b2e459.js');
var __chunk_10 = require('./chunk-c11a7971.js');
var mainTableActions = require('./mainTableActions.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { __chunk_5._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var REQUEST_LIST_REGEXP = /^MT_LIST@(.+)_REQUEST$/;
var SUCCESS_LIST_REGEXP = /^MT_LIST@(.+)_SUCCESS$/;
var FAILURE_LIST_REGEXP = /^MT_LIST@(.+)_FAILURE$/;
var SUCCESS_FILTERS_DATA_REGEXP = /^MT_FILTERS_DATA@(.+)_SUCCESS$/;
var tableExample = {
  items: [],
  isLastPage: null,
  isLoading: false,
  scroll: {},
  subLineData: {},
  filtersValue: {},
  blockedItems: []
};
var initialState = {
  filtersData: {}
};

var mainTableReducer = function mainTableReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var nextState;

  if (action.type === mainTableActions.MT_REMOVE_SUBLINE_DATA) {
    var _action$meta = action.meta,
        id = _action$meta.id,
        reducer = _action$meta.reducer;
    nextState = __chunk_10.cloneDeep(state);

    if (nextState[reducer].subLineData[id]) {
      delete nextState[reducer].subLineData[id];
    }
  }

  if (action.type === mainTableActions.MT_GET_SUBLINE_DATA_REQUEST) {
    var _action$meta2 = action.meta,
        _id = _action$meta2.id,
        subLineKey = _action$meta2.subLineKey,
        _reducer = _action$meta2.reducer;
    nextState = __chunk_10.cloneDeep(state);
    nextState[_reducer].subLineData[_id] = {
      isLoading: true,
      items: [],
      key: subLineKey
    };
  }

  if (action.type === mainTableActions.MT_GET_SUBLINE_DATA_FAILURE) {
    var _action$meta3 = action.meta,
        _id2 = _action$meta3.id,
        _reducer2 = _action$meta3.reducer;
    nextState = __chunk_10.cloneDeep(state);
    nextState[_reducer2].subLineData[_id2].isLoading = false;
    nextState[_reducer2].subLineData[_id2].items = [];
  }

  if (action.type === mainTableActions.MT_GET_SUBLINE_DATA_SUCCESS) {
    var _action$meta4 = action.meta,
        _id3 = _action$meta4.id,
        _reducer3 = _action$meta4.reducer,
        _action$payload = action.payload,
        status = _action$payload.status,
        payload = _action$payload.payload;
    nextState = __chunk_10.cloneDeep(state);

    if (status !== 'OK') {
      nextState[_reducer3].subLineData[_id3].isLoading = false;
    } else {
      nextState[_reducer3].subLineData[_id3].isLoading = false;
      nextState[_reducer3].subLineData[_id3].items = __chunk_3._toConsumableArray(payload.items);
    }
  }

  if (action.type === mainTableActions.MT_LIST_REMOVE_ITEM) {
    var _id4 = action.id,
        _reducer4 = action.reducer,
        _action$key = action.key,
        key = _action$key === void 0 ? 'id' : _action$key;
    var items = __chunk_10.cloneDeep(state[_reducer4].items);
    items = items.map(function (partItems) {
      var newPartItems = __chunk_10.cloneDeep(partItems);
      var index = newPartItems.findIndex(function (elem) {
        return elem[key] === _id4;
      });

      if (index >= 0) {
        delete newPartItems[index];
      }

      return newPartItems.filter(function (elem) {
        return Boolean(elem);
      });
    });
    items = items.filter(function (el) {
      return Array.isArray(el) && el.length;
    }).filter(function (el) {
      return Boolean(el);
    });
    nextState = __chunk_10.cloneDeep(state);
    nextState[_reducer4].items = items;
  }

  if (action.type === mainTableActions.MT_LIST_AUTO_UPDATE_ITEM) {
    var item = action.item,
        _id5 = action.item.id,
        _reducer5 = action.reducer;

    var _items = __chunk_10.cloneDeep(state[_reducer5].items);

    _items = _items.map(function (partItems) {
      var newPartItems = __chunk_10.cloneDeep(partItems);
      var index = newPartItems.findIndex(function (elem) {
        return elem.id === _id5;
      });

      if (index >= 0) {
        newPartItems[index] = item;
      }

      return newPartItems;
    });
    nextState = __chunk_10.cloneDeep(state);
    nextState[_reducer5].items = _items;
  }

  if (action.type === mainTableActions.MT_SAVE_TABLE_SCROLL) {
    var _reducer6 = action.reducer,
        scroll = action.scroll;
    var prevState = __chunk_10.cloneDeep(state);
    nextState = _objectSpread({}, prevState, __chunk_5._defineProperty({}, _reducer6, _objectSpread({}, prevState[_reducer6], {
      scroll: scroll
    })));
  }

  if (action.type === mainTableActions.MT_CHANGE_FILTERS_VALUE) {
    var _reducer7 = action.reducer,
        data = action.data;

    var _prevState = __chunk_10.cloneDeep(state);

    var props = _objectSpread({}, _prevState[_reducer7], {
      filtersValue: _objectSpread({}, _prevState[_reducer7].filtersValue, {}, data)
    });

    Object.entries(props.filtersValue).forEach(function (_ref) {
      var _ref2 = __chunk_7._slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      if (value === false || value === undefined) {
        delete props.filtersValue[key];
      }
    });

    if (data.offset === 0) {
      props.items = [];
    }

    nextState = _objectSpread({}, state, __chunk_5._defineProperty({}, action.reducer, props));
  } // filters data request


  if (SUCCESS_FILTERS_DATA_REGEXP.test(action.type)) {
    var _reducer8 = action.type.match(SUCCESS_FILTERS_DATA_REGEXP)[1];

    if (action.payload.status === 'OK') {
      var _items2 = action.payload.payload.items;
      nextState = __chunk_10.cloneDeep(state);
      nextState.filtersData[_reducer8] = _items2;
    }
  }

  if (action.type === mainTableActions.MT_DISABLE_ITEM_SWITCHER) {
    var _data = action.data,
        _reducer9 = action.reducer,
        byIndex = action.byIndex;
    nextState = __chunk_10.cloneDeep(state);

    if (!byIndex) {
      Object.keys(_data).forEach(function (id) {
        var val = _data[id];

        if (!val) {
          var index = nextState[_reducer9].blockedItems.indexOf(id);

          if (index >= 0) {
            delete nextState[_reducer9].blockedItems[index];
          }
        } else {
          var _index = nextState[_reducer9].blockedItems.indexOf(id);

          if (_index < 0) {
            nextState[_reducer9].blockedItems.push(id);
          }
        }
      });
    }

    nextState[_reducer9].blockedItems = nextState[_reducer9].blockedItems.filter(function (elem) {
      return elem;
    });
  } // table request


  if (REQUEST_LIST_REGEXP.test(action.type)) {
    var _reducer10 = action.type.match(REQUEST_LIST_REGEXP)[1];
    nextState = __chunk_10.cloneDeep(state);
    nextState[_reducer10].isLoading = true;
  }

  if (SUCCESS_LIST_REGEXP.test(action.type)) {
    var _reducer11 = action.type.match(SUCCESS_LIST_REGEXP)[1];
    nextState = __chunk_10.cloneDeep(state);
    nextState[_reducer11].isLoading = false;

    if (action.payload.status === 'OK') {
      var _action$payload2 = action.payload,
          _items3 = _action$payload2.payload.items,
          _action$payload2$_met = _action$payload2._meta,
          isLastPage = _action$payload2$_met.is_last_page,
          total = _action$payload2$_met.total;
      nextState[_reducer11].isLastPage = isLastPage;
      nextState[_reducer11].total = total;

      if (_items3.length) {
        nextState[_reducer11].items = [].concat(__chunk_3._toConsumableArray(nextState[_reducer11].items), [_items3]);
      }
    } else {
      nextState[_reducer11].isLastPage = true;
      nextState[_reducer11].items = __chunk_3._toConsumableArray(nextState[_reducer11].items);
    }
  }

  if (FAILURE_LIST_REGEXP.test(action.type)) {
    var _reducer12 = action.type.match(FAILURE_LIST_REGEXP)[1];
    nextState = __chunk_10.cloneDeep(state);
    nextState[_reducer12].isLoading = false;
    nextState[_reducer12].isLastPage = true;
  }

  if (action.type === mainTableActions.MT_LIST_UPDATE_ITEMS) {
    var _items4 = action.items,
        _reducer13 = action.reducer;
    nextState = __chunk_10.cloneDeep(state);
    nextState[_reducer13].items = _items4;
  }

  if (action.type === mainTableActions.MT_UPDATE_VISIBLE_COLUMNS) {
    var _data2 = action.data,
        _reducer14 = action.reducer;
    nextState = __chunk_10.cloneDeep(state);
    nextState[_reducer14].visibleColumns = _data2;
  } // return the original `state` if `nextState` is null or undefined.


  return nextState || state;
};

var mainTableReducer$1 = (function () {
  var tableNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  tableNames.forEach(function (tableName) {
    initialState[tableName] = __chunk_10.cloneDeep(tableExample);
  });
  return mainTableReducer;
});

module.exports = mainTableReducer$1;
