import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

// const ORDER_BY_DESC = 'DESC';
// const ORDER_BY_ASC = 'ASC';

const THead = props => {
  const {
    template
  } = props;

  const generateItemsByTemplate = () => {
    const items = [];

    template.forEach((column, index) => {
      const {
        thead: {
          value
        },
        thead
      } = column;
      let resultValue = value;
      if (typeof value === 'function') {
        resultValue = value();
      }

      const itemProps = thead.props ? cloneDeep(thead.props) : {};
      itemProps.title = itemProps.title || value;

      const th = (
        <th
          key={index}
          {...itemProps}
        >
          {resultValue}
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
  template: PropTypes.array.isRequired
};

export default THead;
