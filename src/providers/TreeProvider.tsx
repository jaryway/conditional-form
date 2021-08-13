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
import { useDesigner, useForceUpdate, useWorkspace } from '../hooks';
// import { useWorkspace } from '../hooks/useWorkspace';

export const TreeContext = createContext<TreeNode>({} as any);

export const TreeProvider: FC<any> = ({ children }) => {
  const designer = useDesigner();
  const workspace = useWorkspace();
  const _forceUpdate = useForceUpdate();

  useEffect(() => {
    const forceUpdate = () => {
      // console.log('TreeProvider');
      _forceUpdate();
    };

    designer.subscribeTo(AddWorkspaceEvent, forceUpdate);
    designer.subscribeTo(InsertAfterEvent, forceUpdate);
    designer.subscribeTo(InsertBeforeEvent, forceUpdate);
    designer.subscribeTo(InsertChildrenEvent, forceUpdate);
    designer.subscribeTo(PrependNodeEvent, forceUpdate);
    designer.subscribeTo(RemoveNodeEvent, forceUpdate);
    designer.subscribeTo(UpdateChildrenEvent, forceUpdate);
    designer.subscribeTo(UpdateNodePropsEvent, forceUpdate);
    designer.subscribeTo(AppendNodeEvent, forceUpdate);
  }, [_forceUpdate, designer]);

  const { tree } = workspace?.operation || {};

  return <TreeContext.Provider value={new TreeNode({ ...tree })}>{children}</TreeContext.Provider>;
};
