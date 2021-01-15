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

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-c963153b.js');
var __chunk_2 = require('./chunk-6c310e69.js');
var __chunk_3 = require('./chunk-9858265a.js');
var React = require('react');
var React__default = _interopDefault(React);
var __chunk_4 = require('./chunk-d6da9fe7.js');
var crud = require('./crud.js');

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof __chunk_1.commonjsGlobal !== "undefined") {
    win = __chunk_1.commonjsGlobal;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

var window_1 = win;

var navigator$1 = window_1.navigator;

var isIos = (function detect_iOS (userAgent) {
  return /iPad|iPhone|iPod/.test(userAgent)
})(navigator$1 ? navigator$1.userAgent : '');

var getAfterLineObjs = function getAfterLineObjs(afterLineTemplate, afterLineData, partItems) {
  var objs = {};

  if (afterLineTemplate && Object.keys(afterLineData).length) {
    var keys = Object.keys(afterLineData);
    var keyForSearch;

    if (keys.length) {
      keyForSearch = afterLineData[keys[0]].key;
      var itemsFinded = partItems.filter(function (el) {
        return keys.indexOf(el[keyForSearch].toString()) >= 0;
      });

      if (itemsFinded.length) {
        for (var i = 0; i < itemsFinded.length; i += 1) {
          // const { id } = itemsFinded[i];
          var id = itemsFinded[i][keyForSearch];
          objs[id] = afterLineData[id];
        }
      }
    }
  }

  return objs;
};

var TBodyPart =
/*#__PURE__*/
function (_Component) {
  __chunk_3._inherits(TBodyPart, _Component);

  function TBodyPart(_props) {
    var _this;

    __chunk_3._classCallCheck(this, TBodyPart);

    _this = __chunk_3._possibleConstructorReturn(this, __chunk_3._getPrototypeOf(TBodyPart).call(this, _props));

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "generateFromTemplate", function () {
      var items = _this.mainFabric();

      return items;
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "mainFabric", function () {
      var _this$props = _this.props,
          template = _this$props.tableTemplate,
          titleTemplate = _this$props.titleTemplate,
          data = _this$props.partItems,
          visibleColumns = _this$props.visibleColumns,
          afterLineTemplate = _this$props.afterLineTemplate,
          afterLineData = _this$props.afterLineData;
      var afterLineObjs = _this.state.afterLineObjs;
      var items = [];
      var afterLines = [];
      var afterLineIndexes = []; // Generate main template

      var _loop = function _loop(i) {
        var afterLineKeys = Object.keys(afterLineObjs);

        if (afterLineKeys.length) {
          var keyForSearch = afterLineData[afterLineKeys[0]].key;

          if (afterLineKeys.indexOf(data[i][keyForSearch].toString()) >= 0) {
            afterLines[i] = {
              id: data[i][keyForSearch],
              items: []
            };
          }
        }

        var titleIndexes = [];

        if (titleTemplate && Array.isArray(titleTemplate)) {
          titleTemplate.forEach(function (_ref, index) {
            var columns = _ref.columns;
            var mappedColumns = columns.map(function () {
              return index;
            });
            titleIndexes.push.apply(titleIndexes, __chunk_2._toConsumableArray(mappedColumns));
          });
        }

        template.forEach(function (column, index) {
          var tbody = column.tbody;

          if (!visibleColumns || visibleColumns[index]) {
            var item = data[i];

            if (!items[i]) {
              items[i] = [];

              if (item.id) {
                items[i].id = item.id;
              }
            }

            var result;
            var className; // generate cell

            if (typeof tbody.value === 'function') {
              try {
                result = tbody.value(item);
              } catch (e) {
                result = 'n/a';
              }
            } else if (typeof tbody.value === 'string') {
              result = tbody.value;
            } else if (!tbody.value && tbody.key) {
              result = item[tbody.key];
            } // generate className if function


            if (typeof tbody.className === 'function') {
              className = tbody.className(item);
            }

            var props = tbody.props ? __chunk_4.cloneDeep(tbody.props) : {};

            if (titleIndexes.length) {
              props['js-title-index'] = titleIndexes[index];
            }

            if (className) {
              items[i][index] = React__default.createElement("td", __chunk_2._extends({
                className: className
              }, props), result);
            } else {
              items[i][index] = React__default.createElement("td", props, result);
            }
          }
        });
      };

      for (var i = 0; i < data.length; i += 1) {
        _loop(i);
      }

      if (afterLines.length) {
        afterLines.forEach(function (el, afterLineIndex) {
          var afterLineDataPart = afterLineObjs[el.id].items;

          var _loop2 = function _loop2(lineIndex) {
            afterLineTemplate.forEach(function (column, columnIndex) {
              var tbody = column.tbody;

              if (!visibleColumns || visibleColumns[columnIndex]) {
                if (!afterLines[afterLineIndex].items[lineIndex]) {
                  afterLines[afterLineIndex].items[lineIndex] = [];
                }

                var item = afterLineDataPart[lineIndex];
                var result;
                var className; // generate cell

                if (typeof tbody.value === 'function') {
                  try {
                    result = tbody.value(item);
                  } catch (e) {
                    result = 'n/a';
                  }
                } else if (typeof tbody.value === 'string') {
                  result = tbody.value;
                } else if (!tbody.value && tbody.key) {
                  result = item[tbody.key];
                } else {
                  result = false;
                } // generate className if function


                if (typeof tbody.className === 'function') {
                  var keys = {};
                  var tbodyKeys = typeof tbody.key === 'string' ? [tbody.key] : tbody.key;

                  for (var b = 0; b < tbodyKeys.length; b += 1) {
                    keys[tbodyKeys[b]] = item[tbodyKeys[b]];
                  }

                  className = tbody.className(keys);
                }

                if (className) {
                  afterLines[afterLineIndex].items[lineIndex][columnIndex] = React__default.createElement("td", __chunk_2._extends({
                    className: className
                  }, tbody.props), result);
                } else {
                  afterLines[afterLineIndex].items[lineIndex][columnIndex] = React__default.createElement("td", tbody.props, result);
                }
              }
            });
          };

          for (var lineIndex = 0; lineIndex < afterLineDataPart.length; lineIndex += 1) {
            _loop2(lineIndex);
          }

          if (!afterLineDataPart.length) {
            afterLines[afterLineIndex].items.push([React__default.createElement("td", {
              className: "no-border",
              colSpan: visibleColumns.length
            }, React__default.createElement("span", {
              className: "loading"
            }, React__default.createElement("span", null)))]);
          }
        });
        var prevLength = 0;
        afterLines.forEach(function (elem, index) {
          items.splice.apply(items, [index + prevLength + 1, 0].concat(__chunk_2._toConsumableArray(elem.items)));

          for (var i = 0; i < elem.items.length; i++) {
            afterLineIndexes.push(i + index + prevLength + 1);
          }

          prevLength += elem.items.length;
        });
      }

      return {
        items: items,
        afterLineIndexes: afterLineIndexes
      };
    });

    var _this$props2 = _this.props,
        rerenderById = _this$props2.rerenderById,
        partItems = _this$props2.partItems,
        _afterLineTemplate = _this$props2.afterLineTemplate,
        _afterLineData = _this$props2.afterLineData;
    var rerenderByIdState = null;

    if (rerenderById) {
      var itemIsFinded = partItems.find(function (el) {
        return el.id === rerenderById;
      });

      if (itemIsFinded) {
        rerenderByIdState = rerenderById;
      }
    }

    var _afterLineObjs = getAfterLineObjs(_afterLineTemplate, _afterLineData, _props.partItems);

    _this.state = {
      rerenderById: rerenderByIdState,
      afterLineObjs: _afterLineObjs
    };
    return _this;
  }

  __chunk_3._createClass(TBodyPart, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var props = this.props,
          afterLineObjs = this.state.afterLineObjs;
      var partItemsNotEqual = JSON.stringify(props.partItems) !== JSON.stringify(nextProps.partItems);
      var dataForRenderNotEqual = JSON.stringify(props.dataForRender) !== JSON.stringify(nextProps.dataForRender);
      var rerenderByIdNotEqual = Boolean(nextState.rerenderById) && props.rerenderById !== nextProps.rerenderById;
      var visibleColumnsNotEqual = JSON.stringify(props.visibleColumns) !== JSON.stringify(nextProps.visibleColumns);
      var afterLineIdNotEqual = JSON.stringify(nextState.afterLineObjs) !== JSON.stringify(afterLineObjs);
      return partItemsNotEqual || dataForRenderNotEqual || rerenderByIdNotEqual || visibleColumnsNotEqual || afterLineIdNotEqual;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$generateFromTem = this.generateFromTemplate(),
          items = _this$generateFromTem.items,
          afterLineIndexes = _this$generateFromTem.afterLineIndexes;

      return items.map(function (item, index) {
        var className = afterLineIndexes.indexOf(index) >= 0 ? 'mt_subline' : 'mt_line';
        return React__default.createElement("tr", {
          key: index,
          "data-id": item.id ? item.id : index,
          className: className
        }, React__default.createElement("td", {
          className: "padding-table"
        }, "\xA0"), item.map(function (td, tdIndex) {
          return React__default.createElement(React__default.Fragment, {
            key: tdIndex
          }, td);
        }), React__default.createElement("td", {
          className: "padding-table"
        }, "\xA0"));
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.rerenderById && !prevState.rerenderById) {
        var itemIsFinded = nextProps.partItems.find(function (el) {
          return el.id === nextProps.rerenderById;
        });

        if (itemIsFinded) {
          return {
            rerenderById: nextProps.rerenderById
          };
        }
      }

      if (nextProps.afterLineTemplate) {
        var afterLineObjs = getAfterLineObjs(nextProps.afterLineTemplate, nextProps.afterLineData, nextProps.partItems);
        return {
          afterLineObjs: afterLineObjs
        };
      }

      return null;
    }
  }]);

  return TBodyPart;
}(React.Component);

