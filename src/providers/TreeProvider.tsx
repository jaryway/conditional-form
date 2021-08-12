import React, { FC, createContext, useEffect } from 'react';
import {
  AddWorkspaceEvent,
  AppendNodeEvent,
  InsertAfterEvent,
  InsertBeforeEvent,
  InsertChildrenEvent,
  PrependNodeEvent,
  RemoveNodeEvent,
  UpdateChildrenEvent,
  UpdateNodePropsEvent,
} from '../core/events';
import { TreeNode } from '../core/models';
import { useDesigner, useForceUpdate } from '../hooks';

export const TreeContext = createContext<TreeNode>({} as any);

export const TreeProvider: FC<any> = ({ children }) => {
  const designer = useDesigner();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    console.log('useTree-useEffect');
    designer.subscribeTo(AddWorkspaceEvent, () => {
      console.log('useTree-AddWorkspaceEvent');
      forceUpdate();
    });
    designer.subscribeTo(InsertAfterEvent, forceUpdate);
    designer.subscribeTo(InsertBeforeEvent, forceUpdate);
    designer.subscribeTo(InsertChildrenEvent, forceUpdate);
    designer.subscribeTo(PrependNodeEvent, forceUpdate);
    designer.subscribeTo(RemoveNodeEvent, forceUpdate);
    designer.subscribeTo(UpdateChildrenEvent, forceUpdate);
    designer.subscribeTo(UpdateNodePropsEvent, forceUpdate);
    designer.subscribeTo(AppendNodeEvent, forceUpdate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('useTree.TreeProvider', designer.workbench?.currentWorkspace?.operation?.tree);

  return (
    <TreeContext.Provider value={designer.workbench?.currentWorkspace?.operation?.tree}>
      {children}
    </TreeContext.Provider>
  );
};
