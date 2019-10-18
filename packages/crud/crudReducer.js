import cloneDeep from 'lodash.clonedeep';

const initialState = {
  isLoading: {}
};

export default (state = initialState, action) => {
  let nextState;

  if (action.type.includes('CRUD_ACTION_REQUEST')) {
    const crudName = action.split('_')[0];
    nextState = cloneDeep(state);
    nextState.isLoading[crudName] = true;
  }

  if (
    action.type.includes('CRUD_ACTION_SUCCESS') ||
    action.type.includes('CRUD_ACTION_FAILURE')
  ) {
    const crudName = action.type.split('_')[0];
    nextState = cloneDeep(state);
    nextState.isLoading[crudName] = false;
  }

  return nextState || state;
};
