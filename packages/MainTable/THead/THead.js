import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

const ORDER_BY_DESC = 'DESC';
const ORDER_BY_ASC = 'ASC';

export default class THead extends Component {
  static defaultProps = {
    getItems: () => {
      console.log('not imported function "getItems"');
    },
    reducer: '',
    filtersValue: {},
    sortType: null,
    sortBy: null,
    isHidden: false,
    softSort: false,
    visibleColumns: null
  };

  static propTypes = {
    tableTemplate: PropTypes.array.isRequired,
    reducer: PropTypes.string,
    getItems: PropTypes.func,
    filtersValue: PropTypes.object,
    sortType: PropTypes.string,
    sortBy: PropTypes.string,
    isHidden: PropTypes.bool,
    setRef: PropTypes.object.isRequired,
    changeFiltersValue: PropTypes.func.isRequired,
    setItems: PropTypes.func.isRequired,
    softSort: PropTypes.bool,
    visibleColumns: PropTypes.array
  };

  shouldComponentUpdate(nextProps) {
    const { props } = this;

    const itemsNotEqual =
      JSON.stringify(props.items) !== JSON.stringify(nextProps.items);
    const tableTemplateNotEqual =
      JSON.stringify(props.tableTemplate) !==
      JSON.stringify(nextProps.tableTemplate);
    const sortTypeNotEqual =
      JSON.stringify(props.sortType) !== JSON.stringify(nextProps.sortType);
    const sortByNotEqual =
      JSON.stringify(props.sortBy) !== JSON.stringify(nextProps.sortBy);
    const visibleColumnsNotEqual =
      JSON.stringify(props.visibleColumns) !==
      JSON.stringify(nextProps.visibleColumns);
    const dataForRenderNotEqual =
      JSON.stringify(props.dataForRender) !==
      JSON.stringify(nextProps.dataForRender);

    return (
      tableTemplateNotEqual ||
      sortTypeNotEqual ||
      sortByNotEqual ||
      visibleColumnsNotEqual ||
      dataForRenderNotEqual ||
      itemsNotEqual
    );
  }

  changeSortType = (sortBy, filtersValue) =>
    filtersValue.sort_by !== sortBy
      ? ORDER_BY_DESC
      : filtersValue.sort_type === ORDER_BY_DESC
      ? ORDER_BY_ASC
      : ORDER_BY_DESC;

  generateFromTemplate = () => {
    const {
      tableTemplate,
      filtersValue,
      reducer,
      getItems,
      items,
      changeFiltersValue,
      softSort,
      sortType,
      sortBy,
      visibleColumns,
      titleTemplate,
      setItems
    } = this.props;
    const headItems = [];


    const titleIndexes = [];
    if (titleTemplate && Array.isArray(titleTemplate)) {
      titleTemplate.forEach(({ columns }, index) => {
        const mappedColumns = columns.map(() => index);
        titleIndexes.push(...mappedColumns);
      });
    }

    tableTemplate.forEach((column, index) => {
      if (!visibleColumns || visibleColumns[index]) {
        const {
          thead: { className, value, title, sortKey, sortLtr },
          thead
        } = column;
        let resultValue = value;
        if (typeof value === 'function') {
          resultValue = value();
        }

        const props = thead.props ? cloneDeep(thead.props) : {};
        if (titleIndexes.length) {
          props['js-title-index'] = titleIndexes[index];
        }
        const th = (
          <th
            key={index}
            title={title || value}
            className={`${className || ''}${sortKey ? ' cup' : ''}`}
            onClick={() => {
              if (!sortKey) return false;
              const newSortType = this.changeSortType(sortKey, filtersValue);
              if (softSort) {
                changeFiltersValue({ sort_type: newSortType, sort_by: sortKey }, reducer);
                let newItems = [];
                items.forEach(itemsPart => {newItems.push(...cloneDeep(itemsPart))});
                newItems = newItems.sort((a, b) => {
                  const bandA = a[sortKey];
                  const bandB = b[sortKey];

                  let comparison = 0;
                  if (bandA > bandB) {
                    comparison = newSortType === 'DESC' ? -1 : 1;
                  } else if (bandA < bandB) {
                    comparison = newSortType === 'DESC' ? 1 : -1;
                  }
                  return comparison;
                });
                setItems(newItems, reducer);
              } else {
                getItems(
                  { sort_type: newSortType, sort_by: sortKey, offset: 0 },
                  reducer
                );
              }
            }}
            {...props}
          >
            {sortLtr && sortKey ? (
              <span
                className={`sorting ltr ${
                  sortBy === sortKey ? sortType.toLowerCase() : ''
                }`}
              />
            ) : (
              false
            )}
            {resultValue}
            {!sortLtr && sortKey ? (
              <span
                className={`sorting fal ${
                  sortBy === sortKey ? sortType.toLowerCase() : ''
                }`}
              />
            ) : (
              false
            )}
          </th>
        );
        headItems.push(th);
      }
    });

    return headItems;
  };

  render() {
    const { isHidden, setRef } = this.props;
    const data = this.generateFromTemplate();
    return (
      <thead ref={setRef} className={!isHidden ? 'js' : 'no-js'}>
        <tr>
          <th className="padding-table">&nbsp;</th>
          {data}
          <th className="padding-table">&nbsp;</th>
        </tr>
      </thead>
    );
  }
}
