import cloneDeep from 'lodash.clonedeep';

const ignoreStatuses = ['OK', 'NO_ROWS'];

export default (store) => (next) => (action) => {
  if (/.*_FAILURE$/gi.test(action.type) && action.meta.status !== 401) {
    next({
      type: 'ADD_NOTIFICATION',
      notification: {
        id: parseInt(Math.random().toString().split('.')[1], 10),
        duration: 7000,
        message: 'Something went wrong. Try again later.',
        type: 'NOTIFICATION_TYPE_ERROR',
        canDismiss: true,
      },
    });
    return Promise.reject(next(action));
  }

  if (/.*_SUCCESS$/gi.test(action.type)) {
    const cloneAction = cloneDeep(action);
    // validate response crud data
    if (!cloneAction.payload.status || !cloneAction.payload.status.length) {
      cloneAction.payload.status = 'EMPTY_STATUS_FROM_BACKEND';
    }
    if (typeof cloneAction.payload.payload !== 'object') {
      cloneAction.payload.payload = {
        item: {},
        items: [],
      };
    }
    if (typeof cloneAction.payload._meta !== 'object') {
      cloneAction.payload._meta = {};
    }

    // validate crud actions for status
    if (
      cloneAction.meta &&
      cloneAction.meta.validStatuses &&
      cloneAction.payload
    ) {
      const {
        payload = { status: 'INTERNAL_ERROR' },
        meta: { validStatuses = [], errorMessagesByStatus = {} },
      } = cloneAction;
      const { status } = payload;
      if (
        ignoreStatuses.indexOf(status) < 0 &&
        validStatuses.indexOf(status) < 0
      ) {
        const message = errorMessagesByStatus[status]
          ? errorMessagesByStatus[status]
          : 'Something went wrong. Try again later.';

        next({
          type: 'ADD_NOTIFICATION',
          notification: {
            id: parseInt(Math.random().toString().split('.')[1], 10),
            duration: 7000,
            message,
            type: 'NOTIFICATION_TYPE_ERROR',
            canDismiss: true,
          },
        });
        return Promise.reject(next(action));
      }
    }
    return next(cloneAction);
  }
  return next(action);
};
