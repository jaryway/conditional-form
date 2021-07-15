// import { Field, VirtualField, FormPathPattern, FormPath, ValidatePatternRules } from '@formily/react';
import { Input, Checkbox } from 'antd';
import React, { FC, createElement, Fragment } from 'react';
import { Field } from 'react-final-form';
import { ConditionalField } from './components/conditional-field';
import FormControl from './components/form-control';

// import defaultFormats from '@formily/validator/lib/formats';
// import { each } from '@formily/shared';

// import { SchemaFormContext, RegistryComponentsContext, SchemaFieldPropsContext } from './context';
// import {
//   ICheckboxField,
//   ISchema,
//   ISchemaFieldComponent,
//   ISchemaVirtualFieldComponent,
//   IValidation,
// } from './interface';

// interface ISchemaField {
//   schema: ISchema;
//   path?: FormPathPattern;
//   jsonPath?: string;
//   name?: string;
//   editable?: boolean;
//   childCount?: number;
// }

// // // 优先级：当前属性 > context 传递的属性 > 默认值
// const computeVisible = (
//   value: boolean | undefined | 0 | 1,
//   next: boolean | undefined,
//   defaultValue: boolean | undefined,
// ) => {
//   if (!(value === undefined || value === null)) return Boolean(value);
//   if (!(next === undefined || next === null)) return Boolean(next);
//   return defaultValue;
// };

// const computeEditable = (
//   thisEditable: boolean | undefined,
//   readOnly: any,
//   writable: any,
//   schemaReadOnly: any,
// ) => {
//   if (thisEditable === false) return false;
//   if (readOnly === true) return false;
//   if (writable === false || writable === 0) return false;
//   if (schemaReadOnly === true) return false;
//   return undefined;
// };

// const computeRequired = (validation: IValidation[] | undefined) => {
//   if (!validation || validation.length === 0) return false;
//   return validation.some((m) => m.type === 'required');
// };

// const getHtmlDataProperties = (props: any) => {
//   const selected: any = {};
//   each(props, (value: any, key: string) => {
//     if (key.startsWith('data-')) {
//       selected[key] = value;
//     }
//   });

//   return selected;
// };

// const computeRules = (
//   validation: IValidation[] | undefined,
// ): ValidatePatternRules[] | ValidatePatternRules => {
//   if (!validation || validation.length === 0) return [];
//   // console.log('computeRules', validation);

//   return validation
//     .sort((m) => (m.type === 'required' ? -1 : 0)) // 优先验证必填属性
//     .map((m) => {
//       if (m.type === 'required') return { required: true, message: m.message };
//       if (m.type === 'email')
//         return { type: 'email', pattern: defaultFormats.email, message: m.message };
//       if (m.type === 'url')
//         return { format: 'url', pattern: defaultFormats.url, message: m.message };
//       if (m.type === 'date')
//         return { format: 'date', pattern: defaultFormats.date, message: m.message };
//       if (m.type === 'phone')
//         return { format: 'phone', pattern: defaultFormats.phone, message: m.message };
//       if (m.type === 'ID')
//         return { format: 'idcard', pattern: defaultFormats.idcard, message: m.message };

//       if (m.type === 'mobile')
//         return { pattern: new RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/), message: m.message };
//       if (m.type === 'min' && m.param)
//         return { format: 'number', message: m.message, minimum: Number(m.param) }; // 最小值
//       if (m.type === 'max' && m.param)
//         return { format: 'number', message: m.message, maximum: Number(m.param) }; // 最大值
//       if (m.type === 'minLength' && m.param) return { message: m.message, min: Number(m.param) };
//       if (m.type === 'maxLength' && m.param) return { message: m.message, max: Number(m.param) };
//     })
//     .filter(Boolean);
// };

// const computeDefaultValue = (schema: ISchema) => {
//   if (
//     ['RadioField', 'CheckboxField', 'SelectField', 'MultiSelectField'] //
//       .includes(schema.componentName)
//   ) {
//     const props = schema.props as ICheckboxField;

//     if (props.dataSourceType === 'custom') {
//       if (schema.componentName === 'RadioField' || schema.componentName === 'SelectField')
//         return (props.dataSource || []).find((m: any) => m.defaultChecked)?.value;

//       return (props.dataSource || []).filter((m: any) => m.defaultChecked).map((m: any) => m.value);
//     }
//   }

//   return ((schema?.props || {}) as any).value;
// };

const PageComponent: FC<any> = ({ children }) => {
  return <div className="page">PageComponent{children}</div>;
};

