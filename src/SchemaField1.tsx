import React, { FC, createElement, Fragment, useContext, useMemo } from 'react';
import { Input, Checkbox, Card, Select, Switch, Form, DatePicker, Radio } from 'antd';
import { Field } from 'react-final-form';
import { ConditionalField } from './components/conditional-field';
// import FormControl from './components/form-control';
import { RegistryComponentsContext, SchemaFormContext } from './context';
import { ISchema } from './interface';
import { Schema } from './json-schema/schema';
import { isFn } from './json-schema/utils';
import FormControl from './components/form-control';
// import { JsxElement } from 'typescript';

const components: { [k: string]: React.JSXElementConstructor<any> } = {
  FormItem: Form.Item,
  Select,
  Input,
  Switch,
  Card,
  'DatePicker.RangePicker': DatePicker.RangePicker,
  'Radio.Group': Radio.Group,
};

interface ISchemaFieldProps<Decorator = any, Component = any> {
  schema: ISchema;
  names?: string[];
}

const SchemaField: FC<ISchemaFieldProps> = ({ children, names = [], ...props }) => {
  const fieldSchema = useMemo(() => {
    const schema = new Schema(props.schema as any);
    return schema;
  }, [props.schema]);

  console.log('schema', !fieldSchema, fieldSchema);

  const getBasePath = () => {
    // if (props.onlyRenderProperties) {
    //   return props.basePath || parent?.address.concat(props.name);
    // }
    // return props.basePath || parent?.address;
    <Radio.Group options={[{ value: 'ssss', label: 'xxxxx' }]}></Radio.Group>;
    return '';
  };

  const renderProperties = (field?: any) => {
    return (
      <Fragment>
        {fieldSchema.mapProperties((item, name, index) => {
          // const base = ''; //field?.address || basePath;
          let schema: Schema = item;
          return <SchemaField key={`${index}-${name}`} schema={schema as any} />;
        })}
        {fieldSchema['x-content']}
        121
      </Fragment>
    );
  };

  const render = () => {
    const decorator = components[fieldSchema['x-decorator']];
    const component = components[fieldSchema['x-component']];
    const { enum: options } = fieldSchema['x-component-props'] || {};

    console.log('options', options, fieldSchema);

    return createElement(
      decorator,
      { ...fieldSchema['x-component-props'], name: fieldSchema.name, label: fieldSchema.title },
      createElement(component || 'div', { ...fieldSchema['x-component-props'], options }),
    );
  };

  if (!fieldSchema) return <Fragment />;

  if (fieldSchema.type === 'object' || fieldSchema.type === 'void') {
    return <Card data-type={fieldSchema.type}>{renderProperties()}</Card>;
  }

  return render();
};

export default SchemaField;
