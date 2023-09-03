import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select, { components, createFilter } from 'react-select';
import Creatable from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import debounce from 'debounce-promise';
import cloneDeep from 'lodash.clonedeep';
import styled from 'styled-components';

import './index.sass';

const Label = styled.label`
  left: 12px;
  pointer-events: none;
  position: absolute;
  color: #bababa;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  z-index: 2;

  top: ${props => (props.isFloating ? '5px' : '10px')};
  font-size: ${props => (props.isFloating ? '8px' : '14px')};
`;

const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    <Label isFloating={props.isFocused || props.hasValue}>
      {props.selectProps.placeholder}
    </Label>
    {children}
  </components.Control>
);
const CustomMultiValueContainer = ({ children, ...props }) => {
  const isMultiValue = props.selectProps.value.length > 1;
  return (
    <components.MultiValueContainer
      {...props}
      innerProps={{
        ...props.innerProps,
        className: `select__multi-value${
          !Array.isArray(props.selectProps.value) ||
          props.selectProps.value.length === 1
            ? ' is-single'
            : ''
        }${props.selectProps.inputValue.length ? ' is-searching' : ''}`
      }}
    >
      {!props.selectProps.inputValue.length && (
        <components.Placeholder
          {...props}
          isFocused={props.isFocused}
          getStyles={() => {}}
          getClassNames={(name, props) => {
            return 'placeholder-test';
          }}
          cx={(c, b, f, d) => {
            return { className: b };
          }}
          className={'placeholder'}
          innerProps={{
            ...props.innerProps,
            className: 'select__placeholder'
          }}
        >
          {isMultiValue ? (
            <span style={{ color: '#333333' }}>
              Selected {props.selectProps.value.length}
            </span>
          ) : (
            props.selectProps.placeholder
          )}
        </components.Placeholder>
      )}

      {React.Children.map(children, child =>
        child && child.type !== Placeholder ? child : null
      )}
    </components.MultiValueContainer>
  );
};
const Placeholder = props => {
  return props.selectProps.placeholder;
  return (
    <components.Placeholder {...props} isFocused={true}>
      {props.selectProps.placeholder}
    </components.Placeholder>
  );
};

const Option = optionHtml => props => {
  const style = {};

  const groupLabel = props.selectProps.formatGroupLabel(props);
  if (groupLabel && typeof groupLabel !== 'string') {
    const { active } = props.options.find(
      group => group.tier === props.data.tier
    );
    if (!active && !props.selectProps.inputValue) {
      style.display = 'none';
    }
  }
  return (
    <span style={style}>
      <components.Option {...props}>
        {optionHtml(props)}
        {props.children}
      </components.Option>
    </span>
  );
};

