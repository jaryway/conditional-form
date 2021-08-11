import React, { FC, useState, createContext } from 'react';
import useEngine from '../hooks/useEngine';

export const SelectionContext = createContext<{}>({} as any);

const SelectionProvider: FC<any> = ({ children }) => {
  const engine = useEngine();

  const [selected, setSelected] = useState(engine);

  return <SelectionContext.Provider value={{}}>{children}</SelectionContext.Provider>;
};

export default SelectionProvider;
