import { Form } from 'react-final-form';
import { Form as AntForm, Checkbox, Input, Button, Select, Space } from 'antd';

import FormControl from './components/form-control';
import { ConditionalField } from './components/conditional-field';

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values: any) => {
  await sleep(300);
  window.alert(JSON.stringify(values, undefined, 2));
};

const { Option } = Select;

const App = () => (
  <>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => {
        // console.log('value', form.reset);
        return (
          <AntForm onSubmitCapture={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
            <FormControl name="gift_c" label="Is it a gift?" type="checkbox">
              <Checkbox />
            </FormControl>

            <FormControl name="gift" label="Is it a gift?">
              <Checkbox.Group options={['Apple', 'Pear', 'Orange']} />
            </FormControl>

            <ConditionalField
              conditions={[
                { when: 'gift_c', is: true },
                // { when: 'gift_c', is: true, visible: true },
                // { when: 'gift', is: ['Apple', 'Pear'], becomes: '1212' },
                // { when: 'gift_c', is: true, becomes: '1212' },
              ]}
            >
              <FormControl
                label="First Name 01"
                name="firstName001"
                rules={[
                  { required: true },
                  {
                    min: 18,
                    type: 'number',
                    transform: (v: any) => (isNaN(v) ? v : Number(v)),
                  },
                ]}
              >
                <Input placeholder="First Name 001" autoComplete="off" />
              </FormControl>
            </ConditionalField>

            <ConditionalField
              conditions={[
                // { when: 'gift_c', is: true, visible: true },
                // { when: 'gift_c', is: true, visible: true },
                { when: 'gift', is: ['Apple', 'Pear'], becomes: 'lucy' },
                // { when: 'gift_c', is: true, becomes: '1212' },
              ]}
            >
              <FormControl
                label="Select 01"
                name="select1"
                rules={[
                  { required: true },
                  // {
                  //   min: 18,
                  //   type: '',
                  //   transform: (v: any) => (isNaN(v) ? v : Number(v)),
                  // },
                ]}
              >
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </FormControl>
            </ConditionalField>

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
                    form.submit();
                  }}
                >
                  Submit
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
