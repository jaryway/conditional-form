import { useContext } from 'react';
import { useDesigner } from './useDesigner';
import { WorkspaceContext } from '../providers/WorkspaceProvider';
import { Workspace } from '../core/models';
export const useWorkspace = (id?: string): Workspace => {
  const designer = useDesigner();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const workspaceId = id || useContext(WorkspaceContext)?.id;
  if (workspaceId) {
    return designer.workbench.findWorkspaceById(workspaceId);
  }

  if (window['__DESINGER_WORKSPACE__']) return window['__DESINGER_WORKSPACE__'];
  return designer.workbench.currentWorkspace;
};
