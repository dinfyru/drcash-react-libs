import React from 'react';
import PropTypes from 'prop-types';

const TTitle = ({ titleTemplate, visibleColumns }) => {
  const generateFromTemplate = () => {
    const titleItems = [];
    let columnI = 0;
    titleTemplate.forEach((column, index) => {
      const { props, value } = column;
      const columns = [...column.columns];
      let colSpan = 0;
      let visible;
      if (visibleColumns) {
        columns.forEach(() => {
          if (visibleColumns[columnI]) {
            colSpan++;
            visible = true;
          }
          columnI++;
        });
      }
      if (!visibleColumns || visible) {
        if (typeof props === 'object') {
          if (!props.title) {
            delete props.title;
          } else {
            props.title = props.title.toString();
          }
        }
        const th = (
          <th key={index} js-title-index={index} colSpan={colSpan} {...props}>
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
    <tr className="js-table__grouped-titles">
      <th className="padding-table">&nbsp;</th>
      {data}
      <th className="padding-table">&nbsp;</th>
    </tr>
  );
};

TTitle.defaultProps = {
  visibleColumns: null,
};

TTitle.propTypes = {
  titleTemplate: PropTypes.array.isRequired,
  visibleColumns: PropTypes.array,
};

export default TTitle;