const SchemaField: FC<any> = ({ children, schema, editable: __editable, jsonPath, ...rest }) => {
  const formRegistry: any = {
    formItemComponent: FormControl,
    virtualFields: {
      Page: PageComponent,
    },
    fields: {
      TextField: Input,
      CheckboxField: Checkbox.Group,
      BooleanField: Checkbox,
    },
  };
  // const formRegistry = useContext(RegistryComponentsContext);
  // const { permissions = {}, readOnly } = useContext(SchemaFormContext);
  // const path = FormPath.parse(rest.path);
  const schemaProps = schema.props || ({} as any);
  const childCount = rest.childCount;
  // const htmlDataProperties = getHtmlDataProperties(rest);

  // 1、获取 Field 相关属性 fieldProps
  // 2、获取 FormItem 相关属性； formItemProps
  // 3、获取 FormComponent 相关属性，需要根据 schema 相关配置完成
  //   FormComponent 相关属性的设置，比如 remote 获取 Options 的情况
  //

  /********** Field 相关属性 fieldProps **********/
  // const value = computeDefaultValue(schema);

  // const visible = computeVisible(
  //   permissions[schemaProps.fieldId as string]?.visible,
  //   schemaProps.visible,
  //   undefined,
  // ); // 还需要从权限去获取有限权限值
  // const editable = computeEditable(
  //   __editable,
  //   readOnly,
  //   permissions[schemaProps.fieldId as string]?.writable,
  //   schemaProps.readOnly,
  // );
  // const required = computeRequired(schemaProps.validation);
  // const rules = computeRules(schemaProps.validation);
  // if (schemaProps.fieldId === 'dateField_ockkf1f460h') console.log('SchemaField', rules, required);
  // console.log('valuevaluevalue', value, schemaProps);

  /********** end **********/

  const renderSchemaChildren = (): any => {
    return schema.children?.map((child: any, idx: number) => {
      return (
        <SchemaField
          key={child.id + idx}
          schema={child}
          // jsonPath={childJsonPath}
          childCount={schema.children.length}
          // path={path.concat(child.props.fieldId as string)}
        />
      );
    });
  };

  // const renderFieldDelegate = (callback: (props: any) => React.ReactElement) => {
  //   return (
  //     <Field name="name" subscription={{}}>
  //       {/* {({ state, mutators, form }) => {
  //         const nextProps = {
  //           ...state,
  //           // ...htmlDataProperties,
  //           form,
  //           schema,
  //           mutators,
  //           jsonPath,
  //         };
  //         return <div>{callback(nextProps)}</div>;
  //       }} */}
  //       {({ input, meta, ...rest }) => {
  //         callback({ ...input, ...rest, meta });
  //       }}
  //     </Field>
  //   );
  // };

  // const renderVirtualFieldDelegate = (
  //   callback: (props: ISchemaVirtualFieldComponent) => React.ReactElement,
  // ) => {
  //   return (
  //     <VirtualField path={path} visible={visible}>
  //       {({ state, form }) => {
  //         const nextProps = {
  //           ...state,
  //           ...htmlDataProperties,
  //           form,
  //           schema,
  //           jsonPath,
  //           children: renderSchemaChildren(),
  //           childCount,
  //         } as ISchemaVirtualFieldComponent;

  //         return (
  //           <SchemaFieldPropsContext.Provider value={nextProps}>
  //             {callback(nextProps)}
  //           </SchemaFieldPropsContext.Provider>
  //         );
  //       }}
  //     </VirtualField>
  //   );
  // };

  const virtualFieldComponentType = formRegistry.virtualFields[schema.componentName];
  if (virtualFieldComponentType) {
    const { conditions } = schema.props || {};

    const component = createElement(virtualFieldComponentType, {
      children: renderSchemaChildren(),
    });

    if (conditions && conditions.length)
      return <ConditionalField conditions={conditions}>{component}</ConditionalField>;

    return component;
  }

  // 处理字段组件
  const fieldComponentType = formRegistry.fields[schema.componentName];
  if (fieldComponentType) {
    const { conditions, label, fieldId, placeholder, options } = schema.props || {};
    const _formItemProps: any = { label, name: fieldId };
    const _fieldProps: any = { placeholder, options };
    if (schema.componentName === 'BooleanField') _formItemProps.type = 'checkbox';

    const component = createElement(
      formRegistry.formItemComponent,
      _formItemProps,
      createElement(fieldComponentType, _fieldProps),
    );

    // 如果有条件加上条件组件
    if (conditions && conditions.length)
      return <ConditionalField conditions={conditions}>{component}</ConditionalField>;

    return component;
  }

  // if (children && (typeof children === 'function' || isValidElement(children))) {
  //   return renderFieldDelegate((props) => {
  //     const {
  //       mutators,
  //       value,
  //       displayName,
  //       display,
  //       visible,
  //       unmounted,
  //       mounted,
  //       name,
  //       ...restProps
  //     } = props;
  //     const _fieldProps = { ...restProps, name, value, schema, mutators, children: undefined };
  //     const _formItemProps = { ...props };

  //     return createElement(
  //       formRegistry.formItemComponent,
  //       _formItemProps,
  //       typeof children === 'function'
  //         ? children(_fieldProps)
  //         : cloneElement(children as React.ReactElement, _fieldProps),
  //     );
  //   });
  // }

  return <Fragment />;
};

export default SchemaField;
