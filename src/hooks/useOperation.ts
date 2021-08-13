import { useEffect } from 'react';
import { useWorkspace } from './useWorkspace';

export const useOperation = (workspaceId?: string) => {
  const workspace = useWorkspace(workspaceId);

  useEffect(() => {
    console.log('useOperation', workspace);
  }, [workspace?.operation]);

  return workspace?.operation;
};
