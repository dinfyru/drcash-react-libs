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

require('./chunk-8a96f938.js');
var __chunk_4 = require('./chunk-dd581ac4.js');
var __chunk_5 = require('./chunk-af08879b.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./chunk-3cd28e33.js');
require('./chunk-93b2e459.js');
var __chunk_10 = require('./chunk-c11a7971.js');
var __chunk_11 = require('./chunk-9db24562.js');
var mainTableActions = require('./mainTableActions.js');

var FilterColumns =
/*#__PURE__*/
function (_Component) {
  __chunk_4._inherits(FilterColumns, _Component);

  function FilterColumns(props) {
    var _this;

    __chunk_4._classCallCheck(this, FilterColumns);

    _this = __chunk_4._possibleConstructorReturn(this, __chunk_4._getPrototypeOf(FilterColumns).call(this, props));

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "changeColumnState", function (column) {
      _this.setState(function (prevState) {
        var settingsColumns = __chunk_10.cloneDeep(prevState.settingsColumns);
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

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "updateSettingsColumnsStorage", function (settingsColumns) {
      var tableName = _this.props.tableName;
      var stringifySettingsColumns = JSON.stringify(settingsColumns || _this.state.settingsColumns);
      localStorage.setItem(tableName, stringifySettingsColumns);
    });

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "getVisibleColumns", function () {
      var settingsColumns = _this.state.settingsColumns;
      var _this$props = _this.props,
          mainTableName = _this$props.mainTableName,
          dispatch = _this$props.dispatch;
      var visibleColumns = [];
      Object.keys(settingsColumns).forEach(function (elemIndex) {
        visibleColumns.push(settingsColumns[elemIndex].active);
      });
      dispatch(mainTableActions.MTupdateVisibleColumns(visibleColumns, mainTableName));
    });

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "selectMultiOpener", function () {
      _this.setState(function (prevState) {
        return {
          selectMultiOpened: !prevState.selectMultiOpened
        };
      });
    });

    __chunk_5._defineProperty(__chunk_4._assertThisInitialized(_this), "clickOut", function (event) {
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

  __chunk_4._createClass(FilterColumns, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getVisibleColumns();
      __chunk_11.addEvent(window, 'click', this.clickOut);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      __chunk_11.removeEvent(window, 'click', this.clickOut);
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
        }, columnCategories[catId]), __chunk_11.findByValue(settingsColumns, catId, 'cat').map(function (columnId) {
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

__chunk_5._defineProperty(FilterColumns, "defaultProps", {
  columnCategories: {
    0: 'Колонки'
  },
  mainTableName: null,
  title: 'Настройка колонок'
});

__chunk_5._defineProperty(FilterColumns, "propTypes", {
  tableName: __chunk_4.PropTypes.string.isRequired,
  columnCategories: __chunk_4.PropTypes.object,
  settingsColumns: __chunk_4.PropTypes.object.isRequired,
  mainTableName: __chunk_4.PropTypes.string,
  title: __chunk_4.PropTypes.string,
  dispatch: __chunk_4.PropTypes.func.isRequired
});

FilterColumns.displayName = "FilterColumns";

module.exports = FilterColumns;
