import { EventEngine, IEventProps } from '../shared';
import { Workspace, Workbench, Engine, TreeNode, ITreeNode, Viewport } from './models';
import { ISchema } from '../json-schema/schema';

export type IEngineContext = {
  workspace: Workspace;
  workbench: Workbench;
  engine: Engine;
  viewport: Viewport;
};

export type IEngineProps<T = EventEngine> = IEventProps<T> & {
  sourceIdAttrName?: string; //拖拽源Id的dom属性名
  nodeIdAttrName?: string; //节点Id的dom属性名
  outlineNodeIdAttrName?: string; //大纲树节点ID的dom属性名
  nodeHelpersIdAttrName?: string; //节点工具栏属性名
  defaultComponentTree?: ITreeNode[]; //默认组件树
  //   defaultScreenType?: ScreenType;
  //   shortcuts?: Shortcut[];
};

export type WorkbenchTypes = 'DESIGNABLE' | 'PREVIEW' | 'JSONTREE' | 'MARKUP' | (string & {});

export interface IDesignerProps {
  package?: string; //npm包名
  registry?: string; //web npm注册平台地址
  version?: string; //semever版本号
  path?: string; //组件模块路径
  title?: string; //标题
  description?: string; //描述
  icon?: string; //icon
  group?: string; //分类
  droppable?: boolean; //是否可作为拖拽容器，默认为true
  draggable?: boolean; //是否可拖拽，默认为true
  deletable?: boolean; //是否可删除，默认为true
  cloneable?: boolean; //是否可拷贝，默认为true
  resizable?: boolean; //是否可修改尺寸，默认为false
  inlineLayout?: boolean; //是否是内联布局
  inlineChildrenLayout?: boolean; //子节点是否内联
  selfRenderChildren?: boolean; //是否自己渲染子节点
  propsSchema?: ISchema; //Formily JSON Schema
  defaultProps?: any; //默认属性
  effects?: (engine: Engine) => void;
  getDragNodes?: (node: TreeNode) => TreeNode | TreeNode[]; //拦截拖拽节点
  getComponentProps?: (node: TreeNode) => any; //拦截属性
  allowAppend?: (target: TreeNode, sources?: TreeNode[]) => boolean;
  allowSiblings?: (target: TreeNode, sources?: TreeNode[]) => boolean;
  [key: string]: any;
}

export type IDesignerControllerProps = IDesignerProps | ((node: TreeNode) => IDesignerProps);

export type IDesignerControllerPropsMap = Record<string, IDesignerControllerProps>;

export type IControlNodeMetaType = {
  componentName: string; //指定组件类型
  id?: string; //指定实例ID
  maxInstances?: number; //最大实例数量
  minInstances?: number; //最小实例数量
};
