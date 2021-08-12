import { useContext, useEffect } from 'react';
import { useOperation } from './useOperation';
import { useForceUpdate } from './useForceUpdate';
import { useDesigner } from './useDesigner';
import {
  InsertAfterEvent,
  InsertBeforeEvent,
  InsertChildrenEvent,
  PrependNodeEvent,
  RemoveNodeEvent,
  UpdateChildrenEvent,
  UpdateNodePropsEvent,
  AppendNodeEvent,
} from '../core/events';
import { TreeContext } from '../providers';

export const useTree = (workspaceId?: string) => {
  const designer = useDesigner();
  const tree = useContext(TreeContext);

  console.log('useTree-useTree', tree, workspaceId);

  return tree || designer.workbench.currentWorkspace?.operation?.tree;
  // const operation = useOperation(workspaceId);
  // const designer = useDesigner();
  // const forceUpdate = useForceUpdate();

  // useEffect(() => {
  //   designer.subscribeTo(InsertAfterEvent, forceUpdate);
  //   designer.subscribeTo(InsertBeforeEvent, forceUpdate);
  //   designer.subscribeTo(InsertChildrenEvent, forceUpdate);
  //   designer.subscribeTo(PrependNodeEvent, forceUpdate);
  //   designer.subscribeTo(RemoveNodeEvent, forceUpdate);
  //   designer.subscribeTo(UpdateChildrenEvent, forceUpdate);
  //   designer.subscribeTo(UpdateNodePropsEvent, forceUpdate);
  //   designer.subscribeTo(AppendNodeEvent, forceUpdate);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // return operation?.tree;
};
