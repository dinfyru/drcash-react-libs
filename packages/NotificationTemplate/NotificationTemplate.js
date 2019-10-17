import React from 'react';
import PropTypes from 'prop-types';

import './NotificationTemplate.sass';

class Notification extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    duration: PropTypes.number,
    handleDismiss: PropTypes.func.isRequired
  };

  static defaultProps = {
    duration: 0
  };

  componentDidMount() {
    const { handleDismiss, id, duration } = this.props;
    if (duration !== 0) {
      setTimeout(() => {
        handleDismiss(id);
      }, duration);
    }
  }

  render() {
    const { handleDismiss, message, type, id } = this.props;
    let classType;
    if (type === 'NOTIFICATION_TYPE_ERROR') {
      classType = 'error';
    } else if (type === 'NOTIFICATION_TYPE_WARNING') {
      classType = 'warning';
    } else if (type === 'NOTIFICATION_TYPE_SUCCESS') {
      classType = 'success';
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
