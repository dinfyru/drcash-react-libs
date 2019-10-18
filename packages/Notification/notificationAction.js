export default (notificationType, message, duration = 7000) => {
  let type;
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
      id: parseInt(
        Math.random()
          .toString()
          .split('.')[1],
        10
      ),
      duration,
      message,
      type,
      canDismiss: true
    }
  };
};
