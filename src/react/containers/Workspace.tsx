import React, { useMemo, useRef, Fragment } from 'react';
import useDesigner from '../../hooks/useDesigner';
import { WorkspaceContext } from '../../providers/WorkspaceProvider';
import { uid } from '../../shared';
export interface IWorkspaceProps {
  id?: string;
  title?: string;
  description?: string;
}

export const Workspace: React.FC<IWorkspaceProps> = ({ id, title, description, ...props }) => {
  const oldId = useRef<string>();
  const designer = useDesigner();
  const workspace = useMemo(() => {
    console.log('mount-workspace')
    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current);
      old.viewport.detachEvents();
    }
    const workspace = {
      id: id || uid(),
      title,
      description,
    };
    designer.workbench.ensureWorkspace(workspace);
    oldId.current = workspace.id;
    return workspace;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Fragment>
      <WorkspaceContext.Provider value={workspace}>{props.children}</WorkspaceContext.Provider>
    </Fragment>
  );
};
