import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import THead from './THead/THead';
import TBody from './TBody/TBody';
import TFoot from './TFoot/TFoot';
import { elemOffset } from '../../utils';
import debounce from 'debounce-promise';

const TableComponent = (props) => {
  const tableRefs = {
    parent: useRef(null),
    tbody: React.createRef(),
    tfoot: React.createRef()
  };

  const {
    template,
    reducer,
    id,
    url,
    data,
    onInit,
    refreshTableOnPush,
    initFiltersValue,
    tfootItem,
    messages
  } = props;

  const {
    [reducer]: {
      isLoading,
      isLastPage,
      items,
      blockedItems,
      filtersValue
    }
  } = data;

  const getItems = params => {
    const {
      listGet,
      changeFiltersValue
    } = props;
    const {
      [reducer]: {
        filtersValue: {
          offset,
          limit
        }
      }
    } = data;

    changeFiltersValue(params || { offset: offset + limit }, reducer);

    listGet(
      reducer,
      url
    );
  };

  const debounceGetItems = debounce(getItems, 500);

  useEffect(() => {
    onInit({ getItems, debounceGetItems });
    const {
      listGet,
      changeFiltersValue,
      history: { action }
    } = props;

    if (initFiltersValue) {
      if (
        !Object.keys(data[reducer].filtersValue).length ||
        (refreshTableOnPush && action === 'PUSH')
      ) {
        changeFiltersValue(initFiltersValue, reducer);
      }
    }
    // init get items for table
    if (
      (refreshTableOnPush && action === 'PUSH') ||
      (!data[reducer].items.length && data[reducer].isLastPage === null)
    ) {
      if (url) {
        listGet(
          reducer,
          url
        );
      }
    }
  }, []);


  const lazyLoad = () => {
    if (isLastPage || isLoading) return false;

    const { current: parent } = tableRefs.parent;
    const { current: tbody } = tableRefs.tbody;

    const maxScrollTop = tbody.offsetHeight - parent.offsetHeight;
    const currentScrollTop = Math.abs(
      elemOffset(tbody).top - elemOffset(parent).top
    );
    const documentHalfHeight =
      document.getElementsByTagName('html')[0].offsetHeight / 2;

    if (maxScrollTop - documentHalfHeight < currentScrollTop) {
      getItems();
    }
  };

  return (
    <div
      ref={tableRefs.parent}
      className="dr-table"
      id={id || reducer}
      onWheel={lazyLoad}
      onTouchMove={lazyLoad}
    >
      <table>
        <THead template={template} />
        <TFoot tfootItem={tfootItem} template={template} forwardedRef={tableRefs.tfoot} />
        <TBody
          template={template}
          items={items}
          tableRefs={tableRefs}
          forwardedRef={tableRefs.tbody}
          messages={messages}
          isLoading={isLoading}
          blockedItems={blockedItems}
        />
      </table>
    </div>
  );
};

TableComponent.defaultProps = {
  id: null,
  url: null,
  reducer: '',
  onInit: () => {},
  initFiltersValue: null,
  refreshTableOnPush: false,
  messages: {
    noDataContent: 'No content'
  }
};

TableComponent.propTypes = {
  url: PropTypes.string,
  id: PropTypes.string,
  template: PropTypes.array.isRequired,
  reducer: PropTypes.string,
  onInit: PropTypes.func,
  data: PropTypes.object.isRequired,
  initFiltersValue: PropTypes.object,
  refreshTableOnPush: PropTypes.bool,
  listGet: PropTypes.func.isRequired,
  changeFiltersValue: PropTypes.func.isRequired,
  messages: PropTypes.object
};

export default TableComponent;
