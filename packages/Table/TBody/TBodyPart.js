import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

const TBodyPart = (props) => {
  const { template, items: propsItems } = props;

  const generateItemsByTemplate = () => {
    const items = [];
    // Generate main template

    for (let i = 0; i < propsItems.length; i += 1) {
      const item = propsItems[i];

      template.forEach((column, index) => {
        const { tbody } = column;

        if (!items[i]) {
          items[i] = [];
          if (item.id) {
            items[i].id = item.id;
          }
        }
        let result;

        // generate cell
        if (typeof tbody.value === 'function') {
          try {
            result = tbody.value(item);
          } catch (e) {
            result = 'n/a';
          }
        } else if (typeof tbody.value === 'string') {
          result = tbody.value;
        } else if (!tbody.value && tbody.key) {
          result = item[tbody.key];
        }

        const itemProps = tbody.props ? cloneDeep(tbody.props) : {};
        if (tbody.className) {
          itemProps.className =
            typeof tbody.className === 'function'
              ? tbody.className(item)
              : tbody.className;
        }
        Object.keys(itemProps).forEach((key) => {
          if (typeof itemProps[key] === 'function') {
            itemProps[key] = itemProps[key](item);
          }
        });

        items[i][index] = <td {...itemProps}>{result}</td>;
      });
    }

    return items;
  };

  const items = generateItemsByTemplate();

  return items.map((item, index) => (
    <tr key={index} data-id={item.id ? item.id : index}>
      <td className="dr-padding">&nbsp;</td>
      {item.map((td, tdIndex) => (
        <React.Fragment key={tdIndex}>{td}</React.Fragment>
      ))}
      <td className="dr-padding">&nbsp;</td>
    </tr>
  ));
};

TBodyPart.propTypes = {
  template: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
};

export default TBodyPart;
