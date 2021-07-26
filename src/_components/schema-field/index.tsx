import React, { FC, Fragment } from 'react';
import { SchemaMarkupContext, SchemaOptionsContext } from '../context';
import { Schema } from '../../json-schema/schema';
import RecursionField from '../recursion-field';

const SchemaField: FC<any> = () => {
  return <div></div>;
};

export default SchemaField;

interface ISchemaFieldProps<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
> {
  components?: Record<string, JSXComponent>;
  children?: any;
  schema: any;
}
export type JSXComponent = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
export type SchemaReactComponents = Record<string, JSXComponent>;

const env = {
  nonameId: 0,
};

export function createSchemaField<Components extends SchemaReactComponents>(options: any) {
  //
  function SchemaField<Decorator extends JSXComponent, Component extends JSXComponent>(
    props: ISchemaFieldProps<Decorator, Component>,
  ) {
    const schema = Schema.isSchemaInstance(props.schema)
      ? props.schema
      : new Schema({
          type: 'object',
          ...props.schema,
        });

    const renderMarkup = () => {
      env.nonameId = 0;

      return (
        <SchemaMarkupContext.Provider value={schema}>{props.children}</SchemaMarkupContext.Provider>
      );
    };

    const renderChildren = () => {
      return <RecursionField {...props} schema={schema} />;
    };

    return (
      <SchemaOptionsContext.Provider
        value={{
          ...options,
          components: {
            ...options.components,
            ...props.components,
          },
        }}
      >
        {renderMarkup()}
        {renderChildren()}
      </SchemaOptionsContext.Provider>
    );
  }

  return SchemaField;
}
