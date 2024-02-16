import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import TBodyPart from './TBodyPart';
import BlockedItems from './BlockedItems';

const TBody = (props) => {
  const {
    items,
    template,
    forwardedRef,
    isLoading,
    messages,
    blockedItems,
    tableRefs,
    action,
  } = props;

  const { isNoData, colsCount } = useMemo(
    () => ({
      isNoData: (!items.length || !items[0].length) && !isLoading,
      colsCount: template.length + 2,
    }),
    [template, items],
  );

  return (
    <tbody ref={forwardedRef}>
      {items.map((innerItems, index) => (
        <TBodyPart key={index} items={innerItems} template={template} />
      ))}
      {isNoData && (
        <tr className="no-border">
          <td colSpan={colsCount}>
            <span className="no-data">{messages.noDataContent}</span>
          </td>
        </tr>
      )}
      {isLoading && action === 'next-page' && (
        <tr className="no-border">
          <td colSpan={colsCount}>
            <span className="loading">
              <span />
            </span>
          </td>
        </tr>
      )}
      <BlockedItems blockedItems={blockedItems} tableRefs={tableRefs} />
    </tbody>
  );
};

TBody.defaultProps = {
  action: '',
  isLoading: false,
  blockedItems: [],
};

TBody.propTypes = {
  template: PropTypes.array.isRequired,
  forwardedRef: PropTypes.object.isRequired,
  tableRefs: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  action: PropTypes.string,
  items: PropTypes.array.isRequired,
  blockedItems: PropTypes.array,
  messages: PropTypes.object.isRequired,
};

export default TBody;
