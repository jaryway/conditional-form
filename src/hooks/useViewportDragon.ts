import { useEffect } from 'react';
import { useDesigner } from './useDesigner';
import { useOperation } from './useOperation';

export const useDragon = (workspaceId?: string) => {
  const designer = useDesigner();
  const operation = useOperation(workspaceId);

  useEffect(()=>{
    // designer.subscribeTo()
  },[])

  console.log('Insertion.operation', operation);

  return operation?.viewportDragon;
};
