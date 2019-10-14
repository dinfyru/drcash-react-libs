import React, { Component } from 'react';

import TBodyPart from './TBodyPart';
import { addEvent, elemOffset, removeEvent } from '../../../utils';

export default class TBody extends Component {
  componentDidMount() {
    addEvent(window, 'resize', this.blockedItemsPosition);
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this;

    const itemsNotEqual =
      JSON.stringify(props.items) !== JSON.stringify(nextProps.items);
    const dataForRenderNotEqual =
      JSON.stringify(props.dataForRender) !==
      JSON.stringify(nextProps.dataForRender);
    const rerenderByIdNotEqual = props.rerenderById !== nextProps.rerenderById;
    const visibleColumnsNotEqual =
      JSON.stringify(props.visibleColumns) !==
      JSON.stringify(nextProps.visibleColumns);
    const afterLineDataNotEqual =
      JSON.stringify(props.afterLineData) !==
      JSON.stringify(nextProps.afterLineData);
    const blockedItemsNotEqual =
      JSON.stringify(props.blockedItems) !==
      JSON.stringify(nextProps.blockedItems);

    return (
      itemsNotEqual ||
      dataForRenderNotEqual ||
      rerenderByIdNotEqual ||
      visibleColumnsNotEqual ||
      afterLineDataNotEqual ||
      blockedItemsNotEqual
    );
  }

  componentDidUpdate() {
    this.blockedItemsPosition();
  }

  componentWillUnmount() {
    removeEvent(window, 'resize', this.blockedItemsPosition);
  }

  blockedItemsPosition = () => {
    const {
      refs: {
        parent: { current: parent }
      }
    } = this.props;
    const tr = document.querySelectorAll('.blocked-item');

    tr.forEach((element, index) => {
      const elem = tr[index];
      const dataId = elem.getAttribute('item-data-id');
      const item = document.querySelector(`tbody tr[data-id="${dataId}"]`);
      if (!item.length) {
        const top =
          parent.scrollTop +
          (Math.abs(elemOffset(item).top) - elemOffset(parent).top) +
          1;
        const height = item.offsetHeight - 1;
        elem.style.top = `${top}px`;
        elem.style.height = `${height}px`;
        elem.style.lineHeight = `${height}px`;
      }
    });
  };

  render() {
    const {
      items,
      tableTemplate,
      dataForRender,
      rerenderById,
      visibleColumns,
      afterLineTemplate,
      blockedItems,
      afterLineData,
      titleTemplate
    } = this.props;

    return (
      <>
        {items.map((partItems, index) => (
          <TBodyPart
            key={index}
            index={index}
            partItems={partItems}
            dataForRender={dataForRender}
            tableTemplate={tableTemplate}
            rerenderById={rerenderById}
            visibleColumns={visibleColumns}
            afterLineTemplate={afterLineTemplate}
            afterLineData={afterLineData}
            titleTemplate={titleTemplate}
          />
        ))}
        {blockedItems.map(id => (
          <tr className="blocked-item" key={id} item-data-id={id}>
            <td>
              <span className="loading" />
            </td>
          </tr>
        ))}
      </>
    );
  }
}
