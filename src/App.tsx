import { useState } from 'react';
import { MutableState } from 'final-form';
import { FieldInputProps, FieldMetaState, Form } from 'react-final-form';
import { Form as AntForm, Button, Space, Input, Checkbox } from 'antd';

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

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

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
        render={({ form, submitting }) => {
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
              onValuesChange={(cv: any) => {}}
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
                validate={(value) => {
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
            </AntForm>
          );
        }}
      />
    </>
  );
};

export default App;
