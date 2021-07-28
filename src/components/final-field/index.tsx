import React, { createElement, FC } from 'react';
import { Field, Form } from 'react-final-form';
import { Form as AntForm, Input } from 'antd';
import { FieldState } from 'final-form';

export type ICondition = {
  /**
   * Property that represents the name of the field to watch
   */
  when: string;
  /**
   * Property that represents the value needed to reach the condition
   */
  is: any;
  visible?: true;
  becomes?: any;
};

interface FinalFieldProps<
  Decorator = any,
  Component = any,
  DecoratorProps = any,
  ComponentProps = any,
> {
  name?: string;
  type?: 'checkbox' | 'radio';
  title?: string;
  conditions?: ICondition[];
  decorator?: [Decorator, DecoratorProps];
  component?: [Component, ComponentProps];
}

type FieldValidator<FieldValue = any> = (
  value: FieldValue,
  allValues?: object,
  meta?: FieldState<FieldValue>,
) => any | Promise<any>;

// const composeValidators: (vali: FieldValidator[]) => (v: any) => void = (...validators) => {
//   return (value) => {
//     return validators.reduce((error, validator) => error || validator(value), undefined);
//   };
// };


const FinalField: FC<FinalFieldProps> = ({ title, name }) => {
  //   const [decoratorType, decoratorProps] = decorator || [];

  //   const renderDecorator = () => {
  //     createElement(decorator?.[0], decorator?.[1]);
  //   };

  return (
    <Field
      name={name as string}
      validate={(value, values, meta) => {
        // return new
      }}
    >
      {({ input, meta }) => {
        return (
          <AntForm.Item label={title}>
            <Input {...input} />
          </AntForm.Item>
        );
      }}
    </Field>
  );
};

export default FinalField;
