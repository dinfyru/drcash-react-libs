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

var __chunk_1 = require('./chunk-076fd344.js');
var __chunk_3 = require('./chunk-e4c425ca.js');
var React = require('react');
var React__default = _interopDefault(React);

var notificationAction = (function (notificationType, message) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7000;
  var type;

  if (notificationType === 'error') {
    type = 'NOTIFICATION_TYPE_ERROR';
  } else if (notificationType === 'warning') {
    type = 'NOTIFICATION_TYPE_WARNING';
  } else if (notificationType === 'success') {
    type = 'NOTIFICATION_TYPE_SUCCESS';
  }

  return {
    type: 'ADD_NOTIFICATION',
    notification: {
      id: parseInt(Math.random().toString().split('.')[1], 10),
      duration: duration,
      message: message,
      type: type,
      canDismiss: true
    }
  };
});

___$insertStyle("@charset \"UTF-8\";\n.alert-type {\n  font-size: 13px;\n  padding: 25px 35px;\n  max-width: 500px;\n  max-height: 250px;\n  box-shadow: 0 6px 4px -3px rgba(0, 0, 0, 0.2);\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n}\n.alert-type > span {\n  line-height: 18px;\n}\n.alert-type.success {\n  color: #0a7c71;\n  background-color: #cff5f2;\n}\n.alert-type.info {\n  color: #2b6a94;\n  background-color: #daeffd;\n}\n.alert-type.error {\n  color: #933432;\n  background-color: #fddddd;\n}\n.alert-type .close {\n  background-color: transparent;\n  border: 0;\n  padding: 0;\n  float: right;\n  margin-left: 20px;\n  color: inherit;\n}\n.alert-type .close:before {\n  content: \"\";\n  font-family: \"Font Awesome 5 Pro\";\n  font-weight: 900;\n  font-size: 14px;\n  color: inherit;\n  opacity: 0.6;\n}\n.alert-type .close:hover {\n  cursor: pointer;\n}\n.alert-type .close:hover:before {\n  opacity: 0.8;\n}");

var Notification =
/*#__PURE__*/
function (_React$PureComponent) {
  __chunk_3._inherits(Notification, _React$PureComponent);

  function Notification() {
    __chunk_3._classCallCheck(this, Notification);

    return __chunk_3._possibleConstructorReturn(this, __chunk_3._getPrototypeOf(Notification).apply(this, arguments));
  }

  __chunk_3._createClass(Notification, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          handleDismiss = _this$props.handleDismiss,
          id = _this$props.id,
          duration = _this$props.duration;

      if (duration !== 0) {
        setTimeout(function () {
          handleDismiss(id);
        }, duration);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          handleDismiss = _this$props2.handleDismiss,
          message = _this$props2.message,
          type = _this$props2.type,
          id = _this$props2.id;
      var classType;

      if (type === 'NOTIFICATION_TYPE_ERROR') {
        classType = 'error';
      } else if (type === 'NOTIFICATION_TYPE_WARNING') {
        classType = 'warning';
      } else if (type === 'NOTIFICATION_TYPE_SUCCESS') {
        classType = 'success';
      }

      return React__default.createElement("div", {
        style: {
          transition: 'opacity 250ms ease 0s',
          opacity: 1
        }
      }, React__default.createElement("div", {
        className: "".concat(classType, " alert-type"),
        style: {
          margin: 30
        }
      }, React__default.createElement("button", {
        className: "close",
        onClick: function onClick() {
          return handleDismiss(id);
        }
      }), React__default.createElement("span", null, message)));
    }
  }]);

  return Notification;
}(React__default.PureComponent);

__chunk_1._defineProperty(Notification, "propTypes", {
  id: __chunk_3.PropTypes.number.isRequired,
  type: __chunk_3.PropTypes.string.isRequired,
  duration: __chunk_3.PropTypes.number,
  handleDismiss: __chunk_3.PropTypes.func.isRequired
});

__chunk_1._defineProperty(Notification, "defaultProps", {
  duration: 0
});

Notification.displayName = "Notification";

exports.NotificationTemplate = Notification;
exports.notification = notificationAction;
