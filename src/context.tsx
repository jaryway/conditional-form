import { createContext } from 'react';
import { IRegistryComponents, ISchemaFormContext } from './interface';

interface ISchemaEngineContext {
  /**
   * 所使用的流程引擎
   */
  engineVersion: string;
}

export const SchemaEngineContext = createContext<ISchemaEngineContext>({} as any);
export const SchemaFormContext = createContext<ISchemaFormContext>({} as any);
export const RegistryComponentsContext = createContext<IRegistryComponents>({} as any);
