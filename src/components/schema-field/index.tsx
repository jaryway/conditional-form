import React, { FC, Fragment, useMemo, useContext } from 'react';
// import { Schema as JsonSchema } from '@formily/json-schema';
import { SchemaMarkupContext, SchemaOptionsContext } from '../../context';
// import {Form as AntForm ,Input} from 'antd'
import { Schema } from '../../json-schema/schema';
import Field from '../field';
import { Path } from '@formily/path';

const SchemaField: FC<any> = (props) => {
  const options = useContext(SchemaOptionsContext);
  //   const s = JSON.stringify(props.schema);
  //   console.log('sssss', s);

  const fieldSchema = useMemo(() => {
    const schema = Schema.isSchemaInstance(props.schema)
      ? props.schema
      : new Schema({ type: 'object', ...props.schema });

    return schema as Schema;
  }, [props.schema]);

  const fieldProps = useMemo(() => {
    return fieldSchema?.toFieldProps(options) as any;
  }, [fieldSchema, options]);
  // console.log('fieldProps', fieldProps);
  // console.log(
  //   'fieldPropsfieldProps',
  //   fieldSchema,
  //   new JsonSchema({ type: 'object', ...JSON.parse(s) }),
  // );
  const parent = useContext(SchemaMarkupContext);
  const getName = () => {
    if (fieldSchema.type === 'void') return parent.name;
    return Path.parse(parent?.name)
      .concat(fieldSchema?.name || '')
      .toString();
  };
  const getAddress = () => {
    return Path.parse(parent?.address || parent.name)
      .concat(fieldSchema?.name || '')
      .toString();
  };

  const name = getName();
  const address = getAddress();

  const renderProperties = (field?: any) => {
    return (
      <Fragment>
        {fieldSchema.mapProperties((item, name, index) => {
          let schema: Schema = item;
          return <SchemaField key={`${index}-${name}`} schema={schema as any} />;
        })}
        {fieldSchema['x-content']}
      </Fragment>
    );
  };

  if (fieldSchema.type === 'object' || fieldSchema.type === 'void') {
    return (
      <SchemaMarkupContext.Provider value={{ schema: fieldSchema, name, address }}>
        <Field {...fieldProps} name={undefined}>
          {renderProperties()}
        </Field>
      </SchemaMarkupContext.Provider>
    );
  }

  return (
    <SchemaMarkupContext.Provider value={{ schema: fieldSchema, name, address }}>
      <Field {...fieldProps} name={name}>
        {props.children}
      </Field>
    </SchemaMarkupContext.Provider>
  );
};

export default SchemaField;
