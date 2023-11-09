import React, { useEffect } from 'react';
import { addEvent, elemOffset, removeEvent } from '../../../utils';

const BlockedItems = (props) => {
  const { blockedItems } = props;

  const blockedItemsPosition = () => {
    const {
      tableRefs: {
        parent: { current: parent }
      }
    } = props;
    const trNodeList = parent.querySelectorAll('.blocked-item');

    for (let i = 0; i < trNodeList.length; i++) {
      const element = trNodeList[i];
      const dataId = element.getAttribute('item-data-id');
      const hasMainElement = !!document.querySelector('main.main');
      const item = parent.querySelector(`tbody tr[data-id="${dataId}"]`);
      if (!item.length) {
        let top = parent.scrollTop;
        if (!hasMainElement) {
          top = top +
            (Math.abs(elemOffset(item).top) - elemOffset(parent).top) +
            1;
        }
        const height = item.offsetHeight - 1;
        element.style.top = `${top}px`;
        element.style.height = `${height}px`;
        element.style.lineHeight = `${height}px`;
      }
    }
  };

  useEffect(() => {
    addEvent(window, 'resize', blockedItemsPosition);

    return () => {
      removeEvent(window, 'resize', blockedItemsPosition);
    };
  }, []);

  useEffect(() => {
    blockedItemsPosition();
  }, [blockedItems]);

  return blockedItems.map(id => (
    <tr className="blocked-item" key={id} item-data-id={id}>
      <td>
        <span className="loading" />
      </td>
    </tr>
  ));
};

export default BlockedItems;
