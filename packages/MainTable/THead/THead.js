import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    visibleColumns: PropTypes.array
  };

  shouldComponentUpdate(nextProps) {
    const { props } = this;

    // todo: need optimize for react elements JSON.stringify
    // const tableTemplateNotEqual =
    //   JSON.stringify(props.tableTemplate) !==
    //   JSON.stringify(nextProps.tableTemplate);
    const sortTypeNotEqual =
      JSON.stringify(props.sortType) !== JSON.stringify(nextProps.sortType);
    const sortByNotEqual =
      JSON.stringify(props.sortBy) !== JSON.stringify(nextProps.sortBy);
    const visibleColumnsNotEqual =
      JSON.stringify(props.visibleColumns) !==
      JSON.stringify(nextProps.visibleColumns);

    return (
      // tableTemplateNotEqual ||
      sortTypeNotEqual ||
      sortByNotEqual ||
      visibleColumnsNotEqual
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
      sortType,
      sortBy,
      visibleColumns
    } = this.props;
    const headItems = [];

    tableTemplate.forEach((column, index) => {
      if (!visibleColumns || visibleColumns[index]) {
        const {
          thead: { className, value, title, sortKey }
        } = column;
        const th = (
          <th
            key={index}
            title={title || value}
            className={`${className || ''}${sortKey ? ' cup' : ''}`}
            onClick={() => {
              if (!sortKey) return false;
              const newSortType = this.changeSortType(sortKey, filtersValue);
              getItems(
                { sort_type: newSortType, sort_by: sortKey, offset: 0 },
                reducer
              );
            }}
          >
            {value}
            {sortKey ? (
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