__chunk_1._defineProperty(TBodyPart, "defaultProps", {
  rerenderById: null,
  visibleColumns: null,
  afterLineData: null,
  afterLineTemplate: null
});

__chunk_1._defineProperty(TBodyPart, "propTypes", {
  tableTemplate: __chunk_3.PropTypes.array.isRequired,
  partItems: __chunk_3.PropTypes.array.isRequired,
  dataForRender: __chunk_3.PropTypes.object.isRequired,
  rerenderById: __chunk_3.PropTypes.number,
  visibleColumns: __chunk_3.PropTypes.array,
  afterLineData: __chunk_3.PropTypes.object,
  afterLineTemplate: __chunk_3.PropTypes.array
});

TBodyPart.displayName = "TBodyPart";

var TBody =
/*#__PURE__*/
function (_Component) {
  __chunk_3._inherits(TBody, _Component);

  function TBody() {
    var _getPrototypeOf2;

    var _this;

    __chunk_3._classCallCheck(this, TBody);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __chunk_3._possibleConstructorReturn(this, (_getPrototypeOf2 = __chunk_3._getPrototypeOf(TBody)).call.apply(_getPrototypeOf2, [this].concat(args)));

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "blockedItemsPosition", function () {
      var parent = _this.props.refs.parent.current;
      var tr = document.querySelectorAll('.blocked-item');
      tr.forEach(function (element, index) {
        var elem = tr[index];
        var dataId = elem.getAttribute('item-data-id');
        var item = document.querySelector("tbody tr[data-id=\"".concat(dataId, "\"]"));

        if (!item.length) {
          var top = parent.scrollTop + (Math.abs(__chunk_4.elemOffset(item).top) - __chunk_4.elemOffset(parent).top) + 1;
          var height = item.offsetHeight - 1;
          elem.style.top = "".concat(top, "px");
          elem.style.height = "".concat(height, "px");
          elem.style.lineHeight = "".concat(height, "px");
        }
      });
    });

    return _this;
  }

  __chunk_3._createClass(TBody, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      __chunk_4.addEvent(window, 'resize', this.blockedItemsPosition);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      var itemsNotEqual = JSON.stringify(props.items) !== JSON.stringify(nextProps.items);
      var dataForRenderNotEqual = JSON.stringify(props.dataForRender) !== JSON.stringify(nextProps.dataForRender);
      var rerenderByIdNotEqual = props.rerenderById !== nextProps.rerenderById;
      var visibleColumnsNotEqual = JSON.stringify(props.visibleColumns) !== JSON.stringify(nextProps.visibleColumns);
      var afterLineDataNotEqual = JSON.stringify(props.afterLineData) !== JSON.stringify(nextProps.afterLineData);
      var blockedItemsNotEqual = JSON.stringify(props.blockedItems) !== JSON.stringify(nextProps.blockedItems);
      return itemsNotEqual || dataForRenderNotEqual || rerenderByIdNotEqual || visibleColumnsNotEqual || afterLineDataNotEqual || blockedItemsNotEqual;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.blockedItemsPosition();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      __chunk_4.removeEvent(window, 'resize', this.blockedItemsPosition);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          tableTemplate = _this$props.tableTemplate,
          dataForRender = _this$props.dataForRender,
          rerenderById = _this$props.rerenderById,
          visibleColumns = _this$props.visibleColumns,
          afterLineTemplate = _this$props.afterLineTemplate,
          blockedItems = _this$props.blockedItems,
          afterLineData = _this$props.afterLineData,
          titleTemplate = _this$props.titleTemplate;
      return React__default.createElement(React__default.Fragment, null, items.map(function (partItems, index) {
        return React__default.createElement(TBodyPart, {
          key: index,
          index: index,
          partItems: partItems,
          dataForRender: dataForRender,
          tableTemplate: tableTemplate,
          rerenderById: rerenderById,
          visibleColumns: visibleColumns,
          afterLineTemplate: afterLineTemplate,
          afterLineData: afterLineData,
          titleTemplate: titleTemplate
        });
      }), blockedItems.map(function (id) {
        return React__default.createElement("tr", {
          className: "blocked-item",
          key: id,
          "item-data-id": id
        }, React__default.createElement("td", null, React__default.createElement("span", {
          className: "loading"
        })));
      }));
    }
  }]);

  return TBody;
}(React.Component);

TBody.displayName = "TBody";

var ORDER_BY_DESC = 'DESC';
var ORDER_BY_ASC = 'ASC';

var THead =
/*#__PURE__*/
function (_Component) {
  __chunk_3._inherits(THead, _Component);

  function THead() {
    var _getPrototypeOf2;

    var _this;

    __chunk_3._classCallCheck(this, THead);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __chunk_3._possibleConstructorReturn(this, (_getPrototypeOf2 = __chunk_3._getPrototypeOf(THead)).call.apply(_getPrototypeOf2, [this].concat(args)));

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "changeSortType", function (sortBy, filtersValue) {
      return filtersValue.sort_by !== sortBy ? ORDER_BY_DESC : filtersValue.sort_type === ORDER_BY_DESC ? ORDER_BY_ASC : ORDER_BY_DESC;
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "generateFromTemplate", function () {
      var _this$props = _this.props,
          tableTemplate = _this$props.tableTemplate,
          filtersValue = _this$props.filtersValue,
          reducer = _this$props.reducer,
          getItems = _this$props.getItems,
          items = _this$props.items,
          changeFiltersValue = _this$props.changeFiltersValue,
          softSort = _this$props.softSort,
          sortType = _this$props.sortType,
          sortBy = _this$props.sortBy,
          visibleColumns = _this$props.visibleColumns,
          titleTemplate = _this$props.titleTemplate,
          setItems = _this$props.setItems;
      var headItems = [];
      var titleIndexes = [];

      if (titleTemplate && Array.isArray(titleTemplate)) {
        titleTemplate.forEach(function (_ref, index) {
          var columns = _ref.columns;
          var mappedColumns = columns.map(function () {
            return index;
          });
          titleIndexes.push.apply(titleIndexes, __chunk_2._toConsumableArray(mappedColumns));
        });
      }

      tableTemplate.forEach(function (column, index) {
        if (!visibleColumns || visibleColumns[index]) {
          var _column$thead = column.thead,
              className = _column$thead.className,
              value = _column$thead.value,
              title = _column$thead.title,
              sortKey = _column$thead.sortKey,
              sortLtr = _column$thead.sortLtr,
              thead = column.thead;
          var resultValue = value;

          if (typeof value === 'function') {
            resultValue = value();
          }

          var props = thead.props ? __chunk_4.cloneDeep(thead.props) : {};

          if (titleIndexes.length) {
            props['js-title-index'] = titleIndexes[index];
          }

          var th = React__default.createElement("th", __chunk_2._extends({
            key: index,
            title: title || value,
            className: "".concat(className || '').concat(sortKey ? ' cup' : ''),
            onClick: function onClick() {
              if (!sortKey) return false;

              var newSortType = _this.changeSortType(sortKey, filtersValue);

              if (softSort) {
                changeFiltersValue({
                  sort_type: newSortType,
                  sort_by: sortKey
                }, reducer);
                var newItems = [];
                items.forEach(function (itemsPart) {
                  var _newItems;

                  (_newItems = newItems).push.apply(_newItems, __chunk_2._toConsumableArray(__chunk_4.cloneDeep(itemsPart)));
                });
                newItems = newItems.sort(function (a, b) {
                  var bandA = a[sortKey];
                  var bandB = b[sortKey];
                  var comparison = 0;

                  if (bandA > bandB) {
                    comparison = newSortType === 'DESC' ? -1 : 1;
                  } else if (bandA < bandB) {
                    comparison = newSortType === 'DESC' ? 1 : -1;
                  }

                  return comparison;
                });
                setItems(newItems, reducer);
              } else {
                getItems({
                  sort_type: newSortType,
                  sort_by: sortKey,
                  offset: 0
                }, reducer);
              }
            }
          }, props), sortLtr && sortKey ? React__default.createElement("span", {
            className: "sorting ltr ".concat(sortBy === sortKey ? sortType.toLowerCase() : '')
          }) : false, resultValue, !sortLtr && sortKey ? React__default.createElement("span", {
            className: "sorting fal ".concat(sortBy === sortKey ? sortType.toLowerCase() : '')
          }) : false);
          headItems.push(th);
        }
      });
      return headItems;
    });

    return _this;
  }

  __chunk_3._createClass(THead, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      var itemsNotEqual = JSON.stringify(props.items) !== JSON.stringify(nextProps.items);
      var tableTemplateNotEqual = JSON.stringify(props.tableTemplate) !== JSON.stringify(nextProps.tableTemplate);
      var sortTypeNotEqual = JSON.stringify(props.sortType) !== JSON.stringify(nextProps.sortType);
      var sortByNotEqual = JSON.stringify(props.sortBy) !== JSON.stringify(nextProps.sortBy);
      var visibleColumnsNotEqual = JSON.stringify(props.visibleColumns) !== JSON.stringify(nextProps.visibleColumns);
      var dataForRenderNotEqual = JSON.stringify(props.dataForRender) !== JSON.stringify(nextProps.dataForRender);
      return tableTemplateNotEqual || sortTypeNotEqual || sortByNotEqual || visibleColumnsNotEqual || dataForRenderNotEqual || itemsNotEqual;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          isHidden = _this$props2.isHidden,
          setRef = _this$props2.setRef;
      var data = this.generateFromTemplate();
      return React__default.createElement("thead", {
        ref: setRef,
        className: !isHidden ? 'js' : 'no-js'
      }, React__default.createElement("tr", null, React__default.createElement("th", {
        className: "padding-table"
      }, "\xA0"), data, React__default.createElement("th", {
        className: "padding-table"
      }, "\xA0")));
    }
  }]);

  return THead;
}(React.Component);

