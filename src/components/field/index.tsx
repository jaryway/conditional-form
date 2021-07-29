import React, { createContext, createElement, FC, Fragment, ReactNode, useContext } from 'react';
import { FieldState } from 'final-form';
import { Field, FieldRenderProps } from 'react-final-form';
import { Path } from '@formily/path';
import ConditionalField from '../conditional-field';

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
  baseName?: string;
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

interface FieldContextProps extends FieldRenderProps<any> {
  baseName?: string;
}

const FieldContext = createContext<FieldContextProps>({} as any);

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
  const parent = useContext(FieldContext);
  // console.log('parent', parent);
  const getBaseName = () => {
    // console.log('parent1', rest.baseName || parent?.name);
    return rest.baseName || parent?.input?.name;
  };

  const renderComponent = () => {
    if (component) {
      return (
        <FieldContext.Consumer>
          {({ input }) => {
            return createElement(
              component[0],
              {
                ...component[1],
                ...input,
              },
              rest.children,
            );
          }}
        </FieldContext.Consumer>
      );
    }

    return <Fragment>{rest.children}</Fragment>;
  };

  const renderDecorator = (children: ReactNode) => {
    if (decorator && decorator.length > 0) {
      return (
        <FieldContext.Consumer>
          {({ meta }) => {
            return createElement(
              decorator?.[0],
              {
                title,
                ...decorator?.[1],
                style: {
                  ...decorator[1]?.style,
                },
                ...meta,
              },
              children,
            );
          }}
        </FieldContext.Consumer>
      );
    }

    return <Fragment>{children}</Fragment>;
  };

  const renderConditional = (children: ReactNode) => {
    if (conditions && conditions.length) {
      const fieldName = Path.parse(getBaseName())
        .concat(name as string)
        .toString();

      return (
        <ConditionalField name={fieldName} conditions={conditions}>
          {children}
        </ConditionalField>
      );
    }

    return <Fragment>{children}</Fragment>;
  };

  const renderField = (children: ReactNode) => {
    const fieldName = Path.parse(getBaseName())
      .concat(name as string)
      .toString();
      console.log('xxxxxxxxx',fieldName);
    return (
      <Field
        type={type}
        name={fieldName as string}
        validate={validate}
        render={({ input, meta }) => {
          return <FieldContext.Provider value={{ input, meta }}>{children}</FieldContext.Provider>;
          // return (
          //   <AntForm.Item label={rest.title}>
          //     <Input {...input} />
          //   </AntForm.Item>
          // );
        }}
      >
        {rest.children}
      </Field>
    );
  };

  // 没有 name 属性直接 render Decorator
  if (!name) return renderConditional(renderDecorator(renderComponent()));
  return renderConditional(renderField(renderDecorator(renderComponent())));
};

export default FinalField;
