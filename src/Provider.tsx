import React, { FC, useState } from 'react';
import { AppContext } from './context';
// import { MouseClickEvent } from './core/events';
import { Engine } from './core/models/Engine';
import CursorProvider from './providers/CursorProvider';

const Provider: FC<{ engine: Engine }> = ({ engine, children }) => {
  const [cursorStatus, setCursorStatus] = useState('NORMAL');

  return (
    <AppContext.Provider value={{ engine, cursorStatus, setCursorStatus }}>
      <CursorProvider>{children}</CursorProvider>
    </AppContext.Provider>
  );
};

export default Provider;
