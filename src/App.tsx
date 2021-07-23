import { FC, useState } from 'react';
import { Form } from 'react-final-form';
import { Form as AntForm, Button, Space, Divider, Radio, Input } from 'antd';
// import { FormGrid } from '@formily/antd';

// import FormControl from './components/form-control';
// import { ConditionalField } from './components/conditional-field';
import SchemaEngine from './SchemaEngine';
import SchemaField from './SchemaField';
import SchemaField1 from './SchemaField1';
import FormGrid from './components/form-grid';
const { GridColumn } = FormGrid;
const Cell:FC<any> = ({ children }) => {
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

const onSubmit = async (values: any) => {
  await sleep(300);
  window.alert(JSON.stringify(values, undefined, 2));
};

// const { Option } = Select;

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
            </AntForm>
          );
        }}
      />
      <Divider type="horizontal" />
      <AntForm
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
      </AntForm>

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
