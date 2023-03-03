import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import classname from 'classnames';

const ORDER_BY_DESC = 'DESC';
const ORDER_BY_ASC = 'ASC';

const THead = props => {
  const {
    template,
    getItems,
    sortType,
    sortBy,
    filtersValue,
    reducer
  } = props;

  const changeSortType = () =>
    filtersValue.sort_by !== sortBy
      ? ORDER_BY_DESC
      : filtersValue.sort_type === ORDER_BY_DESC
        ? ORDER_BY_ASC
        : ORDER_BY_DESC;

  const sortOnClick = ({
    sortKey
  }) => {
    if (!sortKey) return false;

    getItems(
      {
        sort_type: changeSortType(),
        sort_by: sortKey,
        offset: 0
      },
      reducer
    );
  };

  const generateItemsByTemplate = () => {
    const items = [];

    template.forEach((column, index) => {
      const {
        thead: {
          value,
          sortKey,
          sortLtr,
          className
        },
        thead
      } = column;
      let resultValue = value;
      if (typeof value === 'function') {
        resultValue = value();
      }

      const itemProps = thead.props ? cloneDeep(thead.props) : {};
      itemProps.title = itemProps.title || value;
      itemProps.className = classname([className, sortKey && 'cup']);

      const th = (
        <th
          key={index}
          {...itemProps}
          onClick={() => sortOnClick({
            sortKey
          })}
        >
          {sortLtr && sortKey && (
            <span
              className={`sorting ltr ${
                sortBy === sortKey ? sortType.toLowerCase() : ''
              }`}
            />
          )}
          {resultValue}
          {!sortLtr && sortKey && (
            <span
              className={`sorting fal ${
                sortBy === sortKey ? sortType.toLowerCase() : ''
              }`}
            />
          )}
        </th>
      );
      items.push(th);
    });

    return items;
  };
  const items = generateItemsByTemplate();

  return (
    <thead>
    <tr>
      <th className="dr-padding">&nbsp;</th>
      {items}
      <th className="dr-padding">&nbsp;</th>
    </tr>
    </thead>
  );
};

THead.propTypes = {
  template: PropTypes.array.isRequired,
  getItems: PropTypes.func.isRequired,
  reducer: PropTypes.string.isRequired,
  filtersValue: PropTypes.object.isRequired,
  sortType: PropTypes.string,
  sortBy: PropTypes.string
};

THead.defaultProps = {
  sortType: null,
  sortBy: null,
  isHidden: false,
  softSort: false,
  visibleColumns: null
};

export default THead;
