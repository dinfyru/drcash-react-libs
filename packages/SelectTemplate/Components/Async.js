import React from 'react';
import Creatable from 'react-select/creatable';

export default (props) => {
  const { selectProps } = props;

  return <Creatable {...selectProps} />;
};
