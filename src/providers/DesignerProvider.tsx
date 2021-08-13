import React, { FC, createContext } from 'react';
// import { AppContext } from './context';
// import { MouseClickEvent } from './core/events';
import { Engine } from '../core/models/Engine';

export const DesignerContext = createContext<{
  engine: Engine;
  prefixCls: string;
  // selection?: any;
  // cursorStatus: string;
  // setCursorStatus: (v: string) => void;
}>({} as any);

export const DesignerProvider: FC<{ engine: Engine }> = ({ engine, children }) => {
  // const [cursorStatus, setCursorStatus] = useState('NORMAL');

  return (
    <DesignerContext.Provider value={{ engine, prefixCls: 'dn-' }}>
      {children}
    </DesignerContext.Provider>
  );
};

// export default DesignerProvider;
