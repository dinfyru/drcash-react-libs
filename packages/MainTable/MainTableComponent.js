import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import iOS from 'is-ios';

import TBody from './TBody/TBody';
import THead from './THead/THead';
import TTitle from './TTitle/TTitle';

import { addEvent, removeEvent, elemOffset } from '../../utils';
import TFoot from './TFoot/TFoot';

const mobileAndTabletcheck = () => {
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
const isMobileOrTablet = mobileAndTabletcheck();

class MainTableComponent extends Component {
  static defaultProps = {
    url: null,
    reducer: '',
    className: '',
    dataForRender: {},
    rerenderById: null,
    initFiltersValue: null,
    refreshTableOnPush: false,
    onInit: null,
    afterLineTemplate: null,
    tfootItem: null,
    tfootDataForRender: null,
    reloadItemsOnRequest: false,
    leftMenuWidth: 200,
    offsetHeight: 0,
    titleTemplate: null,
    disableLazyLoad: false,
    softSort: false,
    requiredFilterValues: [],
    visibleColumnsMiddleware: visibleColumns => visibleColumns,
    requiredFilterValuesMessage: 'Empty required filters',
    noDataContent: 'No data'
  };

  static propTypes = {
    url: PropTypes.string,
    id: PropTypes.string.isRequired,
    tableTemplate: PropTypes.array.isRequired,
    titleTemplate: PropTypes.array,
    reducer: PropTypes.string,
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
    dataForRender: PropTypes.object,
    rerenderById: PropTypes.number,
    offsetHeight: PropTypes.number,
    initFiltersValue: PropTypes.object,
    refreshTableOnPush: PropTypes.bool,
    listGet: PropTypes.func.isRequired,
    reloadItemsOnRequest: PropTypes.bool,
    saveTableScroll: PropTypes.func.isRequired,
    changeFiltersValue: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    onInit: PropTypes.func,
    softSort: PropTypes.bool,
    setItems: PropTypes.func.isRequired,
    afterLineTemplate: PropTypes.array,
    tfootItem: PropTypes.object,
    tfootDataForRender: PropTypes.object,
    leftMenuWidth: PropTypes.number,
    visibleColumnsMiddleware: PropTypes.func,
    requiredFilterValues: PropTypes.array,
    disableLazyLoad: PropTypes.bool,
    requiredFilterValuesMessage: PropTypes.string,
    noDataContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  constructor(props) {
    super(props);

    this.state = {
      colsCount: props.tableTemplate.length + 2,
      canDoRequest: !props.requiredFilterValues.length
    };

    this.table = {
      parent: React.createRef(),
      ttitle: React.createRef(),
      theadVisible: React.createRef(),
      theadHidden: React.createRef(),
      tbody: React.createRef(),
      tfoot: React.createRef(),
      tfootHidden: React.createRef()
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.url) return {};

    if (props.requiredFilterValues.length && !state.canDoRequest) {
      let canDoRequest = true;
      const { reducer, data, listGet, url, reloadItemsOnRequest } = props;
      const { filtersValue } = data[reducer];
      props.requiredFilterValues.forEach(el => {
        if (!filtersValue[el]) {
          canDoRequest = false;
        }
      });
      if (canDoRequest) {
        listGet(reducer, url, reloadItemsOnRequest);
      }

      return { canDoRequest };
    } else if (props.requiredFilterValues.length) {
      let canDoRequest = true;
      const { reducer, data } = props;
      const { filtersValue } = data[reducer];
      props.requiredFilterValues.forEach(el => {
        if (!filtersValue[el]) {
          canDoRequest = false;
        }
      });
      if (!canDoRequest) {
        return { canDoRequest };
      }
    }

    return {};
  }

  componentDidMount() {
    const { onInit } = this.props;

    if (typeof onInit === 'function') {
      onInit(this.getItems);
    }
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
      refreshTableOnPush,
      reloadItemsOnRequest
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
      if (this.state.canDoRequest && url) {
        listGet(reducer, url, reloadItemsOnRequest);
      }
    }

    const pageContent = document.getElementsByClassName('page__content');
    addEvent(window, 'resize', this.resizeTableColumns);
    addEvent(parent, 'scroll', this.scrollHeads);
    addEvent(window, 'scroll', this.scrollHeads);
    addEvent(document.body, 'scroll', this.scrollHeads);
    if (pageContent.length) {
      addEvent(pageContent[0], 'scroll', this.scrollHeads);
    }

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

    const pageContent = document.getElementsByClassName('page__content');
    saveTableScroll({ scrollTop, scrollLeft }, reducer);
    removeEvent(window, 'resize', this.resizeTableColumns);
    removeEvent(parent, 'scroll', this.scrollHeads);
    removeEvent(window, 'scroll', this.scrollHeads);
    removeEvent(document.body, 'scroll', this.scrollHeads);
    if (pageContent.length) {
      removeEvent(pageContent[0], 'scroll', this.scrollHeads);
    }
  }

  scrollHeads = () => {
    const {
      parent: { current: parent },
      theadVisible: { current: theadVisible },
      tfoot: { current: tfoot },
      ttitle: { current: ttitle }
    } = this.table;
    const {
      id,
      tfootItem,
      leftMenuWidth,
      titleTemplate,
      tfootOtherTemplate,
      offsetHeight,
      fixedFooter
    } = this.props;
    if (parent) {
      let left = leftMenuWidth - parent.scrollLeft;
      if (!iOS && !mobileAndTabletcheck()) {
        left -= document.body.scrollLeft || document.documentElement.scrollLeft;
      }
      theadVisible.style.left = `${left}px`;

      if (tfootItem || tfootOtherTemplate) {
        tfoot.style.left = `${left}px`;
        tfoot.style.width = `${parent.clientWidth + parent.scrollLeft}px`;
      }
      if (titleTemplate) {
        ttitle.style.left = `${left}px`;
        ttitle.style.width = `${parent.clientWidth + parent.scrollLeft}px`;
      }
    }

    const pageContent = document.getElementsByClassName('page__content');
    if (pageContent.length) {
      const {
        theadVisible: { current: theadVisible },
        ttitle: { current: ttitle }
      } = this.table;

      const tableFilter = document.getElementsByClassName('table__filters')[0];
      const switchPages = document.getElementsByClassName('switch__pages')[0];
      // get top table offset
      const tableFilterHeight = tableFilter ? tableFilter.offsetHeight : 0;
      let switchPagesHeight = switchPages ? switchPages.offsetHeight : 0;
      const titleHeight = ttitle ? ttitle.offsetHeight : 0;
      if (switchPagesHeight && !tableFilterHeight) {
        switchPagesHeight += 20;
      }
      const offsetTopThead = 61 + tableFilterHeight + switchPagesHeight;

      let topOffset = theadVisible.getAttribute('js-data-top');
      if (!topOffset) {
        const styles = window.getComputedStyle(theadVisible)
        topOffset = +styles.top.split('px')[0];
        theadVisible.setAttribute('js-data-top', topOffset);
      }
      this.addNewStyle(`.page__content #${id} .table__thead thead { top: ${offsetTopThead + titleHeight + offsetHeight - pageContent[0].scrollTop}px !important }`);
      // theadVisible.style.top = `${topOffset - pageContent[0].scrollTop}px !important`;

      if (tfoot && fixedFooter) {
        const offsetTopTable = 32 + tableFilterHeight + switchPagesHeight;
        tfoot.style.top = `${offsetTopTable + titleHeight + offsetHeight + parent.offsetHeight - pageContent[0].scrollTop - (parent.offsetHeight - parent.clientHeight)}px`;
        tfoot.style.bottom = 'initial';
      }
    }
  };

  addNewStyle = newStyle => {
    const { id } = this.props;
    let styleElement = document.getElementById(`${id}_js`);
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.id = `${id}_js`;
      document.getElementsByTagName('body')[0].appendChild(styleElement);
    }
    styleElement.innerHTML = newStyle;
  }

  resizeTableColumns = () => {
    const {
      data,
      reducer,
      tfootItem,
      tfootOtherTemplate,
      titleTemplate,
      disableLazyLoad,
      offsetHeight,
      fixedFooter
    } = this.props;
    const {
      [reducer]: { items, isLoading, isLastPage }
    } = data;

    const {
      parent: { current: parent },
      tbody: { current: tbody },
      theadHidden: { current: theadHidden },
      theadVisible: { current: theadVisible },
      tfoot: { current: tfoot },
      ttitle: { current: ttitle }
    } = this.table;

    const tableFilter = document.getElementsByClassName('table__filters')[0];
    const switchPages = document.getElementsByClassName('switch__pages')[0];
    // get top table offset
    const tableFilterHeight = tableFilter ? tableFilter.offsetHeight : 0;
    let switchPagesHeight = switchPages ? switchPages.offsetHeight : 0;
    const titleHeight = ttitle ? ttitle.offsetHeight : 0;
    if (switchPagesHeight && !tableFilterHeight) {
      switchPagesHeight += 20;
    }
    const offsetTopTable = 32 + tableFilterHeight + switchPagesHeight;
    const offsetTopThead = 61 + tableFilterHeight + switchPagesHeight;
    // const offsetTopTitle = titleHeight;
    parent.style.top = `${offsetTopTable + titleHeight + offsetHeight}px`;
    theadVisible.style.top = `${offsetTopThead + titleHeight + offsetHeight}px`;
    if (ttitle) {
      ttitle.style.top = `${offsetTopThead}px`;
    }

    if (
      (!isLoading && items.length) ||
      (isLoading && isLastPage === null) ||
      (!isLoading && (isLastPage === null || isLastPage === undefined)) ||
      (!isLoading && !items.length && isLastPage)
    ) {
      theadVisible.style.width = `${tbody.offsetWidth}px`;
      if (titleTemplate) {
        const html = document.getElementsByTagName('html')[0];
        ttitle.style.width = `${parent.clientWidth +
          parent.scrollLeft +
          html.scrollLeft}px`;
        // tfoot.style.bottom = `${parent.offsetHeight - parent.clientHeight}px`;
      }
      if (tfootItem || tfootOtherTemplate) {
        const pageContent = document.getElementsByClassName('page__content');
        const html = document.getElementsByTagName('html')[0];
        tfoot.style.width = `${parent.clientWidth +
          parent.scrollLeft +
          html.scrollLeft}px`;
        if (fixedFooter) {
          tfoot.style.top = `${offsetTopTable + titleHeight + offsetHeight + parent.offsetHeight - pageContent[0].scrollTop - (parent.offsetHeight - parent.clientHeight)}px`;
          tfoot.style.bottom = 'initial';
        } else {
          tfoot.style.bottom = `${parent.offsetHeight - parent.clientHeight}px`;
        }
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
        const footItems = tfoot.getElementsByTagName('td');
        for (let i = 0; i < targetItems.length; i += 1) {
          const width = Math.floor(targetItems[i].offsetWidth);
          footItems[i].style.width = `${width}px`;
        }
      }

      if (titleTemplate) {
        const widths = {};
        Array.prototype.forEach.call(targetItems, el => {
          const index = el.getAttribute('js-title-index');
          if (index) {
            if (!widths[index]) {
              widths[index] = 0;
            }
            widths[index] += +Math.floor(el.offsetWidth);
          }
        });
        Array.prototype.forEach.call(ttitle.getElementsByTagName('th'), (el, i) => {
          const index = el.getAttribute('js-title-index');
          let width = 0;
          if (!index) {
            if (i === 0) {
              width = +Math.floor(targetItems[i].offsetWidth);
            } else {
              width = +Math.floor(
                targetItems[targetItems.length - 1].offsetWidth
              );
            }
          } else {
            width = widths[index];
          }
          el.style.width = `${width}px`;
        });
      }
    }

    this.scrollHeads();
  };

  lazyLoad = () => {
    const { data, reducer, disableLazyLoad } = this.props;
    if (disableLazyLoad) return false;
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
    const { listGet, changeFiltersValue, reducer, url, data, reloadItemsOnRequest } = this.props;
    const {
      [reducer]: {
        filtersValue: { offset, limit },
        filtersValue
      }
    } = data;

    changeFiltersValue(params || { offset: offset + limit }, reducer);

    let canDoRequest = true;
    const newFilters = {
      ...cloneDeep(filtersValue),
      ...cloneDeep(params || {})
    };
    this.props.requiredFilterValues.forEach(el => {
      if (!newFilters[el]) {
        canDoRequest = false;
      }
    });
    if (!this.state.canDoRequest || !canDoRequest) return false;
    listGet(reducer, url, reloadItemsOnRequest);
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
      afterLineTemplate,
      tfootItem,
      tfootOtherTemplate,
      titleTemplate,
      visibleColumnsMiddleware,
      requiredFilterValuesMessage,
      noDataContent,
      setItems,
      softSort
    } = this.props;
    const {
      [reducer]: {
        isLoading,
        isLastPage,
        items,
        filtersValue,
        visibleColumns: originalVisibleColumns,
        blockedItems,
        subLineData: afterLineData
      }
    } = data;
    const { colsCount, canDoRequest } = this.state;
    const visibleColumns = visibleColumnsMiddleware(originalVisibleColumns);
    const isNoData = !items.length && isLastPage && !isLoading && canDoRequest;

    return (
      <div
        id={id}
        ref={this.table.parent}
        className={`table-list__parent ${className}${isNoData ? ' table__no-data' : ''}`}
        onWheel={this.lazyLoad}
        onTouchMove={this.lazyLoad}
      >
        {titleTemplate ? (
          <table className="table__title table-list">
            <TTitle
              setRef={this.table.ttitle}
              titleTemplate={titleTemplate}
              visibleColumns={visibleColumns}
            />
          </table>
        ) : (
          false
        )}
        <table className="table__thead table-list">
          <THead
            setRef={this.table.theadVisible}
            tableTemplate={tableTemplate}
            changeFiltersValue={changeFiltersValue}
            filtersValue={filtersValue}
            isLastPage={isLastPage}
            getItems={this.getItems}
            reducer={reducer}
            softSort={softSort}
            setItems={setItems}
            sortType={filtersValue.sort_type}
            sortBy={filtersValue.sort_by}
            visibleColumns={visibleColumns}
            dataForRender={cloneDeep(dataForRender)}
            items={cloneDeep(items)}
          />
        </table>
        <table className="table__tbody table-list">
          <THead
            setRef={this.table.theadHidden}
            changeFiltersValue={changeFiltersValue}
            tableTemplate={tableTemplate}
            titleTemplate={titleTemplate}
            filtersValue={filtersValue}
            isLastPage={isLastPage}
            getItems={this.getItems}
            reducer={reducer}
            softSort={softSort}
            setItems={setItems}
            isHidden
            sortType={filtersValue.sort_type}
            sortBy={filtersValue.sort_by}
            visibleColumns={visibleColumns}
            dataForRender={cloneDeep(dataForRender)}
            items={cloneDeep(items)}
          />
          <tbody ref={this.table.tbody}>
            {!canDoRequest ? (
              <tr className="no-border">
                <td colSpan={colsCount}>
                  <span className="no-data">{requiredFilterValuesMessage}</span>
                </td>
              </tr>
            ) : (
              <TBody
                items={cloneDeep(items)}
                tableTemplate={tableTemplate}
                titleTemplate={titleTemplate}
                rerenderById={rerenderById}
                dataForRender={cloneDeep(dataForRender)}
                visibleColumns={visibleColumns}
                afterLineTemplate={afterLineTemplate}
                afterLineData={afterLineData}
                blockedItems={blockedItems}
                refs={this.table}
              />
            )}
            {isNoData ? (
              <tr className="no-border">
                <td colSpan={colsCount}>
                  <span className="no-data">{noDataContent}</span>
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
              dataForRender={cloneDeep(dataForRender)}
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
              dataForRender={cloneDeep(dataForRender)}
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

export default MainTableComponent;
