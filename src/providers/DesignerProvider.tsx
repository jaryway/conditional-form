import React, { FC, createContext } from 'react';
// import { AppContext } from './context';
// import { MouseClickEvent } from './core/events';
import { Engine } from '../core/models/Engine';
import CursorProvider from './CursorProvider';
import { SelectionProvider } from './SelectionProvider';
import { TreeProvider } from './TreeProvider';

export const DesignerContext = createContext<{
  engine: Engine;
  prefixCls: string;
  // selection?: any;
  // cursorStatus: string;
  // setCursorStatus: (v: string) => void;
}>({} as any);

export const DesignerProvider: FC<{ engine: Engine }> = ({ engine, children }) => {
  // const [cursorStatus, setCursorStatus] = useState('NORMAL');

  // console.log('DesignerProvider', engine);

  return (
    <DesignerContext.Provider value={{ engine, prefixCls: 'dn-' }}>
      <CursorProvider>
        <TreeProvider>
          <SelectionProvider>{children}</SelectionProvider>
        </TreeProvider>
      </CursorProvider>
    </DesignerContext.Provider>
  );
};

// export default DesignerProvider;
