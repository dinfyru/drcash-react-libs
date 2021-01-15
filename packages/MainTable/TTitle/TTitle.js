import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TTitle extends Component {
  static defaultProps = {
    visibleColumns: null
  };

  static propTypes = {
    titleTemplate: PropTypes.array.isRequired,
    visibleColumns: PropTypes.array
  };

  shouldComponentUpdate(nextProps) {
    const { props } = this;

    const titleTemplateNotEqual =
      JSON.stringify(props.titleTemplate) !==
      JSON.stringify(nextProps.titleTemplate);
    const visibleColumnsNotEqual =
      JSON.stringify(props.visibleColumns) !==
      JSON.stringify(nextProps.visibleColumns);

    return titleTemplateNotEqual || visibleColumnsNotEqual;
  }

  generateFromTemplate = () => {
    const { titleTemplate, visibleColumns } = this.props;
    const titleItems = [];
    let columnI = 0;
    titleTemplate.forEach((column, index) => {
      const { props, value } = column;
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

  render() {
    const { setRef } = this.props;
    const data = this.generateFromTemplate();
    return (
      <thead ref={setRef}>
        <tr>
          <th className="padding-table">&nbsp;</th>
          {data}
          <th className="padding-table">&nbsp;</th>
        </tr>
      </thead>
    );
  }
}
