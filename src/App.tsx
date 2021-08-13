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
// import { ComponentTreeWidget } from './widgets/ComponentTreeWidget';
// import { useTreeNode } from './hooks';
import { Content } from './Content';
import { TreeNode } from './core/models';
import { InsertBeforeEvent } from './core/events';
// import useTest from './hooks/useTest';
// import { uid } from './shared';
// import { Subscrible } from './events/subscrible';
// import DragDropDriver from './drivers/DragDropDriver';

import './App.less';

// const s = new Subscrible();
// s.subscribeTo('xxx', (e) => {
//   // if (e?.type === 'xxx') {
//   //   return;
//   // }
//   console.log('subscriber', e);
// });

// s.dispatch({ type: 'xxx' });

// const AppContext = createContext<any>({});
const AntCard = Card;

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
    {
      componentName: 'Field',
      id: 'xo9dc80d7bo',
      props: {
        title: 'xo9dc80d7bo',
      },
    },
    {
      componentName: 'Card',
      id: 'xo9dc80d7br',
      props: {
        title: 'xo9dc80d7br',
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

const App = () => {
  // useEffect(() => {
  //   engine.subscribeTo(InsertBeforeEvent, (e) => {
  //     console.log('InsertBeforeEvent');
  //   });
  // }, []);

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
                // console.log('tree', engine.workbench.currentWorkspace.operation.tree);
                return (
                  <AntForm
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 10 }}
                    style={{ marginTop: 24 }}
                    onValuesChange={(cv: any) => {}}
                    className="dn-designable-form"
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
                    <Content />

                    <AntForm.Item
                      wrapperCol={{ offset: 6, span: 16 }}
                      // {...{ [engine.props.nodeHelpersIdAttrName]: 'xxxxxxxx' }}
                    >
                      <Space>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => {
                            // form.submit();
                            const { firstChild } =
                              engine.workbench.currentWorkspace?.operation.tree;

                            const res = firstChild.insertBefore(
                              new TreeNode({
                                componentName: 'Field',
                                props: { title: '' + Math.random() },
                                // operation: undefined as any,
                                id: 'sss' + Math.random(),
                              } as any),
                            );

                            console.log(
                              'vvvv-a',
                              firstChild.children,
                              res,
                              engine.workbench.currentWorkspace?.operation.tree,
                            );
                          }}
                          loading={submitting}
                        >
                          Submit
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => {
                            // form.submit();
                            const { firstChild } =
                              engine.workbench.currentWorkspace?.operation.tree;

                            let node = firstChild;
                            while (node.firstChild) {
                              node = node.firstChild;
                            }

                            const res = node.appendNode(
                              new TreeNode({
                                componentName: 'Field',
                                props: {
                                  title: '' + Math.random(),
                                },
                                // operation: undefined as any,
                                id: 'sss' + Math.random(),
                              } as any),
                            );

                            console.log(
                              'vvvv-a',
                              firstChild,
                              res,
                              engine.workbench.currentWorkspace?.operation.tree,
                            );
                          }}
                          loading={submitting}
                        >
                          Submit2
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
