import { useContext } from 'react';
import { AppContext } from '../context';

const useEngine = () => {
  const { engine } = useContext(AppContext);
  return engine;
};

export default useEngine;
