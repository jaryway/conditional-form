import { createContext } from 'react';
import { TreeNode } from './core/models';
import { Engine } from './core/models/Engine';
import { IFieldContext, IRegistryComponents, ISchemaFormContext } from './interface';

interface ISchemaEngineContext {
  /**
   * 所使用的流程引擎
   */
  engineVersion: string;
}
export type JSXComponent = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
export type SchemaReactComponents = Record<string, JSXComponent>;
export interface ISchemaOptionsContext<Components extends SchemaReactComponents = any> {
  components: Components;
}

export const SchemaEngineContext = createContext<ISchemaEngineContext>({} as any);
export const SchemaFormContext = createContext<ISchemaFormContext>({} as any);
export const RegistryComponentsContext = createContext<IRegistryComponents>({} as any);
export const FieldContext = createContext<IFieldContext>({} as any);

export const SchemaMarkupContext = createContext<any>({});
export const SchemaOptionsContext = createContext<ISchemaOptionsContext>({} as any);

export const AppContext = createContext<{
  engine: Engine;
  selection?: any;
  cursorStatus: string;
  setCursorStatus: (v: string) => void;
}>({} as any);

export const TreeNodeContext = createContext<TreeNode>(null);
