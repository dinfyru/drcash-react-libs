import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import debounce from 'debounce-promise';

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
    valueForFirst: false
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
    loadOptions: PropTypes.func,
    onInit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onInputChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    valueForFirst: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool
    ])
  };

  constructor(props) {
    super(props);

    const { value } = props;
    this.state = {
      multi: props.multi,
      options: [...props.options],
      value,
      filteredOptions: [],
      isFetching: props.isFetching && (!props.options || !props.options.length),
      valueForFirst: null
    };
    this.debounceLoadOptions = props.async
      ? debounce(props.loadOptions, 300)
      : null;
  }

  static getDerrivedStateFromProps

  componentDidMount() {
    this.setValueForFirst();
    this.setValue();
    if (typeof this.props.onInit === 'function') {
      this.props.onInit({ setValueForFirst: this.setValueForFirst });
    }
  }

  componentDidUpdate() {
    const { value: stateValue, isFetching, valueForFirst } = this.state;
    const { value: propsValue, trackValue, options, valueForFirst: valueForFirstProps, loadOptions } = this.props;

    if (isFetching && Object.keys(options).length) {
      this.setValue();
      this.completeAsyncLoading();
    }
    if (stateValue !== propsValue && trackValue && !loadOptions) {
      this.setState({
        value: propsValue
      });
    }
    if (valueForFirst !== valueForFirstProps && valueForFirstProps !== false) {
      this.setValueForFirst();
    }
  }

  setValueForFirst = () => {
    const { valueForFirst, async } = this.props;
    if (async && valueForFirst) {
      this.props.loadOptions(valueForFirst).then(originalData => {
        const data = (originalData || []).filter(
          el =>
            el.value &&
            el.value.toString &&
            valueForFirst.toString &&
            el.value.toString() === valueForFirst.toString()
        );
        const value = Array.isArray(data) && data[0] ? data[0] : false;
        this.setState({
          value,
          valueForFirst
        });
      });
    }
  };

  setValue = () => {
    const { setValue, options } = this.props;
    if (setValue && options && options.length) {
      const random = Math.floor(Math.random() * (options.length - 0));
      const { value, label } = setValue === 2 ? options[random] : options[0];
      this.handleOnChange(value, label);
    }
  };

  completeAsyncLoading = () => {
    this.setState({
      options: this.props.options,
      isFetching: false
    });
  };

  handleOnChange = (value, label) => {
    const { nameParams, async } = this.props;
    const { multi } = this.state;
    let newValue = value;

    if (multi) {
      if (value && value.length) {
        newValue = value.map(el => {
          return el.value;
        });
      }
    } else if (value && (value.value || value.value === 0)) {
      newValue = value.value;
    }

    this.setState({
      value: async ? value : newValue,
      valueForFirst: null
    });
    this.props.onChange(newValue, nameParams, label);
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
      const regexpStart = new RegExp('^' + filter, 'i');
      const regexpStartWord = new RegExp('\\b' + filter, 'i');
      const regexpGlobal = new RegExp(filter, 'gi');

      // Ищем по value в начале строки
      newOptions = options.filter(option => {
        return regexpStart.test(option.label);
      });
      // Ищем по label в начале слова
      newOptions = [
        ...newOptions,
        ...options.filter(option => {
          return (
            regexpStartWord.test(option.label) &&
            !newOptions.find(elem => {
              return elem.value === option.value;
            })
          );
        })
      ];
      // Ищем по label в начале строки
      newOptions = [
        ...newOptions,
        ...options.filter(option => {
          return (
            regexpGlobal.test(option.label) &&
            !newOptions.find(elem => {
              return elem.value === option.value;
            })
          );
        })
      ];
    }
    return newOptions || options;
  };

  render() {
    const { multi, value, isFetching } = this.state;
    let { options: optionsState, filteredOptions } = this.state;
    const {
      changeable,
      noOptionsMessage,
      className,
      disabled,
      searchable,
      clearable,
      placeholder,
      defaultOptions,
      async,
      onInputChange
    } = this.props;
    let options =
      Array.isArray(filteredOptions) && filteredOptions.length
        ? filteredOptions
        : optionsState;
    if (Object.keys(changeable).length) {
      options = options.filter(
        obj =>
          obj[changeable.key] !==
          this.props[changeable.storeName][changeable.storeField]
      );
    }
    options = options.filter(this.props.filterFunc);

    let curValue = value;
    if (multi && value) {
      if (value.length) {
        curValue = options.filter(
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
      isDisabled: disabled,
      isSearchable: searchable,
      isClearable: clearable,
      placeholder,
      onOpen: this.onOpenSelect,
      noOptionsMessage
    };
    if (async) {
      props.defaultOptions = defaultOptions;
      props.loadOptions = this.debounceLoadOptions;
    }

    return (
      <>
        {this.props.creatable ? (
          <Select.Creatable {...props} />
        ) : this.props.async ? (
          <AsyncSelect cacheOptions debounceInterval={300} {...props} />
        ) : (
          <Select {...props} />
        )}
      </>
    );
  }
}

export default SelectTemplate;
