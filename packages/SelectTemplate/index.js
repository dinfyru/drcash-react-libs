import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export default class SelectTemplate extends Component {
  static defaultProps = {
    nameParams: null,
    setValue: 'no',
    options: [],
    placeholder: 'Выберите значение',
    className: 'select',
    isFetching: false,
    changeable: {},
    clearable: true,
    searchable: true,
    creatable: false,
    disabled: false,
    trackValue: false,
    noOptionsMessage: () => 'No data'
  };
  static propTypes = {
    nameParams: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    changeable: PropTypes.object,
    clearable: PropTypes.bool,
    setValue: PropTypes.string,
    searchable: PropTypes.bool,
    placeholder: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    isFetching: PropTypes.bool,
    disabled: PropTypes.bool,
    creatable: PropTypes.bool,
    trackValue: PropTypes.bool
  };

  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      multi: props.multi,
      options: [...props.options],
      value,
      isFetching: props.isFetching && (!props.options || !props.options.length)
    };
  }

  componentDidMount() {
    this.setValue();
  }

  componentDidUpdate() {
    const { value: stateValue, isFetching } = this.state;
    const { value: propsValue, trackValue, options } = this.props;

    if (isFetching && Object.keys(options).length) {
      this.setValue();
      this.completeAsyncLoading();
    }
    if (stateValue !== propsValue && trackValue) {
      this.setState({
        value: propsValue
      });
    }
  }

  setValue = () => {
    const { setValue, options } = this.props;
    if (setValue !== 'no') {
      const random = Math.floor(Math.random() * (options.length - 0));
      const value =
        setValue === 'random' ? options[random].value : options[0].value;
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
    const { nameParams } = this.props;
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

    this.setState({ value: newValue });
    if (nameParams) {
      this.props.onChange(nameParams, newValue);
    } else {
      this.props.onChange(newValue);
    }
  };

  filterOptions = (options, filter, currentValues) => {
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
    let { options } = this.state;
    const {
      changeable,
      noOptionsMessage,
      className,
      disabled,
      searchable,
      clearable,
      placeholder
    } = this.props;
    if (Object.keys(changeable).length) {
      options = options.filter(
        obj =>
          obj[changeable.key] !==
          this.props[changeable.storeName][changeable.storeField]
      );
    }

    let curValue = value;
    if (multi && value) {
      if (value.length) {
        curValue = options.filter(
          option => value.filter(valOption => option.value === valOption).length
        );
      }
    } else if (value || value === 0) {
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
      filterOptions: this.filterOptions,
      isDisabled: disabled,
      isSearchable: searchable,
      isClearable: clearable,
      placeholder,
      onOpen: this.onOpenSelect,
      noOptionsMessage
    };

    return (
      <>
        {this.props.creatable ? (
          <Select.Creatable {...props} />
        ) : (
          <Select {...props} />
        )}
      </>
    );
  }
}
