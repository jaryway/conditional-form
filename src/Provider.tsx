import React, { FC, useState } from 'react';
import { AppContext } from './context';

const Provider: FC<any> = ({ engine, children }) => {
  const [cursorStatus, setCursorStatus] = useState('NORMAL');
  console.log('cursorStatus-provider');
  return (
    <AppContext.Provider value={{ engine, cursorStatus, setCursorStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
