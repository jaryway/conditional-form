import React, { FC, createElement, isValidElement } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm } from 'antd';
import SchemaField from './SchemaField';
// import Schemas from 'mock/form1.data.json';
// import RootCompo

import { SchemaEngineContext, SchemaFormContext } from './context';
// import Root from './components/root';
import { ISchema } from './interface';

// const EngineVersion = '3.0.0';

interface ISchemaEngine {
  schema: ISchema;
  mode?: 'view' | 'design' | 'description';
  children?: React.ReactElement | ((props: FormRenderProps<any, any>) => React.ReactNode);
  extra?: React.ReactElement | ((props: FormRenderProps<any, any>) => React.ReactNode);
  onSubmit?: (v: any) => void;
  registryComponents?: any;
}

const SchemaEngine: FC<ISchemaEngine> = ({
  children,
  schema: rootSchema,
  onSubmit,
  registryComponents = { formComponent: AntForm },
  extra,
  mode,
}) => {
  if (!rootSchema) return <div>无效 Schema，请检查配置</div>;

  const formSchema: ISchema = rootSchema?.children?.[0] || ({} as any);

  return (
    <SchemaEngineContext.Provider value={{ engineVersion: rootSchema.engineVersion || '' }}>
      {createElement(
        registryComponents.rootComponent || 'div',
        {
          className: 'ff-root engine engine-root',
          ...rootSchema.props,
          schema: rootSchema,
          'engine-version': rootSchema.engineVersion,
          version: rootSchema.version,
        },
        <Form
          onSubmit={onSubmit || (() => {})}
          render={({ form, submitting, values, ...rest }) => {
            return (
              <SchemaFormContext.Provider
                value={{ mode: mode || 'view', schema: rootSchema, value: values }}
              >
                {createElement(
                  registryComponents.formComponent || 'form',
                  {
                    ...formSchema.props,
                    schema: formSchema,
                    path: `children.0`,
                    onSubmit: rest.handleSubmit,
                  },
                  isValidElement(extra)
                    ? extra
                    : typeof extra === 'function'
                    ? extra({ form, submitting, values, ...rest })
                    : null,
                  formSchema.children?.map((schema: ISchema, i) => (
                    <SchemaField
                      key={schema.id + i}
                      schema={schema}
                      path={`children.0.children.${i}`}
                    />
                  )),
                  isValidElement(children)
                    ? children
                    : typeof children === 'function'
                    ? children({ form, submitting, values, ...rest })
                    : null,
                )}
              </SchemaFormContext.Provider>
            );
          }}
        />,
      )}
    </SchemaEngineContext.Provider>
  );
};

export default SchemaEngine;
