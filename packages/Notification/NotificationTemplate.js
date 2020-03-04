import React from 'react';
import PropTypes from 'prop-types';

import './NotificationTemplate.sass';

class Notification extends React.PureComponent {
  static defaultProps = {
    duration: 0,
    message: ''
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.any(PropTypes.string, PropTypes.object),
    duration: PropTypes.number,
    handleDismiss: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { handleDismiss, id, duration } = this.props;
    if (duration !== 0) {
      setTimeout(() => {
        handleDismiss(id);
      }, duration);
    }
  }

  notificationParams = (type, message) => {
    if (type === 'NOTIFICATION_TYPE_WARNING') {
      return { classType: 'warning', message };
    }
    if (type === 'NOTIFICATION_TYPE_SUCCESS') {
      return { classType: 'success', message };
    }

    return { classType: 'error', message };
  };

  render() {
    const { handleDismiss, message: propsMessage, type, id } = this.props;
    const { classType, message } = this.notificationParams(type, propsMessage);

    if ('onLine' in navigator && !navigator.onLine) {
      return false;
    }

    return (
      <div style={{ transition: 'opacity 250ms ease 0s', opacity: 1 }}>
        <div className={`${classType} alert-type`} style={{ margin: 30 }}>
          <button className="close" onClick={() => handleDismiss(id)} />
          <span>{message}</span>
        </div>
      </div>
    );
  }
}

export default Notification;