__chunk_1._defineProperty(THead, "defaultProps", {
  getItems: function getItems() {
    console.log('not imported function "getItems"');
  },
  reducer: '',
  filtersValue: {},
  sortType: null,
  sortBy: null,
  isHidden: false,
  softSort: false,
  visibleColumns: null
});

__chunk_1._defineProperty(THead, "propTypes", {
  tableTemplate: __chunk_3.PropTypes.array.isRequired,
  reducer: __chunk_3.PropTypes.string,
  getItems: __chunk_3.PropTypes.func,
  filtersValue: __chunk_3.PropTypes.object,
  sortType: __chunk_3.PropTypes.string,
  sortBy: __chunk_3.PropTypes.string,
  isHidden: __chunk_3.PropTypes.bool,
  setRef: __chunk_3.PropTypes.object.isRequired,
  changeFiltersValue: __chunk_3.PropTypes.func.isRequired,
  setItems: __chunk_3.PropTypes.func.isRequired,
  softSort: __chunk_3.PropTypes.bool,
  visibleColumns: __chunk_3.PropTypes.array
});

THead.displayName = "THead";

var TTitle =
/*#__PURE__*/
function (_Component) {
  __chunk_3._inherits(TTitle, _Component);

  function TTitle() {
    var _getPrototypeOf2;

    var _this;

    __chunk_3._classCallCheck(this, TTitle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __chunk_3._possibleConstructorReturn(this, (_getPrototypeOf2 = __chunk_3._getPrototypeOf(TTitle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "generateFromTemplate", function () {
      var _this$props = _this.props,
          titleTemplate = _this$props.titleTemplate,
          visibleColumns = _this$props.visibleColumns;
      var titleItems = [];
      var columnI = 0;
      titleTemplate.forEach(function (column, index) {
        var props = column.props,
            value = column.value;

        var columns = __chunk_2._toConsumableArray(column.columns);

        var visible;

        if (visibleColumns) {
          columns.forEach(function () {
            if (visibleColumns[columnI]) visible = true;
            columnI++;
          });
        }

        if (!visibleColumns || visible) {
          var th = React__default.createElement("th", __chunk_2._extends({
            key: index,
            "js-title-index": index
          }, props), React__default.createElement("span", null, value));
          titleItems.push(th);
        }
      });
      return titleItems;
    });

    return _this;
  }

  __chunk_3._createClass(TTitle, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      var titleTemplateNotEqual = JSON.stringify(props.titleTemplate) !== JSON.stringify(nextProps.titleTemplate);
      var visibleColumnsNotEqual = JSON.stringify(props.visibleColumns) !== JSON.stringify(nextProps.visibleColumns);
      return titleTemplateNotEqual || visibleColumnsNotEqual;
    }
  }, {
    key: "render",
    value: function render() {
      var setRef = this.props.setRef;
      var data = this.generateFromTemplate();
      return React__default.createElement("thead", {
        ref: setRef
      }, React__default.createElement("tr", null, React__default.createElement("th", {
        className: "padding-table"
      }, "\xA0"), data, React__default.createElement("th", {
        className: "padding-table"
      }, "\xA0")));
    }
  }]);

  return TTitle;
}(React.Component);

__chunk_1._defineProperty(TTitle, "defaultProps", {
  visibleColumns: null
});

__chunk_1._defineProperty(TTitle, "propTypes", {
  titleTemplate: __chunk_3.PropTypes.array.isRequired,
  visibleColumns: __chunk_3.PropTypes.array
});

TTitle.displayName = "TTitle";

var TFoot =
/*#__PURE__*/
function (_Component) {
  __chunk_3._inherits(TFoot, _Component);

  function TFoot() {
    var _getPrototypeOf2;

    var _this;

    __chunk_3._classCallCheck(this, TFoot);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __chunk_3._possibleConstructorReturn(this, (_getPrototypeOf2 = __chunk_3._getPrototypeOf(TFoot)).call.apply(_getPrototypeOf2, [this].concat(args)));

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "generateFromTemplate", function () {
      var _this$props = _this.props,
          tableTemplate = _this$props.tableTemplate,
          visibleColumns = _this$props.visibleColumns,
          item = _this$props.tfootItem;
      var footItems = [];
      var tfootItem = item ? item.item : null;
      if (!item) return false;
      tableTemplate.forEach(function (column, index) {
        var tfoot = column.tfoot;

        if (!visibleColumns || visibleColumns[index] === true) {
          var result;
          var className;

          if (tfoot) {
            // generate cell
            if (typeof tfoot.value === 'function') {
              try {
                result = tfoot.value(tfootItem);
              } catch (e) {
                result = 'n/a';
              }
            } else if (typeof tfoot.value === 'string') {
              result = tfoot.value;
            } else if (!tfoot.value && tfoot.key) {
              result = tfootItem[tfoot.key];
            } // generate className if function


            if (typeof tfoot.className === 'function') {
              className = tfoot.className(tfootItem);
            }

            if (className) {
              footItems[index] = React__default.createElement("td", __chunk_2._extends({
                key: index,
                className: className
              }, tfoot.props), result);
            } else {
              footItems[index] = React__default.createElement("td", __chunk_2._extends({
                key: index
              }, tfoot.props), result);
            }
          } else {
            footItems[index] = React__default.createElement("td", {
              key: index
            });
          }
        }
      });
      return footItems;
    });

    return _this;
  }

  __chunk_3._createClass(TFoot, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      var tableTemplateNotEqual = JSON.stringify(props.tableTemplate) !== JSON.stringify(nextProps.tableTemplate);
      var visibleColumnsNotEqual = JSON.stringify(props.visibleColumns) !== JSON.stringify(nextProps.visibleColumns);
      var dataForRenderNotEqual = JSON.stringify(props.dataForRender) !== JSON.stringify(nextProps.dataForRender);
      var tfootItemNotEqual = JSON.stringify(props.tfootItem) !== JSON.stringify(nextProps.tfootItem);
      var itemsNotEqual = JSON.stringify(props.items) !== JSON.stringify(nextProps.items);
      var tfootDataForRenderNotEqual = JSON.stringify(props.tfootDataForRender) !== JSON.stringify(nextProps.tfootDataForRender);
      return tableTemplateNotEqual || visibleColumnsNotEqual || dataForRenderNotEqual || tfootItemNotEqual || itemsNotEqual || tfootDataForRenderNotEqual;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          setRef = _this$props2.setRef,
          tfootItem = _this$props2.tfootItem,
          isHidden = _this$props2.isHidden;
      var item = tfootItem ? tfootItem.item : null;
      var isLoading = tfootItem ? tfootItem.isLoading : null;
      var data = this.generateFromTemplate();
      return React__default.createElement("tfoot", {
        ref: setRef,
        className: !isHidden ? 'js' : 'no-js'
      }, !isHidden ? this.props.tfootOtherTemplate : false, React__default.createElement("tr", {
        className: "tfoot-data",
        id: !isHidden ? 'tfoot-data' : ''
      }, React__default.createElement("td", {
        className: "padding-table"
      }, "\xA0"), data, React__default.createElement("td", {
        className: "padding-table"
      }, "\xA0")), item && isLoading && !Object.keys(item).length && !isHidden ? React__default.createElement("tr", {
        className: "tfoot-loading no-border"
      }, React__default.createElement("td", null, React__default.createElement("span", {
        className: "loading"
      }, React__default.createElement("span", null)))) : false);
    }
  }]);

  return TFoot;
}(React.Component);

