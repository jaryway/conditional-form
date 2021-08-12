import { GlobalRegistry, IDesignerRegistry } from '../core/registry';

export const useRegistry = (): IDesignerRegistry => {
  return window['__DESIGNER_REGISTRY__'] || GlobalRegistry;
};
