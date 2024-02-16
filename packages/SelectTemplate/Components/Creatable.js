import React, { useRef } from 'react';
import AsyncSelect from 'react-select/async';

export default (props) => {
  const { selectProps, inputValue } = props;

  const selectRef = useRef();

  return (
    <AsyncSelect
      inputValue={inputValue}
      cacheOptions
      debounceInterval={300}
      ref={selectRef}
      onFocus={() =>
        selectRef.current.onInputChange(inputValue, {
          prevInputValue: '',
          action: 'set-value',
        })
      }
      {...selectProps}
    />
  );
};