__chunk_1._defineProperty(TFoot, "defaultProps", {
  visibleColumns: null,
  tfootItem: null,
  dataForRender: {},
  items: [],
  tfootDataForRender: null
});

__chunk_1._defineProperty(TFoot, "propTypes", {
  tableTemplate: __chunk_3.PropTypes.array.isRequired,
  setRef: __chunk_3.PropTypes.object.isRequired,
  dataForRender: __chunk_3.PropTypes.object,
  visibleColumns: __chunk_3.PropTypes.array,
  tfootItem: __chunk_3.PropTypes.object,
  items: __chunk_3.PropTypes.array,
  tfootDataForRender: __chunk_3.PropTypes.object
});

TFoot.displayName = "TFoot";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { __chunk_1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var mobileAndTabletcheck = function mobileAndTabletcheck() {
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
};

var isMobileOrTablet = mobileAndTabletcheck();

var MainTableComponent =
/*#__PURE__*/
function (_Component) {
  __chunk_3._inherits(MainTableComponent, _Component);

  function MainTableComponent(props) {
    var _this;

    __chunk_3._classCallCheck(this, MainTableComponent);

    _this = __chunk_3._possibleConstructorReturn(this, __chunk_3._getPrototypeOf(MainTableComponent).call(this, props));

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "scrollHeads", function () {
      var _this$table = _this.table,
          parent = _this$table.parent.current,
          theadVisible = _this$table.theadVisible.current,
          tfoot = _this$table.tfoot.current,
          ttitle = _this$table.ttitle.current;
      var _this$props = _this.props,
          id = _this$props.id,
          tfootItem = _this$props.tfootItem,
          leftMenuWidth = _this$props.leftMenuWidth,
          titleTemplate = _this$props.titleTemplate,
          tfootOtherTemplate = _this$props.tfootOtherTemplate,
          offsetHeight = _this$props.offsetHeight,
          fixedFooter = _this$props.fixedFooter;

      if (parent) {
        var left = leftMenuWidth - parent.scrollLeft;

        if (!isIos && !mobileAndTabletcheck()) {
          left -= document.body.scrollLeft || document.documentElement.scrollLeft;
        }

        theadVisible.style.left = "".concat(left, "px");

        if (tfootItem || tfootOtherTemplate) {
          tfoot.style.left = "".concat(left, "px");
          tfoot.style.width = "".concat(parent.clientWidth + parent.scrollLeft, "px");
        }

        if (titleTemplate) {
          ttitle.style.left = "".concat(left, "px");
          ttitle.style.width = "".concat(parent.clientWidth + parent.scrollLeft, "px");
        }
      }

      var pageContent = document.getElementsByClassName('page__content');

      if (pageContent.length) {
        var _this$table2 = _this.table,
            _theadVisible = _this$table2.theadVisible.current,
            _ttitle = _this$table2.ttitle.current;
        var tableFilter = document.getElementsByClassName('table__filters')[0];
        var switchPages = document.getElementsByClassName('switch__pages')[0]; // get top table offset

        var tableFilterHeight = tableFilter ? tableFilter.offsetHeight : 0;
        var switchPagesHeight = switchPages ? switchPages.offsetHeight : 0;
        var titleHeight = _ttitle ? _ttitle.offsetHeight : 0;

        if (switchPagesHeight && !tableFilterHeight) {
          switchPagesHeight += 20;
        }

        var offsetTopThead = 61 + tableFilterHeight + switchPagesHeight;

        var topOffset = _theadVisible.getAttribute('js-data-top');

        if (!topOffset) {
          var styles = window.getComputedStyle(_theadVisible);
          topOffset = +styles.top.split('px')[0];

          _theadVisible.setAttribute('js-data-top', topOffset);
        }

        _this.addNewStyle(".page__content #".concat(id, " .table__thead thead { top: ").concat(offsetTopThead + titleHeight + offsetHeight - pageContent[0].scrollTop, "px !important }")); // theadVisible.style.top = `${topOffset - pageContent[0].scrollTop}px !important`;


        if (tfoot && fixedFooter) {
          var offsetTopTable = 32 + tableFilterHeight + switchPagesHeight;
          tfoot.style.top = "".concat(offsetTopTable + titleHeight + offsetHeight + parent.offsetHeight - pageContent[0].scrollTop - (parent.offsetHeight - parent.clientHeight), "px");
          tfoot.style.bottom = 'initial';
        }
      }
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "addNewStyle", function (newStyle) {
      var id = _this.props.id;
      var styleElement = document.getElementById("".concat(id, "_js"));

      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = "".concat(id, "_js");
        document.getElementsByTagName('body')[0].appendChild(styleElement);
      }

      styleElement.innerHTML = newStyle;
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "resizeTableColumns", function () {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          reducer = _this$props2.reducer,
          tfootItem = _this$props2.tfootItem,
          tfootOtherTemplate = _this$props2.tfootOtherTemplate,
          titleTemplate = _this$props2.titleTemplate,
          disableLazyLoad = _this$props2.disableLazyLoad,
          offsetHeight = _this$props2.offsetHeight,
          fixedFooter = _this$props2.fixedFooter;
      var _data$reducer = data[reducer],
          items = _data$reducer.items,
          isLoading = _data$reducer.isLoading,
          isLastPage = _data$reducer.isLastPage;
      var _this$table3 = _this.table,
          parent = _this$table3.parent.current,
          tbody = _this$table3.tbody.current,
          theadHidden = _this$table3.theadHidden.current,
          theadVisible = _this$table3.theadVisible.current,
          tfoot = _this$table3.tfoot.current,
          ttitle = _this$table3.ttitle.current;
      var tableFilter = document.getElementsByClassName('table__filters')[0];
      var switchPages = document.getElementsByClassName('switch__pages')[0]; // get top table offset

      var tableFilterHeight = tableFilter ? tableFilter.offsetHeight : 0;
      var switchPagesHeight = switchPages ? switchPages.offsetHeight : 0;
      var titleHeight = ttitle ? ttitle.offsetHeight : 0;

      if (switchPagesHeight && !tableFilterHeight) {
        switchPagesHeight += 20;
      }

      var offsetTopTable = 32 + tableFilterHeight + switchPagesHeight;
      var offsetTopThead = 61 + tableFilterHeight + switchPagesHeight; // const offsetTopTitle = titleHeight;

      parent.style.top = "".concat(offsetTopTable + titleHeight + offsetHeight, "px");
      theadVisible.style.top = "".concat(offsetTopThead + titleHeight + offsetHeight, "px");

      if (ttitle) {
        ttitle.style.top = "".concat(offsetTopThead, "px");
      }

      if (!isLoading && items.length || isLoading && isLastPage === null || !isLoading && (isLastPage === null || isLastPage === undefined) || !isLoading && !items.length && isLastPage) {
        theadVisible.style.width = "".concat(tbody.offsetWidth, "px");

        if (titleTemplate) {
          var html = document.getElementsByTagName('html')[0];
          ttitle.style.width = "".concat(parent.clientWidth + parent.scrollLeft + html.scrollLeft, "px"); // tfoot.style.bottom = `${parent.offsetHeight - parent.clientHeight}px`;
        }

        if (tfootItem || tfootOtherTemplate) {
          var pageContent = document.getElementsByClassName('page__content');
          var _html = document.getElementsByTagName('html')[0];
          tfoot.style.width = "".concat(parent.clientWidth + parent.scrollLeft + _html.scrollLeft, "px");

          if (fixedFooter) {
            tfoot.style.top = "".concat(offsetTopTable + titleHeight + offsetHeight + parent.offsetHeight - pageContent[0].scrollTop - (parent.offsetHeight - parent.clientHeight), "px");
            tfoot.style.bottom = 'initial';
          } else {
            tfoot.style.bottom = "".concat(parent.offsetHeight - parent.clientHeight, "px");
          }
        }

        var targetLine;
        var targetItem;

        if (items.length) {
          targetItem = 'td';
          targetLine = tbody.getElementsByTagName('tr');
        } else {
          targetItem = 'th';
          targetLine = theadHidden.getElementsByTagName('tr');
        }

        var targetItems = targetLine[0].getElementsByTagName(targetItem);
        var setHeightItems = theadVisible.getElementsByTagName('th');

        for (var i = 0; i < targetItems.length; i += 1) {
          var width = Math.floor(targetItems[i].offsetWidth);
          setHeightItems[i].style.width = "".concat(width, "px");
        }

        if (tfootItem && !tfoot.getElementsByClassName('no-border').length) {
          var footItems = tfoot.getElementsByTagName('td');

          for (var _i = 0; _i < targetItems.length; _i += 1) {
            var _width = Math.floor(targetItems[_i].offsetWidth);

            footItems[_i].style.width = "".concat(_width, "px");
          }
        }

        if (titleTemplate) {
          var widths = {};
          Array.prototype.forEach.call(targetItems, function (el) {
            var index = el.getAttribute('js-title-index');

            if (index) {
              if (!widths[index]) {
                widths[index] = 0;
              }

              widths[index] += +Math.floor(el.offsetWidth);
            }
          });
          Array.prototype.forEach.call(ttitle.getElementsByTagName('th'), function (el, i) {
            var index = el.getAttribute('js-title-index');
            var width = 0;

            if (!index) {
              if (i === 0) {
                width = +Math.floor(targetItems[i].offsetWidth);
              } else {
                width = +Math.floor(targetItems[targetItems.length - 1].offsetWidth);
              }
            } else {
              width = widths[index];
            }

            el.style.width = "".concat(width, "px");
          });
        }
      }

      _this.scrollHeads();
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "lazyLoad", function () {
      var _this$props3 = _this.props,
          data = _this$props3.data,
          reducer = _this$props3.reducer,
          disableLazyLoad = _this$props3.disableLazyLoad;
      if (disableLazyLoad) return false;
      var _data$reducer2 = data[reducer],
          isLastPage = _data$reducer2.isLastPage,
          isLoading = _data$reducer2.isLoading;
      if (isLastPage || isLoading) return false;
      var parent = _this.table.parent.current;
      var tbody = _this.table.tbody.current;
      var maxScrollTop = tbody.offsetHeight - parent.offsetHeight;
      var currentScrollTop = Math.abs(__chunk_4.elemOffset(tbody).top - __chunk_4.elemOffset(parent).top);
      var documentHalfHeight = document.getElementsByTagName('html')[0].offsetHeight / 2;

      if (maxScrollTop - documentHalfHeight < currentScrollTop) {
        _this.getItems();
      }
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "getItems", function (params) {
      var _this$props4 = _this.props,
          listGet = _this$props4.listGet,
          changeFiltersValue = _this$props4.changeFiltersValue,
          reducer = _this$props4.reducer,
          url = _this$props4.url,
          data = _this$props4.data,
          reloadItemsOnRequest = _this$props4.reloadItemsOnRequest,
          disableFilters = _this$props4.disableFilters,
          requiredFilters = _this$props4.requiredFilters;
      var _data$reducer3 = data[reducer],
          _data$reducer3$filter = _data$reducer3.filtersValue,
          offset = _data$reducer3$filter.offset,
          limit = _data$reducer3$filter.limit,
          filtersValue = _data$reducer3.filtersValue;
      changeFiltersValue(params || {
        offset: offset + limit
      }, reducer);
      var canDoRequest = true;

      var newFilters = _objectSpread({}, __chunk_4.cloneDeep(filtersValue), {}, __chunk_4.cloneDeep(params || {}));

      _this.props.requiredFilterValues.forEach(function (el) {
        if (!newFilters[el]) {
          canDoRequest = false;
        }
      });

      if (!_this.state.canDoRequest || !canDoRequest) return false;
      listGet(reducer, url, reloadItemsOnRequest, disableFilters, requiredFilters);
    });

    _this.state = {
      colsCount: props.tableTemplate.length + 2,
      canDoRequest: !props.requiredFilterValues.length
    };
    _this.table = {
      parent: React__default.createRef(),
      ttitle: React__default.createRef(),
      theadVisible: React__default.createRef(),
      theadHidden: React__default.createRef(),
      tbody: React__default.createRef(),
      tfoot: React__default.createRef(),
      tfootHidden: React__default.createRef()
    };
    return _this;
  }

  __chunk_3._createClass(MainTableComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var onInit = this.props.onInit;

      if (typeof onInit === 'function') {
        onInit(this.getItems);
      }

      var parent = this.table.parent.current;
      var _this$props5 = this.props,
          reducer = _this$props5.reducer,
          listGet = _this$props5.listGet,
          url = _this$props5.url,
          data = _this$props5.data,
          action = _this$props5.history.action,
          initFiltersValue = _this$props5.initFiltersValue,
          changeFiltersValue = _this$props5.changeFiltersValue,
          refreshTableOnPush = _this$props5.refreshTableOnPush,
          reloadItemsOnRequest = _this$props5.reloadItemsOnRequest,
          disableFilters = _this$props5.disableFilters,
          requiredFilters = _this$props5.requiredFilters; // init filtersValue for first request

      if (initFiltersValue) {
        if (!Object.keys(data[reducer].filtersValue).length || refreshTableOnPush && action === 'PUSH') {
          changeFiltersValue(initFiltersValue, reducer);
        }
      } // init get items for table


      if (refreshTableOnPush && action === 'PUSH' || !data[reducer].items.length && data[reducer].isLastPage === null) {
        if (this.state.canDoRequest && url) {
          listGet(reducer, url, reloadItemsOnRequest, disableFilters, requiredFilters);
        }
      }

      var pageContent = document.getElementsByClassName('page__content');
      __chunk_4.addEvent(window, 'resize', this.resizeTableColumns);
      __chunk_4.addEvent(parent, 'scroll', this.scrollHeads);
      __chunk_4.addEvent(window, 'scroll', this.scrollHeads);
      __chunk_4.addEvent(document.body, 'scroll', this.scrollHeads);

      if (pageContent.length) {
        __chunk_4.addEvent(pageContent[0], 'scroll', this.scrollHeads);
      }

      this.resizeTableColumns();
      var _data$reducer4 = data[reducer],
          items = _data$reducer4.items,
          scroll = _data$reducer4.scroll;

      if (scroll) {
        var scrollLeft = scroll.scrollLeft,
            scrollTop = scroll.scrollTop;

        if (items.length && (scrollTop || scrollLeft)) {
          this.table.parent.current.scrollTo(scrollLeft, scrollTop);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var resizeEvent = new Event('resize');
      window.dispatchEvent(resizeEvent);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$table$parent = this.table.parent,
          parent = _this$table$parent.current,
          _this$table$parent$cu = _this$table$parent.current,
          scrollTop = _this$table$parent$cu.scrollTop,
          scrollLeft = _this$table$parent$cu.scrollLeft;
      var _this$props6 = this.props,
          saveTableScroll = _this$props6.saveTableScroll,
          reducer = _this$props6.reducer;
      var html = document.getElementsByTagName('html')[0];
      var pageContent = document.getElementsByClassName('page__content');
      saveTableScroll({
        scrollTop: scrollTop,
        scrollLeft: scrollLeft
      }, reducer);
      __chunk_4.removeEvent(window, 'resize', this.resizeTableColumns);
      __chunk_4.removeEvent(parent, 'scroll', this.scrollHeads);
      __chunk_4.removeEvent(html, 'scroll', this.scrollHeads);
      __chunk_4.removeEvent(document.body, 'scroll', this.scrollHeads);

      if (pageContent.length) {
        __chunk_4.removeEvent(pageContent[0], 'scroll', this.scrollHeads);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          id = _this$props7.id,
          className = _this$props7.className,
          data = _this$props7.data,
          tableTemplate = _this$props7.tableTemplate,
          reducer = _this$props7.reducer,
          changeFiltersValue = _this$props7.changeFiltersValue,
          dataForRender = _this$props7.dataForRender,
          rerenderById = _this$props7.rerenderById,
          afterLineTemplate = _this$props7.afterLineTemplate,
          tfootItem = _this$props7.tfootItem,
          tfootOtherTemplate = _this$props7.tfootOtherTemplate,
          titleTemplate = _this$props7.titleTemplate,
          visibleColumnsMiddleware = _this$props7.visibleColumnsMiddleware,
          requiredFilterValuesMessage = _this$props7.requiredFilterValuesMessage,
          noDataContent = _this$props7.noDataContent,
          setItems = _this$props7.setItems,
          softSort = _this$props7.softSort;
      var _data$reducer5 = data[reducer],
          isLoading = _data$reducer5.isLoading,
          isLastPage = _data$reducer5.isLastPage,
          items = _data$reducer5.items,
          filtersValue = _data$reducer5.filtersValue,
          originalVisibleColumns = _data$reducer5.visibleColumns,
          blockedItems = _data$reducer5.blockedItems,
          afterLineData = _data$reducer5.subLineData;
      var _this$state = this.state,
          colsCount = _this$state.colsCount,
          canDoRequest = _this$state.canDoRequest;
      var visibleColumns = visibleColumnsMiddleware(originalVisibleColumns);
      var isNoData = !items.length && isLastPage && !isLoading && canDoRequest;
      return React__default.createElement("div", {
        id: id,
        ref: this.table.parent,
        className: "table-list__parent ".concat(className).concat(isNoData ? ' table__no-data' : ''),
        onWheel: this.lazyLoad,
        onTouchMove: this.lazyLoad
      }, titleTemplate ? React__default.createElement("table", {
        className: "table__title table-list"
      }, React__default.createElement(TTitle, {
        setRef: this.table.ttitle,
        titleTemplate: titleTemplate,
        visibleColumns: visibleColumns
      })) : false, React__default.createElement("table", {
        className: "table__thead table-list"
      }, React__default.createElement(THead, {
        setRef: this.table.theadVisible,
        tableTemplate: tableTemplate,
        changeFiltersValue: changeFiltersValue,
        filtersValue: filtersValue,
        isLastPage: isLastPage,
        getItems: this.getItems,
        reducer: reducer,
        softSort: softSort,
        setItems: setItems,
        sortType: filtersValue.sort_type,
        sortBy: filtersValue.sort_by,
        visibleColumns: visibleColumns,
        dataForRender: __chunk_4.cloneDeep(dataForRender),
        items: __chunk_4.cloneDeep(items)
      })), React__default.createElement("table", {
        className: "table__tbody table-list"
      }, React__default.createElement(THead, {
        setRef: this.table.theadHidden,
        changeFiltersValue: changeFiltersValue,
        tableTemplate: tableTemplate,
        titleTemplate: titleTemplate,
        filtersValue: filtersValue,
        isLastPage: isLastPage,
        getItems: this.getItems,
        reducer: reducer,
        softSort: softSort,
        setItems: setItems,
        isHidden: true,
        sortType: filtersValue.sort_type,
        sortBy: filtersValue.sort_by,
        visibleColumns: visibleColumns,
        dataForRender: __chunk_4.cloneDeep(dataForRender),
        items: __chunk_4.cloneDeep(items)
      }), React__default.createElement("tbody", {
        ref: this.table.tbody
      }, !canDoRequest ? React__default.createElement("tr", {
        className: "no-border"
      }, React__default.createElement("td", {
        colSpan: colsCount
      }, React__default.createElement("span", {
        className: "no-data"
      }, requiredFilterValuesMessage))) : React__default.createElement(TBody, {
        items: __chunk_4.cloneDeep(items),
        tableTemplate: tableTemplate,
        titleTemplate: titleTemplate,
        rerenderById: rerenderById,
        dataForRender: __chunk_4.cloneDeep(dataForRender),
        visibleColumns: visibleColumns,
        afterLineTemplate: afterLineTemplate,
        afterLineData: afterLineData,
        blockedItems: blockedItems,
        refs: this.table
      }), isNoData ? React__default.createElement("tr", {
        className: "no-border"
      }, React__default.createElement("td", {
        colSpan: colsCount
      }, React__default.createElement("span", {
        className: "no-data"
      }, noDataContent))) : false, isLoading ? React__default.createElement("tr", {
        className: "no-border"
      }, React__default.createElement("td", {
        colSpan: colsCount
      }, React__default.createElement("span", {
        className: "loading"
      }, React__default.createElement("span", null)))) : false), tfootItem ? React__default.createElement(TFoot, {
        tableTemplate: tableTemplate,
        dataForRender: __chunk_4.cloneDeep(dataForRender),
        tfootItem: tfootItem,
        isHidden: true,
        setRef: this.table.tfootHidden,
        visibleColumns: visibleColumns
      }) : false), tfootItem || tfootOtherTemplate ? React__default.createElement("table", {
        className: "table__thead table-list"
      }, React__default.createElement(TFoot, {
        tableTemplate: tableTemplate,
        dataForRender: __chunk_4.cloneDeep(dataForRender),
        tfootItem: tfootItem,
        items: __chunk_4.cloneDeep(items),
        tfootDataForRender: this.props.tfootDataForRender,
        tfootOtherTemplate: this.props.tfootOtherTemplate,
        setRef: this.table.tfoot,
        visibleColumns: visibleColumns
      })) : false);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (!props.url) return {};

      if (props.requiredFilterValues.length && !state.canDoRequest) {
        var canDoRequest = true;
        var reducer = props.reducer,
            data = props.data,
            listGet = props.listGet,
            url = props.url,
            reloadItemsOnRequest = props.reloadItemsOnRequest,
            disableFilters = props.disableFilters,
            requiredFilters = props.requiredFilters;
        var filtersValue = data[reducer].filtersValue;
        props.requiredFilterValues.forEach(function (el) {
          if (!filtersValue[el]) {
            canDoRequest = false;
          }
        });

        if (canDoRequest) {
          listGet(reducer, url, reloadItemsOnRequest, disableFilters, requiredFilters);
        }

        return {
          canDoRequest: canDoRequest
        };
      } else if (props.requiredFilterValues.length) {
        var _canDoRequest = true;
        var _reducer = props.reducer,
            _data = props.data;
        var _filtersValue = _data[_reducer].filtersValue;
        props.requiredFilterValues.forEach(function (el) {
          if (!_filtersValue[el]) {
            _canDoRequest = false;
          }
        });

        if (!_canDoRequest) {
          return {
            canDoRequest: _canDoRequest
          };
        }
      }

      return {};
    }
  }]);

  return MainTableComponent;
}(React.Component);

__chunk_1._defineProperty(MainTableComponent, "defaultProps", {
  url: null,
  reducer: '',
  className: '',
  dataForRender: {},
  rerenderById: null,
  initFiltersValue: null,
  refreshTableOnPush: false,
  onInit: null,
  afterLineTemplate: null,
  tfootItem: null,
  tfootDataForRender: null,
  reloadItemsOnRequest: false,
  disableFilters: false,
  leftMenuWidth: 200,
  offsetHeight: 0,
  titleTemplate: null,
  disableLazyLoad: false,
  requiredFilters: [],
  softSort: false,
  requiredFilterValues: [],
  visibleColumnsMiddleware: function visibleColumnsMiddleware(visibleColumns) {
    return visibleColumns;
  },
  requiredFilterValuesMessage: 'Empty required filters',
  noDataContent: 'No data'
});

__chunk_1._defineProperty(MainTableComponent, "propTypes", {
  url: __chunk_3.PropTypes.string,
  id: __chunk_3.PropTypes.string.isRequired,
  tableTemplate: __chunk_3.PropTypes.array.isRequired,
  titleTemplate: __chunk_3.PropTypes.array,
  reducer: __chunk_3.PropTypes.string,
  data: __chunk_3.PropTypes.object.isRequired,
  className: __chunk_3.PropTypes.string,
  dataForRender: __chunk_3.PropTypes.object,
  rerenderById: __chunk_3.PropTypes.number,
  offsetHeight: __chunk_3.PropTypes.number,
  initFiltersValue: __chunk_3.PropTypes.object,
  refreshTableOnPush: __chunk_3.PropTypes.bool,
  listGet: __chunk_3.PropTypes.func.isRequired,
  reloadItemsOnRequest: __chunk_3.PropTypes.bool,
  saveTableScroll: __chunk_3.PropTypes.func.isRequired,
  changeFiltersValue: __chunk_3.PropTypes.func.isRequired,
  history: __chunk_3.PropTypes.object.isRequired,
  onInit: __chunk_3.PropTypes.func,
  softSort: __chunk_3.PropTypes.bool,
  setItems: __chunk_3.PropTypes.func.isRequired,
  afterLineTemplate: __chunk_3.PropTypes.array,
  tfootItem: __chunk_3.PropTypes.object,
  tfootDataForRender: __chunk_3.PropTypes.object,
  leftMenuWidth: __chunk_3.PropTypes.number,
  disableFilters: __chunk_3.PropTypes.bool,
  requiredFilters: __chunk_3.PropTypes.array,
  visibleColumnsMiddleware: __chunk_3.PropTypes.func,
  requiredFilterValues: __chunk_3.PropTypes.array,
  disableLazyLoad: __chunk_3.PropTypes.bool,
  requiredFilterValuesMessage: __chunk_3.PropTypes.string,
  noDataContent: __chunk_3.PropTypes.oneOfType([__chunk_3.PropTypes.string, __chunk_3.PropTypes.object])
});

MainTableComponent.displayName = "MainTableComponent";

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { __chunk_1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var REQUEST_REGEXP = /^MT_LIST@(.+)_REQUEST$/;
var RSAA = '@@redux-api-middleware/RSAA';
var mainTableBeforeMiddleware = (function (store) {
  return function (next) {
    return function (action) {
      if (action[RSAA]) {
        var newAction = _objectSpread$1({}, action);

        var type = __chunk_1._typeof(action[RSAA].types[0]) === 'object' ? action[RSAA].types[0].type : action[RSAA].types[0];

        if (REQUEST_REGEXP.test(type)) {
          var reducer = type.match(REQUEST_REGEXP)[1];

          var _store$getState = store.getState(),
              _store$getState$mainT = _store$getState.mainTable[reducer],
              isLoading = _store$getState$mainT.isLoading,
              filtersValue = _store$getState$mainT.filtersValue;

          if (isLoading) {
            return false;
          }

          if (filtersValue && Object.keys(filtersValue).length) {
            var compactedQuery = __chunk_4.cloneDeep(filtersValue);
            Object.entries(compactedQuery).forEach(function (_ref) {
              var _ref2 = __chunk_4._slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              var arr = Array.isArray(value) ? value : [value];
              compactedQuery[key] = __chunk_4.compact(arr);
            });
            var _newAction$RSAA$types = newAction[RSAA].types[0].meta,
                disableFilters = _newAction$RSAA$types.disableFilters,
                requiredFilters = _newAction$RSAA$types.requiredFilters;

            if (disableFilters && requiredFilters && requiredFilters.length) {
              Object.keys(compactedQuery).forEach(function (key) {
                if (requiredFilters.indexOf(key) < 0) {
                  delete compactedQuery[key];
                }
              });
            }

            var queryString = __chunk_4.queryBuilder.stringify(compactedQuery);

            if (queryString.length) {
              newAction[RSAA].endpoint = "".concat(newAction[RSAA].endpoint, "?").concat(queryString);
            }
          }

          return next(newAction);
        }

        return next(newAction);
      }

      return next(action);
    };
  };
});

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(source, true).forEach(function (key) { __chunk_1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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

var MT_GET_SUBLINE_DATA_REQUEST = 'MT_GET_SUBLINE_DATA_REQUEST';
var MT_GET_SUBLINE_DATA_SUCCESS = 'MT_GET_SUBLINE_DATA_SUCCESS';
var MT_GET_SUBLINE_DATA_FAILURE = 'MT_GET_SUBLINE_DATA_FAILURE';
var MTgetSubLineData = function MTgetSubLineData(_ref) {
  var id = _ref.id,
      _ref$subLineKey = _ref.subLineKey,
      subLineKey = _ref$subLineKey === void 0 ? 'id' : _ref$subLineKey,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? {} : _ref$query,
      url = _ref.url,
      reducer = _ref.reducer;
  return crud.crud({
    endpoint: url,
    query: _objectSpread$2({}, query, __chunk_1._defineProperty({}, subLineKey, id)),
    crudTypes: {
      request: MT_GET_SUBLINE_DATA_REQUEST,
      success: MT_GET_SUBLINE_DATA_SUCCESS,
      failure: MT_GET_SUBLINE_DATA_FAILURE
    },
    meta: {
      reducer: reducer,
      subLineKey: subLineKey,
      id: id
    }
  });
};
var MT_REMOVE_SUBLINE_DATA = 'MT_REMOVE_SUBLINE_DATA';
var MTremoveSubLineData = function MTremoveSubLineData(_ref2) {
  var id = _ref2.id,
      reducer = _ref2.reducer;
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

var MTautoUpdateItemAction = function MTautoUpdateItemAction(item, reducer, key) {
  return {
    type: MT_LIST_AUTO_UPDATE_ITEM,
    item: item,
    reducer: reducer,
    key: key
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

var MT_SET_ITEMS = 'MT_SET_ITEMS';
var MTsetItems = function MTsetItems(items, reducer) {
  return {
    type: MT_SET_ITEMS,
    items: items,
    reducer: reducer
  };
};

var filtersDataGetAction = function filtersDataGetAction(reducer, endpoint, query, modifyResponse) {
  return crud.crud({
    endpoint: endpoint,
    query: query,
    meta: {
      modifyResponse: modifyResponse
    },
    crudTypes: {
      request: "MT_FILTERS_DATA@".concat(reducer, "_REQUEST"),
      success: "MT_FILTERS_DATA@".concat(reducer, "_SUCCESS"),
      failure: "MT_FILTERS_DATA@".concat(reducer, "_FAILURE")
    }
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

var listGetAction = function listGetAction(reducer, endpoint, reloadItemsOnRequest, disableFilters, requiredFilters) {
  return crud.crud({
    endpoint: endpoint,
    crudTypes: {
      request: "MT_LIST@".concat(reducer, "_REQUEST"),
      success: "MT_LIST@".concat(reducer, "_SUCCESS"),
      failure: "MT_LIST@".concat(reducer, "_FAILURE")
    },
    meta: {
      reloadItemsOnRequest: reloadItemsOnRequest,
      mainTableRequest: true,
      disableFilters: disableFilters,
      requiredFilters: requiredFilters
    }
  });
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
var MTfiltersDataGet = function MTfiltersDataGet(reducer, url, params, modifyResponse) {
  return function (dispatch) {
    return dispatch(filtersDataGetAction(reducer, url, params, modifyResponse));
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
var MTautoUpdateItem = function MTautoUpdateItem(item, reducer, key) {
  return function (dispatch) {
    return dispatch(MTautoUpdateItemAction(item, reducer, key));
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
var MTlistGet = function MTlistGet(reducer, url, reloadItemsOnRequest, disableFilters, requiredFilters) {
  return function (dispatch) {
    return dispatch(listGetAction(reducer, url, reloadItemsOnRequest, disableFilters, requiredFilters));
  };
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(source, true).forEach(function (key) { __chunk_1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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

  if (action.type === MT_REMOVE_SUBLINE_DATA) {
    var id = action.id,
        reducer = action.reducer;
    nextState = __chunk_4.cloneDeep(state);

    if (nextState[reducer].subLineData[id]) {
      delete nextState[reducer].subLineData[id];
    }
  }

  if (action.type === MT_GET_SUBLINE_DATA_REQUEST) {
    var _action$meta = action.meta,
        _id = _action$meta.id,
        subLineKey = _action$meta.subLineKey,
        _reducer = _action$meta.reducer;
    nextState = __chunk_4.cloneDeep(state);
    nextState[_reducer].subLineData[_id] = {
      isLoading: true,
      items: [],
      key: subLineKey
    };
  }

  if (action.type === MT_GET_SUBLINE_DATA_FAILURE) {
    var _action$meta2 = action.meta,
        _id2 = _action$meta2.id,
        _reducer2 = _action$meta2.reducer;
    nextState = __chunk_4.cloneDeep(state);

    if (nextState[_reducer2].subLineData[_id2]) {
      delete nextState[_reducer2].subLineData[_id2];
    }
  }

  if (action.type === MT_GET_SUBLINE_DATA_SUCCESS) {
    var _action$meta3 = action.meta,
        _id3 = _action$meta3.id,
        _reducer3 = _action$meta3.reducer,
        _action$payload = action.payload,
        status = _action$payload.status,
        payload = _action$payload.payload;
    nextState = __chunk_4.cloneDeep(state);
    var hasId = !!nextState[_reducer3].subLineData[_id3];

    if (status === 'OK' && payload.items.length && hasId) {
      nextState[_reducer3].subLineData[_id3].isLoading = false;
      nextState[_reducer3].subLineData[_id3].items = __chunk_2._toConsumableArray(payload.items);
    } else if (hasId) {
      delete nextState[_reducer3].subLineData[_id3];
    }
  }

  if (action.type === MT_LIST_REMOVE_ITEM) {
    var _id4 = action.id,
        _reducer4 = action.reducer,
        _action$key = action.key,
        key = _action$key === void 0 ? 'id' : _action$key;
    var items = __chunk_4.cloneDeep(state[_reducer4].items);
    items = items.map(function (partItems) {
      var newPartItems = __chunk_4.cloneDeep(partItems);
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
    nextState = __chunk_4.cloneDeep(state);
    nextState[_reducer4].items = items;
  }

  if (action.type === MT_LIST_AUTO_UPDATE_ITEM) {
    var item = action.item,
        _reducer5 = action.reducer,
        _action$key2 = action.key,
        _key = _action$key2 === void 0 ? 'id' : _action$key2;

    var _id5 = item[_key];

    var _items = __chunk_4.cloneDeep(state[_reducer5].items);

    _items = _items.map(function (partItems) {
      var newPartItems = __chunk_4.cloneDeep(partItems);
      var index = newPartItems.findIndex(function (elem) {
        return elem[_key] === _id5;
      });

      if (index >= 0) {
        newPartItems[index] = item;
      }

      return newPartItems;
    });
    nextState = __chunk_4.cloneDeep(state);
    nextState[_reducer5].items = _items;
  }

  if (action.type === MT_SAVE_TABLE_SCROLL) {
    var _reducer6 = action.reducer,
        scroll = action.scroll;
    var prevState = __chunk_4.cloneDeep(state);
    nextState = _objectSpread$3({}, prevState, __chunk_1._defineProperty({}, _reducer6, _objectSpread$3({}, prevState[_reducer6], {
      scroll: scroll
    })));
  }

  if (action.type === MT_CHANGE_FILTERS_VALUE) {
    var _reducer7 = action.reducer,
        data = action.data;

    var _prevState = __chunk_4.cloneDeep(state);

    var props = _objectSpread$3({}, _prevState[_reducer7], {
      filtersValue: _objectSpread$3({}, _prevState[_reducer7].filtersValue, {}, data)
    });

    Object.entries(props.filtersValue).forEach(function (_ref) {
      var _ref2 = __chunk_4._slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      if (value === false || value === undefined) {
        delete props.filtersValue[key];
      }
    });

    if (data.offset === 0) {
      props.items = [];
    }

    nextState = _objectSpread$3({}, state, __chunk_1._defineProperty({}, action.reducer, props));
  } // filters data request


  if (SUCCESS_FILTERS_DATA_REGEXP.test(action.type)) {
    var _reducer8 = action.type.match(SUCCESS_FILTERS_DATA_REGEXP)[1];

    if (action.payload.status === 'OK') {
      var _items2 = action.payload.payload.items,
          modifyResponse = action.meta.modifyResponse;
      nextState = __chunk_4.cloneDeep(state);

      if (modifyResponse) {
        nextState.filtersData[_reducer8] = _items2.map(function (item) {
          return {
            label: item[modifyResponse.label],
            value: item[modifyResponse.value]
          };
        });
      } else {
        nextState.filtersData[_reducer8] = _items2 || [];
      }
    }
  }

  if (action.type === MT_DISABLE_ITEM_SWITCHER) {
    var _data = action.data,
        _reducer9 = action.reducer,
        byIndex = action.byIndex;
    nextState = __chunk_4.cloneDeep(state);

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
  }

  if (action.type === MT_SET_ITEMS) {
    var _items3 = action.items,
        _reducer10 = action.reducer;
    nextState = __chunk_4.cloneDeep(state);
    nextState[_reducer10].items = [__chunk_4.cloneDeep(_items3)];
  } // table request


  if (REQUEST_LIST_REGEXP.test(action.type)) {
    var _reducer11 = action.type.match(REQUEST_LIST_REGEXP)[1];
    nextState = __chunk_4.cloneDeep(state);
    nextState[_reducer11].isLoading = true;
  }

  if (SUCCESS_LIST_REGEXP.test(action.type)) {
    var _reducer12 = action.type.match(SUCCESS_LIST_REGEXP)[1];
    nextState = __chunk_4.cloneDeep(state);
    nextState[_reducer12].isLoading = false;

    if (action.payload.status === 'OK') {
      var _action$payload2 = action.payload,
          _action$payload2$payl = _action$payload2.payload,
          _items4 = _action$payload2$payl.items,
          _item = _action$payload2$payl.item,
          _action$payload2$_met = _action$payload2._meta,
          _meta = _action$payload2$_met === void 0 ? {
        is_last_page: false,
        total: 0
      } : _action$payload2$_met,
          reloadItemsOnRequest = action.meta.reloadItemsOnRequest;

      var isLastPage = _meta.is_last_page,
          total = _meta.total;
      nextState[_reducer12].isLastPage = isLastPage;
      nextState[_reducer12].total = total;

      if (_items4 && _items4.length || _item) {
        if (reloadItemsOnRequest) {
          nextState[_reducer12].items = [_items4 || [_item]];
        } else {
          nextState[_reducer12].items = [].concat(__chunk_2._toConsumableArray(nextState[_reducer12].items), [_items4 || [_item]]);
        }
      } else {
        nextState[_reducer12].isLastPage = true;
      }
    } else {
      nextState[_reducer12].isLastPage = true;
    }
  }

  if (FAILURE_LIST_REGEXP.test(action.type)) {
    var _reducer13 = action.type.match(FAILURE_LIST_REGEXP)[1];
    nextState = __chunk_4.cloneDeep(state);
    nextState[_reducer13].isLoading = false;
    nextState[_reducer13].isLastPage = true;
  }

  if (action.type === MT_LIST_UPDATE_ITEMS) {
    var _items5 = action.items,
        _reducer14 = action.reducer;
    nextState = __chunk_4.cloneDeep(state);
    nextState[_reducer14].items = _items5;
  }

  if (action.type === MT_UPDATE_VISIBLE_COLUMNS) {
    var _data2 = action.data,
        _reducer15 = action.reducer;
    nextState = __chunk_4.cloneDeep(state);
    nextState[_reducer15].visibleColumns = _data2;
  } // return the original `state` if `nextState` is null or undefined.


  return nextState || state;
};

var mainTableReducer$1 = (function () {
  var tableNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  tableNames.forEach(function (tableName) {
    initialState[tableName] = __chunk_4.cloneDeep(tableExample);
  });
  return mainTableReducer;
});

var FilterColumns =
/*#__PURE__*/
function (_Component) {
  __chunk_3._inherits(FilterColumns, _Component);

  function FilterColumns(props) {
    var _this;

    __chunk_3._classCallCheck(this, FilterColumns);

    _this = __chunk_3._possibleConstructorReturn(this, __chunk_3._getPrototypeOf(FilterColumns).call(this, props));

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "changeColumnState", function (column) {
      _this.setState(function (prevState) {
        var settingsColumns = __chunk_4.cloneDeep(prevState.settingsColumns);
        settingsColumns[column].active = !settingsColumns[column].active;
        var lengthActive = [];
        Object.keys(settingsColumns).forEach(function (elemIndex) {
          if (settingsColumns[elemIndex].active) {
            lengthActive.push(settingsColumns[elemIndex].active);
          }
        });

        if (lengthActive.length) {
          return {
            settingsColumns: settingsColumns
          };
        } else {
          return null;
        }
      }, function () {
        _this.updateSettingsColumnsStorage();

        _this.getVisibleColumns();
      });
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "updateSettingsColumnsStorage", function (settingsColumns) {
      var tableName = _this.props.tableName;
      var stringifySettingsColumns = JSON.stringify(settingsColumns || _this.state.settingsColumns);
      localStorage.setItem(tableName, stringifySettingsColumns);
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "getVisibleColumns", function () {
      var settingsColumns = _this.state.settingsColumns;
      var _this$props = _this.props,
          mainTableName = _this$props.mainTableName,
          dispatch = _this$props.dispatch;
      var visibleColumns = [];
      Object.keys(settingsColumns).forEach(function (elemIndex) {
        visibleColumns.push(settingsColumns[elemIndex].active);
      });
      dispatch(MTupdateVisibleColumns(visibleColumns, mainTableName));
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "selectMultiOpener", function () {
      _this.setState(function (prevState) {
        return {
          selectMultiOpened: !prevState.selectMultiOpened
        };
      });
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "clickOut", function (event) {
      var target = event.target;

      if (document.querySelector('.select-multi').classList.contains('active') && !target.classList.contains('select-multi') && !target.closest('.select-multi')) {
        _this.setState({
          selectMultiOpened: false
        });
      }
    });

    var _tableName = props.tableName,
        columnCategories = props.columnCategories,
        propsSettingsColumns = props.settingsColumns;
    var localSettingsColumns = localStorage.getItem(_tableName);
    var _settingsColumns = propsSettingsColumns;

    if (localSettingsColumns) {
      _settingsColumns = JSON.parse(localSettingsColumns);
    } else {
      _this.updateSettingsColumnsStorage(_settingsColumns);
    }

    _this.state = {
      selectMultiOpened: false,
      settingsColumns: _settingsColumns,
      columnCategories: columnCategories
    };
    return _this;
  }

  __chunk_3._createClass(FilterColumns, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getVisibleColumns();
      __chunk_4.addEvent(window, 'click', this.clickOut);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      __chunk_4.removeEvent(window, 'click', this.clickOut);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          selectMultiOpened = _this$state.selectMultiOpened,
          columnCategories = _this$state.columnCategories,
          settingsColumns = _this$state.settingsColumns;
      return React__default.createElement("div", {
        className: selectMultiOpened ? 'select-multi active' : 'select-multi'
      }, React__default.createElement("div", {
        role: "presentation",
        className: "select-multi__label",
        onClick: this.selectMultiOpener
      }, this.props.title), React__default.createElement("ul", {
        className: "select-multi__list"
      }, Object.keys(columnCategories).map(function (catId) {
        return React__default.createElement("li", {
          key: catId
        }, React__default.createElement("span", {
          className: "cat"
        }, columnCategories[catId]), __chunk_4.findByValue(settingsColumns, catId, 'cat').map(function (columnId) {
          var column = settingsColumns[columnId];
          return React__default.createElement("span", {
            key: columnId,
            onClick: function onClick() {
              if (column.fixed) return false;

              _this2.changeColumnState(columnId);
            },
            className: "item".concat(column.active ? ' active' : '').concat(column.fixed ? ' fixed' : '')
          }, column.name);
        }));
      })));
    }
  }]);

  return FilterColumns;
}(React.Component);

__chunk_1._defineProperty(FilterColumns, "defaultProps", {
  columnCategories: {
    0: 'Колонки'
  },
  mainTableName: null,
  title: 'Настройка колонок'
});

__chunk_1._defineProperty(FilterColumns, "propTypes", {
  tableName: __chunk_3.PropTypes.string.isRequired,
  columnCategories: __chunk_3.PropTypes.object,
  settingsColumns: __chunk_3.PropTypes.object.isRequired,
  mainTableName: __chunk_3.PropTypes.string,
  title: __chunk_3.PropTypes.string,
  dispatch: __chunk_3.PropTypes.func.isRequired
});

FilterColumns.displayName = "FilterColumns";

exports.FilterColumns = FilterColumns;
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
exports.MTsetItems = MTsetItems;
exports.MTupdateItems = MTupdateItems;
exports.MTupdateVisibleColumns = MTupdateVisibleColumns;
exports.MainTable = MainTableComponent;
exports.mainTableBeforeMiddleware = mainTableBeforeMiddleware;
exports.mainTableReducer = mainTableReducer$1;
