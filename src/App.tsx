import React, {
  useReducer,
  useEffect,
  Reducer,
  useRef,
  FC,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
  // createContext,
} from 'react';
import { MutableState } from 'final-form';
import { FieldInputProps, FieldMetaState, Form } from 'react-final-form';
import { Form as AntForm, Button, Space, Input, Checkbox, Select, Card } from 'antd';

import Field from './components/field';
import SchemaField from './components/schema-field';
import { getValidateState } from './utils';
import { SchemaOptionsContext, AppContext } from './context';
import { GhostWidget } from './widgets/GhostWidget';
import { Engine } from './core/models/Engine';
import DragDropDriver from './core/drivers/DragDropDriver';
import { MouseMoveDriver } from './core/drivers/MouseMoveDriver';
import { AuxToolWidget } from './widgets/AuxToolWidget';
import Provider from './Provider';
// import { Subscrible } from './events/subscrible';
// import DragDropDriver from './drivers/DragDropDriver';

// const s = new Subscrible();
// s.subscribeTo('xxx', (e) => {
//   // if (e?.type === 'xxx') {
//   //   return;
//   // }
//   console.log('subscriber', e);
// });

// s.dispatch({ type: 'xxx' });

// const AppContext = createContext<any>({});

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
export enum CursorType {
  Move = 'MOVE',
  Selection = 'SELECTION',
  Resize = 'RESIZE',
  ResizeWidth = 'RESIZE_WIDTH',
  ResizeHeight = 'RESIZE_HEIGHT',
}
// const compose = async (...promises: Promise<any>[]) => {
//   return new Promise<void>(async (resolve, reject) => {
//     for (let index = 0; index < promises.length; index++) {
//       const promise = promises[index];
//       // console.log('vvvvvvvvvvvv');
//       const errors = await promise.catch((ex) => ex);
//       if (errors) {
//         reject(errors);
//         return;
//       }
//     }

//     return resolve();
//   }).catch((ex) => ex);

//   // await promises.reduce(async (error, cur) => {
//   //   console.log('45454545');
//   //   return (await error) || (await cur);
//   // }, undefined as Promise<any> | undefined);
// };

// compose(Promise.resolve('true'), Promise.resolve('0')).then((t) => console.log('xxxxxxxxx', t));

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
    // required: true,
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

const FregataSelect = (props: any) => {
  return <Select {...transformFieldState2FieldProps(props)} />;
};

// const events = {
//   handle,
// };
// const engine = {
//   cursor: {
//     type: '',
//   },
// };

const GlobalState = {
  dragging: false,
  onMouseDownAt: 0,
  startEvent: null as any,
  moveEvent: null as any,
};

function pauseEvent(e: any) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

// class Cursor {
//   clientX: number;
//   clientY: number;
//   constructor(e: any) {
//     this.clientX = e?.clientX;
//     this.clientY = e?.clientY;
//   }
// }

const engine = new Engine({
  drivers: [DragDropDriver, MouseMoveDriver],
  effects: [],
});

const Test = () => {
  // const { cursorStatus } = useContext(AppContext);
  console.log('cursorStatus000-Test');

  return <div>Test</div>;
};

