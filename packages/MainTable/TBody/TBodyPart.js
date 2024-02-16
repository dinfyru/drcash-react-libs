import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

const getAfterLineObjs = (afterLineTemplate, afterLineData, partItems) => {
  const objs = {};
  if (afterLineTemplate && Object.keys(afterLineData).length) {
    const keys = Object.keys(afterLineData);
    let keyForSearch;
    if (keys.length) {
      keyForSearch = afterLineData[keys[0]].key;
      const itemsFinded = partItems.filter(
        (el) => keys.indexOf(el[keyForSearch].toString()) >= 0,
      );
      if (itemsFinded.length) {
        for (let i = 0; i < itemsFinded.length; i += 1) {
          // const { id } = itemsFinded[i];
          const id = itemsFinded[i][keyForSearch];
          objs[id] = afterLineData[id];
        }
      }
    }
  }

  return objs;
};

export default class TBodyPart extends Component {
  static defaultProps = {
    rerenderById: null,
    visibleColumns: null,
    afterLineData: null,
    afterLineTemplate: null,
  };

  static propTypes = {
    tableTemplate: PropTypes.array.isRequired,
    partItems: PropTypes.array.isRequired,
    dataForRender: PropTypes.object.isRequired,
    rerenderById: PropTypes.number,
    visibleColumns: PropTypes.array,
    afterLineData: PropTypes.object,
    afterLineTemplate: PropTypes.array,
  };

  constructor(props) {
    super(props);

    const { rerenderById, partItems, afterLineTemplate, afterLineData } =
      this.props;
    let rerenderByIdState = null;
    if (rerenderById) {
      const itemIsFinded = partItems.find((el) => el.id === rerenderById);
      if (itemIsFinded) {
        rerenderByIdState = rerenderById;
      }
    }
    const afterLineObjs = getAfterLineObjs(
      afterLineTemplate,
      afterLineData,
      props.partItems,
    );

    this.state = {
      rerenderById: rerenderByIdState,
      afterLineObjs,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.rerenderById && !prevState.rerenderById) {
      const itemIsFinded = nextProps.partItems.find(
        (el) => el.id === nextProps.rerenderById,
      );
      if (itemIsFinded) {
        return { rerenderById: nextProps.rerenderById };
      }
    }

    if (nextProps.afterLineTemplate) {
      const afterLineObjs = getAfterLineObjs(
        nextProps.afterLineTemplate,
        nextProps.afterLineData,
        nextProps.partItems,
      );

      return { afterLineObjs };
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      props,
      state: { afterLineObjs },
    } = this;

    const partItemsNotEqual =
      JSON.stringify(props.partItems) !== JSON.stringify(nextProps.partItems);
    const dataForRenderNotEqual =
      JSON.stringify(props.dataForRender) !==
      JSON.stringify(nextProps.dataForRender);
    const rerenderByIdNotEqual =
      Boolean(nextState.rerenderById) &&
      props.rerenderById !== nextProps.rerenderById;
    const visibleColumnsNotEqual =
      JSON.stringify(props.visibleColumns) !==
      JSON.stringify(nextProps.visibleColumns);

    const afterLineIdNotEqual =
      JSON.stringify(nextState.afterLineObjs) !== JSON.stringify(afterLineObjs);

    return (
      partItemsNotEqual ||
      dataForRenderNotEqual ||
      rerenderByIdNotEqual ||
      visibleColumnsNotEqual ||
      afterLineIdNotEqual
    );
  }

  generateFromTemplate = () => {
    const items = this.mainFabric();

    return items;
  };

