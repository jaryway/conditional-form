import React, { FC, createElement, Fragment, useContext, useMemo } from 'react';
import { Input, Upload, Button, Card, Select, Switch, Form, DatePicker, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Field } from 'react-final-form';
import { ConditionalField } from './components/conditional-field';
// import FormControl from './components/form-control';
import { RegistryComponentsContext, SchemaFormContext } from './context';
import { ISchema } from './interface';
import { Schema } from './json-schema/schema';
import { isFn } from './json-schema/utils';
import FormControl from './components/form-control';
import FormGrid from './components/form-grid'; // import { JsxElement } from 'typescript';

console.log('Upload', Upload);
const MyUpload = (props: any) => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);

const components: { [k: string]: React.JSXElementConstructor<any> } = {
  // FormItem: Form.Item,
  FormItem: FormControl,
  FormGrid,
  Select,
  Input,
  Switch,
  Card,
  'DatePicker.RangePicker': DatePicker.RangePicker,
  'Radio.Group': Radio.Group,
  Upload: MyUpload,
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

  const { enum: options, title: label, name, conditions } = (fieldSchema || {}) as any;

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

  const render = () => {
    const decorator = components[fieldSchema['x-decorator']];
    const component = components[fieldSchema['x-component']];

    const returnComponent = createElement(
      decorator,
      { ...fieldSchema['x-component-props'], name, label },
      createElement(component || 'div', { ...fieldSchema['x-component-props'], options }),
    );

    if (conditions && conditions.length)
      return <ConditionalField conditions={conditions}>{returnComponent}</ConditionalField>;

    return returnComponent;
  };

  if (!fieldSchema) return <Fragment />;

  if (fieldSchema.type === 'object' || fieldSchema.type === 'void') {
    const component = components[fieldSchema['x-component']];
    const returnComponent = createElement(
      component || Card,
      { ...fieldSchema['x-component-props'], id: fieldSchema.name },
      renderProperties(),
    );

    if (conditions && conditions.length)
      return <ConditionalField conditions={conditions}>{returnComponent}</ConditionalField>;

    return returnComponent;
  }

  return <Fragment>{render()}</Fragment>;
};

export default SchemaField;
