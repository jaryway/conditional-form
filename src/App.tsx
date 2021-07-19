import { useState } from 'react';
import { Form } from 'react-final-form';
import { Form as AntForm, Button, Space, Divider, Radio } from 'antd';

// import FormControl from './components/form-control';
// import { ConditionalField } from './components/conditional-field';
import SchemaEngine from './SchemaEngine';
import SchemaField from './SchemaField';

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
  return (
    <>
      <AntForm
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 10 }}
        style={{ marginTop: 24 }}
        initialValues={state}
        onValuesChange={(cv, v) => {
          setState(v);
        }}
      >
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
      </AntForm>

      <Divider type="horizontal" />

      <SchemaEngine
        onSubmit={(v: any) => {
          console.log('onSubmit', { ...v });
        }}
        mode={state.mode as any}
        descriptionMode={state?.descriptionMode as any}
        schema={{
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
        }}
        extra={({ form, submitting }: any) => {
          return (
            <>
              {/* <SchemaField
                schema={{
                  componentName: 'CheckboxField',
                  props: {
                    label: 'Fruit01',
                    fieldId: 'fruit01',
                    options: ['Apple', 'Pear', 'Orange'],
                  },
                }}
              /> */}
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
