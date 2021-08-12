/* eslint-disable no-unreachable */
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
import { SchemaOptionsContext } from './context';
import { GhostWidget } from './widgets/GhostWidget';
import { Engine } from './core/models/Engine';
import DragDropDriver from './core/drivers/DragDropDriver';
import { MouseMoveDriver } from './core/drivers/MouseMoveDriver';
import { MouseClickDriver } from './core/drivers/MouseClickDriver';
// import { AuxToolWidget } from './widgets/AuxToolWidget';
// import AppProvider from './providers/DesignerProvider';
import { Designer, Workspace } from './react/containers';
import { Viewport } from './react/containers/Viewport';
import { ComponentTreeWidget } from './widgets/ComponentTreeWidget';

// import { uid } from './shared';
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
const engine = new Engine({
  drivers: [DragDropDriver, MouseMoveDriver, MouseClickDriver],
  effects: [],
  defaultComponentTree: [
    {
      componentName: 'Field',
      id: 'xo9dc80d7bn',
      props: {
        title: 'xo9dc80d7bn',
      },
    },
  ],
});

const transformFieldState2FormItemProps = (props: IDecoratorProps) => {
  const validateStatus = getValidateState(props);
  const hasError = validateStatus === 'error' || validateStatus === 'warning';

  return {
    // required: true,
    label: props.label || props.title,
    validateStatus,
    [engine.props.nodeIdAttrName]: props[engine.props.nodeIdAttrName],
    // [engine.props.sourceIdAttrName]: props[engine.props.sourceIdAttrName],
    [engine.props.outlineNodeIdAttrName]: props[engine.props.outlineNodeIdAttrName],
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
    // [engine.props.nodeIdAttrName]: props[engine.props.nodeIdAttrName],
    // [engine.props.sourceIdAttrName]: props[engine.props.sourceIdAttrName],
    // [engine.props.outlineNodeIdAttrName]: props[engine.props.outlineNodeIdAttrName],
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

  // useEffect(() => {
  //   // document.addEventListener('mousedown', handleMouseClick);
  //   // document.addEventListener('mousemove', handleMouseMove);
  //   // document.addEventListener('mouseover', handleMouseOver);
  //   // document.addEventListener('mouseout', handleMouseOut);
  //   // document.addEventListener('mouseup', handleMouseUp);
  //   // document.addEventListener('dragstart', handleDragStart);

  //   // const driver1 = new HoverDriver();
  //   engine.mount();

  //   return () => {
  //     engine.unmount();
  //   };
  // }, []);

  // useEffect(()=>{})
  // console.log('engine', engine);
  // useEffect(() => {
  //   engine.mount();

  //   const workspace = {
  //     id: 'form',
  //     title: undefined,
  //     description: undefined,
  //   };
  //   // engine.workbench.ensureWorkspace(workspace);

  //   console.log('engine1', engine);

  //   return () => {
  //     engine.unmount();
  //   };
  // }, []);

  // return <>s[][][]][][]</>;

  return (
    <>
      <Designer engine={engine}>
        <Workspace id={'form'}>
          <Viewport>
            <GhostWidget />

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
                console.log('tree', engine.workbench.currentWorkspace.operation.tree);
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
                      decorator={[FormItem, { [engine?.props?.nodeIdAttrName]: 'checkbox-w' }]}
                      component={[Checkbox, { [engine?.props?.nodeIdAttrName]: 'checkbox' }]}
                    />

                    <Field
                      name="isMoney"
                      title="is money"
                      type="checkbox"
                      // checkbox
                      decorator={[FormItem, { [engine?.props?.nodeIdAttrName]: 'checkbox2' }]}
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

                    <ComponentTreeWidget
                      components={{
                        Field: (props) => {
                          // const s= useTree();
                          // const node = useTreeNode();
                          // console.log('xxxx', props, node.props);
                          // if (node.props.type == 'void') {
                          //   return (
                          //     <div
                          //       {...props}
                          //       style={{
                          //         background: '#eee',
                          //         border: '1px solid #ddd',
                          //         display: 'flex',
                          //         padding: 10,
                          //         height: props.children ? 'auto' : 150,
                          //         justifyContent: 'center',
                          //         alignItems: 'center',
                          //       }}
                          //     >
                          //       {props.children ? (
                          //         props.children
                          //       ) : (
                          //         <span>拖拽字段进入该区域</span>
                          //       )}
                          //     </div>
                          //   )
                          // }
                          // return (
                          //   <Field
                          //     name="phone"
                          //     title="手机号"
                          //     required
                          //     validator="phone"
                          //     decorator={[FormItem]}
                          //     component={[Input]}
                          //   />
                          // )

                          return (
                            <span
                              {...props}
                              style={{
                                background: '#eee',
                                display: 'inline-block',
                                ...props.style,
                                padding: '10px 20px',
                                border: '1px solid #ddd',
                              }}
                            >
                              {/* {node.props.title} */}
                              {props.children}
                            </span>
                          );
                        },
                        Card: (props) => {
                          return (
                            <Card
                              {...props}
                              style={{
                                background: '#eee',
                                border: '1px solid #ddd',
                                display: 'flex',
                                padding: 10,
                                height: props.children ? 'auto' : 150,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {props.children ? props.children : <span>拖拽字段进入该区域</span>}
                            </Card>
                          );
                        },
                        Section: (props) => {
                          return (
                            <div
                              {...props}
                              style={{
                                background: '#eee',
                                border: '1px solid #ddd',
                                display: 'flex',
                                padding: 10,
                                height: props.children ? 'auto' : 150,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {props.children ? props.children : <span>拖拽字段进入该区域</span>}
                            </div>
                          );
                        },
                        Checkbox: (props) => {
                          return (
                            <div
                              {...props}
                              style={{
                                background: '#eee',
                                border: '1px solid #ddd',
                                display: 'flex',
                                padding: 10,
                                height: props.children ? 'auto' : 150,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {props.children ? props.children : <span>拖拽字段进入该区域</span>}
                            </div>
                          );
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
                  </AntForm>
                );
              }}
            />
          </Viewport>
        </Workspace>
      </Designer>
    </>
  );
};

export default App;
