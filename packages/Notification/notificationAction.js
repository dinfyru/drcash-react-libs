export default (notificationType, message, duration = 7000) => {
  let type;
  if (notificationType === 'NOTIFICATION_TYPE_ERROR') {
    type = 'error';
  } else if (notificationType === 'NOTIFICATION_TYPE_WARNING') {
    type = 'warning';
  } else if (notificationType === 'NOTIFICATION_TYPE_SUCCESS') {
    type = 'success';
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
