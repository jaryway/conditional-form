import React, { FC, createContext, useEffect, useState } from 'react';
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
  //   const [, _forceUpdate] = useState(1111);
  const forceUpdate = useForceUpdate();
  //   const forceUpdate = (e) => {
  //     console.log('useTree.TreeProvider1', e, designer.workbench?.currentWorkspace?.operation?.tree);
  //     _forceUpdate();
  //   };

  useEffect(() => {
    console.log('useTree-useEffect');
    designer.subscribeTo(AddWorkspaceEvent, forceUpdate);
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

  const tree = designer.workbench?.currentWorkspace?.operation?.tree;
  //   console.log('useTree.TreeProvider', tree);

  return <TreeContext.Provider value={Object.assign({}, tree)}>{children}</TreeContext.Provider>;
};
