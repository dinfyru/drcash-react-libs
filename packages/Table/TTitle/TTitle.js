import React from 'react';
import PropTypes from 'prop-types';


const TTitle = ({
  titleTemplate,
  visibleColumns
}) => {
  const generateFromTemplate = () => {
    const titleItems = [];
    let columnI = 0;
    titleTemplate.forEach((column, index) => {
      const {
        props,
        value
      } = column;
      const columns = [...column.columns];
      let visible;
      if (visibleColumns) {
        columns.forEach(() => {
          if (visibleColumns[columnI]) visible = true;
          columnI++;
        });
      }
      if (!visibleColumns || visible) {
        const th = (
          <th key={index} js-title-index={index} {...props}>
            <span>{value}</span>
          </th>
        );
        titleItems.push(th);
      }
    });

    return titleItems;
  };

  const data = generateFromTemplate();
  return (
    <thead>
      <tr>
        <th className="padding-table">&nbsp;</th>
        {data}
        <th className="padding-table">&nbsp;</th>
      </tr>
    </thead>
  );
};


TTitle.defaultProps = {
  visibleColumns: null
};

TTitle.propTypes = {
  titleTemplate: PropTypes.array.isRequired,
  visibleColumns: PropTypes.array
};

export default TTitle;
