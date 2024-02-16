import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TFoot extends Component {
  static defaultProps = {
    visibleColumns: null,
    tfootItem: null,
    dataForRender: {},
    items: [],
    tfootDataForRender: null,
  };

  static propTypes = {
    tableTemplate: PropTypes.array.isRequired,
    setRef: PropTypes.object.isRequired,
    dataForRender: PropTypes.object,
    visibleColumns: PropTypes.array,
    tfootItem: PropTypes.object,
    items: PropTypes.array,
    tfootDataForRender: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    const { props } = this;

    const tableTemplateNotEqual =
      JSON.stringify(props.tableTemplate) !==
      JSON.stringify(nextProps.tableTemplate);
    const visibleColumnsNotEqual =
      JSON.stringify(props.visibleColumns) !==
      JSON.stringify(nextProps.visibleColumns);
    const dataForRenderNotEqual =
      JSON.stringify(props.dataForRender) !==
      JSON.stringify(nextProps.dataForRender);
    const tfootItemNotEqual =
      JSON.stringify(props.tfootItem) !== JSON.stringify(nextProps.tfootItem);
    const itemsNotEqual =
      JSON.stringify(props.items) !== JSON.stringify(nextProps.items);
    const tfootDataForRenderNotEqual =
      JSON.stringify(props.tfootDataForRender) !==
      JSON.stringify(nextProps.tfootDataForRender);

    return (
      tableTemplateNotEqual ||
      visibleColumnsNotEqual ||
      dataForRenderNotEqual ||
      tfootItemNotEqual ||
      itemsNotEqual ||
      tfootDataForRenderNotEqual
    );
  }

  generateFromTemplate = () => {
    const { tableTemplate, visibleColumns, tfootItem: item } = this.props;
    const footItems = [];
    const tfootItem = item ? item.item : null;
    if (!item) return false;

    tableTemplate.forEach((column, index) => {
      const { tfoot } = column;
      if (!visibleColumns || visibleColumns[index] === true) {
        let result;
        let className;
        if (tfoot) {
          // generate cell
          if (typeof tfoot.value === 'function') {
            try {
              result = tfoot.value(tfootItem);
            } catch (e) {
              result = 'n/a';
            }
          } else if (typeof tfoot.value === 'string') {
            result = tfoot.value;
          } else if (!tfoot.value && tfoot.key) {
            result = tfootItem[tfoot.key];
          }

          // generate className if function
          if (typeof tfoot.className === 'function') {
            className = tfoot.className(tfootItem);
          }

          if (className) {
            footItems[index] = (
              <td key={index} className={className} {...tfoot.props}>
                {result}
              </td>
            );
          } else {
            footItems[index] = (
              <td key={index} {...tfoot.props}>
                {result}
              </td>
            );
          }
        } else {
          footItems[index] = <td key={index} />;
        }
      }
    });

    return footItems;
  };

  render() {
    const { setRef, tfootItem, isHidden } = this.props;
    const item = tfootItem ? tfootItem.item : null;
    const isLoading = tfootItem ? tfootItem.isLoading : null;
    const data = this.generateFromTemplate();
    return (
      <tfoot ref={setRef} className={!isHidden ? 'js' : 'no-js'}>
        {!isHidden ? this.props.tfootOtherTemplate : false}
        <tr className="tfoot-data" id={!isHidden ? 'tfoot-data' : ''}>
          <td className="padding-table">&nbsp;</td>
          {data}
          <td className="padding-table">&nbsp;</td>
        </tr>
        {item && isLoading && !Object.keys(item).length && !isHidden ? (
          <tr className="tfoot-loading no-border">
            <td>
              <span className="loading">
                <span />
              </span>
            </td>
          </tr>
        ) : (
          false
        )}
      </tfoot>
    );
  }
}
