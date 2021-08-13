import { useContext } from 'react';
import { SelectionContext } from '../providers';
// import { useOperation } from './useOperation'

export const useSelection = (workspaceId?: string) => {
  // const operation = useContext(SelectionContext)
  // return operation?.selection
  return useContext(SelectionContext);
};
