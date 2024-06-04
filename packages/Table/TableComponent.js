import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce-promise';

import THead from './THead/THead';
import TBody from './TBody/TBody';
import TFoot from './TFoot/TFoot';
import { elemOffset } from '../../utils';
import cloneDeep from 'lodash.clonedeep';

const TableComponent = (props) => {
  const tableRefs = {
    parent: useRef(null),
    tbody: React.createRef(),
    tfoot: React.createRef(),
  };

  const {
    template,
    reducer,
    id,
    url,
    data,
    onInit,
    refreshTableOnPush,
    saveTableInitFilters,
    initFiltersValue,
    tfootItem,
    visibleColumnsMiddleware,
    messages,
    disableLazyLoad,
    titleTemplate,
    dataForRender,
  } = props;

  const {
    [reducer]: {
      isLoading,
      isLastPage,
      items,
      visibleColumns: originalVisibleColumns,
      blockedItems,
      filtersValue,
      action,
    },
  } = data;
  const visibleColumns = visibleColumnsMiddleware(originalVisibleColumns);

  const [firstLoad, setFirstLoad] = useState(true);

  const getItems = (params, urlProps) => {
    const { listGet, changeFiltersValue } = props;
    const {
      [reducer]: {
        filtersValue: { offset, limit },
      },
    } = data;

    changeFiltersValue(params || { offset: offset + limit }, reducer);

    listGet(reducer, urlProps || url);
  };

  useEffect(() => {
    const debounceGetItems = debounce(getItems, 500);
    onInit({
      getItems,
      debounceGetItems,
    });
    const {
      listGet,
      changeFiltersValue,
      history: { action },
    } = props;

    if (initFiltersValue) {
      saveTableInitFilters(cloneDeep(initFiltersValue), reducer);
    }

    if (initFiltersValue) {
      if (
        !Object.keys(data[reducer].filtersValue).length ||
        (refreshTableOnPush && (action === 'PUSH' || action === 'POP'))
      ) {
        changeFiltersValue(initFiltersValue, reducer, firstLoad);
        setFirstLoad(false);
      }
    }
    // init get items for table
    if (
      (refreshTableOnPush && (action === 'PUSH' || action === 'POP')) ||
      (!data[reducer].items.length && data[reducer].isLastPage === null)
    ) {
      if (url) {
        listGet(reducer, url);
      }
    }

    return () => {
      changeFiltersValue(initFiltersValue, reducer, true);
    };
  }, []);

  const lazyLoad = () => {
    if (disableLazyLoad || isLastPage || isLoading) return false;

    const { current: parent } = tableRefs.parent;
    const { current: tbody } = tableRefs.tbody;

    const maxScrollTop = tbody.offsetHeight - parent.offsetHeight;
    const currentScrollTop = Math.abs(
      elemOffset(tbody).top - elemOffset(parent).top,
    );
    const documentHalfHeight =
      document.getElementsByTagName('html')[0].offsetHeight / 2;

    if (maxScrollTop - documentHalfHeight < currentScrollTop) {
      getItems();
    }
  };

  const filteredTemplate = useMemo(() => {
    if (!visibleColumns) return template;
    return template.filter((item, index) => visibleColumns[index]);
  }, [visibleColumns, dataForRender]);

  return (
    <div
      ref={tableRefs.parent}
      className="dr-table"
      id={id || reducer}
      onWheel={lazyLoad}
      onTouchMove={lazyLoad}
    >
      {isLoading && action !== 'next-page' && (
        <div className="dr-table__loading">
          <span />
        </div>
      )}
      <table>
        <THead
          template={filteredTemplate}
          titleTemplate={titleTemplate}
          visibleColumns={visibleColumns}
          getItems={getItems}
          reducer={reducer}
          filtersValue={filtersValue}
        />
        <TBody
          template={filteredTemplate}
          items={items}
          tableRefs={tableRefs}
          forwardedRef={tableRefs.tbody}
          messages={messages}
          isLoading={isLoading}
          blockedItems={blockedItems}
        />
        <TFoot
          tfootItem={tfootItem}
          template={filteredTemplate}
          forwardedRef={tableRefs.tfoot}
        />
      </table>
    </div>
  );
};

TableComponent.defaultProps = {
  id: null,
  titleTemplate: [],
  reducer: '',
  onInit: () => {},
  tfootItem: null,
  initFiltersValue: null,
  visibleColumnsMiddleware: (visibleColumns) => visibleColumns,
  refreshTableOnPush: false,
  disableLazyLoad: false,
  dataForRender: null,
  messages: {
    noDataContent: 'No content',
  },
};

TableComponent.propTypes = {
  url: PropTypes.string,
  id: PropTypes.string,
  dataForRender: PropTypes.object,
  template: PropTypes.array.isRequired,
  titleTemplate: PropTypes.array,
  reducer: PropTypes.string,
  onInit: PropTypes.func,
  visibleColumnsMiddleware: PropTypes.func,
  data: PropTypes.object.isRequired,
  tfootItem: PropTypes.object,
  initFiltersValue: PropTypes.object,
  refreshTableOnPush: PropTypes.bool,
  saveTableInitFilters: PropTypes.func.isRequired,
  disableLazyLoad: PropTypes.bool,
  listGet: PropTypes.func.isRequired,
  changeFiltersValue: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

export default TableComponent;
