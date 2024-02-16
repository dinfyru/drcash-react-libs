import React from 'react';
import { components } from 'react-select';

export default (optionHtml, formatGroupLabel) => (propsOptions) => {
  const style = {};

  if (formatGroupLabel) {
    const { active } = this.props.options.find(
      (group) => group.tier === propsOptions.data.tier,
    );
    if (!active && !propsOptions.selectProps.inputValue) {
      style.display = 'none';
    }
  }
  return (
    <span style={style}>
      <components.Option {...propsOptions}>
        {optionHtml(propsOptions)}
      </components.Option>
    </span>
  );
};
