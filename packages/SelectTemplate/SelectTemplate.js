import React, { Component, useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import debounce from 'debounce-promise';
import cloneDeep from 'lodash.clonedeep';

import './index.sass';

class SelectTemplate extends Component {
  static defaultProps = {
    nameParams: undefined,
    setValue: 0,
    options: [],
    placeholder: 'Выберите значение',
    className: 'select',
    isFetching: false,
    changeable: {},
    clearable: true,
    searchable: true,
    filterFunc: option => option,
    creatable: false,
    disabled: false,
    trackValue: false,
    defaultOptions: false,
    inputValue: null,
    noOptionsMessage: () => 'No data',
    multi: false,
    async: false,
    loadOptions: null,
    onInit: false,
    onInputChange: false,
    valueForFirst: false,
    mustUpdate: false
  };

  static propTypes = {
    nameParams: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    changeable: PropTypes.object,
    clearable: PropTypes.bool,
    setValue: PropTypes.number,
    searchable: PropTypes.bool,
    filterFunc: PropTypes.func,
    placeholder: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    isFetching: PropTypes.bool,
    disabled: PropTypes.bool,
    creatable: PropTypes.bool,
    trackValue: PropTypes.bool,
    defaultOptions: PropTypes.bool,
    inputValue: PropTypes.string,
    multi: PropTypes.bool,
    async: PropTypes.bool,
    loadOptions: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onInit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onInputChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    valueForFirst: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.array,
      PropTypes.bool
    ]),
    mustUpdate: PropTypes.bool
  };

  constructor(props) {
    super(props);

    const { value } = props;
    this.state = {
      multi: props.multi,
      options: [...props.options],
      value,
      disabled: false,
      filteredOptions: [],
      isFetching: props.isFetching && (!props.options || !props.options.length),
      valueForFirst: null
    };
    if (props.loadOptions && props.async) {
      const loadOptions = (inputValue = '') => {
        return props.loadOptions(inputValue)
          .then(items => {
            let formattedData = cloneDeep(items || []);
            const { generateOptions } = this.props;
            if (generateOptions) {
              formattedData = generateOptions(formattedData);
            }

            return formattedData;
          });
      };
      this.debounceLoadOptions = useMemo(debounce(loadOptions, 300), []);
    }
  }

  componentDidMount() {
    this.setValueForFirst();
    this.setValue();
    if (typeof this.props.onInit === 'function') {
      this.props.onInit({ setValueForFirst: this.setValueForFirst });
    }
  }

  componentDidUpdate() {
    const {
      value: stateValue,
      isFetching,
      valueForFirst
    } = this.state;
    const {
      value: propsValue,
      trackValue,
      options,
      valueForFirst: valueForFirstProps,
      loadOptions,
      mustUpdate
    } = this.props;

    if (isFetching && Object.keys(options).length) {
      this.setValue();
      this.completeAsyncLoading();
    }
    if (stateValue !== propsValue && trackValue && !loadOptions) {
      this.setState({
        value: propsValue
      });
    }
    if (JSON.stringify(valueForFirst) !== JSON.stringify(valueForFirstProps) && valueForFirstProps !== false && mustUpdate) {
      this.setValueForFirst();
    }
  }

  setValueForFirst = () => {
    const {
      valueForFirst,
      async,
      generateOptions
    } = this.props;
    if (async && valueForFirst) {
      this.setState({ disabled: true }, () => {
        this.props.loadOptions(valueForFirst, 'true')
          .then(responseData => {
            let formattedData = cloneDeep(responseData || []);
            if (generateOptions) {
              formattedData = generateOptions(formattedData);
            }
            const data = formattedData.filter(el => {
              if (el.value && el.value.toString) {
                if (Array.isArray(valueForFirst)) {
                  if (valueForFirst.map(item => (item.toString ? item.toString() : ''))
                    .indexOf(el.value.toString()) >= 0) {
                    return true;
                  }
                } else if (valueForFirst.toString && el.value.toString() === valueForFirst.toString()) {
                  return true;
                }
              }
              return false;
            });

            let value = data;
            if (!Array.isArray(valueForFirst)) {
              value = data[0] ? data[0] : false;
            }
            this.setState({
              value,
              valueForFirst,
              disabled: false
            });
          })
          .catch(() => {
            this.setState({ disabled: false });
          });
      });
    }
  };

  setValue = () => {
    const {
      setValue,
      options
    } = this.props;
    if (setValue && options && options.length) {
      const random = Math.floor(Math.random() * (options.length - 0));
      const value = setValue === 2 ? options[random].value : options[0].value;
      this.handleOnChange(value);
    }
  };

  completeAsyncLoading = () => {
    this.setState({
      options: this.props.options,
      isFetching: false
    });
  };

  handleOnChange = value => {
    const {
      nameParams,
      async
    } = this.props;
    const { multi } = this.state;
    let newValue = value;
    let newLabel;

    if (multi) {
      if (value && value.length) {
        newValue = value.map(el => el.value);
      }
    } else if (value && (value.value || value.value === 0)) {
      newValue = value.value;
      newLabel = value.label;
    }

    this.setState({
      value: async ? value : newValue,
      valueForFirst: null
    });
    this.props.onChange(newValue, nameParams, newLabel);
  };

  handleInputChange = (filter = '', { action }) => {
    if (!this.props.async) {
      if (action === 'input-change') {
        this.setState(prevState => {
          const { options } = prevState;
          const filteredOptions = this.filterOptions(options, filter);
          return { filteredOptions };
        });
      }
    }
  };

  filterOptions = (options, filter) => {
    let newOptions = null;
    if (filter !== '') {
      const regexpStart = new RegExp(`^${filter}`, 'i');
      const regexpStartWord = new RegExp(`\\b${filter}`, 'i');
      const regexpGlobal = new RegExp(filter, 'gi');

      // Ищем по value в начале строки
      newOptions = options.filter(option => regexpStart.test(option.label));
      // Ищем по label в начале слова
      newOptions = [
        ...newOptions,
        ...options.filter(option => (
          regexpStartWord.test(option.label)
          && !newOptions.find(elem => elem.value === option.value)
        ))
      ];
      // Ищем по label в начале строки
      newOptions = [
        ...newOptions,
        ...options.filter(option => (
          regexpGlobal.test(option.label)
          && !newOptions.find(elem => elem.value === option.value)
        ))
      ];
    }
    return newOptions || options;
  };

  render() {
    const {
      multi,
      value,
      isFetching
    } = this.state;
    const {
      options: optionsState,
      disabled: disabledState,
      filteredOptions
    } = this.state;
    const {
      changeable,
      noOptionsMessage,
      className,
      disabled: disabledProps,
      searchable,
      clearable,
      placeholder,
      defaultOptions,
      async,
      onInputChange
    } = this.props;
    let options = Array.isArray(filteredOptions) && filteredOptions.length
      ? filteredOptions
      : optionsState;
    if (Object.keys(changeable).length) {
      options = options.filter(
        obj =>
          obj[changeable.key]
          !== this.props[changeable.storeName][changeable.storeField]
      );
    }
    options = options.filter(this.props.filterFunc);

    let curValue = value;
    if (multi && value) {
      if (value.length && !this.debounceLoadOptions) {
        curValue = optionsState.filter(
          option => value.filter(valOption => option.value === valOption).length
        );
      }
    } else if ((value || value === 0) && !async) {
      curValue = options.filter(option => option.value === value);
    }
    const props = {
      classNamePrefix: 'select',
      isMulti: multi,
      options,
      isLoading: isFetching,
      onChange: this.handleOnChange,
      value: curValue,
      className,
      onInputChange: onInputChange || this.handleInputChange,
      isDisabled: disabledProps || disabledState,
      isSearchable: searchable,
      isClearable: clearable,
      placeholder,
      onOpen: this.onOpenSelect,
      noOptionsMessage
    };

    if (async) {
      props.defaultOptions = defaultOptions;
      if (this.debounceLoadOptions) {
        props.loadOptions = this.debounceLoadOptions;
      }
    }


    if (this.props.creatable) {
      return <Select.Creatable {...props} />;
    }
    if (async) {
      return <AsyncSelect cacheOptions debounceInterval={300} {...props} />;
    }

    return <Select {...props} />;
  }
}

export default SelectTemplate;
