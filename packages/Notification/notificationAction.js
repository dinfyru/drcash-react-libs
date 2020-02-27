export default ({ type, message, duration = 7000 }) => {
  const types = {
    error: 'NOTIFICATION_TYPE_ERROR',
    warning: 'NOTIFICATION_TYPE_WARNING',
    success: 'NOTIFICATION_TYPE_SUCCESS',
    noInternet: 'NOTIFICATION_TYPE_NO_INTERNET'
  };

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
      type: types[type] || types.error,
      canDismiss: true
    }
  };
};
