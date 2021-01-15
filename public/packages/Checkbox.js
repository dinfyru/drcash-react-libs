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

var __chunk_1 = require('./chunk-c963153b.js');
var __chunk_3 = require('./chunk-9858265a.js');
var React = require('react');
var React__default = _interopDefault(React);

var Checkbox =
/*#__PURE__*/
function (_PureComponent) {
  __chunk_3._inherits(Checkbox, _PureComponent);

  __chunk_3._createClass(Checkbox, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var active = nextProps.active,
          trackValue = nextProps.trackValue;

      if ((trackValue || nextProps.type === 'radio') && active !== prevState.active) {
        return {
          active: active
        };
      }

      return null;
    }
  }]);

  function Checkbox(props) {
    var _this;

    __chunk_3._classCallCheck(this, Checkbox);

    _this = __chunk_3._possibleConstructorReturn(this, __chunk_3._getPrototypeOf(Checkbox).call(this, props));

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "onChange", function () {
      var _this$props = _this.props,
          trackValue = _this$props.trackValue,
          activeProps = _this$props.active,
          disabled = _this$props.disabled;
      if (disabled) return;

      if (trackValue) {
        _this.props.onChange(_this.state.active);

        return;
      }

      _this.setState(function (prevState) {
        var active = trackValue ? activeProps : !prevState.active;

        if (_this.props.type === 'radio') {
          active = true;
        }

        return {
          active: active
        };
      }, function () {
        _this.props.onChange(_this.state.active);
      });
    });

    __chunk_1._defineProperty(__chunk_3._assertThisInitialized(_this), "active", function (active) {
      _this.setState({
        active: active
      });
    });

    _this.active = _this.active.bind(__chunk_3._assertThisInitialized(_this));
    _this.state = {
      active: props.active
    };
    return _this;
  }

  __chunk_3._createClass(Checkbox, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var classNames = this.props.type;
      if (this.state.active) classNames += ' active';
      if (this.props.classNames.length) classNames += " ".concat(this.props.classNames);
      if (this.props.disabled) classNames += ' disabled';
      return React__default.createElement("div", {
        title: this.props.title,
        className: classNames,
        disabled: this.props.disabled,
        onClick: function onClick() {
          _this2.onChange();
        }
      }, this.props.children);
    }
  }]);

  return Checkbox;
}(React.PureComponent);

__chunk_1._defineProperty(Checkbox, "defaultProps", {
  classNames: '',
  title: '',
  type: 'checkbox',
  active: false,
  disabled: false,
  trackValue: false
});

__chunk_1._defineProperty(Checkbox, "propTypes", {
  onChange: __chunk_3.PropTypes.func.isRequired,
  classNames: __chunk_3.PropTypes.string,
  type: __chunk_3.PropTypes.string,
  title: __chunk_3.PropTypes.string,
  active: __chunk_3.PropTypes.bool,
  disabled: __chunk_3.PropTypes.bool,
  trackValue: __chunk_3.PropTypes.bool
});

Checkbox.displayName = "Checkbox";

module.exports = Checkbox;