  mainFabric = () => {
    const {
      tableTemplate: template,
      titleTemplate,
      partItems: data,
      visibleColumns,
      afterLineTemplate,
      afterLineData,
    } = this.props;
    const { afterLineObjs } = this.state;
    const items = [];
    const afterLines = [];
    const afterLineIndexes = [];
    // Generate main template
    for (let i = 0; i < data.length; i += 1) {
      const afterLineKeys = Object.keys(afterLineObjs);
      if (afterLineKeys.length) {
        const keyForSearch = afterLineData[afterLineKeys[0]].key;
        if (afterLineKeys.indexOf(data[i][keyForSearch].toString()) >= 0) {
          afterLines[i] = {
            id: data[i][keyForSearch],
            items: [],
          };
        }
      }
      const titleIndexes = [];
      if (titleTemplate && Array.isArray(titleTemplate)) {
        titleTemplate.forEach(({ columns }, index) => {
          const mappedColumns = columns.map(() => index);
          titleIndexes.push(...mappedColumns);
        });
      }
      template.forEach((column, index) => {
        const { tbody } = column;
        if (!visibleColumns || visibleColumns[index]) {
          const item = data[i];
          if (!items[i]) {
            items[i] = [];
            if (item.id) {
              items[i].id = item.id;
            }
          }
          let result;
          let className;

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

          // generate className if function
          if (typeof tbody.className === 'function') {
            className = tbody.className(item);
          }
          const props = tbody.props ? cloneDeep(tbody.props) : {};
          if (titleIndexes.length) {
            props['js-title-index'] = titleIndexes[index];
          }
          if (className) {
            items[i][index] = (
              <td className={className} {...props}>
                {result}
              </td>
            );
          } else {
            items[i][index] = <td {...props}>{result}</td>;
          }
        }
      });
    }

    if (afterLines.length) {
      afterLines.forEach((el, afterLineIndex) => {
        const afterLineDataPart = afterLineObjs[el.id].items;

        for (
          let lineIndex = 0;
          lineIndex < afterLineDataPart.length;
          lineIndex += 1
        ) {
          afterLineTemplate.forEach((column, columnIndex) => {
            const { tbody } = column;
            if (!visibleColumns || visibleColumns[columnIndex]) {
              if (!afterLines[afterLineIndex].items[lineIndex]) {
                afterLines[afterLineIndex].items[lineIndex] = [];
              }
              const item = afterLineDataPart[lineIndex];
              let result;
              let className;

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
              } else {
                result = false;
              }

              // generate className if function
              if (typeof tbody.className === 'function') {
                const keys = {};
                const tbodyKeys =
                  typeof tbody.key === 'string' ? [tbody.key] : tbody.key;
                for (let b = 0; b < tbodyKeys.length; b += 1) {
                  keys[tbodyKeys[b]] = item[tbodyKeys[b]];
                }
                className = tbody.className(keys);
              }
              if (className) {
                afterLines[afterLineIndex].items[lineIndex][columnIndex] = (
                  <td className={className} {...tbody.props}>
                    {result}
                  </td>
                );
              } else {
                afterLines[afterLineIndex].items[lineIndex][columnIndex] = (
                  <td {...tbody.props}>{result}</td>
                );
              }
            }
          });
        }

        if (!afterLineDataPart.length) {
          afterLines[afterLineIndex].items.push([
            <td className="no-border" colSpan={visibleColumns.length}>
              <span className="loading">
                <span />
              </span>
            </td>,
          ]);
        }
      });

      let prevLength = 0;
      afterLines.forEach((elem, index) => {
        items.splice(index + prevLength + 1, 0, ...elem.items);
        for (let i = 0; i < elem.items.length; i++) {
          afterLineIndexes.push(i + index + prevLength + 1);
        }
        prevLength += elem.items.length;
      });
    }

    return { items, afterLineIndexes };
  };

  render() {
    const { items, afterLineIndexes } = this.generateFromTemplate();

    return items.map((item, index) => {
      const className =
        afterLineIndexes.indexOf(index) >= 0 ? 'mt_subline' : 'mt_line';
      return (
        <tr
          key={index}
          data-id={item.id ? item.id : index}
          className={className}
        >
          <td className="padding-table">&nbsp;</td>
          {item.map((td, tdIndex) => (
            <React.Fragment key={tdIndex}>{td}</React.Fragment>
          ))}
          <td className="padding-table">&nbsp;</td>
        </tr>
      );
    });
  }
}
