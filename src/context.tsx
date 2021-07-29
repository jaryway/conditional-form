import { createContext } from 'react';
import { IFieldContext, IRegistryComponents, ISchemaFormContext } from './interface';

interface ISchemaEngineContext {
  /**
   * 所使用的流程引擎
   */
  engineVersion: string;
}

export const SchemaEngineContext = createContext<ISchemaEngineContext>({} as any);
export const SchemaFormContext = createContext<ISchemaFormContext>({} as any);
export const RegistryComponentsContext = createContext<IRegistryComponents>({} as any);
export const FieldContext = createContext<IFieldContext>({} as any);

export const SchemaOptionsContext = createContext<any>({});
