import { Form } from 'react-final-form';
import { Form as AntForm, Checkbox, Input, Button, Select, Space } from 'antd';

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

const App = () => (
  <>
    <SchemaEngine
      onSubmit={(v: any) => {
        console.log('onSubmit', v);
      }}
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
                componentName: 'BooleanField',
                id: 'booleanField_01',
                props: {
                  label: 'Is it a gift?',
                  fieldId: 'gift_c',
                  // conditions: [{ when: 'gift', is: ['Apple', 'Pear'], visible: true }],
                  placeholder: '请输入',
                  options: ['Apple', 'Pear', 'Orange'],
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
            <SchemaField
              schema={{
                componentName: 'CheckboxField',
                props: {
                  label: 'Fruit01',
                  fieldId: 'fruit01',
                  options: ['Apple', 'Pear', 'Orange'],
                },
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
    <Form
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
    />
  </>
);

export default App;
