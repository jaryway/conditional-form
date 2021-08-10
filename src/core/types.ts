import { Engine } from './models/Engine';
import { EventEngine, IEventProps } from '../shared';

export type IEngineContext = {
  // workspace: Workspace
  // workbench: Workbench
  engine: Engine;
  // viewport: Viewport
};

export type IEngineProps<T = EventEngine> = IEventProps<T> & {
  sourceIdAttrName?: string; //拖拽源Id的dom属性名
  nodeIdAttrName?: string; //节点Id的dom属性名
  outlineNodeIdAttrName?: string; //大纲树节点ID的dom属性名
  nodeHelpersIdAttrName?: string; //节点工具栏属性名
  //   defaultComponentTree?: ITreeNode[]; //默认组件树
  //   defaultScreenType?: ScreenType;
  //   shortcuts?: Shortcut[];
};
