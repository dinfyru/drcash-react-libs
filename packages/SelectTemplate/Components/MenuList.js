import React, { useRef } from 'react';
import { components } from 'react-select';
import Option from './Option';

export default (props) => {
  let options = value || [];
  if (!Array.isArray(value)) {
    options = [value];
  }
  return (
    <>
      <span
        className={classNames('offfer-top__selected', {
          empty: opts.filter((v) => v).length,
        })}
      >
        {options
          .filter((v) => v)
          .map((option) =>
            this.Option(
              (propsOption) => propsOption.children,
              !!formatGroupLabel,
            )({
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
                    opts.filter((val) => val.value !== option.value),
                  );
                },
              },
            }),
          )}
      </span>
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </>
  );
};
