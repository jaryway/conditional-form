import React, { FC, Fragment, useMemo, useContext } from 'react';
import { Schema as JsonSchema } from '@formily/json-schema';
import { SchemaOptionsContext } from '../../context';
// import {Form as AntForm ,Input} from 'antd'
import { Schema } from '../../json-schema/schema';
import Field from '../field';

const SchemaField: FC<any> = (props) => {
  const options = useContext(SchemaOptionsContext);
  const s = JSON.stringify(props.schema);
  console.log('sssss', s);

  const fieldSchema = useMemo(() => {
    const schema = Schema.isSchemaInstance(props.schema)
      ? props.schema
      : //   : new JsonSchema({ type: 'object', ...props.schema });
        new Schema({
          type: 'object',
        //   ...JSON.parse(s),
        });

    return schema as Schema;
  }, [props.schema]);

  const fieldProps = useMemo(() => {
    return fieldSchema?.toFieldProps(options) as any;
  }, [fieldSchema, options]);
  //   console.log('schema', schema);
  console.log(
    'fieldPropsfieldProps',
    fieldSchema,
    new JsonSchema({ type: 'object', ...JSON.parse(s) }),
  );

  const renderProperties = (field?: any) => {
    // console.log('renderProperties', fieldSchema, fieldProps);
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
      <Field {...fieldProps} name={fieldSchema.name}>
        {renderProperties()}
      </Field>
    );
  }

  return (
    <Field {...fieldProps} name={fieldSchema.name}>
      {props.children}
    </Field>
  );
};

export default SchemaField;
