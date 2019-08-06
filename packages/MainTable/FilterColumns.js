import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';

import { MTupdateVisibleColumns } from './mainTableActions';
import { addEvent, removeEvent, findByValue, getParentNodes } from './utils';

export default class FilterColumns extends Component {
  static defaultProps = {
    columnCategories: { 0: 'Колонки' },
    mainTableName: null
  };

  static propTypes = {
    tableName: PropTypes.string.isRequired,
    columnCategories: PropTypes.object,
    settingsColumns: PropTypes.object.isRequired,
    mainTableName: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const {
      tableName,
      columnCategories,
      settingsColumns: propsSettingsColumns
    } = props;
    const localSettingsColumns = localStorage.getItem(tableName);

    let settingsColumns = propsSettingsColumns;
    if (localSettingsColumns) {
      settingsColumns = JSON.parse(localSettingsColumns);
    } else {
      this.updateSettingsColumnsStorage(settingsColumns);
    }

    this.state = {
      selectMultiOpened: false,
      settingsColumns,
      columnCategories
    };
  }

  componentDidMount() {
    this.getVisibleColumns();
    addEvent(window, 'click', this.clickOut);
  }

  componentWillUnmount() {
    removeEvent(window, 'click', this.clickOut);
  }

  changeColumnState = column => {
    this.setState(
      prevState => {
        const settingsColumns = cloneDeep(prevState.settingsColumns);
        settingsColumns[column].active = !settingsColumns[column].active;
        const lengthActive = [];
        Object.keys(settingsColumns).forEach(elemIndex => {
          if (settingsColumns[elemIndex].active) {
            lengthActive.push(settingsColumns[elemIndex].active);
          }
        });
        if (lengthActive.length) {
          return { settingsColumns };
        } else {
          return null;
        }
      },
      () => {
        this.updateSettingsColumnsStorage();
        this.getVisibleColumns();
      }
    );
  };

  updateSettingsColumnsStorage = settingsColumns => {
    const { tableName } = this.props;
    const stringifySettingsColumns = JSON.stringify(
      settingsColumns || this.state.settingsColumns
    );
    localStorage.setItem(tableName, stringifySettingsColumns);
  };

  getVisibleColumns = () => {
    const { settingsColumns } = this.state;
    const { mainTableName, dispatch } = this.props;
    const visibleColumns = [];
    Object.keys(settingsColumns).forEach(elemIndex => {
      visibleColumns.push(settingsColumns[elemIndex].active);
    });
    dispatch(MTupdateVisibleColumns(visibleColumns, mainTableName));
  };

  selectMultiOpener = () => {
    this.setState(prevState => {
      return { selectMultiOpened: !prevState.selectMultiOpened };
    });
  };

  clickOut = event => {
    const { target } = event;
    if (
      document.querySelector('.select-multi').classList.contains('active') &&
      !target.classList.contains('select-multi') &&
      !target.closest('.select-multi')
    ) {
      this.setState({ selectMultiOpened: false });
    }
  };

  render() {
    const { selectMultiOpened, columnCategories, settingsColumns } = this.state;

    return (
      <div
        className={selectMultiOpened ? 'select-multi active' : 'select-multi'}
      >
        <div
          role="presentation"
          className="select-multi__label"
          onClick={this.selectMultiOpener}
        >
          Настройка колонок
        </div>
        <ul className="select-multi__list">
          {Object.keys(columnCategories).map(catId => (
            <li key={catId}>
              <span className="cat">{columnCategories[catId]}</span>
              {findByValue(settingsColumns, catId, 'cat').map(columnId => {
                const column = settingsColumns[columnId];
                return (
                  <span
                    key={columnId}
                    onClick={() => {
                      if (column.fixed) return false;
                      this.changeColumnState(columnId);
                    }}
                    className={`item${column.active ? ' active' : ''}${
                      column.fixed ? ' fixed' : ''
                    }`}
                  >
                    {column.name}
                  </span>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
