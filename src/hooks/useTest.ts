import React, { useEffect } from 'react';
import { InsertBeforeEvent } from '../core/events';
import { useDesigner } from './useDesigner';

export const useTest = (p: string) => {
  const engine = useDesigner();

  useEffect(() => {
    // console.log('useTest-useEffect', p);
    engine.subscribeTo(InsertBeforeEvent, (e) => {
      console.log('InsertBeforeEvent');
    });
  }, []);

  console.log('useTest-render', p);

  return engine.cursor.status;
};