const App = () => {
  // useEffect(()=>{},[GlobalState.dragging])
  // console.log('dragging', GlobalState.dragging);
  // const [cursorStatus, setCursorStatus] = useState('NORMAL');
  function handleMouseClick() {
    console.log('handleMouseClickhandleMouseClickhandleMouseClick');
  }

  // const cursorRef = useRef(new Cursor({}));

  useEffect(() => {
    // document.addEventListener('mousedown', handleMouseClick);
    // document.addEventListener('mousemove', handleMouseMove);
    // document.addEventListener('mouseover', handleMouseOver);
    // document.addEventListener('mouseout', handleMouseOut);
    // document.addEventListener('mouseup', handleMouseUp);
    // document.addEventListener('dragstart', handleDragStart);

    // const driver1 = new HoverDriver();
    engine.mount();

    return () => {
      engine.unmount();
    };
  }, []);

  // useEffect(()=>{})

  return (
    <>
      <Provider engine={engine}>
        <Test />
        <AuxToolWidget />
        <GhostWidget />
        <Button
          // onMouseDown
          onClick={(e) => {
            // setCursorStatus(Math.random().toString());
            // document.removeEventListener('mousedown', handleMouseClick);
          }}
        >
          RemoveEventListener
        </Button>
        <Form
          validateOnBlur={false}
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
            return (
              <AntForm
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 10 }}
                style={{ marginTop: 24 }}
                onValuesChange={(cv: any) => {}}
              >
                <Field
                  name="isGift"
                  title="is gift"
                  type="checkbox"
                  // checkbox
                  decorator={[FormItem, {}]}
                  component={[Checkbox, {}]}
                />

                <Field
                  name="isMoney"
                  title="is money"
                  type="checkbox"
                  // checkbox
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

                {/* @ts-ignore */}
                <Field name="XXXX" value="">
                  <Card>
                    <Field
                      name="XXXX.money2"
                      title="money2"
                      decorator={[FormItem, {}]}
                      component={[FregataInput, {}]}
                      conditions={[{ when: 'isMoney', is: true, visible: true }]}
                    />
                  </Card>
                </Field>
                <SchemaOptionsContext.Provider
                  value={{
                    components: { FormItem, Input: FregataInput, Select: FregataSelect, Card },
                  }}
                >
                  <SchemaField
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
                          umt0swqdbo6: {
                            type: 'object',
                            'x-component': 'Card',
                            'x-component-props': {
                              title: 'Title',
                            },
                            properties: {
                              type: 'object',
                              'x-component': 'Card',
                              'x-component-props': {
                                title: 'Title',
                              },
                              '4opiooo': {
                                type: 'object',
                                'x-component': 'Card',
                                'x-component-props': {
                                  title: 'Title',
                                },
                                properties: {
                                  dddddddddd: {
                                    title: 'Input0',
                                    type: 'string',
                                    'x-decorator': 'FormItem',
                                    'x-component': 'Input',
                                    'x-component-props': {},
                                    'x-decorator-props': {},
                                    required: true,
                                    _designableId: 'v7hxqah4mlg',
                                    'x-index': 0,
                                  },
                                },
                              },
                            },
                          },
                          yf28v6y6pmh: {
                            type: 'void',
                            'x-component': 'Card',
                            'x-component-props': {
                              title: 'Title',
                            },
                            _designableId: 'yf28v6y6pmh',
                            'x-index': 2,
                            name: 'yf28v6y6pmh',
                            properties: {
                              v2cvcuh9p3f: {
                                title: 'Input',
                                type: 'string',
                                'x-decorator': 'FormItem',
                                'x-component': 'Input',
                                'x-validator': [],
                                'x-component-props': {},
                                'x-decorator-props': {},
                                _designableId: 'v2cvcuh9p3f',
                                'x-index': 0,
                                name: 'v2cvcuh9p3f',
                              },
                            },
                          },
                          // zffe7kcvdcz: {
                          //   type: 'void',
                          //   'x-component': 'FormGrid',
                          //   'x-component-props': {},
                          //   _designableId: 'zffe7kcvdcz',
                          //   conditions: [{ when: 'v7hxqah4mlg', is: 'xxx', visible: true }],
                          //   properties: {
                          //     umt0swqdbo6: {
                          //       type: 'void',
                          //       'x-component': 'Card',
                          //       'x-component-props': {
                          //         title: 'Title',
                          //       },
                          //       _designableId: 'umt0swqdbo6',

                          //       properties: {
                          //         '32rm69l1m1j': {
                          //           type: 'void',
                          //           'x-component': 'FormGrid',
                          //           'x-component-props': {
                          //             style: {
                          //               display: 'flex',
                          //             },
                          //           },
                          //           _designableId: '32rm69l1m1j',
                          //           properties: {
                          //             DDDDDDDD: {
                          //               type: '[string,string]',
                          //               title: 'DateRangePicker',
                          //               'x-decorator': 'FormItem',
                          //               'x-component': 'DatePicker.RangePicker',
                          //               'x-component-props': {},
                          //               'x-decorator-props': {},
                          //               name: 'DDDDDDDD',
                          //               _designableId: 'hiswn0ljl3x',
                          //               'x-index': 0,
                          //             },
                          //             si6lgjx9eag: {
                          //               title: 'Select',
                          //               'x-decorator': 'FormItem',
                          //               'x-component': 'Select',
                          //               'x-component-props': {},
                          //               'x-decorator-props': {},
                          //               enum: [
                          //                 {
                          //                   children: [],
                          //                   label: '选项 1',
                          //                   value: '5bdhyv2dzd6',
                          //                   c: 'xcxcx',
                          //                   ddd: 'dd',
                          //                 },
                          //               ],
                          //               _designableId: 'si6lgjx9eag',
                          //               'x-index': 1,
                          //             },
                          //           },
                          //           'x-index': 0,
                          //         },
                          //         nrzni8sfhmn: {
                          //           type: 'boolean',
                          //           title: 'Switch',
                          //           'x-decorator': 'FormItem',
                          //           'x-component': 'Switch',
                          //           'x-component-props': {},
                          //           'x-decorator-props': {},
                          //           _designableId: 'nrzni8sfhmn',
                          //           'x-index': 1,
                          //         },
                          //         zfv2g7ri00x: {
                          //           type: 'Array<object>',
                          //           title: 'Upload',
                          //           'x-decorator': 'FormItem',
                          //           'x-component': 'Upload',
                          //           'x-component-props': {
                          //             textContent: 'Upload',
                          //           },
                          //           'x-decorator-props': {},
                          //           _designableId: 'zfv2g7ri00x',
                          //           'x-index': 2,
                          //         },
                          //         bbmqypy4ybb: {
                          //           type: 'boolean',
                          //           title: 'Switch',
                          //           'x-decorator': 'FormItem',
                          //           'x-component': 'Switch',
                          //           'x-component-props': {},
                          //           'x-decorator-props': {},
                          //           _designableId: 'bbmqypy4ybb',
                          //           'x-index': 3,
                          //         },
                          //       },
                          //       'x-index': 0,
                          //     },
                          //   },
                          //   'x-index': 2,
                          // },
                          // d4ca2w22oi6: {
                          //   title: '手机号',
                          //   type: 'string',
                          //   'x-decorator': 'FormItem',
                          //   'x-component': 'Input',
                          //   'x-component-props': {},
                          //   'x-decorator-props': {},
                          //   _designableId: 'd4ca2w22oi6',
                          //   'x-index': 3,
                          // },
                          // tpd8nt1fnby: {
                          //   type: 'string | number',
                          //   title: 'Radio Group',
                          //   'x-decorator': 'FormItem',
                          //   'x-component': 'Radio.Group',
                          //   enum: [
                          //     {
                          //       children: [],
                          //       label: '选项1',
                          //       value: 1,
                          //     },
                          //     {
                          //       children: [],
                          //       label: '选项2',
                          //       value: true,
                          //     },
                          //     {
                          //       children: [],
                          //     },
                          //     {
                          //       children: [],
                          //       label: '选项 4',
                          //       value: 'rm08xp81xro',
                          //     },
                          //     {
                          //       children: [],
                          //       label: '选项 5',
                          //       value: 'qo89oct6hcj',
                          //     },
                          //   ],
                          //   'x-component-props': {},
                          //   'x-decorator-props': {},
                          //   _designableId: 'tpd8nt1fnby',
                          //   'x-index': 4,
                          // },
                          // '77k3tbbh7lu': {
                          //   type: 'Array<string>',
                          //   title: 'Transfer',
                          //   'x-decorator': 'FormItem',
                          //   'x-component': 'Transfer',
                          //   'x-component-props': {
                          //     oneWay: false,
                          //     showSearch: true,
                          //     showSearchAll: true,
                          //   },
                          //   'x-decorator-props': {
                          //     tooltip: 'xcvzxcv',
                          //     addonBefore: 'ddsdsd',
                          //     addonAfter: 'ssdsdsd',
                          //     labelCol: 7,
                          //   },
                          //   _designableId: '77k3tbbh7lu',
                          //   'x-index': 5,
                          // },
                          // '4l24pvy2gra': {
                          //   type: 'string',
                          //   title: 'Select',
                          //   'x-decorator': 'FormItem',
                          //   'x-component': 'Select',
                          //   'x-component-props': {},
                          //   'x-decorator-props': {},
                          //   _designableId: '4l24pvy2gra',
                          //   'x-index': 6,
                          // },
                          // contacts: {
                          //   type: 'array',
                          //   required: true,
                          //   title: '联系人信息',
                          //   'x-decorator': 'FormItem',
                          //   'x-component': 'ArrayItems',
                          //   items: {
                          //     type: 'object',
                          //     'x-component': 'ArrayItems.Item',
                          //     properties: {
                          //       sort: {
                          //         type: 'void',
                          //         'x-decorator': 'FormItem',
                          //         'x-component': 'ArrayItems.SortHandle',
                          //       },
                          //       popover: {
                          //         type: 'void',
                          //         title: '完善联系人信息',
                          //         'x-decorator': 'Editable.Popover',
                          //         'x-component': 'FormLayout',
                          //         'x-component-props': {
                          //           layout: 'vertical',
                          //         },
                          //         'x-reactions': [
                          //           {
                          //             fulfill: {
                          //               schema: {
                          //                 title: '{{$self.query(".name").value() }}',
                          //               },
                          //             },
                          //           },
                          //         ],
                          //         properties: {
                          //           name: {
                          //             type: 'string',
                          //             title: '姓名',
                          //             required: true,
                          //             'x-decorator': 'FormItem',
                          //             'x-component': 'Input',
                          //             'x-component-props': {
                          //               style: {
                          //                 width: 300,
                          //               },
                          //             },
                          //           },
                          //           email: {
                          //             type: 'string',
                          //             title: '邮箱',
                          //             'x-decorator': 'FormItem',
                          //             'x-component': 'Input',
                          //             'x-validator': [{ required: true }, 'email'],
                          //             'x-component-props': {
                          //               style: {
                          //                 width: 300,
                          //               },
                          //             },
                          //           },
                          //           phone: {
                          //             type: 'string',
                          //             title: '手机号',
                          //             'x-decorator': 'FormItem',
                          //             'x-component': 'Input',
                          //             'x-validator': [{ required: true }, 'phone'],
                          //             'x-component-props': {
                          //               style: {
                          //                 width: 300,
                          //               },
                          //             },
                          //           },
                          //         },
                          //       },
                          //       remove: {
                          //         type: 'void',
                          //         'x-decorator': 'FormItem',
                          //         'x-component': 'ArrayItems.Remove',
                          //       },
                          //     },
                          //   },
                          //   properties: {
                          //     addition: {
                          //       type: 'void',
                          //       title: '新增联系人',
                          //       'x-component': 'ArrayItems.Addition',
                          //     },
                          //   },
                          // },
                        },
                        _designableId: 'aevkxu4nwas',
                      } as any
                    }
                  />
                </SchemaOptionsContext.Provider>

                {/* <Field
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
              />*/}
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
              </AntForm>
            );
          }}
        />
      </Provider>
    </>
  );
};

export default App;
