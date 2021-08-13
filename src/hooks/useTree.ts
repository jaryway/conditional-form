import { useContext } from 'react';
// import { useOperation } from './useOperation';
// import { useForceUpdate } from './useForceUpdate';
// import { useDesigner } from './useDesigner';

import { TreeContext } from '../providers';
// import { useWorkspace } from './useWorkspace';

export const useTree = (workspaceId?: string) => {
  const tree = useContext(TreeContext);

  return tree;
};
