import React, { Component } from 'react';

class AlertTemplate extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.alert.show && nextProps.alert.msg) {
      this.msg.show(nextProps.alert.msg, {
        type: nextProps.alert.type,
        onClose: this.props.hideAlertMessage
      });
    }
  }

  render() {
    return false;
  }
}

export default AlertTemplate;
