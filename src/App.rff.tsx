import { FC, useState } from 'react';
import { Field as RffField, FieldInputProps, FieldMetaState, Form } from 'react-final-form';
import { Form as AntForm, Button, Space, Divider, Radio, Input } from 'antd';
// import { FormGrid } from '@formily/antd';

import AsyncValidator from 'async-validator';

// import FormControl from './components/form-control';
// import { ConditionalField } from './components/conditional-field';
import SchemaEngine from './SchemaEngine';
import SchemaField from './SchemaField';
import SchemaField1 from './SchemaField1';
import FormGrid from './components/form-grid';
import { ArrayTable } from './components/arrary-table';
import { Schema } from './json-schema/schema';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import ConditionalField from './components/conditional-field';
import { MutableState } from 'final-form';
import Field from './components/field';
import { getValidateState } from './utils';

// const valid = new AsyncValidator({
//   v2: [
//     {
//       validator(rule, value, callback) {
//         callback();
//       },
//     },
//   ],
// });

const { GridColumn } = FormGrid;
const Cell: FC<any> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: '#AAA',
        color: '#FFF',
        height: 30,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
      }}
    >
      {children}
    </div>
  );
};

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
const promisedValidate = (value: any) => new Promise((resolve) => resolve(undefined));

const compose = async (...promises: Promise<any>[]) => {
  return new Promise<void>(async (resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      const promise = promises[index];
      // console.log('vvvvvvvvvvvv');
      const errors = await promise.catch((ex) => ex);
      if (errors) {
        reject(errors);
        return;
      }
    }

    return resolve();
  }).catch((ex) => ex);

  // await promises.reduce(async (error, cur) => {
  //   console.log('45454545');
  //   return (await error) || (await cur);
  // }, undefined as Promise<any> | undefined);
};

compose(Promise.resolve('true'), Promise.resolve('0')).then((t) => console.log('xxxxxxxxx', t));

const onSubmit = async (values: any) => {
  await sleep(300);
  window.alert(JSON.stringify(values, undefined, 2));
};

interface IComponentProps extends FieldInputProps<any> {}
interface IDecoratorProps extends FieldMetaState<any> {
  label?: string;
  title?: string;
}

const transformFieldState2FormItemProps = (props: IDecoratorProps) => {
  const validateStatus = getValidateState(props);
  const hasError = validateStatus === 'error' || validateStatus === 'warning';

  return {
    required: true,
    label: props.label || props.title,
    validateStatus,
    ...(hasError ? { help: props.error } : {}),
  } as any;
};

const transformFieldState2FieldProps = (props: IComponentProps) => {
  return {
    name: props.name,
    value: props.value,
    checked: props.checked,
    onChange: props.onChange,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    multiple: props.multiple,
  };
};

const FormItem = (props: any) => {
  // console.log('FormItem', props);
  return (
    <AntForm.Item {...(transformFieldState2FormItemProps(props) as any)}>
      {props.children}
    </AntForm.Item>
  );
};
const FregataInput = (props: any) => {
  return <Input {...transformFieldState2FieldProps(props)} />;
};

