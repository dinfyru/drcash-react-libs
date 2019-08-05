import cloneDeep from 'lodash.clonedeep';

import {
  MT_CHANGE_FILTERS_VALUE,
  MT_DISABLE_ITEM_SWITCHER,
  MT_LIST_AUTO_UPDATE_ITEM,
  MT_LIST_REMOVE_ITEM,
  MT_LIST_UPDATE_ITEMS,
  MT_SAVE_TABLE_SCROLL,
  MT_UPDATE_VISIBLE_COLUMNS
} from './mainTableActions';

const REQUEST_LIST_REGEXP = /^MT_LIST@(.+)_REQUEST$/;
const SUCCESS_LIST_REGEXP = /^MT_LIST@(.+)_SUCCESS$/;
const FAILURE_LIST_REGEXP = /^MT_LIST@(.+)_FAILURE$/;

const SUCCESS_FILTERS_DATA_REGEXP = /^MT_FILTERS_DATA@(.+)_SUCCESS$/;

const tableExample = {
  items: [],
  isLastPage: null,
  isLoading: false,
  scroll: {},
  filtersValue: {},
  blockedItems: []
};
const initialState = {
  filtersData: {}
};

const reducer = (state = initialState, action) => {
  let nextState;

  if (action.type === MT_LIST_REMOVE_ITEM) {
    const { id, reducer } = action;
    let items = cloneDeep(state[reducer].items);
    items = items.map(partItems => {
      const newPartItems = cloneDeep(partItems);
      const index = newPartItems.findIndex(elem => elem.id === id);
      if (index >= 0) {
        delete newPartItems[index];
      }
      return newPartItems.filter(elem => Boolean(elem));
    });
    items = items
      .filter(el => Array.isArray(el) && el.length)
      .filter(el => Boolean(el));

    nextState = cloneDeep(state);
    nextState[reducer].items = items;
  }

  if (action.type === MT_LIST_AUTO_UPDATE_ITEM) {
    const {
      item,
      item: { id },
      reducer
    } = action;
    let items = cloneDeep(state[reducer].items);
    items = items.map(partItems => {
      const newPartItems = cloneDeep(partItems);
      const index = newPartItems.findIndex(elem => elem.id === id);
      if (index >= 0) {
        newPartItems[index] = item;
      }
      return newPartItems;
    });
    nextState = cloneDeep(state);
    nextState[reducer].items = items;
  }

  if (action.type === MT_SAVE_TABLE_SCROLL) {
    const { reducer, scroll } = action;
    const prevState = cloneDeep(state);
    nextState = {
      ...prevState,
      [reducer]: {
        ...prevState[reducer],
        scroll
      }
    };
  }

  if (action.type === MT_CHANGE_FILTERS_VALUE) {
    const { reducer, data } = action;
    const prevState = cloneDeep(state);
    const props = {
      ...prevState[reducer],
      filtersValue: { ...prevState[reducer].filtersValue, ...data }
    };
    Object.entries(props.filtersValue).forEach(([key, value]) => {
      if (value === false || value === undefined) {
        delete props.filtersValue[key];
      }
    });

    if (data.offset === 0) {
      props.items = [];
    }
    nextState = {
      ...state,
      [action.reducer]: props
    };
  }

  // filters data request
  if (SUCCESS_FILTERS_DATA_REGEXP.test(action.type)) {
    const reducer = action.type.match(SUCCESS_FILTERS_DATA_REGEXP)[1];
    if (action.payload.status === 'OK') {
      const {
        payload: { items }
      } = action.payload;

      nextState = cloneDeep(state);
      nextState.filtersData[reducer] = items;
    }
  }

  if (action.type === MT_DISABLE_ITEM_SWITCHER) {
    const { data, reducer, byIndex } = action;
    nextState = cloneDeep(state);
    if (!byIndex) {
      Object.keys(data).forEach(id => {
        const val = data[id];
        if (!val) {
          const index = nextState[reducer].blockedItems.indexOf(id);
          if (index >= 0) {
            delete nextState[reducer].blockedItems[index];
          }
        } else {
          const index = nextState[reducer].blockedItems.indexOf(id);
          if (index < 0) {
            nextState[reducer].blockedItems.push(id);
          }
        }
      });
    }
    nextState[reducer].blockedItems = nextState[reducer].blockedItems.filter(
      elem => elem
    );
  }

  // table request
  if (REQUEST_LIST_REGEXP.test(action.type)) {
    const reducer = action.type.match(REQUEST_LIST_REGEXP)[1];
    nextState = cloneDeep(state);
    nextState[reducer].isLoading = true;
  }
  if (SUCCESS_LIST_REGEXP.test(action.type)) {
    const reducer = action.type.match(SUCCESS_LIST_REGEXP)[1];
    if (action.payload.status === 'OK') {
      const {
        payload: { items },
        _meta: { is_last_page: isLastPage, total }
      } = action.payload;

      nextState = cloneDeep(state);
      nextState[reducer].isLoading = false;
      nextState[reducer].isLastPage = isLastPage;
      nextState[reducer].total = total;

      if (items.length) {
        nextState[reducer].items = [...nextState[reducer].items, items];
      }
    }
  }
  if (FAILURE_LIST_REGEXP.test(action.type)) {
    const reducer = action.type.match(FAILURE_LIST_REGEXP)[1];
    nextState = cloneDeep(state);
    nextState[reducer].isLoading = false;
    nextState[reducer].isLastPage = true;
  }

  if (action.type === MT_LIST_UPDATE_ITEMS) {
    const { items, reducer } = action;

    nextState = cloneDeep(state);
    nextState[reducer].items = items;
  }

  if (action.type === MT_UPDATE_VISIBLE_COLUMNS) {
    const { data, reducer } = action;

    nextState = cloneDeep(state);
    nextState[reducer].visibleColumns = data;
  }

  // return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default (tableNames = []) => {
  tableNames.forEach(tableName => {
    initialState[tableName] = cloneDeep(tableExample);
  });

  return reducer;
};