function once(f) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      return f.apply(this, arguments);
    }
  };
}

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
    filterOption: false,
    onInputChange: false,
    valueForFirst: false,
    mustUpdate: false,
    formatGroupLabel: false,
    closeMenuOnSelect: true,
    hideSelectedOptions: false,
    getOptionLabel: false,
    getOptionValue: false,
    menuIsOpen: false,
    optionHtml: false
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
    menuIsOpen: PropTypes.bool,
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
    mustUpdate: PropTypes.bool,
    closeMenuOnSelect: PropTypes.bool,
    hideSelectedOptions: PropTypes.bool,
    filterOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    formatGroupLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    getOptionLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    getOptionValue: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    optionHtml: PropTypes.element
  };

  constructor(props) {
    super(props);

    const { value, loadOptions } = props;
    this.state = {
      multi: props.multi,
      options: [...props.options],
      value: !loadOptions ? value : undefined,
      disabled: false,
      inputValue: '',
      filteredOptions: [],
      isFetching: props.isFetching,
      valueForFirst: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      value: stateValue,
      isFetching,
      valueForFirst,
      loaded,
      disabled
    } = prevState;
    const {
      value: propsValue,
      trackValue,
      options,
      valueForFirst: valueForFirstProps,
      loadOptions,
      mustUpdate,
      setValue,
      async,
      formatGroupLabel
    } = nextProps;

    const newState = {};

    if (isFetching && Array.isArray(options) && options.length) {
      newState.options = options;
      newState.isFetching = false;

      if (setValue && options && options.length) {
        const random = Math.floor(Math.random() * (options.length - 0));
        newState.value = setValue === 2 ? options[random] : options[0];
        nextProps.onChange(newState.value.value);
      }
    }

    if (stateValue !== propsValue && !async && !loadOptions) {
      newState.value = propsValue;
    }

    if (
      !stateValue &&
      valueForFirstProps &&
      nextProps.loadOptions &&
      !disabled
    ) {
      newState.l = once(() =>
        nextProps.loadOptions(valueForFirstProps, 'true')
      );
      newState.disabled = true;
      // newState.valueForFirst = valueForFirstProps;
    }

    return newState;
  }

  componentDidMount() {
    const { props } = this;
    const { disabled, l } = this.state;
    if (props.loadOptions && props.async) {
      this.debounceLoadOptions = debounce(props.loadOptions, 300);
    }

    if (l && disabled) {
      const loadingOptions = l();
      if (loadingOptions) {
        this.setValueForFirst(loadingOptions);
      }
    }
  }

  componentDidUpdate() {
    const { disabled, l } = this.state;

    if (l && disabled) {
      const loadingOptions = l();
      if (loadingOptions) {
        this.setValueForFirst(loadingOptions);
      }
    }
  }

  setValueForFirst = loadOptions => {
    const { disabled } = this.state;
    const { valueForFirst, async, generateOptions } = this.props;

    if (!disabled || !loadOptions) return;
    loadOptions
      .then(responseData => {
        let formattedData = cloneDeep(responseData || []);
        if (generateOptions) {
          formattedData = generateOptions(formattedData);
        }
        const data = formattedData.filter(el => {
          if (el.value && el.value.toString) {
            if (Array.isArray(valueForFirst)) {
              if (
                valueForFirst
                  .map(item => (item.toString ? item.toString() : ''))
                  .indexOf(el.value.toString()) >= 0
              ) {
                return true;
              }
            } else if (
              valueForFirst.toString &&
              el.value.toString() === valueForFirst.toString()
            ) {
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
          loaded: true,
          disabled: false,
          l: null
        });
      })
      .catch(() => {
        this.setState({
          disabled: false,
          l: null
        });
      });
  };

  completeAsyncLoading = () => {
    this.setState({
      options: this.props.options,
      isFetching: false
    });
  };

  handleOnChange = (value, action) => {
    const { nameParams, maxSizeValue } = this.props;
    const { multi, value: stateValue } = this.state;

    if (action && action.action === 'select-option' && multi) {
      if (
        maxSizeValue &&
        Array.isArray(stateValue) &&
        stateValue.length >= maxSizeValue
      ) {
        return;
      }
    }

    return this.callbackOnChange(value, nameParams, false, action);
  };

  callbackOnChange = (value, nameParams, label, action) => {
    this.setState(
      {
        value,
        valueForFirst: null
      },
      () => {
        const { getOptionValue } = this.props;
        let valueForResponse = value;
        if (Array.isArray(valueForResponse)) {
          valueForResponse = valueForResponse.map(option => {
            if (getOptionValue) {
              return getOptionValue(option);
            }

            return option.value;
          });
        } else {
          if (valueForResponse) {
            if (getOptionValue) {
              valueForResponse = getOptionValue(valueForResponse);
            } else {
              valueForResponse = valueForResponse.value;
            }
          }
        }
        this.props.onChange(valueForResponse, nameParams, label, action);
      }
    );
  };

  handleInputChange = (filter = '', { action, prevInputValue }) => {
    if (!this.props.async) {
      if (action === 'input-change' || action === 'menu-close') {
        this.setState(prevState => {
          const { options } = prevState;
          const filteredOptions = this.filterOptions(options, filter);
          return { filteredOptions };
        });
      }
    }

    this.setState({ inputValue: filter });
  };

  filterOptions = (options, filter) => {
    const { getOptionLabel, getOptionValue } = this.props;
    let newOptions = null;
    if (filter !== '') {
      const filterEscapeChar = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regexpStart = new RegExp(`^${filterEscapeChar}`, 'i');
      const regexpStartWord = new RegExp(`\\b${filterEscapeChar}`, 'i');
      const regexpGlobal = new RegExp(filterEscapeChar, 'gi');

      // Ищем по value в начале строки
      newOptions = options.filter(option =>
        regexpStart.test(getOptionValue ? getOptionValue(option) : option.value)
      );
      // Ищем по label в начале слова
      newOptions = [
        ...newOptions,
        ...options.filter(option => {
          let label = getOptionLabel ? getOptionLabel(option) : option.label;
          if (
            typeof label !== 'string' &&
            label.props &&
            label.props.children
          ) {
            label = label.props.children.join('');
          }
          return (
            regexpStartWord.test(label) &&
            !newOptions.find(
              elem =>
                (getOptionValue ? getOptionValue(elem) : elem.value) ===
                (getOptionValue ? getOptionValue(option) : option.value)
            )
          );
        })
      ];
      // Ищем по label в начале строки
      newOptions = [
        ...newOptions,
        ...options.filter(option => {
          let label = getOptionLabel ? getOptionLabel(option) : option.label;
          if (
            typeof label !== 'string' &&
            label.props &&
            label.props.children
          ) {
            label = label.props.children.join('');
          }
          return (
            regexpGlobal.test(label) &&
            !newOptions.find(
              elem =>
                (getOptionValue ? getOptionValue(elem) : elem.value) ===
                (getOptionValue ? getOptionValue(option) : option.value)
            )
          );
        })
      ];
    }
    return newOptions || options;
  };

  render() {
    const { multi, value, isFetching } = this.state;
    const {
      options: optionsState,
      disabled: disabledState,
      filteredOptions,
      inputValue
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
      creatable,
      onInputChange,
      formatGroupLabel,
      getOptionLabel,
      getOptionValue,
      closeMenuOnSelect,
      hideSelectedOptions,
      optionHtml,
      menuIsOpen,
      maxSizeValue,
      filterOption,
      filterFunc,
      isFetching: isFetchingProps,
      showMenuList
    } = this.props;
    let options =
      Array.isArray(filteredOptions) && filteredOptions.length
        ? filteredOptions
        : optionsState;
    if (Object.keys(changeable).length && !getOptionValue) {
      options = options.filter(
        obj =>
          obj[changeable.key] !==
          this.props[changeable.storeName][changeable.storeField]
      );
    }
    if (formatGroupLabel) {
      options = options.map(item => {
        const newItem = { ...item };
        newItem.options = newItem.options.filter(filterFunc);
        return newItem;
      });
    } else {
      options = options.filter(filterFunc);
    }

    let curValue = value;
    if (multi && value && !creatable) {
      if (value.length && !this.debounceLoadOptions && !getOptionValue) {
        curValue = optionsState.filter(
          option => value.filter(valOption => option.value === valOption).length
        );
      }
    } else if ((value || value === 0) && !async && !creatable) {
      curValue = options.filter(
        option =>
          (getOptionValue ? getOptionValue(option) : option.value) === value
      );
    }

    if (creatable && multi && Array.isArray(value)) {
      curValue = value.map(element => ({
        label: element,
        value: element
      }));
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
      noOptionsMessage,
      hideSelectedOptions,
      closeMenuOnSelect,
      components: {}
    };

    if (!async && searchable) {
      props.filterOption = createFilter({
        ignoreCase: true,
        ignoreAccents: true,
        trim: true,
        stringify: option => {
          let label = option.label;
          if (
            typeof label !== 'string' &&
            label.props &&
            label.props.children
          ) {
            label = label.props.children.join('');
          }
          return label;
        },
        matchFrom: 'any'
      });
    }

    if (
      maxSizeValue &&
      value &&
      Array.isArray(value) &&
      value.length >= maxSizeValue
    ) {
      props.isSearchable = false;
      props.noOptionsMessage = () => 'Maximum selected values reached';
    }

    if (menuIsOpen) {
      props.menuIsOpen = menuIsOpen;
    }

    if (showMenuList) {
      props.components.MenuList = props => {
        let opts = value || [];
        if (!Array.isArray(value)) {
          opts = [value];
        }
        return (
          <>
            <span
              className={`offfer-top__selected${
                opts.filter(v => v).length ? '' : ' empty'
              }`}
            >
              {opts
                .filter(v => v)
                .map(option =>
                  Option(() => {})({
                    ...props,
                    children: option.label,
                    data: option,
                    type: 'option',
                    ...option,
                    className: 'selected-option',
                    isSelected: true,
                    innerProps: {
                      onClick: () => {
                        let opts = value || [];
                        if (!Array.isArray(value)) {
                          opts = [value];
                        }
                        this.handleOnChange(
                          opts.filter(val => val.value !== option.value)
                        );
                      }
                    }
                  })
                )}
            </span>
            <components.MenuList {...props}>
              {props.children}
            </components.MenuList>
          </>
        );
      };
    }

    if (optionHtml) {
      props.components.Option = Option(optionHtml);
      props.components.MultiValueContainer = CustomMultiValueContainer;
    }

    if (formatGroupLabel) {
      props.formatGroupLabel = formatGroupLabel;
    }

    if (getOptionLabel) {
      props.getOptionLabel = getOptionLabel;
    }

    if (getOptionValue) {
      props.getOptionValue = getOptionValue;
    }

    if (filterOption) {
      props.filterOption = filterOption;
    }

    if (async) {
      props.defaultOptions = defaultOptions;
      if (this.debounceLoadOptions) {
        props.loadOptions = this.debounceLoadOptions;
      }
    }

    if (creatable) {
      return (
        <Creatable
          {...props}
          // components={{ Control }}
        />
      );
    }
    if (async) {
      return (
        <AsyncSelect
          inputValue={inputValue}
          cacheOptions
          debounceInterval={300}
          // components={{ Control }}
          {...props}
        />
      );
    }

    return (
      <Select
        {...props}
        // components={{ Control }}
      />
    );
  }
}

export default SelectTemplate;