const App = () => {
  const [state, setState] = useState<{ mode: string; descriptionMode?: string }>({
    mode: 'normal',
  });

  const [schema, setSchema] = useState(
    JSON.stringify(
      {
        engineVersion: '3.0.0',
        version: '0.0.1',
        componentName: 'Page',
        id: 'page_id',
        props: {},
        children: [
          {
            componentName: 'Form',
            id: 'form_id',
            props: {
              labelCol: { span: 6 },
              wrapperCol: { span: 10 },
            },
            children: [
              {
                componentName: 'CheckboxField',
                id: 'checkboxField_01',
                props: {
                  label: 'Fruit01',
                  fieldId: 'fruit01',
                  // conditions: [{ when: 'gift', is: ['Apple', 'Pear'], visible: true }],
                  placeholder: '请输入',
                  options: ['Apple', 'Pear', 'Orange'],
                },
              },
              {
                componentName: 'BooleanField',
                id: 'booleanField_01',
                props: {
                  label: 'Is it a gift?',
                  fieldId: 'gift_c',
                  // conditions: [{ when: 'gift', is: ['Apple', 'Pear'], visible: true }],
                  placeholder: '请输入',
                  // options: ['Apple', 'Pear', 'Orange'],
                },
              },
              {
                componentName: 'TextField',
                id: 'textField_000',
                props: {
                  label: 'Text1',
                  fieldId: 'text1',
                  conditions: [{ when: 'gift', is: ['Apple', 'Pear'], visible: true }],
                  placeholder: '请输入',
                },
              },
              {
                componentName: 'TextField',
                id: 'textField_001',
                props: {
                  label: 'Text1-1',
                  fieldId: 'text1-1',
                  conditions: [{ when: 'text1', is: '1', visible: true }],
                  placeholder: '请输入',
                },
              },
            ],
          },
        ],
      },
      null,
      2,
    ),
  );

  const [form1] = AntForm.useForm();
  // const s = new Schema(ArrayTable);
  // console.log('sssssssssssssssssss', s);

  return (
    <>
      {/* <FormGrid maxColumns={3} minColumns={2}>
        <GridColumn gridSpan={4}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid> */}
      <Form
        mutators={{
          setFieldData: (args: any[], state: MutableState<any>) => {
            const [name, data] = args;
            const field = state.fields[name];
            if (field) {
              field.data = { ...field.data, ...data };
            }
          },
        }}
        initialValues={{ isGift: true }}
        onSubmit={onSubmit || (() => {})}
        render={({ form, submitting, values, ...rest }) => {
          // form.mutators.setFieldData("")
          // console.log(
          //   'getRegisteredFields',
          //   form.getState(),
          //   form.getFieldState('giftMessage')?.data,
          // );

          return (
            <AntForm
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 10 }}
              style={{ marginTop: 24 }}
              initialValues={{ ...state, schema }}
              onValuesChange={(cv: any, { schema: s, ...v }: any) => {}}
            >
              <Field
                name="isGift"
                title="is gift"
                type="checkbox"
                decorator={[FormItem, {}]}
                component={[Checkbox, {}]}
              />

              <Field
                name="isMoney"
                title="is money"
                type="checkbox"
                decorator={[FormItem, {}]}
                component={[Checkbox, {}]}
              />

              <Field
                validate={(value, allValue) => {
                  return !value ? '必填项' : undefined;
                }}
                name="automan"
                title="奥特曼"
                decorator={[FormItem, { help: 'xxxx' }]}
                component={[FregataInput, {}]}
                conditions={[{ when: 'isGift', is: true, visible: true }]}
              />

              <Field
                name="giftMessage"
                title="git message"
                decorator={[FormItem, {}]}
                component={[FregataInput, {}]}
                conditions={[{ when: 'isGift', is: true, visible: true }]}
              />

              <Field
                name="money"
                title="money"
                decorator={[FormItem, {}]}
                component={[FregataInput, {}]}
                conditions={[
                  { when: 'isMoney', is: true, becomes: 100 },
                  { when: 'isMoney', is: false, becomes: 0 },
                  { when: 'isMoney', is: false, becomes: 10 },
                ]}
              />

              <Field
                name="money1"
                title="money1"
                decorator={[FormItem, {}]}
                component={[FregataInput, {}]}
                conditions={[{ when: 'giftMessage', is: 'xxx', visible: true }]}
              />

              <Field
                decorator={[AntForm.Item, { wrapperCol: { offset: 6, span: 16 } }]}
                component={[
                  () => {
                    return (
                      <Space>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => {
                            form.submit();
                          }}
                          loading={submitting}
                        >
                          Submit
                        </Button>
                        <Button
                          htmlType="reset"
                          onClick={() => {
                            form.reset();
                          }}
                        >
                          Reset
                        </Button>
                      </Space>
                    );
                  },
                  {},
                ]}
                conditions={[{ when: 'isGift', is: true, visible: true }]}
              />

              {/* <AntForm.Item label="is gift">
                <RffField name="isGift" type="checkbox">
                  {({ input, meta }) => {
                    return <Checkbox {...input} />;
                  }}
                </Field>
              </AntForm.Item>
              <AntForm.Item label="is money">
                <RffField name="isMoney" type="checkbox">
                  {({ input }) => {
                    return <Checkbox {...input} />;
                  }}
                </Field>
              </AntForm.Item> */}

              {/* <ConditionalField
                name="giftMessage"
                conditions={[{ when: 'isGift', is: true, visible: true }]}
              >
                <AntForm.Item label="gift message">
                  <RffField
                    name="giftMessage"
                    subscription={{ value: true }}
                    validate={async (v, va, meta) => {
                      await sleep(100);
                      // if (meta) meta.data = { ...meta?.data, warning: true };
                      // 验证发生错误的是，状态是 warning，同时添加 errors
                      return new Promise<void>((res, rej) => {
                        if (v === 'xxx') rej('xxxxxxx');
                        res();
                      })
                        .then(() => {
                          if (meta?.data?.warning)
                            form.mutators.setFieldData('giftMessage', { warning: false });
                        })
                        .catch((ex) => {
                          // console.log('metametametameta', meta);
                          // if (meta?.data?.warning) return <div />;
                          if (!meta?.data?.warning)
                            form.mutators.setFieldData('giftMessage', { warning: true });
                          return ex;
                        });

                      // return 'xxx';
                    }}
                  >
                    {({ input }) => {
                      return <Input {...input} />;
                    }}
                  </Field>
                </AntForm.Item>
              </ConditionalField> */}

              {/* <ConditionalField
                name="money"
                conditions={[
                  { when: 'isMoney', is: true, becomes: 100 },
                  { when: 'isMoney', is: false, becomes: 0 },
                  { when: 'isMoney', is: false, becomes: 10 },
                ]}
              >
                <AntForm.Item label="money">
                  <RffField
                    name="money"
                    // validate={(value) => {
                    //   return value === 'xxxx' ? undefined : 'error';
                    // }}
                    validate={promisedValidate}
                  >
                    {({ input, meta }) => {
                      return <Input {...input} />;
                    }}
                  </Field>
                </AntForm.Item>
              </ConditionalField> */}
              {/* <ConditionalField
                name="money1"
                conditions={[{ when: 'giftMessage', is: 'xxx', visible: true }]}
              >
                <AntForm.Item label="money1">
                  <RffField name="money1">
                    {({ input, meta }) => {
                      return <Input {...input} />;
                    }}
                  </Field>
                </AntForm.Item>
              </ConditionalField> */}

              {/* <AntForm.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      form.submit();
                    }}
                    loading={submitting}
                  >
                    Submit
                  </Button>
                  <Button
                    htmlType="reset"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Reset
                  </Button>
                </Space>
              </AntForm.Item> */}
            </AntForm>
          );
        }}
      />
      <Divider type="horizontal" />

      {/* <Form
        initialValues={{ gift_c: 'true', fruit01: ['Apple'] }}
        onSubmit={onSubmit || (() => {})}
        render={({ form, submitting, values, ...rest }) => {
          return (
            <AntForm
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 10 }}
              style={{ marginTop: 24 }}
              initialValues={{ ...state, schema }}
              onValuesChange={(cv: any, { schema: s, ...v }: any) => {
                setState(v);
              }}
            >
              <ArrayTable />
              <SchemaField1
                schema={
                  {
                    type: 'object',
                    properties: {
                      v7hxqah4mlg: {
                        title: 'Input',
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {},
                        'x-decorator-props': {},
                        required: true,
                        _designableId: 'v7hxqah4mlg',
                        'x-index': 0,
                      },
                      fw13hnhvyyu: {
                        title: 'Select',
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {},
                        'x-decorator-props': {},
                        conditions: [{ when: 'v7hxqah4mlg', is: 'xxx', visible: true }],
                        _designableId: 'fw13hnhvyyu',
                        'x-index': 1,
                      },
                      zffe7kcvdcz: {
                        type: 'void',
                        'x-component': 'FormGrid',
                        'x-component-props': {},
                        _designableId: 'zffe7kcvdcz',
                        conditions: [{ when: 'v7hxqah4mlg', is: 'xxx', visible: true }],
                        properties: {
                          umt0swqdbo6: {
                            type: 'void',
                            'x-component': 'Card',
                            'x-component-props': {
                              title: 'Title',
                            },
                            _designableId: 'umt0swqdbo6',

                            properties: {
                              '32rm69l1m1j': {
                                type: 'void',
                                'x-component': 'FormGrid',
                                'x-component-props': {
                                  style: {
                                    display: 'flex',
                                  },
                                },
                                _designableId: '32rm69l1m1j',
                                properties: {
                                  DDDDDDDD: {
                                    type: '[string,string]',
                                    title: 'DateRangePicker',
                                    'x-decorator': 'FormItem',
                                    'x-component': 'DatePicker.RangePicker',
                                    'x-component-props': {},
                                    'x-decorator-props': {},
                                    name: 'DDDDDDDD',
                                    _designableId: 'hiswn0ljl3x',
                                    'x-index': 0,
                                  },
                                  si6lgjx9eag: {
                                    title: 'Select',
                                    'x-decorator': 'FormItem',
                                    'x-component': 'Select',
                                    'x-component-props': {},
                                    'x-decorator-props': {},
                                    enum: [
                                      {
                                        children: [],
                                        label: '选项 1',
                                        value: '5bdhyv2dzd6',
                                        c: 'xcxcx',
                                        ddd: 'dd',
                                      },
                                    ],
                                    _designableId: 'si6lgjx9eag',
                                    'x-index': 1,
                                  },
                                },
                                'x-index': 0,
                              },
                              nrzni8sfhmn: {
                                type: 'boolean',
                                title: 'Switch',
                                'x-decorator': 'FormItem',
                                'x-component': 'Switch',
                                'x-component-props': {},
                                'x-decorator-props': {},
                                _designableId: 'nrzni8sfhmn',
                                'x-index': 1,
                              },
                              zfv2g7ri00x: {
                                type: 'Array<object>',
                                title: 'Upload',
                                'x-decorator': 'FormItem',
                                'x-component': 'Upload',
                                'x-component-props': {
                                  textContent: 'Upload',
                                },
                                'x-decorator-props': {},
                                _designableId: 'zfv2g7ri00x',
                                'x-index': 2,
                              },
                              bbmqypy4ybb: {
                                type: 'boolean',
                                title: 'Switch',
                                'x-decorator': 'FormItem',
                                'x-component': 'Switch',
                                'x-component-props': {},
                                'x-decorator-props': {},
                                _designableId: 'bbmqypy4ybb',
                                'x-index': 3,
                              },
                            },
                            'x-index': 0,
                          },
                        },
                        'x-index': 2,
                      },
                      d4ca2w22oi6: {
                        title: '手机号',
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {},
                        'x-decorator-props': {},
                        _designableId: 'd4ca2w22oi6',
                        'x-index': 3,
                      },
                      tpd8nt1fnby: {
                        type: 'string | number',
                        title: 'Radio Group',
                        'x-decorator': 'FormItem',
                        'x-component': 'Radio.Group',
                        enum: [
                          {
                            children: [],
                            label: '选项1',
                            value: 1,
                          },
                          {
                            children: [],
                            label: '选项2',
                            value: true,
                          },
                          {
                            children: [],
                          },
                          {
                            children: [],
                            label: '选项 4',
                            value: 'rm08xp81xro',
                          },
                          {
                            children: [],
                            label: '选项 5',
                            value: 'qo89oct6hcj',
                          },
                        ],
                        'x-component-props': {},
                        'x-decorator-props': {},
                        _designableId: 'tpd8nt1fnby',
                        'x-index': 4,
                      },
                      '77k3tbbh7lu': {
                        type: 'Array<string>',
                        title: 'Transfer',
                        'x-decorator': 'FormItem',
                        'x-component': 'Transfer',
                        'x-component-props': {
                          oneWay: false,
                          showSearch: true,
                          showSearchAll: true,
                        },
                        'x-decorator-props': {
                          tooltip: 'xcvzxcv',
                          addonBefore: 'ddsdsd',
                          addonAfter: 'ssdsdsd',
                          labelCol: 7,
                        },
                        _designableId: '77k3tbbh7lu',
                        'x-index': 5,
                      },
                      '4l24pvy2gra': {
                        type: 'string',
                        title: 'Select',
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {},
                        'x-decorator-props': {},
                        _designableId: '4l24pvy2gra',
                        'x-index': 6,
                      },
                      contacts: {
                        type: 'array',
                        required: true,
                        title: '联系人信息',
                        'x-decorator': 'FormItem',
                        'x-component': 'ArrayItems',
                        items: {
                          type: 'object',
                          'x-component': 'ArrayItems.Item',
                          properties: {
                            sort: {
                              type: 'void',
                              'x-decorator': 'FormItem',
                              'x-component': 'ArrayItems.SortHandle',
                            },
                            popover: {
                              type: 'void',
                              title: '完善联系人信息',
                              'x-decorator': 'Editable.Popover',
                              'x-component': 'FormLayout',
                              'x-component-props': {
                                layout: 'vertical',
                              },
                              'x-reactions': [
                                {
                                  fulfill: {
                                    schema: {
                                      title: '{{$self.query(".name").value() }}',
                                    },
                                  },
                                },
                              ],
                              properties: {
                                name: {
                                  type: 'string',
                                  title: '姓名',
                                  required: true,
                                  'x-decorator': 'FormItem',
                                  'x-component': 'Input',
                                  'x-component-props': {
                                    style: {
                                      width: 300,
                                    },
                                  },
                                },
                                email: {
                                  type: 'string',
                                  title: '邮箱',
                                  'x-decorator': 'FormItem',
                                  'x-component': 'Input',
                                  'x-validator': [{ required: true }, 'email'],
                                  'x-component-props': {
                                    style: {
                                      width: 300,
                                    },
                                  },
                                },
                                phone: {
                                  type: 'string',
                                  title: '手机号',
                                  'x-decorator': 'FormItem',
                                  'x-component': 'Input',
                                  'x-validator': [{ required: true }, 'phone'],
                                  'x-component-props': {
                                    style: {
                                      width: 300,
                                    },
                                  },
                                },
                              },
                            },
                            remove: {
                              type: 'void',
                              'x-decorator': 'FormItem',
                              'x-component': 'ArrayItems.Remove',
                            },
                          },
                        },
                        properties: {
                          addition: {
                            type: 'void',
                            title: '新增联系人',
                            'x-component': 'ArrayItems.Addition',
                          },
                        },
                      },
                    },
                    _designableId: 'aevkxu4nwas',
                  } as any
                }
              />
              <Divider type="horizontal" />
              <AntForm.Item wrapperCol={{ offset: 6 }}>
                <Button
                  type="primary"
                  onClick={() => {
                    console.log('submit-values', values);
                  }}
                  // htmlType='submit'
                >
                  Submit
                </Button>
              </AntForm.Item>
            </AntForm>
          );
        }}
      /> */}
      <Divider type="horizontal" />
      {/* <AntForm
        form={form1}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 10 }}
        style={{ marginTop: 24 }}
        initialValues={{ ...state, schema }}
        onValuesChange={(cv: any, { schema: s, ...v }: any) => {
          setState(v);
        }}
      >
        <AntForm.Item label="Schema" name="schema">
          <Input.TextArea rows={30} />
        </AntForm.Item>
        <AntForm.Item label="模式" name="mode">
          <Radio.Group>
            <Radio.Button value="design">设计</Radio.Button>
            <Radio.Button value="normal">正常</Radio.Button>
            <Radio.Button value="description">只读</Radio.Button>
          </Radio.Group>
        </AntForm.Item>
        {state.mode === 'description' && (
          <AntForm.Item label="只读方式" name="descriptionMode">
            <Radio.Group>
              <Radio.Button value="disabled">只读</Radio.Button>
              <Radio.Button value="text">文本</Radio.Button>
            </Radio.Group>
          </AntForm.Item>
        )}
        <AntForm.Item wrapperCol={{ offset: 6 }}>
          <Button
            type="primary"
            onClick={() => {
              setSchema(form1.getFieldValue('schema'));
            }}
          >
            Update
          </Button>
        </AntForm.Item>
      </AntForm> */}

      <Divider type="horizontal" />

      <SchemaEngine
        onSubmit={(v: any) => {
          console.log('onSubmit', { ...v });
        }}
        mode={state.mode as any}
        descriptionMode={state?.descriptionMode as any}
        schema={JSON.parse(schema)}
        extra={({ form, submitting }: any) => {
          return (
            <>
              <SchemaField
                schema={{
                  componentName: 'PageSection',
                  id: 'form_id01',
                  props: {
                    // label: 'Fruit01001',
                    fieldId: 'fruit01',
                    // options: ['Apple', 'Pear', 'Orange'],
                  },
                  children: [
                    {
                      componentName: 'CheckboxField',
                      id: 'checkboxField_01',
                      props: {
                        label: 'Fruit001',
                        fieldId: 'gift',
                        // conditions: [{ when: 'gift', is: ['Apple', 'Pear'], visible: true }],
                        placeholder: '请输入',
                        options: ['Apple', 'Pear', 'Orange'],
                      },
                    },
                    {
                      componentName: 'BooleanField',
                      id: 'booleanField_01',
                      props: {
                        label: 'Is it a gift?',
                        fieldId: 'gift_c',
                        // conditions: [{ when: 'gift', is: ['Apple', 'Pear'], visible: true }],
                        placeholder: '请输入',
                        // options: ['Apple', 'Pear', 'Orange'],
                      },
                    },
                    {
                      componentName: 'TextField',
                      id: 'textField_000',
                      props: {
                        label: 'Text1',
                        fieldId: 'text1',
                        conditions: [{ when: 'gift', is: ['Apple', 'Pear'], visible: true }],
                        placeholder: '请输入',
                      },
                    },
                    {
                      componentName: 'TextField',
                      id: 'textField_001',
                      props: {
                        label: 'Text1-1',
                        fieldId: 'text1-1',
                        conditions: [{ when: 'text1', is: '1', visible: true }],
                        placeholder: '请输入',
                      },
                    },
                  ],
                }}
              />

              {/* <AntForm.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      form.submit();
                    }}
                    loading={submitting}
                  >
                    Submit
                  </Button>
                  <Button
                    htmlType="reset"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Reset
                  </Button>
                </Space>
              </AntForm.Item> */}
            </>
          );
        }}
      >
        {({ form, submitting }: any) => {
          return (
            <>
              {/* <SchemaField
                schema={{
                  componentName: 'CheckboxField',
                  props: {
                    label: 'Fruit gift',
                    fieldId: 'gift',
                    options: ['Apple', 'Pear', 'Orange'],
                  },
                }}
              /> */}
              <AntForm.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      form.submit();
                    }}
                    loading={submitting}
                  >
                    Submit
                  </Button>
                  <Button
                    htmlType="reset"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Reset
                  </Button>
                </Space>
              </AntForm.Item>
            </>
          );
        }}

        {/* <AntForm.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                form.submit();
              }}
              loading={submitting}
            >
              Submit
            </Button>
            <Button
              htmlType="reset"
              onClick={() => {
                form.reset();
              }}
            >
              Reset
            </Button>
          </Space>
        </AntForm.Item> */}
      </SchemaEngine>
      {/* <Form
        onSubmit={onSubmit}
        render={({ form, submitting, values }) => {
          return (
            <AntForm labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
              <SchemaField
                schema={{
                  componentName: 'BooleanField',
                  props: {
                    label: 'Is it a gift?',
                    fieldId: 'gift_c',
                    // conditions: [{ when: 'gift', is: ['Apple', 'Pear'], visible: true }],
                    placeholder: '请输入',
                    options: ['Apple', 'Pear', 'Orange'],
                  },
                }}
              />

              <SchemaField
                schema={{
                  componentName: 'CheckboxField',
                  props: {
                    label: 'Fruit',
                    fieldId: 'gift',
                    options: ['Apple', 'Pear', 'Orange'],
                  },
                }}
              />

              <SchemaField
                schema={{
                  componentName: 'TextField',
                  props: {
                    label: 'Text1',
                    fieldId: 'text1',
                    conditions: [{ when: 'gift', is: ['Apple', 'Pear'], visible: true }],
                    placeholder: '请输入',
                  },
                }}
              />

              <SchemaField
                schema={{
                  componentName: 'Page',
                  props: {
                    conditions: [{ when: 'gift_c', is: true, visible: true }],
                  },
                  children: [
                    {
                      componentName: 'TextField',
                      props: {
                        label: 'Text2',
                        fieldId: 'text2',
                        placeholder: '请输入',
                      },
                    },
                  ],
                }}
              />

              <SchemaField
                schema={{
                  componentName: 'TextField',
                  props: {
                    label: 'Text1-1',
                    fieldId: 'text1-1',
                    conditions: [{ when: 'text1', is: '1', visible: true }],
                    placeholder: '请输入',
                  },
                }}
              />

              <AntForm.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      form.submit();
                    }}
                    loading={submitting}
                  >
                    Submit
                  </Button>
                  <Button
                    htmlType="reset"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Reset
                  </Button>
                </Space>
              </AntForm.Item>

              <pre>{JSON.stringify(values, null, 2)}</pre>
            </AntForm>
          );
        }}
      /> */}
    </>
  );
};

export default App;
