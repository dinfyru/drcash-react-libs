import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

import TBody from './TBody/TBody';
import THead from './THead/THead';

import { addEvent, removeEvent, elemOffset } from './utils';
import TFoot from './TFoot/TFoot';

class MainTable extends Component {
  static defaultProps = {
    reducer: '',
    className: '',
    dataForRender: {},
    rerenderById: null,
    initFiltersValue: null,
    refreshTableOnPush: false,
    onInit: null,
    afterLineTemplate: null,
    afterLineData: null,
    tfootItem: null,
    tfootDataForRender: null,
    leftMenuWidth: 200
  };

  static propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tableTemplate: PropTypes.array.isRequired,
    reducer: PropTypes.string,
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
    dataForRender: PropTypes.object,
    rerenderById: PropTypes.number,
    initFiltersValue: PropTypes.object,
    refreshTableOnPush: PropTypes.bool,
    listGet: PropTypes.func.isRequired,
    saveTableScroll: PropTypes.func.isRequired,
    changeFiltersValue: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    onInit: PropTypes.func,
    afterLineTemplate: PropTypes.array,
    afterLineData: PropTypes.object,
    tfootItem: PropTypes.object,
    tfootDataForRender: PropTypes.object,
    leftMenuWidth: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      colsCount: props.tableTemplate.length + 2
    };

    this.table = {
      parent: React.createRef(),
      theadVisible: React.createRef(),
      theadHidden: React.createRef(),
      tbody: React.createRef(),
      tfoot: React.createRef(),
      tfootHidden: React.createRef()
    };
  }

  componentWillMount() {
    const { onInit } = this.props;

    if (typeof onInit === 'function') {
      onInit(this.getItems);
    }
  }

  componentDidMount() {
    const {
      parent: { current: parent }
    } = this.table;
    const {
      reducer,
      listGet,
      url,
      data,
      history: { action },
      initFiltersValue,
      changeFiltersValue,
      refreshTableOnPush
    } = this.props;

    // init filtersValue for first request
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
      listGet(reducer, url);
    }

    addEvent(window, 'resize', this.resizeTableColumns);
    addEvent(parent, 'scroll', this.scrollHeads);
    addEvent(window, 'scroll', this.scrollHeads);

    this.resizeTableColumns();
    const {
      [reducer]: { items, scroll }
    } = data;

    if (scroll) {
      const { scrollLeft, scrollTop } = scroll;
      if (items.length && (scrollTop || scrollLeft)) {
        this.table.parent.current.scrollTo(scrollLeft, scrollTop);
      }
    }
  }

  componentDidUpdate() {
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
  }

  componentWillUnmount() {
    const {
      parent: {
        current: parent,
        current: { scrollTop, scrollLeft }
      }
    } = this.table;
    const { saveTableScroll, reducer } = this.props;
    const html = document.getElementsByTagName('html')[0];

    saveTableScroll({ scrollTop, scrollLeft }, reducer);
    removeEvent(window, 'resize', this.resizeTableColumns);
    removeEvent(parent, 'scroll', this.scrollHeads);
    removeEvent(html, 'scroll', this.scrollHeads);
  }

  scrollHeads = () => {
    const {
      parent: { current: parent },
      theadVisible: { current: theadVisible },
      tfoot: { current: tfoot }
    } = this.table;
    const { tfootItem, leftMenuWidth } = this.props;

    const html = document.getElementsByTagName('html')[0];
    const left = leftMenuWidth - parent.scrollLeft - html.scrollLeft;
    theadVisible.style.left = `${left}px`;

    if (tfootItem) {
      tfoot.style.left = `${left}px`;
      tfoot.style.width = `${parent.clientWidth + parent.scrollLeft}px`;
    }
  };

  resizeTableColumns = () => {
    const { data, reducer, tfootItem, tfootOtherTemplate } = this.props;
    const {
      [reducer]: { items, isLoading, isLastPage }
    } = data;

    const {
      parent: { current: parent },
      tbody: { current: tbody },
      theadHidden: { current: theadHidden },
      theadVisible: { current: theadVisible },
      tfoot: { current: tfoot }
    } = this.table;

    const tableFilter = document.getElementsByClassName(
      'table__filters'
    )[0];
    const switchPages = document.getElementsByClassName(
      'switch__pages'
    )[0];
    // get top table offset
    const tableFilterHeight = tableFilter ? tableFilter.offsetHeight : 0;
    const switchPagesHeight = switchPages ? switchPages.offsetHeight + 20 : 0;
    const offsetTopTable = 32 + tableFilterHeight + switchPagesHeight;
    const offsetTopThead = 61 + tableFilterHeight + switchPagesHeight;
    parent.style.top = `${offsetTopTable}px`;
    theadVisible.style.top = `${offsetTopThead}px`;

    // // get bottom table offset
    // if (tfootItem) {
    //   const tfootHeight = tfoot.offsetHeight;
    //   parent.style.bottom = `${tfootHeight}px`;
    // }

    if (
      (!isLoading && items.length) ||
      (isLoading && isLastPage === null) ||
      (!isLoading && isLastPage === null) ||
      (!isLoading && !items.length && isLastPage)
    ) {
      theadVisible.style.width = `${tbody.offsetWidth}px`;
      if (tfootItem || tfootOtherTemplate) {
        const html = document.getElementsByTagName('html')[0];
        tfoot.style.width = `${parent.clientWidth +
          parent.scrollLeft +
          html.scrollLeft}px`;
        tfoot.style.bottom = `${parent.offsetHeight - parent.clientHeight}px`;
      }

      let targetLine;
      let targetItem;
      if (items.length) {
        targetItem = 'td';
        targetLine = tbody.getElementsByTagName('tr');
      } else {
        targetItem = 'th';
        targetLine = theadHidden.getElementsByTagName('tr');
      }

      const targetItems = targetLine[0].getElementsByTagName(targetItem);
      const setHeightItems = theadVisible.getElementsByTagName('th');
      for (let i = 0; i < targetItems.length; i += 1) {
        const width = Math.floor(targetItems[i].offsetWidth);
        setHeightItems[i].style.width = `${width}px`;
      }
      if (tfootItem && !tfoot.getElementsByClassName('no-border').length) {
        const footItems = document
          .getElementById('tfoot-data')
          .getElementsByTagName('td');
        for (let i = 0; i < targetItems.length; i += 1) {
          const width = Math.floor(targetItems[i].offsetWidth);
          footItems[i].style.width = `${width}px`;
        }
      }
    }

    this.scrollHeads();
  };

  lazyLoad = () => {
    const { data, reducer } = this.props;
    const {
      [reducer]: { isLastPage, isLoading }
    } = data;
    if (isLastPage || isLoading) return false;

    const { current: parent } = this.table.parent;
    const { current: tbody } = this.table.tbody;

    const maxScrollTop = tbody.offsetHeight - parent.offsetHeight;
    const currentScrollTop = Math.abs(
      elemOffset(tbody).top - elemOffset(parent).top
    );
    const documentHalfHeight =
      document.getElementsByTagName('html')[0].offsetHeight / 2;

    if (maxScrollTop - documentHalfHeight < currentScrollTop) {
      this.getItems();
    }
  };

  getItems = params => {
    const { listGet, changeFiltersValue, reducer, url, data } = this.props;
    const {
      [reducer]: {
        filtersValue: { offset, limit }
      }
    } = data;

    changeFiltersValue(params || { offset: offset + limit }, reducer);
    listGet(reducer, url);
  };

  render() {
    const {
      id,
      className,
      data,
      tableTemplate,
      reducer,
      changeFiltersValue,
      dataForRender,
      rerenderById,
      afterLineData,
      afterLineTemplate,
      tfootItem,
      tfootOtherTemplate
    } = this.props;
    const {
      [reducer]: {
        isLoading,
        isLastPage,
        items,
        filtersValue,
        visibleColumns,
        blockedItems
      }
    } = data;
    const { colsCount } = this.state;

    return (
      <div
        id={id}
        ref={this.table.parent}
        className={`table-list__parent ${className}`}
        onWheel={this.lazyLoad}
        onTouchMove={this.lazyLoad}
      >
        <table className="table__thead table-list">
          <THead
            setRef={this.table.theadVisible}
            tableTemplate={tableTemplate}
            changeFiltersValue={changeFiltersValue}
            filtersValue={filtersValue}
            isLastPage={isLastPage}
            getItems={this.getItems}
            reducer={reducer}
            sortType={filtersValue.sort_type}
            sortBy={filtersValue.sort_by}
            visibleColumns={visibleColumns}
          />
        </table>
        <table className="table__tbody table-list">
          <THead
            setRef={this.table.theadHidden}
            tableTemplate={tableTemplate}
            filtersValue={filtersValue}
            isLastPage={isLastPage}
            getItems={this.getItems}
            reducer={reducer}
            isHidden
            sortType={filtersValue.sort_type}
            sortBy={filtersValue.sort_by}
            visibleColumns={visibleColumns}
          />
          <tbody ref={this.table.tbody}>
            <TBody
              items={cloneDeep(items)}
              tableTemplate={tableTemplate}
              rerenderById={rerenderById}
              dataForRender={cloneDeep(dataForRender)}
              visibleColumns={visibleColumns}
              afterLineTemplate={afterLineTemplate}
              afterLineData={afterLineData}
              blockedItems={blockedItems}
              refs={this.table}
            />

            {!items.length && isLastPage && !isLoading ? (
              <tr className="no-border">
                <td colSpan={colsCount}>
                  <span className="no-data">No data</span>
                </td>
              </tr>
            ) : (
              false
            )}
            {isLoading ? (
              <tr className="no-border">
                <td colSpan={colsCount}>
                  <span className="loading">
                    <span />
                  </span>
                </td>
              </tr>
            ) : (
              false
            )}
          </tbody>
          {tfootItem ? (
            <TFoot
              tableTemplate={tableTemplate}
              tfootItem={tfootItem}
              isHidden
              setRef={this.table.tfootHidden}
              visibleColumns={visibleColumns}
            />
          ) : (
            false
          )}
        </table>
        {tfootItem || tfootOtherTemplate ? (
          <table className="table__thead table-list">
            <TFoot
              tableTemplate={tableTemplate}
              tfootItem={tfootItem}
              items={cloneDeep(items)}
              tfootDataForRender={this.props.tfootDataForRender}
              tfootOtherTemplate={this.props.tfootOtherTemplate}
              setRef={this.table.tfoot}
              visibleColumns={visibleColumns}
            />
          </table>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default MainTable;
