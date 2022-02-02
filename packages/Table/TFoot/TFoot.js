import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

const TFoot = props => {
  const generateItemsByTemplate = () => {
    const {
      template,
      tfootItem: item
    } = props;
    const footItems = [];
    const tfootItem = item ? item.item : null;
    if (!item) return false;

    let cellCounter = 0;

    template.forEach((column, index) => {
      const { tfoot } = column;
      if (cellCounter >= template.length) {
        return;
      }
      if (!tfoot) {
        footItems[index] = <td key={index} />;
        return;
      }

      let result;

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

      const itemProps = tfoot.props ? cloneDeep(tfoot.props) : {};

      // переименовать isWholeLine
      if (tfoot.isWholeLine) {
        cellCounter += template.length;
        itemProps.colSpan = template.length;
      } else {
        cellCounter++;
      }

      Object.keys(itemProps)
        .forEach(key => {
          if (typeof itemProps[key] === 'function') {
            itemProps[key] = itemProps[key](item);
          }
        });

      footItems[index] = (
        <td key={index} {...itemProps}>
          {result}
        </td>
      );
    });

    return footItems;
  };

  const {
    forwardedRef,
    tfootItem,
    tfootOtherTemplate
  } = props;
  const item = tfootItem ? tfootItem.item : null;
  const isLoading = tfootItem ? tfootItem.isLoading : null;
  const data = generateItemsByTemplate();

  return (
    <tfoot ref={forwardedRef}>
    {tfootOtherTemplate}
    <tr>
      <th className="dr-padding">&nbsp;</th>
      {data}
      <td className="dr-padding">&nbsp;</td>
    </tr>
    {(item && isLoading && !Object.keys(item).length) && (
      <tr className="tfoot-loading no-border">
        <td>
            <span className="loading">
              <span />
            </span>
        </td>
      </tr>
    )}
    </tfoot>
  );
};

TFoot.defaultProps = {
  tfootItem: null
};

TFoot.propTypes = {
  template: PropTypes.array.isRequired,
  forwardedRef: PropTypes.object.isRequired,
  tfootItem: PropTypes.object
};

export default TFoot;
