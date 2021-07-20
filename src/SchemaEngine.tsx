import React, { FC, createElement, isValidElement } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Checkbox, Form as AntForm, Card, Input } from 'antd';
import SchemaField from './SchemaField';

import { RegistryComponentsContext, SchemaEngineContext, SchemaFormContext } from './context';
import { ISchema, IRegistryComponents, ISchemaForm, ISchemaFormContext } from './interface';
import FormControl from './components/form-control';
import { defaultValueRender } from './defaultValueRender';

// const EngineVersion = '3.0.0';
// interface IRegistryComponents {
//   rootComponent?: React.JSXElementConstructor<any>;
//   formComponent?: React.JSXElementConstructor<any>;
//   virtualFields: {
//     Form: React.JSXElementConstructor<any>;
//     PageSection: React.JSXElementConstructor<any>;
//     ColumnsLayout: React.JSXElementConstructor<any>;
//     Column: React.JSXElementConstructor<any>;
//   };
//   fields: {
//     TableField: React.JSXElementConstructor<any>;
//     TextField: React.JSXElementConstructor<any>;
//     TextareaField: React.JSXElementConstructor<any>;
//     NumberField: React.JSXElementConstructor<any>;
//     BooleanField: React.JSXElementConstructor<any>;
//     RadioField: React.JSXElementConstructor<any>;
//     CheckboxField: React.JSXElementConstructor<any>;
//     SelectField: React.JSXElementConstructor<any>;
//     MultiSelectField: React.JSXElementConstructor<any>;
//     CascadeSelectField: React.JSXElementConstructor<any>;
//     DateField: React.JSXElementConstructor<any>;
//     UploadField: React.JSXElementConstructor<any>;
//     CascadeDateField: React.JSXElementConstructor<any>;
//     EditorField: React.JSXElementConstructor<any>;
//     OrganizationSelectField: React.JSXElementConstructor<any>;
//     RichText: React.JSXElementConstructor<any>;
//     CustomField: React.JSXElementConstructor<any>;
//     // [k: string]: React.ComponentType<any>;
//   };
// }

type ISchemaEngine = ISchemaForm & {
  // schema: ISchema;
  // mode?: 'normal' | 'design' | 'description' = 'normal';
  // descriptionMode?: 'disabled' | 'text';
  children?: React.ReactElement | ((props: FormRenderProps<any, any>) => React.ReactNode);
  extra?: React.ReactElement | ((props: FormRenderProps<any, any>) => React.ReactNode);
  onSubmit?: (v: any) => void;
  // registryComponents?: IRegistryComponents;
  // [K: string]: any;
};

const SchemaEngine: FC<ISchemaEngine> = ({
  children,
  schema: rootSchema,
  onSubmit,
  extra,
  mode,
  descriptionMode,
  registryComponents = {
    rootComponent: 'div',
    formComponent: AntForm,
    formItemComponent: FormControl,
    fields: { CheckboxField: Checkbox.Group, BooleanField: Checkbox, TextField: Input },
    virtualFields: { PageSection: Card },
  } as any,
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
          initialValues={{ gift_c: 'true', fruit01: ['Apple'] }}
          onSubmit={onSubmit || (() => {})}
          render={({ form, submitting, values, ...rest }) => {
            return (
              <RegistryComponentsContext.Provider value={registryComponents}>
                <SchemaFormContext.Provider
                  value={
                    {
                      mode,
                      descriptionMode,
                      schema: rootSchema,
                      value: values,
                      valueRender: defaultValueRender,
                    } as ISchemaFormContext
                  }
                >
                  {createElement(
                    registryComponents.formComponent || 'form',
                    {
                      ...formSchema.props,
                      schema: formSchema,
                      path: `children.0`,
                      onSubmit: rest.handleSubmit,
                    } as any,
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
              </RegistryComponentsContext.Provider>
            );
          }}
        />,
      )}
    </SchemaEngineContext.Provider>
  );
};

export default SchemaEngine;
