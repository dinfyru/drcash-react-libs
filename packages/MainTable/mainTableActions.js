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

export const MT_GET_SUBLINE_DATA_REQUEST = 'MT_GET_SUBLINE_DATA_REQUEST';
export const MT_GET_SUBLINE_DATA_SUCCESS = 'MT_GET_SUBLINE_DATA_SUCCESS';
export const MT_GET_SUBLINE_DATA_FAILURE = 'MT_GET_SUBLINE_DATA_FAILURE';
export const MTgetSubLineData = ({
  id,
  subLineKey = 'id',
  query = {},
  url,
  reducer
}) => dispatch => {
  const queryString = queryBuilder.stringify({ ...query, [subLineKey]: id });
  let endpoint = url;
  if (queryString.length) {
    endpoint = `${endpoint}?${queryString}`;
  }
  return dispatch({
    needToken: true,
    [RSAA]: {
      endpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      types: [
        {
          type: MT_GET_SUBLINE_DATA_REQUEST,
          meta: { reducer, subLineKey, id }
        },
        {
          type: MT_GET_SUBLINE_DATA_SUCCESS,
          meta: { reducer, subLineKey, id }
        },
        {
          type: MT_GET_SUBLINE_DATA_FAILURE,
          meta: { reducer, subLineKey, id }
        }
      ]
    }
  });
};
export const MT_REMOVE_SUBLINE_DATA = 'MT_REMOVE_SUBLINE_DATA';
export const MTremoveSubLineData = ({ id, reducer }) => dispatch =>
  dispatch({ type: MT_REMOVE_SUBLINE_DATA, id, reducer });

export const MT_LIST_UPDATE_ITEMS = 'MT_LIST_UPDATE_ITEMS';
const MTupdateItemsAction = (items, reducer) => ({
  type: MT_LIST_UPDATE_ITEMS,
  items,
  reducer
});

export const MT_LIST_AUTO_UPDATE_ITEM = 'MT_LIST_AUTO_UPDATE_ITEM';
const MTautoUpdateItemAction = (item, reducer, key) => ({
  type: MT_LIST_AUTO_UPDATE_ITEM,
  item,
  reducer,
  key
});

export const MT_LIST_AUTO_UPDATE_ITEMS = 'MT_LIST_AUTO_UPDATE_ITEMS';
export const MTautoUpdateItems = (items, reducer) => ({
  type: MT_LIST_AUTO_UPDATE_ITEMS,
  items,
  reducer
});

export const MT_LIST_REMOVE_ITEM = 'MT_LIST_REMOVE_ITEM';
const MTlistRemoveItemAction = (id, reducer, key = 'id') => ({
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
      endpoint,
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
export const MTfiltersDataGet = (reducer, url, params) => dispatch =>
  dispatch(filtersDataGetAction(reducer, url, params));
export const MTupdateItems = (items, reducer) => dispatch =>
  dispatch(MTupdateItemsAction(items, reducer));
export const MTupdateVisibleColumns = (data, reducer) => dispatch =>
  dispatch(updateVisibleColumnsAction(data, reducer));
export const MTautoUpdateItem = (item, reducer, key) => dispatch =>
  dispatch(MTautoUpdateItemAction(item, reducer, key));
export const MTlistRemoveItem = (id, reducer, key) => dispatch =>
  dispatch(MTlistRemoveItemAction(id, reducer, key));
export const MTdisableItemSwitcher = (data, reducer, byIndex) => dispatch =>
  dispatch(disableItemSwitcherAction(data, reducer, byIndex));
