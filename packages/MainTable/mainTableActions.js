import queryBuilder from 'query-string';

const RSAA = '@@redux-api-middleware/RSAA';

export const MT_SAVE_TABLE_SCROLL = 'MT_SAVE_TABLE_SCROLL';
const saveTableScrollAction = (scroll, reducer) => ({
  type: MT_SAVE_TABLE_SCROLL,
  scroll,
  reducer
});

export const MT_CHANGE_FILTERS_VALUE = 'MT_CHANGE_FILTERS_VALUE';
const changeFiltersValueAction = (data, reducer) => ({
  type: MT_CHANGE_FILTERS_VALUE,
  data,
  reducer
});

export const MT_UPDATE_VISIBLE_COLUMNS = 'MT_UPDATE_VISIBLE_COLUMNS';
const updateVisibleColumnsAction = (data, reducer) => ({
  type: MT_UPDATE_VISIBLE_COLUMNS,
  data,
  reducer
});

const listGetAction = (reducer, url) => ({
  needToken: true,
  reducer,
  [RSAA]: {
    endpoint: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    types: [
      `MT_LIST@${reducer}_REQUEST`,
      `MT_LIST@${reducer}_SUCCESS`,
      `MT_LIST@${reducer}_FAILURE`
    ]
  }
});

export const MT_LIST_UPDATE_ITEMS = 'MT_LIST_UPDATE_ITEMS';
const MTupdateItemsAction = (items, reducer) => ({
  type: MT_LIST_UPDATE_ITEMS,
  items,
  reducer
});

export const MT_LIST_AUTO_UPDATE_ITEM = 'MT_LIST_AUTO_UPDATE_ITEM';
const MTautoUpdateItemAction = (item, reducer) => ({
  type: MT_LIST_AUTO_UPDATE_ITEM,
  item,
  reducer
});

export const MT_LIST_AUTO_UPDATE_ITEMS = 'MT_LIST_AUTO_UPDATE_ITEMS';
export const MTautoUpdateItems = (items, reducer) => ({
  type: MT_LIST_AUTO_UPDATE_ITEMS,
  items,
  reducer
});

export const MT_LIST_REMOVE_ITEM = 'MT_LIST_REMOVE_ITEM';
const MTlistRemoveItemAction = (id, reducer, key) => ({
  type: MT_LIST_REMOVE_ITEM,
  id,
  reducer,
  key
});

const filtersDataGetAction = (reducer, url, params) => {
  const query = queryBuilder.stringify(params);
  const endpoint = `${url}${query && query.length ? `?${query}` : ''}`;
  return {
    needToken: true,
    [RSAA]: {
      endpoint: params ? `${url}?${endpoint}` : url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      types: [
        `MT_FILTERS_DATA@${reducer}_REQUEST`,
        `MT_FILTERS_DATA@${reducer}_SUCCESS`,
        `MT_FILTERS_DATA@${reducer}_FAILURE`
      ]
    }
  };
};

export const MT_DISABLE_ITEM_SWITCHER = 'MT_DISABLE_ITEM_SWITCH';
const disableItemSwitcherAction = (data, reducer, byIndex) => ({
  type: MT_DISABLE_ITEM_SWITCHER,
  data,
  reducer,
  byIndex
});

export const MTsaveTableScroll = (scroll, reducer) => dispatch =>
  dispatch(saveTableScrollAction(scroll, reducer));
export const MTchangeFiltersValue = (data, reducer) => dispatch =>
  dispatch(changeFiltersValueAction(data, reducer));
export const MTlistGet = (reducer, url) => dispatch =>
  dispatch(listGetAction(reducer, url));
export const MTfiltersDataGet = (reducer, url, params) => dispatch =>
  dispatch(filtersDataGetAction(reducer, url, params));
export const MTupdateItems = (items, reducer) => dispatch =>
  dispatch(MTupdateItemsAction(items, reducer));
export const MTupdateVisibleColumns = (data, reducer) => dispatch =>
  dispatch(updateVisibleColumnsAction(data, reducer));
export const MTautoUpdateItem = (item, reducer) => dispatch =>
  dispatch(MTautoUpdateItemAction(item, reducer));
export const MTlistRemoveItem = (id, reducer) => dispatch =>
  dispatch(MTlistRemoveItemAction(id, reducer));
export const MTdisableItemSwitcher = (data, reducer, byIndex) => dispatch =>
  dispatch(disableItemSwitcherAction(data, reducer, byIndex));
