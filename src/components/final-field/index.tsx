import React, { createElement, FC, Fragment, ReactNode } from 'react';
import { Field, FieldInputProps, FieldMetaState, FieldRenderProps } from 'react-final-form';
import { FieldState } from 'final-form';
import ConditionalField from '../conditional-field';
import { getValidateState } from '../../utils';

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
  validate?: FieldValidator;
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
  };
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

const FinalField: FC<FinalFieldProps> = ({
  name,
  type,
  title,
  validate,
  conditions,
  decorator,
  component,
  ...rest
}) => {
  const renderComponent = (props: any) => () => {
    if (component) {
      return createElement(component[0], {
        ...component[1],
        ...transformFieldState2FieldProps(props),
      });
    }

    return <Fragment />;
  };

  const renderDecorator =
    ({ meta }: FieldRenderProps<any> | any) =>
    (children: ReactNode) => {
      if (decorator && decorator.length > 1) {
        return createElement(
          decorator?.[0],
          {
            ...decorator?.[1],
            ...transformFieldState2FormItemProps({ ...meta, label: title }),
          },
          children,
        );
      }

      return <Fragment>{children}</Fragment>;
    };

  const renderConditional = (children: ReactNode) => {
    if (conditions && conditions.length) {
      return (
        <ConditionalField name={name as string} conditions={conditions}>
          {children}
        </ConditionalField>
      );
    }

    return <Fragment>{children}</Fragment>;
  };

  const render = () => {
    // 没有 name 属性直接 render Decorator
    if (!name) return renderConditional(renderDecorator({})(renderComponent({})()));

    return renderConditional(
      createElement(
        Field,
        {
          name,
          type,
          validate,
          render: (renderProps) => {
            return renderDecorator(renderProps)(renderComponent(renderProps.input)());
          },
        },
        rest.children,
      ),
    );
  };

  return render();
};

export default FinalField;
