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

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-8a96f938.js');
var __chunk_2 = require('./chunk-5901b6d1.js');
var __chunk_3 = require('./chunk-4a240d20.js');
var __chunk_4 = require('./chunk-dd581ac4.js');
var __chunk_5 = require('./chunk-af08879b.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./chunk-3cd28e33.js');
var __chunk_10 = require('./chunk-c11a7971.js');
var __chunk_11 = require('./chunk-9db24562.js');

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

var navigator = window_1.navigator;

var isIos = (function detect_iOS (userAgent) {
  return /iPad|iPhone|iPod/.test(userAgent)
})(navigator ? navigator.userAgent : '');

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
  __chunk_4._inherits(TBodyPart, _Component);

  function TBodyPart(_props) {
    var _this;

    __chunk_4._classCallCheck(this, TBodyPart);

    _this = __chunk_4._possibleConstructorReturn(this, __chunk_4._getPrototypeOf(TBodyPart).call(this, _props));

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "generateFromTemplate", function () {
      var items = _this.mainFabric();

      return items;
    });

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "mainFabric", function () {
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
            titleIndexes.push.apply(titleIndexes, __chunk_3._toConsumableArray(mappedColumns));
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
              var keys = {};
              var tbodyKeys = typeof tbody.key === 'string' ? [tbody.key] : tbody.key;

              for (var b = 0; b < tbodyKeys.length; b += 1) {
                keys[tbodyKeys[b]] = item[tbodyKeys[b]];
              }

              className = tbody.className(keys);
            }

            var props = tbody.props ? __chunk_10.cloneDeep(tbody.props) : {};

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
          items.splice.apply(items, [index + prevLength + 1, 0].concat(__chunk_3._toConsumableArray(elem.items)));

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

  __chunk_4._createClass(TBodyPart, [{
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

__chunk_5._defineProperty(TBodyPart, "defaultProps", {
  rerenderById: null,
  visibleColumns: null,
  afterLineData: null,
  afterLineTemplate: null
});

__chunk_5._defineProperty(TBodyPart, "propTypes", {
  tableTemplate: __chunk_4.PropTypes.array.isRequired,
  partItems: __chunk_4.PropTypes.array.isRequired,
  dataForRender: __chunk_4.PropTypes.object.isRequired,
  rerenderById: __chunk_4.PropTypes.number,
  visibleColumns: __chunk_4.PropTypes.array,
  afterLineData: __chunk_4.PropTypes.object,
  afterLineTemplate: __chunk_4.PropTypes.array
});

TBodyPart.displayName = "TBodyPart";

var TBody =
/*#__PURE__*/
function (_Component) {
  __chunk_4._inherits(TBody, _Component);

  function TBody() {
    var _getPrototypeOf2;

    var _this;

    __chunk_4._classCallCheck(this, TBody);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __chunk_4._possibleConstructorReturn(this, (_getPrototypeOf2 = __chunk_4._getPrototypeOf(TBody)).call.apply(_getPrototypeOf2, [this].concat(args)));

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "blockedItemsPosition", function () {
      var parent = _this.props.refs.parent.current;
      var tr = document.querySelectorAll('.blocked-item');
      tr.forEach(function (element, index) {
        var elem = tr[index];
        var dataId = elem.getAttribute('item-data-id');
        var item = document.querySelector("tbody tr[data-id=\"".concat(dataId, "\"]"));

        if (!item.length) {
          var top = parent.scrollTop + (Math.abs(__chunk_11.elemOffset(item).top) - __chunk_11.elemOffset(parent).top) + 1;
          var height = item.offsetHeight - 1;
          elem.style.top = "".concat(top, "px");
          elem.style.height = "".concat(height, "px");
          elem.style.lineHeight = "".concat(height, "px");
        }
      });
    });

    return _this;
  }

  __chunk_4._createClass(TBody, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      __chunk_11.addEvent(window, 'resize', this.blockedItemsPosition);
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
      __chunk_11.removeEvent(window, 'resize', this.blockedItemsPosition);
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
  __chunk_4._inherits(THead, _Component);

  function THead() {
    var _getPrototypeOf2;

    var _this;

    __chunk_4._classCallCheck(this, THead);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __chunk_4._possibleConstructorReturn(this, (_getPrototypeOf2 = __chunk_4._getPrototypeOf(THead)).call.apply(_getPrototypeOf2, [this].concat(args)));

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "changeSortType", function (sortBy, filtersValue) {
      return filtersValue.sort_by !== sortBy ? ORDER_BY_DESC : filtersValue.sort_type === ORDER_BY_DESC ? ORDER_BY_ASC : ORDER_BY_DESC;
    });

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "generateFromTemplate", function () {
      var _this$props = _this.props,
          tableTemplate = _this$props.tableTemplate,
          filtersValue = _this$props.filtersValue,
          reducer = _this$props.reducer,
          getItems = _this$props.getItems,
          sortType = _this$props.sortType,
          sortBy = _this$props.sortBy,
          visibleColumns = _this$props.visibleColumns,
          titleTemplate = _this$props.titleTemplate;
      var headItems = [];
      var titleIndexes = [];

      if (titleTemplate && Array.isArray(titleTemplate)) {
        titleTemplate.forEach(function (_ref, index) {
          var columns = _ref.columns;
          var mappedColumns = columns.map(function () {
            return index;
          });
          titleIndexes.push.apply(titleIndexes, __chunk_3._toConsumableArray(mappedColumns));
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

          var props = thead.props ? __chunk_10.cloneDeep(thead.props) : {};

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

              getItems({
                sort_type: newSortType,
                sort_by: sortKey,
                offset: 0
              }, reducer);
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

  __chunk_4._createClass(THead, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      var tableTemplateNotEqual = JSON.stringify(props.tableTemplate) !== JSON.stringify(nextProps.tableTemplate);
      var sortTypeNotEqual = JSON.stringify(props.sortType) !== JSON.stringify(nextProps.sortType);
      var sortByNotEqual = JSON.stringify(props.sortBy) !== JSON.stringify(nextProps.sortBy);
      var visibleColumnsNotEqual = JSON.stringify(props.visibleColumns) !== JSON.stringify(nextProps.visibleColumns);
      return tableTemplateNotEqual || sortTypeNotEqual || sortByNotEqual || visibleColumnsNotEqual;
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

__chunk_5._defineProperty(THead, "defaultProps", {
  getItems: function getItems() {
    console.log('not imported function "getItems"');
  },
  reducer: '',
  filtersValue: {},
  sortType: null,
  sortBy: null,
  isHidden: false,
  visibleColumns: null
});

__chunk_5._defineProperty(THead, "propTypes", {
  tableTemplate: __chunk_4.PropTypes.array.isRequired,
  reducer: __chunk_4.PropTypes.string,
  getItems: __chunk_4.PropTypes.func,
  filtersValue: __chunk_4.PropTypes.object,
  sortType: __chunk_4.PropTypes.string,
  sortBy: __chunk_4.PropTypes.string,
  isHidden: __chunk_4.PropTypes.bool,
  setRef: __chunk_4.PropTypes.object.isRequired,
  visibleColumns: __chunk_4.PropTypes.array
});

THead.displayName = "THead";

var TTitle =
/*#__PURE__*/
function (_Component) {
  __chunk_4._inherits(TTitle, _Component);

  function TTitle() {
    var _getPrototypeOf2;

    var _this;

    __chunk_4._classCallCheck(this, TTitle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __chunk_4._possibleConstructorReturn(this, (_getPrototypeOf2 = __chunk_4._getPrototypeOf(TTitle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "generateFromTemplate", function () {
      var _this$props = _this.props,
          titleTemplate = _this$props.titleTemplate,
          visibleColumns = _this$props.visibleColumns;
      var titleItems = [];
      var columnI = 0;
      titleTemplate.forEach(function (column, index) {
        var props = column.props,
            value = column.value;

        var columns = __chunk_3._toConsumableArray(column.columns);

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

  __chunk_4._createClass(TTitle, [{
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

__chunk_5._defineProperty(TTitle, "defaultProps", {
  visibleColumns: null
});

__chunk_5._defineProperty(TTitle, "propTypes", {
  titleTemplate: __chunk_4.PropTypes.array.isRequired,
  visibleColumns: __chunk_4.PropTypes.array
});

TTitle.displayName = "TTitle";

var TFoot =
/*#__PURE__*/
function (_Component) {
  __chunk_4._inherits(TFoot, _Component);

  function TFoot() {
    var _getPrototypeOf2;

    var _this;

    __chunk_4._classCallCheck(this, TFoot);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __chunk_4._possibleConstructorReturn(this, (_getPrototypeOf2 = __chunk_4._getPrototypeOf(TFoot)).call.apply(_getPrototypeOf2, [this].concat(args)));

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "generateFromTemplate", function () {
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

  __chunk_4._createClass(TFoot, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      var tableTemplateNotEqual = JSON.stringify(props.tableTemplate) !== JSON.stringify(nextProps.tableTemplate);
      var visibleColumnsNotEqual = JSON.stringify(props.visibleColumns) !== JSON.stringify(nextProps.visibleColumns);
      var tfootItemNotEqual = JSON.stringify(props.tfootItem) !== JSON.stringify(nextProps.tfootItem);
      var itemsNotEqual = JSON.stringify(props.items) !== JSON.stringify(nextProps.items);
      var tfootDataForRenderNotEqual = JSON.stringify(props.tfootDataForRender) !== JSON.stringify(nextProps.tfootDataForRender);
      return tableTemplateNotEqual || visibleColumnsNotEqual || tfootItemNotEqual || itemsNotEqual || tfootDataForRenderNotEqual;
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

__chunk_5._defineProperty(TFoot, "defaultProps", {
  visibleColumns: null,
  tfootItem: null,
  items: [],
  tfootDataForRender: null
});

__chunk_5._defineProperty(TFoot, "propTypes", {
  tableTemplate: __chunk_4.PropTypes.array.isRequired,
  setRef: __chunk_4.PropTypes.object.isRequired,
  visibleColumns: __chunk_4.PropTypes.array,
  tfootItem: __chunk_4.PropTypes.object,
  items: __chunk_4.PropTypes.array,
  tfootDataForRender: __chunk_4.PropTypes.object
});

TFoot.displayName = "TFoot";

var MainTable =
/*#__PURE__*/
function (_Component) {
  __chunk_4._inherits(MainTable, _Component);

  function MainTable(props) {
    var _this;

    __chunk_4._classCallCheck(this, MainTable);

    _this = __chunk_4._possibleConstructorReturn(this, __chunk_4._getPrototypeOf(MainTable).call(this, props));

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "scrollHeads", function () {
      var _this$table = _this.table,
          parent = _this$table.parent.current,
          theadVisible = _this$table.theadVisible.current,
          tfoot = _this$table.tfoot.current,
          ttitle = _this$table.ttitle.current;
      var _this$props = _this.props,
          tfootItem = _this$props.tfootItem,
          leftMenuWidth = _this$props.leftMenuWidth,
          titleTemplate = _this$props.titleTemplate;
      var left = leftMenuWidth - parent.scrollLeft;

      if (!isIos) {
        left -= document.body.scrollLeft;
      }

      theadVisible.style.left = "".concat(left, "px");

      if (tfootItem) {
        tfoot.style.left = "".concat(left, "px");
        tfoot.style.width = "".concat(parent.clientWidth + parent.scrollLeft, "px");
      }

      if (titleTemplate) {
        ttitle.style.left = "".concat(left, "px");
        ttitle.style.width = "".concat(parent.clientWidth + parent.scrollLeft, "px");
      }
    });

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "resizeTableColumns", function () {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          reducer = _this$props2.reducer,
          tfootItem = _this$props2.tfootItem,
          tfootOtherTemplate = _this$props2.tfootOtherTemplate,
          titleTemplate = _this$props2.titleTemplate,
          disableLazyLoad = _this$props2.disableLazyLoad;
      var _data$reducer = data[reducer],
          items = _data$reducer.items,
          isLoading = _data$reducer.isLoading,
          isLastPage = _data$reducer.isLastPage;
      var _this$table2 = _this.table,
          parent = _this$table2.parent.current,
          tbody = _this$table2.tbody.current,
          theadHidden = _this$table2.theadHidden.current,
          theadVisible = _this$table2.theadVisible.current,
          tfoot = _this$table2.tfoot.current,
          ttitle = _this$table2.ttitle.current;
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

      parent.style.top = "".concat(offsetTopTable + titleHeight, "px");
      theadVisible.style.top = "".concat(offsetTopThead + titleHeight, "px");

      if (ttitle) {
        ttitle.style.top = "".concat(offsetTopThead, "px");
      } // // get bottom table offset
      // if (tfootItem) {
      //   const tfootHeight = tfoot.offsetHeight;
      //   parent.style.bottom = `${tfootHeight}px`;
      // }


      if (!isLoading && items.length || isLoading && isLastPage === null || !isLoading && (isLastPage === null || isLastPage === undefined) || !isLoading && !items.length && isLastPage) {
        theadVisible.style.width = "".concat(tbody.offsetWidth, "px");

        if (titleTemplate) {
          var html = document.getElementsByTagName('html')[0];
          ttitle.style.width = "".concat(parent.clientWidth + parent.scrollLeft + html.scrollLeft, "px"); // tfoot.style.bottom = `${parent.offsetHeight - parent.clientHeight}px`;
        }

        if (tfootItem || tfootOtherTemplate) {
          var _html = document.getElementsByTagName('html')[0];
          tfoot.style.width = "".concat(parent.clientWidth + parent.scrollLeft + _html.scrollLeft, "px");
          tfoot.style.bottom = "".concat(parent.offsetHeight - parent.clientHeight, "px");
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
          var footItems = document.getElementById('tfoot-data').getElementsByTagName('td');

          for (var _i = 0; _i < targetItems.length; _i += 1) {
            var _width = Math.floor(targetItems[_i].offsetWidth);

            footItems[_i].style.width = "".concat(_width, "px");
          }
        }

        if (titleTemplate) {
          var widths = {};
          targetItems.forEach(function (el) {
            var index = el.getAttribute('js-title-index');

            if (index) {
              if (!widths[index]) {
                widths[index] = 0;
              }

              widths[index] += +Math.floor(el.offsetWidth);
            }
          });
          ttitle.getElementsByTagName('th').forEach(function (el, i) {
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

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "lazyLoad", function () {
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
      var currentScrollTop = Math.abs(__chunk_11.elemOffset(tbody).top - __chunk_11.elemOffset(parent).top);
      var documentHalfHeight = document.getElementsByTagName('html')[0].offsetHeight / 2;

      if (maxScrollTop - documentHalfHeight < currentScrollTop) {
        _this.getItems();
      }
    });

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "getItems", function (params) {
      var _this$props4 = _this.props,
          listGet = _this$props4.listGet,
          changeFiltersValue = _this$props4.changeFiltersValue,
          reducer = _this$props4.reducer,
          url = _this$props4.url,
          data = _this$props4.data;
      var _data$reducer$filters = data[reducer].filtersValue,
          offset = _data$reducer$filters.offset,
          limit = _data$reducer$filters.limit;
      changeFiltersValue(params || {
        offset: offset + limit
      }, reducer);
      listGet(reducer, url);
    });

    _this.state = {
      colsCount: props.tableTemplate.length + 2
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

  __chunk_4._createClass(MainTable, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var onInit = this.props.onInit;

      if (typeof onInit === 'function') {
        onInit(this.getItems);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var parent = this.table.parent.current;
      var _this$props5 = this.props,
          reducer = _this$props5.reducer,
          listGet = _this$props5.listGet,
          url = _this$props5.url,
          data = _this$props5.data,
          action = _this$props5.history.action,
          initFiltersValue = _this$props5.initFiltersValue,
          changeFiltersValue = _this$props5.changeFiltersValue,
          refreshTableOnPush = _this$props5.refreshTableOnPush; // init filtersValue for first request

      if (initFiltersValue) {
        if (!Object.keys(data[reducer].filtersValue).length || refreshTableOnPush && action === 'PUSH') {
          changeFiltersValue(initFiltersValue, reducer);
        }
      } // init get items for table


      if (refreshTableOnPush && action === 'PUSH' || !data[reducer].items.length && data[reducer].isLastPage === null) {
        listGet(reducer, url);
      }

      __chunk_11.addEvent(window, 'resize', this.resizeTableColumns);
      __chunk_11.addEvent(parent, 'scroll', this.scrollHeads);
      __chunk_11.addEvent(window, 'scroll', this.scrollHeads);
      __chunk_11.addEvent(document.body, 'scroll', this.scrollHeads);
      this.resizeTableColumns();
      var _data$reducer3 = data[reducer],
          items = _data$reducer3.items,
          scroll = _data$reducer3.scroll;

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
      saveTableScroll({
        scrollTop: scrollTop,
        scrollLeft: scrollLeft
      }, reducer);
      __chunk_11.removeEvent(window, 'resize', this.resizeTableColumns);
      __chunk_11.removeEvent(parent, 'scroll', this.scrollHeads);
      __chunk_11.removeEvent(html, 'scroll', this.scrollHeads);
      __chunk_11.removeEvent(document.body, 'scroll', this.scrollHeads);
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
          visibleColumnsMiddleware = _this$props7.visibleColumnsMiddleware;
      var _data$reducer4 = data[reducer],
          isLoading = _data$reducer4.isLoading,
          isLastPage = _data$reducer4.isLastPage,
          items = _data$reducer4.items,
          filtersValue = _data$reducer4.filtersValue,
          originalVisibleColumns = _data$reducer4.visibleColumns,
          blockedItems = _data$reducer4.blockedItems,
          afterLineData = _data$reducer4.subLineData;
      var colsCount = this.state.colsCount;
      var visibleColumns = visibleColumnsMiddleware(originalVisibleColumns);
      return React__default.createElement("div", {
        id: id,
        ref: this.table.parent,
        className: "table-list__parent ".concat(className),
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
        sortType: filtersValue.sort_type,
        sortBy: filtersValue.sort_by,
        visibleColumns: visibleColumns
      })), React__default.createElement("table", {
        className: "table__tbody table-list"
      }, React__default.createElement(THead, {
        setRef: this.table.theadHidden,
        tableTemplate: tableTemplate,
        titleTemplate: titleTemplate,
        filtersValue: filtersValue,
        isLastPage: isLastPage,
        getItems: this.getItems,
        reducer: reducer,
        isHidden: true,
        sortType: filtersValue.sort_type,
        sortBy: filtersValue.sort_by,
        visibleColumns: visibleColumns
      }), React__default.createElement("tbody", {
        ref: this.table.tbody
      }, React__default.createElement(TBody, {
        items: __chunk_10.cloneDeep(items),
        tableTemplate: tableTemplate,
        titleTemplate: titleTemplate,
        rerenderById: rerenderById,
        dataForRender: __chunk_10.cloneDeep(dataForRender),
        visibleColumns: visibleColumns,
        afterLineTemplate: afterLineTemplate,
        afterLineData: afterLineData,
        blockedItems: blockedItems,
        refs: this.table
      }), !items.length && isLastPage && !isLoading ? React__default.createElement("tr", {
        className: "no-border"
      }, React__default.createElement("td", {
        colSpan: colsCount
      }, React__default.createElement("span", {
        className: "no-data"
      }, "No data"))) : false, isLoading ? React__default.createElement("tr", {
        className: "no-border"
      }, React__default.createElement("td", {
        colSpan: colsCount
      }, React__default.createElement("span", {
        className: "loading"
      }, React__default.createElement("span", null)))) : false), tfootItem ? React__default.createElement(TFoot, {
        tableTemplate: tableTemplate,
        tfootItem: tfootItem,
        isHidden: true,
        setRef: this.table.tfootHidden,
        visibleColumns: visibleColumns
      }) : false), tfootItem || tfootOtherTemplate ? React__default.createElement("table", {
        className: "table__thead table-list"
      }, React__default.createElement(TFoot, {
        tableTemplate: tableTemplate,
        tfootItem: tfootItem,
        items: __chunk_10.cloneDeep(items),
        tfootDataForRender: this.props.tfootDataForRender,
        tfootOtherTemplate: this.props.tfootOtherTemplate,
        setRef: this.table.tfoot,
        visibleColumns: visibleColumns
      })) : false);
    }
  }]);

  return MainTable;
}(React.Component);

__chunk_5._defineProperty(MainTable, "defaultProps", {
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
  leftMenuWidth: 200,
  titleTemplate: null,
  disableLazyLoad: false,
  visibleColumnsMiddleware: function visibleColumnsMiddleware(visibleColumns) {
    return visibleColumns;
  }
});

__chunk_5._defineProperty(MainTable, "propTypes", {
  url: __chunk_4.PropTypes.string.isRequired,
  id: __chunk_4.PropTypes.string.isRequired,
  tableTemplate: __chunk_4.PropTypes.array.isRequired,
  titleTemplate: __chunk_4.PropTypes.array,
  reducer: __chunk_4.PropTypes.string,
  data: __chunk_4.PropTypes.object.isRequired,
  className: __chunk_4.PropTypes.string,
  dataForRender: __chunk_4.PropTypes.object,
  rerenderById: __chunk_4.PropTypes.number,
  initFiltersValue: __chunk_4.PropTypes.object,
  refreshTableOnPush: __chunk_4.PropTypes.bool,
  listGet: __chunk_4.PropTypes.func.isRequired,
  saveTableScroll: __chunk_4.PropTypes.func.isRequired,
  changeFiltersValue: __chunk_4.PropTypes.func.isRequired,
  history: __chunk_4.PropTypes.object.isRequired,
  onInit: __chunk_4.PropTypes.func,
  afterLineTemplate: __chunk_4.PropTypes.array,
  tfootItem: __chunk_4.PropTypes.object,
  tfootDataForRender: __chunk_4.PropTypes.object,
  leftMenuWidth: __chunk_4.PropTypes.number,
  visibleColumnsMiddleware: __chunk_4.PropTypes.func,
  disableLazyLoad: __chunk_4.PropTypes.bool
});

MainTable.displayName = "MainTable";

module.exports = MainTable;
