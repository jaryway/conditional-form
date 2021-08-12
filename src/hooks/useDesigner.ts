import { useContext } from 'react';
import { DesignerContext } from '../providers/DesignerProvider';
// import { AppContext } from '';

export const useDesigner = () => {
  const { engine } = useContext(DesignerContext);
  return engine;
};

// export default useDesigner;
