import React, { useEffect, useState } from 'react';
import useEngine from './useEngine';

const useSelection = () => {
  const engine = useEngine();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    engine.subscribeTo(MouseClickEvent, (e: MouseClickEvent) => {});
  }, []);

  return { selected };
};

export default useSelection;
