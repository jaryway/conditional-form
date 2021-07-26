import React, { FC } from 'react';
import { FieldContext } from '../context';

const Field: FC<any> = (props) => {
  return <FieldContext.Provider value={props.value}>{
      
  }</FieldContext.Provider>;
};

export default Field;
