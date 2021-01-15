import cloneDeep from 'lodash.clonedeep';

import { getCookie } from '../../utils';

const RSAA = '@@redux-api-middleware/RSAA';
const listRegexp = /^LIST_(.*)_REQUEST$/;

export default (tokenName = 'dr-pa-token') => store => next => action => {
  if (action.isCrud) {
    const newAction = cloneDeep(action);
    delete newAction.isCrud;

    // stop request for list if is loading
    if (listRegexp.test(action[RSAA].types[0])) {
      const {
        [action.reducer]: { isLoading }
      } = store.getState();
      if (isLoading) {
        return false;
      }

      delete newAction.reducer;
    }

    if (
      newAction[RSAA].body &&
      newAction[RSAA].headers['Content-Type'] === 'application/json' &&
      typeof newAction[RSAA].body !== 'string' /* fix */
    ) {
      newAction[RSAA].body = JSON.stringify(newAction[RSAA].body);
    }

    if (action.needToken) {
      newAction[RSAA].headers.Authorization = `Bearer ${getCookie(tokenName)}`;
      delete newAction.needToken;
    }

    return next(newAction);
  }

  return next(action);
};
