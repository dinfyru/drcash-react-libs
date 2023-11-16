import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import classNames from 'classnames';
import TTitle from './TTitle/TTitle';

const ORDER_BY_DESC = 'DESC';
const ORDER_BY_ASC = 'ASC';

const THead = props => {
  const {
    template,
    getItems,
    filtersValue,
    filtersValue: {
      sort_type: sortType,
      sort_by: sortBy
    },
    reducer,
    titleTemplate,
    visibleColumns
  } = props;

  const sortOnClick = ({
    sortKey
  }) => {
    if (!sortKey) return false;

    let newSortType = ORDER_BY_DESC;
    if (sortKey === filtersValue.sort_by) {
      if (filtersValue.sort_type === ORDER_BY_DESC) {
        newSortType = ORDER_BY_ASC;
      }
    }

    getItems(
      {
        sort_type: newSortType,
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
      itemProps.className = classNames([className, sortKey && 'cup']);

      const th = (
        <th
          key={index}
          {...itemProps}
          onClick={() => sortOnClick({
            sortKey
          })}
        >
          {sortLtr && sortKey && sortType && (
            <span
              className={classNames('sorting', 'ltr', {
                [sortType.toLowerCase()]: sortBy === sortKey
              })}
            />
          )}
          {resultValue}
          {!sortLtr && sortKey && sortType && (
            <span
              className={classNames('sorting', 'fal', {
                [sortType.toLowerCase()]: sortBy === sortKey
              })}
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
    {!!titleTemplate.length && (
      <TTitle
        titleTemplate={titleTemplate}
        visibleColumns={visibleColumns}
      />
    )}
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
  titleTemplate: PropTypes.array.isRequired,
  visibleColumns: PropTypes.array
};

THead.defaultProps = {
  isHidden: false,
  softSort: false,
  visibleColumns: null
};

export default THead;
