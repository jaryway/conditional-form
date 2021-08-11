import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import { MouseClickEvent } from '../core/events';
import useDesigner from './useDesigner';

const useSelection = () => {
  const engine = useDesigner();
  const { cursorStatus } = useContext(AppContext);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    engine.subscribeTo(MouseClickEvent, (e: MouseClickEvent) => {
      if (cursorStatus !== 'NORMAL') return;

      const target = e.data.target as HTMLElement;
      const el = target?.closest(`*[data-designer-node-id]`);
      if (!el) return;

      const nodeId = el.getAttribute('data-designer-node-id');

      if (nodeId) {
      }
    });
  }, []);

  return { selected };
};

export default useSelection;
